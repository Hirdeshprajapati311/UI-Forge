import React from "react";
import FocusLens from "../ui/FocusLens";

export default function FocusLensDemo() {
  return React.createElement(
    FocusLens,
    { radius: 105 },
    React.createElement(
      "div",
      { className: "flex min-h-48 items-center justify-center text-center" },
      React.createElement(
        "p",
        { className: "max-w-lg text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl" },
        "Build beautiful interfaces without the noise."
      )
    )
  );
}
