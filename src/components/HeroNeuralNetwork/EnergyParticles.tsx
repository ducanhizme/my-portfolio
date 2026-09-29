import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { NeuralConnection, NeuralNode, EnergyPulse } from './types';
import { PALETTE } from './constants';

interface EnergyParticlesProps {
  connections: NeuralConnection[];
  nodes: NeuralNode[];
  initialPulses: EnergyPulse[];
  reducedMotion?: boolean;
}

export const EnergyParticles: React.FC<EnergyParticlesProps> = ({
  connections,
  nodes,
  initialPulses,
  reducedMotion = false,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const pulses = useMemo(() => {
    return initialPulses.map((p) => ({ ...p }));
  }, [initialPulses]);

  const count = pulses.length;

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const pulseGeo = useMemo(() => new THREE.SphereGeometry(0.06, 8, 8), []);

  useFrame((_, delta) => {
    if (!meshRef.current || reducedMotion || connections.length === 0) return;

    for (let i = 0; i < count; i++) {
      const pulse = pulses[i];

      // Progress along edge
      pulse.progress += delta * pulse.speed;

      if (pulse.progress >= 1.0) {
        // Re-route to an adjacent connection from target node to simulate multi-hop flow
        pulse.progress = 0;
        const targetNode = nodes[pulse.targetIdx];

        if (targetNode && targetNode.connections.length > 0) {
          // Pick a random connected neighbor
          const nextTargetIdx =
            targetNode.connections[
              Math.floor(Math.random() * targetNode.connections.length)
            ];
          pulse.sourceIdx = pulse.targetIdx;
          pulse.targetIdx = nextTargetIdx;
        } else {
          // Fallback to random connection
          const randConn =
            connections[Math.floor(Math.random() * connections.length)];
          if (randConn) {
            pulse.sourceIdx = randConn.source;
            pulse.targetIdx = randConn.target;
          }
        }
      }

      const srcNode = nodes[pulse.sourceIdx];
      const tgtNode = nodes[pulse.targetIdx];

      if (srcNode && tgtNode) {
        // Interpolate position along edge
        const curX = THREE.MathUtils.lerp(
          srcNode.basePosition.x,
          tgtNode.basePosition.x,
          pulse.progress
        );
        const curY = THREE.MathUtils.lerp(
          srcNode.basePosition.y,
          tgtNode.basePosition.y,
          pulse.progress
        );
        const curZ = THREE.MathUtils.lerp(
          srcNode.basePosition.z,
          tgtNode.basePosition.z,
          pulse.progress
        );

        dummy.position.set(curX, curY, curZ);

        // Subtle bell-curve scale (fades in and out at ends)
        const scaleFactor = Math.sin(pulse.progress * Math.PI) * 1.4;
        dummy.scale.set(scaleFactor, scaleFactor, scaleFactor);
        dummy.updateMatrix();

        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (reducedMotion) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[pulseGeo, undefined, count]}
    >
      <meshBasicMaterial
        color={PALETTE.pulseCore}
        transparent
        opacity={0.95}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
};
