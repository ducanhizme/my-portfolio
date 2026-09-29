import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { NeuralConnection, NeuralNode } from './types';
import { COLORS, MOTION_SETTINGS } from './constants';

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
  const count = connections.length;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 6);
    const col = new Float32Array(count * 6);

    for (let i = 0; i < count; i++) {
      const conn = connections[i];
      const src = nodes[conn.source];
      const tgt = nodes[conn.target];

      pos[i * 6] = src.basePosition.x;
      pos[i * 6 + 1] = src.basePosition.y;
      pos[i * 6 + 2] = src.basePosition.z;

      pos[i * 6 + 3] = tgt.basePosition.x;
      pos[i * 6 + 4] = tgt.basePosition.y;
      pos[i * 6 + 5] = tgt.basePosition.z;

      // Base strength 0.08 to 0.40
      const baseCol = COLORS.electricBlue.clone().multiplyScalar(conn.strength);

      col[i * 6] = baseCol.r;
      col[i * 6 + 1] = baseCol.g;
      col[i * 6 + 2] = baseCol.b;

      col[i * 6 + 3] = baseCol.r;
      col[i * 6 + 4] = baseCol.g;
      col[i * 6 + 5] = baseCol.b;
    }

    return [pos, col];
  }, [connections, nodes, count]);

  useFrame(({ clock }) => {
    if (!lineGeoRef.current) return;
    const time = clock.getElapsedTime();
    const ptr = pointerWorldPos.current;

    const posAttr = lineGeoRef.current.attributes.position;
    const colAttr = lineGeoRef.current.attributes.color;
    const posArr = posAttr.array as Float32Array;
    const colArr = colAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const conn = connections[i];
      const src = nodes[conn.source];
      const tgt = nodes[conn.target];

      let sx = src.basePosition.x;
      let sy = src.basePosition.y;
      let sz = src.basePosition.z;

      let tx = tgt.basePosition.x;
      let ty = tgt.basePosition.y;
      let tz = tgt.basePosition.z;

      if (!reducedMotion) {
        const sp = time * src.speed + src.phase;
        sx += Math.sin(sp) * 0.04;
        sy += Math.cos(sp * 0.8) * 0.04;
        sz += Math.sin(sp * 0.6) * 0.02;

        const tp = time * tgt.speed + tgt.phase;
        tx += Math.sin(tp) * 0.04;
        ty += Math.cos(tp * 0.8) * 0.04;
        tz += Math.sin(tp * 0.6) * 0.02;
      }

      posArr[i * 6] = sx;
      posArr[i * 6 + 1] = sy;
      posArr[i * 6 + 2] = sz;

      posArr[i * 6 + 3] = tx;
      posArr[i * 6 + 4] = ty;
      posArr[i * 6 + 5] = tz;

      // Subtle proximity highlighting
      const midX = (sx + tx) * 0.5;
      const midY = (sy + ty) * 0.5;
      const midZ = (sz + tz) * 0.5;

      const dist = Math.hypot(midX - ptr.x, midY - ptr.y, midZ - ptr.z);
      const isNear = dist < MOTION_SETTINGS.proximityRadius;
      const prox = isNear ? 1.0 - dist / MOTION_SETTINGS.proximityRadius : 0;

      // Strict opacity cap (standard 0.08–0.25, proximity up to 0.45 max)
      const intensity = THREE.MathUtils.clamp(
        conn.strength + prox * 0.25,
        0.08,
        0.45
      );

      const r = 0.04 + prox * 0.2;
      const g = 0.15 + prox * 0.45;
      const b = 0.35 + prox * 0.35;

      colArr[i * 6] = r * intensity;
      colArr[i * 6 + 1] = g * intensity;
      colArr[i * 6 + 2] = b * intensity;

      colArr[i * 6 + 3] = r * intensity;
      colArr[i * 6 + 4] = g * intensity;
      colArr[i * 6 + 5] = b * intensity;
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
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
};
