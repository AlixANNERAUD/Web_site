<script setup lang="ts">
import { computed, reactive } from "vue";
import EditorialHero from "./EditorialHero.vue";
import EditorialSectionHeading from "./EditorialSectionHeading.vue";
import EditorialNext from "./EditorialNext.vue";
import EditorialCard from "./EditorialCard.vue";
import TechnologyTags from "./TechnologyTags.vue";
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
        logoCredits: "Logos et marques : propriété de leurs organismes respectifs. Sources et crédits",
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
        logoCredits: "Logos and trademarks belong to their respective owners. Sources and credits",
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
const navigation = computed(() =>
  sections.map((section) => ({ href: "#" + section.id, label: section[props.lang] })),
);

// Logo failures fall back to readable initials without affecting the card.
const failedLogos = reactive(new Set<string>());
function markLogoFailed(url: string) {
  failedLogos.add(url);
}
</script>

<template>
  <div class="career-showcase">
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
        :eyebrow="String(sectionIndex + 1).padStart(2, '0') + ' / ' + entriesFor(section.id).length + ' ' + copy.count"
        :title="section[lang]"
        :description="lang === 'fr' ? section.countFr : section.countEn"
      >
        <template #icon>
          <BriefcaseBusiness v-if="section.id === 'professional'" :size="22" />
          <GraduationCap v-else :size="22" />
        </template>
      </EditorialSectionHeading>

      <ol class="career-timeline">
        <li v-for="entry in entriesFor(section.id)" :key="entry.id" class="career-timeline-item">
          <div class="career-timeline-rail" aria-hidden="true">
            <span class="career-timeline-dot"></span>
            <span class="career-timeline-date">{{ entry.period[lang] }}</span>
          </div>

          <EditorialCard
            class="career-card"
            variant="timeline"
            :highlighted="!!entry.ongoing"
            :aria-labelledby="entry.id + '-title'"
          >
            <div class="career-card-top">
              <span
                class="career-company-mark"
                :class="{ 'career-company-mark--dark': entry.logoOnDark }"
                aria-hidden="true"
              >
                <span v-if="!entry.logo || failedLogos.has(entry.logo)" class="career-company-fallback">{{ entry.monogram }}</span>
                <img
                  v-else
                  class="career-company-logo"
                  :src="entry.logo"
                  alt=""
                  width="88"
                  height="60"
                  loading="lazy"
                  decoding="async"
                  referrerpolicy="no-referrer"
                  @error="markLogoFailed(entry.logo)"
                />
              </span>
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

            <TechnologyTags
              v-if="entry.technologies.length"
              :tags="entry.technologies"
              :label="copy.technologies"
              density="timeline"
            />
          </EditorialCard>
        </li>
      </ol>

      <p class="career-other">
        <strong v-if="section.id === 'professional'">{{ copy.other }}</strong>
        {{ section.id === "professional" ? copy.earlier : copy.studies }}
      </p>
    </section>

    <EditorialNext
      :title="copy.next"
      :description="copy.nextText"
      :href="projectsUrl"
      :link-label="copy.projects"
    />
    <p class="career-logo-credits">
      <a
        :href="lang === 'fr' ? '/fr/legal-notice#credits-des-logos' : '/legal-notice#logo-credits'"
      >
        {{ copy.logoCredits }} ↗
      </a>
    </p>
  </div>
</template>

<style scoped>
.career-showcase {
  width: min(100%, 1180px);
  margin: 0 auto;
  padding: 3.5rem 1.5rem 6rem;
  color: var(--vp-c-text-1);
}

.career-section-index {
  margin: 0 0 0.9rem;
  color: var(--vp-c-text-2);
  font-size: 0.73rem;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.career-group { margin: 0 0 4.5rem; scroll-margin-top: 6rem; }
.career-section-index { margin: 0 0 0.5rem; }
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
.career-card-top { display: flex; align-items: flex-start; gap: 1rem; }
.career-company-mark {
  position: relative;
  display: grid;
  flex: 0 0 5.5rem;
  place-items: center;
  width: 5.5rem;
  height: 3.75rem;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.65rem;
  background: #fff;
  color: #254b55;
}
.career-company-mark--dark {
  background: #17191d;
  color: white;
}
.career-company-fallback {
  font-family: ui-monospace, monospace;
  font-size: 1.18rem;
  font-weight: 700;
  letter-spacing: -0.06em;
}
.career-company-logo {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0.45rem;
  object-fit: contain;
  background: inherit;
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
.career-other {
  margin: 0.3rem 0 0;
  padding: 1.1rem 1.2rem;
  border-left: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-size: 0.87rem;
  line-height: 1.65;
}
.career-other strong { color: var(--vp-c-text-1); margin-right: 0.3rem; }
.career-logo-credits {
  margin: 0;
  color: var(--vp-c-text-3);
  font-size: 0.72rem;
}
.career-logo-credits a { color: inherit; text-decoration: underline; text-underline-offset: 2px; }
.career-logo-credits a:hover { color: var(--vp-c-text-1); }

.career-logo-credits a:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 4px; }
@media (max-width: 680px) {
.career-showcase { padding: 2rem 1rem 4rem; }
  .career-timeline-item { grid-template-columns: 1.1rem minmax(0, 1fr); gap: 0.65rem; }
  .career-timeline-rail { padding: 0; align-items: flex-end; }
  .career-timeline-date { display: none; }
  .career-period { display: inline; }
  .career-timeline-dot { top: 1.4rem; }
  .career-company-mark { flex-basis: 4.25rem; width: 4.25rem; height: 3.3rem; }
  .career-company-logo { padding: 0.32rem; }
}

</style>
