<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  description: string;
  headingId: string;
}>();
</script>

<template>
  <header
    class="editorial-section-heading"
    :class="{ 'editorial-section-heading--icon': $slots.icon }"
  >
    <div class="editorial-section-heading__main">
      <span
        v-if="$slots.icon"
        class="editorial-section-heading__icon"
        aria-hidden="true"
      >
        <slot name="icon" />
      </span>
      <div>
        <p class="editorial-section-heading__eyebrow">{{ eyebrow }}</p>
        <h2 :id="headingId">{{ title }}</h2>
        <p class="editorial-section-heading__description">{{ description }}</p>
      </div>
    </div>
    <div v-if="$slots.aside" class="editorial-section-heading__aside">
      <slot name="aside" />
    </div>
  </header>
</template>

<style scoped>
.editorial-section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.25rem;
  margin-bottom: 1.75rem;
}
.editorial-section-heading--icon {
  padding-bottom: 1.5rem;
  margin-bottom: 0;
}
.editorial-section-heading__main {
  display: flex;
  align-items: flex-start;
  gap: 1.15rem;
  min-width: 0;
}
.editorial-section-heading__icon {
  display: flex;
  flex: 0 0 3.1rem;
  align-items: center;
  justify-content: center;
  width: 3.1rem;
  height: 3.1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
}
.editorial-section-heading__eyebrow {
  margin: 0 0 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.73rem;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}
.editorial-section-heading h2 {
  margin: 0;
  padding: 0;
  border: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2rem, 3.6vw, 3.2rem);
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 1.15;
}
.editorial-section-heading__description {
  margin: 0.65rem 0 0;
  max-width: 38rem;
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
  line-height: 1.7;
}
.editorial-section-heading--icon .editorial-section-heading__description {
  margin-top: 0.45rem;
  font-size: 0.9rem;
}
</style>
