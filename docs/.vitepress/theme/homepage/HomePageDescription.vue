<template>
  <section class="content">

    <h2>What is QuestPDF?</h2>

    <div class="details">
      <p class="definition">QuestPDF is <span class="highlight-background">an open-source .NET library for PDF generation</span>. Utilizing several new patterns and practices, QuestPDF seeks to resolve the challenges inherent in this process.</p>

      <div class="summary-list">
        <article v-for="summary of SummaryContent" class="summary-item">
          <img src="/homepage/tick.svg" width="28" alt="" />
          <p>{{ summary }}</p>
        </article>
      </div>

      <div class="video-container">
        <video class="video" autoplay controls muted loop>
          <source src="/previewer/video.mp4" type="video/mp4">
        </video>
      </div>

      <HomePageStatistics />
    </div>
  </section>
</template>

<script setup>

import { SummaryContent } from './configuration';
import HomePageStatistics from "./HomePageStatistics.vue";

</script>

<style scoped>

/* Library details */

.details {
  display: flex;
  flex-direction: column;
  gap: 64px;
}

p.definition {
  color: var(--vp-c-text-1);
  font-size: 1.25rem;
  line-height: 2rem;
}

/* Summary */

.summary-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 64px;
}

.summary-item {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 16px;
}

/* Video preview */

.video-container {
  background-image: conic-gradient(#EEE 0deg, #CCC 90deg, #2979FF55 135deg, #CCC 180deg, #EEE 270deg, #EEE 360deg);
  padding: 64px;
  border-radius: 12px;
}

html.dark .video-container {
  background-image: conic-gradient(#444 0deg, #333 90deg, #2979FF33 135deg, #3333 180deg, #444 270deg, #444 360deg);
}

.video {
  border-radius: 12px;
  filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.1));
}

@media screen and (max-width: 1000px) {
  .video-container {
    padding: 32px;
    margin: 0 -32px;
    border-radius: 0;
  }

  .video {
    border-radius: 6px;
  }
}

@media screen and (max-width: 500px) {
  .video-container {
    padding: 0;
    margin: 0 -32px;
  }

  .video {
    border-radius: 0;
  }
}

</style>