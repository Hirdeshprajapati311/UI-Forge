import type { ComponentType } from "react";

import MagneticButtonDemo from "./MagneticButtonDemo";
import SpotlightCardDemo from "./SpotlightCardDemo";

const demos: Record<string, ComponentType> = {
  "magnetic-button": MagneticButtonDemo,
  "spotlight-card": SpotlightCardDemo,
};

interface DemoRendererProps {
  slug: string;
}

export default function DemoRenderer({
  slug,
}: DemoRendererProps) {
  const Demo = demos[slug];

  if (!Demo) {
    return (
      <p className="text-sm text-zinc-500">
        Preview unavailable.
      </p>
    );
  }

  return <Demo />;
}