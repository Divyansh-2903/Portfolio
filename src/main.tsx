import { StrictMode } from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ReactLenis } from 'lenis/react';
import { usePerformanceProfile } from './lib/performance.ts';

function Root() {
  const { enableSmoothScroll } = usePerformanceProfile();

  if (!enableSmoothScroll) {
    return <App />;
  }

  return (
    <ReactLenis root options={{ lerp: 0.06, duration: 0.75, smoothWheel: true, syncTouch: false }}>
      <App />
    </ReactLenis>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
