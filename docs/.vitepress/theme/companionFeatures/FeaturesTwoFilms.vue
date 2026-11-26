<script setup lang="ts">
import { ref } from "vue";
import Icon from "../Icon.vue";
import { useDotWings } from "../dotWings";
import FeaturesHero from "./FeaturesHero.vue";
import GetStarted from "./GetStarted.vue";
import FeatureClip from "./FeatureClip.vue";
import FilmVideo from "./FilmVideo.vue";
import FeatureDetails from "./FeatureDetails.vue";
import ShortcutSheet from "./ShortcutSheet.vue";
import DownloadClosing from "./DownloadClosing.vue";
import { features, toolsFilmPoints } from "./features";

/* PROTOTYPE, option 3: the short page carried by two films. Hero with the download; film 1 beside the getting-started
   steps; film 2 with the tools it shows listed under it; the layout status colours; the shortcuts; the download
   again. The films are the user's recordings (FilmVideo.vue). */
const layout = features.find(feature => feature.id === "layout")!;

const root = ref<HTMLElement>();
useDotWings(root);
</script>

<template>
  <div ref="root" class="custom-page texture-dots option">
    <div class="content">
      <FeaturesHero download />

      <div class="dotted-divider"></div>

      <GetStarted />

      <div class="dotted-divider"></div>

      <section id="tools" class="tools">
        <h2 class="section-title">Every tool one key or one click away</h2>

        <article class="panel tools-panel">
          <FilmVideo class="tools-film" name="tools" label="The Companion App: magnifier and measuring, the hierarchy, fitting the page, the code behind an element and searching" />

          <ul class="points">
            <li v-for="point of toolsFilmPoints" :key="point.id">
              <Icon class="point-icon" :icon="point.icon" />
              <h3 class="point-title">{{ point.title }}</h3>
              <p class="point-text">{{ point.text }}</p>
            </li>
          </ul>
        </article>
      </section>

      <article id="layout" class="panel row">
        <FeatureClip class="row-clip" :feature="layout" />

        <div class="row-text">
          <div class="row-heading">
            <Icon class="row-icon" :icon="layout.icon" />
            <h2 class="card-title">When content does not fit</h2>
          </div>
          <FeatureDetails :feature="layout" />
        </div>
      </article>

      <div class="dotted-divider"></div>

      <ShortcutSheet />

      <DownloadClosing />
    </div>
  </div>
</template>

<style scoped>

.option .content {
  display: flex;
  flex-direction: column;
  gap: var(--section-gap);
  container-type: inline-size;
}

.option .dotted-divider {
  margin: 24px 0;
}

.section-title {
  margin: 0 0 28px;
  text-align: center;
}


/* film 2, large, and what it shows under it */
.tools-panel {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.tools-film {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

.points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 32px 40px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.points li {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.point-icon {
  font-size: 1.375rem;
  color: light-dark(#1976D2, var(--vp-c-brand-1));
}

.point-title {
  margin: 4px 0 0;
  font-size: 1.0625rem;
  font-weight: 600;
  line-height: 1.5rem;
  color: var(--vp-c-text-1);
}

.point-text {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
  text-wrap: pretty;
}


/* the layout status colours, a homepage-style row */
.row {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: 48px;
  align-items: center;
  overflow: clip;
  scroll-margin-top: calc(var(--vp-nav-height) + 24px);
}

.row-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  container-type: inline-size;
}

.row-heading {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.row-icon {
  font-size: 1.5rem;
  color: light-dark(#1976D2, var(--vp-c-brand-1));
}

.row-text .card-title {
  margin: 0;
}

.row-text .details {
  align-self: stretch;
}

@container (max-width: 900px) {
  .row {
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
  }
}

</style>
