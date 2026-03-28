import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, PerspectiveCamera, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const Shape = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  // Subtle rotation + Mouse Tracking
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Base rotation
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.x += 0.002;
    
    // Mouse tracking lerping
    const x = (state.pointer.x * state.viewport.width) / 10;
    const y = (state.pointer.y * state.viewport.height) / 10;
    
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y, 0.05);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.05 : 1}
      >
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshDistortMaterial
          color={hovered ? "#FF7A00" : "#4A4A4A"} // Switch to orange on hover, silver default
          envMapIntensity={1}
          metalness={0.8}
          roughness={0.2}
          distort={hovered ? 0.4 : 0.2} // Distort more on hover
          speed={hovered ? 4 : 2}
        />
      </mesh>
    </Float>
  );
};

export default function InteractiveHero() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-screen absolute inset-0 z-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={50} />
        
        {/* Lighting setup */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#FF5C00" />
        <spotLight position={[0, 10, 0]} intensity={1} angle={0.3} penumbra={1} color="#FF5C00" />
        
        <Shape />
      </Canvas>
    </div>
  );
}
