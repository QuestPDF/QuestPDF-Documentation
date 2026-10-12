<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Enterprise</div>
      <h2>The security questionnaire, already filled in</h2>
      <p class="sub-header">What procurement and security reviews ask about QuestPDF, answered in one place.</p>
    </div>

    <!-- two cards: one per questionnaire. Each row is a requirement, a tick and the one-line answer -->
    <div class="layout">
      <div v-for="sheet of sheets" :key="sheet.title" class="card sheet">
        <div class="sheet-head">
          <h3 class="sheet-title">{{ sheet.title }}</h3>
          <span class="sheet-count">{{ sheet.rows.length }} of {{ sheet.rows.length }} met</span>
        </div>

        <div class="rows">
          <div v-for="row of sheet.rows" :key="row.requirement" class="row">
            <i class="fa-duotone fa-square-check"></i>
            <span class="requirement">{{ row.requirement }}</span>
            <span class="detail">
              {{ row.detail }}
              <span v-if="row.badges" class="t-badges">
                <span v-for="badge of row.badges" :key="badge" class="t-badge">{{ badge }}</span>
              </span>
            </span>
          </div>
        </div>

        <p v-if="sheet.footer" class="sheet-footer" v-html="sheet.footer"></p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const sheets = [
  {
    title: "Infrastructure and security",
    rows: [
      { requirement: "Data residency", detail: "Document data never leaves your infrastructure. No network calls, no telemetry, no license server." },
      { requirement: "Offline operation", detail: "No internet connection required, including air-gapped environments." },
      { requirement: "Source code access", detail: "The entire library is on GitHub, available for review." },
      { requirement: "Native dependencies", detail: "Skia and qpdf, built from source in our CI pipelines and shipped as platform packages." },
      { requirement: "Vulnerability disclosure", detail: "Coordinated disclosure; advisories published together with the fix." },
      { requirement: "Throughput", detail: "Thousands of pages per second with low CPU and memory." }
    ],
    footer: `Details in the <a class="t-link" href="/security-policy.html">security policy</a>.`
  },
  {
    title: "Document standards",
    rows: [
      { requirement: "PDF/A archival", detail: "ISO 19005, conformance levels", badges: ["2b", "2u", "2a", "3b", "3u", "3a"] },
      { requirement: "PDF/UA accessibility", detail: "ISO 14289, tagged documents for assistive technology", badges: ["UA-1"] },
      { requirement: "E-invoicing", detail: "EN 16931, invoice XML embedded in PDF/A-3", badges: ["ZUGFeRD", "Factur-X"] },
      { requirement: "Validation", detail: "Every build checked with veraPDF and Mustang." },
      { requirement: "Multilingual", detail: "Right-to-left and bidirectional text, with text shaping." },
      { requirement: "Encryption", detail: "Password-protect generated and existing PDFs." }
    ],
    footer: `Validated with the open-source <a class="t-link" href="https://verapdf.org/" target="_blank" rel="noopener">veraPDF</a> and <a class="t-link" href="https://www.mustangproject.org/" target="_blank" rel="noopener">Mustang</a> tools.`
  }
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

.sheet {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.sheet-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.sheet-title {
  margin: 0;
  font-size: 1.5rem;
  line-height: 2rem;
}

.sheet-count {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #2E7D32;
  white-space: nowrap;
}

html.dark .sheet-count {
  color: #A5D6A7;
}

.rows {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

/* a tick, the requirement in a fixed column, the answer filling the rest */
.row {
  display: grid;
  grid-template-columns: 24px 172px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  padding: 14px 0;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.row:last-child {
  border-bottom: none;
}

.row i {
  width: 24px;
  margin-top: 2px;
  --fa-primary-color: #67B84D;
  --fa-secondary-color: #67B84D;
}

html.dark .row i {
  --fa-primary-color: #81C784;
  --fa-secondary-color: #81C784;
}

.requirement {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.detail {
  color: var(--vp-c-text-2);
}

.detail .t-badges {
  display: inline-flex;
  vertical-align: middle;
  margin-left: 2px;
}

.sheet-footer {
  margin: 16px 0 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-3);
}

@media screen and (max-width: 1100px) {
  .layout { grid-template-columns: minmax(0, 1fr); }
}

@media screen and (max-width: 600px) {
  .row { grid-template-columns: 24px minmax(0, 1fr); }
  .detail { grid-column: 2; }
}

</style>
