import { spawnSync } from 'child_process';
import fs from 'fs';

if (!fs.existsSync('public/projects')) {
  fs.mkdirSync('public/projects', { recursive: true });
}

function renderSvg(svg, filename, width = 800, height = 500) {
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
  } else {
    console.error(`✗ Error rendering ${filename}:`, res.stderr?.toString());
  }
}

// ==========================================
// 1. HIVE KMS: Classical university building with green trees & blue sky
// ==========================================
const hiveKmsSvg = `
<svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#1e3a8a"/>
      <stop offset="40%" stopColor="#38bdf8"/>
      <stop offset="70%" stopColor="#e0f2fe"/>
      <stop offset="100%" stopColor="#ffffff"/>
    </linearGradient>
    <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#15803d"/>
      <stop offset="100%" stopColor="#14532d"/>
    </linearGradient>
    <linearGradient id="building" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#f8fafc"/>
      <stop offset="100%" stopColor="#94a3b8"/>
    </linearGradient>
  </defs>

  <!-- Sky -->
  <rect width="800" height="340" fill="url(#sky)"/>
  <!-- Clouds -->
  <ellipse cx="200" cy="90" rx="90" ry="40" fill="#ffffff" opacity="0.8"/>
  <ellipse cx="600" cy="70" rx="120" ry="45" fill="#ffffff" opacity="0.8"/>

  <!-- Background lush green trees -->
  <g fill="#166534">
    <ellipse cx="120" cy="280" rx="90" ry="110"/>
    <ellipse cx="200" cy="270" rx="80" ry="100"/>
    <ellipse cx="600" cy="270" rx="80" ry="100"/>
    <ellipse cx="680" cy="280" rx="90" ry="110"/>
  </g>
  <g fill="#15803d">
    <ellipse cx="100" cy="300" rx="70" ry="80"/>
    <ellipse cx="700" cy="300" rx="70" ry="80"/>
  </g>

  <!-- Foreground Lawn -->
  <rect y="330" width="800" height="170" fill="url(#grass)"/>
  <!-- Central Walkway / Plaza -->
  <polygon points="350,340 450,340 520,500 280,500" fill="#cbd5e1" opacity="0.9"/>

  <!-- University Building (Classical Greek Revival) -->
  <!-- Main Body -->
  <rect x="230" y="180" width="340" height="150" fill="url(#building)" stroke="#475569" stroke-width="2"/>
  
  <!-- Windows -->
  <g fill="#0f172a">
    <rect x="250" y="210" width="22" height="35" rx="3"/>
    <rect x="285" y="210" width="22" height="35" rx="3"/>
    <rect x="495" y="210" width="22" height="35" rx="3"/>
    <rect x="530" y="210" width="22" height="35" rx="3"/>
    <rect x="250" y="260" width="22" height="40" rx="3"/>
    <rect x="285" y="260" width="22" height="40" rx="3"/>
    <rect x="495" y="260" width="22" height="40" rx="3"/>
    <rect x="530" y="260" width="22" height="40" rx="3"/>
  </g>

  <!-- Grand Portico & Classical Columns -->
  <!-- Pediment (Triangle Roof) -->
  <polygon points="400,105 310,180 490,180" fill="#f1f5f9" stroke="#334155" stroke-width="3"/>
  <!-- Architrave beam -->
  <rect x="315" y="180" width="170" height="15" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>

  <!-- 6 Majestic Columns -->
  <g fill="#ffffff" stroke="#64748b" stroke-width="1">
    <rect x="325" y="195" width="14" height="135"/>
    <rect x="355" y="195" width="14" height="135"/>
    <rect x="385" y="195" width="14" height="135"/>
    <rect x="405" y="195" width="14" height="135"/>
    <rect x="435" y="195" width="14" height="135"/>
    <rect x="465" y="195" width="14" height="135"/>
  </g>

  <!-- Grand Entrance Steps -->
  <polygon points="300,330 500,330 520,360 280,360" fill="#94a3b8" stroke="#334155" stroke-width="1"/>
  <line x1="290" y1="340" x2="510" y2="340" stroke="#64748b" stroke-width="2"/>
  <line x1="285" y1="350" x2="515" y2="350" stroke="#64748b" stroke-width="2"/>

  <!-- Subtle neural glow above roof -->
  <circle cx="400" cy="110" r="30" fill="#38bdf8" opacity="0.3"/>
  <circle cx="400" cy="110" r="5" fill="#ffffff"/>
</svg>
`;

