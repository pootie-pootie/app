interface InkSplashProps {
  className?: string;
  size?: number;
}

export default function InkSplash({ className = '', size = 128 }: InkSplashProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`opacity-80 ${className}`}
      style={{ width: size, height: size, animation: 'ink-pulse 4s ease-in-out infinite' }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="inkGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" />
          <stop offset="100%" stopColor="#111" />
        </radialGradient>
      </defs>
      <path
        d="M100,20 Q130,10 150,40 Q180,30 190,70 Q200,100 180,130 Q190,160 160,180 Q130,200 100,190 Q70,200 40,180 Q10,160 20,130 Q0,100 10,70 Q20,30 50,40 Q70,10 100,20 Z"
        fill="url(#inkGrad)"
        stroke="none"
      />
      <path
        d="M30,30 Q40,20 50,30 Q60,40 50,50 Q40,60 30,50 Q20,40 30,30 Z"
        fill="#000"
        opacity="0.6"
      />
      <path
        d="M160,30 Q170,20 180,30 Q190,40 180,50 Q170,60 160,50 Q150,40 160,30 Z"
        fill="#000"
        opacity="0.6"
      />
      <path
        d="M30,160 Q40,150 50,160 Q60,170 50,180 Q40,190 30,180 Q20,170 30,160 Z"
        fill="#000"
        opacity="0.6"
      />
      <path
        d="M160,160 Q170,150 180,160 Q190,170 180,180 Q170,190 160,180 Q150,170 160,160 Z"
        fill="#000"
        opacity="0.6"
      />
    </svg>
  );
}
