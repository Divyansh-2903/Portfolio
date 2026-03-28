import React from 'react';
import { motion } from 'framer-motion';

export default function TechStack() {
  const tools = [
    { name: 'React', color: '#61DAFB' },
    { name: 'Next.js', color: '#FFFFFF' },
    { name: 'Node.js', color: '#339933' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Tailwind', color: '#06B6D4' },
    { name: 'Supabase', color: '#3ECF8E' },
    { name: 'Vercel', color: '#FFFFFF' },
    { name: 'Figma', color: '#F24E1E' },
    { name: 'Premiere Pro', color: '#9999FF' },
    { name: 'After Effects', color: '#9999FF' },
    { name: 'Claude', color: '#D97757' },
    { name: 'Framer', color: '#0055FF' },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-white/10 w-16"></div>
            <span className="text-primary font-mono text-sm tracking-widest uppercase">06 / Tools</span>
            <div className="h-px bg-white/10 w-16"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tight">
            TECH STACK
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05 }}
              className="group relative flex items-center justify-center h-24 rounded-2xl bg-surface border border-white/5 overflow-hidden cursor-default"
              style={{ '--hover-color': tool.color } as React.CSSProperties}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundColor: tool.color }}
              ></div>
              
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `inset 0 0 20px ${tool.color}33` }}
              ></div>

              <span className="font-mono text-sm md:text-base text-text-secondary group-hover:text-white transition-colors duration-300 z-10">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
