import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Marketing Director, USA',
      quote: 'Divyansh completely transformed our video content strategy. The editing is cinematic and retention has skyrocketed.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Founder, Canada',
      quote: 'Built our MVP in record time. The code quality and attention to UI details are unmatched for someone his age.',
      rating: 5,
    },
    {
      name: 'Elena Rodriguez',
      role: 'Content Creator, UK',
      quote: 'The motion graphics he added to my channel intro gave it the professional edge I was looking for. Highly recommend.',
      rating: 5,
    },
    {
      name: 'David Smith',
      role: 'Agency Owner, Australia',
      quote: 'A rare talent who understands both the technical engineering side and the creative storytelling side.',
      rating: 5,
    },
    {
      name: 'Alex Johnson',
      role: 'Startup CTO, USA',
      quote: 'Delivered a complex full-stack feature ahead of schedule. Communication was excellent throughout the project.',
      rating: 5,
    },
  ];

  const TestimonialCard = ({ t }: { t: typeof testimonials[0]; key?: number | string }) => (
    <div className="w-[350px] md:w-[450px] p-8 mx-4 rounded-3xl bg-surface border border-white/5 flex flex-col justify-between h-full glow-hover">
      <div>
        <div className="flex items-center gap-1 mb-6">
          {[...Array(t.rating)].map((_, i) => (
            <Star key={i} size={16} className="fill-primary text-primary" />
          ))}
        </div>
        <p className="text-text-primary text-lg md:text-xl leading-relaxed mb-8">
          "{t.quote}"
        </p>
      </div>
      <div>
        <h4 className="font-bold text-white">{t.name}</h4>
        <p className="text-sm font-mono text-text-secondary uppercase tracking-wider">{t.role}</p>
      </div>
    </div>
  );

  return (
    <section className="py-24 relative overflow-hidden bg-bg">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-primary font-mono text-sm tracking-widest uppercase">04 / Trust</span>
            <div className="h-px bg-white/10 flex-grow max-w-xs"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tight">
            WHAT CLIENTS SAY
          </h2>
        </motion.div>
      </div>

      <div className="flex flex-col gap-8 relative">
        {/* Fade Edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none"></div>

        <Marquee gradient={false} speed={40} pauseOnHover className="py-4">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </Marquee>

        <Marquee gradient={false} speed={30} direction="right" pauseOnHover className="py-4">
          {[...testimonials].reverse().map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
