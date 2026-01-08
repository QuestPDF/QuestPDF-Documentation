<script setup lang="ts">

interface Standard {
  label: string;
  name: string;
  description: string;
  badges: string[];
}

const standards : Standard[] = [
  {
    label: "Archival",
    name: "PDF/A",
    description: "ISO 19005 standard for long-term document preservation, ensuring your PDFs remain readable and visually identical for decades without external dependencies.",
    badges: ["PDF/A-2b", "PDF/A-2u", "PDF/A-2a", "PDF/A-3b", "PDF/A-3u", "PDF/A-3a"]
  },
  {
    label: "Accessibility",
    name: "PDF/UA",
    description: "ISO 14289 standard for universal accessibility with full support for screen readers and assistive technologies, ensuring your PDFs are usable by people with disabilities.",
    badges: ["PDF/UA-1"]
  },
  {
    label: "E-Invoicing",
    name: "EN 16931",
    description: "European standard for electronic invoicing. Embed structured invoice data (XML) within PDF documents for automated processing.",
    badges: ["ZUGFeRD", "Factur-X"]
  }
];

</script>

<template>
  <section class="content">
    <div class="section-tag">Compliance</div>

    <div>
      <h2>Industry-standard PDF compliance</h2>

      <p class="sub-header">
        Generate PDF documents that meet the strictest archival and accessibility requirements.
        Every build is automatically validated using the open-source <a href="https://verapdf.org/" target="_blank" rel="noopener">veraPDF</a> and <a href="https://www.mustangproject.org/" target="_blank" rel="noopener">Mustang</a> tools.
      </p>
    </div>

    <div class="standard-cards">
      <div v-for="standard in standards" class="wide-card card">
        <div class="card-header">
          <span class="card-label">{{ standard.label }}</span>
          <span class="card-standard">{{ standard.name }}</span>
        </div>

        <p class="card-description">{{ standard.description }}</p>

        <div class="standards-badges">
          <span v-for="badge in standard.badges">{{ badge }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

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
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 16px;
}

.standard-cards > :first-child {
  grid-column: 1 / span 2;
}

@media screen and (max-width: 600px) {
  .standard-cards {
    grid-template-columns: 1fr;
  }

  .standard-cards > :first-child {
    grid-column: 1;
  }
}

.standard-card {
  padding: 24px;
  background-color: var(--vp-c-bg-alt);
  border-radius: 16px;
  border: 1px solid #8882;
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
  gap: 12px;
  margin-top: 16px;
}

.standards-badges > span {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  line-height: 1;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: border-color 0.2s ease, background-color 0.2s ease;
  border: 1px solid #8888;
}

</style>
