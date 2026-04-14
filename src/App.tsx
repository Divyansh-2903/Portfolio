/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type {} from 'framer-motion'; // keep tree-shaking clean
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

// Utility for suspense fallbacks (prevents footer from flashing up during lazy load)
const LoadingFallback = () => <div className="min-h-screen" />;

// Lazy Load Components
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import GlobalElements from './components/GlobalElements';
import Footer from './components/Footer';

// Lazy Load Pages only
const Hero = lazy(() => import('./components/Hero'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const Contact = lazy(() => import('./components/Contact'));
const Story = lazy(() => import('./components/Story'));
const Showcase = lazy(() => import('./components/Showcase'));
const GradualBlur = lazy(() => import('./components/GradualBlur'));
const CaseStudyDetail = lazy(() => import('./components/CaseStudyDetail'));

// Heavy Canvas components
const LaserFlow = lazy(() => import('./components/canvas/LaserFlow'));

// Global Scroll Reset
function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}

const Home: React.FC = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative z-10"
    >
      <Hero />
      <Story />
      <Showcase />
      <Contact />
    </motion.main>
  );
}

const About: React.FC = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 pt-20 pb-24"
    >
      <AboutSection />
    </motion.main>
  );
}

const Work: React.FC = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative z-10"
    >
      {/* Page-level hero header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-36 pb-0 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-0"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">[ Selected Work ]</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h1 className="font-display text-[clamp(3.5rem,10vw,9rem)] uppercase tracking-[0.02em] leading-[0.85] text-white">
              THE{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-300 to-indigo-300">
                WORK
              </span>
            </h1>
            <p className="text-white/35 font-mono text-sm leading-relaxed max-w-xs lg:text-right">
              Fullstack engineering meets<br />cinematic motion design.
            </p>
          </div>
        </motion.div>
      </div>
      {/* Showcase section fills the rest — has its own padding, tabs, cards */}
      <Showcase hideHeader />
    </motion.main>
  );
}

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  return (
    <>
      <ScrollToTop />
      
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
        <Suspense fallback={null}>
          <LaserFlow
            horizontalSizing={2.5}
            verticalSizing={20}
            wispDensity={1.5}
            wispSpeed={20}
            wispIntensity={5}
            flowSpeed={0.5}
            flowStrength={0.4}
            fogIntensity={0.35}
            fogScale={0.4}
            fogFallSpeed={0.8}
            decay={1}
            falloffStart={2}
            color="#A78BFA"
            horizontalBeamOffset={0}
            verticalBeamOffset={-0.3}
          />
        </Suspense>
      </div>

      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loading" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <GlobalElements />
          <Navbar />
          
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname}>
              <Suspense fallback={<LoadingFallback />}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/work/:id" element={<CaseStudyDetail />} />
                </Routes>
              </Suspense>
            </motion.div>
          </AnimatePresence>

          <Footer />

          {/* Sticky "Available" CTA */}
          <StickyCTA />

          <Suspense fallback={null}>
            <GlobalVignette />
          </Suspense>
        </>
      )}
    </>
  );
}

function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 40% of viewport height
      setShow(window.scrollY > window.innerHeight * 0.4);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {show && (
          <motion.a
            href="#contact"
            onClick={handleClick}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-32 right-8 z-[60] px-8 py-3.5 bg-[#a78bfa] text-[#060010] font-black tracking-widest uppercase rounded-full shadow-[0_0_30px_rgba(167,139,250,0.5)] hover:bg-white hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.7)] transition-all hidden md:flex items-center gap-2"
          >
            Hire Me <span className="text-xl leading-none">&rarr;</span>
          </motion.a>
      )}
    </AnimatePresence>
  );
}

/** Global cinematic vignette.
 *
 *  Bottom blur is hidden in two "release" zones:
 *   1. Hero zone   — scrollY < 380px  (keeps CTA buttons sharp)
 *   2. Footer zone — within 420px of page bottom (keeps footer sharp)
 *
 *  We mount/unmount GradualBlur (boolean toggle) instead of animating
 *  opacity so that we never create a compositing layer that breaks
 *  backdrop-filter.
 */
function GlobalVignette() {
  const [showBlur, setShowBlur] = useState(false);

  useEffect(() => {
    const update = () => {
      const scrollY   = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const inHero   = scrollY < 380;
      const inFooter = maxScroll - scrollY < 420;
      setShowBlur(!inHero && !inFooter);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <>
      {/* ── Top edge: CSS gradient, always visible ── */}
      <div
        className="fixed inset-x-0 top-0 pointer-events-none"
        style={{
          height: '7rem',
          background: 'linear-gradient(to bottom, rgba(6,0,16,0.92) 0%, rgba(6,0,16,0.5) 55%, transparent 100%)',
          zIndex: 40,
        }}
      />

      {/* ── Bottom blur: shown only between hero and footer zones ── */}
      {showBlur && (
        <GradualBlur position="bottom" height="5rem" strength={7} layers={9} zIndex={40} />
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
