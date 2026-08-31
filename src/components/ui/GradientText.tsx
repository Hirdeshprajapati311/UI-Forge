import React, { type ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export default function GradientText({
  children,
  className = "",
}: GradientTextProps) {
  return React.createElement(
    "span",
    {
      className: `bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent ${className}`,
    },
    children
  );
}
