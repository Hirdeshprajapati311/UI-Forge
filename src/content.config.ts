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

export const collections = {
  components,
};
