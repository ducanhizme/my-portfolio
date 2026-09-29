import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const width = 1280;
const height = 720;
const fps = 30;
const durationSec = 4; // 4 seconds loop = 120 frames
const totalFrames = fps * durationSec;

if (!fs.existsSync('public')) {
  fs.mkdirSync('public', { recursive: true });
}

const outputPath = 'public/boot-video.mp4';

console.log(`Generating ${totalFrames} frames of video to ${outputPath}...`);

const ffmpeg = spawn('ffmpeg', [
  '-y',
  '-f', 'rawvideo',
  '-vcodec', 'rawvideo',
  '-s', `${width}x${height}`,
  '-pix_fmt', 'rgb24',
  '-r', `${fps}`,
  '-i', '-',
  '-c:v', 'libx264',
  '-pix_fmt', 'yuv420p',
  '-profile:v', 'high',
  '-preset', 'ultrafast',
  '-crf', '22',
  outputPath
]);

ffmpeg.stderr.on('data', (d) => {
  // console.log(d.toString());
});

ffmpeg.on('close', (code) => {
  console.log(`FFmpeg exited with code ${code}`);
  if (code === 0 && fs.existsSync(outputPath)) {
    const stats = fs.statSync(outputPath);
    console.log(`Successfully created ${outputPath} (${(stats.size / 1024).toFixed(1)} KB)`);
  }
});

// Setup static scene data
// 1. Stars
const starCount = 200;
const stars = [];
for (let i = 0; i < starCount; i++) {
  stars.push({
    x: Math.random() * width,
    y: Math.random() * (height * 0.72),
    size: Math.random() * 2 + 1,
    baseBrightness: Math.random() * 0.5 + 0.5,
    speed: Math.random() * 0.05 + 0.02,
    phase: Math.random() * Math.PI * 2,
    r: 200 + Math.floor(Math.random() * 55),
    g: 220 + Math.floor(Math.random() * 35),
    b: 255
  });
}

// 2. Constellation Nodes
const nodeCount = 38;
const nodes = [];
for (let i = 0; i < nodeCount; i++) {
  nodes.push({
    x: Math.random() * width,
    y: Math.random() * (height * 0.65),
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.4,
    radius: Math.random() * 2.5 + 1.5
  });
}

// Moon parameters
const moonX = width * 0.5;
const moonY = height * 0.35;
const moonRadius = 160;

// Mountain silhouettes (polygon height map)
const mountainDistant = new Float32Array(width);
const mountainFore = new Float32Array(width);

for (let x = 0; x < width; x++) {
  const nx = x / width;
  // Distant peaks
  const dVal =
    0.62 +
    0.05 * Math.sin(nx * 12) +
    0.03 * Math.sin(nx * 26 + 1.2) +
    0.02 * Math.cos(nx * 45);
  mountainDistant[x] = dVal * height;

  // Foreground craggy peaks
  // Summit at x = 0.5 (center)
  const distFromCenter = Math.abs(nx - 0.5);
  const centerPeak = Math.max(0, 0.1 - distFromCenter * 0.6);
  const fVal =
    0.72 -
    centerPeak +
    0.06 * Math.sin(nx * 15 + 0.5) +
    0.04 * Math.sin(nx * 32 + 2.1) +
    0.02 * Math.cos(nx * 60);
  mountainFore[x] = fVal * height;
}

// Frame buffer (RGB24)
const frameBuffer = Buffer.alloc(width * height * 3);

