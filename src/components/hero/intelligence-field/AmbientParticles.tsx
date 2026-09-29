import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { COLORS } from './constants';

interface AmbientParticlesProps {
  particleData: {
    positions: Float32Array;
    alphas: Float32Array;
    count: number;
  };
  reducedMotion?: boolean;
}

export const AmbientParticles: React.FC<AmbientParticlesProps> = ({
  particleData,
  reducedMotion = false,
}) => {
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const { positions, count } = particleData;

  // Soft circular particle texture generated via canvas in memory
  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(234, 246, 255, 1)');
      grad.addColorStop(0.35, 'rgba(49, 212, 232, 0.6)');
      grad.addColorStop(0.7, 'rgba(22, 136, 201, 0.1)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((_, delta) => {
    if (!geoRef.current || reducedMotion) return;

    const posAttr = geoRef.current.attributes.position;
    const posArr = posAttr.array as Float32Array;

    // Extremely slow drift (almost imperceptible cosmic dust)
    const drift = delta * 0.025;

    for (let i = 0; i < count; i++) {
      let y = posArr[i * 3 + 1];
      y += drift;
      if (y > 3.5) y = -3.5;
      posArr[i * 3 + 1] = y;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        map={circleTexture}
        color={COLORS.particle}
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};
