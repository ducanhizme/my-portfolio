import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import { projects as staticProjects } from '../data/projects';
import { fetchProjectsFromCMS } from '../services/cms';
import { soundManager } from '../utils/audio';
import { SpotlightCard, ShinyText, DecryptedText } from './ReactBits';
import { useLanguage } from '../context/LanguageContext';

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject }) => {
  const { t, language, localizeProject } = useLanguage();
  const [projectList, setProjectList] = useState<Project[]>(staticProjects);
  // Default to 4th card (AI DOCUMENT INTELLIGENCE) or last card
  const [activeIndex, setActiveIndex] = useState(3);

  useEffect(() => {
    let isMounted = true;
    fetchProjectsFromCMS().then((cmsProjects) => {
      if (isMounted && cmsProjects && cmsProjects.length > 0) {
        setProjectList(cmsProjects);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handlePrev = () => {
    soundManager.playClick();
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : projectList.length - 1));
  };

  const handleNext = () => {
    soundManager.playClick();
    setActiveIndex((prev) => (prev < projectList.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="work"
      className="relative min-h-[95vh] py-20 sm:py-28 border-b border-white/[0.06] overflow-hidden bg-[#020409] flex flex-col justify-between"
    >
      {/* ================================================== */}
      {/* 1. BACKGROUND PLANET ATMOSPHERE (1:1 with Panel 1) */}
      {/* ================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <svg
          className="w-full h-full object-cover opacity-35"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="panel1PlanetRim" cx="50%" cy="-30%" r="75%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="35%" stopColor="#0284c7" stopOpacity="0.15" />
              <stop offset="70%" stopColor="#0f172a" stopOpacity="0.03" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Planet Horizon Arc across top */}
          <ellipse
            cx="960"
            cy="-450"
            rx="1600"
            ry="750"
            fill="url(#panel1PlanetRim)"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          {/* Subtle starfield */}
          {Array.from({ length: 80 }).map((_, i) => (
            <circle
              key={i}
              cx={(i * 173.5) % 1920}
              cy={(i * 111.7) % 750}
              r={(i % 3) * 0.8 + 0.6}
              fill="#e0f2fe"
              opacity={(i % 4) * 0.15 + 0.25}
            />
          ))}
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020409] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
        {/* ================================================== */}
        {/* 2. SECTION HEADER (1:1 with Panel 1)               */}
        {/* ================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3">
            {/* Kicker */}
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-300 font-medium">
                <DecryptedText
                  key={language}
                  text={t.work.kicker}
                  speed={35}
                  maxIterations={12}
                  sequential={true}
                />
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-[1.08]">
              <span className="block">{t.work.headline1}</span>
              <span className="block">
                <ShinyText text={t.work.headline2} className="text-white" />
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-400 text-sm sm:text-base font-normal max-w-lg leading-relaxed">
              {t.work.subtitle}
            </p>
          </div>

          {/* Right counter & controls */}
          <div className="flex items-center gap-5 self-start sm:self-auto font-mono text-xs">
            <span className="tracking-wider">
              <span className="text-cyan-400 font-bold">0{activeIndex + 1}</span>{' '}
              <span className="text-slate-400">/ 0{projectList.length}</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full border border-white/15 hover:border-cyan-400/60 bg-black/40 hover:bg-cyan-950/40 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer backdrop-blur-sm"
                aria-label={t.work.prevBtn}
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full border border-white/15 hover:border-cyan-400/60 bg-black/40 hover:bg-cyan-950/40 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer backdrop-blur-sm"
                aria-label={t.work.nextBtn}
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* 3. 4-CARD SHOWCASE GALLERY (1:1 with Panel 1)      */}
        {/* ================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {projectList.map((rawProject, idx) => {
            const project = localizeProject(rawProject);
            const isSelected = activeIndex === idx;

            return (
              <SpotlightCard
                key={project.id}
                spotlightColor="rgba(6, 182, 212, 0.18)"
                spotlightSize={320}
                onClick={() => {
                  soundManager.playInspect();
                  setActiveIndex(idx);
                  onSelectProject(project);
                }}
                onMouseEnter={() => {
                  setActiveIndex(idx);
                  soundManager.playKeypress();
                }}
                className={`group relative rounded-xl cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden bg-[#070b12] p-4 ${
                  isSelected
                    ? 'border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)] -translate-y-1.5'
                    : 'border border-white/[0.08] hover:border-white/30 hover:-translate-y-1'
                }`}
              >
                <div>
                  {/* Top Index Number: 01, 02, 03, 04 */}
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className={`font-bold tracking-wider ${isSelected ? 'text-cyan-400' : 'text-slate-300'}`}>
                      {project.number}
                    </span>
                  </div>

                  {/* Visual Image Cover */}
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-[#03060c]">
                    <img
                      src={project.image || `/projects/${project.id}.png`}
                      alt={project.title}
                      className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-transparent to-transparent opacity-40" />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1 mb-4">
                    <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-tight uppercase group-hover:text-cyan-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-light truncate">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Bottom Tags Strip & Circular Arrow Action Button */}
                <div className="pt-3 border-t border-white/[0.07] flex items-center justify-between gap-2">
                  {/* Rounded Tag Pills: RAG · AGENTS · KNOWLEDGE */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 rounded-full uppercase tracking-wider text-[9px] ${
                          isSelected
                            ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-200'
                            : 'bg-white/[0.05] border border-white/10 text-slate-300'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Circular View Button: ↗ */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isSelected
                        ? 'border border-cyan-400 bg-cyan-400/20 text-cyan-300'
                        : 'border border-white/20 text-slate-400 group-hover:border-cyan-400 group-hover:text-cyan-300'
                    }`}
                  >
                    <ArrowUpRight size={13} strokeWidth={2.2} />
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>

      {/* ================================================== */}
      {/* 4. BOTTOM-LEFT INDICATOR: · —— SCROLL TO EXPLORE   */}
      {/* ================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full pt-10 flex items-center justify-between text-xs font-mono text-slate-500">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="w-6 h-[1px] bg-slate-700" />
          <span className="tracking-widest text-[11px] text-slate-400 uppercase">
            SCROLL TO EXPLORE
          </span>
        </div>
      </div>
    </section>
  );
};
