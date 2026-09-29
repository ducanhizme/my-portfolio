import React from 'react';
import { labExperiments } from '../../data/lab';
import { LabExperiment } from '../../types';
import { FeaturedExperiment } from './FeaturedExperiment';
import { SecondaryExperimentItem } from './SecondaryExperimentItem';
import { LabFooter } from './LabFooter';

interface TheLabProps {
  onSelectExperiment: (exp: LabExperiment) => void;
  reducedMotion?: boolean;
}

export const TheLab: React.FC<TheLabProps> = ({
  onSelectExperiment,
  reducedMotion = false,
}) => {
  const featuredExp = labExperiments[0];
  const secondaryExperiments = labExperiments.slice(1);

  return (
    <section
      id="lab"
      className="relative py-28 sm:py-36 border-b border-white/[0.08] bg-[#030407] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* ================================================== */}
        {/* 1. EDITORIAL HEADER: PERSONAL ENGINEERING LAB      */}
        {/* ================================================== */}
        <header className="mb-16 sm:mb-24 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-cyan-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>08 // PLAYGROUND</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display text-white tracking-tight uppercase leading-[1.03]">
            THE LAB.
          </h2>

          <div className="space-y-1 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            <p className="font-normal text-white">Small experiments. Big questions.</p>
            <p className="text-slate-400 text-sm sm:text-base">
              Things I'm building to understand what comes next.
            </p>
          </div>
        </header>

        {/* ================================================== */}
        {/* 2. PROMINENT FEATURED EXPERIMENT (50-60% WEIGHT)   */}
        {/* ================================================== */}
        <div className="mb-20">
          <FeaturedExperiment
            experiment={featuredExp}
            onSelect={onSelectExperiment}
            reducedMotion={reducedMotion}
          />
        </div>

        {/* ================================================== */}
        {/* 3. EDITORIAL SECONDARY EXPERIMENTS LIST            */}
        {/* ================================================== */}
        <div className="mb-16">
          <div className="pb-4 flex items-center justify-between font-mono text-xs text-slate-400">
            <span className="uppercase tracking-widest">
              SECONDARY EXPERIMENTS & ARCHITECTURAL PROTOTYPES
            </span>
            <span>07 ITEMS</span>
          </div>

          <div className="border-b border-white/[0.08]">
            {secondaryExperiments.map((exp, idx) => (
              <SecondaryExperimentItem
                key={exp.id}
                experiment={exp}
                number={idx + 2 < 10 ? `0${idx + 2}` : `${idx + 2}`}
                onSelect={onSelectExperiment}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>

        {/* ================================================== */}
        {/* 4. LAB INVENTORY & PHILOSOPHY FOOTER               */}
        {/* ================================================== */}
        <LabFooter />
      </div>
    </section>
  );
};
