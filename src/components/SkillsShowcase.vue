<script setup lang="ts">
import { computed } from "vue";
import EditorialHero from "./EditorialHero.vue";
import EditorialSectionHeading from "./EditorialSectionHeading.vue";
import EditorialNext from "./EditorialNext.vue";
import EditorialCard from "./EditorialCard.vue";
import TechnologyTags from "./TechnologyTags.vue";
import {
  ArrowUpRight,
  Bot,
  Code2,
  Cpu,
  Database,
  Languages,
  Server,
  Shield,
} from "lucide-vue-next";
import {
  portfolioProjects,
  projectDetailUrl,
  type PortfolioProject,
} from "../data/portfolioProjects";
import {
  skillDomains,
  spokenLanguages,
  type SkillEvidence,
  type SkillLanguage,
} from "../data/skills";

const props = withDefaults(defineProps<{ lang?: SkillLanguage }>(), {
  lang: "fr",
});

const icons = {
  cpu: Cpu,
  database: Database,
  code: Code2,
  server: Server,
  shield: Shield,
  bot: Bot,
};

const projectIndex = new Map<string, PortfolioProject>(
  portfolioProjects.map((project) => [project.id, project]),
);

const copy = computed(() =>
  props.lang === "fr"
    ? {
        eyebrow: "Expertise / Compétences",
        title: "Du code aux",
        emphasis: "systèmes.",
        intro:
          "Rust, web, infrastructure, réseau : je travaille sur des couches différentes, souvent dans les mêmes projets. Voici ce que je pratique et où le retrouver.",
        navigate: "Explorer",
        domainsNav: "Domaines techniques",
        languagesNav: "Langues",
        sectionNumber: "01 / Expertise",
        areas: "Ce que je construis.",
        areaIntro:
          "Six domaines complémentaires, illustrés par du code et des projets accessibles.",
        number: "domaines",
        evidence: "Voir en pratique",
        technologies: "Technologies pratiquées",
        languageNumber: "02 / Communication",
        languageTitle: "Travailler sans frontières.",
        languageIntro:
          "Une expérience de travail et de recherche dans des équipes internationales.",
        next: "Voir les projets en détail.",
        nextText:
          "Les compétences prennent tout leur sens quand elles servent une réalisation concrète.",
        projects: "Explorer les projets",
      }
    : {
        eyebrow: "Expertise / Skills",
        title: "From code to",
        emphasis: "systems.",
        intro:
          "Rust, web, infrastructure and networking: I work across different layers, often in the same project. Here is what I use and where to see it.",
        navigate: "Explore",
        domainsNav: "Technical domains",
        languagesNav: "Languages",
        sectionNumber: "01 / Expertise",
        areas: "What I build.",
        areaIntro:
          "Six complementary domains backed by code and projects you can explore.",
        number: "areas",
        evidence: "In practice",
        technologies: "Technologies in use",
        languageNumber: "02 / Communication",
        languageTitle: "Working across borders.",
        languageIntro:
          "Experience studying, researching and working with international teams.",
        next: "See the work behind it.",
        nextText:
          "Skills matter most when they solve a real engineering problem.",
        projects: "Explore projects",
      },
);

function evidenceTitle(evidence: SkillEvidence): string {
  if (evidence.projectId) {
    return (
      projectIndex.get(evidence.projectId)?.title[props.lang] ??
      evidence.projectId
    );
  }
  return evidence.label?.[props.lang] ?? "";
}

function evidenceHref(evidence: SkillEvidence): string {
  if (evidence.projectId) {
    const project = projectIndex.get(evidence.projectId);
    return project ? projectDetailUrl(project, props.lang) : "#domains";
  }
  if (!evidence.href) return "#domains";
  if (evidence.href.startsWith("/")) {
    return props.lang === "fr" ? "/fr" + evidence.href : evidence.href;
  }
  return evidence.href;
}

function isExternal(evidence: SkillEvidence): boolean {
  return !!evidence.href && /^https?:\/\//.test(evidence.href);
}

const projectsHref = computed(() =>
  props.lang === "fr" ? "/fr/projects" : "/projects",
);
const navigation = computed(() => [
  { href: "#domains", label: copy.value.domainsNav },
  { href: "#languages", label: copy.value.languagesNav },
]);
</script>

