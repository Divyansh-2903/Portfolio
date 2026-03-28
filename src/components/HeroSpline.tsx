import { lazy, Suspense, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

// Lazy-load Spline to ensure it only runs in the browser (no SSR issues in Vite)
const Spline = lazy(() => import('@splinetool/react-spline'));

/** Skeleton shown while Spline is loading */
function SplineSkeleton() {
  return (
    <div className="absolute inset-0 animate-pulse rounded-3xl overflow-hidden">
      <div className="w-full h-full bg-white/5 rounded-3xl" />
      {/* Simulated orbiting rings as visual hint */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-primary/20 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-primary/10 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-primary/5 rounded-full" />
    </div>
  );
}

/**
 * HeroSpline — Vite-compatible 3D Spline element with cursor-tracking parallax tilt.
 *
 * Workaround strategy (no Next.js needed):
 * - React.lazy() ensures the Spline bundle is never parsed on the server (Vite is client-only anyway)
 * - Suspense provides the skeleton fallback during the async import + scene network load
 * - framer-motion useSpring gives the smooth spring-interpolated tilt on cursor movement
 */
export default function HeroSpline() {
  // Spring physics for smooth tilt response
  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  const rawX = useSpring(0, springConfig);
  const rawY = useSpring(0, springConfig);

  // Map normalized [-1, 1] mouse position → rotation degrees
  const rotateY = useTransform(rawX, [-1, 1], [-12, 12]);
  const rotateX = useTransform(rawY, [-1, 1], [12, -12]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1…+1 range centred on screen
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rawX, rawY]);

  return (
    // Hidden on mobile — the 3D element never leaves a broken/empty container on small screens
    <div
      className="hidden md:block relative w-full min-h-[500px] lg:min-h-[600px]"
      style={{ perspective: '1200px' }}
    >
      {/* Ambient orange glow — always visible for visual warmth even before Spline loads */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-primary/20 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Spring-driven tilt wrapper */}
      <motion.div
        style={{ rotateY, rotateX, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full min-h-[500px] lg:min-h-[600px]"
      >
        <Suspense fallback={<SplineSkeleton />}>
          {/* pointer-events-none prevents the Spline canvas from blocking page scroll */}
          <div className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
            <Spline
              scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </Suspense>
      </motion.div>
    </div>
  );
}
