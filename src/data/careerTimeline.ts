export interface CareerMilestone {
  year: string;
  role: string;
  subtitle: string;
  summary: string;
  isCurrent?: boolean;
}

export const CAREER_TIMELINE: CareerMilestone[] = [
  {
    year: '2022',
    role: 'WEB FOUNDATIONS',
    subtitle: 'Software Engineer · Web Platforms',
    summary: 'Learning to turn complex ideas into clean, resilient software and mastering component architecture.',
  },
  {
    year: '2023',
    role: 'DISTRIBUTED SYSTEMS',
    subtitle: 'Backend & Systems Engineer',
    summary: 'Building systems beyond the interface: high-throughput APIs, background message queues, and scalable services.',
  },
  {
    year: '2024',
    role: 'APPLIED AI & RAG',
    subtitle: 'AI Systems Engineer · Knowledge Retrieval',
    summary: 'Grounding models in real enterprise data: hybrid vector search, rerankers, and reliable document intelligence.',
  },
  {
    year: '2025',
    role: 'AGENTIC WORKFLOWS',
    subtitle: 'Lead Agent Engineer',
    summary: 'Designing systems where software can reason, plan, and execute autonomously with tool contracts.',
  },
  {
    year: '2026',
    role: 'AI & SYSTEMS ENGINEERING',
    subtitle: 'Senior AI & Systems Engineer',
    summary: 'Building reliable, verified AI architectures where software engineering rigor and autonomous capability unite.',
    isCurrent: true,
  },
];
