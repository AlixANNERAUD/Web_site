<script setup lang="ts">
import { computed, reactive } from "vue";
import EditorialHero from "./EditorialHero.vue";
import EditorialSectionHeading from "./EditorialSectionHeading.vue";
import EditorialNext from "./EditorialNext.vue";
import ExperienceTimeline from "./ExperienceTimeline.vue";
import { BriefcaseBusiness, ChevronDown, GraduationCap } from "lucide-vue-next";
import {
  experiences,
  type ExperienceGroup,
  type ExperienceLanguage,
} from "../data/experiences";

const props = withDefaults(defineProps<{ lang?: ExperienceLanguage }>(), {
  lang: "fr",
});

const sections: {
  id: ExperienceGroup;
  fr: string;
  en: string;
  countFr: string;
  countEn: string;
}[] = [
  {
    id: "professional",
    fr: "Parcours professionnel",
    en: "Professional experience",
    countFr: "Des produits, des systèmes et de la recherche.",
    countEn: "Products, systems and research.",
  },
  {
    id: "education",
    fr: "Formation et projets",
    en: "Education and projects",
    countFr: "Apprendre en construisant des solutions concrètes.",
    countEn: "Learning by building practical solutions.",
  },
];

const copy = computed(() =>
  props.lang === "fr"
    ? {
        eyebrow: "Parcours / Expériences",
        before: "Des systèmes aux",
        accent: "équipes.",
        intro:
          "J'aime comprendre comment les choses fonctionnent, puis concevoir les outils qui les rendent plus fiables et plus simples à utiliser. Mon parcours mêle développement, réseaux, sécurité et recherche.",
        selected: "Explorer mon parcours",
        current: "En cours",
        logoCredits:
          "Logos et marques : propriété de leurs organismes respectifs. Sources et crédits",
        technologies: "Technologies et domaines",
        earlierProfessionalShow: "Voir les expériences précédentes",
        earlierProfessionalHide: "Masquer les expériences précédentes",
        earlierEducationShow: "Voir les formations précédentes",
        earlierEducationHide: "Masquer les formations précédentes",
        next: "Et côté projets ?",
        nextText:
          "Découvrez les projets qui illustrent ces compétences, de Xila à l'auto-hébergement.",
        projects: "Découvrir mes projets",
        count: "étapes",
      }
    : {
        eyebrow: "Journey / Experience",
        before: "From systems to",
        accent: "people.",
        intro:
          "I enjoy understanding how things work and building tools that make them more reliable and easier to use. My background connects software, networking, security and research.",
        selected: "Explore my experience",
        current: "Ongoing",
        logoCredits:
          "Logos and trademarks belong to their respective owners. Sources and credits",
        technologies: "Technologies and domains",
        earlierProfessionalShow: "Show earlier experience",
        earlierProfessionalHide: "Hide earlier experience",
        earlierEducationShow: "Show earlier education",
        earlierEducationHide: "Hide earlier education",
        next: "What have I built?",
        nextText:
          "Explore the projects behind these skills, from Xila to self-hosted infrastructure.",
        projects: "Explore my projects",
        count: "milestones",
      },
);

function entriesFor(group: ExperienceGroup) {
  return experiences.filter((entry) => entry.group === group);
}

const projectsUrl = computed(() =>
  props.lang === "fr" ? "/fr/projects" : "/projects",
);
const navigation = computed(() =>
  sections.map((section) => ({
    href: "#" + section.id,
    label: section[props.lang],
  })),
);

// Older entries are hidden as entire cards, grouped by section.
const expandedGroups = reactive(new Set<ExperienceGroup>());
function toggleEarlier(group: ExperienceGroup) {
  if (expandedGroups.has(group)) expandedGroups.delete(group);
  else expandedGroups.add(group);
}
function recentEntriesFor(group: ExperienceGroup) {
  return entriesFor(group).filter((entry) => !entry.earlier);
}
function earlierEntriesFor(group: ExperienceGroup) {
  return entriesFor(group).filter((entry) => entry.earlier);
}
function visibleCountFor(group: ExperienceGroup): number {
  return (
    recentEntriesFor(group).length +
    (expandedGroups.has(group) ? earlierEntriesFor(group).length : 0)
  );
}
function earlierButtonLabel(group: ExperienceGroup): string {
  if (group === "professional") {
    return expandedGroups.has(group)
      ? copy.value.earlierProfessionalHide
      : copy.value.earlierProfessionalShow;
  }
  return expandedGroups.has(group)
    ? copy.value.earlierEducationHide
    : copy.value.earlierEducationShow;
}
</script>

