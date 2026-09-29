import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface IntelligenceNodesProps {
  progress: number;
  reducedMotion: boolean;
}

interface NodeData {
  id: string;
  label: string;
  pos: [number, number, number];
  color: string;
  size: number;
}

export const IntelligenceNodes: React.FC<IntelligenceNodesProps> = ({ progress, reducedMotion }) => {
  const nodesGroupRef = useRef<THREE.Group | null>(null);
  const linesRef = useRef<THREE.LineSegments | null>(null);

  // Layout positions for the With AI network
  // Coordinates in 3D:
  // INTENT is at center [0, 1.2, 0]
  // AI top [0, 2.5, 0]
  // AGENTS left [-2.5, 1.2, 0]
  // RAG center-left [-0.8, 0.2, 0.4]
  // TOOLS right [2.5, 1.2, 0]
  // MCP center-right [0.8, 0.2, 0.4]
  // EXECUTION lower center [0, -0.9, 0]
  // VERIFY [0, -1.9, 0]
  // ENGINEER DECIDES bottom center [0, -3.0, 0]
  const nodes: NodeData[] = useMemo(
    () => [
      { id: 'intent', label: 'INTENT', pos: [0, 1.2, 0], color: '#38bdf8', size: 0.16 },
      { id: 'ai', label: 'AI CORE', pos: [0, 2.6, -0.5], color: '#e0f2fe', size: 0.12 },
      { id: 'agents', label: 'AGENTS', pos: [-2.6, 1.4, 0], color: '#38bdf8', size: 0.12 },
      { id: 'tools', label: 'TOOLS', pos: [2.6, 1.4, 0], color: '#38bdf8', size: 0.12 },
      { id: 'rag', label: 'RAG / VECTORS', pos: [-1.2, 0.1, 0.5], color: '#7dd3fc', size: 0.1 },
      { id: 'mcp', label: 'MCP PROTOCOL', pos: [1.2, 0.1, 0.5], color: '#7dd3fc', size: 0.1 },
      { id: 'execute', label: 'EXECUTION', pos: [0, -1.0, 0], color: '#38bdf8', size: 0.12 },
      { id: 'verify', label: 'VERIFY', pos: [0, -2.0, 0], color: '#38bdf8', size: 0.12 },
      { id: 'engineer', label: 'ENGINEER DECIDES', pos: [0, -3.2, 0.2], color: '#ffffff', size: 0.22 },
    ],
    []
  );

  // Network connections between nodes
  const connections = useMemo(
    () => [
      ['intent', 'ai'],
      ['intent', 'agents'],
      ['intent', 'tools'],
      ['ai', 'agents'],
      ['ai', 'tools'],
      ['agents', 'rag'],
      ['tools', 'mcp'],
      ['agents', 'execute'],
      ['tools', 'execute'],
      ['rag', 'execute'],
      ['mcp', 'execute'],
      ['execute', 'verify'],
      ['verify', 'engineer'],
    ],
    []
  );

  // Build LineSegments geometry
  const linePositions = useMemo(() => {
    const nodeMap = new Map(nodes.map((n) => [n.id, n.pos]));
    const posArray: number[] = [];

    connections.forEach(([fromId, toId]) => {
      const from = nodeMap.get(fromId);
      const to = nodeMap.get(toId);
      if (from && to) {
        posArray.push(from[0], from[1], from[2]);
        posArray.push(to[0], to[1], to[2]);
      }
    });

    return new Float32Array(posArray);
  }, [nodes, connections]);

  useFrame(({ clock }) => {
    if (!nodesGroupRef.current || reducedMotion) return;
    const time = clock.getElapsedTime();

    // Expansion begins around 0.55 (Intent appears), fully unfolds by 0.75
    // In Climax (0.85 - 1.00), non-engineer nodes fade while Engineer Decides pulses
    const isVisible = progress >= 0.52;
    nodesGroupRef.current.visible = isVisible;

    if (!isVisible) return;

    const unfoldFactor = THREE.MathUtils.clamp((progress - 0.55) / 0.2, 0, 1);
    const climaxFactor = THREE.MathUtils.clamp((progress - 0.82) / 0.15, 0, 1);

    // Gently float group
    nodesGroupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    nodesGroupRef.current.rotation.y = Math.sin(time * 0.2) * 0.05;

    // Line opacity and pulse
    if (linesRef.current) {
      const lineMaterial = linesRef.current.material as THREE.LineBasicMaterial;
      const baseAlpha = unfoldFactor * (1 - climaxFactor * 0.7);
      lineMaterial.opacity = baseAlpha * 0.45;
    }
  });

  if (progress < 0.5) return null;

  const unfoldProgress = THREE.MathUtils.clamp((progress - 0.52) / 0.22, 0, 1);
  const climaxProgress = THREE.MathUtils.clamp((progress - 0.82) / 0.15, 0, 1);

  return (
    <group ref={nodesGroupRef}>
      {/* 3D Connecting Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Render 3D Spheres with atmospheric glow */}
      {nodes.map((node) => {
        const isEngineer = node.id === 'engineer';
        const isIntent = node.id === 'intent';

        // Calculate visibility and scale for this node
        let nodeScale = unfoldProgress;
        if (isIntent) {
          nodeScale = progress >= 0.52 ? 1 : 0;
        }

        let opacity = 0.85;
        if (!isEngineer && climaxProgress > 0) {
          opacity = Math.max(0.08, 0.85 * (1 - climaxProgress * 0.85));
        }

        return (
          <group
            key={node.id}
            position={[
              node.pos[0] * unfoldProgress,
              node.pos[1],
              node.pos[2] * unfoldProgress,
            ]}
            scale={nodeScale}
          >
            {/* Core Sphere */}
            <mesh>
              <sphereGeometry args={[node.size, 16, 16]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={opacity}
              />
            </mesh>

            {/* Glowing Halo */}
            <mesh scale={isEngineer ? 2.4 : 1.8}>
              <sphereGeometry args={[node.size, 16, 16]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={opacity * 0.3}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
