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
  const [displayText, setDisplayText] = useState("");
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
        }, 1900);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        }, 45);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, isOn]);

  return (
    <div
      onClick={onSelect}
      className={`relative flex h-[240px] w-[1040px] items-center justify-center select-none cursor-pointer rounded-2xl border transition-all duration-300 px-8 py-5 backdrop-blur-md ${
        isOn
          ? "border-white/10 bg-[#070617]/90 shadow-[0_0_35px_rgba(176,102,255,0.25)]"
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

      {/* Main Glowing Neon Text - Turned on vs off dormant glass tubes */}
      <div className="flex items-baseline justify-center text-[42px] font-extrabold tracking-tight whitespace-nowrap transition-colors duration-200">
        <span
          className={`mr-3 font-semibold transition-all duration-200 ${
            isOn ? "text-white" : "text-[#2e2a44]"
          }`}
          style={{
            textShadow: isOn
              ? "0 0 4px #ffffff, 0 0 12px rgba(255,255,255,0.9), 0 0 25px rgba(255,255,255,0.5)"
              : "0 1px 2px rgba(0,0,0,0.8)",
          }}
        >
          I&apos;m
        </span>

        <span
          className={`mr-3 font-extrabold transition-all duration-200 ${
            isOn ? "text-[#38bdf8]" : "text-[#22364c]"
          }`}
          style={{
            textShadow: isOn
              ? "0 0 4px #38bdf8, 0 0 14px #0284c7, 0 0 30px rgba(56,189,248,0.85)"
              : "0 1px 2px rgba(0,0,0,0.8)",
          }}
        >
          Sudeep,
        </span>

        <span
          className={`mr-3 font-semibold transition-all duration-200 ${
            isOn ? "text-white" : "text-[#2e2a44]"
          }`}
          style={{
            textShadow: isOn
              ? "0 0 4px #ffffff, 0 0 12px rgba(255,255,255,0.9), 0 0 25px rgba(255,255,255,0.5)"
              : "0 1px 2px rgba(0,0,0,0.8)",
          }}
        >
          a
        </span>

        <span
          className={`font-extrabold transition-all duration-200 ${
            isOn ? "text-[#c084fc]" : "text-[#32234d]"
          }`}
          style={{
            textShadow: isOn
              ? "0 0 4px #c084fc, 0 0 14px #a855f7, 0 0 32px rgba(168,85,247,0.9)"
              : "0 1px 2px rgba(0,0,0,0.8)",
          }}
        >
          {displayText || "Cybersecurity Engineer"}
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
