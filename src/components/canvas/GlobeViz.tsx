import { useEffect, useRef } from 'react';

/**
 * CSS-only animated globe using concentric ellipses to simulate a rotating sphere.
 * Zero WebGL dependency — 100% reliable rendering.
 */
export default function GlobeViz() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate the latitude lines to simulate slow rotation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lines = container.querySelectorAll<HTMLDivElement>('.globe-line');
    let offset = 0;
    let rafId: number;

    const tick = () => {
      offset += 0.2;
      lines.forEach((line, i) => {
        const phase = (i / lines.length) * Math.PI * 2;
        const scale = Math.abs(Math.cos((offset / 80) * Math.PI * 2 + phase));
        // scaleX changes to simulate perspective of longitude lines rotating
        line.style.transform = `scaleX(${Math.max(0.05, scale)})`;
        line.style.opacity = String(0.1 + scale * 0.4);
      });
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Number of longitude lines
  const longitudeCount = 9;
  // Latitude rings
  const latitudeAngles = [-60, -40, -20, 0, 20, 40, 60]; // degrees from equator

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center"
      style={{ aspectRatio: '1/1', position: 'relative' }}
    >
      {/* Globe sphere */}
      <div className="relative" style={{ width: '85%', aspectRatio: '1/1' }}>
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, transparent 60%, rgba(255,92,0,0.08) 80%, transparent 100%)',
            boxShadow: '0 0 60px 20px rgba(255,92,0,0.06)',
          }}
        />

        {/* Main sphere gradient */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 38%, rgba(100,100,110,0.35) 0%, rgba(40,40,45,0.7) 50%, rgba(15,15,18,0.95) 100%)',
            boxShadow: 'inset -20px -20px 60px rgba(0,0,0,0.7), inset 8px 8px 30px rgba(80,80,90,0.15)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        />

        {/* Latitude rings */}
        {latitudeAngles.map((angle, i) => {
          const scale = Math.cos((angle * Math.PI) / 180);
          const top = 50 - (angle / 90) * 50;
          return (
            <div
              key={i}
              className="absolute left-1/2 -translate-x-1/2 rounded-full border border-white/[0.08]"
              style={{
                top: `${top}%`,
                width: `${scale * 100}%`,
                height: '2px',
                transform: `translateX(-50%)`,
                borderRadius: '50%',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(255,255,255,0.07)',
                padding: '6px 0',
                boxSizing: 'border-box',
              }}
            />
          );
        })}

        {/* Rotating longitude lines */}
        {Array.from({ length: longitudeCount }).map((_, i) => (
          <div
            key={i}
            className="globe-line absolute inset-[2%] rounded-full border border-white/20"
            style={{
              borderRadius: '50%',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(255,255,255,0.15)',
              transformOrigin: 'center',
            }}
          />
        ))}

        {/* Jaipur marker — India, approximate position on the sphere */}
        <div
          className="absolute"
          style={{
            top: '38%',   // latitude ~27°N — slightly above equator
            left: '64%',  // longitude ~76°E — right of center
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        >
          {/* Pulsing dot */}
          <div className="relative flex items-center justify-center">
            <div
              className="absolute rounded-full bg-primary/30 animate-ping"
              style={{ width: 16, height: 16 }}
            />
            <div
              className="rounded-full bg-primary shadow-[0_0_8px_2px_rgba(255,92,0,0.6)]"
              style={{ width: 6, height: 6 }}
            />
          </div>
        </div>

        {/* Specular highlight */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: '12%',
            left: '20%',
            width: '30%',
            height: '20%',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)',
            filter: 'blur(4px)',
          }}
        />
      </div>
    </div>
  );
}
