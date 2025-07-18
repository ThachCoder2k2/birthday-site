'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import { Lora, Merriweather } from 'next/font/google';
import React, {
  createContext,
  createRef,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { InitialPage } from '../pages/initial-page';
import ParallaxGallery from '../pages/parallax-gallery';
import SectionsSelection from '../pages/sections-selection';
import TestPage from '../pages/test-page';
import BirthdayScene from '../pages/the-end';
import WordsTranfer from '../pages/words-transfer';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lora',
  display: 'swap',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-merriweather',
  display: 'swap',
});

const themes = {
  white: {
    name: 'Lovely White',
    background: 'white',
    primary: 'text-violet-400',
    secondary: 'text-pink-300',
    accent: 'text-purple-500',
    textFontPrimary: lora.variable,
    testFontSecondary: merriweather.variable,
  },
  blackBlueSilver: {
    name: 'Black Blue Silver',
    background: 'bg-gradient-to-br from-black via-blue-900 to-gray-300',
    primary: 'text-blue-400',
    secondary: 'text-gray-300',
    accent: 'text-silver-400',
    textFontPrimary: lora.variable,
    testFontSecondary: merriweather.variable,
  },
  creamGoldPurple: {
    name: 'Cream Gold Light Purple',
    background: 'bg-gradient-to-br from-cream-100 via-yellow-200 to-purple-100',
    primary: 'text-yellow-500',
    secondary: 'text-purple-500',
    accent: 'text-amber-500',
    textFontPrimary: lora.variable,
    testFontSecondary: merriweather.variable,
  },
  sunset: {
    name: 'Sunset Orange Pink',
    background: 'bg-gradient-to-br from-orange-200 via-pink-300 to-red-200',
    primary: 'text-orange-500',
    secondary: 'text-pink-500',
    accent: 'text-red-400',
    textFontPrimary: lora.variable,
    testFontSecondary: merriweather.variable,
  },
  mintAqua: {
    name: 'Mint Aqua Blue',
    background: 'bg-gradient-to-br from-green-100 via-teal-200 to-blue-100',
    primary: 'text-teal-500',
    secondary: 'text-blue-400',
    accent: 'text-green-400',
    textFontPrimary: lora.variable,
    testFontSecondary: merriweather.variable,
  },
};
export type ThemeKey = keyof typeof themes;

const FloatingObject = React.memo(function FloatingObject({
  index,
}: {
  index: number;
}) {
  const {
    iconSrc,
    size,
    left,
    animationDuration,
    animationDelay,
    opacity,
    horizontalDrift,
  } = useMemo(() => {
    const iconCountX = 10;
    const iconCountY = 5;
    const x = (index % iconCountX) + 1;
    const y = (Math.floor(index / iconCountX) % iconCountY) + 1;
    const iconSrc = `/icons/image${x}x${y}.png`;

    function seededRandom(seed: number) {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    }
    const rand = (offset: number) => seededRandom(index * 100 + offset);

    const size = rand(1) * 20 + 60;
    const left = rand(2) * 100;
    const animationDuration = rand(3) * 15 + 10;
    const animationDelay = rand(4) * 10;
    const opacity = rand(5) * 0.7 + 0.3;
    const horizontalDrift = (rand(6) - 0.5) * 100;

    return {
      iconSrc,
      size,
      left,
      animationDuration,
      animationDelay,
      opacity,
      horizontalDrift,
    };
  }, [index]);

  return (
    <div
      className="absolute pointer-events-none"
      style={
        {
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity,
          animation: `floatUp ${animationDuration}s linear infinite`,
          animationDelay: `${animationDelay}s`,
          '--horizontal-drift': `${horizontalDrift}px`,
          top: `100vh`,
        } as React.CSSProperties & { '--horizontal-drift': string }
      }
    >
      <img
        src={iconSrc}
        alt="Floating icon"
        className="w-full h-full object-contain"
        draggable={false}
      />
    </div>
  );
});
FloatingObject.displayName = 'FloatingObject';

interface Section {
  id: number;
  name: string;
  page: React.ReactNode;
}

interface ParallaxContextType {
  currentSection: number;
  isAnimating: boolean;
  phase: number;

  setPhase: Dispatch<SetStateAction<number>>;
  sections: {
    id: number;
    ref: React.RefObject<HTMLElement | null>;
    name: string;
  }[];
  nextSection: () => void;
  prevSection: () => void;
  theme: any;
}

