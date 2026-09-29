import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';
import { projects } from '../data/projects';
import { soundManager } from '../utils/audio';
import { TechIcons } from './TechIcons';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenExperiment?: (experimentId: string) => void;
}

const SLIDES = [
  { id: 'overview', number: '01', title: 'OVERVIEW' },
  { id: 'problem', number: '02', title: 'PROBLEM' },
  { id: 'approach', number: '03', title: 'APPROACH' },
  { id: 'architecture', number: '04', title: 'ARCHITECTURE' },
  { id: 'results', number: '05', title: 'RESULTS' },
] as const;

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isWheelingRef = useRef(false);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      setCurrentSlide(0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  const goToSlide = useCallback((index: number) => {
    soundManager.playKeypress();
    setCurrentSlide(Math.max(0, Math.min(SLIDES.length - 1, index)));
  }, []);

  const nextSlide = useCallback(() => {
    if (currentSlide < SLIDES.length - 1) {
      soundManager.playClick();
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      soundManager.playClick();
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  // Keyboard navigation: ArrowLeft / ArrowRight / Space
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, nextSlide, prevSlide, onClose]);

  // Horizontal / Vertical Mouse Wheel transition between slides
  const handleWheel = (e: React.WheelEvent) => {
    if (isWheelingRef.current) return;

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 35) {
      isWheelingRef.current = true;
      if (delta > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setTimeout(() => {
        isWheelingRef.current = false;
      }, 550);
    }
  };

  if (!project) return null;

  // Next Project computation
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const handleNextProject = () => {
    soundManager.playInspect();
    const event = new CustomEvent('select-project', { detail: nextProject });
    window.dispatchEvent(event);
    setCurrentSlide(0);
  };

  return (
    <div
      onWheel={handleWheel}
      className="fixed inset-0 z-50 h-screen w-screen overflow-hidden bg-[#020409] text-[#e2e8f0] selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col justify-between"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-40">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="presPlanet" cx="50%" cy="-35%" r="75%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="45%" stopColor="#0284c7" stopOpacity="0.12" />
              <stop offset="85%" stopColor="#0f172a" stopOpacity="0.02" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="960" cy="-450" rx="1600" ry="750" fill="url(#presPlanet)" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.3" />
        </svg>
      </div>

      {/* ================================================== */}
      {/* 1. TOP STICKY BAR: NAVBAR + SLIDE BREADCRUMB       */}
      {/* ================================================== */}
      <header className="relative z-40 w-full backdrop-blur-xl bg-[#020409]/90 border-b border-white/[0.08] px-6 sm:px-12 py-3 flex items-center justify-between font-mono text-xs">
        {/* Left: Brand + Back to Work */}
        <div className="flex items-center gap-6">
          <span className="font-bold tracking-wider text-white text-sm">DUC ANH</span>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            <span className="tracking-widest uppercase text-[11px]">BACK TO WORK</span>
          </button>
        </div>

        {/* Center: Slide Jump Navigator */}
        <div className="hidden md:flex items-center gap-2 bg-black/50 border border-white/10 rounded-full px-3 py-1">
          {SLIDES.map((s, idx) => {
            const isActive = currentSlide === idx;
            return (
              <button
                key={s.id}
                onClick={() => goToSlide(idx)}
                className={`px-3 py-1 rounded-full text-[11px] font-mono tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{s.number}</span>
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Slide Counter + Arrow Controls + Close */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-cyan-400 font-bold">0{currentSlide + 1}</span>
            <span className="text-slate-500">/ 0{SLIDES.length}</span>
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="w-7 h-7 rounded-full border border-white/10 hover:border-cyan-400/60 bg-black/40 flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                title="Previous slide (←)"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === SLIDES.length - 1}
                className="w-7 h-7 rounded-full border border-white/10 hover:border-cyan-400/60 bg-black/40 flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                title="Next slide (→)"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer ml-3 font-mono text-xs"
          >
            ESC [✕]
          </button>
        </div>
      </header>

      {/* ================================================== */}
      {/* 2. HORIZONTAL SLIDE VIEWPORT (100VW x 5 SLIDES)    */}
      {/* ================================================== */}
      <main className="relative flex-1 w-full overflow-hidden">
        <div
          className="flex h-full w-[500vw] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
        >
          {/* ============================================== */}
          {/* SLIDE 1: HERO & EXECUTIVE OVERVIEW (Panel 2)   */}
          {/* ============================================== */}
          <div className="w-[100vw] h-full flex flex-col justify-center px-6 sm:px-16 lg:px-24 py-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto w-full space-y-8 my-auto">
              {/* Project Badge */}
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-slate-400 tracking-wider">PROJECT / {project.number}</span>
                <span className="px-2.5 py-0.5 rounded-full border border-cyan-400/80 bg-cyan-950/60 text-cyan-300 text-[10px] font-semibold tracking-wider uppercase">
                  {project.title}
                </span>
              </div>

              {/* Grid: Headline & Summary on Left, 3D Swirling Hologram on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display text-white tracking-tight leading-[1.02] uppercase">
                    {project.headline}
                  </h1>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light max-w-xl">
                    {project.description}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <a
                      href={project.liveUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => soundManager.playClick()}
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs sm:text-sm font-bold tracking-wider rounded-xs transition-all hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] cursor-pointer"
                    >
                      <span>VIEW LIVE DEMO</span>
                      <ArrowRight size={15} />
                    </a>

                    <a
                      href={project.githubUrl || 'https://github.com'}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => soundManager.playClick()}
                      className="inline-flex items-center gap-2 px-5 py-3.5 border border-white/20 hover:border-cyan-400/60 bg-black/40 hover:bg-cyan-950/30 text-slate-200 hover:text-cyan-300 font-mono text-xs sm:text-sm tracking-wider rounded-xs transition-all cursor-pointer backdrop-blur-sm"
                    >
                      <span>GITHUB</span>
                      <ExternalLink size={13} className="text-cyan-400" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 relative">
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-cyan-500/20 bg-[#03060f] shadow-[0_0_50px_rgba(6,182,212,0.15)] group">
                    <img
                      src="/projects/doc-detail-hero.png"
                      alt="Swirling Holographic Documents"
                      className="w-full h-full object-cover object-center filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Metrics Strip & BUILT WITH Icons */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="grid grid-cols-3 gap-8 font-mono">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="space-y-0.5">
                      <div className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                        {m.value}
                      </div>
                      <div className="text-xs text-slate-300 font-medium tracking-wider uppercase">
                        {m.label}
                      </div>
                      {m.sublabel && (
                        <div className="text-[10px] text-slate-400 tracking-widest uppercase">
                          {m.sublabel}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:items-end space-y-2">
                  <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                    BUILT WITH
                  </div>
                  <TechIcons className="text-slate-300" />
                </div>
              </div>
            </div>
          </div>

          {/* ============================================== */}
          {/* SLIDE 2: 01 / PROBLEM (Panel 3 - Top)          */}
          {/* ============================================== */}
          <div className="w-[100vw] h-full flex flex-col justify-center px-6 sm:px-16 lg:px-24 py-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto w-full space-y-8 my-auto">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>01 / PROBLEM</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-[1.04] uppercase">
                    DOCUMENTS <br />
                    ARE FULL OF <br />
                    HIDDEN STRUCTURE.
                  </h2>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                    Real-world documents are messy. Scanned PDFs, complex layouts, tables, stamps, and
                    multilingual content make it hard to extract reliable, structured data at scale.
                  </p>

                  {/* 3 Physical Document Sample Cards */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="border border-white/10 rounded-sm overflow-hidden bg-black/40 p-2 space-y-1.5">
                      <div className="w-full aspect-[4/3] rounded-xs overflow-hidden bg-slate-900 border border-white/10">
                        <img
                          src="/projects/doc-receipt.png"
                          alt="Receipt Document"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 truncate">Complex Tables</div>
                    </div>

                    <div className="border border-white/10 rounded-sm overflow-hidden bg-black/40 p-2 space-y-1.5">
                      <div className="w-full aspect-[4/3] rounded-xs overflow-hidden bg-slate-900 border border-white/10">
                        <img
                          src="/projects/doc-stamp.png"
                          alt="Stamped Document"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 truncate">Official Stamps</div>
                    </div>

                    <div className="border border-white/10 rounded-sm overflow-hidden bg-black/40 p-2 space-y-1.5">
                      <div className="w-full aspect-[4/3] rounded-xs overflow-hidden bg-slate-900 border border-white/10">
                        <img
                          src="/projects/doc-notes.png"
                          alt="Handwritten Notes"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 truncate">Handwriting</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-cyan-500/25 bg-[#03060f] shadow-[0_0_40px_rgba(6,182,212,0.15)]">
                    <img
                      src="/projects/doc-workspace.png"
                      alt="Software Engineer analyzing documents on holographic monitors"
                      className="w-full h-full object-cover object-center filter brightness-95 contrast-110"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================== */}
          {/* SLIDE 3: 02 / APPROACH (Panel 3 - Bottom)       */}
          {/* ============================================== */}
          <div className="w-[100vw] h-full flex flex-col justify-center px-6 sm:px-16 lg:px-24 py-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto w-full space-y-8 my-auto">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>02 / APPROACH</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight leading-[1.05] uppercase">
                    A MULTIMODAL <br />
                    PIPELINE THAT UNDERSTANDS <br />
                    DOCUMENTS.
                  </h2>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                    We combine OCR, layout analysis, vision models, and schema validation to extract
                    structured data with spatial coordinates and high confidence scores.
                  </p>
                </div>

                {/* 4 Angled 3D Holographic Glass Cards in Perspective */}
                <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Card 1: OCR */}
                  <div className="relative rounded-sm border border-cyan-500/40 bg-[#06101c] p-3.5 space-y-2.5 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                    <div className="text-xs font-mono font-bold text-white uppercase">OCR</div>
                    <div className="text-[10px] font-mono text-cyan-300">Text Detection</div>
                    <div className="w-full h-28 rounded-xs bg-[#030812] border border-cyan-500/20 p-2.5 flex flex-col justify-center space-y-1.5">
                      <div className="w-14 h-1.5 bg-cyan-400" />
                      <div className="w-20 h-1.5 bg-slate-500" />
                      <div className="w-12 h-1.5 bg-slate-600" />
                    </div>
                  </div>

                  {/* Card 2: Layout Analysis */}
                  <div className="relative rounded-sm border border-cyan-500/40 bg-[#06101c] p-3.5 space-y-2.5 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                    <div className="text-xs font-mono font-bold text-white uppercase">Layout Analysis</div>
                    <div className="text-[10px] font-mono text-cyan-300">Structure Understanding</div>
                    <div className="w-full h-28 rounded-xs bg-[#030812] border border-cyan-500/20 p-2 flex flex-col justify-between">
                      <div className="w-full h-7 border border-cyan-400/80 bg-cyan-500/10 rounded-xs" />
                      <div className="w-full h-10 border border-cyan-400/80 bg-cyan-500/10 rounded-xs" />
                    </div>
                  </div>

                  {/* Card 3: Vision Model */}
                  <div className="relative rounded-sm border border-cyan-500/40 bg-[#06101c] p-3.5 space-y-2.5 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                    <div className="text-xs font-mono font-bold text-white uppercase">Vision Model</div>
                    <div className="text-[10px] font-mono text-cyan-300">Semantic Reasoning</div>
                    <div className="w-full h-28 rounded-xs bg-[#030812] border border-cyan-500/20 p-2 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border border-cyan-400 flex items-center justify-center">
                        <span className="text-cyan-300 font-mono text-xs font-bold">VLM</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Schema Validation with JSON Code */}
                  <div className="relative rounded-sm border border-cyan-400 bg-[#030a14] p-3.5 space-y-2.5 shadow-[0_0_25px_rgba(6,182,212,0.2)]">
                    <div className="text-xs font-mono font-bold text-white uppercase">Schema Validation</div>
                    <div className="text-[10px] font-mono text-emerald-400">Typed Output</div>
                    <div className="w-full h-28 rounded-xs bg-[#01040a] border border-emerald-500/30 p-2 font-mono text-[9px] text-slate-300 overflow-hidden leading-tight">
                      <div className="text-emerald-400">&#123;</div>
                      <div className="pl-1 text-cyan-300">"id": "INV-001",</div>
                      <div className="pl-1 text-cyan-300">"total": 12500000,</div>
                      <div className="pl-1 text-emerald-400">"valid": true</div>
                      <div className="text-emerald-400">&#125;</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================== */}
          {/* SLIDE 4: 03 / SYSTEM ARCHITECTURE (Panel 4)    */}
          {/* ============================================== */}
          <div className="w-[100vw] h-full flex flex-col justify-center px-6 sm:px-16 lg:px-24 py-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto w-full space-y-8 my-auto">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>03 / SYSTEM ARCHITECTURE</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-4 space-y-3">
                  <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight leading-[1.05] uppercase">
                    FROM PAGES <br />
                    TO STRUCTURED <br />
                    INTELLIGENCE.
                  </h2>
                  <p className="text-slate-400 text-sm font-light">
                    Streaming pipeline connecting high-throughput rasterization with deep semantic structure extraction.
                  </p>
                </div>

                {/* 3-Stage Architectural Flow Diagram (1:1 with Panel 4) */}
                <div className="lg:col-span-8 flex flex-col md:flex-row items-center gap-4">
                  {/* Box 1: DOCUMENT */}
                  <div className="w-full md:w-48 rounded-sm border border-white/10 bg-[#050a12] p-5 text-center space-y-4">
                    <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">DOCUMENT</div>
                    <div className="flex justify-center gap-2 text-slate-400">
                      <div className="w-9 h-11 rounded-xs border border-white/20 bg-[#02050a] flex items-center justify-center text-[9px] font-mono">
                        PDF
                      </div>
                      <div className="w-9 h-11 rounded-xs border border-white/20 bg-[#02050a] flex items-center justify-center text-[9px] font-mono">
                        SCAN
                      </div>
                      <div className="w-9 h-11 rounded-xs border border-white/20 bg-[#02050a] flex items-center justify-center text-[9px] font-mono">
                        DOCX
                      </div>
                    </div>
                  </div>

                  <div className="text-cyan-400 text-2xl font-mono hidden md:block">→</div>

                  {/* Box 2: MULTIMODAL AI PIPELINE */}
                  <div className="w-full md:flex-1 rounded-sm border border-cyan-500/50 bg-[#050f1d] p-5 space-y-2.5">
                    <div className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider flex items-center justify-between">
                      <span>MULTIMODAL AI PIPELINE</span>
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    </div>
                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div className="px-3.5 py-1.5 rounded-xs bg-[#02060e] border border-cyan-500/30 text-slate-200">
                        OCR
                      </div>
                      <div className="px-3.5 py-1.5 rounded-xs bg-[#02060e] border border-cyan-500/30 text-slate-200">
                        LAYOUT ANALYSIS
                      </div>
                      <div className="px-3.5 py-1.5 rounded-xs bg-[#02060e] border border-cyan-500/30 text-slate-200">
                        VISION MODEL
                      </div>
                      <div className="px-3.5 py-1.5 rounded-xs bg-[#02060e] border border-cyan-500/30 text-slate-200">
                        SCHEMA VALIDATION
                      </div>
                    </div>
                  </div>

                  <div className="text-cyan-400 text-2xl font-mono hidden md:block">→</div>

                  {/* Box 3: STRUCTURED DATA */}
                  <div className="w-full md:w-60 rounded-sm border border-white/10 bg-[#050a12] p-5 space-y-2.5">
                    <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                      STRUCTURED DATA
                    </div>
                    <div className="bg-[#020408] p-3 rounded-xs font-mono text-[10px] text-slate-300 leading-relaxed text-left">
                      <div className="text-slate-500">&#123;</div>
                      <div className="pl-1.5 text-cyan-300">"type": "invoice",</div>
                      <div className="pl-1.5 text-cyan-300">"vendor": "...",</div>
                      <div className="pl-1.5 text-cyan-300">"date": "...",</div>
                      <div className="pl-1.5 text-cyan-300">"items": [ ... ]</div>
                      <div className="text-slate-500">&#125;</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================== */}
          {/* SLIDE 5: 04 / RESULTS & NEXT PROJECT           */}
          {/* ============================================== */}
          <div className="w-[100vw] h-full flex flex-col justify-center px-6 sm:px-16 lg:px-24 py-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto w-full space-y-8 my-auto">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>04 / RESULTS</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
                <div className="lg:col-span-6 space-y-3">
                  <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight leading-[1.05] uppercase">
                    RELIABLE. <br />
                    SCALABLE. <br />
                    PRODUCTION READY.
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                    Designed for real enterprise documents with complex layouts, multilingual content,
                    and diverse formats.
                  </p>
                </div>

                <div className="lg:col-span-6 grid grid-cols-3 gap-6 font-mono">
                  <div className="space-y-0.5">
                    <div className="text-2xl sm:text-4xl font-bold text-white tracking-tight">500+</div>
                    <div className="text-[10px] text-slate-300 uppercase">pages/min</div>
                    <div className="text-[9px] text-slate-500 uppercase">THROUGHPUT</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-2xl sm:text-4xl font-bold text-white tracking-tight">99.4%</div>
                    <div className="text-[10px] text-slate-300 uppercase">TABLE EXTRACTION</div>
                    <div className="text-[9px] text-slate-500 uppercase">FIDELITY</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-2xl sm:text-4xl font-bold text-white tracking-tight">100%</div>
                    <div className="text-[10px] text-slate-300 uppercase">PDF/SCAN/DOCX</div>
                    <div className="text-[9px] text-slate-500 uppercase">FORMAT SUPPORT</div>
                  </div>
                </div>
              </div>

              {/* Row of 5 Processed Document Previews with Cyan Neon Bounding Boxes */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="rounded-sm border border-cyan-500/30 bg-[#06101c] p-2 space-y-2 group hover:border-cyan-400 transition-colors"
                  >
                    <div className="w-full aspect-[3/4] bg-[#020710] rounded-xs border border-cyan-500/20 p-2 flex flex-col justify-between">
                      <div className="w-full h-6 border border-cyan-400/80 bg-cyan-500/10 rounded-xs flex items-center justify-between px-1">
                        <span className="text-[7px] font-mono text-cyan-300">TABLE_0{item}</span>
                        <span className="text-[7px] font-mono text-emerald-400">99.4%</span>
                      </div>
                      <div className="w-3/4 h-4 border border-cyan-400/80 bg-cyan-500/10 rounded-xs" />
                      <div className="text-[7px] font-mono text-slate-400">EXTRACTED_PAGE_0{item}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Bar: 05 / TECH STACK & NEXT PROJECT */}
              <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 self-start md:self-auto">
                  <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                    05 / TECH STACK
                  </div>
                  <TechIcons className="text-slate-300" />
                </div>

                <div
                  onClick={handleNextProject}
                  className="group flex items-center gap-4 px-5 py-3.5 rounded-lg border border-cyan-500/30 bg-[#050d18] hover:border-cyan-400 transition-all cursor-pointer shadow-[0_0_25px_rgba(6,182,212,0.15)] self-end md:self-auto"
                >
                  <div className="text-left space-y-0.5">
                    <div className="text-[9px] font-mono text-cyan-400 tracking-widest uppercase">
                      NEXT PROJECT
                    </div>
                    <div className="text-sm sm:text-base font-bold font-display text-white group-hover:text-cyan-200 transition-colors uppercase">
                      {nextProject.title}
                    </div>
                    <div className="text-[11px] text-slate-400 font-light">
                      {nextProject.subtitle}
                    </div>
                  </div>

                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-cyan-500/30 shrink-0 bg-black flex items-center justify-center relative">
                    <img
                      src="/projects/cat-avatar.png"
                      alt="Next Project Mascot"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                    <span className="absolute bottom-1 right-1 text-cyan-400 text-xs">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ================================================== */}
      {/* 3. BOTTOM CINEMATIC PRESENTATION CONTROLS BAR      */}
      {/* ================================================== */}
      <footer className="relative z-40 w-full backdrop-blur-xl bg-[#020409]/90 border-t border-white/[0.08] px-6 sm:px-12 py-3 flex items-center justify-between font-mono text-xs">
        {/* Navigation Hint */}
        <div className="flex items-center gap-3 text-slate-400 text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>USE SCROLL WHEEL OR KEYBOARD ← → TO SLIDE</span>
        </div>

        {/* Progress Bar Track */}
        <div className="flex-1 max-w-xs mx-6 hidden sm:block h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-500"
            style={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }}
          />
        </div>

        {/* Slide Counter Indicator */}
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span className="text-cyan-400 font-bold">{SLIDES[currentSlide].title}</span>
          <span>(0{currentSlide + 1} / 0{SLIDES.length})</span>
        </div>
      </footer>
    </div>
  );
};
