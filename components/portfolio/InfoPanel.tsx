"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { interactiveObjects } from "@/data/interactiveObjects";
import { IdentityPanel } from "./IdentityPanel";
import { ProjectExplorer } from "./ProjectExplorer";
import { SkillsPanel } from "./SkillsPanel";
import { ArchitecturePanel } from "./ArchitecturePanel";
import { SoundboardPanel } from "./SoundboardPanel";
import { FocusAvailabilityPanel } from "./FocusAvailabilityPanel";
import { playSound } from "@/lib/audio";

interface InfoPanelProps {
  activeObjectId: string | null;
  onClose: () => void;
  onSelectObject: (id: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({
  activeObjectId,
  onClose,
  onSelectObject,
  soundEnabled,
  onToggleSound,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeObjectId) {
        playSound("whoosh", soundEnabled);
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeObjectId, onClose, soundEnabled]);

  if (!activeObjectId || activeObjectId === "lamp") return null;

  const currentObj = interactiveObjects[activeObjectId];

  const renderContent = () => {
    switch (activeObjectId) {
      case "neon":
        return (
          <IdentityPanel
            onNavigateToProjects={() => {
              playSound("click", soundEnabled);
              onSelectObject("monitor");
            }}
            onNavigateToContact={() => {
              playSound("click", soundEnabled);
              onSelectObject("soundboard");
            }}
          />
        );
      case "monitor":
        return <ProjectExplorer />;
      case "bookshelf":
        return <SkillsPanel />;
      case "whiteboard":
        return <ArchitecturePanel />;
      case "soundboard":
      case "phone":
        return <SoundboardPanel soundEnabled={soundEnabled} onToggleSound={onToggleSound} />;
      case "globe":
        return <FocusAvailabilityPanel initialType="globe" />;
      case "clock":
        return <FocusAvailabilityPanel initialType="clock" />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end sm:p-5 p-2 pointer-events-none">
        {/* Subtle Semi-Transparent Backdrop (Room stays visible!) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => {
            playSound("whoosh", soundEnabled);
            onClose();
          }}
          className="absolute inset-0 bg-[#02030d]/50 backdrop-blur-[4px] pointer-events-auto"
        />

        {/* Compact Right-Side Flyout Drawer (Leaves room visible on left!) */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={currentObj?.name || "Information Panel"}
          initial={{ opacity: 0, x: 40, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto relative flex h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#090b24]/95 shadow-[0_20px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  playSound("click", soundEnabled);
                  onClose();
                }}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/15 hover:text-white"
                title="Return to Room Overview (Esc)"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: currentObj?.color || "#a855f7" }}
                />
                <span className="text-xs font-bold text-white">{currentObj?.name}</span>
                <span className="text-xs text-slate-500">·</span>
                <span className="text-[11px] text-slate-400">{currentObj?.category}</span>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                playSound("whoosh", soundEnabled);
                onClose();
              }}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:bg-rose-500/20 hover:text-rose-300"
              title="Close panel (Esc)"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Modal Body Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
            {renderContent()}
          </div>

          {/* Bottom Footer Tip */}
          <div className="flex items-center justify-between border-t border-white/10 bg-[#06071d]/80 px-5 py-2 text-[11px] text-slate-500">
            <span>Press <kbd className="rounded border border-white/15 px-1 py-0.2 text-[10px] text-slate-300">Esc</kbd> to return to room overview</span>
            <span className="text-purple-300 font-medium">Sudeep S.</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
