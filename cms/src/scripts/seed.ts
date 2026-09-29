import { getPayload } from 'payload'
import config from '../payload.config'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Load env from cms/.env
dotenv.config({ path: path.resolve(dirname, '../../.env') })

const initialProjects = [
  {
    number: '01',
    title: 'HIVE KMS',
    subtitle: 'Agentic Knowledge System',
    category: 'AI Systems · Enterprise Knowledge',
    tags: [{ tag: 'RAG' }, { tag: 'AGENTS' }, { tag: 'KNOWLEDGE' }, { tag: 'HITL' }],
    headline: 'TURNING DOCUMENTS INTO INTELLIGENCE.',
    description:
      'An enterprise-grade agentic knowledge management platform engineered for universities and organizations. Combines dynamic multi-hop retrieval, hybrid dense/sparse vector search, Neo4j ontology graphs, and human-in-the-loop review gates.',
    image: '/projects/hive-kms.png',
    problem: 'DOCUMENTS ARE FULL OF SCATTERED INSTITUTIONAL CONTEXT. Traditional single-pass RAG pipelines fail catastrophically when queries span multi-hop relationships.',
    solution: 'AN AGENTIC RETRIEVAL GRAPH THAT REASONS BEFORE ANSWERING. Autonomous planner decomposes prompts, queries hybrid vector index & Neo4j graph concurrently.',
    metrics: [
      { value: '10K+', label: 'DOCUMENTS', sublabel: 'INDEXED' },
      { value: '95%', label: 'RETRIEVAL', sublabel: 'ACCURACY' },
      { value: '100%', label: 'NEO4J + QDRANT', sublabel: 'HYBRID COVERAGE' },
    ],
    techStack: [
      { category: 'AI & Orchestration', items: [{ item: 'LangGraph' }, { item: 'LlamaIndex' }, { item: 'OpenAI GPT-4o' }, { item: 'Cross-Encoder' }] },
      { category: 'Databases & Storage', items: [{ item: 'Qdrant Vector DB' }, { item: 'Neo4j Graph DB' }, { item: 'PostgreSQL' }, { item: 'MinIO S3' }] },
      { category: 'Backend & Services', items: [{ item: 'FastAPI' }, { item: 'Redis Caching' }, { item: 'Celery Workers' }, { item: 'OpenTelemetry' }] },
      { category: 'Frontend', items: [{ item: 'Next.js 14' }, { item: 'TypeScript' }, { item: 'Tailwind CSS' }, { item: 'Framer Motion' }] },
    ],
    architecture: {
      overview: 'Modular state machine coordinating query planning, hybrid vector + graph traversal, dynamic tool execution, and memory verification.',
      flowSteps: [
        { step: '01', title: 'Query Decomposition', desc: 'Autonomous Planner parses user intent and generates sub-queries.', latency: '45ms' },
        { step: '02', title: 'Hybrid Multi-Hop Retrieval', desc: 'Simultaneous semantic vector search in Qdrant and relationship traversal in Neo4j.', latency: '110ms' },
        { step: '03', title: 'Cross-Encoder Reranking', desc: 'Filters top 40 candidates down to top 5 context snippets.', latency: '85ms' },
        { step: '04', title: 'Synthesis & HITL Gate', desc: 'Grounding verification checks citations against source nodes; flags ambiguous claims.', latency: '220ms' },
      ],
    },
    githubUrl: 'https://github.com',
    liveUrl: 'https://hivekms.internal',
    order: 1,
  },
  {
    number: '02',
    title: 'YOPAZ PULSE',
    subtitle: 'AI Testing & Automation',
    category: 'Autonomous QA · Computer Vision · Reliability',
    tags: [{ tag: 'PLAYWRIGHT' }, { tag: 'AI AGENTS' }, { tag: 'QA' }, { tag: 'SELF-HEALING' }],
    headline: 'TEST AUTOMATION THAT HEALS ITSELF.',
    description:
      'Next-generation testing engine that observes DOM mutations and visual layouts, autonomously self-healing broken locator selectors in CI/CD pipelines without breaking builds.',
    image: '/projects/yopaz-pulse.png',
    problem: 'TEST SUITES BREAK ON EVERY DESIGN ITERATION. Continuous Delivery pipelines lose hundreds of developer hours due to flaky E2E tests broken by minor UI refactors.',
    solution: 'VISUAL-SEMANTIC OBSERVER RUNTIME WITH AUTONOMOUS HOT-PATCHING. Element locator agents capture DOM snapshots and visual renders to re-identify target controls.',
    metrics: [
      { value: '82%', label: 'FLAKY TESTS', sublabel: 'REPAIRED' },
      { value: '4x', label: 'AUTHORING', sublabel: 'SPEEDUP' },
      { value: '25h/wk', label: 'ENGINEERING', sublabel: 'SAVED' },
    ],
    techStack: [
      { category: 'Testing & Automation', items: [{ item: 'Playwright' }, { item: 'Puppeteer' }, { item: 'TypeScript' }, { item: 'Dockerized Chromium' }] },
      { category: 'AI & Vision', items: [{ item: 'Gemini 2.5 Flash Vision' }, { item: 'Semantic AST Parser' }, { item: 'Layout Embeddings' }] },
      { category: 'Queue & Runtime', items: [{ item: 'Redis BullMQ' }, { item: 'NestJS' }, { item: 'PostgreSQL' }, { item: 'Docker Engine' }] },
    ],
    architecture: {
      overview: 'Observer runtime capturing runtime DOM failures, triggering visual inference, and hot-patching selectors.',
      flowSteps: [
        { step: '01', title: 'Execution Interception', desc: 'Hooks into Playwright runner; intercepts ElementNotFound exception before timeout.', latency: '12ms' },
        { step: '02', title: 'Visual & DOM Delta Extraction', desc: 'Extracts bounding boxes, accessibility trees, and visual crop of target viewport.', latency: '60ms' },
        { step: '03', title: 'VLM Selector Inference', desc: 'Vision model matches visual context with historic baseline to resolve new optimal selector.', latency: '180ms' },
        { step: '04', title: 'Hot-Patch & Re-Execution', desc: 'Injects verified selector into test context in-flight and logs git diff suggestion.', latency: '25ms' },
      ],
    },
    githubUrl: 'https://github.com',
    order: 2,
  },
  {
    number: '03',
    title: 'PAWCREW',
    subtitle: 'Multi-Agent Engineering System',
    category: 'Agent Swarms · Code Generation · Sandboxing',
    tags: [{ tag: 'AGENTS' }, { tag: 'CODE' }, { tag: 'SECURITY' }, { tag: 'DOCKER' }],
    headline: 'ORCHESTRATING SPECIALIZED AGENT SWARMS.',
    description:
      'A resilient multi-agent software engineering framework where autonomous agents plan, write code, run isolated tests in Docker containers, and critique outputs until all validation invariants are met.',
    image: '/projects/pawcrew.png',
    problem: 'MONOLITHIC LLMS FAIL ON COMPLEX MULTI-STEP REASONING. Suffers from context window saturation, syntax mistakes, and lack of terminal execution feedback.',
    solution: 'PLANNER-WORKER-CRITIC TRIAD RUNNING IN EPHEMERAL SANDBOXES. Architect decomposes tasks into typed contracts, workers write code, critic validates in Docker.',
    metrics: [
      { value: '99.2%', label: 'FIRST-RUN LINT', sublabel: 'SUCCESS' },
      { value: '100%', label: 'SANDBOX', sublabel: 'ISOLATION' },
      { value: '<200ms', label: 'SUB-SECOND', sublabel: 'INTER-AGENT IPC' },
    ],
    techStack: [
      { category: 'Multi-Agent Core', items: [{ item: 'LangGraph' }, { item: 'Node.js' }, { item: 'TypeScript' }, { item: 'MCP Protocol' }] },
      { category: 'Execution Sandbox', items: [{ item: 'Docker SDK' }, { item: 'gVisor' }, { item: 'Linux namespaces' }, { item: 'cgroups' }] },
      { category: 'Messaging & Storage', items: [{ item: 'Redis Streams' }, { item: 'SQLite WAL' }, { item: 'MinIO' }] },
    ],
    architecture: {
      overview: 'Closed-loop multi-agent feedback graph with sandboxed compilation and unit test execution.',
      flowSteps: [
        { step: '01', title: 'Task Decomposition', desc: 'Planner generates execution graph with explicit pre-conditions and test criteria.', latency: '240ms' },
        { step: '02', title: 'Code Generation', desc: 'Worker agents implement modules adhering strictly to generated interface types.', latency: '450ms' },
        { step: '03', title: 'Sandboxed Compilation', desc: 'Ephemeral Docker container spins up to compile, lint, and run test suites.', latency: '320ms' },
        { step: '04', title: 'Critic Refinement Loop', desc: 'Critic evaluates runtime exits; loops back to worker if tests fail, or signs off on completion.', latency: '90ms' },
      ],
    },
    githubUrl: 'https://github.com',
    order: 3,
  },
  {
    number: '04',
    title: 'AI DOCUMENT INTELLIGENCE',
    subtitle: 'Multimodal Document Processing',
    category: 'Computer Vision · Document AI · Structured JSON',
    tags: [{ tag: 'OCR' }, { tag: 'VLM' }, { tag: 'STRUCTURED DATA' }, { tag: 'LAYOUTLM' }],
    headline: 'EXTRACTING STRUCTURE FROM CHAOTIC DOCUMENTS.',
    description:
      'High-throughput multimodal parsing pipeline converting messy enterprise PDFs, contracts, scanned stamps, and financial tables into validated typed schemas with spatial coordinates.',
    image: '/projects/ai-document-intelligence.png',
    problem: 'DOCUMENTS ARE FULL OF HIDDEN STRUCTURE. Scanned PDFs, complex layouts, tables, stamps, and multilingual content destroy tabular layouts in standard text extractors.',
    solution: 'A MULTIMODAL PIPELINE THAT UNDERSTANDS DOCUMENTS. Combines OCR, layout analysis, vision models, and schema validation to extract structured data with spatial coordinates.',
    metrics: [
      { value: '500+', label: 'pages/min', sublabel: 'THROUGHPUT' },
      { value: '99.4%', label: 'TABLE EXTRACTION', sublabel: 'FIDELITY' },
      { value: '100%', label: 'PDF/SCAN/DOCX', sublabel: 'FORMAT SUPPORT' },
    ],
    techStack: [
      { category: 'Vision & OCR', items: [{ item: 'PaddleOCR' }, { item: 'LayoutLMv3' }, { item: 'OpenCV' }, { item: 'PyMuPDF' }] },
      { category: 'Parsing & Validation', items: [{ item: 'Pydantic v2' }, { item: 'Python 3.11' }, { item: 'FastAPI' }] },
      { category: 'Data Pipeline', items: [{ item: 'Celery' }, { item: 'RabbitMQ' }, { item: 'PostgreSQL' }, { item: 'MinIO' }] },
    ],
    architecture: {
      overview: 'Asynchronous streaming document pipeline with visual page segmentation and schema validation.',
      flowSteps: [
        { step: '01', title: 'Document Rasterization', desc: 'PDF pages converted to 300DPI tensors with skew correction.', latency: '30ms/page' },
        { step: '02', title: 'Layout & Boundary Analysis', desc: 'Vision model detects tables, paragraphs, headers, and signature bounding boxes.', latency: '80ms/page' },
        { step: '03', title: 'Table Structure Assembly', desc: 'Reconstructs rowspan/colspan hierarchies into standardized JSON matrices.', latency: '40ms/table' },
        { step: '04', title: 'Schema Validation', desc: 'Pydantic models validate typed outputs with confidence scores and source page citations.', latency: '15ms' },
      ],
    },
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.internal',
    order: 4,
  },
]

