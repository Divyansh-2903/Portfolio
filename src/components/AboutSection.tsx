import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Palette, Cpu, ExternalLink, Code2, Database, Layers, Terminal, PenTool, LayoutTemplate, Sparkles, Server } from 'lucide-react';
import { projects } from './Showcase';


const timelineItems = [
  {
    period: '2025 — Present',
    role: 'Lead Fullstack Engineer',
    company: 'Digital Agency',
    desc: 'Led a team of developers to build scalable SaaS platforms and complex data ecosystems. Delivered end-to-end cinematic web experiences for enterprise clients using Next.js and Supabase.',
  },
  {
    period: '2024 — 2025',
    role: 'Freelance Architect',
    company: 'Independent',
    desc: 'Built 20+ custom applications ranging from cinematic portfolios to robust e-commerce solutions. Focused on bridging the gap between high-fidelity design and rigorous technical execution.',
  },
  {
    period: '2023 — 2024',
    role: 'Frontend Developer',
    company: 'Tech Startup',
    desc: 'Engineered high-performance dashboards and interactive UI components. Pioneered frontend optimization strategies that boosted overall platform loading speed by 40%.',
  },
  {
    period: '2022 — 2023',
    role: 'Creative Designer',
    company: 'Studio',
    desc: 'Established foundational brand identities and motion graphics reels. Developed comprehensive UI/UX design systems before fully transitioning into software engineering.',
  },
];

const toolkitItems = [
  { name: 'Next.js & React', category: 'Engineering', Icon: Code2 },
  { name: 'TypeScript',      category: 'Language',    Icon: Terminal },
  { name: 'Supabase',        category: 'Backend',     Icon: Database },
  { name: 'Tailwind CSS',    category: 'Styling',     Icon: LayoutTemplate },
  { name: 'Cursor & AI',     category: 'Workflow',    Icon: Sparkles },
  { name: 'Framer Motion',   category: 'Animation',   Icon: Layers },
  { name: 'Figma',           category: 'Design',      Icon: PenTool },
  { name: 'Node.js',         category: 'Server',      Icon: Server },
];

/* ─── Design DNA Cards ──────────────────────────────────────── */
const designCards = [
  {
    num: 'G1', tag: 'THE INSTINCT', accent: '#a78bfa',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #0d0122 40%, #1d0845 100%)',
    Icon: Palette,
    title: 'ATMOSPHERIC AESTHETICS',
    body: 'Cinematic over corporate. I design for the pause — that split second where someone stops scrolling because something felt different. That reaction is the whole point.',
  },
  {
    num: 'G2', tag: 'THE SPINE', accent: '#818cf8',
    gradient: 'linear-gradient(135deg, #0f1744 0%, #080d2b 60%, #0c1a3f 100%)',
    Icon: Cpu,
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
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMove}
      className={`relative rounded-3xl overflow-hidden ${className}`}
      style={{
        background: gradient,
        border: `1px solid ${hovered ? accentColor + '40' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered
          ? `0 0 60px ${accentColor}22, 0 24px 60px rgba(0,0,0,0.5)`
          : '0 8px 40px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.4s ease, border-color 0.3s ease',
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          opacity: hovered ? 1 : 0.3,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle 300px at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.14), transparent 70%)`,
        }}
      />
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${accentColor}22 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0.4,
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

/* ─── Main Component ─────────────────────────────────────────── */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: '-80px' });

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
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">[ The Architect ]</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h1 className="font-display text-[clamp(3.5rem,10vw,9rem)] uppercase tracking-[0.02em] leading-[0.85] text-white">
              DIVYANSH{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-300 to-indigo-300">
                SAXENA
              </span>
            </h1>
            <p className="text-white/35 font-mono text-sm leading-relaxed max-w-xs lg:text-right">
              Fullstack Developer · UI/UX Designer<br />
              Motion Graphics · Creative Engineer
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
                    I DON'T MAKE THINGS LOOK GOOD.{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-300 to-indigo-300">
                      I MAKE THEM FEEL INEVITABLE.
                    </span>
                  </p>
                  <p className="text-white/40 font-body text-base leading-relaxed max-w-lg">
                    Every project I touch is a decision about what the internet should feel like. Deliberate, precise, and impossible to ignore.
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-10 pt-8"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest">
                    Available for projects
                  </span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                  </span>
                </div>
              </div>
            </GlareCard>
          </motion.div>

          {/* Real portrait card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlareCard
              gradient="linear-gradient(135deg, #0f0522 0%, #080214 60%, #110728 100%)"
              accentColor="#c084fc"
              className="h-full"
            >
              <div className="relative min-h-[580px] overflow-hidden rounded-3xl">
                <img
                  src="/assets/divyansh.jpg"
                  alt="Divyansh Saxena — Creative Developer"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: 'center 10%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0526cc] via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="font-mono text-xs text-primary uppercase tracking-widest mb-1">Divyansh Saxena</p>
                  <p className="font-mono text-[10px] text-white/40 tracking-wider">Creative Developer · Jaipur, India</p>
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

        {/* ── The Pulse (Metrics) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
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

        {/* ── Design DNA Cards (2 cards, arsenal removed) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {designCards.map((col, i) => (
            <motion.div
              key={col.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
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
                      <col.Icon size={14} style={{ color: col.accent }} />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl uppercase tracking-tight text-white mb-4">{col.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed font-body flex-1">{col.body}</p>
                </div>
              </GlareCard>
            </motion.div>
          ))}
        </div>

        {/* ── Work Timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em]">// Career History</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <div className="flex flex-col">
            {timelineItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative flex flex-col md:flex-row md:items-baseline justify-between py-10 gap-4 md:gap-12"
                style={{
                  borderTop: i === 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {/* 1px Accent Left Line on Hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500 ease-out" />
                
                {/* Left Column: Date */}
                <div className="md:w-1/4 shrink-0 px-4 md:px-6">
                  <span className="font-mono text-xs text-white/40 tracking-widest">{item.period}</span>
                </div>

                {/* Right Column: Content */}
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

        {/* ── My Arsenal (Toolkit) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-[10px] text-white/25 uppercase tracking-[0.3em]">// Technical Arsenal</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {toolkitItems.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <GlareCard
                  gradient="linear-gradient(135deg, rgba(30,11,62,0.4) 0%, rgba(14,5,38,0.4) 100%)"
                  accentColor="#a78bfa"
                  className="h-full group"
                >
                  <div className="p-8 flex flex-col items-center justify-center text-center gap-4 min-h-[160px]">
                    <tool.Icon size={28} className="text-primary group-hover:text-white transition-colors duration-300" strokeWidth={1} />
                    <h5 className="font-display text-lg uppercase tracking-wider text-white">
                      {tool.name}
                    </h5>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                      {tool.category}
                    </span>
                  </div>
                </GlareCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Identity Reel ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
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



        <div
          className="h-px w-full mt-20"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.2), transparent)' }}
        />

      </div>
    </section>
  );
}
