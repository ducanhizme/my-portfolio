import React, { useState, useMemo } from 'react';
import {
  Cpu,
  Layout,
  Server,
  Database,
  Cloud,
  Activity,
  Bot,
  Terminal,
  Code,
  Layers,
  Sparkles,
  GitBranch,
  Boxes,
  FileCode,
  Play,
  Pause,
  CheckCircle2,
} from 'lucide-react';
import { LogoLoop, LogoItem } from './ReactBits/LogoLoop';
import { stackCategories } from '../data/stack';
import { soundManager } from '../utils/audio';

export const EngineeringStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedTechName, setSelectedTechName] = useState<string>('LangGraph & LangChain');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  // Helper to map tech name to icon
  const getTechIcon = (name: string, categoryId: string) => {
    const n = name.toLowerCase();
    if (n.includes('langgraph') || n.includes('agent')) return <Bot size={15} />;
    if (n.includes('rag') || n.includes('llamaindex')) return <Layers size={15} />;
    if (n.includes('mcp')) return <Terminal size={15} />;
    if (n.includes('openai') || n.includes('gemini') || n.includes('anthropic')) return <Sparkles size={15} />;
    if (n.includes('react') || n.includes('next.js')) return <Layout size={15} />;
    if (n.includes('typescript')) return <Code size={15} />;
    if (n.includes('tailwind')) return <FileCode size={15} />;
    if (n.includes('python') || n.includes('fastapi') || n.includes('nest')) return <Server size={15} />;
    if (n.includes('postgres') || n.includes('sql') || n.includes('qdrant') || n.includes('neo4j')) return <Database size={15} />;
    if (n.includes('docker') || n.includes('linux') || n.includes('azure') || n.includes('gcp')) return <Cloud size={15} />;
    if (n.includes('opentelemetry') || n.includes('prometheus') || n.includes('langsmith')) return <Activity size={15} />;
    if (categoryId === 'ai-agents') return <Cpu size={15} />;
    if (categoryId === 'frontend') return <Layout size={15} />;
    if (categoryId === 'backend') return <Server size={15} />;
    if (categoryId === 'database') return <Database size={15} />;
    if (categoryId === 'deployment') return <Cloud size={15} />;
    return <Boxes size={15} />;
  };

  // Flatten all technologies into structured LogoItems
  const allLogoItems: LogoItem[] = useMemo(() => {
    const list: LogoItem[] = [];
    stackCategories.forEach((cat) => {
      cat.technologies.forEach((tech) => {
        list.push({
          id: tech.name,
          name: tech.name,
          category: cat.name,
          role: cat.role,
          level: tech.level,
          highlight: tech.highlight,
          usedFor: tech.usedFor,
          architectureNote: cat.architectureNote,
          icon: getTechIcon(tech.name, cat.id),
        });
      });
    });
    return list;
  }, []);

  // Split into three balanced rows for continuous staggered multi-tier loops
  const row1Items = useMemo(() => {
    // AI, Agents, Reasoning, Core Models
    return allLogoItems.filter((_, i) => i % 3 === 0);
  }, [allLogoItems]);

  const row2Items = useMemo(() => {
    // Frontend, Interfaces, Animation
    return allLogoItems.filter((_, i) => i % 3 === 1);
  }, [allLogoItems]);

  const row3Items = useMemo(() => {
    // Backend, Database, Cloud & Observability
    return allLogoItems.filter((_, i) => i % 3 === 2);
  }, [allLogoItems]);

  // Filtered items when a single category is selected
  const filteredCategoryItems = useMemo(() => {
    if (activeCategory === 'all') return [];
    return allLogoItems.filter((item) => {
      const match = stackCategories.find((c) => c.id === activeCategory);
      return match && item.category === match.name;
    });
  }, [allLogoItems, activeCategory]);

  // Find currently inspected technology
  const inspectedTech = useMemo(() => {
    return allLogoItems.find((t) => t.name === selectedTechName) || allLogoItems[0];
  }, [allLogoItems, selectedTechName]);

  const handleSelectTech = (item: LogoItem) => {
    soundManager.playInspect();
    setSelectedTechName(item.name);
  };

  // Base animation durations in seconds (adjusted by speed multiplier)
  const baseSpeedRow1 = 45 / speedMultiplier;
  const baseSpeedRow2 = 50 / speedMultiplier;
  const baseSpeedRow3 = 42 / speedMultiplier;

  return (
    <section
      id="stack"
      className="relative py-28 sm:py-36 border-b border-white/[0.08] bg-[#030407] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* ================================================== */}
        {/* 1. SECTION HEADER                                  */}
        {/* ================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-cyan-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>06 // TECH STACK & SYSTEM ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight uppercase">
              MY ENGINEERING STACK.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              A production-proven constellation of tools, runtimes, and protocols. Hover or click any technology in the loop to inspect architectural rationale.
            </p>
          </div>

          {/* Controls: Play/Pause and Speed Toggle */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={() => {
                soundManager.playClick();
                setIsPaused((p) => !p);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded border border-white/10 bg-[#080a12] text-slate-300 hover:text-cyan-300 hover:border-cyan-400/60 transition-colors cursor-pointer"
              title="Pause or Resume Loop"
            >
              {isPaused ? <Play size={12} className="text-cyan-400" /> : <Pause size={12} className="text-cyan-400" />}
              <span>{isPaused ? 'RESUME' : 'PAUSE'}</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setSpeedMultiplier((s) => (s === 1 ? 1.5 : s === 1.5 ? 0.75 : 1));
              }}
              className="px-3 py-1.5 rounded border border-white/10 bg-[#080a12] text-slate-300 hover:text-cyan-300 hover:border-cyan-400/60 transition-colors cursor-pointer"
              title="Toggle Speed"
            >
              SPEED: {speedMultiplier}X
            </button>
          </div>
        </div>

        {/* ================================================== */}
        {/* 2. CATEGORY FILTER TABS                            */}
        {/* ================================================== */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 font-mono text-xs no-scrollbar">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveCategory('all');
            }}
            className={`px-3.5 py-1.5 rounded text-xs transition-all cursor-pointer shrink-0 ${
              activeCategory === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                : 'text-slate-400 hover:text-white border border-white/[0.08] bg-black/30'
            }`}
          >
            ALL SUBSYSTEMS ({allLogoItems.length})
          </button>

          {stackCategories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveCategory(cat.id);
                  if (cat.technologies[0]) {
                    setSelectedTechName(cat.technologies[0].name);
                  }
                }}
                className={`px-3.5 py-1.5 rounded text-xs transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'text-slate-400 hover:text-white border border-white/[0.08] bg-black/30'
                }`}
              >
                {cat.name} ({cat.technologies.length})
              </button>
            );
          })}
        </div>

        {/* ================================================== */}
        {/* 3. REACTBITS LOGO-LOOP ANIMATION TRACKS            */}
        {/* ================================================== */}
        <div
          className={`space-y-3 py-4 rounded-sm border border-white/[0.06] bg-[#04060d]/60 backdrop-blur-sm relative transition-opacity duration-300 ${
            isPaused ? 'opacity-90' : 'opacity-100'
          }`}
        >
          {activeCategory === 'all' ? (
            <>
              {/* Row 1: AI & Reasoning Core (Scrolls Left) */}
              <LogoLoop
                items={row1Items}
                speed={isPaused ? 999999 : baseSpeedRow1}
                direction="left"
                pauseOnHover={true}
                gap={18}
                activeItemId={selectedTechName}
                onItemSelect={handleSelectTech}
              />

              {/* Row 2: Frontend & Interaction Systems (Scrolls Right) */}
              <LogoLoop
                items={row2Items}
                speed={isPaused ? 999999 : baseSpeedRow2}
                direction="right"
                pauseOnHover={true}
                gap={18}
                activeItemId={selectedTechName}
                onItemSelect={handleSelectTech}
              />

              {/* Row 3: Backend, DB & Cloud Infrastructure (Scrolls Left) */}
              <LogoLoop
                items={row3Items}
                speed={isPaused ? 999999 : baseSpeedRow3}
                direction="left"
                pauseOnHover={true}
                gap={18}
                activeItemId={selectedTechName}
                onItemSelect={handleSelectTech}
              />
            </>
          ) : (
            <>
              {/* Filtered Mode: 2 synchronized loops of the selected category */}
              <LogoLoop
                items={filteredCategoryItems}
                speed={isPaused ? 999999 : 35 / speedMultiplier}
                direction="left"
                pauseOnHover={true}
                gap={20}
                activeItemId={selectedTechName}
                onItemSelect={handleSelectTech}
              />
              <LogoLoop
                items={filteredCategoryItems}
                speed={isPaused ? 999999 : 38 / speedMultiplier}
                direction="right"
                pauseOnHover={true}
                gap={20}
                activeItemId={selectedTechName}
                onItemSelect={handleSelectTech}
              />
            </>
          )}
        </div>

        {/* ================================================== */}
        {/* 4. DEEP TECHNOLOGY INSPECTION HUD                  */}
        {/* ================================================== */}
        <div className="mt-8 border border-cyan-500/30 rounded-sm bg-[#060810] p-6 sm:p-8 shadow-[0_0_35px_rgba(6,182,212,0.12)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Tech Overview & Metrics */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>INSPECTED SUBSYSTEM // {inspectedTech.category}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 flex items-center justify-center">
                  {inspectedTech.icon}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                    {inspectedTech.name}
                  </h3>
                  <div className="text-xs font-mono text-slate-400">
                    {inspectedTech.role}
                  </div>
                </div>
              </div>

              {/* Proficiency & Experience Metric */}
              <div className="pt-2 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">PRODUCTION MASTERY</span>
                  <span className="text-cyan-300 font-bold">{inspectedTech.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-500"
                    style={{ width: `${inspectedTech.level}%` }}
                  />
                </div>
              </div>

              {/* Production Highlight */}
              {inspectedTech.highlight && (
                <div className="pt-2 p-3 rounded bg-cyan-950/30 border border-cyan-400/20 text-xs text-slate-300 font-mono">
                  <span className="text-cyan-400 font-bold block mb-1">PROD HIGHLIGHT:</span>
                  {inspectedTech.highlight}
                </div>
              )}
            </div>

            {/* Right Column: Invariants & Production Responsibilities */}
            <div className="lg:col-span-8 space-y-6">
              {/* Primary Use Cases */}
              <div className="space-y-2">
                <div className="font-mono text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400" />
                  <span>CORE RESPONSIBILITIES & PRODUCTION USE CASES</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  {inspectedTech.usedFor?.map((usage, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded border border-white/[0.08] bg-black/40 font-mono text-xs text-slate-300"
                    >
                      <span className="text-cyan-400 block text-[10px] mb-1">0{idx + 1}</span>
                      {usage}
                    </div>
                  ))}
                </div>
              </div>

              {/* Architectural Rationale */}
              {inspectedTech.architectureNote && (
                <div className="space-y-1.5 pt-2 border-t border-white/[0.08]">
                  <div className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                    ARCHITECTURAL INVARIANT & RATIONALE
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    "{inspectedTech.architectureNote}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
