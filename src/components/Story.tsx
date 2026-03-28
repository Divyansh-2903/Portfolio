import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Story() {
  const container = useRef<HTMLElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      num: '01',
      title: 'DISCOVERY',
      desc: 'We start by aligning your business goals with the technical architecture. No code until the roadmap is crystal clear.',
    },
    {
      num: '02',
      title: 'DESIGN & MOTION',
      desc: 'I craft the interface. Not just the static layout, but the cinematic motion, timings, and interaction design.',
    },
    {
      num: '03',
      title: 'DEVELOPMENT',
      desc: 'Writing clean, scalable code. Building for performance from the ground up, ensuring a buttery-smooth experience.',
    },
    {
      num: '04',
      title: 'DELIVERY',
      desc: 'Final polish, SEO optimization, and deployment. The result is an experience that converts and impresses.',
    },
  ];

  useGSAP(() => {
    // Pin the container and slide the content horizontally
    const slides = gsap.utils.toArray('.story-slide');
    
    gsap.to(slides, {
      xPercent: -100 * (slides.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        scrub: 1, // Smooth scrubbing
        end: () => `+=${container.current?.offsetWidth || 2000}`,
      },
    });

    // Animate the line that connects them
    gsap.to('.progress-line-fill', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        scrub: 1,
        start: 'top top',
        end: () => `+=${container.current?.offsetWidth || 2000}`,
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="h-screen bg-bg relative flex flex-col justify-center overflow-hidden">
      <div className="absolute top-12 left-6 md:left-12 lg:left-24 z-10 flex items-center gap-4">
        <span className="text-primary font-mono text-sm tracking-widest uppercase">04 / The Process</span>
        <div className="h-px bg-white/10 w-24"></div>
      </div>

      <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2 overflow-hidden pointer-events-none z-0">
        <div className="progress-line-fill w-full h-full bg-primary origin-left scale-x-0" />
      </div>

      <div ref={slidesRef} className="flex h-full items-center w-[400vw] lg:w-[300vw]">
        {steps.map((step, i) => (
          <div key={i} className="story-slide flex-shrink-0 w-screen flex flex-col items-center justify-center px-6">
            <div className="max-w-xl text-center relative z-10 p-12 bg-surface/50 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl">
              <span className="text-6xl md:text-8xl font-numbers font-bold text-white/5 absolute -top-12 -left-6 select-none">
                {step.num}
              </span>
              <h3 className="text-4xl md:text-6xl font-display uppercase tracking-tight mb-6">
                {step.title}
              </h3>
              <p className="text-xl text-text-secondary leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