export const ParallaxContext = createContext<ParallaxContextType | undefined>(
  undefined
);

export function useParallax() {
  const context = useContext(ParallaxContext);
  if (context === undefined) {
    throw new Error('useParallax must be used within a ParallaxProvider');
  }
  return context;
}

interface ParallaxProviderProps {
  sections: Section[];
}

function ParallaxProvider({ sections: sectionList }: ParallaxProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('white');
  const [objects, setObjects] = useState<number[]>([]);
  const theme = themes[currentTheme];

  const setTheme = (themeKey: ThemeKey) => {
    setCurrentTheme(themeKey);
  };

  useEffect(() => {
    setObjects(Array.from({ length: 50 }, (_, i) => i));
  }, [currentTheme]);
  const [phase, setPhase] = useState<number>(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating] = useState(false);

  const sectionRefs = useRef(sectionList.map(() => createRef<HTMLElement>()));
  const containerRef = useRef<HTMLDivElement | null>(null);

  const sections = sectionList.map((section, idx) => ({
    ...section,
    ref: sectionRefs.current[idx],
  }));

  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault();

    document.addEventListener('wheel', preventDefault, { passive: false });
    document.addEventListener('touchmove', preventDefault, { passive: false });
    document.addEventListener('keydown', (e) => {
      if (
        [
          'ArrowUp',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
          'PageUp',
          'PageDown',
          'Home',
          'End',
        ].includes(e.key)
      ) {
        e.preventDefault();
      }
    });

    return () => {
      document.removeEventListener('wheel', preventDefault);
      document.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const nextSection = () => {
    if (currentSection < sectionList.length - 1)
      setCurrentSection((prev) => prev + 1);
  };

  const prevSection = () => {
    if (currentSection > 0) setCurrentSection((prev) => prev - 1);
  };

  const contextValue: ParallaxContextType = {
    currentSection,
    isAnimating,
    sections,
    phase,
    setPhase,
    nextSection,
    prevSection,
    theme,
  };

  const renderSection = () => {
    return sectionList[currentSection]?.page;
  };

  return (
    <ParallaxContext.Provider value={contextValue}>
      <div
        className={`fixed inset-0 w-screen h-screen ${theme.background} transition-all duration-1000 -z-10`}
      >
        {objects.map((index) => (
          <FloatingObject key={index} index={index} />
        ))}
      </div>

      <div className={cn('relative h-screen z-0 ', theme.textFontPrimary)}>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              'flex items-center gap-1 text-black hover:opacity-70 focus:outline-none absolute top-4 left-4 z-50 cursor-pointer ',
              theme.textFontPrimary,
              theme.secondary
            )}
          >
            Select Theme
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={cn(
              'bg-transparent border-none shadow-none p-0',
              theme.textFontPrimary,
              theme.secondary
            )}
          >
            {Object.entries(themes).map(([key, value]) => (
              <DropdownMenuItem
                key={key}
                className="hover:bg-transparent focus:bg-transparent cursor-pointer"
                onClick={() => setTheme(key as ThemeKey)}
              >
                {value.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div
          ref={containerRef}
          className="w-full h-full items-center justify-center"
        >
          {renderSection()}
        </div>

        <NavigationArrows />
      </div>
    </ParallaxContext.Provider>
  );
}

function NavigationArrows() {
  const { currentSection, isAnimating, prevSection } = useParallax();

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4">
      <Button
        onClick={prevSection}
        disabled={currentSection === 0 || isAnimating}
        className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </Button>
      {/* <Button
        onClick={nextSection}
        disabled={currentSection === sections.length - 1 || isAnimating}
        className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </Button> */}
    </div>
  );
}

export default function MainPage() {
  const sectionList: Section[] = [
    {
      id: 1,
      name: 'Introduction',
      page: <TestPage />,
    },
    {
      id: 2,
      name: 'Home',
      page: <InitialPage />,
    },
    {
      id: 3,
      name: 'SectionsSelection',
      page: <SectionsSelection />,
    },
    {
      id: 4,
      name: 'ParallaxGallery',
      page: <ParallaxGallery />,
    },
    {
      id: 5,
      name: 'WordsTranfer',
      page: <WordsTranfer />,
    },
    {
      id: 6,
      name: 'BirthdayScene',
      page: <BirthdayScene />,
    },
  ];

  return <ParallaxProvider sections={sectionList} />;
}
