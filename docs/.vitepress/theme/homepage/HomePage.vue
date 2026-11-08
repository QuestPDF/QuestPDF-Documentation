<template>
  <div ref="root" class="custom-page home-page texture-dots" :style="wingStyle">
    <HomePageHero />

    <div class="content sections">
      <div class="cta-row">
        <!-- the planned cards, once the video tutorial and the sample gallery exist (see roadmap.md) -->
        <template v-if="plannedCardsReady">
          <HomePageCtaCard
              title="Invoice in 10 minutes"
              description="Learn the core concepts step by step, from blank page to finished PDF in under 200 lines of C# code."
              href="/quick-start.html">
            <template #visual="{ active, visible }">
              <HomePageCtaBuildVisual :active="active" :visible="visible" />
            </template>
          </HomePageCtaCard>

          <HomePageCtaCard
              title="230+ real-world examples"
              description="Get inspired by our catalog of predesigned components, then reuse them and adjust them to your needs."
              href="/sample-gallery.html"
              accent="#5C6BC0"
              accent-secondary="#3F51B5">
            <template #visual="{ active, visible }">
              <HomePageCtaDeckVisual :active="active" :visible="visible" />
            </template>
          </HomePageCtaCard>
        </template>

        <!-- the interim cards until then -->
        <template v-else>
          <HomePageCtaCard
              title="Read the tutorial"
              description="Learn the library and build a professional invoice under 200 lines of C# code"
              href="/invoice-tutorial.html">
            <template #visual="{ active, visible }">
              <HomePageCtaBuildVisual :active="active" :visible="visible" />
            </template>
          </HomePageCtaCard>

          <HomePageCtaCard
              title="Explore 120+ features"
              description="Explore QuestPDF features and learn to create documents that match your needs."
              href="/features-overview.html"
              accent="#5C6BC0"
              accent-secondary="#3F51B5">
            <template #visual="{ active, visible }">
              <HomePageCtaDeckVisual :active="active" :visible="visible" />
            </template>
          </HomePageCtaCard>
        </template>
      </div>

      <HomePageStatistics />

      <HomePageQuickStart />

      <div class="dotted-divider"></div>

      <HomePageCompanion />

      <div class="dotted-divider"></div>

      <HomePageTrust />

      <div class="dotted-divider"></div>

      <HomePageLicense />
    </div>
  </div>
</template>

<script setup lang="ts">

import HomePageHero from "./HomePageHero.vue";
import HomePageCtaCard from "./HomePageCtaCard.vue";
import HomePageCtaBuildVisual from "./HomePageCtaBuildVisual.vue";
import HomePageCtaDeckVisual from "./HomePageCtaDeckVisual.vue";
import HomePageStatistics from "./HomePageStatistics.vue";
import HomePageQuickStart from "./HomePageQuickStart.vue";
import HomePageCompanion from "./HomePageCompanion.vue";
import HomePageTrust from "./HomePageTrust.vue";
import HomePageLicense from "./HomePageLicense.vue";
import { ref } from "vue";
import { useDotWings } from "../dotWings";

/* flip once the video tutorial and the sample gallery are live; the footer's "Sample gallery" link goes with it */
const plannedCardsReady = false;

const root = ref<HTMLElement>();
const wingStyle = useDotWings(root);

</script>

<style scoped>

.home-page {
  --panel-padding: clamp(32px, 12.7px + 2.76vw, 48px) clamp(24px, 4.14vw - 4.95px, 48px);
  --vp-c-text-2: light-dark(#56565C, #B3B3B9);
  --hero-title-size: clamp(2.5rem, 1.75rem + 3.2vw, 4.5rem);
  --dots-clear: calc(12.5 * var(--hero-title-size) + 96px); /* the one-line hero title is 12.5em wide */
}

/* below this the wings beside the hero title would be under 150px wide */
@media screen and (max-width: 1239px) {
  .home-page::before,
  .home-page::after {
    display: none;
  }
}

.sections {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-top: 0;
  padding-bottom: 48px;
}

.cta-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 628px));
  justify-content: center;
  gap: 32px;
}

@media screen and (max-width: 1180px) {
  .cta-row {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }
}

</style>
