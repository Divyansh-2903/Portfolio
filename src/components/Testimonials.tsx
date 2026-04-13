import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Star, TrendingUp, Users, DollarSign, Quote } from 'lucide-react';

/* ─── Types ─────────────────────────────────────────── */
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  initials: string;
  color: string;
  rating: number;
  quote: string;
  metric: { label: string; value: string; positive: boolean };
}

/* ─── Data ───────────────────────────────────────────── */
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Aryan Mehta',
    role: 'CEO',
    company: 'Helix Fintech',
    initials: 'AM',
    color: '#a78bfa',
    rating: 5,
    quote: "Divyansh didn't just build the product — he built the experience. Our user retention jumped 3× in the first month after launch. The motion design alone converted investors.",
    metric: { label: 'User Retention', value: '+310%', positive: true },
  },
  {
    id: 2,
    name: 'Sarah Lin',
    role: 'Founder',
    company: 'GrindXGrowth',
    initials: 'SL',
    color: '#818cf8',
    rating: 5,
    quote: "I had a vision in my head and he made it real — better than I imagined. The dashboard he built is the centrepiece of every client demo we run. It sells itself.",
    metric: { label: 'Close Rate', value: '+220%', positive: true },
  },
  {
    id: 3,
    name: 'Marcus Webb',
    role: 'Creative Director',
    company: 'Aura Wellness',
    initials: 'MW',
    color: '#60a5fa',
    rating: 5,
    quote: "The launch video package he delivered was absolutely cinematic. ROAS went from 2× to 6.2× in two weeks. Our paid social has never performed like this.",
    metric: { label: 'Ad ROAS', value: '6.2×', positive: true },
  },
  {
    id: 4,
    name: 'Priya Nair',
    role: 'Head of Marketing',
    company: 'LaunchPad Studios',
    initials: 'PN',
    color: '#f472b6',
    rating: 5,
    quote: "The social motion pack transformed our Instagram presence overnight. Our engagement tripled and follower growth hit 40% month-over-month. Money extremely well spent.",
    metric: { label: 'Engagement', value: '+340%', positive: true },
  },
  {
    id: 5,
    name: 'Daniel Park',
    role: 'CTO',
    company: 'OneClipHub',
    initials: 'DP',
    color: '#c084fc',
    rating: 5,
    quote: "Shipped in 6 weeks flat, zero security issues at launch, and the codebase is genuinely a joy to extend. Developers rarely think about business outcomes — he always does.",
    metric: { label: 'Time to Market', value: '6 weeks', positive: true },
  },
  {
    id: 6,
    name: 'Tina Russo',
    role: 'Brand Manager',
    company: 'Helix Fintech',
    initials: 'TR',
    color: '#e879f9',
    rating: 5,
    quote: "The brand reel got us into TechCrunch. I saw it and literally said 'this is the best thing we've ever made'. It still gives me chills on the 50th watch.",
    metric: { label: 'Press Pickups', value: '12', positive: true },
  },
  {
    id: 7,
    name: 'James O\'Neill',
    role: 'Founder',
    company: 'EarlyStage Capital',
    initials: 'JO',
    color: '#34d399',
    rating: 5,
    quote: "I've worked with 20+ developers. The gap between Divyansh and everyone else isn't technical skill — it's taste. He understands what makes something feel premium.",
    metric: { label: 'Portfolio Companies', value: '8', positive: true },
  },
  {
    id: 8,
    name: 'Nadia Hossain',
    role: 'Head of Product',
    company: 'Founders: Untold',
    initials: 'NH',
    color: '#fb923c',
    rating: 5,
    quote: "200 hours of footage distilled into something that makes people cry in a good way. The average watch time on our documentary series is 18 minutes. That's unheard of.",
    metric: { label: 'Avg Watch Time', value: '18 min', positive: true },
  },
];

/* ─── Animated Counter ───────────────────────────────── */
function AnimatedCounter({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 50, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(to);
  }, [inView, motionVal, to]);

  useEffect(() => {
    return springVal.on('change', (v) => setDisplay(Math.round(v)));
  }, [springVal]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

/* ─── Stat Bar ───────────────────────────────────────── */
const stats = [
  { icon: <TrendingUp size={18} />, label: 'Avg Engagement Lift', value: 340, suffix: '%+', prefix: '' },
  { icon: <Users size={18} />, label: 'Clients Happy', value: 12, suffix: '', prefix: '' },
  { icon: <DollarSign size={18} />, label: 'Revenue Influenced', value: 2.4, suffix: 'M', prefix: '$' },
];

/* ─── Star Rating ─────────────────────────────────────── */
const StarRating = ({ rating, color }: { rating: number; color: string }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={13}
        fill={i < rating ? color : 'transparent'}
        stroke={i < rating ? color : 'rgba(255,255,255,0.2)'}
      />
    ))}
  </div>
);

