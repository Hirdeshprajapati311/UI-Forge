import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

export interface ForgeDockItem {
  label: string;
  value: string;
  href?: string;
  disabled?: boolean;
}

export interface ForgeDockProps {
  items: ForgeDockItem[];
  activeId?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  mode?: "tabs" | "navigation";
  className?: string;
  disabled?: boolean;
}

interface DockPosition { left: number; width: number; }

export default function ForgeDock({
  items,
  activeId,
  value,
  defaultValue,
  onChange,
  onValueChange,
  mode = "tabs",
  className = "",
  disabled = false,
}: ForgeDockProps) {
  const firstValue = items.find((item) => !item.disabled)?.value ?? "";
  const [internalValue, setInternalValue] = useState(defaultValue ?? firstValue);
  const activeValue = activeId ?? value ?? internalValue;
  const [position, setPosition] = useState<DockPosition>({ left: 0, width: 0 });
  const [docking, setDocking] = useState(false);
  const itemRefs = useRef(new Map<string, HTMLElement>());
  const listRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  const measure = () => {
    const list = listRef.current;
    const active = itemRefs.current.get(activeValue);
    if (!list || !active) return;
    const bounds = list.getBoundingClientRect();
    const activeBounds = active.getBoundingClientRect();
    setPosition({ left: activeBounds.left - bounds.left, width: activeBounds.width });
  };

  useLayoutEffect(() => { measure(); }, [activeValue, items.length]);
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [activeValue]);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    setDocking(true);
    const timer = window.setTimeout(() => setDocking(false), 620);
    return () => window.clearTimeout(timer);
  }, [activeValue]);

  const select = (nextValue: string) => {
    if (disabled || nextValue === activeValue) return;
    setInternalValue(nextValue);
    onChange?.(nextValue);
    onValueChange?.(nextValue);
  };

  const keyboardMove = (event: React.KeyboardEvent<HTMLElement>, index: number) => {
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
  const containerProps = mode === "navigation" ? { "aria-label": "ForgeX3D navigation" } : { role: "tablist", "aria-label": "ForgeDock tabs" };
  return React.createElement(
    container,
    { className: `forge-dock${mode === "navigation" ? " forge-dock-navigation" : ""} ${className}`, ...containerProps },
    React.createElement("div", { className: "forge-dock-list", ref: listRef },
      items.map((item, index) => {
        const common = {
          key: item.value,
          ref: (node: HTMLElement | null) => { if (node) itemRefs.current.set(item.value, node); else itemRefs.current.delete(item.value); },
          className: `forge-dock-trigger${item.value === activeValue ? " is-active" : ""}`,
          onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => keyboardMove(event, index),
        };
        if (mode === "navigation") {
          return React.createElement("a", { ...common, href: item.disabled || disabled ? undefined : item.href, "aria-current": item.value === activeValue ? "page" : undefined, "aria-disabled": item.disabled || disabled ? true : undefined, onClick: (event: React.MouseEvent<HTMLAnchorElement>) => { if (item.disabled || disabled) event.preventDefault(); else select(item.value); } }, item.label);
        }
        return React.createElement("button", { ...common, type: "button", role: "tab", "aria-selected": item.value === activeValue, tabIndex: item.value === activeValue ? 0 : -1, disabled: item.disabled || disabled, onClick: () => select(item.value) }, item.label);
      }),
      React.createElement("span", { className: `forge-dock-indicator${docking ? " is-docking" : ""}`, "aria-hidden": true, style: { left: `${position.left + position.width / 2}px`, width: `${Math.max(position.width, 1)}px` } },
        React.createElement("span", { className: "forge-dock-rail" }),
        React.createElement("span", { className: "forge-dock-housing" }),
        React.createElement("span", { className: "forge-dock-module" }),
      ),
    ),
  );
}
