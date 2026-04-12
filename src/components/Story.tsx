import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'DISCOVERY',
    subtitle: 'We listen before we build.',
    desc: 'Every great product begins with deep understanding. I align your business vision, user psychology, and technical constraints into a crystal-clear roadmap before a single line of code is written.',
    accent: 'Strategy · Research · Architecture',
  },
  {
    num: '02',
    title: 'DESIGN & MOTION',
    subtitle: 'Interfaces that feel alive.',
    desc: 'Not just static screens — I craft the cinematic motion, micro-interactions, and interaction design that makes users feel something. Every frame is intentional.',
    accent: 'UI Design · Motion · Interaction',
  },
  {
    num: '03',
    title: 'DEVELOPMENT',
    subtitle: 'Buttery smooth. Blazing fast.',
    desc: 'Clean, scalable code engineered from the ground up for performance. I build for the edge — real-world rendering, core web vitals, and accessibility that passes every audit.',
    accent: 'React · Next.js · Node.js · TypeScript',
  },
  {
    num: '04',
    title: 'DELIVERY',
    subtitle: 'Shipped. Polished. Impressive.',
    desc: 'Final QA, SEO, deployment, and ongoing support. You get a digital presence that converts visitors into believers — and leaves a lasting impression.',
    accent: 'Launch · SEO · Analytics · Support',
  },
];

/** A single step card with parallax scroll reveal */
const StepCard: React.FC<{ step: typeof steps[number]; index: number }> = ({ step, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'start 0.3'] });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-start py-16 border-b border-white/5 last:border-0"
    >
      {/* Step number — large decorative */}
      <div className="flex-shrink-0 relative">
        <span className="font-numbers font-bold text-[5rem] md:text-[7rem] leading-none text-white/5 select-none">
          {step.num}
        </span>
        <span className="absolute top-2 left-4 font-mono text-xs text-primary tracking-widest uppercase">
          Step {step.num}
        </span>
      </div>

      {/* Content */}
      <div className="max-w-2xl">
        <h3 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-white mb-3">
          {step.title}
        </h3>
        <p className="text-base font-medium text-primary/80 mb-5 italic">{step.subtitle}</p>
        <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-6">
          {step.desc}
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/8 text-xs font-mono text-white/40 tracking-wider">
          {step.accent}
        </div>
      </div>
    </motion.div>
  );
}

export default function Story() {
  return (
    <section className="bg-bg relative" id="process">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-20 pb-0">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-primary font-mono text-sm tracking-widest uppercase">[ The Process ]</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight text-white max-w-3xl leading-[0.9]">
          HOW I <span className="text-primary">WORK</span>
        </h2>
      </div>

      {/* Steps */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-24">
        {steps.map((step, i) => (
          <StepCard key={i} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
