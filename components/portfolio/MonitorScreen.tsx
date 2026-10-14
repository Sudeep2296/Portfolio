"use client";

import React, { useState, useEffect } from "react";
import { playSound } from "@/lib/audio";
import {
  Folder,
  BarChart3,
  GraduationCap,
  Smartphone,
  Download,
  MessageSquare,
  Github,
  Linkedin,
  FileText,
  Mail,
  MapPin,
  Check,
  Square,
  ArrowUpRight,
  Shield,
} from "lucide-react";

interface MonitorScreenProps {
  isInteractive: boolean;
  onReturnToRoom: () => void;
  onSelectObject?: (id: string) => void;
  soundEnabled: boolean;
  onHover?: (hover: boolean) => void;
}

export const MonitorScreen: React.FC<MonitorScreenProps> = ({
  isInteractive,
  onReturnToRoom,
  onSelectObject,
  soundEnabled,
  onHover,
}) => {
  // Live clock for desktop taskbar
  const [timeStr, setTimeStr] = useState("10:41 pm");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
      setTimeStr(`${hours}:${minStr} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleContainerEvent = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  const handleScreenClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isInteractive && onSelectObject) {
      playSound("pop", soundEnabled);
      onSelectObject("monitor");
    }
  };

  const handleDesktopIconClick = (targetId: string) => {
    if (!isInteractive) return;
    playSound("click", soundEnabled);
    if (onSelectObject) {
      onSelectObject(targetId);
    }
  };

  const handleSayHello = () => {
    if (!isInteractive) return;
    playSound("click", soundEnabled);
    if (onSelectObject) {
      onSelectObject("soundboard");
    }
  };

  const handleDownloadCV = () => {
    if (!isInteractive) return;
    playSound("click", soundEnabled);
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Sudeep_S_Resume.pdf";
    link.target = "_blank";
    link.click();
  };

  return (
    <div
      className={`relative flex h-[544px] w-[960px] flex-col justify-between overflow-hidden rounded-xl border border-indigo-900/40 select-none shadow-2xl ${
        !isInteractive ? "cursor-pointer" : ""
      }`}
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 50% 25%, #2a164b 0%, #150f30 45%, #0a071c 80%, #050412 100%)",
        boxShadow: "inset 0 0 60px rgba(0, 0, 0, 0.85), 0 0 45px rgba(99, 102, 241, 0.2)",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        pointerEvents: "auto",
      }}
      onPointerEnter={() => {
        if (!isInteractive) {
          document.body.style.cursor = "pointer";
          onHover?.(true);
        }
      }}
      onPointerLeave={() => {
        if (!isInteractive) {
          document.body.style.cursor = "default";
          onHover?.(false);
        }
      }}
      onPointerDown={handleContainerEvent}
      onPointerMove={handleContainerEvent}
      onPointerUp={handleContainerEvent}
      onClick={handleScreenClick}
      onWheel={handleContainerEvent}
    >
      {/* =========================================================================
          1. STICKY NOTES PINNED TO TOP RIGHT MONITOR BEZEL (MATCHING REFERENCE)
         ========================================================================= */}
      <div className="pointer-events-none absolute top-3 right-6 z-40 flex flex-col items-end gap-2">
        {/* Yellow TODO sticky note */}
        <div
          className="w-28 rounded-xs bg-[#fef08a] p-2.5 text-slate-900 shadow-xl border-t-[3px] border-[#facc15] rotate-2 transition-transform duration-200"
          style={{
            boxShadow: "3px 5px 14px rgba(0, 0, 0, 0.45)",
          }}
        >
          <div className="text-[10px] font-black tracking-wider text-amber-950 font-mono">
            TODO
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[9.5px] font-semibold text-slate-800 font-mono">
            <Check className="h-3 w-3 text-emerald-700 stroke-[3]" />
            <span>ship v2</span>
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-[9.5px] font-medium text-slate-600 font-mono">
            <Square className="h-2.5 w-2.5 text-slate-500" />
            <span>sleep</span>
          </div>
        </div>

        {/* Pink Wi-Fi password sticky note */}
        <div
          className="w-26 rounded-xs bg-[#fbcfe8] p-2 text-slate-900 shadow-xl border-t-[3px] border-[#f472b6] -rotate-4 transition-transform duration-200 -mr-1"
          style={{
            boxShadow: "2px 4px 12px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div className="text-[8.5px] font-bold text-pink-950 font-mono">wifi pw:</div>
          <div className="text-[9px] font-semibold text-slate-800 font-mono">
            password123 ☕
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. DUAL WINDOW DESKTOP WORKSPACE (MATCHING EXACT SCREENSHOT)
         ========================================================================= */}
      <div className="relative z-10 flex-1 px-6 pt-5 pb-2">
        <div className="grid grid-cols-12 gap-5 items-start">
          {/* -------------------------------------------------------------
              LEFT WINDOW: ai-cv-tailoring-website/README.md (CODE CARD)
             ------------------------------------------------------------- */}
          <div className="col-span-5 rounded-2xl border border-white/10 bg-[#141126]/90 shadow-2xl backdrop-blur-xl overflow-hidden">
            {/* Window Titlebar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#1a1633]/70 px-3.5 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444] shadow-xs" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b] shadow-xs" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#10b981] shadow-xs" />
              </div>
              <div className="text-[10px] font-mono font-medium text-slate-400">
                ai-cv-tailoring-website/README.md
              </div>
              <div className="w-10" />
            </div>

            {/* Window Content */}
            <div className="p-4 font-mono text-[11px]">
              {/* Status Header Badge + Title */}
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Now building
                </span>
                <span className="text-[12px] font-bold text-white font-sans tracking-tight">
                  AI CV Tailoring Website
                </span>
              </div>

              <div className="text-[11px] font-sans font-medium text-slate-400 mb-3 pl-0.5">
                The Inside Scoop
              </div>

              {/* Code Snippet with Line Numbers */}
              <div className="rounded-lg bg-[#0b081c]/90 border border-white/5 p-3 text-[11px] leading-relaxed">
                <div className="flex">
                  <span className="w-5 text-right mr-3 text-slate-600 select-none">1</span>
                  <span className="text-slate-500">// what I&apos;m building right now</span>
                </div>
                <div className="flex">
                  <span className="w-5 text-right mr-3 text-slate-600 select-none">2</span>
                  <span>
                    <span className="text-purple-400 font-semibold">const</span>{" "}
                    <span className="text-sky-300">project</span>{" "}
                    <span className="text-slate-300">= &#123;</span>
                  </span>
                </div>
                <div className="flex">
                  <span className="w-5 text-right mr-3 text-slate-600 select-none">3</span>
                  <span className="pl-4">
                    <span className="text-slate-400">name:</span>{" "}
                    <span className="text-emerald-400">&quot;AI CV Tailoring Website&quot;</span>,
                  </span>
                </div>
                <div className="flex">
                  <span className="w-5 text-right mr-3 text-slate-600 select-none">4</span>
                  <span className="pl-4">
                    <span className="text-slate-400">status:</span>{" "}
                    <span className="text-amber-300">&quot;in progress&quot;</span>,
                  </span>
                </div>
                <div className="flex">
                  <span className="w-5 text-right mr-3 text-slate-600 select-none">5</span>
                  <span className="text-slate-300">&#125;;</span>
                </div>
                <div className="flex">
                  <span className="w-5 text-right mr-3 text-slate-600 select-none">6</span>
                  <span>&nbsp;</span>
                </div>
                <div className="flex">
                  <span className="w-5 text-right mr-3 text-slate-600 select-none">7</span>
                  <span>
                    <span className="text-sky-400 font-semibold">ship</span>
                    <span className="text-slate-300">(</span>
                    <span className="text-sky-300">project</span>
                    <span className="text-slate-300">);</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------
              RIGHT WINDOW: about-me.md (PROFILE & BIO CARD)
             ------------------------------------------------------------- */}
          <div className="col-span-7 rounded-2xl border border-white/10 bg-[#15122b]/95 shadow-2xl backdrop-blur-xl overflow-hidden">
            {/* Window Titlebar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#1b1735]/70 px-3.5 py-2">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    if (isInteractive) {
                      playSound("whoosh", soundEnabled);
                      onReturnToRoom();
                    }
                  }}
                  className="h-2.5 w-2.5 rounded-full bg-[#ef4444] shadow-xs hover:opacity-80 transition cursor-pointer"
                  title={isInteractive ? "Close window (Esc)" : undefined}
                />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b] shadow-xs" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#10b981] shadow-xs" />
              </div>
              <div className="text-[10px] font-mono font-medium text-slate-400">
                about-me.md
              </div>
              <div className="w-10" />
            </div>

            {/* Profile Window Body */}
            <div className="p-4">
              {/* Header: Glowing Avatar + Name + Title + Location */}
              <div className="flex items-center gap-3.5">
                {/* Circular Avatar with Glowing Emerald/Cyan Ring */}
                <div className="relative h-16 w-16 shrink-0 rounded-full p-[2.5px] bg-gradient-to-tr from-emerald-400 via-teal-300 to-cyan-400 shadow-[0_0_18px_rgba(52,211,153,0.45)]">
                  <div className="h-full w-full rounded-full overflow-hidden bg-gradient-to-b from-slate-700 via-amber-900 to-teal-900 flex items-center justify-center">
                    {/* Stylized Developer Illustration */}
                    <svg
                      viewBox="0 0 100 100"
                      className="h-full w-full object-cover"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Sunset bokeh background */}
                      <rect width="100" height="100" fill="#475569" />
                      <circle cx="25" cy="25" r="22" fill="#d97706" opacity="0.75" />
                      <circle cx="80" cy="35" r="18" fill="#0d9488" opacity="0.6" />
                      <circle cx="50" cy="70" r="45" fill="#f59e0b" opacity="0.4" />
                      {/* Person Silhouette with Sunglasses */}
                      <ellipse cx="50" cy="98" rx="38" ry="24" fill="#0f172a" />
                      <rect x="42" y="55" width="16" height="15" fill="#d97706" />
                      <ellipse cx="50" cy="45" rx="17" ry="20" fill="#d97706" />
                      <ellipse cx="50" cy="30" rx="18" ry="11" fill="#0f172a" />
                      {/* Cool Sunglasses */}
                      <rect x="36" y="38" width="11" height="8" rx="2" fill="#020617" />
                      <rect x="53" y="38" width="11" height="8" rx="2" fill="#020617" />
                      <rect x="47" y="40" width="6" height="2" fill="#020617" />
                      <rect x="38" y="39" width="3" height="4" fill="#38bdf8" opacity="0.75" />
                      <rect x="55" y="39" width="3" height="4" fill="#38bdf8" opacity="0.75" />
                    </svg>
                  </div>
                </div>

                {/* Identity Information */}
                <div>
                  <h1 className="text-xl font-extrabold tracking-tight text-white leading-tight">
                    Sudeep <span className="text-emerald-400">S.</span>
                  </h1>
                  <p className="text-[12px] font-semibold text-slate-200 mt-0.5">
                    Software &amp; Cybersecurity Engineer
                  </p>
                  <p className="flex items-center gap-1 text-[10.5px] font-medium text-slate-400 mt-0.5">
                    <MapPin className="h-3 w-3 text-rose-400" />
                    <span>Bangalore, India</span>
                  </p>
                </div>
              </div>

              {/* Bio Paragraphs matching reference structure */}
              <div className="mt-3 space-y-1.5 text-[11px] leading-relaxed text-slate-300">
                <p>
                  Hi! I&apos;m Sudeep, a software engineer from India who loves to create and
                  design beautiful, resilient things.
                </p>
                <p>
                  I build modern web apps with Next.js and React, study Computer Science &amp;
                  Cybersecurity, and spend my spare time on CTF challenges (Global Top 35).
                </p>
                <p className="text-[10.5px] italic font-medium text-purple-300 pt-0.5">
                  Tech enthusiast with a passion for development &amp; systems architecture.
                </p>
              </div>

              {/* Two Info Cards Side-by-Side */}
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-white/5 bg-[#1e193d]/80 px-3 py-2">
                  <div className="text-[8.5px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                    BASED IN
                  </div>
                  <div className="text-[11.5px] font-semibold text-white mt-0.5">
                    Bangalore, India
                  </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-[#1e193d]/80 px-3 py-2">
                  <div className="text-[8.5px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                    FOCUS AREA
                  </div>
                  <div className="text-[11.5px] font-semibold text-white mt-0.5">
                    Cybersecurity &amp; AI
                  </div>
                </div>
              </div>

              {/* Two Action Buttons */}
              <div className="mt-3.5 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadCV}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-400 bg-transparent py-2 px-3 text-[11.5px] font-bold text-white transition hover:bg-emerald-500 hover:text-black hover:shadow-[0_0_20px_rgba(52,211,153,0.4)] active:scale-95 cursor-pointer"
                >
                  <span>Download CV</span>
                  <Download className="h-3.5 w-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleSayHello}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-[#252047] py-2 px-3 text-[11.5px] font-medium text-white transition hover:bg-[#322c5e] active:scale-95 cursor-pointer"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-purple-300" />
                  <span>Say hello</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            BOTTOM-LEFT: 4 DESKTOP SHORTCUT ICONS (MATCHING REFERENCE)
           ------------------------------------------------------------- */}
        <div className="mt-2.5 flex items-center gap-7 pl-2">
          {/* Projects Icon */}
          <button
            type="button"
            onClick={() => handleDesktopIconClick("bookshelf")}
            className="group flex flex-col items-center gap-1 text-center transition hover:scale-105 cursor-pointer focus:outline-none"
            title="Inspect 12 verified bookshelf projects"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 group-hover:bg-amber-500/20 group-hover:border-amber-400 shadow-md transition">
              <Folder className="h-5 w-5 text-amber-400" />
            </div>
            <span className="text-[10px] font-semibold text-slate-300 group-hover:text-white transition">
              Projects
            </span>
          </button>

          {/* Career Icon */}
          <button
            type="button"
            onClick={() => handleDesktopIconClick("whiteboard")}
            className="group flex flex-col items-center gap-1 text-center transition hover:scale-105 cursor-pointer focus:outline-none"
            title="Inspect Whiteboard career journey & tech stack"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-500/30 group-hover:bg-sky-500/20 group-hover:border-sky-400 shadow-md transition">
              <BarChart3 className="h-5 w-5 text-sky-400" />
            </div>
            <span className="text-[10px] font-semibold text-slate-300 group-hover:text-white transition">
              Career
            </span>
          </button>

          {/* Certificates Icon */}
          <button
            type="button"
            onClick={() => handleDesktopIconClick("certificates")}
            className="group flex flex-col items-center gap-1 text-center transition hover:scale-105 cursor-pointer focus:outline-none"
            title="Inspect verified credentials & certificates"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/30 group-hover:bg-purple-500/20 group-hover:border-purple-400 shadow-md transition">
              <GraduationCap className="h-5 w-5 text-purple-400" />
            </div>
            <span className="text-[10px] font-semibold text-slate-300 group-hover:text-white transition">
              Certificates
            </span>
          </button>

          {/* TryHackMe Icon */}
          <button
            type="button"
            onClick={() => handleDesktopIconClick("tryhackme")}
            className="group flex flex-col items-center gap-1 text-center transition hover:scale-105 cursor-pointer focus:outline-none"
            title="Inspect TryHackMe profile & CTF badges"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/30 group-hover:bg-purple-500/20 group-hover:border-purple-400 shadow-md transition">
              <Shield className="h-5 w-5 text-purple-400" />
            </div>
            <span className="text-[10px] font-semibold text-slate-300 group-hover:text-white transition">
              TryHackMe
            </span>
          </button>

          {/* Chat.app Icon */}
          <button
            type="button"
            onClick={() => handleDesktopIconClick("soundboard")}
            className="group flex flex-col items-center gap-1 text-center transition hover:scale-105 cursor-pointer focus:outline-none"
            title="Open Soundboard communication console"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 group-hover:bg-emerald-500/20 group-hover:border-emerald-400 shadow-md transition">
              <Smartphone className="h-5 w-5 text-emerald-400" />
            </div>
            <span className="text-[10px] font-semibold text-slate-300 group-hover:text-white transition">
              Chat.app
            </span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          3. BOTTOM TASKBAR & FLOATING PILL HINT (MATCHING REFERENCE)
         ========================================================================= */}
      <div className="relative z-20">
        {/* Floating pill: "Click the desktop icons to jump around" */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="rounded-full border border-purple-400/30 bg-[#0d0924]/90 px-4 py-1 text-[10px] font-semibold text-slate-200 shadow-[0_0_20px_rgba(168,85,247,0.35)] backdrop-blur-md">
            Click the desktop icons to jump around
          </div>
        </div>

        {/* Taskbar Bar */}
        <div className="flex h-9 items-center justify-between border-t border-white/10 bg-[#0c091f]/95 px-5">
          {/* Left: App icon badges + links */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              {/* GitHub App Icon */}
              <a
                href="https://github.com/Sudeep2296"
                target="_blank"
                rel="noreferrer"
                className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1f1d33] border border-white/10 hover:bg-white/20 transition cursor-pointer"
                title="GitHub Profile"
              >
                <Github className="h-3.5 w-3.5 text-white" />
              </a>

              {/* LinkedIn App Icon */}
              <a
                href="https://www.linkedin.com/in/sudeep-s-4389052b7/"
                target="_blank"
                rel="noreferrer"
                className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0077b5] border border-white/10 hover:opacity-90 transition cursor-pointer"
                title="LinkedIn Profile"
              >
                <Linkedin className="h-3.5 w-3.5 text-white" />
              </a>

              {/* Message App Icon */}
              <button
                type="button"
                onClick={handleSayHello}
                className="flex h-6 w-6 items-center justify-center rounded-md bg-[#6366f1] border border-white/10 hover:opacity-90 transition cursor-pointer"
                title="Send Message"
              >
                <MessageSquare className="h-3.5 w-3.5 text-white" />
              </button>

              {/* CV App Icon */}
              <button
                type="button"
                onClick={handleDownloadCV}
                className="flex h-6 w-6 items-center justify-center rounded-md bg-[#10b981] border border-white/10 hover:opacity-90 transition cursor-pointer"
                title="Download CV"
              >
                <Download className="h-3.5 w-3.5 text-white" />
              </button>
            </div>

            {/* Breadcrumb Links */}
            <div className="text-[10px] font-mono text-slate-400 pl-1">
              <a
                href="https://github.com/Sudeep2296"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                GitHub
              </a>{" "}
              ·{" "}
              <a
                href="https://www.linkedin.com/in/sudeep-s-4389052b7/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                LinkedIn
              </a>{" "}
              ·{" "}
              <button
                type="button"
                onClick={handleSayHello}
                className="hover:text-white transition cursor-pointer"
              >
                Message
              </button>{" "}
              ·{" "}
              <button
                type="button"
                onClick={handleDownloadCV}
                className="hover:text-white transition cursor-pointer"
              >
                CV
              </button>
            </div>
          </div>

          {/* Right: Live Clock */}
          <div className="text-[10.5px] font-mono font-medium text-slate-400">
            {timeStr}
          </div>
        </div>
      </div>
    </div>
  );
};
