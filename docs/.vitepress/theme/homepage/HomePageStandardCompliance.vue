<script setup lang="ts">

interface Standard {
  label: string;
  name: string;
  description: string;
  badges: string[][]; /* each inner array renders as its own row of chips */
}

const standards : Standard[] = [
  {
    label: "Archival",
    name: "PDF/A",
    description: "ISO 19005 standard for long-term document preservation, ensuring your PDFs remain readable and visually identical for decades without external dependencies.",
    badges: [
      ["PDF/A-2b", "PDF/A-2u", "PDF/A-2a"],
      ["PDF/A-3b", "PDF/A-3u", "PDF/A-3a"]
    ]
  },
  {
    label: "Accessibility",
    name: "PDF/UA",
    description: "ISO 14289 standard for universal accessibility with full support for screen readers and assistive technologies, ensuring your PDFs are usable by people with disabilities.",
    badges: [["PDF/UA-1"]]
  },
  {
    label: "E-Invoicing",
    name: "EN 16931",
    description: "European standard for electronic invoicing. Embed structured invoice data (XML) within PDF documents for automated processing.",
    badges: [["ZUGFeRD", "Factur-X"]]
  }
];

</script>

<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Compliance</div>

      <h2>Industry-standard PDF compliance</h2>

      <p class="sub-header">
        Generate PDF documents that meet the strictest archival and accessibility requirements.
        Every build is automatically validated using the open-source <a href="https://verapdf.org/" target="_blank" rel="noopener">veraPDF</a> and <a href="https://www.mustangproject.org/" target="_blank" rel="noopener">Mustang</a> tools.
      </p>
    </div>

    <div class="panel compliance">
      <div class="standards">
        <div v-for="standard in standards" :key="standard.name" class="standard">
          <div class="standard-header">
            <span class="standard-label">{{ standard.label }}</span>
            <span class="standard-name">{{ standard.name }}</span>
          </div>

          <div class="standard-details">
            <p class="standard-description">{{ standard.description }}</p>

            <div class="standards-badges">
              <div v-for="(row, index) in standard.badges" :key="index" class="standards-badges-row">
                <span v-for="badge in row" :key="badge">{{ badge }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

/* The section header sits on the canvas; the card below holds the three standards as columns,
   divided by hairlines, which become stacked rows on narrow screens. */

.compliance {
  margin-top: 32px;
}

.standards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.standard {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 40px;
}

.standard:first-child {
  padding-left: 0;
}

.standard:last-child {
  padding-right: 0;
}

.standard:not(:first-child) {
  border-left: 1px solid var(--vp-c-divider);
}

@media screen and (max-width: 960px) {
  .standards {
    grid-template-columns: minmax(0, 1fr);
  }

  .standard {
    padding: 24px 0;
  }

  .standard:first-child {
    padding-top: 0;
  }

  .standard:last-child {
    padding-bottom: 0;
  }

  .standard:not(:first-child) {
    border-left: none;
    border-top: 1px solid var(--vp-c-divider);
  }
}

.standard-header {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.standard-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.standard-name {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.standard-description {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.standards-badges {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}

.standards-badges-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* same white-on-grey style as the chips in the other homepage cards */
.standards-badges-row > span {
  display: inline-flex;
  align-items: center;
  padding: 8px 10px;
  line-height: 1;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background-color: var(--home-surface-inner);
}

</style>
