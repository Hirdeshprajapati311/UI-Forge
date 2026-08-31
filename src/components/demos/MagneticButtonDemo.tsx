import React from "react";
import MagneticButton from "../ui/MagneticButton";

export default function MagneticButtonDemo() {
  return React.createElement(
    "div",
    { className: "flex min-h-64 items-center justify-center" },
    React.createElement(MagneticButton, null, "Hover me")
  );
}
