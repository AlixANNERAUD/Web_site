<script setup lang="ts">
import { ArrowUpRight } from "lucide-vue-next";

withDefaults(
  defineProps<{
    title: string;
    description: string;
    href: string;
    linkLabel: string;
    eyebrow?: string;
  }>(),
  { eyebrow: "Next / 03" },
);
</script>

<template>
  <footer class="editorial-next">
    <div>
      <p class="editorial-next__eyebrow">{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
      <p class="editorial-next__description">{{ description }}</p>
    </div>
    <a :href="href">
      {{ linkLabel }}
      <ArrowUpRight :size="19" aria-hidden="true" />
    </a>
  </footer>
</template>

<style scoped>
.editorial-next {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 2rem 0;
  border-top: 1px solid var(--vp-c-divider);
}
.editorial-next__eyebrow {
  margin: 0 0 0.9rem;
  color: var(--vp-c-text-2);
  font-size: 0.73rem;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}
.editorial-next h2 {
  margin: 0 0 0.45rem;
  padding: 0;
  border: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.65rem, 3vw, 2.5rem);
  font-weight: 400;
}
.editorial-next__description {
  margin: 0;
  color: var(--vp-c-text-2);
}
.editorial-next a {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.75rem 0.95rem;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 0.5rem;
  color: var(--vp-c-brand-1);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
}
.editorial-next a:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}
@media (max-width: 680px) {
  .editorial-next {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
