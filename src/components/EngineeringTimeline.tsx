import React, { useRef, useState, useEffect } from 'react';
import { CAREER_TIMELINE, CareerMilestone } from '../data/careerTimeline';
import { soundManager } from '../utils/audio';

interface EngineeringTimelineProps {
  reducedMotion?: boolean;
}

export const EngineeringTimeline: React.FC<EngineeringTimelineProps> = ({
  reducedMotion = false,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const transitionClass = reducedMotion
    ? ''
    : 'transition-all duration-700 ease-out';

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative py-24 sm:py-32 border-b border-white/[0.08] bg-[#030407] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* ================================================== */}
        {/* 1. EDITORIAL SECTION HEADER                        */}
        {/* ================================================== */}
        <header className="max-w-3xl mb-16 sm:mb-24 space-y-4">
          <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-cyan-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>07 // CAREER EVOLUTION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight uppercase leading-[1.05]">
            ENGINEERING <br />
            TIMELINE.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            From building interfaces to designing intelligent systems.
          </p>
        </header>

        {/* ================================================== */}
        {/* 2. DESKTOP: SINGLE HORIZONTAL EDITORIAL TIMELINE   */}
        {/* ================================================== */}
        <div className="hidden md:block relative pt-8 pb-12">
          {/* Main Horizontal Timeline Track */}
          <div className="relative w-full h-[1px] bg-white/[0.12] mb-12">
            {/* Animated drawing progress line */}
            <div
              className={`absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500/60 via-cyan-400 to-cyan-300 ${
                reducedMotion ? 'w-full' : 'transition-all duration-1000 ease-out'
              }`}
              style={{ width: isVisible || reducedMotion ? '100%' : '0%' }}
            />
          </div>

          {/* 5 Milestone Columns Spaced Across Timeline */}
          <div className="grid grid-cols-5 gap-6 lg:gap-8 items-start relative -top-[55px]">
            {CAREER_TIMELINE.map((m, idx) => {
              const isCurrent = m.isCurrent;
              const isHovered = hoveredYear === m.year;
              // Stagger delay for entry reveal
              const delayMs = reducedMotion ? 0 : 300 + idx * 150;

              return (
                <div
                  key={m.year}
                  onMouseEnter={() => {
                    setHoveredYear(m.year);
                    soundManager.playKeypress();
                  }}
                  onMouseLeave={() => setHoveredYear(null)}
                  className={`group flex flex-col items-start cursor-default ${transitionClass}`}
                  style={{
                    opacity: isVisible || reducedMotion ? 1 : 0,
                    transform:
                      isVisible || reducedMotion
                        ? 'translateY(0)'
                        : 'translateY(16px)',
                    transitionDelay: `${delayMs}ms`,
                  }}
                >
                  {/* Milestone Node on the Timeline Line */}
                  <div className="relative mb-6 flex items-center justify-center">
                    {/* Pulsing halo ring for current year (2026) */}
                    {isCurrent && (
                      <span className="absolute w-6 h-6 rounded-full bg-cyan-400/20 animate-ping pointer-events-none" />
                    )}

                    {/* Node Dot */}
                    <div
                      className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 ${
                        isCurrent
                          ? 'bg-cyan-400 border-white shadow-[0_0_16px_rgba(6,182,212,0.9)] scale-110'
                          : isHovered
                          ? 'bg-cyan-300 border-white shadow-[0_0_12px_rgba(6,182,212,0.6)] scale-125'
                          : 'bg-[#030407] border-slate-500 group-hover:border-cyan-400 group-hover:bg-cyan-950'
                      }`}
                    />

                    {/* Vertical Connector Tick Drop */}
                    <div
                      className={`absolute top-3.5 left-1/2 -translate-x-1/2 w-[1px] h-4 transition-colors duration-300 ${
                        isCurrent
                          ? 'bg-cyan-400/70'
                          : isHovered
                          ? 'bg-cyan-400/50'
                          : 'bg-white/[0.15]'
                      }`}
                    />
                  </div>

                  {/* Year Tag */}
                  <div className="flex items-center gap-2 mb-2 font-mono">
                    <span
                      className={`text-2xl lg:text-3xl font-bold tracking-tight transition-colors duration-300 ${
                        isCurrent
                          ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                          : isHovered
                          ? 'text-cyan-300'
                          : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {m.year}
                    </span>

                    {/* Micro badge for current stage */}
                    {isCurrent && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono tracking-widest uppercase border border-cyan-400/60 bg-cyan-950/60 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                        CURRENT
                      </span>
                    )}
                  </div>

                  {/* Role / Focus */}
                  <h3
                    className={`text-sm lg:text-base font-bold font-display tracking-tight uppercase leading-snug mb-2 transition-colors duration-300 ${
                      isCurrent
                        ? 'text-cyan-300'
                        : isHovered
                        ? 'text-white'
                        : 'text-slate-200'
                    }`}
                  >
                    {m.role}
                  </h3>

                  {/* Subtitle / Role Context */}
                  <div className="text-[11px] font-mono text-slate-500 mb-2 tracking-wide">
                    {m.subtitle}
                  </div>

                  {/* Single Clean Sentence Summary */}
                  <p
                    className={`text-xs lg:text-[13px] font-light leading-relaxed transition-colors duration-300 ${
                      isCurrent
                        ? 'text-slate-200'
                        : isHovered
                        ? 'text-slate-300'
                        : 'text-slate-400'
                    }`}
                  >
                    {m.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================== */}
        {/* 3. MOBILE: CLEAN VERTICAL EDITORIAL TIMELINE       */}
        {/* ================================================== */}
        <div className="block md:hidden relative pl-6">
          {/* Vertical Timeline Rule */}
          <div className="absolute left-[7px] top-2 bottom-4 w-[1px] bg-white/[0.15]" />

          <div className="space-y-10">
            {CAREER_TIMELINE.map((m) => {
              const isCurrent = m.isCurrent;

              return (
                <div key={m.year} className="relative pl-6">
                  {/* Node Dot on Vertical Line */}
                  <div
                    className={`absolute -left-[19px] top-1.5 w-3.5 h-3.5 rounded-full border ${
                      isCurrent
                        ? 'bg-cyan-400 border-white shadow-[0_0_15px_rgba(6,182,212,0.9)]'
                        : 'bg-[#030407] border-slate-500'
                    }`}
                  >
                    {isCurrent && (
                      <span className="absolute -inset-1 rounded-full bg-cyan-400/25 animate-ping" />
                    )}
                  </div>

                  {/* Year & Current Badge */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`text-xl font-mono font-bold ${
                        isCurrent ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      {m.year}
                    </span>
                    {isCurrent && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono tracking-widest uppercase border border-cyan-400/60 bg-cyan-950/60 text-cyan-300">
                        CURRENT FOCUS
                      </span>
                    )}
                  </div>

                  {/* Role */}
                  <h3
                    className={`text-sm font-bold font-display uppercase tracking-tight mb-1 ${
                      isCurrent ? 'text-cyan-300' : 'text-slate-200'
                    }`}
                  >
                    {m.role}
                  </h3>

                  <div className="text-[11px] font-mono text-slate-500 mb-2">
                    {m.subtitle}
                  </div>

                  {/* Single Sentence Summary */}
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {m.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
