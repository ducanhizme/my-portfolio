import { spawn } from 'child_process';
import fs from 'fs';

const width = 1920;
const height = 1080;
const outputPath = 'public/hero-background.png';

console.log(`Rendering 1920x1080 cinematic hero background to ${outputPath}...`);

const ffmpeg = spawn('ffmpeg', [
  '-y',
  '-f', 'rawvideo',
  '-vcodec', 'rawvideo',
  '-s', `${width}x${height}`,
  '-pix_fmt', 'rgb24',
  '-r', '1',
  '-i', '-',
  '-vframes', '1',
  outputPath
]);

ffmpeg.stderr.on('data', (d) => {
  // console.log(d.toString());
});

ffmpeg.on('close', (code) => {
  console.log(`FFmpeg exited with code ${code}`);
  if (code === 0 && fs.existsSync(outputPath)) {
    const stats = fs.statSync(outputPath);
    console.log(`Successfully generated ${outputPath} (${(stats.size / 1024).toFixed(1)} KB)`);
  }
});

// Setup RGB24 buffer
const buf = Buffer.alloc(width * height * 3);

// Deterministic LCG random
let seed = 48291;
function rand() {
  seed = (1664525 * seed + 1013904223) % 4294967296;
  return seed / 4294967296;
}

// 1. Sky & Deep Cosmos Base
for (let y = 0; y < height; y++) {
  const ny = y / height;
  const rowOffset = y * width * 3;
  for (let x = 0; x < width; x++) {
    const nx = x / width;
    // Deep midnight space: #020409 to #061124
    let r = 2 + Math.floor(ny * 5);
    let g = 4 + Math.floor(ny * 12);
    let b = 9 + Math.floor(ny * 26);

    // Subtle blue horizon wash in lower third
    if (ny > 0.45 && ny < 0.78) {
      const hFade = Math.sin((ny - 0.45) / 0.33 * Math.PI);
      r += Math.floor(hFade * 4);
      g += Math.floor(hFade * 14);
      b += Math.floor(hFade * 32);
    }

    const idx = rowOffset + x * 3;
    buf[idx] = Math.min(255, r);
    buf[idx + 1] = Math.min(255, g);
    buf[idx + 2] = Math.min(255, b);
  }
}

// 2. Milky Way Nebula Stream (diagonal across top-center)
for (let y = 0; y < Math.floor(height * 0.7); y++) {
  const rowOffset = y * width * 3;
  for (let x = 0; x < width; x++) {
    // Diagonal axis from (600, 0) to (1400, 600)
    const lineX = 650 + (y / 600) * 750;
    const dist = Math.abs(x - lineX);
    if (dist < 220) {
      const falloff = Math.pow(1 - dist / 220, 2);
      const noise = (Math.sin(x * 0.05 + y * 0.03) + Math.cos(x * 0.02 - y * 0.04)) * 0.5 + 0.5;
      const intensity = falloff * (0.6 + noise * 0.4) * (1 - y / (height * 0.7));

      const idx = rowOffset + x * 3;
      buf[idx] = Math.min(255, buf[idx] + Math.floor(intensity * 18));
      buf[idx + 1] = Math.min(255, buf[idx + 1] + Math.floor(intensity * 40));
      buf[idx + 2] = Math.min(255, buf[idx + 2] + Math.floor(intensity * 85));
    }
  }
}

// 3. Dense Starfield
const starCount = 650;
for (let i = 0; i < starCount; i++) {
  const sx = Math.floor(rand() * width);
  const sy = Math.floor(rand() * (height * 0.72));
  const brightness = rand() * 0.6 + 0.4;
  const isCyan = rand() > 0.65;
  const sr = isCyan ? 180 : 255;
  const sg = isCyan ? 230 : 255;
  const sb = 255;

  if (sx >= 0 && sx < width && sy >= 0 && sy < height) {
    const idx = (sy * width + sx) * 3;
    buf[idx] = Math.min(255, Math.floor(sr * brightness));
    buf[idx + 1] = Math.min(255, Math.floor(sg * brightness));
    buf[idx + 2] = Math.min(255, Math.floor(sb * brightness));

    // Major stars with soft cross-flare
    if (rand() > 0.94) {
      const neighbors = [
        [sx + 1, sy], [sx - 1, sy], [sx, sy + 1], [sx, sy - 1],
        [sx + 2, sy], [sx - 2, sy], [sx, sy + 2], [sx, sy - 2]
      ];
      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nIdx = (ny * width + nx) * 3;
          buf[nIdx] = Math.min(255, buf[nIdx] + Math.floor(sr * 0.35));
          buf[nIdx + 1] = Math.min(255, buf[nIdx + 1] + Math.floor(sg * 0.45));
          buf[nIdx + 2] = Math.min(255, buf[nIdx + 2] + Math.floor(sb * 0.6));
        }
      }
    }
  }
}

