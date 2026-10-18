import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// One bilingual page per project; Astro renders standard Markdown or MDX
// while validating frontmatter at build time.
const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { projects };
