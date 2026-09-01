import React, { useState } from "react";
import SpillTabs from "../ui/SpillTabs";

const items = [
  { label: "Overview", value: "overview" },
  { label: "Components", value: "components" },
  { label: "Docs", value: "docs" },
  { label: "About", value: "about" },
];

const content: Record<string, { eyebrow: string; title: string; body: string }> = {
  overview: { eyebrow: "ForgeXUI", title: "Explore the interface.", body: "A focused collection of expressive, reusable interactions for modern products." },
  components: { eyebrow: "Library", title: "Browse interactive components.", body: "Build tactile moments with carefully considered motion and accessible defaults." },
  docs: { eyebrow: "Guides", title: "Read the implementation details.", body: "Copy a component, understand its behavior, and make it yours." },
  about: { eyebrow: "The project", title: "Designed for curious builders.", body: "ForgeXUI is a growing toolkit for interfaces that feel a little more alive." },
};

export default function SpillTabsDemo() {
  const [active, setActive] = useState("overview");
  const selected = content[active];
  return React.createElement("div", { className: "spill-tabs-demo" },
    React.createElement(SpillTabs, { items, value: active, onValueChange: setActive, variant: "ink" }),
    React.createElement("div", { className: "spill-tabs-demo-content", "aria-live": "polite" },
      React.createElement("span", null, selected.eyebrow),
      React.createElement("h3", null, selected.title),
      React.createElement("p", null, selected.body),
    ),
  );
}