// 4. Giant Planet on Upper-Right (matching reference image)
const planetX = 1480;
const planetY = 380;
const planetRadius = 450;

// Planet Atmospheric Outer Corona Glow
for (let y = Math.floor(planetY - planetRadius * 1.5); y < Math.floor(planetY + planetRadius * 1.5); y++) {
  if (y < 0 || y >= height) continue;
  const dy = y - planetY;
  const rowOffset = y * width * 3;
  for (let x = Math.floor(planetX - planetRadius * 1.5); x < Math.floor(planetX + planetRadius * 1.5); x++) {
    if (x < 0 || x >= width) continue;
    const dx = x - planetX;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < planetRadius * 1.45 && dist > planetRadius * 0.92) {
      // Glow strongest on the left rim towards the center of composition
      const angle = Math.atan2(dy, dx);
      const rimFactor = Math.pow((dist - planetRadius * 0.92) / (planetRadius * 0.53), 1);
      const fade = Math.pow(1 - (dist - planetRadius * 0.92) / (planetRadius * 0.53), 2.2);

      // Strongest on west / northwest edge
      const westWeight = Math.max(0, -Math.cos(angle) * 0.7 - Math.sin(angle) * 0.3 + 0.3);
      const intensity = fade * westWeight;

      const idx = rowOffset + x * 3;
      buf[idx] = Math.min(255, buf[idx] + Math.floor(intensity * 40));
      buf[idx + 1] = Math.min(255, buf[idx + 1] + Math.floor(intensity * 120));
      buf[idx + 2] = Math.min(255, buf[idx + 2] + Math.floor(intensity * 230));
    }
  }
}

// Planet Body with Spherical Shading & Rim
for (let y = Math.floor(planetY - planetRadius); y <= Math.floor(planetY + planetRadius); y++) {
  if (y < 0 || y >= height) continue;
  const dy = y - planetY;
  const rowOffset = y * width * 3;
  for (let x = Math.floor(planetX - planetRadius); x <= Math.floor(planetX + planetRadius); x++) {
    if (x < 0 || x >= width) continue;
    const dx = x - planetX;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist <= planetRadius) {
      const nx = dx / planetRadius;
      const ny = dy / planetRadius;
      const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));

      // Light source from upper-left / space
      const lx = -0.7;
      const ly = -0.3;
      const lz = 0.65;
      const diff = Math.max(0, nx * lx + ny * ly + nz * lz);

      // Organic texture (clouds and continents)
      const cloudNoise =
        Math.sin(nx * 8 + ny * 6 + nz * 4) * 0.15 +
        Math.cos(nx * 14 - ny * 10) * 0.1 +
        Math.sin(nx * 26 + ny * 18) * 0.05;

      const surface = Math.max(0, diff + cloudNoise);

      // Deep dark night side on the right, electric blue atmospheric glow on the left
      const pr = Math.floor(3 + surface * 55);
      const pg = Math.floor(8 + surface * 115);
      const pb = Math.floor(22 + surface * 195);

      const idx = rowOffset + x * 3;
      buf[idx] = pr;
      buf[idx + 1] = pg;
      buf[idx + 2] = pb;

      // Bright razor-sharp cyan-white atmosphere edge on West / Upper-West
      if (dist > planetRadius - 6) {
        const rimWeight = Math.max(0, -nx * 0.85 - ny * 0.35);
        if (rimWeight > 0) {
          const edgeAlpha = ((dist - (planetRadius - 6)) / 6) * rimWeight;
          buf[idx] = Math.min(255, buf[idx] + Math.floor(edgeAlpha * 160));
          buf[idx + 1] = Math.min(255, buf[idx + 1] + Math.floor(edgeAlpha * 220));
          buf[idx + 2] = Math.min(255, buf[idx + 2] + Math.floor(edgeAlpha * 255));
        }
      }
    }
  }
}

