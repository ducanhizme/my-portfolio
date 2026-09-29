export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  headline: string;
  description: string;
  image?: string;
  problem: string;
  problemDetails?: string;
  solution: string;
  approachDetails?: string;
  metrics: {
    label: string;
    value: string;
    sublabel?: string;
  }[];
  techStack: {
    category: string;
    items: string[];
  }[];
  architecture: {
    overview: string;
    flowSteps: {
      step: string;
      title: string;
      desc: string;
      latency?: string;
    }[];
  };
  demoPrompt?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface LabExperiment {
  id: string;
  title: string;
  category: string;
  description: string;
  badge: string;
  iconName: string;
  inputs?: string[];
  defaultInput?: string;
  simulatedResult?: {
    summary: string;
    steps: {
      label: string;
      detail: string;
      status: 'pending' | 'active' | 'completed';
      data?: Record<string, any>;
    }[];
    metrics: Record<string, string>;
  };
}

export interface StackCategory {
  id: string;
  name: string;
  role: string;
  description: string;
  technologies: {
    name: string;
    level: number; // 0 - 100
    usedFor: string[];
    highlight?: string;
  }[];
  architectureNote: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  roleTitle: string;
  focus: string[];
  description: string;
  achievements: string[];
  technologies: string[];
}
