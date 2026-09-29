import { spawnSync } from 'child_process';
import fs from 'fs';

if (!fs.existsSync('public/projects')) {
  fs.mkdirSync('public/projects', { recursive: true });
}

console.log('Generating cinematic project images...');

function renderSvgToPng(svgContent, outputPath, width = 800, height = 500) {
  const tmpSvg = outputPath.replace('.png', '.tmp.svg');
  fs.writeFileSync(tmpSvg, svgContent);
  const res = spawnSync('ffmpeg', [
    '-y',
    '-i', tmpSvg,
    '-vf', `scale=${width}:${height}`,
    outputPath
  ]);
  if (fs.existsSync(tmpSvg)) fs.unlinkSync(tmpSvg);
  if (res.status === 0) {
    console.log(`✓ Created ${outputPath}`);
  } else {
    console.error(`✗ Failed ${outputPath}: ${res.stderr?.toString()}`);
  }
}

// 1. HIVE KMS: Classical university building with glowing neural constellation dome
const hiveKmsSvg = `
<svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="skyGlow" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.4" />
      <stop offset="50%" stopColor="#0a192f" stopOpacity="0.8" />
      <stop offset="100%" stopColor="#020409" stopOpacity="1" />
    </radialGradient>
    <radialGradient id="neuralGlow" cx="50%" cy="40%" r="35%">
      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
      <stop offset="60%" stopColor="#0284c7" stopOpacity="0.2" />
      <stop offset="100%" stopColor="transparent" stopOpacity="0" />
    </radialGradient>
  </defs>
  <!-- Background -->
  <rect width="800" height="500" fill="url(#skyGlow)" />
  
  <!-- Stars -->
  <g fill="#e0f2fe" opacity="0.6">
    <circle cx="120" cy="80" r="1.5"/>
    <circle cx="280" cy="50" r="1"/>
    <circle cx="650" cy="90" r="1.5"/>
    <circle cx="720" cy="40" r="1"/>
    <circle cx="400" cy="60" r="2" fill="#38bdf8"/>
  </g>

  <!-- Neural Network Dome Overlay -->
  <circle cx="400" cy="210" r="140" fill="url(#neuralGlow)" />
  <g stroke="#38bdf8" stroke-width="1.2" stroke-opacity="0.7">
    <line x1="330" y1="180" x2="400" y2="140" />
    <line x1="400" y1="140" x2="470" y2="180" />
    <line x1="330" y1="180" x2="400" y2="210" />
    <line x1="470" y1="180" x2="400" y2="210" />
    <line x1="400" y1="210" x2="350" y2="250" />
    <line x1="400" y1="210" x2="450" y2="250" />
    <line x1="350" y1="250" x2="450" y2="250" />
    <line x1="400" y1="140" x2="400" y2="210" />
  </g>
  <g fill="#ffffff">
    <circle cx="400" cy="140" r="4" fill="#ffffff" />
    <circle cx="330" cy="180" r="3" fill="#38bdf8" />
    <circle cx="470" cy="180" r="3" fill="#38bdf8" />
    <circle cx="400" cy="210" r="5" fill="#ffffff" />
    <circle cx="350" cy="250" r="3" fill="#7dd3fc" />
    <circle cx="450" cy="250" r="3" fill="#7dd3fc" />
  </g>

  <!-- Trees Silhouette in Background -->
  <ellipse cx="220" cy="380" rx="90" ry="70" fill="#040b17" />
  <ellipse cx="580" cy="380" rx="90" ry="70" fill="#040b17" />

  <!-- Classical University Campus Architecture -->
  <!-- Pediment / Triangular Roof -->
  <polygon points="400,220 270,290 530,290" fill="#0c1829" stroke="#1e3a8a" stroke-width="2" />
  <polygon points="400,230 290,285 510,285" fill="#07101e" />

  <!-- Entablature / Beam -->
  <rect x="260" y="290" width="280" height="22" fill="#0f2038" stroke="#1e3a8a" stroke-width="1.5" />

  <!-- Columns (Classical Neoclassical Portico) -->
  <rect x="290" y="312" width="16" height="110" fill="#142845" stroke="#1e3a8a" stroke-width="1" />
  <rect x="340" y="312" width="16" height="110" fill="#142845" stroke="#1e3a8a" stroke-width="1" />
  <rect x="392" y="312" width="16" height="110" fill="#142845" stroke="#1e3a8a" stroke-width="1" />
  <rect x="444" y="312" width="16" height="110" fill="#142845" stroke="#1e3a8a" stroke-width="1" />
  <rect x="494" y="312" width="16" height="110" fill="#142845" stroke="#1e3a8a" stroke-width="1" />

  <!-- Behind columns: Wall and grand doors -->
  <rect x="280" y="312" width="240" height="110" fill="#060c17" />
  <rect x="375" y="340" width="50" height="82" fill="#03060a" stroke="#38bdf8" stroke-width="0.8" stroke-opacity="0.6" />

  <!-- Grand Stairs / Plinth -->
  <polygon points="230,422 570,422 620,480 180,480" fill="#0b172a" stroke="#1e3a8a" stroke-width="1" />
  <line x1="220" y1="438" x2="580" y2="438" stroke="#1e293b" stroke-width="1" />
  <line x1="200" y1="456" x2="600" y2="456" stroke="#1e293b" stroke-width="1" />

  <!-- Foreground Lawn and Dark Vignette -->
  <rect x="0" y="470" width="800" height="30" fill="#020408" />
  <linearGradient id="vignette" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stopColor="transparent" stopOpacity="0" />
    <stop offset="70%" stopColor="#020409" stopOpacity="0.4" />
    <stop offset="100%" stopColor="#020409" stopOpacity="0.9" />
  </linearGradient>
  <rect width="800" height="500" fill="url(#vignette)" />
</svg>
`;

