<script setup>
import { Calendar } from "lucide-vue-next";

const props = defineProps({
  badge: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
  tags: {
    type: Array,
    required: false,
  },
  date: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="experience">
    <h3>
      <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer">
        {{ title }}
      </a>
      <span v-else>
        {{ title }}
      </span>
      &nbsp;
      <Badge v-if="badge">
        {{ badge }}
      </Badge>
    </h3>
    <div class="experience-meta">
      <span class="project-date"><Calendar aria-hidden="true" /> {{ date }}</span>
      <span v-for="tag in tags || []" :key="tag" class="project-tag">
        <Badge type="warning">{{ tag }}</Badge>
      </span>
    </div>
    <div class="experience-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.experience {
  margin-bottom: 2em;
}

.experience-meta {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5em;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem 0.6rem;
}

.experience-meta span {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
}

.experience-meta :deep(svg) {
  display: inline;
  width: 1em;
  height: 1em;
  margin-right: 0.25em;
}

.experience-content {
  padding-left: 1em;
  border-left: 2px solid var(--vp-c-border);
}
</style>
