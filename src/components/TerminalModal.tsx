import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { projects } from '../data/projects';
import { labExperiments } from '../data/lab';
import { soundManager } from '../utils/audio';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProject?: (projectId: string) => void;
  onOpenLab?: (labId: string) => void;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  onOpenProject,
  onOpenLab,
}) => {
  const [history, setHistory] = useState<Array<{ cmd?: string; output: React.ReactNode }>>([
    {
      output: (
        <div className="space-y-3">
          <div className="text-cyan-400 font-bold">
            DUC ANH TERMINAL INTERFACE // v1.0.0 (x86_64-ai-studio-linux)
          </div>
          <div className="text-slate-400 text-xs">
            Type <span className="text-cyan-300 font-bold">help</span> to list available commands. Press <span className="text-cyan-300 font-bold">Tab</span> for auto-complete.
          </div>
          <div className="flex items-start gap-6 pt-2 font-mono text-xs">
            <pre className="text-cyan-400 leading-tight select-none">
{`   /\\_/\\
  ( o.o )
   > ^ <
  MEOW
  WELCOME TO
  MY PORTFOLIO
  ^_^`}
            </pre>
            <div className="space-y-1 text-slate-300">
              <div><span className="text-cyan-400 font-semibold">User:</span> guest@portfolio</div>
              <div><span className="text-cyan-400 font-semibold">Host:</span> ducanh.systems</div>
              <div><span className="text-cyan-400 font-semibold">Status:</span> 🟢 Available for AI Systems Engineering</div>
              <div><span className="text-cyan-400 font-semibold">Focus:</span> Multi-Agent Swarms · RAG · Modern Web</div>
            </div>
          </div>
        </div>
      ),
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const availableCommands = [
    'help',
    'about',
    'projects',
    'open',
    'stack',
    'lab',
    'run',
    'experience',
    'contact',
    'matrix',
    'whoami',
    'clear',
    'exit',
  ];

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    soundManager.playKeypress();
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    let resultOutput: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        resultOutput = (
          <div className="space-y-2 text-xs">
            <div className="text-cyan-400 font-bold">AVAILABLE COMMANDS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              <div><span className="text-cyan-300 font-semibold">about</span> - Summary of engineering background</div>
              <div><span className="text-cyan-300 font-semibold">projects</span> - List flagship production systems</div>
              <div><span className="text-cyan-300 font-semibold">open &lt;project&gt;</span> - Inspect case study (e.g. open hive-kms)</div>
              <div><span className="text-cyan-300 font-semibold">stack</span> - View system map & technologies</div>
              <div><span className="text-cyan-300 font-semibold">lab</span> - List 8 interactive experiments</div>
              <div><span className="text-cyan-300 font-semibold">run &lt;exp&gt;</span> - Launch experiment (e.g. run rag-eval)</div>
              <div><span className="text-cyan-300 font-semibold">experience</span> - View 2022-2026 trajectory</div>
              <div><span className="text-cyan-300 font-semibold">contact</span> - Get direct email & channels</div>
              <div><span className="text-cyan-300 font-semibold">matrix</span> - Toggle matrix terminal aesthetic</div>
              <div><span className="text-cyan-300 font-semibold">whoami</span> - Display current user status</div>
              <div><span className="text-cyan-300 font-semibold">clear</span> - Clear terminal buffer</div>
              <div><span className="text-cyan-300 font-semibold">exit</span> - Close terminal window</div>
            </div>
          </div>
        );
        break;

      case 'about':
        resultOutput = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="text-cyan-300 font-bold">DUC ANH · SOFTWARE & AI SYSTEMS ENGINEER</div>
            <p>
              I build resilient systems that think. Specializing in stateful multi-agent swarms (LangGraph),
              multi-hop RAG architectures with hybrid dense/sparse retrieval, and high-performance modern web platforms.
            </p>
            <p className="text-slate-400">
              Based in Hanoi, Vietnam (UTC+7). Open to select AI Systems & Autonomous Agent roles.
            </p>
          </div>
        );
        break;

      case 'projects':
        resultOutput = (
          <div className="space-y-2 text-xs">
            <div className="text-cyan-400 font-bold">SELECTED PRODUCTION WORK:</div>
            <div className="space-y-2">
              {projects.map((p) => (
                <div key={p.id} className="p-2 bg-white/[0.02] border border-white/10 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">{p.number} · {p.title}</span>
                    <span className="text-cyan-400">{p.id}</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">{p.subtitle}</div>
                </div>
              ))}
            </div>
            <div className="text-slate-500 text-[11px]">
              Tip: Type <span className="text-cyan-300">open &lt;id&gt;</span> (e.g., <span className="text-cyan-300">open hive-kms</span>) to inspect full architecture.
            </div>
          </div>
        );
        break;

      case 'open':
        if (!arg) {
          resultOutput = (
            <div className="text-red-400 text-xs">
              Usage: open &lt;project-id&gt; (Options: hive-kms, yopaz-pulse, pawcrew, ai-document-intelligence)
            </div>
          );
        } else {
          const match = projects.find((p) => p.id === arg || p.title.toLowerCase().includes(arg));
          if (match && onOpenProject) {
            onOpenProject(match.id);
            onClose();
            return;
          } else {
            resultOutput = (
              <div className="text-amber-400 text-xs">
                Project not found: "{arg}". Available: hive-kms, yopaz-pulse, pawcrew, ai-document-intelligence.
              </div>
            );
          }
        }
        break;

      case 'stack':
        resultOutput = (
          <div className="space-y-2 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold">PRODUCTION SYSTEM STACK:</div>
            <div>· <span className="text-white font-semibold">AI & Agents:</span> LangGraph, LlamaIndex, MCP, BGE-Reranker, OpenAI / Claude / Gemini SDKs</div>
            <div>· <span className="text-white font-semibold">Frontend:</span> Next.js 14/15, React 19, TypeScript, Tailwind CSS, Framer Motion</div>
            <div>· <span className="text-white font-semibold">Backend:</span> FastAPI, NestJS, Node.js, Redis, BullMQ, WebSockets</div>
            <div>· <span className="text-white font-semibold">Databases:</span> PostgreSQL (pgvector), Qdrant, Neo4j Graph DB, MinIO S3</div>
            <div>· <span className="text-white font-semibold">Observability:</span> OpenTelemetry, Prometheus, Grafana, LangSmith</div>
          </div>
        );
        break;

      case 'lab':
        resultOutput = (
          <div className="space-y-2 text-xs">
            <div className="text-cyan-400 font-bold">THE LAB EXPERIMENTS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-300">
              {labExperiments.map((e) => (
                <div key={e.id}>
                  <span className="text-cyan-300 font-semibold">{e.id}</span>: {e.title}
                </div>
              ))}
            </div>
            <div className="text-slate-500 text-[11px]">
              Tip: Type <span className="text-cyan-300">run &lt;exp-id&gt;</span> (e.g. <span className="text-cyan-300">run rag-eval</span>)
            </div>
          </div>
        );
        break;

      case 'run':
        if (!arg) {
          resultOutput = (
            <div className="text-red-400 text-xs">
              Usage: run &lt;lab-id&gt; (e.g. run rag-eval, run multi-agent, run prompt-injection)
            </div>
          );
        } else {
          const match = labExperiments.find((e) => e.id === arg || e.title.toLowerCase().includes(arg));
          if (match && onOpenLab) {
            onOpenLab(match.id);
            onClose();
            return;
          } else {
            resultOutput = (
              <div className="text-amber-400 text-xs">
                Experiment "{arg}" not found. Type 'lab' to see all experiment IDs.
              </div>
            );
          }
        }
        break;

      case 'experience':
        resultOutput = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold">CAREER TRAJECTORY:</div>
            <div><span className="text-cyan-300">2022:</span> Web Development & Reactive Frontend Systems</div>
            <div><span className="text-cyan-300">2023:</span> Backend Engineering, Queues & Distributed Services</div>
            <div><span className="text-cyan-300">2024:</span> AI & RAG Specialist (Vector DB, Cross-Encoder, Neo4j)</div>
            <div><span className="text-cyan-300">2025:</span> Lead Agent Engineer (Multi-agent swarms, Self-healing QA)</div>
            <div><span className="text-cyan-300">2026:</span> Senior AI & Autonomous Systems Engineer</div>
          </div>
        );
        break;

      case 'contact':
        resultOutput = (
          <div className="space-y-2 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold">DIRECT CONTACT CHANNELS:</div>
            <div>Email: <a href="mailto:ninhanh917@gmail.com" className="text-cyan-300 underline">ninhanh917@gmail.com</a></div>
            <div>GitHub: <a href="https://github.com" target="_blank" rel="noreferrer" className="text-cyan-300 underline">github.com</a></div>
            <div>LinkedIn: <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-cyan-300 underline">linkedin.com</a></div>
          </div>
        );
        break;

      case 'matrix':
        setMatrixMode((prev) => !prev);
        resultOutput = (
          <div className="text-emerald-400 text-xs font-mono">
            [SYS]: Matrix terminal theme {matrixMode ? 'DISABLED' : 'ACTIVATED'}. Follow the white rabbit.
          </div>
        );
        break;

      case 'whoami':
        resultOutput = (
          <div className="text-xs text-slate-300">
            guest@portfolio (UID 1000, GID 1000) — Welcome, Recruiter / Fellow Engineer!
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        resultOutput = (
          <div className="text-red-400 text-xs">
            zsh: command not found: {cmd}. Type <span className="text-cyan-300 font-bold">help</span> for available commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { cmd: trimmed, output: resultOutput }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIndex + 1 < cmdHistory.length ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIdx);
      setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = availableCommands.find((c) => c.startsWith(inputVal.trim()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6">
      <div
        className={`bg-[#05070c] border border-cyan-500/40 rounded-sm flex flex-col shadow-[0_0_60px_rgba(6,182,212,0.25)] transition-all ${
          isFullScreen ? 'w-full h-full' : 'w-full max-w-4xl h-[78vh]'
        } ${matrixMode ? 'text-emerald-400 border-emerald-500/50' : 'text-slate-200'}`}
      >
        {/* Terminal Header Bar matching mockup Panel 08 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/60 font-mono text-xs select-none">
          {/* Traffic light dots */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors cursor-pointer"
              title="Close terminal"
            />
            <button
              onClick={() => setHistory([])}
              className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors cursor-pointer"
              title="Clear terminal"
            />
            <button
              onClick={() => setIsFullScreen((prev) => !prev)}
              className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 transition-colors cursor-pointer"
              title="Maximize terminal"
            />
          </div>

          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <TerminalIcon size={12} className={matrixMode ? 'text-emerald-400' : 'text-cyan-400'} />
            <span>duc@portfolio: ~ (bash)</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={() => setIsFullScreen((prev) => !prev)}
              className="hover:text-white transition-colors cursor-pointer p-1"
            >
              {isFullScreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </button>
            <button
              onClick={onClose}
              className="hover:text-white transition-colors cursor-pointer p-1"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Terminal Buffer */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 font-mono text-xs select-text">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.cmd && (
                <div className="flex items-center gap-2 text-slate-400">
                  <span className={matrixMode ? 'text-emerald-400' : 'text-cyan-400'}>
                    duc@portfolio ~ $
                  </span>
                  <span className="text-white font-medium">{item.cmd}</span>
                </div>
              )}
              <div className="pl-0">{item.output}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 pt-2">
            <span className={matrixMode ? 'text-emerald-400' : 'text-cyan-400 font-bold shrink-0'}>
              duc@portfolio ~ $
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Status Bar */}
        <div className="px-4 py-2 border-t border-white/10 bg-black/60 font-mono text-[10px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>TYPE 'help' FOR COMMANDS</span>
            <span className="hidden sm:inline">TAB: AUTOCOMPLETE</span>
            <span className="hidden sm:inline">↑/↓: HISTORY</span>
          </div>
          <div>STATUS: READY (200 OK)</div>
        </div>
      </div>
    </div>
  );
};