// ==========================================
// 2. YOPAZ PULSE: Cyberpunk automated QA testing screens & robot
// ==========================================
const yopazSvg = `
<svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="cyberGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4"/>
      <stop offset="100%" stopColor="#020409" stopOpacity="1"/>
    </radialGradient>
  </defs>
  <rect width="800" height="500" fill="url(#cyberGlow)"/>

  <!-- Background telemetry screens -->
  <!-- Left Screen: Test Execution Matrix -->
  <g transform="matrix(0.95, 0.1, -0.05, 0.95, 60, 110)">
    <rect width="200" height="230" rx="8" fill="#071322" stroke="#38bdf8" stroke-width="1.5"/>
    <rect x="15" y="15" width="90" height="8" fill="#38bdf8" opacity="0.8"/>
    <g fill="#22c55e" font-family="monospace" font-size="9">
      <text x="15" y="50">✓ AUTH_FLOW_E2E</text>
      <text x="15" y="75">✓ CHECKOUT_MODAL</text>
      <text x="15" y="100">✓ VLM_HEAL_OK</text>
      <text x="15" y="125">✓ LOCATOR_RESOLVE</text>
    </g>
    <!-- Waveform / latency graph -->
    <path d="M 15,190 L 50,170 L 90,185 L 130,150 L 180,165" fill="none" stroke="#38bdf8" stroke-width="2"/>
    <text x="15" y="215" fill="#94a3b8" font-family="monospace" font-size="8">LATENCY: 14ms</text>
  </g>

  <!-- Right Screen: DOM Hierarchy Tree -->
  <g transform="matrix(0.95, -0.1, 0.05, 0.95, 540, 110)">
    <rect width="200" height="230" rx="8" fill="#071322" stroke="#38bdf8" stroke-width="1.5"/>
    <rect x="15" y="15" width="80" height="8" fill="#38bdf8" opacity="0.8"/>
    <g fill="#7dd3fc" font-family="monospace" font-size="8">
      <text x="15" y="45">&lt;button class="btn"&gt;</text>
      <text x="25" y="65">&lt;span id="lbl"&gt;</text>
      <text x="35" y="85">"Submit Order"</text>
      <text x="25" y="105">&lt;/span&gt;</text>
      <text x="15" y="125">&lt;/button&gt;</text>
    </g>
    <rect x="15" y="150" width="170" height="50" rx="4" fill="#0c233c" stroke="#22c55e" stroke-width="1"/>
    <text x="22" y="172" fill="#22c55e" font-family="monospace" font-size="9">AUTO-HEALED: 100%</text>
    <text x="22" y="190" fill="#ffffff" font-family="monospace" font-size="8">Playwright Selector patched</text>
  </g>

  <!-- Center Screen: AI Autonomous Robot Face -->
  <g transform="translate(290, 80)">
    <rect width="220" height="260" rx="10" fill="#040b17" stroke="#38bdf8" stroke-width="2.5"/>
    <rect width="220" height="24" rx="8" fill="#0c1d33"/>
    <circle cx="15" cy="12" r="4" fill="#ef4444"/>
    <circle cx="28" cy="12" r="4" fill="#eab308"/>
    <circle cx="41" cy="12" r="4" fill="#22c55e"/>
    <text x="60" y="16" fill="#7dd3fc" font-family="monospace" font-size="9">AI_AUTONOMOUS_BOT</text>

    <!-- Robot Glowing Face Visor -->
    <ellipse cx="110" cy="120" rx="70" ry="50" fill="#020611" stroke="#38bdf8" stroke-width="2"/>
    <!-- Glowing Cyan Eyes -->
    <circle cx="85" cy="115" r="14" fill="#38bdf8"/>
    <circle cx="85" cy="115" r="6" fill="#ffffff"/>
    <circle cx="135" cy="115" r="14" fill="#38bdf8"/>
    <circle cx="135" cy="115" r="6" fill="#ffffff"/>
    <!-- Smile / Audio line -->
    <path d="M 85,145 Q 110,165 135,145" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>

    <!-- Status badge -->
    <rect x="25" y="195" width="170" height="35" rx="4" fill="#0284c7" fill-opacity="0.2" stroke="#38bdf8" stroke-width="1"/>
    <text x="35" y="217" fill="#ffffff" font-family="monospace" font-size="10">SELF-HEALING QA ACTIVE</text>
  </g>

  <!-- Cybernetic wires and platform -->
  <line x1="0" y1="420" x2="800" y2="420" stroke="#1e3a8a" stroke-width="2"/>
  <line x1="100" y1="420" x2="300" y2="340" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="4 2"/>
  <line x1="700" y1="420" x2="500" y2="340" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="4 2"/>
</svg>
`;