// 2. YOPAZ PULSE: Floating multi-screen automated testing UI & autonomous agent bot
const yopazPulseSvg = `
<svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="cyberBg" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stopColor="#0f172a" stopOpacity="0.8" />
      <stop offset="60%" stopColor="#040813" stopOpacity="0.95" />
      <stop offset="100%" stopColor="#010306" stopOpacity="1" />
    </radialGradient>
    <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#0e2338" stopOpacity="0.85" />
      <stop offset="100%" stopColor="#05101f" stopOpacity="0.95" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#cyberBg)" />

  <!-- Background grid wires -->
  <g stroke="#1e3a8a" stroke-width="0.7" opacity="0.3">
    <line x1="0" y1="100" x2="800" y2="100" />
    <line x1="0" y1="200" x2="800" y2="200" />
    <line x1="0" y1="300" x2="800" y2="300" />
    <line x1="0" y1="400" x2="800" y2="400" />
    <line x1="200" y1="0" x2="200" y2="500" />
    <line x1="400" y1="0" x2="400" y2="500" />
    <line x1="600" y1="0" x2="600" y2="500" />
  </g>

  <!-- Floating Holographic Test Screens -->
  <!-- Screen 1: Center Large Screen (Playwright DOM Inspector) -->
  <g transform="matrix(0.96, -0.05, 0.05, 0.98, 260, 110)">
    <rect width="280" height="190" rx="8" fill="url(#screenGrad)" stroke="#38bdf8" stroke-width="1.8" />
    <!-- Screen Header -->
    <rect width="280" height="26" rx="8" fill="#132a45" />
    <circle cx="15" cy="13" r="4" fill="#ef4444" />
    <circle cx="28" cy="13" r="4" fill="#eab308" />
    <circle cx="41" cy="13" r="4" fill="#22c55e" />
    <text x="60" y="17" fill="#7dd3fc" font-family="monospace" font-size="10">E2E_SUITE :: SELF_HEALING_ACTIVE</text>
    
    <!-- Code / Test lines -->
    <text x="18" y="55" fill="#22c55e" font-family="monospace" font-size="11">✓ TEST_LOCATOR_RESOLVED (14ms)</text>
    <text x="18" y="78" fill="#38bdf8" font-family="monospace" font-size="10">locator('[data-testid="checkout-btn"]')</text>
    <text x="18" y="100" fill="#94a3b8" font-family="monospace" font-size="10">DOM Mutation detected: class changed</text>
    <text x="18" y="122" fill="#f59e0b" font-family="monospace" font-size="10">⚡ VLM Healing Patch: Button.submit_v2</text>
    <rect x="18" y="138" width="244" height="24" rx="4" fill="#0369a1" fill-opacity="0.3" stroke="#38bdf8" stroke-width="0.8" />
    <text x="28" y="154" fill="#ffffff" font-family="monospace" font-size="10">STATUS: PASS [152/152 TESTS HEALED]</text>
  </g>

  <!-- Screen 2: Left Floating Telemetry Screen -->
  <g transform="matrix(0.92, 0.15, -0.1, 0.95, 80, 160)">
    <rect width="180" height="150" rx="6" fill="url(#screenGrad)" stroke="#0284c7" stroke-width="1.2" opacity="0.85" />
    <text x="14" y="24" fill="#38bdf8" font-family="monospace" font-size="9">METRICS / RUNTIME</text>
    <path d="M 15,110 L 45,90 L 80,105 L 120,60 L 160,75" fill="none" stroke="#22c55e" stroke-width="2" />
    <text x="14" y="135" fill="#e2e8f0" font-family="monospace" font-size="10">SAVED: 25h / wk</text>
  </g>

  <!-- Screen 3: Right Floating Visual Inspector Screen -->
  <g transform="matrix(0.92, -0.15, 0.1, 0.95, 540, 160)">
    <rect width="180" height="150" rx="6" fill="url(#screenGrad)" stroke="#0284c7" stroke-width="1.2" opacity="0.85" />
    <text x="14" y="24" fill="#38bdf8" font-family="monospace" font-size="9">VISION LOCATOR AGENT</text>
    <rect x="25" y="45" width="130" height="70" fill="#0f2942" stroke="#38bdf8" stroke-width="1" stroke-dasharray="3 3" />
    <circle cx="90" cy="80" r="14" fill="#38bdf8" fill-opacity="0.3" />
    <text x="60" y="84" fill="#ffffff" font-family="monospace" font-size="9">CONF: 99.2%</text>
  </g>

  <!-- Bottom Reflection & Cyber glow -->
  <ellipse cx="400" cy="450" rx="280" ry="25" fill="#0284c7" fill-opacity="0.15" />
</svg>
`;

