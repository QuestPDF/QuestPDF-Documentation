<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Compliance and security</div>
      <h2>Standards on the page, privacy in the process</h2>
      <p class="sub-header">Documents that pass archival, accessibility and e-invoicing audits, from a library that never leaves your infrastructure.</p>
    </div>

    <div class="pair">
      <!-- left: three labelled chip rows, the validation line as the footer -->
      <div class="card">
        <div class="p-head">
          <div class="p-icon"><i class="fa-regular fa-file-certificate"></i></div>
          <div>
            <h3 class="p-title">Standards and compliance</h3>
            <p class="p-lead">Conformance levels supported out of the box.</p>
          </div>
        </div>

        <div class="rows">
          <div v-for="standard of standards" :key="standard.name" class="row">
            <div class="row-label">
              <span class="row-name">{{ standard.name }}</span>
              <span class="row-iso">{{ standard.iso }}</span>
            </div>
            <div class="p-chips">
              <span v-for="chip of standard.chips" :key="chip" class="p-chip">{{ chip }}</span>
            </div>
          </div>
        </div>

        <p class="p-verified">
          <i class="fa-regular fa-badge-check"></i>
          <span>Every build validated with <a class="p-link" href="https://verapdf.org/" target="_blank" rel="noopener">veraPDF</a> and <a class="p-link" href="https://www.mustangproject.org/" target="_blank" rel="noopener">Mustang</a>.</span>
        </p>
      </div>

      <!-- right: a spec sheet, the requirement on the left and the one-word answer on the right -->
      <div class="card">
        <div class="p-head">
          <div class="p-icon"><i class="fa-regular fa-shield-check"></i></div>
          <div>
            <h3 class="p-title">Inside your infrastructure</h3>
            <p class="p-lead">What a security reviewer needs to know.</p>
          </div>
        </div>

        <dl class="spec">
          <div v-for="row of spec" :key="row.key" class="spec-row">
            <dt>{{ row.key }}</dt>
            <dd>{{ row.value }}</dd>
          </div>
        </dl>

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

const spec = [
  { key: "Network access", value: "None" },
  { key: "Telemetry", value: "None" },
  { key: "License server", value: "None, nothing to activate" },
  { key: "Deployment", value: "Offline and air-gapped" },
  { key: "Source code", value: "Full, on GitHub" },
  { key: "Native dependencies", value: "Skia and qpdf, built from source in CI" },
  { key: "Throughput", value: "Thousands of pages per second" }
];
</script>

<style scoped>

.rows {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 24px;
}

.row {
  display: grid;
  grid-template-columns: 176px minmax(0, 1fr);
  gap: 16px;
  align-items: center;
  padding: 16px 0;
  border-top: 1px solid var(--vp-c-divider);
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

.spec {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 24px 0 0;
}

.spec-row {
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr);
  gap: 16px;
  padding: 11px 0;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.spec-row dt {
  color: var(--vp-c-text-2);
}

.spec-row dd {
  margin: 0;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

@media screen and (max-width: 560px) {
  .row { grid-template-columns: minmax(0, 1fr); gap: 10px; }
  .spec-row { grid-template-columns: minmax(0, 1fr); gap: 0; }
}

</style>
