"use client";

import React, { Suspense, useRef, useEffect, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PortfolioRoom } from "./PortfolioRoom";
import { CameraController, getOverviewConfig } from "./CameraController";
import { DEFAULT_CAMERA_VIEW } from "@/data/interactiveObjects";
import { InteractionState } from "@/types/interaction";

interface PortfolioSceneProps {
  activeObjectId: string | null;
  hoveredObjectId: string | null;
  interactionState: InteractionState;
  onSelectObject: (id: string) => void;
  onHoverObject: (id: string | null) => void;
  onArrived: () => void;
  onReturned: () => void;
  onReturnToRoom: () => void;
  lampOn: boolean;
  onToggleLamp: () => void;
  curtainsClosed: boolean;
  onToggleCurtains: () => void;
  neonOn: boolean;
  onToggleNeon: () => void;
  soundEnabled: boolean;
  hasEntered: boolean;
  testimonialCardIndex?: number;
  onToggleTestimonialCard?: () => void;
}

// Procedural PMREM Studio Reflection Environment matching reference architecture
function RoomEnvironment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();

    // Dark ambient room bounding enclosure
    const roomBox = new THREE.Mesh(
      new THREE.BoxGeometry(10, 5, 10),
      new THREE.MeshBasicMaterial({ color: "#0d1030", side: THREE.BackSide })
    );
    roomBox.position.y = 2;
    envScene.add(roomBox);

    const addBounceCard = (
      color: string,
      multiplier: number,
      w: number,
      h: number,
      pos: [number, number, number]
    ) => {
      const card = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(color).multiplyScalar(multiplier),
          side: THREE.DoubleSide,
        })
      );
      card.position.set(...pos);
      card.lookAt(0, 1.2, 0);
      envScene.add(card);
    };

    // 1. Purple bounce light from neon sign above & behind
    addBounceCard("#b066ff", 4.0, 4.0, 0.7, [0, 3.6, -4.6]);

    // 2. Warm amber desk lamp bounce on the right
    addBounceCard("#ffcb8a", 6.0, 1.4, 1.4, [3.6, 2.6, -1.0]);

    // 3. Cool window moonlight bounce on the left
    addBounceCard("#6d7cff", 2.0, 1.6, 2.2, [-4.6, 2.0, -1.2]);

    // 4. Soft monitor blue fill in front
    addBounceCard("#7ba7ff", 1.6, 2.6, 1.4, [0, 1.6, 4.6]);

    const envMap = pmremGenerator.fromScene(envScene, 0.04);
    scene.environment = envMap.texture;
    scene.environmentIntensity = 0.55;

    return () => {
      scene.environment = null;
      envMap.dispose();
      pmremGenerator.dispose();
      envScene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });
    };
  }, [gl, scene]);

  return null;
}

