import React from 'react';

export const LabFooter: React.FC = () => {
  return (
    <footer className="pt-16 sm:pt-20 border-t border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-6 font-mono text-xs text-slate-400">
      {/* Experiment inventory stats */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-white font-bold">08</span>
          <span>RESEARCH EXPERIMENTS</span>
        </div>

        <span className="text-slate-600">·</span>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-300 font-bold">03</span>
          <span>ACTIVE SIMULATORS</span>
        </div>

        <span className="text-slate-600">·</span>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <span className="text-sky-300 font-bold">05</span>
          <span>EXPLORATORY</span>
        </div>
      </div>

      {/* Engineering Philosophy Quote */}
      <div className="text-slate-400 font-light italic text-xs sm:text-right">
        "Some ideas are meant to ship. Others are meant to teach."
      </div>
    </footer>
  );
};
