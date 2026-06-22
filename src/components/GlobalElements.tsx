import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion';

export default function GlobalElements() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const cursorX = useSpring(mouseX, { stiffness: 1000, damping: 50, mass: 0.2 });
  const cursorY = useSpring(mouseY, { stiffness: 1000, damping: 50, mass: 0.2 });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[150]"
        style={{ scaleX }}
      />

      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-primary pointer-events-none z-[200] mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          left: -8,
          top: -8,
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.5 : 1,
        }}
      />
    </>
  );
}
