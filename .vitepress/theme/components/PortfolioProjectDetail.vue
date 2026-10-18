<script setup lang="ts">
import { computed } from "vue";
import {
  portfolioProjects,
  type PortfolioLanguage,
} from "../data/portfolioProjects";

const props = defineProps<{
  projectId: string;
  lang: PortfolioLanguage;
}>();

const project = computed(() =>
  portfolioProjects.find((item) => item.id === props.projectId),
);
</script>

<template>
  <article v-if="project" :id="project.id" class="project-detail">
    <h3>
      {{ project.title[lang] }}
      <a
        class="project-detail-anchor"
        :href="'#' + project.id"
        :aria-label="lang === 'fr' ? 'Lien direct vers ce projet' : 'Direct link to project'"
      >#</a>
    </h3>

    <p class="project-detail-meta">
      <span>{{ project.period[lang] }}</span>
      <span aria-hidden="true">·</span>
      <span>{{ project.tags.join(" · ") }}</span>
    </p>

    <div class="project-detail-body">
      <slot />
    </div>

    <a
      v-if="project.externalUrl"
      class="project-detail-external"
      :href="project.externalUrl"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ lang === "fr" ? "Consulter la ressource" : "View external resource" }}
      <span aria-hidden="true">↗</span>
    </a>
  </article>
</template>

<style scoped>
.project-detail {
  margin: 1.5rem 0;
  padding: 1.6rem;
  scroll-margin-top: calc(var(--vp-nav-height, 64px) + 1.5rem);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.8rem;
  background: var(--vp-c-bg);
}

.project-detail h3 {
  margin: 0 0 0.55rem;
  padding: 0;
  border: 0;
  font-size: 1.35rem;
}

.project-detail-anchor {
  font-size: 0.86rem;
  opacity: 0.5;
  text-decoration: none;
  margin-left: 0.35rem;
}

.project-detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem 0.55rem;
  margin: 0 0 1rem;
  color: var(--vp-c-text-2);
  font-size: 0.79rem;
}

.project-detail-body {
  padding-left: 1rem;
  border-left: 2px solid var(--vp-c-divider);
}

.project-detail-body :deep(p:last-child) {
  margin-bottom: 0;
}

.project-detail-external {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 1.15rem;
  font-size: 0.85rem;
  font-weight: 600;
}

.project-detail-anchor:focus-visible,
.project-detail-external:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}

@media (max-width: 640px) {
  .project-detail { padding: 1rem; }
}
</style>
