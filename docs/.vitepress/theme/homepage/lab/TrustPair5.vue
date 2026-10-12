<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Trust</div>
      <h2>Industry-standard output, enterprise-grade foundations</h2>
      <p class="sub-header">Two things every reviewer checks, answered in two cards.</p>
    </div>

    <div class="pair">
      <!-- left: one bold claim, one line, the standards as a single chip cloud -->
      <div class="card">
        <div class="p-eyebrow">Compliance</div>
        <h3 class="p-statement">Passes the audits.</h3>
        <p class="p-lead">PDF/A for archival, PDF/UA for accessibility, EN 16931 for e-invoicing.</p>

        <div class="p-chips cloud">
          <span v-for="chip of chips" :key="chip" class="p-chip">{{ chip }}</span>
        </div>

        <p class="p-verified">
          <i class="fa-regular fa-badge-check"></i>
          <span>Every build validated with <a class="p-link" href="https://verapdf.org/" target="_blank" rel="noopener">veraPDF</a> and <a class="p-link" href="https://www.mustangproject.org/" target="_blank" rel="noopener">Mustang</a>.</span>
        </p>
      </div>

      <!-- right: the same shape, the claim reviewers write to ask about, then three proofs in a row -->
      <div class="card">
        <div class="p-eyebrow">Foundations</div>
        <h3 class="p-statement">Nothing leaves your infrastructure.</h3>
        <p class="p-lead">No network calls, no telemetry, no license server. Runs offline and in air-gapped environments.</p>

        <div class="proofs">
          <div v-for="proof of proofs" :key="proof.text" class="proof">
            <i class="fa-regular" :class="proof.icon"></i>
            <span>{{ proof.text }}</span>
          </div>
        </div>

        <a class="p-footer-link p-link" href="/security-policy.html">Security policy <i class="fa-regular fa-arrow-right"></i></a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const chips = ["PDF/A-2b", "PDF/A-2u", "PDF/A-2a", "PDF/A-3b", "PDF/A-3u", "PDF/A-3a", "PDF/UA-1", "ZUGFeRD", "Factur-X"];

const proofs = [
  { icon: "fa-code", text: "Full source on GitHub" },
  { icon: "fa-cubes", text: "Skia and qpdf built from source in CI" },
  { icon: "fa-gauge-high", text: "Thousands of pages per second" }
];
</script>

<style scoped>

.cloud {
  flex-grow: 1;
  align-content: flex-start;
  margin-top: 24px;
}

.proofs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  flex-grow: 1;
  align-content: flex-start;
  margin-top: 24px;
}

.proof {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  border-radius: 14px;
  background-color: var(--home-surface-inner);
  font-size: 0.9375rem;
  line-height: 1.375rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.proof i {
  font-size: 1.125rem;
}

@media screen and (max-width: 560px) {
  .proofs { grid-template-columns: minmax(0, 1fr); }
  .proof { flex-direction: row; align-items: center; }
}

</style>
