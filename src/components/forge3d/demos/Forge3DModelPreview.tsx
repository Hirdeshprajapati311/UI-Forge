import React, { useEffect, useState } from "react";
import { Forge3DCanvas } from "../core";
import Forge3DScene from "../core/Forge3DScene";
import { forge3DElements } from "../registry";

interface Forge3DModelPreviewProps {
  slug: string;
}

export default function Forge3DModelPreview({ slug }: Forge3DModelPreviewProps) {
  const model = forge3DElements.find((element) => element.slug === slug) ?? forge3DElements[0];
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (!model) return null;

  return React.createElement(
    "div",
    { className: "forge3d-model-preview" },
    React.createElement(
      Forge3DCanvas,
      { className: "forge3d-model-preview-canvas", cameraZ: 4.2 },
      React.createElement(Forge3DScene, null, React.createElement(model.component, { ...model.props, interactive: true, reducedMotion })),
    ),
    React.createElement("span", { className: "forge3d-model-preview-hint" }, "Move your pointer across the model"),
  );
}
