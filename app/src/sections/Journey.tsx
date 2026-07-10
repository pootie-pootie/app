import { useEffect, useRef } from 'react';
import { BookOpen } from 'lucide-react';

const milestones = [
  {
    chapter: 1,
    year: '2022',
    title: 'Started Learning',
    description: 'First HTML & CSS lines written. Discovered the magic of web development and never looked back.',
    side: 'left',
  },
  {
    chapter: 2,
    year: '2023',
    title: 'First Project',
    description: 'Built a personal blog from scratch. Learned the importance of responsive design and user experience.',
    side: 'right',
  },
  {
    chapter: 3,
    year: '2024',
    title: 'Frameworks Unlocked',
    description: 'Learned React and modern JavaScript. Started building interactive single-page applications.',
    side: 'left',
  },
  {
    chapter: 4,
    year: '2025',
    title: 'Open Source',
    description: 'Contributed to community projects. Collaborated with other developers and learned from the best.',
    side: 'right',
  },
];

export default function Journey() {
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
                (el as HTMLElement).style.transform = 'translateX(0) translateY(0)';
              }, i * 250);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative py-20 px-4 bg-manga-bg"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-comic text-4xl md:text-5xl text-white inline-flex items-center gap-3">
            <BookOpen className="text-manga-yellow" size={32} />
            STORY ARC
            <BookOpen className="text-manga-yellow" size={32} />
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line - Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: 'repeating-linear-gradient(to bottom, #E63946 0, #E63946 8px, transparent 8px, transparent 16px)',
              }}
            />
          </div>

          {/* Mobile Line */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-1">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: 'repeating-linear-gradient(to bottom, #E63946 0, #E63946 8px, transparent 8px, transparent 16px)',
              }}
            />
          </div>

          {/* Milestones */}
          <div className="space-y-12 md:space-y-16">
            {milestones.map((milestone, i) => (
              <div
                key={milestone.chapter}
                className={`relative flex items-start ${
                  milestone.side === 'left'
                    ? 'md:flex-row'
                    : 'md:flex-row-reverse'
                }`}
              >
                {/* Chapter Badge - Desktop (centered) */}
                <div
                  className={`hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 animate-on-scroll opacity-0 ${
                    milestone.side === 'left' ? '-translate-x-[calc(50%+4px)]' : '-translate-x-[calc(50%-4px)]'
                  }`}
                  style={{
                    transform: `translateX(${milestone.side === 'left' ? 'calc(-50% - 4px)' : 'calc(-50% + 4px)'}) scale(0)`,
                    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                  ref={(el) => {
                    if (el) {
                      setTimeout(() => {
                        el.style.transform = `translateX(${milestone.side === 'left' ? 'calc(-50% - 4px)' : 'calc(-50% + 4px)'}) scale(1)`;
                      }, i * 250 + 100);
                    }
                  }}
                >
                  <div className="chapter-badge">
                    <span>CH.{milestone.chapter}</span>
                  </div>
                  {/* Speed lines behind badge */}
                  <div className="absolute inset-0 -z-10 animate-ink-pulse">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20">
                      {[...Array(8)].map((_, j) => (
                        <div
                          key={j}
                          className="absolute top-1/2 left-1/2 w-10 h-0.5 bg-manga-red/30 origin-left"
                          style={{ transform: `rotate(${j * 45}deg)` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Chapter Badge - Mobile */}
                <div className="md:hidden absolute left-0 z-10 animate-on-scroll opacity-0" style={{ transform: 'scale(0)', transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  ref={(el) => { if (el) setTimeout(() => { el.style.transform = 'scale(1)'; }, i * 250 + 100); }}>
                  <div className="chapter-badge w-12 h-12 text-sm">
                    <span>CH.{milestone.chapter}</span>
                  </div>
                </div>

                {/* Content Panel */}
                <div
                  className={`animate-on-scroll opacity-0 ml-16 md:ml-0 md:w-[45%] ${
                    milestone.side === 'left' ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                  style={{
                    transform: milestone.side === 'left' ? 'translateX(-30px)' : 'translateX(30px)',
                    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  <div
                    className="bg-manga-panel border-4 border-black p-5 relative"
                    style={{
                      boxShadow: '5px 5px 0 #000',
                      transform: `rotate(${milestone.side === 'left' ? -0.5 : 0.5}deg)`,
                    }}
                  >
                    <div className="absolute inset-0 border-2 border-white/10 pointer-events-none" />

                    {/* Year */}
                    <div className="font-comic text-lg text-manga-red mb-1">
                      {milestone.year}
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-bold text-lg text-white mb-2">
                      {milestone.title}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-sm text-manga-gray leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrow at bottom */}
          <div className="flex justify-center mt-12">
            <div className="text-manga-red text-4xl animate-float">
              ↓
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
