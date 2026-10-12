<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Before you buy</div>
      <h2>The five questions, answered</h2>
    </div>

    <!-- an accordion of the questions that arrive before a purchase; the first is open so the section is never blank -->
    <div class="panel faq">
      <details v-for="(item, index) of items" :key="item.q" :open="index === 0">
        <summary>
          <span class="q">{{ item.q }}</span>
          <span class="chev"><i class="fa-regular fa-chevron-down"></i></span>
        </summary>
        <div class="a">
          <p>{{ item.a }}</p>
          <a class="t-link" :href="item.href">{{ item.link }} <i class="fa-regular fa-arrow-right"></i></a>
        </div>
      </details>
    </div>
  </section>
</template>

<script setup lang="ts">
const items = [
  {
    q: "Does QuestPDF send telemetry or call home?",
    a: "No. The library makes no network calls of any kind: no telemetry, no update checks, no data collection. Nothing about your documents or your environment leaves your infrastructure.",
    link: "Security policy", href: "/security-policy.html"
  },
  {
    q: "Do we need a license server or an internet connection?",
    a: "No. There is no license server and no online check. QuestPDF runs entirely inside your application process, which is why it works offline and in air-gapped environments.",
    link: "Security policy", href: "/security-policy.html"
  },
  {
    q: "Can our security team audit the code and the native binaries?",
    a: "Yes. The full source is on GitHub. The native dependencies, Skia for rendering and qpdf for document operations, are built from source in our CI and tracked against upstream security patches.",
    link: "Repository on GitHub", href: "https://github.com/QuestPDF/QuestPDF"
  },
  {
    q: "Which standards can it produce, and how do you know the output passes?",
    a: "PDF/A-2 and PDF/A-3 at levels b, u and a (ISO 19005), PDF/UA-1 (ISO 14289), and ZUGFeRD and Factur-X e-invoices (EN 16931). Each is one setting on the document. Every build is validated with veraPDF and Mustang.",
    link: "Document settings", href: "/concepts/document-settings.html"
  },
  {
    q: "Will it keep up with our volume?",
    a: "QuestPDF generates thousands of pages per second on a single server with low CPU and memory use, and scales across cores in parallel.",
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

.faq {
  width: 100%;
  max-width: 960px;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
}

details {
  border-top: 1px solid var(--vp-c-divider);
}

details:first-child {
  border-top: none;
}

summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 0;
  cursor: pointer;
  list-style: none;
}

summary::-webkit-details-marker {
  display: none;
}

.q {
  font-size: 1.125rem;
  line-height: 1.625rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.chev {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--home-surface-inner);
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  transition: transform 0.2s ease;
}

details[open] .chev {
  transform: rotate(180deg);
}

.a {
  padding: 0 0 24px;
  max-width: 760px;
}

.a p {
  margin: 0 0 8px;
  font-size: 1rem;
  line-height: 1.625rem;
  color: var(--vp-c-text-2);
}

.a .t-link i {
  font-size: 0.75rem;
}

details:first-child summary {
  padding-top: 0;
}

details:last-child .a {
  padding-bottom: 0;
}

</style>
