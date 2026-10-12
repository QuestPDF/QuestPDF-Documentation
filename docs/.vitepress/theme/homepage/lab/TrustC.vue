<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Foundations</div>
      <h2>Built for regulated, security-conscious teams</h2>
      <p class="sub-header">A library that stays inside your infrastructure and produces documents that pass the audits.</p>
    </div>

    <!-- two cards: the infrastructure facts as headlines, and the standards with their levels -->
    <div class="layout">
      <div class="card">
        <div class="t-eyebrow">Inside your infrastructure</div>

        <div class="facts">
          <article v-for="fact of facts" :key="fact.title" class="fact">
            <div class="t-icon"><i class="fa-regular" :class="fact.icon"></i></div>
            <div>
              <h3 class="fact-title">{{ fact.title }}</h3>
              <p class="fact-text">{{ fact.text }}</p>
            </div>
          </article>
        </div>
      </div>

      <div class="card">
        <div class="t-eyebrow">Standards, verified on every build</div>

        <div class="standards">
          <article v-for="standard of standards" :key="standard.name" class="standard">
            <div class="standard-head">
              <h3 class="standard-name">{{ standard.name }}</h3>
              <span class="standard-iso">{{ standard.iso }}</span>
            </div>
            <p class="standard-text">{{ standard.text }}</p>
            <div class="t-badges">
              <span v-for="badge of standard.badges" :key="badge" class="t-badge">{{ badge }}</span>
            </div>
          </article>
        </div>

        <p class="verified">
          <i class="fa-regular fa-badge-check"></i>
          <span>Every build is validated with <a class="t-link" href="https://verapdf.org/" target="_blank" rel="noopener">veraPDF</a> and <a class="t-link" href="https://www.mustangproject.org/" target="_blank" rel="noopener">Mustang</a>.</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const facts = [
  {
    icon: "fa-shield-check",
    title: "Zero network calls.",
    text: "Runs in your process with no telemetry and no license server. Works offline and air-gapped."
  },
  {
    icon: "fa-code",
    title: "Full source code on GitHub.",
    text: "Review it, step into it, build it. The native dependencies, Skia and qpdf, are built from source in CI."
  },
  {
    icon: "fa-gauge-high",
    title: "Thousands of pages per second.",
    text: "Low CPU and memory, so one server handles batch runs and peak traffic."
  }
];

const standards = [
  { name: "PDF/A", iso: "ISO 19005 · archival", text: "Documents that stay readable and identical for decades.", badges: ["2b", "2u", "2a", "3b", "3u", "3a"] },
  { name: "PDF/UA", iso: "ISO 14289 · accessibility", text: "Tagged structure for screen readers and assistive technology.", badges: ["UA-1"] },
  { name: "EN 16931", iso: "e-invoicing", text: "Structured invoice data embedded in the PDF for automated processing.", badges: ["ZUGFeRD", "Factur-X"] }
];
</script>

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
  margin-top: 32px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.facts {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 20px;
}

.fact {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 20px;
  padding: 20px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.fact:last-child {
  padding-bottom: 0;
}

.fact-title {
  margin: 0 0 4px;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
}

.fact-text {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5rem;
}

.standards {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 20px;
}

.standard {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.standard-head {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.standard-name {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
}

.standard-iso {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
}

.standard-text {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5rem;
}

.standard .t-badges {
  margin-top: 4px;
}

.verified {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 20px 0 0;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.verified i {
  margin-top: 4px;
  color: #2E7D32;
}

html.dark .verified i {
  color: #A5D6A7;
}

@media screen and (max-width: 1100px) {
  .layout { grid-template-columns: minmax(0, 1fr); }
}

</style>
