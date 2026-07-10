import { useState, useEffect } from 'react';

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  opacity: number;
}

export default function SpeedLines() {
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    const generateLines = () => {
      const newLines: Line[] = [];
      for (let angle = 0; angle < 360; angle += 2) {
        const rad = (angle * Math.PI) / 180;
        const x2 = 50 + 50 * Math.cos(rad);
        const y2 = 50 + 50 * Math.sin(rad);
        newLines.push({
          x1: 50,
          y1: 50,
          x2,
          y2,
          width: Math.random() * 0.8 + 0.2,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
      setLines(newLines);
    };

    generateLines();

    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(generateLines, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full animate-spin-slow"
      aria-hidden="true"
    >
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="#000"
          strokeWidth={l.width}
          opacity={l.opacity}
        />
      ))}
      <circle cx="50" cy="50" r="15" fill="#111111" />
    </svg>
  );
}
