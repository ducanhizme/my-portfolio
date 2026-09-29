import React, { useState } from 'react';
import {
  User,
  Bot,
  Database,
  Wrench,
  FileCheck,
  Search,
  FileText,
  GitBranch,
  Cpu,
  Layers,
  Sparkles,
  Play,
  RotateCcw,
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export const InteractiveArchitecture: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>('agent');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState<number>(-1);

  const nodeDetails: Record<
    string,
    {
      title: string;
      category: string;
      latency: string;
      description: string;
      codeSnippet: string;
      invariants: string[];
    }
  > = {
    user: {
      title: 'User Interface & Input Query',
      category: 'Inbound Ingress',
      latency: '<10ms',
      description: 'Accepts enterprise natural language prompts, voice transcripts, or API webhooks. Sanitizes input string to prevent script injection before dispatching to orchestrator.',
      codeSnippet: `interface UserIngressPayload {
  session_id: string;
  user_id: string;
  query: string;
  attachments?: DocumentMetadata[];
  security_context: UserRolePermissions;
}`,
      invariants: ['Input length <= 8192 chars', 'UTF-8 normalized', 'Role-based access token validated'],
    },
    agent: {
      title: 'AI Agent Orchestrator (LangGraph Core)',
      category: 'State Machine & Coordination',
      latency: '35ms',
      description: 'Coordinates stateful execution graphs. Manages recursion limits, checkpoint persistence in Redis, human-in-the-loop review interrupts, and dynamic fallback routing.',
      codeSnippet: `const agentState = new StateGraph<AgentStateType>({
  channels: {
    messages: { value: (x, y) => x.concat(y), default: () => [] },
    plan: { value: (x, y) => y ?? x, default: () => null },
    retrieved_docs: { value: (x, y) => x.concat(y), default: () => [] },
  }
})
.addNode("planner", planQueryNode)
.addNode("retriever", multiHopRetrieverNode)
.addNode("executor", toolExecutorNode)
.addConditionalEdges("planner", routeNextAction);`,
      invariants: ['Max recursion depth: 8', 'Deterministic state snapshotting', 'Zero loss of session history'],
    },
    knowledge: {
      title: 'Knowledge Subsystem (Vector & Graph)',
      category: 'Polyglot Retrieval',
      latency: '95ms',
      description: 'Unites high-dimensional dense embeddings in Qdrant, BM25 inverted lexical indices, and deep relational ontology nodes in Neo4j.',
      codeSnippet: `// Hybrid retrieval query
const [denseResults, sparseResults, graphNeighbors] = await Promise.all([
  qdrantClient.search("enterprise_docs", { vector: queryEmbedding, limit: 25 }),
  elasticClient.search({ index: "docs_bm25", query: { match: { content: query } } }),
  neo4jSession.run(
    \`MATCH (e:Entity {name: $term})-[:REGULATES*1..2]->(target)
     RETURN target.title, target.guidelines LIMIT 10\`,
    { term: extractedEntity }
  )
]);`,
      invariants: ['Cosine distance threshold >= 0.78', 'Knowledge graph freshness < 60s', 'Air-gapped enterprise compliance'],
    },
    tools: {
      title: 'Tool & External API Engine (MCP Protocol)',
      category: 'Autonomous Tool Use',
      latency: '110ms',
      description: 'Executes verified external tool calls through standard Model Context Protocol (MCP) servers: Google Sheets, Enterprise ERP, Web Search, and Custom Calculators.',
      codeSnippet: `export const sheetsQueryTool = tool({
  name: "query_enterprise_ledger",
  description: "Reads financial records and ledger rows by fiscal quarter",
  parameters: z.object({
    quarter: z.enum(["Q1", "Q2", "Q3", "Q4"]),
    year: z.number().int().min(2020),
    department: z.string().optional()
  }),
  execute: async ({ quarter, year, department }) => {
    return await secureLedgerProxy.fetchRows(quarter, year, department);
  }
});`,
      invariants: ['Parameters strictly validated with Zod/Pydantic schemas', 'Read-only timeouts at 5000ms', 'Full audit logging'],
    },
    planner: {
      title: 'Planner Node (Task Decomposition)',
      category: 'Cognitive Planning',
      latency: '45ms',
      description: 'Decomposes complex requests into directed sub-queries. Identifies temporal constraints, dependencies, and specifies whether vector search or graph traversal is required.',
      codeSnippet: `prompt: "You are an Expert Query Decomposition Planner.
Analyze user intent and break it down into an executable step plan:
1. Sub-queries to retrieve
2. Entity relations to query in Neo4j
3. External calculators required."`,
      invariants: ['Outputs typed JSON plan structure', 'Zero hallucinated tools', 'Explicit stop condition'],
    },
    retriever: {
      title: 'Retriever Node (Multi-Hop RAG)',
      category: 'Context Retrieval',
      latency: '80ms',
      description: 'Executes hybrid retrieval across indices, filters candidate chunks through a Cross-Encoder reranker, and verifies token budgets before context injection.',
      codeSnippet: `// Reranker filter
const reranked = await bgeReranker.predict({
  query: subQuery,
  passages: candidatePassages.map(p => p.text),
  topK: 5
});`,
      invariants: ['Top 5 passages filtered from 40 candidates', 'Context window <= 4000 tokens', 'Source references preserved'],
    },
    executor: {
      title: 'Executor Node (Action Execution)',
      category: 'Runtime Dispatch',
      latency: '60ms',
      description: 'Invokes designated tool functions with sanitized arguments and parses raw API responses into structured markdown tables and summaries.',
      codeSnippet: `async function executeToolCalls(toolCalls: ToolCall[]) {
  return Promise.all(toolCalls.map(async call => {
    const handler = toolRegistry.get(call.name);
    return await handler.execute(call.args);
  }));
}`,
      invariants: ['Idempotency keys enforced', 'Sandboxed execution environment', 'Catch and return structured errors'],
    },
    memory: {
      title: 'Memory Node (Context & Session State)',
      category: 'Working Memory',
      latency: '15ms',
      description: 'Stores semantic conversational history, intermediate reasoning scratchpads, and extracted user preferences using Redis sliding windows.',
      codeSnippet: `class SlidingWindowMemory {
  async getRelevantHistory(sessionId: string, currentTopic: string) {
    const rawHistory = await redis.lrange(\`session:\${sessionId}\`, -10, -1);
    return pruneIrrelevantTurns(rawHistory, currentTopic);
  }
}`,
      invariants: ['Sliding window of last 10 turns', 'Sensitive PII redacted before persistence', 'TTL expiration: 24h'],
    },
    answer: {
      title: 'Answer Synthesis & Verification Gate',
      category: 'Final Output & HITL',
      latency: '180ms',
      description: 'Synthesizes final response with exact source document citations. Cross-references generated claims against retrieved context to ensure 100% faithfulness.',
      codeSnippet: `const answer = await synthesizeGroundedAnswer({
  context: topPassages,
  plan: executedPlan,
  systemGuardrails: enterpriseSafetyPolicy
});
if (answer.uncertaintyScore > 0.15) {
  return routeToHumanReviewQueue(answer);
}`,
      invariants: ['Zero ungrounded hallucinations', 'Inline source citations required', 'Automatic HITL escalation for low-confidence scores'],
    },
  };

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    soundManager.playBoot();

    const sequence = ['user', 'agent', 'knowledge', 'planner', 'retriever', 'tools', 'executor', 'memory', 'answer'];
    let step = 0;

    const interval = setInterval(() => {
      if (step >= sequence.length) {
        clearInterval(interval);
        setIsSimulating(false);
        setSimulationStep(-1);
        return;
      }
      setActiveNode(sequence[step]);
      setSimulationStep(step);
      soundManager.playInspect();
      step++;
    }, 700);
  };

  const selectedData = nodeDetails[activeNode] || nodeDetails.agent;

  return (
    <section id="architecture" className="relative py-28 border-b border-white/[0.06] bg-[#050508]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>05 // SYSTEM ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-white tracking-tight">
              HOW THE AGENT THINKS.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className={`flex items-center gap-2 px-5 py-2.5 rounded font-mono text-xs tracking-wider transition-all duration-200 cursor-pointer ${
                isSimulating
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 animate-pulse'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'
              }`}
            >
              {isSimulating ? (
                <>
                  <Sparkles size={14} className="animate-spin" />
                  <span>SIMULATING AGENT LOOP...</span>
                </>
              ) : (
                <>
                  <Play size={14} />
                  <span>RUN LIVE SIMULATION</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Grid: Interactive Diagram (Left 7 cols) & Deep Inspector (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Architecture Visual Board */}
          <div className="lg:col-span-7 bg-[#080a11] border border-cyan-500/20 p-6 md:p-8 rounded-sm relative overflow-hidden">
            <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />

            {/* Top Node: USER */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveNode('user');
                }}
                className={`relative px-6 py-3 rounded border flex items-center gap-3 font-mono text-xs tracking-wider transition-all duration-200 cursor-pointer ${
                  activeNode === 'user'
                    ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                    : 'border-white/15 bg-black/60 text-slate-300 hover:border-cyan-500/50'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <User size={14} />
                </div>
                <div>
                  <div className="font-bold text-white">USER</div>
                  <div className="text-[10px] text-slate-400">Natural Language Query</div>
                </div>
              </button>
            </div>

            {/* Down Connector */}
            <div className="flex justify-center mb-4">
              <div className="w-[1.5px] h-6 bg-gradient-to-b from-cyan-400 to-cyan-500/60" />
            </div>

            {/* Middle Triad: KNOWLEDGE <-> AI AGENT <-> TOOLS */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-6">
              {/* Left Subsystem: KNOWLEDGE */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveNode('knowledge');
                }}
                className={`md:col-span-3 p-3.5 rounded border text-left font-mono transition-all duration-200 cursor-pointer ${
                  activeNode === 'knowledge'
                    ? 'border-cyan-400 bg-cyan-950/30 text-white shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                    : 'border-white/10 bg-black/50 text-slate-400 hover:border-white/30'
                }`}
              >
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold mb-2">
                  <Database size={13} />
                  <span>KNOWLEDGE</span>
                </div>
                <div className="space-y-1 text-[11px] text-slate-400">
                  <div>· Documents (PDF)</div>
                  <div>· Hybrid RAG Index</div>
                  <div>· Knowledge Graph</div>
                  <div>· Vector DB (Qdrant)</div>
                </div>
              </button>

              {/* Center Core: AI AGENT ORCHESTRATOR */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveNode('agent');
                }}
                className={`md:col-span-6 p-4 rounded-sm border text-center font-mono transition-all duration-200 cursor-pointer ${
                  activeNode === 'agent'
                    ? 'border-cyan-400 bg-cyan-950/50 text-white shadow-[0_0_30px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400'
                    : 'border-cyan-500/40 bg-black/70 text-slate-200 hover:border-cyan-400'
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400 mx-auto flex items-center justify-center text-cyan-300 mb-2">
                  <Bot size={18} />
                </div>
                <div className="font-bold text-sm md:text-base text-white tracking-wide">
                  AI AGENT
                </div>
                <div className="text-[11px] text-cyan-400 font-mono">
                  State Machine Orchestrator
                </div>
              </button>

              {/* Right Subsystem: TOOLS */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveNode('tools');
                }}
                className={`md:col-span-3 p-3.5 rounded border text-left font-mono transition-all duration-200 cursor-pointer ${
                  activeNode === 'tools'
                    ? 'border-cyan-400 bg-cyan-950/30 text-white shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                    : 'border-white/10 bg-black/50 text-slate-400 hover:border-white/30'
                }`}
              >
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold mb-2">
                  <Wrench size={13} />
                  <span>TOOLS</span>
                </div>
                <div className="space-y-1 text-[11px] text-slate-400">
                  <div>· Web Search</div>
                  <div>· Google Sheets API</div>
                  <div>· REST Web APIs</div>
                  <div>· Custom Tools (MCP)</div>
                </div>
              </button>
            </div>

            {/* Down Connector */}
            <div className="flex justify-center mb-4">
              <div className="w-[1.5px] h-6 bg-gradient-to-b from-cyan-400 to-cyan-500/60" />
            </div>

            {/* Agent Internal Reasoning Loop: PLANNER, RETRIEVER, EXECUTOR, MEMORY */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { id: 'planner', label: 'PLANNER', sub: 'Task Planning', icon: GitBranch },
                { id: 'retriever', label: 'RETRIEVER', sub: 'Multi-hop RAG', icon: Search },
                { id: 'executor', label: 'EXECUTOR', sub: 'Tool Use', icon: Cpu },
                { id: 'memory', label: 'MEMORY', sub: 'Conversation', icon: Layers },
              ].map((item) => {
                const IconComponent = item.icon;
                const isItemActive = activeNode === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundManager.playClick();
                      setActiveNode(item.id);
                    }}
                    className={`p-3 rounded border text-center font-mono transition-all duration-200 cursor-pointer ${
                      isItemActive
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                        : 'border-white/10 bg-black/40 text-slate-400 hover:border-white/30 hover:text-slate-200'
                    }`}
                  >
                    <IconComponent size={14} className="mx-auto text-cyan-400 mb-1.5" />
                    <div className="font-bold text-xs text-white">{item.label}</div>
                    <div className="text-[10px] text-slate-400">{item.sub}</div>
                  </button>
                );
              })}
            </div>

            {/* Down Connector */}
            <div className="flex justify-center mb-4">
              <div className="w-[1.5px] h-6 bg-gradient-to-b from-cyan-400 to-emerald-400" />
            </div>

            {/* Bottom Output: ANSWER */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveNode('answer');
                }}
                className={`relative px-8 py-3 rounded border flex items-center gap-3 font-mono text-xs tracking-wider transition-all duration-200 cursor-pointer ${
                  activeNode === 'answer'
                    ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.35)]'
                    : 'border-emerald-500/40 bg-black/60 text-slate-300 hover:border-emerald-400'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <FileCheck size={15} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>ANSWER</span>
                    <span className="text-[10px] text-emerald-400">100% GROUNDED</span>
                  </div>
                  <div className="text-[10px] text-slate-400">Citations & HITL Validated</div>
                </div>
              </button>
            </div>
          </div>

          {/* Node Detail Inspector Panel */}
          <div className="lg:col-span-5 bg-[#090b11] border border-white/10 p-6 rounded-sm space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                  {selectedData.category}
                </span>
                <h3 className="text-lg md:text-xl font-bold font-display text-white">
                  {selectedData.title}
                </h3>
              </div>
              <div className="text-right font-mono">
                <span className="text-xs text-slate-400">LATENCY</span>
                <div className="text-sm font-bold text-cyan-400">{selectedData.latency}</div>
              </div>
            </div>

            <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-light">
              {selectedData.description}
            </p>

            {/* Code / Implementation Excerpt */}
            <div>
              <div className="text-xs font-mono text-slate-400 mb-2 flex items-center gap-2">
                <FileText size={12} className="text-cyan-400" />
                <span>IMPLEMENTATION SCHEMA</span>
              </div>
              <pre className="p-3.5 bg-black/80 border border-white/[0.08] rounded text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
                <code>{selectedData.codeSnippet}</code>
              </pre>
            </div>

            {/* Architectural Invariants */}
            <div>
              <div className="text-xs font-mono text-slate-400 mb-2">SYSTEM INVARIANTS:</div>
              <ul className="space-y-1.5 font-mono text-xs text-slate-300">
                {selectedData.invariants.map((inv, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>{inv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
