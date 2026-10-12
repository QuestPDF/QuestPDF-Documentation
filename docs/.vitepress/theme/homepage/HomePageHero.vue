<script setup lang="ts">
import { data as statistics } from "../statistics.data";
</script>

<template>
  <div class="hero-pattern" />

  <section class="content">
    <div class="text" style="z-index: 10; display: flex; flex-direction: column; gap: 16px;">
      <h1>
        <span class="highlight-foreground">Code-first</span> PDF <br>generation <span class="keep-together">for C#</span>
      </h1>

      <div class="tagline">
        Design documents the way you design software, in readable C# code that renders to precise, standards-compliant PDFs on every platform.
      </div>

      <div class="cta-buttons">
        <a class="action primary" href="/quick-start.html">Quick Start</a>
        <a class="action" href="/features-overview.html">Features Overview</a>
      </div>
    </div>

    <!-- the adoption numbers card -->
    <aside class="hero-cards">
      <div class="hero-card statistics">
        <a v-for="statistic in statistics" :key="statistic.label" :href="statistic.link" :target="statistic.link.startsWith('http') ? '_blank' : undefined" rel="noopener" class="statistic">
          <span class="statistic-icon">
            <i class="fa-solid" :class="[statistic.icon]"></i>
          </span>

          <span class="title">
            <span class="value">{{ statistic.value }}</span>
            <span class="label">{{ statistic.label }}</span>
          </span>
        </a>
      </div>
    </aside>
  </section>
</template>


<style scoped>

/* Layout */

.content {
  position: relative;

  display: grid;
  grid-template-columns: minmax(0, 1fr) auto; /* the text caps its own width, the card takes what its stats need */
  grid-template-rows: auto;
  grid-gap: 64px;
  align-items: center;

  /* 64px above (after the -64px pull-up) and 64px below */
  margin-top: -64px;
  padding-top: 128px;
  padding-bottom: 64px;
}

@media screen and (max-width: 1023px) {
  .content {
    grid-gap: 48px;
  }
}

