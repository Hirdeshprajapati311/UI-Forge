import React, { useEffect, useRef } from "react";

interface RunawayButtonProps {
  children: React.ReactNode;
  enabled?: boolean;
  type?: "button" | "submit";
  maxDistance?: number;
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function RunawayButton({
  children,
  enabled = false,
  type = "button",
  maxDistance = 120,
  disabled = false,
  className = "",
  onClick,
}: RunawayButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });

  const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const applyPosition = () => {
    frameRef.current = null;
    const button = buttonRef.current;
    if (!button) return;

    positionRef.current = targetRef.current;
    button.style.transform = `translate3d(${targetRef.current.x}px, ${targetRef.current.y}px, 0)`;
  };

  const moveButton = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (enabled || disabled || event.pointerType === "touch" || prefersReducedMotion()) return;

    const button = buttonRef.current;
    const container = button?.parentElement;
    if (!button || !container) return;

    const buttonRect = button.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const distance = Math.hypot(
      event.clientX - (buttonRect.left + buttonRect.width / 2),
      event.clientY - (buttonRect.top + buttonRect.height / 2)
    );

    if (distance > maxDistance && event.type !== "pointerenter") return;

    const originX = buttonRect.left - containerRect.left - positionRef.current.x;
    const originY = buttonRect.top - containerRect.top - positionRef.current.y;
    const minX = -originX;
    const maxX = containerRect.width - originX - buttonRect.width;
    const minY = -originY;
    const maxY = containerRect.height - originY - buttonRect.height;
    const escapeDistance = Math.min(56, Math.max(24, maxDistance * 0.4));
    const directionX = event.clientX < buttonRect.left + buttonRect.width / 2 ? 1 : -1;
    const directionY = event.clientY < buttonRect.top + buttonRect.height / 2 ? 1 : -1;

    targetRef.current = {
      x: clamp(positionRef.current.x + directionX * escapeDistance, minX, maxX),
      y: clamp(positionRef.current.y + directionY * escapeDistance * 0.55, minY, maxY),
    };

    if (frameRef.current === null) {
      frameRef.current = window.requestAnimationFrame(applyPosition);
    }
  };

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    positionRef.current = { x: 0, y: 0 };
    targetRef.current = { x: 0, y: 0 };
    button.style.transform = "translate3d(0, 0, 0)";

    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [enabled]);

  return React.createElement(
    "button",
    {
      ref: buttonRef,
      type,
      disabled,
      onPointerEnter: moveButton,
      onPointerMove: moveButton,
      onPointerDown: moveButton,
      onClick,
      className: `runaway-button ${className}`.trim(),
      "aria-description": enabled ? undefined : "Complete the required step before submitting.",
      title: enabled ? undefined : "Complete the required step first",
    },
    children
  );
}
