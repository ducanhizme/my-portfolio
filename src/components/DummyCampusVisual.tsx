import React from 'react';

interface DummyCampusVisualProps {
  title?: string;
  projectBadge?: string;
  className?: string;
}

export const DummyCampusVisual: React.FC<DummyCampusVisualProps> = ({
  title = 'TRƯỜNG ĐẠI HỌC MỞ HÀ NỘI',
  projectBadge = 'HIVE KMS DEPLOYMENT NODE',
  className = '',
}) => {
  return (
    <div className={`relative w-full h-full min-h-[320px] lg:min-h-[420px] bg-gradient-to-b from-slate-900 to-[#070b14] overflow-hidden rounded-sm border border-cyan-500/20 group ${className}`}>
      {/* Sky & Atmospheric Lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f] via-[#0f172a] to-[#030712] opacity-90" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-3xl pointer-events-none" />

      {/* Blueprint Grid Lines */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />

      {/* Architectural Campus Silhouette & Facade */}
      <svg
        className="absolute inset-0 w-full h-full object-cover"
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="facadeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#082f49" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>

        {/* Backdrop Sky Horizon */}
        <rect width="800" height="500" fill="url(#skyGrad)" opacity="0.6" />

        {/* Distant building blocks */}
        <path d="M40 280 L180 280 L180 440 L40 440 Z" fill="#0f172a" opacity="0.7" />
        <path d="M640 260 L780 260 L780 440 L640 440 Z" fill="#0f172a" opacity="0.7" />

        {/* Main University Building Facade */}
        <path
          d="M120 180 L680 180 L680 420 L120 420 Z"
          fill="url(#facadeGrad)"
          stroke="#334155"
          strokeWidth="1.5"
        />

        {/* Classical / Modern Pillars Architecture */}
        <g stroke="#475569" strokeWidth="1" fill="#1e293b">
          {/* Columns */}
          <rect x="160" y="240" width="16" height="180" />
          <rect x="220" y="240" width="16" height="180" />
          <rect x="280" y="240" width="16" height="180" />
          <rect x="340" y="240" width="16" height="180" />
          <rect x="444" y="240" width="16" height="180" />
          <rect x="504" y="240" width="16" height="180" />
          <rect x="564" y="240" width="16" height="180" />
          <rect x="624" y="240" width="16" height="180" />

          {/* Pediment / Top Architrave */}
          <rect x="130" y="210" width="540" height="30" fill="#334155" />
          <polygon points="400,130 140,210 660,210" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
        </g>

        {/* Central University Emblem Seal */}
        <circle cx="400" cy="180" r="22" fill="#0284c7" opacity="0.4" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="400" cy="180" r="16" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
        <text x="400" y="184" fill="#e0f2fe" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
          HOU
        </text>

        {/* Windows Grid with Realistic Reflections */}
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 8 }).map((__, col) => {
            const wx = 175 + col * 58;
            const wy = 260 + row * 24;
            if (wx >= 370 && wx <= 430) return null; // Center entrance
            return (
              <rect
                key={`${row}-${col}`}
                x={wx}
                y={wy}
                width="28"
                height="16"
                fill="url(#glassGrad)"
                stroke="#0284c7"
                strokeWidth="0.5"
                opacity="0.85"
              />
            );
          })
        )}

        {/* Central Grand Entrance */}
        <path d="M360 330 L440 330 L440 420 L360 420 Z" fill="#020617" stroke="#38bdf8" strokeWidth="1" />
        <path d="M375 350 L425 350 L425 420 L375 420 Z" fill="#0369a1" opacity="0.3" />

        {/* Campus Courtyard Ground with Perspective */}
        <polygon points="0,420 800,420 800,500 0,500" fill="#090d16" stroke="#1e293b" strokeWidth="1" />
        <line x1="400" y1="420" x2="400" y2="500" stroke="#334155" strokeDasharray="4 4" />
        <line x1="200" y1="420" x2="0" y2="500" stroke="#334155" strokeDasharray="4 4" />
        <line x1="600" y1="420" x2="800" y2="500" stroke="#334155" strokeDasharray="4 4" />

        {/* Subtle trees and greenery silhouettes */}
        <circle cx="80" cy="400" r="35" fill="#064e3b" opacity="0.6" />
        <circle cx="110" cy="410" r="28" fill="#047857" opacity="0.4" />
        <circle cx="720" cy="400" r="35" fill="#064e3b" opacity="0.6" />
        <circle cx="690" cy="410" r="28" fill="#047857" opacity="0.4" />

        {/* Scan / Target reticle overlay */}
        <circle cx="400" cy="280" r="40" fill="none" stroke="#38bdf8" strokeWidth="0.75" strokeDasharray="6 4" opacity="0.7" />
        <line x1="340" y1="280" x2="460" y2="280" stroke="#38bdf8" strokeWidth="0.5" opacity="0.5" />
        <line x1="400" y1="220" x2="400" y2="340" stroke="#38bdf8" strokeWidth="0.5" opacity="0.5" />
      </svg>

      {/* Floating Institutional Banner Tag matching photo reference */}
      <div className="absolute top-6 left-6 z-10 bg-black/80 backdrop-blur-md border border-cyan-500/30 px-3.5 py-1.5 rounded text-left">
        <div className="text-[10px] font-mono text-cyan-400 tracking-wider">
          {projectBadge}
        </div>
        <div className="text-xs md:text-sm font-semibold text-white tracking-wide font-sans">
          {title}
        </div>
      </div>

      {/* Target Crosshairs in corner */}
      <div className="absolute bottom-6 right-6 z-10 font-mono text-[10px] text-cyan-400/80 bg-black/60 px-2 py-1 rounded border border-white/10 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>NODE: PRODUCTION_CAMPUS_ONLINE</span>
      </div>
    </div>
  );
};