// ==========================================
// 3. PAWCREW: Three cute cybernetic robotic mascot cats
// ==========================================
const pawcrewSvg = `
<svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="catBg" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stopColor="#1e293b"/>
      <stop offset="60%" stopColor="#090d16"/>
      <stop offset="100%" stopColor="#020408"/>
    </radialGradient>
    <radialGradient id="eyeTeal" cx="40%" cy="40%" r="50%">
      <stop offset="0%" stopColor="#ffffff"/>
      <stop offset="40%" stopColor="#22d3ee"/>
      <stop offset="100%" stopColor="#0891b2"/>
    </radialGradient>
    <radialGradient id="eyeAmber" cx="40%" cy="40%" r="50%">
      <stop offset="0%" stopColor="#ffffff"/>
      <stop offset="40%" stopColor="#fbbf24"/>
      <stop offset="100%" stopColor="#b45309"/>
    </radialGradient>
  </defs>
  <rect width="800" height="500" fill="url(#catBg)"/>

  <!-- Center Hero Cat (Black sleek cyber cat with large cyan eyes) -->
  <g transform="translate(330, 110)">
    <!-- Ears -->
    <polygon points="30,55 5,0 55,30" fill="#090d16" stroke="#38bdf8" stroke-width="2"/>
    <polygon points="110,55 135,0 85,30" fill="#090d16" stroke="#38bdf8" stroke-width="2"/>
    <polygon points="25,48 10,12 45,30" fill="#1e293b"/>
    <polygon points="115,48 130,12 95,30" fill="#1e293b"/>

    <!-- Head -->
    <ellipse cx="70" cy="85" rx="65" ry="55" fill="#090d16" stroke="#1e3a8a" stroke-width="1.5"/>
    
    <!-- Big Anime / Cyber Eyes -->
    <ellipse cx="45" cy="82" rx="19" ry="17" fill="url(#eyeTeal)"/>
    <ellipse cx="95" cy="82" rx="19" ry="17" fill="url(#eyeTeal)"/>
    <!-- Pupils -->
    <ellipse cx="45" cy="82" rx="6" ry="13" fill="#020617"/>
    <ellipse cx="95" cy="82" rx="6" ry="13" fill="#020617"/>
    <!-- Eye Highlights -->
    <circle cx="40" cy="74" r="5" fill="#ffffff"/>
    <circle cx="90" cy="74" r="5" fill="#ffffff"/>

    <!-- Cute Nose & Mouth -->
    <polygon points="70,105 65,100 75,100" fill="#f43f5e"/>
    <path d="M 63,110 Q 70,115 77,110" fill="none" stroke="#64748b" stroke-width="2"/>
    
    <!-- Whiskers -->
    <line x1="20" y1="102" x2="-10" y2="98" stroke="#38bdf8" stroke-width="1.5"/>
    <line x1="20" y1="110" x2="-12" y2="114" stroke="#38bdf8" stroke-width="1.5"/>
    <line x1="120" y1="102" x2="150" y2="98" stroke="#38bdf8" stroke-width="1.5"/>
    <line x1="120" y1="110" x2="152" y2="114" stroke="#38bdf8" stroke-width="1.5"/>

    <!-- High-Tech Collar with Glowing Core -->
    <path d="M 25,135 Q 70,148 115,135 L 115,152 Q 70,165 25,152 Z" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
    <circle cx="70" cy="150" r="10" fill="#38bdf8"/>
    <circle cx="70" cy="150" r="5" fill="#ffffff"/>

    <!-- Body / Paws -->
    <path d="M 15,145 Q 70,135 125,145 L 135,270 L 5,270 Z" fill="#060911"/>
    <!-- Front Paws -->
    <ellipse cx="45" cy="265" rx="16" ry="10" fill="#0f172a"/>
    <ellipse cx="95" cy="265" rx="16" ry="10" fill="#0f172a"/>
  </g>

  <!-- Left Calico / Amber Cat -->
  <g transform="translate(160, 160)">
    <polygon points="25,50 5,5 45,28" fill="#78350f" stroke="#fbbf24" stroke-width="1.5"/>
    <polygon points="95,50 115,5 75,28" fill="#78350f" stroke="#fbbf24" stroke-width="1.5"/>
    <ellipse cx="60" cy="75" rx="55" ry="46" fill="#451a03"/>
    <!-- Amber Eyes -->
    <ellipse cx="38" cy="72" rx="16" ry="14" fill="url(#eyeAmber)"/>
    <ellipse cx="82" cy="72" rx="16" ry="14" fill="url(#eyeAmber)"/>
    <ellipse cx="38" cy="72" rx="5" ry="10" fill="#020617"/>
    <ellipse cx="82" cy="72" rx="5" ry="10" fill="#020617"/>
    <circle cx="34" cy="66" r="4" fill="#ffffff"/>
    <circle cx="78" cy="66" r="4" fill="#ffffff"/>
    <path d="M 10,120 Q 60,110 110,120 L 118,220 L 2,220 Z" fill="#291102"/>
  </g>

  <!-- Right White / Silver Cyber Cat -->
  <g transform="translate(500, 160)">
    <polygon points="25,50 5,5 45,28" fill="#94a3b8" stroke="#38bdf8" stroke-width="1.5"/>
    <polygon points="95,50 115,5 75,28" fill="#94a3b8" stroke="#38bdf8" stroke-width="1.5"/>
    <ellipse cx="60" cy="75" rx="55" ry="46" fill="#cbd5e1"/>
    <!-- Teal Eyes -->
    <ellipse cx="38" cy="72" rx="16" ry="14" fill="url(#eyeTeal)"/>
    <ellipse cx="82" cy="72" rx="16" ry="14" fill="url(#eyeTeal)"/>
    <ellipse cx="38" cy="72" rx="5" ry="10" fill="#020617"/>
    <ellipse cx="82" cy="72" rx="5" ry="10" fill="#020617"/>
    <circle cx="34" cy="66" r="4" fill="#ffffff"/>
    <circle cx="78" cy="66" r="4" fill="#ffffff"/>
    <path d="M 10,120 Q 60,110 110,120 L 118,220 L 2,220 Z" fill="#64748b"/>
  </g>
</svg>
`;

