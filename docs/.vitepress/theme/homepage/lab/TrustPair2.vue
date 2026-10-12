<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Foundations</div>
      <h2>Built for regulated, security-conscious teams</h2>
      <p class="sub-header">Compliant output from a library that stays inside your infrastructure.</p>
    </div>

    <div class="pair">
      <!-- left: a one-line promise, then each standard as a small label with its chips -->
      <div class="card">
        <div class="p-eyebrow">Standards, verified on every build</div>
        <h3 class="p-headline">Compliant by default.</h3>
        <p class="p-lead">Output that passes archival, accessibility and e-invoicing audits.</p>

        <div class="groups">
          <div v-for="group of groups" :key="group.label" class="group">
            <div class="group-label">{{ group.label }}</div>
            <div class="p-chips">
              <span v-for="chip of group.chips" :key="chip" class="p-chip">{{ chip }}</span>
            </div>
          </div>
        </div>

        <p class="p-verified">
          <i class="fa-regular fa-badge-check"></i>
          <span>Validated with <a class="p-link" href="https://verapdf.org/" target="_blank" rel="noopener">veraPDF</a> and <a class="p-link" href="https://www.mustangproject.org/" target="_blank" rel="noopener">Mustang</a> on every build.</span>
        </p>
      </div>

      <!-- right: three facts as headlines, an icon and one line each -->
      <div class="card">
        <div class="p-eyebrow">Inside your infrastructure</div>
        <h3 class="p-headline">Nothing leaves your servers.</h3>
        <p class="p-lead">A library in your process, not a service in someone's cloud.</p>

        <div class="facts">
          <article v-for="fact of facts" :key="fact.title" class="fact">
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
const groups = [
  { label: "Archival · PDF/A · ISO 19005", chips: ["PDF/A-2b", "PDF/A-2u", "PDF/A-2a", "PDF/A-3b", "PDF/A-3u", "PDF/A-3a"] },
  { label: "Accessibility · PDF/UA · ISO 14289", chips: ["PDF/UA-1"] },
  { label: "E-invoicing · EN 16931", chips: ["ZUGFeRD", "Factur-X"] }
];

const facts = [
  { icon: "fa-cloud-slash", title: "Zero network calls.", text: "No telemetry, no license server. Runs offline and air-gapped." },
  { icon: "fa-code", title: "Full source on GitHub.", text: "Skia and qpdf, the native dependencies, are built from source in CI." },
  { icon: "fa-gauge-high", title: "Thousands of pages per second.", text: "Low CPU and memory on a single server." }
];
</script>

<style scoped>

.groups {
  display: flex;
  flex-direction: column;
  gap: 18px;
  flex-grow: 1;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
}

.group-label {
  margin-bottom: 8px;
  font-size: 0.8125rem;
  line-height: 1.125rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
}

.facts {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 24px;
}

.fact {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 18px;
  padding: 18px 0;
  border-top: 1px solid var(--vp-c-divider);
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

</style>
