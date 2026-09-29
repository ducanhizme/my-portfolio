import * as THREE from 'three';

export type NodeImportance = 'core' | 'secondary' | 'peripheral';

export interface NeuralNode {
  id: number;
  position: THREE.Vector3;
  basePosition: THREE.Vector3;
  radius: number;
  importance: NodeImportance;
  phase: number;
  speed: number;
  connections: number[];
  color: THREE.Color;
}

export interface NeuralConnection {
  id: number;
  source: number;
  target: number;
  sourcePos: THREE.Vector3;
  targetPos: THREE.Vector3;
  distance: number;
  strength: number;
}

export interface EnergyPulse {
  id: number;
  connectionId: number;
  sourceIdx: number;
  targetIdx: number;
  progress: number;
  speed: number;
  active: boolean;
  color: THREE.Color;
}

export interface NetworkConfig {
  nodeCount: number;
  minConnections: number;
  maxConnections: number;
  connectionMaxDistance: number;
  ambientParticleCount: number;
  spreadX: number;
  spreadY: number;
  spreadZ: number;
  coreRatio: number;
  secondaryRatio: number;
}
