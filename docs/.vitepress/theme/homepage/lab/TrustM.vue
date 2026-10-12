<template>
  <section class="content">
    <!-- no section header: the statement is the header -->
    <div class="panel statement-panel">
      <div class="section-tag">Trust</div>

      <p class="statement">
        Runs on your servers.<sup>1</sup>
        Open to inspection.<sup>2</sup>
        Readable in thirty years.<sup>3</sup>
        Passes the audit.<sup>4</sup>
      </p>

      <ol class="footnotes">
        <li v-for="(note, index) of notes" :key="index">
          <span class="footnote-index">{{ index + 1 }}</span>
          <span class="footnote-text">
            {{ note.text }}
            <a class="t-link" :href="note.href" :target="note.href.startsWith('http') ? '_blank' : undefined" rel="noopener">{{ note.link }}</a>
          </span>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
const notes = [
  { text: "QuestPDF runs inside your application process. No network calls, no telemetry, no license server; works offline and air-gapped. Thousands of pages per second on a single server.", link: "Security policy", href: "/security-policy.html" },
  { text: "The full source code is on GitHub. The native dependencies, Skia and qpdf, are built from source in our CI.", link: "Repository", href: "https://github.com/QuestPDF/QuestPDF" },
  { text: "PDF/A-2 and PDF/A-3 (ISO 19005) at conformance levels b, u and a, selected with one setting.", link: "Document settings", href: "/concepts/document-settings.html" },
  { text: "PDF/UA-1 (ISO 14289) for assistive technology and ZUGFeRD, Factur-X (EN 16931) for e-invoicing, every build validated with veraPDF and Mustang.", link: "E-invoicing example", href: "/examples/zugferd.html" }
];
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.statement-panel {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.statement {
  max-width: 1000px;
  margin: 0;
  font-size: 2.75rem;
  line-height: 3.5rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--vp-c-text-1);
}

.statement sup {
  margin-right: 0.35em;
  font-size: 0.4em;
  font-weight: 600;
  color: #1E88E5;
  vertical-align: super;
}

html.dark .statement sup {
  color: #64B5F6;
}

.footnotes {
  list-style: none;
  margin: 40px 0 0;
  padding: 32px 0 0;
  border-top: 1px solid var(--vp-c-divider);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 32px;
  width: 100%;
}

.footnotes li {
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr);
  gap: 8px;
  font-size: 0.9375rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.footnote-index {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #1E88E5;
}

html.dark .footnote-index {
  color: #64B5F6;
}

.footnote-text .t-link {
  display: block;
  margin-top: 6px;
}

@media screen and (max-width: 1100px) {
  .footnotes { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .statement { font-size: 2.25rem; line-height: 2.875rem; }
}

@media screen and (max-width: 600px) {
  .footnotes { grid-template-columns: minmax(0, 1fr); }
  .statement { font-size: 1.75rem; line-height: 2.25rem; }
}

</style>