// ==========================================
// 4. AI DOCUMENT INTELLIGENCE: 3D Angled Holographic Invoice
// ==========================================
const aiDocSvg = `
<svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="docGlow" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stopColor="#0c2540" stopOpacity="0.8"/>
      <stop offset="60%" stopColor="#030914" stopOpacity="0.95"/>
      <stop offset="100%" stopColor="#010206" stopOpacity="1"/>
    </radialGradient>
    <linearGradient id="holoSheet" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4"/>
      <stop offset="50%" stopColor="#0369a1" stopOpacity="0.15"/>
      <stop offset="100%" stopColor="#020617" stopOpacity="0.8"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#docGlow)"/>

  <!-- Swirling floating background papers in perspective -->
  <g opacity="0.45">
    <polygon points="120,80 190,60 180,150 110,170" fill="#ffffff" opacity="0.4"/>
    <polygon points="620,90 690,110 670,200 600,180" fill="#ffffff" opacity="0.3"/>
    <polygon points="100,280 180,310 150,390 70,360" fill="#ffffff" opacity="0.2"/>
    <polygon points="650,290 730,260 750,350 670,380" fill="#ffffff" opacity="0.35"/>
  </g>

  <!-- Large Central 3D Angled Holographic Invoice Document -->
  <g transform="matrix(0.92, -0.15, 0.12, 0.95, 230, 80)">
    <!-- Base Glowing Blueprint Glass Sheet -->
    <rect width="320" height="380" rx="8" fill="url(#holoSheet)" stroke="#38bdf8" stroke-width="2.5"/>
    <rect width="320" height="380" rx="8" fill="none" stroke="#e0f2fe" stroke-width="0.8" opacity="0.8"/>

    <!-- Document Header: INVOICE -->
    <text x="30" y="50" fill="#ffffff" font-family="sans-serif" font-weight="900" font-size="22" letter-spacing="1">INVOICE</text>
    <rect x="200" y="32" width="90" height="22" rx="4" fill="#0284c7" fill-opacity="0.4" stroke="#38bdf8" stroke-width="1"/>
    <text x="210" y="47" fill="#7dd3fc" font-family="monospace" font-size="10">PAID · 99.4%</text>

    <!-- Detected Metadata Bounding Box (Cyan Neon) -->
    <rect x="30" y="75" width="130" height="40" rx="2" fill="#0369a1" fill-opacity="0.25" stroke="#38bdf8" stroke-width="1.2"/>
    <text x="38" y="93" fill="#e0f2fe" font-family="monospace" font-size="10">VENDOR: ACME AI</text>
    <text x="38" y="107" fill="#94a3b8" font-family="monospace" font-size="8">INV-2024-001</text>

    <!-- Table Outline -->
    <rect x="30" y="130" width="260" height="130" rx="2" fill="#051527" stroke="#38bdf8" stroke-width="1.5"/>
    <line x1="30" y1="155" x2="290" y2="155" stroke="#38bdf8" stroke-width="1"/>
    
    <text x="40" y="148" fill="#38bdf8" font-family="monospace" font-size="9">DESCRIPTION</text>
    <text x="230" y="148" fill="#38bdf8" font-family="monospace" font-size="9">AMOUNT</text>

    <text x="40" y="178" fill="#cbd5e1" font-family="monospace" font-size="9">01 Autonomous QA Cluster</text>
    <text x="230" y="178" fill="#ffffff" font-family="monospace" font-size="9">$14,200</text>

    <text x="40" y="202" fill="#cbd5e1" font-family="monospace" font-size="9">02 Multimodal OCR Engine</text>
    <text x="230" y="202" fill="#ffffff" font-family="monospace" font-size="9">$8,450</text>

    <text x="40" y="226" fill="#cbd5e1" font-family="monospace" font-size="9">03 Vector Cache Index</text>
    <text x="230" y="226" fill="#ffffff" font-family="monospace" font-size="9">$3,100</text>

    <!-- Total box -->
    <rect x="150" y="275" width="140" height="35" rx="3" fill="#0284c7" fill-opacity="0.3" stroke="#38bdf8" stroke-width="1.2"/>
    <text x="160" y="297" fill="#ffffff" font-family="monospace" font-weight="bold" font-size="12">TOTAL: $25,750</text>

    <!-- Red Verified Rubber Stamp -->
    <g transform="translate(60, 275) rotate(-15)">
      <circle cx="25" cy="25" r="24" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 2"/>
      <text x="8" y="29" fill="#ef4444" font-family="sans-serif" font-weight="bold" font-size="9">VERIFIED</text>
    </g>
  </g>
</svg>
`;