// 3. PAWCREW: Trio of futuristic cybernetic mascot agent cats in command center
const pawcrewSvg = `
<svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="crewBg" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stopColor="#172554" stopOpacity="0.6" />
      <stop offset="60%" stopColor="#060c1a" stopOpacity="0.9" />
      <stop offset="100%" stopColor="#020408" stopOpacity="1" />
    </radialGradient>
    <radialGradient id="catEyeCyan" cx="40%" cy="40%" r="50%">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="40%" stopColor="#38bdf8" />
      <stop offset="100%" stopColor="#0369a1" />
    </radialGradient>
    <radialGradient id="catEyeAmber" cx="40%" cy="40%" r="50%">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="40%" stopColor="#fbbf24" />
      <stop offset="100%" stopColor="#d97706" />
    </radialGradient>
  </defs>
  <rect width="800" height="500" fill="url(#crewBg)" />

  <!-- Center Leader Cyber-Cat (Planner Agent) -->
  <g transform="translate(340, 160)">
    <!-- Ears -->
    <polygon points="20,40 5,5 45,25" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" />
    <polygon points="100,40 115,5 75,25" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" />
    <!-- Head -->
    <ellipse cx="60" cy="70" rx="55" ry="48" fill="#090d16" stroke="#1e3a8a" stroke-width="2" />
    <!-- Forehead Cyber Visor / Interface -->
    <path d="M 40,45 L 80,45 L 75,55 L 45,55 Z" fill="#38bdf8" opacity="0.8" />
    <!-- Glowing Cyan Eyes -->
    <ellipse cx="38" cy="70" rx="14" ry="12" fill="url(#catEyeCyan)" />
    <ellipse cx="82" cy="70" rx="14" ry="12" fill="url(#catEyeCyan)" />
    <ellipse cx="38" cy="70" rx="4" ry="9" fill="#020617" />
    <ellipse cx="82" cy="70" rx="4" ry="9" fill="#020617" />
    <!-- Nose & Mouth -->
    <polygon points="60,86 56,82 64,82" fill="#7dd3fc" />
    <path d="M 54,92 Q 60,95 66,92" fill="none" stroke="#64748b" stroke-width="1.5" />
    <!-- Body / Suit -->
    <path d="M 15,110 Q 60,95 105,110 L 115,220 L 5,220 Z" fill="#060911" stroke="#1e3a8a" stroke-width="1.5" />
    <circle cx="60" cy="140" r="12" fill="#0284c7" opacity="0.6" />
    <text x="44" y="180" fill="#38bdf8" font-family="monospace" font-size="9">PLANNER</text>
  </g>

  <!-- Left Worker Cyber-Cat (Worker Agent) -->
  <g transform="translate(180, 190)">
    <polygon points="15,35 0,8 35,22" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.2" />
    <polygon points="85,35 100,8 65,22" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.2" />
    <ellipse cx="50" cy="62" rx="45" ry="40" fill="#0c0e17" stroke="#312e81" stroke-width="1.5" />
    <ellipse cx="32" cy="62" rx="11" ry="10" fill="url(#catEyeAmber)" />
    <ellipse cx="68" cy="62" rx="11" ry="10" fill="url(#catEyeAmber)" />
    <ellipse cx="32" cy="62" rx="3" ry="7" fill="#020617" />
    <ellipse cx="68" cy="62" rx="3" ry="7" fill="#020617" />
    <path d="M 10,95 Q 50,82 90,95 L 98,190 L 2,190 Z" fill="#060810" />
    <text x="35" y="150" fill="#f59e0b" font-family="monospace" font-size="8">WORKER</text>
  </g>

  <!-- Right Critic Cyber-Cat (Critic & Verification Agent) -->
  <g transform="translate(520, 190)">
    <polygon points="15,35 0,8 35,22" fill="#064e3b" stroke="#34d399" stroke-width="1.2" />
    <polygon points="85,35 100,8 65,22" fill="#064e3b" stroke="#34d399" stroke-width="1.2" />
    <ellipse cx="50" cy="62" rx="45" ry="40" fill="#080c10" stroke="#065f46" stroke-width="1.5" />
    <ellipse cx="32" cy="62" rx="11" ry="10" fill="url(#catEyeCyan)" />
    <ellipse cx="68" cy="62" rx="11" ry="10" fill="url(#catEyeCyan)" />
    <ellipse cx="32" cy="62" rx="3" ry="7" fill="#020617" />
    <ellipse cx="68" cy="62" rx="3" ry="7" fill="#020617" />
    <path d="M 10,95 Q 50,82 90,95 L 98,190 L 2,190 Z" fill="#060810" />
    <text x="38" y="150" fill="#10b981" font-family="monospace" font-size="8">CRITIC</text>
  </g>
</svg>
`;

