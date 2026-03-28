import { motion } from 'framer-motion';
import { Code2, Video, Film, PenTool, Rocket, MonitorSmartphone } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: 'Fullstack Development',
      desc: 'Building scalable, high-performance web applications from database to UI.',
      tools: ['React', 'Next.js', 'Node.js', 'Supabase', 'Vercel'],
      icon: <Code2 size={32} className="text-primary" />,
      colSpan: 'md:col-span-2',
    },
    {
      title: 'Video Editing',
      desc: 'Crafting cinematic narratives and high-retention content.',
      tools: ['Premiere Pro', 'After Effects', 'CapCut'],
      icon: <Video size={32} className="text-primary" />,
      colSpan: 'md:col-span-1',
    },
    {
      title: 'Motion Graphics',
      desc: 'Bringing static designs to life with fluid, intentional animation.',
      tools: ['After Effects', 'Spline', 'Lottie'],
      icon: <Film size={32} className="text-primary" />,
      colSpan: 'md:col-span-1',
    },
    {
      title: 'UI/UX Design',
      desc: 'Designing intuitive interfaces that convert and delight users.',
      tools: ['Figma', 'Framer', 'Canva'],
      icon: <PenTool size={32} className="text-primary" />,
      colSpan: 'md:col-span-1',
    },
    {
      title: 'SaaS Products',
      desc: 'End-to-end product development, from MVP to launch.',
      tools: ['OneClipHub', 'Browser Extensions', 'Web Apps'],
      icon: <Rocket size={32} className="text-primary" />,
      colSpan: 'md:col-span-1',
    },
    {
      title: 'Digital Strategy',
      desc: 'Growth-focused marketing and content architecture.',
      tools: ['SEO', 'Analytics', 'Content Marketing'],
      icon: <MonitorSmartphone size={32} className="text-primary" />,
      colSpan: 'md:col-span-1',
    },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-primary font-mono text-sm tracking-widest uppercase">01 / Services</span>
            <div className="h-px bg-white/10 flex-grow max-w-xs"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tight">
            THE ARSENAL
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className={`group relative p-8 rounded-2xl bg-surface border border-white/5 glow-hover overflow-hidden ${service.colSpan}`}
            >
              {/* Background Shift Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-bg border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-text-secondary mb-8 flex-grow">
                  {service.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {service.tools.map((tool, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 border border-white/10 text-white/70 group-hover:border-primary/30 transition-colors">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
