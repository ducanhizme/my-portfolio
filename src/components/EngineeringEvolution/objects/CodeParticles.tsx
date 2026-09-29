import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CODE_SNIPPETS = [
  'const data =',
  'git diff',
  'npm test',
  'docker build',
  'await fetch()',
  'git commit',
  'export default',
  'interface State',
  'return next()',
  'test("renders")',
  'push origin main',
  'while(debugging)',
  'JSON.parse()',
  'try { execute }',
];

interface CodeParticlesProps {
  progress: number;
  reducedMotion: boolean;
}

export const CodeParticles: React.FC<CodeParticlesProps> = ({ progress, reducedMotion }) => {
  const groupRef = useRef<THREE.Group | null>(null);

  // Generate lightweight canvas textures for the code snippets
  const spriteTextures = useMemo(() => {
    return CODE_SNIPPETS.map((text) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 128, 32);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      return texture;
    });
  }, []);

  // Compute fixed initial 3D positions for each token
  const tokens = useMemo(() => {
    return CODE_SNIPPETS.map((_, i) => {
      const angle = (i / CODE_SNIPPETS.length) * Math.PI * 2;
      const radius = 4 + (i % 3) * 2;
      return {
        initialX: Math.cos(angle) * radius,
        initialY: Math.sin(angle) * (radius * 0.5) + (i % 2 === 0 ? 0.8 : -0.8),
        initialZ: -3 - (i % 4) * 2,
        speed: 0.15 + (i % 3) * 0.08,
        phase: i * 0.6,
      };
    });
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current || reducedMotion) return;

    const time = clock.getElapsedTime();
    const children = groupRef.current.children as THREE.Sprite[];

    // As user progresses past 0.35, particles converge toward center [0, 0, -2]
    const isTransition = progress >= 0.35 && progress <= 0.60;
    const collapseFactor = isTransition
      ? (progress - 0.35) / 0.25
      : progress > 0.60
      ? 1
      : 0;

    // Opacity fades out after transition (as With AI distributed network takes over)
    const baseOpacity = progress < 0.35 ? 0.45 : Math.max(0, 0.45 * (1 - (progress - 0.35) / 0.25));

    children.forEach((sprite, i) => {
      const token = tokens[i];
      if (!token) return;

      if (collapseFactor > 0) {
        // Lerp position into center
        sprite.position.x = THREE.MathUtils.lerp(
          token.initialX + Math.sin(time * token.speed + token.phase) * 0.4,
          0,
          collapseFactor
        );
        sprite.position.y = THREE.MathUtils.lerp(
          token.initialY + Math.cos(time * token.speed + token.phase) * 0.3,
          0,
          collapseFactor
        );
        sprite.position.z = THREE.MathUtils.lerp(token.initialZ, -2, collapseFactor);
        (sprite.material as THREE.SpriteMaterial).opacity = baseOpacity * (1 - collapseFactor * 0.8);
      } else {
        sprite.position.x = token.initialX + Math.sin(time * token.speed + token.phase) * 0.4;
        sprite.position.y = token.initialY + Math.cos(time * token.speed + token.phase) * 0.3;
        sprite.position.z = token.initialZ;
        (sprite.material as THREE.SpriteMaterial).opacity = baseOpacity;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {tokens.map((token, i) => (
        <sprite
          key={i}
          position={[token.initialX, token.initialY, token.initialZ]}
          scale={[1.8, 0.45, 1]}
        >
          <spriteMaterial
            attach="material"
            map={spriteTextures[i]}
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  );
};
