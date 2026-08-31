import React, { useRef, useState } from "react";

interface FocusLensProps {
  children: React.ReactNode;
  radius?: number;
}

export default function FocusLens({ children, radius = 120 }: FocusLensProps) {
  const lensRef = useRef<HTMLDivElement>(null);
  const [point, setPoint] = useState({ x: 50, y: 50 });

  const updatePoint = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = lensRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPoint({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  const mask = `circle(${radius}px at ${point.x}% ${point.y}%)`;

  return React.createElement(
    "div",
    {
      ref: lensRef,
      onMouseMove: updatePoint,
      className: "relative min-h-64 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-8",
    },
    React.createElement("div", { className: "focus-lens-content focus-lens-dim" }, children),
    React.createElement(
      "div",
      { className: "focus-lens-content focus-lens-sharp", style: { clipPath: mask } },
      children
    ),
    React.createElement("div", {
      className: "pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5",
    })
  );
}
