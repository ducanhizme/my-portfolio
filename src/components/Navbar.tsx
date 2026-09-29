import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal as TerminalIcon, Languages } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { Magnet } from './ReactBits';
import { useLanguage } from '../context/LanguageContext';

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
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.work, href: '#work', key: 'work' },
    { label: t.nav.evolution, href: '#architecture', key: 'architecture' },
    { label: t.nav.dna, href: '#dna', key: 'dna' },
    { label: t.nav.stack, href: '#stack', key: 'stack' },
    { label: t.nav.timeline, href: '#timeline', key: 'timeline' },
    { label: t.nav.contact, href: '#contact', key: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050507]/90 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/40'
          : 'bg-gradient-to-b from-[#02040A]/80 via-[#02040A]/30 to-transparent border-b border-transparent'
      }`}
    >
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
            const isActive = activeSection === item.key;
            return (
              <a
                key={item.key}
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
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => {
              soundManager.playClick();
              toggleLanguage();
            }}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded border border-white/10 hover:border-cyan-400/50 bg-white/[0.03] hover:bg-cyan-950/30 text-xs font-mono transition-all cursor-pointer"
            title={t.nav.toggleLang}
            aria-label="Switch Language"
          >
            <Languages size={12} className="text-cyan-400 mr-0.5" />
            <span className={language === 'en' ? 'text-cyan-400 font-bold' : 'text-slate-400'}>EN</span>
            <span className="text-white/20">/</span>
            <span className={language === 'vi' ? 'text-cyan-400 font-bold' : 'text-slate-400'}>VI</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              soundManager.playClick();
            }}
            className="p-2 text-slate-400 hover:text-cyan-300 hover:bg-white/5 rounded transition-colors cursor-pointer"
            title={soundEnabled ? t.nav.mute : t.nav.unmute}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
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
              <span className="hidden sm:inline">{t.nav.terminal}</span>
              <span className="text-[10px] text-cyan-400/60 font-sans border border-cyan-500/30 px-1 rounded">⌘K</span>
            </button>
          </Magnet>
        </div>
      </div>
    </header>
  );
};
