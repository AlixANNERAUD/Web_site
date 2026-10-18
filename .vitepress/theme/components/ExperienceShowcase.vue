<script setup lang="ts">
import { computed } from "vue";
import { ArrowUpRight, BriefcaseBusiness, GraduationCap, MapPin } from "lucide-vue-next";
import { experiences, type ExperienceGroup, type ExperienceLanguage } from "../data/experiences";

const props = withDefaults(defineProps<{ lang?: ExperienceLanguage }>(), { lang: "fr" });

const sections: { id: ExperienceGroup; fr: string; en: string; countFr: string; countEn: string }[] = [
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
        technologies: "Technologies et domaines",
        other: "Et aussi",
        earlier:
          "Stage de production chez Renault Cléon (2022) et assistance en communication chez Guenola Sahut (2019).",
        studies:
          "Formation initiale : baccalauréat scientifique, section européenne (2021). Certification Cambridge B1 Preliminary (2018).",
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
        technologies: "Technologies and domains",
        other: "Earlier experience",
        earlier:
          "Production internship at Renault Cléon (2022) and communication assistant work for Guenola Sahut (2019).",
        studies:
          "Earlier education: scientific baccalaureate, European section (2021). Cambridge B1 Preliminary certificate (2018).",
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

const projectsUrl = computed(() => (props.lang === "fr" ? "/fr/projects" : "/projects"));
</script>

<template>
  <div class="career-showcase">
    <header class="career-hero">
      <div class="career-hero-copy">
        <p class="career-eyebrow">{{ copy.eyebrow }}</p>
        <h1>{{ copy.before }} <em>{{ copy.accent }}</em></h1>
        <p class="career-intro">{{ copy.intro }}</p>
      </div>
      <nav class="career-section-nav" :aria-label="copy.selected">
        <span class="career-nav-label">{{ copy.selected }}</span>
        <a v-for="section in sections" :key="section.id" :href="'#' + section.id">
          <span>{{ section[lang] }}</span>
          <span aria-hidden="true">↘</span>
        </a>
      </nav>
    </header>

    <section
      v-for="(section, sectionIndex) in sections"
      :id="section.id"
      :key="section.id"
      class="career-group"
      :aria-labelledby="section.id + '-heading'"
    >
      <div class="career-group-heading">
        <div class="career-group-heading-main">
          <span class="career-group-icon" aria-hidden="true">
            <BriefcaseBusiness v-if="section.id === 'professional'" :size="22" />
            <GraduationCap v-else :size="22" />
          </span>
          <div>
            <p class="career-section-index">
              {{ String(sectionIndex + 1).padStart(2, "0") }} / {{ entriesFor(section.id).length }} {{ copy.count }}
            </p>
            <h2 :id="section.id + '-heading'">{{ section[lang] }}</h2>
            <p class="career-group-description">{{ lang === "fr" ? section.countFr : section.countEn }}</p>
          </div>
        </div>
      </div>

      <ol class="career-timeline">
        <li v-for="entry in entriesFor(section.id)" :key="entry.id" class="career-timeline-item">
          <div class="career-timeline-rail" aria-hidden="true">
            <span class="career-timeline-dot"></span>
            <span class="career-timeline-date">{{ entry.period[lang] }}</span>
          </div>

          <article
            class="career-card"
            :class="{ 'career-card-current': entry.ongoing }"
            :aria-labelledby="entry.id + '-title'"
          >
            <div class="career-card-top">
              <div class="career-company-mark" aria-hidden="true">{{ entry.monogram }}</div>
              <div class="career-card-heading">
                <div class="career-card-heading-top">
                  <p class="career-organization">
                    <a
                      v-if="entry.companyUrl"
                      :href="entry.companyUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {{ entry.company }}
                      <ArrowUpRight :size="15" aria-hidden="true" />
                    </a>
                    <span v-else>{{ entry.company }}</span>
                  </p>
                  <span v-if="entry.ongoing" class="career-current-label">{{ copy.current }}</span>
                </div>
                <h3 :id="entry.id + '-title'">{{ entry.role[lang] }}</h3>
              </div>
            </div>

            <div class="career-metadata">
              <span class="career-period">{{ entry.period[lang] }}</span>
              <span class="career-location">
                <MapPin :size="14" aria-hidden="true" /> {{ entry.location[lang] }}
              </span>
            </div>

            <p class="career-summary">{{ entry.summary[lang] }}</p>

            <ul v-if="entry.highlights.length" class="career-highlights">
              <li v-for="(highlight, index) in entry.highlights" :key="index">
                {{ highlight[lang] }}
              </li>
            </ul>

            <ul v-if="entry.technologies.length" class="career-tags" :aria-label="copy.technologies">
              <li v-for="technology in entry.technologies" :key="technology">
                {{ technology }}
              </li>
            </ul>
          </article>
        </li>
      </ol>

      <p class="career-other">
        <strong v-if="section.id === 'professional'">{{ copy.other }}</strong>
        {{ section.id === "professional" ? copy.earlier : copy.studies }}
      </p>
    </section>

    <footer class="career-next">
      <div>
        <p class="career-eyebrow">Next / 03</p>
        <h2>{{ copy.next }}</h2>
        <p>{{ copy.nextText }}</p>
      </div>
      <a :href="projectsUrl">
        {{ copy.projects }} <ArrowUpRight :size="19" aria-hidden="true" />
      </a>
    </footer>
  </div>
</template>

<style scoped>
.career-showcase {
  width: min(100%, 1180px);
  margin: 0 auto;
  padding: 3.5rem 1.5rem 6rem;
  color: var(--vp-c-text-1);
}

.career-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(230px, 290px);
  align-items: end;
  gap: 2.5rem;
  padding: 1.5rem 0 3.5rem;
  margin-bottom: 3.7rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.career-eyebrow, .career-section-index, .career-nav-label {
  margin: 0 0 0.9rem;
  color: var(--vp-c-text-2);
  font-size: 0.73rem;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.career-hero h1 {
  margin: 0;
  border: 0;
  padding: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.6rem, 5.5vw, 5.4rem);
  font-weight: 400;
  letter-spacing: -0.055em;
  line-height: 1.07;
}

.career-hero h1 em {
  color: var(--vp-c-brand-1);
  font-weight: 400;
}

.career-intro {
  max-width: 39rem;
  margin: 1.45rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 1.01rem;
  line-height: 1.75;
}

.career-section-nav {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 1rem 1.15rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  background: var(--vp-c-bg-soft);
}

.career-section-nav .career-nav-label { margin-bottom: 0.65rem; }
.career-section-nav a {
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
.career-section-nav a span:last-child { color: var(--vp-c-brand-1); }

.career-group { margin: 0 0 4.5rem; scroll-margin-top: 6rem; }
.career-group-heading {
  display: flex;
  gap: 1rem;
  padding: 0 0 1.5rem;
}

.career-group-heading-main { display: flex; align-items: flex-start; gap: 1.15rem; }
.career-group-icon {
  display: flex;
  flex: 0 0 3.1rem;
  align-items: center;
  justify-content: center;
  width: 3.1rem;
  height: 3.1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.75rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
}
.career-section-index { margin: 0 0 0.5rem; }
.career-group h2 {
  margin: 0;
  padding: 0;
  border: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2rem, 3.6vw, 3.2rem);
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 1.15;
}
.career-group-description {
  margin: 0.45rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}
.career-timeline { margin: 0; padding: 0; list-style: none; }
.career-timeline-item {
  display: grid;
  grid-template-columns: 11rem minmax(0, 1fr);
  gap: 1.5rem;
}
.career-timeline-rail {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1.7rem 1.5rem 0 0;
  border-right: 1px solid var(--vp-c-divider);
}
.career-timeline-item:last-child .career-timeline-rail { border-right-color: transparent; }
.career-timeline-dot {
  position: absolute;
  z-index: 1;
  top: 2.1rem;
  right: -0.34rem;
  width: 0.68rem;
  height: 0.68rem;
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 50%;
  background: var(--vp-c-bg);
}
.career-timeline-date {
  color: var(--vp-c-text-2);
  font-size: 0.76rem;
  line-height: 1.5;
  text-align: right;
}

.career-card {
  min-width: 0;
  margin: 0 0 1.25rem;
  padding: clamp(1.1rem, 2.5vw, 1.85rem);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.85rem;
  background: var(--vp-c-bg);
  transition: border-color 180ms ease, transform 180ms ease;
}
.career-card:hover { border-color: var(--vp-c-brand-1); transform: translateY(-2px); }
.career-card-current {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 45%, var(--vp-c-divider));
  background: color-mix(in srgb, var(--vp-c-brand-soft) 22%, var(--vp-c-bg));
}
.career-card-top { display: flex; align-items: flex-start; gap: 1rem; }
.career-company-mark {
  display: grid;
  flex: 0 0 3.35rem;
  place-items: center;
  height: 3.35rem;
  border-radius: 0.7rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  font-family: ui-monospace, monospace;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.06em;
}
.career-card-heading { min-width: 0; flex: 1; }
.career-card-heading-top { display: flex; align-items: center; flex-wrap: wrap; gap: 0.4rem 0.8rem; }
.career-organization {
  margin: 0 0 0.35rem;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  font-weight: 600;
}
.career-organization a { display: inline-flex; align-items: center; gap: 0.15rem; color: inherit; text-decoration: none; }
.career-organization a:hover { color: var(--vp-c-brand-1); }
.career-card h3 {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: clamp(1.19rem, 2.2vw, 1.55rem);
  line-height: 1.3;
  letter-spacing: -0.025em;
}
.career-current-label {
  display: inline-flex;
  align-items: center;
  margin: 0 0 0.35rem;
  padding: 0.17rem 0.5rem;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 99px;
  color: var(--vp-c-brand-1);
  font-size: 0.66rem;
  font-weight: 650;
}
.career-metadata {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem 1rem;
  margin: 1.1rem 0 0.9rem;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
}
.career-period { display: none; font-weight: 600; }
.career-location { display: inline-flex; align-items: center; gap: 0.25rem; }
.career-summary {
  margin: 0 0 0.85rem;
  color: var(--vp-c-text-1);
  font-size: 0.93rem;
  line-height: 1.65;
}
.career-highlights {
  margin: 0.75rem 0 1.2rem;
  padding-left: 1.1rem;
  color: var(--vp-c-text-2);
  font-size: 0.86rem;
  line-height: 1.7;
}
.career-highlights li { padding-left: 0.25rem; margin: 0.25rem 0; }
.career-highlights li::marker { color: var(--vp-c-brand-1); }
.career-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; padding: 0; margin: 1rem 0 0; list-style: none; }
.career-tags li {
  padding: 0.28rem 0.52rem;
  border-radius: 0.35rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.71rem;
  line-height: 1.4;
}
.career-other {
  margin: 0.3rem 0 0;
  padding: 1.1rem 1.2rem;
  border-left: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-size: 0.87rem;
  line-height: 1.65;
}
.career-other strong { color: var(--vp-c-text-1); margin-right: 0.3rem; }
.career-next {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 2rem 0;
  border-top: 1px solid var(--vp-c-divider);
}
.career-next h2 {
  margin: 0 0 0.45rem;
  border: 0;
  padding: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.65rem, 3vw, 2.5rem);
  font-weight: 400;
}
.career-next p:last-child { color: var(--vp-c-text-2); margin: 0; }
.career-next a {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 0.5rem;
  padding: 0.75rem 0.95rem;
  color: var(--vp-c-brand-1);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
}
.career-section-nav a:focus-visible,
.career-card a:focus-visible,
.career-next a:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 4px; }

@media (max-width: 960px) {
  .career-hero { grid-template-columns: 1fr; padding-bottom: 2.5rem; }
  .career-section-nav { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 0.5rem 1.3rem; }
  .career-section-nav .career-nav-label { flex-basis: 100%; margin: 0; }
  .career-section-nav a { gap: 1rem; border: 0; }
}
@media (max-width: 680px) {
  .career-showcase { padding: 2rem 1rem 4rem; }
  .career-hero { gap: 1.25rem; margin-bottom: 2.5rem; }
  .career-timeline-item { grid-template-columns: 1.1rem minmax(0, 1fr); gap: 0.65rem; }
  .career-timeline-rail { padding: 0; align-items: flex-end; }
  .career-timeline-date { display: none; }
  .career-period { display: inline; }
  .career-timeline-dot { top: 1.4rem; }
  .career-card { padding: 1rem; }
  .career-company-mark { flex-basis: 2.8rem; height: 2.8rem; }
  .career-next { flex-direction: column; align-items: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  .career-card { transition: none; }
  .career-card:hover { transform: none; }
}
</style>
