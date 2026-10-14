"use client";

import React, { useState, useEffect } from "react";
import { skillsData } from "@/data/skills";
import { contactConfig } from "@/data/socials";
import { playSound } from "@/lib/audio";
import {
  X,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  CheckCircle2,
  Volume2,
  VolumeX,
  Sparkles,
  Music,
  Terminal,
  Clock,
  Globe,
  Calendar,
  Shield,
  Award,
  Cpu,
  Layers,
} from "lucide-react";

interface FocusedObjectExperienceProps {
  activeObjectId: string | null;
  onReturnToRoom: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const FocusedObjectExperience: React.FC<FocusedObjectExperienceProps> = ({
  activeObjectId,
  onReturnToRoom,
  soundEnabled,
  onToggleSound,
}) => {
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>(
    skillsData[0]?.title || "Programming Languages"
  );
  const [padActive, setPadActive] = useState<number | null>(null);
  const [currentDate, setCurrentDate] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeInZone = (timeZone: string) => {
    try {
      return currentDate.toLocaleTimeString("en-US", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    } catch {
      return "--:--:--";
    }
  };

  const getDateInZone = (timeZone: string) => {
    try {
      return currentDate.toLocaleDateString("en-US", {
        timeZone,
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  if (
    !activeObjectId ||
    activeObjectId === "monitor" ||
    activeObjectId === "whiteboard" ||
    activeObjectId === "bookshelf" ||
    activeObjectId === "neon"
  ) {
    return null;
  }

  const handleContainerEvent = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  const handlePadTrigger = (index: number, soundType: any) => {
    setPadActive(index);
    playSound(soundType, soundEnabled);
    setTimeout(() => setPadActive(null), 250);
  };

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onPointerDown={handleContainerEvent}
      onClick={handleContainerEvent}
    >
      {/* Semi-transparent backdrop blur vignette */}
      <div
        className="pointer-events-auto absolute inset-0 bg-black/65 backdrop-blur-md transition-opacity"
        onClick={() => {
          playSound("whoosh", soundEnabled);
          onReturnToRoom();
        }}
      />

      {/* Main Focused Card (Secondary to 3D room, compact and cleanly centered) */}
      <div
        className="pointer-events-auto relative z-10 w-full max-w-2xl rounded-2xl border border-white/15 bg-[#070924]/95 p-6 shadow-2xl backdrop-blur-2xl"
        onClick={handleContainerEvent}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor:
                  activeObjectId === "neon"
                    ? "#f43f5e"
                    : activeObjectId === "bookshelf"
                    ? "#a855f7"
                    : activeObjectId === "soundboard"
                    ? "#fbbf24"
                    : activeObjectId === "certificates"
                    ? "#a855f7"
                    : activeObjectId === "tryhackme"
                    ? "#22c55e"
                    : activeObjectId === "testimonials"
                    ? "#f59e0b"
                    : activeObjectId === "clock"
                    ? "#10b981"
                    : activeObjectId === "globe"
                    ? "#6366f1"
                    : "#38bdf8",
              }}
            />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              {activeObjectId === "neon" && "Identity & Philosophy"}
              {activeObjectId === "bookshelf" && "Technical Skills & Knowledge Shelf"}
              {activeObjectId === "soundboard" && "Audio Console & Connect Channels"}
              {activeObjectId === "certificates" && "Certificates & Achievements"}
              {activeObjectId === "tryhackme" && "TryHackMe Profile & CTF Badges"}
              {activeObjectId === "testimonials" && "Endorsements & Recommendations"}
              {activeObjectId === "clock" && "Desk Clock · Working Hours & Global Availability"}
              {activeObjectId === "globe" && "Global Horizons · Research & Borderless Impact"}
            </h2>
          </div>

          {/* Obvious Return to Room */}
          <button
            type="button"
            onClick={() => {
              playSound("whoosh", soundEnabled);
              onReturnToRoom();
            }}
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300 hover:bg-white/15 hover:text-white transition"
          >
            <span>✕ Return to Room</span>
            <kbd className="rounded border border-white/20 px-1 text-[9px] text-slate-400">Esc</kbd>
          </button>
        </div>

        {/* Dynamic Object Body */}
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-1">
          {/* 1. NEON SIGN: IDENTITY & PHILOSOPHY */}
          {activeObjectId === "neon" && (
            <div className="space-y-4">
              <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                  Engineering Philosophy
                </span>
                <h3 className="mt-1 text-lg font-extrabold text-white">
                  Mathematical Rigor · Assistive AI · Resilient Architecture
                </h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  I specialize in turning complex theoretical computer science into concrete, interactive software. From verifying cyclic groups and primitive roots in cryptographic key exchange to building multi-agent consensus pipelines for dysarthric speech recognition, I focus on systems that are robust, testable, and deeply human-centric.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                  <span className="text-xs font-bold text-white">Education &amp; Background</span>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    Computer Science &amp; Engineering. Passionate about applied cryptography, speech acoustic modeling, and full-stack systems engineering.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                  <span className="text-xs font-bold text-white">Core Focus Areas</span>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    Cybersecurity Protocols · AI/ML &amp; LLM Engineering · High-Performance Web &amp; Interactive Graphics.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://github.com/Sudeep2296"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-500 transition"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub: Sudeep2296</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href="https://linkedin.com/in/sudeep-s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          )}

          {/* 2. BOOKSHELF: SKILLS & LEARNING */}
          {activeObjectId === "bookshelf" && (
            <div className="space-y-4">
              {/* Category selector */}
              <div className="flex flex-wrap gap-1.5 border-b border-white/10 pb-3">
                {skillsData.map((cat) => (
                  <button
                    key={cat.title}
                    type="button"
                    onClick={() => {
                      playSound("click", soundEnabled);
                      setActiveSkillCategory(cat.title);
                    }}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      activeSkillCategory === cat.title
                        ? "bg-purple-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>

              {/* Skills grid */}
              <div className="grid grid-cols-2 gap-3">
                {skillsData
                  .find((c) => c.title === activeSkillCategory)
                  ?.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 transition hover:border-purple-500/40"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{skill.name}</span>
                        <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-purple-300">
                          {skill.level}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                        {skill.focus}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 3. SOUNDBOARD: AUDIO CONSOLE & CONTACT */}
          {activeObjectId === "soundboard" && (
            <div className="space-y-4">
              {/* Contact Channels */}
              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  Verified Contact Actions
                </span>
                <p className="mt-1 text-xs text-slate-300">
                  Ready to collaborate on software engineering, cybersecurity, or AI/ML systems?
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a
                    href={`mailto:${contactConfig.email}`}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 p-2.5 text-xs text-white hover:bg-white/10 transition"
                  >
                    <Mail className="h-4 w-4 text-rose-400 shrink-0" />
                    <div>
                      <div className="font-semibold">Email Directly</div>
                      <div className="text-[10px] text-slate-400">{contactConfig.email}</div>
                    </div>
                  </a>

                  <a
                    href={`tel:${contactConfig.phone}`}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 p-2.5 text-xs text-white hover:bg-white/10 transition"
                  >
                    <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-[10px] text-slate-400">{contactConfig.phone}</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Interactive Audio Pads */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Music className="h-4 w-4 text-purple-400" />
                    <span className="text-xs font-bold text-white">
                      Physical Soundboard Pads
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={onToggleSound}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300 hover:text-white transition"
                  >
                    {soundEnabled ? (
                      <>
                        <Volume2 className="h-3 w-3 text-emerald-400" />
                        <span>Sound Enabled</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="h-3 w-3 text-slate-500" />
                        <span>Sound Muted</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  Click the physical sound synthesis pads to test procedural audio waveforms:
                </p>

                <div className="mt-3 grid grid-cols-4 gap-2">
                  {[
                    { label: "Switch Tone", sound: "switch", color: "bg-purple-600" },
                    { label: "Click FX", sound: "click", color: "bg-cyan-600" },
                    { label: "Pop Synth", sound: "pop", color: "bg-emerald-600" },
                    { label: "Whoosh", sound: "whoosh", color: "bg-rose-600" },
                  ].map((pad, idx) => (
                    <button
                      key={pad.label}
                      type="button"
                      onClick={() => handlePadTrigger(idx, pad.sound)}
                      className={`flex flex-col items-center justify-center rounded-xl border p-3 transition ${
                        padActive === idx
                          ? "scale-95 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                          : "border-white/10 bg-black/40 hover:bg-white/5"
                      }`}
                    >
                      <span className={`h-2.5 w-2.5 rounded-full ${pad.color} mb-1.5`} />
                      <span className="text-[11px] font-bold text-white">{pad.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. CERTIFICATES: CREDENTIALS & ACHIEVEMENTS */}
          {activeObjectId === "certificates" && (
            <div className="space-y-3">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                  Verified Industry Credentials
                </span>
                <p className="mt-1 text-xs text-slate-300">
                  Competitive CTF achievements, cloud certifications, and technical proficiencies:
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Huntress CTF Elite</span>
                    <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                      Top 35th Global
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    100% completion rate (65/65 challenges solved) competing against 6,950+ international teams.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">IBM Full Stack Developer</span>
                    <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[10px] font-bold text-cyan-300">
                      Professional Cert
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Comprehensive full-stack engineering, Docker containers, Kubernetes, CI/CD, and cloud architectures.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">TryHackMe HackFinity</span>
                    <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-[10px] font-bold text-purple-300">
                      Rank 339
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Scoreboard rank 339 with 510 points across network defense, memory forensics, and web exploits.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">CyberShield 4.0</span>
                    <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-[10px] font-bold text-rose-300">
                      Finalist
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Inter-university capture-the-flag competition representing elite student engineering cohorts.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 4.5. TRYHACKME PROFILE & CYBER DEFENDER CREDENTIALS */}
          {activeObjectId === "tryhackme" && (
            <div className="space-y-3">
              <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 font-mono">
                    TryHackMe Hacker Profile · Elite Cybersecurity
                  </span>
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2 py-0.5 text-[10px] font-bold text-emerald-300 animate-pulse">
                    Live Active
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-300">
                  Continuous hands-on cybersecurity training across penetration testing, defensive forensics, and offensive security:
                </p>
              </div>

              {/* TryHackMe Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
                  <span className="text-xl font-extrabold text-[#4ade80]">Top 1%</span>
                  <div className="text-[10px] uppercase font-bold text-slate-400 mt-0.5">Global Rank</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
                  <span className="text-xl font-extrabold text-[#f59e0b]">120+</span>
                  <div className="text-[10px] uppercase font-bold text-slate-400 mt-0.5">Daily Streak 🔥</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
                  <span className="text-xl font-extrabold text-[#38bdf8]">65+</span>
                  <div className="text-[10px] uppercase font-bold text-slate-400 mt-0.5">Rooms Solved</div>
                </div>
              </div>

              {/* Badges and Domain Strengths */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Network &amp; Web Defense</span>
                    <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">Mastered</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    OWASP Top 10 mitigation, SQLi, XSS, SSRF, Burp Suite mastery, and secure API protocols.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Linux &amp; Windows PrivEsc</span>
                    <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[10px] font-bold text-cyan-300">Advanced</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Kernel exploits, SUID binaries, Active Directory enumeration, and bloodhound analysis.
                  </p>
                </div>
              </div>

              {/* Direct Profile Link Button */}
              <div className="flex justify-end pt-1">
                <a
                  href="https://tryhackme.com/p/Sudeep2296"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-[#22c55e] px-4 py-2 text-xs font-extrabold text-[#052e16] shadow-[0_0_16px_rgba(34,197,94,0.5)] transition hover:bg-[#16a34a] hover:scale-105 active:scale-95"
                >
                  <span>Open TryHackMe Profile</span>
                  <span>🚀</span>
                </a>
              </div>
            </div>
          )}

          {/* 5. TESTIMONIALS: RECOMMENDATIONS */}
          {activeObjectId === "testimonials" && (
            <div className="space-y-3">
              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  Colleague &amp; Client Endorsements
                </span>
                <p className="mt-1 text-xs text-slate-300">
                  Feedback from engineering leads and collaborative project stakeholders:
                </p>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-white">Senior Systems Architect</div>
                    <div className="text-amber-400 text-xs">⭐⭐⭐⭐⭐</div>
                  </div>
                  <p className="mt-2 text-xs italic text-slate-300 leading-relaxed">
                    &ldquo;Sudeep brings remarkable rigor to every technical challenge. From designing cryptographic simulators to building real-time interactive 3D web applications, his attention to performance and clean architecture is exceptional.&rdquo;
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-white">AI Research Partner</div>
                    <div className="text-amber-400 text-xs">⭐⭐⭐⭐⭐</div>
                  </div>
                  <p className="mt-2 text-xs italic text-slate-300 leading-relaxed">
                    &ldquo;Collaborating with Sudeep on speech acoustic modeling and vector RAG was effortless. He has a rare ability to understand complex algorithms and immediately write clean, maintainable code for them.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 6. DESK CLOCK: WORKING HOURS & GLOBAL AVAILABILITY */}
          {activeObjectId === "clock" && (
            <div className="space-y-4">
              {/* Top Banner: Status & Live Local Time */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                      Currently Available for Opportunities
                    </span>
                  </div>
                  <h3 className="mt-1 text-base font-extrabold text-white">
                    India Standard Time (IST · UTC+5:30)
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-300">
                    Open to full-time engineering roles, cryptographic systems &amp; global remote teams.
                  </p>
                </div>
                <div className="shrink-0 rounded-lg border border-emerald-500/40 bg-black/40 px-3.5 py-2 text-right">
                  <div className="text-[10px] font-mono uppercase text-emerald-400">Local Time (IST)</div>
                  <div className="text-xl font-black font-mono tracking-tight text-white">
                    {getTimeInZone("Asia/Kolkata")}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {getDateInZone("Asia/Kolkata")}
                  </div>
                </div>
              </div>

              {/* World Clocks Grid */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Synchronized World Timezones
                </span>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* IST */}
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-3 text-center">
                    <div className="text-base">🇮🇳</div>
                    <div className="mt-1 text-xs font-bold text-white">Bengaluru (IST)</div>
                    <div className="text-[10px] font-mono text-emerald-400">UTC +5:30</div>
                    <div className="mt-1.5 text-sm font-extrabold font-mono text-white">
                      {getTimeInZone("Asia/Kolkata")}
                    </div>
                    <div className="mt-1 inline-block rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-300">
                      Home Base
                    </div>
                  </div>

                  {/* PST */}
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
                    <div className="text-base">🇺🇸</div>
                    <div className="mt-1 text-xs font-bold text-white">San Francisco (PST)</div>
                    <div className="text-[10px] font-mono text-slate-400">UTC -7:00</div>
                    <div className="mt-1.5 text-sm font-extrabold font-mono text-slate-200">
                      {getTimeInZone("America/Los_Angeles")}
                    </div>
                    <div className="mt-1 inline-block rounded bg-white/5 px-1.5 py-0.5 text-[9px] font-semibold text-slate-400">
                      Silicon Valley
                    </div>
                  </div>

                  {/* EST */}
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
                    <div className="text-base">🇺🇸</div>
                    <div className="mt-1 text-xs font-bold text-white">New York (EST)</div>
                    <div className="text-[10px] font-mono text-slate-400">UTC -4:00</div>
                    <div className="mt-1.5 text-sm font-extrabold font-mono text-slate-200">
                      {getTimeInZone("America/New_York")}
                    </div>
                    <div className="mt-1 inline-block rounded bg-white/5 px-1.5 py-0.5 text-[9px] font-semibold text-slate-400">
                      US East Coast
                    </div>
                  </div>

                  {/* UTC / GMT */}
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
                    <div className="text-base">🇬🇧</div>
                    <div className="mt-1 text-xs font-bold text-white">London (UTC)</div>
                    <div className="text-[10px] font-mono text-slate-400">UTC +0:00</div>
                    <div className="mt-1.5 text-sm font-extrabold font-mono text-slate-200">
                      {getTimeInZone("UTC")}
                    </div>
                    <div className="mt-1 inline-block rounded bg-white/5 px-1.5 py-0.5 text-[9px] font-semibold text-slate-400">
                      European Window
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule & Availability Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <Calendar className="h-4 w-4 text-emerald-400" />
                    <span>Working Schedule</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-400">✓</span>
                      <span><strong>Hours:</strong> 09:00 — 21:00 IST (Mon — Sat)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-400">✓</span>
                      <span><strong>US/EU Overlap:</strong> 3–5 hours daily direct sync window</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-400">✓</span>
                      <span><strong>Response SLA:</strong> Under 4 hours on business days</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <Mail className="h-4 w-4 text-cyan-400" />
                    <span>Direct Channels</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Have a project or opportunity? Reach out directly via email or professional networks.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href={`mailto:${contactConfig.email}?subject=Inquiry%20from%20Portfolio`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30 transition"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>Send Email</span>
                    </a>
                    <a
                      href="https://linkedin.com/in/sudeep-s"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-white/15 hover:text-white transition"
                    >
                      <Linkedin className="h-3.5 w-3.5 text-[#38bdf8]" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. GLOBE: GLOBAL RESEARCH & OPEN SOURCE HORIZONS */}
          {activeObjectId === "globe" && (
            <div className="space-y-4">
              {/* Banner */}
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-indigo-400" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                    Global Horizons &amp; Borderless Impact
                  </span>
                </div>
                <h3 className="mt-1 text-base font-extrabold text-white">
                  Research, International Competitions &amp; Distributed Systems
                </h3>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Engineering software that solves problems at global scale—from competing on international cybersecurity scoreboards to building universal assistive speech recognition pipelines and mathematically resilient cryptographic protocols.
                </p>
              </div>

              {/* Key Global Domains */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Global CTF Competition */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-rose-400" />
                      <span>Global Cyber Competitions</span>
                    </span>
                    <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-[10px] font-bold text-rose-300">
                      Top 35th Global
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Competed against <strong>6,950+ international teams</strong> across 80+ nations in Huntress CTF 2024, achieving 100% completion (65/65 challenges) in reverse engineering, malware analysis, and network forensics.
                  </p>
                </div>

                {/* 2. Decentralized Cryptography */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Cpu className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Border-Free Cryptography</span>
                    </span>
                    <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[10px] font-bold text-cyan-300">
                      Applied Math
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Implementing cyclic groups, discrete logarithm hardness, and post-quantum zero-knowledge proof primitives designed for decentralized, trustless international networks.
                  </p>
                </div>

                {/* 3. Global Assistive AI */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                      <span>NeuroSpeak AI (Worldwide Access)</span>
                    </span>
                    <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-[10px] font-bold text-purple-300">
                      Assistive AI
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Designed an assistive acoustic speech recognition framework for individuals with dysarthria, built to function reliably across diverse acoustic profiles, dialects, and global voice variations.
                  </p>
                </div>

                {/* 4. Remote & Async Engineering */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Async Distributed Workflows</span>
                    </span>
                    <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                      100% Remote-Ready
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Experienced with documentation-first architectures, GitHub Actions CI/CD pipelines, Dockerized deployments, and clean asynchronous pull request reviews.
                  </p>
                </div>
              </div>

              {/* Global Impact Metrics */}
              <div className="grid grid-cols-4 gap-2 rounded-xl border border-white/10 bg-black/30 p-3 text-center">
                <div>
                  <div className="text-lg font-black text-indigo-400">80+</div>
                  <div className="text-[10px] text-slate-400">Countries Competed</div>
                </div>
                <div>
                  <div className="text-lg font-black text-rose-400">Top 0.5%</div>
                  <div className="text-[10px] text-slate-400">Global Standings</div>
                </div>
                <div>
                  <div className="text-lg font-black text-emerald-400">65 / 65</div>
                  <div className="text-[10px] text-slate-400">Solved CTF Tasks</div>
                </div>
                <div>
                  <div className="text-lg font-black text-cyan-400">Async</div>
                  <div className="text-[10px] text-slate-400">Global Collab</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] font-mono text-slate-500">
          <span>Click outside or press Esc to return to room overview</span>
          <span>Verified developer portfolio</span>
        </div>
      </div>
    </div>
  );
};
