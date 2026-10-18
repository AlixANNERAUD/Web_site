# ADR 0001 — Keep VitePress for the portfolio (review after measurements)

**Status:** provisional decision · **Date:** 2026-10-18 · **Related issue:** #68

## Context

The portfolio is already an internationalized **VitePress 1.6 + Vue 3** static
site hosted on GitHub Pages. Its current code includes:

- FR/EN home, skills, experience, resume, legal notices and project pages.
- A shared typed catalogue of **27 projects** and localized descriptions.
- Six in-depth case-study pages, searchable filters and Vue components.
- Static generation, a sitemap, deployment automation and CI.
- Incrementally developed accessible project diagrams and WebGL/WASM work,
  all possible without migrating the site framework.

Florent Tariolle's portfolio uses Astro and demonstrates that a lightweight,
highly designed portfolio is possible without React/Vue. That does not prove
Astro is required for an equivalent design.

## Options considered

| Criterion | Keep VitePress/Vue | Rebuild in Astro (+ optional Vue islands) |
| --- | --- | --- |
| Visual design freedom | Custom Vue theme, CSS and client components already work | Excellent with page-specific Astro layouts |
| Static output and indexing | Built-in SSG, sitemap and Markdown | Built-in SSG; SEO must be reconfigured |
| Existing localized content | Already implemented | Markdown routes, layouts, rewriting and language switch migrate |
| Structured project catalogue | Direct import from TypeScript | POC proves same TypeScript can be imported directly |
| Client-side filtering | Existing Vue component | Vanilla JS, Astro island or Vue hydration |
| WebGL demo | Lazy-imported WebGL enhancement works within VitePress | Equivalent lazy component possible |
| Xila WASM demo | Optional iframe/new-tab CTA already works in Vue | Equivalent embedding; browser isolation unchanged |
| Content editing | Current Markdown and component syntax | Must decide Markdown/MDX/content collections and migrate components |
| GitHub Pages | Existing release workflow | New release workflow and route validation |
| Maintenance risk | Incremental refactoring | Broader regression surface during a rewrite |

## Independent POC

See `experiments/astro-poc/`, which contains two static Astro 7 landing pages
with FR/EN strings and the three featured projects **imported from the current
VitePress TypeScript source**. The experiment does not use Vue.

A dedicated CI workflow (`.github/workflows/astro-poc.yml`) builds both sites
under Node 24 and prints file counts, total HTML/CSS/JS asset bytes and
homepage HTML/gzip size. The workflow output is the source of truth for
**actual measured artifact sizes**. Do not substitute the earlier descriptive
estimates.

This is **not** an apples-to-apples performance comparison: the Astro POC has
only two pages, no existing Vue filters, case-study navigation, resume PDF,
theme switcher or full routing; the VitePress build emits the whole portfolio.
The POC is intentionally isolated and is **not deployed**.

## Decision

**Keep VitePress for production for now.** The observed blockers so far were
design and missing content presentation, not framework incompatibility.
Astro would provide more control over static-first composition but does not
automatically improve the information architecture or visual design.

Revisit migration only if one or more are demonstrated with reproducible
data:

1. VitePress/Vue hydration or bundle cost materially harms mobile CWV
   after targeted code splitting and theme improvements.
2. Portfolio information architecture requires patterns that are
   demonstrably simpler to maintain as Astro pages/content collections.
3. A *feature-complete* Astro pilot provides sufficient benefits to justify
   migration and long-term maintenance, with FR/EN, SEO, case studies and
   deployment parity.

## Follow-up and rollback

- Run real mobile/desktop Lighthouse, aXe and Firefox/Chromium tests (issue #66).
- Keep the POC branch out of production; a decision to migrate requires a
  separate plan and stakeholder review.
- If a future migration is approved, preserve page URLs, localized content,
  deep links, metadata, GitHub Pages settings, search/filter interactions and
  Xila demo constraints.
