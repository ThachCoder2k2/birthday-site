import { cn } from '@/lib/utils';
import { Gift, GiftIcon, Heart, Sparkles } from 'lucide-react';
import { useContext, useState } from 'react';
import { ParallaxContext, useParallax } from '../MainPage';
import AnimatedText from '../ui/animated-text';

const SectionsSelection = () => {
  const context = useContext(ParallaxContext);
  const theme = context?.theme;
  const { nextSection } = useParallax();

  const [canClickGift, setCanClickGift] = useState(false);

  const loveMessages = [
    'Hiii babiiiii ♥',
    'My lovey dovey ♥',
    "You're My Everything ♥",
    'Forever & Always ♥',
    'You Make Life Beautiful ♥',
    'Now babi, click on the gift box ♥',
  ];

  const handleAnimationLoopComplete = () => {
    setCanClickGift(true);
  };

  const handleGiftClick = () => {};

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-secondary relative overflow-hidden">
        <div className="text-center z-10 max-w-4xl mx-auto px-4">
          <div
            className={cn(
              'flex items-center justify-center gap-4 mb-8 ',
              theme?.secondary
            )}
          >
            <Heart className="text-primary animate-pulse" size={48} />
            <div
              onClick={handleGiftClick}
              className={cn({
                'cursor-pointer': canClickGift,
                'opacity-50': !canClickGift,
              })}
            >
              <GiftIcon
                className={cn(
                  'text-accent animate-pulse',
                  canClickGift && ' animate-bounce'
                )}
                onClick={() => nextSection()}
                size={canClickGift ? 60 : 48}
              />
            </div>
            <Sparkles className="text-primary animate-pulse" size={48} />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            <AnimatedText
              texts={loveMessages}
              onComplete={handleAnimationLoopComplete}
              className="block"
            />
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 opacity-0 animate-[fade-in_1s_ease-out_1s_forwards]">
            A special collection of memories, love, and celebrations
          </p>

          <div className="animate-[fade-in_1s_ease-out_2s_forwards] opacity-0">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
              <Heart className="text-primary" size={20} />
              <span className="text-foreground font-medium">
                Scroll to explore our gallery
              </span>
              <Heart className="text-primary" size={20} />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `scale(${Math.random() * 0.5 + 0.5})`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              {i % 3 === 0 ? (
                <Heart className="text-primary animate-pulse" size={24} />
              ) : i % 3 === 1 ? (
                <Gift className="text-accent animate-bounce" size={24} />
              ) : (
                <Sparkles className="text-primary animate-pulse" size={24} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionsSelection;
