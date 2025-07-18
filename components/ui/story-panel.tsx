import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { ParallaxContext } from '../MainPage';

interface StoryPanelProps {
  title: string;
  text: string;
  image?: string;
  className?: string;
  direction?: 'left' | 'right';
}

export function StoryPanel({
  title,
  text,
  image,
  className,
  direction = 'left',
}: StoryPanelProps) {
  const context = useContext(ParallaxContext);
  const theme = context?.theme;

  return (
    <div
      className={cn(
        'group relative z-0 comic-panel p-6 w-full max-w-3xl mx-auto my-12 overflow-hidden font-waiting', // Increased max-w for more space
        'bg-white dark:bg-gray-900 rounded-2xl shadow-xl', // Softer rounded corners and stronger shadow
        'border-4 border-rose-200 dark:border-rose-900', // A lovely border
        'transition-all duration-500 ease-out transform', // Smooth transitions for hover
        'hover:-translate-y-2 hover:shadow-2xl hover:border-rose-400 dark:hover:border-rose-700', // Lift and border change on hover
        'animate-fade-in-up', // Keep existing animation

        className
      )}
    >
      {/* Background swoosh/pattern for comic feel */}
      <div
        className={cn(
          "absolute inset-0 bg-[url('/path/to/subtle-pattern.svg')] dark:bg-[url('/path/to/subtle-dark-pattern.svg')] opacity-5 z-negative", // Add a subtle pattern (replace path)
          'bg-repeat-round'
        )}
      ></div>

      <div
        className={cn(
          'relative z-10 flex flex-col md:flex-row gap-8 items-center', // Increased gap
          direction === 'right' && 'md:flex-row-reverse'
        )}
      >
        {image && (
          <div className="w-full md:w-1/2 flex-shrink-0">
            {' '}
            {/* flex-shrink-0 to prevent image from shrinking */}
            <img
              src={image}
              alt={title}
              className="w-full h-64 md:h-80 object-cover rounded-xl border-4 border-white dark:border-gray-800 shadow-xl transform transition-transform duration-300 group-hover:scale-102" // Stronger border, better rounded, subtle scale on hover
            />
          </div>
        )}
        <div className="w-full md:w-1/2 space-y-5">
          {' '}
          {/* Increased space-y */}
          <h2
            className={cn(
              'text-4xl font-extrabold text-shadow-outline gradient-love bg-clip-text text-transparent leading-tight',
              theme.primary
            )}
          >
            {' '}
            {/* Larger title, extra bold, tighter line height */}
            {title}
          </h2>
          <div className="comic-bubble bg-rose-50 dark:bg-gray-800 p-5 rounded-3xl shadow-md border border-rose-100 dark:border-gray-700 relative">
            {' '}
            {/* More padding, softer background, border for the bubble */}
            <p className="text-xl text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
              {' '}
              {/* Adjusted text color, leading, and weight */}
              {text}
            </p>
            {/* Speech bubble tail - dynamic based on direction */}
            <div
              className={cn(
                'absolute w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[20px] border-t-rose-50 dark:border-t-gray-800',
                direction === 'left' ? 'left-8 -bottom-4' : 'right-8 -bottom-4'
              )}
              style={{ transform: 'rotate(0deg)' }}
            ></div>{' '}
            {/* Added a tail */}
            <div
              className={cn(
                'absolute w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[20px] border-t-rose-100 dark:border-t-gray-700',
                direction === 'left' ? 'left-8 -bottom-4' : 'right-8 -bottom-4'
              )}
              style={{ transform: 'rotate(0deg)', zIndex: -1 }}
            ></div>{' '}
            {/* Tail border */}
          </div>
        </div>
      </div>
    </div>
  );
}
