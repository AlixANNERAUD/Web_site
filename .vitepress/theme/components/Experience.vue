<script setup lang="ts">
import { Calendar, MapPin } from "lucide-vue-next";

withDefaults(
  defineProps<{
    badge?: string;
    title: string;
    date: string;
    companyName?: string;
    companyUrl?: string;
    location?: string;
    tags?: string[];
  }>(),
  { tags: () => [] },
);
</script>

<template>
  <article class="experience">
    <header>
      <h3>
        {{ title }}
        <template v-if="companyName">
          <span class="experience-at" aria-hidden="true">@</span>
          <a
            v-if="companyUrl"
            :href="companyUrl"
            target="_blank"
            rel="noopener noreferrer"
          >{{ companyName }}</a>
          <span v-else>{{ companyName }}</span>
        </template>
        <Badge v-if="badge">{{ badge }}</Badge>
      </h3>

      <p class="experience-meta">
        <span v-if="date"><Calendar aria-hidden="true" /> {{ date }}</span>
        <span v-if="location"><MapPin aria-hidden="true" /> {{ location }}</span>
      </p>
      <div v-if="tags.length" class="experience-tags" aria-label="Technologies">
        <Badge v-for="tag in tags" :key="tag" type="warning">{{ tag }}</Badge>
      </div>
    </header>
    <div class="experience-content">
      <slot />
    </div>
  </article>
</template>

<style scoped>
.experience {
  padding: 1.4rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.experience h3 {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem;
  margin: 0 0 0.65rem;
  border: 0;
  padding: 0;
  font-size: clamp(1.1rem, 2.2vw, 1.45rem);
  font-weight: 600;
}

.experience-at {
  color: var(--vp-c-text-3);
  padding: 0 0.1rem;
}

.experience-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem 1.2rem;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  margin: 0 0 0.8rem;
}

.experience-meta span {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  max-width: 100%;
}

.experience-meta :deep(svg) {
  width: 0.95rem;
  height: 0.95rem;
  flex-shrink: 0;
}

.experience-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.7rem 0;
}

.experience-content {
  padding-left: 1rem;
  margin-top: 0.9rem;
  border-left: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.experience-content :deep(p:last-child),
.experience-content :deep(ul:last-child) {
  margin-bottom: 0;
}

.experience h3 a:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

@media (max-width: 640px) {
  .experience { padding: 1.15rem 0; }
  .experience-content { padding-left: 0.8rem; }
}
</style>