// Warm light pool decal on the desk under the lamp
function LampLightPool({ lampOn }: { lampOn: boolean }) {
  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
    grad.addColorStop(0, "rgba(255, 203, 138, 0.55)");
    grad.addColorStop(0.35, "rgba(255, 183, 102, 0.22)");
    grad.addColorStop(0.7, "rgba(255, 183, 102, 0.06)");
    grad.addColorStop(1, "rgba(255, 183, 102, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  if (!texture || !lampOn) return null;

  return (
    <mesh position={[0.35, 0.756, 0.08]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}>
      <planeGeometry args={[1.05, 0.8]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.32}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

export const PortfolioScene: React.FC<PortfolioSceneProps> = ({
  activeObjectId,
  hoveredObjectId,
  interactionState,
  onSelectObject,
  onHoverObject,
  onArrived,
  onReturned,
  onReturnToRoom,
  lampOn,
  onToggleLamp,
  curtainsClosed,
  onToggleCurtains,
  neonOn,
  onToggleNeon,
  soundEnabled,
  hasEntered,
  testimonialCardIndex = 0,
  onToggleTestimonialCard,
}) => {
  const lampTargetRef = useRef<THREE.Object3D>(new THREE.Object3D());

  const initialCamConfig =
    typeof window !== "undefined"
      ? getOverviewConfig(window.innerWidth / Math.max(window.innerHeight, 1))
      : { position: DEFAULT_CAMERA_VIEW.position, fov: 42 };

  return (
    <div className="absolute inset-0 h-full w-full bg-[#05061a]">
      <Canvas
        shadows
        dpr={[1, typeof window !== "undefined" && window.devicePixelRatio > 1 ? 1.5 : 1]}
        camera={{
          position: initialCamConfig.position,
          fov: initialCamConfig.fov,
          near: 0.1,
          far: 25,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
      >
        {/* Deep midnight room backdrop matching reference */}
        <color attach="background" args={["#05061a"]} />

        {/* Procedural PMREM Studio Reflection Environment */}
        <RoomEnvironment />

        {/* Exact Cinematic Ambient & Hemisphere Architecture Lights */}
        <ambientLight color="#4a4f9c" intensity={0.55} />
        <hemisphereLight args={["#4b4fa8", "#0b0d1f", 0.7]} />

        {/* Soft Directional Rim Light from Window (Moonlight) */}
        <directionalLight
          position={[-5, 4, 3]}
          color="#8594ff"
          intensity={curtainsClosed ? 0.28 : 0.55}
        />

        {/* Natural Cool Moonlight from Window entering room (illuminates curtains, desk, and room floor) */}
        <pointLight
          position={[-2.6, 1.8, 0.8]}
          color="#93c5fd"
          distance={4.0}
          decay={1.8}
          intensity={curtainsClosed ? 0.35 : 1.1}
        />

        {/* Monitor Screen Fill Light (keyboard/desk area) */}
        <pointLight
          position={[0, 1.30, 0.35]}
          color="#7ba7ff"
          distance={2.6}
          decay={1.6}
          intensity={2.2}
        />

        {/* Rich Neon Sign Ambient Wall Glow (smooth violet aura across center wall) */}
        <pointLight
          position={[0, 2.05, -0.42]}
          color="#b066ff"
          distance={5.0}
          decay={1.4}
          intensity={neonOn ? 4.8 : 0}
        />

        {/* Desk Lamp Target Object (Desk Mat area) */}
        <primitive object={lampTargetRef.current} position={[0.35, 0.76, 0.05]} />

        {/* Desk Lamp Warm Pool Decal on Desk */}
        <LampLightPool lampOn={lampOn} />

        {/* Realistic Desk Lamp Practical Spotlight */}
        <spotLight
          position={[0.7, 1.105, -0.235]}
          target={lampTargetRef.current}
          color="#ffcb8a"
          angle={0.85}
          penumbra={0.75}
          intensity={lampOn ? 14 : 0}
          distance={2.4}
          decay={1.4}
          castShadow
          shadow-bias={-0.0004}
        />

        {/* Camera Controller driven by 5-state interaction machine */}
        <CameraController
          activeObjectId={activeObjectId}
          interactionState={interactionState}
          onArrived={onArrived}
          onReturned={onReturned}
        />

        {/* Room Model with 3D Interactive Screens & Curtains */}
        <Suspense fallback={null}>
          <PortfolioRoom
            onSelectObject={onSelectObject}
            hoveredObjectId={hoveredObjectId}
            onHoverObject={onHoverObject}
            activeObjectId={activeObjectId}
            interactionState={interactionState}
            onReturnToRoom={onReturnToRoom}
            lampOn={lampOn}
            onToggleLamp={onToggleLamp}
            curtainsClosed={curtainsClosed}
            onToggleCurtains={onToggleCurtains}
            neonOn={neonOn}
            onToggleNeon={onToggleNeon}
            soundEnabled={soundEnabled}
            hasEntered={hasEntered}
            testimonialCardIndex={testimonialCardIndex}
            onToggleTestimonialCard={onToggleTestimonialCard}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