/* ─── Single Testimonial Card ─────────────────────────── */
const TestimonialCard = ({ t }: { t: Testimonial; key?: React.Key }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 w-[340px] md:w-[400px] rounded-2xl p-7 cursor-default select-none transition-all duration-300 group"
      style={{
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? t.color + '35' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered ? `0 0 40px ${t.color}12, 0 12px 40px rgba(0,0,0,0.4)` : '0 4px 20px rgba(0,0,0,0.3)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top decorative quote mark */}
      <div
        className="absolute top-5 right-6 transition-opacity duration-300"
        style={{ color: t.color, opacity: hovered ? 0.25 : 0.1 }}
      >
        <Quote size={40} />
      </div>

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px rounded-t-2xl transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`,
          opacity: hovered ? 0.7 : 0.2,
        }}
      />

      {/* Avatar + identity */}
      <div className="flex items-center gap-4 mb-5">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: `${t.color}20`, border: `1px solid ${t.color}35`, color: t.color }}
        >
          {t.initials}
        </div>
        <div>
          <p className="text-white font-semibold text-sm leading-none mb-1">{t.name}</p>
          <p className="text-white/40 text-xs font-mono">{t.role} · {t.company}</p>
        </div>
      </div>

      {/* Stars */}
      <div className="mb-4">
        <StarRating rating={t.rating} color={t.color} />
      </div>

      {/* Quote */}
      <p className="text-white/65 text-sm leading-relaxed mb-6 relative z-10">
        "{t.quote}"
      </p>

      {/* Metric chip */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{ background: `${t.color}12`, border: `1px solid ${t.color}25` }}
      >
        <TrendingUp size={11} style={{ color: t.color }} />
        <span className="font-mono text-[11px]" style={{ color: t.color }}>
          {t.metric.value}
        </span>
        <span className="font-mono text-[11px] text-white/40">{t.metric.label}</span>
      </div>
    </div>
  );
};

/* ─── Marquee Row ─────────────────────────────────────── */
function MarqueeRow({ items, direction = 1, speed = 35 }: { items: Testimonial[]; direction?: 1 | -1; speed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);

  /* Duplicate list for seamless loop */
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-3">
      <motion.div
        ref={trackRef}
        className="flex gap-5 w-max"
        animate={{
          x: direction === 1 ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
        }}
        whileHover={{ animationPlayState: 'paused' } as any}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Export ─────────────────────────────────────────── */
export default function Testimonials() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  const row1 = testimonials.slice(0, 4);
  const row2 = testimonials.slice(4, 8);

  return (
    <section id="testimonials" className="relative py-32 bg-bg overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, oklch(0.75 0.18 280 / 0.05) 0%, transparent 80%)',
          filter: 'blur(80px)',
        }}
      />

      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-5">
            <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">
              [ Client Signals ]
            </span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] uppercase tracking-[0.02em] text-white leading-[0.9]">
              WHAT THEY{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-300 to-indigo-300">
                SAY
              </span>
            </h2>

            {/* Stat chips */}
            <div className="flex flex-wrap gap-6">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col items-start">
                  <div className="flex items-center gap-2 text-primary mb-1">
                    {s.icon}
                    <span className="font-display text-3xl md:text-4xl text-white">
                      <AnimatedCounter to={s.value} prefix={s.prefix} suffix={s.suffix} />
                    </span>
                  </div>
                  <span className="text-white/35 font-mono text-[10px] uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Marquee rows — full bleed ── */}
      <div className="relative z-10">
        {/* Fade masks on left + right */}
        <div
          className="absolute inset-y-0 left-0 w-32 pointer-events-none z-20"
          style={{ background: 'linear-gradient(to right, #080808 0%, transparent 100%)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-32 pointer-events-none z-20"
          style={{ background: 'linear-gradient(to left, #080808 0%, transparent 100%)' }}
        />

        <MarqueeRow items={row1} direction={1} speed={40} />
        <MarqueeRow items={row2} direction={-1} speed={45} />
      </div>

      {/* ── Bottom divider ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mt-20 relative z-10">
        <div
          className="h-px w-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.3), transparent)' }}
        />
      </div>
    </section>
  );
}
