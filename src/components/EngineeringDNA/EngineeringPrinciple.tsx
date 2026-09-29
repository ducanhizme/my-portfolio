import React, { useRef, useState, useEffect } from 'react';
import { PrincipleItem } from './data';
import { PrincipleVisual } from './PrincipleVisual';

interface EngineeringPrincipleProps {
  principle: PrincipleItem;
  reducedMotion?: boolean;
}

export const EngineeringPrinciple: React.FC<EngineeringPrincipleProps> = ({
  principle,
  reducedMotion = false,
}) => {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!rowRef.current) return;

    // Detect when this principle is centered in the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsActive(entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -25% 0px', // Active when within the center 55% of the screen
        threshold: 0.2,
      }
    );

    observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  const transitionClass = reducedMotion
    ? ''
    : 'transition-all duration-700 ease-out';

  return (
    <article
      ref={rowRef}
      className={`relative py-16 sm:py-24 border-t border-white/[0.08] ${transitionClass} ${
        isActive ? 'opacity-100' : 'opacity-40'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Number & Subtle Anchor */}
        <div className="lg:col-span-2 flex items-center lg:items-start gap-3">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isActive ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'
              } ${transitionClass}`}
            />
            <span
              className={`text-sm sm:text-base font-bold ${
                isActive ? 'text-cyan-300' : 'text-slate-500'
              } ${transitionClass}`}
            >
              {principle.number}
            </span>
          </div>
        </div>

        {/* Middle Column: Editorial Title & Supporting Text */}
        <div className="lg:col-span-6 space-y-4">
          {/* Micro Metadata */}
          <div
            className={`font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase ${
              isActive ? 'text-cyan-400/90' : 'text-slate-600'
            } ${transitionClass}`}
          >
            {principle.microSummary}
          </div>

          {/* Principle Headline */}
          <h3
            className={`text-2xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight leading-[1.08] whitespace-pre-line ${
              isActive ? 'text-white' : 'text-slate-400'
            } ${transitionClass}`}
          >
            {principle.title}
          </h3>

          {/* Supporting Copy */}
          <p
            className={`text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-xl ${
              isActive ? 'text-slate-300' : 'text-slate-500'
            } ${transitionClass}`}
          >
            {principle.supporting}
          </p>
        </div>

        {/* Right Column: Micro Visual Metaphor */}
        <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
          <div
            className={`w-full max-w-xs ${transitionClass} ${
              isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
            }`}
          >
            <PrincipleVisual
              type={principle.visual}
              isActive={isActive}
              reducedMotion={reducedMotion}
            />
          </div>
        </div>
      </div>
    </article>
  );
};
