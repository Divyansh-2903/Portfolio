import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Linkedin, Github, MessageCircle, ArrowUpRight, Zap } from 'lucide-react';

/* ─── Custom Icons ────────────────────────────────────────── */
const WhatsappIcon = ({ size = 24, ...props }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

/* ─── Social Links Data ─────────────────────────────────── */
const socials = [
  {
    href: 'mailto:divyanshsaxena2903@gmail.com',
    icon: Mail,
    label: 'Email',
    sub: 'divyanshsaxena2903@gmail.com',
    accentColor: '#a78bfa',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #0d0122 40%, #1d0845 100%)',
  },
  {
    href: 'https://www.linkedin.com/in/saxenadivyansh/',
    icon: Linkedin,
    label: 'LinkedIn',
    sub: '/in/saxenadivyansh',
    accentColor: '#60a5fa',
    gradient: 'linear-gradient(135deg, #020f1a 0%, #010810 60%, #020d18 100%)',
  },
  {
    href: 'https://wa.me/918302506868',
    icon: WhatsappIcon,
    label: 'WhatsApp',
    sub: '+91 83025 06868',
    accentColor: '#34d399',
    gradient: 'linear-gradient(135deg, #021a0e 0%, #010d07 60%, #031a10 100%)',
  },
  {
    href: 'https://github.com/Divyansh-2903',
    icon: Github,
    label: 'GitHub',
    sub: '/Divyansh-2903',
    accentColor: '#e2e8f0',
    gradient: 'linear-gradient(135deg, #0f1117 0%, #080b10 60%, #0c1020 100%)',
  },
];

/* ─── Social Card ────────────────────────────────────────── */
function SocialCard({ s, index }: { s: typeof socials[0]; index: number; key?: string | number }) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <motion.a
      ref={ref}
      href={s.href}
      target={s.href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.06 * index, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMove}
      className="relative group flex items-center gap-4 p-5 rounded-2xl cursor-pointer overflow-hidden"
      style={{
        background: s.gradient,
        border: `1px solid ${hovered ? s.accentColor + '50' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered
          ? `0 0 50px ${s.accentColor}20, 0 16px 48px rgba(0,0,0,0.5)`
          : '0 8px 32px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.4s ease, border-color 0.3s ease',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px transition-opacity duration-400"
        style={{
          background: `linear-gradient(90deg, transparent, ${s.accentColor}, transparent)`,
          opacity: hovered ? 1 : 0.25,
        }}
      />
      {/* Glare */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle 200px at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.12), transparent 70%)`,
        }}
      />
      {/* Ambient top-right glow */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${s.accentColor}20 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0.3,
        }}
      />

      {/* Icon */}
      <div
        className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{
          background: hovered ? `${s.accentColor}18` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${hovered ? s.accentColor + '40' : 'rgba(255,255,255,0.08)'}`,
          color: hovered ? s.accentColor : 'rgba(255,255,255,0.35)',
          boxShadow: hovered ? `0 0 16px ${s.accentColor}30` : 'none',
        }}
      >
        <s.icon size={18} />
      </div>

      {/* Text */}
      <div className="relative z-10 flex-1 min-w-0">
        <p
          className="text-sm font-semibold leading-none mb-1 transition-colors duration-300"
          style={{ color: hovered ? s.accentColor : 'rgba(255,255,255,0.85)' }}
        >
          {s.label}
        </p>
        <p className="font-mono text-[11px] truncate" style={{ color: 'rgba(255,255,255,0.3)' }}>
          {s.sub}
        </p>
      </div>

      {/* Arrow */}
      <ArrowUpRight
        size={15}
        className="relative z-10 flex-shrink-0 transition-all duration-300"
        style={{
          color: hovered ? s.accentColor : 'rgba(255,255,255,0.12)',
          transform: hovered ? 'translate(2px,-2px)' : 'none',
        }}
      />
    </motion.a>
  );
}

/* ─── Glow Input ─────────────────────────────────────────── */
function GlowInput({
  id, label, type = 'text', placeholder, as = 'input', rows, options,
}: {
  id: string; label: string; type?: string; placeholder?: string;
  as?: 'input' | 'textarea' | 'select'; rows?: number;
  options?: { value: string; label: string }[];
}) {
  const [focused, setFocused] = useState(false);
  const sharedClass = `w-full bg-[rgba(255,255,255,0.03)] rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 outline-none appearance-none transition-all duration-300 resize-none`;
  const sharedStyle: React.CSSProperties = {
    border: `1px solid ${focused ? 'oklch(0.75 0.18 280 / 0.5)' : 'rgba(255,255,255,0.07)'}`,
    boxShadow: focused ? '0 0 0 3px oklch(0.75 0.18 280 / 0.08), 0 0 20px oklch(0.75 0.18 280 / 0.1)' : 'none',
    background: focused ? 'rgba(167,139,250,0.04)' : 'rgba(255,255,255,0.03)',
  };

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-[11px] font-mono uppercase tracking-[0.2em] text-white/35">
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea id={id} rows={rows || 4} placeholder={placeholder} className={`${sharedClass} leading-relaxed`}
          style={sharedStyle} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      ) : as === 'select' ? (
        <select id={id} className={`${sharedClass} cursor-pointer`}
          style={{ ...sharedStyle, color: 'rgba(255,255,255,0.7)' }}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
          <option value="" style={{ background: '#080808' }}>Select…</option>
          {options?.map((o) => (
            <option key={o.value} value={o.value} style={{ background: '#080808' }}>{o.label}</option>
          ))}
        </select>
      ) : (
        <input id={id} type={type} placeholder={placeholder} className={sharedClass}
          style={sharedStyle} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      )}
    </div>
  );
}

/* ─── Main Contact Section ───────────────────────────────── */
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1800);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 bg-bg overflow-hidden">

      {/* ── Showcase-style multi-colour gradient orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Bright lavender — top-left (hero color) */}
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, #c4b5fd22 0%, transparent 60%)', filter: 'blur(80px)' }} />
        {/* Deep purple — center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, #a78bfa18 0%, transparent 60%)', filter: 'blur(100px)' }} />
        {/* Pink — top-right */}
        <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, #f472b612 0%, transparent 60%)', filter: 'blur(70px)' }} />
        {/* Lavender beam — bottom center, mimicking hero floor glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, #c4b5fd18 0%, transparent 70%)', filter: 'blur(60px)' }} />
        {/* Green — bottom-left */}
        <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, #34d39910 0%, transparent 60%)', filter: 'blur(70px)' }} />
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
            <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">[ Start Something ]</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="font-display text-[clamp(3.5rem,10vw,9rem)] uppercase tracking-[0.02em] leading-[0.85] text-white">
              LET'S{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-300 to-indigo-300">
                TALK
              </span>
            </h2>
            <p className="text-white/35 font-mono text-sm leading-relaxed max-w-xs lg:text-right">
              Got a project, idea, or just want to explore what's possible?<br />
              Drop me a message — I read every one.
            </p>
          </div>
        </motion.div>

        {/* ── Purple divider ── */}
        <div
          className="h-px w-full mb-16"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.25), transparent)' }}
        />

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 lg:gap-8">

          {/* ── LEFT: Form Card — dark purple gradient like OneClipHub ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl p-8 md:p-10 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1e0b3e 0%, #0e0526 40%, #1a0840 100%)',
              border: '1px solid rgba(196,181,253,0.18)',
              boxShadow: '0 16px 60px rgba(0,0,0,0.5), 0 0 80px rgba(196,181,253,0.04)',
            }}
          >
            {/* Top accent line — bright lavender */}
            <div className="absolute inset-x-0 top-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #c4b5fdaa, #a78bfa80, transparent)' }} />
            {/* Ambient glow orb — bright lavender */}
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, #c4b5fd20 0%, transparent 70%)' }} />
            {/* Bottom-left secondary orb */}
            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, #818cf818 0%, transparent 70%)' }} />
            {/* Corner dots */}
            <div className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full" style={{ background: '#c4b5fd50' }} />
            <div className="absolute bottom-6 left-6 w-1 h-1 rounded-full" style={{ background: '#c4b5fd30' }} />

            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <GlowInput id="name" label="Full Name" placeholder="Divyansh Saxena" />
                <GlowInput id="email" type="email" label="Email Address" placeholder="you@example.com" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <GlowInput id="budget" label="Budget Range" as="select" options={[
                  { value: '<1k', label: '< $1,000' },
                  { value: '1k-5k', label: '$1,000 – $5,000' },
                  { value: '5k-10k', label: '$5,000 – $10,000' },
                  { value: '10k+', label: '$10,000+' },
                ]} />
                <GlowInput id="type" label="Project Type" as="select" options={[
                  { value: 'web', label: 'Web Development' },
                  { value: 'video', label: 'Video Editing' },
                  { value: 'motion', label: 'Motion Graphics' },
                  { value: 'design', label: 'UI / UX Design' },
                ]} />
              </div>
              <GlowInput id="message" label="Message" as="textarea" rows={5} placeholder="Tell me what you're building…" />

              <motion.button
                type="button"
                onClick={handleSend}
                disabled={sending || sent}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase overflow-hidden transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: sent
                    ? 'linear-gradient(135deg, #22C55E20, #22C55E10)'
                    : 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 50%, #818cf8 100%)',
                  border: sent ? '1px solid #22C55E40' : '1px solid rgba(196,181,253,0.35)',
                  boxShadow: sent ? '0 0 20px #22C55E20' : '0 0 40px rgba(196,181,253,0.25), 0 4px 24px rgba(0,0,0,0.4)',
                  color: sent ? '#22C55E' : '#1a0845',
                }}
              >
                {/* Shimmer */}
                <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)', transform: 'skewX(-10deg)' }} />
                <span className="relative z-10 flex items-center justify-center gap-2 font-black">
                  {sent ? (
                    <><span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-xs" style={{ color: '#fff' }}>✓</span><span style={{ color: '#22C55E' }}>Message Sent</span></>
                  ) : sending ? (
                    <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Sending…</>
                  ) : (
                    <><Zap size={15} />Send Message</>
                  )}
                </span>
              </motion.button>
              <p className="text-center text-[11px] font-mono text-white/20 tracking-widest uppercase">Typically replies within 24 hours</p>
            </form>
          </motion.div>

          {/* ── RIGHT: Social links + Book a call ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            {/* Social cards with showcase gradients */}
            {socials.map((s, i) => <SocialCard key={s.label} s={s} index={i} />)}

            {/* WhatsApp CTA card — dark green like Social Motion Pack */}
            <motion.a
              href="https://wa.me/918302506868"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="relative group flex flex-col items-center text-center p-7 rounded-2xl overflow-hidden cursor-pointer mt-1"
              style={{
                background: 'linear-gradient(135deg, #021a0e 0%, #010d07 60%, #031a10 100%)',
                border: '1px solid rgba(52,211,153,0.2)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
              }}
            >
              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-px transition-opacity duration-300 group-hover:opacity-100 opacity-30"
                style={{ background: 'linear-gradient(90deg, transparent, #34d399, transparent)' }} />
              {/* Glow orb */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle, #34d39920 0%, transparent 70%)' }} />

              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 relative z-10"
                style={{
                  background: 'rgba(52,211,153,0.1)',
                  border: '1px solid rgba(52,211,153,0.3)',
                  boxShadow: '0 0 20px rgba(52,211,153,0.2)',
                }}>
                <WhatsappIcon size={22} style={{ color: '#34d399' }} />
              </div>
              <h3 className="text-white font-bold text-base mb-1.5 relative z-10">Chat on WhatsApp</h3>
              <p className="text-white/30 font-mono text-xs leading-relaxed mb-5 max-w-[200px] relative z-10">
                Prefer a quick chat? Reach me directly on WhatsApp.
              </p>
              <span
                className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{
                  background: 'linear-gradient(135deg, #34d399, #10b981)',
                  boxShadow: '0 0 24px rgba(52,211,153,0.3)',
                  color: '#022c1a',
                }}
              >
                <WhatsappIcon size={13} /> Message Me
              </span>
            </motion.a>
          </motion.div>
        </div>

        {/* ── Bottom divider ── */}
        <div className="h-px w-full mt-20"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.2), transparent)' }} />
      </div>
    </section>
  );
}
