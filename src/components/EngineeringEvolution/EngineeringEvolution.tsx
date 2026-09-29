import React, { useRef, useState, useEffect } from 'react';
import { ContinuousEvolutionScene } from './ContinuousEvolutionScene';
import { useLanguage } from '../../context/LanguageContext';

interface EngineeringEvolutionProps {
  reducedMotion?: boolean;
}

export const EngineeringEvolution: React.FC<EngineeringEvolutionProps> = ({
  reducedMotion = false,
}) => {
  const { t } = useLanguage();
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
              {t.evolution.kicker}
            </span>
          </div>

          <div className="text-[11px] font-mono tracking-widest text-slate-400 font-medium">
            {p < 0.30
              ? t.evolution.tagBeforeAI
              : p < 0.58
              ? t.evolution.tagCollapse
              : p < 0.65
              ? t.evolution.tagIntent
              : p < 0.85
              ? t.evolution.tagDistributed
              : t.evolution.tagDecides}
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
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-[1.1] uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                {t.evolution.introTitle1} <br />
                {t.evolution.introTitle2}
              </h2>
              <p className="text-base sm:text-xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                {t.evolution.introSub}
              </p>
              <div className="pt-2 text-xs font-mono text-slate-400 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                {t.evolution.scrollHint}
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
                {t.evolution.linearTag}
              </div>

              {/* Clean Unboxed Text Hierarchy (No Cards) */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-mono text-xs sm:text-sm font-bold tracking-widest text-slate-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                <span>{t.evolution.stepUnderstand}</span>
                <span className="text-cyan-400">→</span>
                <span>{t.evolution.stepDesign}</span>
                <span className="text-cyan-400">→</span>
                <span className="text-white">{t.evolution.stepCode}</span>
                <span className="text-cyan-400">→</span>
                <span>{t.evolution.stepDebug}</span>
                <span className="text-cyan-400">→</span>
                <span>{t.evolution.stepTest}</span>
                <span className="text-cyan-400">→</span>
                <span>{t.evolution.stepDeploy}</span>
              </div>

              <p className="text-sm sm:text-base text-slate-300 font-light max-w-lg mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                {t.evolution.linearSub}
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
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-[1.15]">
                {t.evolution.complexTitle}
              </h3>
              <p className="text-sm sm:text-base text-slate-200 font-light max-w-md mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                {t.evolution.complexSub}
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
                {t.evolution.collapseTag}
              </div>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-[1.15]">
                {t.evolution.collapseTitle1} <br />
                {t.evolution.collapseTitle2}
              </h3>
              <p className="text-sm sm:text-base text-slate-200 font-light max-w-md mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                {t.evolution.collapseSub}
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
                {t.evolution.intentBadge}
              </div>

              <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-display font-medium text-white tracking-tight uppercase leading-[1.2] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                {t.evolution.intentQuote1} <br />
                <span className="text-cyan-300 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">{t.evolution.intentQuote2}</span>
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
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-[1.15]">
                {t.evolution.aiTitle1} <br />
                {t.evolution.aiTitle2}
              </h3>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-xs sm:text-sm tracking-wider text-cyan-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                <span>{t.evolution.stepIntent}</span>
                <span className="text-slate-500">→</span>
                <span className="text-white font-bold">{t.evolution.stepAgents}</span>
                <span className="text-slate-500">→</span>
                <span>{t.evolution.stepTools}</span>
                <span className="text-slate-500">→</span>
                <span>{t.evolution.stepExec}</span>
              </div>

              <p className="text-sm sm:text-base text-slate-200 font-light max-w-lg mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                {t.evolution.aiSub}
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
                {t.evolution.verifyTag}
              </div>

              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-[1.15]">
                {t.evolution.verifyTitle1} <br />
                {t.evolution.verifyTitle2}
              </h3>

              <p className="text-sm sm:text-base text-slate-200 font-light max-w-lg mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                {t.evolution.verifySub}
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
                <span>{t.evolution.climaxTag}</span>
              </div>

              <div className="space-y-3 font-mono text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                <div>{t.evolution.climaxSub}</div>
              </div>

              {/* Largest final statement */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-[1.15] uppercase drop-shadow-[0_4px_40px_rgba(0,0,0,1)] pt-2">
                {t.evolution.climaxTitle1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                  {t.evolution.climaxTitle2}
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
