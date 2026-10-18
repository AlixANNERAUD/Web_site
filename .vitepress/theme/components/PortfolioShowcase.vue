<script setup lang="ts">
import { computed, ref } from "vue";
import {
  portfolioProjects,
  projectDetailUrl,
  type PortfolioLanguage,
  type ProjectCategory,
  type ProjectGroup,
} from "../data/portfolioProjects";

const props = withDefaults(
  defineProps<{
    lang?: PortfolioLanguage;
    mode?: "featured" | "catalogue";
  }>(),
  { lang: "fr", mode: "featured" },
);

const search = ref("");
const category = ref<ProjectCategory | "all">("all");
const group = ref<ProjectGroup | "all">("all");

const categories: { id: ProjectCategory | "all"; fr: string; en: string }[] = [
  { id: "all", fr: "Tous les domaines", en: "All areas" },
  { id: "systems", fr: "Systèmes", en: "Systems" },
  { id: "web", fr: "Web", en: "Web" },
  { id: "infrastructure", fr: "Infrastructure", en: "Infrastructure" },
  { id: "embedded", fr: "Embarqué", en: "Embedded" },
  { id: "security", fr: "Sécurité", en: "Security" },
  { id: "data", fr: "Data / ML", en: "Data / ML" },
];

const groups: { id: ProjectGroup | "all"; fr: string; en: string }[] = [
  { id: "all", fr: "Tous", en: "All" },
  { id: "personal", fr: "Personnels", en: "Personal" },
  { id: "library", fr: "Bibliothèques", en: "Libraries" },
  { id: "competition", fr: "Compétitions", en: "Competitions" },
  { id: "academic", fr: "Académiques", en: "Academic" },
];

const copy = computed(() =>
  props.lang === "fr"
    ? {
        eyebrow: "Sélection / 01",
        title: "Des idées aux",
        emphasis: "systèmes.",
        description: "Du noyau Rust aux outils métiers : quelques projets que je conçois, développe et maintiens.",
        catalogueDescription: "Projets personnels, compétitions et réalisations académiques. Chaque projet possède une fiche détaillée.",
        search: "Rechercher un projet",
        kind: "Type de projet",
        area: "Domaine",
        viewAll: "Explorer tous mes projets",
        details: "Lire la fiche",
        external: "Lien externe",
        count: "projet(s)",
        empty: "Aucun projet ne correspond à cette recherche.",
      }
    : {
        eyebrow: "Selected work / 01",
        title: "From ideas to",
        emphasis: "systems.",
        description: "From a Rust kernel to practical business software: selected projects I design, build and maintain.",
        catalogueDescription: "Personal projects, competitions and academic work. Each item has a detailed description.",
        search: "Search projects",
        kind: "Project type",
        area: "Area",
        viewAll: "Explore all projects",
        details: "Read details",
        external: "External link",
        count: "project(s)",
        empty: "No projects match your search.",
      },
);

const visibleProjects = computed(() => {
  if (props.mode === "featured") return portfolioProjects.filter((item) => item.featured);

  const term = search.value.trim().toLocaleLowerCase(props.lang);
  return portfolioProjects.filter((project) => {
    if (category.value !== "all" && project.category !== category.value) return false;
    if (group.value !== "all" && project.group !== group.value) return false;
    if (!term) return true;

    const searchable = [
      project.title[props.lang],
      project.description[props.lang],
      project.period[props.lang],
      ...project.tags,
    ]
      .join(" ")
      .toLocaleLowerCase(props.lang);
    return searchable.includes(term);
  });
});

const catalogueUrl = computed(() =>
  props.lang === "fr" ? "/fr/projects" : "/projects",
);
</script>

