<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Proof</div>
      <h2>Claims you can verify</h2>
      <p class="sub-header">Every statement below links to where you can check it yourself.</p>
    </div>

    <!-- five tiles divided by hairlines: a number, what it counts, one line of context and the link to the evidence -->
    <div class="panel tiles">
      <article v-for="tile of tiles" :key="tile.label" class="tile">
        <div class="value">{{ tile.value }}</div>
        <div class="label">{{ tile.label }}</div>
        <p class="text">{{ tile.text }}</p>
        <a class="t-link verify" :href="tile.href" :target="tile.href.startsWith('http') ? '_blank' : undefined" rel="noopener">
          {{ tile.linkLabel }} <i class="fa-regular fa-arrow-right"></i>
        </a>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const tiles = [
  { value: "0", label: "network calls", text: "No telemetry, no license server. Works offline and air-gapped.", linkLabel: "Security policy", href: "/security-policy.html" },
  { value: "100%", label: "source available", text: "The entire library on GitHub; native dependencies built from source.", linkLabel: "Repository", href: "https://github.com/QuestPDF/QuestPDF" },
  { value: "6", label: "PDF/A levels", text: "2b, 2u, 2a, 3b, 3u and 3a (ISO 19005), chosen with one setting.", linkLabel: "Document settings", href: "/concepts/document-settings.html" },
  { value: "UA-1", label: "accessibility", text: "PDF/UA (ISO 14289): tagged documents that screen readers can navigate.", linkLabel: "Accessibility guide", href: "/concepts/accessibility.html" },
  { value: "2", label: "validators per build", text: "veraPDF for PDF/A, Mustang for ZUGFeRD and Factur-X, in CI.", linkLabel: "E-invoicing example", href: "/examples/zugferd.html" }
];
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tiles {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  width: 100%;
  margin-top: 32px;
}

.tile {
  display: flex;
  flex-direction: column;
  padding: 0 32px;
}

.tile:first-child { padding-left: 0; }
.tile:last-child { padding-right: 0; }
.tile:not(:first-child) { border-left: 1px solid var(--vp-c-divider); }

.value {
  font-size: 3rem;
  line-height: 3.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.label {
  margin-top: 2px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.text {
  flex-grow: 1;
  margin: 12px 0 0;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.verify {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
  font-size: 0.9375rem;
}

.verify i {
  font-size: 0.75rem;
}

@media screen and (max-width: 1200px) {
  .tiles { grid-template-columns: repeat(3, minmax(0, 1fr)); row-gap: 40px; }
  .tile:nth-child(3n + 1) { padding-left: 0; border-left: none; }
  .tile:nth-child(3n) { padding-right: 0; }
  .tile:not(:nth-child(3n + 1)) { border-left: 1px solid var(--vp-c-divider); }
}

@media screen and (max-width: 700px) {
  .tiles { grid-template-columns: minmax(0, 1fr); row-gap: 0; }
  .tile:nth-child(n) { padding: 24px 0; border-left: none; border-top: 1px solid var(--vp-c-divider); }
  .tile:first-child { padding-top: 0; border-top: none; }
  .tile:last-child { padding-bottom: 0; }
}

</style>
