import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import Marquee from 'react-fast-marquee';
import { lazy, Suspense } from 'react';

// ── Lazy-load the heavy 3D canvas AFTER first paint ──────────────────────────
const InteractiveHero = lazy(() => import('./canvas/InteractiveHero'));

// ── Framer Motion variants for staggered entrance (GPU-composited transforms) ─
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
  // Mount the 3D canvas only after browser is idle (after first paint settles)
  const [mountCanvas, setMountCanvas] = useState(false);

  useEffect(() => {
    // requestIdleCallback fires after the browser is done with initial layout/paint
    const id = 'requestIdleCallback' in window
      ? (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => setMountCanvas(true))
      : setTimeout(() => setMountCanvas(true), 300);

    return () => {
      if ('cancelIdleCallback' in window) {
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id as number);
      } else {
        clearTimeout(id as ReturnType<typeof setTimeout>);
      }
    };
  }, []);

  const skills = [
    'REACT', 'NEXT.JS', 'NODE.JS', 'VIDEO EDITING', 'MOTION GRAPHICS',
    'AFTER EFFECTS', 'DIGITAL MARKETING', 'TYPESCRIPT'
  ];

  return (
    <section
      ref={container}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
    >
      {/* Background dot grid — pure CSS, no network request */}
      <div
        className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* 3D Canvas — mounted only after idle, so it never blocks LCP */}
      {mountCanvas && (
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <Suspense fallback={null}>
            <InteractiveHero />
          </Suspense>
        </div>
      )}

      {/* Main content — pure Framer Motion, no GSAP on critical path */}
      <motion.div
        className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Left Content */}
        <div className="flex flex-col gap-6 pointer-events-auto">

          {/* Headline */}
          <div className="space-y-2 overflow-hidden">
            <motion.h1
              variants={titleReveal}
              className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[100px] leading-[0.85] tracking-tight uppercase text-white drop-shadow-2xl"
            >
              I BUILD DIGITAL
              <div className="text-primary mt-2">EXPERIENCES.</div>
            </motion.h1>
          </div>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-text-secondary font-medium max-w-lg mt-4 drop-shadow-md"
          >
            Fullstack Developer · Video Editor · Motion Graphics Designer — Based in India
          </motion.p>

          {/* Name */}
          <motion.div
            variants={fadeUp}
            className="text-sm font-mono text-white/50 uppercase tracking-widest"
          >
            Divyansh Saxena
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <a
              href="#work"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-primary overflow-hidden rounded-full transition-transform hover:-translate-y-1 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f] shadow-[0_0_20px_rgba(255,92,0,0.3)] hover:shadow-[0_0_30px_rgba(255,92,0,0.5)]"
            >
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
              <span className="relative flex items-center gap-2">
                See My Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a
              href="#contact"
              className="group inline-flex items-center justify-center px-8 py-4 font-bold text-white border border-white/20 rounded-full hover:bg-white/5 transition-all hover:-translate-y-1 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:border-primary/50 backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                Let's Talk <Mail size={18} />
              </span>
            </a>
          </motion.div>
        </div>

        {/* Empty right spacer for layout balance */}
        <div className="w-full h-full hidden lg:block pointer-events-none" />
      </motion.div>

      {/* Skills Marquee */}
      <div className="absolute bottom-0 left-0 right-0 border-y border-white/10 bg-surface/50 backdrop-blur-md py-3 z-20 pointer-events-auto flex">
        <Marquee gradient={false} speed={40} autoFill className="overflow-hidden flex-1">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center">
              <span className="text-sm font-mono font-medium text-text-secondary px-8 tracking-wider">
                {skill}
              </span>
              <span className="text-primary/50 text-xs">·</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
