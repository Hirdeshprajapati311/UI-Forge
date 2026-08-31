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
];

export function getComponentBySlug(slug: string) {
  return components.find((component) => component.slug === slug);
}
