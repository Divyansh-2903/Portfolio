import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

import RotatingText from './RotatingText';
import { usePerformanceProfile } from '../lib/performance';


// ── Framer Motion variants for staggered entrance ─────────────────────────
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const titleReveal = {
  hidden: { opacity: 0, y: 48, skewY: 3 },
  show: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const { reducedMotion, lowPowerHardware, smallScreen } = usePerformanceProfile();
  const simplifyMotion = reducedMotion || lowPowerHardware || smallScreen;

  // Scroll-driven blur/fade — activates the moment user starts scrolling
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start'],
  });
  const blurFilter  = useTransform(scrollYProgress, [0, 0.55], ['blur(0px)', simplifyMotion ? 'blur(0px)' : 'blur(12px)']);
  const scrollOp    = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const scrollY     = useTransform(scrollYProgress, [0, 0.55], [0, simplifyMotion ? -12 : -40]);

  return (
    <section
      id="hero-section"
      ref={container}
      className="relative min-h-[100svh] flex flex-col justify-center items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Main content — centered layout using more of the full screen */}
      {/* Scroll blur wrapper — drives blur + fade as hero leaves viewport */}
      <motion.div
        style={{ filter: blurFilter, opacity: scrollOp, y: scrollY }}
        className="w-full relative z-[50]"
      >
      <motion.div
        className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-[50] pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Subtitle / Rotating Text (Placed ABOVE headline) */}
        <motion.div
           variants={fadeUp}
           className="flex flex-col items-center gap-4 mb-6 pointer-events-auto"
        >
          <motion.div layout className="flex flex-wrap items-baseline justify-center w-full text-center">
            <motion.span layout className="font-display text-xl md:text-2xl lg:text-3xl text-white uppercase tracking-tight drop-shadow-md pr-3">
              Crafting Digital Experiences for
            </motion.span>
            <RotatingText
              texts={['Startups', 'Founders', 'Brands', 'Creators', 'Dreamers']}
              mainClassName="inline-flex justify-start font-display text-xl md:text-2xl lg:text-3xl uppercase tracking-tight text-purple-300 whitespace-nowrap drop-shadow-[0_0_20px_rgba(216,180,254,0.5)]"
              staggerFrom="first"
              initial={simplifyMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(4px)' }}
              animate={simplifyMotion ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)' }}
              exit={simplifyMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(4px)' }}
              staggerDuration={simplifyMotion ? 0 : 0.04}
              splitLevelClassName="pb-0"
              transition={{ type: 'tween', duration: 0.1 }}
              rotationInterval={simplifyMotion ? 4500 : 3000}
              splitBy={simplifyMotion ? 'words' : 'characters'}
            />
          </motion.div>
        </motion.div>

        {/* Headline */}
        <div className="w-full flex justify-center items-center mb-6">
          <motion.h1
            variants={titleReveal}
            className="font-display text-[clamp(3.4rem,12vw,9rem)] leading-none tracking-tighter uppercase grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-8 md:gap-16 lg:gap-20 z-10 sm:mix-blend-screen w-full"
          >
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] text-center sm:text-right">DIVYANSH</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-300 to-indigo-300 drop-shadow-glow-md text-center sm:text-left">SAXENA</span>
          </motion.h1>
        </div>

        {/* Sub-subtitle */}
        <motion.p 
          variants={fadeUp}
          className="text-sm md:text-base text-white w-full max-w-xl font-bold tracking-wide uppercase mt-2 mb-14 md:mb-24 drop-shadow-lg px-4"
        >
          Fullstack Developer &nbsp;&middot;&nbsp; UI/UX Designer &nbsp;&middot;&nbsp; Motion Graphics
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
           variants={fadeUp}
           className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pt-4 pointer-events-auto relative z-[60] w-full px-4"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center px-7 sm:px-10 py-4 sm:py-5 font-bold text-white border border-white/20 bg-[#080808]/70 sm:backdrop-blur-lg rounded-full hover:bg-white/10 transition-all hover:-translate-y-1 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:border-primary/50 text-base sm:text-xl"
          >
            <span className="flex items-center gap-3">
              Let's Talk <Mail size={22} />
            </span>
          </a>

          <a
            href="#work"
            className="group relative inline-flex items-center justify-center px-7 sm:px-10 py-4 sm:py-5 font-bold text-[#060010] bg-gradient-to-br from-primary via-purple-300 to-indigo-300 shadow-[0_0_24px_rgba(167,139,250,0.25)] overflow-hidden rounded-full transition-all hover:-translate-y-1 hover:shadow-[0_0_36px_rgba(167,139,250,0.45)] active:translate-y-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f] text-base sm:text-xl"
          >
            <span className="absolute inset-0 w-full h-full rounded-full opacity-60 bg-gradient-to-b from-white/40 to-transparent mix-blend-overlay" />
            <span className="relative flex items-center gap-3">
              See My Work <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </motion.div>
      </motion.div>
      </motion.div>
    </section>
  );
}
