# Agent instructions — Alix ANNERAUD portfolio

This is the **single source of truth** for coding agents working in this repository. Claude, Gemini and Copilot compatibility files are symbolic links to this file. **Edit `AGENTS.md` only**; do not replace an alias with a duplicated Markdown document.

## Project and scope

- This repository builds the public, bilingual portfolio at https://alix.anneraud.fr.
- It uses **VitePress 1.x, Vue 3, TypeScript, Tailwind CSS 4 and scoped CSS**; GitHub Pages hosts the generated static site. Do not migrate frameworks or introduce a backend unless explicitly requested.
- Prioritize maintainable, accessible, responsive, fast-loading pages. Prefer small improvements to large rewrites.
- Treat current source files as authoritative. Do not rely on stale public-site caches or earlier descriptions of the repository.

## Repository map

- `src/en/`: English content, published at the root (`/`); **do not** build links under `/en/`.
- `src/fr/`: French content, published under `/fr/`. Keep navigation, headings and meaningful copy synchronized across both languages.
- `.vitepress/config.mts`: routes, locale rewrites, Vite integration and site configuration.
- `.vitepress/seo.mts`: canonical URLs, `hreflang`, Open Graph and structured metadata.
- `.vitepress/theme/index.ts`: Vue component auto-registration.
- `.vitepress/theme/components/`: project explorer, experience timeline, SVG/WebGL, Xila browser demo and other Vue UI.
- `.vitepress/theme/components/Editorial*.vue` and `TechnologyTags.vue`: reusable hero, section headings, CTA, card surface and technology chips shared by three showcase pages.
- `.vitepress/theme/style.css`: shared `.editorial-page` layout and global design tokens; avoid duplicating these in page-specific scoped CSS.
- `.vitepress/theme/data/portfolioProjects.ts`: typed bilingual project metadata, group/category filters and detail URL logic.
- `.vitepress/theme/data/experiences.ts`: bilingual professional and education timeline.
- `.vitepress/theme/data/skills.ts`: bilingual technical domains, language proficiencies and links to supporting project pages; rendered through `SkillsShowcase.vue`.
- `src/{en,fr}/projects/<project-id>.md`: **one standalone page per catalogue project per language**. The three highlighted projects include deeper case studies. No archive pages or `docs/` folder should be introduced.
- `src/public/`: public static assets. `.vitepress/dist/` and `.vitepress/cache/` are generated.
- `scripts/`: project validation and built-HTML SEO checks.
- `.github/workflows/`: PR CI, optional browser audit and GitHub Pages deployment.

Read the adjacent code and the root `README.md` before editing a subsystem; do not guess APIs, files or integrations.

## Editing content

1. **Keep FR and EN consistent.** Whenever project, experience, title, navigation or SEO text changes, update its counterpart. Preserve route parity and existing deep links.
2. **Use the typed data sources.** Add project metadata in `portfolioProjects.ts`, then write a corresponding dedicated Markdown page in **both** `src/en/projects/` and `src/fr/projects/`. Never link back to the removed archives. For career content, update `experiences.ts` rather than duplicating entire timelines in Markdown.
3. **Do not add duplicate titles.** Pages using the full-width catalogue or experience Vue components should have exactly one rendered H1; their Markdown wrappers must not add another.
4. **Verify public claims.** Do not invent employment achievements, dates, performance metrics, rankings, customer outcomes, or project status. Avoid confidential employer details, credentials and client data. Prefer links to the relevant source repository or documentation.
5. **Preserve brand provenance.** For organization logos, use verified assets, preserve proportions, give required credit and keep a readable fallback. Never fabricate a logo.
6. **Keep page metadata correct.** Update localized titles/descriptions, canonical and `hreflang` behavior where needed. Do not break VitePress's `src/en` → root rewrite.

## Frontend and performance

- Use `EditorialHero`, `EditorialSectionHeading`, `EditorialNext`, `EditorialCard` and `TechnologyTags` for shared UI; keep domain-specific content and interactions in the individual showcase components. Do not reintroduce duplicate CSS for these primitives.
- Favor existing Vue components and small, idiomatic TypeScript changes. Use the project's current styling conventions rather than introducing a new UI framework.
- Respect `prefers-reduced-motion`. Interactive graphics need an accessible, meaningful static fallback; keyboard navigation, focus styles, contrast and text alternatives matter.
- Keep WebGL/browser demos optional and lazy-loaded. Stop animation when invisible, release listeners/GPU resources on teardown, and avoid loading a large WASM artifact before user interaction.
- Treat remote Xila demos, OPFS, cross-origin iframes and browser security headers as external constraints. Do not bypass origin isolation or delete user-created browser data.
- Avoid new runtime dependencies for effects that can be implemented with CSS, existing components or browser APIs.

## Commands and validation

Use a current Node.js LTS release and npm, from the repository root:

```sh
npm ci
npm run validate:portfolio
npm run docs:build
npm run verify:static  # requires the completed build
npm run format:check
```

- `npm run docs:dev` starts the development server; `npm run docs:preview` previews the production build.
- `npm run check` combines formatting, project validation and build.
- Follow existing Prettier conventions: LF, 2 spaces, double quotes and semicolons for applicable code.
- PR CI is in `.github/workflows/ci.yml`; deployment happens on `main` through `.github/workflows/deploy.yml`. The optional Playwright audit is `.github/workflows/browser-audit.yml`.
- If a check cannot be run, say so in the PR. Never claim a browser test, performance score or build is passing without evidence. Avoid unrelated whole-repo formatting changes.

## Git and agent workflow

- Prefer focused commits and reviewable PRs. Inspect the current branch and open changes before editing.
- Do not push directly to `main`, merge PRs, publish, or make sweeping dependency/architecture changes unless asked.
- Do not modify generated `.vitepress/dist/`, lockfiles without dependency changes, secrets, external deployments, or unrelated projects.
- When finishing, summarize files changed, verification performed, any remaining risks, and the PR link.

## Cross-agent aliases

These paths must remain **real Git symlinks** (mode `120000`):

- `CLAUDE.md` → `AGENTS.md` (Claude Code).
- `GEMINI.md` → `AGENTS.md` (Gemini CLI).
- `.github/copilot-instructions.md` → `../AGENTS.md` (GitHub Copilot).

Codex, OpenCode and other agents capable of reading `AGENTS.md` should use it directly; do not create redundant copies. On Windows, Git may require symbolic-link support (`core.symlinks=true` / Developer Mode); when links cannot be resolved, read `AGENTS.md` explicitly.
