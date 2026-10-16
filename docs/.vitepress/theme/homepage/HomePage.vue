<template>
  <div class="custom-page home-page">
    <HomePageHero />

    <div class="container">
      <div class="content sections">
        <!-- the gallery link is a placeholder until the page exists (see roadmap.md) -->
        <div class="cta-row">
          <HomePageCtaCard
              title="Build an invoice in 10 minutes"
              description="Learn the core concepts of QuestPDF, then build a complete invoice step by step. Go from a blank page to a finished PDF in fewer than 200 lines of C#."
              label="Watch the tutorial"
              href="/quick-start.html">
            <template #visual="{ active }">
              <HomePageCtaBuildVisual :active="active" />
            </template>
          </HomePageCtaCard>

          <HomePageCtaCard
              title="Explore the sample gallery"
              description="Explore complete document examples, reusable components and layout ideas. Each includes C# source code you can copy and adapt to your own projects."
              label="Browse the examples"
              href="/sample-gallery.html"
              accent="#5C6BC0"
              accent-secondary="#3F51B5">
            <template #visual="{ active }">
              <HomePageCtaDeckVisual :active="active" />
            </template>
          </HomePageCtaCard>
        </div>

        <div class="dotted-divider" aria-hidden="true"></div>

        <!-- one run, with no seams between these three -->
        <HomePageQuickStart />
        <HomePageCompanion />
        <HomePageTrust />

        <div class="dotted-divider" aria-hidden="true"></div>

        <HomePageLicense />
      </div>
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

<style>

/* everything under the hero is one column of panels; the hero's bottom padding spaces the first row */

.custom-page.home-page .sections {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-top: 0;
  padding-bottom: 48px;
}

/* more breathing room in the homepage panels: 48px from 1280px, down to the shared 32px by 24px at 700px */
.custom-page.home-page {
  --panel-padding: clamp(32px, 12.7px + 2.76vw, 48px) clamp(24px, 4.14vw - 4.95px, 48px);
}


/* side by side from 1181px; narrower, the text beside each visual would be a sliver */
.custom-page.home-page .cta-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
}

@media screen and (max-width: 1180px) {
  .custom-page.home-page .cta-row {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }
}

</style>
