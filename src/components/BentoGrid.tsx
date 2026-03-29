'use client';
import { motion, Variants } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Blocks, Code2, Layers, Cpu, Zap, LayoutGrid } from 'lucide-react';
import Marquee from 'react-fast-marquee';
import GlobeViz from './canvas/GlobeViz';

// ─── Modern Icon Cards ─────────────────────────────────────────────────────
const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const tools = [
  { name: 'React',         bg: '#1A2A3A', color: '#61DAFB', logo: `${DEVICON_BASE}/react/react-original.svg` },
  { name: 'Next.js',       bg: '#1C1C1C', color: '#FFFFFF', logo: `${DEVICON_BASE}/nextjs/nextjs-original.svg` },
  { name: 'TypeScript',    bg: '#1A2740', color: '#3178C6', logo: `${DEVICON_BASE}/typescript/typescript-original.svg` },
  { name: 'Node.js',       bg: '#1A2A1A', color: '#339933', logo: `${DEVICON_BASE}/nodejs/nodejs-original.svg` },
  { name: 'Tailwind',      bg: '#0D2530', color: '#06B6D4', logo: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg` },
  { name: 'Supabase',      bg: '#101F1A', color: '#3ECF8E', logo: `${DEVICON_BASE}/supabase/supabase-original.svg` },
  { name: 'Figma',         bg: '#2A1A1A', color: '#F24E1E', logo: `${DEVICON_BASE}/figma/figma-original.svg` },
  { name: 'Premiere',      bg: '#1C1A2A', color: '#9999FF', logo: `${DEVICON_BASE}/premierepro/premierepro-original.svg` },
  { name: 'After Effects', bg: '#1C1A2A', color: '#9999FF', logo: `${DEVICON_BASE}/aftereffects/aftereffects-original.svg` },
  { name: 'Vercel',        bg: '#1A1A1A', color: '#FFFFFF', logo: `${DEVICON_BASE}/vercel/vercel-original.svg` },
  { name: 'Framer',        bg: '#0D0D1A', color: '#0055FF', logo: `${DEVICON_BASE}/framermotion/framermotion-original.svg` },
];

function ToolIcon({ tool }: { tool: typeof tools[number] }) {
  return (
    <div className="group/tool relative flex flex-col items-center gap-2 cursor-default" title={tool.name}>
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 transition-all duration-200 group-hover/tool:scale-105 group-hover/tool:border-white/30 shadow-lg"
        style={{ backgroundColor: tool.bg }}
      >
        <img
          src={tool.logo}
          alt={tool.name}
          className="w-8 h-8 object-contain transition-all duration-300"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
        />
      </div>
      <span className="text-[10px] font-mono text-white/40 group-hover/tool:text-white/70 transition-colors duration-200 truncate max-w-[56px] text-center">
        {tool.name}
      </span>
    </div>
  );
}

// ─── BentoGrid Component ───────────────────────────────────────────────────
const BentoGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } },
  };

  return (
    <section className="py-24 relative overflow-hidden bg-bg" id="about">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-12 flex items-center gap-4">
          <span className="text-primary font-mono text-sm tracking-widest uppercase">[ ABOUT ME ]</span>
          <ArrowRight className="w-4 h-4 text-primary animate-pulse" />
        </div>

        <motion.div
          ref={containerRef}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col gap-4"
        >
          {/* ── TOP ROW ──────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* Stats Column */}
            <div className="md:col-span-3 lg:col-span-2 flex flex-col gap-4">
              {[{ stat: '21+', label: 'Projects Built' }, { stat: '5+', label: 'Countries' }, { stat: '3+', label: 'Products Launched' }].map(({ stat, label }) => (
                <motion.div key={label} variants={item} className="flex-1 rounded-3xl bg-surface border border-white/5 p-6 flex flex-col items-center justify-center text-center group hover:border-white/20 transition-colors cursor-default">
                  <h4 className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat}</h4>
                  <p className="text-xs text-text-secondary">{label}</p>
                </motion.div>
              ))}
            </div>

            {/* ── CREATIVE ENGINEER CARD ── */}
            <motion.div
              variants={item}
              className="md:col-span-4 lg:col-span-4 min-h-[320px] rounded-3xl bg-surface border border-white/5 relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col"
            >
              {/* Ambient glow */}
              <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/15 rounded-full blur-3xl group-hover:bg-primary/25 transition-colors duration-700 pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-colors duration-700 pointer-events-none" />

              {/* Central orbital composition */}
              <div className="flex-1 flex items-center justify-center p-8 pt-10">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  {/* Outer orbit ring */}
                  <div className="absolute inset-0 rounded-full border border-white/8 group-hover:border-primary/30 transition-colors duration-700" />
                  {/* Slow spinning dashed ring */}
                  <div className="absolute inset-4 rounded-full border border-dashed border-white/6 animate-[spin_22s_linear_infinite] group-hover:border-primary/20 transition-colors duration-700" />

                  {/* Satellite: top-right */}
                  <div className="absolute -top-1 right-4 w-9 h-9 rounded-2xl bg-surface border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/40 group-hover:scale-110 transition-all duration-500 shadow-lg">
                    <Zap className="w-4 h-4 text-white/35 group-hover:text-primary transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  {/* Satellite: bottom-left */}
                  <div className="absolute -bottom-1 left-4 w-9 h-9 rounded-2xl bg-surface border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/40 group-hover:scale-110 transition-all duration-500 shadow-lg">
                    <Layers className="w-4 h-4 text-white/35 group-hover:text-primary transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  {/* Satellite: mid-left */}
                  <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-9 h-9 rounded-2xl bg-surface border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/40 group-hover:scale-110 transition-all duration-500 shadow-lg">
                    <Cpu className="w-4 h-4 text-white/35 group-hover:text-primary transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  {/* Satellite: mid-right */}
                  <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-9 h-9 rounded-2xl bg-surface border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/40 group-hover:scale-110 transition-all duration-500 shadow-lg">
                    <LayoutGrid className="w-4 h-4 text-white/35 group-hover:text-primary transition-colors duration-500" strokeWidth={1.5} />
                  </div>

                  {/* Center hub */}
                  <div className="relative z-10 w-[4.5rem] h-[4.5rem] rounded-[1.5rem] bg-gradient-to-br from-white/12 to-white/4 border border-white/12 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500">
                    <div className="absolute inset-0 rounded-[1.5rem] bg-primary/0 group-hover:bg-primary/15 transition-colors duration-500" />
                    <Code2 className="w-8 h-8 text-white group-hover:text-primary transition-colors duration-500 relative z-10" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Label */}
              <div className="relative z-10 p-6 pt-0">
                <h4 className="text-lg font-bold text-white mb-1">Creative Engineer & Architect</h4>
                <a href="#work" className="text-sm text-text-secondary flex items-center gap-1 group/link hover:text-white transition-colors duration-200 focus-visible:outline-none before:absolute before:inset-0 before:cursor-pointer">
                  Learn More <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* ── GLOBE CARD ───────────────────────────────── */}
            <motion.div
              variants={item}
              className="md:col-span-5 lg:col-span-6 rounded-3xl bg-surface border border-white/5 overflow-hidden relative group hover:border-white/20 transition-colors min-h-[320px] flex flex-col"
            >
              {/* Globe — fills the card, centered */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="w-[130%] h-[130%] flex items-center justify-center">
                  <GlobeViz />
                </div>
              </div>

              {/* Bottom vignette so text stays readable */}
              <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-surface via-surface/70 to-transparent pointer-events-none" />
              {/* Edge vignette for depth */}
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.5)] pointer-events-none rounded-3xl" />

              {/* Location label — pinned to bottom-right */}
              <div className="relative z-10 p-8 mt-auto flex flex-col md:items-end md:text-right">
                <h3 className="text-2xl font-bold text-white mb-2">Based in Jaipur, India</h3>
                <div className="flex items-center md:justify-end gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                  <span className="text-xs font-mono text-white/50 tracking-widest uppercase">Available Worldwide</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ── MIDDLE ROW ───────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* Founder Card */}
            <motion.div variants={item} className="md:col-span-8 lg:col-span-8 rounded-3xl bg-surface border border-white/5 overflow-hidden group hover:border-white/20 transition-colors flex flex-col sm:flex-row">
              <div className="w-full sm:w-2/5 aspect-square sm:aspect-auto relative">
                <img
                  src="https://picsum.photos/seed/divyansh/800/800"
                  alt="Divyansh Saxena"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-75 group-hover:brightness-100 transition-all duration-700 sepia-[.30]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-surface" />
                <div className="absolute bottom-6 left-6 z-10">
                  <h3 className="text-2xl font-bold text-white mb-1">Divyansh Saxena</h3>
                  <p className="text-xs font-mono text-white/50 uppercase tracking-wider">Founder & Creative Developer</p>
                </div>
              </div>
              <div className="w-full sm:w-3/5 p-8 flex flex-col justify-center relative z-10 bg-surface">
                <h3 className="text-2xl font-bold text-white mb-6">The Builder</h3>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-4">
                  I don't just write code. I architect digital experiences that convert. My ambition has always been to bring cinematic storytelling into sophisticated web engineering, a vision aligned with today's interactive landscape.
                </p>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8">
                  From deep technical systems to front-end polish, I work from concept to execution. I design and build experiences guided by precision, believing aesthetics only matter when they serve a clear purpose.
                </p>
                <a href="#contact" className="text-sm font-bold text-white flex items-center gap-2 group/link hover:text-primary transition-colors duration-200 mt-auto focus-visible:outline-none focus-visible:underline focus-visible:decoration-primary focus-visible:underline-offset-4">
                  Work with me <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Architecture Expert Card */}
            <motion.div variants={item} className="md:col-span-4 lg:col-span-4 min-h-[300px] rounded-3xl bg-surface border border-white/5 p-8 flex flex-col justify-between group hover:border-white/20 transition-colors overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-40 h-40 flex items-center justify-center group-hover:scale-110 transition-transform duration-700 mt-4 md:mt-0">
                  <div className="absolute w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-colors duration-700" />
                  <div className="absolute inset-0 bg-white/5 rounded-[2.5rem] rotate-12 drop-shadow-2xl backdrop-blur-3xl border border-white/10 group-hover:rotate-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-white/10 rounded-[2.5rem] -rotate-6 drop-shadow-2xl border border-white/10 group-hover:-rotate-12 transition-all duration-700 scale-90" />
                  <Blocks className="w-16 h-16 text-primary relative z-10 drop-shadow-lg" strokeWidth={1.5} />
                </div>
              </div>
              <div className="relative z-10 mt-8">
                <h4 className="text-lg font-bold text-white mb-1">Architecture Expert</h4>
                <a href="#services" className="text-sm text-text-secondary flex items-center gap-1 group/link hover:text-white transition-colors duration-200 focus-visible:outline-none before:absolute before:inset-0 before:cursor-pointer">
                  Learn More <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

          </div>

          {/* ── BOTTOM ROW: Modern Toolbox ────────────────────── */}
          <motion.div variants={item} className="w-full rounded-3xl bg-surface border border-white/5 p-6 md:p-8 overflow-hidden hover:border-white/20 transition-colors">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">

              {/* Label */}
              <div className="flex-shrink-0">
                <h4 className="text-sm font-bold text-white mb-1">Everyday's Toolbox</h4>
                <p className="text-xs text-text-secondary">Mastered for every project.</p>
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px h-16 bg-white/10 flex-shrink-0" />

              {/* Icon marquee */}
              <div className="flex-1 w-full overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
                <Marquee gradient={false} speed={40} direction="right" autoFill pauseOnHover>
                  {tools.map((tool, idx) => (
                    <div key={idx} className="mr-4 lg:mr-6">
                      <ToolIcon tool={tool} />
                    </div>
                  ))}
                </Marquee>
              </div>

            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default BentoGrid;