// Moon satellite next to planet on the right
const moonX = 1820;
const moonY = 400;
const moonR = 40;
for (let y = Math.floor(moonY - moonR); y <= Math.floor(moonY + moonR); y++) {
  if (y < 0 || y >= height) continue;
  const dy = y - moonY;
  const rowOffset = y * width * 3;
  for (let x = Math.floor(moonX - moonR); x <= Math.floor(moonX + moonR); x++) {
    if (x < 0 || x >= width) continue;
    const dx = x - moonX;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist <= moonR) {
      const nx = dx / moonR;
      const ny = dy / moonR;
      const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
      const diff = Math.max(0, -nx * 0.7 - ny * 0.3 + nz * 0.65);
      const idx = rowOffset + x * 3;
      buf[idx] = Math.floor(10 + diff * 80);
      buf[idx + 1] = Math.floor(16 + diff * 110);
      buf[idx + 2] = Math.floor(28 + diff * 150);
    }
  }
}

// 5. Mountain Terrain Map Generation
const mountainFar = new Float32Array(width);
const mountainMid = new Float32Array(width);
const mountainFore = new Float32Array(width);

for (let x = 0; x < width; x++) {
  const nx = x / width;

  // Far mountain silhouette
  const fM =
    0.66 +
    0.04 * Math.sin(nx * 10 + 0.3) +
    0.03 * Math.sin(nx * 22 + 1.5) +
    0.02 * Math.cos(nx * 42);
  mountainFar[x] = fM * height;

  // Mid mountain ridges with valley dip on right for river
  const valleyDip = Math.max(0, 0.08 - Math.abs(nx - 0.75) * 0.3);
  const mM =
    0.73 +
    valleyDip +
    0.05 * Math.sin(nx * 14 + 1.2) +
    0.03 * Math.cos(nx * 30 + 0.8) +
    0.02 * Math.sin(nx * 55);
  mountainMid[x] = mM * height;

  // Foreground craggy summit ridge (Peak at ~37% x where traveler stands)
  const distFromPeak = Math.abs(nx - 0.37);
  const peakHeight = Math.max(0, 0.12 - distFromPeak * 0.75);
  const foreM =
    0.78 -
    peakHeight +
    0.04 * Math.sin(nx * 18 + 0.5) +
    0.02 * Math.cos(nx * 40 + 2.0);
  mountainFore[x] = foreM * height;
}

// Render Far Mountains
for (let x = 0; x < width; x++) {
  const yStart = Math.floor(mountainFar[x]);
  for (let y = yStart; y < height; y++) {
    const idx = (y * width + x) * 3;
    buf[idx] = Math.floor(buf[idx] * 0.3 + 6);
    buf[idx + 1] = Math.floor(buf[idx + 1] * 0.3 + 12);
    buf[idx + 2] = Math.floor(buf[idx + 2] * 0.3 + 24);
  }
}

// Valley Mist & Distant City / River Lights (right valley)
for (let y = Math.floor(height * 0.7); y < Math.floor(height * 0.88); y++) {
  const rowOffset = y * width * 3;
  for (let x = Math.floor(width * 0.58); x < Math.floor(width * 0.92); x++) {
    const nx = x / width;
    const ny = y / height;
    // Sinuous river curve
    const riverX = (0.75 + Math.sin(ny * 12) * 0.05) * width;
    const distToRiver = Math.abs(x - riverX);
    if (distToRiver < 70) {
      const rAlpha = Math.pow(1 - distToRiver / 70, 2) * 0.55;
      const idx = rowOffset + x * 3;
      buf[idx] = Math.min(255, buf[idx] + Math.floor(rAlpha * 160));
      buf[idx + 1] = Math.min(255, buf[idx + 1] + Math.floor(rAlpha * 180));
      buf[idx + 2] = Math.min(255, buf[idx + 2] + Math.floor(rAlpha * 220));
    }

    // Warm city lights specks
    if (rand() > 0.985) {
      const idx = rowOffset + x * 3;
      buf[idx] = Math.min(255, buf[idx] + 180);
      buf[idx + 1] = Math.min(255, buf[idx + 1] + 150);
      buf[idx + 2] = Math.min(255, buf[idx + 2] + 90);
    }
  }
}

