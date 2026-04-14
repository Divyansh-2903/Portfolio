import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Target, Lightbulb, Play, Code2, ArrowRight } from 'lucide-react';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function CaseStudyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const currentIndex = projects.findIndex(p => p.id === id);
  
  if (currentIndex === -1) {
    return <Navigate to="/work" replace />;
  }

  const project = projects[currentIndex];
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const { content } = project;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 bg-[#060010] min-h-screen text-white overflow-hidden"
    >
      {/* ─── Hero Section ─── */}
      <div className="relative h-[70vh] min-h-[600px] flex items-end pb-24 overflow-hidden">
        {/* Background Gradient & Blur */}
        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div 
            className="absolute inset-0 opacity-40 blur-3xl"
            style={{ background: project.gradient }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060010] via-[#060010]/80 to-transparent" />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <Link 
            to="/work" 
            className="group inline-flex items-center gap-2 text-white/50 hover:text-white font-mono text-sm tracking-widest uppercase mb-12 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Work
          </Link>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: project.accentColor, boxShadow: `0 0 10px ${project.accentColor}` }}
              />
              <span className="font-mono text-sm tracking-[0.2em] uppercase text-white/70">
                {project.category} / {project.year}
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] uppercase tracking-tight mb-6">
              {project.title}
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl md:text-3xl text-white/50 font-light max-w-2xl leading-relaxed">
              {project.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* ─── Project Metadata Grid ─── */}
      <div className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div>
              <h3 className="font-mono text-xs text-white/40 tracking-widest uppercase mb-2">Role</h3>
              <p className="text-white/80">{project.role}</p>
            </div>
            <div>
              <h3 className="font-mono text-xs text-white/40 tracking-widest uppercase mb-2">Tech / Tools</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-white/80 whitespace-nowrap">{t}</span>
                ))}
              </div>
            </div>
            {project.metrics?.map((m, i) => (
              <div key={i}>
                <h3 className="font-mono text-xs text-white/40 tracking-widest uppercase mb-2">{m.label}</h3>
                <p className="text-white/80">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Article Content ─── */}
      <article className="max-w-4xl mx-auto px-6 py-24 md:py-32 space-y-32">
        
        {/* Context & Problem */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          <div className="font-mono text-sm tracking-widest uppercase text-white/40 top-32 sticky h-fit">
            01. Background
          </div>
          <div className="space-y-12">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <h2 className="text-3xl font-display uppercase tracking-wider mb-6">Context</h2>
              <p className="text-white/70 text-lg leading-relaxed">{content.context}</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <h2 className="text-3xl font-display uppercase tracking-wider mb-6">The Problem</h2>
              <div className="text-white/70 text-lg leading-relaxed whitespace-pre-wrap">
                {content.problem}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Goals */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          <div className="font-mono text-sm tracking-widest uppercase text-white/40 top-32 sticky h-fit">
            02. Objectives
          </div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="space-y-6"
          >
            <h2 className="text-3xl font-display uppercase tracking-wider mb-8">Goals</h2>
            <div className="space-y-4">
              {content.goals.map((goal, i) => (
                <div key={i} className="flex gap-4 items-start p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors">
                  <Target className="w-6 h-6 shrink-0 mt-1" style={{ color: project.accentColor }} />
                  <p className="text-white/80 text-lg">{goal}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Process */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          <div className="font-mono text-sm tracking-widest uppercase text-white/40 top-32 sticky h-fit">
            03. Execution
          </div>
          <div className="space-y-12 relative">
            {/* Connecting Line */}
            <div className="absolute left-8 top-10 bottom-10 w-px bg-white/10 hidden md:block" />

            <h2 className="text-3xl font-display uppercase tracking-wider mb-8 text-white relative z-10">The Process</h2>
            
            <div className="space-y-16">
              {content.process.map((step, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeUp}
                  className="relative z-10 md:pl-20"
                >
                  {/* Step Number Dot */}
                  <div className="absolute left-0 top-1 w-16 h-16 bg-[#060010] flex items-center justify-center hidden md:flex font-mono text-2xl text-white/20 border border-white/10 rounded-full">
                    {i + 1}
                  </div>
                  <h3 className="text-2xl font-light mb-4">{step.title}</h3>
                  <p className="text-white/60 text-lg leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Outcomes & Learnings */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          <div className="font-mono text-sm tracking-widest uppercase text-white/40 top-32 sticky h-fit">
            04. Results
          </div>
          <div className="space-y-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <h2 className="text-3xl font-display uppercase tracking-wider mb-8">Outcomes</h2>
              <div className="space-y-4">
                {content.outcomes.map((outcome, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0 mt-1" />
                    <p className="text-white/80 text-lg">{outcome}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <h2 className="text-3xl font-display uppercase tracking-wider mb-8">Learnings</h2>
              <div className="space-y-4">
                {content.learnings.map((learning, i) => (
                  <div key={i} className="flex gap-4 items-start p-6 bg-[#0a1128]/50 border border-blue-500/10 rounded-2xl">
                    <Lightbulb className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                    <p className="text-blue-100/70 text-lg">{learning}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </article>

      {/* ─── Next Project Footer ─── */}
      <button 
        onClick={() => navigate(`/work/${nextProject.id}`)}
        className="w-full relative group cursor-pointer block text-left"
      >
        <div className="absolute inset-0 bg-white/[0.02] border-t border-white/5 transition-colors group-hover:bg-white/[0.04]" />
        
        {/* Next project gradient reveal on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-2xl"
          style={{ background: nextProject.gradient }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32 flex flex-col items-center justify-center text-center">
          <p className="font-mono text-sm tracking-[0.3em] text-white/40 uppercase mb-8">Next Case Study</p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-tight text-white/50 group-hover:text-white transition-colors duration-500 mb-8">
            {nextProject.title}
          </h2>
          <div className="flex items-center gap-2 text-white/50 group-hover:text-white transition-colors">
            <span className="font-mono text-sm tracking-widest uppercase">View Project</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </div>
      </button>

    </motion.main>
  );
}
