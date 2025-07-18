import { cn } from '@/lib/utils';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';

import { CornerDownRightIcon } from 'lucide-react';

import { Waiting_for_the_Sunrise } from 'next/font/google';

import { useRef, useState } from 'react';

import { useParallax } from '../MainPage'; // Assuming this hook provides nextSection

const font = Waiting_for_the_Sunrise({
  subsets: ['latin'],

  weight: ['400'],
});

function TestPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { nextSection, theme } = useParallax();

  const [textAnimationComplete, setTextAnimationComplete] =
    useState<boolean>(true); // Define the parts of your letter

  const dearPart = 'Dear BABBIIII!';

  const mainPart =
    ' Its me your lovely boyfriend right here celebrating your birthday. After a long time hard working, ive finally transferred this to u bab i`ve made this only for today with all my love. From all your heart please tell me if u like it or not. Ive been afraid that this wouldnt be enough for u T-T. I hope you like it my babii <3';

  const signPart = 'your boi <3';

  const prepareTextForAnimation = (text: string) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="word-char-gsap">
        {word}
      </span>
    ));
  };

  const dearWords = prepareTextForAnimation(dearPart);

  const mainWords = prepareTextForAnimation(mainPart);

  const signWords = prepareTextForAnimation(signPart);

  const waveTransition = () => {
    if (containerRef.current) {
      const tl = gsap.timeline();

      tl.set(containerRef.current, {
        clipPath: 'circle(150% at 50% 50%)',

        background: 'yellow-200',

        opacity: 1,

        display: 'flex',
      }).to(containerRef.current, {
        clipPath: 'circle(0% at 50% 50%)',

        duration: 1.5,

        ease: 'power2.inOut',

        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,

            duration: 0.5,

            onComplete: () => {
              if (containerRef.current) {
                containerRef.current.style.display = 'none';

                nextSection();
              }
            },
          });
        },
      });
    }
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Set state to true when text animation is done

          setTextAnimationComplete(true);
        },
      });

      tl.from('.word-char-gsap', {
        opacity: 0,

        y: 30,

        duration: 0.8, // Adjusted duration for quicker text reveal

        ease: 'power3.out',

        stagger: 0.05, // Adjusted stagger for quicker text reveal

        delay: 0.5,
      }); // Animate the button group after the text animation is complete

      if (textAnimationComplete) {
        tl.from(
          '.click-here-elements',

          {
            opacity: 0,

            y: 20,

            duration: 0.7,

            ease: 'power2.out',
          },

          '>-0.2'
        );
      }
    },

    { scope: containerRef, dependencies: [textAnimationComplete] }
  );

  return (
    <div
      ref={containerRef}
      className="flex flex-col w-full h-full items-center justify-center font-semibold text-center p-8 bg-yellow-200"
    >
      <div className={cn('flex flex-col mb-10', theme?.primary)}>
        <div className={cn(font.className, 'text-4xl mb-4 text-left')}>
          {dearWords.flatMap((wordSpan, index, array) => {
            if (index < array.length - 1) {
              return [wordSpan, ' '];
            }

            return [wordSpan];
          })}
        </div>
        <div
          className={cn(
            font.className,

            'text-3xl max-w-2xl leading-relaxed mb-8 text-left'
          )}
        >
          {mainWords.flatMap((wordSpan, index, array) => {
            if (index < array.length - 1) {
              return [wordSpan, ' '];
            }

            return [wordSpan];
          })}
        </div>

        <div className={cn(font.className, 'text-2xl mt-4 text-left')}>
          {signWords.flatMap((wordSpan, index, array) => {
            if (index < array.length - 1) {
              return [wordSpan, ' '];
            }

            return [wordSpan];
          })}
        </div>
      </div>

      <div
        className={cn(
          'flex items-center gap-2 cursor-pointer click-here-elements ',

          theme?.secondary
        )}
      >
        <CornerDownRightIcon size={24} />
        <span
          className={cn(
            'font-semibold text-4xl font-waiting',

            !textAnimationComplete ? 'hidden' : 'block'
          )}
          onClick={() => waveTransition()}
        >
          Click here
        </span>
      </div>
    </div>
  );
}

export default TestPage;
