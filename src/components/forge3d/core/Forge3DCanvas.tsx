import React from "react";
import { Canvas } from "@react-three/fiber";

interface Forge3DCanvasProps {
  children: React.ReactNode;
  className?: string;
  cameraZ?: number;
}

/** Shared renderer defaults for every ForgeX3D element. */
export default function Forge3DCanvas({ children, className, cameraZ = 4.5 }: Forge3DCanvasProps) {
  return React.createElement(
    Canvas,
    {
      className,
      dpr: [1, 1.75],
      camera: { position: [0, 0, cameraZ], fov: 35 },
      gl: { antialias: true, alpha: true, powerPreference: "high-performance" },
      onCreated: ({ gl }: { gl: { outputColorSpace: unknown } }) => {
        gl.outputColorSpace = "srgb";
      },
    },
    children,
  );
}