@media screen and (max-width: 820px) {
  .content {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
}

@media screen and (max-width: 400px) {
  h1 br {
    display: none;
  }
}


/* Content styles */

/* the text column is a size container so the headline can scale with the room the cards leave it:
   "generation for C#" is about 8x the font size wide, so 11.5cqi keeps it on one line and the
   clamp holds it between the phone size and the full 4.5rem */
.text {
  container-type: inline-size;
}

h1 {
  font-size: clamp(2.75rem, 11.5cqi, 4.5rem) !important;
  line-height: 1.05 !important;
  font-weight: 700 !important;
  letter-spacing: -0.02em;
  max-width: 760px;
  word-spacing: 4px;
}

h1 .keep-together {
  white-space: nowrap; /* when the line has to break, "for C#" moves down together, never a lone "C#" */
}

/* "Code-first" carries the cyan-to-blue gradient of the logo, painted through the glyphs, with a soft
   glow in the same colours underneath so the line lifts off the page. The glow is a drop-shadow filter,
   not a text-shadow: a text-shadow would paint over the gradient inside the transparent letters. */
h1 .highlight-foreground {
  display: inline-block; /* so the gradient box ends at the word, not the full line */
  padding-right: 0.05em; /* keeps the gradient clip from shaving the last letter's edge */
  font-weight: 800;

  background: linear-gradient(100deg, #00c6ff 0%, #0094f9 55%, #2979ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;

  filter: drop-shadow(0 6px 18px rgba(0, 148, 249, 0.14));
}

html.dark h1 .highlight-foreground {
  background: linear-gradient(100deg, #5ef0ff 0%, #32c6ff 50%, #4d8dff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  filter: drop-shadow(0 6px 20px rgba(50, 198, 255, 0.18));
}

.tagline {
  max-width: 675px;
  font-size: 1.5rem !important;
  line-height: 2.25rem !important;
  font-weight: 400;
  word-spacing: 2px;
  color: #000B;
}

html.dark .tagline {
  color: #FFFB;
}

@media screen and (max-width: 1024px) {
  h1 {
    max-width: 100%;
  }

  .tagline {
    font-size: 1.25rem !important;
    line-height: 1.5rem !important;
  }
}

@media screen and (max-width: 821px) {
  h1 {
    font-size: 2.75rem !important;
  }

  .tagline {
    font-size: 1.25rem !important;
    line-height: 1.5rem !important;
  }
}


/* Call To Action Button */

.cta-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 32px;
  z-index: 10000;
}

@media screen and (min-width: 1024px) {
  .cta-buttons a.action {
    padding: 16px 24px;
  }
}

html.dark .action:not(.primary) {
  background-color: #FFF2;

  &:hover {
    background-color: #FFF3;
  }
}

html:not(.dark) .action:not(.primary) {
  background-color: #00000014;
  color: var(--vp-c-text-1);
  box-shadow: none;

  &:hover {
    background-color: #00000022;
  }
}

.action {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
}


/* Hero card
   The adoption numbers on the same translucent surface as the homepage panels. The card is only
   as wide as its stats need and sits flush with the right edge of the page content. */

.hero-cards {
  position: relative;
  display: flex;

  width: fit-content;
  max-width: 100%;
  justify-self: end;
}

@media screen and (max-width: 820px) {
  .hero-cards {
    width: 100%; /* stacked under the text: full width */
  }

  .hero-card {
    flex: 1 1 auto;
  }
}

.hero-card {
  padding: 40px;
  border-radius: 32px;
  background-color: var(--home-surface);
  box-shadow: var(--home-surface-edge);
}

@media screen and (max-width: 700px) {
  .hero-card {
    padding: 32px 24px;
  }
}

/* a vertical list: three stats in a row would need ~750px and squeeze the headline, and a two-and-one
   wrap looks broken. Stacked, the card keeps one shape at every width and sits level with the text. */
.statistics {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.statistic {
  display: flex;
  align-items: center;
  gap: 20px;
  color: var(--vp-c-text-1);
}

/* the icon sits on a quiet tile: a faint wash of the text colour with an ink glyph, so the numbers
   stay the loudest thing in the card; the tile brightens and lifts a little on hover */
.statistic-icon {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;

  background-color: color-mix(in srgb, var(--vp-c-text-1) 8%, transparent);
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s ease;
}

.statistic-icon i {
  font-size: 24px;
  color: var(--vp-c-text-1);
}

/* a solid near-black glyph is too heavy on the light theme, so it sits at a mid grey there */
html:not(.dark) .statistic-icon i {
  color: color-mix(in srgb, var(--vp-c-text-1) 58%, transparent);
}

.statistic:hover .statistic-icon {
  transform: translateY(-2px) scale(1.05);
  background-color: color-mix(in srgb, var(--vp-c-text-1) 13%, transparent);
}

.statistic .title {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.statistic .value {
  font-size: 1.75rem;
  line-height: 2.25rem;
  font-weight: 600;
}

.statistic .label {
  font-size: 1rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-2);
}

/* Background
   The colour washes and grain belong to the whole page (see HomePage.vue). The hero only adds a
   faint dot grid under the card, fading out towards the headline and the page edges. */

.hero-pattern {
  position: absolute;
  inset: 0;
  pointer-events: none;

  background-image: radial-gradient(circle, color-mix(in srgb, var(--vp-c-text-1) 22%, transparent) 1px, transparent 1.5px);
  background-size: 24px 24px;
  background-position: 12px 12px;

  mask-image: radial-gradient(ellipse 55% 85% at 72% 50%, #000, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse 55% 85% at 72% 50%, #000, transparent 80%);
}

/* light dots on a dark canvas stand out more than dark dots on white, so they are fainter there */
html.dark .hero-pattern {
  background-image: radial-gradient(circle, color-mix(in srgb, var(--vp-c-text-1) 11%, transparent) 1px, transparent 1.5px);
}

@media screen and (max-width: 820px) {
  .hero-pattern {
    mask-image: radial-gradient(ellipse 90% 60% at 50% 70%, #000, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse 90% 60% at 50% 70%, #000, transparent 80%);
  }
}

</style>
