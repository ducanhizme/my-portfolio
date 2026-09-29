import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { NeuralNodes } from './NeuralNodes';
import { NeuralConnections } from './NeuralConnections';
import { EnergyParticles } from './EnergyParticles';
import { AmbientParticles } from './AmbientParticles';
import { useNeuralNetwork } from './useNeuralNetwork';
import { usePointerInteraction } from './usePointerInteraction';
import { ANIMATION_PARAMS } from './constants';

interface NeuralNetworkProps {
  reducedMotion?: boolean;
}

export const NeuralNetwork: React.FC<NeuralNetworkProps> = ({
  reducedMotion = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { nodes, connections, ambientParticles, initialPulses } = useNeuralNetwork();
  const { pointerSmoothed, worldPoint, update: updatePointer } = usePointerInteraction();

  const { camera } = useThree();

  useFrame(({ clock }, delta) => {
    updatePointer(camera, delta);

    if (!groupRef.current) return;
    const time = clock.getElapsedTime();

    if (!reducedMotion) {
      // 1. Organic Breathing Motion: 1.00 -> 1.018 -> 1.00 over 8s
      const breath =
        1.0 +
        Math.sin((time * Math.PI * 2) / ANIMATION_PARAMS.breathingPeriod) *
          ANIMATION_PARAMS.breathingAmplitude;
      groupRef.current.scale.set(breath, breath, breath);

      // 2. Subtle Parallax Rotation: ±2.8° on X, ±4.5° on Y
      const targetRotX =
        pointerSmoothed.current.y * ANIMATION_PARAMS.parallaxFactorX;
      const targetRotY =
        pointerSmoothed.current.x * ANIMATION_PARAMS.parallaxFactorY;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        delta * 2.5
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        delta * 2.5
      );

      // 3. Very subtle camera float drift (1% viewport)
      camera.position.x = Math.sin(time * 0.2) * 0.15;
      camera.position.y = Math.cos(time * 0.25) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[1.5, 0, 0]}>
      {/* 1. Ambient Background Particles */}
      <AmbientParticles
        ambientData={ambientParticles}
        reducedMotion={reducedMotion}
      />

      {/* 2. Neural Edge Connections */}
      <NeuralConnections
        connections={connections}
        nodes={nodes}
        pointerWorldPos={worldPoint}
        reducedMotion={reducedMotion}
      />

      {/* 3. Traveling Energy Pulses */}
      <EnergyParticles
        connections={connections}
        nodes={nodes}
        initialPulses={initialPulses}
        reducedMotion={reducedMotion}
      />

      {/* 4. Neural Nodes */}
      <NeuralNodes
        nodes={nodes}
        pointerWorldPos={worldPoint}
        reducedMotion={reducedMotion}
      />
    </group>
  );
};
