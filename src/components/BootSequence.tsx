import React, { useState, useEffect } from 'react';
import { soundManager } from '../utils/audio';
import { clearVideoBlob } from '../utils/videoStorage';
import { useLanguage } from '../context/LanguageContext';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<'idle' | 'initializing' | 'finished'>('idle');
  const [initProgress, setInitProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const steps = [
    t.boot.phase1,
    t.boot.phase2,
    t.boot.phase3,
    t.boot.phase4,
  ];

  // Clean up any previously saved custom video in IndexedDB
  useEffect(() => {
    clearVideoBlob();
  }, []);

  const handleInitialize = () => {
    soundManager.playBoot();
    setPhase('initializing');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  useEffect(() => {
    if (phase !== 'initializing') return;

    const interval = setInterval(() => {
      setInitProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase('finished');
          setTimeout(() => {
            onComplete();
          }, 350);
          return 100;
        }
        const next = prev + 5;
        const stepIdx = Math.min(Math.floor((next / 100) * steps.length), steps.length - 1);
        setActiveStep(stepIdx);
        if (next % 20 === 0) {
          soundManager.playKeypress();
        }
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#010307] text-[#e0e0e8] select-none overflow-hidden">
      {/* Video Background */}
      <video
        src="/boot-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        onError={() => {
          // Gracefully keep canvas if video cannot play
          setVideoLoaded(false);
        }}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none scanline-bg opacity-15" />

      {/* Top Header Row */}
      <div className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12 text-xs font-montserrat tracking-wider text-cyan-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-semibold tracking-widest">&gt; DUC ANH_</span>
        </div>

        {/* Controls in top right */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onComplete();
            }}
            className="hover:text-cyan-300 transition-colors cursor-pointer text-slate-400 border border-white/10 hover:border-cyan-500/40 px-2.5 py-1 rounded text-[11px] font-montserrat tracking-wider bg-black/40"
            title="Skip Intro"
          >
            [ {t.boot.skip} ]
          </button>
        </div>
      </div>

      {/* FIXED: Compact terminal boot lines strictly on the top-left */}
      <div className="absolute left-6 md:left-12 top-20 z-20 hidden md:block w-fit max-w-[280px] font-montserrat text-[11px] text-slate-300/80 space-y-1.5 leading-relaxed tracking-wider pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        <div className="text-cyan-400 font-semibold">&gt; DUC ANH · PORTFOLIO</div>
        <div>&gt; FULL-STACK & AI SYSTEMS</div>
        <div>&gt; FEATURED PROJECTS READY</div>
        <div className="text-emerald-400 font-semibold">&gt; READY TO EXPLORE.</div>
      </div>

      {/* Center Stage Content */}
      <div className="relative z-20 my-auto text-center px-4 max-w-2xl mx-auto flex flex-col items-center">
        {phase === 'idle' ? (
          <>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-michroma tracking-[0.22em] text-white uppercase mb-4 drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]">
              DUC ANH
            </h1>

            <div className="text-xs md:text-sm tracking-[0.35em] text-cyan-400 font-montserrat uppercase mb-2 font-semibold drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
              SOFTWARE & AI SYSTEMS ENGINEER
            </div>

            <p className="text-[11px] md:text-xs tracking-[0.28em] text-slate-200 font-montserrat uppercase mb-10 font-medium drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]">
              FULL-STACK WEB · APPLIED AI · DISTRIBUTED SERVICES
            </p>

            <button
              onClick={handleInitialize}
              onMouseEnter={() => soundManager.playClick()}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 border border-cyan-400 bg-black/60 hover:bg-cyan-500/20 text-cyan-300 font-montserrat font-semibold text-xs md:text-sm tracking-[0.25em] rounded-sm transition-all duration-300 hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] cursor-pointer backdrop-blur-md"
            >
              <span>{t.boot.enter}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </>
        ) : (
          <div className="w-full max-w-md bg-black/80 border border-cyan-500/40 p-8 rounded-sm backdrop-blur-md shadow-[0_0_50px_rgba(6,182,212,0.3)] font-montserrat">
            <div className="text-xs text-cyan-400 tracking-[0.25em] mb-4 text-center font-bold">
              {t.boot.tagline}...
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-slate-800 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-75"
                style={{ width: `${initProgress}%` }}
              />
            </div>

            {/* Module Loading Steps */}
            <div className="space-y-2 text-xs text-left">
              {steps.map((step, idx) => {
                const isPassed = idx < activeStep;
                const isCurrent = idx === activeStep;
                return (
                  <div
                    key={step}
                    className={`flex items-center justify-between transition-colors duration-200 ${
                      isCurrent
                        ? 'text-cyan-300 font-medium'
                        : isPassed
                        ? 'text-slate-400'
                        : 'text-slate-600'
                    }`}
                  >
                    <span className="tracking-wider">{step}</span>
                    <span className="text-[10px] tracking-widest">
                      {isPassed ? '[ LOADED ]' : isCurrent ? '[ MOUNTING... ]' : '[ PENDING ]'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer Details */}
      <div className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12 text-[11px] font-montserrat tracking-[0.2em] text-slate-300">
        <div className="hidden sm:block">
          STATUS: <span className="text-emerald-400">ONLINE</span> · LATENCY: <span className="text-cyan-400">12ms</span>
        </div>
        <div className="mx-auto sm:mx-0 text-center tracking-[0.25em] text-slate-200">
          ENGINEER / SYSTEM / HUMAN
        </div>
        <div className="hidden sm:block">
          HANOI, VIETNAM (UTC+7)
        </div>
      </div>
    </div>
  );
};
