import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/PortfolioDataContext';

// 3D Developer Core Object
function DevCore({ isDark }) {
  const meshRef = useRef();
  const wireRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mouseX = state.mouse.x * 0.4;
    const mouseY = state.mouse.y * 0.4;

    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2 + mouseY;
      meshRef.current.rotation.y = time * 0.25 + mouseX;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -time * 0.15 - mouseY;
      wireRef.current.rotation.y = -time * 0.2 - mouseX;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = time * 0.3;
      innerRef.current.rotation.z = time * 0.25;
    }
  });

  return (
    <group>
      {/* Outer Wireframe Icosahedron */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.1, 1]} />
        <meshStandardMaterial
          wireframe
          color={isDark ? '#e4e4e7' : '#27272a'}
          transparent
          opacity={isDark ? 0.35 : 0.25}
        />
      </mesh>

      {/* Floating Modern Polyhedron */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.4, 0]} />
        <MeshDistortMaterial
          color={isDark ? '#18181b' : '#f4f4f5'}
          roughness={0.2}
          metalness={0.8}
          distort={0.25}
          speed={1.5}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh ref={innerRef}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial
          color={isDark ? '#ffffff' : '#090a0c'}
          emissive={isDark ? '#27272a' : '#18181b'}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

export const Hero3D = () => {
  const { theme } = useTheme();
  const { settings } = usePortfolioData();
  const [mounted, setMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isEnabled = settings?.threeDEnabled !== false;

  if (!mounted || !isEnabled || hasError) {
    // Graceful CSS Fallback
    return (
      <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
        <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-3xl border border-charcoal-300 dark:border-charcoal-700 bg-gradient-to-br from-charcoal-100/40 to-charcoal-200/20 dark:from-charcoal-900/60 dark:to-charcoal-800/30 backdrop-blur-xl flex flex-col items-center justify-center p-6 shadow-2xl animate-float">
          <div className="font-mono text-3xl font-bold text-charcoal-900 dark:text-white mb-2">
            &lt;/&gt;
          </div>
          <span className="text-xs font-mono text-charcoal-500 uppercase tracking-widest">
            Full Stack Dev
          </span>
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-charcoal-400 to-charcoal-600 dark:from-zinc-500 dark:to-zinc-800 opacity-20 blur-lg pointer-events-none" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[480px] flex items-center justify-center">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-charcoal-400 border-t-transparent animate-spin" />
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          className="cursor-grab active:cursor-grabbing"
          onError={() => setHasError(true)}
        >
          <ambientLight intensity={theme === 'dark' ? 0.7 : 0.9} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <pointLight position={[0, 0, 2]} intensity={0.8} />

          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
            <DevCore isDark={theme === 'dark'} />
          </Float>
        </Canvas>
      </Suspense>

      {/* Decorative ambient background glow behind canvas */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-56 h-56 rounded-full bg-charcoal-400/10 dark:bg-white/5 blur-3xl" />
      </div>
    </div>
  );
};
