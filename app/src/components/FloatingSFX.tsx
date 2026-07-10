interface FloatingSFXProps {
  text: string;
  x: number;
  y: number;
  color: string;
  rotation: number;
  delay: number;
}

export default function FloatingSFX({ text, x, y, color, rotation, delay }: FloatingSFXProps) {
  const animDuration = 3 + Math.random() * 2;
  const floatId = `float-${text.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <>
      <style>{`
        @keyframes ${floatId} {
          0% { transform: rotate(${rotation}deg) translateY(0px); }
          100% { transform: rotate(${rotation}deg) translateY(-12px); }
        }
      `}</style>
      <h2
        className="absolute font-comic text-4xl md:text-6xl font-bold select-none pointer-events-none hidden md:block"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          color,
          transform: `rotate(${rotation}deg)`,
          animation: `${floatId} ${animDuration}s ease-in-out ${delay}s infinite alternate`,
          textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        }}
        aria-hidden="true"
      >
        {text}
      </h2>
    </>
  );
}
