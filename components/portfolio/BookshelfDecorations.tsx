import React, { useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BookshelfDecorationsProps {
  isFocused?: boolean;
  onSelectShelf?: () => void;
  onHoverShelf?: (hover: boolean) => void;
  hoveredObjectId?: string | null;
  interactionState?: string;
}

export const BookshelfDecorations: React.FC<BookshelfDecorationsProps> = ({
  isFocused = false,
  onSelectShelf,
  onHoverShelf,
  hoveredObjectId,
  interactionState = "ROOM_OVERVIEW",
}) => {
  const shelfCenterGroupRef = useRef<THREE.Group | null>(null);

  // Synchronize hover scale with 3D bookshelf in ROOM_OVERVIEW around exact identical center [1.95, 1.14, -0.40]
  useFrame((_, delta) => {
    if (shelfCenterGroupRef.current) {
      const isHovered = interactionState === "ROOM_OVERVIEW" && hoveredObjectId === "bookshelf";
      const target = isHovered ? 1.05 : 1.0;
      let cur = THREE.MathUtils.damp(shelfCenterGroupRef.current.scale.x, target, 12, delta);
      if (Math.abs(cur - target) < 0.0002) cur = target;
      shelfCenterGroupRef.current.scale.set(cur, cur, cur);
    }
  });

  return (
    <group ref={shelfCenterGroupRef} position={[1.95, 1.14, -0.40]}>
      {/* 1. Warm LED Light Strips along the front edge of each shelf board (perfectly locked to boards) */}
      {[
        { y: 0.678, key: "pro-shelf" },
        { y: 0.258, key: "mid-shelf" },
        { y: -0.162, key: "low-shelf" },
        { y: -0.582, key: "base-shelf" },
      ].map((strip, idx) => (
        <group key={`shelf-led-${idx}`} position={[0, strip.y, 0.155]}>
          <mesh>
            <planeGeometry args={[0.84, 0.008]} />
            <meshBasicMaterial color="#fff3d1" toneMapped={false} />
          </mesh>
          {/* Subtle downward light bounce on the books below */}
          <pointLight
            position={[0, -0.12, -0.08]}
            color="#ffe6b8"
            distance={0.65}
            decay={1.8}
            intensity={1.2}
          />
        </group>
      ))}

      {/* 2. Top Shelf Banner: 💼 PROFESSIONAL PROJECTS · 2 */}
      <group position={[0, 0.64, 0.175]}>
        <Html
          transform
          distanceFactor={0.24}
          style={{ width: "260px", pointerEvents: "auto", cursor: "pointer" }}
        >
          <div
            onClick={onSelectShelf}
            onPointerEnter={() => onHoverShelf?.(true)}
            onPointerLeave={() => onHoverShelf?.(false)}
            className="flex items-center justify-center gap-2 rounded-full border border-amber-400/80 bg-[#0e0b28]/95 px-3 py-1 shadow-[0_0_14px_rgba(251,191,36,0.55)] backdrop-blur-md select-none transition hover:scale-105 hover:border-amber-300"
          >
            <span className="text-xs">💼</span>
            <span className="text-[11px] font-black uppercase tracking-wider text-white">
              Professional Projects
            </span>
            <span className="rounded-full bg-[#4f46e5]/40 border border-[#818cf8]/50 px-1.5 py-0.2 text-[10px] font-black text-[#c7d2fe]">
              · 2
            </span>
          </div>
        </Html>
      </group>

      {/* 3. Middle Shelf Banner: 🚀 PERSONAL PROJECTS · 7 */}
      <group position={[0, 0.22, 0.175]}>
        <Html
          transform
          distanceFactor={0.24}
          style={{ width: "260px", pointerEvents: "auto", cursor: "pointer" }}
        >
          <div
            onClick={onSelectShelf}
            onPointerEnter={() => onHoverShelf?.(true)}
            onPointerLeave={() => onHoverShelf?.(false)}
            className="flex items-center justify-center gap-2 rounded-full border border-cyan-400/80 bg-[#0e0b28]/95 px-3 py-1 shadow-[0_0_14px_rgba(56,189,248,0.55)] backdrop-blur-md select-none transition hover:scale-105 hover:border-cyan-300"
          >
            <span className="text-xs">🚀</span>
            <span className="text-[11px] font-black uppercase tracking-wider text-white">
              Personal Projects
            </span>
            <span className="rounded-full bg-[#0284c7]/40 border border-[#38bdf8]/50 px-1.5 py-0.2 text-[10px] font-black text-[#bae6fd]">
              · 7
            </span>
          </div>
        </Html>
      </group>

      {/* 4. Lower Shelf Banner: 🎓 ACADEMIC PROJECTS · 3 */}
      <group position={[0, -0.20, 0.175]}>
        <Html
          transform
          distanceFactor={0.24}
          style={{ width: "260px", pointerEvents: "auto", cursor: "pointer" }}
        >
          <div
            onClick={onSelectShelf}
            onPointerEnter={() => onHoverShelf?.(true)}
            onPointerLeave={() => onHoverShelf?.(false)}
            className="flex items-center justify-center gap-2 rounded-full border border-amber-400/80 bg-[#0e0b28]/95 px-3 py-1 shadow-[0_0_14px_rgba(251,191,36,0.55)] backdrop-blur-md select-none transition hover:scale-105 hover:border-amber-300"
          >
            <span className="text-xs">🎓</span>
            <span className="text-[11px] font-black uppercase tracking-wider text-white">
              Academic Projects
            </span>
            <span className="rounded-full bg-[#d97706]/40 border border-[#f59e0b]/50 px-1.5 py-0.2 text-[10px] font-black text-[#fef3c7]">
              · 3
            </span>
          </div>
        </Html>
      </group>

      {/* 5. Bottom floating hint badge matching reference */}
      {isFocused && (
        <group position={[0, -0.70, 0.29]}>
          <Html
            transform
            distanceFactor={0.25}
            style={{ width: "300px", pointerEvents: "none" }}
          >
            <div className="flex items-center justify-center rounded-full border border-purple-500/40 bg-[#0d0926]/90 px-4 py-1.5 text-[11px] font-semibold text-slate-200 shadow-[0_0_20px_rgba(168,85,247,0.4)] backdrop-blur-md select-none">
              Every book is a project — pick one
            </div>
          </Html>
        </group>
      )}
    </group>
  );
};
