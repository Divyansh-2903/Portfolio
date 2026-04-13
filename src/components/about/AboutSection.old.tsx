import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import {
  ArrowUpRight, Code2, Layers, Zap, Sparkles,
  Globe, Clock, Coffee, Rocket, Heart,
  Monitor, Smartphone, Camera, Film,
  TrendingUp, ChevronRight,
} from 'lucide-react';
import _Marquee from 'react-fast-marquee';
const Marquee = (_Marquee as any).default || _Marquee;

/* ─────────────────────────────────────────────────────────────
   DESIGN SYSTEM (matched from Hero, Showcase, Contact, Story)
   - Card gradients: unique per card, dark/deep purple tones
   - Top accent lines: linear-gradient(90deg, transparent, accent, transparent)
   - Ambient glow orbs: radial-gradient + blur
   - Mouse-tracked glare: radial-gradient(circle at cursorPos)
   - Section header: font-mono tag + h-px divider
   - Headline: font-display uppercase + gradient accent word
   ───────────────────────────────────────────────────────────── */

// ─── Tool Data ────────────────────────────────────────────────
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const tools = [
  { name: 'React',         logo: `${DEVICON}/react/react-original.svg`,           color: '#61DAFB' },
  { name: 'Next.js',       logo: `${DEVICON}/nextjs/nextjs-original.svg`,         color: '#FFFFFF' },
  { name: 'TypeScript',    logo: `${DEVICON}/typescript/typescript-original.svg`,  color: '#3178C6' },
  { name: 'Node.js',       logo: `${DEVICON}/nodejs/nodejs-original.svg`,         color: '#339933' },
  { name: 'Tailwind',      logo: `${DEVICON}/tailwindcss/tailwindcss-original.svg`,color: '#06B6D4' },
  { name: 'Supabase',      logo: `${DEVICON}/supabase/supabase-original.svg`,     color: '#3ECF8E' },
  { name: 'Figma',         logo: `${DEVICON}/figma/figma-original.svg`,           color: '#F24E1E' },
  { name: 'Premiere Pro',  logo: `${DEVICON}/premierepro/premierepro-original.svg`,color: '#9999FF' },
  { name: 'After Effects', logo: `${DEVICON}/aftereffects/aftereffects-original.svg`,color: '#9999FF' },
  { name: 'PostgreSQL',    logo: `${DEVICON}/postgresql/postgresql-original.svg`,  color: '#336791' },
  { name: 'Prisma',        logo: `${DEVICON}/prisma/prisma-original.svg`,          color: '#5A67D8' },
  { name: 'Framer',        logo: `${DEVICON}/framermotion/framermotion-original.svg`,color: '#0055FF' },
  { name: 'Vercel',        logo: `${DEVICON}/vercel/vercel-original.svg`,          color: '#FFFFFF' },
];

// ─── Timeline ─────────────────────────────────────────────────
const milestones = [
  { year: '2019', label: 'Fell in love with code',       color: '#a78bfa' },
  { year: '2021', label: 'First freelance project',      color: '#818cf8' },
  { year: '2022', label: 'Launched first SaaS',          color: '#60a5fa' },
  { year: '2024', label: '20+ happy clients',            color: '#c084fc' },
  { year: 'Now',  label: 'Building the future',          color: '#e879f9' },
];

// ─── Stats ────────────────────────────────────────────────────
const stats = [
  { value: 21, suffix: '+', label: 'Projects Built',    icon: TrendingUp, color: '#a78bfa' },
  { value: 12, suffix: '+', label: 'Happy Clients',     icon: Heart,      color: '#f472b6' },
  { value: 3,  suffix: '+', label: 'SaaS Launched',     icon: Rocket,     color: '#60a5fa' },
  { value: 5,  suffix: '+', label: 'Countries Served',  icon: Globe,      color: '#34d399' },
];

// ─── Services ─────────────────────────────────────────────────
const services = [
  { icon: Code2,      label: 'Full-Stack Dev',     desc: 'End-to-end product engineering',     color: '#a78bfa' },
  { icon: Smartphone, label: 'UI / UX Design',     desc: 'Figma to pixel-perfect code',        color: '#818cf8' },
  { icon: Camera,     label: 'Video Editing',      desc: 'Cinematic narratives & content',      color: '#f472b6' },
  { icon: Film,       label: 'Motion Graphics',    desc: 'After Effects & animation',           color: '#c084fc' },
];

