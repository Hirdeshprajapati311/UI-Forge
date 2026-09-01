import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const components = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/components",
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const forge3d = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/forge3d",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const forge3dui = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/forge3dui",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  components,
  forge3d,
  forge3dui,
};
