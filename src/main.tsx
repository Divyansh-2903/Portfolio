import {StrictMode, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePerformanceProfile } from './lib/performance.ts';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

function Root() {
  const { enableSmoothScroll } = usePerformanceProfile();

  useEffect(() => {
    if (!enableSmoothScroll) return;

    // Sync ScrollTrigger with Lenis
    function update(time: number) {
      ScrollTrigger.update();
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, [enableSmoothScroll]);

  if (!enableSmoothScroll) {
    return <App />;
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 0.9, smoothWheel: true, syncTouch: false }}>
      <App />
    </ReactLenis>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
