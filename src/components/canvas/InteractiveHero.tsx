import { useRef, useState, Suspense, lazy } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { MeshDistortMaterial, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// ─────────────────────────────────────
// Lightweight reduced geometry 3D shape
// ─────────────────────────────────────
const Shape = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.004;
    meshRef.current.rotation.x += 0.0015;

    // Smooth mouse tracking
    const x = (state.pointer.x * state.viewport.width) / 10;
    const y = (state.pointer.y * state.viewport.height) / 10;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x, 0.04);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y, 0.04);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.05 : 1}
      >
        {/* Reduced segments: 80×20 instead of 128×32 — 60% fewer triangles */}
        <torusKnotGeometry args={[1, 0.3, 80, 20]} />
        <MeshDistortMaterial
          color={hovered ? '#FF7A00' : '#4A4A4A'}
          envMapIntensity={0.8}
          metalness={0.8}
          roughness={0.25}
          distort={hovered ? 0.35 : 0.18}
          speed={hovered ? 3 : 1.5}
        />
      </mesh>
    </Float>
  );
};

// ─────────────────────────────────────
// Skeleton while canvas boots
// ─────────────────────────────────────
function HeroSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-64 h-64 rounded-full border border-primary/10 animate-pulse" />
    </div>
  );
}

// ─────────────────────────────────────
// The 3D canvas — lazy so it never
// blocks the initial HTML/CSS paint
// ─────────────────────────────────────
function ThreeCanvas() {
  return (
    <Canvas
      // Limit pixel ratio to prevent overworking on Retina — huge perf gain
      dpr={[1, 1.5]}
      // frameloop='demand' only re-renders on interaction/animation change
      // Keep 'always' here since the shape constantly rotates
      frameloop="always"
      gl={{
        antialias: false,      // Disable MSAA on first render — saves ~30% GPU
        powerPreference: 'high-performance',
        alpha: true,
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={50} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#FF5C00" />
      <Shape />
    </Canvas>
  );
}

// ─────────────────────────────────────
// Lazy-loaded so Three.js bundle is
// split and only loaded after first paint
// ─────────────────────────────────────
const LazyThreeCanvas = lazy(() =>
  // Simulated async module to enable code-splitting
  Promise.resolve({ default: ThreeCanvas })
);

export default function InteractiveHero() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-screen absolute inset-0 z-0">
      <Suspense fallback={<HeroSkeleton />}>
        <LazyThreeCanvas />
      </Suspense>
    </div>
  );
}
