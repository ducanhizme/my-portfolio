import React, { useEffect } from 'react';
import { ArrowRight, Terminal } from 'lucide-react';
import { IntelligenceField } from './hero/intelligence-field';
import { soundManager } from '../utils/audio';
import { clearHeroImageBlob } from '../utils/videoStorage';
import { DecryptedText, Magnet } from './ReactBits';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenTerminal: () => void;
  reducedMotion: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal, reducedMotion }) => {
  const { t, language } = useLanguage();

  // Clear any previously saved custom wallpaper in IndexedDB to always use fixed /hero-background.png
  useEffect(() => {
    clearHeroImageBlob();
  }, []);

  const handleTagClick = (tag: string) => {
    if (tag === 'SYSTEMS') {
      const el = document.getElementById('architecture');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (tag === 'AGENT' || tag === 'RAG') {
      const el = document.getElementById('work');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden border-b border-white/[0.06] pt-28 sm:pt-32 pb-8 bg-[#02040A]"
    >
      {/* ================================================== */}
      {/* 1. PRIMARY CINEMATIC HERO BACKGROUND (FIXED CỨNG)  */}
      {/* ================================================== */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
        <img
          src="/hero-background.png"
          alt="Cinematic Hero Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top filter brightness-[0.92] contrast-[1.05]"
        />

        {/* Measured dark gradient scrim for readability on left typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#02040A]/95 via-[#02040A]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ================================================== */}
      {/* 2. EXACT INTELLIGENCE NETWORK (1:1 with reference) */}
      {/* ================================================== */}
      <IntelligenceField
        reducedMotion={reducedMotion}
        onSelectTag={handleTagClick}
      />

      {/* ================================================== */}
      {/* 3. HTML TYPOGRAPHY & HERO CONTENT (Left side)      */}
      {/* ================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Exactly matches reference screenshot */}
        <div className="lg:col-span-8 space-y-7">
          {/* Top Kicker */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-cyan-400">
            <span className="w-6 h-[1.5px] bg-cyan-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs text-cyan-300">
              <DecryptedText
                key={language}
                text={t.hero.kicker}
                speed={35}
                maxIterations={14}
                sequential={true}
              />
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] font-display">
            <span className="block whitespace-normal sm:whitespace-nowrap">{t.hero.headline1}</span>
            <span className="block whitespace-normal sm:whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-cyan-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">
              {t.hero.headline2}
            </span>
            <span className="block whitespace-normal sm:whitespace-nowrap">{t.hero.headline3}</span>
          </h1>

          {/* Description Paragraph */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-xl font-normal leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {t.hero.subtitle}
          </p>

          {/* Action Buttons with ReactBits Magnet attraction */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            {/* Primary Button */}
            <Magnet padding={50} magnetStrength={0.25} disabled={reducedMotion}>
              <a
                href="#work"
                onClick={() => soundManager.playClick()}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#1cd0ec] hover:bg-[#3ce2fc] text-slate-950 font-mono text-xs sm:text-sm font-bold tracking-wider rounded transition-all duration-200 hover:shadow-[0_0_30px_rgba(28,208,236,0.6)] cursor-pointer"
              >
                <span>{t.hero.exploreBtn}</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>
            </Magnet>

            {/* Secondary Button */}
            <Magnet padding={50} magnetStrength={0.25} disabled={reducedMotion}>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenTerminal();
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 hover:border-cyan-400/80 bg-black/60 hover:bg-cyan-950/40 text-slate-200 hover:text-cyan-300 font-mono text-xs sm:text-sm tracking-wider rounded transition-all duration-200 cursor-pointer backdrop-blur-md"
              >
                <Terminal size={14} className="text-cyan-400" />
                <span>{t.hero.terminalBtn}</span>
              </button>
            </Magnet>
          </div>
        </div>

        {/* Right Column: Kept transparent so the planet and network shine through */}
        <div className="lg:col-span-4 hidden lg:block pointer-events-none" />
      </div>

      {/* ================================================== */}
      {/* 4. BOTTOM BAR: SCROLL INDICATOR + WALLPAPER TOOL   */}
      {/* ================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="w-8 h-[1px] bg-slate-600" />
          <span className="tracking-widest text-[11px] text-slate-400 uppercase">
            {language === 'vi' ? 'CUỘN ĐỂ KHÁM PHÁ' : 'SCROLL TO EXPLORE'}
          </span>
        </div>
      </div>
    </section>
  );
};
