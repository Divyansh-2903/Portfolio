import { motion } from 'framer-motion';

export default function About() {
  const stats = [
    { label: 'Projects Built', value: '21' },
    { label: 'Countries Worked With', value: '5+' },
    { label: 'Products Launched', value: '3' },
    { label: 'Currently', value: '1st Year BTech' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-primary font-mono text-sm tracking-widest uppercase">03 / About</span>
            <div className="h-px bg-white/10 flex-grow max-w-xs"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tight">
            THE BUILDER
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Photo / Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-5 relative rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-auto bg-surface border border-white/5"
          >
            <img
              src="https://picsum.photos/seed/divyansh/800/1000?blur=1"
              alt="Divyansh Saxena"
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/50 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-xs font-mono text-white">Jaipur, India</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Top: Punchy Lines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
              className="p-8 md:p-12 rounded-3xl bg-surface border border-white/5 flex-grow flex flex-col justify-center"
            >
              <h3 className="text-2xl md:text-4xl font-bold leading-tight mb-6">
                I don't just write code or edit videos. <br className="hidden md:block" />
                <span className="text-primary">I architect digital experiences that convert.</span>
              </h3>
              <p className="text-text-secondary text-lg">
                Obsessed with the intersection of cinematic storytelling and functional engineering. Every frame is calculated, every interaction is intentional. I build for the obsidian field where precision outweighs density.
              </p>
            </motion.div>

            {/* Bottom: Stat Cards */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="p-6 rounded-3xl bg-surface border border-white/5 flex flex-col justify-between aspect-square md:aspect-auto md:h-40 glow-hover"
                >
                  <span className="text-sm font-mono text-text-secondary uppercase tracking-wider">{stat.label}</span>
                  <span className="text-4xl md:text-5xl font-numbers font-bold text-white">{stat.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Currently Learning Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4 }}
          className="mt-6 p-6 rounded-3xl bg-surface border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="text-primary font-mono text-sm uppercase">Currently Learning</span>
            <div className="hidden md:block w-8 h-px bg-white/20"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-mono text-text-secondary">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">After Effects</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">DSA</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Content Marketing</span>
          </div>
        </motion.div>

        {/* Honest Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-xl md:text-2xl font-medium italic text-white/50 max-w-3xl mx-auto">
            "I'm a 20-year-old builder from Jaipur who takes client work as seriously as personal projects."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
