<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Trust</div>
      <h2>Ready for your audits and your security review</h2>
      <p class="sub-header">The standards the documents meet, and the answers the reviewers ask for.</p>
    </div>

    <div class="pair">
      <!-- left: every chip carries a tick; the groups are rows with a label -->
      <div class="card">
        <div class="sheet-head">
          <div class="p-icon"><i class="fa-regular fa-file-certificate"></i></div>
          <div class="sheet-head-text">
            <h3 class="p-title">Document standards</h3>
            <p class="p-lead">Supported conformance levels and profiles.</p>
          </div>
          <span class="count"><i class="fa-regular fa-check"></i> 9 supported</span>
        </div>

        <div class="rows">
          <div v-for="standard of standards" :key="standard.name" class="row">
            <div class="row-label">
              <span class="row-name">{{ standard.name }}</span>
              <span class="row-iso">{{ standard.iso }}</span>
            </div>
            <div class="p-chips">
              <span v-for="chip of standard.chips" :key="chip" class="p-chip ticked"><i class="fa-regular fa-check"></i>{{ chip }}</span>
            </div>
          </div>
        </div>

        <p class="p-verified">
          <i class="fa-regular fa-badge-check"></i>
          <span>Validated on every build with <a class="p-link" href="https://verapdf.org/" target="_blank" rel="noopener">veraPDF</a> and <a class="p-link" href="https://www.mustangproject.org/" target="_blank" rel="noopener">Mustang</a>.</span>
        </p>
      </div>

      <!-- right: a checklist with a header strip and a count, every item a ticked statement -->
      <div class="card">
        <div class="sheet-head">
          <div class="p-icon"><i class="fa-regular fa-shield-check"></i></div>
          <div class="sheet-head-text">
            <h3 class="p-title">Security review</h3>
            <p class="p-lead">The questions we get before every purchase.</p>
          </div>
          <span class="count"><i class="fa-regular fa-check"></i> {{ checks.length }} of {{ checks.length }}</span>
        </div>

        <ul class="checks">
          <li v-for="check of checks" :key="check.title">
            <i class="fa-duotone fa-square-check"></i>
            <span><strong>{{ check.title }}</strong> <span class="check-text">{{ check.text }}</span></span>
          </li>
        </ul>

        <a class="p-footer-link p-link" href="/security-policy.html">Read the security policy <i class="fa-regular fa-arrow-right"></i></a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const standards = [
  { name: "PDF/A", iso: "ISO 19005 · archival", chips: ["PDF/A-2b", "PDF/A-2u", "PDF/A-2a", "PDF/A-3b", "PDF/A-3u", "PDF/A-3a"] },
  { name: "PDF/UA", iso: "ISO 14289 · accessibility", chips: ["PDF/UA-1"] },
  { name: "EN 16931", iso: "e-invoicing", chips: ["ZUGFeRD", "Factur-X"] }
];

const checks = [
  { title: "No network calls.", text: "No external APIs, no update checks." },
  { title: "No telemetry.", text: "We never see your documents or your data." },
  { title: "No license server.", text: "Nothing to activate, nothing to renew online." },
  { title: "Runs offline and air-gapped.", text: "A library in your process, on your hardware." },
  { title: "Full source code on GitHub.", text: "Skia and qpdf built from source in CI." },
  { title: "Thousands of pages per second.", text: "Low CPU and memory on a single server." }
];
</script>

<style scoped>

.sheet-head {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.sheet-head-text {
  flex-grow: 1;
}

.count {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 2px;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 600;
  white-space: nowrap;
  color: #2E7D32;
  background-color: color-mix(in srgb, #2E7D32 10%, transparent);
}

html.dark .count {
  color: #A5D6A7;
  background-color: color-mix(in srgb, #A5D6A7 12%, transparent);
}

.rows {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.row {
  display: grid;
  grid-template-columns: 176px minmax(0, 1fr);
  gap: 16px;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.row:last-child {
  border-bottom: none;
}

.row-label {
  display: flex;
  flex-direction: column;
}

.row-name {
  font-size: 1.0625rem;
  line-height: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.row-iso {
  font-size: 0.8125rem;
  line-height: 1.125rem;
  color: var(--vp-c-text-3);
}

.p-chip.ticked i {
  font-size: 0.6875rem;
  color: #2E7D32;
}

html.dark .p-chip.ticked i {
  color: #A5D6A7;
}

.checks {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0;
  padding: 8px 0 0;
  list-style: none;
}

.checks li {
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  padding: 10px 0;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.checks li i {
  margin-top: 4px;
  font-size: 1.0625rem;
  color: #2E7D32;
}

html.dark .checks li i {
  color: #A5D6A7;
}

.checks strong {
  color: var(--vp-c-text-1);
}

.check-text {
  color: var(--vp-c-text-2);
}

@media screen and (max-width: 560px) {
  .sheet-head { flex-wrap: wrap; }
  .row { grid-template-columns: minmax(0, 1fr); gap: 10px; }
}

</style>
