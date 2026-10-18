<script setup lang="ts">
import { computed } from "vue";
import {
  ArrowDownRight,
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
    return projectIndex.get(evidence.projectId)?.title[props.lang] ?? evidence.projectId;
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

const projectsHref = computed(() => (props.lang === "fr" ? "/fr/projects" : "/projects"));
</script>

<template>
  <div class="skills-showcase">
    <header class="skills-hero">
      <div class="skills-hero-main">
        <p class="skills-eyebrow">{{ copy.eyebrow }}</p>
        <h1>{{ copy.title }} <em>{{ copy.emphasis }}</em></h1>
        <p class="skills-intro">{{ copy.intro }}</p>
      </div>
      <nav class="skills-section-nav" :aria-label="copy.navigate">
        <p class="skills-nav-caption">{{ copy.navigate }}</p>
        <a href="#domains">
          <span>{{ copy.domainsNav }}</span>
          <ArrowDownRight :size="17" aria-hidden="true" />
        </a>
        <a href="#languages">
          <span>{{ copy.languagesNav }}</span>
          <ArrowDownRight :size="17" aria-hidden="true" />
        </a>
      </nav>
    </header>

    <section id="domains" class="skills-section" aria-labelledby="skills-domains-heading">
      <div class="skills-section-heading">
        <div>
          <p class="skills-eyebrow">{{ copy.sectionNumber }}</p>
          <h2 id="skills-domains-heading">{{ copy.areas }}</h2>
          <p class="skills-section-intro">{{ copy.areaIntro }}</p>
        </div>
        <span class="skills-count" aria-label="">
          <strong>{{ String(skillDomains.length).padStart(2, "0") }}</strong>
          <span>{{ copy.number }}</span>
        </span>
      </div>

      <div class="skills-domain-grid">
        <article
          v-for="(domain, index) in skillDomains"
          :id="'skill-' + domain.id"
          :key="domain.id"
          class="skills-domain-card"
          :aria-labelledby="'skill-title-' + domain.id"
        >
          <div class="skills-card-top">
            <span class="skills-domain-icon" aria-hidden="true">
              <component :is="icons[domain.icon]" :size="23" :stroke-width="1.75" />
            </span>
            <span class="skills-card-index" aria-hidden="true">
              {{ String(index + 1).padStart(2, "0") }}
            </span>
          </div>

          <h3 :id="'skill-title-' + domain.id">{{ domain.title[lang] }}</h3>
          <p class="skills-domain-description">{{ domain.description[lang] }}</p>

          <ul class="skills-tech-list" :aria-label="copy.technologies">
            <li v-for="technology in domain.technologies" :key="technology">
              {{ technology }}
            </li>
          </ul>

          <div class="skills-evidence">
            <h4>{{ copy.evidence }}</h4>
            <ul>
              <li v-for="(evidence, evidenceIndex) in domain.examples" :key="evidence.projectId || evidence.href || evidenceIndex">
                <a
                  :href="evidenceHref(evidence)"
                  :target="isExternal(evidence) ? '_blank' : undefined"
                  :rel="isExternal(evidence) ? 'noopener noreferrer' : undefined"
                >
                  <span class="skills-evidence-name">{{ evidenceTitle(evidence) }}</span>
                  <ArrowUpRight :size="16" aria-hidden="true" />
                </a>
                <p>{{ evidence.detail[lang] }}</p>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <section id="languages" class="skills-languages" aria-labelledby="skills-languages-heading">
      <div class="skills-section-heading">
        <div>
          <p class="skills-eyebrow">{{ copy.languageNumber }}</p>
          <h2 id="skills-languages-heading">{{ copy.languageTitle }}</h2>
          <p class="skills-section-intro">{{ copy.languageIntro }}</p>
        </div>
        <span class="skills-language-icon" aria-hidden="true">
          <Languages :size="26" :stroke-width="1.75" />
        </span>
      </div>

      <ul class="skills-language-grid">
        <li v-for="language in spokenLanguages" :key="language.id">
          <strong>{{ language.name[lang] }}</strong>
          <span>{{ language.proficiency[lang] }}</span>
          <span v-if="language.detail" class="skills-language-detail">{{ language.detail[lang] }}</span>
        </li>
      </ul>
    </section>

    <footer class="skills-next">
      <div>
        <p class="skills-eyebrow">Next / 03</p>
        <h2>{{ copy.next }}</h2>
        <p>{{ copy.nextText }}</p>
      </div>
      <a :href="projectsHref">
        {{ copy.projects }}
        <ArrowUpRight :size="19" aria-hidden="true" />
      </a>
    </footer>
  </div>
</template>

<style scoped>
.skills-showcase {
  width: min(100%, 1180px);
  margin: 0 auto;
  padding: 3.5rem 1.5rem 6rem;
  color: var(--vp-c-text-1);
}

.skills-eyebrow,
.skills-nav-caption {
  margin: 0 0 0.9rem;
  color: var(--vp-c-text-2);
  font-size: 0.73rem;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.skills-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(230px, 290px);
  align-items: end;
  gap: 2.5rem;
  padding: 1.5rem 0 3.5rem;
  margin-bottom: 3.7rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.skills-hero h1 {
  margin: 0;
  border: 0;
  padding: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.6rem, 5.5vw, 5.4rem);
  font-weight: 400;
  letter-spacing: -0.055em;
  line-height: 1.07;
}

.skills-hero h1 em {
  color: var(--vp-c-brand-1);
  font-weight: 400;
}

.skills-intro {
  max-width: 39rem;
  margin: 1.45rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 1.01rem;
  line-height: 1.75;
}

.skills-section-nav {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 1rem 1.15rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  background: var(--vp-c-bg-soft);
}

.skills-section-nav .skills-nav-caption { margin-bottom: 0.65rem; }

.skills-section-nav a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  font-size: 0.86rem;
  font-weight: 600;
  text-decoration: none;
}

