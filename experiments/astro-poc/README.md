# Astro vs VitePress: isolated proof of concept

This experiment **does not replace the website** and does not affect the
root `npm ci`, VitePress production routes, or GitHub Pages.

It reproduces a bilingual home hero and three highlighted project cards.
The portfolio metadata comes directly from
`.vitepress/theme/data/portfolioProjects.ts` (single source of truth).

## Run

From the repository root, using Node 24:

```sh
npm ci
npm run docs:build
npm install --prefix experiments/astro-poc
npm run build --prefix experiments/astro-poc
node experiments/astro-poc/measure.mjs
```

The same steps are run by `.github/workflows/astro-poc.yml`. The POC only
produces two landing pages, so **whole-site output totals are not fairly
comparable**. The CI logs contain measured HTML/gzip and artifact sizes.
Consult `docs/adr/0001-portfolio-framework.md` for the current decision.
