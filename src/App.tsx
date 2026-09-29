import React, { useState, useEffect } from 'react';
import { BootSequence } from './components/BootSequence';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { EngineeringEvolution } from './components/EngineeringEvolution';
import { EngineeringDNA } from './components/EngineeringDNA';
import { EngineeringStack } from './components/EngineeringStack';
import { EngineeringTimeline } from './components/EngineeringTimeline';
import { TheLab } from './components/TheLab';
import { ContactSection } from './components/ContactSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { LabExperimentModal } from './components/LabExperimentModal';
import { TerminalModal } from './components/TerminalModal';
import { CustomCursor } from './components/CustomCursor';
import { projects } from './data/projects';
import { labExperiments } from './data/lab';
import { Project, LabExperiment } from './types';
import { soundManager } from './utils/audio';

export default function App() {
  const [hasBooted, setHasBooted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedExperiment, setSelectedExperiment] = useState<LabExperiment | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [easterEggActive, setEasterEggActive] = useState(false);

  // Sound toggle sync
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.enabled = next;
  };

  // Listen for custom project selection events (e.g. Next Project)
  useEffect(() => {
    const handleSelectProjectEvent = (e: Event) => {
      const customEvent = e as CustomEvent<Project>;
      if (customEvent.detail) {
        setSelectedProject(customEvent.detail);
      }
    };
    window.addEventListener('select-project', handleSelectProjectEvent);
    return () => window.removeEventListener('select-project', handleSelectProjectEvent);
  }, []);

  // Keyboard shortcut listener for Command Palette / Terminal (⌘K or /) and ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K or / (when not typing in an input)
      if (
        (e.key === 'k' && (e.metaKey || e.ctrlKey)) ||
        (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')
      ) {
        e.preventDefault();
        soundManager.playClick();
        setTerminalOpen((prev) => !prev);
      }
      // ESC closes modals
      if (e.key === 'Escape') {
        if (terminalOpen) setTerminalOpen(false);
        if (selectedProject) setSelectedProject(null);
        if (selectedExperiment) setSelectedExperiment(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [terminalOpen, selectedProject, selectedExperiment]);

  // Konami Code Easter Egg: Up Up Down Down Left Right Left Right B A
  useEffect(() => {
    const konamiSequence = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];
    let keyIdx = 0;

    const handleKonami = (e: KeyboardEvent) => {
      if (e.key === konamiSequence[keyIdx]) {
        keyIdx++;
        if (keyIdx === konamiSequence.length) {
          keyIdx = 0;
          soundManager.playBoot();
          setEasterEggActive(true);
          setTimeout(() => setEasterEggActive(false), 5000);
        }
      } else {
        keyIdx = 0;
      }
    };

    window.addEventListener('keydown', handleKonami);
    return () => window.removeEventListener('keydown', handleKonami);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sections = ['hero', 'work', 'architecture', 'dna', 'stack', 'timeline', 'lab', 'contact'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050507] text-[#E4E4EB] selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Magnetic Custom Cursor */}
      <CustomCursor reducedMotion={reducedMotion} />

      {/* Boot Sequence Modal / Gate */}
      {!hasBooted && (
        <BootSequence
          onComplete={() => {
            setHasBooted(true);
          }}
        />
      )}

      {/* Konami Code Celebration Overlay */}
      {easterEggActive && (
        <div className="fixed top-20 right-6 z-50 bg-cyan-950/90 border border-cyan-400 p-4 rounded-sm shadow-[0_0_40px_rgba(6,182,212,0.4)] font-mono text-xs text-cyan-200 animate-bounce">
          <div className="font-bold text-white flex items-center gap-2">
            <span>👾 SECRET DEV MODE UNLOCKED</span>
          </div>
          <div>Konami Code verified. Neural weights aligned. Welcome, Architect.</div>
        </div>
      )}

      {/* Main Experience */}
      {hasBooted && (
        <div className="animate-in fade-in duration-700">
          {/* Top Bar Navigation */}
          <Navbar
            onOpenTerminal={() => setTerminalOpen(true)}
            soundEnabled={soundEnabled}
            onToggleSound={toggleSound}
            reducedMotion={reducedMotion}
            onToggleReducedMotion={() => setReducedMotion((prev) => !prev)}
            activeSection={activeSection}
          />

          <main>
            {/* 02 // Hero Section with 3D Neural Constellation */}
            <Hero
              onOpenTerminal={() => setTerminalOpen(true)}
              reducedMotion={reducedMotion}
            />

            {/* 03 // Selected Work (Cinematic Horizontal Gallery) */}
            <SelectedWork
              onSelectProject={(project) => {
                setSelectedProject(project);
              }}
            />

            {/* 05 // Engineering Evolution (Cinematic Scroll Story: Before AI -> With AI -> Engineer Decides) */}
            <EngineeringEvolution reducedMotion={reducedMotion} />

            {/* 05 // Engineering DNA (How I Think - Editorial Principles) */}
            <EngineeringDNA reducedMotion={reducedMotion} />

            {/* 06 // Engineering Stack (Interactive System Map) */}
            <EngineeringStack />

            {/* 07 // Engineering Timeline (Career Evolution) */}
            <EngineeringTimeline reducedMotion={reducedMotion} />

            {/* 08 // The Lab (Personal Engineering Laboratory) */}
            <TheLab
              reducedMotion={reducedMotion}
              onSelectExperiment={(exp) => {
                setSelectedExperiment(exp);
              }}
            />

            {/* 09 // Contact Section */}
            <ContactSection />
          </main>

          {/* Project Detail Deep-Dive Modal */}
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onOpenExperiment={(labId) => {
              const match = labExperiments.find((e) => e.id === labId);
              if (match) {
                setSelectedProject(null);
                setSelectedExperiment(match);
              }
            }}
          />

          {/* Lab Experiment Playground Modal */}
          <LabExperimentModal
            experiment={selectedExperiment}
            onClose={() => setSelectedExperiment(null)}
          />

          {/* Interactive Terminal Mode Modal */}
          <TerminalModal
            isOpen={terminalOpen}
            onClose={() => setTerminalOpen(false)}
            onOpenProject={(projectId) => {
              const match = projects.find((p) => p.id === projectId);
              if (match) setSelectedProject(match);
            }}
            onOpenLab={(labId) => {
              const match = labExperiments.find((e) => e.id === labId);
              if (match) setSelectedExperiment(match);
            }}
          />
        </div>
      )}
    </div>
  );
}
