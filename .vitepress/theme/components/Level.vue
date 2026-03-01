<script setup>
import { Star } from "lucide-vue-next";

const props = defineProps({
  level: {
    type: Number,
    required: true,
    validator: (value) => [1, 2, 3, 4, 5].includes(value), // Ensure level is between 1 and 5
  },
});
</script>

<template>
  <div class="level">
    <Star v-for="i in 5" :key="i" :class="{ filled: i <= level }" />
  </div>
</template>

<style scoped>
.level {
  display: flex;
  gap: 0.25rem;
}

.filled {
  color: #f59e0b;
}
</style>
