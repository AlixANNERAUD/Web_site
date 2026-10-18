# Organization logos used in the experience timeline

Company and institution logos appear next to the corresponding experience for **identification only**. Their appearance does not imply that the organization sponsors, endorses or is affiliated with this portfolio.

The original marks are never recolored, redrawn, cropped or stretched. The UI uses a neutral white tile, except for the white Memo Bank wordmark, which appears on a dark tile. The organization name remains text beside the logo for accessibility.

The images are **linked directly to publicly accessible, owner-published assets or Wikimedia Commons** rather than copied into the repository. Remote assets may change or prohibit hotlinking; on image load errors the UI automatically displays a readable initial/monogram. This approach does not eliminate third-party requests.

| Organization | Public asset | Provenance |
| --- | --- | --- |
| Memo Bank | [White SVG](https://memo.bank/logo-footer.svg) | [Official Memo Bank website / media kit](https://memo.bank/presse/) |
| Linkt | [Navy SVG](https://www.linkt.fr/wp-content/uploads/2026/05/logo-linkt-bleu-marine.svg) | [Official Linkt page](https://www.linkt.fr/qui-sommes-nous/) (displays the logo); URL from its own page |
| Amazon | [Amazon SVG](https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg) | Wikimedia Commons, Amazon wordmark |
| New York University | [NYU SVG](https://upload.wikimedia.org/wikipedia/commons/6/6a/Nyu_short_color.svg) | [Wikimedia Commons: Nyu short color.svg](https://commons.wikimedia.org/wiki/File:Nyu_short_color.svg), source credited to NYU |
| INSA Rouen Normandie | [INSA Rouen JPEG](https://upload.wikimedia.org/wikipedia/commons/f/f0/Logo_INSA_RN.jpg) | [Wikimedia Commons: INSA Rouen logo](https://commons.wikimedia.org/wiki/File:Logo_INSA_RN.jpg) |
| Centre Henri Becquerel | [Becquerel JPEG](https://www.becquerel.fr/wp-content/uploads/2022/10/logo-becquerel-blanc_tournant.jpg) | [Centre Henri Becquerel press resources](https://www.becquerel.fr/le-centre/decouvrir-le-centre/espace-presse/) |

**INSA Rouen attribution:** “Logo INSA RN”, Service communication INSA Rouen Normandie, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) (as distributed by Wikimedia Commons); unmodified. The NYU SVG is described on Commons as a simple logo ineligible for copyright, but trademarks and brand guidelines still apply.

All other wordmarks remain the intellectual property of their organizations. In particular, [Memo Bank's terms](https://memo.bank/mentions-legales/) restrict reproduction and use of protected branding. Do not copy or redistribute their artwork in the Git repository without appropriate authorization; verify suitability before publication.

## Browser verification checklist

- Open `/experiences` and `/fr/experiences`; confirm **seven** timeline entries (including two for INSA) display the correct brand marks.
- Inspect Network/Console for broken links or content-security policy issues. A working build **cannot validate remote image availability**.
- Verify white Memo Bank artwork has sufficient contrast on its dark tile.
- Check small screens (320–375px) and dark/light themes: marks must remain inside their frame, with company names and dates legible.
- Simulate an image failure in devtools and confirm the monogram fallback appears without a broken-image icon.
- Check keyboard navigation and screen reader output: organization name is announced once, logo treated as decorative.
- If a logo is removed from the source website, replace it with another verified owner asset, and update this document. Do not draw an imitation.

The `logo` and `logoOnDark` metadata live in `.vitepress/theme/data/experiences.ts`; the markup lives in `.vitepress/theme/components/ExperienceShowcase.vue`.
