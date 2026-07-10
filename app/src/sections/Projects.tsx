import { useEffect, useRef } from 'react';
import { ExternalLink, Github, Crosshair } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'A responsive personal portfolio built with HTML, CSS, and JavaScript. Features smooth animations, dark mode, and mobile-first design.',
    image: '/images/project-1.jpg',
    tags: ['html', 'css', 'js'],
    github: '#',
    demo: '#',
    rotation: -1,
    isNew: true,
  },
  {
    id: 2,
    title: 'Weather Dashboard',
    description: 'Real-time weather app with location-based forecasts, interactive charts, and a beautiful dark UI. Uses OpenWeatherMap API.',
    image: '/images/project-2.jpg',
    tags: ['js', 'css', 'react'],
    github: '#',
    demo: '#',
    rotation: 1,
    isNew: false,
  },
  {
    id: 3,
    title: 'Task Manager',
    description: 'A Kanban-style task management app with drag-and-drop, priority levels, and progress tracking. Built with React and local storage.',
    image: '/images/project-3.jpg',
    tags: ['react', 'css', 'js'],
    github: '#',
    demo: '#',
    rotation: -0.5,
    isNew: false,
  },
  {
    id: 4,
    title: 'Blog Platform',
    description: 'A clean, modern blog platform with markdown support, comment system, and responsive article layouts.',
    image: '/images/project-4.jpg',
    tags: ['html', 'css', 'python'],
    github: '#',
    demo: '#',
    rotation: 0.8,
    isNew: false,
  },
];

export default function Projects() {
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
              }, i * 200);
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
      id="projects"
      ref={sectionRef}
      className="relative py-20 px-4 bg-manga-bg"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-comic text-4xl md:text-5xl text-white inline-flex items-center gap-3">
            <Crosshair className="text-manga-red" size={32} />
            MISSION LOG
            <Crosshair className="text-manga-red" size={32} />
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 group"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div
                className="relative bg-manga-panel border-4 border-black overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  transform: `rotate(${project.rotation}deg)`,
                  boxShadow: '6px 6px 0 #000',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '8px 8px 0 #E63946';
                  (e.currentTarget as HTMLElement).style.transform = 'rotate(0deg) translateY(-6px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0 #000';
                  (e.currentTarget as HTMLElement).style.transform = `rotate(${project.rotation}deg)`;
                }}
              >
                {/* Inner highlight */}
                <div className="absolute inset-0 border-2 border-white/10 pointer-events-none z-10" />

                {/* Corner Brackets */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-4 border-l-4 border-black z-10 pointer-events-none" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-4 border-r-4 border-black z-10 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-4 border-l-4 border-black z-10 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-4 border-r-4 border-black z-10 pointer-events-none" />

                {/* Project Label */}
                <div className="bg-white border-b-4 border-black px-4 py-2 flex items-center justify-between">
                  <span className="font-comic text-sm text-black">PROJECT #{project.id}</span>
                  {project.isNew && (
                    <span className="bg-manga-red text-white font-comic text-xs px-2 py-0.5 border-2 border-black" style={{ boxShadow: '1px 1px 0 #000' }}>
                      NEW!
                    </span>
                  )}
                </div>

                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Screen Tone Overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '4px 4px',
                  }} />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-comic text-xl text-white mb-2">{project.title}</h3>
                  <p className="font-body text-sm text-manga-gray mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`tech-tag ${tag} uppercase`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      className="flex items-center gap-1.5 px-3 py-2 bg-white text-black border-2 border-black font-comic text-sm hover:bg-manga-red hover:text-white transition-colors"
                      style={{ boxShadow: '2px 2px 0 #000' }}
                    >
                      <Github size={14} />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center gap-1.5 px-3 py-2 bg-manga-yellow text-black border-2 border-black font-comic text-sm hover:bg-manga-red hover:text-white transition-colors"
                      style={{ boxShadow: '2px 2px 0 #000' }}
                    >
                      <ExternalLink size={14} />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
