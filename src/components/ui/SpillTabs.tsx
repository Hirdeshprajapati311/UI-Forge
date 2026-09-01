import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

export interface SpillTabItem {
  label: string;
  value: string;
  disabled?: boolean;
  href?: string;
}

export interface SpillTabsProps {
  items: SpillTabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  paintClassName?: string;
  disabled?: boolean;
  mode?: "tabs" | "navigation";
  variant?: "ink" | "paint";
}

interface PaintPosition {
  left: number;
  width: number;
}

function SpillIndicator({ position, previous, paintClassName, spilling }: {
  position: PaintPosition;
  previous: PaintPosition;
  paintClassName?: string;
  spilling: boolean;
}) {
  const distance = Math.abs(position.left - previous.left);
  return React.createElement("span", {
    "aria-hidden": true,
    className: `spill-tabs-paint${spilling ? " is-spilling" : ""}${paintClassName ? ` ${paintClassName}` : ""}`,
    style: {
      left: `${position.left}px`,
      width: `${position.width}px`,
      "--spill-distance": `${Math.min(2.5, Math.max(1, distance / 100))}`,
    } as React.CSSProperties,
  });
}

export default function SpillTabs({
  items,
  value,
  defaultValue,
  onValueChange,
  className = "",
  paintClassName,
  disabled = false,
  mode = "tabs",
  variant = "ink",
}: SpillTabsProps) {
  const firstValue = items.find((item) => !item.disabled)?.value ?? "";
  const [internalValue, setInternalValue] = useState(defaultValue ?? firstValue);
  const activeValue = value ?? internalValue;
  const [position, setPosition] = useState<PaintPosition>({ left: 0, width: 0 });
  const previousPosition = useRef(position);
  const [spilling, setSpilling] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<string, HTMLElement>());
  const activeIndex = Math.max(0, items.findIndex((item) => item.value === activeValue));

  const measure = (animate: boolean) => {
    const list = listRef.current;
    const active = itemRefs.current.get(activeValue);
    if (!list || !active) return;
    const listBounds = list.getBoundingClientRect();
    const next = { left: active.getBoundingClientRect().left - listBounds.left, width: active.offsetWidth };
    if (next.width === 0) return;
    previousPosition.current = position;
    setPosition(next);
    if (animate && position.width > 0) {
      setSpilling(true);
      window.setTimeout(() => setSpilling(false), 480);
    }
  };

  useLayoutEffect(() => { measure(false); }, [activeValue, items.length]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(() => measure(false));
    observer.observe(list);
    return () => observer.disconnect();
  }, [activeValue]);

  const select = (nextValue: string) => {
    if (disabled || nextValue === activeValue) return;
    setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  const moveWithKeyboard = (event: React.KeyboardEvent<HTMLElement>, index: number) => {
    if (mode !== "tabs") return;
    const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!direction) return;
    event.preventDefault();
    for (let offset = 1; offset <= items.length; offset += 1) {
      const next = items[(index + direction * offset + items.length) % items.length];
      if (next && !next.disabled) {
        select(next.value);
        itemRefs.current.get(next.value)?.focus();
        break;
      }
    }
  };

  const container = mode === "navigation" ? "nav" : "div";
  const containerProps = mode === "navigation" ? { "aria-label": "Primary navigation" } : { role: "tablist", "aria-label": "Sections" };

  return React.createElement(
    container,
    { className: `spill-tabs spill-tabs-variant-${variant}${mode === "navigation" ? " spill-tabs-navigation" : ""} ${className}`, ...containerProps },
    React.createElement(
      "div",
      { className: "spill-tabs-list", ref: listRef },
      items.map((item, index) => {
        const common = {
          key: item.value,
          ref: (node: HTMLElement | null) => { if (node) itemRefs.current.set(item.value, node); else itemRefs.current.delete(item.value); },
          className: `spill-tabs-trigger${item.value === activeValue ? " is-active" : ""}`,
          "aria-disabled": item.disabled || disabled ? true : undefined,
          onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => moveWithKeyboard(event, index),
        };
        return mode === "navigation"
          ? React.createElement("a", { ...common, href: item.disabled || disabled ? undefined : item.href, "aria-current": item.value === activeValue ? "page" : undefined, onClick: (event: React.MouseEvent<HTMLAnchorElement>) => { if (item.disabled || disabled) event.preventDefault(); else select(item.value); } }, item.label)
          : React.createElement("button", { ...common, type: "button", role: "tab", "aria-selected": item.value === activeValue, tabIndex: item.value === activeValue ? 0 : -1, disabled: item.disabled || disabled }, item.label);
      }),
      React.createElement(SpillIndicator, { position, previous: previousPosition.current, paintClassName, spilling }),
    ),
  );
}