<template>
  <div class="career-showcase editorial-page">
    <EditorialHero
      :eyebrow="copy.eyebrow"
      :title="copy.before"
      :accent="copy.accent"
      :intro="copy.intro"
      :nav-label="copy.selected"
      :nav-items="navigation"
    />

    <section
      v-for="(section, sectionIndex) in sections"
      :id="section.id"
      :key="section.id"
      class="career-group"
      :aria-labelledby="section.id + '-heading'"
    >
      <EditorialSectionHeading
        :heading-id="section.id + '-heading'"
        :eyebrow="
          String(sectionIndex + 1).padStart(2, '0') +
          ' / ' +
          visibleCountFor(section.id) +
          ' ' +
          copy.count
        "
        :title="section[lang]"
        :description="lang === 'fr' ? section.countFr : section.countEn"
      >
        <template #icon>
          <BriefcaseBusiness v-if="section.id === 'professional'" :size="22" />
          <GraduationCap v-else :size="22" />
        </template>
      </EditorialSectionHeading>

      <ExperienceTimeline
        :entries="recentEntriesFor(section.id)"
        :lang="lang"
        :current-label="copy.current"
        :technologies-label="copy.technologies"
      />

      <template v-if="earlierEntriesFor(section.id).length">
        <button
          type="button"
          class="career-earlier-toggle"
          :aria-expanded="expandedGroups.has(section.id)"
          :aria-controls="'earlier-' + section.id"
          @click="toggleEarlier(section.id)"
        >
          <span>{{ earlierButtonLabel(section.id) }}</span>
          <ChevronDown
            :size="17"
            :class="{
              'career-earlier-icon--open': expandedGroups.has(section.id),
            }"
            aria-hidden="true"
          />
        </button>

        <ExperienceTimeline
          :id="'earlier-' + section.id"
          v-show="expandedGroups.has(section.id)"
          class="career-timeline--earlier"
          :entries="earlierEntriesFor(section.id)"
          :lang="lang"
          :current-label="copy.current"
          :technologies-label="copy.technologies"
        />
      </template>
    </section>

    <EditorialNext
      :title="copy.next"
      :description="copy.nextText"
      :href="projectsUrl"
      :link-label="copy.projects"
    />
    <p class="career-logo-credits">
      <a
        :href="
          lang === 'fr'
            ? '/fr/legal-notice#credits-des-logos'
            : '/legal-notice#logo-credits'
        "
      >
        {{ copy.logoCredits }} ↗
      </a>
    </p>
  </div>
</template>

<style scoped>
.career-group {
  margin: 0 0 4.5rem;
  scroll-margin-top: 6rem;
}
.career-earlier-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  margin: 0.25rem 0 1.5rem 12.5rem;
  padding: 0.7rem 0.95rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.55rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  font-size: 0.88rem;
  font-weight: 650;
  cursor: pointer;
}
.career-earlier-toggle:hover {
  border-color: var(--vp-c-brand-1);
}
.career-earlier-toggle > span {
  min-width: 0;
  overflow-wrap: anywhere;
  text-align: left;
}
.career-earlier-toggle:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}
.career-earlier-toggle svg {
  transition: transform 160ms ease;
}
.career-earlier-icon--open {
  transform: rotate(180deg);
}
.career-timeline--earlier {
  margin-bottom: 0.3rem;
}
@media (max-width: 680px) {
  .career-earlier-toggle {
    margin-left: 1.75rem;
    max-width: calc(100% - 1.75rem);
    white-space: normal;
  }
}
@media (prefers-reduced-motion: reduce) {
  .career-earlier-toggle svg {
    transition: none;
  }
}
.career-logo-credits {
  margin: 0;
  color: var(--vp-c-text-3);
  font-size: 0.72rem;
}
.career-logo-credits a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.career-logo-credits a:hover {
  color: var(--vp-c-text-1);
}

.career-card a:focus-visible,
.career-logo-credits a:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}
</style>
