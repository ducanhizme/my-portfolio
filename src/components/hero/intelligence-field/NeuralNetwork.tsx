import React, { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { NeuralNodes } from './NeuralNodes';
import { NeuralConnections } from './NeuralConnections';
import { AmbientParticles } from './AmbientParticles';
import { EnergyFlow } from './EnergyFlow';
import { generateIntelligenceField } from './networkGenerator';
import { usePointerParallax } from './usePointerParallax';
import { DESKTOP_CONFIG, TABLET_CONFIG, MOBILE_CONFIG, MOTION_SETTINGS } from './constants';

interface NeuralNetworkProps {
  reducedMotion?: boolean;
}

export const NeuralNetwork: React.FC<NeuralNetworkProps> = ({
  reducedMotion = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const { worldPointer, update: updatePointer } = usePointerParallax();

  // Responsive device breakpoint
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setDevice('mobile');
      else if (w < 1024) setDevice('tablet');
      else setDevice('desktop');
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const config =
    device === 'mobile'
      ? MOBILE_CONFIG
      : device === 'tablet'
      ? TABLET_CONFIG
      : DESKTOP_CONFIG;

  const data = useMemo(() => generateIntelligenceField(config), [config]);

  useFrame(({ clock }, delta) => {
    const { rotX, rotY } = updatePointer(camera, delta);

    if (!groupRef.current) return;
    const time = clock.getElapsedTime();

    if (!reducedMotion) {
      // 1. Slow organic breathing: 1.00 -> 1.01 -> 1.00 over 8.5s
      const breath =
        1.0 +
        Math.sin((time * Math.PI * 2) / MOTION_SETTINGS.breathingDuration) *
          MOTION_SETTINGS.breathingAmplitude;
      groupRef.current.scale.set(breath, breath, breath);

      // 2. Parallax rotation clamped strictly to ±2° (X) and ±3° (Y)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        rotX,
        delta * 2.0
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        rotY,
        delta * 2.0
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Ambient Background Particles */}
      <AmbientParticles
        particleData={data.particles}
        reducedMotion={reducedMotion}
      />

      {/* 2. Thin Neural Connections */}
      <NeuralConnections
        connections={data.connections}
        nodes={data.nodes}
        pointerWorldPos={worldPointer}
        reducedMotion={reducedMotion}
      />

      {/* 3. Subtle Energy Flow Pulses */}
      <EnergyFlow
        connections={data.connections}
        nodes={data.nodes}
        initialPulses={data.pulses}
        reducedMotion={reducedMotion}
      />

      {/* 4. Elegant Neural Nodes */}
      <NeuralNodes
        nodes={data.nodes}
        pointerWorldPos={worldPointer}
        reducedMotion={reducedMotion}
      />
    </group>
  );
};
