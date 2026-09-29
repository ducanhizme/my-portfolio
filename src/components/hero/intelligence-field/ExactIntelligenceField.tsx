import React, { useRef, useState, useEffect, useMemo } from 'react';
import { EXACT_NODES, EXACT_CONNECTIONS, ExactNode } from './networkData';
import { soundManager } from '../../../utils/audio';

interface ExactIntelligenceFieldProps {
  reducedMotion?: boolean;
  className?: string;
  onSelectTag?: (tag: string) => void;
}

interface PulseState {
  id: number;
  sourceIdx: number;
  targetIdx: number;
  progress: number;
  speed: number;
}

export const ExactIntelligenceField: React.FC<ExactIntelligenceFieldProps> = ({
  reducedMotion = false,
  className = '',
  onSelectTag,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeHoverNode, setActiveHoverNode] = useState<string | null>(null);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  // Parallax coordinates (-1 to 1)
  const [smoothParallax, setSmoothParallax] = useState({ x: 0, y: 0 });

  // Pre-index nodes for rapid lookup
  const nodeMap = useMemo(() => {
    const map = new Map<string, ExactNode>();
    EXACT_NODES.forEach((n) => map.set(n.id, n));
    return map;
  }, []);

  // Traveling pulses state
  const [pulses, setPulses] = useState<PulseState[]>([
    { id: 1, sourceIdx: 0, targetIdx: 4, progress: 0.1, speed: 0.25 },
    { id: 2, sourceIdx: 1, targetIdx: 8, progress: 0.6, speed: 0.32 },
    { id: 3, sourceIdx: 2, targetIdx: 5, progress: 0.3, speed: 0.22 },
  ]);

  // Track mouse coordinates for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x: nx, y: ny });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth lerp parallax loop
  useEffect(() => {
    if (reducedMotion) return;
    let animId: number;

    const tick = () => {
      setSmoothParallax((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.05,
        y: prev.y + (mousePos.y - prev.y) * 0.05,
      }));

      // Update energy pulses
      setPulses((prevPulses) =>
        prevPulses.map((p) => {
          let nextProg = p.progress + 0.006 * p.speed * 60;
          let nextSrc = p.sourceIdx;
          let nextTgt = p.targetIdx;

          if (nextProg >= 1) {
            nextProg = 0;
            // Pick next connection
            const randConn =
              EXACT_CONNECTIONS[Math.floor(Math.random() * EXACT_CONNECTIONS.length)];
            const srcIdx = EXACT_NODES.findIndex((n) => n.id === randConn.source);
            const tgtIdx = EXACT_NODES.findIndex((n) => n.id === randConn.target);
            if (srcIdx !== -1 && tgtIdx !== -1) {
              nextSrc = srcIdx;
              nextTgt = tgtIdx;
            }
          }
          return {
            ...p,
            progress: nextProg,
            sourceIdx: nextSrc,
            targetIdx: nextTgt,
          };
        })
      );

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [mousePos, reducedMotion]);

  // Convert percentage coordinates to 1920x1080 viewBox coordinates
  const toCoords = (node: ExactNode) => {
    return {
      x: (node.x / 100) * 1920,
      y: (node.y / 100) * 1080,
    };
  };

  // Parallax translation offset (max 15px)
  const pxOffset = reducedMotion ? 0 : smoothParallax.x * 12;
  const pyOffset = reducedMotion ? 0 : smoothParallax.y * 10;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: `translate3d(${pxOffset}px, ${pyOffset}px, 0)`,
          transition: reducedMotion ? 'none' : 'transform 0.1s ease-out',
        }}
      >
        <defs>
          {/* Intense radiant halo for HUB RAG */}
          <radialGradient id="ragMajorGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="15%" stopColor="#7dd3fc" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#0284c7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
          </radialGradient>

          {/* Standard hub halo */}
          <radialGradient id="hubHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#0284c7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          {/* Soft cosmic glow for far right nodes */}
          <radialGradient id="cosmicSoftGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#bae6fd" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ================================================== */}
        {/* 1. CONNECTION LINES & RADIATING SPOKES             */}
        {/* ================================================== */}
        <g stroke="#38bdf8" strokeLinecap="round">
          {EXACT_CONNECTIONS.map((conn, idx) => {
            const src = nodeMap.get(conn.source);
            const tgt = nodeMap.get(conn.target);
            if (!src || !tgt) return null;

            const sc = toCoords(src);
            const tc = toCoords(tgt);

            const isHighlighted =
              activeHoverNode === src.id || activeHoverNode === tgt.id;

            return (
              <line
                key={`line-${idx}`}
                x1={sc.x}
                y1={sc.y}
                x2={tc.x}
                y2={tc.y}
                stroke={isHighlighted ? '#e0f2fe' : conn.isImportant ? '#7dd3fc' : '#38bdf8'}
                strokeWidth={isHighlighted ? 1.4 : conn.isImportant ? 1.0 : 0.75}
                strokeOpacity={isHighlighted ? 0.9 : conn.isImportant ? 0.55 : 0.3}
                filter="url(#neonGlow)"
              />
            );
          })}
        </g>

        {/* Lines connecting Hubs to HUD tag boxes */}
        {/* Agent tag line */}
        <line
          x1={(68.8 / 100) * 1920}
          y1={(7.5 / 100) * 1080}
          x2={(68.8 / 100) * 1920 + 70}
          y2={(7.5 / 100) * 1080}
          stroke="#7dd3fc"
          strokeWidth="0.8"
          strokeOpacity="0.5"
          strokeDasharray="3 3"
        />
        {/* RAG tag line */}
        <line
          x1={(79.8 / 100) * 1920}
          y1={(37.0 / 100) * 1080}
          x2={(79.8 / 100) * 1920 + 130}
          y2={(37.0 / 100) * 1080 - 45}
          stroke="#7dd3fc"
          strokeWidth="0.8"
          strokeOpacity="0.5"
          strokeDasharray="3 3"
        />
        {/* Systems tag line */}
        <line
          x1={(67.5 / 100) * 1920}
          y1={(69.0 / 100) * 1080}
          x2={(67.5 / 100) * 1920 + 75}
          y2={(69.0 / 100) * 1080 - 38}
          stroke="#7dd3fc"
          strokeWidth="0.8"
          strokeOpacity="0.5"
          strokeDasharray="3 3"
        />

        {/* ================================================== */}
        {/* 2. TRAVELING ENERGY PULSES (Information Flow)      */}
        {/* ================================================== */}
        {!reducedMotion &&
          pulses.map((p) => {
            const src = EXACT_NODES[p.sourceIdx];
            const tgt = EXACT_NODES[p.targetIdx];
            if (!src || !tgt) return null;

            const sc = toCoords(src);
            const tc = toCoords(tgt);

            const cx = sc.x + (tc.x - sc.x) * p.progress;
            const cy = sc.y + (tc.y - sc.y) * p.progress;

            return (
              <g key={`pulse-${p.id}`}>
                <circle
                  cx={cx}
                  cy={cy}
                  r="2.5"
                  fill="#ffffff"
                  filter="url(#neonGlow)"
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r="6"
                  fill="#38bdf8"
                  opacity="0.5"
                />
              </g>
            );
          })}

        {/* ================================================== */}
        {/* 3. NODES & CONCENTRIC GEOMETRIC RINGS              */}
        {/* ================================================== */}
        {EXACT_NODES.map((node) => {
          const { x, y } = toCoords(node);
          const isHovered = activeHoverNode === node.id;

          // HUB RAG: Major Radiant Star
          if (node.importance === 'major_hub') {
            return (
              <g
                key={node.id}
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={() => {
                  setActiveHoverNode(node.id);
                  soundManager.playClick();
                }}
                onMouseLeave={() => setActiveHoverNode(null)}
              >
                {/* Wide radiant corona bloom */}
                <circle cx={x} cy={y} r="65" fill="url(#ragMajorGlow)" opacity="0.85" />
                <circle cx={x} cy={y} r="35" fill="url(#ragMajorGlow)" opacity="0.95" />

                {/* Concentric HUD ring (matching image.png) */}
                <circle
                  cx={x}
                  cy={y}
                  r={node.ringRadius || 26}
                  fill="none"
                  stroke="#7dd3fc"
                  strokeWidth="1.2"
                  strokeOpacity="0.75"
                />

                {/* Core bright white center */}
                <circle cx={x} cy={y} r="5.5" fill="#ffffff" filter="url(#neonGlow)" />
                <circle cx={x} cy={y} r="2.5" fill="#e0f2fe" />
              </g>
            );
          }

          // HUB AGENT & HUB SYSTEMS
          if (node.importance === 'hub') {
            return (
              <g
                key={node.id}
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={() => {
                  setActiveHoverNode(node.id);
                  soundManager.playClick();
                }}
                onMouseLeave={() => setActiveHoverNode(null)}
              >
                {/* Glow halo */}
                <circle cx={x} cy={y} r="38" fill="url(#hubHalo)" opacity="0.75" />

                {/* Double ring for SYSTEMS hub (matching image.png) */}
                {node.hasDoubleRing ? (
                  <>
                    <circle
                      cx={x}
                      cy={y}
                      r="12"
                      fill="none"
                      stroke="#7dd3fc"
                      strokeWidth="1.0"
                      strokeOpacity="0.8"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="22"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="0.8"
                      strokeOpacity="0.5"
                    />
                  </>
                ) : (
                  /* Single concentric ring for AGENT hub */
                  <circle
                    cx={x}
                    cy={y}
                    r={node.ringRadius || 18}
                    fill="none"
                    stroke="#7dd3fc"
                    strokeWidth="1.0"
                    strokeOpacity="0.7"
                  />
                )}

                {/* Core center */}
                <circle cx={x} cy={y} r="4" fill="#ffffff" filter="url(#neonGlow)" />
                <circle cx={x} cy={y} r="2" fill="#bae6fd" />
              </g>
            );
          }

          // Large glowing cosmic nodes on the far right
          if (node.isLargeGlow) {
            return (
              <g key={node.id}>
                <circle cx={x} cy={y} r="45" fill="url(#cosmicSoftGlow)" opacity="0.85" />
                <circle cx={x} cy={y} r="18" fill="url(#cosmicSoftGlow)" opacity="0.95" />
                <circle cx={x} cy={y} r="4" fill="#ffffff" filter="url(#neonGlow)" />
              </g>
            );
          }

          // Nodes with concentric target rings (West Ring, Planet West, Mid Upper)
          if (node.hasRing) {
            return (
              <g
                key={node.id}
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={() => {
                  setActiveHoverNode(node.id);
                  soundManager.playKeypress();
                }}
                onMouseLeave={() => setActiveHoverNode(null)}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={node.ringRadius || 14}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="0.9"
                  strokeOpacity="0.65"
                />
                <circle cx={x} cy={y} r="18" fill="url(#hubHalo)" opacity="0.4" />
                <circle cx={x} cy={y} r="3" fill="#ffffff" filter="url(#neonGlow)" />
                <circle cx={x} cy={y} r="1.5" fill="#bae6fd" />
              </g>
            );
          }

          // Standard and minor nodes
          const isStandard = node.importance === 'standard';
          return (
            <g
              key={node.id}
              className="cursor-pointer pointer-events-auto"
              onMouseEnter={() => {
                setActiveHoverNode(node.id);
              }}
              onMouseLeave={() => setActiveHoverNode(null)}
            >
              <circle
                cx={x}
                cy={y}
                r={isStandard ? 10 : 6}
                fill="#38bdf8"
                opacity={isHovered ? 0.4 : isStandard ? 0.2 : 0.1}
              />
              <circle
                cx={x}
                cy={y}
                r={isStandard ? 2.5 : 1.8}
                fill={isHovered ? '#ffffff' : isStandard ? '#e0f2fe' : '#7dd3fc'}
                filter="url(#neonGlow)"
              />
            </g>
          );
        })}
      </svg>

      {/* ================================================== */}
      {/* 4. HUD BRACKET TAGS: — + AGENT, — + RAG, — + SYSTEMS */}
      {/* (100% matched to image.png)                         */}
      {/* ================================================== */}
      {/* Tag 1: AGENT (Top) */}
      <div
        style={{
          left: `${68.8 + 4.2}%`,
          top: `${7.5 - 1.6}%`,
          transform: `translate3d(${pxOffset * 0.8}px, ${pyOffset * 0.8}px, 0)`,
        }}
        onClick={() => {
          soundManager.playInspect();
          onSelectTag?.('AGENT');
        }}
        onMouseEnter={() => {
          setHoveredTag('AGENT');
          soundManager.playClick();
        }}
        onMouseLeave={() => setHoveredTag(null)}
        className="absolute z-30 pointer-events-auto cursor-pointer group"
      >
        <div className="relative flex items-center gap-1.5 px-3 py-1 font-mono text-xs tracking-widest text-slate-200 bg-black/60 backdrop-blur-md border border-cyan-500/30 group-hover:border-cyan-400 group-hover:text-cyan-300 transition-all rounded-xs shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          {/* HUD Corner notches */}
          <span className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l border-cyan-400" />
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t border-r border-cyan-400" />
          <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b border-l border-cyan-400" />
          <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r border-cyan-400" />

          <span className="text-cyan-400 font-bold">— +</span>
          <span className="font-semibold text-[11px] sm:text-xs">AGENT</span>
        </div>
      </div>

      {/* Tag 2: RAG (Middle-Right) */}
      <div
        style={{
          left: `${79.8 + 7.8}%`,
          top: `${37.0 - 5.5}%`,
          transform: `translate3d(${pxOffset * 0.8}px, ${pyOffset * 0.8}px, 0)`,
        }}
        onClick={() => {
          soundManager.playInspect();
          onSelectTag?.('RAG');
        }}
        onMouseEnter={() => {
          setHoveredTag('RAG');
          soundManager.playClick();
        }}
        onMouseLeave={() => setHoveredTag(null)}
        className="absolute z-30 pointer-events-auto cursor-pointer group"
      >
        <div className="relative flex items-center gap-1.5 px-3 py-1 font-mono text-xs tracking-widest text-slate-200 bg-black/60 backdrop-blur-md border border-cyan-500/30 group-hover:border-cyan-400 group-hover:text-cyan-300 transition-all rounded-xs shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          {/* HUD Corner notches */}
          <span className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l border-cyan-400" />
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t border-r border-cyan-400" />
          <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b border-l border-cyan-400" />
          <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r border-cyan-400" />

          <span className="text-cyan-400 font-bold">— +</span>
          <span className="font-semibold text-[11px] sm:text-xs">RAG</span>
        </div>
      </div>

      {/* Tag 3: SYSTEMS (Lower-Center) */}
      <div
        style={{
          left: `${67.5 + 4.8}%`,
          top: `${69.0 - 5.2}%`,
          transform: `translate3d(${pxOffset * 0.8}px, ${pyOffset * 0.8}px, 0)`,
        }}
        onClick={() => {
          soundManager.playInspect();
          onSelectTag?.('SYSTEMS');
        }}
        onMouseEnter={() => {
          setHoveredTag('SYSTEMS');
          soundManager.playClick();
        }}
        onMouseLeave={() => setHoveredTag(null)}
        className="absolute z-30 pointer-events-auto cursor-pointer group"
      >
        <div className="relative flex items-center gap-1.5 px-3 py-1 font-mono text-xs tracking-widest text-slate-200 bg-black/60 backdrop-blur-md border border-cyan-500/30 group-hover:border-cyan-400 group-hover:text-cyan-300 transition-all rounded-xs shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          {/* HUD Corner notches */}
          <span className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l border-cyan-400" />
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t border-r border-cyan-400" />
          <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b border-l border-cyan-400" />
          <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r border-cyan-400" />

          <span className="text-cyan-400 font-bold">— +</span>
          <span className="font-semibold text-[11px] sm:text-xs">SYSTEMS</span>
        </div>
      </div>
    </div>
  );
};
