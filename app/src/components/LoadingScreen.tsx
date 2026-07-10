import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Animate dots
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => {
      clearInterval(dotInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[200] bg-manga-bg flex flex-col items-center justify-center transition-opacity duration-500 ${
        progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Manga Panel Frame */}
      <div
        className="bg-manga-panel border-4 border-black p-8 max-w-sm w-full mx-4"
        style={{ boxShadow: '8px 8px 0 #000' }}
      >
        {/* Title */}
        <h2 className="font-comic text-3xl text-white text-center mb-6">
          NOW LOADING{dots}
        </h2>

        {/* Progress Bar */}
        <div className="h-6 bg-manga-accent border-2 border-black rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-manga-red to-manga-yellow transition-all duration-200 relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" style={{ width: '200%' }} />
          </div>
        </div>

        {/* Percentage */}
        <div className="font-comic text-xl text-manga-yellow text-center">
          {Math.min(Math.round(progress), 100)}%
        </div>

        {/* Decorative manga panels */}
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-8 h-10 border-2 border-black ${
                progress > (i + 1) * 25 ? 'bg-manga-red' : 'bg-manga-accent'
              }`}
              style={{ boxShadow: '1px 1px 0 #000' }}
            />
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-manga-red/30 font-comic text-2xl animate-float">
        LOADING
      </div>
      <div className="absolute bottom-10 right-10 text-manga-yellow/30 font-comic text-2xl animate-float-reverse">
        PLEASE WAIT
      </div>
    </div>
  );
}
