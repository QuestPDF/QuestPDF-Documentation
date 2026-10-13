<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Trust</div>
      <h2>Meets your standards, stays on your servers</h2>
    </div>

    <div class="pair">
      <!-- left: the three standard families as the headline, one row per family with the ISO or EN number
           as the label and the conformance levels as chips, the validation line as the footer -->
      <div class="card">
        <div class="p-eyebrow">Document standards</div>
        <h3 class="p-headline">PDF/A, PDF/UA and EN 16931.</h3>

        <div class="rows">
          <div v-for="row of standards" :key="row.number" class="row">
            <div class="row-label">
              <span class="row-number">{{ row.number }}</span>
              <span class="row-purpose">{{ row.purpose }}</span>
            </div>
            <div class="p-chips">
              <span v-for="chip of row.chips" :key="chip" class="p-chip">{{ chip }}</span>
            </div>
          </div>
        </div>

        <p class="p-verified">
          <i class="fa-regular fa-badge-check"></i>
          <span>Validated with <a class="p-link" href="https://verapdf.org/" target="_blank" rel="noopener">veraPDF</a> and <a class="p-link" href="https://www.mustangproject.org/" target="_blank" rel="noopener">Mustang</a> on every build.</span>
        </p>
      </div>

      <!-- right: one claim, then the three facts a reviewer can check, the security policy as the footer -->
      <div class="card">
        <div class="p-eyebrow">Inside your infrastructure</div>
        <h3 class="p-headline">Nothing leaves your servers.</h3>

        <div class="rows">
          <article v-for="fact of facts" :key="fact.title" class="row fact">
            <div class="p-icon"><i class="fa-regular" :class="fact.icon"></i></div>
            <div>
              <h4 class="fact-title">{{ fact.title }}</h4>
              <p class="fact-text">{{ fact.text }}</p>
            </div>
          </article>
        </div>

        <a class="p-footer-link p-link" href="/security-policy.html">Security policy <i class="fa-regular fa-arrow-right"></i></a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const standards = [
  { number: "ISO 19005", purpose: "Archival", chips: ["PDF/A-2b", "PDF/A-2u", "PDF/A-2a", "PDF/A-3b", "PDF/A-3u", "PDF/A-3a"] },
  { number: "ISO 14289", purpose: "Accessibility", chips: ["PDF/UA-1"] },
  { number: "EN 16931", purpose: "E-invoicing", chips: ["ZUGFeRD", "Factur-X"] }
];

const facts = [
  { icon: "fa-cloud-slash", title: "No network calls.", text: "No telemetry, no license server. Works offline and air‑gapped." },
  { icon: "fa-code", title: "Full source on GitHub.", text: "Skia and qpdf, the native dependencies, are built from source in CI." },
  { icon: "fa-gauge-high", title: "Thousands of pages per second.", text: "Low CPU and memory on a single server." }
];
</script>

<style scoped>

/* Both cards share one rhythm: eyebrow, headline, three hairline rows, a footer line.
   The rows grow so the footers of the two cards sit at the same height. */

.rows {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 20px;
}

.row {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 16px;
  align-items: start;
  padding: 16px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.row-label {
  display: flex;
  flex-direction: column;
  padding-top: 7px;
  line-height: 1.25rem;
}

.row-number {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.row-purpose {
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
}

.row.fact {
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 18px;
}

.fact-title {
  margin: 0 0 2px;
  font-size: 1.125rem;
  line-height: 1.625rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.fact-text {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

@media screen and (max-width: 560px) {
  .row:not(.fact) { grid-template-columns: minmax(0, 1fr); gap: 10px; }
  .row-label { flex-direction: row; gap: 8px; align-items: baseline; padding-top: 0; }
}

</style>
