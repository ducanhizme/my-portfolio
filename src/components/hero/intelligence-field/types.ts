import * as THREE from 'three';

export type NodeImportance = 'core' | 'secondary' | 'peripheral';

export interface NeuralNode {
  id: number;
  position: THREE.Vector3;
  basePosition: THREE.Vector3;
  radius: number;
  importance: NodeImportance;
  importanceValue: number; // 1.0 = core, 0.5 = secondary, 0.2 = peripheral
  phase: number;
  speed: number;
  connections: number[];
  color: THREE.Color;
}

export interface NeuralConnection {
  id: number;
  source: number;
  target: number;
  distance: number;
  strength: number; // 0.08 to 0.40
}

export interface EnergyPulse {
  id: number;
  connectionId: number;
  sourceIdx: number;
  targetIdx: number;
  progress: number;
  speed: number;
  active: boolean;
}

export interface NetworkConfig {
  nodeCount: number;
  minConnections: number;
  maxConnections: number;
  maxDistance: number;
  particleCount: number;
  spreadX: number;
  spreadY: number;
  spreadZ: number;
  centerOffsetX: number;
  centerOffsetY: number;
}
