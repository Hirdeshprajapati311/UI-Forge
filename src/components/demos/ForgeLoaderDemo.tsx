import React, { useState } from "react";
import ForgeLoader from "../ui/ForgeLoader";

export default function ForgeLoaderDemo() {
  const [progress, setProgress] = useState(72);

  return React.createElement(
    "div",
    { className: "forge-loader-demo" },
    React.createElement(
      "section",
      { className: "forge-loader-demo-panel" },
      React.createElement("div", { className: "forge-loader-demo-heading" },
        React.createElement("div", null,
          React.createElement("p", { className: "forge-loader-demo-kicker" }, "Water"),
          React.createElement("h3", { className: "forge-loader-demo-title" }, "Known progress")
        ),
        React.createElement("span", { className: "forge-loader-demo-value" }, `${progress}%`)
      ),
      React.createElement("p", { className: "forge-loader-demo-description" }, "A measurable state for uploads, installation, or synchronization."),
      React.createElement("div", { className: "forge-loader-demo-water-stage" }, React.createElement(ForgeLoader, { variant: "water", progress, size: "lg", label: "Upload progress" })),
      React.createElement("label", { className: "forge-loader-demo-slider-label", htmlFor: "forge-loader-progress" }, "Progress"),
      React.createElement("input", { id: "forge-loader-progress", className: "forge-loader-demo-slider", type: "range", min: 0, max: 100, value: progress, onChange: (event: React.ChangeEvent<HTMLInputElement>) => setProgress(Number(event.target.value)) }),
      React.createElement("div", { className: "forge-loader-demo-slider-meta" }, React.createElement("span", null, "0%"), React.createElement("span", null, "Drag to completion"), React.createElement("span", null, "100%"))
    ),
    React.createElement(
      "section",
      { className: "forge-loader-demo-panel forge-loader-demo-stack-panel" },
      React.createElement("p", { className: "forge-loader-demo-kicker" }, "Stack"),
      React.createElement("h3", { className: "forge-loader-demo-title" }, "Continuous processing"),
      React.createElement("p", { className: "forge-loader-demo-description" }, "An indeterminate state for work with no known finish time."),
      React.createElement("div", { className: "forge-loader-demo-stack-stage" }, React.createElement(ForgeLoader, { variant: "stack", size: "lg", label: "Processing" })),
      React.createElement("p", { className: "forge-loader-demo-note" }, "The lines enter, stack, and leave in one continuous rhythm.")
    )
  );
}
