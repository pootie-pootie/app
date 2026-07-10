import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Don't show custom cursor on touch devices
    if ('ontouchstart' in window) {
      setIsTouch(true);
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let x = 0, y = 0, targetX = 0, targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('manga-panel')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('manga-panel')
      ) {
        setIsHovering(false);
      }
    };

    const animate = () => {
      x += (targetX - x) * 0.15;
      y += (targetY - y) * 0.15;
      if (cursor) {
        cursor.style.transform = `translate(${x}px, ${y}px)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    const raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{ willChange: 'transform' }}
    >
      <div
        className={`relative -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
          isHovering ? 'w-10 h-10' : 'w-5 h-5'
        }`}
      >
        {isHovering ? (
          <div className="w-full h-full rounded-full border-2 border-manga-red bg-manga-red/20" />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(to right, transparent 45%, #fff 45%, #fff 55%, transparent 55%),
                           linear-gradient(to bottom, transparent 45%, #fff 45%, #fff 55%, transparent 55%)`,
              filter: 'drop-shadow(0 0 2px #000)',
            }}
          />
        )}
      </div>
    </div>
  );
}
