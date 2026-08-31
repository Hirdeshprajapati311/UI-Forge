import React, { useRef, useState } from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
}

export default function SpotlightCard({
  children,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setPosition({ x, y });
  };

  return React.createElement(
    "div",
    {
      ref: cardRef,
      onMouseMove: handleMouseMove,
      className: "relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 p-px",
      style: {
        background: `radial-gradient(300px circle at ${position.x}% ${position.y}%, rgba(255,255,255,0.15), transparent 40%)`,
      },
    },
    React.createElement("div", { className: "rounded-[15px] bg-zinc-950 p-8" }, children)
  );
}
