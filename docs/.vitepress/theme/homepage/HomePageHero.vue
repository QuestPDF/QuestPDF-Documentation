<script setup lang="ts">
import { data as statistics } from "../statistics.data";
</script>

<template>
  <div class="hero">
    <div class="hero-pattern" />

    <section class="content">
      <div class="text">
        <h1>
          <span class="highlight-foreground">Code-first</span> PDF <br>generation <span class="keep-together">for C#</span>
        </h1>

        <div class="tagline">
          Design documents the way you design software, in readable C# code that renders to precise, standards-compliant PDFs on every platform. Effortlessly collaborate with your AI agent to create perfect designs.
        </div>
      </div>

      <aside class="statistics">
        <a v-for="statistic in statistics" :key="statistic.label" :href="statistic.link" :target="statistic.link.startsWith('http') ? '_blank' : undefined" rel="noopener" class="statistic">
          <span class="statistic-icon">
            <i class="fa-solid" :class="statistic.icon"></i>
          </span>

          <span class="title">
            <span class="value">{{ statistic.value }}</span>
            <span class="label">{{ statistic.label }}</span>
          </span>
        </a>
      </aside>
    </section>
  </div>
</template>


<style scoped>

/* Layout */

.hero {
  position: relative;
}

.content {
  position: relative; /* paints the text and the statistics over the dot grid */

  display: grid;
  grid-template-columns: minmax(0, 1fr) auto; /* the text caps its own width, the statistics take what they need */
  gap: 64px;
  align-items: center;
  padding-block: 64px;
}

@media screen and (max-width: 1023px) {
  .content {
    gap: 48px;
  }
}

@media screen and (max-width: 820px) {
  .content {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 400px) {
  h1 br {
    display: none;
  }
}


/* the text column is a size container, so the headline scales with the room the statistics leave it:
   "generation for C#" is about 8x the font size wide, so 11.5cqi keeps it on one line, clamped between the
   phone size and 4.5rem. The headline rules name the column, so they outrank the shared `.custom-page h1`. */
.text {
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.text h1 {
  font-size: clamp(2.75rem, 11.5cqi, 4.5rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  max-width: 760px;
  word-spacing: 4px;
}

h1 .keep-together {
  white-space: nowrap; /* when the line has to break, "for C#" moves down together, never a lone "C#" */
}

/* "Code-first" in the logo's gradient, painted through the glyphs; the glow is a drop-shadow filter because a
   text-shadow would paint over the gradient inside the transparent letters */
h1 .highlight-foreground {
  display: inline-block; /* so the gradient box ends at the word, not the full line */
  padding-right: 0.05em; /* keeps the gradient clip from shaving the last letter's edge */
  font-weight: 800;

  background-image: linear-gradient(100deg, #00c6ff 0%, #0094f9 55%, #2979ff 100%);
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;

  filter: drop-shadow(0 6px 18px rgba(0, 148, 249, 0.14));
}

html.dark h1 .highlight-foreground {
  background-image: linear-gradient(100deg, #5ef0ff 0%, #32c6ff 50%, #4d8dff 100%);
  filter: drop-shadow(0 6px 20px rgba(50, 198, 255, 0.18));
}

/* 1.5rem from 1100px, easing down to 1.25rem at 600px */
.tagline {
  max-width: 770px;
  font-size: clamp(1.25rem, 15.2px + 0.8vw, 1.5rem);
  line-height: 1.5;
  font-weight: 400;
  word-spacing: 2px;
  color: light-dark(#000B, #FFFB);
}

/* stacked, the column is the full width, where 11.5cqi would give the full 4.5rem */
@media screen and (max-width: 820px) {
  .text h1 {
    font-size: 2.75rem;
  }
}


/* Statistics: a vertical list beside the text, because four in a row would squeeze the headline and a wrapped
   row looks broken; stacked under the text, a two-by-two grid */

.statistics {
  display: flex;
  flex-direction: column;
  gap: 28px;
  justify-self: end;
}

@media screen and (max-width: 820px) {
  .statistics {
    container-type: inline-size; /* only here: beside the text it sizes itself to its content */
    justify-self: stretch;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 24px;
  }
}

/* each stat is a link that reads as plain content: its parts set their own colours, so the global link hover
   never reaches them */
.statistic {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* a quiet tile, so the numbers stay the loudest thing in the list; on the light theme it is solid white, and a
   hairline ring keeps its shape on the pale page */
.statistic-icon {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;

  background-color: light-dark(#FFFFFF, color-mix(in srgb, var(--vp-c-text-1) 8%, transparent));
  box-shadow: inset 0 0 0 1px light-dark(color-mix(in srgb, var(--vp-c-text-1) 8%, transparent), transparent);
}

.statistic-icon i {
  font-size: 24px;
  color: var(--vp-c-text-1);
}

/* a solid near-black glyph is too heavy on the light theme, so it takes the regular (outlined) weight there */
html:not(.dark) .statistic-icon i {
  font-weight: 400;
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
  color: var(--vp-c-text-1);
}

.statistic .label {
  font-size: 1rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-2);
}

/* a grid too narrow for two full-size statistics side by side (phones): smaller tiles and type; the labels wrap,
   so each statistic hangs from the top and the values of a row stay level */
@container (max-width: 460px) {
  .statistic {
    align-items: flex-start;
    gap: 12px;
  }

  .statistic-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
  }

  .statistic-icon i {
    font-size: 20px;
  }

  .statistic .value {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .statistic .label {
    font-size: 0.875rem;
  }
}

/* the narrowest phones: a little more room for "production" */
@container (max-width: 300px) {
  .statistic {
    gap: 10px;
  }

  .statistic-icon {
    width: 40px;
    height: 40px;
  }
}

/* a faint dot grid under the statistics, fading out towards the headline and the page edges (the washes
   belong to the page canvas, see CustomPages.css) */

.hero-pattern {
  position: absolute;
  inset: -64px 0 0; /* from under the navbar, the box the mask below is drawn on */
  pointer-events: none;

  /* the dots lean towards the brand blue, so the grid reads as part of the blue washes rather than grey noise */
  background-image: radial-gradient(circle, color-mix(in srgb, color-mix(in srgb, #1E88E5 85%, var(--vp-c-text-1)) 36%, transparent) 1px, transparent 1.5px);
  background-size: 24px 24px;
  background-position: 12px 12px;

  mask-image: radial-gradient(ellipse 55% 85% at 72% 50%, #000, transparent 80%);
}

/* light dots on a dark canvas stand out more than dark dots on white, so they are fainter there */
html.dark .hero-pattern {
  background-image: radial-gradient(circle, color-mix(in srgb, var(--vp-c-text-1) 11%, transparent) 1px, transparent 1.5px);
}

@media screen and (max-width: 820px) {
  .hero-pattern {
    mask-image: radial-gradient(ellipse 90% 60% at 50% 70%, #000, transparent 80%);
  }
}

</style>
