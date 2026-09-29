export interface ExactNode {
  id: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  z: number; // depth (-1 to 1)
  importance: 'major_hub' | 'hub' | 'standard' | 'minor';
  label?: 'AGENT' | 'RAG' | 'SYSTEMS';
  hasRing?: boolean;
  hasDoubleRing?: boolean;
  ringRadius?: number;
  tagOffset?: { dx: number; dy: number };
  isLargeGlow?: boolean;
}

export interface ExactConnection {
  source: string;
  target: string;
  isImportant?: boolean;
}

export const EXACT_NODES: ExactNode[] = [
  // 1. HUB AGENT (Top)
  {
    id: 'hub_agent',
    x: 68.8,
    y: 11.5,
    z: 0.15,
    importance: 'hub',
    label: 'AGENT',
    hasRing: true,
    ringRadius: 18,
    tagOffset: { dx: 68, dy: 0 },
  },
  // 2. HUB RAG (Major radiant epicenter)
  {
    id: 'hub_rag',
    x: 79.8,
    y: 37.0,
    z: 0.35,
    importance: 'major_hub',
    label: 'RAG',
    hasRing: true,
    ringRadius: 26,
    tagOffset: { dx: 125, dy: -48 },
  },
  // 3. HUB SYSTEMS (Lower-center, double concentric ring)
  {
    id: 'hub_systems',
    x: 67.5,
    y: 69.0,
    z: 0.1,
    importance: 'hub',
    label: 'SYSTEMS',
    hasDoubleRing: true,
    ringRadius: 14,
    tagOffset: { dx: 72, dy: -42 },
  },

  // 4. Key nodes with concentric rings
  {
    id: 'node_west_ring',
    x: 50.2,
    y: 42.0,
    z: 0.05,
    importance: 'standard',
    hasRing: true,
    ringRadius: 14,
  },
  {
    id: 'node_planet_west',
    x: 59.8,
    y: 57.5,
    z: 0.12,
    importance: 'standard',
    hasRing: true,
    ringRadius: 16,
  },
  {
    id: 'node_mid_upper_ring',
    x: 71.0,
    y: 23.0,
    z: 0.1,
    importance: 'standard',
    hasRing: true,
    ringRadius: 13,
  },

  // 5. Surrounding interconnected nodes
  { id: 'node_mid_center', x: 71.0, y: 38.0, z: 0.2, importance: 'standard' },
  { id: 'node_mid_left_1', x: 55.0, y: 42.0, z: 0.0, importance: 'standard' },
  { id: 'node_mid_left_2', x: 63.0, y: 45.0, z: 0.1, importance: 'standard' },
  { id: 'node_mid_left_3', x: 53.0, y: 51.0, z: 0.05, importance: 'standard' },
  { id: 'node_upper_right', x: 84.0, y: 17.5, z: 0.22, importance: 'standard' },
  { id: 'node_mid_right_1', x: 89.5, y: 27.5, z: 0.28, importance: 'standard' },
  { id: 'node_mid_lower_right', x: 84.0, y: 46.0, z: 0.18, importance: 'standard' },
  { id: 'node_lower_right_mid', x: 87.0, y: 52.0, z: 0.15, importance: 'standard' },
  { id: 'node_lower_mid', x: 76.0, y: 50.0, z: 0.1, importance: 'standard' },
  { id: 'node_top_sub_1', x: 69.0, y: 17.0, z: 0.1, importance: 'standard' },
  { id: 'node_top_left', x: 63.0, y: 12.0, z: 0.02, importance: 'minor' },
  { id: 'node_top_apex', x: 74.0, y: 2.0, z: 0.12, importance: 'minor' },

  // Far right glowing cosmic nodes
  { id: 'node_far_right_glow', x: 95.5, y: 48.0, z: 0.35, importance: 'standard', isLargeGlow: true },
  { id: 'node_far_right_lower', x: 98.0, y: 70.0, z: 0.25, importance: 'standard', isLargeGlow: true },

  // Tendril to the West (pointing towards headline)
  { id: 'node_west_tendril_base', x: 49.5, y: 25.0, z: -0.05, importance: 'minor' },
  { id: 'node_west_tendril_tip', x: 35.5, y: 31.0, z: -0.15, importance: 'minor' },

  // Systems lower extension
  { id: 'node_systems_lower', x: 69.5, y: 75.0, z: 0.05, importance: 'minor' },
];

export const EXACT_CONNECTIONS: ExactConnection[] = [
  // West tendril
  { source: 'node_west_tendril_tip', target: 'node_west_tendril_base', isImportant: true },
  { source: 'node_west_tendril_base', target: 'node_top_left' },
  { source: 'node_west_tendril_base', target: 'node_west_ring' },

  // Top Agent cluster
  { source: 'node_top_left', target: 'hub_agent' },
  { source: 'hub_agent', target: 'node_top_apex' },
  { source: 'hub_agent', target: 'node_top_sub_1', isImportant: true },
  { source: 'node_top_sub_1', target: 'node_mid_upper_ring' },

  // Upper right connections
  { source: 'node_mid_upper_ring', target: 'node_upper_right' },
  { source: 'node_mid_upper_ring', target: 'hub_rag', isImportant: true },
  { source: 'node_upper_right', target: 'hub_rag' },
  { source: 'node_upper_right', target: 'node_mid_right_1' },

  // Major RAG epicenter radiating spokes
  { source: 'hub_rag', target: 'node_mid_right_1', isImportant: true },
  { source: 'hub_rag', target: 'node_mid_lower_right', isImportant: true },
  { source: 'hub_rag', target: 'node_mid_center', isImportant: true },
  { source: 'hub_rag', target: 'node_lower_mid', isImportant: true },
  { source: 'hub_rag', target: 'node_lower_right_mid', isImportant: true },
  { source: 'hub_rag', target: 'node_far_right_glow', isImportant: true },

  // Mid-West network across planet surface
  { source: 'node_west_ring', target: 'node_mid_left_1' },
  { source: 'node_mid_left_1', target: 'node_mid_left_2' },
  { source: 'node_mid_left_1', target: 'node_mid_left_3' },
  { source: 'node_mid_left_2', target: 'node_mid_center' },
  { source: 'node_mid_left_3', target: 'node_planet_west' },
  { source: 'node_mid_left_2', target: 'node_planet_west' },
  { source: 'node_planet_west', target: 'hub_systems', isImportant: true },

  // Systems cluster
  { source: 'node_mid_center', target: 'node_lower_mid' },
  { source: 'node_lower_mid', target: 'hub_systems', isImportant: true },
  { source: 'hub_systems', target: 'node_systems_lower' },

  // Right edge tendrils
  { source: 'node_mid_lower_right', target: 'node_lower_right_mid' },
  { source: 'node_lower_right_mid', target: 'node_far_right_glow' },
  { source: 'node_far_right_glow', target: 'node_far_right_lower' },
];
