import { useContext, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ParallaxContext } from '../MainPage';
import { cn } from '@/lib/utils';

gsap.registerPlugin(TextPlugin);

interface AnimatedTextProps {
  texts: string[];
  className?: string;
  delay?: number;
  onComplete?: () => void; // Added onComplete prop
}

const AnimatedText = ({
  texts,
  className = '',
  delay = 0,
  onComplete, // Destructure onComplete
}: AnimatedTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const context = useContext(ParallaxContext);

  const theme = context?.theme;

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Create the timeline
    const tl = gsap.timeline({
      delay,
      onComplete: () => {
        // Add onComplete to the timeline itself
        if (onComplete) {
          onComplete(); // Call the prop function when the entire timeline finishes
        }
      },
    });

    texts.forEach((text) => {
      tl.to(element, {
        duration: 1.5,
        text: text,
        ease: 'none',
      })
        .to(
          element,
          {
            duration: 0.5,
            scale: 1.1,
            ease: 'elastic.out(1, 0.3)',
          },
          '<'
        )
        .to(element, {
          duration: 0.3,
          scale: 1,
          ease: 'power2.out',
        })
        .to({}, { duration: 2 }); // Pause between texts
    });

    return () => {
      tl.kill(); // Clean up the timeline on unmount
    };
  }, [texts, delay, onComplete]); // Add onComplete to dependency array

  return (
    <div
      ref={textRef}
      className={cn(`inline-block ${className}`, theme?.secondary)}
    >
      {texts[0]}
    </div>
  );
};

export default AnimatedText;
