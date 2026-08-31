import React, { useRef, useState } from "react";

interface PerspectiveStageProps {
  children: React.ReactNode;
  intensity?: number;
}

export default function PerspectiveStage({ children, intensity = 12 }: PerspectiveStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTilt({
      x: ((event.clientY - rect.top) / rect.height - 0.5) * -intensity,
      y: ((event.clientX - rect.left) / rect.width - 0.5) * intensity,
    });
  };

  return React.createElement(
    "div",
    {
      ref: stageRef,
      onMouseMove: handleMove,
      onMouseLeave: () => setTilt({ x: 0, y: 0 }),
      className: "perspective-stage",
    },
    React.createElement("div", { className: "perspective-stage-glare", style: { opacity: Math.min(0.45, (Math.abs(tilt.x) + Math.abs(tilt.y)) / 40) } }),
    React.createElement("div", { className: "perspective-stage-scene", style: { transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` } }, children)
  );
}
