import React, { useEffect, useRef, useState } from "react";

export interface ForgeLoaderProps {
  variant?: "water" | "stack";
  progress?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const clamp = (value: number) => Math.min(100, Math.max(0, value));

export default function ForgeLoader({
  variant = "water",
  progress,
  size = "md",
  className = "",
  label,
}: ForgeLoaderProps) {
  if (variant === "stack") {
    return React.createElement(
      "div",
      {
        className: `forge-loader forge-loader-stack forge-loader-${size} ${className}`.trim(),
        role: "status",
        "aria-label": label ?? "Loading",
      },
      React.createElement("span", { className: "forge-loader-sr-only" }, label ?? "Loading"),
      React.createElement("span", { className: "forge-loader-stack-line" }),
      React.createElement("span", { className: "forge-loader-stack-line" }),
      React.createElement("span", { className: "forge-loader-stack-line" })
    );
  }

  return React.createElement(WaterLoader, {
    progress: clamp(progress ?? 0),
    hasProgress: typeof progress === "number",
    size,
    className,
    label: label ?? "Loading progress",
  });
}

interface WaterLoaderProps {
  progress: number;
  hasProgress: boolean;
  size: "sm" | "md" | "lg";
  className: string;
  label: string;
}

function WaterLoader({ progress, hasProgress, size, className, label }: WaterLoaderProps) {
  const previousProgress = useRef(progress);
  const [showDrop, setShowDrop] = useState(false);

  useEffect(() => {
    if (progress === 100 && previousProgress.current < 100) {
      setShowDrop(true);
      const timeout = window.setTimeout(() => setShowDrop(false), 900);
      previousProgress.current = progress;
      return () => window.clearTimeout(timeout);
    }
    previousProgress.current = progress;
  }, [progress]);

  return React.createElement(
    "div",
    {
      className: `forge-loader forge-loader-water forge-loader-${size} ${className}`.trim(),
      role: hasProgress ? "progressbar" : undefined,
      "aria-label": hasProgress ? label : undefined,
      "aria-valuemin": hasProgress ? 0 : undefined,
      "aria-valuemax": hasProgress ? 100 : undefined,
      "aria-valuenow": hasProgress ? progress : undefined,
    },
    React.createElement("span", { className: "forge-loader-sr-only" }, hasProgress ? `${label}: ${progress}%` : label),
    React.createElement(
      "span",
      { className: "forge-loader-water-vessel", style: { "--water-level": `${progress}%` } as React.CSSProperties },
      React.createElement("span", { className: "forge-loader-water-fill", style: { height: `${progress}%` } }),
      React.createElement("span", { className: "forge-loader-water-surface" })
    ),
    showDrop && React.createElement("span", { className: "forge-loader-water-drop", "aria-hidden": "true" })
  );
}
