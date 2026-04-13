import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Palette, Cpu, ExternalLink } from 'lucide-react';
import FlowingMenu from './FlowingMenu';

/* ─── Work Timeline Data ────────────────────────────────────── */
const timelineItems = [
  {
    link: '#',
    text: 'Freelance — Web Developer',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    period: '2024 — Present',
    role: 'Fullstack Developer',
    desc: 'Building custom web apps, portfolios, and SaaS products for international clients. React, Next.js, Node.js, Supabase.',
  },
  {
    link: '#',
    text: 'Motion Architect — Video Editor',
    image: 'https://images.unsplash.com/photo-1536240478700-b869ad10da2a?q=80&w=800&auto=format&fit=crop',
    period: '2024 — Present',
    role: 'Motion Designer',
    desc: 'Crafting high-impact reels, YouTube content, and brand films. After Effects, Premiere Pro, DaVinci Resolve.',
  },
  {
    link: '#',
    text: 'UI/UX Designer',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop',
    period: '2024 — Present',
    role: 'Product Designer',
    desc: 'Designing cinematic, conversion-focused interfaces. Figma, high-fidelity prototypes, design systems.',
  },
  {
    link: '#',
    text: 'Learning Phase — CS Student',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=800&auto=format&fit=crop',
    period: '2023 — 2024',
    role: 'CS Undergraduate',
    desc: 'Laying the technical foundation. Data structures, algorithms, system design, and first real-world projects.',
  },
];

/* ─── Design DNA Cards ──────────────────────────────────────── */
const designCards = [
  {
    num: '01', tag: 'Design DNA', accent: '#a78bfa',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #0d0122 40%, #1d0845 100%)',
    Icon: Palette,
    title: 'Atmospheric Aesthetics',
    body: 'Rejecting the blocky internet for a high-end cinematic feel. Intentional asymmetry, massive negative space, and dynamic glows create depth without heavy shadows.',
  },
  {
    num: '02', tag: 'The Craft', accent: '#818cf8',
    gradient: 'linear-gradient(135deg, #0f1744 0%, #080d2b 60%, #0c1a3f 100%)',
    Icon: Cpu,
    title: 'Precision Engineering',
    body: 'Beyond the visuals lies a rigid technical foundation. React, TypeScript, performant animations, scalable state management, and type-safe architectures.',
  },
];

const stats = [
  { tag: '01 // Time',   val: '2024', label: 'Year Started'   },
  { tag: '02 // Output', val: '21+',  label: 'Projects Built' },
  { tag: '03 // Reach',  val: '12+',  label: 'Happy Clients'  },
  { tag: '04 // Scope',  val: '5+',   label: 'Countries'      },
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
              <div className="p-10 md:p-14 flex flex-col justify-between min-h-[420px]">
                <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-8 block">
                  // Philosophy
                </span>
                <div>
                  <p className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.05] mb-8">
                    I design at the intersection of{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-300 to-indigo-300">
                      logic & emotion.
                    </span>
                  </p>
                  <p className="text-white/40 font-body text-base leading-relaxed max-w-lg">
                    Every line of code is a brushstroke. Every layout, a narrative. I build for users who
                    feel the difference between mediocre and exceptional — even when they can't name it.
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
              <div className="relative min-h-[420px] overflow-hidden rounded-3xl">
                <img
                  src="/assets/divyansh.jpg"
                  alt="Divyansh Saxena — Creative Developer"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ objectPosition: 'center top' }}
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
          className="mb-6"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em]">[ Career Timeline ]</span>
            <div className="h-px bg-white/10 flex-1" />
            <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest">2024 — Present</span>
          </div>

          {/* Flowing Menu Timeline */}
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              border: '1px solid rgba(255,255,255,0.07)',
              background: 'linear-gradient(135deg, #1e0b3e 0%, #0e0526 40%, #1a0840 100%)',
              minHeight: '420px',
            }}
          >
            {/* Top accent line */}
            <div
              className="h-px w-full"
              style={{ background: 'linear-gradient(90deg, transparent, #a78bfa, transparent)' }}
            />
            <FlowingMenu
              items={timelineItems}
              speed={18}
              textColor="#ffffff"
              bgColor="transparent"
              marqueeBgColor="#a78bfa"
              marqueeTextColor="#080808"
              borderColor="rgba(255,255,255,0.08)"
            />
          </div>

          {/* Timeline detail rows below FlowingMenu */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {timelineItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-4 p-5 rounded-2xl"
                style={{
                  background: 'rgba(167,139,250,0.04)',
                  border: '1px solid rgba(167,139,250,0.12)',
                }}
              >
                <div
                  className="w-1 rounded-full flex-shrink-0 mt-1"
                  style={{ background: 'linear-gradient(180deg, #a78bfa, #818cf8)', minHeight: '80px' }}
                />
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-[10px] text-primary uppercase tracking-widest">{item.period}</span>
                    <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">{item.role}</span>
                  </div>
                  <h4 className="font-display text-lg uppercase tracking-tight text-white mb-2">
                    {item.text.split('—')[0].trim()}
                  </h4>
                  <p className="text-white/40 text-xs leading-relaxed font-body">{item.desc}</p>
                </div>
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

        {/* ── The Pulse (Metrics) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
                {stats.map((stat, i) => (
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

        <div
          className="h-px w-full mt-20"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.2), transparent)' }}
        />

      </div>
    </section>
  );
}
