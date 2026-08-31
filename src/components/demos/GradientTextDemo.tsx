import React from "react";
import GradientText from "../ui/GradientText";

export default function GradientTextDemo() {
  return React.createElement(
    "div",
    { className: "flex min-h-48 items-center justify-center p-8" },
    React.createElement(
      GradientText,
      { className: "text-4xl font-bold" },
      "Beautiful interfaces."
    )
  );
}