<template>
  <section
    class="portfolio-showcase"
    :class="{ 'portfolio-showcase--catalogue': mode === 'catalogue' }"
    :aria-label="lang === 'fr' ? 'Projets sélectionnés' : 'Selected projects'"
  >
    <div class="showcase-heading">
      <div class="showcase-heading-main">
        <p class="showcase-eyebrow">{{ copy.eyebrow }}</p>
        <h2>{{ copy.title }} <em>{{ copy.emphasis }}</em></h2>
      </div>
      <p class="showcase-intro">
        {{ mode === "featured" ? copy.description : copy.catalogueDescription }}
      </p>
    </div>

    <div v-if="mode === 'catalogue'" class="showcase-toolbar">
      <div class="showcase-controls">
        <div>
          <span class="showcase-control-label">{{ copy.kind }}</span>
          <div class="showcase-filters" role="group" :aria-label="copy.kind">
            <button
              v-for="item in groups"
              :key="item.id"
              type="button"
              :aria-pressed="group === item.id"
              :class="{ 'is-selected': group === item.id }"
              @click="group = item.id"
            >{{ item[lang] }}</button>
          </div>
        </div>
        <div>
          <span class="showcase-control-label">{{ copy.area }}</span>
          <div class="showcase-filters" role="group" :aria-label="copy.area">
            <button
              v-for="item in categories"
              :key="item.id"
              type="button"
              :aria-pressed="category === item.id"
              :class="{ 'is-selected': category === item.id }"
              @click="category = item.id"
            >{{ item[lang] }}</button>
          </div>
        </div>
      </div>
      <label class="showcase-search">
        <span class="sr-only">{{ copy.search }}</span>
        <input v-model="search" type="search" :placeholder="copy.search" />
      </label>
    </div>

    <p v-if="mode === 'catalogue'" class="showcase-count" role="status">
      {{ visibleProjects.length }} {{ copy.count }}
    </p>

    <div class="showcase-grid">
      <article
        v-for="(project, index) in visibleProjects"
        :key="project.id"
        class="showcase-card"
      >
        <div class="showcase-art" :class="'showcase-art--' + project.category" aria-hidden="true">
          <span class="showcase-art-symbol">{{ project.symbol }}</span>
          <span class="showcase-art-index">
            {{ String(index + 1).padStart(2, "0") }} / {{ project.period[lang] }}
          </span>
        </div>
        <div class="showcase-card-body">
          <p class="showcase-card-category">
            {{ categories.find((item) => item.id === project.category)?.[lang] }}
          </p>
          <h3>{{ project.title[lang] }}</h3>
          <p class="showcase-card-description">{{ project.description[lang] }}</p>
          <ul v-if="project.tags.length" class="showcase-tags" aria-label="Technologies">
            <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
          </ul>
          <div class="showcase-card-actions">
            <a :href="projectDetailUrl(project, lang)">
              {{ copy.details }} <span aria-hidden="true">→</span>
            </a>
            <a
              v-if="project.externalUrl"
              class="showcase-external-link"
              :href="project.externalUrl"
              target="_blank"
              rel="noopener noreferrer"
            >{{ copy.external }} <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </article>
    </div>

    <p v-if="visibleProjects.length === 0" class="showcase-empty">
      {{ copy.empty }}
    </p>

    <a v-if="mode === 'featured'" class="showcase-all-link" :href="catalogueUrl">
      {{ copy.viewAll }} <span aria-hidden="true">↗</span>
    </a>
  </section>
</template>

<style scoped>
.portfolio-showcase {
  max-width: 1160px;
  margin: 2.5rem auto 5rem;
  padding: 0 1.5rem;
  color: var(--vp-c-text-1);
}

.showcase-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 2.5rem;
  margin: 0 0 2rem;
  padding-bottom: 1.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.showcase-heading-main { flex: 1 1 60%; }

.showcase-eyebrow,
.showcase-card-category {
  margin: 0 0 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.73rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.showcase-heading h2 {
  margin: 0;
  border: 0;
  padding: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.3rem, 4.8vw, 4.7rem);
  font-weight: 400;
  letter-spacing: -0.045em;
  line-height: 1.07;
}

.showcase-heading h2 em {
  color: var(--vp-c-brand-1);
  font-weight: 400;
}

.showcase-intro {
  flex: 0 1 20rem;
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.65;
}

.showcase-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0 0 1.5rem;
}