// 4. AI DOCUMENT INTELLIGENCE: Luminous floating holographic documents over deep cosmic terrain
const aiDocIntelligenceSvg = `
<svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="docSpace" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stopColor="#0f2642" stopOpacity="0.7" />
      <stop offset="60%" stopColor="#05101f" stopOpacity="0.9" />
      <stop offset="100%" stopColor="#010307" stopOpacity="1" />
    </radialGradient>
    <linearGradient id="holoSheet" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
      <stop offset="50%" stopColor="#0284c7" stopOpacity="0.15" />
      <stop offset="100%" stopColor="#0369a1" stopOpacity="0.05" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#docSpace)" />

  <!-- Stars -->
  <circle cx="150" cy="80" r="1.5" fill="#e0f2fe" opacity="0.7" />
  <circle cx="680" cy="60" r="1.5" fill="#e0f2fe" opacity="0.7" />
  <circle cx="740" cy="140" r="2" fill="#38bdf8" />

  <!-- Background mountain ridge -->
  <polygon points="0,420 180,360 360,400 550,340 720,380 800,350 800,500 0,500" fill="#030712" />

  <!-- Glowing Holographic Invoices / Documents Floating in 3D -->
  <!-- Layer 1: Back document tilted left -->
  <g transform="matrix(0.88, 0.25, -0.15, 0.92, 180, 110)">
    <rect width="200" height="260" rx="4" fill="url(#holoSheet)" stroke="#38bdf8" stroke-width="1.2" stroke-opacity="0.5" />
    <!-- Text skeleton bars -->
    <rect x="25" y="30" width="80" height="12" fill="#7dd3fc" opacity="0.6" />
    <rect x="25" y="60" width="150" height="6" fill="#38bdf8" opacity="0.4" />
    <rect x="25" y="80" width="130" height="6" fill="#38bdf8" opacity="0.4" />
    <rect x="25" y="100" width="140" height="6" fill="#38bdf8" opacity="0.4" />
  </g>

  <!-- Layer 2: Main Foreground Invoice (Holographic Invoice with Cyan Bounding Boxes) -->
  <g transform="matrix(0.96, -0.06, 0.06, 0.98, 300, 80)">
    <!-- Base parchment paper with glassmorphism glow -->
    <rect width="240" height="310" rx="4" fill="#081b2e" fill-opacity="0.88" stroke="#38bdf8" stroke-width="2" />
    
    <!-- Header: INVOICE -->
    <text x="25" y="42" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="16">INVOICE</text>
    <rect x="150" y="28" width="65" height="18" rx="2" fill="#0284c7" fill-opacity="0.4" stroke="#38bdf8" stroke-width="0.8" />
    <text x="158" y="41" fill="#7dd3fc" font-family="monospace" font-size="9">PAID · 99.4%</text>

    <!-- Detected entity bounding boxes (Neon cyan highlights) -->
    <!-- Vendor Box -->
    <rect x="25" y="65" width="100" height="32" fill="#0369a1" fill-opacity="0.2" stroke="#38bdf8" stroke-width="1.2" />
    <text x="30" y="80" fill="#e2e8f0" font-family="monospace" font-size="9">VENDOR: ACME AI</text>
    <text x="30" y="92" fill="#94a3b8" font-family="monospace" font-size="8">ID: INV-2026-09</text>

    <!-- Date Box -->
    <rect x="140" y="65" width="75" height="32" fill="#0369a1" fill-opacity="0.2" stroke="#38bdf8" stroke-width="1.2" />
    <text x="145" y="82" fill="#7dd3fc" font-family="monospace" font-size="9">DATE: 2026-09</text>

    <!-- Table structure box -->
    <rect x="25" y="115" width="190" height="95" fill="#051728" stroke="#38bdf8" stroke-width="1.5" />
    <line x1="25" y1="135" x2="215" y2="135" stroke="#38bdf8" stroke-width="0.8" />
    <text x="32" y="130" fill="#38bdf8" font-family="monospace" font-size="8">ITEM DESCRIPTION</text>
    <text x="165" y="130" fill="#38bdf8" font-family="monospace" font-size="8">AMOUNT</text>
    
    <text x="32" y="152" fill="#cbd5e1" font-family="monospace" font-size="8">01 Autonomous Agent Ops</text>
    <text x="165" y="152" fill="#ffffff" font-family="monospace" font-size="8">$14,200</text>

    <text x="32" y="172" fill="#cbd5e1" font-family="monospace" font-size="8">02 Multimodal OCR Cluster</text>
    <text x="165" y="172" fill="#ffffff" font-family="monospace" font-size="8">$8,450</text>

    <text x="32" y="192" fill="#cbd5e1" font-family="monospace" font-size="8">03 Vector Embedding Cache</text>
    <text x="165" y="192" fill="#ffffff" font-family="monospace" font-size="8">$3,100</text>

    <!-- Total box & Red Stamp -->
    <rect x="110" y="225" width="105" height="30" fill="#0284c7" fill-opacity="0.3" stroke="#38bdf8" stroke-width="1" />
    <text x="118" y="244" fill="#ffffff" font-family="monospace" font-weight="bold" font-size="11">TOTAL: $25,750</text>

    <!-- Official Red Stamp (Detected & parsed) -->
    <g transform="translate(45, 222) rotate(-12)">
      <circle cx="22" cy="22" r="22" fill="none" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="3 2" />
      <text x="7" y="25" fill="#ef4444" font-family="sans-serif" font-weight="bold" font-size="8">VERIFIED</text>
    </g>
  </g>

  <!-- Layer 3: Floating structured JSON output glass panel on the right -->
  <g transform="matrix(0.92, -0.15, 0.08, 0.95, 520, 140)">
    <rect width="210" height="240" rx="6" fill="#030d1a" fill-opacity="0.92" stroke="#38bdf8" stroke-width="1.5" />
    <rect width="210" height="24" rx="6" fill="#092038" />
    <text x="15" y="16" fill="#38bdf8" font-family="monospace" font-size="9">VALIDATED_SCHEMA.JSON</text>
    <text x="15" y="48" fill="#e2e8f0" font-family="monospace" font-size="9">{</text>
    <text x="25" y="68" fill="#7dd3fc" font-family="monospace" font-size="9">"type": <tspan fill="#38bdf8">"invoice"</tspan>,</text>
    <text x="25" y="88" fill="#7dd3fc" font-family="monospace" font-size="9">"vendor": <tspan fill="#38bdf8">"ACME AI"</tspan>,</text>
    <text x="25" y="108" fill="#7dd3fc" font-family="monospace" font-size="9">"total": <tspan fill="#f59e0b">25750.00</tspan>,</text>
    <text x="25" y="128" fill="#7dd3fc" font-family="monospace" font-size="9">"confidence": <tspan fill="#22c55e">0.994</tspan>,</text>
    <text x="25" y="148" fill="#7dd3fc" font-family="monospace" font-size="9">"bbox": [25, 115, 190, 95]</text>
    <text x="15" y="170" fill="#e2e8f0" font-family="monospace" font-size="9">}</text>
  </g>
</svg>
`;

