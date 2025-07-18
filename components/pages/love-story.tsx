import { cn } from '@/lib/utils';
import { ArrowLeftIcon } from 'lucide-react';
import { useContext } from 'react';
import { ParallaxContext } from '../MainPage';
import { StoryPanel } from '../ui/story-panel';

interface Props {
  setIsOpen: (val: boolean) => void;
}

export function ComicHeader({ setIsOpen }: Props) {
  const context = useContext(ParallaxContext);
  const theme = context?.theme;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-10 gradient-love overflow-hidden">
      <div
        className={cn(
          'relative z-10 w-full px-4 sm:px-6 lg:px-8', // Added horizontal padding
          theme.secondary // Apply theme color if available (e.g., text color)
        )}
      >
        {/* Story Panels Container */}
        <div className={cn('container mx-auto grid grid-cols-2 gap-12')}>
          {' '}
          {/* Changed to grid for better layout control */}
          <StoryPanel
            title="Chapter 1: The Beginning"
            text="It all started at a unforgettable night, but from that very moment, I knew you were special. Your smiles really lighten me up when i was at the worst days of my life. I didnt expect to be with u at first, but here i am, the one whos always believe in the word 'Love'"
            image={'util-images/1 (11).jpg'}
            direction="left"
          />
          <StoryPanel
            title="Chapter 2: Falling Deeper"
            text="As days turned into weeks, and weeks into months, my love for you grew stronger with every heartbeat. You became the melody in my favorite song, the color in my black and white world. Every moment without you felt incomplete. But it didnt last long i must say."
            image={'util-images/1 (1).JPG'}
            direction="right"
          />
          {/* Added more diverse image content for the remaining panels */}
          <StoryPanel
            title="Chapter 3: Our bad time"
            text="Together, we've created countless memories that I stabbed me every nights when i remembered them. U were out of my hands reach that time. But u know it already, i still loved u soo much. U also missed my presence too. "
            image={'util-images/1 (2).JPG'} // Example: a lovely landscape/adventure pic
            direction="left"
          />
          <StoryPanel
            title="Chapter 4: The Promise"
            text="Through all the ups and downs, all the fights we made. We finally have each other again, Its magical, right?. Likne in comic book, you are the only one and i will always look into the happy ending with you."
            image={'util-images/1 (35).png'} // Example: a couple's hands/ring pic
            direction="right"
          />
        </div>
      </div>
      <div
        className="absolute right-3 top-3 h-10 w-10 shrink-0 rounded-full flex items-center justify-center  bg-white cursor-pointer"
        onClick={() => setIsOpen(false)}
      >
        <ArrowLeftIcon className={theme.primary} size={32} />
      </div>{' '}
    </div>
  );
}
