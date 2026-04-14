import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = React.memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lenis = useLenis();
  const navigate = useNavigate();
  const location = useLocation();

  const [activePath, setActivePath] = useState(location.pathname + location.hash || '/');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActivePath(location.pathname + location.hash || '/');
  }, [location]);

  const navLinks = [
    { name: 'Home',    href: '/'        },
    { name: 'Work',    href: '/work'    },
    { name: 'About',   href: '/about'   },
    { name: 'Contact', href: '/#contact'},
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActivePath(href);
    
    // Hash link handling (e.g. #contact)
    if (href.startsWith('/#')) {
      const id = href.substring(1); // #contact or some id
      if (location.pathname !== '/') {
        navigate('/');
        // Use a short timeout to let the fast route change happen
        setTimeout(() => {
          if (lenis) lenis.scrollTo(id, { offset: -80, immediate: true });
          else document.querySelector(id)?.scrollIntoView({ behavior: 'instant' });
        }, 50);
      } else {
        if (lenis) lenis.scrollTo(id, { offset: -80, immediate: true });
        else document.querySelector(id)?.scrollIntoView({ behavior: 'instant' });
      }
      return;
    }

    // Regular link handling
    if (location.pathname === href) {
      // Already on the page, force scroll to top
      if (lenis) lenis.scrollTo(0, { immediate: false });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to new page
      navigate(href);
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none"
      >
        <div 
          className={`pointer-events-auto relative overflow-hidden flex items-center justify-between transition-all duration-500 rounded-full px-6 py-3 ${
            scrolled ? 'bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 w-full max-w-4xl' : 'bg-transparent w-full max-w-7xl'
          }`}
        >

          {/* Logo */}
          <a 
            href="/" 
            onClick={(e) => handleNavClick(e, '/')}
            className={`font-mono font-bold tracking-tighter text-white transition-all relative z-10 ${scrolled ? 'text-lg' : 'text-2xl'}`}
          >
            DIVYANSH<span className="text-primary">.</span>
          </a>

          {/* Desktop Links (Pill Container) */}
          <div className="hidden md:flex items-center gap-1 bg-[#080808]/60 backdrop-blur-lg border border-white/10 rounded-full p-1 relative z-10">
            {navLinks.map((link) => {
              const isActive = activePath === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative z-10 text-sm font-medium px-5 py-2 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-black ${
                    isActive ? 'text-black' : 'text-white hover:text-white/80 hover:bg-white/10'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4 relative z-10">


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
                  className="text-5xl font-display text-white hover:text-primary transition-colors duration-200 uppercase tracking-tight focus-visible:outline-none focus-visible:underline focus-visible:decoration-primary focus-visible:underline-offset-8"
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
});

Navbar.displayName = 'Navbar';
export default Navbar;
