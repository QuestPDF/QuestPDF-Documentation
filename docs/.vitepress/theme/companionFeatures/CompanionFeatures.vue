<script setup lang="ts">
import { ref } from "vue";
import { faCircleCheck, faTag } from "@fortawesome/pro-regular-svg-icons";
import Icon from "../Icon.vue";
import { useDotWings } from "../dotWings";
import HomePageCompanionVideo from "../homepage/HomePageCompanionVideo.vue";
import CompanionDownload from "../CompanionDownload.vue";
import CompanionUsage from "./CompanionUsage.vue";
import ShortcutSheet from "./ShortcutSheet.vue";
import { VERSION } from "../companionDownloads";

/* The Companion App's page: a page of its own, like Features Overview, with no documentation menu beside it. */
const page = ref<HTMLElement>();
useDotWings(page);
</script>

<template>
  <div ref="page" class="custom-page companion-page texture-dots">
    <div class="content">
      <header class="section-header with-lead">
        <h1>Companion App</h1>
        <p class="sub-header">Make a change, see the result. Hot reload keeps the preview in sync, and every tool below is one key or one click away.</p>
      </header>

      <HomePageCompanionVideo class="film" />

      <CompanionDownload class="download" primary align="center" />
      <ul class="download-facts">
        <li><Icon :icon="faTag" /><span>Version <span class="value">{{ VERSION }}</span></span></li>
        <li><Icon :icon="faCircleCheck" /><span>Works with QuestPDF <span class="value">2024.10</span> and newer</span></li>
      </ul>

      <div class="dotted-divider"></div>

      <CompanionUsage />

      <div class="dotted-divider"></div>

      <ShortcutSheet />
    </div>
  </div>
</template>

<style scoped>
.companion-page {
  --dots-clear: 888px; /* the header and 100px of air on each side */
}

/* from a tablet up the sentence takes two lines, the first ending at "in sync,": a width in em, so the break holds
   while the size follows the window */
.companion-page p.sub-header {
  max-width: 32em;
  margin-bottom: 3rem;
}

@media (min-width: 768px) {
  .companion-page p.sub-header {
    text-wrap: pretty;
  }
}


/* The homepage's recording of the app */

/* 630px tall: the whole window, its text readable, still fits a 13" laptop screen under the navbar */
.film {
  max-width: 1120px;
  margin: 0 auto;
}

/* the app window floats over the page: a hairline edge, then shadows from close and tight to far and soft */
html:not(.dark) .film {
  --film-shadow:
      0 0 0 1px rgba(16, 24, 40, 0.08),
      0 1px 2px rgba(16, 24, 40, 0.06),
      0 4px 8px -2px rgba(16, 24, 40, 0.06),
      0 16px 32px -8px rgba(16, 24, 40, 0.12),
      0 48px 96px -24px rgba(50, 50, 93, 0.3);
}

.download {
  margin: 64px auto 0;
}

/* two facts side by side, each on a line of its own on a phone; icons as in the download list */
.download-facts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 28px;
  margin-top: 20px;
  font-size: 0.875rem;
}

.download-facts li {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

/* 16px tall, as wide as the glyph: the tag is wider than tall, and a square box would draw it at 14px */
.download-facts .icon {
  width: auto;
  height: 1rem;
  color: color-mix(in srgb, var(--vp-c-text-1), var(--vp-c-text-3));
}

.download-facts .value {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.companion-page .dotted-divider {
  margin-block: var(--section-gap);
}

/* a link to a section (#getting-started, #shortcuts) lands it clear of the navbar */
.content > section {
  scroll-margin-top: calc(var(--vp-nav-height) + 24px);
}
</style>