.showcase-filters { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.showcase-controls { display: flex; flex-wrap: wrap; gap: 0.7rem 1.25rem; }
.showcase-control-label { display: block; margin: 0 0 0.35rem; font-size: 0.73rem; color: var(--vp-c-text-2); }
.showcase-count { margin: 0.1rem 0 1rem; color: var(--vp-c-text-2); font-size: 0.85rem; }
.showcase-card-actions .showcase-external-link { color: var(--vp-c-text-2); font-size: 0.79rem; }
.showcase-card-period { color: var(--vp-c-text-3); font-size: 0.78rem; margin: 0.35rem 0 0.5rem; }

.showcase-filters button {
  padding: 0.52rem 0.82rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 2rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  cursor: pointer;
  transition: border-color 160ms ease, background-color 160ms ease;
}

.showcase-filters button:hover,
.showcase-filters button.is-selected {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.showcase-search input {
  box-sizing: border-box;
  width: min(100%, 15rem);
  padding: 0.62rem 0.85rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.5rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font: inherit;
  font-size: 0.82rem;
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.portfolio-showcase--catalogue .showcase-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.showcase-card {
  min-width: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.85rem;
  background: var(--vp-c-bg);
  overflow: hidden;
  transition: transform 200ms ease, border-color 200ms ease;
}

.showcase-card:hover {
  transform: translateY(-3px);
  border-color: var(--vp-c-brand-1);
}

.showcase-art {
  position: relative;
  display: flex;
  min-height: 11rem;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #16212d;
  background-image: linear-gradient(115deg, transparent 48%, #ffffff0a 49%, transparent 50%),
    radial-gradient(circle at 68% 30%, #ffffff22, transparent 45%);
  color: #f7f8fa;
}

.showcase-art::before {
  position: absolute;
  inset: 0;
  content: "";
  background-image: linear-gradient(#ffffff16 1px, transparent 1px),
    linear-gradient(90deg, #ffffff16 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: linear-gradient(to bottom, #000, transparent 90%);
}

.showcase-art--systems { background-color: #233b40; }
.showcase-art--web { background-color: #473b53; }
.showcase-art--infrastructure { background-color: #304354; }
.showcase-art--embedded { background-color: #574832; }

.showcase-art-symbol {
  position: relative;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(4rem, 7vw, 6rem);
  font-weight: 400;
  letter-spacing: -0.07em;
  line-height: 1;
}

.showcase-art-index {
  position: absolute;
  right: 1.15rem;
  bottom: 0.9rem;
  font-family: ui-monospace, monospace;
  font-size: 0.7rem;
  opacity: 0.78;
}

.showcase-card-body {
  display: flex;
  flex-direction: column;
  min-height: 17rem;
  padding: 1.4rem;
}

.showcase-card-category { margin-bottom: 0.45rem; }

.showcase-card h3 {
  margin: 0 0 0.7rem;
  border: 0;
  padding: 0;
  font-size: clamp(1.25rem, 1.8vw, 1.6rem);
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.showcase-card-description {
  flex-grow: 1;
  margin: 0 0 1.25rem;
  color: var(--vp-c-text-2);
  font-size: 0.88rem;
  line-height: 1.65;
}

.showcase-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 0 0 1.2rem;
  padding: 0;
  list-style: none;
}

.showcase-tags li {
  padding: 0.22rem 0.52rem;
  border-radius: 0.3rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.72rem;
}

.showcase-card-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.7rem 1rem;
}

.showcase-card-actions > a {
  align-self: flex-start;
  color: var(--vp-c-brand-1);
  font-size: 0.86rem;
  font-weight: 600;
  text-decoration: none;
}

.showcase-card-actions > a:hover,
.showcase-all-link:hover { text-decoration: underline; }

.showcase-all-link {
  display: inline-block;
  margin-top: 1.7rem;
  color: var(--vp-c-brand-1);
  font-size: 0.92rem;
  font-weight: 600;
}

.showcase-empty { padding: 2rem; text-align: center; color: var(--vp-c-text-2); }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

.showcase-filters button:focus-visible,
.showcase-search input:focus-visible,
.showcase-card a:focus-visible,
.showcase-all-link:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

@media (max-width: 850px) {
  .showcase-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .showcase-heading { align-items: start; flex-direction: column; gap: 0.85rem; }
  .showcase-intro { flex-basis: auto; max-width: 35rem; }
}

@media (max-width: 600px) {
  .portfolio-showcase { margin: 2rem auto 3rem; padding: 0 1rem; }
  .showcase-grid { grid-template-columns: minmax(0, 1fr); }
  .portfolio-showcase--catalogue .showcase-grid { grid-template-columns: minmax(0, 1fr); }
  .showcase-art { min-height: 9.5rem; }
  .showcase-card-body { min-height: 0; }
  .showcase-search, .showcase-search input { width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .showcase-card, .showcase-filters button { transition: none; }
  .showcase-card:hover { transform: none; }
}
</style>
