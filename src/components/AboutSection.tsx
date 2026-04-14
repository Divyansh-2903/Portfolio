import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Palette, Cpu, ExternalLink, BrainCircuit } from 'lucide-react';
import { SiNextdotjs, SiTypescript, SiSupabase, SiTailwindcss, SiFigma, SiNodedotjs, SiReact, SiFramer, SiAnthropic } from 'react-icons/si';
import { TbBrandOpenai } from 'react-icons/tb';
import { projects } from '../data/projects';
import { client, urlFor } from '../lib/sanity';

// Dynamic Icon Mapping (for Sanity-driven cards)
const iconMap: Record<string, any> = {
  Palette, Cpu, ExternalLink
};


const DEFAULT_TIMELINE = [
  {
    period: '2025 — Present',
    role: 'Founder',
    company: 'Syntax & OneClipHub',
    desc: 'Syntax: Established a parent company to serve as an incubator for scalable digital products and AI-driven tools.\nOneClipHub: Developed and launched a unified media downloader platform, managing the full lifecycle from UI/UX design to deployment.\n\nTech Stack: Transitioned into Full-Stack development, integrating Python and modern web frameworks into the product lineup.',
  },
  {
    period: '2024 — Present',
    role: 'Founder',
    company: '@grindxgrowth',
    desc: 'Built a digital brand focused on high-performance growth and "scroll-stopping" visual storytelling.\n\nMilestone: Successfully generated 140,000+ total views, validating a data-driven approach to content hooks and audience retention.',
  },
  {
    period: '2023 — 2025',
    role: 'Freelance Video Editor & Motion Designer',
    company: 'Design & Media',
    desc: 'Herbalife (2024): Executed a 3-month specialized video editing contract for the CFO of Herbalife, focusing on high-level corporate communication.\nSunny Biggy Fitness: Delivered a high-energy media project tailored for fitness industry engagement.\n\nGeneral Freelance: Provided 2 years of premium motion graphics and video editing services, specializing in "cinematic" aesthetics for diverse clients.',
  },
];


// Custom SVG Icons for brands missing from Si library
const PhotoshopIcon = ({ className, size = 24 }: { className?: string; size?: number | string }) => (
  <img 
    src="/assets/photoshop.svg" 
    alt="Photoshop" 
    className={`${className} object-contain block`} 
    style={{ width: size, height: size }} 
  />
);

const PremiereIcon = ({ className, size = 24 }: { className?: string; size?: number | string }) => (
  <img 
    src="/assets/premiere.svg" 
    alt="Premiere Pro" 
    className={`${className} object-contain block`} 
    style={{ width: size, height: size }} 
  />
);

const AfterEffectsIcon = ({ className, size = 24 }: { className?: string; size?: number | string }) => (
  <img 
    src="/assets/aftereffects.svg" 
    alt="After Effects" 
    className={`${className} object-contain block`} 
    style={{ width: size, height: size }} 
  />
);

const ClaudeIcon = ({ className, size = 24 }: { className?: string; size?: number | string }) => (
  <img 
    src="/assets/claude.svg" 
    alt="Claude" 
    className={`${className} object-contain block`} 
    style={{ width: size, height: size }} 
  />
);

const AntigravityIcon = ({ className, size = 24 }: { className?: string; size?: number | string }) => (
  <img 
    src="/assets/antigravity.svg" 
    alt="Antigravity" 
    className={`${className} object-contain block`} 
    style={{ width: size, height: size }} 
  />
);

