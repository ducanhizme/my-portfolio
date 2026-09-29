import React, { useState } from 'react';

export interface LogoItem {
  id?: string;
  name: string;
  category?: string;
  role?: string;
  icon?: React.ReactNode;
  level?: number;
  highlight?: string;
  usedFor?: string[];
  architectureNote?: string;
}

interface LogoLoopProps {
  items: LogoItem[];
  speed?: number; // duration in seconds for one full loop
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  gap?: number; // gap between items in px
  fadeEdges?: boolean;
  activeItemId?: string;
  onItemSelect?: (item: LogoItem) => void;
  className?: string;
}

export const LogoLoop: React.FC<LogoLoopProps> = ({
  items,
  speed = 40,
  direction = 'left',
  pauseOnHover = true,
  gap = 20,
  fadeEdges = true,
  activeItemId,
  onItemSelect,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate items 4 times to ensure an unbroken, infinite seamless scrolling ribbon on any screen size
  const repeatedItems = [...items, ...items, ...items, ...items];

  const animationName = direction === 'left' ? 'logoLoopScrollLeft' : 'logoLoopScrollRight';

  return (
    <div
      className={`relative w-full overflow-hidden select-none py-2 ${className}`}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
    >
      {/* Seamless Edge Gradient Fade Masks (ReactBits signature fadeEdges) */}
      {fadeEdges && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-r from-[#030407] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-l from-[#030407] to-transparent" />
        </>
      )}

      {/* Inline styles for the infinite CSS marquee animation */}
      <style>{`
        @keyframes logoLoopScrollLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes logoLoopScrollRight {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>

      {/* Marquee Track */}
      <div
        className="flex w-max items-center"
        style={{
          gap: `${gap}px`,
          animation: `${animationName} ${speed}s linear infinite`,
          animationPlayState: isHovered ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {repeatedItems.map((item, index) => {
          const isSelected = activeItemId === (item.id || item.name);

          return (
            <button
              key={`${item.name}-${index}`}
              onClick={() => onItemSelect?.(item)}
              className={`group flex items-center gap-3 px-4 py-2.5 rounded-sm border font-mono text-xs transition-all duration-200 cursor-pointer shrink-0 ${
                isSelected
                  ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400/50'
                  : 'bg-[#080a12]/80 border-white/[0.08] text-slate-300 hover:text-white hover:border-cyan-400/60 hover:bg-[#0c101d] hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]'
              }`}
            >
              {/* Technology Icon / Glyph */}
              <div
                className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'bg-cyan-400/20 text-cyan-300'
                    : 'bg-white/[0.05] text-slate-400 group-hover:text-cyan-300 group-hover:bg-cyan-500/10'
                }`}
              >
                {item.icon}
              </div>

              {/* Name & Subtitle */}
              <div className="flex flex-col text-left">
                <span className="font-bold tracking-wide text-xs group-hover:text-white transition-colors">
                  {item.name}
                </span>
                {item.category && (
                  <span className="text-[10px] text-slate-500 group-hover:text-cyan-400/70 transition-colors uppercase tracking-wider">
                    {item.category}
                  </span>
                )}
              </div>

              {/* Active Pip */}
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping ml-1" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
