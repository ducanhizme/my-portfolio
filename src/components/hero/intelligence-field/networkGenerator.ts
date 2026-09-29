import * as THREE from 'three';
import { NeuralNode, NeuralConnection, EnergyPulse, NetworkConfig } from './types';
import { COLORS, MOTION_SETTINGS } from './constants';

class LCG {
  private state: number;
  constructor(seed: number = 8841) {
    this.state = seed;
  }
  next(): number {
    this.state = (1664525 * this.state + 1013904223) % 4294967296;
    return this.state / 4294967296;
  }
  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }
}

export function generateIntelligenceField(config: NetworkConfig) {
  const rng = new LCG(5203);
  const nodes: NeuralNode[] = [];
  const connections: NeuralConnection[] = [];

  const coreCount = Math.max(3, Math.floor(config.nodeCount * 0.15));
  const secondaryCount = Math.floor(config.nodeCount * 0.35);

  // 1. Generate Nodes
  for (let i = 0; i < config.nodeCount; i++) {
    let importance: 'core' | 'secondary' | 'peripheral';
    let importanceValue: number;
    let radius: number;
    let color: THREE.Color;
    let pos: THREE.Vector3;

    if (i < coreCount) {
      importance = 'core';
      importanceValue = 1.0;
      radius = rng.range(0.065, 0.09);
      color = COLORS.white;

      // Concentrated around right center cluster
      pos = new THREE.Vector3(
        config.centerOffsetX + rng.range(-config.spreadX * 0.25, config.spreadX * 0.25),
        config.centerOffsetY + rng.range(-config.spreadY * 0.25, config.spreadY * 0.25),
        rng.range(-config.spreadZ * 0.25, config.spreadZ * 0.25)
      );
    } else if (i < coreCount + secondaryCount) {
      importance = 'secondary';
      importanceValue = 0.5;
      radius = rng.range(0.045, 0.065);
      color = COLORS.softCyan;

      // Midground organic distribution
      const theta = rng.range(0, Math.PI * 2);
      const radX = rng.range(0.25, 0.6) * config.spreadX;
      const radY = rng.range(0.25, 0.6) * config.spreadY;

      pos = new THREE.Vector3(
        config.centerOffsetX + Math.cos(theta) * radX,
        config.centerOffsetY + Math.sin(theta) * radY,
        rng.range(-config.spreadZ * 0.45, config.spreadZ * 0.45)
      );
    } else {
      importance = 'peripheral';
      importanceValue = 0.2;
      radius = rng.range(0.025, 0.045);
      color = COLORS.electricBlue;

      // Outer tendrils spreading into cosmos
      const theta = rng.range(0, Math.PI * 2);
      const radX = rng.range(0.5, 1.0) * config.spreadX;
      const radY = rng.range(0.5, 1.0) * config.spreadY;

      pos = new THREE.Vector3(
        config.centerOffsetX + Math.cos(theta) * radX,
        config.centerOffsetY + Math.sin(theta) * radY,
        rng.range(-config.spreadZ * 0.6, config.spreadZ * 0.6)
      );
    }

    nodes.push({
      id: i,
      position: pos.clone(),
      basePosition: pos.clone(),
      radius,
      importance,
      importanceValue,
      phase: rng.range(0, Math.PI * 2),
      speed: rng.range(0.3, 0.8), // Very slow pulsation
      connections: [],
      color,
    });
  }

  // 2. Generate Sparse Proximity Connections (Rules: thin, low opacity 0.08 to 0.40)
  let connId = 0;
  const connectedPairs = new Set<string>();

  for (let i = 0; i < nodes.length; i++) {
    const nodeA = nodes[i];
    const neighbors: Array<{ idx: number; dist: number }> = [];

    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const dist = nodeA.basePosition.distanceTo(nodes[j].basePosition);
      if (dist < config.maxDistance) {
        neighbors.push({ idx: j, dist });
      }
    }

    neighbors.sort((a, b) => a.dist - b.dist);

    const maxConns =
      nodeA.importance === 'core'
        ? config.maxConnections
        : nodeA.importance === 'secondary'
        ? config.minConnections + 1
        : config.minConnections;

    let added = 0;
    for (const nb of neighbors) {
      if (added >= maxConns) break;
      const key = i < nb.idx ? `${i}-${nb.idx}` : `${nb.idx}-${i}`;
      if (!connectedPairs.has(key)) {
        connectedPairs.add(key);
        nodeA.connections.push(nb.idx);
        nodes[nb.idx].connections.push(i);

        // Core-connected edges get higher strength, peripheral get lower
        const isCoreEdge =
          nodeA.importance === 'core' || nodes[nb.idx].importance === 'core';
        const baseStrength = isCoreEdge ? 0.32 : 0.16;
        const distFade = 1.0 - nb.dist / config.maxDistance;
        const strength = THREE.MathUtils.clamp(
          baseStrength * distFade,
          0.08,
          0.4
        );

        connections.push({
          id: connId++,
          source: i,
          target: nb.idx,
          distance: nb.dist,
          strength,
        });
        added++;
      }
    }
  }

  // Ensure no isolated node
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].connections.length === 0) {
      let nearestIdx = -1;
      let minD = Infinity;
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const d = nodes[i].basePosition.distanceTo(nodes[j].basePosition);
        if (d < minD) {
          minD = d;
          nearestIdx = j;
        }
      }
      if (nearestIdx !== -1) {
        const key = i < nearestIdx ? `${i}-${nearestIdx}` : `${nearestIdx}-${i}`;
        connectedPairs.add(key);
        nodes[i].connections.push(nearestIdx);
        nodes[nearestIdx].connections.push(i);
        connections.push({
          id: connId++,
          source: i,
          target: nearestIdx,
          distance: minD,
          strength: 0.18,
        });
      }
    }
  }

  // 3. Sparse Atmospheric Particles (blends with starry background)
  const particlePositions = new Float32Array(config.particleCount * 3);
  const particleAlphas = new Float32Array(config.particleCount);

  for (let i = 0; i < config.particleCount; i++) {
    particlePositions[i * 3] =
      config.centerOffsetX + rng.range(-config.spreadX * 0.8, config.spreadX * 0.8);
    particlePositions[i * 3 + 1] =
      config.centerOffsetY + rng.range(-config.spreadY * 0.8, config.spreadY * 0.8);
    particlePositions[i * 3 + 2] = rng.range(
      -config.spreadZ * 0.8,
      config.spreadZ * 0.8
    );

    // Dim alphas
    particleAlphas[i] = rng.range(0.12, 0.45);
  }

  // 4. Initial Energy Pulses (Rare: 2-3 active at any time)
  const pulses: EnergyPulse[] = [];
  const pulseCount = Math.min(
    connections.length,
    MOTION_SETTINGS.maxActivePulses
  );

  for (let i = 0; i < pulseCount; i++) {
    const cIdx = Math.floor(rng.next() * connections.length);
    const conn = connections[cIdx];
    pulses.push({
      id: i,
      connectionId: conn ? conn.id : 0,
      sourceIdx: conn ? conn.source : 0,
      targetIdx: conn ? conn.target : 0,
      progress: rng.next(),
      speed: rng.range(0.18, 0.35), // Slow, subtle transit
      active: true,
    });
  }

  return {
    nodes,
    connections,
    particles: {
      positions: particlePositions,
      alphas: particleAlphas,
      count: config.particleCount,
    },
    pulses,
  };
}
