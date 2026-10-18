# Xila topology animation — design, performance and fallback

## Architecture accuracy

This is a **conceptual** map, not a live system trace. Its six nodes represent:

1. Hardware / target **drivers**
2. Portable **Rust kernel and runtime services**
3. **WASM execution boundary / bindings**
4. User-facing **applications**
5. **Virtual filesystem (VFS) / storage** services
6. **LVGL graphics** services

These correspond to the module/crate/driver/executable boundaries documented at
[xila.dev/explanation/architecture/components](https://www.xila.dev/explanation/architecture/components).
Edges illustrate collaboration, not literal call counts, scheduling or network traffic.

## Runtime budget implemented

- No Three.js or extra NPM dependency; uses only WebGL2 APIs.
- `xilaTopologyWebgl.ts` is loaded by **dynamic import only on the homepage** when
  the figure enters the viewport.
- One small shader program, one vertex buffer, six nodes and seven connecting edges.
- The animation is capped to **30 frames per second** and device-pixel ratio 1.75.
- Stops rendering if the section leaves the viewport, if the tab becomes hidden,
  or if the user requests reduced motion.
- An interactive pointer offset is limited to ±0.012 clip-space units.
- Disposes observers, frame callbacks and GPU resources on unmount.
- On mobile/small viewports, `prefers-reduced-motion`, WebGL unavailability or
  context loss, the HTML page retains a **static, accessible SVG diagram**.
- An accessible description is always present in `figcaption`.

## Smoke and profiling protocol before marking #63 complete

1. In Chrome and Firefox desktop, open both localized homepages and verify no
   animation when `prefers-reduced-motion: reduce` is enabled.
2. Confirm `xilaTopologyWebgl.ts` only downloads once the diagram enters view.
   Other portfolio pages must not load the WebGL helper.
3. On mobile at 320, 375, 390 and 720px, verify the static SVG and labels
   are readable without horizontal overflow.
4. Use DevTools Performance/GPU to capture actual frame cadence, CPU/GPU time,
   memory, and JS transfer size on both browsers. Compare against a build
   without the component for LCP, CLS and total JS.
5. Scroll the diagram out of view and switch to another tab: verify animation
   frames stop; switch back and verify they resume.
6. Check the keyboard and screen-reader semantics of the diagram; all technical
   meaning must be recoverable without graphics or animation.
7. Test WebGL disabled/failed and a context-loss simulation to verify SVG fallback.

**No actual browser FPS, CPU, energy or Lighthouse metrics have been obtained
in this environment.** A green static build is not a substitute for those checks.
