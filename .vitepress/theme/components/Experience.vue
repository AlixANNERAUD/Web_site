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
  date: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyUrl: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: false,
  },
});
</script>

<template>
  <div class="experience">
    <h3>
      {{ title }}

      @
      <a :href="companyUrl" target="_blank" rel="noopener noreferrer">
        {{ companyName }}
      </a>

      <span v-if="badge">
        &nbsp;
        <Badge>
          {{ badge }}
        </Badge>
      </span>
    </h3>
    <p v-if="company || location || date" class="experience-meta">
      <span v-if="date"><Calendar /> {{ date }}</span>
      &nbsp; | &nbsp;
      <span v-if="location"><MapPin /> {{ location }}</span>
    </p>
    <Badge v-for="(tag, index) in tags" :key="index" type="warning">{{
      tag
    }}</Badge>
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
