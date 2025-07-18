'use client';

import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CornerDownRightIcon } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useParallax } from '../MainPage';

// Move sentences outside component to prevent re-creation on every render
const sentences: string[] = [
  'Hey',
  'Before this ends',
  'I have a few words for u babi',
  'I wanna do more but i cant finish the thing i expected it to be. ',
  'The animation stuffs cost me sooo muchhh.',
  'And you know, works, stuffs',
  'I still blame myself on how i cant finish this, ',

  'this is only 1/10 of what im capable of',
  'Sorry babi',
  'The time passed by, ive been thinking alots',
  'I know ure still too young to understand my struggle',
  'Im not saying that u should',
  'Im saying that im trying for u, day by day',
  'And time after time, im afraid that u will go again',
  'through what i saw in your words, ',
  'its got shorten again u know T-T',
  'Atually, i know the reason why',
  'I am too busy with things lately',
  'So u have to keep your mind busy too',
  'I feel like u can be mad anytime eh',
  'Im afraid that i cant be enough for u',
  'I hope that ive given for u the best as i can',
  'I hope that ull keep loving me, ',
  ' and make me the happiest man babbii',
  'We cant expect the future',
  'So lets hope with me',
  'Tonight',
  'I love u, always',
];

function WordsTransfer() {
  const pageContainerRef = useRef<HTMLDivElement | null>(null);
  const sentenceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [textAnimationComplete, setTextAnimationComplete] =
    useState<boolean>(false);
  const { nextSection } = useParallax();
  // Theme object (since we don't have the useParallax hook)
  const theme = {
    primary: 'text-pink-600',
    secondary: 'text-pink-800',
  };

  const waveTransition = () => {
    if (pageContainerRef.current) {
      const tl = gsap.timeline();
      tl.set(pageContainerRef.current, {
        clipPath: 'circle(150% at 50% 50%)',
        opacity: 1,
        display: 'flex',
      }).to(pageContainerRef.current, {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to(pageContainerRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              if (pageContainerRef.current) {
                pageContainerRef.current.style.display = 'none';
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
      // Clear any existing animations
      gsap.killTweensOf(sentenceRefs.current);

      const tl = gsap.timeline({
        onComplete: () => {
          setTextAnimationComplete(true);
        },
      });

      // Set initial state - all sentences invisible
      gsap.set(sentenceRefs.current, {
        opacity: 0,
        y: 30,
      });

      // Animate each sentence one by one (show then hide)
      sentenceRefs.current.forEach((sentenceEl, index) => {
        if (sentenceEl) {
          // Show the sentence
          tl.to(
            sentenceEl,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
            },
            index * 2.5 + 0.5 // Each sentence starts 2.5 seconds after the previous
          );

          // Hide the sentence (except for the last one)
          if (index < sentences.length - 1) {
            tl.to(
              sentenceEl,
              {
                opacity: 0,
                y: -30,
                duration: 0.6,
                ease: 'power3.in',
              },
              index * 2.5 + 2.3 // Hide 2.3 seconds after it appeared
            );
          }
        }
      });
    },
    {
      scope: pageContainerRef,
      dependencies: [],
    }
  );

  // Animate the click button when text animation is complete
  useEffect(() => {
    if (textAnimationComplete) {
      gsap.fromTo(
        '.click-here-elements',
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
        }
      );
    }
  }, [textAnimationComplete]);

  return (
    <div className="min-h-screen w-full">
      <div
        ref={pageContainerRef}
        className="flex flex-col w-full h-screen items-center justify-center font-semibold text-center p-8 "
      >
        <div
          className={cn(
            'relative w-full max-w-4xl h-32 flex items-center justify-center',
            theme?.primary
          )}
        >
          {sentences.map((sentence, index) => (
            <div
              key={index}
              ref={(el) => {
                sentenceRefs.current[index] = el;
              }}
              className={cn(
                theme?.secondary,
                'absolute text-2xl md:text-3xl lg:text-4xl font-bold text-center leading-relaxed'
              )}
            >
              {sentence}
            </div>
          ))}
        </div>

        <div
          className={cn(
            'flex items-center gap-2 cursor-pointer click-here-elements opacity-0 hover:scale-105 transition-transform duration-200',
            theme?.secondary
          )}
          onClick={waveTransition}
        >
          <CornerDownRightIcon size={24} />
          <span className="font-semibold text-2xl md:text-3xl">Click here</span>
        </div>
      </div>
    </div>
  );
}

export default WordsTransfer;
