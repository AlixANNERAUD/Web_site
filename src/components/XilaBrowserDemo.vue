<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(defineProps<{ lang?: "fr" | "en" }>(), {
  lang: "en",
});

const DEMO_URL = "https://documentation.xila.dev/demonstrations/wasm/en/";
const embedded = ref(false);
const frameLoaded = ref(false);

const labels = {
  fr: {
    title: "Xila, directement dans le navigateur",
    subtitle:
      "Une démonstration réelle de l'OS et de ses applications WebAssembly, hébergée séparément du portfolio.",
    start: "Essayer ici (expérimental)",
    external: "Ouvrir la démo dans un nouvel onglet",
    close: "Fermer l'intégration",
    warning:
      "Le navigateur peut bloquer le stockage OPFS ou l'exécution en iframe. Pour une utilisation fiable et pour retrouver vos disques, ouvrez la démonstration dans un nouvel onglet.",
    privacy:
      "La démonstration n'est chargée qu'après votre clic. Les disques éventuellement créés sont stockés par votre navigateur sur l'origine de la démonstration, et non sur le portfolio.",
    loading: "Chargement de la démonstration…",
    fallback:
      "Si l'écran reste vide, utilisez le lien vers la démonstration externe.",
    frame: "Démonstration WebAssembly de Xila",
  },
  en: {
    title: "Try Xila in the browser",
    subtitle:
      "A real OS and WebAssembly application demo, hosted independently from this portfolio.",
    start: "Try embedded (experimental)",
    external: "Open the demo in a new tab",
    close: "Close embedded demo",
    warning:
      "Browser security may block OPFS storage or running the demo inside an iframe. For reliable behavior and access to your saved disks, open the demo in its own tab.",
    privacy:
      "The demonstration only loads when you click. Any disks you create are stored by your browser under the demo's origin, not this portfolio.",
    loading: "Loading demo…",
    fallback:
      "If the screen remains blank, use the external demonstration link.",
    frame: "Xila WebAssembly demonstration",
  },
} as const;
</script>

<template>
  <section class="xila-demo" :aria-label="labels[lang].title">
    <div class="xila-demo-heading">
      <div class="xila-demo-illustration" aria-hidden="true">
        <span class="xila-demo-mark">X</span>
        <span class="xila-demo-terminal">xila&gt; _</span>
      </div>
      <div>
        <h3>{{ labels[lang].title }}</h3>
        <p>{{ labels[lang].subtitle }}</p>
      </div>
    </div>

    <p class="xila-demo-warning">{{ labels[lang].warning }}</p>

    <div class="xila-demo-actions">
      <a
        :href="DEMO_URL"
        class="xila-demo-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ labels[lang].external }} <span aria-hidden="true">↗</span>
      </a>
      <button
        type="button"
        :aria-expanded="embedded"
        aria-controls="xila-embedded-demo"
        @click="
          embedded = !embedded;
          frameLoaded = false;
        "
      >
        {{ embedded ? labels[lang].close : labels[lang].start }}
      </button>
    </div>
    <p class="xila-demo-privacy">{{ labels[lang].privacy }}</p>

    <div v-if="embedded" id="xila-embedded-demo" class="xila-demo-panel">
      <p v-if="!frameLoaded" class="xila-demo-loading" role="status">
        {{ labels[lang].loading }}
      </p>
      <iframe
        :src="DEMO_URL"
        :title="labels[lang].frame"
        loading="lazy"
        referrerpolicy="no-referrer"
        allow="clipboard-read; clipboard-write"
        sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-downloads"
        @load="frameLoaded = true"
      ></iframe>
      <p class="xila-demo-fallback">{{ labels[lang].fallback }}</p>
    </div>
  </section>
</template>

<style scoped>
.xila-demo {
  margin: 1.5rem 0 2rem;
  padding: clamp(1rem, 2vw, 1.5rem);
  border: 1px solid var(--vp-c-divider);
  border-radius: 1rem;
  background: var(--vp-c-bg-soft);
}

.xila-demo-heading {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.xila-demo-heading h3 {
  margin: 0 0 0.35rem;
  border: 0;
  padding: 0;
  font-size: 1.2rem;
}
.xila-demo-heading p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}
.xila-demo-illustration {
  flex: 0 0 6.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 5.5rem;
  border-radius: 0.6rem;
  background: linear-gradient(145deg, #162b35, #284c53);
  color: white;
}
.xila-demo-mark {
  font:
    normal 2.65rem/1 Georgia,
    serif;
}
.xila-demo-terminal {
  font:
    0.65rem ui-monospace,
    monospace;
  opacity: 0.8;
}
.xila-demo-warning {
  margin: 1.2rem 0;
  color: var(--vp-c-text-2);
  line-height: 1.65;
  font-size: 0.87rem;
}
.xila-demo-actions {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  align-items: center;
}
.xila-demo-actions > a,
.xila-demo-actions > button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.65rem 0.9rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.4;
  text-decoration: none;
  cursor: pointer;
}
.xila-demo-actions > .xila-demo-primary {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}
.xila-demo-actions > button {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.xila-demo-privacy,
.xila-demo-fallback {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 1rem 0 0;
}
.xila-demo-panel {
  margin-top: 1.25rem;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1rem;
}
.xila-demo-panel iframe {
  display: block;
  width: 100%;
  height: min(68vh, 620px);
  min-height: 360px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.6rem;
  background: #101820;
}
.xila-demo-loading {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
.xila-demo-actions :is(a, button):focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

@media (max-width: 600px) {
  .xila-demo-heading {
    align-items: flex-start;
    flex-direction: column;
  }
  .xila-demo-actions > a,
  .xila-demo-actions > button {
    width: 100%;
  }
  .xila-demo-panel iframe {
    min-height: 300px;
  }
}
</style>
