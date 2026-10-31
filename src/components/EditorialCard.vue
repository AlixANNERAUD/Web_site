<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: "article" | "div";
    variant?: "project" | "timeline" | "skill";
    highlighted?: boolean;
  }>(),
  { as: "article", variant: "project", highlighted: false },
);
</script>

<template>
  <component
    :is="as"
    class="editorial-card"
    :class="[
      'editorial-card--' + variant,
      { 'editorial-card--highlighted': highlighted },
    ]"
  >
    <slot />
  </component>
</template>

<style scoped>
.editorial-card {
  min-width: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.85rem;
  background: var(--vp-c-bg);
  transition:
    border-color 180ms ease,
    transform 180ms ease;
}
.editorial-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}
.editorial-card--project {
  overflow: hidden;
}
.editorial-card--project:hover {
  transform: translateY(-3px);
}
.editorial-card--timeline {
  margin: 0 0 1.25rem;
  padding: clamp(1.1rem, 2.5vw, 1.85rem);
}
.editorial-card--skill {
  display: flex;
  flex-direction: column;
  padding: clamp(1.3rem, 2.5vw, 1.9rem);
  scroll-margin-top: 6rem;
}
.editorial-card--highlighted {
  border-color: color-mix(
    in srgb,
    var(--vp-c-brand-1) 45%,
    var(--vp-c-divider)
  );
  background: color-mix(in srgb, var(--vp-c-brand-soft) 22%, var(--vp-c-bg));
}
@media (max-width: 680px) {
  .editorial-card--timeline {
    padding: 1rem;
  }
}
@media (max-width: 560px) {
  .editorial-card--skill {
    padding: 1.15rem;
  }
}
@media (prefers-reduced-motion: reduce) {
  .editorial-card {
    transition: none;
  }
  .editorial-card:hover {
    transform: none;
  }
}
</style>
