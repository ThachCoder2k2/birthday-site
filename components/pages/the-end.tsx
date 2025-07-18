'use client';

import { cn } from '@/lib/utils';
import { useState, useEffect, useContext } from 'react';
import { ParallaxContext } from '../MainPage';

export default function BirthdayScene() {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; delay: number }>
  >([]);
  const [mysticalOrbs, setMysticalOrbs] = useState<
    Array<{ id: number; x: number; y: number; color: string }>
  >([]);
  const context = useContext(ParallaxContext);
  const theme = context?.theme;
  useEffect(() => {
    // Generate floating particles for cinematic effect
    const newParticles = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);

    // Generate mystical orbs
    const newOrbs = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: [
        'from-pink-400',
        'from-purple-400',
        'from-blue-400',
        'from-rose-400',
        'from-gold-400',
      ][i % 5],
    }));
    setMysticalOrbs(newOrbs);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden relative font-waiting">
      {/* Cinematic Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>

      {/* Mystical Energy Orbs */}
      {mysticalOrbs.map((orb) => (
        <div
          key={orb.id}
          className={`absolute w-12 h-12 bg-gradient-to-br ${orb.color} to-transparent rounded-full animate-pulse opacity-40 blur-sm`}
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-white/30 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Dramatic Bokeh Effects */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
      <div
        className="absolute top-60 right-32 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className="absolute bottom-40 left-40 w-48 h-48 bg-rose-500/15 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: '2s' }}
      ></div>
      <div
        className="absolute top-40 right-60 w-36 h-36 bg-gold-500/15 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: '1.5s' }}
      ></div>

      {/* K-pop Aesthetic Elements */}
      <div className="absolute top-16 left-16 space-y-4 opacity-80">
        <div className="w-24 h-32 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl shadow-2xl relative overflow-hidden border border-pink-400/40">
          <img
            src="/util-images/1 (43).jpg"
            alt="K-pop Birthday"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-2 left-2 text-pink-200 text-xs font-bold">
            🎂 BIRTHDAY
          </div>
          <div className="absolute top-2 right-2 text-pink-300 text-sm">✨</div>
        </div>
        <div className="w-20 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-xl relative overflow-hidden border border-purple-400/40">
          <img
            src="/util-images/1 (49).JPG"
            alt="Celebration"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-1 left-1 text-purple-200 text-xs">
            🎉
          </div>
        </div>
      </div>

      <div className="absolute top-20 right-20 space-y-4 opacity-80">
        <div className="w-28 h-36 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-2xl relative overflow-hidden border border-rose-400/40">
          <img
            src="/util-images/1 (55).JPG"
            alt="Special Day"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute top-2 right-2 text-rose-200 text-sm">💖</div>
          <div className="absolute bottom-2 left-2 text-rose-200 text-xs font-bold">
            SPECIAL
          </div>
        </div>
      </div>

      {/* Main Cake Scene */}
      <div className="flex items-center justify-center min-h-screen px-8 relative z-10">
        <div className="relative">
          {/* Spectacular Birthday Cake */}
          <div className="relative z-30">
            {/* Dramatic cake lighting aura */}
            <div className="absolute -inset-20 bg-gradient-radial from-yellow-300/30 via-pink-300/20 via-purple-300/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute -inset-16 bg-gradient-radial from-rose-400/25 via-gold-300/15 to-transparent rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: '1s' }}
            ></div>

            <div className="relative">
              {/* Bottom Layer - Grand Base */}
              <div className="w-64 h-32 bg-gradient-to-br from-rose-300 via-pink-400 to-rose-500 rounded-3xl relative shadow-2xl border-4 border-gold-300/60">
                <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-br from-rose-200 to-pink-300 rounded-t-3xl"></div>
                <div className="absolute inset-3 border-3 border-white/40 rounded-2xl"></div>

                {/* Elegant decorative layers */}
                <div className="absolute bottom-6 left-6 right-6 h-4 bg-gradient-to-r from-white/90 to-pink-200/90 rounded-full shadow-inner"></div>
                <div className="absolute bottom-10 left-8 right-8 h-3 bg-gradient-to-r from-gold-300 to-rose-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-14 left-10 right-10 h-2 bg-gradient-to-r from-pink-300 to-purple-400 rounded-full"></div>

                {/* Decorative roses */}
                <div className="absolute top-12 left-12 w-6 h-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg"></div>
                <div className="absolute top-12 right-12 w-6 h-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg"></div>
                <div className="absolute top-20 left-1/2 w-6 h-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg transform -translate-x-1/2"></div>

                {/* Sparkle decorations */}
                <div className="absolute top-8 left-20 w-3 h-3 bg-gold-400 rounded-full animate-ping"></div>
                <div
                  className="absolute top-16 right-20 w-3 h-3 bg-gold-400 rounded-full animate-ping"
                  style={{ animationDelay: '0.5s' }}
                ></div>
                <div
                  className="absolute top-24 left-32 w-3 h-3 bg-gold-400 rounded-full animate-ping"
                  style={{ animationDelay: '1s' }}
                ></div>
              </div>

              {/* Middle Layer - Elegant */}
              <div className="w-48 h-24 bg-gradient-to-br from-purple-300 via-pink-300 to-rose-400 rounded-3xl relative mx-auto -mt-4 shadow-xl border-3 border-gold-300/50">
                <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-br from-purple-200 to-pink-200 rounded-t-3xl"></div>
                <div className="absolute inset-2 border-2 border-white/50 rounded-2xl"></div>

                {/* Middle layer decorations */}
                <div className="absolute bottom-4 left-4 right-4 h-3 bg-gradient-to-r from-white/95 to-purple-200/95 rounded-full shadow-inner"></div>
                <div className="absolute bottom-7 left-6 right-6 h-2 bg-gradient-to-r from-gold-400 to-pink-400 rounded-full animate-pulse"></div>

                {/* Decorative elements */}
                <div className="absolute top-8 left-8 w-4 h-4 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full shadow-lg"></div>
                <div className="absolute top-8 right-8 w-4 h-4 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full shadow-lg"></div>
                <div className="absolute top-12 left-1/2 w-4 h-4 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full shadow-lg transform -translate-x-1/2"></div>
              </div>

              {/* Top Layer - Delicate */}
              <div className="w-32 h-20 bg-gradient-to-br from-cream-200 via-yellow-200 to-gold-300 rounded-3xl relative mx-auto -mt-3 shadow-xl border-2 border-gold-400/60">
                <div className="absolute top-0 left-0 w-full h-5 bg-gradient-to-br from-cream-100 to-yellow-100 rounded-t-3xl"></div>
                <div className="absolute inset-1 border border-white/60 rounded-2xl"></div>

                {/* Top layer decorations */}
                <div className="absolute bottom-3 left-3 right-3 h-2 bg-gradient-to-r from-white/95 to-cream-200/95 rounded-full shadow-inner"></div>
                <div className="absolute bottom-5 left-4 right-4 h-1 bg-gradient-to-r from-gold-400 to-yellow-400 rounded-full animate-pulse"></div>

                {/* Small decorative flowers */}
                <div className="absolute top-6 left-6 w-3 h-3 bg-gradient-to-br from-rose-300 to-rose-500 rounded-full shadow-lg"></div>
                <div className="absolute top-6 right-6 w-3 h-3 bg-gradient-to-br from-rose-300 to-rose-500 rounded-full shadow-lg"></div>
              </div>

              {/* Spectacular Candles */}
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 flex space-x-4">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="relative">
                    {/* Elegant candles with different heights */}
                    <div
                      className="w-3 h-14 bg-gradient-to-b from-cream-100 via-cream-200 to-cream-300 rounded-lg shadow-xl border border-gold-300/50"
                      style={{ height: `${56 + (i % 3) * 8}px` }}
                    ></div>

                    {/* Spectacular flames with different colors */}
                    <div
                      className={`absolute -top-4 left-1/2 w-4 h-5 bg-gradient-to-t ${
                        [
                          'from-red-500 via-orange-400 to-yellow-200',
                          'from-pink-500 via-rose-400 to-white',
                          'from-purple-500 via-pink-400 to-white',
                          'from-blue-500 via-cyan-400 to-white',
                          'from-green-500 via-lime-400 to-yellow-200',
                          'from-orange-500 via-yellow-400 to-white',
                          'from-rose-500 via-pink-400 to-yellow-200',
                          'from-indigo-500 via-purple-400 to-white',
                          'from-teal-500 via-cyan-400 to-white',
                        ][i]
                      } rounded-full transform -translate-x-1/2 animate-pulse shadow-xl`}
                      style={{
                        animationDelay: `${i * 0.12}s`,
                        filter: `drop-shadow(0 0 12px ${
                          [
                            'rgba(255, 165, 0, 0.8)',
                            'rgba(255, 192, 203, 0.8)',
                            'rgba(147, 51, 234, 0.8)',
                          ][i % 3]
                        })`,
                      }}
                    ></div>

                    {/* Spectacular flame aura */}
                    <div
                      className="absolute -top-5 left-1/2 w-8 h-8 bg-gradient-radial from-yellow-300/60 via-orange-300/40 to-transparent rounded-full transform -translate-x-1/2 animate-ping"
                      style={{
                        animationDelay: `${i * 0.12}s`,
                        animationDuration: '2.5s',
                      }}
                    ></div>

                    {/* Elegant wax drips */}
                    <div
                      className="absolute left-1/2 w-1 bg-cream-200 rounded-b-full transform -translate-x-1/2 opacity-90"
                      style={{
                        top: `${48 + (i % 3) * 8}px`,
                        height: `${8 + (i % 2) * 4}px`,
                      }}
                    ></div>
                  </div>
                ))}
              </div>

              {/* Floating cake decorations */}
              <div className="absolute -top-8 -left-8 w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full animate-bounce shadow-lg"></div>
              <div
                className="absolute -top-6 -right-6 w-5 h-5 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-bounce shadow-lg"
                style={{ animationDelay: '0.5s' }}
              ></div>
              <div
                className="absolute top-8 -left-12 w-4 h-4 bg-gradient-to-br from-gold-400 to-yellow-500 rounded-full animate-bounce shadow-lg"
                style={{ animationDelay: '1s' }}
              ></div>
              <div
                className="absolute top-12 -right-10 w-4 h-4 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full animate-bounce shadow-lg"
                style={{ animationDelay: '1.5s' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Birthday Message */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center z-20">
        <div className="relative">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-500 via-purple-500 to-gold-500 animate-pulse mb-6 tracking-wider">
            Happy Birthday Babi
          </h1>
          <div className="absolute -inset-6 bg-gradient-to-r from-pink-500/20 via-rose-500/20 via-purple-500/20 to-gold-500/20 blur-2xl rounded-full"></div>
        </div>
        <p
          className={cn(
            'text-3xl md:text-4xl text-rose-300 font-light animate-bounce tracking-wide',
            theme.primary
          )}
        >
          Make a wish babi!!!!
        </p>
      </div>

      {/* Floating Celebration Elements */}
      <div className="absolute top-1/4 left-1/6 animate-float">
        <div className="text-4xl filter drop-shadow-lg">🎉</div>
      </div>
      <div
        className="absolute top-1/3 right-1/4 animate-float"
        style={{ animationDelay: '1s' }}
      >
        <div className="text-3xl filter drop-shadow-lg">✨</div>
      </div>
      <div
        className="absolute bottom-1/3 left-1/5 animate-float"
        style={{ animationDelay: '2s' }}
      >
        <div className="text-4xl filter drop-shadow-lg">💖</div>
      </div>
      <div
        className="absolute top-1/2 right-1/6 animate-float"
        style={{ animationDelay: '1.5s' }}
      >
        <div className="text-3xl filter drop-shadow-lg">🌟</div>
      </div>
      <div
        className="absolute top-2/3 left-1/3 animate-float"
        style={{ animationDelay: '0.5s' }}
      >
        <div className="text-3xl filter drop-shadow-lg">🎈</div>
      </div>
      <div
        className="absolute bottom-1/4 right-1/3 animate-float"
        style={{ animationDelay: '2.5s' }}
      >
        <div className="text-4xl filter drop-shadow-lg">🎊</div>
      </div>

      {/* Spectacular Lens Flares */}
      <div className="absolute top-1/4 left-1/2 w-3 h-3 bg-gold-400 rounded-full animate-ping opacity-90"></div>
      <div className="absolute top-1/4 left-1/2 w-12 h-0.5 bg-gradient-to-r from-gold-400 to-transparent opacity-70"></div>
      <div className="absolute top-1/4 left-1/2 w-0.5 h-12 bg-gradient-to-b from-gold-400 to-transparent opacity-70"></div>

      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-80"></div>
      <div className="absolute bottom-1/3 right-1/4 w-8 h-0.5 bg-gradient-to-r from-pink-400 to-transparent opacity-60"></div>
      <div className="absolute bottom-1/3 right-1/4 w-0.5 h-8 bg-gradient-to-b from-pink-400 to-transparent opacity-60"></div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(8deg);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
