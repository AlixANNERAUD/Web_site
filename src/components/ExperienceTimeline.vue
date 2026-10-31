<script setup lang="ts">
import { reactive } from "vue";
import { ArrowUpRight, MapPin } from "lucide-vue-next";
import EditorialCard from "./EditorialCard.vue";
import TechnologyTags from "./TechnologyTags.vue";
import type {
  ExperienceLanguage,
  PortfolioExperience,
} from "../data/experiences";

defineProps<{
  entries: PortfolioExperience[];
  lang: ExperienceLanguage;
  currentLabel: string;
  technologiesLabel: string;
}>();

const failedLogos = reactive(new Set<string>());
function markLogoFailed(url: string) {
  failedLogos.add(url);
}
</script>

<template>
  <ol class="career-timeline">
    <li v-for="entry in entries" :key="entry.id" class="career-timeline-item">
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
            <span
              v-if="!entry.logo || failedLogos.has(entry.logo)"
              class="career-company-fallback"
              >{{ entry.monogram }}</span
            >
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
              <span v-if="entry.ongoing" class="career-current-label">{{
                currentLabel
              }}</span>
            </div>
            <h3 :id="entry.id + '-title'">{{ entry.role[lang] }}</h3>
          </div>
        </div>

        <div class="career-metadata">
          <span class="career-period">{{ entry.period[lang] }}</span>
          <span v-if="entry.location[lang]" class="career-location">
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
          :label="technologiesLabel"
          density="timeline"
        />
      </EditorialCard>
    </li>
  </ol>
</template>

<style scoped>
.career-timeline {
  margin: 0;
  padding: 0;
  list-style: none;
}
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
.career-timeline-item:last-child .career-timeline-rail {
  border-right-color: transparent;
}
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
.career-card-top {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}
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
.career-card-heading {
  min-width: 0;
  flex: 1;
}
.career-card-heading-top {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem 0.8rem;
}
.career-organization {
  margin: 0 0 0.35rem;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  font-weight: 600;
}
.career-organization a {
  display: inline-flex;
  align-items: center;
  gap: 0.15rem;
  color: inherit;
  text-decoration: none;
}
.career-organization a:hover {
  color: var(--vp-c-brand-1);
}
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
.career-period {
  display: none;
  font-weight: 600;
}
.career-location {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}
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
.career-highlights li {
  padding-left: 0.25rem;
  margin: 0.25rem 0;
}
.career-highlights li::marker {
  color: var(--vp-c-brand-1);
}
@media (max-width: 680px) {
  .career-timeline-item {
    grid-template-columns: 1.1rem minmax(0, 1fr);
    gap: 0.65rem;
  }
  .career-timeline-rail {
    padding: 0;
    align-items: flex-end;
  }
  .career-timeline-date {
    display: none;
  }
  .career-period {
    display: inline;
  }
  .career-timeline-dot {
    top: 1.4rem;
  }
  .career-company-mark {
    flex-basis: 4.25rem;
    width: 4.25rem;
    height: 3.3rem;
  }
  .career-company-logo {
    padding: 0.32rem;
  }
}
</style>
