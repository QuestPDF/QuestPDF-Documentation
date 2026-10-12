<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Foundations</div>
      <h2>Six facts for the people who sign off</h2>
      <p class="sub-header">Each heading is a checkable fact, not a category name.</p>
    </div>

    <!-- C's headline facts in A's hairline grid: six cells, an icon, a fact as the heading, one line, a link -->
    <div class="panel facts">
      <article v-for="fact of facts" :key="fact.title" class="fact">
        <div class="t-icon"><i class="fa-regular" :class="fact.icon"></i></div>
        <h3 class="fact-title">{{ fact.title }}</h3>
        <p class="fact-text">{{ fact.text }}</p>
        <a class="t-link" :href="fact.href">{{ fact.link }} <i class="fa-regular fa-arrow-right"></i></a>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const facts = [
  { icon: "fa-cloud-slash", title: "Zero network calls.", text: "No telemetry, no license server. Runs offline and air-gapped.", link: "Security policy", href: "/security-policy.html" },
  { icon: "fa-code", title: "Full source on GitHub.", text: "Skia and qpdf, the native dependencies, are built from source in CI.", link: "Repository", href: "https://github.com/QuestPDF/QuestPDF" },
  { icon: "fa-gauge-high", title: "Thousands of pages per second.", text: "Low CPU and memory on a single server.", link: "Features overview", href: "/features-overview.html" },
  { icon: "fa-box-archive", title: "PDF/A-2 and PDF/A-3, levels b, u, a.", text: "ISO 19005 archival, validated with veraPDF on every build.", link: "Document settings", href: "/concepts/document-settings.html" },
  { icon: "fa-universal-access", title: "PDF/UA-1.", text: "ISO 14289 accessibility, tagged for assistive technology.", link: "Accessibility", href: "/concepts/accessibility.html" },
  { icon: "fa-file-invoice", title: "ZUGFeRD and Factur-X.", text: "EN 16931 e-invoicing, embedded in PDF/A-3, validated with Mustang.", link: "ZUGFeRD example", href: "/examples/zugferd.html" }
];
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;
  margin-top: 32px;
}

.fact {
  display: flex;
  flex-direction: column;
  padding: 32px 36px;
}

.fact:nth-child(3n + 1) { padding-left: 0; }
.fact:nth-child(3n) { padding-right: 0; }
.fact:nth-child(-n + 3) { padding-top: 0; }
.fact:nth-child(n + 4) { padding-bottom: 0; border-top: 1px solid var(--vp-c-divider); }
.fact:not(:nth-child(3n + 1)) { border-left: 1px solid var(--vp-c-divider); }

.fact-title {
  margin: 16px 0 4px;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
}

.fact-text {
  margin: 0 0 10px;
  flex-grow: 1;
  font-size: 0.9375rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.fact .t-link {
  font-size: 0.9375rem;
}

.fact .t-link i {
  font-size: 0.75rem;
}

@media screen and (max-width: 1100px) {
  .facts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .fact { padding: 28px 32px; }
  .fact:nth-child(n) { border: none; }
  .fact:nth-child(odd) { padding-left: 0; }
  .fact:nth-child(even) { padding-right: 0; border-left: 1px solid var(--vp-c-divider); }
  .fact:nth-child(-n + 2) { padding-top: 0; }
  .fact:nth-child(n + 3) { border-top: 1px solid var(--vp-c-divider); }
  .fact:nth-child(n + 5) { padding-bottom: 0; }
}

@media screen and (max-width: 700px) {
  .facts { grid-template-columns: minmax(0, 1fr); }
  .fact:nth-child(n) { padding: 24px 0; border: none; border-top: 1px solid var(--vp-c-divider); }
  .fact:first-child { padding-top: 0; border-top: none; }
  .fact:last-child { padding-bottom: 0; }
}

</style>
