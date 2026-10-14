"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { PortfolioHUD } from "./PortfolioHUD";
import { LoadingScreen } from "./LoadingScreen";
import { AccessibleContent } from "./AccessibleContent";
import { playSound } from "@/lib/audio";
import { InteractionState } from "@/types/interaction";

// Dynamically import Canvas Scene with SSR turned off
const DynamicPortfolioScene = dynamic(
  () => import("./PortfolioScene").then((mod) => mod.PortfolioScene),
  { ssr: false }
);

export const PortfolioExperience: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  // 5-State Reusable Interaction State Machine
  const [interactionState, setInteractionState] = useState<InteractionState>("ROOM_OVERVIEW");
  const [activeObjectId, setActiveObjectId] = useState<string | null>(null);
  const [hoveredObjectId, setHoveredObjectId] = useState<string | null>(null);

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showTextVersion, setShowTextVersion] = useState<boolean>(false);
  const [webglAvailable, setWebglAvailable] = useState<boolean>(true);
  const [lampOn, setLampOn] = useState<boolean>(true);
  const [curtainsClosed, setCurtainsClosed] = useState<boolean>(false);
  const [neonOn, setNeonOn] = useState<boolean>(true);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) {
        setWebglAvailable(false);
      }
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  // Object selection / focus trigger: ROOM_OVERVIEW -> CAMERA_TRANSITION
  const handleSelectObject = useCallback(
    (id: string) => {
      if (interactionState === "CAMERA_TRANSITION" || interactionState === "RETURNING_TO_ROOM") {
        return;
      }
      playSound("pop", soundEnabled);
      setActiveObjectId(id);
      setInteractionState("CAMERA_TRANSITION");
    },
    [interactionState, soundEnabled]
  );

  // Called when camera finishes flight to object: CAMERA_TRANSITION -> OBJECT_FOCUSED -> CONTENT_INTERACTION
  const handleCameraArrived = useCallback(() => {
    setInteractionState("OBJECT_FOCUSED");
    setTimeout(() => {
      setInteractionState("CONTENT_INTERACTION");
    }, 40);
  }, []);

  // Called to exit focused view: CONTENT_INTERACTION -> RETURNING_TO_ROOM
  const handleReturnToRoom = useCallback(() => {
    if (interactionState === "ROOM_OVERVIEW" || interactionState === "RETURNING_TO_ROOM") {
      return;
    }
    playSound("whoosh", soundEnabled);
    setInteractionState("RETURNING_TO_ROOM");
  }, [interactionState, soundEnabled]);

  // Called when camera finishes returning to room overview: RETURNING_TO_ROOM -> ROOM_OVERVIEW
  const handleCameraReturned = useCallback(() => {
    setActiveObjectId(null);
    setInteractionState("ROOM_OVERVIEW");
  }, []);

  // Hash navigation (support #projects, #skills, #about, #contact, #architecture)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase().replace("#", "");
      if (hash === "about") handleSelectObject("monitor");
      else if (hash === "neon" || hash === "identity") handleSelectObject("neon");
      else if (hash === "experience" || hash === "journey") handleSelectObject("whiteboard");
      else if (hash === "projects" || hash === "bookshelf" || hash === "work") handleSelectObject("bookshelf");
      else if (hash === "certificates" || hash === "certs") handleSelectObject("certificates");
      else if (hash === "testimonials" || hash === "feedback") handleSelectObject("testimonials");
      else if (hash === "contact" || hash === "soundboard") handleSelectObject("soundboard");
      else if (hash === "skills") handleSelectObject("bookshelf");
      else if (hash === "clock") handleSelectObject("clock");
      else if (hash === "globe") handleSelectObject("globe");
      else if (hash === "tryhackme" || hash === "thm") handleSelectObject("tryhackme");
    };

    (window as any).__selectObject = handleSelectObject;
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [handleSelectObject]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "Escape" || e.key === "0") {
        if (activeObjectId || interactionState !== "ROOM_OVERVIEW") {
          e.preventDefault();
          handleReturnToRoom();
        }
      } else if (e.key === "1") {
        handleSelectObject("neon");
      } else if (e.key === "2") {
        handleSelectObject("monitor");
      } else if (e.key === "3") {
        handleSelectObject("bookshelf");
      } else if (e.key === "4") {
        handleSelectObject("whiteboard");
      } else if (e.key === "5") {
        handleSelectObject("soundboard");
      } else if (e.key === "6") {
        handleSelectObject("clock");
      } else if (e.key === "7") {
        handleSelectObject("globe");
      }
    };

    (window as any).__selectObject = handleSelectObject;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeObjectId, interactionState, handleReturnToRoom, handleSelectObject]);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  const handleToggleLamp = useCallback(() => {
    playSound("switch", soundEnabled);
    setLampOn((prev) => !prev);
  }, [soundEnabled]);

  const handleToggleCurtains = useCallback(() => {
    playSound("whoosh", soundEnabled);
    setCurtainsClosed((prev) => !prev);
  }, [soundEnabled]);

  const handleToggleNeon = useCallback(() => {
    playSound("switch", soundEnabled);
    setNeonOn((prev) => !prev);
  }, [soundEnabled]);

  // Asset loader completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // If text version is active, render AccessibleContent
  if (showTextVersion) {
    return (
      <AccessibleContent
        onClose={() => setShowTextVersion(false)}
        isStandalone={false}
      />
    );
  }

  const [testimonialCardIndex, setTestimonialCardIndex] = useState(0);

  const handlePrevTestimonialCard = useCallback(() => {
    playSound("click", soundEnabled);
    setTestimonialCardIndex((prev) => (prev === 0 ? 1 : 0));
  }, [soundEnabled]);

  const handleNextTestimonialCard = useCallback(() => {
    playSound("click", soundEnabled);
    setTestimonialCardIndex((prev) => (prev === 0 ? 1 : 0));
  }, [soundEnabled]);

  const handleEnter = useCallback(() => {
    playSound("switch", soundEnabled);
    setHasEntered(true);
  }, [soundEnabled]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#03040f]">
      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {!hasEntered && (
          <LoadingScreen
            isLoading={isLoading}
            onEnter={handleEnter}
          />
        )}
      </AnimatePresence>

      {/* 3D Canvas Scene */}
      <DynamicPortfolioScene
        activeObjectId={activeObjectId}
        hoveredObjectId={hoveredObjectId}
        interactionState={interactionState}
        onSelectObject={handleSelectObject}
        onHoverObject={setHoveredObjectId}
        onArrived={handleCameraArrived}
        onReturned={handleCameraReturned}
        onReturnToRoom={handleReturnToRoom}
        lampOn={lampOn}
        onToggleLamp={handleToggleLamp}
        curtainsClosed={curtainsClosed}
        onToggleCurtains={handleToggleCurtains}
        neonOn={neonOn}
        onToggleNeon={handleToggleNeon}
        soundEnabled={soundEnabled}
        hasEntered={hasEntered}
        testimonialCardIndex={testimonialCardIndex}
        onToggleTestimonialCard={handleNextTestimonialCard}
      />

      {/* Cinematic Vignette Overlay */}
      <div className="vignette-overlay absolute inset-0 pointer-events-none" />

      {/* Interactive HUD - only rendered after entering the room */}
      {hasEntered && (
        <PortfolioHUD
          activeObjectId={activeObjectId}
          interactionState={interactionState}
          hoveredObjectId={hoveredObjectId}
          onSelectObject={handleSelectObject}
          onResetCamera={handleReturnToRoom}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onToggleTextVersion={() => setShowTextVersion(true)}
          lampOn={lampOn}
          onToggleLamp={handleToggleLamp}
          testimonialCardIndex={testimonialCardIndex}
          onPrevTestimonialCard={handlePrevTestimonialCard}
          onNextTestimonialCard={handleNextTestimonialCard}
        />
      )}

    </div>
  );
};
