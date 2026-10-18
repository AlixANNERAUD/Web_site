# Portfolio quality audit — 2026-10-18

Scope: `AlixANNERAUD/Web_site`, current VitePress source, FR/EN routes and CI. This report
distinguishes **verified source-level facts** from testing that still requires a real
browser. It does **not** claim a Lighthouse or assistive-technology audit.

## Changes implemented in this branch

- Adds locale-aware canonical URLs, `hreflang` and `x-default` links on paired pages.
- Adds Open Graph/Twitter metadata per page and a Person JSON-LD record on home pages.
- Adds specific descriptions to localized home/resume frontmatter.
- Makes project catalogue landmarks, technology labels and empty-state announcements
  accurate in both languages.
- Adds `npm run verify:static` to the GitHub Actions build. It checks **generated HTML**
  for canonical paths, translated alternates, and SEO tags on ten FR/EN pages.

## Observations and risks

| Area | Source-level evidence | Status |
| --- | --- | --- |
| CI | `.github/workflows/ci.yml` runs `npm ci`, data validation and `vitepress build` | Checked; static SEO smoke test added |
| FR/EN | `src/fr` and `src/en`; VitePress rewrite of English locale to root | Verified in configuration |
| Canonical/hreflang | No consistent per-page metadata found before this PR | Implemented and covered by build test |
| SEO social cards | Existing per-page Open Graph/Twitter declarations were not present | Implemented |
| Accessibility | Project filters expose `aria-pressed` and search labels; some labels were not localized | Corrected at source |
| Responsive | Cards and filters have breakpoints at 850/600px; no physical viewport test conducted | Further browser testing required |
| WebGL demo | Xila demonstrations live on a different origin; embedding headers not independently verified | Covered separately by #64 |
| Route reachability | A web crawler served old HTML for several pages, including the former student homepage; newer GitHub source differs | **Do not assume current production is stale** without comparing live response headers/deployment artifacts |

## Verification plan remaining

- Desktop Firefox and Chromium, light/dark themes, at 320/375/768/1024/1440px.
- Keyboard-only usage (tab order, project filters, PDF link, Xila demo) and a screen reader.
- WCAG AA contrast assessment with real computed CSS values.
- Run Lighthouse/axe on deployed pages; record LCP, CLS, total JS payload, and scores **before
  and after** (none are invented here).
- Check all navigation routes directly over HTTP, including extensionless URLs vs
  generated `.html` variants and GitHub Pages 404 behavior.
- Inspect actual `<head>` metadata in production, including canonical/hreflang and
  structured data; ensure no `.md` or `src/en` leaks into published URLs.
- Validate resume PDF readability and browser fallback on mobile.

The GitHub Actions smoke test catches **build-output regressions** but cannot replace
these runtime checks. Keep issue #66 open until the browser measurements are recorded.
