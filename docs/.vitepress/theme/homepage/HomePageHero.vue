<script setup lang="ts">
import { data as statistics } from "../statistics.data";

const benefits = [
  { icon: "fa-code", text: "Implement documents in fluent C# that's easy to read, maintain and review" },
  { icon: "fa-award", text: "Generate valid, standards-compliant and accessible PDF documents" },
  { icon: "fa-sparkles", text: "Develop faster with hot-reload preview and your favorite AI coding agent" },
  { icon: "fa-cloud-arrow-up", text: "Deploy to any operating system or cloud, with excellent performance" }
];
</script>

<template>
  <div class="hero">
    <section class="content">
      <h1>
        <span class="highlight-foreground">Code-first</span> PDF library for C#
      </h1>

      <div class="lists">
        <ul class="benefits">
          <li v-for="benefit in benefits" :key="benefit.text">
            <span class="list-icon">
              <i class="fa-regular" :class="benefit.icon" aria-hidden="true"></i>
            </span>

            <span>{{ benefit.text }}</span>
          </li>
        </ul>

        <div class="hero-pattern" />

        <ul class="statistics">
          <li v-for="statistic in statistics" :key="statistic.label">
            <a :href="statistic.link" :target="statistic.link.startsWith('http') ? '_blank' : undefined" class="statistic">
              <span class="list-icon">
                <i class="fa-regular" :class="statistic.icon" aria-hidden="true"></i>
              </span>

              <span>
                <span class="value">{{ statistic.value }}</span>
                <span class="label">{{ statistic.label }}</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>


<style scoped>

/* Layout */

/* "Code-first PDF library for C#" is about 13x the font size wide, so it stays on one line down to tablets; when
   it has to wrap, it wraps balanced, and phones take a smaller size */
.content {
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-block: 64px;
}

.content h1 {
  margin: 0;
  font-size: 3.5rem;
  line-height: 1.05;
  letter-spacing: -0.02em;
  word-spacing: 4px;
  text-wrap: balance;
}

@media screen and (max-width: 820px) {
  .content h1 {
    font-size: 2.75rem;
  }
}

/* "Code-first" in the logo's gradient, painted through the glyphs */
h1 .highlight-foreground {
  display: inline-block; /* so the gradient box ends at the word, not the full line */
  padding-right: 0.05em; /* keeps the gradient clip from shaving the last letter's edge */
  font-weight: 800;

  background-image: linear-gradient(100deg, #00c6ff 0%, #0094f9 55%, #2979ff 100%);
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

html.dark h1 .highlight-foreground {
  background-image: linear-gradient(100deg, #5ef0ff 0%, #32c6ff 50%, #4d8dff 100%);
}


/* Lists: the benefits and the statistics side by side, one row each, so their rows line up, with the dot grid in
   the room between them (at least 64px; the benefits give way first and wrap); once the benefits would wrap, the
   statistics move under them */

.lists {
  isolation: isolate; /* so the dot grid's z-index puts it under the lists, not under the page canvas */
  display: grid;
  grid-template-columns: minmax(0, max-content) minmax(64px, 1fr) auto;
  align-items: start;
}

.benefits,
.statistics {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* the icon box is one line tall, so a wrapped row keeps its icon beside the first line */
.benefits li,
.statistic {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  font-size: 1.25rem;
  line-height: 1.75rem;
  text-wrap: pretty;
}

.benefits li {
  color: var(--vp-c-text-1);
}

/* a bare icon in the primary colour, at a fixed width so the texts line up whatever each glyph's own width */
.list-icon {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 1.75rem;
}

.list-icon i {
  font-size: 1.25rem;
  color: var(--vp-c-brand-1);
}

/* each stat is a link that reads as plain content: its parts set their own colours, so the global link hover
   never reaches them; the value leads, the label stays quiet */
.statistic .value {
  margin-right: 0.3em;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

/* the statistics' icons in the text colour, so the primary colour stays with the benefits */
.statistic .list-icon i {
  color: var(--vp-c-text-1);
}

.statistic .label {
  font-weight: 400;
  color: var(--vp-c-text-2);
}

@media screen and (max-width: 1023px) {
  .lists {
    grid-template-columns: 1fr;
    gap: 48px; /* clearly more than the 20px between rows, so the two lists stay two groups */
  }

  /* stacked, the dot grid shares the statistics' cell instead of taking a row of its own */
  .hero-pattern,
  .statistics {
    grid-area: 2 / 1;
  }

  .statistics {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    gap: 20px 96px;
  }
}

/* two max-content columns and the 96px gap need about 650px with the gutters, so narrower viewports stack the
   statistics; the breakpoint keeps some room for the live values to grow */
@media screen and (max-width: 720px) {
  .statistics {
    grid-template-columns: 1fr;
  }
}

/* Dot grid: a faint field of dots filling the room between the benefits and the statistics, reaching above and
   below the lists, with soft edges on all four sides (the glows belong to the page canvas, see CustomPages.css) */

.hero-pattern {
  z-index: -1;
  align-self: stretch;
  margin-block: -64px;
  pointer-events: none;

  /* the dots lean towards the brand blue, so the grid reads as part of the blue canvas rather than grey noise */
  background-image: radial-gradient(circle, color-mix(in srgb, color-mix(in srgb, #1E88E5 85%, var(--vp-c-text-1)) 36%, transparent) 1px, transparent 1.5px);
  background-size: 24px 24px;
  background-position: 12px 12px;

  mask-image:
      linear-gradient(to right, transparent, #000 25%, #000 75%, transparent),
      linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent);
  mask-composite: intersect;
}

/* light dots on a dark canvas stand out more than dark dots on white, so they are fainter there */
html.dark .hero-pattern {
  background-image: radial-gradient(circle, color-mix(in srgb, var(--vp-c-text-1) 11%, transparent) 1px, transparent 1.5px);
}

</style>
