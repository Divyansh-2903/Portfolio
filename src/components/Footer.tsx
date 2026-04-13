import { motion } from 'framer-motion';
import _Marquee from 'react-fast-marquee';
const Marquee = (_Marquee as any).default || _Marquee;
import { Mail, Phone, Github, Linkedin, MessageCircle } from 'lucide-react';
import { useState } from 'react';

/* ─── Social Icon ───────────────────────────────────────── */
function SocialIcon({
  href, icon: Icon, label, color,
}: { href: string; icon: React.FC<{ size?: number }>; label: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      whileHover={{ y: -3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
      style={{
        background: hovered ? `${color}18` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? color + '45' : 'rgba(255,255,255,0.07)'}`,
        color: hovered ? color : 'rgba(255,255,255,0.3)',
        boxShadow: hovered ? `0 0 18px ${color}25` : 'none',
      }}
    >
      <Icon size={15} />
    </motion.a>
  );
}

/* ─── Footer ─────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-50 overflow-hidden bg-bg">

      {/* ── Gradient backdrop ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-16 left-1/3 w-[600px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, #a78bfa10 0%, transparent 60%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] rounded-full"
          style={{ background: 'radial-gradient(circle, #818cf812 0%, transparent 60%)', filter: 'blur(70px)' }} />
      </div>

      {/* ── Top border accent ── */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #a78bfa40 35%, #818cf840 65%, transparent 100%)' }} />

      {/* ── Marquee ── */}
      <div className="relative border-b overflow-hidden py-5" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, var(--color-bg, #09091a), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(-90deg, var(--color-bg, #09091a), transparent)' }} />

        <Marquee gradient={false} speed={50} autoFill className="overflow-hidden">
          <span
            className="font-display font-black uppercase tracking-tight select-none px-6 text-5xl sm:text-6xl"
            style={{
              background: 'linear-gradient(135deg, rgba(167,139,250,0.22) 0%, rgba(129,140,248,0.18) 50%, rgba(167,139,250,0.22) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            LET'S WORK TOGETHER
          </span>
          <span className="text-4xl select-none px-4" style={{ color: 'rgba(167,139,250,0.2)' }}>✳</span>
        </Marquee>
      </div>

      {/* ── Body ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-16 pb-10">

        {/* Large ghosted name */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black uppercase leading-none select-none tracking-tighter text-center mb-10"
          style={{
            fontSize: 'clamp(3.5rem, 12vw, 10rem)',
            background: 'linear-gradient(135deg, rgba(167,139,250,0.14) 0%, rgba(255,255,255,0.06) 40%, rgba(129,140,248,0.12) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Divyansh&nbsp;Saxena
        </motion.h2>

        {/* Availability + contact row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-5 mb-12"
        >
          {/* Availability badge */}
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
            style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="font-mono text-xs text-green-400/60 tracking-wide">Currently open to freelance — Updated {year}</span>
          </div>

          {/* Contact links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <a href="mailto:divyanshsaxena2903@gmail.com"
              className="flex items-center gap-2 font-mono text-xs text-white/30 hover:text-primary transition-colors duration-200">
              <Mail size={13} className="text-primary/50" />
              divyanshsaxena2903@gmail.com
            </a>
            <span className="hidden sm:block w-px h-4 bg-white/08" />
            <a href="tel:+918302506868"
              className="flex items-center gap-2 font-mono text-xs text-white/30 hover:text-primary transition-colors duration-200">
              <Phone size={13} className="text-primary/50" />
              +91 83025 06868
            </a>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.15), transparent)' }} />

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="font-mono text-[11px] text-white/18 tracking-widest uppercase">
            © {year} Divyansh Saxena · All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <SocialIcon href="https://github.com/Divyansh-2903" icon={Github} label="GitHub" color="#e2e8f0" />
            <SocialIcon href="https://linkedin.com" icon={Linkedin} label="LinkedIn" color="#0A66C2" />
            <SocialIcon href="mailto:divyanshsaxena2903@gmail.com" icon={Mail} label="Email" color="#a78bfa" />
            <SocialIcon href="https://wa.me/918302506868" icon={MessageCircle} label="WhatsApp" color="#25D366" />
          </div>

          <a href="#hero"
            className="font-mono text-[11px] uppercase tracking-widest text-white/18 hover:text-primary/60 transition-colors duration-300">
            ↑ Back to top
          </a>
        </motion.div>
      </div>

      {/* ── Bottom glow edge ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, oklch(0.75 0.18 280 / 0.25), transparent)' }} />
    </footer>
  );
}
