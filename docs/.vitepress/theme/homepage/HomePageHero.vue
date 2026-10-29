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
              <span class="value">{{ statistic.value }}</span>
              <span class="label">{{ statistic.label }}</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>


<style scoped>

/* Layout */

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
  background-image: linear-gradient(100deg, #4ED4FF 0%, #2FAEFA 50%, #5C8DFF 100%);
}


/* Lists */

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
  gap: 1.75rem;
}

.benefits li {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  color: var(--vp-c-text-1);
}

/* regular text looks thinner on white, so light mode takes half a weight step up */
html:not(.dark) .benefits li {
  font-weight: 450;
}

.benefits li,
.statistic {
  font-size: 1.25rem;
  line-height: 1.75rem;
  text-wrap: pretty;
}

.statistic {
  display: block;
}

.list-icon {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  margin-block: -0.375rem;
  border-radius: 10px;
  background-color: light-dark(#FFFFFF, color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent));
  box-shadow: inset 0 0 0 1px light-dark(rgba(25, 118, 210, 0.16), transparent);
}

.list-icon i {
  font-size: 1.25rem;
  color: light-dark(#1976D2, var(--vp-c-brand-1));
}

/* each stat is a link whose parts set their own colours, so the global link hover never reaches them */
.statistic .value {
  margin-right: 0.5rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: light-dark(#1C1C1E, var(--vp-c-text-1));
}

.statistic .label {
  font-weight: 400;
  color: var(--vp-c-text-2);
}

html:not(.dark) .statistic .label {
  font-weight: 450;
  color: var(--vp-c-text-1);
}

@media screen and (max-width: 1023px) {
  .lists {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .hero-pattern,
  .statistics {
    grid-area: 2 / 1;
  }

  .statistics {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    gap: 1.75rem 96px;
  }
}

/* the two columns and the 96px gap need about 650px with the gutters */
@media screen and (max-width: 720px) {
  .statistics {
    grid-template-columns: 1fr;
  }
}

/* Dot grid */

.hero-pattern {
  z-index: -1;
  align-self: stretch;
  margin-block: -64px;
  pointer-events: none;

  background-image: radial-gradient(circle, color-mix(in srgb, color-mix(in srgb, #1E88E5 85%, var(--vp-c-text-1)) 36%, transparent) 1px, transparent 1.5px);
  background-size: 24px 24px;
  background-position: 12px 12px;

  mask-image:
      linear-gradient(to right, transparent, #000 25%, #000 75%, transparent),
      linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent);
  mask-composite: intersect;
}

html.dark .hero-pattern {
  background-image: radial-gradient(circle, color-mix(in srgb, color-mix(in srgb, #64B5F6 50%, var(--vp-c-text-1)) 13%, transparent) 1px, transparent 1.5px);
}

</style>
