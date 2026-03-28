'use client';
import { motion, Variants } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const tools = [
  { name: 'React', color: '#61DAFB', logo: `${DEVICON_BASE}/react/react-original.svg` },
  { name: 'Next.js', color: '#FFFFFF', logo: `${DEVICON_BASE}/nextjs/nextjs-original.svg` },
  { name: 'Node.js', color: '#339933', logo: `${DEVICON_BASE}/nodejs/nodejs-original.svg` },
  { name: 'TypeScript', color: '#3178C6', logo: `${DEVICON_BASE}/typescript/typescript-original.svg` },
  { name: 'Tailwind', color: '#06B6D4', logo: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg` },
  { name: 'Supabase', color: '#3ECF8E', logo: `${DEVICON_BASE}/supabase/supabase-original.svg` },
  { name: 'Vercel', color: '#FFFFFF', logo: `${DEVICON_BASE}/vercel/vercel-original.svg` },
  { name: 'Figma', color: '#F24E1E', logo: `${DEVICON_BASE}/figma/figma-original.svg` },
  { name: 'Premiere', color: '#9999FF', logo: `${DEVICON_BASE}/premierepro/premierepro-original.svg` },
  { name: 'After Effects', color: '#9999FF', logo: `${DEVICON_BASE}/aftereffects/aftereffects-original.svg` },
  { name: 'Framer', color: '#0055FF', logo: `${DEVICON_BASE}/framermotion/framermotion-original.svg` },
];

function ToolLogo({ tool }: { tool: any }) {
  if (tool.logo) {
    return (
      <img
        src={tool.logo}
        alt={tool.name}
        className="w-8 h-8 md:w-10 md:h-10 object-contain transition-all duration-300 filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
        onError={(e) => {
          const img = e.currentTarget;
          img.style.display = 'none';
          const sib = img.nextElementSibling as HTMLElement | null;
          if (sib) sib.style.display = 'flex';
        }}
      />
    );
  }
  return (
    <div
      className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-lg font-bold font-mono transition-transform duration-300 filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 hover:scale-110"
      style={{ backgroundColor: `${tool.color}22`, color: tool.color }}
    >
      {tool.name.charAt(0)}
    </div>
  );
}

const BentoGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } },
  };

  return (
    <section className="py-24 relative overflow-hidden bg-bg" id="about">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-12 flex items-center gap-4">
          <span className="text-primary font-mono text-sm tracking-widest uppercase">[ ABOUT US ]</span>
          <ArrowRight className="w-4 h-4 text-primary animate-pulse" />
        </div>

        <motion.div
          ref={containerRef}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-4"
        >
          {/* TOP ROW: Stats + Visual + Earth Location */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Left: Stats Column */}
            <div className="md:col-span-3 lg:col-span-2 flex flex-col gap-4">
              <motion.div variants={item} className="flex-1 rounded-3xl bg-surface border border-white/5 p-6 flex flex-col items-center justify-center text-center group hover:border-white/20 transition-colors cursor-default">
                <h4 className="text-4xl lg:text-5xl font-bold text-white mb-2">21+</h4>
                <p className="text-xs text-text-secondary">Projects Built</p>
              </motion.div>
              <motion.div variants={item} className="flex-1 rounded-3xl bg-surface border border-white/5 p-6 flex flex-col items-center justify-center text-center group hover:border-white/20 transition-colors cursor-default relative overflow-hidden">
                <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                <h4 className="text-4xl lg:text-5xl font-bold text-white mb-2">5+</h4>
                <p className="text-xs text-text-secondary">Countries</p>
              </motion.div>
              <motion.div variants={item} className="flex-1 rounded-3xl bg-surface border border-white/5 p-6 flex flex-col items-center justify-center text-center group hover:border-white/20 transition-colors cursor-default">
                <h4 className="text-4xl lg:text-5xl font-bold text-white mb-2">3+</h4>
                <p className="text-xs text-text-secondary">Products Launched</p>
              </motion.div>
            </div>

            {/* Middle: 3D / Brand Visual Placeholder */}
            <motion.div variants={item} className="md:col-span-4 lg:col-span-4 min-h-[320px] rounded-3xl bg-surface border border-white/5 p-8 relative overflow-hidden group hover:border-white/20 transition-colors flex flex-col justify-end">
              {/* Abstract Z-shape / Logo representation */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-40 h-40 border-[16px] border-white/[0.03] rotate-45 rounded-3xl transform group-hover:scale-110 transition-transform duration-700 blur-sm"></div>
                <div className="absolute w-32 h-32 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl rotate-12 group-hover:rotate-45 transition-transform duration-1000 shadow-2xl"></div>
              </div>
              
              <div className="relative z-10 mt-auto">
                <h4 className="text-lg font-bold text-white mb-1">Creative Engineer & Architect</h4>
                <a href="#work" className="text-sm text-text-secondary flex items-center gap-1 group/link hover:text-white transition-colors">
                  Learn More <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Right: Earth / Location */}
            <motion.div variants={item} className="md:col-span-5 lg:col-span-6 rounded-3xl bg-surface border border-white/5 overflow-hidden relative group hover:border-white/20 transition-colors min-h-[320px]">
              {/* Earth Graphic CSS implementation */}
              <div className="absolute -bottom-[20%] right-[-10%] w-[120%] aspect-square rounded-full border border-white/10 opacity-30 flex items-center justify-center overflow-hidden">
                {/* Horizontal grid lines */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="absolute w-full h-[1px] bg-white/10" style={{ transform: `rotateX(${(i * 20) - 70}deg)` }}></div>
                ))}
                {/* Vertical grid lines */}
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="absolute h-full w-[1px] bg-white/10" style={{ transform: `rotateY(${i * 22.5}deg)` }}></div>
                ))}
              </div>

              {/* Pulsing Dot representing location */}
              <div className="absolute bottom-[20%] right-[30%] z-20">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
              </div>

              <div className="relative z-10 p-8 flex flex-col md:items-end md:text-right">
                <h3 className="text-2xl font-bold text-white mb-2">Based in Jaipur, India</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                  <span className="text-xs font-mono text-white/50 tracking-widest uppercase">Available Worldwide</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* MIDDLE ROW: The Founder + Expert Notice */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* The Founder Card */}
            <motion.div variants={item} className="md:col-span-8 lg:col-span-8 rounded-3xl bg-surface border border-white/5 overflow-hidden group hover:border-white/20 transition-colors flex flex-col sm:flex-row">
              <div className="w-full sm:w-2/5 aspect-square sm:aspect-auto relative">
                <img 
                  src="https://picsum.photos/seed/divyansh/800/800"
                  alt="Divyansh Saxena"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-75 group-hover:brightness-100 transition-all duration-700 sepia-[.30]"
                />
                {/* Overlay gradient */}
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
                
                <a href="#contact" className="text-sm font-bold text-white flex items-center gap-2 group/link hover:text-primary transition-colors mt-auto">
                  Work with me <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Expert Notice / Accent Card */}
            <motion.div variants={item} className="md:col-span-4 lg:col-span-4 min-h-[300px] rounded-3xl bg-surface border border-white/5 p-8 flex flex-col justify-between group hover:border-white/20 transition-colors overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex-1 flex items-center justify-center">
                {/* Abstract 3D shape impression */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 bg-white/5 rounded-2xl rotate-12 drop-shadow-2xl backdrop-blur-3xl border border-white/10 group-hover:rotate-0 transition-all duration-700"></div>
                  <div className="absolute inset-0 bg-white/10 rounded-2xl -rotate-6 drop-shadow-2xl border border-white/10 group-hover:-rotate-12 transition-all duration-700 scale-90"></div>
                  <Sparkles className="w-12 h-12 text-white opacity-50 relative z-10" />
                </div>
              </div>

              <div className="relative z-10 mt-8">
                <h4 className="text-lg font-bold text-white mb-1">Architecture Expert</h4>
                <a href="#services" className="text-sm text-text-secondary flex items-center gap-1 group/link hover:text-white transition-colors">
                  Learn More <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

          </div>

          {/* BOTTOM ROW: Tools / Tech Stack Marquee */}
          <motion.div variants={item} className="w-full rounded-3xl bg-surface border border-white/5 p-4 md:p-6 overflow-hidden flex flex-col lg:flex-row items-center gap-6 justify-between group hover:border-white/20 transition-colors">
            
            <div className="flex-shrink-0 text-center lg:text-left">
              <h4 className="text-sm font-bold text-white mb-1">Everyday's Toolbox</h4>
              <p className="text-xs text-text-secondary">Mastered for every project.</p>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-12 bg-white/10"></div>

            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 flex-1">
              {tools.map((tool, idx) => (
                <div key={idx} className="group/tool relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors overflow-hidden">
                  {/* Brand color glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover/tool:opacity-20 transition-opacity duration-300 pointer-events-none" style={{ backgroundColor: tool.color }} />
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-3">
                    <ToolLogo tool={tool} />
                  </div>
                </div>
              ))}
            </div>

            {/* Optional Small CTA / "Okay" button from original image */}
            <div className="hidden xl:flex flex-shrink-0 items-center gap-4 bg-white/5 rounded-full pl-4 pr-1 py-1 border border-white/10">
              <span className="text-xs text-text-secondary max-w-[150px] leading-tight">We use these tools to build experiences.</span>
              <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full hover:bg-white/80 transition-colors">Okay</button>
            </div>

          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default BentoGrid;
