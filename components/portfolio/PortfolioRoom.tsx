"use client";

import React, { useMemo, useEffect, useState, useRef } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { interactiveObjects } from "@/data/interactiveObjects";
import { BOOKSHELF_PROJECTS } from "@/data/bookshelfProjects";
import { InteractionState } from "@/types/interaction";
import { MonitorScreen } from "./MonitorScreen";
import { WhiteboardScreen } from "./WhiteboardScreen";
import { createWindowSkylineTexture } from "./WindowSkyline";
import { WindowCurtains } from "./WindowCurtains";
import { NeonSignScreen } from "./NeonSignScreen";
import { BookshelfDecorations } from "./BookshelfDecorations";
import { DeskGadgets } from "./DeskGadgets";
import { playSound } from "@/lib/audio";

interface PortfolioRoomProps {
  onSelectObject: (id: string) => void;
  hoveredObjectId: string | null;
  onHoverObject: (id: string | null) => void;
  activeObjectId: string | null;
  interactionState: InteractionState;
  onReturnToRoom: () => void;
  lampOn: boolean;
  onToggleLamp: () => void;
  curtainsClosed: boolean;
  onToggleCurtains: () => void;
  neonOn: boolean;
  onToggleNeon: () => void;
  soundEnabled: boolean;
  hasEntered: boolean;
  testimonialCardIndex?: number;
  onToggleTestimonialCard?: () => void;
}

// Texture helper for vertical book spine typography matching reference
function createBookSpineTexture(
  title: string,
  bgColor: string,
  accentColor: string,
  hasStar?: boolean
) {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Leather base
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 256, 1024);

  // Cylindrical shading across spine
  const grad = ctx.createLinearGradient(0, 0, 256, 0);
  grad.addColorStop(0, "rgba(0, 0, 0, 0.35)");
  grad.addColorStop(0.2, "rgba(255, 255, 255, 0.15)");
  grad.addColorStop(0.5, "rgba(255, 255, 255, 0.0)");
  grad.addColorStop(0.85, "rgba(0, 0, 0, 0.15)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0.45)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 1024);

  // Top & bottom accent stripes
  ctx.fillStyle = accentColor;
  ctx.fillRect(20, 32, 216, 10);
  ctx.fillRect(20, 52, 216, 4);
  ctx.fillRect(20, 960, 216, 4);
  ctx.fillRect(20, 976, 216, 10);

  // Star symbol
  if (hasStar) {
    ctx.fillStyle = accentColor;
    ctx.font = "bold 44px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("★", 128, 105);
  }

  // Vertical text rotated 90 degrees clockwise
  ctx.save();
  ctx.translate(128, hasStar ? 560 : 512);
  ctx.rotate(Math.PI / 2);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const fontSize = title.length > 18 ? 44 : title.length > 12 ? 52 : 62;
  ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
  ctx.fillStyle = "#ffffff";
  ctx.fillText(title, 0, 0);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.needsUpdate = true;
  return texture;
}

