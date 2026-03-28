import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { useLenis } from 'lenis/react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSoundEnabled, toggleSound } = useSoundEffects();
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href === 'body' ? 0 : href, { offset: -80 });
    } else {
      // Fallback
      if (href === 'body') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div 
          className={`pointer-events-auto flex items-center justify-between transition-all duration-500 rounded-full px-6 py-3 ${
            scrolled ? 'bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 w-full max-w-4xl' : 'bg-transparent w-full max-w-7xl'
          }`}
        >
          {/* Logo */}
          <a 
            href="#top" 
            onClick={(e) => handleNavClick(e, 'body')}
            className={`font-mono font-bold tracking-tighter text-white transition-all ${scrolled ? 'text-lg' : 'text-2xl'}`}
          >
            DIVYANSH<span className="text-primary">.</span>
          </a>

          {/* Desktop Links (Pill Container) */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/5 rounded-full p-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-text-secondary hover:text-white px-5 py-2 rounded-full hover:bg-white/10 transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSound}
              className="text-text-secondary hover:text-primary p-2 rounded-full hover:bg-white/5 transition-all focus:outline-none"
              aria-label="Toggle Sound"
            >
              {isSoundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>

            <div className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 transition-colors ${scrolled ? 'bg-primary/20 border-primary/30' : 'bg-white/5 backdrop-blur-sm'}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span className={`text-xs font-bold ${scrolled ? 'text-white' : 'text-white'}`}>Available</span>
            </div>

            <button
              className="md:hidden text-white p-2 rounded-full bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-5xl font-display text-white hover:text-primary transition-colors uppercase tracking-tight"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
