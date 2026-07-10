import { useEffect, useRef } from 'react';
import SpeedLines from '../components/SpeedLines';
import FloatingSFX from '../components/FloatingSFX';

const soundEffects = [
  { text: 'BOOM!', x: 5, y: 15, color: '#E63946', rotation: -15, delay: 0 },
  { text: 'POW!', x: 78, y: 10, color: '#FFD60A', rotation: 10, delay: 0.5 },
  { text: 'WHOOSH!', x: 72, y: 72, color: '#E63946', rotation: -5, delay: 1 },
  { text: 'CLICK!', x: 8, y: 68, color: '#4361EE', rotation: 12, delay: 1.5 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation
    if (contentRef.current) {
      contentRef.current.style.opacity = '0';
      contentRef.current.style.transform = 'translateY(40px) scale(0.95)';
      contentRef.current.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (contentRef.current) {
            contentRef.current.style.opacity = '1';
            contentRef.current.style.transform = 'translateY(0) scale(1)';
          }
        });
      });
    }

    // Bubble spring animation
    if (bubbleRef.current) {
      bubbleRef.current.style.opacity = '0';
      bubbleRef.current.style.transform = 'scale(0)';

      setTimeout(() => {
        if (bubbleRef.current) {
          bubbleRef.current.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
          bubbleRef.current.style.opacity = '1';
          bubbleRef.current.style.transform = 'scale(1)';
        }
      }, 600);
    }
  }, []);

  const handleStartReading = () => {
    const about = document.getElementById('about');
    if (about) {
      about.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-manga-bg"
    >
      {/* Speed Lines Background */}
      <div className="absolute inset-0 z-0">
        <SpeedLines />
      </div>

      {/* Halftone Overlay */}
      <div className="halftone-overlay z-[1]" />

      {/* Dark vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Floating Sound Effects */}
      {soundEffects.map((sfx) => (
        <FloatingSFX key={sfx.text} {...sfx} />
      ))}

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center px-4"
      >
        {/* Portrait */}
        <div className="relative mb-6">
          <div
            className="w-40 h-40 md:w-52 md:h-52 rounded-full border-[6px] border-black overflow-hidden bg-manga-panel transition-all duration-300 hover:border-manga-red"
            style={{
              boxShadow: '0 0 20px rgba(230, 57, 70, 0.3), 6px 6px 0 #000',
            }}
          >
            <img
              src="/images/hero-portrait.png"
              alt="Manga-style portrait"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Speech Bubble */}
          <div
            ref={bubbleRef}
            className="absolute -right-4 md:right-[-140px] top-0 md:top-4 speech-bubble up text-sm md:text-base max-w-[180px]"
          >
            Hey there! Welcome to my portfolio!
          </div>
        </div>

        {/* Name */}
        <h1
          className="font-heading font-black text-5xl md:text-7xl text-white mb-3 tracking-tight"
          style={{ textShadow: '-3px 3px 0 #E63946, -6px 6px 0 rgba(0,0,0,0.3)' }}
        >
          ALEX CHEN
        </h1>

        {/* Tagline */}
        <p className="font-body text-lg md:text-2xl text-manga-gray mb-8 max-w-md">
          Aspiring Developer &amp; Manga Enthusiast
        </p>

        {/* CTA Button */}
        <button
          onClick={handleStartReading}
          className="action-button text-xl"
          aria-label="Scroll to About section"
        >
          Start Reading →
        </button>
      </div>

      {/* Decorative Stars */}
      <div className="absolute bottom-20 left-10 text-manga-yellow text-2xl animate-star-pulse" aria-hidden="true">✦</div>
      <div className="absolute top-32 right-16 text-manga-red text-xl animate-star-pulse" style={{ animationDelay: '0.5s' }} aria-hidden="true">✦</div>
      <div className="absolute bottom-40 right-20 text-white text-lg animate-star-pulse" style={{ animationDelay: '1s' }} aria-hidden="true">✦</div>
    </section>
  );
}
