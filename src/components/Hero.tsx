import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import Marquee from 'react-fast-marquee';
import InteractiveHero from './canvas/InteractiveHero';
import TextReveal from './animations/TextReveal';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Animate the bottom description, name, and CTA buttons after the text reveal
    gsap.from('.hero-fade-up', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.8,
    });
  }, { scope: container });

  const skills = [
    'REACT', 'NEXT.JS', 'NODE.JS', 'VIDEO EDITING', 'MOTION GRAPHICS',
    'AFTER EFFECTS', 'DIGITAL MARKETING', 'TYPESCRIPT'
  ];

  return (
    <section ref={container} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Background Grid/Dots */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Interactive 3D Canvas Background for Hero */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
         <InteractiveHero />
      </div>

      {/* Grid overlay to create blueprint aesthetic over 3D */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 pointer-events-none">
        {/* Left Content */}
        <div className="flex flex-col gap-6 pointer-events-auto">
          <div className="space-y-4">
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[100px] leading-[0.85] tracking-tight uppercase text-white drop-shadow-2xl">
              <TextReveal delay={0.1} wordMode={false}>I BUILD DIGITAL</TextReveal>
              <div className="text-primary mt-2">
                <TextReveal delay={0.4} wordMode={false}>EXPERIENCES.</TextReveal>
              </div>
            </h1>
          </div>

          <p className="hero-fade-up text-lg md:text-xl text-text-secondary font-medium max-w-lg mt-4 drop-shadow-md">
            Fullstack Developer · Video Editor · Motion Graphics Designer — Based in India
          </p>

          <div className="hero-fade-up text-sm font-mono text-white/50 uppercase tracking-widest">
            Divyansh Saxena
          </div>

          <div className="hero-fade-up flex flex-wrap items-center gap-4 pt-4">
            <a href="#work" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-primary overflow-hidden rounded-full transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,92,0,0.3)] hover:shadow-[0_0_30px_rgba(255,92,0,0.5)]">
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
              <span className="relative flex items-center gap-2">
                See My Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a href="#contact" className="group inline-flex items-center justify-center px-8 py-4 font-bold text-white border border-white/20 rounded-full hover:bg-white/5 transition-all hover:border-primary/50 active:scale-95 backdrop-blur-sm">
              <span className="flex items-center gap-2">
                Let's Talk <Mail size={18} />
              </span>
            </a>
          </div>
        </div>

        {/* Right Content is now acting as an overlay container if needed, but 3D is global to Hero */}
        <div className="w-full h-full hidden lg:block pointer-events-none">
          {/* Empty spacer to balance layout since 3D is absolute behind everything */}
        </div>
      </div>

      {/* Skills Marquee */}
      <div className="absolute bottom-0 left-0 right-0 border-y border-white/10 bg-surface/50 backdrop-blur-md py-3 z-20 pointer-events-auto flex">
        <Marquee gradient={false} speed={40} autoFill={true} className="overflow-hidden flex-1">
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
