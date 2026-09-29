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
    title: "I DON'T JUST WRITE CODE.\nI SOLVE REAL PROBLEMS.",
    supporting: 'Code is a tool. Understanding business constraints and user needs determines whether software lasts.',
    microSummary: 'DOMAIN UNDERSTANDING OVER BLIND CODING',
    visual: 'systems',
  },
  {
    id: 'abstractions',
    number: '02',
    title: 'I LOOK BENEATH ABSTRACTIONS.',
    supporting: 'Convenience is useful, but understanding the database and network execution cost is mandatory.',
    microSummary: 'UNDERSTAND HOW IT WORKS BEFORE DELEGATING',
    visual: 'abstraction',
  },
  {
    id: 'automation',
    number: '03',
    title: 'I AUTOMATE REPETITIVE WORK.',
    supporting: 'If a workflow or testing step is done manually more than twice, it belongs in an automated pipeline.',
    microSummary: 'SAVE TIME FOR HIGH-LEVERAGE ENGINEERING',
    visual: 'automation',
  },
  {
    id: 'measurement',
    number: '04',
    title: 'I MEASURE BEFORE OPTIMIZING.',
    supporting: 'Intuition suggests hypotheses. Concrete metrics, logs, and benchmarks decide engineering priorities.',
    microSummary: 'EMPIRICAL DATA OVER SUBJECTIVE GUESSWORK',
    visual: 'measurement',
  },
  {
    id: 'people',
    number: '05',
    title: 'I BUILD FOR REAL USERS.',
    supporting: 'A technically clever system means little if real people cannot depend on it with confidence every day.',
    microSummary: 'BUILD TRUST THROUGH RELIABILITY AND SPEED',
    visual: 'human',
  },
];