// ==========================================
// 5. DOC DETAIL HERO: Swirling 3D Papers in dark cosmic landscape
// ==========================================
const docHeroSvg = `
<svg width="900" height="600" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="cosmicSpace" cx="60%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.4"/>
      <stop offset="40%" stopColor="#081b33" stopOpacity="0.8"/>
      <stop offset="80%" stopColor="#020409" stopOpacity="1"/>
    </radialGradient>
    <linearGradient id="glowDoc" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5"/>
      <stop offset="50%" stopColor="#0369a1" stopOpacity="0.2"/>
      <stop offset="100%" stopColor="#020617" stopOpacity="0.85"/>
    </linearGradient>
  </defs>
  <rect width="900" height="600" fill="url(#cosmicSpace)"/>

  <!-- Stars -->
  <g fill="#e0f2fe" opacity="0.6">
    <circle cx="100" cy="50" r="1.5"/><circle cx="300" cy="80" r="1"/><circle cx="750" cy="40" r="2"/>
    <circle cx="820" cy="110" r="1.5"/><circle cx="620" cy="60" r="1"/>
  </g>

  <!-- Giant Planet Rim in background -->
  <circle cx="850" cy="150" r="300" fill="#040b18" stroke="#38bdf8" stroke-width="2" stroke-opacity="0.6"/>

  <!-- Dark rugged mountain terrain below -->
  <polygon points="0,520 220,440 450,490 680,420 900,480 900,600 0,600" fill="#02050b"/>

  <!-- Swirl of 3D Flying White Documents -->
  <g fill="#ffffff">
    <polygon points="80,120 160,90 145,180 65,210" opacity="0.7"/>
    <polygon points="220,60 280,30 310,120 250,150" opacity="0.55"/>
    <polygon points="680,120 760,150 720,240 640,210" opacity="0.75"/>
    <polygon points="760,260 840,290 820,380 740,350" opacity="0.6"/>
    <polygon points="140,340 220,380 180,460 100,420" opacity="0.5"/>
    <polygon points="260,420 340,400 360,480 280,500" opacity="0.65"/>
    <polygon points="600,390 680,430 650,510 570,470" opacity="0.55"/>
  </g>

  <!-- Large Central Floating Luminous Holographic Invoice (3D angled) -->
  <g transform="matrix(0.94, -0.12, 0.1, 0.96, 360, 110)">
    <rect width="280" height="350" rx="8" fill="url(#glowDoc)" stroke="#38bdf8" stroke-width="2.5"/>
    <rect width="280" height="350" rx="8" fill="none" stroke="#ffffff" stroke-width="0.8" opacity="0.6"/>

    <text x="25" y="45" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="20">INVOICE</text>
    <rect x="175" y="28" width="80" height="22" rx="3" fill="#0284c7" fill-opacity="0.4" stroke="#38bdf8" stroke-width="1"/>
    <text x="185" y="43" fill="#7dd3fc" font-family="monospace" font-size="10">99.4% FIDELITY</text>

    <!-- Table -->
    <rect x="25" y="75" width="230" height="150" rx="4" fill="#030c18" stroke="#38bdf8" stroke-width="1.2"/>
    <line x1="25" y1="100" x2="255" y2="100" stroke="#38bdf8" stroke-width="1"/>
    <text x="35" y="93" fill="#38bdf8" font-family="monospace" font-size="8">ITEM NAME</text>
    <text x="195" y="93" fill="#38bdf8" font-family="monospace" font-size="8">PRICE</text>
    
    <text x="35" y="125" fill="#cbd5e1" font-family="monospace" font-size="8">Enterprise Multimodal AI</text>
    <text x="195" y="125" fill="#ffffff" font-family="monospace" font-size="8">$18,500</text>
    <text x="35" y="150" fill="#cbd5e1" font-family="monospace" font-size="8">Layout Analysis Pipeline</text>
    <text x="195" y="150" fill="#ffffff" font-family="monospace" font-size="8">$6,200</text>
    <text x="35" y="175" fill="#cbd5e1" font-family="monospace" font-size="8">Pydantic v2 Schema Gate</text>
    <text x="195" y="175" fill="#ffffff" font-family="monospace" font-size="8">$4,300</text>

    <rect x="135" y="240" width="120" height="30" rx="3" fill="#0369a1" fill-opacity="0.4" stroke="#38bdf8" stroke-width="1"/>
    <text x="145" y="260" fill="#ffffff" font-family="monospace" font-weight="bold" font-size="11">TOTAL: $29,000</text>

    <!-- Red Stamp -->
    <g transform="translate(50, 240) rotate(-12)">
      <circle cx="20" cy="20" r="20" fill="none" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="3 2"/>
      <text x="6" y="23" fill="#ef4444" font-family="sans-serif" font-weight="bold" font-size="7">EXTRACTED</text>
    </g>
  </g>
</svg>
`;

