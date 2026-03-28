import { motion } from 'framer-motion';

export default function SocialProof() {
  const stats = [
    '5+ International Clients',
    '3 Products Launched',
    '3+ Years Building',
    '10+ Projects Delivered',
  ];

  return (
    <section className="w-full border-b border-white/10 bg-surface/30 py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center sm:justify-between gap-4 md:gap-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-4 md:gap-8">
              <span className="font-mono text-sm md:text-base text-text-primary tracking-wider uppercase">
                {stat}
              </span>
              {index < stats.length - 1 && (
                <span className="text-primary/50 hidden sm:block">·</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
