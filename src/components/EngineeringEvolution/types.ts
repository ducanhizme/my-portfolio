export interface EvolutionState {
  progress: number; // 0.00 to 1.00
  phase:
    | 'intro' // 0.00 - 0.15
    | 'old-loop' // 0.15 - 0.35
    | 'transition' // 0.35 - 0.55
    | 'intent' // 0.55 - 0.68
    | 'network' // 0.68 - 0.82
    | 'climax'; // 0.82 - 1.00
  reducedMotion: boolean;
}

export interface WorkflowNode {
  id: string;
  label: string;
  category: string;
  x: number;
  y: number;
  activeAt: number;
}
