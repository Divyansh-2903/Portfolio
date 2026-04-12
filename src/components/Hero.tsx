import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

import RotatingText from './RotatingText';


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

  return (
    <section
      ref={container}
      className="relative min-h-screen h-screen flex flex-col justify-center items-center overflow-hidden pt-20"
    >
      {/* Main content — centered layout using more of the full screen */}
      <motion.div
        className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10 relative pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Subtitle / Rotating Text (Placed ABOVE headline) */}
        <motion.div
           variants={fadeUp}
           className="flex flex-col items-center gap-4 mb-6 pointer-events-auto"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="font-display text-xl md:text-2xl lg:text-3xl text-white uppercase tracking-tight drop-shadow-md">
              Crafting Digital Experiences for
            </span>
            <RotatingText
              texts={['Startups', 'Founders', 'Brands', 'Creators', 'Dreamers']}
              mainClassName="w-[160px] md:w-[200px] lg:w-[220px] flex justify-center items-center px-4 py-1.5 bg-primary/20 border border-primary/50 text-primary shadow-[0_0_15px_rgba(167,139,250,0.4)] overflow-hidden rounded-xl font-display text-xl md:text-2xl lg:text-3xl uppercase tracking-tight whitespace-nowrap"
              staggerFrom="last"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-120%' }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5"
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>
        </motion.div>

        {/* Headline */}
        <div className="w-full flex justify-center items-center mb-6">
          <motion.h1
            variants={titleReveal}
            className="font-display text-[12vw] sm:text-[11vw] md:text-[10vw] lg:text-[150px] leading-none tracking-tighter uppercase grid grid-cols-2 gap-3 sm:gap-8 md:gap-16 lg:gap-24 z-10 mix-blend-screen w-full"
          >
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] text-right">DIVYANSH</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-300 to-indigo-300 drop-shadow-[0_0_30px_rgba(167,139,250,0.6)] text-left">SAXENA</span>
          </motion.h1>
        </div>

        {/* Sub-subtitle */}
        <motion.p 
          variants={fadeUp}
          className="text-sm md:text-base text-white w-full max-w-xl font-bold tracking-wide uppercase mt-2 mb-32 drop-shadow-lg"
        >
          Fullstack Developer &nbsp;&middot;&nbsp; UI/UX Designer &nbsp;&middot;&nbsp; Motion Graphics
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-6 pt-4 pointer-events-auto relative z-50 w-full"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white border border-white/20 bg-[#080808]/60 backdrop-blur-lg rounded-full hover:bg-white/10 transition-all hover:-translate-y-1 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:border-primary/50 text-lg sm:text-xl"
          >
            <span className="flex items-center gap-3">
              Let's Talk <Mail size={22} />
            </span>
          </a>

          <a
            href="#work"
            className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white bg-primary shadow-[0_0_30px_rgba(167,139,250,0.5)] overflow-hidden rounded-full transition-transform hover:-translate-y-1 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f] text-lg sm:text-xl"
          >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
            <span className="relative flex items-center gap-3">
              See My Work <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
