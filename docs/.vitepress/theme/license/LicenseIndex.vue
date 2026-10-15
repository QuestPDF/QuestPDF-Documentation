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
    title: "Security Policy",
    link: "/security-policy.html"
  },
  {
    title: "Privacy Policy",
    link: "/privacy-policy.html"
  }
];

</script>

<template>
  <!-- the canvas (body background) is shared with the document pages, see "Page canvas" in CustomPages.css -->
  <div class="custom-page legal-page">
    <div class="container texture-dots">
      <article class="content">
        <header class="section-header">
          <h1>QuestPDF Legal Terms</h1>
          <p class="sub-header">Review or download the official legal documents and licensing terms for QuestPDF. If you have questions or need assistance, our team is here to help.</p>
        </header>

        <nav class="panel documents" aria-label="Legal documents">
          <a v-for="document in documents" :key="document.title" :href="document.link" class="document-link">
            <span class="link-title">{{ document.title }}</span>
            <i class="fa-solid fa-arrow-right arrow"></i>
          </a>
        </nav>

        <a class="action primary" href="/license/QuestPDF%20License%20Terms.pdf" download>
          Download all documents (PDF)
        </a>
      </article>
    </div>
  </div>
</template>

<style scoped>
.section-header {
  max-width: 750px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  width: 100%;
}

/* the shared panel surface, its rows reaching the edges, like the pricing FAQ */
.documents {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 640px;
  padding: 0;
  overflow: hidden;
}

.document-link {
  display: flex;
  align-items: center;
  gap: 32px;

  padding: 18px 24px 18px 32px;
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
  background-color: color-mix(in srgb, #2196F3 5%, transparent);

  .link-title {
    color: #2196F3;
  }

  .arrow {
    color: #2196F3;
    transform: translateX(4px);
  }
}

@media screen and (max-width: 700px) {
  .document-link {
    padding: 18px 20px;
  }
}
</style>
