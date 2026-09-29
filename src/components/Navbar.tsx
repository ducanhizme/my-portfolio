import React from 'react';
import { Volume2, VolumeX, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { Magnet } from './ReactBits';

interface NavbarProps {
  onOpenTerminal: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTerminal,
  soundEnabled,
  onToggleSound,
  reducedMotion,
  onToggleReducedMotion,
  activeSection,
}) => {
  const navItems = [
    { label: 'WORK', href: '#work' },
    { label: 'EVOLUTION', href: '#architecture' },
    { label: 'DNA', href: '#dna' },
    { label: 'STACK', href: '#stack' },
    { label: 'TIMELINE', href: '#timeline' },
    { label: 'LAB', href: '#lab' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#050507]/85 backdrop-blur-md border-b border-white/[0.07] transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Wordmark */}
        <a
          href="#hero"
          onClick={() => soundManager.playClick()}
          className="group flex items-center gap-3 text-sm md:text-base font-bold font-mono tracking-wider text-white hover:text-cyan-400 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
          <span>DUC ANH</span>
        </a>

        {/* Zone 2: Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-widest text-slate-400">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => soundManager.playClick()}
                className={`relative py-1 transition-colors hover:text-white ${
                  isActive ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              soundManager.playClick();
            }}
            className="p-2 text-slate-400 hover:text-cyan-300 hover:bg-white/5 rounded transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute audio' : 'Unmute audio'}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={() => {
              onToggleReducedMotion();
              soundManager.playClick();
            }}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono rounded border transition-colors cursor-pointer ${
              reducedMotion
                ? 'border-amber-500/40 text-amber-300 bg-amber-500/10'
                : 'border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
            }`}
            title="Toggle reduced motion"
          >
            <Sparkles size={12} />
            <span>{reducedMotion ? 'MOTION OFF' : 'CINEMATIC'}</span>
          </button>

          {/* Terminal Toggle Button with ReactBits Magnet */}
          <Magnet padding={35} magnetStrength={0.25} disabled={reducedMotion}>
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenTerminal();
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-300 rounded font-mono text-xs tracking-wider transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              <TerminalIcon size={13} />
              <span className="hidden sm:inline">TERMINAL</span>
              <span className="text-[10px] text-cyan-400/60 font-sans border border-cyan-500/30 px-1 rounded">⌘K</span>
            </button>
          </Magnet>
        </div>
      </div>
    </header>
  );
};
