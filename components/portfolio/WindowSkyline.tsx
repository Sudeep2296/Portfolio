"use client";

import React, { useMemo } from "react";
import * as THREE from "three";

// Generate a procedural canvas texture for the night city skyline, crescent moon, and stars
export function createWindowSkylineTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // 1. Deep nocturnal sky gradient matching reference image
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  skyGrad.addColorStop(0, "#01030e");
  skyGrad.addColorStop(0.3, "#03061c");
  skyGrad.addColorStop(0.55, "#080c30");
  skyGrad.addColorStop(0.8, "#0e1342");
  skyGrad.addColorStop(1, "#141a50");
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Soft atmospheric galactic haze
  const nebGrad = ctx.createRadialGradient(720, 240, 30, 720, 240, 480);
  nebGrad.addColorStop(0, "rgba(99, 102, 241, 0.24)");
  nebGrad.addColorStop(0.4, "rgba(59, 130, 246, 0.09)");
  nebGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = nebGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // 2. Crisp twinkling stars across the upper 65% of the sky
  const seed = 77;
  for (let i = 0; i < 180; i++) {
    const x = (((Math.sin(i * 127.1 + seed) * 43758.5453) % 1 + 1) % 1) * 1024;
    const y = (((Math.cos(i * 311.7 + seed) * 43758.5453) % 1 + 1) % 1) * 620;
    
    // Don't draw stars directly overlapping the moon disc
    const distToMoon = Math.hypot(x - 720, y - 240);
    if (distToMoon < 85) continue;

    const size = i % 11 === 0 ? 2.5 : i % 4 === 0 ? 1.8 : 1.2;
    const alpha = 0.45 + 0.55 * (((i * 13) % 10) / 10);
    ctx.globalAlpha = alpha;

    ctx.fillStyle = i % 5 === 0 ? "#fef08a" : i % 3 === 0 ? "#bae6fd" : "#ffffff";
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    // Delicate 4-point twinkle spikes on the brightest stars
    if (i % 14 === 0) {
      ctx.globalAlpha = 0.35;
      ctx.fillRect(x - 5, y - 0.5, 10, 1);
      ctx.fillRect(x - 0.5, y - 5, 1, 10);
    }
  }

  // 3. Glowing Crescent Moon in TOP-RIGHT pane (matching reference image media_1791642126245.png)
  ctx.globalAlpha = 1.0;
  const moonX = 720;
  const moonY = 220;
  const moonR = 46;

  // Soft atmospheric moonlight glow aura on the sky
  const moonAura = ctx.createRadialGradient(moonX, moonY, moonR * 0.3, moonX, moonY, moonR * 3.6);
  moonAura.addColorStop(0, "rgba(254, 249, 195, 0.45)");
  moonAura.addColorStop(0.3, "rgba(186, 230, 253, 0.2)");
  moonAura.addColorStop(0.65, "rgba(99, 102, 241, 0.08)");
  moonAura.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = moonAura;
  ctx.beginPath();
  ctx.arc(moonX, moonY, moonR * 3.6, 0, Math.PI * 2);
  ctx.fill();

  // Subtle circular halo ring around the full moon circumference as in reference
  ctx.strokeStyle = "rgba(224, 231, 255, 0.22)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(moonX, moonY, moonR * 1.32, 0, Math.PI * 2);
  ctx.stroke();

  // Render the crescent moon on an isolated scratch canvas to preserve the background sky
  const mCanvas = document.createElement("canvas");
  mCanvas.width = 160;
  mCanvas.height = 160;
  const mCtx = mCanvas.getContext("2d");
  if (mCtx) {
    const cx = 80;
    const cy = 80;

    // Draw solid glowing white moon circle
    mCtx.save();
    mCtx.shadowColor = "#fef08a";
    mCtx.shadowBlur = 14;
    mCtx.fillStyle = "#fffbeb";
    mCtx.beginPath();
    mCtx.arc(cx, cy, moonR, 0, Math.PI * 2);
    mCtx.fill();
    mCtx.restore();

    // Cut out inner circle with destination-out so only the left crescent remains
    mCtx.globalCompositeOperation = "destination-out";
    mCtx.fillStyle = "#000000";
    mCtx.beginPath();
    // Shift cutout rightward by 18px to create an elegant left-facing crescent
    mCtx.arc(cx + 18, cy - 2, moonR * 0.94, 0, Math.PI * 2);
    mCtx.fill();

    // Draw the sharp crescent onto the main sky canvas over the gradient
    ctx.drawImage(mCanvas, moonX - cx, moonY - cy);
  }

  // 4. Multi-Layer City Skyline across lower panes (Bottom half: Y = 560 to 1024)
  ctx.globalAlpha = 1.0;
  const groundY = 1024;

  // --- Layer A: Distant skyscraper towers & spires ---
  ctx.fillStyle = "#05081e";
  const layerABuildings = [
    { x: 0, w: 75, h: 420 },
    { x: 85, w: 90, h: 490 },
    { x: 185, w: 70, h: 390 },
    { x: 265, w: 110, h: 450 },
    { x: 385, w: 85, h: 520 },
    { x: 480, w: 95, h: 460 },
    { x: 585, w: 115, h: 510 },
    { x: 710, w: 85, h: 430 },
    { x: 805, w: 105, h: 480 },
    { x: 920, w: 105, h: 440 },
  ];
  layerABuildings.forEach((b) => {
    ctx.fillRect(b.x, groundY - b.h, b.w, b.h);
    // Antenna spires on tall towers
    if (b.h > 450) {
      ctx.strokeStyle = "#05081e";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(b.x + b.w / 2, groundY - b.h);
      ctx.lineTo(b.x + b.w / 2, groundY - b.h - 35);
      ctx.stroke();

      // Red hazard light beacon on antenna tip
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(b.x + b.w / 2, groundY - b.h - 35, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#05081e";
    }
  });

  // --- Layer B: Midground buildings with glowing office windows ---
  const layerBBuildings = [
    { x: 30, w: 95, h: 370 },
    { x: 135, w: 85, h: 420 },
    { x: 230, w: 115, h: 350 },
    { x: 355, w: 95, h: 440 },
    { x: 460, w: 90, h: 380 },
    { x: 560, w: 105, h: 430 },
    { x: 675, w: 90, h: 370 },
    { x: 775, w: 120, h: 410 },
    { x: 905, w: 95, h: 350 },
  ];
  layerBBuildings.forEach((b, idx) => {
    const by = groundY - b.h;
    ctx.fillStyle = "#070c2a";
    ctx.fillRect(b.x, by, b.w, b.h);

    // Glowing office windows in vertical columns
    for (let wy = by + 22; wy < groundY - 30; wy += 20) {
      for (let wx = b.x + 10; wx < b.x + b.w - 10; wx += 15) {
        const hash = (wx * 11 + wy * 19 + idx * 7) % 11;
        if (hash < 4) {
          ctx.fillStyle = hash === 0 ? "#fef08a" : hash === 1 ? "#38bdf8" : "#ffffff";
          ctx.globalAlpha = 0.55 + hash * 0.12;
          ctx.fillRect(wx, wy, 5, 8);
        }
      }
    }
    ctx.globalAlpha = 1.0;
  });

  // --- Layer C: Foreground sleek dark architectural silhouettes ---
  const layerCBuildings = [
    { x: -5, w: 90, h: 290 },
    { x: 95, w: 105, h: 320 },
    { x: 210, w: 85, h: 270 },
    { x: 305, w: 125, h: 330 },
    { x: 440, w: 100, h: 280 },
    { x: 550, w: 115, h: 340 },
    { x: 675, w: 105, h: 290 },
    { x: 790, w: 95, h: 320 },
    { x: 895, w: 135, h: 270 },
  ];
  layerCBuildings.forEach((b, idx) => {
    const by = groundY - b.h;
    ctx.fillStyle = "#030514";
    ctx.fillRect(b.x, by, b.w, b.h);

    // Foreground warm glowing windows
    for (let wy = by + 18; wy < groundY - 20; wy += 18) {
      for (let wx = b.x + 10; wx < b.x + b.w - 10; wx += 14) {
        const hash = (wx * 13 + wy * 23 + idx * 5) % 9;
        if (hash < 4) {
          ctx.fillStyle = hash === 0 ? "#fef08a" : hash === 1 ? "#67e8f9" : "#e0e7ff";
          ctx.globalAlpha = 0.65 + hash * 0.1;
          ctx.fillRect(wx, wy, 6, 9);
        }
      }
    }
    ctx.globalAlpha = 1.0;
  });

  const texture = new THREE.CanvasTexture(canvas);
  // Set flipY = false so Canvas Y = 0 (top: moon/stars) maps directly to Top of Window_Glass
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

export const WindowSkyline: React.FC = () => {
  const texture = useMemo(() => createWindowSkylineTexture(), []);

  if (!texture) return null;

  return (
    <group position={[-2.40, 1.60, -0.569]}>
      <mesh>
        <planeGeometry args={[0.82, 1.02]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
};
