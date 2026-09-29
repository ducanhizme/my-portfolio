import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { NeuralNode } from './types';
import { PALETTE, ANIMATION_PARAMS } from './constants';

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
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const glowMeshRef = useRef<THREE.InstancedMesh>(null);

  const count = nodes.length;

  // Reusable dummy objects for matrix calculations
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  // Geometry: Small sphere
  const sphereGeo = useMemo(() => new THREE.SphereGeometry(1, 16, 16), []);

  // Initial color buffer setup
  useMemo(() => {
    // Colors will be assigned in effect/frame
  }, [nodes]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    const ptr = pointerWorldPos.current;

    for (let i = 0; i < count; i++) {
      const node = nodes[i];

      // Subtle organic harmonic sway
      let posX = node.basePosition.x;
      let posY = node.basePosition.y;
      let posZ = node.basePosition.z;

      if (!reducedMotion) {
        const swayPhase = time * node.speed + node.phase;
        posX += Math.sin(swayPhase) * 0.08;
        posY += Math.cos(swayPhase * 0.8) * 0.08;
        posZ += Math.sin(swayPhase * 0.5) * 0.05;
      }

      // Check distance to pointer in 3D world space
      const distToPtr = Math.hypot(posX - ptr.x, posY - ptr.y, posZ - ptr.z);
      const isNearPointer = distToPtr < ANIMATION_PARAMS.pointerProximityRadius;
      const proximityFactor = isNearPointer
        ? 1.0 - distToPtr / ANIMATION_PARAMS.pointerProximityRadius
        : 0;

      // Pulse calculation
      const pulse = !reducedMotion
        ? Math.sin(time * 2.5 * node.speed + node.phase) * 0.15
        : 0;

      // Effective scale
      let scale = node.radius * (1.0 + pulse + proximityFactor * 0.45);

      dummy.position.set(posX, posY, posZ);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Node color with proximity boost
      if (node.importance === 'core') {
        tempColor.copy(PALETTE.coreNode);
        if (isNearPointer) tempColor.addScalar(proximityFactor * 0.3);
      } else if (node.importance === 'secondary') {
        tempColor.copy(PALETTE.secondaryNode);
        if (isNearPointer) tempColor.lerp(PALETTE.coreNode, proximityFactor * 0.6);
      } else {
        tempColor.copy(PALETTE.peripheralNode);
        if (isNearPointer) tempColor.lerp(PALETTE.secondaryNode, proximityFactor * 0.7);
      }

      meshRef.current.setColorAt(i, tempColor);

      // Halo mesh scale
      if (glowMeshRef.current) {
        const glowScale = scale * (node.importance === 'core' ? 2.2 : 1.7);
        dummy.scale.set(glowScale, glowScale, glowScale);
        dummy.updateMatrix();
        glowMeshRef.current.setMatrixAt(i, dummy.matrix);

        tempColor.copy(PALETTE.coreGlow).multiplyScalar(
          node.importance === 'core' ? 0.35 + proximityFactor * 0.3 : 0.15 + proximityFactor * 0.2
        );
        glowMeshRef.current.setColorAt(i, tempColor);
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;

    if (glowMeshRef.current) {
      glowMeshRef.current.instanceMatrix.needsUpdate = true;
      if (glowMeshRef.current.instanceColor) glowMeshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Node Core Spheres */}
      <instancedMesh
        ref={meshRef}
        args={[sphereGeo, undefined, count]}
      >
        <meshBasicMaterial
          transparent
          opacity={0.88}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>

      {/* Subtle Atmospheric Halo around Nodes */}
      <instancedMesh
        ref={glowMeshRef}
        args={[sphereGeo, undefined, count]}
      >
        <meshBasicMaterial
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          wireframe={false}
        />
      </instancedMesh>
    </group>
  );
};
