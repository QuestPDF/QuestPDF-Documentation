<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Enterprise</div>
      <h2>The vendor questionnaire, with evidence</h2>
      <p class="sub-header">Every requirement a review tends to ask about, its status, and where to verify it.</p>
    </div>

    <!-- one table: requirement, status, answer, evidence link. Group rows separate the two reviews -->
    <div class="panel table">
      <div class="row head">
        <div>Requirement</div>
        <div>Status</div>
        <div>Answer</div>
        <div>Evidence</div>
      </div>

      <template v-for="group of groups" :key="group.title">
        <div class="row group">{{ group.title }}</div>
        <div v-for="row of group.rows" :key="row.requirement" class="row">
          <div class="requirement">{{ row.requirement }}</div>
          <div class="status"><i class="fa-regular fa-check"></i> Met</div>
          <div class="answer">{{ row.answer }}</div>
          <div class="evidence"><a class="t-link" :href="row.href">{{ row.link }}</a></div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
const groups = [
  {
    title: "Infrastructure and security",
    rows: [
      { requirement: "No outbound network traffic", answer: "No network calls, no telemetry, no update checks.", link: "Security policy", href: "/security-policy.html" },
      { requirement: "No license server", answer: "Nothing to contact; runs offline and air-gapped.", link: "Security policy", href: "/security-policy.html" },
      { requirement: "Source code available", answer: "The full library is on GitHub.", link: "Repository", href: "https://github.com/QuestPDF/QuestPDF" },
      { requirement: "Native dependencies", answer: "Skia and qpdf, built from source in our CI pipelines.", link: "Security policy", href: "/security-policy.html" },
      { requirement: "Vulnerability disclosure", answer: "Coordinated disclosure; advisories published with the fix.", link: "Security policy", href: "/security-policy.html" }
    ]
  },
  {
    title: "Document standards",
    rows: [
      { requirement: "PDF/A archival (ISO 19005)", answer: "PDF/A-2 and PDF/A-3 at levels b, u and a.", link: "Document settings", href: "/concepts/document-settings.html" },
      { requirement: "PDF/UA accessibility (ISO 14289)", answer: "PDF/UA-1, tagged for assistive technology.", link: "Accessibility", href: "/concepts/accessibility.html" },
      { requirement: "E-invoicing (EN 16931)", answer: "ZUGFeRD and Factur-X, invoice XML embedded in PDF/A-3.", link: "ZUGFeRD example", href: "/examples/zugferd.html" },
      { requirement: "Output validation", answer: "Every build is checked with veraPDF and Mustang.", link: "How we validate", href: "/examples/zugferd.html" }
    ]
  }
];
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table {
  width: 100%;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
}

.row {
  display: grid;
  grid-template-columns: 280px 90px minmax(0, 1fr) 170px;
  gap: 24px;
  align-items: baseline;
  padding: 13px 0;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.row.head {
  padding-top: 0;
  padding-bottom: 10px;
  border-top: none;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.row.group {
  display: block;
  padding-top: 22px;
  padding-bottom: 8px;
  border-top: none;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--vp-c-text-1);
}

.row.group + .row {
  border-top-color: var(--vp-c-text-1);
}

.requirement {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: #2E7D32;
  white-space: nowrap;
}

html.dark .status {
  color: #A5D6A7;
}

.status i {
  font-size: 0.75rem;
}

.answer {
  color: var(--vp-c-text-2);
}

@media screen and (max-width: 1000px) {
  .row { grid-template-columns: minmax(0, 1fr) 80px; gap: 6px 16px; }
  .row.head { display: none; }
  .requirement { order: 1; }
  .status { order: 2; justify-self: end; }
  .answer { order: 3; grid-column: 1 / -1; }
  .evidence { order: 4; grid-column: 1 / -1; }
}

</style>
