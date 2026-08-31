import { useRef, useState } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
}

export default function MagneticButton({
  children,
  strength = 0.25,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    setPosition({
      x: x * strength,
      y: y * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({
      x: 0,
      y: 0,
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      className="rounded-xl bg-white px-6 py-3 font-medium text-zinc-950 transition-transform duration-200 ease-out"
    >
      {children}
    </button>
  );
}