// Framed developer photo texture matching reference
function createPhotoTexture() {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 320;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Background sunset bokeh
  const bg = ctx.createLinearGradient(0, 0, 0, 320);
  bg.addColorStop(0, "#475569");
  bg.addColorStop(0.5, "#64748b");
  bg.addColorStop(0.8, "#d97706");
  bg.addColorStop(1, "#0d9488");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 256, 320);

  ctx.fillStyle = "rgba(254, 215, 215, 0.25)";
  ctx.beginPath();
  ctx.arc(60, 80, 45, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(200, 110, 35, 0, Math.PI * 2);
  ctx.fill();

  // Figure in dark t-shirt with sunglasses
  ctx.fillStyle = "#0f172a";
  ctx.beginPath();
  ctx.ellipse(128, 290, 95, 75, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#78350f";
  ctx.beginPath();
  ctx.roundRect(50, 260, 156, 50, 20);
  ctx.fill();

  ctx.fillStyle = "#b45309";
  ctx.fillRect(112, 175, 32, 40);

  ctx.fillStyle = "#d97706";
  ctx.beginPath();
  ctx.ellipse(128, 140, 38, 48, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#0f172a";
  ctx.beginPath();
  ctx.ellipse(128, 105, 42, 26, 0, 0, Math.PI * 2);
  ctx.fill();

  // Sunglasses
  ctx.fillStyle = "#020617";
  ctx.beginPath();
  ctx.roundRect(100, 126, 24, 16, 4);
  ctx.roundRect(132, 126, 24, 16, 4);
  ctx.fill();
  ctx.fillRect(123, 131, 10, 4);
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.fillRect(104, 129, 6, 8);
  ctx.fillRect(136, 129, 6, 8);

  ctx.strokeStyle = "#451a03";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(128, 155, 14, 0.15 * Math.PI, 0.85 * Math.PI, false);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.needsUpdate = true;
  return texture;
}

// Storage box label sticker matching reference
function createBoxLabelTexture(text: string) {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#f8f5ee";
  ctx.fillRect(0, 0, 512, 128);
  ctx.strokeStyle = "#d6d3d1";
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, 504, 120);

  ctx.fillStyle = "#1c1917";
  ctx.font = "bold 52px 'Segoe Print', 'Caveat', 'Comic Sans MS', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 256, 66);

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.needsUpdate = true;
  return texture;
}

// Procedural dry-erase whiteboard canvas texture for 3D room overview (WebGL depth-tested)
function createWhiteboardTexture() {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 665;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // 1. Porcelain white base with subtle marker sheen
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, 1024, 665);

  const gloss = ctx.createLinearGradient(0, 0, 1024, 665);
  gloss.addColorStop(0, "rgba(255, 255, 255, 0.95)");
  gloss.addColorStop(0.35, "rgba(241, 245, 249, 0.4)");
  gloss.addColorStop(0.85, "rgba(226, 232, 240, 0.25)");
  gloss.addColorStop(1, "rgba(255, 255, 255, 0.8)");
  ctx.fillStyle = gloss;
  ctx.fillRect(0, 0, 1024, 665);

  // 2. Top bar dots (rose, amber, emerald)
  ctx.fillStyle = "#f43f5e";
  ctx.beginPath();
  ctx.arc(44, 34, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#f59e0b";
  ctx.beginPath();
  ctx.arc(62, 34, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#10b981";
  ctx.beginPath();
  ctx.arc(80, 34, 6, 0, Math.PI * 2);
  ctx.fill();

  // Top title
  ctx.fillStyle = "#64748b";
  ctx.font = "bold 15px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("SUDEEP'S WHITEBOARD · DRY-ERASE NOTES", 104, 39);

  // Divider line below top bar
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(30, 56);
  ctx.lineTo(994, 56);
  ctx.stroke();

  // Center vertical dashed marker line dividing columns
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(512, 70);
  ctx.lineTo(512, 600);
  ctx.stroke();
  ctx.setLineDash([]);

  // ==================== LEFT COLUMN: MY JOURNEY ====================
  ctx.fillStyle = "#1d4ed8";
  ctx.font = "bold 28px 'Segoe Print', 'Caveat', 'Comic Sans MS', cursive, sans-serif";
  ctx.fillText("My Journey", 45, 96);

  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(45, 104);
  ctx.quadraticCurveTo(110, 108, 175, 103);
  ctx.stroke();

  const journeyItems = [
    {
      role: "Full Stack & Security Engineer",
      period: "2024 - Present · Cryptography & Distributed Systems",
      desc: "Building high-throughput verification pipelines & assistive AI models.",
      dotColor: "#2563eb",
      y: 145,
    },
    {
      role: "Cybersecurity Researcher",
      period: "2023 - 2024 · Huntress CTF Global Top 35 / 6,950+ teams",
      desc: "Exploited memory forensics, reverse engineering & network protocols.",
      dotColor: "#7c3aed",
      y: 285,
    },
    {
      role: "CS & Engineering Foundations",
      period: "2021 - 2023 · Systems Engineering & Mathematical Rigor",
      desc: "Architected modular full-stack web applications and algorithm tools.",
      dotColor: "#059669",
      y: 425,
    },
  ];

  journeyItems.forEach((item) => {
    ctx.fillStyle = item.dotColor;
    ctx.beginPath();
    ctx.arc(55, item.y, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 19px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(item.role, 72, item.y + 6);

    ctx.fillStyle = "#475569";
    ctx.font = "600 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(item.period, 72, item.y + 28);

    ctx.fillStyle = "#64748b";
    ctx.font = "13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(item.desc, 72, item.y + 48);

    if (item.y < 400) {
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(55, item.y + 14);
      ctx.lineTo(55, item.y + 115);
      ctx.stroke();
    }
  });

  // ==================== RIGHT COLUMN: MY TECH STACK ====================
  ctx.fillStyle = "#6d28d9";
  ctx.font = "bold 28px 'Segoe Print', 'Caveat', 'Comic Sans MS', cursive, sans-serif";
  ctx.fillText("My tech stack", 545, 96);

  ctx.strokeStyle = "#8b5cf6";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(545, 104);
  ctx.quadraticCurveTo(620, 109, 705, 103);
  ctx.stroke();

  const stackItems = [
    {
      title: "Languages",
      skills: "TypeScript, Python, C++, Go, SQL, Bash",
      badgeBg: "#dbeafe",
      badgeColor: "#1d4ed8",
      borderColor: "#bfdbfe",
      y: 135,
    },
    {
      title: "Frontend",
      skills: "Next.js, React, Three.js, WebGL, Tailwind CSS",
      badgeBg: "#e0e7ff",
      badgeColor: "#4338ca",
      borderColor: "#c7d2fe",
      y: 245,
    },
    {
      title: "Backend & Systems",
      skills: "Node.js, FastAPI, PostgreSQL, Redis, Docker, Linux",
      badgeBg: "#f3e8ff",
      badgeColor: "#7e22ce",
      borderColor: "#e9d5ff",
      y: 355,
    },
    {
      title: "Security & AI",
      skills: "Ghidra, Wireshark, Cryptography, PyTorch, Whisper, RAG",
      badgeBg: "#dcfce7",
      badgeColor: "#15803d",
      borderColor: "#bbf7d0",
      y: 465,
    },
  ];

  stackItems.forEach((box) => {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect(545, box.y, 430, 85, 10);
    ctx.fill();

    ctx.strokeStyle = box.borderColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = box.badgeBg;
    ctx.beginPath();
    ctx.roundRect(558, box.y + 12, 110, 24, 6);
    ctx.fill();

    ctx.fillStyle = box.badgeColor;
    ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(box.title, 568, box.y + 28);

    ctx.fillStyle = "#334155";
    ctx.font = "500 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(box.skills, 558, box.y + 60);
  });

  // Tray markers at bottom
  ctx.fillStyle = "#3b82f6";
  ctx.fillRect(70, 630, 45, 12);
  ctx.fillStyle = "#8b5cf6";
  ctx.fillRect(125, 630, 45, 12);
  ctx.fillStyle = "#10b981";
  ctx.fillRect(180, 630, 45, 12);
  ctx.fillStyle = "#f43f5e";
  ctx.fillRect(235, 630, 45, 12);

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.needsUpdate = true;
  return texture;
}

// Procedural macOS dual-window desktop texture for 3D monitor screen (WebGL depth-tested)
function createMonitorScreenTexture() {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 576;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // 1. Wallpaper: Rich deep midnight indigo radial gradient
  const bgGrad = ctx.createRadialGradient(512, 160, 50, 512, 288, 600);
  bgGrad.addColorStop(0, "#2a164b");
  bgGrad.addColorStop(0.45, "#150f30");
  bgGrad.addColorStop(0.8, "#0a071c");
  bgGrad.addColorStop(1, "#050412");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 576);

  // 2. Left Window: ai-cv-tailoring-website/README.md
  ctx.fillStyle = "rgba(20, 17, 38, 0.94)";
  ctx.beginPath();
  ctx.roundRect(24, 28, 410, 390, 14);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Left Window titlebar
  ctx.fillStyle = "rgba(26, 22, 51, 0.9)";
  ctx.beginPath();
  ctx.roundRect(24, 28, 410, 38, [14, 14, 0, 0]);
  ctx.fill();

  // Traffic lights
  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.arc(42, 47, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#f59e0b";
  ctx.beginPath();
  ctx.arc(58, 47, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#10b981";
  ctx.beginPath();
  ctx.arc(74, 47, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#94a3b8";
  ctx.font = "bold 11px monospace";
  ctx.fillText("ai-cv-tailoring-website/README.md", 110, 51);

  // Now building badge
  ctx.fillStyle = "rgba(16, 185, 129, 0.2)";
  ctx.beginPath();
  ctx.roundRect(40, 80, 95, 20, 10);
  ctx.fill();
  ctx.strokeStyle = "rgba(16, 185, 129, 0.5)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = "#34d399";
  ctx.beginPath();
  ctx.arc(52, 90, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#a7f3d0";
  ctx.font = "bold 9.5px sans-serif";
  ctx.fillText("Now building", 62, 93);

  // Project title
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("AI CV Tailoring Website", 146, 94);

  ctx.fillStyle = "#64748b";
  ctx.font = "10px sans-serif";
  ctx.fillText("The Inside Scoop", 40, 118);

  // Code block
  ctx.fillStyle = "#0c0a1a";
  ctx.beginPath();
  ctx.roundRect(38, 130, 382, 270, 8);
  ctx.fill();

  const codeLines = [
    { num: "1", text: "// what I'm building right now", color: "#64748b" },
    { num: "2", text: "const project = {", color: "#f472b6" },
    { num: "3", text: '  name: "AI CV Tailoring Website",', color: "#38bdf8" },
    { num: "4", text: '  status: "in progress",', color: "#fcd34d" },
    { num: "5", text: "};", color: "#cbd5e1" },
    { num: "6", text: "", color: "" },
    { num: "7", text: "ship(project);", color: "#38bdf8" },
  ];
  ctx.font = "11px 'Courier New', monospace";
  codeLines.forEach((l, i) => {
    ctx.fillStyle = "#475569";
    ctx.fillText(l.num, 48, 156 + i * 22);
    if (l.text) {
      ctx.fillStyle = l.color;
      ctx.fillText(l.text, 72, 156 + i * 22);
    }
  });

  // 3. Right Window: about-me.md
  ctx.fillStyle = "rgba(21, 18, 43, 0.96)";
  ctx.beginPath();
  ctx.roundRect(450, 28, 548, 390, 14);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Right Window titlebar
  ctx.fillStyle = "rgba(27, 23, 53, 0.9)";
  ctx.beginPath();
  ctx.roundRect(450, 28, 548, 38, [14, 14, 0, 0]);
  ctx.fill();

  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.arc(468, 47, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#f59e0b";
  ctx.beginPath();
  ctx.arc(484, 47, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#10b981";
  ctx.beginPath();
  ctx.arc(500, 47, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#94a3b8";
  ctx.font = "bold 11px monospace";
  ctx.fillText("about-me.md", 680, 51);

  // Avatar glowing ring
  ctx.strokeStyle = "#34d399";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(500, 115, 30, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#0f172a";
  ctx.beginPath();
  ctx.arc(500, 115, 28, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#38bdf8";
  ctx.beginPath();
  ctx.arc(500, 108, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(500, 132, 19, 13, 0, 0, Math.PI * 2);
  ctx.fill();

  // Name & Title
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 20px -apple-system, sans-serif";
  ctx.fillText("Sudeep ", 544, 104);
  ctx.fillStyle = "#34d399";
  ctx.fillText("S.", 624, 104);

  ctx.fillStyle = "#cbd5e1";
  ctx.font = "600 12px sans-serif";
  ctx.fillText("Software & Cybersecurity Engineer", 544, 122);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "11px sans-serif";
  ctx.fillText("📍 Bangalore, India", 544, 138);

  // Bio paragraphs
  ctx.fillStyle = "#cbd5e1";
  ctx.font = "11px sans-serif";
  ctx.fillText("Hi! I'm Sudeep, a software engineer from India who loves to create and", 472, 172);
  ctx.fillText("design beautiful, resilient things.", 472, 188);
  ctx.fillText("I build modern web apps with Next.js and React, study Computer Science &", 472, 210);
  ctx.fillText("Cybersecurity, and spend my spare time on CTF challenges.", 472, 226);

  ctx.fillStyle = "#c084fc";
  ctx.font = "italic 11px sans-serif";
  ctx.fillText("Tech enthusiast with a passion for development & systems architecture.", 472, 248);

  // Info cards (BASED IN & FOCUS AREA)
  ctx.fillStyle = "rgba(30, 25, 61, 0.85)";
  ctx.beginPath();
  ctx.roundRect(472, 268, 230, 48, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.stroke();

  ctx.fillStyle = "#94a3b8";
  ctx.font = "bold 9px monospace";
  ctx.fillText("BASED IN", 484, 285);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 12px sans-serif";
  ctx.fillText("Bangalore, India", 484, 303);

  ctx.fillStyle = "rgba(30, 25, 61, 0.85)";
  ctx.beginPath();
  ctx.roundRect(716, 268, 260, 48, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.stroke();

  ctx.fillStyle = "#94a3b8";
  ctx.font = "bold 9px monospace";
  ctx.fillText("FOCUS AREA", 728, 285);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 12px sans-serif";
  ctx.fillText("Cybersecurity & AI", 728, 303);

  // Action buttons
  ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
  ctx.beginPath();
  ctx.roundRect(472, 332, 230, 36, 10);
  ctx.fill();
  ctx.strokeStyle = "#34d399";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 12px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Download CV ⬇", 587, 355);

  ctx.fillStyle = "#4f46e5";
  ctx.beginPath();
  ctx.roundRect(716, 332, 260, 36, 10);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Say hello 💬", 846, 355);
  ctx.textAlign = "left";

  // 4. Sticky notes on top right
  ctx.save();
  ctx.translate(920, 20);
  ctx.rotate(0.04);
  ctx.fillStyle = "#fef08a";
  ctx.beginPath();
  ctx.roundRect(0, 0, 78, 62, 3);
  ctx.fill();
  ctx.fillStyle = "#713f12";
  ctx.font = "bold 8px monospace";
  ctx.fillText("TODO", 8, 14);
  ctx.fillStyle = "#047857";
  ctx.fillText("✓ ship v2", 8, 30);
  ctx.fillStyle = "#475569";
  ctx.fillText("□ sleep", 8, 46);
  ctx.restore();

  ctx.save();
  ctx.translate(930, 88);
  ctx.rotate(-0.06);
  ctx.fillStyle = "#fbcfe8";
  ctx.beginPath();
  ctx.roundRect(0, 0, 72, 42, 3);
  ctx.fill();
  ctx.fillStyle = "#831843";
  ctx.font = "bold 7.5px monospace";
  ctx.fillText("wifi pw:", 6, 14);
  ctx.fillText("password123 ☕", 6, 28);
  ctx.restore();

  // 5. Desktop Icons
  const icons = [
    { label: "Projects", color: "#f59e0b", x: 100 },
    { label: "Career", color: "#0ea5e9", x: 220 },
    { label: "Certificates", color: "#a855f7", x: 340 },
    { label: "Chat.app", color: "#10b981", x: 460 },
  ];
  icons.forEach((ic) => {
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    ctx.beginPath();
    ctx.roundRect(ic.x, 442, 34, 34, 8);
    ctx.fill();
    ctx.strokeStyle = ic.color;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "bold 9px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(ic.label, ic.x + 17, 492);
  });
  ctx.textAlign = "left";

  // 6. Bottom Floating Pill: "Click the desktop icons to jump around"
  ctx.fillStyle = "rgba(13, 9, 36, 0.95)";
  ctx.beginPath();
  ctx.roundRect(390, 508, 244, 22, 11);
  ctx.fill();
  ctx.strokeStyle = "rgba(168, 85, 247, 0.4)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = "#e2e8f0";
  ctx.font = "bold 9.5px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Click the desktop icons to jump around", 512, 523);
  ctx.textAlign = "left";

  // 7. Bottom Taskbar
  ctx.fillStyle = "rgba(12, 9, 31, 0.98)";
  ctx.fillRect(0, 542, 1024, 34);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.beginPath();
  ctx.moveTo(0, 542);
  ctx.lineTo(1024, 542);
  ctx.stroke();

  ctx.fillStyle = "#94a3b8";
  ctx.font = "bold 9.5px monospace";
  ctx.fillText("GitHub  ·  LinkedIn  ·  Message  ·  CV", 30, 563);
  ctx.fillText("10:41 pm", 955, 563);

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.needsUpdate = true;
  return texture;
}

// Authentic royal blue and gold ornate "Certificates & Achievements" cover texture
function createBookCoverTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1400;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // 1. Deep royal blue / vivid purple leather gradient background matching reference
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1400);
  bgGrad.addColorStop(0, "#2918bb");
  bgGrad.addColorStop(0.5, "#2010a3");
  bgGrad.addColorStop(1, "#180a88");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1400);

  // Subtle leather texture noise / grain
  ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
  for (let i = 0; i < 4000; i++) {
    const rx = Math.random() * 1024;
    const ry = Math.random() * 1400;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // 2. Spine hinge indent shadow on left edge
  const hingeGrad = ctx.createLinearGradient(0, 0, 100, 0);
  hingeGrad.addColorStop(0, "rgba(0, 0, 0, 0.45)");
  hingeGrad.addColorStop(0.7, "rgba(0, 0, 0, 0.12)");
  hingeGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = hingeGrad;
  ctx.fillRect(0, 0, 100, 1400);

  // Gold spine vertical accent line
  ctx.strokeStyle = "rgba(251, 191, 36, 0.65)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(96, 50);
  ctx.lineTo(96, 1350);
  ctx.stroke();

  // 3. Gold Ornate Double Border
  // Outer gold frame
  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 9;
  ctx.strokeRect(120, 80, 820, 1240);

  // Inset fine gold line
  ctx.strokeStyle = "rgba(254, 240, 138, 0.8)";
  ctx.lineWidth = 3;
  ctx.strokeRect(138, 98, 784, 1204);

  // Corner decorative flourishes
  const corners = [
    [138, 98],
    [922, 98],
    [138, 1302],
    [922, 1302],
  ];
  corners.forEach(([cx, cy]) => {
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  // 4. Gold Ornate Title Typography (Centered)
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(0, 0, 0, 0.75)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 4;

  // "Certificates"
  ctx.fillStyle = "#fef08a";
  ctx.font = "bold 84px Georgia, 'Times New Roman', serif";
  ctx.fillText("Certificates", 530, 600);

  // "&"
  ctx.fillStyle = "#fde047";
  ctx.font = "italic 60px Georgia, 'Times New Roman', serif";
  ctx.fillText("&", 530, 700);

  // "Achievements"
  ctx.fillStyle = "#fef08a";
  ctx.font = "bold 76px Georgia, 'Times New Roman', serif";
  ctx.fillText("Achievements", 530, 800);

  // 5. Star emblem below title
  ctx.shadowColor = "rgba(251, 191, 36, 0.5)";
  ctx.shadowBlur = 14;
  ctx.fillStyle = "#fbbf24";

  // Center 5-point star
  const cx = 530;
  const cy = 905;
  const spikes = 5;
  const outerRadius = 26;
  const innerRadius = 12;
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();

  // Side decorative dots
  ctx.fillStyle = "rgba(254, 240, 138, 0.85)";
  ctx.beginPath();
  ctx.arc(460, 905, 4, 0, Math.PI * 2);
  ctx.arc(600, 905, 4, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.flipY = false;
  texture.needsUpdate = true;
  return texture;
}

export const PortfolioRoom: React.FC<PortfolioRoomProps> = ({
  onSelectObject,
  hoveredObjectId,
  onHoverObject,
  activeObjectId,
  interactionState,
  onReturnToRoom,
  lampOn,
  onToggleLamp,
  curtainsClosed,
  onToggleCurtains,
  neonOn,
  onToggleNeon,
  soundEnabled,
  hasEntered,
  testimonialCardIndex = 0,
  onToggleTestimonialCard,
}) => {
  const { scene } = useGLTF("/models/portfolio_room.glb");
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);
  const [hoveredSwitch, setHoveredSwitch] = useState<boolean>(false);

  // Globe rotatable state & refs
  const globeMeshRef = useRef<THREE.Mesh | null>(null);
  const isDraggingGlobe = useRef(false);
  const globePointerDownX = useRef(0);
  const globeSpinVelocity = useRef(0);
  const globeTotalDragDistance = useRef(0);

  useEffect(() => {
    const handleGlobalPointerUp = () => {
      if (isDraggingGlobe.current) {
        isDraggingGlobe.current = false;
        document.body.style.cursor = "default";
      }
    };
    window.addEventListener("pointerup", handleGlobalPointerUp);
    window.addEventListener("pointercancel", handleGlobalPointerUp);
    return () => {
      window.removeEventListener("pointerup", handleGlobalPointerUp);
      window.removeEventListener("pointercancel", handleGlobalPointerUp);
    };
  }, []);

  // Subtle audio click/pop whenever hovering over any interactive object in room overview
  const prevHoveredRef = useRef<string | null>(null);
  useEffect(() => {
    if (
      hoveredObjectId &&
      hoveredObjectId !== prevHoveredRef.current &&
      interactionState === "ROOM_OVERVIEW"
    ) {
      playSound("pop", soundEnabled);
    }
    prevHoveredRef.current = hoveredObjectId;
  }, [hoveredObjectId, soundEnabled, interactionState]);

  // Map mesh names to interactive object IDs
  const meshToObjectIdMap = useMemo(() => {
    const map = new Map<string, string>();

    // Neon
    map.set("Neon_Sign", "neon");
    map.set("Neon_Sign_Frame", "neon");

    // Monitor
    map.set("Monitor_Screen", "monitor");
    map.set("Monitor_Body", "monitor");
    map.set("Monitor_Base", "monitor");
    map.set("Monitor_Neck", "monitor");

    // Whiteboard
    map.set("Whiteboard", "whiteboard");
    map.set("Whiteboard_Frame", "whiteboard");
    map.set("Whiteboard_Tray", "whiteboard");

    // Bookshelf
    map.set("Shelf_Side_L", "bookshelf");
    map.set("Shelf_Side_R", "bookshelf");
    map.set("Shelf_Back", "bookshelf");
    for (let i = 0; i <= 5; i++) {
      map.set(`Shelf_Board_${i}`, "bookshelf");
    }
    for (let i = 0; i <= 1; i++) {
      map.set(`Shelf_Book_Pro_${i}`, "bookshelf");
      map.set(`Shelf_Book_Pro_${i}_Spine`, "bookshelf");
    }
    for (let i = 0; i <= 6; i++) {
      map.set(`Shelf_Book_Personal_${i}`, "bookshelf");
      map.set(`Shelf_Book_Personal_${i}_Spine`, "bookshelf");
    }
    for (let i = 0; i <= 2; i++) {
      map.set(`Shelf_Book_Academic_${i}`, "bookshelf");
      map.set(`Shelf_Book_Academic_${i}_Spine`, "bookshelf");
    }
    map.set("Shelf_Photo", "bookshelf");
    map.set("Shelf_Photo_Frame", "bookshelf");
    map.set("Shelf_Box_CtfNotes", "bookshelf");
    map.set("Shelf_Box_CtfNotes_Label", "bookshelf");
    map.set("Shelf_Box_Cables", "bookshelf");
    map.set("Shelf_Box_Cables_Label", "bookshelf");
    map.set("Shelf_Box_Archive", "bookshelf");
    map.set("Shelf_Box_Archive_Label", "bookshelf");
    map.set("Trophy_Cup", "bookshelf");
    map.set("Duck_Body", "bookshelf");

    // Wall Frame (TryHackMe Profile)
    map.set("Wall_Frame", "tryhackme");
    map.set("Wall_Frame_Screen", "tryhackme");

    // Certificates Book on desk
    map.set("Book_Certificates", "certificates");
    map.set("Book_Certificates_Cover", "certificates");

    // Testimonials
    map.set("Testimonial_Card", "testimonials");
    map.set("Testimonial_Base", "testimonials");

    // Soundboard
    map.set("Soundboard", "soundboard");
    map.set("Soundboard_Body", "soundboard");
    map.set("Soundboard_Btn_Email", "soundboard");
    map.set("Soundboard_Btn_Message", "soundboard");
    map.set("Soundboard_Btn_Phone", "soundboard");
    map.set("Soundboard_Knob", "soundboard");
    map.set("Soundboard_LCD", "soundboard");
    map.set("Soundboard_MessageScreen", "soundboard");
    for (let i = 0; i <= 4; i++) {
      map.set(`Soundboard_Social_${i}`, "soundboard");
    }

    // Lamp
    map.set("Lamp_Base", "lamp");
    map.set("Lamp_Head", "lamp");
    map.set("Lamp_Bulb", "lamp");
    map.set("Lamp_Arm_Lower", "lamp");
    map.set("Lamp_Arm_Upper", "lamp");

    // Globe
    map.set("Globe", "globe");
    map.set("Globe_Stem", "globe");
    map.set("Globe_Ring", "globe");
    map.set("Globe_Base", "globe");

    // Phone
    map.set("Phone_Body", "phone");
    map.set("Phone_Screen", "phone");

    // Clock
    map.set("Desk_Clock", "clock");
    map.set("Desk_Clock_Screen", "clock");

    return map;
  }, []);

  // Configure material accents, hide static neon text in favor of dynamic typewriter, etc.
  useEffect(() => {
    // Hide static neon text so NeonSignScreen glows crisp and clear
    const staticNeon = scene.getObjectByName("Neon_Sign");
    if (staticNeon) {
      staticNeon.visible = false;
    }

    // Completely hide Blender's Neon_Sign_Frame mesh to eliminate the hot-pink box
    const neonFrame = scene.getObjectByName("Neon_Sign_Frame");
    if (neonFrame) {
      neonFrame.visible = false;
    }

    // Desk Edge Glow - brilliant cyan LED strip
    const edgeGlow = scene.getObjectByName("Desk_Edge_Glow") as THREE.Mesh;
    if (edgeGlow && edgeGlow.material) {
      const mat = edgeGlow.material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(0xe0f2fe);
      mat.emissive = new THREE.Color(0x38bdf8);
      mat.emissiveIntensity = 2.6;
    }

    // Back wall deep midnight navy matching reference
    const wall = scene.getObjectByName("Back_Wall") as THREE.Mesh;
    if (wall && wall.material) {
      const mat = wall.material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(0x111438);
      mat.roughness = 0.85;
      mat.metalness = 0.05;
    }

    // Desk top dark obsidian wood
    const deskTop = scene.getObjectByName("Desk_Top") as THREE.Mesh;
    if (deskTop && deskTop.material) {
      const mat = deskTop.material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(0x090b1c);
      mat.roughness = 0.7;
      mat.metalness = 0.1;
    }

    // Floor dark laminate
    const floor = scene.getObjectByName("Floor") as THREE.Mesh;
    if (floor && floor.material) {
      const mat = floor.material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(0x050614);
      mat.roughness = 0.8;
    }

    // Bookshelf deep navy structure
    const shelfBack = scene.getObjectByName("Shelf_Back") as THREE.Mesh;
    if (shelfBack && shelfBack.material) {
      const mat = shelfBack.material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(0x0e0b24);
      mat.roughness = 0.7;
    }
    const shelfLeft = scene.getObjectByName("Shelf_Side_L") as THREE.Mesh;
    if (shelfLeft && shelfLeft.material) {
      const mat = shelfLeft.material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(0x0e0b24);
      mat.roughness = 0.7;
    }
    const shelfRight = scene.getObjectByName("Shelf_Side_R") as THREE.Mesh;
    if (shelfRight && shelfRight.material) {
      const mat = shelfRight.material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(0x0e0b24);
      mat.roughness = 0.7;
    }

    // Apply exact spine textures and book colors to all 12 bookshelf projects matching reference
    Object.values(BOOKSHELF_PROJECTS).forEach((proj) => {
      // Book body cover
      const bookMesh = scene.getObjectByName(proj.meshPrefix) as THREE.Mesh;
      if (bookMesh && bookMesh.material) {
        const mat = bookMesh.material as THREE.MeshStandardMaterial;
        mat.color = new THREE.Color(proj.spineBg);
        mat.roughness = 0.45;
        mat.metalness = 0.05;
      }

      // Book spine quad
      const spineMesh = scene.getObjectByName(`${proj.meshPrefix}_Spine`) as THREE.Mesh;
      if (spineMesh) {
        const tex = createBookSpineTexture(proj.title, proj.spineBg, proj.spineAccent, proj.hasStar);
        if (tex) {
          spineMesh.material = new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 0.35,
            metalness: 0.05,
            side: THREE.DoubleSide,
          });
        }
      }
    });

    // Framed developer photo on middle shelf
    const photoMesh = scene.getObjectByName("Shelf_Photo") as THREE.Mesh;
    if (photoMesh) {
      const photoTex = createPhotoTexture();
      if (photoTex) {
        photoMesh.material = new THREE.MeshStandardMaterial({
          map: photoTex,
          roughness: 0.25,
          metalness: 0.05,
          side: THREE.DoubleSide,
        });
      }
    }
    const photoFrame = scene.getObjectByName("Shelf_Photo_Frame") as THREE.Mesh;
    if (photoFrame && photoFrame.material) {
      const mat = photoFrame.material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(0x0f172a);
      mat.metalness = 0.85;
      mat.roughness = 0.2;
    }

    // Storage box labels (CTF NOTES, CABLEZ & ADAPTERS, ARCHIVE)
    const boxLabels: Record<string, string> = {
      Shelf_Box_CtfNotes_Label: "CTF NOTES",
      Shelf_Box_Cables_Label: "CABLEZ & ADAPTERS",
      Shelf_Box_Archive_Label: "ARCHIVE",
    };
    Object.entries(boxLabels).forEach(([meshName, labelText]) => {
      const labelMesh = scene.getObjectByName(meshName) as THREE.Mesh;
      if (labelMesh) {
        const tex = createBoxLabelTexture(labelText);
        if (tex) {
          labelMesh.material = new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 0.4,
            metalness: 0.05,
            side: THREE.DoubleSide,
          });
        }
      }
    });

    // Storage dark bins
    ["Shelf_Box_CtfNotes", "Shelf_Box_Cables", "Shelf_Box_Archive"].forEach((boxName) => {
      const boxMesh = scene.getObjectByName(boxName) as THREE.Mesh;
      if (boxMesh && boxMesh.material) {
        const mat = boxMesh.material as THREE.MeshStandardMaterial;
        mat.color = new THREE.Color(0x090b22);
        mat.roughness = 0.75;
      }
    });

    // Whiteboard surface with authentic dry-erase notes (WebGL depth-tested)
    const wb = scene.getObjectByName("Whiteboard") as THREE.Mesh;
    if (wb) {
      const wbTex = createWhiteboardTexture();
      if (wbTex) {
        wb.material = new THREE.MeshStandardMaterial({
          map: wbTex,
          roughness: 0.25,
          metalness: 0.05,
        });
      }
    }

    // Monitor screen with authentic macOS dual-window desktop (WebGL depth-tested)
    const monScreen = scene.getObjectByName("Monitor_Screen") as THREE.Mesh;
    if (monScreen) {
      const monTex = createMonitorScreenTexture();
      if (monTex) {
        monScreen.material = new THREE.MeshStandardMaterial({
          map: monTex,
          emissive: new THREE.Color(0xffffff),
          emissiveMap: monTex,
          emissiveIntensity: 0.88,
          roughness: 0.22,
          metalness: 0.05,
        });
      }
    }

    // Monitor hardware (Bezel, Neck, Stand Base) - sleek matte obsidian matching reference
    ["Monitor_Base", "Monitor_Neck", "Monitor_Body"].forEach((name) => {
      const mesh = scene.getObjectByName(name) as THREE.Mesh;
      if (mesh) {
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x121528),
          roughness: 0.45,
          metalness: 0.35,
        });
      }
    });

    // Desk Drawers ("CPU" / under-desk cabinet) and right leg - deep midnight charcoal matching reference
    ["Desk_Drawers", "Desk_Leg_R"].forEach((name) => {
      const mesh = scene.getObjectByName(name) as THREE.Mesh;
      if (mesh) {
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x0a0d1e),
          roughness: 0.65,
          metalness: 0.15,
        });
      }
    });

    // Desk Drawer handles - crisp metallic silver bars
    ["Desk_Handle_0", "Desk_Handle_1", "Desk_Handle_2"].forEach((name) => {
      const mesh = scene.getObjectByName(name) as THREE.Mesh;
      if (mesh) {
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xf1f5f9),
          emissive: new THREE.Color(0xe2e8f0),
          emissiveIntensity: 0.45,
          roughness: 0.2,
          metalness: 0.8,
        });
      }
    });

    // Mousepad / Desk mat - deep obsidian slate
    const mousepad = scene.getObjectByName("Mousepad") as THREE.Mesh;
    if (mousepad) {
      mousepad.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x101326),
        roughness: 0.85,
        metalness: 0.05,
      });
    }

    // Soundboard chassis - sleek dark slate/indigo matching reference
    const sbBody = scene.getObjectByName("Soundboard_Body") as THREE.Mesh;
    if (sbBody) {
      sbBody.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x161a36),
        roughness: 0.45,
        metalness: 0.25,
      });
    }

    // Wall Frame (TryHackMe poster frame) - dark beveled gallery frame matching reference
    const wallFrame = scene.getObjectByName("Wall_Frame") as THREE.Mesh;
    if (wallFrame) {
      wallFrame.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x1a1e2e),
        roughness: 0.38,
        metalness: 0.22,
      });
    }

    // Hide crude 3D plane so our interactive TryHackMe card sits clean without z-fighting
    const wallFrameScreen = scene.getObjectByName("Wall_Frame_Screen") as THREE.Mesh;
    if (wallFrameScreen) {
      wallFrameScreen.visible = false;
    }

    // Dark plastic accessories (Keyboard, Lamp base, Clock, Phone, Trophy base, Testimonial base)
    [
      "Keyboard",
      "Lamp_Base",
      "Desk_Clock",
      "Phone_Body",
      "Testimonial_Base",
      "Trophy_Base",
    ].forEach((name) => {
      const mesh = scene.getObjectByName(name) as THREE.Mesh;
      if (mesh) {
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x121528),
          roughness: 0.5,
          metalness: 0.2,
        });
      }
    });

    // Testimonial Cog Knobs - vibrant purple matching reference
    ["Testimonial_Post_L", "Testimonial_Post_R"].forEach((name) => {
      const mesh = scene.getObjectByName(name) as THREE.Mesh;
      if (mesh) {
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x7c3aed),
          emissive: new THREE.Color(0x4c1d95),
          emissiveIntensity: 0.25,
          roughness: 0.25,
          metalness: 0.15,
        });
      }
    });

    // Digital Desk Clock Screen - sleek glossy LCD face
    const clockScreen = scene.getObjectByName("Desk_Clock_Screen") as THREE.Mesh;
    if (clockScreen) {
      clockScreen.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x051009),
        emissive: new THREE.Color(0x041a0d),
        emissiveIntensity: 0.35,
        roughness: 0.2,
        metalness: 0.6,
      });
    }

    // Hide crude 3D plane so our realistic cream index card sits perfectly in the stand
    const testCard = scene.getObjectByName("Testimonial_Card") as THREE.Mesh;
    if (testCard) {
      testCard.visible = false;
    }

    // Certificate Book body on desk - lavender paper pages block matching reference image
    const bookCert = scene.getObjectByName("Book_Certificates") as THREE.Mesh;
    if (bookCert) {
      bookCert.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xb5b7e8),
        roughness: 0.9,
        metalness: 0.0,
        emissive: new THREE.Color(0x000000),
        emissiveIntensity: 0,
      });

      // Realistic royal blue hardcover spine wrap on left side
      const existingSpine = bookCert.getObjectByName("Book_Certificates_Spine_Custom");
      if (existingSpine) bookCert.remove(existingSpine);

      const spineGeo = new THREE.BoxGeometry(0.008, 0.045, 0.306);
      const spineMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x2212a8),
        roughness: 0.5,
        metalness: 0.15,
        emissive: new THREE.Color(0x000000),
        emissiveIntensity: 0,
      });
      const spineMesh = new THREE.Mesh(spineGeo, spineMat);
      spineMesh.name = "Book_Certificates_Spine_Custom";
      spineMesh.position.set(-0.111, 0.002, 0);
      bookCert.add(spineMesh);
    }

    // Certificate Book cover on desk - royal blue with gold ornate "Certificates & Achievements ★"
    const bookCertCover = scene.getObjectByName("Book_Certificates_Cover") as THREE.Mesh;
    if (bookCertCover) {
      const bookTex = createBookCoverTexture();
      bookCertCover.material = new THREE.MeshStandardMaterial({
        map: bookTex || undefined,
        roughness: 0.45,
        metalness: 0.15,
        emissive: new THREE.Color(0x000000),
        emissiveIntensity: 0,
      });
      bookCertCover.scale.set(1.10, 1, 1.08);
      bookCertCover.position.y = 0.8165;
    }

    // Lamp Head cone - dark matte metal lampshade (independent material, never emissive)
    const lampHead = scene.getObjectByName("Lamp_Head") as THREE.Mesh;
    if (lampHead) {
      lampHead.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x161a35),
        roughness: 0.45,
        metalness: 0.4,
        emissive: new THREE.Color(0x000000),
        emissiveIntensity: 0,
      });
    }

    // Lamp Bulb - dedicated practical light emitter
    const lampBulb = scene.getObjectByName("Lamp_Bulb") as THREE.Mesh;
    if (lampBulb) {
      lampBulb.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xfff5eb),
        emissive: new THREE.Color(0x111111),
        emissiveIntensity: 0.05,
        roughness: 0.2,
      });
    }

    // Plant pots (Desk and Bookshelf) - clean white ceramic matching reference
    [
      "DeskPlant_Pot",
      "ShelfPlant_Top_Pot",
      "ShelfPlant_Pro_Pot",
      "ShelfPlant_Academic_Pot",
    ].forEach((name) => {
      const mesh = scene.getObjectByName(name) as THREE.Mesh;
      if (mesh) {
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xf1f5f9),
          roughness: 0.35,
          metalness: 0.1,
        });
      }
    });

    // Whiteboard frame brushed silver
    const wbFrame = scene.getObjectByName("Whiteboard_Frame") as THREE.Mesh;
    if (wbFrame && wbFrame.material) {
      const mat = wbFrame.material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(0x94a3b8);
      mat.metalness = 0.8;
      mat.roughness = 0.25;
    }

    // Whiteboard tray brushed aluminum
    const wbTray = scene.getObjectByName("Whiteboard_Tray") as THREE.Mesh;
    if (wbTray && wbTray.material) {
      const mat = wbTray.material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(0x94a3b8);
      mat.metalness = 0.85;
      mat.roughness = 0.2;
    }

    // Globe on desk: authentic world map with countries & continents, golden brass meridian ring
    const globe = scene.getObjectByName("Globe") as THREE.Mesh;
    if (globe) {
      globeMeshRef.current = globe;
      const texLoader = new THREE.TextureLoader();
      texLoader.load("/textures/earth.jpg", (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 8;
        tex.flipY = false; // Essential for correct North-South orientation on this mesh
        globe.material = new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.40,
          metalness: 0.08,
          emissive: new THREE.Color(0xffffff),
          emissiveMap: tex,
          emissiveIntensity: 0.55,
        });
      });
      // Align axial tilt with meridian ring (-20 deg around Z)
      globe.rotation.z = -20 * (Math.PI / 180);
    }

    const globeRing = scene.getObjectByName("Globe_Ring") as THREE.Mesh;
    if (globeRing && globeRing.material) {
      const mat = globeRing.material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(0xd4af37); // authentic rich metallic brass
      mat.metalness = 0.90;
      mat.roughness = 0.22;
    }

    const globeStem = scene.getObjectByName("Globe_Stem") as THREE.Mesh;
    if (globeStem && globeStem.material) {
      const mat = globeStem.material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(0x222638);
      mat.metalness = 0.85;
      mat.roughness = 0.30;
    }

    const globeBase = scene.getObjectByName("Globe_Base") as THREE.Mesh;
    if (globeBase && globeBase.material) {
      const mat = globeBase.material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(0x1a1e30);
      mat.metalness = 0.85;
      mat.roughness = 0.25;
    }

    // Keyboard Backlight Glow
    const kbGlow = scene.getObjectByName("Keyboard_Glow") as THREE.Mesh;
    if (kbGlow && kbGlow.material) {
      const mat = kbGlow.material as THREE.MeshStandardMaterial;
      mat.emissive = new THREE.Color(0xa855f7);
      mat.emissiveIntensity = 1.2;
    }

    // Wall electrical cord to switch (red cord matching reference, isolated material)
    const cord = scene.getObjectByName("Wall_Cord") as THREE.Mesh;
    if (cord) {
      cord.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xef4444),
        roughness: 0.5,
        metalness: 0.1,
      });
    }

    // Wall Switch plate
    const swPlate = scene.getObjectByName("Wall_Switch") as THREE.Mesh;
    if (swPlate && swPlate.material) {
      const mat = swPlate.material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(0x23263e);
      mat.roughness = 0.35;
      mat.metalness = 0.65;
    }

    // Wall Switch Toggle lever
    const swToggle = scene.getObjectByName("Wall_Switch_Toggle") as THREE.Mesh;
    if (swToggle && swToggle.material) {
      const mat = swToggle.material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(0xf43f5e);
      mat.roughness = 0.25;
      mat.metalness = 0.85;
    }

    // Trophy gold shine
    const trophy = scene.getObjectByName("Trophy_Cup") as THREE.Mesh;
    if (trophy && trophy.material) {
      const mat = trophy.material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(0xfacc15);
      mat.metalness = 0.95;
      mat.roughness = 0.2;
    }

    // Realistic night city skyline with glowing crescent moon and stars on Window_Glass
    const glass = scene.getObjectByName("Window_Glass") as THREE.Mesh;
    if (glass) {
      const winTex = createWindowSkylineTexture();
      if (winTex) {
        glass.material = new THREE.MeshBasicMaterial({
          map: winTex,
          toneMapped: false,
        });
      }
    }

    // Clean matte dark window frame and mullions matching reference
    const winFrame = scene.getObjectByName("Window_Frame") as THREE.Mesh;
    const winBarV = scene.getObjectByName("Window_Bar_V") as THREE.Mesh;
    const winBarH = scene.getObjectByName("Window_Bar_H") as THREE.Mesh;
    [winFrame, winBarV, winBarH].forEach((winMesh) => {
      if (winMesh && winMesh.material) {
        const mat = winMesh.material as THREE.MeshStandardMaterial;
        mat.color = new THREE.Color(0x0e122b);
        mat.roughness = 0.55;
        mat.metalness = 0.1;
      }
    });

    // Yellow rubber duck
    const duck = scene.getObjectByName("Duck_Body") as THREE.Mesh;
    if (duck && duck.material) {
      const mat = duck.material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(0xfde047);
    }
  }, [scene]);

  // Update animations, lamp bulb state, and globe rotation without mutating object materials on hover
  useFrame((state, delta) => {
    // Sync lamp bulb emissive state (only bulb emits practical light)
    const lampBulb = scene.getObjectByName("Lamp_Bulb") as THREE.Mesh;
    if (lampBulb && lampBulb.material) {
      const mat = lampBulb.material as THREE.MeshStandardMaterial;
      if (lampOn) {
        mat.emissive.set(0xffcb8a);
        mat.emissiveIntensity = 2.5;
      } else {
        mat.emissive.set(0x111111);
        mat.emissiveIntensity = 0.05;
      }
    }

    // Animate Wall Switch toggle lever
    const swToggle = scene.getObjectByName("Wall_Switch_Toggle") as THREE.Mesh;
    if (swToggle) {
      swToggle.rotation.x = THREE.MathUtils.lerp(swToggle.rotation.x, neonOn ? -0.35 : 0.35, 0.25);
    }

    // Animate Globe rotation: idle ambient spin + interactive flick momentum
    const globeMesh = globeMeshRef.current;
    if (globeMesh) {
      if (!isDraggingGlobe.current) {
        // Friction decay on flick momentum
        globeSpinVelocity.current *= 0.94;
        // Base ambient speed: 0.28 rad/s (~22 seconds per full revolution) + user flick momentum
        const currentSpeed = 0.28 + globeSpinVelocity.current;
        globeMesh.rotateY(currentSpeed * delta);
      }
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();

    // Toggle neon when clicking the physical wall switch
    let checkSwitch: THREE.Object3D | null = e.object;
    while (checkSwitch) {
      if (checkSwitch.name === "Wall_Switch" || checkSwitch.name === "Wall_Switch_Toggle") {
        onToggleNeon();
        return;
      }
      checkSwitch = checkSwitch.parent;
    }

    // When focused on Bookshelf, clicking books plays subtle interactive sound
    if (activeObjectId === "bookshelf") {
      playSound("pop", soundEnabled);
      return;
    }

    if (interactionState !== "ROOM_OVERVIEW") return;

    // 1. High-priority Monitor clicks anywhere on screen, body, neck, or base
    let checkMonitor: THREE.Object3D | null = e.object;
    while (checkMonitor) {
      if (checkMonitor.name && checkMonitor.name.startsWith("Monitor_")) {
        onSelectObject("monitor");
        return;
      }
      checkMonitor = checkMonitor.parent;
    }

    let current: THREE.Object3D | null = e.object;
    while (current) {
      if (
        current.name === "Window_Frame" ||
        current.name === "Window_Glass" ||
        current.name === "Window_Bar_V" ||
        current.name === "Window_Bar_H"
      ) {
        onToggleCurtains();
        return;
      }
      const targetId = meshToObjectIdMap.get(current.name);
      if (targetId) {
        if (targetId === "lamp") {
          onToggleLamp();
        } else {
          onSelectObject(targetId);
        }
        return;
      }
      current = current.parent;
    }
  };

  const handlePointerOver = (e: any) => {
    e.stopPropagation();

    // Hover effect on Wall Switch
    let checkSwitch: THREE.Object3D | null = e.object;
    while (checkSwitch) {
      if (checkSwitch.name === "Wall_Switch" || checkSwitch.name === "Wall_Switch_Toggle") {
        document.body.style.cursor = "pointer";
        setHoveredSwitch(true);
        return;
      }
      checkSwitch = checkSwitch.parent;
    }

    // Hover effect on bookshelf books
    if (activeObjectId === "bookshelf") {
      let current: THREE.Object3D | null = e.object;
      while (current) {
        const baseName = current.name.replace("_Spine", "");
        if (BOOKSHELF_PROJECTS[baseName]) {
          document.body.style.cursor = "pointer";
          setHoveredBook(baseName);
          return;
        }
        current = current.parent;
      }
      return;
    }

    if (interactionState !== "ROOM_OVERVIEW") return;

    // High-priority Monitor hover
    let checkMonitorHover: THREE.Object3D | null = e.object;
    while (checkMonitorHover) {
      if (checkMonitorHover.name && checkMonitorHover.name.startsWith("Monitor_")) {
        document.body.style.cursor = "pointer";
        onHoverObject("monitor");
        return;
      }
      checkMonitorHover = checkMonitorHover.parent;
    }

    let current: THREE.Object3D | null = e.object;
    while (current) {
      if (
        current.name === "Window_Frame" ||
        current.name === "Window_Glass" ||
        current.name === "Window_Bar_V" ||
        current.name === "Window_Bar_H" ||
        current.name.startsWith("Curtain")
      ) {
        document.body.style.cursor = "pointer";
        onHoverObject("window");
        return;
      }
      const targetId = meshToObjectIdMap.get(current.name);
      if (targetId) {
        document.body.style.cursor = targetId === "globe" ? "grab" : "pointer";
        onHoverObject(targetId);
        return;
      }
      current = current.parent;
    }

    // Default if cursor moves onto non-interactive surface (Desk, Wall, Floor, etc.)
    document.body.style.cursor = "default";
    setHoveredBook(null);
    setHoveredSwitch(false);
    onHoverObject(null);
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = "default";
    setHoveredBook(null);
    setHoveredSwitch(false);
    if (interactionState === "ROOM_OVERVIEW") {
      onHoverObject(null);
    }
  };

  const hoveredObj = hoveredObjectId ? interactiveObjects[hoveredObjectId] : null;

  // Reusable hover & cursor collider handlers with stopPropagation on all pointer events
  const createHoverColliderHandlers = (id: string, cursor = "pointer") => ({
    onPointerOver: (e: any) => {
      e.stopPropagation();
      document.body.style.cursor = cursor;
      onHoverObject(id);
    },
    onPointerMove: (e: any) => {
      e.stopPropagation();
      document.body.style.cursor = cursor;
      onHoverObject(id);
    },
    onPointerOut: (e: any) => {
      e.stopPropagation();
      document.body.style.cursor = "default";
      onHoverObject(null);
    },
  });

  return (
    <group>
      {/* 1. Interactive Sliding Window Curtains */}
      <WindowCurtains
        curtainsClosed={curtainsClosed}
        onToggle={onToggleCurtains}
        soundEnabled={soundEnabled}
        interactionState={interactionState}
      />

      {/* 3. The Loaded Blender Room */}
      <primitive
        object={scene}
        onClick={handleClick}
        onPointerMove={handlePointerOver}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />

      {/* HTML 3D Overlays - rendered ONLY after entering the room */}
      {hasEntered && (
        <>
          {/* 3. Dynamic Typewriter Neon Sign (Mounted on Acrylic Frame) */}
          <group position={[0.0, 2.05, -0.564]}>
            <Html
              transform
              distanceFactor={0.50}
              pointerEvents={
                interactionState === "CONTENT_INTERACTION" && activeObjectId === "neon"
                  ? "auto"
                  : "none"
              }
              style={{
                width: "1040px",
                height: "240px",
                transformOrigin: "center center",
              }}
            >
              <NeonSignScreen
                isOn={neonOn}
                isInteractive={
                  interactionState === "CONTENT_INTERACTION" && activeObjectId === "neon"
                }
                onSelect={() => onSelectObject("neon")}
              />
            </Html>
          </group>

          {/* 4. 3D Monitor Screen Surface (Developer Desktop / Projects OS) */}
          {(interactionState === "ROOM_OVERVIEW" || activeObjectId === "monitor") && (
            <group position={[0, 1.145, -0.183]}>
              {/* Dedicated Solid Click Target for Monitor in Room Overview */}
              {interactionState === "ROOM_OVERVIEW" && (
                <mesh
                  position={[0, 0, 0.02]}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectObject("monitor");
                  }}
                  {...createHoverColliderHandlers("monitor")}
                >
                  <boxGeometry args={[0.76, 0.50, 0.10]} />
                  <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                </mesh>
              )}
              <Html
                transform
                distanceFactor={0.25}
                pointerEvents="auto"
                style={{
                  width: "960px",
                  height: "544px",
                  transformOrigin: "center center",
                }}
              >
                <MonitorScreen
                  isInteractive={
                    interactionState === "CONTENT_INTERACTION" && activeObjectId === "monitor"
                  }
                  onReturnToRoom={onReturnToRoom}
                  onSelectObject={onSelectObject}
                  soundEnabled={soundEnabled}
                  onHover={(hover) => onHoverObject(hover ? "monitor" : null)}
                />
              </Html>
            </group>
          )}

          {/* 5. 3D Whiteboard Surface (Authentic Dry-Erase Journey & Tech Stack) */}
          {activeObjectId === "whiteboard" && (
            <group position={[-1.05, 1.45, -0.576]}>
              <Html
                transform
                distanceFactor={0.4}
                style={{
                  width: "1000px",
                  height: "650px",
                  transformOrigin: "center center",
                }}
              >
                <WhiteboardScreen
                  isInteractive={
                    interactionState === "CONTENT_INTERACTION" && activeObjectId === "whiteboard"
                  }
                  onReturnToRoom={onReturnToRoom}
                  soundEnabled={soundEnabled}
                />
              </Html>
            </group>
          )}

          {/* 6. Bookshelf Project Category Badges, LEDs, and Bottom Hint */}
          <BookshelfDecorations
            isFocused={activeObjectId === "bookshelf"}
            onSelectShelf={() => onSelectObject("bookshelf")}
            onHoverShelf={(hover) => onHoverObject(hover ? "bookshelf" : null)}
          />

          {/* 7. Desk Gadgets (Live Digital Clock, Certificate Wall Badge, Testimonial Stand) */}
          <DeskGadgets
            isVisible={true}
            isClockFocused={activeObjectId === "clock"}
            isTestimonialsFocused={activeObjectId === "testimonials"}
            testimonialCardIndex={testimonialCardIndex}
            onToggleTestimonialCard={onToggleTestimonialCard}
            onSelectCertificates={() => onSelectObject("certificates")}
            onSelectTryHackMe={() => onSelectObject("tryhackme")}
            onSelectClock={() => onSelectObject("clock")}
            onSelectTestimonials={() => onSelectObject("testimonials")}
            onSelectContact={() => onSelectObject("soundboard")}
            onHoverObject={interactionState === "ROOM_OVERVIEW" ? onHoverObject : undefined}
          />

          {/* Dedicated Invisible Interactive Colliders for Seamless Hover Detection */}
          {interactionState === "ROOM_OVERVIEW" && (
            <>
              {/* Neon Sign Collider */}
              <mesh
                position={[0, 2.05, -0.56]}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectObject("neon");
                }}
                {...createHoverColliderHandlers("neon")}
              >
                <boxGeometry args={[1.25, 0.45, 0.08]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>

              {/* Whiteboard Collider */}
              <mesh
                position={[-1.05, 1.42, -0.56]}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectObject("whiteboard");
                }}
                {...createHoverColliderHandlers("whiteboard")}
              >
                <boxGeometry args={[1.15, 0.85, 0.08]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>

              {/* Bookshelf Collider */}
              <mesh
                position={[1.95, 1.25, -0.25]}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectObject("bookshelf");
                }}
                {...createHoverColliderHandlers("bookshelf")}
              >
                <boxGeometry args={[0.55, 1.45, 0.95]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>

              {/* Certificate Book on desk */}
              <mesh
                position={[-0.92, 0.815, 0.12]}
                rotation={[0, -0.07, 0]}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectObject("certificates");
                }}
                {...createHoverColliderHandlers("certificates")}
              >
                <boxGeometry args={[0.26, 0.08, 0.34]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>

              {/* Desk Clock Collider */}
              <mesh
                position={[-0.50, 0.82, -0.099]}
                rotation={[0, 0.12, 0]}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectObject("clock");
                }}
                {...createHoverColliderHandlers("clock")}
              >
                <boxGeometry args={[0.18, 0.10, 0.12]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>

              {/* Testimonials Stand Collider */}
              <mesh
                position={[-0.62, 0.86, 0.205]}
                rotation={[-0.258, 0, 0]}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectObject("testimonials");
                }}
                {...createHoverColliderHandlers("testimonials")}
              >
                <boxGeometry args={[0.22, 0.12, 0.18]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>

              {/* Soundboard Collider */}
              <mesh
                position={[0.78, 0.82, 0.04]}
                rotation={[0, -0.35, 0]}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectObject("soundboard");
                }}
                {...createHoverColliderHandlers("soundboard")}
              >
                <boxGeometry args={[0.34, 0.12, 0.28]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>

              {/* Desk Lamp Collider */}
              <mesh
                position={[0.70, 1.10, -0.235]}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleLamp();
                }}
                {...createHoverColliderHandlers("lamp")}
              >
                <boxGeometry args={[0.28, 0.48, 0.28]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>

              {/* Smartphone Collider */}
              <mesh
                position={[-0.33, 0.81, 0.27]}
                rotation={[0, -0.42, 0]}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectObject("phone");
                }}
                {...createHoverColliderHandlers("phone")}
              >
                <boxGeometry args={[0.12, 0.05, 0.18]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>

              {/* Wall Frame (TryHackMe) Collider */}
              <mesh
                position={[0.80, 1.55, -0.575]}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectObject("tryhackme");
                }}
                {...createHoverColliderHandlers("tryhackme")}
              >
                <boxGeometry args={[0.30, 0.40, 0.04]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>

              {/* Window & Curtains Collider */}
              <mesh
                position={[-2.40, 1.70, -0.52]}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCurtains();
                }}
                {...createHoverColliderHandlers("window")}
              >
                <boxGeometry args={[1.05, 1.30, 0.10]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>
            </>
          )}

          {/* Interactive Rotatable Globe Collider on desk */}
          <mesh
            position={[-0.85, 1.025, -0.22]}
            onPointerDown={(e) => {
              e.stopPropagation();
              isDraggingGlobe.current = true;
              globePointerDownX.current = e.clientX;
              globeTotalDragDistance.current = 0;
              document.body.style.cursor = "grabbing";
            }}
            onPointerMove={(e) => {
              if (isDraggingGlobe.current && globeMeshRef.current) {
                e.stopPropagation();
                const deltaX = e.clientX - globePointerDownX.current;
                globePointerDownX.current = e.clientX;
                globeTotalDragDistance.current += Math.abs(deltaX);
                // Rotate globe along its tilted polar axis in real-time
                const spinStep = deltaX * 0.015;
                globeMeshRef.current.rotateY(spinStep);
                // Store angular velocity for inertia upon release
                globeSpinVelocity.current = deltaX * 0.8;
              } else if (!isDraggingGlobe.current) {
                e.stopPropagation();
                document.body.style.cursor = "grab";
                onHoverObject("globe");
              }
            }}
            onPointerUp={(e) => {
              e.stopPropagation();
              isDraggingGlobe.current = false;
              document.body.style.cursor = "grab";
              if (globeTotalDragDistance.current < 6) {
                // Quick tap without drag: focus globe
                onSelectObject("globe");
              }
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              if (!isDraggingGlobe.current) {
                document.body.style.cursor = "grab";
                onHoverObject("globe");
              }
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              if (!isDraggingGlobe.current) {
                document.body.style.cursor = "default";
                onHoverObject(null);
              }
            }}
          >
            <sphereGeometry args={[0.135, 16, 16]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>

          {/* 8. Floating "Ask me about Sudeep" pill badge under desk lamp (matching reference) */}
          {interactionState === "ROOM_OVERVIEW" && (
            <group position={[0.72, 0.91, 0.10]}>
              <Html
                transform
                distanceFactor={0.28}
                style={{
                  pointerEvents: "auto",
                  cursor: "pointer",
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playSound("click", soundEnabled);
                    onSelectObject("soundboard");
                  }}
                  className="group flex items-center gap-1.5 rounded-full border border-purple-400/60 bg-[#7c3aed] px-3.5 py-1.5 text-xs font-bold text-white shadow-[0_0_22px_rgba(124,58,237,0.7)] transition-all hover:scale-105 hover:bg-[#6d28d9] hover:shadow-[0_0_30px_rgba(124,58,237,0.9)] select-none whitespace-nowrap"
                >
                  <span>Ask me about Sudeep</span>
                  <span className="text-sm transition-transform group-hover:scale-110">👆</span>
                </button>
              </Html>
            </group>
          )}

          {/* Compact Hover Tooltip / Active TryHackMe Profile Pill */}
          {((hoveredObj && interactionState === "ROOM_OVERVIEW") || (activeObjectId === "tryhackme" && interactionState === "OBJECT_FOCUSED")) && (
            <Html
              position={activeObjectId === "tryhackme" ? [0.80, 1.80, -0.57] : hoveredObj!.labelOffset}
              center
              distanceFactor={3.6}
              zIndexRange={[100, 0]}
              style={{ zIndex: 9999 }}
              className="pointer-events-none select-none transition-all duration-200"
            >
              <div className="flex items-center gap-1.5 rounded-full border border-purple-400/50 bg-[#080a22]/90 px-3 py-1 shadow-[0_0_20px_rgba(168,85,247,0.45)] backdrop-blur-md">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: activeObjectId === "tryhackme" ? "#22c55e" : hoveredObj!.color }}
                />
                <span className="whitespace-nowrap text-xs font-semibold text-white">
                  {activeObjectId === "tryhackme" ? "My live hacker profile" : hoveredObj!.name}
                </span>
              </div>
            </Html>
          )}
        </>
      )}
    </group>
  );
};

useGLTF.preload("/models/portfolio_room.glb");
