import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { NeuralNode } from './types';
import { COLORS, MOTION_SETTINGS } from './constants';

interface NeuralNodesProps {
  nodes: NeuralNode[];
  pointerWorldPos: React.MutableRefObject<THREE.Vector3>;
  reducedMotion?: boolean;
}

export const NeuralNodes: React.FC<NeuralNodesProps> = ({
  nodes,
  pointerWorldPos,
  reducedMotion = false,
}) => {
  const coreMeshRef = useRef<THREE.InstancedMesh>(null);
  const glowMeshRef = useRef<THREE.InstancedMesh>(null);

  const count = nodes.length;

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);
  const sphereGeo = useMemo(() => new THREE.SphereGeometry(1, 12, 12), []);

  useFrame(({ clock }) => {
    if (!coreMeshRef.current) return;
    const time = clock.getElapsedTime();
    const ptr = pointerWorldPos.current;

    for (let i = 0; i < count; i++) {
      const node = nodes[i];

      // Very subtle sway (0.04 amplitude)
      let px = node.basePosition.x;
      let py = node.basePosition.y;
      let pz = node.basePosition.z;

      if (!reducedMotion) {
        const ph = time * node.speed + node.phase;
        px += Math.sin(ph) * 0.04;
        py += Math.cos(ph * 0.8) * 0.04;
        pz += Math.sin(ph * 0.6) * 0.02;
      }

      // Cursor proximity calculation
      const distToPtr = Math.hypot(px - ptr.x, py - ptr.y, pz - ptr.z);
      const isNear = distToPtr < MOTION_SETTINGS.proximityRadius;
      const proximityFactor = isNear
        ? 1.0 - distToPtr / MOTION_SETTINGS.proximityRadius
        : 0;

      // Subtle pulse
      const pulse = !reducedMotion
        ? Math.sin(time * 1.5 * node.speed + node.phase) * 0.08
        : 0;

      const scale = node.radius * (1.0 + pulse + proximityFactor * 0.35);

      dummy.position.set(px, py, pz);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      coreMeshRef.current.setMatrixAt(i, dummy.matrix);

      // Node color and subtle brightness boost
      if (node.importance === 'core') {
        tempColor.copy(COLORS.white);
        if (isNear) tempColor.addScalar(proximityFactor * 0.2);
      } else if (node.importance === 'secondary') {
        tempColor.copy(COLORS.softCyan);
        if (isNear) tempColor.lerp(COLORS.white, proximityFactor * 0.5);
      } else {
        tempColor.copy(COLORS.electricBlue);
        if (isNear) tempColor.lerp(COLORS.softCyan, proximityFactor * 0.6);
      }

      coreMeshRef.current.setColorAt(i, tempColor);

      // Subtle outer halo
      if (glowMeshRef.current) {
        const haloScale = scale * 1.6;
        dummy.scale.set(haloScale, haloScale, haloScale);
        dummy.updateMatrix();
        glowMeshRef.current.setMatrixAt(i, dummy.matrix);

        // Core halo is white-cyan, secondary is soft cyan, peripheral is very dim
        tempColor
          .copy(node.importance === 'core' ? COLORS.softCyan : COLORS.deepBlue)
          .multiplyScalar(
            node.importance === 'core'
              ? 0.4 + proximityFactor * 0.3
              : 0.15 + proximityFactor * 0.2
          );
        glowMeshRef.current.setColorAt(i, tempColor);
      }
    }

    coreMeshRef.current.instanceMatrix.needsUpdate = true;
    if (coreMeshRef.current.instanceColor)
      coreMeshRef.current.instanceColor.needsUpdate = true;

    if (glowMeshRef.current) {
      glowMeshRef.current.instanceMatrix.needsUpdate = true;
      if (glowMeshRef.current.instanceColor)
        glowMeshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Node Core Points */}
      <instancedMesh
        ref={coreMeshRef}
        args={[sphereGeo, undefined, count]}
      >
        <meshBasicMaterial
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>

      {/* Tiny Soft Halo */}
      <instancedMesh
        ref={glowMeshRef}
        args={[sphereGeo, undefined, count]}
      >
        <meshBasicMaterial
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  );
};
