<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import type { TopologyRenderer } from "./xilaTopologyWebgl";

const props = withDefaults(defineProps<{ lang?: "fr" | "en" }>(), {
  lang: "en",
});

const section = ref<HTMLElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const webglVisible = ref(false);

let renderer: TopologyRenderer | null = null;
let observer: IntersectionObserver | null = null;
let reducedMotion: MediaQueryList | null = null;
let compactLayout: MediaQueryList | null = null;
let mounted = false;
let intersecting = false;
let starting = false;

const content = {
  fr: {
    kicker: "Focus technique - Xila / 03",
    title: "Xila, du matériel aux applications.",
    text: "Un aperçu de l'architecture de Xila : les pilotes relient le matériel aux services Rust, puis à la frontière WebAssembly et aux applications.",
    diagram:
      "Pilotes → services Rust → frontières d'exécution WebAssembly → applications. Les services gèrent également le stockage/VFS et l'interface LVGL.",
    explore: "Lire l'étude de cas Xila",
  },
  en: {
    kicker: "Technical deep dive - Xila / 03",
    title: "Inside Xila: from drivers to apps.",
    text: "A glimpse of Xila's architecture: drivers connect hardware to Rust services, WebAssembly guest bindings and applications.",
    diagram:
      "Drivers → Rust services → WebAssembly execution boundary → applications. Services also manage storage/VFS and LVGL graphics.",
    explore: "Read the Xila case study",
  },
} as const;

function canAnimate() {
  return (
    mounted &&
    !reducedMotion?.matches &&
    !compactLayout?.matches &&
    "WebGL2RenderingContext" in window &&
    "ResizeObserver" in window
  );
}

async function activate() {
  if (!canAnimate() || !intersecting || !canvas.value || starting) return;
  if (renderer) {
    if (!document.hidden) renderer.start();
    return;
  }

  starting = true;
  try {
    // Only the homepage imports the WebGL implementation, and only when in view.
    const { createTopologyRenderer } = await import("./xilaTopologyWebgl");
    if (!canAnimate() || !intersecting || !canvas.value) return;
    renderer = createTopologyRenderer(canvas.value, () => {
      renderer?.dispose();
      renderer = null;
      webglVisible.value = false;
    });
    if (renderer) {
      webglVisible.value = true;
      if (!document.hidden) renderer.start();
    }
  } catch {
    webglVisible.value = false;
  } finally {
    starting = false;
  }
}

function refresh() {
  if (!canAnimate()) {
    renderer?.dispose();
    renderer = null;
    webglVisible.value = false;
    return;
  }
  if (intersecting && !document.hidden) {
    void activate();
  } else {
    renderer?.stop();
  }
}

function onPointerMove(event: PointerEvent) {
  if (!renderer || !section.value || event.pointerType === "touch") return;
  const box = section.value.getBoundingClientRect();
  if (!box.width || !box.height) return;
  const x = ((event.clientX - box.left) / box.width) * 2 - 1;
  const y = 1 - ((event.clientY - box.top) / box.height) * 2;
  renderer.setPointer(x, y);
}

function onPointerLeave() {
  renderer?.setPointer(0, 0);
}

onMounted(() => {
  mounted = true;
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  compactLayout = window.matchMedia("(max-width: 720px)");
  reducedMotion.addEventListener("change", refresh);
  compactLayout.addEventListener("change", refresh);
  document.addEventListener("visibilitychange", refresh);

  if (typeof IntersectionObserver === "undefined") {
    intersecting = true;
    refresh();
  } else {
    observer = new IntersectionObserver(
      (entries) => {
        intersecting = entries.some((entry) => entry.isIntersecting);
        refresh();
      },
      { threshold: 0.1 },
    );
    if (section.value) observer.observe(section.value);
  }
});

onBeforeUnmount(() => {
  mounted = false;
  observer?.disconnect();
  reducedMotion?.removeEventListener("change", refresh);
  compactLayout?.removeEventListener("change", refresh);
  document.removeEventListener("visibilitychange", refresh);
  renderer?.dispose();
  renderer = null;
});
</script>

