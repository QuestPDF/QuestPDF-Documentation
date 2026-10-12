<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">From the author</div>
      <h2>A note on trust</h2>
    </div>

    <!-- a signed note: first person, the three questions and their answers, the author's name underneath -->
    <div class="card note">
      <div class="note-text">
        <p>
          I get the same three questions before almost every purchase: does it send telemetry, does it need a
          license server, will it run air-gapped. <strong>No, no, and yes.</strong> QuestPDF is a library. It runs inside
          your process and never opens a network connection.
        </p>
        <p>
          The whole source is on GitHub, including how we build Skia and qpdf from source. Every build is validated
          with veraPDF and Mustang, so that the PDF/A, PDF/UA-1 and ZUGFeRD documents you generate pass your audit,
          not only ours.
        </p>
      </div>

      <div class="note-foot">
        <div class="signature">
          <div class="avatar">MZ</div>
          <div>
            <div class="sig-name">Marcin Ziabek</div>
            <div class="sig-role">Creator of QuestPDF</div>
          </div>
        </div>
        <div class="links">
          <a class="t-link" href="/security-policy.html">Security policy <i class="fa-regular fa-arrow-right"></i></a>
          <a class="t-link" href="https://github.com/QuestPDF/QuestPDF">Source code <i class="fa-regular fa-arrow-right"></i></a>
          <a class="t-link" href="/concepts/document-settings.html">Document settings <i class="fa-regular fa-arrow-right"></i></a>
        </div>
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

.note {
  width: 100%;
  max-width: 880px;
  margin-top: 32px;
  padding: 40px 48px;
}

.note-text p {
  margin: 0 0 20px;
  font-size: 1.25rem;
  line-height: 2rem;
  color: var(--vp-c-text-2);
}

.note-text strong {
  color: var(--vp-c-text-1);
}

.note-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px 32px;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
}

.signature {
  display: flex;
  align-items: center;
  gap: 14px;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #1E88E5, #0094F9);
}

.sig-name {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.sig-role {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  font-size: 0.9375rem;
}

.links i {
  font-size: 0.75rem;
}

@media screen and (max-width: 640px) {
  .note { padding: 28px 24px; }
  .note-text p { font-size: 1.125rem; line-height: 1.75rem; }
}

</style>
