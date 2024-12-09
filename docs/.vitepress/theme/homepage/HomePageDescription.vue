<template>
  <section class="content">
    <h2>Designed to be efficient</h2>

    <div class="details">
      <div class="video-container">
        <video class="video" autoplay controls muted loop>
          <source src="/previewer/video-compressed.mp4" type="video/mp4">
        </video>
      </div>

      <HomePageStatistics />
    </div>
  </section>
</template>

<script setup>

import HomePageStatistics from "./HomePageStatistics.vue";

</script>

<style scoped>

/* Library details */

.details {
  display: flex;
  flex-direction: column;
  gap: 64px;
}

/* Video preview */

.video-container {
  background-image: conic-gradient(#EEE 0deg, #CCC 90deg, #2979FF55 135deg, #CCC 180deg, #EEE 270deg, #EEE 360deg);
  padding: 48px;
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