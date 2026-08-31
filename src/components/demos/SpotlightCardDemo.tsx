import React from "react";
import SpotlightCard from "../ui/SpotlightCard";

export default function SpotlightCardDemo() {
  return React.createElement(
    "div",
    { className: "mx-auto max-w-md" },
    React.createElement(
      SpotlightCard,
      null,
      React.createElement("p", { className: "text-sm text-zinc-500" }, "Spotlight Card"),
      React.createElement(
        "h3",
        { className: "mt-3 text-2xl font-semibold text-white" },
        "Move your cursor around."
      ),
      React.createElement(
        "p",
        { className: "mt-3 text-sm leading-6 text-zinc-400" },
        "The light follows your cursor across the surface."
      )
    )
  );
}
