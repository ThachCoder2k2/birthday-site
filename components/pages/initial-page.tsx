import { ParallaxContext, useParallax } from '../MainPage';

import { cn } from '@/lib/utils';

import { forwardRef, useContext, useRef, useState } from 'react'; // Import useRef

import gsap from 'gsap'; // Import gsap

import { useGSAP } from '@gsap/react'; // Import useGSAP
import { Play, Sparkles } from 'lucide-react';

export const InitialPage = forwardRef<HTMLElement>(function InitialPage() {
  const { nextSection } = useParallax();

  const context = useContext(ParallaxContext);
  const theme = context?.theme;

  const [isPressed, setIsPressed] = useState(false);

  const compRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Select the elements within the current component's scope

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-heading',

        { opacity: 0, y: 50 },

        { opacity: 1, y: 0, duration: 1.2, delay: 0.3 }
      )

        .fromTo(
          '.hero-paragraph',

          { opacity: 0, y: 50 },

          { opacity: 1, y: 0, duration: 1.2 },

          '-=0.8' // Start this animation 0.8 seconds before the previous one ends
        )

        .fromTo(
          '.hero-button',

          { opacity: 0, scale: 0.8 }, // Start smaller and invisible

          { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }, // Bounce out effect

          '-=0.7' // Start this animation 0.7 seconds before the previous one ends
        );
    },

    { scope: compRef }
  ); // Scope the animation to this component's ref

  return (
    <section className="w-full h-full flex items-center justify-center">
      <div
        ref={compRef}
        className={cn('relative z-50 text-center px-6', theme?.primary)}
      >
        <h1 className="hero-heading text-6xl md:text-8xl font-bold mb-10 font-waiting ">
          A journey with me???
        </h1>
        <button
          className={`
          relative group px-12 py-6 text-2xl font-bold text-white cursor-pointer
          bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500
          rounded-2xl shadow-2xl transform transition-all duration-200 ease-out
          hover:scale-105 hover:shadow-emerald-500/25 hover:shadow-2xl
          active:scale-95 active:shadow-lg
          before:absolute before:inset-0 before:rounded-2xl 
          before:bg-gradient-to-r before:from-emerald-400 before:via-teal-400 before:to-cyan-400
          before:opacity-0 before:transition-opacity before:duration-300
          hover:before:opacity-100
          after:absolute after:inset-0 after:rounded-2xl after:shadow-inner
          overflow-hidden
          ${isPressed ? 'animate-pulse' : ''}
        `}
          onMouseDown={() => {
            setIsPressed(true);
            nextSection();
          }}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
        >
          <div className="absolute inset-0 opacity-30">
            <Sparkles className="absolute top-2 left-4 w-4 h-4 animate-pulse" />
            <Sparkles className="absolute bottom-3 right-6 w-3 h-3 animate-pulse delay-300" />
            <Sparkles className="absolute top-4 right-8 w-2 h-2 animate-pulse delay-700" />
          </div>

          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />

          {/* Button content */}
          <div className="relative flex items-center gap-3 z-10">
            <Play className="w-8 h-8 fill-current" />
            <span className="tracking-wider">START</span>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10" />
        </button>
             {' '}
      </div>
         {' '}
    </section>
  );
});

InitialPage.displayName = 'InitialPage';
