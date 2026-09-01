import type React from "react";
import ForgeOrb from "./elements/ForgeOrb";
import { Bottle } from "./models";

export interface Forge3DElementDefinition {
  slug: string;
  title: string;
  category: string;
  description: string;
  component: React.ComponentType<Record<string, unknown>>;
  props?: Record<string, unknown>;
}

// Add future elements here without changing the shared canvas or explorer layout.
export const forge3DElements: Forge3DElementDefinition[] = [
  {
    slug: "forge-orb",
    title: "Forge Orb",
    category: "Procedural 3D element",
    description:
      "A procedural surface shaped by light, motion, and your point of view.",
    component: ForgeOrb as React.ComponentType<Record<string, unknown>>,
    props: { size: 1.25, distortion: 0.22, rotationSpeed: 0.18 },
  },

  {
    slug: "bottle",
    title: "Bottle",
    category: "Procedural 3D element",
    description: "A 3D bottle model with customizable colors and animations",
    component: Bottle as React.ComponentType<Record<string, unknown>>,
    props: {
      height: 3.0,
      radius: 0.5,
      animate: true,
      scale: [0.62, 0.62, 0.62],
    },
  },
];
