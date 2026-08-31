import React, { useEffect, useRef, useState } from "react";

interface GuardedActionProps {
  children: React.ReactNode;
  onConfirm: () => void;
  enabled?: boolean;
  duration?: number;
  warning?: string;
  confirmLabel?: string;
  successLabel?: string;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}

type ActionPhase = "idle" | "arming" | "success";

export default function GuardedAction({
  children,
  onConfirm,
  enabled = true,
  duration = 1350,
  warning = "Keep holding to confirm this action.",
  confirmLabel = "Hold to confirm",
  successLabel = "Confirmed",
  disabled = false,
  className = "",
  type = "button",
}: GuardedActionProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const phaseRef = useRef<ActionPhase>("idle");
  const pointerIdRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const [phase, setPhase] = useState<ActionPhase>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const setActionPhase = (nextPhase: ActionPhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  };

  const clearHold = () => {
    activeRef.current = false;
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    frameRef.current = null;
    timeoutRef.current = null;
    if (buttonRef.current) buttonRef.current.style.setProperty("--guard-progress", "0%");
  };

  const finish = () => {
    if (!activeRef.current || phaseRef.current !== "arming") return;
    activeRef.current = false;
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    frameRef.current = null;
    timeoutRef.current = null;
    buttonRef.current?.style.setProperty("--guard-progress", "100%");
    setActionPhase("success");
    setStatusMessage(successLabel);
    onConfirm();
  };

  const updateProgress = () => {
    if (!activeRef.current) return;
    const progress = Math.min(1, (performance.now() - startedAtRef.current) / duration);
    buttonRef.current?.style.setProperty("--guard-progress", `${progress * 100}%`);
    if (progress < 1) frameRef.current = window.requestAnimationFrame(updateProgress);
  };

  const startHold = (event?: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled || phaseRef.current === "success" || activeRef.current) return;
    if (event?.pointerType === "mouse" && event.button !== 0) return;

    event?.preventDefault();
    pointerIdRef.current = event?.pointerId ?? null;
    if (event) buttonRef.current?.setPointerCapture(event.pointerId);
    activeRef.current = true;
    startedAtRef.current = performance.now();
    buttonRef.current?.style.setProperty("--guard-progress", "0%");
    setActionPhase("arming");
    setStatusMessage(warning);
    frameRef.current = window.requestAnimationFrame(updateProgress);
    timeoutRef.current = window.setTimeout(finish, duration);
  };

  const cancelHold = () => {
    if (!activeRef.current) return;
    clearHold();
    pointerIdRef.current = null;
    setActionPhase("idle");
    setStatusMessage("Confirmation cancelled.");
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (pointerIdRef.current !== null && event.pointerId !== pointerIdRef.current) return;
    if (phaseRef.current !== "success") cancelHold();
    pointerIdRef.current = null;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      cancelHold();
      return;
    }
    if ((event.key === "Enter" || event.key === " ") && phaseRef.current === "idle") {
      event.preventDefault();
      startHold();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === "Enter" || event.key === " ") && phaseRef.current !== "success") {
      event.preventDefault();
      cancelHold();
    }
  };

  useEffect(() => {
    clearHold();
    setActionPhase("idle");
    setStatusMessage("");
    return () => clearHold();
  }, [enabled, disabled]);

  const content = phase === "success" ? successLabel : phase === "arming" ? confirmLabel : children;

  return React.createElement(
    "div",
    { className: "guarded-action" },
    React.createElement(
      "button",
      {
        ref: buttonRef,
        type,
        disabled,
        onPointerDown: startHold,
        onPointerUp: handlePointerUp,
        onPointerCancel: cancelHold,
        onKeyDown: handleKeyDown,
        onKeyUp: handleKeyUp,
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
          if (phaseRef.current !== "success") event.preventDefault();
        },
        className: `guarded-action-button guarded-action-${phase} ${className}`.trim(),
        "aria-description": phase === "arming" ? warning : undefined,
        "aria-live": "polite",
      },
      phase === "success" && React.createElement("span", { className: "guarded-action-check", "aria-hidden": "true" }, "\u2713"),
      React.createElement("span", null, content),
      phase === "arming" && React.createElement("span", { className: "guarded-action-progress", "aria-hidden": "true" })
    ),
    React.createElement("span", { className: "guarded-action-status", role: "status", "aria-live": "polite" }, statusMessage)
  );
}
