import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AmbientParticlesProps {
  progress: number;
  reducedMotion: boolean;
}

export const AmbientParticles: React.FC<AmbientParticlesProps> = ({ progress, reducedMotion }) => {
  const pointsRef = useRef<THREE.Points | null>(null);
  const count = 320;

  // Initial random positions and velocities
  const [positions, initialPositions, speeds, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const init = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const phs = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const x = (Math.random() - 0.5) * 28;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 20;

      pos[idx] = x;
      pos[idx + 1] = y;
      pos[idx + 2] = z;

      init[idx] = x;
      init[idx + 1] = y;
      init[idx + 2] = z;

      spd[i] = Math.random() * 0.4 + 0.2;
      phs[i] = Math.random() * Math.PI * 2;
    }

    return [pos, init, spd, phs];
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current || reducedMotion) return;

    const time = clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;

    // Transition vortex convergence factor (peaks between 0.38 and 0.58)
    const isTransition = progress >= 0.35 && progress <= 0.65;
    const vortexStrength = isTransition
      ? Math.sin(((progress - 0.35) / 0.3) * Math.PI)
      : 0;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      if (vortexStrength > 0.05) {
        // Spiral inward toward center [0, 0, -2]
        const currentX = posArray[idx];
        const currentY = posArray[idx + 1];
        const currentZ = posArray[idx + 2];

        const angle = Math.atan2(currentY, currentX) + 0.04 * vortexStrength;
        const radius = Math.hypot(currentX, currentY);
        const targetRadius = Math.max(0.6, radius * (1 - 0.03 * vortexStrength));

        posArray[idx] = Math.cos(angle) * targetRadius;
        posArray[idx + 1] = Math.sin(angle) * targetRadius;
        posArray[idx + 2] = THREE.MathUtils.lerp(currentZ, -2, 0.04 * vortexStrength);
      } else {
        // Natural gentle drift around initial coordinates
        const initX = initialPositions[idx];
        const initY = initialPositions[idx + 1];
        const initZ = initialPositions[idx + 2];

        posArray[idx] = initX + Math.sin(time * speeds[i] + phases[i]) * 0.4;
        posArray[idx + 1] = initY + Math.cos(time * (speeds[i] * 0.8) + phases[i]) * 0.3;
        posArray[idx + 2] = initZ;
      }
    }

    posAttr.needsUpdate = true;
  });

  // Color interpolation based on progress
  const particleColor = useMemo(() => {
    // 0.0 - 0.35: Muted Slate / White (#94a3b8)
    // 0.35 - 0.70: Transition into Cyan (#38bdf8)
    // 0.70 - 1.00: Bright Cyan / Electric Blue (#00f2fe)
    if (progress < 0.35) return '#94a3b8';
    if (progress < 0.65) return '#38bdf8';
    return '#7dd3fc';
  }, [progress]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={particleColor}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
