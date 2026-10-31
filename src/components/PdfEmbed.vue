<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string;
    title?: string;
    openLabel?: string;
  }>(),
  { title: "CV (PDF)", openLabel: "Open PDF" },
);
</script>

<template>
  <div class="pdf-container">
    <iframe
      v-if="src"
      :src="src"
      :title="title"
      type="application/pdf"
      width="100%"
      height="100%"
      style="border: none"
    >
      <p>
        Your browser does not support PDFs.
        <a :href="src">Download the PDF</a> instead.
      </p>
    </iframe>
    <div v-else class="error-state">No PDF link provided.</div>
    <a
      v-if="src"
      class="pdf-open-link"
      :href="src"
      target="_blank"
      rel="noopener noreferrer"
      >{{ openLabel }} ↗</a
    >
  </div>
</template>

<style scoped>
.pdf-container {
  width: 100%;
  /* Adjust 100vh if you have a navbar; e.g., calc(100vh - 60px) */
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
}

.pdf-open-link {
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  z-index: 1;
  padding: 0.4rem 0.7rem;
  border-radius: 0.375rem;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
  font-size: 0.85rem;
}

iframe {
  display: block;
}

.error-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: sans-serif;
  color: #666;
}
</style>
