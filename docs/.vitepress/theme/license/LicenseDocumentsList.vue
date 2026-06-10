<script setup lang="ts">
const documents = [
  {
    title: "Terms of Service",
    link: "/terms-of-service.html"
  },
  {
    title: "License Selection Guide",
    link: "/license/guide.html"
  },
  {
    title: "Community License",
    link: "/license/community.html"
  },
  {
    title: "Professional & Enterprise License",
    link: "/license/professional-enterprise.html"
  },
  {
    title: "Privacy Policy",
    link: "/privacy-policy.html"
  }
];

</script>

<template>
  <article class="content">
    <div class="section-header">
      <h2>Official Legal Terms</h2>
    </div>

    <div class="card">
      <a v-for="document in documents" :key="document.title" :href="document.link" class="document-link">
        <span class="link-title">{{ document.title }}</span>
        <i class="fa-solid fa-arrow-right arrow"></i>
      </a>
    </div>

    <a class="action download-button" href="/license/QuestPDF%20License%20Terms.pdf" download>
      Download all documents (PDF)
    </a>
  </article>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-self: center;

  width: 100%;
  max-width: 650px;
}

.card {
  background-color: var(--vp-c-bg) !important;
  padding: 0;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  overflow: hidden;
}

.document-link {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;

  padding: 16px 24px;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.2s ease;

  .link-title {
    color: var(--vp-c-text-1);
    font-weight: 500;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--vp-c-divider);
  }
}

.document-link .arrow {
  flex-shrink: 0;
  margin-left: auto;
  font-size: 1rem;
  color: var(--vp-c-text-3);
  transition: transform 0.2s ease, color 0.2s ease;
}

.document-link:hover {
  background-color: #2196F311;

  .arrow {
    color: #2196F3;
    transform: translateX(4px);
  }
}

</style>