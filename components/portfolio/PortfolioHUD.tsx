"use client";

import React, { useState } from "react";
import {
  Volume2,
  VolumeX,
  ArrowLeft,
  RotateCcw,
  HelpCircle,
  FileText,
  X,
  Keyboard,
  MousePointer,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { interactiveObjects } from "@/data/interactiveObjects";
import { playSound } from "@/lib/audio";
import { InteractionState } from "@/types/interaction";

interface PortfolioHUDProps {
  activeObjectId: string | null;
  interactionState: InteractionState;
  hoveredObjectId: string | null;
  onSelectObject: (id: string) => void;
  onResetCamera: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onToggleTextVersion: () => void;
  lampOn: boolean;
  onToggleLamp: () => void;
  testimonialCardIndex?: number;
  onPrevTestimonialCard?: () => void;
  onNextTestimonialCard?: () => void;
}

export const PortfolioHUD: React.FC<PortfolioHUDProps> = ({
  activeObjectId,
  interactionState,
  hoveredObjectId,
  onSelectObject,
  onResetCamera,
  soundEnabled,
  onToggleSound,
  onToggleTextVersion,
  lampOn,
  onToggleLamp,
  testimonialCardIndex = 0,
  onPrevTestimonialCard,
  onNextTestimonialCard,
}) => {
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Exact 6 section items matching reference website
  const navItems = [
    { id: "monitor", label: "About" },
    { id: "whiteboard", label: "Experience" },
    { id: "bookshelf", label: "Projects" },
    { id: "certificates", label: "Certificates" },
    { id: "testimonials", label: "Testimonials" },
    { id: "soundboard", label: "Contact" },
  ];

  const activeObj = activeObjectId ? interactiveObjects[activeObjectId] : null;
  const isTransitioning =
    interactionState === "CAMERA_TRANSITION" || interactionState === "RETURNING_TO_ROOM";

  return (
    <>
      {/* Top HUD Bar */}
      <header
        className="pointer-events-none fixed inset-x-0 top-0 p-3 sm:p-5"
        style={{ zIndex: 999999 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          {/* Brand & Return Controls (Left Pill) */}
          <div className="pointer-events-auto flex items-center gap-2">
            <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#070924]/85 px-4 py-2 backdrop-blur-xl shadow-lg">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span className="text-xs font-bold tracking-tight text-white">
                Sudeep S.
              </span>
            </div>

            {/* Obvious Return to Room Button when not at overview */}
            {activeObjectId && interactionState !== "ROOM_OVERVIEW" && (
              <button
                type="button"
                onClick={() => {
                  playSound("whoosh", soundEnabled);
                  onResetCamera();
                }}
                disabled={isTransitioning}
                className="flex items-center gap-1.5 rounded-full border border-rose-500/50 bg-[#080924]/95 px-3.5 py-2 text-xs font-bold text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.35)] backdrop-blur-xl transition hover:bg-rose-600 hover:text-white disabled:opacity-50"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Room</span>
                <kbd className="rounded border border-rose-400/40 bg-rose-950/40 px-1 text-[9px]">
                  Esc
                </kbd>
              </button>
            )}

            {/* Transition indicators */}
            {interactionState === "CAMERA_TRANSITION" && activeObj && (
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-[11px] font-semibold text-cyan-300 animate-pulse">
                Focusing on {activeObj.name}...
              </span>
            )}

            {interactionState === "RETURNING_TO_ROOM" && (
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-slate-400 animate-pulse">
                Returning to room overview...
              </span>
            )}
          </div>

          {/* Center Floating Pill Navigation (Matching Reference) */}
          <nav
            aria-label="Room sections"
            className="pointer-events-auto hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-[#070924]/80 p-1.5 backdrop-blur-xl shadow-xl"
          >
            {navItems.map((item) => {
              const isSelected = activeObjectId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    playSound("click", soundEnabled);
                    onSelectObject(item.id);
                  }}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    isSelected
                      ? "bg-purple-600 text-white shadow-sm"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Floating Utility Buttons (Audio, Lamp, Text view) */}
          <div className="pointer-events-auto flex items-center gap-1.5">

            {/* Circular Audio Toggle (Prominent in reference) */}
            <button
              type="button"
              onClick={() => {
                playSound("switch", true);
                onToggleSound();
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#070924]/85 text-slate-300 backdrop-blur-xl transition hover:bg-white/15 hover:text-white shadow-lg"
              title={soundEnabled ? "Mute audio" : "Enable audio"}
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4 text-cyan-300" />
              ) : (
                <VolumeX className="h-4 w-4 text-slate-500" />
              )}
            </button>

            {/* Compact Text Version */}
            <button
              type="button"
              onClick={() => {
                playSound("click", soundEnabled);
                onToggleTextVersion();
              }}
              className="hidden lg:flex items-center gap-1.5 rounded-full border border-white/10 bg-[#070924]/85 px-3 py-2 text-xs font-semibold text-slate-300 backdrop-blur-xl transition hover:bg-white/15 hover:text-white shadow-lg"
              title="Accessible plain text portfolio"
            >
              <FileText className="h-3.5 w-3.5 text-purple-300" />
              <span>Text View</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation (Visible only in ROOM_OVERVIEW) */}
      {interactionState === "ROOM_OVERVIEW" && (
        <nav
          aria-label="Mobile room sections"
          className="pointer-events-auto fixed bottom-5 inset-x-0 mx-auto flex w-max max-w-[94vw] items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-[#070924]/90 p-1.5 backdrop-blur-2xl md:hidden z-30 shadow-2xl"
        >
          {navItems.map((item) => {
            const isSelected = activeObjectId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  playSound("click", soundEnabled);
                  onSelectObject(item.id);
                }}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  isSelected
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}

      {/* Testimonials Card Switcher Pill (Matching Reference Screenshots) */}
      {activeObjectId === "testimonials" && (
        <div className="pointer-events-auto fixed bottom-6 inset-x-0 mx-auto w-fit z-50 animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0e112a]/90 px-4 py-1.5 text-xs font-semibold text-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.6)] backdrop-blur-xl select-none">
            <button
              type="button"
              onClick={onPrevTestimonialCard}
              className="flex h-5 w-5 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white active:scale-90"
              title="Previous card"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-mono text-[11px] tracking-wide text-slate-200 min-w-[76px] text-center">
              Card {testimonialCardIndex + 1} of 2
            </span>
            <button
              type="button"
              onClick={onNextTestimonialCard}
              className="flex h-5 w-5 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white active:scale-90"
              title="Next card"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
