import React, { useMemo } from 'react';
import { LogoLoop, LogoItem } from './ReactBits/LogoLoop';
import { stackCategories } from '../data/stack';
import { useLanguage } from '../context/LanguageContext';
import { resolveTechBrandIcon } from './TechBrandIcons';

export const EngineeringStack: React.FC = () => {
  const { t } = useLanguage();

  // Curate all technologies with authentic brand icons
  const allLogoItems: LogoItem[] = useMemo(() => {
    const list: LogoItem[] = [];
    stackCategories.forEach((cat) => {
      cat.technologies.forEach((tech) => {
        list.push({
          id: tech.name,
          name: tech.name,
          category: cat.name,
          icon: resolveTechBrandIcon(tech.name, 26),
        });
      });
    });
    return list;
  }, []);

  // Split into 3 balanced rows for alternating infinite loops
  const row1Items = useMemo(() => {
    // AI, Agents, Reasoning, Core Models
    return allLogoItems.filter((_, i) => i % 3 === 0);
  }, [allLogoItems]);

  const row2Items = useMemo(() => {
    // Frontend, Interfaces, Animation & Modern Web
    return allLogoItems.filter((_, i) => i % 3 === 1);
  }, [allLogoItems]);

  const row3Items = useMemo(() => {
    // Backend, Database, Cloud & Observability
    return allLogoItems.filter((_, i) => i % 3 === 2);
  }, [allLogoItems]);

  return (
    <section
      id="stack"
      className="relative py-24 sm:py-32 border-b border-white/[0.08] bg-[#030407] text-white overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/[0.04] blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* ================================================== */}
        {/* SECTION HEADER                                     */}
        {/* ================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-xs font-mono tracking-widest text-cyan-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{t.stack.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight uppercase">
            {t.stack.title1} {t.stack.title2}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
            {t.stack.subtitle}
          </p>
        </div>

        {/* ================================================== */}
        {/* REACTBITS LOGO-LOOP TRACKS (3 ALTERNATING ROWS)    */}
        {/* ================================================== */}
        <div className="space-y-4 sm:space-y-5">
          {/* Row 1: Left */}
          <LogoLoop
            items={row1Items}
            speed={38}
            direction="left"
            pauseOnHover={true}
            gap={20}
            fadeEdges={true}
          />

          {/* Row 2: Right */}
          <LogoLoop
            items={row2Items}
            speed={44}
            direction="right"
            pauseOnHover={true}
            gap={20}
            fadeEdges={true}
          />

          {/* Row 3: Left */}
          <LogoLoop
            items={row3Items}
            speed={36}
            direction="left"
            pauseOnHover={true}
            gap={20}
            fadeEdges={true}
          />
        </div>
      </div>
    </section>
  );
};
