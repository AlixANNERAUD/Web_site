<script setup lang="ts">
defineProps<{
  title: string;
  technologies: string[];
}>();
</script>

<template>
  <section class="skill-domain">
    <h2>{{ title }}</h2>
    <div class="skill-domain-description">
      <slot />
    </div>
    <ul class="skill-technology-list" aria-label="Technologies">
      <li v-for="technology in technologies" :key="technology">{{ technology }}</li>
    </ul>
  </section>
</template>

<style scoped>
.skill-domain {
  margin: 1.15rem 0;
  padding: clamp(1.15rem, 2vw, 1.7rem);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.85rem;
  background: var(--vp-c-bg);
}

.skill-domain h2 {
  margin: 0 0 0.55rem;
  padding: 0;
  border: 0;
  font-size: clamp(1.25rem, 2.3vw, 1.6rem);
}

.skill-domain-description {
  color: var(--vp-c-text-2);
  font-size: 0.94rem;
  line-height: 1.7;
}

.skill-domain-description :deep(p:last-child) {
  margin-bottom: 0;
}

.skill-technology-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  padding: 0;
  margin: 1.15rem 0 0;
}

.skill-technology-list li {
  padding: 0.33rem 0.65rem;
  border-radius: 0.4rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
}
</style>
