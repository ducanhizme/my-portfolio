import React, { useState, useEffect } from 'react';

interface FeaturedRagFlowProps {
  reducedMotion?: boolean;
  onRunTest?: () => void;
}

export const FeaturedRagFlow: React.FC<FeaturedRagFlowProps> = ({
  reducedMotion = false,
  onRunTest,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    if (reducedMotion) return;

    // Cycle signal pulse through the 5 pipeline stages
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 2200);

    return () => clearInterval(timer);
  }, [reducedMotion]);

  const stages = [
    { id: 'query', label: 'USER QUERY', sub: 'Intent & Entity Decomposition' },
    { id: 'retrieval', label: 'HYBRID RETRIEVAL', sub: 'Vector Dense + Sparse BM25' },
    { id: 'rerank', label: 'CROSS-ENCODER', sub: 'Semantic Relevance Scoring' },
    { id: 'graph', label: 'MULTI-HOP GRAPH', sub: 'Entity Relation Traversal' },
    { id: 'eval', label: 'GROUNDED SYNTHESIS', sub: 'Faithfulness & Verification' },
  ];

  return (
    <div className="w-full rounded-sm border border-white/[0.08] bg-[#020306] p-6 lg:p-8 font-mono relative overflow-hidden">
      {/* Top telemetry bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06] text-xs">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-300 font-bold tracking-wider uppercase">
            LIVE SIGNAL FLOW // PIPELINE TRACE
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span>ACTIVE STAGE: <span className="text-cyan-400 font-bold">0{activeStep + 1} / 05</span></span>
          <button
            onClick={() => {
              setActiveStep((prev) => (prev + 1) % 5);
              onRunTest?.();
            }}
            className="px-2.5 py-1 rounded border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer text-[10px]"
          >
            PULSE NEXT →
          </button>
        </div>
      </div>

      {/* Interactive SVG Signal Graph */}
      <div className="py-8 w-full overflow-x-auto no-scrollbar">
        <svg
          viewBox="0 0 760 140"
          className="w-full min-w-[680px] h-32 overflow-visible select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Connecting Axis */}
          <line
            x1="50"
            y1="70"
            x2="710"
            y2="70"
            stroke="#1e293b"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Animated active signal segment */}
          <line
            x1="50"
            y1="70"
            x2={50 + activeStep * 165}
            y2="70"
            stroke="#38bdf8"
            strokeWidth="2"
            className="transition-all duration-700 ease-out"
          />

          {/* The 5 Pipeline Nodes */}
          {stages.map((stage, idx) => {
            const x = 50 + idx * 165;
            const isCurrent = idx === activeStep;
            const isPast = idx < activeStep;

            return (
              <g
                key={stage.id}
                className="cursor-pointer group"
                onClick={() => setActiveStep(idx)}
              >
                {/* Active halo */}
                {isCurrent && (
                  <circle
                    cx={x}
                    cy={70}
                    r={22}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1"
                    opacity={0.4}
                    className="animate-ping"
                  />
                )}

                {/* Node Outer Ring */}
                <circle
                  cx={x}
                  cy={70}
                  r={isCurrent ? 14 : 10}
                  fill={isCurrent ? 'rgba(6, 182, 212, 0.2)' : isPast ? 'rgba(56, 189, 248, 0.08)' : '#040711'}
                  stroke={isCurrent ? '#38bdf8' : isPast ? '#0284c7' : '#334155'}
                  strokeWidth={isCurrent ? 2 : 1}
                  className="transition-all duration-300"
                />

                {/* Node Core */}
                <circle
                  cx={x}
                  cy={70}
                  r={isCurrent ? 5 : 3.5}
                  fill={isCurrent ? '#ffffff' : isPast ? '#38bdf8' : '#64748b'}
                  className="transition-all duration-300"
                />

                {/* Top Step Number */}
                <text
                  x={x}
                  y={38}
                  textAnchor="middle"
                  fill={isCurrent ? '#38bdf8' : isPast ? '#94a3b8' : '#475569'}
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight={isCurrent ? 'bold' : 'normal'}
                  className="transition-colors duration-300"
                >
                  0{idx + 1}
                </text>

                {/* Bottom Step Label */}
                <text
                  x={x}
                  y={102}
                  textAnchor="middle"
                  fill={isCurrent ? '#ffffff' : isPast ? '#cbd5e1' : '#64748b'}
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight={isCurrent ? 'bold' : '500'}
                  letterSpacing="0.05em"
                  className="transition-colors duration-300"
                >
                  {stage.label}
                </text>

                {/* Micro Subtitle */}
                <text
                  x={x}
                  y={118}
                  textAnchor="middle"
                  fill={isCurrent ? '#38bdf8' : '#475569'}
                  fontSize="8"
                  fontFamily="monospace"
                  className="transition-colors duration-300"
                >
                  {stage.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom active telemetry readout */}
      <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="text-slate-400 font-light">
          <span className="text-slate-500 uppercase tracking-widest block text-[10px]">
            ACTIVE HYPOTHESIS UNDER TEST:
          </span>
          <span className="text-slate-300">
            "Does multi-hop reasoning degrade semantic precision if chunk boundaries cross document sections?"
          </span>
        </div>

        <button
          onClick={onRunTest}
          className="group inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold transition-colors cursor-pointer shrink-0"
        >
          <span>OPEN INTERACTIVE SIMULATOR</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
};
