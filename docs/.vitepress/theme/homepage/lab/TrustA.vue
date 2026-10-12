<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Trust</div>
      <h2>The questions your reviewers will ask</h2>
      <p class="sub-header">Short answers for the developer, the security review and the compliance audit. Every one of them can be checked.</p>
    </div>

    <!-- six cells divided by hairlines; each is a reader's question with the answer under it -->
    <div class="panel questions">
      <article v-for="item of questions" :key="item.question" class="question">
        <div class="t-eyebrow">{{ item.who }}</div>
        <h3 class="question-text">{{ item.question }}</h3>
        <p class="answer"><strong>{{ item.verdict }}</strong> {{ item.answer }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const questions = [
  {
    who: "Security asks",
    question: "Does any document data leave our infrastructure?",
    verdict: "No.",
    answer: "QuestPDF runs inside your application process. No network calls, no telemetry, no license server. It works offline and air-gapped."
  },
  {
    who: "Security asks",
    question: "Can our team audit the code?",
    verdict: "Yes.",
    answer: "The full source code is on GitHub. The native dependencies, Skia and qpdf, are built from source in our CI pipelines."
  },
  {
    who: "Compliance asks",
    question: "Will the PDFs pass an archival audit?",
    verdict: "Yes.",
    answer: "PDF/A-2 and PDF/A-3 (ISO 19005) at conformance levels b, u and a. Every build is validated with veraPDF."
  },
  {
    who: "Compliance asks",
    question: "Are the documents accessible?",
    verdict: "Yes.",
    answer: "PDF/UA-1 (ISO 14289): tagged structure, reading order and alternative text, so screen readers work as intended."
  },
  {
    who: "Finance asks",
    question: "Can we issue electronic invoices?",
    verdict: "Yes.",
    answer: "ZUGFeRD and Factur-X (EN 16931): the structured invoice XML embedded in a PDF/A-3 document, validated with Mustang."
  },
  {
    who: "Engineering asks",
    question: "Will it keep up with our volume?",
    verdict: "Yes.",
    answer: "Thousands of pages per second on a single server, with low CPU and memory. Right-to-left and bidirectional text included."
  }
];
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.questions {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;
  margin-top: 32px;
}

.question {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 36px 40px;
}

.question:nth-child(3n + 1) { padding-left: 0; }
.question:nth-child(3n) { padding-right: 0; }
.question:nth-child(-n + 3) { padding-top: 0; }
.question:nth-child(n + 4) { padding-bottom: 0; border-top: 1px solid var(--vp-c-divider); }
.question:not(:nth-child(3n + 1)) { border-left: 1px solid var(--vp-c-divider); }

.question-text {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.answer {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.answer strong {
  color: var(--vp-c-text-1);
}

@media screen and (max-width: 1100px) {
  .questions { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .question { padding: 28px 32px; }
  .question:nth-child(n) { border: none; }
  .question:nth-child(odd) { padding-left: 0; }
  .question:nth-child(even) { padding-right: 0; border-left: 1px solid var(--vp-c-divider); }
  .question:nth-child(-n + 2) { padding-top: 0; }
  .question:nth-child(n + 3) { border-top: 1px solid var(--vp-c-divider); }
  .question:nth-child(n + 5) { padding-bottom: 0; }
}

@media screen and (max-width: 700px) {
  .questions { grid-template-columns: minmax(0, 1fr); }
  .question:nth-child(n) { padding: 24px 0; border: none; border-top: 1px solid var(--vp-c-divider); }
  .question:first-child { padding-top: 0; border-top: none; }
  .question:last-child { padding-bottom: 0; }
}

</style>
