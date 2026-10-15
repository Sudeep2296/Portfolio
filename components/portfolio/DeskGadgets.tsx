"use client";

import React, { useState, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Shield, Award, CheckCircle, ExternalLink } from "lucide-react";

interface DeskGadgetsProps {
  isVisible?: boolean;
  isClockFocused?: boolean;
  isTestimonialsFocused?: boolean;
  testimonialCardIndex?: number;
  onToggleTestimonialCard?: () => void;
  onSelectCertificates?: () => void;
  onSelectTryHackMe?: () => void;
  onSelectClock?: () => void;
  onSelectTestimonials?: () => void;
  onSelectContact?: () => void;
  onHoverObject?: (id: string | null) => void;
  hoveredObjectId?: string | null;
}

export const DeskGadgets: React.FC<DeskGadgetsProps> = ({
  isVisible = true,
  isClockFocused = false,
  isTestimonialsFocused = false,
  testimonialCardIndex = 0,
  onToggleTestimonialCard,
  onSelectCertificates,
  onSelectTryHackMe,
  onSelectClock,
  onSelectTestimonials,
  onSelectContact,
  onHoverObject,
  hoveredObjectId,
}) => {
  const clockRef = useRef<THREE.Group | null>(null);
  const thmRef = useRef<THREE.Group | null>(null);
  const testRef = useRef<THREE.Group | null>(null);

  useFrame((state, delta) => {
    const isClock = hoveredObjectId === "clock";
    const isThm = hoveredObjectId === "tryhackme";
    const isTest = hoveredObjectId === "testimonials";

    if (clockRef.current) {
      const target = isClock ? 1.05 : 1.0;
      let cur = THREE.MathUtils.damp(clockRef.current.scale.x, target, 12, delta);
      if (Math.abs(cur - target) < 0.0002) cur = target;
      clockRef.current.scale.set(cur, cur, cur);
    }
    if (thmRef.current) {
      const target = isThm ? 1.05 : 1.0;
      let cur = THREE.MathUtils.damp(thmRef.current.scale.x, target, 12, delta);
      if (Math.abs(cur - target) < 0.0002) cur = target;
      thmRef.current.scale.set(cur, cur, cur);
    }
    if (testRef.current) {
      const target = isTest ? 1.05 : 1.0;
      let cur = THREE.MathUtils.damp(testRef.current.scale.x, target, 12, delta);
      if (Math.abs(cur - target) < 0.0002) cur = target;
      testRef.current.scale.set(cur, cur, cur);
    }
  });
  const [time, setTime] = useState({
    hours: "12",
    minutes: "30",
    seconds: "00",
    date: "SUN · OCT 11",
    tz: "IST",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format in IST (Indian Standard Time)
      const istTimeFormatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const parts = istTimeFormatter.formatToParts(now);
      const hours = parts.find((p) => p.type === "hour")?.value || "12";
      const minutes = parts.find((p) => p.type === "minute")?.value || "00";
      const seconds = parts.find((p) => p.type === "second")?.value || "00";

      const dateFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      const date = dateFormatter.format(now).toUpperCase();

      setTime({ hours, minutes, seconds, date, tz: "IST" });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Digital Desk Clock Screen */}
      <group ref={clockRef} position={[-0.50, 0.802, -0.098]}>
        <Html
          transform
          distanceFactor={0.12}
          style={{ width: "260px", height: "92px", pointerEvents: "auto", cursor: "pointer" }}
        >
          <div
            onClick={onSelectClock}
            onPointerEnter={() => {
              document.body.style.cursor = "pointer";
              onHoverObject?.("clock");
            }}
            onPointerLeave={() => {
              document.body.style.cursor = "default";
              onHoverObject?.(null);
            }}
            className="flex h-full w-full flex-col justify-between overflow-hidden rounded-[3px] bg-[#020b05] p-2 font-mono text-[#4ade80] border border-[#166534]/60 shadow-[inset_0_0_12px_rgba(34,197,94,0.22)] select-none transition-all hover:border-[#22c55e]/90"
            style={{
              textShadow: "0 0 6px #4ade80, 0 0 14px rgba(74,222,128,0.5)",
              fontFamily: "'Courier New', Courier, monospace",
            }}
          >
            {/* Header: Timezone & status */}
            <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-[#86efac]/90 leading-none">
              <span className="flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                <span>{time.tz} · UTC+5:30</span>
              </span>
              <span className="text-[10px] text-[#4ade80]/80 uppercase">
                {time.date}
              </span>
            </div>

            {/* Main Clock Digits */}
            <div className="flex items-baseline justify-center my-auto leading-none">
              <span className="text-3xl font-black tracking-tight">
                {time.hours}:{time.minutes}
              </span>
              <span className="ml-1 text-base font-bold text-[#86efac]/80">
                :{time.seconds}
              </span>
            </div>

            {/* Footer: Availability indicator */}
            <div className="flex items-center justify-between text-[10px] font-semibold text-[#86efac]/80 leading-none border-t border-[#166534]/40 pt-1">
              <span className="tracking-widest uppercase text-[#4ade80]">
                BANGALORE
              </span>
              <span className="text-[#a7f3d0] font-bold">
                OPEN TO WORK
              </span>
            </div>
          </div>
        </Html>
      </group>

      {/* 2. Wall Frame (TryHackMe Profile Showcase matching reference image) */}
      <group ref={thmRef} position={[0.80, 1.55, -0.576]}>
        <Html
          transform
          distanceFactor={0.38}
          style={{ width: "248px", height: "348px", pointerEvents: "auto", cursor: "pointer" }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelectTryHackMe?.();
            }}
            onPointerEnter={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
              onHoverObject?.("tryhackme");
            }}
            onPointerLeave={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "default";
              onHoverObject?.(null);
            }}
            className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-b from-[#1b2336] to-[#111624] px-3.5 py-3 text-white select-none"
          >
            {/* Top Subtitle: HACKER PROFILE */}
            <div className="text-center pt-1.5">
              <span className="text-[9px] font-bold tracking-[0.24em] text-[#88cc14] uppercase">
                HACKER PROFILE
              </span>
            </div>

            {/* TryHackMe Brand Title */}
            <div className="text-center my-0.5">
              <span className="text-[26px] font-black text-white tracking-tight font-sans">
                Try<span className="text-[#c11111]">Hack</span>Me
              </span>
            </div>

            {/* Profile Avatar & Badge Widget using thm-badge.png */}
            <div className="relative mx-auto my-1 w-full max-w-[240px] overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-lg">
              <img
                src="/thm-badge.png"
                alt="KINGUPE TryHackMe Profile Badge"
                className="w-full h-auto object-cover select-none pointer-events-none"
              />
            </div>

            {/* Description Text matching reference exactly */}
            <p className="text-[10.5px] leading-relaxed text-[#cbd5e1] text-center my-auto px-1 font-sans">
              Hands-on security rooms and capture-the-flag challenges. Rank, streak and badges update live from TryHackMe.
            </p>

            {/* Lime Green Action Button matching reference */}
            <a
              href="https://tryhackme.com/p/KINGUPE"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="mx-auto my-1.5 flex h-[34px] w-[150px] items-center justify-center gap-2 rounded-lg bg-[#88cc14] hover:bg-[#75b510] text-[12.5px] font-bold text-[#0f1522] shadow-[0_4px_16px_rgba(136,204,20,0.35)] transition hover:scale-[1.03] active:scale-95"
            >
              <span>View my profile</span>
              <ExternalLink className="h-3.5 w-3.5 stroke-[2.5]" />
            </a>
          </div>
        </Html>
      </group>

      {/* 3. Testimonial Card on Desk (Easel / Rolodex stand matching reference) */}
      <group ref={testRef} position={[-0.62, 0.865, 0.205]} rotation={[-0.258, 0, 0]}>
        <Html
          transform
          distanceFactor={0.12}
          style={{ width: "500px", pointerEvents: "auto", cursor: "pointer" }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleTestimonialCard) {
                onToggleTestimonialCard();
              }
              onSelectTestimonials?.();
            }}
            onPointerEnter={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
              onHoverObject?.("testimonials");
            }}
            onPointerLeave={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "default";
              onHoverObject?.(null);
            }}
            className="relative flex flex-col select-none"
          >
            {/* Top Peeking Tabs behind main card (matching reference) */}
            <div className="flex items-end gap-2 pl-6 -mb-1 z-0">
              <div className="h-6 w-20 rounded-t-lg bg-[#7c3aed] border-t border-x border-[#9333ea]/70 shadow-sm" />
              <div className="h-6 w-24 rounded-t-lg bg-[#0e4b5c] border-t border-x border-[#155e75]/70 shadow-sm" />
            </div>

            {/* CARD 1: Client Recommendation on Ruled Paper */}
            {testimonialCardIndex === 0 && (
              <div className="relative z-10 w-full overflow-hidden rounded-2xl bg-[#faf6eb] p-6 text-stone-800 shadow-[0_16px_36px_rgba(0,0,0,0.55)] border border-[#e7dfcf]">
                {/* Header: Avatar, Name, Title */}
                <div className="flex items-center gap-3.5 pb-2">
                  <img
                    src="/textures/avatar_shantha.jpg"
                    alt="Mr. Shantha Kumara"
                    className="h-14 w-14 rounded-full object-cover border-2 border-stone-300 shadow-sm shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-[17px] font-bold text-stone-900 leading-tight tracking-tight">
                      Mr.Shantha Kumara
                    </h3>
                    <p className="text-[12px] font-medium text-stone-500 mt-1 leading-tight">
                      Owner of Anjun Baby Center
                    </p>
                  </div>
                </div>

                {/* Classic Index Card Red Divider Line */}
                <div className="w-full h-[1.5px] bg-[#f87171]/55 my-3" />

                {/* Body with Notebook Ruled Lines */}
                <div
                  className="py-1 min-h-[140px]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(transparent, transparent 27px, #e7dfd3 27px, #e7dfd3 28px)",
                  }}
                >
                  <p className="font-serif italic text-[15px] leading-[28px] text-stone-800">
                    <span className="text-2xl not-italic font-serif text-purple-400/80 mr-1 select-none leading-none inline-block align-top">
                      ““
                    </span>
                    Upendra is a talented developer and a true professional. Working with him on the Anjun Baby Center e-commerce store was effortless his communication was excellent, and he was always flexible with changing requirements...
                  </p>
                </div>
              </div>
            )}

            {/* CARD 2: Collaboration CTA & Curled Paper Sheet */}
            {testimonialCardIndex === 1 && (
              <div className="relative z-10 w-full overflow-hidden rounded-2xl bg-[#faf6eb] pt-8 pb-0 px-6 text-stone-900 shadow-[0_16px_36px_rgba(0,0,0,0.55)] border border-[#e7dfcf]">
                <div className="flex flex-col items-center text-center my-auto px-2">
                  <h3 className="font-serif italic font-extrabold text-[21px] text-[#1e1b4b] leading-snug max-w-[420px]">
                    I prioritize client collaboration, fostering open communication
                  </h3>
                  <p className="text-[13px] font-medium text-stone-500 mt-3.5">
                    Worked with me? I&apos;d love to add your words.
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectContact?.();
                    }}
                    className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] px-6 py-2.5 text-[13px] font-bold text-white shadow-md transition-all hover:scale-105 active:scale-95"
                  >
                    <span>Get in touch</span>
                    <span className="text-sm">→</span>
                  </button>
                </div>

                {/* Curled Paper Sheet Rolling over Front Roller Bar */}
                <div
                  className="mt-8 -mx-6 h-12 bg-gradient-to-b from-[#faf6eb] via-[#ede6d5] to-[#d8cfbd] border-t border-stone-300/40"
                  style={{
                    boxShadow: "inset 0 4px 8px rgba(0,0,0,0.06)",
                  }}
                />
              </div>
            )}
          </div>
        </Html>
      </group>
    </>
  );
};