<template>
  <section class="xila-topology" :aria-label="content[lang].title">
    <div class="xila-topology-heading">
      <div>
        <p class="xila-topology-kicker">{{ content[lang].kicker }}</p>
        <h2>{{ content[lang].title }}</h2>
      </div>
      <p class="xila-topology-intro">{{ content[lang].text }}</p>
    </div>

    <figure
      ref="section"
      class="xila-topology-scene"
      @pointermove="onPointerMove"
      @pointerleave="onPointerLeave"
    >
      <svg
        v-show="!webglVisible"
        class="xila-topology-static"
        viewBox="0 0 1000 400"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="xila-topology-ink" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#47b9ab" />
            <stop offset="1" stop-color="#8ecad9" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="#5faaa5" stroke-opacity=".68" stroke-width="2">
          <path d="M120 294 L335 176 L610 176 L890 120" />
          <path d="M335 176 L600 314 L610 176" />
          <path d="M335 176 L360 60 L890 120" />
        </g>
        <g fill="url(#xila-topology-ink)" stroke="#152d32" stroke-width="5">
          <circle cx="120" cy="294" r="11" />
          <circle cx="335" cy="176" r="11" />
          <circle cx="610" cy="176" r="11" />
          <circle cx="890" cy="120" r="11" />
          <circle cx="600" cy="314" r="11" />
          <circle cx="360" cy="60" r="11" />
        </g>
      </svg>

      <canvas
        ref="canvas"
        class="xila-topology-canvas"
        :class="{ 'is-ready': webglVisible }"
        aria-hidden="true"
      ></canvas>

      <div class="xila-topology-labels" aria-hidden="true">
        <span class="xila-node-label" style="left: 12%; top: 73.5%"
          >Drivers</span
        >
        <span class="xila-node-label" style="left: 33.5%; top: 44%"
          >Rust kernel</span
        >
        <span class="xila-node-label" style="left: 61%; top: 44%"
          >WASM ABI</span
        >
        <span class="xila-node-label" style="left: 89%; top: 30%">Apps</span>
        <span class="xila-node-label" style="left: 60%; top: 78.5%">VFS</span>
        <span class="xila-node-label" style="left: 36%; top: 15%">LVGL</span>
      </div>
      <figcaption class="visually-hidden">
        {{ content[lang].diagram }}
      </figcaption>
    </figure>

    <a
      class="xila-topology-link"
      :href="lang === 'fr' ? '/fr/projects/xila' : '/projects/xila'"
    >
      {{ content[lang].explore }} <span aria-hidden="true">↗</span>
    </a>
  </section>
</template>

<style scoped>
.xila-topology {
  max-width: 1160px;
  margin: 3rem auto;
  padding: 0 1.5rem;
  color: var(--vp-c-text-1);
}
.xila-topology-heading {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 1rem 2rem;
  margin-bottom: 1.75rem;
}
.xila-topology-heading > div {
  flex: 1 1 20rem;
}
.xila-topology-kicker {
  margin: 0 0 0.65rem;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  font-size: 0.74rem;
  letter-spacing: 0.15em;
  font-weight: 600;
}
.xila-topology-heading h2 {
  margin: 0;
  padding: 0;
  border: 0;
  font:
    normal clamp(2rem, 4vw, 3.5rem)/1.14 Georgia,
    "Times New Roman",
    serif;
  letter-spacing: -0.04em;
}
.xila-topology-intro {
  flex: 0 1 22rem;
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.93rem;
  line-height: 1.65;
}
.xila-topology-scene {
  position: relative;
  height: clamp(280px, 37vw, 410px);
  margin: 0;
  overflow: hidden;
  isolation: isolate;
  border: 1px solid var(--vp-c-divider);
  border-radius: 1rem;
  background:
    radial-gradient(ellipse at 50% 50%, #335f5733 0%, transparent 65%),
    linear-gradient(135deg, #0c1e25, #162c32 64%, #172c3b);
}
.xila-topology-scene::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(#ffffff0b 1px, transparent 1px),
    linear-gradient(90deg, #ffffff0b 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
}
.xila-topology-static,
.xila-topology-canvas {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.xila-topology-canvas {
  opacity: 0;
}
.xila-topology-canvas.is-ready {
  opacity: 1;
}
.xila-topology-labels {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.xila-node-label {
  position: absolute;
  transform: translate(-50%, 0.95rem);
  padding: 0.25rem 0.55rem;
  border: 1px solid #ffffff26;
  border-radius: 0.35rem;
  color: #f2f9f9;
  background: #10252cd9;
  font:
    600 clamp(0.67rem, 1.2vw, 0.83rem)/1.3 ui-monospace,
    monospace;
  white-space: nowrap;
}
.xila-topology-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.25rem;
  color: var(--vp-c-brand-1);
  font-size: 0.92rem;
  font-weight: 650;
  text-decoration: none;
}
.xila-topology-link:hover {
  text-decoration: underline;
}
.xila-topology-link:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
@media (max-width: 720px) {
  .xila-topology {
    margin: 2rem auto;
    padding: 0 1rem;
  }
  .xila-topology-scene {
    height: 310px;
  }
  .xila-topology-heading {
    align-items: start;
  }
  .xila-node-label {
    font-size: 0.65rem;
    padding: 0.2rem 0.35rem;
  }
}
@media (max-width: 420px) {
  .xila-topology-scene {
    height: 270px;
  }
  .xila-node-label {
    font-size: 0.58rem;
  }
}
</style>
