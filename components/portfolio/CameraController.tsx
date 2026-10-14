"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { interactiveObjects } from "@/data/interactiveObjects";
import { InteractionState } from "@/types/interaction";

interface CameraControllerProps {
  activeObjectId: string | null;
  interactionState: InteractionState;
  onArrived: () => void;
  onReturned: () => void;
}

// Compute responsive overview framing based on viewport aspect ratio
export const getOverviewConfig = (aspect: number) => {
  if (aspect >= 1.25) {
    // Reference framing at ultrawide/laptop aspect (2.111):
    // Vertical FOV = 40.0 deg, camPos = [0, 1.57, 3.42], target = [0, 1.17, -0.35]
    // Responsive vertical FOV anchors the horizontal view (window on left to bookshelf on right)
    const refAspect = 2.1113;
    const refVFOV = 40.0;
    const targetHalfTanH = refAspect * Math.tan((refVFOV * Math.PI) / 360);
    const vFovRad = 2 * Math.atan(targetHalfTanH / aspect);
    const vFovDeg = Math.min(50.0, Math.max(38.5, (vFovRad * 180) / Math.PI));

    return {
      position: [0.0, 1.57, 3.42] as [number, number, number],
      target: [0.0, 1.17, -0.35] as [number, number, number],
      fov: Number(vFovDeg.toFixed(1)),
    };
  }
  // Mobile / vertical aspect ratio: interpolate smoothly to pull back and center
  const t = Math.min(1, Math.max(0, (1.25 - aspect) / 0.8));
  return {
    position: [0.0, 1.45 + t * 0.12, 4.10 + t * 1.50] as [number, number, number],
    target: [0.0, 1.15 - t * 0.05, -0.40] as [number, number, number],
    fov: 46 + t * 9,
  };
};

// Compute responsive object focus framing for mobile vs desktop
const getObjectCameraConfig = (objectId: string, isMobile: boolean) => {
  const base = interactiveObjects[objectId]?.camera;
  if (!base) return null;

  if (objectId === "clock") {
    return {
      position: [-0.50, 0.88, 0.14] as [number, number, number],
      target: [-0.50, 0.802, -0.0995] as [number, number, number],
      fov: isMobile ? 46 : 38,
    };
  }

  if (objectId === "testimonials") {
    return {
      position: [-0.62, 0.91, 0.56] as [number, number, number],
      target: [-0.62, 0.84, 0.205] as [number, number, number],
      fov: isMobile ? 44 : 38,
    };
  }

  if (!isMobile) {
    return {
      position: [...base.position] as [number, number, number],
      target: [...base.target] as [number, number, number],
      fov: 42,
    };
  }

  // Mobile portrait adjustments so objects fit full vertical screen
  switch (objectId) {
    case "monitor":
      return {
        position: [0.0, 1.18, 1.35] as [number, number, number],
        target: [0.0, 1.145, -0.184] as [number, number, number],
        fov: 48,
      };
    case "whiteboard":
      return {
        position: [-1.05, 1.42, 0.95] as [number, number, number],
        target: [-1.05, 1.42, -0.578] as [number, number, number],
        fov: 46,
      };
    case "neon":
      return {
        position: [0.0, 1.98, 0.92] as [number, number, number],
        target: [0.0, 2.05, -0.568] as [number, number, number],
        fov: 46,
      };
    case "bookshelf":
      return {
        position: [1.15, 1.18, 0.65] as [number, number, number],
        target: [1.85, 1.12, -0.45] as [number, number, number],
        fov: 48,
      };
    case "soundboard":
      return {
        position: [0.78, 1.25, 0.58] as [number, number, number],
        target: [0.80, 0.79, 0.04] as [number, number, number],
        fov: 48,
      };
    case "certificates":
      return {
        position: [-0.92, 1.25, 0.52] as [number, number, number],
        target: [-0.92, 0.80, 0.12] as [number, number, number],
        fov: 46,
      };
    case "tryhackme":
      return {
        position: [0.88, 1.53, 0.35] as [number, number, number],
        target: [0.88, 1.53, -0.59] as [number, number, number],
        fov: 46,
      };
    case "testimonials":
      return {
        position: [-0.62, 1.12, 0.65] as [number, number, number],
        target: [-0.62, 0.85, 0.205] as [number, number, number],
        fov: 46,
      };
    default:
      return {
        position: [...base.position] as [number, number, number],
        target: [...base.target] as [number, number, number],
        fov: 45,
      };
  }
};

