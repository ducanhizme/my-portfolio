import React, { useRef, useEffect } from 'react';

interface CosmicBootVisualProps {
  className?: string;
}

export const CosmicBootVisual: React.FC<CosmicBootVisualProps> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    setSize();
    window.addEventListener('resize', setSize);

    // 1. Stars configuration
    const starCount = 180;
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      alpha: number;
      speed: number;
      offset: number;
      color: string;
    }> = [];

    const starColors = ['#ffffff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#93c5fd'];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random() * 0.75,
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.02 + 0.008,
        offset: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // 2. Neural Constellation Network
    const nodeCount = 36;
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random(),
        y: Math.random() * 0.65,
        vx: (Math.random() - 0.5) * 0.00015,
        vy: (Math.random() - 0.5) * 0.00015,
        radius: Math.random() * 2 + 1.2,
      });
    }

    let time = 0;

    const draw = () => {
      time += 0.016;
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // 1. Deep Midnight Cosmic Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#010307');
      skyGrad.addColorStop(0.35, '#030816');
      skyGrad.addColorStop(0.65, '#061328');
      skyGrad.addColorStop(1, '#020409');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Deep cyan/blue nebula cloud in the center
      const nebulaGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        40,
        width * 0.5,
        height * 0.35,
        width * 0.65
      );
      nebulaGrad.addColorStop(0, 'rgba(14, 165, 233, 0.16)');
      nebulaGrad.addColorStop(0.4, 'rgba(3, 105, 161, 0.08)');
      nebulaGrad.addColorStop(0.8, 'rgba(30, 58, 138, 0.03)');
      nebulaGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Stars
      stars.forEach((s) => {
        const twinkle = Math.sin(time * s.speed * 60 + s.offset) * 0.35;
        const currentAlpha = Math.max(0.1, Math.min(1, s.alpha + twinkle));
        const sx = s.x * width;
        const sy = s.y * height;

        ctx.beginPath();
        ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Subtle glow halo for larger stars
        if (s.size > 1.8) {
          ctx.beginPath();
          ctx.arc(sx, sy, s.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
          ctx.fill();
        }
      });

      // 3. Central Giant Glowing Celestial Moon
      const moonX = width * 0.5;
      const moonY = height * 0.34;
      const moonRadius = Math.min(width * 0.22, height * 0.26, 210);

      // Moon Outer Atmospheric Radiant Corona (Glowing Blue Atmosphere)
      const corona = ctx.createRadialGradient(
        moonX,
        moonY,
        moonRadius * 0.9,
        moonX,
        moonY,
        moonRadius * 2.6
      );
      corona.addColorStop(0, 'rgba(56, 189, 248, 0.38)');
      corona.addColorStop(0.2, 'rgba(14, 165, 233, 0.2)');
      corona.addColorStop(0.5, 'rgba(3, 105, 161, 0.08)');
      corona.addColorStop(1, 'transparent');
      ctx.fillStyle = corona;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius * 2.6, 0, Math.PI * 2);
      ctx.fill();

      // Moon Body Clip
      ctx.save();
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.clip();

      // Moon Base Texture Gradient
      const moonBody = ctx.createRadialGradient(
        moonX - moonRadius * 0.3,
        moonY - moonRadius * 0.3,
        moonRadius * 0.05,
        moonX,
        moonY,
        moonRadius
      );
      moonBody.addColorStop(0, '#58a5da');
      moonBody.addColorStop(0.25, '#224d77');
      moonBody.addColorStop(0.65, '#0f243c');
      moonBody.addColorStop(0.9, '#071321');
      moonBody.addColorStop(1, '#02060d');
      ctx.fillStyle = moonBody;
      ctx.fillRect(moonX - moonRadius, moonY - moonRadius, moonRadius * 2, moonRadius * 2);

      // Craters & Maria Dark Patches
      const craterData = [
        { x: -0.25, y: -0.15, r: 0.28 },
        { x: 0.18, y: 0.12, r: 0.32 },
        { x: -0.08, y: 0.28, r: 0.22 },
        { x: 0.32, y: -0.22, r: 0.2 },
        { x: -0.38, y: 0.18, r: 0.16 },
        { x: 0.05, y: -0.32, r: 0.18 },
      ];

      craterData.forEach((c) => {
        const cx = moonX + c.x * moonRadius;
        const cy = moonY + c.y * moonRadius;
        const cr = c.r * moonRadius;
        const cGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
        cGrad.addColorStop(0, 'rgba(2, 6, 17, 0.7)');
        cGrad.addColorStop(0.7, 'rgba(10, 25, 47, 0.45)');
        cGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = cGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, Math.PI * 2);
        ctx.fill();
      });

      // Luminous Crescent Edge Highlight on Right
      const crescent = ctx.createRadialGradient(
        moonX + moonRadius * 0.5,
        moonY - moonRadius * 0.2,
        moonRadius * 0.35,
        moonX,
        moonY,
        moonRadius
      );
      crescent.addColorStop(0, 'rgba(224, 242, 254, 0.85)');
      crescent.addColorStop(0.35, 'rgba(56, 189, 248, 0.45)');
      crescent.addColorStop(0.8, 'rgba(14, 165, 233, 0.05)');
      crescent.addColorStop(1, 'transparent');
      ctx.fillStyle = crescent;
      ctx.fillRect(moonX - moonRadius, moonY - moonRadius, moonRadius * 2, moonRadius * 2);

      ctx.restore();

      // Sharp Glowing Outer Lunar Rim Ring
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.65)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 4. Glowing Blue Neural Constellation Network Overlay
      // Connecting stars and nodes across the moon and sky
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        n1.x += n1.vx;
        n1.y += n1.vy;
        if (n1.x < 0.05 || n1.x > 0.95) n1.vx *= -1;
        if (n1.y < 0.05 || n1.y > 0.65) n1.vy *= -1;

        const x1 = n1.x * width;
        const y1 = n1.y * height;

        // Draw connections to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const x2 = n2.x * width;
          const y2 = n2.y * height;
          const dist = Math.hypot(x1 - x2, y1 - y2);

          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.38;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }

        // Draw node points
        ctx.beginPath();
        ctx.arc(x1, y1, n1.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#0284c7';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 5. Jagged Distant Mountain Silhouettes
      ctx.beginPath();
      ctx.moveTo(0, height * 0.66);
      const distantPeaks = [
        [0.05, 0.61],
        [0.15, 0.58],
        [0.25, 0.64],
        [0.35, 0.59],
        [0.44, 0.63],
        [0.55, 0.6],
        [0.66, 0.57],
        [0.78, 0.63],
        [0.88, 0.58],
        [1.0, 0.67],
      ];
      distantPeaks.forEach(([px, py]) => ctx.lineTo(width * px, height * py));
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = '#050a16';
      ctx.fill();

      // Atmospheric Blue Mist in Mountain Valleys
      const valleyMist = ctx.createLinearGradient(0, height * 0.58, 0, height * 0.72);
      valleyMist.addColorStop(0, 'rgba(14, 165, 233, 0.12)');
      valleyMist.addColorStop(0.5, 'rgba(3, 105, 161, 0.08)');
      valleyMist.addColorStop(1, 'transparent');
      ctx.fillStyle = valleyMist;
      ctx.fillRect(0, height * 0.56, width, height * 0.2);

      // 6. Foreground Rugged Obsidian Mountain Peaks
      ctx.beginPath();
      ctx.moveTo(0, height * 0.74);
      const foregroundPeaks = [
        [0.08, 0.7],
        [0.18, 0.65],
        [0.28, 0.72],
        [0.38, 0.68],
        [0.5, 0.61], // Center rocky summit where engineer stands
        [0.62, 0.69],
        [0.72, 0.66],
        [0.83, 0.72],
        [0.92, 0.67],
        [1.0, 0.76],
      ];
      foregroundPeaks.forEach(([px, py]) => ctx.lineTo(width * px, height * py));
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = '#020408';
      ctx.fill();

      // Mountain Ridge Rim Glow
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // 7. Silhouette of the Engineer Standing on the Summit Ridge
      // (Identical to 00:11-00:15 in the video)
      const summitX = width * 0.5;
      const summitY = height * 0.61; // Peak position
      const figH = Math.min(width, height) * 0.075;

      ctx.fillStyle = '#000103';

      // Head
      ctx.beginPath();
      ctx.arc(summitX, summitY - figH * 0.9, figH * 0.09, 0, Math.PI * 2);
      ctx.fill();

      // Shoulders & Body
      ctx.beginPath();
      ctx.moveTo(summitX - figH * 0.14, summitY - figH * 0.78);
      ctx.lineTo(summitX + figH * 0.14, summitY - figH * 0.78);
      ctx.lineTo(summitX + figH * 0.11, summitY - figH * 0.36);
      ctx.lineTo(summitX - figH * 0.11, summitY - figH * 0.36);
      ctx.closePath();
      ctx.fill();

      // Arms by side
      ctx.beginPath();
      ctx.rect(summitX - figH * 0.17, summitY - figH * 0.78, figH * 0.05, figH * 0.42);
      ctx.rect(summitX + figH * 0.12, summitY - figH * 0.78, figH * 0.05, figH * 0.42);
      ctx.fill();

      // Legs standing firmly on the summit rock
      ctx.beginPath();
      ctx.rect(summitX - figH * 0.1, summitY - figH * 0.36, figH * 0.08, figH * 0.36);
      ctx.rect(summitX + figH * 0.02, summitY - figH * 0.36, figH * 0.08, figH * 0.36);
      ctx.fill();

      // Atmospheric rim light on head and shoulders
      ctx.beginPath();
      ctx.arc(summitX, summitY - figH * 0.9, figH * 0.09, Math.PI, 0);
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.55)';
      ctx.lineWidth = 1;
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
