import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://alix.anneraud.fr",
  output: "static",
  trailingSlash: "ignore",
  build: { format: "preserve" },
  integrations: [vue(), mdx(), sitemap()],
});
