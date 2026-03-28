/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Components
import LoadingScreen from './components/LoadingScreen';
import GlobalElements from './components/GlobalElements';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Services from './components/Services';
import SelectedWorks from './components/SelectedWorks';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Channel from './components/Channel';
import TechStack from './components/TechStack';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative z-10"
    >
      <Hero />
      <SocialProof />
      <Services />
      <SelectedWorks />
      <About />
      <Testimonials />
      <Channel />
      <TechStack />
      <FAQ />
      <Contact />
    </motion.main>
  );
}

function CaseStudy({ id }: { id: string }) {
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
                <Route path="/work/:id" element={<CaseStudy id={location.pathname.split('/').pop() || ''} />} />
              </Routes>
            </motion.div>
          </AnimatePresence>

          <Footer />

          {/* Sticky "Available" CTA */}
          <StickyCTA />
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
          className="fixed bottom-8 right-8 z-50 px-6 py-3 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform hidden md:flex items-center gap-2"
        >
          Hire Me <span className="text-xl leading-none">&rarr;</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
