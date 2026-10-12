<template>
  <section class="content">
    <!-- one sentence, large, with the facts set in the brand colour; two links under it -->
    <div class="panel sentence-panel">
      <div class="section-tag">Trust</div>

      <p class="sentence">
        QuestPDF runs inside your application: <em>no network calls</em>, <em>no telemetry</em>, <em>no license server</em>, <em>air-gapped</em> if you need it.
        It produces <em>PDF/A</em>, <em>PDF/UA-1</em> and <em>ZUGFeRD / Factur-X</em> documents, validated with veraPDF and Mustang on every build.
      </p>

      <div class="links">
        <a class="t-link" href="/security-policy.html">Security policy <i class="fa-regular fa-arrow-right"></i></a>
        <a class="t-link" href="/concepts/document-settings.html">Document settings <i class="fa-regular fa-arrow-right"></i></a>
        <a class="t-link" href="https://github.com/QuestPDF/QuestPDF" target="_blank" rel="noopener">Source on GitHub <i class="fa-regular fa-arrow-right"></i></a>
      </div>
    </div>
  </section>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sentence-panel {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.sentence {
  max-width: 1100px;
  margin: 0;
  font-size: 1.875rem;
  line-height: 2.75rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--vp-c-text-2);
}

.sentence em {
  font-style: normal;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 32px;
  margin-top: 32px;
  font-size: 1rem;
}

.links i {
  font-size: 0.75rem;
}

@media screen and (max-width: 768px) {
  .sentence { font-size: 1.375rem; line-height: 2rem; }
}

</style>
