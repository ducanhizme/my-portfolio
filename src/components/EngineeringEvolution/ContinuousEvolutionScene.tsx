import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SceneProps {
  progressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}

// 1. PARTICLES THAT MORPH FROM CODE DUST TO VORTEX TO CONSTELLATION
const ContinuousParticles: React.FC<{ progressRef: React.MutableRefObject<number>; reducedMotion: boolean }> = ({
  progressRef,
  reducedMotion,
}) => {
  const pointsRef = useRef<THREE.Points | null>(null);
  const count = 350;

  const [initialPositions, speeds, angles, radii] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const ang = new Float32Array(count);
    const rad = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 14;

      pos[idx] = x;
      pos[idx + 1] = y;
      pos[idx + 2] = z;

      spd[i] = Math.random() * 0.4 + 0.2;
      ang[i] = Math.atan2(y, x);
      rad[i] = Math.hypot(x, y);
    }
    return [pos, spd, ang, rad];
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current || reducedMotion) return;

    const p = progressRef.current;
    const time = clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;

    // Transition collapse factor (0.45 - 0.60): particles swirl inward
    const isCollapsing = p >= 0.40 && p <= 0.62;
    const vortexPower = isCollapsing ? Math.sin(((p - 0.4) / 0.22) * Math.PI) : 0;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      if (vortexPower > 0.05) {
        // Spiral inward toward INTENT [0, 1.8, -2.5]
        const currentRadius = radii[i] * (1 - 0.85 * vortexPower);
        const currentAngle = angles[i] + time * speeds[i] * (1 + 3 * vortexPower);

        posArray[idx] = Math.cos(currentAngle) * currentRadius;
        posArray[idx + 1] = 1.8 * vortexPower + Math.sin(currentAngle) * currentRadius * 0.7;
        posArray[idx + 2] = THREE.MathUtils.lerp(initialPositions[idx + 2], -2.5, vortexPower);
      } else {
        // Natural subtle drift kept deeper in Z to avoid text overlap
        posArray[idx] = initialPositions[idx] + Math.sin(time * speeds[i] + i) * 0.3;
        posArray[idx + 1] = initialPositions[idx + 1] + Math.cos(time * (speeds[i] * 0.7) + i) * 0.25;
        posArray[idx + 2] = initialPositions[idx + 2] - 1.5;
      }
    }

    posAttr.needsUpdate = true;

    // Shift particle color from muted gray (Before AI) -> cyan (With AI)
    // Low, non-intrusive opacity to protect text legibility
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    if (p < 0.4) {
      mat.color.setRGB(0.45, 0.55, 0.65);
      mat.opacity = 0.25;
    } else if (p < 0.65) {
      mat.color.setRGB(0.15, 0.65, 0.85);
      mat.opacity = 0.35;
    } else {
      mat.color.setRGB(0.2, 0.75, 0.95);
      mat.opacity = 0.3;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[initialPositions.slice(), 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#94a3b8"
        transparent
        opacity={0.25}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// 2. MORPHING NODES & CONNECTIONS (ONE CONTINUOUS NETWORK)
const MorphingWorkflowNetwork: React.FC<{ progressRef: React.MutableRefObject<number>; reducedMotion: boolean }> = ({
  progressRef,
  reducedMotion,
}) => {
  const groupRef = useRef<THREE.Group | null>(null);
  const linesRef = useRef<THREE.LineSegments | null>(null);

  // We have 6 workflow nodes that morph their positions over time:
  // Node 0: UNDERSTAND -> AI CORE
  // Node 1: DESIGN     -> AGENTS
  // Node 2: CODE       -> TOOLS
  // Node 3: DEBUG      -> RAG
  // Node 4: TEST       -> MCP
  // Node 5: DEPLOY     -> EXECUTION
  // Plus Node 6: INTENT (born at center)
  // Plus Node 7: VERIFY
  // Plus Node 8: ENGINEER DECIDES (climax focal node)
  const nodeCount = 9;

  // Node Positions across phases (pushed back in Z and framing around center text):
  // Phase A: Linear Pipeline (p = 0.15 - 0.30)
  const linearPos = useMemo<[number, number, number][]>(
    () => [
      [-3.8, 2.0, -2.4], // UNDERSTAND
      [-2.3, 1.2, -2.4], // DESIGN
      [-0.8, 0.4, -2.4], // CODE
      [0.8, -0.4, -2.4], // DEBUG
      [2.3, -1.2, -2.4], // TEST
      [3.8, -2.0, -2.4], // DEPLOY
      [0, 1.7, -20], // INTENT (hidden)
      [0, -10, -20], // VERIFY (hidden)
      [0, -15, -20], // ENGINEER (hidden)
    ],
    []
  );

  // Phase B: Destabilization (p = 0.30 - 0.45)
  // Nodes drift into 3D depth and scatter outward
  const scatteredPos = useMemo<[number, number, number][]>(
    () => [
      [-4.2, 2.4, -3.0],
      [-2.2, 1.4, -2.6],
      [-1.4, -1.2, -2.8],
      [1.4, 1.2, -2.8],
      [2.4, -1.8, -3.0],
      [4.2, -2.4, -3.0],
      [0, 1.7, -15],
      [0, -8, -15],
      [0, -12, -15],
    ],
    []
  );

  // Phase C: Collapse into INTENT at [0, 1.7, -2.6] (p = 0.45 - 0.65)
  // Converges above center text so INTENT stays clearly visible without blocking reading
  const collapsedPos = useMemo<[number, number, number][]>(
    () => [
      [0, 1.7, -2.6],
      [0, 1.7, -2.6],
      [0, 1.7, -2.6],
      [0, 1.7, -2.6],
      [0, 1.7, -2.6],
      [0, 1.7, -2.6],
      [0, 1.7, -2.6], // INTENT hovers above center text
      [0, -5, -20],
      [0, -8, -20],
    ],
    []
  );

  // Phase D: Distributed Network (p = 0.65 - 0.85)
  // Wide framing orbit surrounding the center stage
  const distributedPos = useMemo<[number, number, number][]>(
    () => [
      [0.0, 2.8, -2.5], // AI CORE (top)
      [-3.8, 1.0, -2.2], // AGENTS (left flank)
      [3.8, 1.0, -2.2], // TOOLS (right flank)
      [-2.6, -1.8, -2.4], // RAG (bottom-left)
      [2.6, -1.8, -2.4], // MCP (bottom-right)
      [0.0, -2.6, -2.4], // EXECUTE (bottom)
      [0.0, 1.7, -2.5], // INTENT (origin, upper center)
      [0.0, -3.3, -2.5], // VERIFY (lower)
      [0.0, -2.4, -2.0], // ENGINEER DECIDES (climax focal node)
    ],
    []
  );

  // Line segment buffer: 16 connections
  const linePosBuffer = useMemo(() => new Float32Array(16 * 2 * 3), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const p = progressRef.current;
    const time = clock.getElapsedTime();
    const children = groupRef.current.children as THREE.Mesh[];

    // Calculate current positions for all 9 nodes by smoothly interpolating based on p
    const currentPositions: [number, number, number][] = [];

    for (let i = 0; i < nodeCount; i++) {
      let x = 0;
      let y = 0;
      let z = 0;
      let scale = 1;

      if (p < 0.12) {
        // Intro: hidden or tiny
        x = linearPos[i][0];
        y = linearPos[i][1];
        z = linearPos[i][2];
        scale = THREE.MathUtils.lerp(0, 0.5, p / 0.12);
      } else if (p < 0.30) {
        // Scene 1: Linear Workflow
        const t = (p - 0.12) / 0.18;
        x = linearPos[i][0];
        y = linearPos[i][1];
        z = linearPos[i][2];
        scale = i < 6 ? 1 : 0;
      } else if (p < 0.45) {
        // Scene 2: Destabilizing
        const t = (p - 0.30) / 0.15;
        x = THREE.MathUtils.lerp(linearPos[i][0], scatteredPos[i][0], t);
        y = THREE.MathUtils.lerp(linearPos[i][1], scatteredPos[i][1], t);
        z = THREE.MathUtils.lerp(linearPos[i][2], scatteredPos[i][2], t);
        scale = i < 6 ? 1 : 0;
      } else if (p < 0.58) {
        // Scene 3: Collapse toward INTENT
        const t = (p - 0.45) / 0.13;
        x = THREE.MathUtils.lerp(scatteredPos[i][0], collapsedPos[i][0], t);
        y = THREE.MathUtils.lerp(scatteredPos[i][1], collapsedPos[i][1], t);
        z = THREE.MathUtils.lerp(scatteredPos[i][2], collapsedPos[i][2], t);
        scale = i === 6 ? t * 1.5 : (1 - t * 0.8);
      } else if (p < 0.65) {
        // Scene 4: INTENT alone holds focus
        x = collapsedPos[i][0];
        y = collapsedPos[i][1];
        z = collapsedPos[i][2];
        scale = i === 6 ? 1.6 : 0.05;
      } else if (p < 0.82) {
        // Scene 5: Distributed AI emerges
        const t = (p - 0.65) / 0.17;
        x = THREE.MathUtils.lerp(collapsedPos[i][0], distributedPos[i][0], t);
        y = THREE.MathUtils.lerp(collapsedPos[i][1], distributedPos[i][1], t);
        z = THREE.MathUtils.lerp(collapsedPos[i][2], distributedPos[i][2], t);
        scale = i === 7 ? t : i === 8 ? t * 0.5 : 1;
      } else {
        // Scene 6: ENGINEER DECIDES (p >= 0.82 -> 1.00)
        const t = Math.min(1, (p - 0.82) / 0.18);
        x = distributedPos[i][0];
        y = distributedPos[i][1];
        z = distributedPos[i][2];

        // Engineer node expands into dominant sun; surrounding nodes dim
        if (i === 8) {
          scale = 1 + t * 1.4; // ENGINEER DECIDES expands
        } else {
          scale = 1 - t * 0.45; // surrounding nodes shrink slightly
        }
      }

      // Add gentle organic breathing
      if (!reducedMotion) {
        y += Math.sin(time * 0.8 + i) * 0.05;
        x += Math.cos(time * 0.6 + i) * 0.04;
      }

      currentPositions.push([x, y, z]);

      // Apply to Three.js child mesh
      const mesh = children[i];
      if (mesh) {
        mesh.position.set(x, y, z);
        mesh.scale.set(scale, scale, scale);

        // Color and opacity adjustments
        const mat = mesh.material as THREE.MeshBasicMaterial;
        if (i === 8) {
          // Engineer decides: pure glowing white
          mat.color.setRGB(1, 1, 1);
          mat.opacity = p >= 0.8 ? Math.min(1, (p - 0.8) / 0.1) : 0;
        } else if (i === 6) {
          // Intent: cyan beacon
          mat.color.setRGB(0.22, 0.75, 0.95);
          mat.opacity = p >= 0.45 ? (p < 0.85 ? 0.95 : 0.4) : 0;
        } else {
          // General nodes
          const isLinear = p < 0.45;
          if (isLinear) {
            mat.color.setRGB(0.7, 0.8, 0.9); // clean white-slate
            mat.opacity = p < 0.12 ? 0 : 0.8;
          } else {
            mat.color.setRGB(0.2, 0.8, 1.0); // electric cyan
            mat.opacity = p >= 0.92 ? 0.3 : 0.75;
          }
        }
      }
    }

    // Update connection lines based on current positions
    if (linesRef.current) {
      let lineIdx = 0;
      const addLine = (i1: number, i2: number) => {
        const p1 = currentPositions[i1];
        const p2 = currentPositions[i2];
        if (!p1 || !p2) return;
        linePosBuffer[lineIdx++] = p1[0];
        linePosBuffer[lineIdx++] = p1[1];
        linePosBuffer[lineIdx++] = p1[2];
        linePosBuffer[lineIdx++] = p2[0];
        linePosBuffer[lineIdx++] = p2[1];
        linePosBuffer[lineIdx++] = p2[2];
      };

      if (p < 0.45) {
        // Linear pipeline connections: 0-1, 1-2, 2-3, 3-4, 4-5
        for (let j = 0; j < 5; j++) {
          addLine(j, j + 1);
        }
      } else if (p >= 0.65) {
        // Distributed network connections
        // INTENT (6) connects to AI(0), AGENTS(1), TOOLS(2)
        addLine(6, 0);
        addLine(6, 1);
        addLine(6, 2);
        // AI connects to AGENTS, TOOLS
        addLine(0, 1);
        addLine(0, 2);
        // AGENTS connects to RAG(3)
        addLine(1, 3);
        // TOOLS connects to MCP(4)
        addLine(2, 4);
        // RAG and MCP connect to EXECUTE(5)
        addLine(3, 5);
        addLine(4, 5);
        // EXECUTE connects to VERIFY(7)
        if (p >= 0.75) addLine(5, 7);
        // VERIFY connects to ENGINEER DECIDES(8)
        if (p >= 0.82) addLine(7, 8);
      }

      // Fill remaining line vertices with zero
      while (lineIdx < linePosBuffer.length) {
        linePosBuffer[lineIdx++] = 0;
      }

      linesRef.current.geometry.attributes.position.needsUpdate = true;

      // Line opacity
      const lineMat = linesRef.current.material as THREE.LineBasicMaterial;
      if (p < 0.15 || (p >= 0.45 && p < 0.65)) {
        lineMat.opacity = 0;
      } else if (p < 0.45) {
        lineMat.opacity = 0.35;
        lineMat.color.setRGB(0.5, 0.7, 0.9);
      } else {
        lineMat.opacity = p >= 0.92 ? 0.2 : 0.45;
        lineMat.color.setRGB(0.15, 0.75, 0.95);
      }
    }
  });

  return (
    <>
      {/* 3D Morphing Connecting Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePosBuffer, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* 9 Core Morphing Nodes */}
      <group ref={groupRef}>
        {Array.from({ length: nodeCount }).map((_, i) => {
          const isEngineer = i === 8;
          const isIntent = i === 6;
          const radius = isEngineer ? 0.22 : isIntent ? 0.18 : 0.12;

          return (
            <mesh key={i} position={[0, 0, -20]}>
              <sphereGeometry args={[radius, 16, 16]} />
              <meshBasicMaterial
                color={isEngineer ? '#ffffff' : isIntent ? '#38bdf8' : '#7dd3fc'}
                transparent
                opacity={0.8}
              />
            </mesh>
          );
        })}
      </group>
    </>
  );
};

// 3. CONTINUOUS CAMERA CONTROLLER (ONE CONTINUOUS CAMERA SHOT)
const ContinuousCameraRig: React.FC<{ progressRef: React.MutableRefObject<number>; reducedMotion: boolean }> = ({
  progressRef,
  reducedMotion,
}) => {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useFrame(({ camera }) => {
    const p = progressRef.current;

    // Continuous camera motion path:
    // 0.00 - 0.15: Slow forward movement [0, 0, 6.2 -> 5.5]
    // 0.15 - 0.30: Closer to linear loop [0, 0, 5.5 -> 4.8]
    // 0.30 - 0.45: Destabilization w/ slight pitch [0, 0, 4.8 -> 3.8]
    // 0.45 - 0.58: Camera moves forward toward INTENT [0, 0, 3.8 -> 2.6]
    // 0.58 - 0.65: Quiet hold [0, 0, 2.6]
    // 0.65 - 0.82: Camera pulls backward wide reveal [0, 0, 2.6 -> 6.8]
    // 0.82 - 1.00: Framing stabilizes down around ENGINEER DECIDES [0, -1.2, 5.8]
    let targetZ = 6.2;
    let targetY = 0.0;

    if (p < 0.15) {
      targetZ = THREE.MathUtils.lerp(6.2, 5.5, p / 0.15);
      targetY = 0;
    } else if (p < 0.30) {
      targetZ = THREE.MathUtils.lerp(5.5, 4.8, (p - 0.15) / 0.15);
      targetY = 0;
    } else if (p < 0.45) {
      targetZ = THREE.MathUtils.lerp(4.8, 3.8, (p - 0.30) / 0.15);
      targetY = THREE.MathUtils.lerp(0, 0.15, (p - 0.30) / 0.15);
    } else if (p < 0.58) {
      targetZ = THREE.MathUtils.lerp(3.8, 2.6, (p - 0.45) / 0.13);
      targetY = THREE.MathUtils.lerp(0.15, 0.0, (p - 0.45) / 0.13);
    } else if (p < 0.65) {
      targetZ = 2.6;
      targetY = 0.0;
    } else if (p < 0.82) {
      targetZ = THREE.MathUtils.lerp(2.6, 6.8, (p - 0.65) / 0.17);
      targetY = THREE.MathUtils.lerp(0.0, -0.6, (p - 0.65) / 0.17);
    } else {
      const t = (p - 0.82) / 0.18;
      targetZ = THREE.MathUtils.lerp(6.8, 5.8, t);
      targetY = THREE.MathUtils.lerp(-0.6, -1.2, t);
    }

    const mouseX = reducedMotion ? 0 : mouseRef.current.x * 0.25;
    const mouseY = reducedMotion ? 0 : -mouseRef.current.y * 0.18;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + mouseY, 0.06);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);

    camera.lookAt(0, targetY * 0.6, 0);
  });

  return null;
};

export const ContinuousEvolutionScene: React.FC<SceneProps> = ({ progressRef, reducedMotion }) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 46 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ContinuousCameraRig progressRef={progressRef} reducedMotion={reducedMotion} />
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 2, 4]} intensity={0.8} color="#38bdf8" />

        {/* 1. Continuous Morphing Particles */}
        <ContinuousParticles progressRef={progressRef} reducedMotion={reducedMotion} />

        {/* 2. One Continuous 3D Morphing Network */}
        <MorphingWorkflowNetwork progressRef={progressRef} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
};
