import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Terminal, Image as ImageIcon, RotateCcw } from 'lucide-react';
import { IntelligenceField } from './hero/intelligence-field';
import { soundManager } from '../utils/audio';
import { loadHeroImageUrl, saveHeroImageBlob, clearHeroImageBlob } from '../utils/videoStorage';
import { DecryptedText, ShinyText, Magnet } from './ReactBits';

interface HeroProps {
  onOpenTerminal: () => void;
  reducedMotion: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal, reducedMotion }) => {
  // Fixed default wallpaper: /hero-background.png (1920x1080 cinematic backdrop)
  const [bgImageSrc, setBgImageSrc] = useState<string>('/hero-background.png');
  const [isCustomBg, setIsCustomBg] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load custom wallpaper from IndexedDB if saved by user (exact same pattern as boot video)
  useEffect(() => {
    loadHeroImageUrl().then((cachedUrl) => {
      if (cachedUrl) {
        setBgImageSrc(cachedUrl);
        setIsCustomBg(true);
      }
    });
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      await saveHeroImageBlob(file);
      const url = URL.createObjectURL(file);
      setBgImageSrc(url);
      setIsCustomBg(true);
      soundManager.playInspect();
    }
  };

  const handleResetBg = async () => {
    await clearHeroImageBlob();
    setBgImageSrc('/hero-background.png');
    setIsCustomBg(false);
    soundManager.playClick();
  };

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
      className="relative min-h-[96vh] flex flex-col justify-between overflow-hidden border-b border-white/[0.06] pt-20 pb-8 bg-[#02040A]"
    >
      {/* ================================================== */}
      {/* 1. PRIMARY CINEMATIC HERO BACKGROUND (FIXED CỨNG)  */}
      {/* ================================================== */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
        <img
          src={bgImageSrc}
          alt="Cinematic Hero Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
          onError={() => {
            // Keep /hero-background.png as hardcoded fallback
            setBgImageSrc('/hero-background.png');
          }}
        />

        {/* Measured dark gradient scrim for readability on left typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#02040A]/95 via-[#02040A]/45 to-transparent pointer-events-none" />
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
          {/* Top Kicker: —— 01 / DUC ANH · AI & SOFTWARE SYSTEMS with DecryptedText */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-cyan-400">
            <span className="w-6 h-[1.5px] bg-cyan-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs text-cyan-300">
              <DecryptedText
                text="01 / DUC ANH · AI & SOFTWARE SYSTEMS"
                speed={35}
                maxIterations={14}
                sequential={true}
              />
            </span>
          </div>

          {/* Main Headline: I BUILD SYSTEMS THAT THINK. */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.03] font-display">
            I BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-cyan-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">
              SYSTEMS
            </span>{' '}
            <br />
            THAT THINK.
          </h1>

          {/* Description Paragraph */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-xl font-normal leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Software Engineer focused on autonomous AI systems,{' '}
            <span className="text-white font-medium">multi-hop agentic workflows</span>, and modern high-performance web platforms.
          </p>

          {/* Action Buttons with ReactBits Magnet attraction */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            {/* Primary Button: Solid Cyan with Bold Text and Arrow */}
            <Magnet padding={50} magnetStrength={0.25} disabled={reducedMotion}>
              <a
                href="#work"
                onClick={() => soundManager.playClick()}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#1cd0ec] hover:bg-[#3ce2fc] text-slate-950 font-mono text-xs sm:text-sm font-bold tracking-wider rounded transition-all duration-200 hover:shadow-[0_0_30px_rgba(28,208,236,0.6)] cursor-pointer"
              >
                <span>EXPLORE WORK</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>
            </Magnet>

            {/* Secondary Button: Dark glass with monospaced prompt */}
            <Magnet padding={50} magnetStrength={0.25} disabled={reducedMotion}>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenTerminal();
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 hover:border-cyan-400/80 bg-black/60 hover:bg-cyan-950/40 text-slate-200 hover:text-cyan-300 font-mono text-xs sm:text-sm tracking-wider rounded transition-all duration-200 cursor-pointer backdrop-blur-md"
              >
                <Terminal size={14} className="text-cyan-400" />
                <span>&gt;_ ENTER TERMINAL</span>
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
            SCROLL TO EXPLORE
          </span>
        </div>

        {/* Wallpaper upload / persistence controls (matching the MP4 video pattern) */}
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/40 border border-white/10 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 text-[11px] transition-colors cursor-pointer"
            title="Upload custom hero wallpaper (e.g. ChatGPT Image)"
          >
            <ImageIcon size={12} className="text-cyan-400" />
            <span>WALLPAPER</span>
          </button>

          {isCustomBg && (
            <button
              onClick={handleResetBg}
              className="flex items-center gap-1 px-2 py-1 rounded bg-black/40 border border-white/10 hover:border-red-400 text-slate-400 hover:text-red-300 text-[10px] transition-colors cursor-pointer"
              title="Reset to default background"
            >
              <RotateCcw size={10} />
              <span>RESET</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
