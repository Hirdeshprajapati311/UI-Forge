import React, { useEffect, useState } from "react";
import { Forge3DCanvas } from "../core";
import Forge3DScene from "../core/Forge3DScene";
import { forge3DElements } from "../registry";

export default function Forge3DExplorer() {
  const [activeSlug, setActiveSlug] = useState(forge3DElements[0]?.slug ?? "");
  const [reducedMotion, setReducedMotion] = useState(false);
  const activeElement = forge3DElements.find((element) => element.slug === activeSlug) ?? forge3DElements[0];

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return React.createElement(
    "section",
    { id: "models", className: "forge3d-explorer", "data-forge3d-exploration": true, "aria-labelledby": "forge3d-explorer-title" },
    React.createElement(
      "div",
      { className: "forge3d-explorer-heading" },
      React.createElement("div", null,
        React.createElement("p", { className: "dimension-index" }, "ForgeX3D / Playground"),
        React.createElement("h2", { id: "forge3d-explorer-title" }, "Explore the collection."),
        React.createElement("p", null, "A procedural element shaped by light, motion, and your point of view."),
      ),
      React.createElement("button", { type: "button", className: "forge3d-back", "data-forge3d-back": true }, "Back to hero"),
    ),
    React.createElement(
      "nav",
      { className: "forge3d-element-nav", "aria-label": "ForgeX3D elements" },
      forge3DElements.map((element, index) => React.createElement(
        "button",
        {
          key: element.slug,
          type: "button",
          className: `forge3d-element-tab${element.slug === activeSlug ? " is-active" : ""}`,
          "aria-pressed": element.slug === activeSlug,
          onClick: () => setActiveSlug(element.slug),
        },
        React.createElement("span", null, String(index + 1).padStart(2, "0")),
        element.title,
      )),
    ),
    React.createElement("p", { className: "forge3d-collection-meta" }, `${forge3DElements.length} element${forge3DElements.length === 1 ? "" : "s"} available · Select an element to inspect`),
    React.createElement(
      "div",
      { className: "forge3d-explorer-grid" },
      React.createElement(
        "div",
        { className: "forge3d-canvas-wrap" },
        React.createElement(Forge3DCanvas, { className: "forge3d-canvas", cameraZ: 4.2 },
          activeElement && React.createElement(Forge3DScene, null, React.createElement(activeElement.component, { ...activeElement.props, interactive: true, reducedMotion })),
        ),
        React.createElement("span", { className: "forge3d-canvas-label" }, "Pointer responsive"),
      ),
      React.createElement(
        "aside",
        { className: "forge3d-object-info" },
        React.createElement("span", { className: "forge3d-object-number" }, activeElement ? activeElement.slug.toUpperCase() : "01"),
        React.createElement("p", { className: "forge3d-object-kicker" }, activeElement?.title.toUpperCase()),
        React.createElement("h3", null, activeElement?.category),
        React.createElement("p", { className: "forge3d-object-description" }, activeElement?.description),
        React.createElement("dl", null,
          React.createElement("div", null, React.createElement("dt", null, "Geometry"), React.createElement("dd", null, "Deformed icosphere")),
          React.createElement("div", null, React.createElement("dt", null, "Material"), React.createElement("dd", null, "Metallic surface")),
          React.createElement("div", null, React.createElement("dt", null, "Interaction"), React.createElement("dd", null, "Pointer responsive")),
        ),
      ),
    ),
  );
}
