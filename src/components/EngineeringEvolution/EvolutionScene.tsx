import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AmbientParticles } from './objects/AmbientParticles';
import { CodeParticles } from './objects/CodeParticles';
import { IntelligenceNodes } from './objects/IntelligenceNodes';

interface CameraRigProps {
  progress: number;
  reducedMotion: boolean;
}

const CameraRig: React.FC<CameraRigProps> = ({ progress, reducedMotion }) => {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse -1 to +1
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(({ camera }) => {
    if (reducedMotion) return;

    // Camera Progression:
    // 0.00 - 0.35: Linear subtle forward dolly [0, 0, 6.0 -> 4.8]
    // 0.35 - 0.55: Transition zoom into center [0, 0, 4.8 -> 3.2]
    // 0.55 - 0.68: Intent hold [0, 0.4, 3.2]
    // 0.68 - 0.85: Pull backward to reveal network [0, 0.2, 3.2 -> 6.5]
    // 0.85 - 1.00: Frame down toward Engineer Decides [0, -0.6, 6.5 -> 5.8]
    let targetZ = 6.0;
    let targetY = 0.0;

    if (progress < 0.35) {
      targetZ = THREE.MathUtils.lerp(6.0, 4.8, progress / 0.35);
      targetY = 0;
    } else if (progress < 0.55) {
      const p = (progress - 0.35) / 0.2;
      targetZ = THREE.MathUtils.lerp(4.8, 3.2, p);
      targetY = THREE.MathUtils.lerp(0, 0.4, p);
    } else if (progress < 0.68) {
      targetZ = 3.2;
      targetY = 0.4;
    } else if (progress < 0.85) {
      const p = (progress - 0.68) / 0.17;
      targetZ = THREE.MathUtils.lerp(3.2, 6.5, p);
      targetY = THREE.MathUtils.lerp(0.4, 0.0, p);
    } else {
      const p = (progress - 0.85) / 0.15;
      targetZ = THREE.MathUtils.lerp(6.5, 5.8, p);
      targetY = THREE.MathUtils.lerp(0.0, -0.8, p);
    }

    // Subtle 2-3 degrees mouse tilt
    const mouseInfluenceX = mouseRef.current.x * 0.3;
    const mouseInfluenceY = -mouseRef.current.y * 0.2;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseInfluenceX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + mouseInfluenceY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);

    camera.lookAt(0, targetY * 0.5, 0);
  });

  return null;
};

// Subtle background grid plane
const SubtleGrid: React.FC<{ opacity: number }> = ({ opacity }) => {
  return (
    <group position={[0, -2.5, -4]} rotation={[-Math.PI / 2.3, 0, 0]}>
      <gridHelper
        args={[30, 30, '#0284c7', '#1e293b']}
        position={[0, 0, 0]}
      >
        <lineBasicMaterial
          attach="material"
          color="#0ea5e9"
          transparent
          opacity={opacity * 0.12}
        />
      </gridHelper>
    </group>
  );
};

interface EvolutionSceneProps {
  progress: number;
  reducedMotion: boolean;
}

export const EvolutionScene: React.FC<EvolutionSceneProps> = ({ progress, reducedMotion }) => {
  // Grid visibility is highest in early scenes and dims in climax
  const gridOpacity = Math.max(0.1, 1 - progress * 0.7);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 48 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <CameraRig progress={progress} reducedMotion={reducedMotion} />

        {/* Ambient & soft directional light */}
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 2, 4]} intensity={0.8} color="#38bdf8" />

        <SubtleGrid opacity={gridOpacity} />

        {/* 1. Code Particles (Floating snippets, converge during transition) */}
        <CodeParticles progress={progress} reducedMotion={reducedMotion} />

        {/* 2. Ambient Space Dust Particles */}
        <AmbientParticles progress={progress} reducedMotion={reducedMotion} />

        {/* 3. With-AI Distributed Neural Network */}
        <IntelligenceNodes progress={progress} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
};
