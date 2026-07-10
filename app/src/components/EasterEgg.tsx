import { useState, useEffect, useRef } from 'react';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const MANGA_CODE = ['m', 'a', 'n', 'g', 'a'];

export default function EasterEgg() {
  const [activated, setActivated] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; size: number }>>([]);
  const konamiIndex = useRef(0);
  const mangaIndex = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check Konami code
      if (e.key === KONAMI_CODE[konamiIndex.current]) {
        konamiIndex.current++;
        if (konamiIndex.current === KONAMI_CODE.length) {
          activateEasterEgg('KONAMI CODE ACTIVATED!');
          konamiIndex.current = 0;
        }
      } else {
        konamiIndex.current = 0;
      }

      // Check MANGA code
      if (e.key.toLowerCase() === MANGA_CODE[mangaIndex.current]) {
        mangaIndex.current++;
        if (mangaIndex.current === MANGA_CODE.length) {
          activateEasterEgg('MANGA MODE UNLOCKED!');
          mangaIndex.current = 0;
        }
      } else {
        mangaIndex.current = 0;
      }
    };

    const activateEasterEgg = (_msg: string) => {
      setActivated(true);
      setShowMessage(true);

      // Generate particles
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ['#E63946', '#FFD60A', '#4361EE', '#fff'][Math.floor(Math.random() * 4)],
        size: Math.random() * 20 + 10,
      }));
      setParticles(newParticles);

      setTimeout(() => setShowMessage(false), 3000);
      setTimeout(() => {
        setActivated(false);
        setParticles([]);
      }, 5000);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!activated) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {/* Flash overlay */}
      <div
        className="absolute inset-0 bg-manga-red/20"
        style={{ animation: 'pulse-glow 0.5s ease-in-out 3' }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute font-comic font-bold"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.size,
            color: p.color,
            textShadow: '2px 2px 0 #000',
            animation: `float ${1 + Math.random() * 2}s ease-in-out infinite alternate`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        >
          {['★', '✦', '✸', '✹', '✺'][Math.floor(Math.random() * 5)]}
        </div>
      ))}

      {/* Message */}
      {showMessage && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-manga-yellow border-4 border-black px-8 py-4 font-comic text-3xl text-black"
          style={{
            boxShadow: '6px 6px 0 #000',
            animation: 'slide-up 0.5s ease-out',
          }}
        >
          SECRET CODE ACTIVATED!
        </div>
      )}
    </div>
  );
}
