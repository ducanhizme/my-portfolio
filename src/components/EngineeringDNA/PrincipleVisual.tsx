import React from 'react';

interface PrincipleVisualProps {
  type: 'systems' | 'abstraction' | 'automation' | 'measurement' | 'human';
  isActive: boolean;
  reducedMotion?: boolean;
}

export const PrincipleVisual: React.FC<PrincipleVisualProps> = ({
  type,
  isActive,
  reducedMotion = false,
}) => {
  const transitionClass = reducedMotion
    ? ''
    : 'transition-all duration-700 ease-out';

  if (type === 'systems') {
    // 01: Several simple rectangles gradually align into one coherent system
    return (
      <div className="w-full h-28 flex items-center justify-center">
        <svg
          viewBox="0 0 200 90"
          className="w-48 h-20 overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Alignment guide line */}
          <line
            x1="10"
            y1="45"
            x2="190"
            y2="45"
            stroke={isActive ? '#38bdf8' : '#334155'}
            strokeWidth="1"
            strokeDasharray="3 3"
            className={transitionClass}
            opacity={isActive ? 0.6 : 0.25}
          />

          {/* Block 1 (Left) */}
          <rect
            x={isActive ? 25 : 18}
            y={isActive ? 30 : 20}
            width="38"
            height="30"
            rx="1"
            stroke={isActive ? '#38bdf8' : '#64748b'}
            strokeWidth="1.2"
            fill={isActive ? 'rgba(56, 189, 248, 0.08)' : 'transparent'}
            className={transitionClass}
          />
          <text
            x={isActive ? 44 : 37}
            y={isActive ? 49 : 39}
            textAnchor="middle"
            fill={isActive ? '#e2e8f0' : '#475569'}
            fontSize="8"
            fontFamily="monospace"
            letterSpacing="0.05em"
            className={transitionClass}
          >
            DATA
          </text>

          {/* Block 2 (Center Core) */}
          <rect
            x="81"
            y={isActive ? 25 : 35}
            width="38"
            height="40"
            rx="1"
            stroke={isActive ? '#f8fafc' : '#64748b'}
            strokeWidth="1.5"
            fill={isActive ? 'rgba(255, 255, 255, 0.06)' : 'transparent'}
            className={transitionClass}
          />
          <text
            x="100"
            y={isActive ? 49 : 59}
            textAnchor="middle"
            fill={isActive ? '#ffffff' : '#64748b'}
            fontSize="9"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="0.05em"
            className={transitionClass}
          >
            LOGIC
          </text>

          {/* Block 3 (Right) */}
          <rect
            x={isActive ? 137 : 144}
            y={isActive ? 30 : 22}
            width="38"
            height="30"
            rx="1"
            stroke={isActive ? '#38bdf8' : '#64748b'}
            strokeWidth="1.2"
            fill={isActive ? 'rgba(56, 189, 248, 0.08)' : 'transparent'}
            className={transitionClass}
          />
          <text
            x={isActive ? 156 : 163}
            y={isActive ? 49 : 41}
            textAnchor="middle"
            fill={isActive ? '#e2e8f0' : '#475569'}
            fontSize="8"
            fontFamily="monospace"
            letterSpacing="0.05em"
            className={transitionClass}
          >
            STATE
          </text>

          {/* Integrated System Bracket */}
          <path
            d={
              isActive
                ? 'M 20 72 L 20 77 L 180 77 L 180 72'
                : 'M 30 72 L 30 75 L 170 75 L 170 72'
            }
            stroke={isActive ? '#38bdf8' : '#334155'}
            strokeWidth="1"
            fill="none"
            className={transitionClass}
            opacity={isActive ? 0.9 : 0.2}
          />
          <text
            x="100"
            y="87"
            textAnchor="middle"
            fill={isActive ? '#38bdf8' : '#475569'}
            fontSize="7"
            fontFamily="monospace"
            letterSpacing="0.15em"
            className={transitionClass}
          >
            {isActive ? 'INTEGRATED SYSTEM' : 'ISOLATED PIECES'}
          </text>
        </svg>
      </div>
    );
  }

  if (type === 'abstraction') {
    // 02: Layered transparent lines: SURFACE -> ABSTRACTION -> IMPLEMENTATION
    return (
      <div className="w-full h-28 flex items-center justify-center font-mono text-[10px]">
        <svg
          viewBox="0 0 200 90"
          className="w-48 h-20 overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Level 1: Surface */}
          <line
            x1="20"
            y1="20"
            x2="180"
            y2="20"
            stroke={isActive ? '#94a3b8' : '#475569'}
            strokeWidth="1"
            className={transitionClass}
          />
          <circle cx="20" cy="20" r="2.5" fill={isActive ? '#94a3b8' : '#334155'} />
          <text
            x="184"
            y="23"
            fill={isActive ? '#94a3b8' : '#475569'}
            fontSize="8"
            fontFamily="monospace"
            className={transitionClass}
          >
            SURFACE
          </text>

          {/* Connector down */}
          <line
            x1="100"
            y1="20"
            x2="100"
            y2="45"
            stroke={isActive ? '#38bdf8' : '#334155'}
            strokeWidth="1"
            strokeDasharray="2 2"
            className={transitionClass}
          />

          {/* Level 2: Abstraction (highlighted) */}
          <line
            x1={isActive ? '15' : '30'}
            y1="45"
            x2={isActive ? '185' : '170'}
            y2="45"
            stroke={isActive ? '#38bdf8' : '#334155'}
            strokeWidth={isActive ? '1.5' : '1'}
            className={transitionClass}
          />
          <circle
            cx="100"
            cy="45"
            r={isActive ? '3.5' : '2'}
            fill={isActive ? '#38bdf8' : '#334155'}
            className={transitionClass}
          />
          <text
            x="184"
            y="48"
            fill={isActive ? '#38bdf8' : '#334155'}
            fontSize="8"
            fontFamily="monospace"
            fontWeight="bold"
            className={transitionClass}
          >
            ABSTRACTION
          </text>

          {/* Connector down */}
          <line
            x1="100"
            y1="45"
            x2="100"
            y2="70"
            stroke={isActive ? '#38bdf8' : '#334155'}
            strokeWidth="1"
            strokeDasharray="2 2"
            className={transitionClass}
          />

          {/* Level 3: Implementation */}
          <line
            x1="20"
            y1="70"
            x2="180"
            y2="70"
            stroke={isActive ? '#cbd5e1' : '#334155'}
            strokeWidth="1"
            className={transitionClass}
          />
          <circle cx="180" cy="70" r="2.5" fill={isActive ? '#cbd5e1' : '#334155'} />
          <text
            x="184"
            y="73"
            fill={isActive ? '#cbd5e1' : '#334155'}
            fontSize="8"
            fontFamily="monospace"
            className={transitionClass}
          >
            IMPLEMENTATION
          </text>
        </svg>
      </div>
    );
  }

  if (type === 'automation') {
    // 03: Repeated dots become a streamlined vector arrow
    return (
      <div className="w-full h-28 flex items-center justify-center">
        <svg
          viewBox="0 0 200 90"
          className="w-48 h-20 overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top: Manual repetition before */}
          <g opacity={isActive ? 0.35 : 0.6} className={transitionClass}>
            <text x="18" y="24" fill="#64748b" fontSize="7" fontFamily="monospace">
              MANUAL
            </text>
            <circle cx="70" cy="22" r="2" fill="#64748b" />
            <circle cx="85" cy="22" r="2" fill="#64748b" />
            <circle cx="100" cy="22" r="2" fill="#64748b" />
            <circle cx="115" cy="22" r="2" fill="#64748b" />
            <circle cx="130" cy="22" r="2" fill="#64748b" />
            <circle cx="145" cy="22" r="2" fill="#64748b" />
          </g>

          {/* Transformation transition arrow */}
          <path
            d="M 100 32 L 100 42"
            stroke={isActive ? '#38bdf8' : '#334155'}
            strokeWidth="1"
            strokeDasharray="2 2"
            className={transitionClass}
          />

          {/* Bottom: Automated Vector Line */}
          <g className={transitionClass}>
            <text
              x="18"
              y="60"
              fill={isActive ? '#38bdf8' : '#475569'}
              fontSize="7"
              fontFamily="monospace"
              fontWeight="bold"
            >
              AUTOMATED
            </text>

            {/* Origin Node */}
            <circle
              cx="70"
              cy="58"
              r={isActive ? '3.5' : '2.5'}
              fill={isActive ? '#38bdf8' : '#475569'}
              className={transitionClass}
            />

            {/* Accelerated Arrow Line */}
            <line
              x1="70"
              y1="58"
              x2={isActive ? '175' : '130'}
              y2="58"
              stroke={isActive ? '#38bdf8' : '#475569'}
              strokeWidth={isActive ? '1.5' : '1'}
              className={transitionClass}
            />
            {/* Arrow Head */}
            <path
              d={
                isActive
                  ? 'M 170 54 L 176 58 L 170 62'
                  : 'M 125 55 L 130 58 L 125 61'
              }
              stroke={isActive ? '#38bdf8' : '#475569'}
              strokeWidth={isActive ? '1.5' : '1'}
              fill="none"
              className={transitionClass}
            />
          </g>

          <text
            x="100"
            y="80"
            textAnchor="middle"
            fill={isActive ? '#94a3b8' : '#334155'}
            fontSize="7"
            fontFamily="monospace"
            letterSpacing="0.1em"
            className={transitionClass}
          >
            {isActive ? 'REPEATED EFFORT → CODE ONCE' : 'REPETITIVE CYCLES'}
          </text>
        </svg>
      </div>
    );
  }

  if (type === 'measurement') {
    // 04: Signal waveform with one highlighted bottleneck peak
    return (
      <div className="w-full h-28 flex items-center justify-center">
        <svg
          viewBox="0 0 200 90"
          className="w-48 h-20 overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Baseline axis */}
          <line
            x1="15"
            y1="52"
            x2="185"
            y2="52"
            stroke="#1e293b"
            strokeWidth="1"
          />

          {/* Telemetry wave */}
          <path
            d="M 15 52 L 40 52 L 50 42 L 58 56 L 66 52 L 95 52 L 105 18 L 115 62 L 125 52 L 155 52 L 163 46 L 170 54 L 185 52"
            stroke={isActive ? '#94a3b8' : '#475569'}
            strokeWidth="1.2"
            fill="none"
            className={transitionClass}
          />

          {/* Highlighted Peak at x=105, y=18 (Bottleneck) */}
          {isActive && (
            <g className="animate-in fade-in duration-500">
              {/* Vertical measurement caliper */}
              <line
                x1="105"
                y1="10"
                x2="105"
                y2="75"
                stroke="#38bdf8"
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.8"
              />
              <circle cx="105" cy="18" r="3.5" fill="#38bdf8" />
              <circle
                cx="105"
                cy="18"
                r="6"
                stroke="#38bdf8"
                strokeWidth="1"
                fill="none"
                opacity="0.5"
                className="animate-ping"
              />

              <rect
                x="80"
                y="6"
                width="50"
                height="12"
                rx="1"
                fill="#020617"
                stroke="#38bdf8"
                strokeWidth="0.8"
              />
              <text
                x="105"
                y="15"
                textAnchor="middle"
                fill="#38bdf8"
                fontSize="7"
                fontFamily="monospace"
                fontWeight="bold"
              >
                BOTTLENECK
              </text>
            </g>
          )}

          <text
            x="100"
            y="82"
            textAnchor="middle"
            fill={isActive ? '#38bdf8' : '#475569'}
            fontSize="7"
            fontFamily="monospace"
            letterSpacing="0.1em"
            className={transitionClass}
          >
            {isActive ? 'MEASURED DELTA: 142ms' : 'UNMEASURED INTUITION'}
          </text>
        </svg>
      </div>
    );
  }

  // 05: System line ending at HUMAN
  return (
    <div className="w-full h-28 flex items-center justify-center">
      <svg
        viewBox="0 0 200 90"
        className="w-48 h-20 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Branching flow from System into Human */}
        <path
          d="M 20 30 L 50 30 L 70 45 L 120 45"
          stroke={isActive ? '#64748b' : '#334155'}
          strokeWidth="1"
          fill="none"
          className={transitionClass}
        />
        <path
          d="M 20 60 L 50 60 L 70 45"
          stroke={isActive ? '#64748b' : '#334155'}
          strokeWidth="1"
          fill="none"
          className={transitionClass}
        />

        <text
          x="20"
          y="24"
          fill={isActive ? '#64748b' : '#334155'}
          fontSize="7"
          fontFamily="monospace"
          className={transitionClass}
        >
          ALGORITHMS
        </text>
        <text
          x="20"
          y="72"
          fill={isActive ? '#64748b' : '#334155'}
          fontSize="7"
          fontFamily="monospace"
          className={transitionClass}
        >
          INFRASTRUCTURE
        </text>

        {/* Junction pip */}
        <circle cx="70" cy="45" r="2.5" fill={isActive ? '#94a3b8' : '#334155'} />

        {/* Pipeline to Human */}
        <line
          x1="70"
          y1="45"
          x2={isActive ? '135' : '110'}
          y2="45"
          stroke={isActive ? '#38bdf8' : '#475569'}
          strokeWidth={isActive ? '1.5' : '1'}
          className={transitionClass}
        />

        {/* Human Node Destination */}
        <g
          transform={isActive ? 'translate(142, 45)' : 'translate(125, 45)'}
          className={transitionClass}
        >
          <circle
            cx="0"
            cy="0"
            r={isActive ? '12' : '8'}
            fill={isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent'}
            stroke={isActive ? '#ffffff' : '#475569'}
            strokeWidth={isActive ? '1.5' : '1'}
            className={transitionClass}
          />
          <text
            x="0"
            y="3"
            textAnchor="middle"
            fill={isActive ? '#ffffff' : '#64748b'}
            fontSize="8"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="0.05em"
          >
            HUMAN
          </text>
        </g>

        <text
          x="100"
          y="80"
          textAnchor="middle"
          fill={isActive ? '#38bdf8' : '#475569'}
          fontSize="7"
          fontFamily="monospace"
          letterSpacing="0.1em"
          className={transitionClass}
        >
          {isActive ? 'SYSTEM SERVES THE PERSON' : 'TECH FOR TECH SAKE'}
        </text>
      </svg>
    </div>
  );
};
