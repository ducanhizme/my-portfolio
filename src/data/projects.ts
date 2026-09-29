import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'hive-kms',
    number: '01',
    title: 'HIVE KMS',
    subtitle: 'Enterprise Knowledge Management',
    category: 'Applied AI · Enterprise Knowledge',
    tags: ['RAG', 'AGENTS', 'SEARCH', 'ENTERPRISE'],
    headline: 'TURNING THOUSANDS OF COMPLEX DOCUMENTS INTO ACCURATE ANSWERS.',
    description:
      'An enterprise knowledge management platform built for universities and organizations. Combines hybrid dense/sparse vector search, knowledge graph traversal (Neo4j), and human verification gates to help users find reliable policy and academic information.',
    image: '/projects/hive-kms.png',
    problem: 'CRITICAL INSTITUTIONAL KNOWLEDGE IS SCATTERED AND HARD TO FIND.',
    problemDetails:
      'Universities and enterprises struggle with thousands of fragmented regulations, academic syllabi, and administrative memos. Standard search often misses crucial context, while naive AI chatbots frequently hallucinate or produce unverified answers without citing real policies.',
    solution: 'HYBRID RETRIEVAL COMBINING VECTOR SEARCH AND KNOWLEDGE GRAPHS.',
    approachDetails:
      'Engineered a multi-stage retrieval architecture: queries are decomposed into intent-based sub-queries, searched concurrently across vector indexes (Qdrant) and graph relationships (Neo4j), reranked with Cross-Encoders, and verified against source citations before answering.',
    metrics: [
      { value: '10K+', label: 'DOCUMENTS', sublabel: 'INDEXED' },
      { value: '95%', label: 'ACCURACY', sublabel: 'VERIFIED' },
      { value: '<180ms', label: 'LATENCY', sublabel: 'AVERAGE' },
    ],
    techStack: [
      { category: 'AI & Retrieval', items: ['LangGraph', 'LlamaIndex', 'GPT-4o / Claude 3.5', 'Cross-Encoder'] },
      { category: 'Databases & Storage', items: ['Qdrant Vector DB', 'Neo4j Graph DB', 'PostgreSQL', 'MinIO S3'] },
      { category: 'Backend & Services', items: ['FastAPI (Python)', 'Redis', 'Celery Workers', 'OpenTelemetry'] },
      { category: 'Frontend', items: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
    ],
    architecture: {
      overview: 'Structured retrieval workflow: query parsing → hybrid vector & graph retrieval → reranking → citation verification.',
      flowSteps: [
        {
          step: '01',
          title: 'Query Understanding',
          desc: 'Parses user question, extracts date/policy constraints, and breaks complex queries into targeted search steps.',
          latency: '45ms',
        },
        {
          step: '02',
          title: 'Hybrid Multi-Source Search',
          desc: 'Runs semantic vector search in Qdrant while traversing related organizational nodes in Neo4j.',
          latency: '110ms',
        },
        {
          step: '03',
          title: 'Re-ranking & Filtering',
          desc: 'Uses a Cross-Encoder to score candidate paragraphs and select the top 5 most relevant context passages.',
          latency: '85ms',
        },
        {
          step: '04',
          title: 'Answer Synthesis & Citations',
          desc: 'Synthesizes clear answer with precise document numbers and page citations so users can verify every claim.',
          latency: '220ms',
        },
      ],
    },
    demoPrompt: 'What safety procedures and approvals are required for laboratory chemical disposal?',
    githubUrl: 'https://github.com',
    liveUrl: 'https://hivekms.internal',
  },
  {
    id: 'yopaz-pulse',
    number: '02',
    title: 'YOPAZ PULSE',
    subtitle: 'Self-Healing Test Automation',
    category: 'QA Engineering · Computer Vision · CI/CD',
    tags: ['PLAYWRIGHT', 'AI AGENTS', 'QA', 'AUTOMATION'],
    headline: 'TEST AUTOMATION THAT DETECTS AND REPAIRS BROKEN SELECTORS.',
    description:
      'An intelligent test automation tool that detects when UI element selectors break after frontend updates, automatically identifying the right control through visual context without crashing CI/CD builds.',
    image: '/projects/yopaz-pulse.png',
    problem: 'E2E TESTS BREAK FREQUENTLY WHEN FRONTEND TEAMS SHIP UI UPDATES.',
    problemDetails:
      'In fast-moving development teams, minor CSS refactors, renamed classes, or adjusted DOM layouts frequently break end-to-end tests even when business logic works perfectly. Developers spend hours each week diagnosing and fixing trivial test selectors.',
    solution: 'VISUAL CONTEXT AWARENESS WITH AUTOMATED LOCATOR RECOVERY.',
    approachDetails:
      'Integrated with Playwright, the tool intercepts locator timeout errors, takes targeted viewport snapshots, uses visual AI to locate the intended element based on accessibility labels and visual cues, applies an in-flight hot-fix, and suggests a code patch to developers.',
    metrics: [
      { value: '82%', label: 'FLAKY TESTS', sublabel: 'AUTO-REPAIRED' },
      { value: '4x', label: 'SPEEDUP', sublabel: 'IN DEBUGGING' },
      { value: '25h/wk', label: 'SAVED', sublabel: 'PER TEAM' },
    ],
    techStack: [
      { category: 'Testing & Automation', items: ['Playwright', 'Puppeteer', 'TypeScript', 'Dockerized Chromium'] },
      { category: 'AI & Vision', items: ['Gemini 2.5 Flash Vision', 'Semantic AST Parser', 'DOM Layout Embeddings'] },
      { category: 'Queue & Runtime', items: ['Redis BullMQ', 'NestJS', 'PostgreSQL', 'Docker Engine'] },
    ],
    architecture: {
      overview: 'Runtime observer catching test exceptions, inferring intended elements via vision, and patching locators in-flight.',
      flowSteps: [
        {
          step: '01',
          title: 'Exception Interception',
          desc: 'Catches ElementNotFound exceptions in the Playwright runner before the test case crashes with a timeout.',
          latency: '12ms',
        },
        {
          step: '02',
          title: 'Snapshot & Accessibility Analysis',
          desc: 'Captures screen region and extracts the surrounding accessibility tree to understand element intent.',
          latency: '60ms',
        },
        {
          step: '03',
          title: 'Visual Element Resolution',
          desc: 'Uses vision reasoning to re-match the intended target element against the updated interface layout.',
          latency: '180ms',
        },
        {
          step: '04',
          title: 'In-Flight Hot-Patching',
          desc: 'Injects the verified selector into the running test context and generates an automated git patch suggestion.',
          latency: '25ms',
        },
      ],
    },
    demoPrompt: 'Verify multi-step checkout flow when button styles and data-test attributes change dynamically',
    githubUrl: 'https://github.com',
  },
  {
    id: 'pawcrew',
    number: '03',
    title: 'PAWCREW',
    subtitle: 'Multi-Agent Coding Framework',
    category: 'Multi-Agent Systems · Code Automation · Sandboxing',
    tags: ['AGENTS', 'CODE', 'TESTING', 'DOCKER'],
    headline: 'SPECIALIZED AGENTS WORKING TOGETHER TO WRITE AND VERIFY CODE.',
    description:
      'A multi-agent development framework where specialized AI agents plan requirements, write modular code, and run unit tests inside isolated Docker containers until all test suites pass.',
    image: '/projects/pawcrew.png',
    problem: 'SINGLE AI PROMPTS STRUGGLE WITH MULTI-STEP SOFTWARE ENGINEERING.',
    problemDetails:
      'Asking a single LLM to generate an entire complex feature often leads to subtle syntax mistakes, missing edge-case tests, or code that fails to compile because the model has no execution feedback loop.',
    solution: 'ROLE SPECIALIZATION: PLANNER, CODER, AND CRITIC WITH DOCKER EXECUTION.',
    approachDetails:
      'Deconstructs software tasks into three coordinated roles: a Planner that specifies requirements and interface types, a Coder that writes implementation code and unit tests, and a Critic that compiles and executes the test suite in an isolated Docker container, providing feedback until all tests pass.',
    metrics: [
      { value: '99.2%', label: 'PASS RATE', sublabel: 'ON TEST SUITES' },
      { value: '100%', label: 'SANDBOX', sublabel: 'CONTAINER ISOLATION' },
      { value: '<200ms', label: 'IPC SPEED', sublabel: 'INTER-AGENT MESSAGING' },
    ],
    techStack: [
      { category: 'Agent Orchestration', items: ['LangGraph', 'Node.js', 'TypeScript', 'MCP Protocol'] },
      { category: 'Execution Sandbox', items: ['Docker SDK', 'gVisor', 'Linux namespaces', 'cgroups'] },
      { category: 'Storage & Queue', items: ['Redis Streams', 'SQLite WAL', 'MinIO'] },
    ],
    architecture: {
      overview: 'Closed-loop multi-agent workflow: requirement planning → modular coding → sandboxed test execution → refinement.',
      flowSteps: [
        {
          step: '01',
          title: 'Requirement Planning',
          desc: 'Planner analyzes feature goals, creates modular tasks, and defines interface contracts with test criteria.',
          latency: '240ms',
        },
        {
          step: '02',
          title: 'Modular Implementation',
          desc: 'Coder writes implementation files and unit tests adhering to agreed interface definitions.',
          latency: '450ms',
        },
        {
          step: '03',
          title: 'Sandboxed Compilation & Testing',
          desc: 'Spins up an isolated Docker container to lint, compile, and run the test suite in a clean environment.',
          latency: '320ms',
        },
        {
          step: '04',
          title: 'Critic Review Loop',
          desc: 'Reviews compiler output and test exit codes; requests fixes if any tests fail, or approves when green.',
          latency: '90ms',
        },
      ],
    },
    demoPrompt: 'Build an idempotent distributed rate limiter with sliding window Redis script and unit tests',
    githubUrl: 'https://github.com',
  },
  {
    id: 'ai-document-intelligence',
    number: '04',
    title: 'AI DOCUMENT INTELLIGENCE',
    subtitle: 'Multimodal Document Processing',
    category: 'Computer Vision · Document Processing · Structured Data',
    tags: ['OCR', 'VISION', 'STRUCTURED DATA', 'FASTAPI'],
    headline: 'CONVERTING SCANNED DOCUMENTS AND COMPLEX TABLES INTO STRUCTURED DATA.',
    description:
      'A high-throughput document processing pipeline that converts messy scanned PDFs, invoices, contracts, and financial tables into validated JSON schemas with spatial coordinates.',
    image: '/projects/ai-document-intelligence.png',
    problem: 'SCANNED DOCUMENTS AND FINANCIAL TABLES ARE HARD TO EXTRACT RELIABLY.',
    problemDetails:
      'Real-world business documents are messy: skewed scans, poor contrast, multi-page tables, and overlapping stamps make automated data entry difficult. Standard text extractors often scramble column data and lose critical spatial relationships.',
    solution: 'LAYOUT ANALYSIS COMBINED WITH VISION MODELS AND SCHEMA VALIDATION.',
    approachDetails:
      'Engineered an end-to-end pipeline: cleans and de-skews document pages, uses vision models to segment tables and paragraph blocks, accurately reconstructs merged rows and columns into 2D tables, and validates typed fields with Pydantic schemas.',
    metrics: [
      { value: '500+', label: 'pages/min', sublabel: 'THROUGHPUT' },
      { value: '99.4%', label: 'ACCURACY', sublabel: 'TABLE EXTRACTION' },
      { value: '100%', label: 'FORMATS', sublabel: 'PDF, SCAN & DOCX' },
    ],
    techStack: [
      { category: 'Vision & OCR', items: ['PaddleOCR', 'LayoutLMv3', 'OpenCV', 'PyMuPDF'] },
      { category: 'Validation & API', items: ['Pydantic v2', 'Python 3.11', 'FastAPI'] },
      { category: 'Data Pipeline', items: ['Celery', 'RabbitMQ', 'PostgreSQL', 'MinIO S3'] },
    ],
    architecture: {
      overview: 'Asynchronous streaming document pipeline: image enhancement → layout segmentation → table extraction → validation.',
      flowSteps: [
        {
          step: '01',
          title: 'Page Preprocessing',
          desc: 'Converts scanned PDF pages to high-resolution tensors, straightens skew, and removes optical noise.',
          latency: '30ms/page',
        },
        {
          step: '02',
          title: 'Layout & Block Detection',
          desc: 'Identifies spatial bounding boxes for headers, body paragraphs, tables, stamps, and signatures.',
          latency: '80ms/page',
        },
        {
          step: '03',
          title: 'Table Structure Assembly',
          desc: 'Reconstructs rowspan and colspan relationships, transforming visual tables into structured JSON matrices.',
          latency: '40ms/table',
        },
        {
          step: '04',
          title: 'Data Type Validation',
          desc: 'Validates financial numbers and dates with Pydantic schemas, attaching confidence scores and page numbers.',
          latency: '15ms',
        },
      ],
    },
    demoPrompt: 'Extract balance sheet, nested liabilities, and auditor signatures from scanned financial report',
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.internal',
  },
];
