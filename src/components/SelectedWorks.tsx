import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Tilt Card Component
const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full h-full rounded-3xl overflow-hidden cursor-pointer group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
      {children}
    </motion.div>
  );
};

export default function SelectedWorks() {
  const container = useRef<HTMLElement>(null);
  const projects = [
    {
      id: 'onecliphub',
      title: 'OneClipHub',
      desc: 'An all-in-one SaaS platform for video creators to manage, edit, and distribute content seamlessly.',
      tech: ['Next.js', 'Supabase', 'Tailwind', 'Stripe'],
      image: 'https://picsum.photos/seed/onecliphub/1920/1080?blur=2',
      colSpan: 'md:col-span-2',
      aspect: 'aspect-[16/9] md:aspect-[21/9]',
    },
    {
      id: 'grindxgrowth',
      title: 'GrindXGrowth',
      desc: 'Visual diary and content architecture for a high-growth digital marketing agency.',
      tech: ['React', 'Framer Motion', 'GSAP'],
      image: 'https://picsum.photos/seed/grindxgrowth/1080/1080?blur=2',
      colSpan: 'md:col-span-1',
      aspect: 'aspect-square',
    },
    {
      id: 'onclip-ext',
      title: 'OnClip Extension',
      desc: 'A browser extension that supercharges productivity for video editors.',
      tech: ['TypeScript', 'Chrome API', 'React'],
      image: 'https://picsum.photos/seed/onclipext/1080/1080?blur=2',
      colSpan: 'md:col-span-1',
      aspect: 'aspect-square',
    },
  ];

  useGSAP(() => {
    // Heading reveal
    gsap.from('.work-heading', {
      scrollTrigger: { trigger: container.current, start: 'top 80%' },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    // Parallax entry for work cards
    const cards = gsap.utils.toArray('.work-card');
    cards.forEach((card: any, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });
      
      // Slight parallax on scroll for the image inside
      const img = card.querySelector('.parallax-img');
      if (img) {
        gsap.to(img, {
          yPercent: 10,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      }
    });
  }, { scope: container });

  return (
    <section ref={container} id="work" className="py-24 relative bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="work-heading mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-primary font-mono text-sm tracking-widest uppercase">02 / Work</span>
              <div className="h-px bg-white/10 flex-grow max-w-xs"></div>
            </div>
            <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tight">
              SELECTED_WORKS
            </h2>
          </div>
          <a href="#" className="text-sm font-mono uppercase tracking-widest text-text-secondary hover:text-primary transition-colors flex items-center gap-2">
            View All Projects <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: 1000 }}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`work-card ${project.colSpan} ${project.aspect} relative`}
            >
              <TiltCard className="tilt-inner">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full object-cover">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="parallax-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 origin-center"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end" style={{ transform: "translateZ(50px)" }}>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-mono rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/70 max-w-md line-clamp-2">
                        {project.desc}
                      </p>
                    </div>
                    
                    <a href={`/work/${project.id}`} className="hidden md:flex shrink-0 items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:bg-primary hover:text-white transition-colors">
                      <ArrowUpRight size={24} />
                    </a>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
