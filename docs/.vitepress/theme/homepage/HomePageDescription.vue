<template>
  <div class="container">

    <section style="display: flex; flex-direction: column;">
      <h2>What is QuestPDF?</h2>

      <div class="library-details" style="">
        <div>
          <p>QuestPDF is an open-source .NET library for PDF generation.</p>

          <p>Utilizing several new concepts and approaches, QuestPDF seeks to resolve the challenges inherent in this process. To make implementation as straightforward as possible, the library features a C# Fluent API.</p>

        </div>

        <p>Additionally, the QuestPDF Previewer expedites the development cycle by providing a hot-reload capability, allowing real-time results without recompiling code. Finally, the document structure is rendered through a comprehensive and flexible layout engine.</p>
      </div>
    </section>

    <HomePageStatistics />

    <div class="video-container">
      <video class="video" autoplay controls muted loop>
        <source src="/previewer/video.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script setup>

import HomePageStatistics from "./HomePageStatistics.vue";

</script>

<style scoped>

/* Library details */

.library-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 64px 96px;
}

@media screen and (max-width: 700px) {
  .library-details {
    grid-template-columns: 1fr;
  }
}

.library-details p {
  color: var(--vp-c-text-2);

  line-height: 24px;
  font-size: 1rem;

  margin-bottom: 1rem;
}

/* Video preview */

.video-container {
  background-image: conic-gradient(#EEE 0deg, #CCC 90deg, #2979FF55 135deg, #CCC 180deg, #EEE 270deg, #EEE 360deg);
  padding: 64px;
  border-radius: 12px;
  margin-top: 32px;
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