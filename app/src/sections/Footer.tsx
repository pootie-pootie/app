import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';

const socialIcons = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Mail, href: 'mailto:alex@dev.io', label: 'Email' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-4 bg-manga-bg border-t-4 border-black">
      {/* Halftone overlay */}
      <div className="halftone-overlay opacity-[0.03]" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* "THE END... ?" */}
        <h2
          className="font-comic text-5xl md:text-7xl text-white mb-2"
          style={{ textShadow: '-3px 3px 0 #E63946, -6px 6px 0 rgba(0,0,0,0.3)' }}
        >
          THE END... ?
        </h2>

        <p className="font-comic text-lg text-manga-gray mb-2">
          ...to be continued...
        </p>

        <p className="font-body text-sm text-manga-gray mb-8 italic">
          Or is it just the beginning?
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-8">
          {socialIcons.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="w-10 h-10 flex items-center justify-center bg-manga-panel border-2 border-black text-manga-gray hover:bg-manga-red hover:text-white transition-all"
              style={{ boxShadow: '2px 2px 0 #000' }}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="font-body text-xs text-manga-gray/60">
          &copy; {new Date().getFullYear()} Alex Chen. All rights reserved.
        </p>

        <p className="font-body text-xs text-manga-gray/40 mt-2">
          Built with passion, coffee, and manga inspiration.
        </p>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-manga-yellow border-4 border-black flex items-center justify-center z-40 hover:bg-manga-red hover:text-white transition-all group"
        style={{ boxShadow: '3px 3px 0 #000' }}
        aria-label="Back to top"
      >
        <ArrowUp size={20} className="text-black group-hover:text-white transition-colors" />
      </button>

      {/* Decorative corner elements */}
      <div className="absolute top-4 left-4 text-manga-red/20 text-4xl font-comic" aria-hidden="true">✦</div>
      <div className="absolute top-4 right-4 text-manga-yellow/20 text-4xl font-comic" aria-hidden="true">✦</div>
      <div className="absolute bottom-4 left-8 text-white/10 text-3xl font-comic" aria-hidden="true">✦</div>
      <div className="absolute bottom-4 right-8 text-manga-red/20 text-3xl font-comic" aria-hidden="true">✦</div>
    </footer>
  );
}
