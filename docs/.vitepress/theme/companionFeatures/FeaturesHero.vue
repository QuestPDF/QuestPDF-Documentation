<script setup lang="ts">
import FilmVideo from "./FilmVideo.vue";
import DownloadButton from "./DownloadButton.vue";
import { VERSION } from "./downloads";

/* PROTOTYPE: the header every option shares, so the options differ only in how they lay out the features.
   With video it shows the recording of the app's tools (film 2 of option 3) under the text, and the download right under it. */
defineProps<{
  video?: boolean;
  /* the download button without the video (option 3, where films further down take its place) */
  download?: boolean;
}>();
</script>

<template>
  <header class="hero">
    <p class="eyebrow">Companion App</p>
    <h1 class="title">See your document while writing it</h1>
    <p class="sub-header">
      Make a change, see the result. Hot reload keeps the preview in sync, and every tool below is one key or one click away.
    </p>

    <FilmVideo v-if="video" id="video" class="hero-video" name="tools"
               label="The Companion App: magnifier and measuring, the hierarchy, fitting the page, the code behind an element and searching" />

    <template v-if="video || download">
      <DownloadButton class="hero-download" />
      <p class="hero-note">Version {{ VERSION }}, works with QuestPDF 2024.10 and newer.</p>
    </template>
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
  scroll-margin-top: calc(var(--vp-nav-height) + 24px);
  width: 100%;
  max-width: 960px;
  margin-top: 48px;
}

.hero-download {
  margin-top: 40px;
}

.hero-note {
  margin: 12px 0 0;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
}

</style>
