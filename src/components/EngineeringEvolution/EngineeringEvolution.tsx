import React, { useRef, useState, useEffect } from 'react';
import { ContinuousEvolutionScene } from './ContinuousEvolutionScene';

interface EngineeringEvolutionProps {
  reducedMotion?: boolean;
}

export const EngineeringEvolution: React.FC<EngineeringEvolutionProps> = ({
  reducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Compute smooth normalized 0.00 -> 1.00 scroll progress along the 500vh vertical container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const normalized = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      progressRef.current = normalized;
      setScrollProgress(normalized);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const p = scrollProgress;

  // Opacity calculations for smooth HTML cross-fades
  const introOpacity = p < 0.15 ? Math.min(1, 1 - (p - 0.1) / 0.05) : 0;
  const beforeAIOpacity = p >= 0.13 && p < 0.32 ? Math.min(1, (p - 0.13) / 0.04, (0.32 - p) / 0.04) : 0;
  const complexOpacity = p >= 0.30 && p < 0.46 ? Math.min(1, (p - 0.30) / 0.04, (0.46 - p) / 0.04) : 0;
  const collapseOpacity = p >= 0.44 && p < 0.59 ? Math.min(1, (p - 0.44) / 0.04, (0.59 - p) / 0.04) : 0;
  const quietOpacity = p >= 0.57 && p < 0.66 ? Math.min(1, (p - 0.57) / 0.03, (0.66 - p) / 0.03) : 0;
  const aiEmergeOpacity = p >= 0.64 && p < 0.83 ? Math.min(1, (p - 0.64) / 0.04, (0.83 - p) / 0.04) : 0;
  const verifyOpacity = p >= 0.81 && p < 0.92 ? Math.min(1, (p - 0.81) / 0.03, (0.92 - p) / 0.03) : 0;
  const climaxOpacity = p >= 0.90 ? Math.min(1, (p - 0.90) / 0.04) : 0;

  return (
    <section
      id="architecture"
      ref={containerRef}
      className="relative w-full bg-[#020409] text-white selection:bg-cyan-500/30 selection:text-cyan-200"
      style={{ height: '520vh' }} // Generous continuous vertical scroll runway
    >
      {/* ================================================== */}
      {/* 1. STICKY / PINNED 100VH VIEWPORT                  */}
      {/* ================================================== */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-12">
        {/* Continuous 3D WebGL Canvas (Single continuous world) */}
        <ContinuousEvolutionScene progressRef={progressRef} reducedMotion={reducedMotion} />

        {/* Measured dark radial gradient scrim to guarantee 100% crystal-clear contrast behind all text */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_85%_70%_at_50%_50%,rgba(2,4,9,0.88)_0%,rgba(2,4,9,0.62)_55%,rgba(2,4,9,0.25)_100%)]" />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#020409]/70 via-transparent to-[#020409]/70" />

        {/* Top Minimal Tracker */}
        <header className="relative z-20 w-full flex items-center justify-between font-mono text-xs text-slate-400 pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300 font-semibold tracking-wider">
              05 / ENGINEERING EVOLUTION
            </span>
          </div>

          <div className="text-[11px] font-mono tracking-widest text-slate-400 font-medium">
            {p < 0.30
              ? 'BEFORE AI'
              : p < 0.58
              ? 'THE COLLAPSE'
              : p < 0.65
              ? 'INTENT'
              : p < 0.85
              ? 'DISTRIBUTED INTELLIGENCE'
              : 'ENGINEER DECIDES'}
          </div>
        </header>

        {/* ================================================== */}
        {/* 2. CENTER STAGE: CONTINUOUS CINEMATIC STORYTELLING */}
        {/* ================================================== */}
        <div className="relative z-20 my-auto max-w-4xl mx-auto w-full text-center pointer-events-none px-4 drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
          {/* ------------------------------------------------ */}
          {/* 0.00 - 0.15: INTRO                               */}
          {/* ------------------------------------------------ */}
          {introOpacity > 0 && (
            <div
              style={{
                opacity: introOpacity,
                transform: `translateY(${(1 - introOpacity) * 20}px)`,
              }}
              className="space-y-6 transition-all duration-300"
            >
              <h2 className="text-4xl sm:text-7xl lg:text-8xl font-bold font-display text-white tracking-tight leading-[1.02] uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                HOW I BUILD <br />
                HAS CHANGED.
              </h2>
              <p className="text-base sm:text-xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                Before AI, most of my engineering attention lived inside the implementation loop.
              </p>
              <div className="pt-2 text-xs font-mono text-slate-400 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                ↓ SCROLL TO EXPLORE THE TIMELINE
              </div>
            </div>
          )}

          {/* ------------------------------------------------ */}
          {/* 0.15 - 0.30: BEFORE AI (THE LINEAR PIPELINE)     */}
          {/* ------------------------------------------------ */}
          {beforeAIOpacity > 0 && (
            <div
              style={{
                opacity: beforeAIOpacity,
                transform: `translateY(${(1 - beforeAIOpacity) * 20}px)`,
              }}
              className="space-y-6 transition-all duration-300"
            >
              <div className="text-xs font-mono tracking-widest text-slate-300 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                THE LINEAR LOOP // 2018–2022
              </div>

              {/* Clean Unboxed Text Hierarchy (No Cards) */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-mono text-xs sm:text-sm font-bold tracking-widest text-slate-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                <span>UNDERSTAND</span>
                <span className="text-cyan-400">→</span>
                <span>DESIGN</span>
                <span className="text-cyan-400">→</span>
                <span className="text-white">CODE</span>
                <span className="text-cyan-400">→</span>
                <span>DEBUG</span>
                <span className="text-cyan-400">→</span>
                <span>TEST</span>
                <span className="text-cyan-400">→</span>
                <span>DEPLOY</span>
              </div>

              <p className="text-sm sm:text-base text-slate-300 font-light max-w-lg mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                Engineering velocity was strictly bound to human typing and manual syntax inspection.
              </p>
            </div>
          )}

          {/* ------------------------------------------------ */}
          {/* 0.30 - 0.45: WORKFLOW BECOMES COMPLEX            */}
          {/* ------------------------------------------------ */}
          {complexOpacity > 0 && (
            <div
              style={{
                opacity: complexOpacity,
                transform: `translateY(${(1 - complexOpacity) * 20}px)`,
              }}
              className="space-y-4 transition-all duration-300"
            >
              <h3 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                THE LOOP DESTABILIZED.
              </h3>
              <p className="text-sm sm:text-base text-slate-200 font-light max-w-md mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                Nodes detached into depth. Connecting pipelines stretched. Adding more keystrokes no longer created leverage.
              </p>
            </div>
          )}

          {/* ------------------------------------------------ */}
          {/* 0.45 - 0.58: COLLAPSE TOWARD INTENT              */}
          {/* ------------------------------------------------ */}
          {collapseOpacity > 0 && (
            <div
              style={{
                opacity: collapseOpacity,
                transform: `translateY(${(1 - collapseOpacity) * 20}px)`,
              }}
              className="space-y-4 transition-all duration-300"
            >
              <div className="text-xs font-mono tracking-widest text-cyan-300 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                CONVERGENCE
              </div>
              <h3 className="text-3xl sm:text-6xl font-bold font-display text-white tracking-tight uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                CODE, DEBUG, AND TEST <br />
                COLLAPSED.
              </h3>
              <p className="text-sm sm:text-base text-slate-200 font-light max-w-md mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                The entire implementation loop folded inward toward a single point.
              </p>
            </div>
          )}

          {/* ------------------------------------------------ */}
          {/* 0.58 - 0.65: QUIET MOMENT (CINEMATIC PAUSE)      */}
          {/* ------------------------------------------------ */}
          {quietOpacity > 0 && (
            <div
              style={{
                opacity: quietOpacity,
                transform: `scale(${0.96 + quietOpacity * 0.04})`,
              }}
              className="space-y-6 transition-all duration-300"
            >
              <div className="inline-block px-5 py-2 rounded-full border border-cyan-400/90 bg-cyan-950/80 text-cyan-200 font-mono text-sm tracking-[0.25em] font-bold shadow-[0_0_30px_rgba(6,182,212,0.4)] backdrop-blur-sm">
                INTENT
              </div>

              <blockquote className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight uppercase leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                THE PROBLEM NEVER CHANGED. <br />
                <span className="text-cyan-300 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">THE LEVERAGE DID.</span>
              </blockquote>
            </div>
          )}

          {/* ------------------------------------------------ */}
          {/* 0.65 - 0.82: AI EMERGES (DISTRIBUTED NETWORK)    */}
          {/* ------------------------------------------------ */}
          {aiEmergeOpacity > 0 && (
            <div
              style={{
                opacity: aiEmergeOpacity,
                transform: `translateY(${(1 - aiEmergeOpacity) * 20}px)`,
              }}
              className="space-y-6 transition-all duration-300"
            >
              <h3 className="text-3xl sm:text-6xl font-bold font-display text-white tracking-tight uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                BUILDING WITH <br />
                INTELLIGENCE.
              </h3>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-xs sm:text-sm tracking-wider text-cyan-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                <span>INTENT</span>
                <span className="text-slate-500">→</span>
                <span className="text-white font-bold">AI / AGENTS</span>
                <span className="text-slate-500">→</span>
                <span>TOOLS / RAG / MCP</span>
                <span className="text-slate-500">→</span>
                <span>EXECUTE</span>
              </div>

              <p className="text-sm sm:text-base text-slate-200 font-light max-w-lg mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                The architecture is no longer linear. It is a distributed, stateful network of models, tools, and vector context.
              </p>
            </div>
          )}

          {/* ------------------------------------------------ */}
          {/* 0.82 - 0.92: VERIFY                              */}
          {/* ------------------------------------------------ */}
          {verifyOpacity > 0 && (
            <div
              style={{
                opacity: verifyOpacity,
                transform: `translateY(${(1 - verifyOpacity) * 20}px)`,
              }}
              className="space-y-5 transition-all duration-300"
            >
              <div className="text-xs font-mono tracking-widest text-cyan-300 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                VERIFICATION OVER IMPLEMENTATION
              </div>

              <h3 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                EXECUTE → VERIFY.
              </h3>

              <p className="text-sm sm:text-base text-slate-200 font-light max-w-lg mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                When generation cost drops to zero, verification becomes the critical engineering bottleneck. Invariants, schemas, and test harnesses reign supreme.
              </p>
            </div>
          )}

          {/* ------------------------------------------------ */}
          {/* 0.92 - 1.00: ENGINEER DECIDES (THE CLIMAX)       */}
          {/* ------------------------------------------------ */}
          {climaxOpacity > 0 && (
            <div
              style={{
                opacity: climaxOpacity,
                transform: `translateY(${(1 - climaxOpacity) * 20}px)`,
              }}
              className="space-y-6 transition-all duration-300"
            >
              {/* Central Focal Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/90 bg-white/15 text-white font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase backdrop-blur-md shadow-[0_0_35px_rgba(255,255,255,0.4)]">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>ENGINEER DECIDES</span>
              </div>

              <div className="space-y-3 font-mono text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                <div>AI CAN GENERATE CODE. IT CAN EXPLORE, REASON, EXECUTE, AND AUTOMATE.</div>
                <div className="text-slate-300">THE TOOLS CHANGED. THE ENGINEERING DIDN'T.</div>
              </div>

              {/* Largest final statement */}
              <h1 className="text-5xl sm:text-7xl lg:text-9xl font-bold font-display text-white tracking-tight leading-none uppercase drop-shadow-[0_4px_40px_rgba(0,0,0,1)] pt-2">
                MY ROLE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                  EVOLVED.
                </span>
              </h1>
            </div>
          )}
        </div>

        {/* ================================================== */}
        {/* 3. BOTTOM CINEMATIC PROGRESS RAIL                  */}
        {/* ================================================== */}
        <footer className="relative z-20 w-full pt-4 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs text-slate-400">
          <div className="text-[11px] text-slate-500">
            CONTINUOUS VERTICAL TIMELINE
          </div>

          {/* Thin glowing progress track */}
          <div className="w-36 sm:w-56 h-[1.5px] bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-75"
              style={{ width: `${p * 100}%` }}
            />
          </div>
        </footer>
      </div>
    </section>
  );
};
