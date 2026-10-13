<template>
  <div class="custom-page home-page textured-page">
    <div class="container hero-container">
      <HomePageHero />
    </div>

    <div class="container">
      <HomePageQuickStart />
    </div>

    <div class="container">
      <section class="content bento-section">
<!--        <div class="section-header">-->
<!--          <div class="section-tag">Resources</div>-->
<!--          <h2>Ship your first PDF today</h2>-->
<!--          <p class="sub-header">Learn the essentials in a ten-minute video, start from a finished sample instead of a blank page, and see how far the library goes once your requirements grow.</p>-->
<!--        </div>-->

        <div class="home-bento">
          <HomePageGettingStarted />
          <HomePageSampleGallery />
        </div>
      </section>
    </div>

    <div class="container">
      <HomePageCompanion />
    </div>

    <div class="container">
      <HomePageTrust />
    </div>

    <div class="container">
      <HomePageLicense />
    </div>
  </div>
</template>

<script setup lang="ts">

import HomePageGettingStarted from "./HomePageGettingStarted.vue";
import HomePageSampleGallery from "./HomePageSampleGallery.vue";
import HomePageLicense from "./HomePageLicense.vue";
import HomePageCompanion from "./HomePageCompanion.vue";
import HomePageHero from "./HomePageHero.vue";
import HomePageTrust from "./HomePageTrust.vue";
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
  background-color: var(--custom-page-bg);
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

/* the hero's dot grid (HomePageHero.vue, position: absolute) is sized against this container */
.hero-container {
  position: relative;
}

/* Section seams
   Most sections no longer open with a header, so the gaps between them are plain canvas. The sections
   sit 48px apart instead of 64px, and each seam carries a faint dotted line across the content width,
   fading out at both ends, so the eye reads a break without a heading. The dots are the same 1px dots
   as the hero's dot grid, which is the only other dot texture on the page, and share its blue tint in light mode. The hero keeps its own
   64px padding and has no seam after it; the first seam sits below the quick start. */

.custom-page.home-page > .container .content {
  position: relative;
}

.custom-page.home-page > .container:not(.hero-container) .content {
  padding-top: 48px;
  padding-bottom: 48px;
}

.custom-page.home-page > .container + .container .content::before {
  content: "";
  position: absolute;
  top: -2px;
  left: 32px;
  right: 32px;
  height: 4px;
  pointer-events: none;
  background-image: radial-gradient(circle, color-mix(in srgb, color-mix(in srgb, #1E88E5 85%, var(--vp-c-text-1)) 40%, transparent) 1px, transparent 1.5px);
  background-size: 12px 4px;
  background-position: center;
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}

/* light dots on the dark canvas stand out more than dark dots on white, so they are fainter there */
html.dark .custom-page.home-page > .container + .container .content::before {
  background-image: radial-gradient(circle, color-mix(in srgb, var(--vp-c-text-1) 16%, transparent) 1px, transparent 1.5px);
}

/* no seam after the hero: the quick start follows it at the full 64px + 64px distance instead */
.custom-page.home-page .hero-container + .container .content {
  padding-top: 64px;
}

.custom-page.home-page .hero-container + .container .content::before {
  content: none;
}

/* the content side padding drops to 24px on phones, the line follows it */
@media screen and (max-width: 768px) {
  .custom-page.home-page > .container + .container .content::before {
    left: 24px;
    right: 24px;
  }
}

/* grey section panels get more breathing room on the homepage */
.custom-page.home-page .panel {
  padding: 48px;
}

/* no running text below 1rem on the homepage; the shared row lead is 0.9375rem elsewhere */
.custom-page.home-page .row-description {
  font-size: 1rem;
  line-height: 1.5rem;
}

@media screen and (max-width: 700px) {
  .custom-page.home-page .panel {
    padding: 32px 24px;
  }
}


/* Bento: the getting-started video and the sample gallery side by side. */

.custom-page.home-page .bento-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.custom-page.home-page .home-bento {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
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
