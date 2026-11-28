<template>
  <div class="panel companion">
    <div class="companion-text">
      <h2 class="card-title">Companion App</h2>
      <p class="card-description">Make a change, see the result. Hot-&#8288;reload keeps the preview in sync, so every tweak is quick and effortless.</p>

      <ul class="points" aria-label="What the Companion App does">
        <li v-for="point of points" :key="point.text">
          <Icon :icon="point.icon" />
          <span>{{ point.text }}</span>
        </li>
      </ul>

      <div class="actions">
        <a class="action primary" href="/companion.html">Get started</a>
        <CompanionDownload />
      </div>
    </div>

    <HomePageCompanionVideo class="companion-media" />
  </div>
</template>

<script setup lang="ts">
import { faArrowPointer, faBug, faCode, faFolderTree, faRulerCombined } from "@fortawesome/pro-regular-svg-icons";
import Icon from "../Icon.vue";
import CompanionDownload from "../CompanionDownload.vue";
import HomePageCompanionVideo from "./HomePageCompanionVideo.vue";

/* facts from docs/companion/features.md */
const points = [
  { icon: faFolderTree, text: "Explore the document structure" },
  { icon: faArrowPointer, text: "Inspect any element" },
  { icon: faRulerCombined, text: "Magnify and measure details" },
  { icon: faCode, text: "Jump from preview to code" },
  { icon: faBug, text: "Debug exceptions and layouts" }
];
</script>

<style scoped>

.companion {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 480px;
  grid-template-areas: "media text";
  gap: 64px;
  align-items: center;
}

.companion-text {
  grid-area: text;
}

.companion .card-description {
  text-wrap: pretty;
}

.companion-media {
  grid-area: media;
}


.points {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 24px 0 0;
}

.points li {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 6px 0;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.points .icon {
  flex-shrink: 0;
  width: 18px;
  margin-top: 0.25rem;
  font-size: 1rem;
  color: light-dark(var(--action), var(--vp-c-brand-1));
}


.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}


@media screen and (max-width: 1320px) {
  .companion {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: "text" "media";
    gap: 28px;
  }

  .companion-text,
  .companion-media {
    width: 100%;
    max-width: 920px;
    margin: 0 auto;
  }
}

</style>
