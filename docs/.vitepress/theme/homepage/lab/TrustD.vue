<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Compliance</div>
      <h2>Archival, accessibility and e-invoicing are a setting, not a project</h2>
      <p class="sub-header">Choose the standard a document must meet. QuestPDF builds the structure, and every release is validated with veraPDF and Mustang.</p>
    </div>

    <!-- the two settings in a code window, the standards they unlock beside it, and the infrastructure facts in a strip below -->
    <div class="panel setting-panel">
      <div class="top">
        <div class="code">
          <home-page-code-container file-name="Invoice.cs" :code="code" />
        </div>

        <div class="standards">
          <div class="t-eyebrow">What the setting gets you</div>

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
      </div>

      <div class="strip">
        <div v-for="fact of facts" :key="fact.text" class="strip-item">
          <i class="fa-regular" :class="fact.icon"></i>
          <span><strong>{{ fact.lead }}</strong> {{ fact.text }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import HomePageCodeContainer from "../HomePageCodeContainer.vue";

const code = `document
    .WithSettings(new DocumentSettings
    {
        PDFA_Conformance = PDFA_Conformance.PDFA_3B,
        PDFUA_Conformance = PDFUA_Conformance.PDFUA_1
    })
    .GeneratePdf("invoice.pdf");`;

const standards = [
  { name: "PDF/A", iso: "ISO 19005 · archival", text: "Readable and identical for decades, with no external dependencies.", badges: ["2b", "2u", "2a", "3b", "3u", "3a"] },
  { name: "PDF/UA", iso: "ISO 14289 · accessibility", text: "Tagged structure, reading order and alternative text for assistive technology.", badges: ["UA-1"] },
  { name: "EN 16931", iso: "e-invoicing", text: "PDF/A-3 with the invoice XML attached, for automated processing.", badges: ["ZUGFeRD", "Factur-X"] }
];

const facts = [
  { icon: "fa-shield-check", lead: "Nothing leaves your infrastructure.", text: "No network calls, no telemetry, no license server." },
  { icon: "fa-code", lead: "Full source on GitHub.", text: "Native dependencies built from source in CI." },
  { icon: "fa-gauge-high", lead: "Thousands of pages per second.", text: "Low CPU and memory on a single server." }
];
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.setting-panel {
  width: 100%;
  margin-top: 32px;
}

.top {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 48px;
  align-items: start;
}

.code {
  min-width: 0;
}

.standards {
  display: flex;
  flex-direction: column;
}

.standard {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.standards .t-eyebrow {
  margin-bottom: 12px;
}

.standard:last-child {
  padding-bottom: 0;
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
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px solid var(--vp-c-divider);
}

.strip-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  font-size: 0.9375rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.strip-item i {
  margin-top: 4px;
  font-size: 1.125rem;
  color: var(--vp-c-text-1);
}

.strip-item strong {
  color: var(--vp-c-text-1);
}

@media screen and (max-width: 1100px) {
  .top { grid-template-columns: minmax(0, 1fr); gap: 32px; }
  .strip { grid-template-columns: minmax(0, 1fr); gap: 16px; }
}

</style>
