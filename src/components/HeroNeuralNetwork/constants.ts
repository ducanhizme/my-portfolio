import * as THREE from 'three';
import { NetworkConfig } from './types';

export const PALETTE = {
  background: '#02040A',
  coreNode: new THREE.Color('#e0f2fe'), // Soft cyan-white
  coreGlow: new THREE.Color('#38bdf8'), // Electric blue
  secondaryNode: new THREE.Color('#38bdf8'), // Cool blue
  peripheralNode: new THREE.Color('#1e40af'), // Deep oceanic blue
  connectionBase: new THREE.Color('#1d4ed8'),
  connectionActive: new THREE.Color('#38bdf8'),
  pulseCore: new THREE.Color('#f0f9ff'),
  ambientParticle: new THREE.Color('#7dd3fc'),
};

export const DESKTOP_CONFIG: NetworkConfig = {
  nodeCount: 110,
  minConnections: 2,
  maxConnections: 4,
  connectionMaxDistance: 3.8,
  ambientParticleCount: 950,
  spreadX: 13,
  spreadY: 7.5,
  spreadZ: 6.5,
  coreRatio: 0.18,
  secondaryRatio: 0.42,
};

export const MOBILE_CONFIG: NetworkConfig = {
  nodeCount: 45,
  minConnections: 2,
  maxConnections: 3,
  connectionMaxDistance: 4.5,
  ambientParticleCount: 380,
  spreadX: 8,
  spreadY: 5.5,
  spreadZ: 4.5,
  coreRatio: 0.22,
  secondaryRatio: 0.45,
};

export const ANIMATION_PARAMS = {
  breathingPeriod: 8.0, // seconds
  breathingAmplitude: 0.018, // scale delta
  parallaxFactorX: 0.05, // rotation in rad (~2.8 deg)
  parallaxFactorY: 0.08, // rotation in rad (~4.5 deg)
  pointerProximityRadius: 2.8,
  maxConcurrentPulses: 6,
};
