import type React from "react";
import ForgeDock from "./components/ForgeDock";
import ForgeDockDemo from "../demos/ForgeDockDemo";

export type Forge3DUIType = "Effects" | "Navigations" | "Buttons" | "Cards";

export interface Forge3DUIDefinition {
  slug: string;
  title: string;
  category: Forge3DUIType;
  description: string;
  component: React.ComponentType<Record<string, unknown>>;
  demo: React.ComponentType;
}

export const forge3DUIElements: Forge3DUIDefinition[] = [
  {
    slug: "forge-dock",
    title: "ForgeDock",
    category: "Navigations",
    description: "A precision docking indicator that travels with the active navigation destination.",
    component: ForgeDock as React.ComponentType<Record<string, unknown>>,
    demo: ForgeDockDemo,
  },
];
