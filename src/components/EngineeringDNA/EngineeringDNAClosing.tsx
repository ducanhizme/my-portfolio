import React from 'react';
import { ArrowDown } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const EngineeringDNAClosing: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-36 border-t border-white/[0.08] space-y-16">
      {/* Manifesto Headline */}
      <div className="max-w-4xl space-y-6">
        <div className="font-mono text-xs tracking-widest text-cyan-400 uppercase">
          CLOSING REFLECTION // SUMMARY
        </div>

        <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-[1.05] uppercase">
          GOOD ENGINEERING <br />
          MAKES COMPLEXITY <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white">
            DISAPPEAR.
          </span>
        </h3>

        <p className="text-base sm:text-xl text-slate-300 font-light max-w-xl leading-relaxed">
          Build systems that are easier to understand, operate, and trust.
        </p>
      </div>

      {/* Editorial bridge to the next section */}
      <div className="pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/[0.06] text-xs font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="tracking-widest uppercase">
            ENGINEERING IS HOW I THINK.
          </span>
        </div>

        <a
          href="#stack"
          onClick={() => soundManager.playClick()}
          className="group inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          <span className="tracking-wider uppercase">EXPLORE TECHNICAL STACK</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};
