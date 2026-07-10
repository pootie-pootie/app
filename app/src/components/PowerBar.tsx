import { useRef, useState, useEffect } from 'react';

interface PowerBarProps {
  label: string;
  percent: number;
  color?: string;
}

export default function PowerBar({ label, percent, color = '#E63946' }: PowerBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setWidth(percent);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [percent]);

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="font-bold text-white text-sm tracking-wide">{label}</span>
        <span className="font-comic text-lg" style={{ color }}>
          {width}%
        </span>
      </div>
      <div className="h-5 bg-manga-accent border-2 border-black rounded-full overflow-hidden relative">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out relative"
          style={{
            width: `${width}%`,
            backgroundColor: color,
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <div
            className="absolute inset-0 overflow-hidden rounded-full"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
              style={{ width: '200%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