.skills-section-nav a svg { color: var(--vp-c-brand-1); }
.skills-section,
.skills-languages { scroll-margin-top: 6rem; }
.skills-section { margin-bottom: 4.5rem; }

.skills-section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.25rem;
  margin-bottom: 1.75rem;
}

.skills-section-heading h2 {
  margin: 0;
  border: 0;
  padding: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2rem, 3.6vw, 3.2rem);
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 1.15;
}

.skills-section-intro {
  margin: 0.65rem 0 0;
  max-width: 38rem;
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
  line-height: 1.7;
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

.skills-domain-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: clamp(1.3rem, 2.5vw, 1.9rem);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.85rem;
  background: var(--vp-c-bg);
  scroll-margin-top: 6rem;
  transition: border-color 180ms ease, transform 180ms ease;
}

.skills-domain-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
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
  font: 500 0.8rem/1.4 ui-monospace, monospace;
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

.skills-tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0 0 1.45rem;
  padding: 0;
  list-style: none;
}

.skills-tech-list li {
  padding: 0.32rem 0.56rem;
  border-radius: 0.38rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.76rem;
  line-height: 1.35;
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

.skills-evidence li { min-width: 0; }

.skills-evidence a {
  display: inline-flex;
  align-items: baseline;
  gap: 0.35rem;
  color: var(--vp-c-text-1);
  font-size: 0.86rem;
  font-weight: 650;
  text-decoration: none;
}

.skills-evidence a:hover { color: var(--vp-c-brand-1); }
.skills-evidence a svg { flex: 0 0 auto; color: var(--vp-c-brand-1); }
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

.skills-next {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 0;
  border-top: 1px solid var(--vp-c-divider);
}

.skills-next h2 {
  margin: 0 0 0.45rem;
  border: 0;
  padding: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.65rem, 3vw, 2.5rem);
  font-weight: 400;
}

.skills-next p:last-child {
  margin: 0;
  color: var(--vp-c-text-2);
}

.skills-next a {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.75rem 0.95rem;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 0.5rem;
  color: var(--vp-c-brand-1);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
}

.skills-section-nav a:focus-visible,
.skills-evidence a:focus-visible,
.skills-next a:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}

@media (max-width: 960px) {
  .skills-hero { grid-template-columns: 1fr; gap: 1.25rem; padding-bottom: 2.5rem; }
  .skills-section-nav { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 0.5rem 1.3rem; }
  .skills-section-nav .skills-nav-caption { flex-basis: 100%; margin: 0; }
  .skills-section-nav a { border: 0; gap: 1rem; }
}

@media (max-width: 720px) {
  .skills-domain-grid { grid-template-columns: 1fr; }
  .skills-language-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .skills-hero { margin-bottom: 2.5rem; }
}

@media (max-width: 560px) {
  .skills-showcase { padding: 2rem 1rem 4rem; }
  .skills-domain-card { padding: 1.15rem; }
  .skills-language-grid li { padding: 1rem; }
  .skills-next { flex-direction: column; align-items: flex-start; }
  .skills-count strong { font-size: 2.2rem; }
  .skills-language-icon { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .skills-domain-card { transition: none; }
  .skills-domain-card:hover { transform: none; }
}
</style>
