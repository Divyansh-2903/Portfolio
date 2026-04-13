import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import _Marquee from 'react-fast-marquee';
const Marquee = (_Marquee as any).default || _Marquee;

interface MenuItem {
  link: string;
  text: string;
  image: string;
}

interface FlowingMenuProps {
  items: MenuItem[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
}

export default function FlowingMenu({
  items,
  speed = 15,
  textColor = '#ffffff',
  bgColor = '#060010',
  marqueeBgColor = '#ffffff',
  marqueeTextColor = '#060010',
  borderColor = '#ffffff'
}: FlowingMenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden flex flex-col justify-center"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex flex-col w-full border-t border-opacity-20" style={{ borderColor }}>
        {items.map((item, index) => {
          const isHovered = hoveredIndex === index;
          
          return (
            <div
              key={index}
              className="relative w-full border-b border-opacity-20 overflow-hidden cursor-pointer"
              style={{ borderColor }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => { if (item.link !== '#') window.location.href = item.link; }}
            >
              {/* Normal Text */}
              <motion.div
                initial={false}
                animate={{ y: isHovered ? '-100%' : '0%' }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                className="w-full py-6 md:py-8 px-6 md:px-12 flex justify-between items-center"
              >
                <span className="font-display text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter" style={{ color: textColor }}>
                  {item.text}
                </span>
              </motion.div>

              {/* Marquee shown on hover */}
              <motion.div
                initial={false}
                animate={{ y: isHovered ? '0%' : '100%' }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                className="absolute inset-0 w-full h-full flex items-center"
                style={{ backgroundColor: marqueeBgColor }}
              >
                <Marquee speed={speed} autoFill className="overflow-hidden py-6 md:py-8">
                  <span 
                    className="font-display text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter px-8" 
                    style={{ color: marqueeTextColor }}
                  >
                    {item.text} <span className="mx-4 opacity-30">•</span>
                  </span>
                </Marquee>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Floating Image */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: mousePos.x - 150, 
              y: mousePos.y - 120 
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 250, 
              mass: 0.5,
              opacity: { duration: 0.2 }
            }}
            className="absolute rounded-xl overflow-hidden pointer-events-none z-50 shadow-2xl"
            style={{ width: 300, height: 240 }}
          >
            <img 
              src={items[hoveredIndex].image} 
              alt={items[hoveredIndex].text}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
