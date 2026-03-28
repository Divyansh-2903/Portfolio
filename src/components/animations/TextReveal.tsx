import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  wordMode?: boolean; // If true, cuts by word. By default (false), could cut by line or char, though word is easiest.
}

export default function TextReveal({ children, className = '', delay = 0, wordMode = true }: TextRevealProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.reveal-item', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 80,
      opacity: 0,
      rotateX: -45,
      stagger: 0.04,
      duration: 1.2,
      ease: 'power3.out',
      delay,
    });
  }, { scope: container });

  // Simple word splitter
  const renderText = () => {
    if (wordMode) {
      return children.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 -mb-1 mr-[0.25em]">
          <span className="reveal-item inline-block origin-bottom-left" style={{ perspective: '1000px' }}>
            {word}
          </span>
        </span>
      ));
    }
    // Alternatively split by characters if needed
    return children.split('').map((char, i) => (
      <span key={i} className="inline-block overflow-hidden pb-1 -mb-1">
        <span className="reveal-item inline-block origin-bottom-left" style={{ perspective: '1000px' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      </span>
    ));
  };

  return (
    <div ref={container} className={`${className}`}>
      {renderText()}
    </div>
  );
}
