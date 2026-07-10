import { useState, useCallback, useEffect } from 'react';
import Navigation from '../components/Navigation';
import ProgressBar from '../components/ProgressBar';
import CustomCursor from '../components/CustomCursor';
import EasterEgg from '../components/EasterEgg';
import LoadingScreen from '../components/LoadingScreen';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Journey from '../sections/Journey';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => setShowContent(true), 100);
  }, []);

  // Hide default cursor when custom cursor is active
  useEffect(() => {
    if (!isLoading) {
      document.body.style.cursor = 'none';
    }
    return () => {
      document.body.style.cursor = '';
    };
  }, [isLoading]);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Custom Cursor */}
      {!isLoading && <CustomCursor />}

      {/* Progress Bar */}
      {!isLoading && <ProgressBar />}

      {/* Navigation */}
      {!isLoading && <Navigation />}

      {/* Easter Egg */}
      {!isLoading && <EasterEgg />}

      {/* Main Content */}
      <main
        className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}
        style={{ cursor: 'none' }}
      >
        <Hero />

        {/* Chapter Divider */}
        <div className="flex items-center justify-center gap-4 py-6 bg-manga-bg">
          <div className="h-px flex-1 max-w-[100px] bg-manga-red/40" />
          <span className="font-comic text-manga-red text-lg">★</span>
          <span className="font-comic text-manga-gray text-sm">CHAPTER 1</span>
          <span className="font-comic text-manga-red text-lg">★</span>
          <div className="h-px flex-1 max-w-[100px] bg-manga-red/40" />
        </div>

        <About />

        {/* Chapter Divider */}
        <div className="flex items-center justify-center gap-4 py-6 bg-manga-bg">
          <div className="h-px flex-1 max-w-[100px] bg-manga-yellow/40" />
          <span className="font-comic text-manga-yellow text-lg">★</span>
          <span className="font-comic text-manga-gray text-sm">CHAPTER 2</span>
          <span className="font-comic text-manga-yellow text-lg">★</span>
          <div className="h-px flex-1 max-w-[100px] bg-manga-yellow/40" />
        </div>

        <Skills />

        {/* Chapter Divider */}
        <div className="flex items-center justify-center gap-4 py-6 bg-manga-bg">
          <div className="h-px flex-1 max-w-[100px] bg-manga-blue/40" />
          <span className="font-comic text-manga-blue text-lg">★</span>
          <span className="font-comic text-manga-gray text-sm">CHAPTER 3</span>
          <span className="font-comic text-manga-blue text-lg">★</span>
          <div className="h-px flex-1 max-w-[100px] bg-manga-blue/40" />
        </div>

        <Projects />

        {/* Chapter Divider */}
        <div className="flex items-center justify-center gap-4 py-6 bg-manga-bg">
          <div className="h-px flex-1 max-w-[100px] bg-manga-red/40" />
          <span className="font-comic text-manga-red text-lg">★</span>
          <span className="font-comic text-manga-gray text-sm">CHAPTER 4</span>
          <span className="font-comic text-manga-red text-lg">★</span>
          <div className="h-px flex-1 max-w-[100px] bg-manga-red/40" />
        </div>

        <Journey />

        {/* Chapter Divider */}
        <div className="flex items-center justify-center gap-4 py-6 bg-manga-bg">
          <div className="h-px flex-1 max-w-[100px] bg-manga-yellow/40" />
          <span className="font-comic text-manga-yellow text-lg">★</span>
          <span className="font-comic text-manga-gray text-sm">FINAL CHAPTER</span>
          <span className="font-comic text-manga-yellow text-lg">★</span>
          <div className="h-px flex-1 max-w-[100px] bg-manga-yellow/40" />
        </div>

        <Contact />

        <Footer />
      </main>
    </>
  );
}