// Static toolkit with real brand icons + colors (not driven by Sanity)
const TOOLKIT_ITEMS = [
  { name: 'Next.js',      category: 'Framework',   Icon: SiNextdotjs,  color: '#ffffff' },
  { name: 'React',        category: 'UI Library',  Icon: SiReact,      color: '#61dafb' },
  { name: 'TypeScript',   category: 'Language',    Icon: SiTypescript, color: '#3178c6' },
  { name: 'Supabase',     category: 'Backend',     Icon: SiSupabase,   color: '#3ecf8e' },
  { name: 'Tailwind CSS', category: 'Styling',     Icon: SiTailwindcss,color: '#38bdf8' },
  { name: 'Framer Motion',category: 'Animation',   Icon: SiFramer,     color: '#dd2aff' },
  { name: 'Figma',        category: 'Design',      Icon: SiFigma,      color: '#f24e1e' },
  { name: 'Node.js',      category: 'Runtime',     Icon: SiNodedotjs,  color: '#84cc16' },
  { name: 'Photoshop',    category: 'Graphics',    Icon: PhotoshopIcon, color: '#31A8FF' },
  { name: 'Premiere Pro', category: 'Video Edit',  Icon: PremiereIcon, color: '#9999FF' },
  { name: 'After Effects',category: 'Motion Design',Icon: AfterEffectsIcon, color: '#CF96FD' },
  { name: 'Claude',       category: 'AI Assistant',Icon: ClaudeIcon, color: '#D97757' },
  { name: 'Antigravity',  category: 'Agentic AI',  Icon: AntigravityIcon, color: '#6366f1' },
];

/* ─── Design DNA Cards ──────────────────────────────────────── */
const DEFAULT_DESIGN_CARDS = [
  {
    num: 'G1', tag: 'THE INSTINCT', accent: '#a78bfa',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #0d0122 40%, #1d0845 100%)',
    iconName: 'Palette',
    title: 'ATMOSPHERIC AESTHETICS',
    body: 'Cinematic over corporate. I design for the pause — that split second where someone stops scrolling because something felt different. That reaction is the whole point.',
  },
  {
    num: 'G2', tag: 'THE SPINE', accent: '#818cf8',
    gradient: 'linear-gradient(135deg, #0f1744 0%, #080d2b 60%, #0c1a3f 100%)',
    iconName: 'Cpu',
    title: 'PRECISION ENGINEERING',
    body: "Clean architecture isn't invisible — it's what makes everything else possible. From backend logic to frame-perfect motion, I build the parts people never see so the parts they do feel effortless.",
  },
];

/* ─── Reusable Glare Card ────────────────────────────────────── */
function GlareCard({
  children, gradient, accentColor, className = '',
}: {
  children: React.ReactNode;
  gradient: string;
  accentColor: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  // High-performance tracking (no re-renders)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 400, damping: 40 });
  const springY = useSpring(y, { stiffness: 400, damping: 40 });

  const translateX = useTransform(springX, (vx) => vx - 300);
  const translateY = useTransform(springY, (vy) => vy - 300);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => { if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) opacity.set(1); }}
      onMouseLeave={() => opacity.set(0)}
      onMouseMove={handleMove}
      className={`relative rounded-3xl overflow-hidden ${className}`}
      style={{
        background: gradient,
        transition: 'all 0.4s ease',
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        }}
      />
      
      {/* Glare effect powered by MotionValues mapped to translation */}
      <motion.div
        className="absolute top-0 left-0 pointer-events-none mix-blend-overlay"
        style={{
          width: 600,
          height: 600,
          x: translateX,
          y: translateY,
          opacity,
          background: 'radial-gradient(circle 300px at center, rgba(255,255,255,0.14), transparent 100%)',
          willChange: 'transform, opacity'
        }}
      />

      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${accentColor}22 0%, transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ─── Parallax Image ─────────────────────────────────────────── */
function ParallaxImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.img
        style={{ y, scale: 1.15 }}
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-90 transition-all duration-700"
      />
    </div>
  );
}

/* ─── Memoized Sub-components ───────────────────────────────── */
const TechToolItem = React.memo(({ tool, index }: { tool: typeof TOOLKIT_ITEMS[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85, y: 10 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ type: "spring", damping: 25, stiffness: 300, delay: index * 0.04 }}
    className="group flex flex-col items-center gap-3 p-5 rounded-2xl cursor-default"
    style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      transition: 'background 0.3s, border-color 0.3s, transform 0.3s',
      willChange: 'transform, opacity'
    }}
    whileHover={{ scale: 1.08, y: -4 }}
  >
    <div 
      className="flex items-center justify-center"
      style={{ color: tool.color, filter: `drop-shadow(0 0 10px ${tool.color}77)` }}
    >
      <tool.Icon size={36} />
    </div>
    <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 group-hover:text-white/80 transition-colors text-center leading-tight">
      {tool.name}
    </span>
  </motion.div>
));
TechToolItem.displayName = 'TechToolItem';

