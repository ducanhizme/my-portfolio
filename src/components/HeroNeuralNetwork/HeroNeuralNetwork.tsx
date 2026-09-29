import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { NeuralNetwork } from './NeuralNetwork';

interface HeroNeuralNetworkProps {
  reducedMotion?: boolean;
  className?: string;
}

// Error Boundary for WebGL context failures
class WebGLBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any) {
    console.warn('WebGL initialization guarded:', error);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

export const HeroNeuralNetwork: React.FC<HeroNeuralNetworkProps> = ({
  reducedMotion = false,
  className = '',
}) => {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return null;
  }

  return (
    <div
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <WebGLBoundary>
        <Canvas
          camera={{ position: [0, 0, 11], fov: 40 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.4} />

          <Suspense fallback={null}>
            <NeuralNetwork reducedMotion={reducedMotion} />

            {/* Restrained, photographic post-processing glow */}
            {!reducedMotion && (
              <EffectComposer multisampling={0}>
                <Bloom
                  intensity={0.65}
                  luminanceThreshold={0.2}
                  luminanceSmoothing={0.8}
                  mipmapBlur
                />
                <Vignette
                  eskil={false}
                  offset={0.1}
                  darkness={0.7}
                />
              </EffectComposer>
            )}
          </Suspense>
        </Canvas>
      </WebGLBoundary>
    </div>
  );
};