// 5. Engineer Workstation Visual (Dark room, multiple floating holographic screens)
const docWorkspaceSvg = `
<svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="roomGlow" cx="45%" cy="40%" r="55%">
      <stop offset="0%" stopColor="#0c233c" stopOpacity="0.8" />
      <stop offset="60%" stopColor="#040913" stopOpacity="0.95" />
      <stop offset="100%" stopColor="#010307" stopOpacity="1" />
    </radialGradient>
  </defs>
  <rect width="800" height="500" fill="url(#roomGlow)" />

  <!-- Floating Holographic Document Screens in Front of Engineer -->
  <g transform="translate(180, 70)">
    <rect width="180" height="230" rx="4" fill="#081e33" fill-opacity="0.85" stroke="#38bdf8" stroke-width="1.5" />
    <rect x="20" y="30" width="70" height="10" fill="#7dd3fc" opacity="0.8" />
    <rect x="20" y="55" width="140" height="50" fill="#0284c7" fill-opacity="0.2" stroke="#38bdf8" stroke-width="1" />
    <text x="28" y="75" fill="#38bdf8" font-family="monospace" font-size="9">MULTI-MODAL OCR</text>
    <text x="28" y="90" fill="#e2e8f0" font-family="monospace" font-size="8">LAYOUT BOUNDARY: ACTIVE</text>
  </g>

  <g transform="translate(390, 50)">
    <rect width="240" height="190" rx="4" fill="#081e33" fill-opacity="0.85" stroke="#38bdf8" stroke-width="1.5" />
    <rect x="20" y="25" width="90" height="10" fill="#38bdf8" opacity="0.8" />
    <rect x="20" y="48" width="200" height="110" fill="#021424" stroke="#0284c7" stroke-width="1" />
    <text x="30" y="70" fill="#22c55e" font-family="monospace" font-size="9">✓ 500 PGS/MIN STREAMING</text>
    <text x="30" y="90" fill="#7dd3fc" font-family="monospace" font-size="8">Pydantic v2 Schema: 100% Validated</text>
  </g>

  <!-- Engineer Silhouette sitting at desk with back to viewer -->
  <!-- Desk -->
  <rect x="100" y="340" width="600" height="18" fill="#050a14" stroke="#1e293b" stroke-width="1" />
  
  <!-- Silhouette of Engineer (Head, Shoulders, Chair) -->
  <g fill="#010306" stroke="#1e3a8a" stroke-width="0.8">
    <!-- Chair back -->
    <ellipse cx="440" cy="380" rx="55" ry="70" />
    <!-- Head with subtle blue hair rim highlight -->
    <circle cx="440" cy="275" r="22" stroke="#38bdf8" stroke-opacity="0.5" />
    <!-- Shoulders & Torso -->
    <path d="M 390,320 Q 440,295 490,320 L 500,440 L 380,440 Z" />
  </g>

  <!-- Keyboard & glowing desk reflection -->
  <rect x="380" y="343" width="120" height="8" rx="2" fill="#0f1f33" stroke="#38bdf8" stroke-width="0.6" />
</svg>
`;

renderSvgToPng(hiveKmsSvg, 'public/projects/hive-kms.png');
renderSvgToPng(yopazPulseSvg, 'public/projects/yopaz-pulse.png');
renderSvgToPng(pawcrewSvg, 'public/projects/pawcrew.png');
renderSvgToPng(aiDocIntelligenceSvg, 'public/projects/ai-document-intelligence.png');
renderSvgToPng(docWorkspaceSvg, 'public/projects/doc-workspace.png');