const DesignDNACard = React.memo(({ col, i, IconComponent }: { col: any; i: number; IconComponent: any }) => (
  <motion.div
    key={col.num || i}
    initial={{ opacity: 0, y: 30, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ type: "spring", damping: 28, stiffness: 200, delay: i * 0.1 }}
    style={{ willChange: "transform, opacity" }}
  >
    <GlareCard gradient={col.gradient} accentColor={col.accent} className="h-full">
      <div className="p-8 flex flex-col h-full min-h-[220px]">
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: col.accent }}>
            {col.num} // {col.tag}
          </span>
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: `${col.accent}15`, border: `1px solid ${col.accent}30` }}
          >
            <IconComponent size={14} style={{ color: col.accent }} />
          </div>
        </div>
        <h3 className="font-display text-2xl uppercase tracking-tight text-white mb-4">{col.title}</h3>
        <p className="text-white/45 text-sm leading-relaxed font-body flex-1">{col.body}</p>
      </div>
    </GlareCard>
  </motion.div>
));
DesignDNACard.displayName = 'DesignDNACard';

/* ─── Main Component ─────────────────────────────────────────── */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [aboutData, setAboutData] = React.useState<any>({
    name: "DIVYANSH SAXENA",
    subtext: "Fullstack Developer · UI/UX Designer\nMotion Graphics · Creative Engineer",
    philosophyHeadline: "I DON'T MAKE THINGS LOOK GOOD. I MAKE THEM FEEL INEVITABLE.",
    philosophyBody: "Every project I touch is a decision about what the internet should feel like. Deliberate, precise, and impossible to ignore.",
    isAvailable: true,
    locationLabel: "Creative Developer · Jaipur, India",
    designCards: DEFAULT_DESIGN_CARDS,
    timelineItems: DEFAULT_TIMELINE,
    toolkitItems: TOOLKIT_ITEMS,
  });

  React.useEffect(() => {
    async function fetchAbout() {
      try {
        const data = await client.fetch(`*[_type == "about"][0]`);
        if (data) {
          setAboutData((prev: any) => ({
            ...prev,
            ...data
          }));
        }
      } catch (err) {
        console.error("Failed to fetch about data:", err);
      }
    }
    fetchAbout();
  }, []);

  const dynamicStats = React.useMemo(() => {
    const uniqueCategories = new Set(projects.map(p => p.category)).size;
    const allTech = projects.flatMap(p => p.tech);
    const uniqueTechCount = new Set(allTech).size;
    
    return [
      { tag: '01 // Time',   val: new Date().getFullYear().toString(), label: 'Current Year'   },
      { tag: '02 // Output', val: `${projects.length}+`,  label: 'Projects Built' },
      { tag: '03 // Scope',  val: `${uniqueCategories}`,   label: 'Core Disciplines'      },
      { tag: '04 // Stack',  val: `${uniqueTechCount}+`,  label: 'Tech Mastered'  },
    ];
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 bg-bg overflow-hidden">

      {/* ── Ambient background glows ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, #c4b5fd18 0%, transparent 60%)', filter: 'blur(80px)' }} />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, #818cf812 0%, transparent 60%)', filter: 'blur(100px)' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, #a78bfa10 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      {/* ── Tinted grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: `linear-gradient(rgba(167,139,250,0.8) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(167,139,250,0.8) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={headerInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ type: "spring", damping: 30, stiffness: 220 }}
          className="mb-20"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">[ The Architect ]</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h1 className="font-display text-[clamp(3.5rem,10vw,9rem)] uppercase tracking-[0.02em] leading-[0.85] text-white">
              {aboutData.name?.split(' ')[0] || 'DIVYANSH'}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-300 to-indigo-300">
                {aboutData.name?.split(' ').slice(1).join(' ') || 'SAXENA'}
              </span>
            </h1>
            <p className="text-white/35 font-mono text-sm leading-relaxed max-w-xs lg:text-right whitespace-pre-line">
              {aboutData.subtext}
            </p>
          </div>
        </motion.div>

        <div
          className="h-px w-full mb-16"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.25), transparent)' }}
        />

        {/* ── Hero Row: Philosophy + Portrait ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 mb-6">

          {/* Philosophy card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            style={{ willChange: "transform, opacity" }}
          >
            <GlareCard
              gradient="linear-gradient(135deg, #1e0b3e 0%, #0e0526 40%, #1a0840 100%)"
              accentColor="#a78bfa"
              className="h-full"
            >
              <div className="p-10 md:p-14 flex flex-col justify-between min-h-[580px]">
                <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-8 block">
                  // Philosophy
                </span>
                <div>
                  <p className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.05] mb-8">
                    {aboutData.philosophyHeadline.split('.')[0]}.{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-300 to-indigo-300">
                      {aboutData.philosophyHeadline.split('.').slice(1).join('.').trim()}
                    </span>
                  </p>
                  <p className="text-white/40 font-body text-base leading-relaxed max-w-lg">
                    {aboutData.philosophyBody}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-10 pt-8"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest">
                    {aboutData.isAvailable ? 'Available for projects' : 'Currently Unavailable'}
                  </span>
                  {aboutData.isAvailable && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                    </span>
                  )}
                </div>
              </div>
            </GlareCard>
          </motion.div>

          {/* Real portrait card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: "spring", damping: 30, stiffness: 200, delay: 0.1 }}
            style={{ willChange: "transform, opacity" }}
          >
            <GlareCard
              gradient="linear-gradient(135deg, #0f0522 0%, #080214 60%, #110728 100%)"
              accentColor="#c084fc"
              className="h-full"
            >
              <div className="relative min-h-[580px] overflow-hidden rounded-3xl">
                <img
                  src={aboutData.portraitImage ? urlFor(aboutData.portraitImage).width(800).url() : "/assets/divyansh.jpg"}
                  alt={aboutData.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: 'center 10%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0526cc] via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="font-mono text-xs text-primary uppercase tracking-widest mb-1">{aboutData.name || 'Divyansh Saxena'}</p>
                  <p className="font-mono text-[10px] text-white/40 tracking-wider">{aboutData.locationLabel}</p>
                </div>
                <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full"
                  style={{ background: 'rgba(192,132,252,0.15)', border: '1px solid rgba(192,132,252,0.3)', backdropFilter: 'blur(8px)' }}>
                  <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#c084fc' }}>
                    Creative Dev
                  </span>
                </div>
              </div>
            </GlareCard>
          </motion.div>
        </div>

        {/* ── Design DNA Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {aboutData.designCards.map((col: any, i: number) => {
            const IconComponent = iconMap[col.iconName] || ExternalLink;
            return (
              <DesignDNACard key={col.num || i} col={col} i={i} IconComponent={IconComponent} />
            );
          })}
        </div>


        {/* ── Work Timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          className="mb-6"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em]">// Career History</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <div className="flex flex-col">
            {aboutData.timelineItems.map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", damping: 25, stiffness: 250, delay: i * 0.08 }}
                className="group relative flex flex-col md:flex-row md:items-baseline justify-between py-10 gap-4 md:gap-12"
                style={{
                  borderTop: i === 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500 ease-out" />
                <div className="md:w-1/4 shrink-0 px-4 md:px-6">
                  <span className="font-mono text-xs text-white/40 tracking-widest">{item.period}</span>
                </div>
                <div className="md:w-3/4 flex flex-col gap-3 px-4 md:px-0 pr-4 md:pr-8">
                  <h4 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-white group-hover:text-primary transition-colors duration-300">
                    {item.role} <span className="text-white/20 px-2">|</span> <span className="text-white/60">{item.company}</span>
                  </h4>
                  <p className="text-white/50 text-sm md:text-base leading-relaxed font-body max-w-2xl">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── The Pulse (Metrics) — below timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          className="mb-16"
          style={{ willChange: "transform, opacity" }}
        >
          <GlareCard
            gradient="linear-gradient(135deg, #1e0b3e 0%, #0e0526 40%, #1a0840 100%)"
            accentColor="#a78bfa"
          >
            <div className="p-10 md:p-14">
              <div className="flex items-center gap-4 mb-10">
                <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em]">// The Pulse</span>
                <div className="h-px bg-white/10 flex-1" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {dynamicStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", damping: 25, stiffness: 250, delay: i * 0.08 }}
                    className="flex flex-col gap-3"
                  >
                    <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest">{stat.tag}</span>
                    <p className="font-display text-5xl md:text-6xl text-white">{stat.val}</p>
                    <p className="font-mono text-xs text-primary uppercase tracking-[0.2em]">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlareCard>
        </motion.div>

        {/* ── Identity Reel ── */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          className="mb-16"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] text-white/25 uppercase tracking-[0.3em]">// Off The Clock</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6" style={{ minHeight: '400px' }}>
            <div className="md:col-span-7 h-full min-h-[400px]">
              <GlareCard
                gradient="linear-gradient(135deg, #0a0215 0%, #050010 60%, #0d0320 100%)"
                accentColor="#f472b6"
                className="h-full"
              >
                <div className="relative h-full overflow-hidden rounded-3xl min-h-[400px]">
                  <ParallaxImage
                    src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1600&auto=format&fit=crop"
                    alt="Photography"
                    className="absolute inset-0 w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0215] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-8 left-8">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] mb-1 block" style={{ color: '#f472b6' }}>
                      Photography
                    </span>
                    <p className="font-display text-4xl uppercase tracking-tight text-white">Capturing Light</p>
                  </div>
                </div>
              </GlareCard>
            </div>

            <div className="md:col-span-5 flex flex-col gap-6 h-full min-h-[400px]">
              <div className="flex-1 min-h-[185px]">
                <GlareCard
                  gradient="linear-gradient(135deg, #021a0e 0%, #010d07 60%, #031a10 100%)"
                  accentColor="#34d399"
                  className="h-full"
                >
                  <div className="relative h-full overflow-hidden rounded-3xl min-h-[185px]">
                    <ParallaxImage
                      src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=800&auto=format&fit=crop"
                      alt="Travel"
                      className="absolute inset-0 w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#021a0e] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-6 left-6">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: '#34d399' }}>Travel</span>
                    </div>
                  </div>
                </GlareCard>
              </div>
              <div className="flex-1 min-h-[185px]">
                <GlareCard
                  gradient="linear-gradient(135deg, #020f1a 0%, #010810 60%, #020d18 100%)"
                  accentColor="#60a5fa"
                  className="h-full"
                >
                  <div className="relative h-full overflow-hidden rounded-3xl min-h-[185px]">
                    <ParallaxImage
                      src="https://images.unsplash.com/photo-1551009175-8a68da93d5f9?q=80&w=800&auto=format&fit=crop"
                      alt="City Life"
                      className="absolute inset-0 w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020f1a] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-6 left-6">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: '#60a5fa' }}>City Life</span>
                    </div>
                  </div>
                </GlareCard>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Technical Arsenal (bottom) — with colorful brand icons ── */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          className="mb-6"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-[10px] text-white/25 uppercase tracking-[0.3em]">// Technical Arsenal</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
            {TOOLKIT_ITEMS.map((tool, i) => (
              <TechToolItem key={i} tool={tool} index={i} />
            ))}
          </div>
        </motion.div>



        <div
          className="h-px w-full mt-20"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.2), transparent)' }}
        />

      </div>
    </section>
  );
}
