<script setup lang="ts">
interface FlowStep {
  title: string;
  detail: string;
}

defineProps<{
  title: string;
  steps: FlowStep[];
}>();
</script>

<template>
  <figure class="architecture-flow" :aria-label="title">
    <figcaption>{{ title }}</figcaption>
    <ol class="architecture-steps">
      <li v-for="(step, index) in steps" :key="index" class="architecture-step">
        <span class="step-count" aria-hidden="true">{{
          String(index + 1).padStart(2, "0")
        }}</span>
        <strong>{{ step.title }}</strong>
        <span class="step-detail">{{ step.detail }}</span>
      </li>
    </ol>
  </figure>
</template>

<style scoped>
.architecture-flow {
  margin: 1.5rem 0 2rem;
  padding: clamp(1rem, 2vw, 1.5rem);
  border: 1px solid var(--vp-c-divider);
  border-radius: 1rem;
  background: var(--vp-c-bg-soft);
}

.architecture-flow figcaption {
  margin-bottom: 1rem;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.architecture-steps {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.architecture-step {
  position: relative;
  flex: 1 1 9.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
  margin: 0;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.65rem;
  background: var(--vp-c-bg);
}

.step-count {
  color: var(--vp-c-brand-1);
  font:
    0.77rem ui-monospace,
    monospace;
}

.architecture-step strong {
  color: var(--vp-c-text-1);
  font-size: 0.98rem;
  line-height: 1.3;
}

.step-detail {
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  line-height: 1.55;
}

@media (max-width: 640px) {
  .architecture-steps {
    flex-direction: column;
  }
  .architecture-step {
    flex-basis: auto;
  }
}
</style>
