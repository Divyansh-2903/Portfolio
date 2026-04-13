import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, Play, Code2, Film, Layers } from 'lucide-react';

/* ─── Types ─────────────────────────────────────────── */
type Category = 'fullstack' | 'video';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  category: Category;
  tech: string[];
  accentColor: string;
  gradient: string;
  year: string;
  role: string;
  metrics?: { label: string; value: string }[];
  featured?: boolean;
}

/* ─── Project Data ───────────────────────────────────── */
const projects: Project[] = [
  /* ── Fullstack ── */
  {
    id: 'onecliphub',
    category: 'fullstack',
    title: 'OneClipHub',
    subtitle: 'SaaS Platform',
    desc: 'An all-in-one content command centre for video creators — manage, edit, publish, and monetise from a single dashboard.',
    tech: ['Next.js 14', 'Supabase', 'Stripe', 'Tailwind', 'tRPC'],
    accentColor: '#a78bfa',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #0d0122 40%, #1d0845 100%)',
    year: '2024',
    role: 'Fullstack Engineer',
    metrics: [{ label: 'Active Users', value: '2.4k' }, { label: 'MRR', value: '$14k' }],
    featured: true,
  },
  {
    id: 'grindxgrowth',
    category: 'fullstack',
    title: 'GrindXGrowth',
    subtitle: 'Marketing Dashboard',
    desc: 'A high-performance analytics dashboard for a digital-marketing agency tracking 30+ client campaigns in real time.',
    tech: ['React', 'Framer Motion', 'GSAP', 'Recharts'],
    accentColor: '#818cf8',
    gradient: 'linear-gradient(135deg, #0f1744 0%, #080d2b 60%, #0c1a3f 100%)',
    year: '2024',
    role: 'Frontend Lead',
    metrics: [{ label: 'Load Time', value: '0.8s' }, { label: 'Clients', value: '30+' }],
  },
  {
    id: 'onclip-ext',
    category: 'fullstack',
    title: 'OnClip Extension',
    subtitle: 'Browser Extension',
    desc: 'A productivity-boosting Chrome extension for video editors — clip timestamps, annotate timelines, export to DaVinci.',
    tech: ['TypeScript', 'Chrome API', 'React', 'Zustand'],
    accentColor: '#c084fc',
    gradient: 'linear-gradient(135deg, #1e0533 0%, #100224 60%, #1a0540 100%)',
    year: '2023',
    role: 'Solo Developer',
    metrics: [{ label: 'Downloads', value: '800+' }, { label: 'Rating', value: '4.9★' }],
  },
  {
    id: 'launchpad',
    category: 'fullstack',
    title: 'LaunchPad',
    subtitle: 'Startup OS',
    desc: 'A project-management and investor-relations platform built specifically for early-stage startups.',
    tech: ['Next.js', 'PostgreSQL', 'Prisma', 'Resend'],
    accentColor: '#e879f9',
    gradient: 'linear-gradient(135deg, #1a0b3c 0%, #0e0621 60%, #180b3a 100%)',
    year: '2024',
    role: 'Lead Engineer',
    metrics: [{ label: 'Teams', value: '50+' }, { label: 'Raised', value: '$1.2M' }],
  },
  /* ── Video Editing ── */
  {
    id: 'brand-reel',
    category: 'video',
    title: 'Brand Reel — Helix',
    subtitle: 'Commercial Production',
    desc: 'A 90-second brand identity reel for Helix, a fintech startup — combining kinetic typography with motion data viz.',
    tech: ['After Effects', 'Premiere Pro', 'Cinema 4D', 'DaVinci Resolve'],
    accentColor: '#f472b6',
    gradient: 'linear-gradient(135deg, #1a0520 0%, #0d0114 60%, #1c0628 100%)',
    year: '2024',
    role: 'Motion Director',
    metrics: [{ label: 'Views', value: '1.2M' }, { label: 'CTR', value: '+340%' }],
    featured: true,
  },
  {
    id: 'documentary-cut',
    category: 'video',
    title: 'Founders: Untold',
    subtitle: 'Documentary Series',
    desc: 'A 4-part documentary series following bootstrapped startup founders — edited from 200+ hours of raw footage.',
    tech: ['Premiere Pro', 'DaVinci Resolve', 'Adobe Audition', 'Lumetri'],
    accentColor: '#fb923c',
    gradient: 'linear-gradient(135deg, #1a1005 0%, #0d0a01 60%, #1c1408 100%)',
    year: '2023',
    role: 'Lead Editor',
    metrics: [{ label: 'Episodes', value: '4' }, { label: 'Watch Time', value: '18 min avg' }],
  },
  {
    id: 'social-motion',
    category: 'video',
    title: 'Social Motion Pack',
    subtitle: 'Content Package',
    desc: 'A 60-asset motion graphics package for a fitness brand — reels, stories, and ads that tripled their engagement.',
    tech: ['After Effects', 'Illustrator', 'Lottie', 'CapCut'],
    accentColor: '#34d399',
    gradient: 'linear-gradient(135deg, #021a0e 0%, #010d07 60%, #031a10 100%)',
    year: '2024',
    role: 'Motion Designer',
    metrics: [{ label: 'Assets', value: '60+' }, { label: 'Engagement', value: '+220%' }],
  },
  {
    id: 'product-launch',
    category: 'video',
    title: 'Product Launch — Aura',
    subtitle: 'Launch Campaign',
    desc: 'Full launch video suite for a wellness-tech product — hero video, 6 ads, 12 social cuts — all from a single shoot.',
    tech: ['Premiere Pro', 'After Effects', 'DaVinci', 'Midjourney'],
    accentColor: '#60a5fa',
    gradient: 'linear-gradient(135deg, #020f1a 0%, #010810 60%, #020d18 100%)',
    year: '2024',
    role: 'Creative Director',
    metrics: [{ label: 'Ad ROAS', value: '6.2×' }, { label: 'Revenue', value: '$420k' }],
  },
];

