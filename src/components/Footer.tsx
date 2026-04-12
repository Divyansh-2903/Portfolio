import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { Mail, Phone } from 'lucide-react';


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-bg border-t border-white/10">

      {/* ── "Let's work together" marquee strip ─────────────── */}
      <div className="border-b border-white/10 py-5 overflow-hidden">
        <Marquee
          gradient={false}
          speed={60}
          autoFill
          className="overflow-hidden"
        >
          <span className="text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white/10 select-none px-6">
            Let's work together
          </span>
          <span className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-primary/30 select-none px-4">
            ✳
          </span>
        </Marquee>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col items-center justify-center gap-10">

          {/* ── Full Name (large) ──────────────────────────── */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-7xl md:text-[110px] font-display uppercase tracking-tighter text-white/10 select-none text-center leading-none"
          >
            Divyansh&nbsp;Saxena
          </motion.h2>

          {/* ── Availability Badge ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-surface/50 backdrop-blur-md"
          >
            <span className="relative z-10 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="relative z-10 text-sm font-mono text-text-secondary">
              Currently open to freelance — Updated {currentYear}
            </span>
          </motion.div>

          {/* ── Contact Info ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10"
          >
            <a
              href="mailto:divyanshsaxena2903@gmail.com"
              className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors duration-200 text-sm font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded"
            >
              <Mail size={16} className="text-primary" />
              divyanshsaxena2903@gmail.com
            </a>
            <span className="hidden sm:block w-px h-5 bg-white/10" />
            <a
              href="tel:+918302506868"
              className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors duration-200 text-sm font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded"
            >
              <Phone size={16} className="text-primary" />
              +91 83025 06868
            </a>
          </motion.div>

          {/* ── Bottom Bar ─────────────────────────────────── */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5 mt-4">
            <p className="text-xs font-mono text-text-secondary">
              &copy; {currentYear} Divyansh Saxena. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#work"
                className="text-xs font-mono text-text-secondary hover:text-primary transition-colors duration-200"
              >
                Work
              </a>
              <a
                href="#about"
                className="text-xs font-mono text-text-secondary hover:text-primary transition-colors duration-200"
              >
                About
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-text-secondary hover:text-primary transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-text-secondary hover:text-primary transition-colors duration-200"
              >
                LinkedIn
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
