<script setup lang="ts">
import { ArrowDownRight } from "lucide-vue-next";

interface EditorialNavItem {
  href: string;
  label: string;
}

withDefaults(
  defineProps<{
    eyebrow: string;
    title: string;
    accent?: string;
    intro: string;
    headingLevel?: "h1" | "h2";
    variant?: "wide" | "compact";
    navLabel?: string;
    navItems?: EditorialNavItem[];
  }>(),
  {
    headingLevel: "h1",
    variant: "wide",
    navItems: () => [],
  },
);
</script>

<template>
  <header class="editorial-hero" :class="'editorial-hero--' + variant">
    <div class="editorial-hero__copy">
      <p class="editorial-hero__eyebrow">{{ eyebrow }}</p>
      <component :is="headingLevel" class="editorial-hero__title">
        {{ title }} <em v-if="accent">{{ accent }}</em>
      </component>
      <p class="editorial-hero__intro">{{ intro }}</p>
    </div>
    <nav
      v-if="navItems.length"
      class="editorial-hero__nav"
      :aria-label="navLabel"
    >
      <p class="editorial-hero__nav-caption">{{ navLabel }}</p>
      <a v-for="item in navItems" :key="item.href" :href="item.href">
        <span>{{ item.label }}</span>
        <ArrowDownRight :size="17" aria-hidden="true" />
      </a>
    </nav>
  </header>
</template>

<style scoped>
.editorial-hero {
  border-bottom: 1px solid var(--vp-c-divider);
}
.editorial-hero--wide {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(230px, 290px);
  align-items: end;
  gap: 2.5rem;
  padding: 1.5rem 0 3.5rem;
  margin-bottom: 3.7rem;
}
.editorial-hero--compact {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 2.5rem;
  margin: 0 0 2rem;
  padding-bottom: 1.75rem;
}
.editorial-hero__copy {
  min-width: 0;
}
.editorial-hero__eyebrow,
.editorial-hero__nav-caption {
  margin: 0 0 0.9rem;
  color: var(--vp-c-text-2);
  font-size: 0.73rem;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}
.editorial-hero__title {
  margin: 0;
  padding: 0;
  border: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.6rem, 5.5vw, 5.4rem);
  font-weight: 400;
  letter-spacing: -0.055em;
  line-height: 1.07;
}
.editorial-hero__title em {
  color: var(--vp-c-brand-1);
  font-weight: 400;
}
.editorial-hero__intro {
  max-width: 39rem;
  margin: 1.45rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 1.01rem;
  line-height: 1.75;
}
.editorial-hero--compact .editorial-hero__copy {
  display: grid;
  width: 100%;
  grid-template-columns: minmax(0, 1fr) minmax(0, 20rem);
  align-items: end;
  column-gap: 2.5rem;
}
.editorial-hero--compact .editorial-hero__eyebrow {
  grid-column: 1;
  grid-row: 1;
  margin-bottom: 0.75rem;
  letter-spacing: 0.15em;
}
.editorial-hero--compact .editorial-hero__title {
  grid-column: 1;
  grid-row: 2;
  font-size: clamp(2.3rem, 4.8vw, 4.7rem);
  letter-spacing: -0.045em;
}
.editorial-hero--compact .editorial-hero__intro {
  grid-column: 2;
  grid-row: 2;
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.65;
}
.editorial-hero__nav {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 1rem 1.15rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  background: var(--vp-c-bg-soft);
}
.editorial-hero__nav-caption {
  margin-bottom: 0.65rem;
}
.editorial-hero__nav a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  font-size: 0.86rem;
  font-weight: 600;
  text-decoration: none;
}
.editorial-hero__nav a svg {
  color: var(--vp-c-brand-1);
}
.editorial-hero__nav a:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}
@media (max-width: 960px) {
  .editorial-hero--wide {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding-bottom: 2.5rem;
  }
  .editorial-hero__nav {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 1.3rem;
  }
  .editorial-hero__nav-caption {
    flex-basis: 100%;
    margin: 0;
  }
  .editorial-hero__nav a {
    gap: 1rem;
    border: 0;
  }
}
@media (max-width: 850px) {
  .editorial-hero--compact {
    align-items: start;
    flex-direction: column;
    gap: 0.85rem;
  }
  .editorial-hero--compact .editorial-hero__copy {
    grid-template-columns: 1fr;
    row-gap: 0.85rem;
  }
  .editorial-hero--compact .editorial-hero__eyebrow,
  .editorial-hero--compact .editorial-hero__title,
  .editorial-hero--compact .editorial-hero__intro {
    grid-column: 1;
    grid-row: auto;
  }
  .editorial-hero--compact .editorial-hero__intro {
    max-width: 35rem;
  }
}
@media (max-width: 720px) {
  .editorial-hero--wide {
    margin-bottom: 2.5rem;
  }
}
</style>
