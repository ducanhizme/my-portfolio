import React from 'react';
import { DNA_PRINCIPLES } from './data';
import { EngineeringPrinciple } from './EngineeringPrinciple';
import { EngineeringDNAClosing } from './EngineeringDNAClosing';

interface EngineeringDNAProps {
  reducedMotion?: boolean;
}

export const EngineeringDNA: React.FC<EngineeringDNAProps> = ({
  reducedMotion = false,
}) => {
  return (
    <section
      id="dna"
      className="relative w-full bg-[#030407] text-white py-32 sm:py-44 border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* ================================================== */}
        {/* SECTION HEADER: QUIET, CONFIDENT, EDITORIAL         */}
        {/* ================================================== */}
        <header className="mb-24 sm:mb-36 space-y-6 max-w-3xl">
          {/* Kicker */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-cyan-400">
            <span className="w-6 h-[1px] bg-cyan-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>05 // ENGINEERING DNA</span>
          </div>

          {/* Primary Editorial Headline */}
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display text-white tracking-tight uppercase leading-[1.03]">
            HOW I THINK.
          </h2>

          {/* Short Supporting Statement */}
          <p className="text-lg sm:text-2xl text-slate-300 font-light leading-relaxed">
            I don't just write software.{' '}
            <span className="text-white font-normal">
              I think about the systems behind it.
            </span>
          </p>
        </header>

        {/* ================================================== */}
        {/* FIVE EDITORIAL CHAPTERS (PRINCIPLES)               */}
        {/* ================================================== */}
        <div className="space-y-4">
          {DNA_PRINCIPLES.map((principle) => (
            <EngineeringPrinciple
              key={principle.id}
              principle={principle}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* ================================================== */}
        {/* CLOSING MANIFESTO & TRANSITION                     */}
        {/* ================================================== */}
        <EngineeringDNAClosing />
      </div>
    </section>
  );
};
