import React, { useState } from "react";
import ForgeDock from "../forge3d/components/ForgeDock";

const items = [
  { label: "Home", value: "home" },
  { label: "Components", value: "components" },
  { label: "3D Models", value: "models" },
  { label: "Docs", value: "docs" },
];

export default function ForgeDockDemo() {
  const [active, setActive] = useState("home");
  return React.createElement("div", { className: "forge-dock-demo" },
    React.createElement(ForgeDock, { items, activeId: active, onChange: setActive }),
    React.createElement("div", { className: "forge-dock-demo-copy", "aria-live": "polite" },
      React.createElement("span", null, "Precision active state"),
      React.createElement("h3", null, items.find((item) => item.value === active)?.label),
      React.createElement("p", null, "The dock carriage travels with momentum and compresses into place on arrival."),
    ),
  );
}
