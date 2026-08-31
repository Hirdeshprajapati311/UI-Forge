import React, { useRef } from "react";

interface MagneticTextTrailProps {
  children: string;
  strength?: number;
  radius?: number;
  maxRotation?: number;
}

export default function MagneticTextTrail({
  children,
  strength = 0.28,
  radius = 110,
  maxRotation = 10,
}: MagneticTextTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const characterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    characterRefs.current.forEach((character) => {
      if (!character) return;
      const rect = character.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - distance / radius);
      const rotate = Math.max(-maxRotation, Math.min(maxRotation, dx * 0.12)) * influence;
      character.style.transform = `translate(${dx * strength * influence}px, ${dy * strength * influence}px) rotate(${rotate}deg)`;
      character.style.opacity = `${0.68 + influence * 0.32}`;
    });
  };

  const reset = () => {
    characterRefs.current.forEach((character) => {
      if (!character) return;
      character.style.transform = "translate(0, 0) rotate(0deg)";
      character.style.opacity = "1";
    });
  };

  return React.createElement(
    "div",
    { ref: containerRef, onMouseMove: handleMove, onMouseLeave: reset, className: "magnetic-text-trail" },
    Array.from(children).map((character, index) =>
      React.createElement(
        "span",
        {
          key: `${character}-${index}`,
          ref: (element: HTMLSpanElement | null) => { characterRefs.current[index] = element; },
          className: character === " " ? "magnetic-text-space" : undefined,
        },
        character === " " ? "\u00a0" : character
      )
    )
  );
}
