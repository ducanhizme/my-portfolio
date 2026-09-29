import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'hive-kms',
    number: '01',
    title: 'HIVE KMS',
    subtitle: 'Agentic Knowledge System',
    category: 'AI Systems · Enterprise Knowledge',
    tags: ['RAG', 'AGENTS', 'KNOWLEDGE', 'HITL'],
    headline: 'TURNING DOCUMENTS INTO INTELLIGENCE.',
    description:
      'An enterprise-grade agentic knowledge management platform engineered for universities and organizations. Combines dynamic multi-hop retrieval, hybrid dense/sparse vector search, Neo4j ontology graphs, and human-in-the-loop review gates.',
    image: '/projects/hive-kms.png',
    problem: 'DOCUMENTS ARE FULL OF SCATTERED INSTITUTIONAL CONTEXT.',
    problemDetails:
      'Traditional single-pass RAG pipelines fail catastrophically when queries span multi-hop relationships across thousands of institutional regulations, academic syllabi, and administrative memos. They suffer from naive chunk truncation, loss of structural table hierarchy, and severe hallucination when critical details are scattered.',
    solution: 'AN AGENTIC RETRIEVAL GRAPH THAT REASONS BEFORE ANSWERING.',
    approachDetails:
      'Engineered an autonomous agentic retrieval architecture where retrieval itself acts as a reasoning agent. Built with an autonomous planner that decomposes ambiguous prompts, queries a hybrid vector index (Dense Qdrant + Sparse BM25) and Neo4j graph relationships concurrently, reranks candidate passages with Cross-Encoders, and routes high-consequence responses through a Human-in-the-Loop verification gate.',
    metrics: [
      { value: '10K+', label: 'DOCUMENTS', sublabel: 'INDEXED' },
      { value: '95%', label: 'RETRIEVAL', sublabel: 'ACCURACY' },
      { value: '100%', label: 'NEO4J + QDRANT', sublabel: 'HYBRID COVERAGE' },
    ],
    techStack: [
      { category: 'AI & Orchestration', items: ['LangGraph', 'LlamaIndex', 'OpenAI GPT-4o / Claude 3.5', 'Cross-Encoder'] },
      { category: 'Databases & Storage', items: ['Qdrant Vector DB', 'Neo4j Graph DB', 'PostgreSQL', 'MinIO S3'] },
      { category: 'Backend & Services', items: ['FastAPI (Python)', 'Redis Caching', 'Celery Workers', 'OpenTelemetry'] },
      { category: 'Frontend', items: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
    ],
    architecture: {
      overview: 'Modular state machine coordinating query planning, hybrid vector + graph traversal, dynamic tool execution, and memory verification.',
      flowSteps: [
        {
          step: '01',
          title: 'Query Decomposition',
          desc: 'Autonomous Planner parses user intent, extracts temporal/subject constraints, and generates sub-queries.',
          latency: '45ms',
        },
        {
          step: '02',
          title: 'Hybrid Multi-Hop Retrieval',
          desc: 'Simultaneous semantic vector search in Qdrant and relationship traversal in Neo4j knowledge graph.',
          latency: '110ms',
        },
        {
          step: '03',
          title: 'Cross-Encoder Reranking',
          desc: 'Filters top 40 candidates down to top 5 context snippets, calculating relevance confidence scores.',
          latency: '85ms',
        },
        {
          step: '04',
          title: 'Synthesis & HITL Gate',
          desc: 'Grounding verification checks citations against source nodes; flags ambiguous claims for human review.',
          latency: '220ms',
        },
      ],
    },
    demoPrompt: 'RCC là gì và nhân viên cần tuân thủ những bước kiểm tra an toàn nào?',
    githubUrl: 'https://github.com',
    liveUrl: 'https://hivekms.internal',
  },
  {
    id: 'yopaz-pulse',
    number: '02',
    title: 'YOPAZ PULSE',
    subtitle: 'AI Testing & Automation',
    category: 'Autonomous QA · Computer Vision · Reliability',
    tags: ['PLAYWRIGHT', 'AI AGENTS', 'QA', 'SELF-HEALING'],
    headline: 'TEST AUTOMATION THAT HEALS ITSELF.',
    description:
      'Next-generation testing engine that observes DOM mutations and visual layouts, autonomously self-healing broken locator selectors in CI/CD pipelines without breaking builds.',
    image: '/projects/yopaz-pulse.png',
    problem: 'TEST SUITES BREAK ON EVERY DESIGN ITERATION.',
    problemDetails:
      'Continuous Delivery pipelines lose hundreds of developer hours every sprint due to flaky E2E tests broken by minor UI refactors, CSS class renaming, or DOM hierarchy alterations, despite zero underlying business logic regression.',
    solution: 'VISUAL-SEMANTIC OBSERVER RUNTIME WITH AUTONOMOUS HOT-PATCHING.',
    approachDetails:
      'Deployed visual-semantic locator agents with Playwright integration. When an element selector fails, the engine captures DOM snapshots and visual renders, queries a vision-language model to re-identify the target control based on intent, generates a self-healing patch, and issues pull request updates automatically.',
    metrics: [
      { value: '82%', label: 'FLAKY TESTS', sublabel: 'REPAIRED' },
      { value: '4x', label: 'AUTHORING', sublabel: 'SPEEDUP' },
      { value: '25h/wk', label: 'ENGINEERING', sublabel: 'SAVED' },
    ],
    techStack: [
      { category: 'Testing & Automation', items: ['Playwright', 'Puppeteer', 'TypeScript', 'Dockerized Chromium'] },
      { category: 'AI & Vision', items: ['Gemini 2.5 Flash Vision', 'Semantic AST Parser', 'Layout Embeddings'] },
      { category: 'Queue & Runtime', items: ['Redis BullMQ', 'NestJS', 'PostgreSQL', 'Docker Engine'] },
    ],
    architecture: {
      overview: 'Observer runtime capturing runtime DOM failures, triggering visual inference, and hot-patching selectors.',
      flowSteps: [
        {
          step: '01',
          title: 'Execution Interception',
          desc: 'Hooks into Playwright runner; intercepts ElementNotFound exception before timeout.',
          latency: '12ms',
        },
        {
          step: '02',
          title: 'Visual & DOM Delta Extraction',
          desc: 'Extracts bounding boxes, accessibility trees, and visual crop of target viewport.',
          latency: '60ms',
        },
        {
          step: '03',
          title: 'VLM Selector Inference',
          desc: 'Vision model matches visual context with historic baseline to resolve new optimal selector.',
          latency: '180ms',
        },
        {
          step: '04',
          title: 'Hot-Patch & Re-Execution',
          desc: 'Injects verified selector into test context in-flight and logs git diff suggestion.',
          latency: '25ms',
        },
      ],
    },
    demoPrompt: 'Verify checkout flow with dynamic obfuscated cart buttons',
    githubUrl: 'https://github.com',
  },
  {
    id: 'pawcrew',
    number: '03',
    title: 'PAWCREW',
    subtitle: 'Multi-Agent Engineering System',
    category: 'Agent Swarms · Code Generation · Sandboxing',
    tags: ['AGENTS', 'CODE', 'SECURITY', 'DOCKER'],
    headline: 'ORCHESTRATING SPECIALIZED AGENT SWARMS.',
    description:
      'A resilient multi-agent software engineering framework where autonomous agents plan, write code, run isolated tests in Docker containers, and critique outputs until all validation invariants are met.',
    image: '/projects/pawcrew.png',
    problem: 'MONOLITHIC LLMS FAIL ON COMPLEX MULTI-STEP REASONING.',
    problemDetails:
      'Monolithic single-agent LLMs fail on complex engineering tasks because of context window saturation, syntax mistakes, lack of terminal execution feedback, and inability to self-correct erroneous architectural assumptions.',
    solution: 'PLANNER-WORKER-CRITIC TRIAD RUNNING IN EPHEMERAL SANDBOXES.',
    approachDetails:
      'Architected a tripartite agent workflow: (1) Architect/Planner decomposes tasks into typed contracts, (2) Specialized Workers write code and unit tests, and (3) Critic agent executes code in isolated ephemeral Docker sandboxes, inspecting stack traces and iterating until all assertions pass.',
    metrics: [
      { value: '99.2%', label: 'FIRST-RUN LINT', sublabel: 'SUCCESS' },
      { value: '100%', label: 'SANDBOX', sublabel: 'ISOLATION' },
      { value: '<200ms', label: 'SUB-SECOND', sublabel: 'INTER-AGENT IPC' },
    ],
    techStack: [
      { category: 'Multi-Agent Core', items: ['LangGraph', 'Node.js', 'TypeScript', 'MCP Protocol'] },
      { category: 'Execution Sandbox', items: ['Docker SDK', 'gVisor', 'Linux namespaces', 'cgroups'] },
      { category: 'Messaging & Storage', items: ['Redis Streams', 'SQLite WAL', 'MinIO'] },
    ],
    architecture: {
      overview: 'Closed-loop multi-agent feedback graph with sandboxed compilation and unit test execution.',
      flowSteps: [
        {
          step: '01',
          title: 'Task Decomposition',
          desc: 'Planner generates execution graph with explicit pre-conditions and test criteria.',
          latency: '240ms',
        },
        {
          step: '02',
          title: 'Code Generation',
          desc: 'Worker agents implement modules adhering strictly to generated interface types.',
          latency: '450ms',
        },
        {
          step: '03',
          title: 'Sandboxed Compilation',
          desc: 'Ephemeral Docker container spins up to compile, lint, and run test suites.',
          latency: '320ms',
        },
        {
          step: '04',
          title: 'Critic Refinement Loop',
          desc: 'Critic evaluates runtime exits; loops back to worker if tests fail, or signs off on completion.',
          latency: '90ms',
        },
      ],
    },
    demoPrompt: 'Build an idempotent distributed rate limiter with sliding window Redis script',
    githubUrl: 'https://github.com',
  },
  {
    id: 'ai-document-intelligence',
    number: '04',
    title: 'AI DOCUMENT INTELLIGENCE',
    subtitle: 'Multimodal Document Processing',
    category: 'Computer Vision · Document AI · Structured JSON',
    tags: ['OCR', 'VLM', 'STRUCTURED DATA', 'LAYOUTLM'],
    headline: 'EXTRACTING STRUCTURE FROM CHAOTIC DOCUMENTS.',
    description:
      'High-throughput multimodal parsing pipeline converting messy enterprise PDFs, contracts, scanned stamps, and financial tables into validated typed schemas with spatial coordinates.',
    image: '/projects/ai-document-intelligence.png',
    problem: 'DOCUMENTS ARE FULL OF HIDDEN STRUCTURE.',
    problemDetails:
      'Real-world documents are messy. Scanned PDFs, complex layouts, tables, stamps, and multilingual content make it hard to extract reliable, structured data at scale. Standard text extractors destroy tabular layouts and lose vital spatial context such as signatures and nested financial line items.',
    solution: 'A MULTIMODAL PIPELINE THAT UNDERSTANDS DOCUMENTS.',
    approachDetails:
      'We combine OCR, layout analysis, vision models, and schema validation to extract structured data with spatial coordinates and high confidence scores. Parsed complex tables directly into 2D relational structures and enforced strict Pydantic JSON schemas.',
    metrics: [
      { value: '500+', label: 'pages/min', sublabel: 'THROUGHPUT' },
      { value: '99.4%', label: 'TABLE EXTRACTION', sublabel: 'FIDELITY' },
      { value: '100%', label: 'PDF/SCAN/DOCX', sublabel: 'FORMAT SUPPORT' },
    ],
    techStack: [
      { category: 'Vision & OCR', items: ['PaddleOCR', 'LayoutLMv3', 'OpenCV', 'PyMuPDF'] },
      { category: 'Parsing & Validation', items: ['Pydantic v2', 'Python 3.11', 'FastAPI'] },
      { category: 'Data Pipeline', items: ['Celery', 'RabbitMQ', 'PostgreSQL', 'MinIO'] },
    ],
    architecture: {
      overview: 'Asynchronous streaming document pipeline with visual page segmentation and schema validation.',
      flowSteps: [
        {
          step: '01',
          title: 'Document Rasterization',
          desc: 'PDF pages converted to 300DPI tensors with skew correction and visual noise removal.',
          latency: '30ms/page',
        },
        {
          step: '02',
          title: 'Layout & Boundary Analysis',
          desc: 'Vision model detects tables, paragraphs, headers, and signature bounding boxes.',
          latency: '80ms/page',
        },
        {
          step: '03',
          title: 'Table Structure Assembly',
          desc: 'Reconstructs rowspan/colspan hierarchies into standardized JSON matrices.',
          latency: '40ms/table',
        },
        {
          step: '04',
          title: 'Schema Validation',
          desc: 'Pydantic models validate typed outputs with confidence scores and source page citations.',
          latency: '15ms',
        },
      ],
    },
    demoPrompt: 'Extract balance sheet, nested liabilities, and auditor signatures from annual report',
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.internal',
  },
];
