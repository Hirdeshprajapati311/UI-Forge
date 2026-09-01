import React from "react";
import { forge3DUIElements } from "../ui-registry";

interface Forge3DUIDemoProps { slug: string; }

export default function Forge3DUIDemo({ slug }: Forge3DUIDemoProps) {
  const element = forge3DUIElements.find((entry) => entry.slug === slug);
  return element ? React.createElement(element.demo) : React.createElement("p", { className: "text-sm text-zinc-500" }, "Preview unavailable.");
}
