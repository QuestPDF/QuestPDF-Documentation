<script setup lang="ts">

/* Lab copy of HomePageTrust: the same two cards, but the validation line of the left card comes
   from the `validation` slot so each lab direction can swap it. Delete with the validation lab. */

const conformanceLevels = [
  "PDF/A-2b", "PDF/A-2u", "PDF/A-2a",
  "PDF/A-3b", "PDF/A-3u", "PDF/A-3a",
  "PDF/UA-1",
  "ZUGFeRD", "Factur-X"
];

interface Point {
  icon: string;
  title: string;
  description: string;
}

const points : Point[] = [
  { icon: "fa-shield-check", title: "Complete data privacy", description: "No network calls, no telemetry, no license server. Works offline and air-gapped." },
  { icon: "fa-gauge-high", title: "High performance", description: "Thousands of pages per second with low CPU and memory usage." },
  { icon: "fa-gear-complex", title: "Comprehensive layout engine", description: "Full control over structure, precise positioning and automatic pagination." },
  { icon: "fa-language", title: "Advanced language support", description: "Full RTL support, advanced text shaping and bi-directional layout." },
  { icon: "fa-file-zipper", title: "Optimized file size", description: "Font subsetting and image compression keep documents small without losing quality." }
];

</script>

<template>
  <section class="content">
    <div class="layout">
      <div class="panel compliance">
        <h2 class="card-title">Industry-standard output</h2>
        <p class="card-description">
          Generate PDFs that meet industry standards out of the box: PDF/A for long-term archiving,
          PDF/UA for accessibility, and EN 16931 (ZUGFeRD and Factur-X) for electronic invoicing.
        </p>

        <div class="standards-badges">
          <span v-for="level in conformanceLevels" :key="level">{{ level }}</span>
        </div>

        <slot name="validation" />
      </div>

      <div class="panel foundations">
        <h2 class="card-title">Enterprise-grade foundations</h2>
        <p class="card-description">
          A robust layout engine engineered for high performance, complete data privacy
          and seamless integration into your infrastructure.
        </p>

        <div class="points">
          <article v-for="point of points" :key="point.title" class="point">
            <div class="point-icon">
              <i class="fa-regular" :class="[point.icon]"></i>
            </div>

            <div class="point-body">
              <h3 class="row-title">{{ point.title }}</h3>
              <p class="row-description">{{ point.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.layout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
  width: 100%;
}

.layout > .panel {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

@media screen and (max-width: 960px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
  }
}

.standards-badges {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 8px;
  flex-grow: 1;
  margin-top: 32px;
}

.standards-badges > span {
  display: inline-flex;
  align-items: center;
  padding: 8px 10px;
  line-height: 1;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background-color: var(--home-surface-inner);
}

.points {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 32px;
}

.point {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 16px;
  align-items: start;
}

.point-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: var(--home-surface-inner);
}

.point-icon i {
  font-size: 1.125rem;
  color: var(--vp-c-text-1);
}

</style>