/* ─── Category Icon ──────────────────────────────────── */
const CategoryIcon = ({ cat }: { cat: Category }) =>
  cat === 'fullstack' ? <Code2 size={14} /> : <Film size={14} />;

/* ─── Metric Chip ────────────────────────────────────── */
const MetricChip = ({ label, value, color }: { label: string; value: string; color: string; key?: React.Key }) => (
  <span
    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono"
    style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
  >
    {value} <span className="opacity-60">{label}</span>
  </span>
);

/* ─── Project Card ───────────────────────────────────── */
const ProjectCard = ({ project, index }: { project: Project; index: number; key?: React.Key }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative rounded-3xl overflow-hidden cursor-pointer"
      style={{
        background: project.gradient,
        boxShadow: hovered
          ? `0 0 60px ${project.accentColor}25, 0 24px 60px rgba(0,0,0,0.5)`
          : '0 8px 40px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.4s ease',
        border: `1px solid ${hovered ? project.accentColor + '40' : 'rgba(255,255,255,0.06)'}`,
      }}
    >
      {/* Animated top-edge accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
          opacity: hovered ? 1 : 0.3,
        }}
      />

      {/* Ambient glow orb */}
      <div
        className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${project.accentColor}20 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0.4,
        }}
      />

      {/* Glare effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-overlay"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), transparent 70%)`,
        }}
      />

      <div className="relative z-10 p-8">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-widest"
                style={{ background: `${project.accentColor}18`, color: project.accentColor }}
              >
                <CategoryIcon cat={project.category} />
                {project.subtitle}
              </span>
              <span className="font-mono text-[10px] text-white/30 tracking-widest">{project.year}</span>
            </div>
            <h3
              className="font-display text-3xl md:text-4xl uppercase tracking-tight text-white transition-colors duration-300"
              style={{ color: hovered ? project.accentColor : 'white' }}
            >
              {project.title}
            </h3>
            <p className="text-xs font-mono text-white/40 mt-1 uppercase tracking-widest">{project.role}</p>
          </div>

          <motion.a
            href={`/work/${project.id}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full"
            style={{
              background: hovered ? project.accentColor : 'rgba(255,255,255,0.06)',
              border: `1px solid ${hovered ? project.accentColor : 'rgba(255,255,255,0.1)'}`,
              color: hovered ? '#080808' : 'white',
              transition: 'all 0.3s ease',
            }}
          >
            <ArrowUpRight size={18} />
          </motion.a>
        </div>

        {/* Description */}
        <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-lg">{project.desc}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-[11px] font-mono rounded-full transition-colors duration-300"
              style={{
                background: hovered ? `${project.accentColor}10` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${hovered ? project.accentColor + '40' : 'rgba(255,255,255,0.08)'}`,
                color: hovered ? project.accentColor : 'rgba(255,255,255,0.5)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer: metrics + CTA */}
        <div className="flex items-center justify-between gap-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex flex-wrap gap-2">
            {project.metrics?.map((m) => (
              <MetricChip key={m.label} label={m.label} value={m.value} color={project.accentColor} />
            ))}
          </div>

          <motion.a
            href={`/work/${project.id}`}
            whileHover={{ x: 4 }}
            className="shrink-0 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest"
            style={{ color: project.accentColor }}
          >
            Case Study <ArrowUpRight size={12} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Featured Card ──────────────────────────────────── */
const FeaturedCard = ({ project }: { project: Project }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative col-span-full rounded-3xl overflow-hidden cursor-pointer"
      style={{
        background: project.gradient,
        minHeight: '420px',
        border: `1px solid ${hovered ? project.accentColor + '50' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered
          ? `0 0 100px ${project.accentColor}20, 0 32px 80px rgba(0,0,0,0.6)`
          : '0 16px 60px rgba(0,0,0,0.5)',
        transition: 'all 0.5s ease',
      }}
    >
      {/* FEATURED label */}
      <div
        className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{ background: `${project.accentColor}18`, border: `1px solid ${project.accentColor}35` }}
      >
        <Layers size={11} style={{ color: project.accentColor }} />
        <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: project.accentColor }}>
          Featured
        </span>
      </div>

      {/* Large accent glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${project.accentColor}15 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />

      {/* Top edge line */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accentColor}80, transparent)`,
          opacity: hovered ? 1 : 0.6,
        }}
      />

      {/* Glare effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-overlay"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), transparent 70%)`,
        }}
      />

      <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row md:items-end gap-8 h-full min-h-[420px]">
        {/* Left — content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-[10px] uppercase tracking-widest"
              style={{ background: `${project.accentColor}18`, color: project.accentColor }}
            >
              <CategoryIcon cat={project.category} />
              {project.subtitle}
            </span>
            <span className="font-mono text-[10px] text-white/30 tracking-widest">{project.year}</span>
          </div>

          <h3
            className="font-display text-5xl md:text-7xl uppercase tracking-tight mb-4 leading-none transition-colors duration-400"
            style={{ color: hovered ? project.accentColor : 'white' }}
          >
            {project.title}
          </h3>
          <p className="text-white/50 text-base leading-relaxed max-w-xl mb-6">{project.desc}</p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-[11px] font-mono rounded-full transition-colors duration-300"
                style={{
                  background: hovered ? `${project.accentColor}10` : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${hovered ? project.accentColor + '40' : 'rgba(255,255,255,0.08)'}`,
                  color: hovered ? project.accentColor : 'rgba(255,255,255,0.5)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right — metrics + CTA */}
        <div className="flex flex-col items-start md:items-end gap-6 shrink-0">
          <div className="flex flex-wrap gap-3">
            {project.metrics?.map((m) => (
              <MetricChip key={m.label} label={m.label} value={m.value} color={project.accentColor} />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              href={`/work/${project.id}`}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-7 py-4 rounded-full font-bold text-sm uppercase tracking-widest"
              style={{
                background: project.accentColor,
                color: '#080808',
                boxShadow: `0 0 40px ${project.accentColor}40`,
              }}
            >
              View Case Study <ArrowUpRight size={16} />
            </motion.a>

            {project.category === 'video' && (
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-14 h-14 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <Play size={20} className="text-white ml-0.5" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Tab Pill ───────────────────────────────────────── */
const tabs: { key: Category; label: string; icon: React.ReactNode }[] = [
  { key: 'fullstack', label: 'Fullstack', icon: <Code2 size={15} /> },
  { key: 'video', label: 'Video Editing', icon: <Film size={15} /> },
];

/* ─── Export ─────────────────────────────────────────── */
export default function Showcase({ hideHeader = false }: { hideHeader?: boolean }) {
  const [active, setActive] = useState<Category>('fullstack');
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  const featured = projects.find((p) => p.category === active && p.featured);
  const rest = projects.filter((p) => p.category === active && !p.featured);

  useEffect(() => {
    setActive('fullstack');
  }, []);

  return (
    <section id="showcase" className="relative py-32 bg-bg overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px]"
          style={{
            background: 'radial-gradient(ellipse 60% 60% at 50% 50%, oklch(0.75 0.18 280 / 0.06) 0%, transparent 80%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* ── Section Header ── */}
        {!hideHeader && (
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-5">
            <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">
              [ // Showcase ]
            </span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] uppercase tracking-[0.02em] text-white leading-[0.9]">
              THE{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-300 to-indigo-300">
                WORK
              </span>
            </h2>

            {/* Tab switcher */}
            <div
              className="flex items-center gap-1 p-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {tabs.map((tab) => (
                <motion.button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  className="relative flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-mono uppercase tracking-widest transition-colors duration-300"
                  style={{
                    color: active === tab.key ? '#080808' : 'rgba(255,255,255,0.45)',
                  }}
                >
                  {active === tab.key && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'oklch(0.75 0.18 280)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {tab.icon}
                    {tab.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
        )}

        {/* Tab switcher shown separately when header is hidden */}
        {hideHeader && (
          <div className="flex items-center justify-between mb-10">
            <div
              className="flex items-center gap-1 p-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {tabs.map((tab) => (
                <motion.button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  className="relative flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-mono uppercase tracking-widest transition-colors duration-300"
                  style={{ color: active === tab.key ? '#080808' : 'rgba(255,255,255,0.45)' }}
                >
                  {active === tab.key && (
                    <motion.div
                      layoutId="tab-indicator-2"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'oklch(0.75 0.18 280)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {tab.icon}
                    {tab.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* ── Projects Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Featured card — full width */}
            {featured && <FeaturedCard project={featured} />}

            {/* Regular cards */}
            {rest.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mt-20"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-white border uppercase font-mono text-sm tracking-widest"
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(10px)',
            }}
          >
            Start a Project Together <ArrowUpRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
