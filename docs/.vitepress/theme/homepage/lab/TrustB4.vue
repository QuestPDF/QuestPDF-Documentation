<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Enterprise</div>
      <h2>Answers for your security review</h2>
      <p class="sub-header">Filled in once, so you can paste it into the questionnaire instead of writing it.</p>
    </div>

    <!-- direction B as a single sheet with a copy button: the point is that the answers are forwardable -->
    <div class="card sheet">
      <div class="sheet-head">
        <div>
          <h3 class="sheet-title">QuestPDF · vendor questionnaire</h3>
          <div class="sheet-meta">{{ rows.length }} requirements · all met · source: <a class="t-link" href="/security-policy.html">security policy</a> and <a class="t-link" href="/concepts/document-settings.html">document settings</a></div>
        </div>
        <button type="button" class="copy" @click="copy">
          <i class="fa-regular" :class="copied ? 'fa-check' : 'fa-copy'"></i>
          {{ copied ? "Copied" : "Copy as text" }}
        </button>
      </div>

      <div class="columns">
        <div v-for="column of columns" :key="column[0].requirement" class="rows">
          <div v-for="row of column" :key="row.requirement" class="row">
            <i class="fa-regular fa-square-check"></i>
            <span class="requirement">{{ row.requirement }}</span>
            <span class="detail">{{ row.detail }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const rows = [
  { requirement: "Data residency", detail: "Document data never leaves your infrastructure." },
  { requirement: "Network access", detail: "None. No network calls, no telemetry, no update checks." },
  { requirement: "License server", detail: "None. Runs offline and in air-gapped environments." },
  { requirement: "Source code", detail: "Full source on GitHub." },
  { requirement: "Native dependencies", detail: "Skia and qpdf, built from source in our CI pipelines." },
  { requirement: "Vulnerability disclosure", detail: "Coordinated; advisories published with the fix." },
  { requirement: "PDF/A (ISO 19005)", detail: "PDF/A-2 and PDF/A-3, levels b, u and a." },
  { requirement: "PDF/UA (ISO 14289)", detail: "PDF/UA-1, tagged for assistive technology." },
  { requirement: "E-invoicing (EN 16931)", detail: "ZUGFeRD and Factur-X, embedded in PDF/A-3." },
  { requirement: "Validation", detail: "Every build checked with veraPDF and Mustang." },
  { requirement: "Encryption", detail: "Password protection for generated and existing PDFs." },
  { requirement: "Throughput", detail: "Thousands of pages per second, low CPU and memory." }
];

const columns = computed(() => {
  const half = Math.ceil(rows.length / 2);
  return [rows.slice(0, half), rows.slice(half)];
});

const copied = ref(false);

async function copy() {
  const text = rows.map(row => `${row.requirement}: ${row.detail}`).join("\n");
  try {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch {
    /* clipboard access denied: nothing to do, the text is on screen */
  }
}
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card.sheet {
  width: 100%;
  margin-top: 32px;
  align-items: stretch;
}

.sheet-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.sheet-title {
  margin: 0;
  font-size: 1.375rem;
  line-height: 1.75rem;
}

.sheet-meta {
  margin-top: 2px;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.copy {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--home-surface-inner);
  color: var(--vp-c-text-1);
  font: inherit;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
}

.copy:hover {
  border-color: var(--vp-c-brand-1);
}

.columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 40px;
}

.rows {
  display: flex;
  flex-direction: column;
}

.row {
  display: grid;
  grid-template-columns: 20px 190px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  padding: 12px 0;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.rows:last-child .row:last-child {
  border-bottom: none;
}

.row i {
  margin-top: 5px;
  color: #2E7D32;
}

html.dark .row i {
  color: #A5D6A7;
}

.requirement {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.detail {
  color: var(--vp-c-text-2);
}

@media screen and (max-width: 1000px) {
  .columns { grid-template-columns: minmax(0, 1fr); }
  .rows:first-child .row:last-child { border-bottom: 1px solid var(--vp-c-divider); }
}

@media screen and (max-width: 600px) {
  .sheet-head { flex-direction: column; align-items: flex-start; }
  .row { grid-template-columns: 20px minmax(0, 1fr); }
  .detail { grid-column: 2; }
}

</style>
