import React from "react";
import MagneticTextTrail from "../ui/MagneticTextTrail";

export default function MagneticTextTrailDemo() {
  return React.createElement(
    "div",
    { className: "flex min-h-48 items-center justify-center p-6 text-center" },
    React.createElement(MagneticTextTrail, { radius: 130, strength: 0.32 }, "Create interfaces that feel alive.")
  );
}
