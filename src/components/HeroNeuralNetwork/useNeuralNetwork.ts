import { useMemo, useState, useEffect } from 'react';
import { generateNetwork, createInitialPulses } from './networkGenerator';
import { DESKTOP_CONFIG, MOBILE_CONFIG, ANIMATION_PARAMS } from './constants';

export function useNeuralNetwork() {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const config = isMobile ? MOBILE_CONFIG : DESKTOP_CONFIG;

  const networkData = useMemo(() => {
    return generateNetwork(config);
  }, [config]);

  const initialPulses = useMemo(() => {
    return createInitialPulses(networkData.connections, ANIMATION_PARAMS.maxConcurrentPulses);
  }, [networkData.connections]);

  return {
    isMobile,
    config,
    nodes: networkData.nodes,
    connections: networkData.connections,
    ambientParticles: networkData.ambientParticles,
    initialPulses,
  };
}
