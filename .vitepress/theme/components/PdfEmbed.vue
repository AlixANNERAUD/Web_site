<template>
  <div class="pdf-container" style="height: calc(100vh - 64px); width: 100%">
    <iframe
      v-if="src"
      :src="src"
      type="application/pdf"
      frameborder="0"
      width="100%"
      height="100%"
      style="border: none"
    >
      <p>
        Your browser does not support PDFs.
        <a :href="src">Download the PDF</a> instead.
      </p>
    </iframe>
    <div v-else class="error-state">No PDF link provided.</div>
  </div>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.pdf-container {
  width: 100%;
  /* Adjust 100vh if you have a navbar; e.g., calc(100vh - 60px) */
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

iframe {
  display: block;
}

.error-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: sans-serif;
  color: #666;
}
</style>
