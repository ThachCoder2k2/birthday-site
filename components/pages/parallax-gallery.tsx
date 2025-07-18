import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRightIcon, Heart as HeartIcon } from 'lucide-react'; // Import Heart as HeartIcon if you also use Heart elsewhere
import { useContext, useEffect, useRef, useState } from 'react';
import { ParallaxContext, useParallax } from '../MainPage';
import LoveAlbum from './gallery';
import Games from './game';
import { ComicHeader } from './love-story';

gsap.registerPlugin(ScrollTrigger);

const ParallaxGallery = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const context = useContext(ParallaxContext);
  const theme = context?.theme;
  const { nextSection } = useParallax();
  const phase = context?.phase ?? 0;
  const setPhase = context?.setPhase;

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&h=600&fit=crop',
      alt: 'Birthday celebration',
      title: 'Stories',
    },
    {
      src: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=500&h=600&fit=crop',
      alt: 'Love hearts',
      title: 'Game Timeeee!',
    },
    {
      src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=600&fit=crop',
      alt: 'Birthday cake',
      title: 'My galleries',
    },
  ];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<number>(0);

  const handleOpen = (index: number) => {
    setCardNumber(index);
    if (setPhase) setPhase((prev: number) => prev + 1);
    setIsOpen(true);
  };

  useEffect(() => {
    const gallery = galleryRef.current;
    const title = titleRef.current;
    if (!gallery || !title) return;

    gsap.fromTo(
      title,
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'elastic.out(1, 0.8)',
      }
    );

    const items = gallery.querySelectorAll('.gallery-item');

    items.forEach((item, index) => {
      const isEven = index % 2 === 0;
      // Select the icon container within this specific item
      const iconOverlay = item.querySelector('.icon-overlay') as HTMLElement;
      const icons = iconOverlay ? Array.from(iconOverlay.children) : [];

      gsap.fromTo(
        item,
        {
          y: isEven ? 100 : -100,
          x: isEven ? -50 : 50,
          opacity: 0,
          scale: 0.8,
          rotation: isEven ? -5 : 5,
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              gsap.fromTo(
                icons,
                { opacity: 0, scale: 0, y: 20 },
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.5,
                  stagger: 0.2,
                  ease: 'back.out(1.7)',
                }
              );
            },
            onLeaveBack: () => {
              gsap.to(icons, {
                opacity: 0,
                scale: 0,
                y: 20,
                duration: 0.3,
                stagger: 0.1,
              });
            },
          },
        }
      );

      gsap.to(item, {
        y: isEven ? -50 : 50,
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      const cardElement = item as HTMLElement;
      const imageElement = item.querySelector('img') as HTMLElement;
      const titleElement = item.querySelector('.image-title') as HTMLElement;
      const staticHeartIcon = item.querySelector(
        '.static-heart-icon'
      ) as HTMLElement; // Select the new static heart

      cardElement.addEventListener('mouseenter', () => {
        gsap.to(cardElement, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(imageElement, {
          scale: 1.1,
          duration: 0.5,
          ease: 'power2.out',
        });
        gsap.to(titleElement, { y: -10, duration: 0.3, ease: 'power2.out' });
        gsap.to(staticHeartIcon, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        }); // Animate heart in
      });

      cardElement.addEventListener('mouseleave', () => {
        gsap.to(cardElement, { scale: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(imageElement, { scale: 1, duration: 0.5, ease: 'power2.out' });
        gsap.to(titleElement, { y: 0, duration: 0.3, ease: 'power2.out' });
        gsap.to(staticHeartIcon, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: 'power2.out',
        }); // Animate heart out
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  if (isOpen) {
    if (cardNumber === 0) return <ComicHeader setIsOpen={setIsOpen} />;
    if (cardNumber === 1) return <Games setIsOpen={setIsOpen} />;
    if (cardNumber === 2) return <LoveAlbum setIsOpen={setIsOpen} />;
  } else
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-muted to-background flex items-center justify-between">
        <div className="container mx-auto px-4 py-16 ">
          <div
            ref={galleryRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
          >
            {images.map((image, index) => {
              return (
                <Card
                  key={index}
                  className={cn(
                    'gallery-item relative overflow-hidden shadow-none border-none group cursor-pointer hover:shadow-[--shadow-dreamy] transition-shadow duration-300',

                    phase < index &&
                      'opacity-5 pointer-events-none cursor-not-allowed'
                  )}
                  onClick={() => handleOpen(index)}
                >
                  {/* Image Container - now directly under Card, with aspect ratio */}
                  <div className="relative w-full h-0 pb-[75%] overflow-hidden ">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 rounded-2xl"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute rounded-2xl inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                    {/* Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 z-30">
                      <h3 className="image-title text-white text-xl font-semibold transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {image.title}
                      </h3>
                    </div>
                  </div>

                  {/* Static Heart Icon (appears on hover, centered on the entire Card) */}
                  <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
                    <HeartIcon
                      className={cn(
                        'static-heart-icon text-white opacity-0 scale-90',
                        theme.secondary
                      )}
                      size={64}
                    />
                  </div>
                </Card>
              );
            })}
          </div>
          <div
            className={cn('flex justify-center', cardNumber < 2 && 'hidden')}
          >
            {' '}
            <ArrowRightIcon
              className="text-black cursor-pointer"
              size={42}
              onClick={() => nextSection()}
            />
          </div>

          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute text-primary opacity-20 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 20 + 10}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${Math.random() * 2 + 2}s`,
                }}
              >
                ♥
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default ParallaxGallery;
