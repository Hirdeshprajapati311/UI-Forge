import React, { type ComponentType } from "react";

import MagneticButtonDemo from "./MagneticButtonDemo";
import SpotlightCardDemo from "./SpotlightCardDemo";
import GradientTextDemo from "./GradientTextDemo";

const demos: Record<string, ComponentType> = {
  "magnetic-button": MagneticButtonDemo,
  "spotlight-card": SpotlightCardDemo,
  "gradient-text": GradientTextDemo,
};

interface DemoRendererProps {
  slug: string;
}

export default function DemoRenderer({
  slug,
}: DemoRendererProps) {
  const Demo = demos[slug];

  if (!Demo) {
    return React.createElement(
      "p",
      { className: "text-sm text-zinc-500" },
      "Preview unavailable."
    );
  }

  return React.createElement(Demo);
}
