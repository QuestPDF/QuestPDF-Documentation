<script setup lang="ts">
import HomePageCompanionVideo from "../../homepage/HomePageCompanionVideo.vue";

/* PROTOTYPE: the header every option shares, so the options differ only in how they lay out the features.
   With video it shows the homepage's Companion recording under the text. */
defineProps<{
  video?: boolean;
}>();
</script>

<template>
  <header class="hero">
    <p class="eyebrow">Companion App</p>
    <h1 class="title">See your document while writing it</h1>
    <p class="sub-header">
      Make a change, see the result. Hot reload keeps the preview in sync, and every tool below is one key or one click away.
    </p>

    <HomePageCompanionVideo v-if="video" class="hero-video" />
  </header>
</template>

<style scoped>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.eyebrow {
  margin: 0 0 12px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: light-dark(#1976D2, var(--vp-c-brand-1));
}

/* one line on a wide screen; a narrow one breaks it into even halves */
.title {
  margin: 0 0 1rem;
  text-wrap: balance;
}

.sub-header {
  max-width: 640px;
  text-wrap: pretty;
}

.hero-video {
  width: 100%;
  max-width: 960px;
  margin-top: 48px;
}

</style>
