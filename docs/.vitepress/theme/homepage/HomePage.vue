<template>
  <div class="custom-page home-page">
    <div class="container hero-container">
      <HomePageHero />
    </div>

    <div class="container">
      <div class="content sections">
        <!-- the two calls to action, right under the hero: the invoice tutorial (its video lives on the
             Quick Start page) and the sample gallery. The gallery href is a placeholder until the page
             exists (see roadmap.md); its indigo accent is the one the page background uses next to the
             brand blue. -->
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

        <!-- the quick start, the Companion App and the trust panels read as one run, with no seams between them -->
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

/* the hero's dot grid (HomePageHero.vue, position: absolute) is sized against this container */
.hero-container {
  position: relative;
}

/* Sections
   Everything under the hero is one column of panels, 32px apart. The sections open without a header,
   so the two breaks (after the calls to action, before the license) are marked by the shared dotted
   seam (CustomPages.css), 48px from the panels on either side, so the eye reads a break without a
   heading. The hero's own bottom padding spaces the CTA cards, so the column has none on top. */

.custom-page.home-page .sections {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-top: 0;
  padding-bottom: 48px;
}

/* grey section panels get more breathing room on the homepage */
.custom-page.home-page .panel {
  padding: 48px;
}

@media screen and (max-width: 700px) {
  .custom-page.home-page .panel {
    padding: 32px 24px;
  }
}


/* CTA row: the two cards side by side, stretched to the same height */

.custom-page.home-page .cta-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: 32px;
}

@media screen and (max-width: 900px) {
  .custom-page.home-page .cta-row {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }
}

</style>
