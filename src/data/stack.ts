import { StackCategory } from '../types';

export const stackCategories: StackCategory[] = [
  {
    id: 'ai-agents',
    name: 'AI & AGENTS',
    role: 'Cognitive Core & Reasoning Loops',
    description: 'Autonomous agents, multi-hop RAG orchestration, semantic rerankers, and LLM evaluation harnesses.',
    technologies: [
      {
        name: 'LangGraph & LangChain',
        level: 95,
        usedFor: ['State machine agent loops', 'Multi-agent consensus', 'Branching workflows'],
        highlight: 'Primary framework for complex stateful agents',
      },
      {
        name: 'LlamaIndex & RAG Tools',
        level: 92,
        usedFor: ['Document chunking & metadata parsing', 'Hybrid index creation', 'Router query engines'],
        highlight: 'Used across production knowledge systems',
      },
      {
        name: 'Model Context Protocol (MCP)',
        level: 88,
        usedFor: ['Standardized tool server dispatch', 'External resource streaming', 'IDE & agent integration'],
        highlight: 'Building interoperable agent tool interfaces',
      },
      {
        name: 'OpenAI / Gemini / Anthropic SDKs',
        level: 96,
        usedFor: ['Structured JSON output', 'Multi-modal vision analysis', 'Tool calling with strict schema'],
        highlight: 'Multi-model fallback & cost/latency routing',
      },
      {
        name: 'Cross-Encoders & Rerankers',
        level: 90,
        usedFor: ['BGE-Reranker-Large', 'Cohere Rerank API', 'Relevance threshold scoring'],
        highlight: 'Dramatic hallucination reduction in RAG',
      },
    ],
    architectureNote:
      'We never connect raw LLMs directly to untrusted data. Every model interaction is wrapped with typed schemas, prompt templates with version control, retry budgets, and safety guardrails.',
  },
  {
    id: 'frontend',
    name: 'FRONTEND',
    role: 'Client Interfaces & Visual Systems',
    description: 'Modern, high-performance web applications, interactive canvas visualizers, and stateful developer tools.',
    technologies: [
      {
        name: 'Next.js 14 / 15 & React 19',
        level: 95,
        usedFor: ['Server components & streaming SSR', 'BFF (Backend for Frontend) routes', 'Edge middleware auth'],
        highlight: 'Standard for fast, production-grade web apps',
      },
      {
        name: 'TypeScript',
        level: 98,
        usedFor: ['End-to-end typed contracts', 'Strict type safety across client & server', 'Complex generics'],
        highlight: '100% strict TypeScript in all repositories',
      },
      {
        name: 'Tailwind CSS',
        level: 96,
        usedFor: ['Design system tokens', 'Responsive high-density dashboards', 'Dark-mode first aesthetics'],
        highlight: 'Rapid modular UI styling without CSS bloat',
      },
      {
        name: 'Framer Motion & WebGL Canvas',
        level: 88,
        usedFor: ['Physics-based animations', 'Graph & particle visualizations', 'Spatial transitions'],
        highlight: 'Delivering cinematic interactive experiences',
      },
    ],
    architectureNote:
      'Frontend is built with strict single-elevation depth, zero-pill typography, and optimistic updates for sub-100ms apparent latency.',
  },
  {
    id: 'backend',
    name: 'BACKEND',
    role: 'Distributed Services & APIs',
    description: 'Resilient microservices, asynchronous task queues, high-concurrency API gateways, and streaming endpoints.',
    technologies: [
      {
        name: 'FastAPI (Python 3.11+)',
        level: 94,
        usedFor: ['AI service backends', 'Asynchronous streaming SSE/WebSockets', 'Pydantic data validation'],
        highlight: 'High-throughput async execution for AI workloads',
      },
      {
        name: 'NestJS & Node.js',
        level: 92,
        usedFor: ['Enterprise microservices', 'Modular dependency injection', 'BFF architecture'],
        highlight: 'Scalable service layer with clean architectural boundaries',
      },
      {
        name: 'Redis & BullMQ',
        level: 90,
        usedFor: ['Distributed background job queues', 'Rate limiting & token buckets', 'Pub/Sub event bus'],
        highlight: 'Decoupling heavy AI tasks from user request cycles',
      },
      {
        name: 'WebSockets & Server-Sent Events',
        level: 92,
        usedFor: ['Real-time LLM token streaming', 'Live multi-agent step telemetry', 'Instant UI updates'],
        highlight: 'Zero perceived wait time for generative outputs',
      },
    ],
    architectureNote:
      'Backend follows Clean Architecture / Hexagonal principles. Domain models remain pure and isolated from third-party AI provider SDK churn.',
  },
  {
    id: 'database',
    name: 'DATABASE',
    role: 'Persistent Storage, Vector & Graphs',
    description: 'Polyglot persistence uniting ACID relational storage, sub-millisecond in-memory cache, vectors, and graph ontologies.',
    technologies: [
      {
        name: 'PostgreSQL & pgvector',
        level: 95,
        usedFor: ['Primary transactional relational data', 'Row-level security', 'Hybrid vector search'],
        highlight: 'Uncompromising relational integrity and ACID guarantees',
      },
      {
        name: 'Qdrant / Chroma Vector DB',
        level: 90,
        usedFor: ['HNSW vector indexing', 'Payload payload filtering', 'High-dimensional embeddings'],
        highlight: 'Dedicated sub-10ms similarity search at scale',
      },
      {
        name: 'Neo4j Graph Database',
        level: 86,
        usedFor: ['Entity relationship ontologies', 'Multi-hop graph queries (Cypher)', 'Knowledge graph RAG'],
        highlight: 'Enabling topological reasoning beyond simple vector proximity',
      },
      {
        name: 'MinIO & S3 Storage',
        level: 90,
        usedFor: ['Raw PDF & document storage', 'Pre-computed chunk caches', 'Artifact exports'],
        highlight: 'S3-compatible distributed blob storage',
      },
    ],
    architectureNote:
      'Databases are selected by read/write profile: Relational for state, Vector for semantic distance, Graph for contextual hierarchies.',
  },
  {
    id: 'deployment',
    name: 'DEPLOYMENT',
    role: 'Cloud Infrastructure & Containers',
    description: 'Containerized deployment pipelines, reproducible runtime environments, and automated CI/CD.',
    technologies: [
      {
        name: 'Docker & Docker Compose',
        level: 95,
        usedFor: ['Multi-stage minimal image builds', 'Local sandbox replication', 'Agent code sandboxes'],
        highlight: 'Every service runs in deterministic containers',
      },
      {
        name: 'Linux / Debian & Shell Scripting',
        level: 92,
        usedFor: ['Server configuration', 'Systemd unit management', 'Automated maintenance scripts'],
        highlight: 'Deep comfort in terminal and production Linux environments',
      },
      {
        name: 'Azure & GCP Cloud Run',
        level: 88,
        usedFor: ['Serverless container execution', 'Cloud storage & IAM', 'Managed SQL instances'],
        highlight: 'Zero-maintenance auto-scaling cloud deployments',
      },
      {
        name: 'GitHub Actions CI/CD',
        level: 90,
        usedFor: ['Automated lint, test & build workflows', 'Docker image registry push', 'Automated semantic release'],
        highlight: 'Zero manual production releases',
      },
    ],
    architectureNote:
      'Infrastructure as Code (IaC) principles: all container builds are multi-stage with unprivileged users and security vulnerability scanning.',
  },
  {
    id: 'observability',
    name: 'OBSERVABILITY',
    role: 'Telemetry, Tracing & Quality Metrics',
    description: 'Deep visibility into distributed agent runs, token costs, latency bottlenecks, and error rates.',
    technologies: [
      {
        name: 'OpenTelemetry & Jaeger',
        level: 88,
        usedFor: ['Distributed trace propagation', 'Span timing across multi-service calls', 'Latency breakdown'],
        highlight: 'Visualizing exact bottlenecks across multi-hop RAG',
      },
      {
        name: 'Prometheus & Grafana',
        level: 86,
        usedFor: ['Service health metrics', 'QPS & error rate dashboards', 'Resource saturation alerts'],
        highlight: 'Real-time telemetry and alerting thresholds',
      },
      {
        name: 'LangSmith & Arize Phoenix',
        level: 90,
        usedFor: ['LLM generation evaluation', 'Prompt regression testing', 'Dataset curation from failure traces'],
        highlight: 'Systematic evaluation driving AI accuracy improvements',
      },
    ],
    architectureNote:
      'We measure before optimizing. Every agent step emits structured JSON logs with trace IDs, token counts, and execution latency.',
  },
];
