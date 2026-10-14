"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { playSound } from "@/lib/audio";

interface LoadingScreenProps {
  isLoading: boolean;
  onEnter: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading,
  onEnter,
}) => {
  const [lampOn, setLampOn] = useState(true);
  const [lampAngle, setLampAngle] = useState(25);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onEnterRef = useRef(onEnter);
  onEnterRef.current = onEnter;

  useEffect(() => {
    // Guaranteed fallback auto-entry so screen never gets stuck in any environment
    const fallbackTimer = setTimeout(() => {
      setIsReady(true);
      onEnterRef.current();
    }, 2200);

    if (!isLoading) {
      let autoTimer: NodeJS.Timeout | null = null;
      const timer = setTimeout(() => {
        setIsReady(true);
        autoTimer = setTimeout(() => {
          onEnterRef.current();
        }, 600);
      }, 400);
      return () => {
        clearTimeout(fallbackTimer);
        clearTimeout(timer);
        if (autoTimer) clearTimeout(autoTimer);
      };
    }

    return () => clearTimeout(fallbackTimer);
  }, [isLoading]);

  // Aim lamp with mouse movement
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    // Clamp angle between -35 and 65 degrees
    const clamped = Math.max(-35, Math.min(65, angle));
    setLampAngle(clamped);
  };

  const handleToggleLamp = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound("switch", true);
    setLampOn((prev) => !prev);
  };

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex touch-none select-none flex-col items-center justify-center bg-[#03040f] px-4"
      onPointerMove={handlePointerMove}
    >
      <div ref={containerRef} className="relative flex flex-col items-center text-center">
        {/* Interactive SVG Desk Lamp */}
        <div className="relative h-60 w-80 cursor-pointer" onClick={handleToggleLamp}>
          <svg
            viewBox="0 0 320 240"
            className="h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="lamp-beam" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffd9a0" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#ffb766" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#ffb766" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Lamp Base and Articulated Arm */}
            <rect x="70" y="200" width="55" height="10" rx="5" fill="#2d294e" />
            <line x1="97" y1="200" x2="125" y2="135" stroke="#a5b4fc" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="125" cy="135" r="5" fill="#1b1830" stroke="#a5b4fc" strokeWidth="2" />
            <line x1="125" y1="135" x2="185" y2="105" stroke="#a5b4fc" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="185" cy="105" r="5" fill="#1b1830" stroke="#a5b4fc" strokeWidth="2" />

            {/* Lamp Head & Light Beam (Rotates toward cursor) */}
            <g transform={`translate(185, 105) rotate(${lampAngle})`}>
              {/* Light Beam polygon */}
              {lampOn && (
                <polygon
                  points="25,-12 25,12 220,110 220,-110"
                  fill="url(#lamp-beam)"
                  className="transition-opacity duration-300"
                />
              )}

              {/* Lamp Shade Head */}
              <path
                d="M4 -7 L26 -16 L26 16 L4 7 A6 6 0 0 1 4 -7 Z"
                fill={lampOn ? "#7c3aed" : "#4c1d95"}
                stroke="#a78bfa"
                strokeWidth="1.2"
              />
              <circle cx="24" cy="0" r="5" fill={lampOn ? "#fef08a" : "#374151"} />
            </g>
          </svg>
        </div>

        {/* Title */}
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Sudeep S.
        </h1>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
          {lampOn ? "Turning on the lights" : "Lights switched off"}
        </p>

        {/* Loading Progress Bar */}
        <div className="mt-4 h-[3px] w-48 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400"
            initial={{ width: "15%" }}
            animate={{ width: isReady ? "100%" : "85%" }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {/* Action Button once ready */}
        {isReady && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            type="button"
            onClick={onEnter}
            className="mt-5 rounded-full border border-purple-500/40 bg-purple-600/90 px-6 py-2.5 text-xs font-bold text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] backdrop-blur-md transition hover:bg-purple-500 hover:scale-105 active:scale-95"
          >
            Enter 3D Room ➔
          </motion.button>
        )}

        {/* Lamp aim instruction hint */}
        <p className="mt-4 text-xs text-slate-500">
          Move the mouse to aim the lamp · click it to switch it {lampOn ? "off" : "on"}
        </p>
      </div>
    </motion.div>
  );
};
