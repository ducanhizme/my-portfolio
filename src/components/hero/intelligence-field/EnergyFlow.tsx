import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { NeuralConnection, NeuralNode, EnergyPulse } from './types';
import { COLORS } from './constants';

interface EnergyFlowProps {
  connections: NeuralConnection[];
  nodes: NeuralNode[];
  initialPulses: EnergyPulse[];
  reducedMotion?: boolean;
}

export const EnergyFlow: React.FC<EnergyFlowProps> = ({
  connections,
  nodes,
  initialPulses,
  reducedMotion = false,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const pulses = useMemo(() => initialPulses.map((p) => ({ ...p })), [initialPulses]);
  const count = pulses.length;

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const pulseGeo = useMemo(() => new THREE.SphereGeometry(0.035, 8, 8), []);

  useFrame((_, delta) => {
    if (!meshRef.current || reducedMotion || connections.length === 0) return;

    for (let i = 0; i < count; i++) {
      const pulse = pulses[i];

      pulse.progress += delta * pulse.speed;

      if (pulse.progress >= 1.0) {
        pulse.progress = 0;
        // Occasionally jump to a neighbor node or random connection
        const targetNode = nodes[pulse.targetIdx];
        if (targetNode && targetNode.connections.length > 0 && Math.random() > 0.3) {
          const nextTarget =
            targetNode.connections[
              Math.floor(Math.random() * targetNode.connections.length)
            ];
          pulse.sourceIdx = pulse.targetIdx;
          pulse.targetIdx = nextTarget;
        } else {
          const randConn =
            connections[Math.floor(Math.random() * connections.length)];
          if (randConn) {
            pulse.sourceIdx = randConn.source;
            pulse.targetIdx = randConn.target;
          }
        }
      }

      const src = nodes[pulse.sourceIdx];
      const tgt = nodes[pulse.targetIdx];

      if (src && tgt) {
        const curX = THREE.MathUtils.lerp(
          src.basePosition.x,
          tgt.basePosition.x,
          pulse.progress
        );
        const curY = THREE.MathUtils.lerp(
          src.basePosition.y,
          tgt.basePosition.y,
          pulse.progress
        );
        const curZ = THREE.MathUtils.lerp(
          src.basePosition.z,
          tgt.basePosition.z,
          pulse.progress
        );

        dummy.position.set(curX, curY, curZ);

        // Bell curve fading at edges
        const scale = Math.sin(pulse.progress * Math.PI) * 1.1;
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();

        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (reducedMotion) return null;

  return (
    <instancedMesh ref={meshRef} args={[pulseGeo, undefined, count]}>
      <meshBasicMaterial
        color={COLORS.pulse}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
};
