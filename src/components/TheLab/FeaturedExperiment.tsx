import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { LabExperiment } from '../../types';
import { FeaturedRagFlow } from './FeaturedRagFlow';
import { soundManager } from '../../utils/audio';

interface FeaturedExperimentProps {
  experiment: LabExperiment;
  onSelect: (exp: LabExperiment) => void;
  reducedMotion?: boolean;
}

export const FeaturedExperiment: React.FC<FeaturedExperimentProps> = ({
  experiment,
  onSelect,
  reducedMotion = false,
}) => {
  return (
    <article className="relative rounded-sm border border-white/[0.1] bg-[#05070e] p-8 lg:p-12 space-y-8">
      {/* Top Status & Identification Lockup */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-xs text-cyan-300 font-bold tracking-widest uppercase">
            CURRENTLY EXPLORING // IN-FLIGHT EXPERIMENT
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
          <span className="px-2 py-0.5 rounded border border-white/10 bg-white/[0.03]">
            {experiment.category}
          </span>
          <span className="px-2 py-0.5 rounded border border-cyan-400/40 bg-cyan-950/40 text-cyan-300">
            PROTOTYPE ACTIVE
          </span>
        </div>
      </div>

      {/* Main Experiment Title & Hypothesis */}
      <div className="space-y-4 max-w-4xl">
        <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight uppercase leading-[1.04]">
          {experiment.title}
        </h3>

        <p className="text-base sm:text-xl text-slate-300 font-light leading-relaxed max-w-3xl">
          {experiment.description}
        </p>
      </div>

      {/* Live Interactive Experiment Flow Visual */}
      <div className="pt-2">
        <FeaturedRagFlow
          reducedMotion={reducedMotion}
          onRunTest={() => {
            soundManager.playInspect();
            onSelect(experiment);
          }}
        />
      </div>

      {/* Action Footer */}
      <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/[0.06] text-xs font-mono">
        <div className="text-slate-400 flex items-center gap-2">
          <Sparkles size={13} className="text-cyan-400" />
          <span>INDEPENDENT BENCHMARKING · REAL EMBEDDINGS · NON-DETERMINISTIC SIMULATION</span>
        </div>

        <button
          onClick={() => {
            soundManager.playInspect();
            onSelect(experiment);
          }}
          className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-sm transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.3)] shrink-0"
        >
          <span>OPEN EXPERIMENT WORKBENCH</span>
          <ArrowUpRight size={15} strokeWidth={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </article>
  );
};
