import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-3 left-0 right-0 z-40 h-16 transition-all duration-300 ${
        isScrolled ? 'top-3' : 'top-3'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
          className="flex items-center gap-2 relative z-50"
        >
          <span className="font-comic text-2xl text-white tracking-wider" style={{ textShadow: '2px 2px 0 #000' }}>
            MY PORTFOLIO
          </span>
          <span className="w-3 h-3 rounded-full bg-manga-red animate-pulse-glow" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
              className={`px-4 py-2 rounded-full font-comic text-sm border-2 border-black transition-all ${
                activeSection === item.href.slice(1)
                  ? 'bg-manga-red text-white'
                  : 'bg-white text-black hover:bg-manga-red hover:text-white'
              }`}
              style={{ boxShadow: '2px 2px 0 #000' }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center bg-white border-2 border-black rounded-lg"
          style={{ boxShadow: '2px 2px 0 #000' }}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} className="text-black" /> : <Menu size={20} className="text-black" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-manga-bg/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center gap-4 md:hidden">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
              className="px-8 py-3 bg-white text-black border-4 border-black font-comic text-2xl rounded-lg hover:bg-manga-red hover:text-white transition-all"
              style={{
                boxShadow: '4px 4px 0 #000',
                animation: `slide-up 0.4s ease-out ${i * 0.1}s both`,
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
