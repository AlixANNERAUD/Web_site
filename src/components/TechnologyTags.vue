<script setup lang="ts">
withDefaults(
  defineProps<{
    tags: readonly string[];
    label: string;
    density?: "project" | "timeline" | "skill";
  }>(),
  { density: "project" },
);
</script>

<template>
  <ul
    class="editorial-tags"
    :class="'editorial-tags--' + density"
    :aria-label="label"
  >
    <li v-for="tag in tags" :key="tag">{{ tag }}</li>
  </ul>
</template>

<style scoped>
.editorial-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0;
  list-style: none;
}
.editorial-tags li {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
.editorial-tags--project {
  gap: 0.45rem;
  margin: 0 0 1.2rem;
}
.editorial-tags--project li {
  padding: 0.22rem 0.52rem;
  border-radius: 0.3rem;
  font-size: 0.72rem;
}
.editorial-tags--timeline {
  margin: 1rem 0 0;
}
.editorial-tags--timeline li {
  padding: 0.28rem 0.52rem;
  border-radius: 0.35rem;
  font-size: 0.71rem;
}
.editorial-tags--skill {
  margin: 0 0 1.45rem;
}
.editorial-tags--skill li {
  padding: 0.32rem 0.56rem;
  border-radius: 0.38rem;
  font-size: 0.76rem;
  line-height: 1.35;
}
</style>
