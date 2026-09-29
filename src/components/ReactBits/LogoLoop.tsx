import React, { useState } from 'react';

export interface LogoItem {
  id?: string;
  name: string;
  icon: React.ReactNode;
  category?: string;
}

interface LogoLoopProps {
  items: LogoItem[];
  speed?: number; // duration in seconds for one full loop
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  gap?: number; // gap between items in px
  fadeEdges?: boolean;
  className?: string;
}

export const LogoLoop: React.FC<LogoLoopProps> = ({
  items,
  speed = 40,
  direction = 'left',
  pauseOnHover = true,
  gap = 20,
  fadeEdges = true,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate items 4 times to ensure seamless infinite looping on all viewport widths
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
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none bg-gradient-to-r from-[#030407] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none bg-gradient-to-l from-[#030407] to-transparent" />
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
        {repeatedItems.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="group flex items-center gap-3.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl border border-white/[0.08] bg-[#070913]/90 hover:bg-[#0c1020] hover:border-cyan-500/40 hover:shadow-[0_0_22px_rgba(6,182,212,0.18)] transition-all duration-300 shrink-0 cursor-default"
          >
            {/* Authentic Tech Brand Icon */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
              {item.icon}
            </div>

            {/* Technology Name */}
            <span className="font-mono text-xs sm:text-sm font-medium tracking-tight text-slate-200 group-hover:text-white transition-colors whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

