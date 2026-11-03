<template>
  <div class="custom-page home-page">
    <HomePageHero />

    <div class="content sections">
      <div class="cta-row">
        <!-- the planned cards, once the video tutorial and the sample gallery exist (see roadmap.md) -->
        <template v-if="plannedCardsReady">
          <HomePageCtaCard
              title="Invoice in 10 minutes"
              description="Learn the core concepts step by step, from blank page to finished PDF in under 200 lines of C# code."
              label="Watch the tutorial"
              href="/quick-start.html">
            <template #visual="{ active, visible }">
              <HomePageCtaBuildVisual :active="active" :visible="visible" />
            </template>
          </HomePageCtaCard>

          <HomePageCtaCard
              title="230+ real-world examples"
              description="Get inspired by our catalog of predesigned components, then reuse them and adjust them to your needs."
              label="Browse the gallery"
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
              title="Invoice in under 200 lines"
              description="Build a professional, paginated invoice step by step and learn the core concepts of QuestPDF along the way."
              label="Start the tutorial"
              href="/invoice-tutorial.html">
            <template #visual="{ active, visible }">
              <HomePageCtaTutorialVisual :active="active" :visible="visible" />
            </template>
          </HomePageCtaCard>

          <HomePageCtaCard
              title="120+ documented features"
              description="Browse every capability, from layout and typography to charts, barcodes and PDF/A output, each linked to its documentation."
              label="Explore the features"
              href="/features-overview.html"
              accent="#5C6BC0"
              accent-secondary="#3F51B5">
            <template #visual="{ active, visible }">
              <HomePageCtaFeaturesVisual :active="active" :visible="visible" />
            </template>
          </HomePageCtaCard>
        </template>
      </div>

      <div class="dotted-divider"></div>

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
import HomePageCtaTutorialVisual from "./HomePageCtaTutorialVisual.vue";
import HomePageCtaFeaturesVisual from "./HomePageCtaFeaturesVisual.vue";
import HomePageQuickStart from "./HomePageQuickStart.vue";
import HomePageCompanion from "./HomePageCompanion.vue";
import HomePageTrust from "./HomePageTrust.vue";
import HomePageLicense from "./HomePageLicense.vue";

/* flip once the video tutorial and the sample gallery are live; the footer's "Sample gallery" link goes with it */
const plannedCardsReady = false;

</script>

<style scoped>

.home-page {
  --panel-padding: clamp(32px, 12.7px + 2.76vw, 48px) clamp(24px, 4.14vw - 4.95px, 48px);
  --vp-c-text-2: light-dark(#56565C, #B3B3B9);
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
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
}

@media screen and (max-width: 1180px) {
  .cta-row {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }
}

</style>
