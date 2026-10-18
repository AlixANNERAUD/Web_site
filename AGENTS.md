# Repository instructions — alix.anneraud.fr

This is the **single source of truth** for coding agents. `CLAUDE.md`, `GEMINI.md`, and `.github/copilot-instructions.md` remain Git symlinks to this file.

## Architecture

- This is a **statically generated Astro 7 portfolio** (not VitePress). Do not introduce a server or another framework without an explicit request.
- English routes are at `/`, French routes under `/fr/`. Route compatibility and canonical/alternate links matter: `build.format: "preserve"` preserves `.html` output.
- `src/layouts/BaseLayout.astro`: global HTML, accessible navigation, theme toggle, SEO, analytics, locale switch.
- `src/pages/`: file-based routes; `src/pages/{fr/,}projects/[slug].astro` renders 52 entries from the typed collection in `src/content.config.ts`.
- `src/content/projects/{en,fr}/`: one `.md` or `.mdx` page per project in each locale. MDX is reserved for components such as architecture diagrams and Xila demo. Do not restore the removed archive routes.
- `src/data/portfolioProjects.ts`, `experiences.ts`, `skills.ts`: bilingual metadata, rankings, content and evidence.
- `src/components/`: Vue components, with reusable `EditorialHero`, `EditorialSectionHeading`, `EditorialCard`, `EditorialNext` and `TechnologyTags`; Astro components `HomeHero` and `HomeExperience` keep the homepage static where possible.
- **Experience timeline**: recent cards are visible by default; older cards are grouped behind an accessible section-level toggle. Mark earlier roles with `earlier: true` in `src/data/experiences.ts` (including Corporate Relations Assistant). Do not truncate individual card descriptions to implement “show more”; `ExperienceTimeline.vue` owns the complete reusable card layout.
- **Homepage intro**: `HomeHero.astro` is a full-viewport typographic introduction, with CSS-only staggered motion and a career scroll cue; do not restore the pixel portrait, introduce hero-only client JS, or ignore `prefers-reduced-motion`.
- **Homepage hierarchy**: professional overview before diverse featured projects, then the Xila-only technical deep dive. Keep all four professional roles data-driven from `experiences.ts`, and never suggest the Xila architecture visualization maps the user’s entire experience.
- `src/styles/`: responsive styling, motion and VitePress-compatible color tokens retained for the Vue islands.
- `public/`: images, robots.txt and GitHub Pages CNAME.
- CI/deploy under `.github/workflows/`, content and built HTML validation under `scripts/`.

## Code and content guidance

1. Maintain FR/EN parity, truthful public claims, correct metadata, canonical URLs and `hreflang`.
2. Every project added to `portfolioProjects.ts` requires one entry under **both** `src/content/projects/en/` and `src/content/projects/fr/` with `title`, `description`, and exactly one H1.
3. Prefer plain Astro / Markdown for static content. Only apply Vue hydration (`client:load`, `client:visible`, `client:idle`) where interactivity is necessary; do not hydrate the Skills showcase or static diagrams.
4. Reuse the existing Vue editorial primitives; preserve keyboard focus, reduced motion, mobile layout, theme tokens and SSR-visible content.
5. Never include secrets, proprietary employer source, personal records or fabricated performance/usage metrics in public pages.
6. Preserve original logo attribution (legal notices); don't copy third-party brand assets without rights. Keep the fallback initials if a remote logo fails.
7. Do not resurrect a `docs/` folder or old VitePress `.vitepress/` files.
8. Treat the current source and CI as authoritative; avoid overwriting work in other PRs. Open PRs rather than pushing directly to `main` unless explicitly asked.

## Build and verification

```sh
npm ci
npm run validate:portfolio
npm run build
npm run verify:static
npm run format:check
```

`npm run dev` starts Astro locally; `npm run preview` previews the static `dist/` output. Both English and French pages must be server-rendered correctly. Browser audit workflow may be launched when visual or hydration regressions are suspected.
