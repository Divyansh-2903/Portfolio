import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github, MessageCircle, ArrowUpRight, Zap, Check, Copy } from 'lucide-react';

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
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);
  const isEmail = s.label === 'Email';

  // Performance tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isEmail) return;
    e.preventDefault();
    navigator.clipboard.writeText('divyanshsaxena2903@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.a
      ref={ref}
      href={isEmail ? undefined : s.href}
      target={s.href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      onClick={handleClick}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.06 * index, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => {
        setHovered(true);
        opacity.set(1);
      }}
      onMouseLeave={() => {
        setHovered(false);
        opacity.set(0);
      }}
      onMouseMove={handleMove}
      className="relative group flex items-center gap-4 p-5 rounded-2xl cursor-pointer overflow-hidden"
      style={{
        background: s.gradient,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        transition: 'all 0.4s ease',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px transition-opacity duration-400"
        style={{
          background: `linear-gradient(90deg, transparent, ${s.accentColor}, transparent)`,
      {/* Glare effect powered by MotionValues */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          opacity,
          background: glareBackground,
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
          color: copied ? '#22c55e' : hovered ? s.accentColor : 'rgba(255,255,255,0.35)',
          boxShadow: hovered ? `0 0 16px ${s.accentColor}30` : 'none',
        }}
      >
        <AnimatePresence mode="wait">
          {isEmail && copied ? (
            <motion.span key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
              <Check size={16} color="#22c55e" />
            </motion.span>
          ) : (
            <motion.span key="icon" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
              <s.icon size={18} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Text */}
      <div className="relative z-10 flex-1 min-w-0">
        <p
          className="text-sm font-semibold leading-none mb-1 transition-colors duration-300"
          style={{ color: (isEmail && copied) ? '#22c55e' : (hovered ? s.accentColor : 'rgba(255,255,255,0.85)') }}
        >
          {isEmail && copied ? 'Copied!' : s.label}
        </p>
        <p className="font-mono text-[11px] truncate" style={{ color: 'rgba(255,255,255,0.3)' }}>
          {s.sub}
        </p>
      </div>

      {/* Arrow / Copy icon */}
      {isEmail ? (
        <Copy
          size={14}
          className="relative z-10 flex-shrink-0 transition-all duration-300"
          style={{ color: hovered ? s.accentColor : 'rgba(255,255,255,0.12)' }}
        />
      ) : (
        <ArrowUpRight
          size={15}
          className="relative z-10 flex-shrink-0 transition-all duration-300"
          style={{
            color: hovered ? s.accentColor : 'rgba(255,255,255,0.12)',
            transform: hovered ? 'translate(2px,-2px)' : 'none',
          }}
        />
      )}
    </motion.a>
  );
}

/* ─── Glow Input ─────────────────────────────────────────── */
function GlowInput({
  id, label, type = 'text', placeholder, as = 'input', rows, options,
  inputRef, selectRef, textareaRef,
}: {
  id: string; label: string; type?: string; placeholder?: string;
  as?: 'input' | 'textarea' | 'select'; rows?: number;
  options?: { value: string; label: string }[];
  inputRef?: React.RefObject<HTMLInputElement>;
  selectRef?: React.RefObject<HTMLSelectElement>;
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
}) {
  const [focused, setFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (as !== 'select') return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [as]);

  const sharedClass = `w-full bg-[rgba(255,255,255,0.03)] rounded-xl px-4 py-3 text-white text-sm font-body placeholder-white/20 outline-none appearance-none transition-all duration-300 resize-none`;
  const sharedStyle: React.CSSProperties = {
    border: `1px solid ${focused || isOpen ? 'oklch(0.75 0.18 280 / 0.5)' : 'rgba(255,255,255,0.07)'}`,
    boxShadow: focused || isOpen ? '0 0 0 3px oklch(0.75 0.18 280 / 0.08), 0 0 20px oklch(0.75 0.18 280 / 0.1)' : 'none',
    background: focused || isOpen ? 'rgba(167,139,250,0.04)' : 'rgba(255,255,255,0.03)',
  };

  return (
    <div className={`space-y-2 ${as === 'select' ? 'relative' : ''}`} ref={containerRef}>
      <label htmlFor={id} className="block text-[11px] font-mono uppercase tracking-[0.2em] text-white/35">
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea ref={textareaRef} id={id} rows={rows || 4} placeholder={placeholder} className={`${sharedClass} leading-relaxed`}
          style={sharedStyle} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      ) : as === 'select' ? (
        <>
          {/* Hidden select to preserve form refs & native behaviour */}
          <select ref={selectRef} id={id} value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} className="hidden">
            <option value="">Select…</option>
            {options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          {/* Custom Select Trigger */}
          <div
            onClick={() => { setIsOpen(!isOpen); setFocused(!isOpen); }}
            className={`${sharedClass} cursor-pointer flex items-center justify-between select-none`}
            style={{ ...sharedStyle, color: selectedValue ? 'white' : 'rgba(255,255,255,0.3)' }}
          >
            <span>{selectedValue ? options?.find(o => o.value === selectedValue)?.label : 'Select…'}</span>
            <motion.svg animate={{ rotate: isOpen ? 180 : 0 }} className="w-3 h-3 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </div>

          {/* Custom Select Dropdown Options */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl overflow-hidden backdrop-blur-xl"
                style={{
                  background: 'rgba(10, 5, 20, 0.95)',
                  border: '1px solid rgba(167,139,250,0.2)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.6), 0 0 20px rgba(167,139,250,0.1)',
                }}
              >
                <div className="max-h-60 overflow-y-auto py-1">
                  <div
                    onClick={() => { setSelectedValue(''); setIsOpen(false); setFocused(false); }}
                    className="px-4 py-3 text-sm text-white/40 hover:bg-white/5 hover:text-white cursor-pointer transition-colors"
                  >
                    Select…
                  </div>
                  {options?.map((o) => (
                    <div
                      key={o.value}
                      onClick={() => { setSelectedValue(o.value); setIsOpen(false); setFocused(false); }}
                      className={`px-4 py-3 text-sm cursor-pointer transition-colors ${
                        selectedValue === o.value
                          ? 'bg-primary/20 text-primary'
                          : 'text-white/80 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {o.label}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <input ref={inputRef} id={id} type={type} placeholder={placeholder} className={sharedClass}
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
  const [showOptional, setShowOptional] = useState(false);

  // Refs to read form values
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const socialRef = useRef<HTMLInputElement>(null);
  const budgetRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    const name    = nameRef.current?.value    || '';
    const email   = emailRef.current?.value   || '';
    const phone   = phoneRef.current?.value   || '';
    const social  = socialRef.current?.value  || '';
    const budget  = budgetRef.current?.value  || '';
    const type    = typeRef.current?.value    || '';
    const message = messageRef.current?.value || '';

    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    setSending(true);

    try {
      const formspreeId = import.meta.env.VITE_FORMSPREE_ID || 'mvzdoewb';
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          social,
          budget,
          projectType: type,
          message
        })
      });

      if (response.ok) {
        setSent(true);
        // Clear form
        if (nameRef.current) nameRef.current.value = '';
        if (emailRef.current) emailRef.current.value = '';
        if (phoneRef.current) phoneRef.current.value = '';
        if (socialRef.current) socialRef.current.value = '';
        if (messageRef.current) messageRef.current.value = '';
        setShowOptional(false);
        setTimeout(() => setSent(false), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again or email me directly.');
    } finally {
      setSending(false);
    }
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
                <GlowInput id="name" label="Full Name" placeholder="Divyansh Saxena" inputRef={nameRef} />
                <GlowInput id="email" type="email" label="Email Address" placeholder="you@example.com" inputRef={emailRef} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <GlowInput id="budget" label="Budget Range" as="select" selectRef={budgetRef} options={[
                  { value: '0-100', label: '$0 – $100' },
                  { value: '100-1k', label: '$100 – $1,000' },
                  { value: '1k-5k', label: '$1,000 – $5,000' },
                  { value: '5k-10k', label: '$5,000 – $10,000' },
                  { value: '10k+', label: '$10,000+' },
                ]} />
                <GlowInput id="type" label="Project Type" as="select" selectRef={typeRef} options={[
                  { value: 'web', label: 'Web Development' },
                  { value: 'video', label: 'Video Editing' },
                  { value: 'motion', label: 'Motion Graphics' },
                  { value: 'design', label: 'UI / UX Design' },
                ]} />
              </div>

              <div className="flex items-center py-1">
                <label htmlFor="showOptional" className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className="relative flex items-center justify-center w-5 h-5 rounded transition-all duration-300"
                    style={{
                      background: showOptional ? '#a78bfa' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${showOptional ? '#a78bfa' : 'rgba(255,255,255,0.1)'}`,
                      boxShadow: showOptional ? '0 0 12px rgba(167,139,250,0.4)' : 'none',
                    }}
                  >
                    <input
                      type="checkbox"
                      id="showOptional"
                      checked={showOptional}
                      onChange={(e) => setShowOptional(e.target.checked)}
                      className="sr-only"
                    />
                    <Check
                      size={14}
                      strokeWidth={4}
                      className={`transition-all duration-300 ${showOptional ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                      style={{ color: '#1a0845' }}
                    />
                  </div>
                  <span className="text-[11px] font-mono text-white/40 group-hover:text-white/70 transition-colors uppercase tracking-widest select-none">
                    More Details
                  </span>
                </label>
              </div>

              <AnimatePresence>
                {showOptional && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-2">
                      <GlowInput id="phone" label="Phone / WhatsApp" placeholder="e.g. +91 00000 00000" type="tel" inputRef={phoneRef} />
                      <GlowInput id="social" label="Social Media" placeholder="e.g. instagram.com/yourname" inputRef={socialRef} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <GlowInput id="message" label="Message" as="textarea" rows={5} placeholder="Tell me what you're building…" textareaRef={messageRef} />

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
