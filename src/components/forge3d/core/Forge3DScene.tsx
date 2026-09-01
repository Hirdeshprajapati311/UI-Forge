import React from "react";

interface Forge3DSceneProps {
  children: React.ReactNode;
}

export default function Forge3DScene({ children }: Forge3DSceneProps) {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement("ambientLight", { intensity: 0.8 }),
    React.createElement("directionalLight", { position: [3, 4, 5], intensity: 2.4, color: "#b7f4f5" }),
    React.createElement("pointLight", { position: [-3, -1, 2], intensity: 12, distance: 8, color: "#315da8" }),
    React.createElement("pointLight", { position: [2, 1, -2], intensity: 8, distance: 6, color: "#16b8bd" }),
    children,
  );
}
