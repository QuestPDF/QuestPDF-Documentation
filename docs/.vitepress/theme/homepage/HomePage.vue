<template>
  <div class="custom-page home-page textured-page">
    <div class="container hero-container">
      <HomePageHero />
    </div>

    <div class="container texture-dots">
      <HomePageQuickStart />
    </div>

    <div class="container texture-dots">
      <section class="content bento-section">
        <div class="section-header">
          <div class="section-tag">Resources</div>
          <h2>Ship your first PDF today</h2>
          <p class="sub-header">Learn the essentials in a ten-minute video, start from a finished sample instead of a blank page, and see how far the library goes once your requirements grow.</p>
        </div>

        <div class="home-bento">
          <HomePageGettingStarted />
          <HomePageSampleGallery />
          <HomePageFeatures />
        </div>
      </section>
    </div>

    <div class="container texture-dots">
      <HomePageCompanion />
    </div>

    <div class="container texture-dots">
      <HomePageOverview />
    </div>

    <div class="container texture-dots">
      <HomePageStandardCompliance />
    </div>

    <div class="container texture-dots">
      <HomePageLicense />
    </div>
  </div>
</template>

<script setup lang="ts">

import HomePageOverview from "./HomePageOverview.vue";
import HomePageGettingStarted from "./HomePageGettingStarted.vue";
import HomePageSampleGallery from "./HomePageSampleGallery.vue";
import HomePageLicense from "./HomePageLicense.vue";
import HomePageCompanion from "./HomePageCompanion.vue";
import HomePageHero from "./HomePageHero.vue";
import HomePageStandardCompliance from "./HomePageStandardCompliance.vue";
import HomePageFeatures from "./HomePageFeatures.vue";
import HomePageQuickStart from "./HomePageQuickStart.vue";

</script>

<style>


.VPNavBar:not(.has-sidebar) .container {
  max-width: calc(var(--custom-page-width) - 64px);
}

.VPNavBar:not(.has-sidebar):not(.home) .container > .title {
  min-width: 0;
}


/* Background
   One continuous surface for the whole page: soft colour washes on the page colour, under a fine grain.
   It is painted on <body>, i.e. the canvas, so the sections, the strip under the navbar and the footer
   all share it with no seams. Washes are placed in page-height percentages and vary in shape and hue:
   a sky-blue glow behind the hero card, a violet glow behind the headline and a cyan wash at the foot
   of the hero (the hero is the most colourful part of the page), a faint cyan wash on the right by
   the quick start and bento, a teal wash by the Companion App, a tall blue glow along the right edge
   by the foundations and compliance, a light-blue wash on the left by the foundations, and an indigo
   wash behind the licensing pair. All hues stay next to the brand blue (yellows and greens were tried
   and rejected). None sit in the last stretch, so the footer stays calm. */

