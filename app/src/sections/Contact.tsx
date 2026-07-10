import { useState, useEffect, useRef } from 'react';
import MangaPanel from '../components/MangaPanel';
import InkSplash from '../components/InkSplash';
import { Mail, Send, Github, Linkedin, Twitter, MessageCircle } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', icon: Github, username: '@alexchen', href: '#' },
  { name: 'LinkedIn', icon: Linkedin, username: 'Alex Chen', href: '#' },
  { name: 'Twitter', icon: Twitter, username: '@alex_codes', href: '#' },
  { name: 'Email', icon: Mail, username: 'alex@dev.io', href: 'mailto:alex@dev.io' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 px-4 bg-manga-bg"
    >
      {/* Ink Splash Background */}
      <div className="absolute bottom-0 left-0 opacity-20 pointer-events-none">
        <InkSplash size={300} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-comic text-4xl md:text-5xl text-white inline-flex items-center gap-3">
            <Mail className="text-manga-red" size={32} />
            SEND A MESSAGE
            <Mail className="text-manga-red" size={32} />
          </h2>
        </div>

        {/* Two Panel Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left - Contact Form */}
          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-600">
            <MangaPanel rotation={-0.5}>
              <h3 className="font-comic text-xl text-white mb-5 flex items-center gap-2">
                <MessageCircle size={20} className="text-manga-yellow" />
                Contact Form
              </h3>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="font-comic text-3xl text-manga-yellow mb-2">MESSAGE SENT!</div>
                  <div className="text-manga-gray text-sm">I'll get back to you soon!</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="font-comic text-sm text-manga-gray block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="comic-input"
                      placeholder="Enter your name..."
                    />
                  </div>

                  <div>
                    <label className="font-comic text-sm text-manga-gray block mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="comic-input"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="font-comic text-sm text-manga-gray block mb-1">Your Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="comic-input resize-none"
                      placeholder="Write your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full action-button text-lg mt-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">⚡</span> TRANSMITTING...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send size={18} />
                        TRANSMIT!
                      </span>
                    )}
                  </button>
                </form>
              )}
            </MangaPanel>
          </div>

          {/* Right - Social Links */}
          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-600" style={{ transitionDelay: '200ms' }}>
            <MangaPanel rotation={0.5} className="h-full">
              <h3 className="font-comic text-xl text-white mb-5">Connect With Me</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {socialLinks.map((link, i) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="social-card"
                    style={{
                      transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)`,
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <link.icon size={24} className="text-manga-yellow flex-shrink-0" />
                    <div>
                      <div className="font-comic text-sm text-white">{link.name}</div>
                      <div className="font-body text-xs text-manga-gray">{link.username}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Decorative Message */}
              <div className="mt-6 p-4 bg-manga-accent border-2 border-black" style={{ boxShadow: '3px 3px 0 #000' }}>
                <p className="font-body text-sm text-manga-gray italic">
                  "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions."
                </p>
              </div>

              {/* Star decorations */}
              <div className="flex justify-center gap-2 mt-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="text-manga-yellow text-sm animate-star-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </MangaPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
