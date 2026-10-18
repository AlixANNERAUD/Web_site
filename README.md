# Alix ANNERAUD — Portfolio

<p align="center">
  <strong>From kernel to browser.</strong><br />
  Software engineering · Rust systems · Embedded software · Security
</p>

<p align="center">
  <a href="https://alix.anneraud.fr/">Live portfolio</a>
  · <a href="https://alix.anneraud.fr/projects">Explore projects</a>
  · <a href="./README.fr.md">Lire en français 🇫🇷</a>
</p>

<p align="center">
  <a href="https://github.com/AlixANNERAUD/Web_site/actions/workflows/ci.yml">
    <img alt="Portfolio CI" src="https://github.com/AlixANNERAUD/Web_site/actions/workflows/ci.yml/badge.svg" />
  </a>
  <a href="https://github.com/AlixANNERAUD/Web_site/actions/workflows/deploy.yml">
    <img alt="GitHub Pages deployment" src="https://github.com/AlixANNERAUD/Web_site/actions/workflows/deploy.yml/badge.svg" />
  </a>
</p>

---

The source code for [alix.anneraud.fr](https://alix.anneraud.fr/), my personal portfolio. It highlights the engineering behind my work—not just a list of technologies—from **[Xila](https://www.xila.dev/)**, a Rust-based operating system, to web applications, embedded libraries, research and self-hosting.

The website is statically generated and intentionally stays on **VitePress + Vue 3**. Richer features are progressive enhancements, so the main content remains available as HTML.

## What you'll find

| Section | What's inside |
| --- | --- |
| **[Selected work](https://alix.anneraud.fr/)** | An editorial homepage, animated Xila architecture illustration and featured projects |
| **[Project catalogue](https://alix.anneraud.fr/projects)** | Search and filters for personal, open-source, competitive and academic projects |
| **[Engineering case studies](https://alix.anneraud.fr/projects/xila)** | Technical decisions, constraints and trade-offs behind Xila, [Mini Train Store](https://alix.anneraud.fr/projects/mini-train-store) and [Infrastructure](https://alix.anneraud.fr/projects/infrastructure) |
| **[Experience](https://alix.anneraud.fr/experiences)** | An editorial career timeline featuring professional experience and education |
| **[Skills](https://alix.anneraud.fr/skills)** | Evidence-based technical skills connected to real projects |

The same pages are also available [in French](https://alix.anneraud.fr/fr/). The Xila case study includes an optional, user-triggered [browser demonstration](https://alix.anneraud.fr/projects/xila) hosted separately from this website.

## Stack

- **VitePress 1.x** for Markdown, static generation, routing and GitHub Pages.
- **Vue 3 + TypeScript** for project discovery, experience timeline, diagrams and interactive components.
- **Tailwind CSS 4 + scoped CSS** for responsive styling and theme-aware components.
- **Lucide icons** and a small, lazy-loaded **WebGL2** visual enhancement.
- **GitHub Actions** for build checks, content validation and deployment.

No backend or database is required for the portfolio itself.

## Run locally

Use a current Node.js LTS release and npm:

```sh
git clone https://github.com/AlixANNERAUD/Web_site.git
cd Web_site

npm ci
npm run docs:dev
```

Then open the local address printed by VitePress.

| Command | Purpose |
| --- | --- |
| `npm run docs:dev` | Start the local development server |
| `npm run docs:build` | Generate the production site in `.vitepress/dist/` |
| `npm run docs:preview` | Preview the generated site |
| `npm run validate:portfolio` | Check IDs, translations, project pages and engineering case studies |
| `npm run verify:static` | Inspect generated HTML for SEO and locale metadata (run after build) |
| `npm run format:check` | Check Prettier formatting |

## Repository guide

```text
.vitepress/
  config.mts                 VitePress configuration and locales
  seo.mts                    Canonical, Open Graph and hreflang metadata
  theme/
    components/              Vue UI: projects, timeline, demos and diagrams
      Editorial*.vue        Reusable hero, section headings, CTA and card
      TechnologyTags.vue     Shared technology chips
    data/
      portfolioProjects.ts   Project metadata (FR/EN)
      experiences.ts         Experience and education entries (FR/EN)
      skills.ts              Bilingual skill domains, project evidence and languages
    style.css                Theme-wide styling
src/
  en/                        English pages
  fr/                        French pages
  public/                    Static assets
scripts/
  validate-portfolio.mjs     Catalogue integrity checks
  check-static-seo.mjs       Generated-page SEO checks
.github/workflows/
  ci.yml                     Pull-request build and validation
  deploy.yml                 GitHub Pages deployment
```

### Editing content

**Project ranking:** the catalogue sorts projects by editorial importance, using four weighted factors (technical depth, originality, practical impact and public evidence); visitors can switch to alphabetical order. The weighting is maintained in [`portfolioProjects.ts`](./.vitepress/theme/data/portfolioProjects.ts) (technical depth 40%, originality 20%, practical impact 25%, public evidence 15%).

**Projects:** add or update an item in [`portfolioProjects.ts`](./.vitepress/theme/data/portfolioProjects.ts) and its **dedicated Markdown page in both languages**: `src/en/projects/<project-id>.md` and `src/fr/projects/<project-id>.md`. The three leading projects include longer architecture case studies. Run `npm run validate:portfolio` afterward.

**Experience:** edit [`experiences.ts`](./.vitepress/theme/data/experiences.ts). Roles, summaries, achievements and dates are localized in one place; both pages use the same timeline component.

**Appearance:** page components live in [`.vitepress/theme/components/`](./.vitepress/theme/components). Prefer native CSS and progressive enhancements; animations should respect `prefers-reduced-motion`, with static fallbacks whenever they convey information.

## Deployment

Every pull request targeting `main` runs [Portfolio CI](./.github/workflows/ci.yml). Changes merged into `main` trigger the separate [GitHub Pages deployment](./.github/workflows/deploy.yml), which publishes `.vitepress/dist/`.

The live domain is **[alix.anneraud.fr](https://alix.anneraud.fr/)**. Analytics and the Xila browser demonstration are external services; they are not part of this repository's build.

## Contact

- [Portfolio](https://alix.anneraud.fr/)
- [GitHub](https://github.com/AlixANNERAUD)
- [LinkedIn](https://www.linkedin.com/in/alix-anneraud/)
- [Email](mailto:alix@anneraud.fr)

This repository contains personal writing, project descriptions and visual assets. Please ask before reusing the author's content or identity.