async function seed() {
  console.log('🚀 Starting Payload CMS & Supabase Seeding...')

  if (!process.env.DATABASE_URI && !process.env.DATABASE_URL) {
    console.error('❌ Error: DATABASE_URI is not set in cms/.env!')
    console.error('👉 Please configure your Supabase connection string in cms/.env first.')
    process.exit(1)
  }

  const payload = await getPayload({ config })

  // Check if admin user exists
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (existingUsers.totalDocs === 0) {
    console.log('👤 Creating default Admin user (admin@ducanh.systems)...')
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@ducanh.systems',
        password: process.env.ADMIN_PASSWORD || 'DucAnh@2026!Secure',
      },
    })
    console.log('✅ Admin user created. (Password: DucAnh@2026!Secure or check cms/.env)')
  }

  // Check and seed projects
  const existingProjects = await payload.find({
    collection: 'projects',
    limit: 10,
  })

  if (existingProjects.totalDocs === 0) {
    console.log(`📦 Seeding ${initialProjects.length} initial projects to Supabase...`)
    for (const proj of initialProjects) {
      await payload.create({
        collection: 'projects',
        data: proj,
      })
      console.log(`   + Added project: ${proj.title}`)
    }
    console.log('✅ All projects seeded successfully!')
  } else {
    console.log(`ℹ️ Supabase already contains ${existingProjects.totalDocs} projects. Skipping project seed.`)
  }

  // Seed Global SiteConfig
  try {
    await payload.updateGlobal({
      slug: 'site-config',
      data: {
        name: 'DUC ANH',
        title: 'SOFTWARE ENGINEER · AI / AGENT SYSTEMS / WEB',
        statusText: 'OPEN FOR CONTRACT & ARCHITECTURAL CONSULTING',
        email: 'contact@ducanh.systems',
        github: 'https://github.com/ducanhizme',
        linkedin: 'https://linkedin.com/in/ducanhizme',
      },
    })
    console.log('✅ Global SiteConfig updated.')
  } catch (err) {
    console.warn('⚠️ Could not update SiteConfig global (optional):', err)
  }

  console.log('🎉 Seeding completed successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
