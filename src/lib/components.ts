export type ComponentCategory = "Buttons" | "Cards" | "Text";

export interface ComponentMeta {
  name: string;
  slug: string;
  description: string;
  category: ComponentCategory;
  featured?: boolean;
}

export const components: ComponentMeta[] = [
  {
    name: "Magnetic Button",
    slug: "magnetic-button",
    description: "A button that subtly follows the user's cursor.",
    category: "Buttons",
  },
  {
    name: "Spotlight Card",
    slug: "spotlight-card",
    description: "A card with a dynamic spotlight that follows the cursor.",
    category: "Cards",
  },
  {
    name: "Gradient Text",
    slug: "gradient-text",
    description: "Beautiful gradient typography for modern interfaces.",
    category: "Text",
  },
  {
    name: "Focus Lens",
    slug: "focus-lens",
    description: "A moving focus window that keeps the content under your cursor crisp.",
    category: "Text",
  },
  {
    name: "Magnetic Text Trail",
    slug: "magnetic-text-trail",
    description: "Responsive typography where nearby characters lean toward your cursor.",
    category: "Text",
  },
  {
    name: "Perspective Stage",
    slug: "perspective-stage",
    description: "An interactive 3D stage for layered content and product scenes.",
    category: "Cards",
  },
  {
    name: "Runaway Button",
    slug: "runaway-button",
    description: "A playful button that gently dodges the pointer until a condition is met.",
    category: "Buttons",
  },
  {
    name: "Guarded Action",
    slug: "guarded-action",
    description: "A deliberate hold-to-confirm control for potentially destructive actions.",
    category: "Buttons",
  },
];

export function getComponentBySlug(slug: string) {
  return components.find((component) => component.slug === slug);
}
