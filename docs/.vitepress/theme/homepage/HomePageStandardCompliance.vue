<script setup>

const standards = [
  "PDF/A-2b", "PDF/A-2u", "PDF/A-2a",
  "PDF/A-3b", "PDF/A-3u", "PDF/A-3a",
];

</script>

<template>
  <section class="content">
    <div class="section-tag">Compliance</div>

    <div>
      <h2>Industry-standard PDF compliance</h2>

      <p class="sub-header">
        Generate PDF documents that meet the strictest archival and accessibility requirements.
        Every build is automatically validated using the open-source <a href="https://verapdf.org/" target="_blank" rel="noopener">veraPDF</a> tool.
      </p>
    </div>

    <div class="standard-cards">
      <div class="standard-card light-shadow">
        <div class="card-header">
          <span class="card-label">Archival</span>
          <span class="card-standard">PDF/A</span>
        </div>
        <p class="card-description">
          ISO 19005 standard for long-term document preservation, ensuring your PDFs remain readable and visually identical for decades without external dependencies.
        </p>

        <div class="standards-badges">
          <span>PDF/A-2b</span>
          <span>PDF/A-2u</span>
          <span>PDF/A-2a</span>
          <span>PDF/A-3b</span>
          <span>PDF/A-3u</span>
          <span>PDF/A-3a</span>
        </div>
      </div>

      <div class="standard-card light-shadow">
        <div class="card-header">
          <span class="card-label">Accessibility</span>
          <span class="card-standard">PDF/UA</span>
        </div>
        <p class="card-description">
          ISO 14289 standard for universal accessibility.
          Full support for screen readers and assistive technologies.
        </p>

        <div class="standards-badges">
          <span>PDF/UA-1</span>
        </div>
      </div>
    </div>
  </section>
</template>
loc
<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 800px;
}

/* Standard Cards */

.standard-cards {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 32px;
  margin-top: 16px;
}

@media screen and (max-width: 600px) {
  .standard-cards {
    grid-template-columns: 1fr;
  }
}

.standard-card {
  padding: 24px;
  background-color: var(--vp-c-bg-alt);
  border-radius: 16px;

}

.card-header {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 16px;
}

.card-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.card-standard {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.card-description {
  font-size: 1rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.standards-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.standards-badges > span {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: border-color 0.2s ease, background-color 0.2s ease;
  background-color: var(--vp-c-bg);
}

</style>
