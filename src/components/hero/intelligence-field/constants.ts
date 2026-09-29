import * as THREE from 'three';
import { NetworkConfig } from './types';

export const COLORS = {
  deepBlue: new THREE.Color('#0A1A2F'),
  electricBlue: new THREE.Color('#1688C9'),
  softCyan: new THREE.Color('#31D4E8'),
  white: new THREE.Color('#EAF6FF'),
  pulse: new THREE.Color('#EAF6FF'),
  particle: new THREE.Color('#31D4E8'),
};

export const DESKTOP_CONFIG: NetworkConfig = {
  nodeCount: 52, // 40-70 range
  minConnections: 2,
  maxConnections: 4,
  maxDistance: 2.8,
  particleCount: 280, // 200-400 range
  spreadX: 4.8,
  spreadY: 4.2,
  spreadZ: 3.5,
  centerOffsetX: 3.6, // Placed on the RIGHT side (leaving left headline clean)
  centerOffsetY: 0.2,
};

export const TABLET_CONFIG: NetworkConfig = {
  nodeCount: 35, // 25-45 range
  minConnections: 2,
  maxConnections: 3,
  maxDistance: 3.0,
  particleCount: 180, // 150-250 range
  spreadX: 4.0,
  spreadY: 3.6,
  spreadZ: 3.0,
  centerOffsetX: 2.8,
  centerOffsetY: 0.0,
};

export const MOBILE_CONFIG: NetworkConfig = {
  nodeCount: 22, // 15-30 range
  minConnections: 1,
  maxConnections: 3,
  maxDistance: 3.2,
  particleCount: 100, // 80-150 range
  spreadX: 3.2,
  spreadY: 3.0,
  spreadZ: 2.4,
  centerOffsetX: 1.2, // Subtle right offset on mobile
  centerOffsetY: -0.5,
};

export const MOTION_SETTINGS = {
  breathingDuration: 8.5, // 6-10s range
  breathingAmplitude: 0.01, // 1.00 -> 1.01 -> 1.00
  parallaxMaxRotX: 0.035, // ~2 degrees
  parallaxMaxRotY: 0.052, // ~3 degrees
  proximityRadius: 2.2,
  maxActivePulses: 3, // Rare, only 1-3 active pulses
};
