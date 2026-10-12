<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Enterprise</div>
      <h2>The security questionnaire, already filled in</h2>
    </div>

    <!-- direction B with every answer cut to a few words: the requirement, a tick, and the value -->
    <div class="layout">
      <div v-for="sheet of sheets" :key="sheet.title" class="card sheet">
        <div class="sheet-head">
          <h3 class="sheet-title">{{ sheet.title }}</h3>
          <span class="sheet-count"><i class="fa-regular fa-check"></i> {{ sheet.rows.length }} of {{ sheet.rows.length }}</span>
        </div>

        <div class="rows">
          <div v-for="row of sheet.rows" :key="row.requirement" class="row">
            <span class="requirement">{{ row.requirement }}</span>
            <span class="value">
              <template v-if="row.badges">
                <span v-for="badge of row.badges" :key="badge" class="t-badge">{{ badge }}</span>
              </template>
              <template v-else>{{ row.value }}</template>
            </span>
          </div>
        </div>

        <a class="sheet-link t-link" :href="sheet.href">{{ sheet.link }} <i class="fa-regular fa-arrow-right"></i></a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const sheets = [
  {
    title: "Infrastructure and security",
    rows: [
      { requirement: "Document data", value: "Never leaves your infrastructure" },
      { requirement: "Network calls", value: "None" },
      { requirement: "Telemetry", value: "None" },
      { requirement: "License server", value: "None" },
      { requirement: "Offline and air-gapped", value: "Supported" },
      { requirement: "Source code", value: "Full, on GitHub" },
      { requirement: "Native dependencies", value: "Skia and qpdf, built from source in CI" },
      { requirement: "Vulnerability disclosure", value: "Coordinated, advisories with the fix" }
    ],
    link: "Security policy", href: "/security-policy.html"
  },
  {
    title: "Document standards",
    rows: [
      { requirement: "PDF/A · ISO 19005", badges: ["2b", "2u", "2a", "3b", "3u", "3a"] },
      { requirement: "PDF/UA · ISO 14289", badges: ["UA-1"] },
      { requirement: "E-invoicing · EN 16931", badges: ["ZUGFeRD", "Factur-X"] },
      { requirement: "Validation", value: "veraPDF and Mustang, every build" },
      { requirement: "Encryption", value: "Password protection" },
      { requirement: "Multilingual", value: "Right-to-left and bidirectional text" },
      { requirement: "Throughput", value: "Thousands of pages per second" }
    ],
    link: "Document settings", href: "/concepts/document-settings.html"
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

.card.sheet {
  align-items: stretch;
}

.sheet-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.sheet-title {
  margin: 0;
  font-size: 1.375rem;
  line-height: 1.75rem;
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

.row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.row:last-child {
  border-bottom: none;
}

.requirement {
  color: var(--vp-c-text-2);
}

.value {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-align: right;
}

.sheet-link {
  margin-top: 16px;
  font-size: 0.9375rem;
}

.sheet-link i {
  font-size: 0.75rem;
}

@media screen and (max-width: 1000px) {
  .layout { grid-template-columns: minmax(0, 1fr); }
}

@media screen and (max-width: 480px) {
  .row { grid-template-columns: minmax(0, 1fr); gap: 2px; }
  .value { justify-content: flex-start; text-align: left; }
}

</style>
