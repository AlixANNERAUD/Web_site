# Alix ANNERAUD - Portfolio

**From kernel to browser.** Software engineering · Rust systems · Embedded software · Security

[Live portfolio](https://alix.anneraud.fr/) · [Projects](https://alix.anneraud.fr/projects) · [Français](./README.fr.md)

A bilingual, statically generated engineering portfolio built with **Astro** and small, selectively hydrated **Vue 3 islands**. Project case studies are regular Markdown or MDX entries in a typed content collection.

## Stack

- **Astro 7** generates static HTML, page layouts, routes and localized metadata.
- **Vue 3 + TypeScript** powers only interactive islands: project filters, experience logo fallback, the Xila browser demo and the optional WebGL architecture visualization.
- **MDX** embeds diagrams and Vue islands in the three detailed engineering case studies.
- **Tailwind CSS 4** and scoped Vue/Astro CSS provide the existing responsive editorial UI.
- **GitHub Pages** serves `dist/`; no backend or runtime server is required.

## Work locally

```sh
npm ci
npm run dev              # Astro development server
npm run validate:portfolio
npm run build            # Static output: dist/
npm run verify:static    # Route / SEO / content smoke tests
npm run preview
```

Run `npm run check` (format, types, validation, build and static verification) before merging.

## Project structure

```text
astro.config.mjs          Static site, .html routes, Vue/MDX/sitemap integrations
src/
  components/             Reusable Vue islands and shared editorial components
  content.config.ts       Typed Astro content collection
  content/
    projects/en/          26 English Markdown / MDX case studies
    projects/fr/          26 French Markdown / MDX case studies
    legal/                Bilingual legal notice + third-party logo credits
  data/
    portfolioProjects.ts  Project metadata, rankings, filters
    experiences.ts        Work and education timeline
    skills.ts             Evidence-backed skills and languages
  layouts/BaseLayout.astro  HTML shell, navigation, theme, SEO and language alternates
  pages/                 English routes at /, French routes under /fr/
  styles/                Site design tokens and motion styles
public/                  Images, CNAME and robots.txt
scripts/                 Content and generated-HTML validation
```

**Routes:** English pages appear at the root; French pages under `/fr/`. Existing `/projects/<id>` URLs and the generated `/projects/<id>.html` files remain stable with `build.format = "preserve"`. Every project has a dedicated page in both languages. Removed archive routes stay removed.

**Homepage:** lead with a professional overview (Memo Bank, Linkt, Amazon, NYU), then the selected Xila / Infrastructure / Mini Train Store projects; keep the Xila architecture diagram as an explicitly labelled technical deep dive below the portfolio cards. This section is intentionally statically rendered via Astro, while the animated diagram hydrates only when visible.

**Content editing:** Add metadata to [`portfolioProjects.ts`](./src/data/portfolioProjects.ts) and one file per locale under `src/content/projects/{en,fr}/`. Use `.mdx` only when a component is needed; `ArchitectureFlow` is static, while `XilaBrowserDemo` has `client:load`. Links and project ranking remain data-driven.

**UI editing:** Reuse `EditorialHero`, `EditorialSectionHeading`, `EditorialCard`, `TechnologyTags` and `EditorialNext` rather than duplicating their styles. Astro layouts own the global shell; business logic stays in the Vue showcases.

**Deployment:** `.github/workflows/ci.yml` checks content/build/SEO, and `.github/workflows/deploy.yml` publishes `dist/` to GitHub Pages on pushes to `main`.

## External services

The main site is fully static. Umami analytics is loaded from `s.anneraud.fr`; the Xila browser demo is on a separate origin and only mounted after a click. Third-party logos remain attributed in the legal notices and may fall back to readable initials.
