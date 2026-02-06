// @ts-check
import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://wortech.pl",
  output: "server",
  adapter: netlify({
    edgeMiddleware: true,
  }),
  vite: {
    plugins: [tailwindcss()],
  },
});
