export interface PrincipleItem {
  id: string;
  number: string;
  title: string;
  supporting: string;
  microSummary: string;
  visual: 'systems' | 'abstraction' | 'automation' | 'measurement' | 'human';
}

export const DNA_PRINCIPLES: PrincipleItem[] = [
  {
    id: 'systems',
    number: '01',
    title: "I DON'T JUST WRITE CODE.\nI DESIGN SYSTEMS.",
    supporting: 'Code is one layer. The system around it determines whether it lasts.',
    microSummary: 'ARCHITECTURAL RESILIENCE OVER SYNTACTIC SPEED',
    visual: 'systems',
  },
  {
    id: 'abstractions',
    number: '02',
    title: 'I QUESTION ABSTRACTIONS.',
    supporting: 'Convenience is useful. Understanding is mandatory.',
    microSummary: 'KNOW THE UNDERLYING ENGINE BEFORE DELEGATING',
    visual: 'abstraction',
  },
  {
    id: 'automation',
    number: '03',
    title: 'I AUTOMATE REPETITIVE WORK.',
    supporting: 'If I do something repeatedly, I look for the system behind it.',
    microSummary: 'COMPOUND LEVERAGE THROUGH DETERMINISTIC PIPELINES',
    visual: 'automation',
  },
  {
    id: 'measurement',
    number: '04',
    title: 'I MEASURE BEFORE OPTIMIZING.',
    supporting: 'Intuition proposes. Measurements decide.',
    microSummary: 'TELEMETRY AND EMPIRICAL PROOF FIRST',
    visual: 'measurement',
  },
  {
    id: 'people',
    number: '05',
    title: 'I BUILD FOR REAL PEOPLE.',
    supporting: 'A technically elegant system means little if nobody can depend on it.',
    microSummary: 'ENGINEERING TRUST AND ERGONOMIC IMPACT',
    visual: 'human',
  },
];
