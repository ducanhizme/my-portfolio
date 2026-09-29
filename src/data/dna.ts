export interface DnaPrinciple {
  number: string;
  statement: string;
  elaboration: string;
  details: string[];
}

export const dnaPrinciples: DnaPrinciple[] = [
  {
    number: '01',
    statement: "I don't just write code. I design systems.",
    elaboration: 'Code is a byproduct of understanding constraints, data flows, and failure modes. Good architecture survives technology churn because it is built around fundamental domain invariants.',
    details: [
      'Model state machines explicitly before writing execution handlers',
      'Decouple business rules from external AI SDK churn and cloud providers',
      'Design for graceful degradation when third-party APIs fail or rate-limit',
    ],
  },
  {
    number: '02',
    statement: 'I question abstractions.',
    elaboration: 'Convenient helper libraries frequently conceal crippling latency, memory leaks, and unhandled network partitions. True engineering begins when you understand the byte-level execution cost.',
    details: [
      'Inspect generated SQL and vector distance queries rather than trusting ORM defaults',
      'Benchmark serialization overhead and network hops across microservices',
      'Never treat LLM prompts as magical black boxes — treat them as non-deterministic probabilistic compilers',
    ],
  },
  {
    number: '03',
    statement: 'I automate repetitive work.',
    elaboration: 'If an engineer has to execute a procedure manually more than twice, it belongs in a CI script, a headless agent, or an automated regression harness.',
    details: [
      'Created self-healing test runners that eliminate flaky locator firefighting',
      'Built automated PR review and schema validation bots that catch breaking changes early',
      'Standardized reproducible container environments for zero-onboarding friction',
    ],
  },
  {
    number: '04',
    statement: 'I measure before optimizing.',
    elaboration: 'Intuition about system bottlenecks is almost always biased. Rigorous telemetry, distributed traces, and quantitative evaluation datasets dictate where engineering effort yields real return.',
    details: [
      'Instrument every agent hop with OpenTelemetry span timings and token consumption',
      'Evaluate RAG quality with Faithfulness, Context Precision, and Answer Relevance metrics',
      'A/B test prompt variations against frozen regression datasets before rolling out to production',
    ],
  },
  {
    number: '05',
    statement: 'I build AI systems that people can actually use.',
    elaboration: 'A 90% accurate demo is an impressive prototype; a 99% reliable production service with human fallback is a real product. The value of AI lies in dependability, sub-second latency, and intuitive interfaces.',
    details: [
      'Implement Human-in-the-Loop review gates for high-consequence administrative decisions',
      'Provide instant streaming feedback so users never stare at blank loading spinners',
      'Deliver transparent citations and source grounding with every generated response',
    ],
  },
];