export const CameraController: React.FC<CameraControllerProps> = ({
  activeObjectId,
  interactionState,
  onArrived,
  onReturned,
}) => {
  const { camera, size } = useThree();
  const orbitRef = useRef<any>(null);

  const aspect = size.width / Math.max(size.height, 1);
  const isMobile = aspect < 1.0;

  const currentOverview = useMemo(() => getOverviewConfig(aspect), [aspect]);

  const targetCamPos = useRef(new THREE.Vector3(...currentOverview.position));
  const targetLookAt = useRef(new THREE.Vector3(...currentOverview.target));
  const currentLookAt = useRef(new THREE.Vector3(...currentOverview.target));
  const targetFov = useRef(currentOverview.fov);
  const parallax = useRef(new THREE.Vector2(0, 0));
  const transitionTime = useRef(0);
  const hasInitialized = useRef(false);

  // Initialize camera responsive positioning immediately on mount
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      const initialOverview = getOverviewConfig(size.width / Math.max(size.height, 1));
      camera.position.set(...initialOverview.position);
      (camera as THREE.PerspectiveCamera).fov = initialOverview.fov;
      camera.updateProjectionMatrix();
      targetCamPos.current.set(...initialOverview.position);
      targetLookAt.current.set(...initialOverview.target);
      currentLookAt.current.set(...initialOverview.target);
      camera.lookAt(targetLookAt.current);
      if (orbitRef.current) {
        orbitRef.current.target.set(...initialOverview.target);
        orbitRef.current.update();
      }
    }
  }, [camera, size]);

  // Reset transition timer on state change
  useEffect(() => {
    transitionTime.current = 0;
  }, [interactionState, activeObjectId]);

  useFrame((state, delta) => {
    const currentAspect = size.width / Math.max(size.height, 1);
    const mobileMode = currentAspect < 1.0;
    const persCamera = camera as THREE.PerspectiveCamera;

    if (
      activeObjectId &&
      interactionState !== "ROOM_OVERVIEW" &&
      interactionState !== "RETURNING_TO_ROOM"
    ) {
      // Focus on active object
      const objConfig = getObjectCameraConfig(activeObjectId, mobileMode);
      if (objConfig) {
        targetCamPos.current.set(...objConfig.position);
        targetLookAt.current.set(...objConfig.target);
        targetFov.current = objConfig.fov;
      }

      if (orbitRef.current) {
        orbitRef.current.enabled = false;
      }

      // Smooth camera interpolation
      const factor = Math.min(1, delta * 4.2);
      camera.position.lerp(targetCamPos.current, factor);
      currentLookAt.current.lerp(targetLookAt.current, factor);
      camera.lookAt(currentLookAt.current);

      if (Math.abs(persCamera.fov - targetFov.current) > 0.05) {
        persCamera.fov = THREE.MathUtils.lerp(persCamera.fov, targetFov.current, factor);
        persCamera.updateProjectionMatrix();
      }

      // Arrival detection
      if (interactionState === "CAMERA_TRANSITION") {
        transitionTime.current += delta;
        const posDist = camera.position.distanceTo(targetCamPos.current);
        const lookDist = currentLookAt.current.distanceTo(targetLookAt.current);

        if ((posDist < 0.015 && lookDist < 0.01) || transitionTime.current > 1.2) {
          camera.position.copy(targetCamPos.current);
          currentLookAt.current.copy(targetLookAt.current);
          persCamera.fov = targetFov.current;
          persCamera.updateProjectionMatrix();
          camera.lookAt(currentLookAt.current);
          transitionTime.current = 0;
          onArrived();
        }
      }
    } else if (interactionState === "RETURNING_TO_ROOM") {
      // Returning to Overview
      const overview = getOverviewConfig(currentAspect);
      targetCamPos.current.set(...overview.position);
      targetLookAt.current.set(...overview.target);
      targetFov.current = overview.fov;

      if (orbitRef.current) {
        orbitRef.current.enabled = false;
      }

      const factor = Math.min(1, delta * 4.0);
      camera.position.lerp(targetCamPos.current, factor);
      currentLookAt.current.lerp(targetLookAt.current, factor);
      camera.lookAt(currentLookAt.current);

      if (Math.abs(persCamera.fov - targetFov.current) > 0.05) {
        persCamera.fov = THREE.MathUtils.lerp(persCamera.fov, targetFov.current, factor);
        persCamera.updateProjectionMatrix();
      }

      transitionTime.current += delta;
      const posDist = camera.position.distanceTo(targetCamPos.current);
      const lookDist = currentLookAt.current.distanceTo(targetLookAt.current);

      if ((posDist < 0.02 && lookDist < 0.015) || transitionTime.current > 1.2) {
        camera.position.copy(targetCamPos.current);
        currentLookAt.current.copy(targetLookAt.current);
        persCamera.fov = targetFov.current;
        persCamera.updateProjectionMatrix();
        camera.lookAt(currentLookAt.current);
        transitionTime.current = 0;
        if (orbitRef.current) {
          orbitRef.current.target.copy(targetLookAt.current);
          orbitRef.current.update();
        }
        onReturned();
      }
    } else {
      // ROOM_OVERVIEW mode: camera locked in one position with subtle pointer parallax
      const overview = getOverviewConfig(currentAspect);
      targetCamPos.current.set(...overview.position);
      targetLookAt.current.set(...overview.target);

      // Keep FOV responsive on resize
      if (Math.abs(persCamera.fov - overview.fov) > 0.1) {
        persCamera.fov = THREE.MathUtils.lerp(persCamera.fov, overview.fov, delta * 3.0);
        persCamera.updateProjectionMatrix();
      }

      parallax.current.lerp(state.pointer, delta * 3.0);
      const px = parallax.current.x * (mobileMode ? 0.02 : 0.08);
      const py = parallax.current.y * (mobileMode ? 0.01 : 0.04);

      // Subtle parallax around the fixed overview position — no zooming out, angle locked
      camera.position.set(
        overview.position[0] + px * 0.12,
        overview.position[1] + py * 0.08,
        overview.position[2]
      );
      camera.lookAt(
        overview.target[0] + px * 0.04,
        overview.target[1] + py * 0.04,
        overview.target[2]
      );

      if (orbitRef.current) {
        orbitRef.current.enabled = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={orbitRef}
      enabled={false}
      enablePan={false}
      enableZoom={false}
      enableRotate={false}
    />
  );
};