<template>
  <div class="skills-showcase editorial-page">
    <EditorialHero
      :eyebrow="copy.eyebrow"
      :title="copy.title"
      :accent="copy.emphasis"
      :intro="copy.intro"
      :nav-label="copy.navigate"
      :nav-items="navigation"
    />

    <section
      id="domains"
      class="skills-section"
      aria-labelledby="skills-domains-heading"
    >
      <EditorialSectionHeading
        heading-id="skills-domains-heading"
        :eyebrow="copy.sectionNumber"
        :title="copy.areas"
        :description="copy.areaIntro"
      >
        <template #aside>
          <span class="skills-count">
            <strong>{{ String(skillDomains.length).padStart(2, "0") }}</strong>
            <span>{{ copy.number }}</span>
          </span>
        </template>
      </EditorialSectionHeading>

      <div class="skills-domain-grid">
        <EditorialCard
          v-for="(domain, index) in skillDomains"
          :id="'skill-' + domain.id"
          :key="domain.id"
          class="skills-domain-card"
          variant="skill"
          :aria-labelledby="'skill-title-' + domain.id"
        >
          <div class="skills-card-top">
            <span class="skills-domain-icon" aria-hidden="true">
              <component
                :is="icons[domain.icon]"
                :size="23"
                :stroke-width="1.75"
              />
            </span>
            <span class="skills-card-index" aria-hidden="true">
              {{ String(index + 1).padStart(2, "0") }}
            </span>
          </div>

          <h3 :id="'skill-title-' + domain.id">{{ domain.title[lang] }}</h3>
          <p class="skills-domain-description">
            {{ domain.description[lang] }}
          </p>

          <TechnologyTags
            :tags="domain.technologies"
            :label="copy.technologies"
            density="skill"
          />

          <div class="skills-evidence">
            <h4>{{ copy.evidence }}</h4>
            <ul>
              <li
                v-for="(evidence, evidenceIndex) in domain.examples"
                :key="evidence.projectId || evidence.href || evidenceIndex"
              >
                <a
                  :href="evidenceHref(evidence)"
                  :target="isExternal(evidence) ? '_blank' : undefined"
                  :rel="
                    isExternal(evidence) ? 'noopener noreferrer' : undefined
                  "
                >
                  <span class="skills-evidence-name">{{
                    evidenceTitle(evidence)
                  }}</span>
                  <ArrowUpRight :size="16" aria-hidden="true" />
                </a>
                <p>{{ evidence.detail[lang] }}</p>
              </li>
            </ul>
          </div>
        </EditorialCard>
      </div>
    </section>

    <section
      id="languages"
      class="skills-languages"
      aria-labelledby="skills-languages-heading"
    >
      <EditorialSectionHeading
        heading-id="skills-languages-heading"
        :eyebrow="copy.languageNumber"
        :title="copy.languageTitle"
        :description="copy.languageIntro"
      >
        <template #aside>
          <span class="skills-language-icon" aria-hidden="true">
            <Languages :size="26" :stroke-width="1.75" />
          </span>
        </template>
      </EditorialSectionHeading>

      <ul class="skills-language-grid">
        <li v-for="language in spokenLanguages" :key="language.id">
          <strong>{{ language.name[lang] }}</strong>
          <span>{{ language.proficiency[lang] }}</span>
          <span v-if="language.detail" class="skills-language-detail">{{
            language.detail[lang]
          }}</span>
        </li>
      </ul>
    </section>

    <EditorialNext
      :title="copy.next"
      :description="copy.nextText"
      :href="projectsHref"
      :link-label="copy.projects"
    />
  </div>
</template>

<style scoped>
.skills-section,
.skills-languages {
  scroll-margin-top: 6rem;
}
.skills-section {
  margin-bottom: 4.5rem;
}

.skills-count {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.1rem;
  flex: 0 0 auto;
  color: var(--vp-c-text-2);
}

.skills-count strong {
  font-family: Georgia, "Times New Roman", serif;
  color: var(--vp-c-brand-1);
  font-size: 2.8rem;
  font-weight: 400;
  line-height: 1;
}

.skills-count span {
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.skills-domain-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.skills-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.2rem;
}

.skills-domain-icon,
.skills-language-icon {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 3.25rem;
  height: 3.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
}

.skills-card-index {
  color: var(--vp-c-text-3);
  font:
    500 0.8rem/1.4 ui-monospace,
    monospace;
}

.skills-domain-card h3 {
  margin: 0 0 0.6rem;
  border: 0;
  padding: 0;
  font-size: clamp(1.2rem, 2.1vw, 1.5rem);
  letter-spacing: -0.025em;
  line-height: 1.3;
}
.skills-domain-description {
  margin: 0 0 1.1rem;
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
  line-height: 1.7;
}

.skills-evidence {
  margin-top: auto;
  padding-top: 1.1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.skills-evidence h4 {
  margin: 0 0 0.75rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.skills-evidence ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 175px), 1fr));
  gap: 0.85rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.skills-evidence li {
  min-width: 0;
}

.skills-evidence a {
  display: inline-flex;
  align-items: baseline;
  gap: 0.35rem;
  color: var(--vp-c-text-1);
  font-size: 0.86rem;
  font-weight: 650;
  text-decoration: none;
}

.skills-evidence a:hover {
  color: var(--vp-c-brand-1);
}
.skills-evidence a svg {
  flex: 0 0 auto;
  color: var(--vp-c-brand-1);
}
.skills-evidence p {
  margin: 0.28rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
  line-height: 1.55;
}

.skills-languages {
  margin-bottom: 4rem;
}

.skills-language-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.8rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.skills-language-grid li {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  min-width: 0;
  min-height: 8rem;
  padding: 1.3rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  background: var(--vp-c-bg-soft);
}

.skills-language-grid strong {
  color: var(--vp-c-text-1);
  font-size: 1.03rem;
}

.skills-language-grid li > span {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.skills-language-grid .skills-language-detail {
  margin-top: auto;
  color: var(--vp-c-brand-1);
  font-size: 0.74rem;
  font-weight: 650;
  letter-spacing: 0.02em;
}

.skills-evidence a:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}

@media (max-width: 720px) {
  .skills-domain-grid {
    grid-template-columns: 1fr;
  }
  .skills-language-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .skills-language-grid li {
    padding: 1rem;
  }
  .skills-count strong {
    font-size: 2.2rem;
  }
  .skills-language-icon {
    display: none;
  }
}
</style>
