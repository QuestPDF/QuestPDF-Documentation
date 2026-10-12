<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Architecture</div>
      <h2>In your process, not in someone's cloud</h2>
      <p class="sub-header">What changes when the PDF engine is a library instead of a hosted service.</p>
    </div>

    <!-- a two-column comparison: the typical hosted PDF API against QuestPDF, one row per review question -->
    <div class="panel compare">
      <div class="row head">
        <div class="cell"></div>
        <div class="cell">Typical hosted PDF API</div>
        <div class="cell ours">QuestPDF</div>
      </div>
      <div v-for="row of rows" :key="row.label" class="row">
        <div class="cell label">{{ row.label }}</div>
        <div class="cell them"><i class="fa-regular fa-minus"></i><span>{{ row.them }}</span></div>
        <div class="cell ours"><i class="fa-regular fa-check"></i><span>{{ row.us }}</span></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const rows = [
  { label: "Where rendering happens", them: "On the vendor's servers", us: "Inside your application process" },
  { label: "Document data", them: "Uploaded to the vendor", us: "Never leaves your infrastructure" },
  { label: "Telemetry", them: "Usually", us: "None, no network calls at all" },
  { label: "License check", them: "Online, per request", us: "No license server" },
  { label: "Air-gapped deployment", them: "Not possible", us: "Yes" },
  { label: "Source code", them: "Closed", us: "Full source on GitHub, native dependencies built from source" },
  { label: "PDF/A, PDF/UA, e-invoicing", them: "Varies by vendor", us: "PDF/A-2 and 3, PDF/UA-1, ZUGFeRD and Factur-X, validated on every build" }
];
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.compare {
  width: 100%;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
}

.row {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr) minmax(0, 1.3fr);
  gap: 24px;
  border-top: 1px solid var(--vp-c-divider);
}

.row.head {
  border-top: none;
}

.cell {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  font-size: 1rem;
  line-height: 1.5rem;
}

.head .cell {
  padding-top: 0;
  padding-bottom: 12px;
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
}

.row:last-child .cell {
  padding-bottom: 0;
}

.label {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.them {
  color: var(--vp-c-text-3);
}

/* the QuestPDF column is tinted along its full height, so the eye follows it */
.ours {
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.ours::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: color-mix(in srgb, #1E88E5 7%, transparent);
  z-index: -1;
}

.head .ours {
  color: #1565C0;
}

html.dark .head .ours {
  color: #64B5F6;
}

.row:first-child .ours::before { border-radius: 12px 12px 0 0; }
.row:last-child .ours::before { border-radius: 0 0 12px 12px; }

.cell i {
  flex-shrink: 0;
  width: 20px;
  text-align: center;
  font-size: 0.875rem;
}

.ours i { color: #2E7D32; }
html.dark .ours i { color: #A5D6A7; }

@media screen and (max-width: 900px) {
  .row { grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr); gap: 16px; }
  .label { grid-column: 1 / -1; padding-bottom: 0; }
  .row.head .cell:first-child { display: none; }
  .them, .ours { padding-top: 8px; }
}

@media screen and (max-width: 560px) {
  .row { grid-template-columns: minmax(0, 1fr); gap: 0; }
  .row.head { display: none; }
  .them { padding-top: 4px; padding-bottom: 6px; }
  .ours { padding-top: 10px; padding-bottom: 10px; }
  .ours::before { border-radius: 10px; }
  .row:first-child .ours::before, .row:last-child .ours::before { border-radius: 10px; }
}

</style>
