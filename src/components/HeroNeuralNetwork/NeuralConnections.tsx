import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { NeuralConnection, NeuralNode } from './types';
import { PALETTE, ANIMATION_PARAMS } from './constants';

interface NeuralConnectionsProps {
  connections: NeuralConnection[];
  nodes: NeuralNode[];
  pointerWorldPos: React.MutableRefObject<THREE.Vector3>;
  reducedMotion?: boolean;
}

export const NeuralConnections: React.FC<NeuralConnectionsProps> = ({
  connections,
  nodes,
  pointerWorldPos,
  reducedMotion = false,
}) => {
  const lineGeoRef = useRef<THREE.BufferGeometry>(null);

  const connectionCount = connections.length;

  // Static vertex buffers (2 vertices per line segment * 3 coords)
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(connectionCount * 6);
    const col = new Float32Array(connectionCount * 6);

    for (let i = 0; i < connectionCount; i++) {
      const conn = connections[i];
      const srcNode = nodes[conn.source];
      const tgtNode = nodes[conn.target];

      // Initial positions
      pos[i * 6] = srcNode.basePosition.x;
      pos[i * 6 + 1] = srcNode.basePosition.y;
      pos[i * 6 + 2] = srcNode.basePosition.z;

      pos[i * 6 + 3] = tgtNode.basePosition.x;
      pos[i * 6 + 4] = tgtNode.basePosition.y;
      pos[i * 6 + 5] = tgtNode.basePosition.z;

      // Base colors with strength-based alpha
      const alpha = Math.min(0.45, Math.max(0.12, conn.strength * 0.4));
      const baseCol = PALETTE.connectionBase.clone().multiplyScalar(alpha);

      col[i * 6] = baseCol.r;
      col[i * 6 + 1] = baseCol.g;
      col[i * 6 + 2] = baseCol.b;

      col[i * 6 + 3] = baseCol.r;
      col[i * 6 + 4] = baseCol.g;
      col[i * 6 + 5] = baseCol.b;
    }

    return [pos, col];
  }, [connections, nodes, connectionCount]);

  useFrame(({ clock }) => {
    if (!lineGeoRef.current) return;
    const time = clock.getElapsedTime();
    const ptr = pointerWorldPos.current;

    const posAttr = lineGeoRef.current.attributes.position;
    const colAttr = lineGeoRef.current.attributes.color;
    const posArray = posAttr.array as Float32Array;
    const colArray = colAttr.array as Float32Array;

    for (let i = 0; i < connectionCount; i++) {
      const conn = connections[i];
      const src = nodes[conn.source];
      const tgt = nodes[conn.target];

      // Sway positions if motion enabled
      let sx = src.basePosition.x;
      let sy = src.basePosition.y;
      let sz = src.basePosition.z;

      let tx = tgt.basePosition.x;
      let ty = tgt.basePosition.y;
      let tz = tgt.basePosition.z;

      if (!reducedMotion) {
        const srcPhase = time * src.speed + src.phase;
        sx += Math.sin(srcPhase) * 0.08;
        sy += Math.cos(srcPhase * 0.8) * 0.08;
        sz += Math.sin(srcPhase * 0.5) * 0.05;

        const tgtPhase = time * tgt.speed + tgt.phase;
        tx += Math.sin(tgtPhase) * 0.08;
        ty += Math.cos(tgtPhase * 0.8) * 0.08;
        tz += Math.sin(tgtPhase * 0.5) * 0.05;
      }

      posArray[i * 6] = sx;
      posArray[i * 6 + 1] = sy;
      posArray[i * 6 + 2] = sz;

      posArray[i * 6 + 3] = tx;
      posArray[i * 6 + 4] = ty;
      posArray[i * 6 + 5] = tz;

      // Proximity highlighting
      const midX = (sx + tx) * 0.5;
      const midY = (sy + ty) * 0.5;
      const midZ = (sz + tz) * 0.5;

      const distToPtr = Math.hypot(midX - ptr.x, midY - ptr.y, midZ - ptr.z);
      const isNear = distToPtr < ANIMATION_PARAMS.pointerProximityRadius;
      const proximityFactor = isNear
        ? 1.0 - distToPtr / ANIMATION_PARAMS.pointerProximityRadius
        : 0;

      const intensity = Math.min(
        1.0,
        conn.strength * 0.35 + proximityFactor * 0.65
      );

      // Color from cool blue to cyan-white on proximity
      const r = 0.08 + proximityFactor * 0.4;
      const g = 0.25 + proximityFactor * 0.6;
      const b = 0.65 + proximityFactor * 0.35;

      colArray[i * 6] = r * intensity;
      colArray[i * 6 + 1] = g * intensity;
      colArray[i * 6 + 2] = b * intensity;

      colArray[i * 6 + 3] = r * intensity;
      colArray[i * 6 + 4] = g * intensity;
      colArray[i * 6 + 5] = b * intensity;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <lineSegments>
      <bufferGeometry ref={lineGeoRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
};
