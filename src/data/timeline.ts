import { TimelineMilestone } from '../types';

export const timelineMilestones: TimelineMilestone[] = [
  {
    year: '2022',
    title: 'FOUNDATIONS & MODERN WEB',
    roleTitle: 'Software Engineer · Web Platforms',
    focus: ['Frontend Engineering', 'State Management', 'REST APIs', 'TypeScript'],
    description:
      'Mastered core software engineering practices, deep TypeScript typing, and modern component architectures with React and Next.js. Delivered responsive, accessible interfaces for enterprise client applications.',
    achievements: [
      'Architected reusable component systems used across multiple internal client products',
      'Established strict TypeScript standards reducing runtime production errors by 40%',
      'Optimized Core Web Vitals to achieve near-perfect 98+ Lighthouse performance scores',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
  },
  {
    year: '2023',
    title: 'DISTRIBUTED BACKEND & SYSTEM DESIGN',
    roleTitle: 'Backend / Systems Engineer',
    focus: ['Distributed Systems', 'Message Queues', 'Microservices', 'High-Throughput APIs'],
    description:
      'Transitioned to distributed backend architecture, handling high-concurrency request workloads, database indexing, background job processing with Redis/BullMQ, and resilient microservice communication.',
    achievements: [
      'Built asynchronous ingestion pipelines processing thousands of background payloads per minute',
      'Designed resilient microservice boundary interfaces using NestJS and FastAPI',
      'Implemented database partitioning and Redis caching patterns cutting 95th-percentile latency from 450ms to 48ms',
    ],
    technologies: ['FastAPI', 'NestJS', 'PostgreSQL', 'Redis', 'Docker', 'BullMQ', 'Linux'],
  },
  {
    year: '2024',
    title: 'APPLIED AI & RAG ARCHITECTURES',
    roleTitle: 'AI Systems Engineer · RAG Specialist',
    focus: ['Vector Databases', 'Hybrid Retrieval', 'Rerankers', 'Document Processing'],
    description:
      'Pioneered internal enterprise AI adoption. Moved beyond basic vector embeddings to build robust Retrieval-Augmented Generation (RAG) engines capable of handling complex unstructured enterprise documents without hallucination.',
    achievements: [
      'Engineered Hive KMS knowledge retrieval pipeline indexing 10,000+ complex organizational documents',
      'Introduced Cross-Encoder reranking and sparse/dense hybrid search, boosting retrieval precision by 35%',
      'Developed automated regression evaluation suites comparing model generations against golden datasets',
    ],
    technologies: ['LangChain', 'LlamaIndex', 'Qdrant Vector DB', 'Neo4j', 'Python', 'OpenAI API'],
  },
  {
    year: '2025',
    title: 'AGENTIC WORKFLOWS & MULTI-AGENT SWARMS',
    roleTitle: 'Lead Agent Engineer',
    focus: ['Agentic Workflows', 'Tool Calling', 'Human-in-the-Loop', 'Self-Healing Tests'],
    description:
      'Engineered autonomous agent systems using stateful graphs (LangGraph), multi-agent consensus loops (Planner-Worker-Critic), and MCP tool servers. Developed Yopaz Pulse, an autonomous QA engine that self-heals broken end-to-end tests.',
    achievements: [
      'Built multi-agent code generation swarms with Docker sandboxed execution and automated invariant testing',
      'Engineered visual self-healing selector pipeline in Yopaz Pulse, auto-recovering 82% of broken test runs',
      'Standardized external tool integrations with Model Context Protocol (MCP) and structured tool validation',
    ],
    technologies: ['LangGraph', 'Playwright', 'MCP Protocol', 'Gemini Vision', 'Docker SDK', 'Redis Streams'],
  },
  {
    year: '2026',
    title: 'AUTONOMOUS AI ENGINEERING',
    roleTitle: 'Senior AI & Systems Engineer',
    focus: ['System Reliability', 'Autonomous Swarms', 'Evaluation Harnesses', 'Full-Lifecycle AI'],
    description:
      'Designing and deploying end-to-end autonomous AI products where engineering rigor, model evaluation, safety guardrails, and production reliability unite. Turning experimental AI capabilities into dependable software systems.',
    achievements: [
      'Deploying mission-critical AI systems with 99.9% uptime, strict guardrail classifiers, and human review gates',
      'Authoring comprehensive evaluation frameworks measuring faithfulness, recall, and token cost economics',
      'Speaking & contributing to open-source agentic workflows and developer tooling ecosystems',
    ],
    technologies: ['Autonomous Agents', 'LangGraph Core', 'Distributed Tracing', 'Multi-Modal VLM', 'Next.js 15'],
  },
];
