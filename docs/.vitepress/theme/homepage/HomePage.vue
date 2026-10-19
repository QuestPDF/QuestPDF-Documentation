<template>
  <div class="custom-page home-page">
    <HomePageHero />

    <div class="content sections">
      <!-- the gallery link is a placeholder until the page exists (see roadmap.md) -->
      <div class="cta-row">
        <HomePageCtaCard
            title="Invoice in 10 minutes"
            description="Learn the core concepts step by step, from blank page to finished PDF in under 200 lines of C# code."
            label="Watch the tutorial"
            href="/quick-start.html">
          <template #visual="{ active }">
            <HomePageCtaBuildVisual :active="active" />
          </template>
        </HomePageCtaCard>

        <HomePageCtaCard
            title="230+ real-world examples"
            description="Get inspired by our catalog of predesigned components, then reuse them and adjust them to your needs."
            label="Browse the gallery"
            href="/sample-gallery.html"
            accent="#5C6BC0"
            accent-secondary="#3F51B5"
            light-glow="#536DFE">
          <template #visual="{ active }">
            <HomePageCtaDeckVisual :active="active" />
          </template>
        </HomePageCtaCard>
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
import HomePageQuickStart from "./HomePageQuickStart.vue";
import HomePageCompanion from "./HomePageCompanion.vue";
import HomePageTrust from "./HomePageTrust.vue";
import HomePageLicense from "./HomePageLicense.vue";

</script>

<style scoped>

/* more breathing room in the homepage panels: 48px from 1280px, down to the shared 32px by 24px at 700px */
.home-page {
  --panel-padding: clamp(32px, 12.7px + 2.76vw, 48px) clamp(24px, 4.14vw - 4.95px, 48px);
}

/* everything under the hero is one column of panels; the hero's own bottom padding spaces the first row */
.sections {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-top: 0;
  padding-bottom: 48px;
}

/* side by side from 1181px; narrower, the text beside each visual would be a sliver */
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
