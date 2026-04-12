/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Components
import LoadingScreen from './components/LoadingScreen';
import GlobalElements from './components/GlobalElements';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import SelectedWorks from './components/SelectedWorks';
import BentoGrid from './components/BentoGrid';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Story from './components/Story';
import GradualBlur from './components/GradualBlur';

import FlowingMenu from './components/FlowingMenu';
import LaserFlow from './components/canvas/LaserFlow';

const demoItems = [
  { link: '#', text: 'Mojave', image: 'https://picsum.photos/600/400?random=1' },
  { link: '#', text: 'Sonoma', image: 'https://picsum.photos/600/400?random=2' },
  { link: '#', text: 'Monterey', image: 'https://picsum.photos/600/400?random=3' },
  { link: '#', text: 'Sequoia', image: 'https://picsum.photos/600/400?random=4' }
];

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
      <SelectedWorks />
      <FAQ />
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
      className="relative z-10 pt-32 pb-24"
    >
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight text-white mb-4">
          About <span className="text-primary">Me</span>
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl">
          I'm a fullstack developer and creative designer crafting polished digital experiences.
        </p>
      </div>
      <BentoGrid />
      <Services />
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
      className="relative z-10 pt-32 pb-24"
    >
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight text-white mb-4">
          My <span className="text-primary">Work</span>
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl">
          A selection of recent projects and architectural explorations.
        </p>
      </div>
      <SelectedWorks />
      
      <div style={{ height: '600px', position: 'relative' }}>
        <FlowingMenu 
          items={demoItems}
          speed={15}
          textColor="#ffffff"
          bgColor="#060010"
          marqueeBgColor="#ffffff"
          marqueeTextColor="#060010"
          borderColor="#ffffff"
        />
      </div>
    </motion.main>
  );
}

const CaseStudy: React.FC<{ id: string }> = ({ id }) => {
  // Placeholder for Case Study page
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-32 px-6 max-w-7xl mx-auto"
    >
      <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tight mb-8">
        {id.toUpperCase()} CASE STUDY
      </h1>
      <p className="text-text-secondary text-xl">
        This is a placeholder for the {id} case study page.
      </p>
      <a href="/" className="inline-block mt-8 px-6 py-3 bg-primary text-white font-bold rounded-full">
        Back to Home
      </a>
    </motion.div>
  );
}

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
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
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/work" element={<Work />} />
                <Route path="/work/:id" element={<CaseStudy id={location.pathname.split('/').pop() || ''} />} />
              </Routes>
            </motion.div>
          </AnimatePresence>

          <Footer />

          {/* Sticky "Available" CTA */}
          <StickyCTA />

          <ScrollDependentBlur />
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

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#contact"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-48 right-8 z-50 px-6 py-3 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform hidden md:flex items-center gap-2"
        >
          Hire Me <span className="text-xl leading-none">&rarr;</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

function ScrollDependentBlur() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Start fading in after scrolling half of viewport, full opacity at 1 full viewport height
      const y = window.scrollY;
      const startFade = window.innerHeight * 0.5;
      const endFade = window.innerHeight;
      
      if (y <= startFade) {
        setOpacity(0);
      } else if (y >= endFade) {
        setOpacity(1);
      } else {
        setOpacity((y - startFade) / (endFade - startFade));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed inset-x-0 bottom-0 h-[7rem] pointer-events-none" 
      style={{ opacity, zIndex: 40, transition: 'opacity 0.1s linear' }}
    >
      <GradualBlur
        target="parent"
        position="bottom"
        height="7rem"
        strength={2}
        divCount={6}
        curve="bezier"
        exponential
        opacity={1}
        zIndex={0}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
