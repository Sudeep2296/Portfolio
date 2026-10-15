"use client";

import React, { useState, useEffect } from "react";

interface NeonSignScreenProps {
  isInteractive?: boolean;
  onSelect?: () => void;
  isOn?: boolean;
}

const ROLES = [
  "Ethical Hacker",
  "Cybersecurity Engineer",
  "Full Stack Developer",
  "AI / ML Researcher",
  "Systems Specialist",
];

export const NeonSignScreen: React.FC<NeonSignScreenProps> = ({
  isInteractive,
  onSelect,
  isOn = true,
}) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState(ROLES[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isOn) return;

    const currentRole = ROLES[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 85);
      } else {
        // Pause at full word
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, isOn]);

  const currentArticle = /^[AEIOU]/i.test(ROLES[roleIndex]) ? "an" : "a";

  return (
    <div
      onClick={onSelect}
      className={`relative flex h-[240px] w-[1080px] items-center justify-center select-none cursor-pointer rounded-2xl border transition-all duration-300 px-12 py-5 backdrop-blur-md hover:scale-[1.015] ${
        isOn
          ? "border-white/10 bg-[#070617]/95 shadow-[0_0_35px_rgba(176,102,255,0.25)] hover:border-white/20 hover:shadow-[0_0_45px_rgba(176,102,255,0.4)]"
          : "border-white/[0.04] bg-[#050412]/60 shadow-none opacity-70"
      }`}
      style={{
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      {/* 4 Corner standoff screws matching reference */}
      <div className="absolute top-4 left-5 h-4 w-4 rounded-full bg-slate-400 shadow-[0_0_6px_rgba(255,255,255,0.4)] border border-slate-600" />
      <div className="absolute top-4 right-5 h-4 w-4 rounded-full bg-slate-400 shadow-[0_0_6px_rgba(255,255,255,0.4)] border border-slate-600" />
      <div className="absolute bottom-4 left-5 h-4 w-4 rounded-full bg-slate-400 shadow-[0_0_6px_rgba(255,255,255,0.4)] border border-slate-600" />
      <div className="absolute bottom-4 right-5 h-4 w-4 rounded-full bg-slate-400 shadow-[0_0_6px_rgba(255,255,255,0.4)] border border-slate-600" />

      {/* Main Glowing Neon Text - Stabilized Anchor to eliminate any text tremor/jitter */}
      <div className="flex items-baseline justify-center text-[46px] font-extrabold tracking-tight whitespace-nowrap">
        <span
          className={`font-bold transition-colors duration-200 shrink-0 mr-3.5 ${
            isOn ? "text-white" : "text-[#2e2a44]"
          }`}
          style={{
            textShadow: isOn
              ? "0 0 6px #ffffff, 0 0 16px rgba(255,255,255,0.95), 0 0 32px rgba(255,255,255,0.6)"
              : "0 1px 2px rgba(0,0,0,0.8)",
          }}
        >
          I&apos;m
        </span>

        <span
          className={`font-black transition-colors duration-200 shrink-0 mr-3.5 ${
            isOn ? "text-[#38bdf8]" : "text-[#22364c]"
          }`}
          style={{
            textShadow: isOn
              ? "0 0 6px #38bdf8, 0 0 18px #0284c7, 0 0 36px rgba(56,189,248,0.9)"
              : "0 1px 2px rgba(0,0,0,0.8)",
          }}
        >
          Sudeep,
        </span>

        <span
          className={`font-bold transition-colors duration-200 shrink-0 inline-block text-center w-[48px] mr-2 ${
            isOn ? "text-white" : "text-[#2e2a44]"
          }`}
          style={{
            textShadow: isOn
              ? "0 0 6px #ffffff, 0 0 16px rgba(255,255,255,0.95), 0 0 32px rgba(255,255,255,0.6)"
              : "0 1px 2px rgba(0,0,0,0.8)",
          }}
        >
          {currentArticle}
        </span>

        <span
          className={`font-black transition-colors duration-200 inline-block text-left min-w-[530px] shrink-0 ${
            isOn ? "text-[#c084fc]" : "text-[#32234d]"
          }`}
          style={{
            textShadow: isOn
              ? "0 0 6px #c084fc, 0 0 18px #a855f7, 0 0 38px rgba(168,85,247,0.95)"
              : "0 1px 2px rgba(0,0,0,0.8)",
          }}
        >
          {displayText}
          <span
            className={`inline-block ml-1 font-light ${
              isOn ? "animate-pulse text-[#e9d5ff]" : "text-[#32234d] opacity-50"
            }`}
          >
            |
          </span>
        </span>
      </div>
    </div>
  );
};
