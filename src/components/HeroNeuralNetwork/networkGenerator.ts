import * as THREE from 'three';
import { NeuralNode, NeuralConnection, EnergyPulse, NetworkConfig } from './types';
import { PALETTE } from './constants';

// Mulberry32 pseudo-random number generator for deterministic procedural seeds
class SeededRandom {
  private s: number;
  constructor(seed: number = 4289) {
    this.s = seed;
  }
  next(): number {
    let t = (this.s += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }
}

export function generateNetwork(config: NetworkConfig) {
  const rng = new SeededRandom(7391);
  const nodes: NeuralNode[] = [];
  const connections: NeuralConnection[] = [];

  const coreCount = Math.floor(config.nodeCount * config.coreRatio);
  const secondaryCount = Math.floor(config.nodeCount * config.secondaryRatio);

  // 1. Generate Nodes
  for (let i = 0; i < config.nodeCount; i++) {
    let importance: 'core' | 'secondary' | 'peripheral';
    let radius: number;
    let color: THREE.Color;
    let pos: THREE.Vector3;

    if (i < coreCount) {
      importance = 'core';
      radius = rng.range(0.12, 0.18);
      color = PALETTE.coreNode;
      // Core cluster in central region with subtle asymmetry
      const u = rng.next();
      const v = rng.next();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(rng.next()) * (config.spreadX * 0.28);

      pos = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta) * 1.3 + rng.range(-0.5, 0.5),
        r * Math.sin(phi) * Math.sin(theta) * 0.85 + rng.range(-0.3, 0.3),
        r * Math.cos(phi) * 0.9 + rng.range(-0.4, 0.4)
      );
    } else if (i < coreCount + secondaryCount) {
      importance = 'secondary';
      radius = rng.range(0.07, 0.11);
      color = PALETTE.secondaryNode;
      // Midground organic distribution
      const u = rng.next();
      const v = rng.next();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = (0.28 + rng.next() * 0.45) * config.spreadX;

      pos = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta) * 1.15,
        r * Math.sin(phi) * Math.sin(theta) * 0.75,
        r * Math.cos(phi) * 0.8
      );
    } else {
      importance = 'peripheral';
      radius = rng.range(0.04, 0.07);
      color = PALETTE.peripheralNode;
      // Outer peripheral nodes forming knowledge tendrils and constellation field
      const theta = rng.range(0, Math.PI * 2);
      const dist = rng.range(0.65, 1.0);
      pos = new THREE.Vector3(
        Math.cos(theta) * config.spreadX * 0.5 * dist + rng.range(-0.8, 0.8),
        Math.sin(theta) * config.spreadY * 0.5 * dist + rng.range(-0.6, 0.6),
        rng.range(-config.spreadZ * 0.5, config.spreadZ * 0.5)
      );
    }

    nodes.push({
      id: i,
      position: pos.clone(),
      basePosition: pos.clone(),
      radius,
      importance,
      phase: rng.range(0, Math.PI * 2),
      speed: rng.range(0.4, 1.2),
      connections: [],
      color,
    });
  }

  // 2. Generate Proximity-Based Connections
  let connectionId = 0;
  const connectedPairs = new Set<string>();

  for (let i = 0; i < nodes.length; i++) {
    const nodeA = nodes[i];
    // Find all potential candidates sorted by distance
    const candidates: Array<{ idx: number; dist: number }> = [];

    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const dist = nodeA.basePosition.distanceTo(nodes[j].basePosition);
      if (dist < config.connectionMaxDistance) {
        candidates.push({ idx: j, dist });
      }
    }

    candidates.sort((a, b) => a.dist - b.dist);

    // Desired connection count based on importance
    const targetConns =
      nodeA.importance === 'core'
        ? config.maxConnections
        : nodeA.importance === 'secondary'
        ? config.minConnections + 1
        : config.minConnections;

    let added = 0;
    for (const cand of candidates) {
      if (added >= targetConns) break;
      const pairKey = i < cand.idx ? `${i}-${cand.idx}` : `${cand.idx}-${i}`;
      if (!connectedPairs.has(pairKey)) {
        connectedPairs.add(pairKey);
        nodeA.connections.push(cand.idx);
        nodes[cand.idx].connections.push(i);

        // Strength is inversely proportional to distance
        const strength = Math.max(0.2, 1 - cand.dist / config.connectionMaxDistance);

        connections.push({
          id: connectionId++,
          source: i,
          target: cand.idx,
          sourcePos: nodeA.basePosition,
          targetPos: nodes[cand.idx].basePosition,
          distance: cand.dist,
          strength,
        });
        added++;
      }
    }
  }

  // Ensure no node is isolated
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].connections.length === 0) {
      // Connect to nearest node
      let nearestIdx = -1;
      let nearestDist = Infinity;
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const dist = nodes[i].basePosition.distanceTo(nodes[j].basePosition);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIdx = j;
        }
      }
      if (nearestIdx !== -1) {
        const pairKey = i < nearestIdx ? `${i}-${nearestIdx}` : `${nearestIdx}-${i}`;
        connectedPairs.add(pairKey);
        nodes[i].connections.push(nearestIdx);
        nodes[nearestIdx].connections.push(i);

        connections.push({
          id: connectionId++,
          source: i,
          target: nearestIdx,
          sourcePos: nodes[i].basePosition,
          targetPos: nodes[nearestIdx].basePosition,
          distance: nearestDist,
          strength: 0.6,
        });
      }
    }
  }

  // 3. Ambient Particle Cloud Positions
  const ambientPositions = new Float32Array(config.ambientParticleCount * 3);
  const ambientScales = new Float32Array(config.ambientParticleCount);
  const ambientAlphas = new Float32Array(config.ambientParticleCount);

  for (let i = 0; i < config.ambientParticleCount; i++) {
    const theta = rng.range(0, Math.PI * 2);
    const rad = rng.range(1.5, config.spreadX * 0.75);
    const x = Math.cos(theta) * rad + rng.range(-1, 1);
    const y = Math.sin(theta) * rad * 0.65 + rng.range(-0.8, 0.8);
    const z = rng.range(-config.spreadZ * 0.7, config.spreadZ * 0.7);

    ambientPositions[i * 3] = x;
    ambientPositions[i * 3 + 1] = y;
    ambientPositions[i * 3 + 2] = z;

    ambientScales[i] = rng.range(0.6, 2.0);
    ambientAlphas[i] = rng.range(0.15, 0.55);
  }

  return {
    nodes,
    connections,
    ambientParticles: {
      positions: ambientPositions,
      scales: ambientScales,
      alphas: ambientAlphas,
      count: config.ambientParticleCount,
    },
  };
}

// Helper to spawn initial energy pulses along active connections
export function createInitialPulses(connections: NeuralConnection[], maxCount: number): EnergyPulse[] {
  const rng = new SeededRandom(9912);
  const pulses: EnergyPulse[] = [];

  for (let i = 0; i < maxCount; i++) {
    const connIdx = Math.floor(rng.next() * connections.length);
    const conn = connections[connIdx];
    pulses.push({
      id: i,
      connectionId: conn ? conn.id : 0,
      sourceIdx: conn ? conn.source : 0,
      targetIdx: conn ? conn.target : 0,
      progress: rng.next(), // Staggered start progress
      speed: rng.range(0.25, 0.55),
      active: true,
      color: PALETTE.pulseCore,
    });
  }

  return pulses;
}