// ─── Animated Counter ─────────────────────────────────────────
function AnimatedCounter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 40, damping: 18 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(to);
  }, [inView, motionVal, to]);

  useEffect(() => {
    return springVal.on('change', (v) => setDisplay(Math.round(v)));
  }, [springVal]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── Mouse-Tracked Card (Showcase-style) ──────────────────────
function GlareCard({
  children,
  gradient,
  accentColor,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  gradient: string;
  accentColor: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={ref}
      className={`group relative rounded-3xl overflow-hidden transition-all duration-500 ${className}`}
      style={{
        background: gradient,
        border: `1px solid ${hovered ? accentColor + '40' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered
          ? `0 0 60px ${accentColor}20, 0 24px 60px rgba(0,0,0,0.5)`
          : '0 8px 40px rgba(0,0,0,0.4)',
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMove}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          opacity: hovered ? 1 : 0.3,
        }}
      />
      {/* Ambient glow orb */}
      <div
        className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0.4,
        }}
      />
      {/* Mouse-tracked glare */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-overlay"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle 300px at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.12), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════ */
export default function AboutSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="about" className="relative py-32 bg-bg overflow-hidden">

      {/* ── Ambient background glows (Contact/Showcase pattern) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, #c4b5fd18 0%, transparent 60%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px]"
          style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 50%, oklch(0.75 0.18 280 / 0.05) 0%, transparent 80%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, #f472b610 0%, transparent 60%)', filter: 'blur(70px)' }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, #c4b5fd12 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
      </div>

      {/* ── Tinted grid (Contact pattern) ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(167,139,250,0.7) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(167,139,250,0.7) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">

        {/* ═══ SECTION HEADER (Story/Showcase/Contact pattern) ═══ */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-5">
            <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">
              [ About Me ]
            </span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <h2 className="font-display text-[clamp(3.5rem,9vw,8rem)] uppercase tracking-[0.02em] text-white leading-[0.9]">
              THE{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-300 to-indigo-300">
                BUILDER
              </span>
            </h2>

            <p className="text-white/35 font-mono text-sm leading-relaxed max-w-xs md:text-right">
              I craft digital experiences that feel as good as they look — blending{' '}
              <span className="text-white/70">code precision</span> with{' '}
              <span className="text-white/70">creative storytelling</span>.
            </p>
          </div>
        </motion.div>

        {/* ── Purple divider (Contact pattern) ── */}
        <div
          className="h-px w-full mb-16"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.25), transparent)' }}
        />

        {/* ═══════════════════════════════════════════════════════
            BENTO GRID — Showcase-style gradient cards w/ glare
        ═══════════════════════════════════════════════════════ */}

        {/* ── ROW 1: Intro (Featured) + Stats Column ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">

          {/* ── 1. BIG INTRO CARD (col-span-8) — Featured-style ── */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <GlareCard
              gradient="linear-gradient(135deg, #1a0533 0%, #0d0122 40%, #1d0845 100%)"
              accentColor="#a78bfa"
              className="min-h-[440px] flex flex-col"
            >
              {/* Photo section with gradient overlay */}
              <div className="relative w-full flex-1 min-h-[240px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80"
                  alt="Divyansh at work"
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.35] group-hover:brightness-[0.45] group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d0122]" />

                {/* Corner accent (Showcase pattern) */}
                <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-primary/40 rounded-tr-lg" />
                <div className="absolute bottom-5 left-6 w-8 h-8 border-b border-l border-primary/40 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Name plate */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-widest"
                      style={{ background: '#a78bfa18', color: '#a78bfa' }}
                    >
                      <Layers size={10} />
                      Founder & Creative Dev
                    </span>
                    <span className="font-mono text-[10px] text-white/30 tracking-widest">2019 – Present</span>
                  </div>
                  <h3 className="font-display text-5xl md:text-7xl uppercase tracking-tight text-white leading-none group-hover:text-primary transition-colors duration-400">
                    Divyansh Saxena
                  </h3>
                </div>
              </div>

              {/* Copy */}
              <div className="p-8 pt-6 relative z-10">
                <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-xl">
                  I don't just write code — I <em className="text-white not-italic font-semibold">architect experiences</em> that convert.
                  From deep backend systems to pixel-perfect UI, my work lives at the intersection of{' '}
                  <em className="text-primary not-italic">craft and strategy</em>.
                </p>
                <div className="flex items-center gap-4">
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-3 px-7 py-4 rounded-full font-bold text-sm uppercase tracking-widest"
                    style={{
                      background: 'oklch(0.75 0.18 280)',
                      color: '#080808',
                      boxShadow: '0 0 40px rgba(167,139,250,0.3)',
                    }}
                  >
                    Work with me <ArrowUpRight size={16} />
                  </motion.a>
                  <motion.a
                    href="#contact"
                    whileHover={{ x: 4 }}
                    className="hidden sm:inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary"
                  >
                    View Resume <ChevronRight size={12} />
                  </motion.a>
                </div>
              </div>

              {/* Ghost number (Showcase pattern) */}
              <span className="absolute bottom-6 right-8 font-display text-[120px] leading-none text-white/[0.02] select-none pointer-events-none">
                01
              </span>
            </GlareCard>
          </motion.div>

          {/* ── 2. STATS COLUMN (col-span-4) ── */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-6">
            {stats.map(({ value, suffix, label, icon: Icon, color }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlareCard
                  gradient={`linear-gradient(135deg, ${color}08 0%, #080808 60%, ${color}05 100%)`}
                  accentColor={color}
                  className="p-6 flex flex-col items-center justify-center text-center cursor-default"
                >
                  <div className="relative z-10">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 mx-auto transition-all duration-300 group-hover:scale-110"
                      style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>
                    <p className="font-display text-5xl text-white leading-none mb-1">
                      <AnimatedCounter to={value} suffix={suffix} />
                    </p>
                    <p className="text-[10px] text-white/35 font-mono uppercase tracking-widest">{label}</p>
                  </div>
                </GlareCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── ROW 2: Services + Journey + Personality ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">

          {/* ── 3. WHAT I DO (col-span-5) ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5"
          >
            <GlareCard
              gradient="linear-gradient(135deg, #0f1744 0%, #080d2b 60%, #0c1a3f 100%)"
              accentColor="#818cf8"
              className="p-8 h-full"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <span
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-widest"
                    style={{ background: '#818cf818', color: '#818cf8' }}
                  >
                    <Monitor size={10} />
                    Services
                  </span>
                </div>
                <h4 className="font-display text-3xl uppercase text-white mb-6 tracking-tight group-hover:text-[#818cf8] transition-colors duration-300">
                  What I Do
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  {services.map(({ icon: Icon, label, desc, color }) => (
                    <div
                      key={label}
                      className="rounded-2xl p-4 cursor-default transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        background: `${color}06`,
                        border: `1px solid ${color}15`,
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                        style={{ background: `${color}12`, border: `1px solid ${color}25` }}
                      >
                        <Icon size={16} style={{ color }} strokeWidth={1.5} />
                      </div>
                      <p className="text-white text-sm font-semibold leading-tight mb-0.5">{label}</p>
                      <p className="text-white/35 text-xs leading-snug">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <span className="absolute bottom-6 right-8 font-display text-[100px] leading-none text-white/[0.02] select-none pointer-events-none">
                02
              </span>
            </GlareCard>
          </motion.div>

          {/* ── 4. THE JOURNEY — Timeline (col-span-4) ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4"
          >
            <GlareCard
              gradient="linear-gradient(135deg, #1e0b3c 0%, #0e0621 60%, #180b3a 100%)"
              accentColor="#c084fc"
              className="p-8 h-full"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <span
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-widest"
                    style={{ background: '#c084fc18', color: '#c084fc' }}
                  >
                    <Rocket size={10} />
                    Timeline
                  </span>
                </div>
                <h4 className="font-display text-3xl uppercase text-white mb-6 tracking-tight group-hover:text-[#c084fc] transition-colors duration-300">
                  The Journey
                </h4>

                <ol className="space-y-0">
                  {milestones.map(({ year, label, color }, idx) => (
                    <li key={year} className="flex items-start gap-4 group/item">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div
                          className="w-2.5 h-2.5 rounded-full border-2 flex-shrink-0 transition-all duration-300 group-hover/item:scale-125"
                          style={{ borderColor: color, background: `${color}25` }}
                        />
                        {idx < milestones.length - 1 && (
                          <div className="w-px h-8 mt-1" style={{ background: `linear-gradient(to bottom, ${color}40, transparent)` }} />
                        )}
                      </div>
                      <div className="pb-4">
                        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color }}>{year}</span>
                        <p className="text-white/60 text-sm font-medium mt-0.5 group-hover/item:text-white transition-colors">{label}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <span className="absolute bottom-6 right-8 font-display text-[100px] leading-none text-white/[0.02] select-none pointer-events-none">
                03
              </span>
            </GlareCard>
          </motion.div>

          {/* ── 5. OFF THE CLOCK (col-span-3) ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-3"
          >
            <GlareCard
              gradient="linear-gradient(135deg, #1a0520 0%, #0d0114 60%, #1c0628 100%)"
              accentColor="#f472b6"
              className="p-8 h-full"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <span
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-widest"
                    style={{ background: '#f472b618', color: '#f472b6' }}
                  >
                    <Sparkles size={10} />
                    Personal
                  </span>
                </div>
                <h4 className="font-display text-3xl uppercase text-white mb-6 tracking-tight group-hover:text-[#f472b6] transition-colors duration-300">
                  Off the Clock
                </h4>

                <ul className="space-y-4">
                  {[
                    { icon: Coffee, text: 'Black coffee & lo-fi',     color: '#c084fc' },
                    { icon: Globe,  text: 'Cross-timezone wizard',    color: '#60a5fa' },
                    { icon: Heart,  text: 'Open-source advocate',     color: '#f472b6' },
                    { icon: Clock,  text: '2AM flow state coder',     color: '#34d399' },
                  ].map(({ icon: Icon, text, color }) => (
                    <li key={text} className="flex items-center gap-3 group/fact cursor-default">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover/fact:scale-110"
                        style={{ background: `${color}12`, border: `1px solid ${color}25` }}
                      >
                        <Icon size={14} style={{ color }} strokeWidth={1.5} />
                      </div>
                      <span className="text-white/45 text-sm group-hover/fact:text-white transition-colors duration-300">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <span className="absolute bottom-6 right-8 font-display text-[100px] leading-none text-white/[0.02] select-none pointer-events-none">
                04
              </span>
            </GlareCard>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
