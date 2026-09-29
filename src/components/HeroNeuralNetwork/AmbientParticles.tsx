import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { PALETTE } from './constants';

interface AmbientParticlesProps {
  ambientData: {
    positions: Float32Array;
    scales: Float32Array;
    alphas: Float32Array;
    count: number;
  };
  reducedMotion?: boolean;
}

export const AmbientParticles: React.FC<AmbientParticlesProps> = ({
  ambientData,
  reducedMotion = false,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);

  const { positions, count } = ambientData;

  // Soft circular particle texture generated via canvas in memory (no external image assets!)
  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.7)');
      grad.addColorStop(0.7, 'rgba(14, 165, 233, 0.15)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((_, delta) => {
    if (!geoRef.current || reducedMotion) return;

    const posAttr = geoRef.current.attributes.position;
    const posArr = posAttr.array as Float32Array;

    // Subtle atmospheric drift
    const driftSpeed = delta * 0.05;

    for (let i = 0; i < count; i++) {
      let y = posArr[i * 3 + 1];
      let x = posArr[i * 3];

      // Very slow vertical cosmic drift
      y += driftSpeed;
      x += Math.sin(y * 0.5 + i) * 0.002;

      // Wrap around bounds
      if (y > 6.0) y = -6.0;

      posArr[i * 3] = x;
      posArr[i * 3 + 1] = y;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        map={circleTexture}
        color={PALETTE.ambientParticle}
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};
