import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { ArrowRight, Mail } from 'lucide-react';
import Marquee from 'react-fast-marquee';

export default function Hero() {
  const skills = [
    'REACT', 'NEXT.JS', 'NODE.JS', 'VIDEO EDITING', 'MOTION GRAPHICS',
    'AFTER EFFECTS', 'DIGITAL MARKETING', 'TYPESCRIPT'
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Background Grid/Dots */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          <div className="space-y-2">
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[100px] leading-[0.85] tracking-tight uppercase text-white">
              I BUILD DIGITAL <br />
              <span className="text-primary">EXPERIENCES.</span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-text-secondary font-medium max-w-lg">
            Fullstack Developer · Video Editor · Motion Graphics Designer — Based in India
          </p>

          <div className="text-sm font-mono text-white/50 uppercase tracking-widest">
            Divyansh Saxena
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a href="#work" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-primary overflow-hidden rounded-full transition-transform hover:scale-105 active:scale-95">
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
              <span className="relative flex items-center gap-2">
                See My Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a href="#contact" className="group inline-flex items-center justify-center px-8 py-4 font-bold text-white border border-white/20 rounded-full hover:bg-white/5 transition-all hover:border-primary/50 active:scale-95">
              <span className="flex items-center gap-2">
                Let's Talk <Mail size={18} />
              </span>
            </a>
          </div>
        </motion.div>

        {/* Right Content - 3D Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[400px] lg:h-[600px] w-full flex items-center justify-center"
        >
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
          
          {/* Spline 3D Scene - Using a placeholder URL, ideally replace with the specific geometric sphere */}
          <div className="w-full h-full relative z-10">
            {/* Fallback/Placeholder for the 3D element if Spline fails or is loading */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <motion.div 
                 animate={{ rotateY: 360, rotateX: 360 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="w-64 h-64 border border-primary/50 rounded-full relative"
                 style={{ transformStyle: 'preserve-3d' }}
               >
                 <div className="absolute inset-0 border border-primary/30 rounded-full" style={{ transform: 'rotateX(45deg)' }} />
                 <div className="absolute inset-0 border border-primary/30 rounded-full" style={{ transform: 'rotateY(45deg)' }} />
                 <div className="absolute inset-0 border border-primary/30 rounded-full" style={{ transform: 'rotateX(90deg)' }} />
               </motion.div>
            </div>
            {/* Uncomment and add actual Spline URL when available */}
            {/* <Spline scene="https://prod.spline.design/YOUR_SCENE_URL/scene.splinecode" /> */}
          </div>
        </motion.div>
      </div>

      {/* Skills Marquee */}
      <div className="absolute bottom-0 left-0 right-0 border-y border-white/10 bg-surface/50 backdrop-blur-sm py-3 z-20">
        <Marquee gradient={false} speed={40} className="overflow-hidden">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center">
              <span className="text-sm font-mono font-medium text-text-secondary px-8 tracking-wider">
                {skill}
              </span>
              <span className="text-primary/50 text-xs">·</span>
            </div>
          ))}
          {/* Duplicate for seamless loop if needed, though react-fast-marquee handles it */}
        </Marquee>
      </div>
    </section>
  );
}
