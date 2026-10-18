# Xila browser demonstration integration

## Source of truth

The portfolio **does not bundle** the Xila browser app, storage image, or WASM artifacts.
The separately deployed demonstration currently linked from [xila.dev](https://www.xila.dev/) is:

- `https://documentation.xila.dev/demonstrations/wasm/en/`

The portfolio uses this HTTPS URL as a constant in
`.vitepress/theme/components/XilaBrowserDemo.vue`. If the Xila demonstration
changes hosts, update this constant and verify the new destination before shipping.

The available browser example exposes a disk chooser ("Use selected disk", "New disk",
"Remove") and uses browser storage. Users must manage deletion/reset **inside the
demonstration**. The portfolio deliberately has **no** "reset disk" button.

## UX and security boundaries

- Static HTML/CSS is visible before interaction. No iframe, network request, or
  WASM payload is mounted until a visitor clicks **Try embedded**.
- The primary CTA opens the Xila demonstration in a separate tab with
  `rel="noopener noreferrer"`; this is the recommended path.
- The optional iframe is explicitly labeled **experimental**, uses a sandbox with
  the capabilities required by the interactive application, and carries an
  external fallback link.
- Cross-origin embedding can fail even if an iframe `load` event fires:
  `X-Frame-Options`, CSP `frame-ancestors`, COOP/COEP or third-party storage
  restrictions may prevent startup. A loaded iframe is not proof of a working OS.
- OPFS and other browser storage are **origin-scoped**. Embedding the demo does
  not transfer or erase the user's saved disks; browsers may partition or deny
  storage in third-party contexts.
- The demonstration can use WebAssembly, Web Workers, and browser-specific
  functionality. The portfolio neither tries to relax browser isolation nor to
  proxy the demo via GitHub Pages.
- No cross-origin messages or credentials are read by the portfolio.

## Deployment and smoke-test checklist

1. Open each localized case study at `/fr/projects/xila` and `/projects/xila`
   without clicking anything. Verify the browser's Network tab contains no
   request to the demonstration origin.
2. Click the **external** link and confirm that the disk chooser and an
   actual runnable example work on desktop Firefox and Chromium.
3. Try the experimental iframe and verify its fallback remains accessible,
   even when browser security prevents loading the demonstration.
4. Verify narrow/mobile layouts, keyboard focus, screen readers and contrast.
5. Create a *throwaway* disk in the demonstration, reload and verify persistence
   only if the browser permits OPFS in that context. Never delete existing disks
   as part of this test.
6. Confirm the demo host's `Content-Security-Policy`, `X-Frame-Options`,
   `Cross-Origin-Opener-Policy`, and `Cross-Origin-Embedder-Policy` in browser
   devtools. These response headers **have not yet been independently verified**.
7. If actual cross-origin embedding is disallowed, remove the experimental
   iframe CTA; retain the lazy external demonstration link.

The GitHub Actions build ensures the Vue component compiles, **not** that
the third-party demo is accessible or functioning.
