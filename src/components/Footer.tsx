import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 md:py-24 relative overflow-hidden bg-bg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-12">
          {/* Large Name */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-6xl sm:text-8xl md:text-[150px] font-display uppercase tracking-tighter text-white/10 select-none text-center"
          >
            DIVYANSH
          </motion.h2>

          {/* Status Indicator */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-surface/50 backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
            </span>
            <span className="text-sm font-mono text-text-secondary">
              Currently open to freelance — Updated March {currentYear}
            </span>
          </div>

          {/* Links & Copyright */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-white/5">
            <p className="text-sm font-mono text-text-secondary">
              &copy; {currentYear} Divyansh Saxena. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a href="#" className="text-sm font-mono text-text-secondary hover:text-primary transition-colors">Privacy</a>
              <a href="#work" className="text-sm font-mono text-text-secondary hover:text-primary transition-colors">Work</a>
              <a href="#" className="text-sm font-mono text-text-secondary hover:text-primary transition-colors">GitHub</a>
              <a href="#" className="text-sm font-mono text-text-secondary hover:text-primary transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
