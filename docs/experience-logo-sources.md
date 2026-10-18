# Organization logos on the experience timeline

Company and institution marks are displayed solely to identify organizations
associated with portfolio experiences. They do **not** imply sponsorship,
partnership, or endorsement. Logos and trademarks remain the property of their
respective owners.

The portfolio currently uses remote image URLs; original graphics are **not**
vendored into this repository. The visible company name is separate from the
image. If an image fails, the card shows a text monogram. All logos use
`object-fit: contain` without alteration.

| Experience | Asset used | Source and notes |
| --- | --- | --- |
| Memo Bank | [White wordmark](https://memo.bank/logo-footer.svg) | [Official Memo Bank press assets](https://memo.bank/presse/). Displayed against a dark tile. |
| Linkt | [Navy wordmark](https://www.linkt.fr/wp-content/uploads/2026/05/logo-linkt-bleu-marine.svg) | [Official Linkt website](https://www.linkt.fr/qui-sommes-nous/). **Direct asset availability/hotlinking has not been independently verified**; fallback initials remain available. |
| Amazon | [Amazon wordmark](https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg) | Wikimedia Commons. Brand identifier, not a license for redistribution. |
| New York University | [NYU short violet logo](https://upload.wikimedia.org/wikipedia/commons/6/6a/Nyu_short_color.svg) | [Commons original file/attribution](https://commons.wikimedia.org/wiki/File:Nyu_short_color.svg) and [NYU logo guidance](https://engineering.nyu.edu/marketing-and-communications/identity-guide/logos-lockups). |
| INSA Rouen Normandie (two entries) | [INSA Rouen Normandie logo](https://upload.wikimedia.org/wikipedia/commons/f/f0/Logo_INSA_RN.jpg) | [Commons attribution](https://commons.wikimedia.org/wiki/File:Logo_INSA_RN.jpg). Credited to INSA Rouen Normandie, Service communication, CC BY-SA 4.0. |
| Centre Henri Becquerel | [Becquerel logo](https://www.becquerel.fr/wp-content/uploads/2022/10/logo-becquerel-blanc_tournant.jpg) | [Official press kit](https://www.becquerel.fr/le-centre/decouvrir-le-centre/espace-presse/) and [logo announcement](https://www.becquerel.fr/2022/08/19/le-logo-du-centre-henri-becquerel-evolue/). |

**INSA logo attribution:** © / Author: Service communication INSA Rouen
Normandie, licensed under [Creative Commons Attribution-ShareAlike 4.0](https://creativecommons.org/licenses/by-sa/4.0/);
shown unmodified. Brand and trademark restrictions can still apply.

## Design and availability

- Brand artwork is displayed in a neutral light tile except where a white
  wordmark explicitly requires a dark tile.
- Images are lazily loaded, decorative for assistive technologies
  (`alt=""`) because the organization name is written beside them.
- JavaScript `error` handling switches to the correct textual monogram
  whenever a logo fails to download.
- Requests to remote image hosts are sent when a visitor scrolls to an
  experience. A browser can reject hotlinks, third-party image resources or
  SVG content; the monogram is the intended fallback, not an error state.
- If the brand owner provides an approved downloadable original, move the
  logo to `src/public/images/organizations/` and point the `logo` field
  in `.vitepress/theme/data/experiences.ts` at its local URL. Preserve
  licensing notices.

## Outstanding browser checks

An HTML build check confirms that experience cards contain the image markup,
but **does not confirm remote HTTP status or visual readability**. Before
claiming complete verification, review the published page on mobile and
desktop, including light/dark theme, and confirm network responses for every
logo (especially Linkt). No real-browser logo loading test was executed here.
