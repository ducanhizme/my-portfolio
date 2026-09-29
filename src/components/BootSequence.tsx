import React, { useState, useEffect, useRef } from 'react';
import { CosmicBootVisual } from './CosmicBootVisual';
import { soundManager } from '../utils/audio';
import { loadVideoUrl, saveVideoBlob } from '../utils/videoStorage';
import { Upload, Film } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'idle' | 'initializing' | 'finished'>('idle');
  const [initProgress, setInitProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  // Default to the generated /boot-video.mp4
  const [videoSrc, setVideoSrc] = useState<string | null>('/boot-video.mp4');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const steps = [
    '01  EXPERIENCE',
    '02  ENGINEERING',
    '03  AI SYSTEMS',
    '04  EXPERIMENTS',
    '05  ABOUT',
  ];

  // Check if user previously saved a custom video in IndexedDB
  useEffect(() => {
    loadVideoUrl().then((cachedUrl) => {
      if (cachedUrl) {
        setVideoSrc(cachedUrl);
      }
    });
  }, []);

  const handleInitialize = () => {
    soundManager.playBoot();
    setPhase('initializing');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      await saveVideoBlob(file);
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setVideoLoaded(false);
      soundManager.playInspect();
    }
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
      {/* Layer 1: Base Canvas Fallback (always rendered to prevent any blank screen) */}
      <CosmicBootVisual />

      {/* Layer 2: Default MP4 Video Player */}
      {videoSrc && (
        <video
          src={videoSrc}
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
      )}

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none scanline-bg opacity-15" />

      {/* Top Header Row */}
      <div className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12 text-xs font-mono text-cyan-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-bold tracking-wider">&gt; DUC ANH_</span>
        </div>

        {/* Quiet controls in top right */}
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/40 border border-white/10 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 text-[11px] transition-colors cursor-pointer"
            title="Replace default MP4 with custom video"
          >
            <Film size={12} className="text-cyan-400" />
            <span>MP4 VIDEO</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onComplete();
            }}
            className="hover:text-cyan-300 transition-colors cursor-pointer text-slate-400 border border-white/10 hover:border-cyan-500/40 px-2.5 py-1 rounded text-[11px] bg-black/40"
            title="Bypass Intro"
          >
            [ ESC to bypass ]
          </button>
        </div>
      </div>

      {/* FIXED: Compact terminal boot lines strictly on the top-left (no wide horizontal bar) */}
      <div className="absolute left-6 md:left-12 top-20 z-20 hidden md:block w-fit max-w-[260px] font-mono text-[11px] text-slate-300/80 space-y-1 leading-relaxed pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        <div className="text-cyan-400 font-semibold">&gt; INITIALIZING SYSTEM....</div>
        <div>&gt; LOADING EXPERIENCE....</div>
        <div>&gt; LOADING PROJECTS....</div>
        <div>&gt; LOADING AI MODULES....</div>
        <div className="text-emerald-400 font-semibold">&gt; READY.</div>
      </div>

      {/* Center Stage Content */}
      <div className="relative z-20 my-auto text-center px-4 max-w-2xl mx-auto flex flex-col items-center">
        {phase === 'idle' ? (
          <>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.25em] text-white font-mono uppercase mb-4 drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]">
              DUC ANH
            </h1>

            <div className="text-xs md:text-sm tracking-[0.35em] text-cyan-400 font-mono uppercase mb-2 font-medium drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
              SOFTWARE ENGINEER
            </div>

            <p className="text-[11px] md:text-xs tracking-[0.28em] text-slate-200 font-mono uppercase mb-10 drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]">
              AI / AGENT SYSTEMS / WEB
            </p>

            <button
              onClick={handleInitialize}
              onMouseEnter={() => soundManager.playClick()}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 border border-cyan-400 bg-black/60 hover:bg-cyan-500/20 text-cyan-300 font-mono text-xs md:text-sm tracking-[0.2em] rounded-sm transition-all duration-300 hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] cursor-pointer backdrop-blur-md"
            >
              <span>INITIALIZE</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </>
        ) : (
          <div className="w-full max-w-md bg-black/80 border border-cyan-500/40 p-8 rounded-sm backdrop-blur-md shadow-[0_0_50px_rgba(6,182,212,0.3)]">
            <div className="text-xs font-mono text-cyan-400 tracking-[0.25em] mb-4 text-center font-bold">
              SYSTEM INITIALIZING...
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-slate-800 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-75"
                style={{ width: `${initProgress}%` }}
              />
            </div>

            {/* Module Loading Steps */}
            <div className="space-y-2 font-mono text-xs text-left">
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
                    <span>{step}</span>
                    <span className="text-[10px]">
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
      <div className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12 text-[11px] font-mono text-slate-300">
        <div className="hidden sm:block">
          STATUS: <span className="text-emerald-400">ONLINE</span> · LATENCY: <span className="text-cyan-400">12ms</span>
        </div>
        <div className="mx-auto sm:mx-0 text-center tracking-widest text-slate-200">
          ENGINEER / SYSTEM / HUMAN
        </div>
        <div className="hidden sm:block">
          HANOI, VIETNAM (UTC+7)
        </div>
      </div>
    </div>
  );
};
