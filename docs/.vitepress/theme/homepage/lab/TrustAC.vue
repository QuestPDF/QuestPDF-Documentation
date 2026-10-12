<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Foundations</div>
      <h2>Built for regulated, security-conscious teams</h2>
      <p class="sub-header">The question each reviewer asks, and the fact that answers it.</p>
    </div>

    <!-- C's two cards, with A's question above every headline: the question is small, the fact is the heading -->
    <div class="layout">
      <div v-for="card of cards" :key="card.eyebrow" class="card">
        <div class="t-eyebrow">{{ card.eyebrow }}</div>

        <div class="facts">
          <article v-for="fact of card.facts" :key="fact.title" class="fact">
            <div class="t-icon"><i class="fa-regular" :class="fact.icon"></i></div>
            <div class="fact-body">
              <div class="question">{{ fact.question }}</div>
              <h3 class="fact-title">{{ fact.title }}</h3>
              <p class="fact-text">{{ fact.text }}</p>
            </div>
          </article>
        </div>

        <a class="card-link t-link" :href="card.href">{{ card.link }} <i class="fa-regular fa-arrow-right"></i></a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const cards = [
  {
    eyebrow: "Inside your infrastructure",
    facts: [
      { icon: "fa-cloud-slash", question: "Does it phone home?", title: "Zero network calls.", text: "No telemetry, no license server. Runs offline and air-gapped." },
      { icon: "fa-code", question: "Can we audit it?", title: "Full source on GitHub.", text: "Skia and qpdf, the native dependencies, are built from source in CI." },
      { icon: "fa-gauge-high", question: "Will it keep up?", title: "Thousands of pages per second.", text: "Low CPU and memory on a single server." }
    ],
    link: "Security policy", href: "/security-policy.html"
  },
  {
    eyebrow: "Standards, verified on every build",
    facts: [
      { icon: "fa-box-archive", question: "Will it pass an archival audit?", title: "PDF/A-2 and PDF/A-3, levels b, u, a.", text: "ISO 19005, validated with veraPDF." },
      { icon: "fa-universal-access", question: "Is the output accessible?", title: "PDF/UA-1.", text: "ISO 14289, tagged for assistive technology." },
      { icon: "fa-file-invoice", question: "Can we issue e-invoices?", title: "ZUGFeRD and Factur-X.", text: "EN 16931, embedded in PDF/A-3, validated with Mustang." }
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

.card {
  align-items: stretch;
}

.facts {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 20px;
}

.fact {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 20px;
  padding: 20px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.question {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-3);
}

.fact-title {
  margin: 2px 0 4px;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
}

.fact-text {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.card-link {
  margin-top: 4px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9375rem;
}

.card-link i {
  font-size: 0.75rem;
}

@media screen and (max-width: 1000px) {
  .layout { grid-template-columns: minmax(0, 1fr); }
}

</style>
