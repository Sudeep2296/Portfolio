"use client";

import React, { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface WindowCurtainsProps {
  curtainsClosed: boolean;
  onToggle: () => void;
  soundEnabled?: boolean;
  interactionState?: string;
}

// Generate realistic sinusoidal pleated fabric geometry for drapery folds
function createPleatedGeometry(width: number, height: number, pleats: number, foldDepth: number) {
  const geom = new THREE.PlaneGeometry(width, height, 32, 12);
  const pos = geom.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const u = (x / width) + 0.5;
    // Sinusoidal wave across width creating vertical 3D folds
    const wave = Math.sin(u * Math.PI * pleats * 2) * foldDepth;
    pos.setZ(i, wave);
  }
  geom.computeVertexNormals();
  return geom;
}

export const WindowCurtains: React.FC<WindowCurtainsProps> = ({
  curtainsClosed,
  onToggle,
  interactionState = "ROOM_OVERVIEW",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Animation progress: 0 = fully open, 1 = fully closed
  const animProgress = useRef(curtainsClosed ? 1 : 0);

  // Mesh and group refs
  const leftPanelRef = useRef<THREE.Mesh>(null);
  const rightPanelRef = useRef<THREE.Mesh>(null);
  const ringGroupRef = useRef<THREE.Group>(null);

  // Geometry dimensions
  const basePanelWidth = 0.54; // full width when closed
  const panelHeight = 1.22;
  const pleatCount = 5;

  const leftPleatGeom = useMemo(
    () => createPleatedGeometry(basePanelWidth, panelHeight, pleatCount, 0.026),
    []
  );
  const rightPleatGeom = useMemo(
    () => createPleatedGeometry(basePanelWidth, panelHeight, pleatCount, 0.026),
    []
  );

  // Luxury midnight-navy velvet material with soft royal purple highlights
  const curtainMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2e386e"),
        roughness: 0.52,
        metalness: 0.16,
        side: THREE.DoubleSide,
      }),
    []
  );

  // Rod & hardware brushed metal material
  const rodMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#474169"),
        roughness: 0.28,
        metalness: 0.85,
      }),
    []
  );

  // Tieback trim gold accent material
  const trimMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#fbbf24"),
        roughness: 0.25,
        metalness: 0.85,
      }),
    []
  );

  // Coordinates:
  // Window center: x = -2.40, y = 1.60
  // Left wall anchor: x = -2.92
  // Right wall anchor: x = -1.88
  // Window center meet: x = -2.40
  const leftAnchor = -2.92;
  const rightAnchor = -1.88;
  const minWidth = 0.15; // Width when open (bunched at wall)
  const maxWidth = 0.54; // Width when closed (covers half window + 2cm overlap)

  useFrame((_, delta) => {
    const target = curtainsClosed ? 1 : 0;
    animProgress.current = THREE.MathUtils.damp(animProgress.current, target, 5.2, delta);
    const p = animProgress.current;

    // Current panel width based on animation progress
    const currentW = THREE.MathUtils.lerp(minWidth, maxWidth, p);
    const scaleFactor = currentW / basePanelWidth;

    // Update Left Curtain Panel
    if (leftPanelRef.current) {
      // Anchored at leftAnchor, expands to the right
      const leftCenterX = leftAnchor + currentW / 2;
      leftPanelRef.current.position.x = leftCenterX;
      leftPanelRef.current.scale.x = scaleFactor;
    }

    // Update Right Curtain Panel
    if (rightPanelRef.current) {
      // Anchored at rightAnchor, expands to the left
      const rightCenterX = rightAnchor - currentW / 2;
      rightPanelRef.current.position.x = rightCenterX;
      rightPanelRef.current.scale.x = scaleFactor;
    }

    // Rings slide smoothly along the rod with the curtains
    if (ringGroupRef.current) {
      const leftInnerEdge = leftAnchor + currentW;
      const rightInnerEdge = rightAnchor - currentW;

      // Update ring positions (children 0..3 are left, 4..7 are right)
      for (let i = 0; i < 4; i++) {
        const ring = ringGroupRef.current.children[i];
        if (ring) {
          const t = i / 3;
          ring.position.x = THREE.MathUtils.lerp(leftAnchor + 0.04, leftInnerEdge - 0.02, t);
        }
      }
      for (let i = 0; i < 4; i++) {
        const ring = ringGroupRef.current.children[4 + i];
        if (ring) {
          const t = i / 3;
          ring.position.x = THREE.MathUtils.lerp(rightAnchor - 0.04, rightInnerEdge + 0.02, t);
        }
      }
    }
  });

  return (
    <group
      position={[0, 0, 0]}
      onClick={(e) => {
        if (interactionState !== "ROOM_OVERVIEW") return;
        e.stopPropagation();
        onToggle();
      }}
      onPointerOver={(e) => {
        if (interactionState !== "ROOM_OVERVIEW") return;
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        setIsHovered(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
        setIsHovered(false);
      }}
    >
      {/* 1. Curtain Rod / Pole (Directly above window top at Y = 2.19, Z = -0.520) */}
      <group position={[-2.40, 2.19, -0.520]}>
        {/* Main horizontal brushed metal rod */}
        <mesh rotation={[0, 0, Math.PI / 2]} material={rodMaterial}>
          <cylinderGeometry args={[0.010, 0.010, 1.22, 16]} />
        </mesh>

        {/* Left Decorative Finial Sphere Cap */}
        <mesh position={[-0.61, 0, 0]} material={trimMaterial}>
          <sphereGeometry args={[0.020, 16, 16]} />
        </mesh>

        {/* Right Decorative Finial Sphere Cap */}
        <mesh position={[0.61, 0, 0]} material={trimMaterial}>
          <sphereGeometry args={[0.020, 16, 16]} />
        </mesh>

        {/* Left Wall Mounting Stanchion Bracket */}
        <mesh position={[-0.50, 0, -0.035]} rotation={[Math.PI / 2, 0, 0]} material={rodMaterial}>
          <cylinderGeometry args={[0.007, 0.007, 0.070, 12]} />
        </mesh>

        {/* Right Wall Mounting Stanchion Bracket */}
        <mesh position={[0.50, 0, -0.035]} rotation={[Math.PI / 2, 0, 0]} material={rodMaterial}>
          <cylinderGeometry args={[0.007, 0.007, 0.070, 12]} />
        </mesh>
      </group>

      {/* 2. Curtain Rings (Slide along rod at Y = 2.19) */}
      <group ref={ringGroupRef}>
        {/* 4 Left Rings */}
        {[0, 1, 2, 3].map((idx) => (
          <mesh
            key={`l-ring-${idx}`}
            position={[-2.85 + idx * 0.04, 2.19, -0.520]}
            rotation={[Math.PI / 2, 0, 0]}
            material={trimMaterial}
          >
            <torusGeometry args={[0.014, 0.0025, 8, 16]} />
          </mesh>
        ))}

        {/* 4 Right Rings */}
        {[0, 1, 2, 3].map((idx) => (
          <mesh
            key={`r-ring-${idx}`}
            position={[-1.95 - idx * 0.04, 2.19, -0.520]}
            rotation={[Math.PI / 2, 0, 0]}
            material={trimMaterial}
          >
            <torusGeometry args={[0.014, 0.0025, 8, 16]} />
          </mesh>
        ))}
      </group>

      {/* 3. Left Curtain Panel */}
      <mesh
        ref={leftPanelRef}
        geometry={leftPleatGeom}
        material={curtainMaterial}
        position={[-2.845, 1.57, -0.520]}
        castShadow
      />

      {/* 4. Right Curtain Panel */}
      <mesh
        ref={rightPanelRef}
        geometry={rightPleatGeom}
        material={curtainMaterial}
        position={[-1.955, 1.57, -0.520]}
        castShadow
      />





      {/* Interactive Tooltip Badge */}
      {isHovered && (
        <Html
          position={[-2.40, 2.38, -0.52]}
          center
          distanceFactor={3.6}
          className="pointer-events-none select-none transition-all duration-200"
        >
          <div className="flex items-center gap-1.5 rounded-full border border-indigo-400/50 bg-[#070924]/90 px-3 py-1 shadow-[0_0_20px_rgba(99,102,241,0.5)] backdrop-blur-md">
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: curtainsClosed ? "#38bdf8" : "#818cf8" }}
            />
            <span className="whitespace-nowrap text-xs font-semibold text-white">
              {curtainsClosed ? "Curtains (Closed) · Click to open" : "Curtains · Click to close"}
            </span>
          </div>
        </Html>
      )}
    </group>
  );
};
