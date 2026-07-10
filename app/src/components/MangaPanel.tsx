import type { ReactNode } from 'react';

interface MangaPanelProps {
  children: ReactNode;
  rotation?: number;
  className?: string;
}

export default function MangaPanel({ children, rotation = 0, className = '' }: MangaPanelProps) {
  return (
    <div
      className={`manga-panel relative bg-manga-panel border-4 border-black p-6 ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        boxShadow: '6px 6px 0 #000',
      }}
    >
      {children}
      <div className="absolute inset-0 border-2 border-white/10 pointer-events-none" />
    </div>
  );
}
