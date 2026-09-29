import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LabExperiment } from '../../types';
import { soundManager } from '../../utils/audio';

interface SecondaryExperimentItemProps {
  experiment: LabExperiment;
  number: string;
  onSelect: (exp: LabExperiment) => void;
  reducedMotion?: boolean;
}

export const SecondaryExperimentItem: React.FC<SecondaryExperimentItemProps> = ({
  experiment,
  number,
  onSelect,
  reducedMotion = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine authentic lab status
  const getLabStatus = (id: string) => {
    switch (id) {
      case 'multi-agent':
        return { label: 'ACTIVE', dot: 'bg-cyan-400', isLive: true };
      case 'mcp-tools':
        return { label: 'EXPERIMENTAL', dot: 'bg-sky-400', isLive: false };
      case 'prompt-injection':
        return { label: 'ACTIVE', dot: 'bg-cyan-400', isLive: true };
      case 'ai-testing':
        return { label: 'PROTOTYPE', dot: 'bg-emerald-400', isLive: false };
      case 'doc-ocr':
        return { label: 'EXPLORING', dot: 'bg-slate-400', isLive: false };
      case 'web-automation':
        return { label: 'EXPERIMENTAL', dot: 'bg-amber-400', isLive: false };
      case 'mini-projects':
        return { label: 'PROTOTYPE', dot: 'bg-purple-400', isLive: false };
      default:
        return { label: 'RESEARCH', dot: 'bg-slate-400', isLive: false };
    }
  };

  // Determine micro architectural flow preview
  const getMicroFlow = (id: string) => {
    switch (id) {
      case 'multi-agent':
        return 'PLANNER ──→ WORKER ──→ CRITIC ──→ CONSENSUS';
      case 'mcp-tools':
        return 'CLIENT ──→ MCP PROTOCOL ──→ TOOL DISPATCH ──→ SERVER';
      case 'prompt-injection':
        return 'INPUT ──→ CANARY TOKEN ──→ GUARDRAIL ──→ ISOLATED';
      case 'ai-testing':
        return 'DOM TIMEOUT ──→ A11Y SNAPSHOT ──→ RESILIENT LOCATOR';
      case 'doc-ocr':
        return 'RASTER IMAGE ──→ BOUNDARY PARSER ──→ TYPED PYDANTIC';
      case 'web-automation':
        return 'MISSION GOAL ──→ ACTION TREE ──→ DOM EXECUTION ──→ ASSERT';
      case 'mini-projects':
        return 'HIGH-DIM VECTOR ──→ UMAP 2D ──→ HDBSCAN TOPOLOGY';
      default:
        return 'SPECIFICATION ──→ PROTOTYPE ──→ BENCHMARK';
    }
  };

  const status = getLabStatus(experiment.id);
  const microFlow = getMicroFlow(experiment.id);

  const transitionClass = reducedMotion
    ? ''
    : 'transition-all duration-300 ease-out';

  return (
    <article
      onMouseEnter={() => {
        setIsHovered(true);
        soundManager.playKeypress();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        soundManager.playInspect();
        onSelect(experiment);
      }}
      className={`group relative py-8 sm:py-10 border-t border-white/[0.08] cursor-pointer ${transitionClass} ${
        isHovered ? 'bg-white/[0.015]' : ''
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-baseline">
        {/* Left Column: Number & Status */}
        <div className="lg:col-span-2 flex items-center gap-3 font-mono text-xs">
          <span
            className={`font-bold transition-colors ${
              isHovered ? 'text-cyan-400' : 'text-slate-500'
            }`}
          >
            {number}
          </span>
          <span className="text-slate-600">//</span>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase tracking-wider">
            <span
              className={`w-1.5 h-1.5 rounded-full ${status.dot} ${
                status.isLive ? 'animate-pulse' : ''
              }`}
            />
            <span>{status.label}</span>
          </div>
        </div>

        {/* Middle Column: Title & One-line Description */}
        <div
          className={`lg:col-span-7 space-y-2 ${transitionClass} ${
            !reducedMotion && isHovered ? 'translate-x-2' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <h4 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight uppercase group-hover:text-cyan-200 transition-colors">
              {experiment.title}
            </h4>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 border border-white/[0.08] bg-black/40">
              {experiment.category}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-2xl">
            {experiment.description}
          </p>

          {/* Micro Flow Pipeline preview on hover */}
          <div
            className={`pt-2 font-mono text-[10px] tracking-wider transition-opacity duration-300 ${
              isHovered ? 'opacity-100 text-cyan-400' : 'opacity-0 text-slate-600 h-0 overflow-hidden'
            }`}
          >
            <span>FLOW // </span>
            <span>{microFlow}</span>
          </div>
        </div>

        {/* Right Column: Interaction Trigger */}
        <div className="lg:col-span-3 flex lg:justify-end items-center font-mono text-xs pt-2 lg:pt-0">
          <span
            className={`inline-flex items-center gap-1.5 text-xs transition-colors duration-200 ${
              isHovered ? 'text-cyan-300' : 'text-slate-500'
            }`}
          >
            <span className="uppercase tracking-wider">EXPLORE PROTOTYPE</span>
            <ArrowUpRight
              size={13}
              className={`transition-transform duration-200 ${
                isHovered ? 'translate-x-0.5 -translate-y-0.5 text-cyan-400' : ''
              }`}
            />
          </span>
        </div>
      </div>
    </article>
  );
};