body:has(.custom-page.home-page) {
  background-color: var(--vp-c-bg);
  background-image:
      url("/homepage/grain.png"),
      radial-gradient(ellipse 1400px 700px at 92% 0%, color-mix(in srgb, #2196F3 22%, transparent), transparent 70%),
      radial-gradient(ellipse 1000px 500px at 30% 0%, color-mix(in srgb, #2196F3 9%, transparent), transparent 70%),
      radial-gradient(ellipse 800px 450px at 0% 2%, color-mix(in srgb, #5C6BC0 13%, transparent), transparent 70%),
      radial-gradient(ellipse 900px 400px at 55% 9%, color-mix(in srgb, #00BCD4 9%, transparent), transparent 70%),
      radial-gradient(ellipse 900px 700px at 100% 22%, color-mix(in srgb, #00BCD4 6%, transparent), transparent 70%),
      radial-gradient(ellipse 900px 1000px at 0% 42%, color-mix(in srgb, #26C6DA 8%, transparent), transparent 70%),
      radial-gradient(ellipse 600px 1800px at 100% 60%, color-mix(in srgb, #1E88E5 11%, transparent), transparent 70%),
      radial-gradient(ellipse 1000px 800px at 0% 64%, color-mix(in srgb, #039BE5 7%, transparent), transparent 70%),
      radial-gradient(ellipse 1200px 800px at 0% 80%, color-mix(in srgb, #3F51B5 9%, transparent), transparent 70%);
  background-size: 256px 256px, auto, auto, auto, auto, auto, auto, auto, auto, auto;
  background-repeat: repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;
}

html.dark body:has(.custom-page.home-page) {
  background-image:
      url("/homepage/grain.png"),
      radial-gradient(ellipse 1400px 700px at 92% 0%, color-mix(in srgb, #2196F3 24%, transparent), transparent 70%),
      radial-gradient(ellipse 1000px 500px at 30% 0%, color-mix(in srgb, #00BCD4 7%, transparent), transparent 70%),
      radial-gradient(ellipse 800px 450px at 0% 2%, color-mix(in srgb, #5C6BC0 12%, transparent), transparent 70%),
      radial-gradient(ellipse 900px 400px at 55% 9%, color-mix(in srgb, #00ACC1 9%, transparent), transparent 70%),
      radial-gradient(ellipse 900px 700px at 100% 22%, color-mix(in srgb, #00BCD4 7%, transparent), transparent 70%),
      radial-gradient(ellipse 900px 1000px at 0% 42%, color-mix(in srgb, #26A69A 12%, transparent), transparent 70%),
      radial-gradient(ellipse 600px 1800px at 100% 60%, color-mix(in srgb, #1E88E5 16%, transparent), transparent 70%),
      radial-gradient(ellipse 1000px 800px at 0% 64%, color-mix(in srgb, #039BE5 8%, transparent), transparent 70%),
      radial-gradient(ellipse 1200px 800px at 0% 80%, color-mix(in srgb, #3F51B5 14%, transparent), transparent 70%);
}

.hero-container {
  position: relative;
}

/* a hairline across the content width marks where the hero ends and the first section begins */
.hero-container::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: min(100% - 64px, var(--custom-page-width) - 64px);
  height: 1px;
  pointer-events: none;
  background-image: linear-gradient(90deg,
      transparent,
      color-mix(in srgb, var(--vp-c-text-1) 14%, transparent) 12%,
      color-mix(in srgb, var(--vp-c-text-1) 14%, transparent) 88%,
      transparent);
}

/* grey section panels get more breathing room on the homepage */
.custom-page.home-page .panel {
  padding: 64px;
}

@media screen and (max-width: 700px) {
  .custom-page.home-page .panel {
    padding: 32px 24px;
  }
}

/* headings inside grey panels are one step smaller than section headings */
.custom-page.home-page .panel h2 {
  font-size: 1.75rem;
  line-height: 2.25rem;
}

/* bento cards sit three to a section, so their headings are one step smaller again */
.custom-page.home-page .home-bento .panel h2 {
  font-size: 1.5rem;
  line-height: 2rem;
}


/* Bento: a section header, then the getting-started video and the sample gallery side by side,
   with the PDF generation and operations card spanning the full width below them. */

.custom-page.home-page .bento-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.custom-page.home-page .home-bento {
  width: 100%;
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
}

.custom-page.home-page .home-bento > .features-panel {
  grid-column: 1 / -1;
}

/* same stacking point as the Quick Start steps; below it the showcase cards are too narrow
   for their two-column page-stack layout */
@media screen and (max-width: 1280px) {
  .custom-page.home-page .home-bento {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* Chips: small labelled items (features, platforms) on a grey panel */

.custom-page.home-page .chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.custom-page.home-page .chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;

  border-radius: 12px;
  background-color: var(--home-surface-inner);

  color: var(--vp-c-text-1);
  font-size: 0.9375rem;
  line-height: 1.25rem;
  font-weight: 500;
  white-space: nowrap;
}

/* icons match the chip text: same colour, 16px */
.custom-page.home-page .chip i {
  width: 18px;
  text-align: center;
  font-size: 16px;
  color: inherit;
}


</style>