// Render Mid Mountains
for (let x = 0; x < width; x++) {
  const yStart = Math.floor(mountainMid[x]);
  for (let y = yStart; y < height; y++) {
    const idx = (y * width + x) * 3;
    if (y === yStart) {
      // Subtle rim light
      buf[idx] = 18;
      buf[idx + 1] = 42;
      buf[idx + 2] = 75;
    } else {
      buf[idx] = Math.floor(buf[idx] * 0.2 + 4);
      buf[idx + 1] = Math.floor(buf[idx + 1] * 0.2 + 8);
      buf[idx + 2] = Math.floor(buf[idx + 2] * 0.2 + 16);
    }
  }
}

// Fog layer above foreground
for (let y = Math.floor(height * 0.72); y < Math.floor(height * 0.82); y++) {
  const fogAlpha = Math.sin((y - height * 0.72) / (height * 0.1) * Math.PI) * 0.12;
  const rowOffset = y * width * 3;
  for (let x = 0; x < width; x++) {
    const idx = rowOffset + x * 3;
    buf[idx] = Math.min(255, buf[idx] + Math.floor(fogAlpha * 40));
    buf[idx + 1] = Math.min(255, buf[idx + 1] + Math.floor(fogAlpha * 85));
    buf[idx + 2] = Math.min(255, buf[idx + 2] + Math.floor(fogAlpha * 140));
  }
}

// Render Foreground Rocky Peak (Obsidian dark crags)
for (let x = 0; x < width; x++) {
  const yStart = Math.floor(mountainFore[x]);
  for (let y = yStart; y < height; y++) {
    const idx = (y * width + x) * 3;
    // Craggy noise texture
    const rockNoise = Math.sin(x * 0.2 + y * 0.3) * 3 + Math.cos(x * 0.15 - y * 0.1) * 2;
    if (y === yStart || y === yStart + 1) {
      buf[idx] = 25;
      buf[idx + 1] = 60;
      buf[idx + 2] = 100;
    } else {
      buf[idx] = Math.max(1, Math.min(255, 3 + Math.floor(rockNoise)));
      buf[idx + 1] = Math.max(2, Math.min(255, 5 + Math.floor(rockNoise * 1.5)));
      buf[idx + 2] = Math.max(4, Math.min(255, 9 + Math.floor(rockNoise * 2.0)));
    }
  }
}

// 6. Silhouette of the Traveler / Engineer Standing on Summit (at ~37% x)
const summitX = Math.floor(width * 0.37);
const summitY = Math.floor(mountainFore[summitX]);
const figH = 75;

// Head
const headY = summitY - figH;
for (let dy = -10; dy <= 10; dy++) {
  for (let dx = -9; dx <= 9; dx++) {
    if (dx * dx + dy * dy <= 85) {
      const px = summitX + dx;
      const py = headY + dy;
      if (px >= 0 && px < width && py >= 0 && py < height) {
        const idx = (py * width + px) * 3;
        buf[idx] = 1;
        buf[idx + 1] = 2;
        buf[idx + 2] = 4;
      }
    }
  }
}

// Backpack & Jacket Torso
for (let py = headY + 11; py <= summitY - 26; py++) {
  const bodyW = 16;
  for (let dx = -bodyW; dx <= bodyW; dx++) {
    const px = summitX + dx;
    if (px >= 0 && px < width && py >= 0 && py < height) {
      const idx = (py * width + px) * 3;
      buf[idx] = 1;
      buf[idx + 1] = 2;
      buf[idx + 2] = 4;
    }
  }
}

// Legs
for (let py = summitY - 25; py <= summitY; py++) {
  for (const legX of [summitX - 7, summitX + 7]) {
    for (let dx = -4; dx <= 4; dx++) {
      const px = legX + dx;
      if (px >= 0 && px < width && py >= 0 && py < height) {
        const idx = (py * width + px) * 3;
        buf[idx] = 1;
        buf[idx + 1] = 2;
        buf[idx + 2] = 4;
      }
    }
  }
}

// Pipe buffer to ffmpeg
ffmpeg.stdin.write(buf);
ffmpeg.stdin.end();
