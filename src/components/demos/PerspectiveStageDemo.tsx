import React from "react";
import PerspectiveStage from "../ui/PerspectiveStage";

export default function PerspectiveStageDemo() {
  return React.createElement(
    PerspectiveStage,
    null,
    React.createElement("div", { className: "absolute inset-x-8 top-10 h-20 rounded-xl border border-indigo-300/20 bg-indigo-400/10", style: { transform: "translateZ(-50px)" } }),
    React.createElement(
      "div",
      { className: "relative mx-auto mt-12 max-w-xs rounded-2xl border border-white/15 bg-zinc-900 p-5 shadow-2xl", style: { transform: "translateZ(55px)" } },
      React.createElement("div", { className: "h-2 w-16 rounded-full bg-indigo-300/70" }),
      React.createElement("p", { className: "mt-4 text-lg font-semibold text-white" }, "Perspective Stage"),
      React.createElement("p", { className: "mt-2 text-sm leading-6 text-zinc-400" }, "Move your cursor around the scene.")
    )
  );
}
