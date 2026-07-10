import { useEffect, useRef, useState } from 'react';
import PowerBar from '../components/PowerBar';
import { Zap, Star, Trophy } from 'lucide-react';

const skills = [
  { label: 'HTML / CSS', percent: 90, color: '#E63946' },
  { label: 'JavaScript', percent: 85, color: '#FFD60A' },
  { label: 'Python', percent: 75, color: '#4361EE' },
  { label: 'React', percent: 70, color: '#61DAFB' },
  { label: 'Git & GitHub', percent: 80, color: '#E63946' },
  { label: 'UI / UX Design', percent: 65, color: '#FFD60A' },
];

const stats = [
  { label: 'Projects', value: 12, suffix: '+' },
  { label: 'Lines of Code', value: 25000, suffix: '+' },
  { label: 'Technologies', value: 15, suffix: '+' },
  { label: 'Years Learning', value: 3, suffix: '+' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 1500;
          const increment = target / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.animate-on-scroll');
            elements.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 px-4 bg-manga-bg"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-comic text-4xl md:text-5xl text-white inline-flex items-center gap-3">
            <Zap className="text-manga-yellow" size={32} />
            SKILL TREE
            <Zap className="text-manga-yellow" size={32} />
          </h2>
        </div>

        {/* Skills Panel */}
        <div
          className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-600 bg-manga-panel border-4 border-black p-6 md:p-8 mb-10"
          style={{ boxShadow: '6px 6px 0 #000', transform: 'rotate(-0.3deg)' }}
        >
          <div className="absolute inset-0 border-2 border-white/10 pointer-events-none" />

          {skills.map((skill, index) => (
            <div key={skill.label} className="relative">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-manga-yellow">
                  {skill.percent >= 85 ? <Star size={14} fill="#FFD60A" /> : <Zap size={14} />}
                </span>
              </div>
              <PowerBar
                label={skill.label}
                percent={skill.percent}
                color={skill.color}
              />
              {index === 0 && (
                <div className="absolute -right-2 top-0 bg-manga-yellow border-2 border-black px-2 py-0.5 font-comic text-xs" style={{ boxShadow: '2px 2px 0 #000' }}>
                  MAX
                </div>
              )}
            </div>
          ))}

          {/* Decorative */}
          <div className="mt-4 flex items-center gap-2">
            <Trophy size={16} className="text-manga-yellow" />
            <span className="font-comic text-sm text-manga-gray">Total Power Level: 485 / 600</span>
          </div>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-600 bg-manga-panel border-4 border-black p-4 text-center"
              style={{
                boxShadow: '4px 4px 0 #000',
                transform: `rotate(${i % 2 === 0 ? '-1' : '1'}deg)`,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div className="font-comic text-3xl md:text-4xl text-manga-red mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-body text-xs text-manga-gray uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
