<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Foundations</div>
      <h2>Compliance built in, nothing sent out</h2>
      <p class="sub-header">Industry-standard documents from a library that keeps every byte on your side of the firewall.</p>
    </div>

    <div class="pair">
      <!-- left: the family name is a dark lead chip, its levels follow as light chips on the same row -->
      <div class="card">
        <div class="p-eyebrow">Standards and compliance</div>
        <h3 class="p-headline">Archival, accessible, e‑invoice ready.</h3>

        <div class="families">
          <div v-for="family of families" :key="family.name" class="family">
            <div class="p-chips">
              <span class="p-chip lead">{{ family.name }}</span>
              <span v-for="chip of family.chips" :key="chip" class="p-chip">{{ chip }}</span>
            </div>
            <div class="family-note">{{ family.note }}</div>
          </div>
        </div>

        <p class="p-verified">
          <i class="fa-regular fa-badge-check"></i>
          <span>Every build validated with <a class="p-link" href="https://verapdf.org/" target="_blank" rel="noopener">veraPDF</a> and <a class="p-link" href="https://www.mustangproject.org/" target="_blank" rel="noopener">Mustang</a>.</span>
        </p>
      </div>

      <!-- right: four metric tiles, a number that answers the question and a short label -->
      <div class="card">
        <div class="p-eyebrow">Inside your infrastructure</div>
        <h3 class="p-headline">The numbers a reviewer wants.</h3>

        <div class="tiles">
          <div v-for="tile of tiles" :key="tile.label" class="tile">
            <div class="tile-value">{{ tile.value }}</div>
            <div class="tile-label">{{ tile.label }}</div>
          </div>
        </div>

        <p class="tiles-note">
          <i class="fa-regular fa-shield-check"></i>
          <span>Runs in your process, offline and air-gapped. Skia and qpdf built from source in CI. <a class="p-link" href="/security-policy.html">Security policy</a></span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const families = [
  { name: "PDF/A", chips: ["2b", "2u", "2a", "3b", "3u", "3a"], note: "ISO 19005 · long-term archival" },
  { name: "PDF/UA", chips: ["UA-1"], note: "ISO 14289 · accessibility" },
  { name: "EN 16931", chips: ["ZUGFeRD", "Factur-X"], note: "Structured e-invoices embedded in PDF/A-3" }
];

const tiles = [
  { value: "0", label: "network calls" },
  { value: "0", label: "telemetry, license servers" },
  { value: "100%", label: "source code on GitHub" },
  { value: "1000s", label: "pages per second" }
];
</script>

<style scoped>

.families {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 20px;
}

.family {
  padding: 16px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.family-note {
  margin-top: 10px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-3);
}

.tiles {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  flex-grow: 1;
  margin-top: 24px;
}

.tile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  padding: 22px 24px;
  border-radius: 16px;
  background-color: var(--home-surface-inner);
}

.tile-value {
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.tile-label {
  font-size: 0.9375rem;
  line-height: 1.375rem;
  color: var(--vp-c-text-2);
}

.tiles-note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 20px 0 0;
  font-size: 0.9375rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.tiles-note i {
  margin-top: 4px;
  color: var(--vp-c-text-1);
}

@media screen and (max-width: 420px) {
  .tiles { grid-template-columns: minmax(0, 1fr); }
}

</style>
