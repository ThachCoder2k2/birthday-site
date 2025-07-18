'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  cursor?: boolean;
  cursorClassName?: string;
}

export function TypewriterText({
  text,
  speed = 50,
  className = '',
  onComplete,
  cursor = true,
  cursorClassName = '',
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && !isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, onComplete, isComplete]);

  // Reset animation when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  return (
    <span className={cn('inline-block', className)}>
      {displayedText}
      {cursor && (
        <span
          className={cn(
            'inline-block w-0.5 h-5 bg-current ml-0.5 animate-pulse',
            isComplete && 'opacity-0',
            cursorClassName
          )}
        />
      )}
    </span>
  );
}
