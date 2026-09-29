import { spawnSync } from 'child_process';
import fs from 'fs';

function renderSvg(svg, filename, width = 300, height = 240) {
  const tmpPath = `/tmp/${filename}.svg`;
  const outPath = `public/projects/${filename}.png`;
  fs.writeFileSync(tmpPath, svg.trim());
  const res = spawnSync('ffmpeg', [
    '-y',
    '-i', tmpPath,
    '-vf', `scale=${width}:${height}`,
    outPath
  ]);
  if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
  if (res.status === 0) {
    console.log(`✓ Rendered ${outPath}`);
  }
}

// 1. Scanned receipt / ledger with columns
const receiptSvg = `
<svg width="300" height="240" viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="240" fill="#1e293b"/>
  <!-- Parchment aged paper background -->
  <rect x="25" y="15" width="250" height="210" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
  <!-- Thermal receipt texture / columns -->
  <line x1="45" y1="40" x2="255" y2="40" stroke="#475569" stroke-width="2"/>
  <text x="50" y="35" fill="#334155" font-family="monospace" font-weight="bold" font-size="12">RECEIPT #84920</text>
  <line x1="45" y1="55" x2="255" y2="55" stroke="#94a3b8" stroke-width="0.8"/>
  
  <text x="50" y="75" fill="#475569" font-family="monospace" font-size="9">ITEM 01: QDRANT INDEX</text>
  <text x="210" y="75" fill="#1e293b" font-family="monospace" font-size="9">$120.00</text>
  
  <text x="50" y="95" fill="#475569" font-family="monospace" font-size="9">ITEM 02: GPU COMPUTE</text>
  <text x="210" y="95" fill="#1e293b" font-family="monospace" font-size="9">$450.00</text>
  
  <text x="50" y="115" fill="#475569" font-family="monospace" font-size="9">ITEM 03: VLM LATENCY</text>
  <text x="210" y="115" fill="#1e293b" font-family="monospace" font-size="9">$95.50</text>

  <!-- Cyan OCR bounding box detection on receipt -->
  <rect x="45" y="62" width="210" height="65" fill="#38bdf8" fill-opacity="0.15" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="3 2"/>
  <rect x="45" y="145" width="210" height="25" fill="#0284c7" fill-opacity="0.2" stroke="#0284c7" stroke-width="1.5"/>
  <text x="50" y="162" fill="#0f172a" font-family="monospace" font-weight="bold" font-size="11">TOTAL: $665.50</text>
</svg>
`;

// 2. Official Red Stamp on parchment
const stampSvg = `
<svg width="300" height="240" viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="240" fill="#1e293b"/>
  <!-- Parchment paper -->
  <rect x="25" y="15" width="250" height="210" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  
  <!-- Text lines -->
  <rect x="45" y="35" width="120" height="8" rx="2" fill="#94a3b8"/>
  <rect x="45" y="55" width="210" height="5" rx="1" fill="#cbd5e1"/>
  <rect x="45" y="70" width="190" height="5" rx="1" fill="#cbd5e1"/>
  <rect x="45" y="85" width="170" height="5" rx="1" fill="#cbd5e1"/>

  <!-- Prominent Official Circular Red Stamp (angled) -->
  <g transform="translate(150, 140) rotate(-16)">
    <circle cx="0" cy="0" r="48" fill="none" stroke="#dc2626" stroke-width="3" stroke-dasharray="6 3"/>
    <circle cx="0" cy="0" r="42" fill="none" stroke="#dc2626" stroke-width="1.5"/>
    <polygon points="0,-18 5,-5 18,-5 8,4 12,18 0,9 -12,18 -8,4 -18,-5 -5,-5" fill="#dc2626"/>
    <text x="-32" y="24" fill="#dc2626" font-family="sans-serif" font-weight="bold" font-size="9" letter-spacing="1">VERIFIED</text>
  </g>
</svg>
`;

// 3. Handwritten notes on ruled paper
const notesSvg = `
<svg width="300" height="240" viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="240" fill="#1e293b"/>
  <rect x="25" y="15" width="250" height="210" fill="#fefce8" stroke="#fef08a" stroke-width="1.5"/>
  
  <!-- Ruled blue notebook lines -->
  <line x1="25" y1="50" x2="275" y2="50" stroke="#bae6fd" stroke-width="1"/>
  <line x1="25" y1="75" x2="275" y2="75" stroke="#bae6fd" stroke-width="1"/>
  <line x1="25" y1="100" x2="275" y2="100" stroke="#bae6fd" stroke-width="1"/>
  <line x1="25" y1="125" x2="275" y2="125" stroke="#bae6fd" stroke-width="1"/>
  <line x1="25" y1="150" x2="275" y2="150" stroke="#bae6fd" stroke-width="1"/>
  <line x1="25" y1="175" x2="275" y2="175" stroke="#bae6fd" stroke-width="1"/>
  <line x1="25" y1="200" x2="275" y2="200" stroke="#bae6fd" stroke-width="1"/>
  <!-- Red margin line -->
  <line x1="65" y1="15" x2="65" y2="225" stroke="#fca5a5" stroke-width="1.5"/>

  <!-- Handwritten cursive lines (simulated SVG paths) -->
  <path d="M 75,45 Q 120,40 160,45 T 240,43" fill="none" stroke="#1e3a8a" stroke-width="2" stroke-linecap="round"/>
  <path d="M 75,70 Q 110,65 180,72 T 255,68" fill="none" stroke="#1e3a8a" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M 75,95 Q 140,90 200,98 T 245,94" fill="none" stroke="#1e3a8a" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M 75,120 Q 125,115 170,123 T 235,119" fill="none" stroke="#1e3a8a" stroke-width="2" stroke-linecap="round"/>
</svg>
`;

renderSvg(receiptSvg, 'doc-receipt');
renderSvg(stampSvg, 'doc-stamp');
renderSvg(notesSvg, 'doc-notes');