// ==========================================
// 6. CAT AVATAR (For Next Project CTA)
// ==========================================
const catAvatarSvg = `
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="avBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#0f172a"/>
      <stop offset="100%" stopColor="#020617"/>
    </radialGradient>
    <radialGradient id="avEye" cx="40%" cy="40%" r="50%">
      <stop offset="0%" stopColor="#ffffff"/>
      <stop offset="50%" stopColor="#22d3ee"/>
      <stop offset="100%" stopColor="#0369a1"/>
    </radialGradient>
  </defs>
  <rect width="200" height="200" fill="url(#avBg)"/>
  <!-- Ears -->
  <polygon points="50,60 25,10 75,35" fill="#090d16" stroke="#38bdf8" stroke-width="2"/>
  <polygon points="150,60 175,10 125,35" fill="#090d16" stroke="#38bdf8" stroke-width="2"/>
  <!-- Head -->
  <ellipse cx="100" cy="100" rx="70" ry="60" fill="#090d16" stroke="#1e3a8a" stroke-width="2"/>
  <!-- Eyes -->
  <ellipse cx="70" cy="95" rx="20" ry="18" fill="url(#avEye)"/>
  <ellipse cx="130" cy="95" rx="20" ry="18" fill="url(#avEye)"/>
  <ellipse cx="70" cy="95" rx="6" ry="14" fill="#020617"/>
  <ellipse cx="130" cy="95" rx="6" ry="14" fill="#020617"/>
  <circle cx="65" cy="88" r="5" fill="#ffffff"/>
  <circle cx="125" cy="88" r="5" fill="#ffffff"/>
  <!-- Nose & Mouth -->
  <polygon points="100,120 95,115 105,115" fill="#f43f5e"/>
  <path d="M 92,125 Q 100,130 108,125" fill="none" stroke="#64748b" stroke-width="2"/>
</svg>
`;

renderSvg(hiveKmsSvg, 'hive-kms', 800, 500);
renderSvg(yopazSvg, 'yopaz-pulse', 800, 500);
renderSvg(pawcrewSvg, 'pawcrew', 800, 500);
renderSvg(aiDocSvg, 'ai-document-intelligence', 800, 500);
renderSvg(docHeroSvg, 'doc-detail-hero', 900, 600);
renderSvg(catAvatarSvg, 'cat-avatar', 200, 200);
