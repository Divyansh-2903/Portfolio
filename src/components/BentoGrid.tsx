'use client';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Marquee from 'react-fast-marquee';
import GlobeViz from './canvas/GlobeViz';
import MagicBento from './MagicBento';
import { Blocks, Code2, Layers, Cpu, Zap, LayoutGrid } from 'lucide-react';

// ─── Tech stack icons ──────────────────────────────────────────────────────
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

const ToolIcon: React.FC<{ tool: typeof tools[number] }> = ({ tool }) => {
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



// ─── BentoGrid (About) Section ────────────────────────────────────────────
const BentoGrid = () => {
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
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col gap-4"
        >
          {/* ── TOP ROW ─── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* Stats Column */}
            <div className="md:col-span-3 lg:col-span-2 flex flex-col gap-4">
              {[
                { stat: '21+', label: 'Projects Built' },
                { stat: '5+',  label: 'Countries' },
                { stat: '3+',  label: 'Products Launched' }
              ].map(({ stat, label }) => (
                <motion.div key={label} variants={item} className="flex-1 rounded-3xl bg-surface border border-white/5 p-6 flex flex-col items-center justify-center text-center group hover:border-white/20 transition-colors cursor-default">
                  <h4 className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat}</h4>
                  <p className="text-xs text-text-secondary">{label}</p>
                </motion.div>
              ))}
            </div>

            {/* Creative Engineer Card */}
            <motion.div
              variants={item}
              className="md:col-span-4 lg:col-span-4 min-h-[320px] rounded-3xl bg-surface border border-white/5 relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col"
            >
              <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/15 rounded-full blur-3xl group-hover:bg-primary/25 transition-colors duration-700 pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-colors duration-700 pointer-events-none" />
              <div className="flex-1 flex items-center justify-center p-8 pt-10">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-white/8 group-hover:border-primary/30 transition-colors duration-700" />
                  <div className="absolute inset-4 rounded-full border border-dashed border-white/6 animate-[spin_22s_linear_infinite] group-hover:border-primary/20 transition-colors duration-700" />
                  {[
                    { pos: 'absolute -top-1 right-4', Icon: Zap },
                    { pos: 'absolute -bottom-1 left-4', Icon: Layers },
                    { pos: 'absolute top-1/2 -translate-y-1/2 -left-1', Icon: Cpu },
                    { pos: 'absolute top-1/2 -translate-y-1/2 -right-1', Icon: LayoutGrid },
                  ].map(({ pos, Icon }, i) => (
                    <div key={i} className={`${pos} w-9 h-9 rounded-2xl bg-surface border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/40 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                      <Icon className="w-4 h-4 text-white/35 group-hover:text-primary transition-colors duration-500" strokeWidth={1.5} />
                    </div>
                  ))}
                  <div className="relative z-10 w-[4.5rem] h-[4.5rem] rounded-[1.5rem] bg-gradient-to-br from-white/12 to-white/4 border border-white/12 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500 overflow-hidden">

                    <div className="absolute inset-0 rounded-[1.5rem] bg-primary/0 group-hover:bg-primary/15 transition-colors duration-500" />
                    <Code2 className="w-8 h-8 text-white group-hover:text-primary transition-colors duration-500 relative z-10" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              <div className="relative z-10 p-6 pt-0">
                <h4 className="text-lg font-bold text-white mb-1">Creative Engineer & Architect</h4>
                <a href="#work" className="text-sm text-text-secondary flex items-center gap-1 group/link hover:text-white transition-colors duration-200 focus-visible:outline-none before:absolute before:inset-0 before:cursor-pointer">
                  Learn More <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Globe Card */}
            <motion.div
              variants={item}
              className="md:col-span-5 lg:col-span-6 rounded-3xl bg-surface border border-white/5 overflow-hidden relative group hover:border-white/20 transition-colors min-h-[320px] flex flex-col"
            >
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="w-[130%] h-[130%] flex items-center justify-center">
                  <GlobeViz />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-surface via-surface/70 to-transparent pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.5)] pointer-events-none rounded-3xl" />
              <div className="relative z-10 p-8 mt-auto flex flex-col md:items-end md:text-right">
                <h3 className="text-2xl font-bold text-white mb-2">Based in Jaipur, India</h3>
                <div className="flex items-center md:justify-end gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                  <span className="text-xs font-mono text-white/50 tracking-widest uppercase">Available Worldwide</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── MIDDLE ROW: Founder + MagicBento ─── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* Founder Card */}
            <motion.div variants={item} className="md:col-span-5 rounded-3xl bg-surface border border-white/5 overflow-hidden group hover:border-white/20 transition-colors flex flex-col sm:flex-row">
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
                  I don't just write code. I architect digital experiences that convert. My ambition has always been to bring cinematic storytelling into sophisticated web engineering.
                </p>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8">
                  From deep technical systems to front-end polish, I work from concept to execution — guided by precision and purpose.
                </p>
                <a href="#contact" className="text-sm font-bold text-white flex items-center gap-2 group/link hover:text-primary transition-colors duration-200 mt-auto focus-visible:outline-none focus-visible:underline focus-visible:decoration-primary focus-visible:underline-offset-4">
                  Work with me <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* MagicBento Skills Grid */}
            <motion.div variants={item} className="md:col-span-7 rounded-3xl overflow-hidden p-1">
              <MagicBento
                textAutoHide={true}
                enableStars
                enableSpotlight
                enableBorderGlow={true}
                enableTilt={false}
                enableMagnetism={false}
                clickEffect
                spotlightRadius={400}
                particleCount={12}
                glowColor="255, 92, 0"
                disableAnimations={false}
              />
            </motion.div>
          </div>

          {/* ── BOTTOM ROW: Toolbox ─── */}
          <motion.div variants={item} className="w-full rounded-3xl bg-surface border border-white/5 p-6 md:p-8 overflow-hidden hover:border-white/20 transition-colors">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div className="flex-shrink-0">
                <h4 className="text-sm font-bold text-white mb-1">Everyday's Toolbox</h4>
                <p className="text-xs text-text-secondary">Mastered for every project.</p>
              </div>
              <div className="hidden lg:block w-px h-16 bg-white/10 flex-shrink-0" />
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
