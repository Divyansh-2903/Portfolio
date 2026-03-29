import { motion, Variants } from 'framer-motion';
import { Code2, Video, Film, PenTool, Rocket, MonitorSmartphone, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Fullstack Development',
    desc: 'Building scalable, high-performance web applications from database to UI — shipped with precision.',
    tools: ['React', 'Next.js', 'Node.js', 'Supabase', 'Vercel'],
    icon: Code2,
    span: 'md:col-span-7',
    accent: 'from-primary/20',
    featured: true,
  },
  {
    title: 'UI/UX Design',
    desc: 'Intuitive, conversion-driven interfaces that look and feel premium.',
    tools: ['Figma', 'Framer', 'Canva'],
    icon: PenTool,
    span: 'md:col-span-5',
    accent: 'from-blue-500/15',
  },
  {
    title: 'Video Editing',
    desc: 'Cinematic narratives and high-retention content crafted for impact.',
    tools: ['Premiere Pro', 'After Effects', 'CapCut'],
    icon: Video,
    span: 'md:col-span-4',
    accent: 'from-purple-500/15',
  },
  {
    title: 'Motion Graphics',
    desc: 'Bringing static designs to life with fluid, intentional animation.',
    tools: ['After Effects', 'Spline', 'Lottie'],
    icon: Film,
    span: 'md:col-span-4',
    accent: 'from-pink-500/15',
  },
  {
    title: 'SaaS Products',
    desc: 'End-to-end product development, from MVP to launch-ready.',
    tools: ['OneClipHub', 'Browser Extensions', 'Web Apps'],
    icon: Rocket,
    span: 'md:col-span-4',
    accent: 'from-orange-500/15',
  },
  {
    title: 'Digital Strategy',
    desc: 'Growth-focused marketing and content architecture that scales.',
    tools: ['SEO', 'Analytics', 'Content'],
    icon: MonitorSmartphone,
    span: 'md:col-span-12',
    accent: 'from-teal-500/10',
    wide: true,
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.35, duration: 0.7 } },
};

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden bg-bg">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-primary font-mono text-sm tracking-widest uppercase">[ SERVICES ]</span>
            <ArrowRight className="w-4 h-4 text-primary animate-pulse" />
          </div>
          <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tight text-white">
            THE ARSENAL
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                className={`group relative rounded-3xl bg-surface border border-white/5 p-8 overflow-hidden hover:border-white/20 transition-colors duration-300 ${service.span} ${service.wide ? 'flex flex-col md:flex-row md:items-center' : 'flex flex-col'}`}
              >
                {/* Gradient accent */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Icon */}
                <div className="relative z-10 mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:border-white/20 group-hover:bg-white/[0.07] transition-all duration-300 shrink-0">
                  <Icon size={28} className="text-primary" />
                </div>

                {/* Content */}
                <div className={`relative z-10 flex flex-col flex-1 ${service.wide ? 'md:ml-8' : ''}`}>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed flex-grow mb-6">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-mono rounded-full bg-white/[0.04] border border-white/10 text-white/60 group-hover:border-primary/30 group-hover:text-white/80 transition-colors duration-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Subtle number */}
                <span className="absolute bottom-6 right-8 text-6xl font-black text-white/[0.03] select-none pointer-events-none tabular-nums">
                  0{index + 1}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
