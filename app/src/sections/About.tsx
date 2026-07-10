import { useEffect, useRef } from 'react';
import MangaPanel from '../components/MangaPanel';
import InkSplash from '../components/InkSplash';
import { Star, Heart, Zap, Shield } from 'lucide-react';

const characterStats = [
  { label: 'Name', value: 'Alex Chen', icon: null },
  { label: 'Class', value: 'Full-Stack Developer', icon: null },
  { label: 'Level', value: '24', icon: null, highlight: true },
  { label: 'HP', value: '100/100', icon: Heart, bar: true, barColor: '#E63946', barPercent: 100 },
  { label: 'MP', value: '85/100', icon: Zap, bar: true, barColor: '#4361EE', barPercent: 85 },
  { label: 'Special Ability', value: 'Code Alchemy', icon: Star },
  { label: 'Mission', value: 'Build amazing web experiences', icon: Shield },
];

export default function About() {
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
              }, i * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 px-4 bg-manga-bg"
    >
      {/* Ink Splash Decoration */}
      <div className="absolute top-10 right-10 opacity-30 pointer-events-none">
        <InkSplash size={200} />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-comic text-4xl md:text-5xl text-white inline-block relative">
            CHARACTER PROFILE
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-manga-red" />
          </h2>
        </div>

        {/* Two Panel Layout */}
        <div className="grid md:grid-cols-5 gap-6">
          {/* Left Panel - Character Stats */}
          <div className="md:col-span-2">
            <MangaPanel rotation={-0.5} className="h-full">
              <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-600">
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full border-4 border-black overflow-hidden bg-manga-panel">
                    <img
                      src="/images/hero-portrait.png"
                      alt="Character avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  {characterStats.map((stat) => (
                    <div key={stat.label} className="flex flex-col">
                      <div className="flex items-center gap-2">
                        {stat.icon && <stat.icon size={14} className="text-manga-yellow" />}
                        <span className="font-comic text-sm text-manga-gray">{stat.label}:</span>
                        <span className={`font-body text-sm font-semibold ${stat.highlight ? 'text-manga-red' : 'text-white'}`}>
                          {stat.value}
                        </span>
                      </div>
                      {stat.bar && (
                        <div className="mt-1 h-3 bg-manga-accent border-2 border-black rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${stat.barPercent}%`,
                              backgroundColor: stat.barColor,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Decorative Badge */}
                <div className="mt-4 flex justify-center">
                  <div className="bg-manga-yellow border-2 border-black px-3 py-1 font-comic text-xs text-black" style={{ boxShadow: '2px 2px 0 #000' }}>
                    ★ RANK: S-CLASS
                  </div>
                </div>
              </div>
            </MangaPanel>
          </div>

          {/* Right Panel - Biography */}
          <div className="md:col-span-3">
            <MangaPanel rotation={0.5} className="h-full">
              <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-600">
                <h3 className="font-heading font-bold text-xl text-white mb-4">
                  About Me
                </h3>

                <div className="space-y-4 text-manga-gray leading-relaxed">
                  <p>
                    Hey! I'm <span className="bg-manga-yellow text-black px-1 font-semibold">Alex</span>, a passionate student and aspiring developer currently in my 3rd year of Computer Science. I discovered coding back in 2022 and have been hooked ever since — there's something magical about turning ideas into reality through code.
                  </p>

                  <p>
                    When I'm not debugging or learning new frameworks, you'll find me reading manga, drawing, or exploring the latest tech trends. I believe great design and solid engineering go hand in hand — just like the perfect blend of story and artwork in a good manga.
                  </p>

                  <p>
                    My goal? To become a <span className="bg-manga-yellow text-black px-1 font-semibold">full-stack developer</span> who can craft beautiful, performant, and user-friendly web applications. I'm always eager to learn, collaborate, and take on new challenges.
                  </p>
                </div>

                {/* Quote Bubble */}
                <div className="mt-6 speech-bubble left text-base max-w-sm">
                  "I turn coffee into code and dreams into reality."
                </div>

                {/* Info Grid */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="bg-manga-accent border-2 border-black p-3" style={{ boxShadow: '2px 2px 0 #000' }}>
                    <span className="font-comic text-xs text-manga-gray block">School</span>
                    <span className="font-body text-sm text-white font-semibold">Tech University</span>
                  </div>
                  <div className="bg-manga-accent border-2 border-black p-3" style={{ boxShadow: '2px 2px 0 #000' }}>
                    <span className="font-comic text-xs text-manga-gray block">Grade</span>
                    <span className="font-body text-sm text-white font-semibold">3rd Year</span>
                  </div>
                  <div className="bg-manga-accent border-2 border-black p-3" style={{ boxShadow: '2px 2px 0 #000' }}>
                    <span className="font-comic text-xs text-manga-gray block">Location</span>
                    <span className="font-body text-sm text-white font-semibold">San Francisco, CA</span>
                  </div>
                  <div className="bg-manga-accent border-2 border-black p-3" style={{ boxShadow: '2px 2px 0 #000' }}>
                    <span className="font-comic text-xs text-manga-gray block">Email</span>
                    <span className="font-body text-sm text-white font-semibold">alex@dev.io</span>
                  </div>
                </div>
              </div>
            </MangaPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
