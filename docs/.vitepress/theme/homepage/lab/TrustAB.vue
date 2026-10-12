<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Enterprise</div>
      <h2>Two reviews, answered in advance</h2>
      <p class="sub-header">The questions a security review and a compliance audit put to a PDF library, with the answer beside each one.</p>
    </div>

    <!-- A's questions in B's two sheets: each row is a question in the reader's words and a one-line answer -->
    <div class="layout">
      <div v-for="sheet of sheets" :key="sheet.title" class="card sheet">
        <div class="sheet-head">
          <div class="t-icon"><i class="fa-regular" :class="sheet.icon"></i></div>
          <div>
            <h3 class="sheet-title">{{ sheet.title }}</h3>
            <div class="sheet-sub">{{ sheet.sub }}</div>
          </div>
        </div>

        <dl class="rows">
          <template v-for="row of sheet.rows" :key="row.q">
            <dt>{{ row.q }}</dt>
            <dd><strong>{{ row.verdict }}</strong> {{ row.a }}</dd>
          </template>
        </dl>

        <a class="sheet-link t-link" :href="sheet.href">{{ sheet.link }} <i class="fa-regular fa-arrow-right"></i></a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const sheets = [
  {
    icon: "fa-shield-check",
    title: "Security review",
    sub: "Infrastructure, data and code",
    rows: [
      { q: "Does it send telemetry or call home?", verdict: "No.", a: "QuestPDF makes no network calls of any kind." },
      { q: "Does it need a license server or internet access?", verdict: "No.", a: "It runs inside your process, offline and air-gapped." },
      { q: "Can we audit the code?", verdict: "Yes.", a: "Full source on GitHub, native dependencies built from source in CI." },
      { q: "Is there a disclosure process?", verdict: "Yes.", a: "Coordinated disclosure, advisories published with the fix." }
    ],
    link: "Security policy", href: "/security-policy.html"
  },
  {
    icon: "fa-file-certificate",
    title: "Compliance audit",
    sub: "Archival, accessibility and e-invoicing",
    rows: [
      { q: "Will the PDFs pass an archival audit?", verdict: "Yes.", a: "PDF/A-2 and PDF/A-3 (ISO 19005), levels b, u and a." },
      { q: "Are the documents accessible?", verdict: "Yes.", a: "PDF/UA-1 (ISO 14289), tagged for assistive technology." },
      { q: "Can we issue electronic invoices?", verdict: "Yes.", a: "ZUGFeRD and Factur-X (EN 16931) embedded in PDF/A-3." },
      { q: "How do you know the output passes?", verdict: "We check.", a: "Every build is validated with veraPDF and Mustang." }
    ],
    link: "Document settings", href: "/concepts/document-settings.html"
  }
];
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.layout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
  width: 100%;
  margin-top: 32px;
}

.card.sheet {
  align-items: stretch;
}

.sheet-head {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.sheet-title {
  margin: 0;
  font-size: 1.375rem;
  line-height: 1.75rem;
}

.sheet-sub {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.rows {
  margin: 0;
  flex-grow: 1;
}

.rows dt {
  padding-top: 18px;
  font-size: 1.0625rem;
  line-height: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.rows dd {
  margin: 4px 0 0;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.9375rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.rows dd:last-child {
  border-bottom: none;
}

.rows strong {
  color: var(--vp-c-text-1);
}

.sheet-link {
  margin-top: 16px;
  font-size: 0.9375rem;
}

.sheet-link i {
  font-size: 0.75rem;
}

@media screen and (max-width: 1000px) {
  .layout { grid-template-columns: minmax(0, 1fr); }
}

</style>
