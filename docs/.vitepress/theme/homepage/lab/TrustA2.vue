<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Trust</div>
      <h2>The questions your reviewers will ask</h2>
      <p class="sub-header">Short answers for the security review, the compliance audit and the developer. Each one links to where it can be checked.</p>
    </div>

    <!-- direction A with the answers cut to one sentence and a proof link closing every cell -->
    <div class="panel questions">
      <article v-for="item of questions" :key="item.question" class="question">
        <div class="t-eyebrow">{{ item.who }}</div>
        <h3 class="question-text">{{ item.question }}</h3>
        <p class="answer"><strong>{{ item.verdict }}</strong> {{ item.answer }}</p>
        <a class="proof t-link" :href="item.href">{{ item.link }} <i class="fa-regular fa-arrow-right"></i></a>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const questions = [
  {
    who: "Security asks",
    question: "Does any data leave our infrastructure?",
    verdict: "No.",
    answer: "No network calls, no telemetry, no license server. It runs offline and air-gapped.",
    link: "Security policy", href: "/security-policy.html"
  },
  {
    who: "Security asks",
    question: "Can we audit the code and the native binaries?",
    verdict: "Yes.",
    answer: "Full source on GitHub. Skia and qpdf are built from source in our CI.",
    link: "Repository", href: "https://github.com/QuestPDF/QuestPDF"
  },
  {
    who: "Compliance asks",
    question: "Will the PDFs pass an archival audit?",
    verdict: "Yes.",
    answer: "PDF/A-2 and PDF/A-3 (ISO 19005) at levels b, u and a, validated with veraPDF on every build.",
    link: "Document settings", href: "/concepts/document-settings.html"
  },
  {
    who: "Compliance asks",
    question: "Are the documents accessible?",
    verdict: "Yes.",
    answer: "PDF/UA-1 (ISO 14289): tagged structure, reading order and alternative text.",
    link: "Accessibility", href: "/concepts/accessibility.html"
  },
  {
    who: "Finance asks",
    question: "Can we issue electronic invoices?",
    verdict: "Yes.",
    answer: "ZUGFeRD and Factur-X (EN 16931), the invoice XML embedded in PDF/A-3, validated with Mustang.",
    link: "ZUGFeRD example", href: "/examples/zugferd.html"
  },
  {
    who: "Engineering asks",
    question: "Will it keep up with our volume?",
    verdict: "Yes.",
    answer: "Thousands of pages per second on one server, with low CPU and memory.",
    link: "Features overview", href: "/features-overview.html"
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
  padding: 32px 36px;
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
  flex-grow: 1;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.answer strong {
  color: var(--vp-c-text-1);
}

.proof {
  font-size: 0.9375rem;
}

.proof i {
  font-size: 0.75rem;
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