for (let f = 0; f < totalFrames; f++) {
  const t = f / fps;
  const loopT = (f / totalFrames) * Math.PI * 2;

  // 1. Sky background
  for (let y = 0; y < height; y++) {
    const ny = y / height;
    // Dark space gradient: #010308 to #061126
    const r = Math.floor(1 + ny * 6);
    const g = Math.floor(3 + ny * 14);
    const b = Math.floor(8 + ny * 32);

    const rowOffset = y * width * 3;
    for (let x = 0; x < width; x++) {
      const idx = rowOffset + x * 3;
      frameBuffer[idx] = r;
      frameBuffer[idx + 1] = g;
      frameBuffer[idx + 2] = b;
    }
  }

  // 2. Nebula / Atmosphere glow around center
  for (let y = Math.floor(moonY - 260); y < Math.floor(moonY + 260); y++) {
    if (y < 0 || y >= height) continue;
    const dy = y - moonY;
    const rowOffset = y * width * 3;
    for (let x = Math.floor(moonX - 380); x < Math.floor(moonX + 380); x++) {
      if (x < 0 || x >= width) continue;
      const dx = x - moonX;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 380) {
        const factor = Math.pow(1 - dist / 380, 2);
        const idx = rowOffset + x * 3;
        frameBuffer[idx] = Math.min(255, frameBuffer[idx] + Math.floor(factor * 16));
        frameBuffer[idx + 1] = Math.min(255, frameBuffer[idx + 1] + Math.floor(factor * 45));
        frameBuffer[idx + 2] = Math.min(255, frameBuffer[idx + 2] + Math.floor(factor * 95));
      }
    }
  }

  // 3. Stars
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    const twinkle = 0.7 + 0.3 * Math.sin(s.phase + t * s.speed * 40);
    const sx = Math.floor(s.x);
    const sy = Math.floor(s.y);

    if (sx >= 0 && sx < width && sy >= 0 && sy < height) {
      const idx = (sy * width + sx) * 3;
      frameBuffer[idx] = Math.min(255, Math.floor(s.r * twinkle));
      frameBuffer[idx + 1] = Math.min(255, Math.floor(s.g * twinkle));
      frameBuffer[idx + 2] = Math.min(255, Math.floor(s.b * twinkle));

      // Plus shaped glow for larger stars
      if (s.size > 2) {
        const neighbors = [[sx + 1, sy], [sx - 1, sy], [sx, sy + 1], [sx, sy - 1]];
        for (const [nx, ny] of neighbors) {
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const nIdx = (ny * width + nx) * 3;
            frameBuffer[nIdx] = Math.min(255, frameBuffer[nIdx] + 40);
            frameBuffer[nIdx + 1] = Math.min(255, frameBuffer[nIdx + 1] + 60);
            frameBuffer[nIdx + 2] = Math.min(255, frameBuffer[nIdx + 2] + 90);
          }
        }
      }
    }
  }

  // 4. Central Moon
  for (let y = Math.floor(moonY - moonRadius); y <= Math.floor(moonY + moonRadius); y++) {
    if (y < 0 || y >= height) continue;
    const dy = y - moonY;
    const rowOffset = y * width * 3;
    for (let x = Math.floor(moonX - moonRadius); x <= Math.floor(moonX + moonRadius); x++) {
      if (x < 0 || x >= width) continue;
      const dx = x - moonX;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= moonRadius) {
        // Spherical 3D shading
        const nx = dx / moonRadius;
        const ny = dy / moonRadius;
        const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));

        // Light coming from upper right
        const lx = 0.5;
        const ly = -0.3;
        const lz = 0.7;
        const diff = Math.max(0, nx * lx + ny * ly + nz * lz);

        // Crater procedural detail
        const craterNoise =
          Math.sin(nx * 14 + ny * 8) * 0.12 +
          Math.cos(nx * 22 - ny * 18) * 0.08;

        const baseVal = Math.max(0, diff + craterNoise);

        // Electric blue atmosphere / surface
        const mr = Math.floor(18 + baseVal * 90);
        const mg = Math.floor(45 + baseVal * 140);
        const mb = Math.floor(95 + baseVal * 160);

        const idx = rowOffset + x * 3;
        frameBuffer[idx] = mr;
        frameBuffer[idx + 1] = mg;
        frameBuffer[idx + 2] = mb;

        // Rim highlight
        if (dist > moonRadius - 3) {
          const rim = (dist - (moonRadius - 3)) / 3;
          frameBuffer[idx] = Math.min(255, frameBuffer[idx] + Math.floor(rim * 140));
          frameBuffer[idx + 1] = Math.min(255, frameBuffer[idx + 1] + Math.floor(rim * 180));
          frameBuffer[idx + 2] = 255;
        }
      }
    }
  }

  // 5. Constellation Lines
  // Connect nodes if close
  for (let i = 0; i < nodes.length; i++) {
    const n1 = nodes[i];
    // update position with loop
    const px1 = n1.x + Math.sin(loopT + i) * 12;
    const py1 = n1.y + Math.cos(loopT + i * 0.7) * 8;

    for (let j = i + 1; j < nodes.length; j++) {
      const n2 = nodes[j];
      const px2 = n2.x + Math.sin(loopT + j) * 12;
      const py2 = n2.y + Math.cos(loopT + j * 0.7) * 8;

      const d = Math.hypot(px1 - px2, py1 - py2);
      if (d < 120) {
        const alpha = (1 - d / 120) * 0.55;
        // Simple bresenham line raster
        const steps = Math.ceil(d);
        for (let s = 0; s <= steps; s += 2) {
          const lx = Math.floor(px1 + (px2 - px1) * (s / steps));
          const ly = Math.floor(py1 + (py2 - py1) * (s / steps));
          if (lx >= 0 && lx < width && ly >= 0 && ly < height) {
            const lIdx = (ly * width + lx) * 3;
            frameBuffer[lIdx] = Math.min(255, frameBuffer[lIdx] + Math.floor(56 * alpha));
            frameBuffer[lIdx + 1] = Math.min(255, frameBuffer[lIdx + 1] + Math.floor(189 * alpha));
            frameBuffer[lIdx + 2] = Math.min(255, frameBuffer[lIdx + 2] + Math.floor(248 * alpha));
          }
        }
      }
    }

    // Node star point
    const kx = Math.floor(px1);
    const ky = Math.floor(py1);
    if (kx >= 0 && kx < width && ky >= 0 && ky < height) {
      const idx = (ky * width + kx) * 3;
      frameBuffer[idx] = 120;
      frameBuffer[idx + 1] = 220;
      frameBuffer[idx + 2] = 255;
    }
  }

  // 6. Mountain Ranges
  // Distant mountain
  for (let x = 0; x < width; x++) {
    const yStart = Math.floor(mountainDistant[x]);
    for (let y = yStart; y < height; y++) {
      const idx = (y * width + x) * 3;
      // Dark blue-grey distant mountain
      frameBuffer[idx] = Math.floor(frameBuffer[idx] * 0.25 + 4);
      frameBuffer[idx + 1] = Math.floor(frameBuffer[idx + 1] * 0.25 + 9);
      frameBuffer[idx + 2] = Math.floor(frameBuffer[idx + 2] * 0.25 + 18);
    }
  }

  // Foreground jagged mountains
  for (let x = 0; x < width; x++) {
    const yStart = Math.floor(mountainFore[x]);
    for (let y = yStart; y < height; y++) {
      const idx = (y * width + x) * 3;
      // Ridge rim highlight
      if (y === yStart) {
        frameBuffer[idx] = 30;
        frameBuffer[idx + 1] = 80;
        frameBuffer[idx + 2] = 140;
      } else {
        frameBuffer[idx] = 2;
        frameBuffer[idx + 1] = 4;
        frameBuffer[idx + 2] = 7;
      }
    }
  }

  // 7. Silhouette of the Engineer standing on the summit (center)
  const summitX = Math.floor(width * 0.5);
  const summitY = Math.floor(mountainFore[summitX]);
  const figH = 50;

  // Head
  const headY = summitY - figH;
  for (let dy = -7; dy <= 7; dy++) {
    for (let dx = -6; dx <= 6; dx++) {
      if (dx * dx + dy * dy <= 42) {
        const px = summitX + dx;
        const py = headY + dy;
        if (px >= 0 && px < width && py >= 0 && py < height) {
          const idx = (py * width + px) * 3;
          frameBuffer[idx] = 1;
          frameBuffer[idx + 1] = 2;
          frameBuffer[idx + 2] = 3;
        }
      }
    }
  }

  // Torso / Body
  for (let py = headY + 8; py <= summitY - 18; py++) {
    const bodyW = 10;
    for (let dx = -bodyW; dx <= bodyW; dx++) {
      const px = summitX + dx;
      if (px >= 0 && px < width && py >= 0 && py < height) {
        const idx = (py * width + px) * 3;
        frameBuffer[idx] = 1;
        frameBuffer[idx + 1] = 2;
        frameBuffer[idx + 2] = 3;
      }
    }
  }

  // Legs
  for (let py = summitY - 17; py <= summitY; py++) {
    for (const legX of [summitX - 5, summitX + 5]) {
      for (let dx = -3; dx <= 3; dx++) {
        const px = legX + dx;
        if (px >= 0 && px < width && py >= 0 && py < height) {
          const idx = (py * width + px) * 3;
          frameBuffer[idx] = 1;
          frameBuffer[idx + 1] = 2;
          frameBuffer[idx + 2] = 3;
        }
      }
    }
  }

  // Write frame to ffmpeg
  ffmpeg.stdin.write(frameBuffer);
}

ffmpeg.stdin.end();
