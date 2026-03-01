<script setup>
import { MapPin, Calendar, BriefcaseBusiness } from "lucide-vue-next";

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
    <p class="experience-meta">
      <span><Calendar /> {{ date }}</span>

      &nbsp; | &nbsp;
      <span v-for="(tag, index) in tags" :key="index">
        <Badge type="warning">{{ tag }}</Badge>
      </span>
    </p>
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
}

.experience-meta span {
  display: flex;
  align-items: center;
  white-space: nowrap;
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
