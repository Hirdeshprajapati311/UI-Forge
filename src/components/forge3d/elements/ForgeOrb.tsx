import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export interface ForgeOrbProps {
  size?: number;
  rotationSpeed?: number;
  distortion?: number;
  interactive?: boolean;
  reducedMotion?: boolean;
}

export default function ForgeOrb({
  size = 1,
  rotationSpeed = 0.2,
  distortion = 0.16,
  interactive = true,
  reducedMotion = false,
}: ForgeOrbProps) {
  const orb = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const next = new THREE.IcosahedronGeometry(size, 5);
    const position = next.attributes.position;
    const vertex = new THREE.Vector3();

    for (let index = 0; index < position.count; index += 1) {
      vertex.fromBufferAttribute(position, index).normalize();
      const wave = Math.sin(vertex.x * 8 + vertex.y * 4) * 0.035
        + Math.cos(vertex.z * 9 - vertex.x * 3) * 0.025;
      vertex.multiplyScalar(size * (1 + wave * (distortion / 0.16)));
      position.setXYZ(index, vertex.x, vertex.y, vertex.z);
    }
    position.needsUpdate = true;
    next.computeVertexNormals();
    return next;
  }, [distortion, size]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    if (!orb.current) return;
    const motion = reducedMotion ? 0 : 1;
    const pointerX = interactive ? state.pointer.x : 0;
    const pointerY = interactive ? state.pointer.y : 0;
    orb.current.rotation.y += delta * rotationSpeed * motion;
    orb.current.rotation.x += (pointerY * 0.18 - orb.current.rotation.x) * delta * 1.8 * motion;
    orb.current.rotation.z += (pointerX * 0.12 - orb.current.rotation.z) * delta * 1.5 * motion;
    orb.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.08 * motion;
  });

  return React.createElement(
    "group",
    null,
    React.createElement(
      "mesh",
      { ref: orb, geometry },
      React.createElement("meshStandardMaterial", {
        color: "#4faeb7",
        roughness: 0.28,
        metalness: 0.55,
        emissive: "#0a3d48",
        emissiveIntensity: 0.45,
      }),
    ),
    React.createElement(
      "mesh",
      { scale: 1.12 },
      React.createElement("sphereGeometry", { args: [size, 32, 32] }),
      React.createElement("meshBasicMaterial", { color: "#62d9d2", transparent: true, opacity: 0.055, depthWrite: false }),
    ),
  );
}
