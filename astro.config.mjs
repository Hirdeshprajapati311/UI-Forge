// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://forgexui.com",
  integrations: [react({ exclude: /\.tsx$/ }), mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
