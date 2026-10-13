<script setup lang="ts">

/* Two cards side by side, replacing the former "Enterprise-grade foundations" and "Industry-standard
   PDF compliance" sections. Each card carries its own heading, like the Companion App and license cards.
   Left: the supported conformance levels as one set of chips, with the validation tools as the evidence
   line at the bottom. Right: the foundations as five smaller points, one per thing a manager, product owner or
   programmer checks before buying. */

/* every conformance level the library can produce, as one flat set: PDF/A (archival), PDF/UA
   (accessibility), then the EN 16931 e-invoicing profiles */
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
  {
    icon: "fa-shield-check",
    title: "Complete data privacy",
    description: "No network calls, no telemetry, no license server. Works offline and air-gapped."
  },
  {
    icon: "fa-gauge-high",
    title: "High performance",
    description: "Thousands of pages per second with low CPU and memory usage."
  },
  {
    icon: "fa-gear-complex",
    title: "Comprehensive layout engine",
    description: "Full control over structure, precise positioning and automatic pagination."
  },
  {
    icon: "fa-language",
    title: "Advanced language support",
    description: "Full RTL support, advanced text shaping and bi-directional layout."
  },
  {
    icon: "fa-file-zipper",
    title: "Optimized file size",
    description: "Font subsetting and image compression keep documents small without losing quality."
  }
];

</script>

<template>
  <section class="content">
    <div class="layout">
      <!-- left: the compliance story; the conformance levels as one set of chips, the validators as the footer -->
      <div class="panel compliance">
        <h2 class="card-title">Industry-standard output</h2>
        <p class="card-description">
          Generate PDFs that meet industry standards out of the box: PDF/A for long-term archiving,
          PDF/UA for accessibility, and EN 16931 (ZUGFeRD and Factur-X) for electronic invoicing.
        </p>

        <div class="standards-badges">
          <span v-for="level in conformanceLevels" :key="level">{{ level }}</span>
        </div>

        <!-- the evidence: independent, third-party validators run on every build -->
        <p class="validation">
          <i class="fa-regular fa-badge-check"></i>
          <span>
            Every build is automatically validated with the independent, open-source
            <a href="https://verapdf.org/" target="_blank" rel="noopener">veraPDF</a> (PDF/A and PDF/UA) and
            <a href="https://www.mustangproject.org/" target="_blank" rel="noopener">Mustang</a> (ZUGFeRD and Factur-X) validators.
          </span>
        </p>
      </div>

      <!-- right: the foundations as smaller points -->
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

/* Two cards of equal height, stacked on narrow screens */

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


/* Conformance levels: one wrapped set of chips, no grouping. The block takes the card's spare height,
   so the validation line sits at the bottom of the card, level with the end of the foundations list. */

.standards-badges {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 8px;
  flex-grow: 1;
  margin-top: 32px;
}

/* same white-on-grey style as the chips in the other homepage cards */
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


/* Validation line: the badge icon in brand colour, the tools linked */

.validation {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: 32px 0 0;
  font-size: 0.9375rem;
  line-height: 1.375rem;
  color: var(--vp-c-text-2);
}

.validation i {
  flex-shrink: 0;
  margin-top: 2px;
  font-size: 1.125rem;
  color: var(--vp-c-brand-1);
}

.validation a {
  color: var(--vp-c-text-1);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--vp-c-text-1) 30%, transparent);
  text-underline-offset: 3px;
  transition: text-decoration-color 0.2s;
}

.validation a:hover {
  text-decoration-color: var(--vp-c-text-1);
}


/* Points: a single column of icon tile plus a labelled row, the same rhythm as the
   Companion App capabilities */

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
