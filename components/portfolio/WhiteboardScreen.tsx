"use client";

import React, { useState } from "react";
import { ArrowLeft, Shield, Brain, Layers, Cpu } from "lucide-react";
import { playSound } from "@/lib/audio";

interface WhiteboardScreenProps {
  isInteractive: boolean;
  onReturnToRoom: () => void;
  soundEnabled: boolean;
}

export const WhiteboardScreen: React.FC<WhiteboardScreenProps> = ({
  isInteractive,
  onReturnToRoom,
  soundEnabled,
}) => {
  const [activeTab, setActiveTab] = useState<"journey" | "diagrams">("journey");

  // Stop events from propagating to Three.js canvas
  const handleContainerEvent = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`relative flex h-[650px] w-[1000px] flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-[#ffffff] via-[#fcfdff] to-[#f4f6fa] p-7 text-slate-800 shadow-2xl border-[6px] border-[#94a3b8] select-none ${
        isInteractive ? "select-auto" : ""
      }`}
      style={{
        boxShadow:
          "inset 0 0 20px rgba(0, 0, 0, 0.05), inset 0 2px 6px rgba(255, 255, 255, 0.9), 0 20px 50px rgba(0, 0, 0, 0.6)",
        fontFamily:
          '"Segoe Print", "Caveat", "Architects Daughter", "Comic Sans MS", -apple-system, sans-serif',
        pointerEvents: isInteractive ? "auto" : "none",
      }}
      onPointerDown={handleContainerEvent}
      onPointerMove={handleContainerEvent}
      onPointerUp={handleContainerEvent}
      onClick={handleContainerEvent}
      onWheel={handleContainerEvent}
    >
      {/* 4 Corner silver mounting screws */}
      <div className="absolute top-2 left-2 h-2.5 w-2.5 rounded-full bg-slate-400 border border-slate-600 shadow-inner" />
      <div className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-slate-400 border border-slate-600 shadow-inner" />
      <div className="absolute bottom-2 left-2 h-2.5 w-2.5 rounded-full bg-slate-400 border border-slate-600 shadow-inner" />
      <div className="absolute bottom-2 right-2 h-2.5 w-2.5 rounded-full bg-slate-400 border border-slate-600 shadow-inner" />

      {/* Subtle dry-erase porcelain gloss sheen across top corner */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 h-72 w-96 rounded-full bg-white/40 blur-2xl"
        style={{ transform: "rotate(-15deg)" }}
      />

      {/* Top Bar / Controls (Interactive mode switch or subtle indicator) */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5 font-sans">
        <div className="flex items-center gap-2">
          <div className="flex h-2.5 gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            Sudeep&apos;s Whiteboard · Dry-Erase Notes
          </span>
        </div>

        {isInteractive ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playSound("click", soundEnabled);
                setActiveTab(activeTab === "journey" ? "diagrams" : "journey");
              }}
              className="rounded-full border border-indigo-300 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100"
            >
              {activeTab === "journey" ? "View Architecture Blueprints" : "View Journey & Stack"}
            </button>
            <button
              type="button"
              onClick={() => {
                playSound("whoosh", soundEnabled);
                onReturnToRoom();
              }}
              className="flex items-center gap-1 rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Back to Room</span>
            </button>
          </div>
        ) : (
          <span className="text-[11px] font-medium text-slate-400 italic">
            Click whiteboard to zoom in
          </span>
        )}
      </div>

      {/* Main Content Area */}
      {activeTab === "journey" ? (
        <div className="grid grid-cols-12 gap-8 my-auto items-stretch">
          {/* Left Column: My Journey (Exact Marker Style matching reference) */}
          <div className="col-span-6 border-r border-slate-200/90 pr-6 flex flex-col justify-center">
            {/* "My journey" header in dark marker script */}
            <div className="mb-4">
              <h2 className="text-3xl font-bold tracking-tight text-[#2b1055] inline-block">
                My journey
              </h2>
              {/* Wavy marker underline */}
              <svg className="w-36 h-2.5 text-[#4338ca] -mt-1" viewBox="0 0 140 10" fill="none">
                <path
                  d="M2 5 Q 18 1, 35 5 T 70 5 T 105 5 T 138 5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Timeline Track with circular nodes */}
            <div className="relative pl-7 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-[2px] before:bg-slate-300">
              {/* Milestone 1 */}
              <div className="relative">
                {/* Hollow circular marker ring node */}
                <div className="absolute -left-[27px] top-1.5 h-4 w-4 rounded-full border-2 border-[#4338ca] bg-white shadow-sm flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#4338ca]" />
                </div>
                <div className="text-xs font-bold text-slate-500 font-sans tracking-wide">
                  Nov 2023 – Nov 2024
                </div>
                <h3 className="text-base font-extrabold text-[#0f172a] leading-tight">
                  Full Stack &amp; Security Researcher
                </h3>
                <div className="text-xs font-bold text-[#4338ca]">
                  @ Network &amp; Security Labs
                </div>
                <p className="mt-1 text-[13px] leading-snug text-slate-600 font-sans">
                  Researched cryptographic key-exchange vulnerabilities, simulated network topologies, and engineered full-stack testing benches.
                </p>
              </div>

              {/* Milestone 2 */}
              <div className="relative">
                {/* Hollow circular marker ring node */}
                <div className="absolute -left-[27px] top-1.5 h-4 w-4 rounded-full border-2 border-[#059669] bg-white shadow-sm flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#059669]" />
                </div>
                <div className="text-xs font-bold text-emerald-600 font-sans tracking-wide">
                  Oct 2024 – Present
                </div>
                <h3 className="text-base font-extrabold text-[#0f172a] leading-tight">
                  AI &amp; Systems Engineer
                </h3>
                <div className="text-xs font-bold text-[#059669]">
                  @ Sudeep Dev Labs
                </div>
                <p className="mt-1 text-[13px] leading-snug text-slate-600 font-sans">
                  Engineered assistive Whisper ASR models, high-throughput vector RAG systems, and interactive 3D web applications.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: My Tech Stack (Boxed marker sketch matching reference) */}
          <div className="col-span-6 pl-2 flex flex-col justify-center">
            {/* Hand-drawn style rounded sketch box */}
            <div
              className="relative rounded-2xl border-2 border-slate-600/80 bg-white/60 p-5 shadow-sm"
              style={{
                borderRadius: "18px 24px 20px 22px / 22px 18px 24px 20px",
              }}
            >
              {/* Header: "My tech stack" */}
              <div className="mb-3">
                <h2 className="text-2xl font-bold tracking-tight text-[#1e1b4b] inline-block">
                  My tech stack
                </h2>
                {/* Wavy marker underline */}
                <svg className="w-28 h-2 text-[#7c3aed] -mt-0.5" viewBox="0 0 110 8" fill="none">
                  <path
                    d="M2 4 Q 15 1, 30 4 T 60 4 T 90 4 T 108 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Stack items written in realistic handwritten dry-erase ink */}
              <div className="space-y-2 text-[14px] leading-relaxed text-slate-800 font-medium">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-[#0284c7]">• Languages:</span>
                  <span className="text-slate-700">Python, C++, TypeScript, SQL, Bash</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-[#2563eb]">• Frontend:</span>
                  <span className="text-slate-700">Next.js 14, React, Three.js, Tailwind</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-[#4338ca]">• Security:</span>
                  <span className="text-slate-700">Cryptography, Linux, Wireshark, CTF</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-[#7c3aed]">• AI / ML:</span>
                  <span className="text-slate-700">PyTorch, Whisper ASR, Vector RAG</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-[#059669]">• Systems:</span>
                  <span className="text-slate-700">Docker, Git, REST APIs, Linux Kernels</span>
                </div>
              </div>

              {/* Bottom handwritten marker cursive tagline matching reference */}
              <div className="mt-4 pt-3 border-t border-dashed border-slate-300 text-right text-xs font-bold text-[#4338ca] italic">
                I continuously try to expand :)
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Architecture Blueprint view (Dry-erase diagrams) */
        <div className="my-auto space-y-4 font-sans">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl border-2 border-indigo-400 bg-white/90 p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
                <Shield className="h-4 w-4 text-indigo-600" />
                <span>Diffie–Hellman &amp; MITM</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Prime modulus validation ord_p(g) = p - 1, discrete logarithm simulation, and unauthenticated channel injection.
              </p>
              <div className="mt-3 font-mono text-[10px] text-indigo-900 bg-indigo-50/80 p-2 rounded border border-indigo-200">
                Alice (g^a mod p) ➔ Mallory (Intercept) ➔ Bob (g^b mod p)
              </div>
            </div>

            <div className="rounded-xl border-2 border-sky-400 bg-white/90 p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-700">
                <Brain className="h-4 w-4 text-sky-600" />
                <span>NeuroSpeak AI Dual-Path</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Whisper fine-tuning with acoustic alignment + Wav2Vec2 phonetic embeddings for dysarthric speech decoding.
              </p>
              <div className="mt-3 font-mono text-[10px] text-sky-900 bg-sky-50/80 p-2 rounded border border-sky-200">
                Audio Stream ➔ Dual Acoustic Net ➔ Context Refiner
              </div>
            </div>

            <div className="rounded-xl border-2 border-emerald-400 bg-white/90 p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                <Cpu className="h-4 w-4 text-emerald-600" />
                <span>NexaStandards Vector RAG</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Multi-tenant regulatory embeddings with hybrid semantic &amp; BM25 keyword re-ranking.
              </p>
              <div className="mt-3 font-mono text-[10px] text-emerald-900 bg-emerald-50/80 p-2 rounded border border-emerald-200">
                Query ➔ Dense Retrieval + BM25 ➔ Cross-Encoder LLM
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Realistic Aluminum Marker Tray with Dry-Erase Markers & Eraser */}
      <div className="flex items-center justify-between border-t-2 border-slate-300 pt-3 font-sans">
        <div className="flex items-center gap-3">
          {/* Black marker */}
          <div className="flex items-center gap-1">
            <div className="h-3 w-12 rounded-full bg-slate-900 border border-slate-700 shadow-sm" />
            <span className="text-[10px] text-slate-500 font-mono">dry-erase</span>
          </div>
          {/* Blue marker */}
          <div className="h-3 w-12 rounded-full bg-[#0284c7] shadow-sm" />
          {/* Purple marker */}
          <div className="h-3 w-12 rounded-full bg-[#7c3aed] shadow-sm" />
          {/* Red marker */}
          <div className="h-3 w-12 rounded-full bg-[#dc2626] shadow-sm" />
          {/* Cyan marker */}
          <div className="h-3 w-12 rounded-full bg-[#06b6d4] shadow-sm" />
          {/* Felt eraser */}
          <div className="ml-2 h-4 w-14 rounded bg-slate-700 border border-slate-800 shadow-sm flex items-center justify-center text-[8px] font-bold text-slate-200 uppercase tracking-tighter">
            Eraser
          </div>
        </div>

        <div className="text-[11px] font-semibold text-slate-500 italic">
          &ldquo;Engineering robust systems from first principles.&rdquo;
        </div>
      </div>
    </div>
  );
};
