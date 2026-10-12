<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Verified</div>
      <h2>Every release ships with a passing validation report</h2>
      <p class="sub-header">The documents are checked by independent, open-source validators before a version is published. This is what the result looks like.</p>
    </div>

    <!-- a report page on the left, as the artefact; what it proves and what surrounds it on the right -->
    <div class="panel report-panel">
      <figure class="report">
        <div class="report-band"></div>

        <div class="report-head">
          <div>
            <div class="report-title">Validation report</div>
            <div class="report-meta">Release pipeline · every build</div>
          </div>
          <div class="stamp">
            <span>Validated</span>
            <small>every build</small>
          </div>
        </div>

        <table class="report-table">
          <thead>
            <tr><th>Standard</th><th>Validator</th><th>Result</th></tr>
          </thead>
          <tbody>
            <tr v-for="row of rows" :key="row.standard">
              <td><strong>{{ row.standard }}</strong><span class="iso">{{ row.iso }}</span></td>
              <td>{{ row.validator }}</td>
              <td><span class="pass"><i class="fa-regular fa-check"></i> {{ row.result }}</span></td>
            </tr>
          </tbody>
        </table>

        <figcaption>Validated with the open-source <a class="t-link" href="https://verapdf.org/" target="_blank" rel="noopener">veraPDF</a> and <a class="t-link" href="https://www.mustangproject.org/" target="_blank" rel="noopener">Mustang</a>, and periodically with Acrobat Preflight.</figcaption>
      </figure>

      <div class="aside">
        <article v-for="fact of facts" :key="fact.title" class="fact">
          <div class="t-icon"><i class="fa-regular" :class="fact.icon"></i></div>
          <div>
            <h3 class="fact-title">{{ fact.title }}</h3>
            <p class="fact-text">{{ fact.text }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const rows = [
  { standard: "PDF/A-2", iso: "ISO 19005-2 · b, u, a", validator: "veraPDF", result: "Pass" },
  { standard: "PDF/A-3", iso: "ISO 19005-3 · b, u, a", validator: "veraPDF", result: "Pass" },
  { standard: "PDF/UA-1", iso: "ISO 14289-1", validator: "veraPDF", result: "Pass" },
  { standard: "ZUGFeRD · Factur-X", iso: "EN 16931", validator: "Mustang", result: "Valid" }
];

const facts = [
  { icon: "fa-file-certificate", title: "An audit you do not have to run", text: "Archival, accessibility and e-invoicing conformance are proven before the package reaches NuGet, not after your customer complains." },
  { icon: "fa-shield-check", title: "Produced entirely on your servers", text: "No network calls, no telemetry, no license server. The report above is ours; your documents never leave your infrastructure." },
  { icon: "fa-code", title: "Open to the same scrutiny", text: "Full source on GitHub; the native dependencies, Skia and qpdf, are built from source in the same pipeline." }
];
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.report-panel {
  width: 100%;
  margin-top: 32px;
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 56px;
  align-items: center;
}

/* the report: a white page with a blue band along the top, lifted off the panel */
.report {
  position: relative;
  margin: 0;
  padding: 32px 36px 28px;
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.06), 0 24px 48px -24px rgba(16, 24, 40, 0.35);
  overflow: hidden;
}

.report-band {
  position: absolute;
  inset: 0 0 auto 0;
  height: 6px;
  background: linear-gradient(90deg, #1E88E5, #00BCD4);
}

.report-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.report-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.report-meta {
  margin-top: 2px;
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
}

/* a round rubber stamp, slightly turned */
.stamp {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 92px;
  height: 92px;
  border: 3px double #2E7D32;
  border-radius: 50%;
  transform: rotate(-12deg);
  color: #2E7D32;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.6875rem;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
}

.stamp small {
  font-size: 0.5625rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

html.dark .stamp {
  border-color: #81C784;
  color: #81C784;
}

.report-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  font-size: 0.9375rem;
  line-height: 1.375rem;
}

.report-table th {
  padding: 8px 0;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
  border-bottom: 1px solid var(--vp-c-divider);
}

.report-table td {
  padding: 12px 0;
  vertical-align: top;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
}

.report-table td strong {
  display: block;
  color: var(--vp-c-text-1);
}

.iso {
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
}

.pass {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #2E7D32;
  background-color: #67B84D22;
}

html.dark .pass {
  color: #A5D6A7;
}

figcaption {
  margin-top: 16px;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-3);
}

.aside {
  display: flex;
  flex-direction: column;
}

.fact {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 20px;
  padding: 20px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.fact:first-child {
  padding-top: 0;
  border-top: none;
}

.fact:last-child {
  padding-bottom: 0;
}

.fact-title {
  margin: 0 0 4px;
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 700;
}

.fact-text {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

@media screen and (max-width: 1100px) {
  .report-panel { grid-template-columns: minmax(0, 1fr); gap: 40px; }
}

@media screen and (max-width: 600px) {
  .report { padding: 24px 20px 20px; }
  .report-table th:nth-child(2), .report-table td:nth-child(2) { display: none; }
}

</style>
