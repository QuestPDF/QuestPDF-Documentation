<template>
  <section class="custom-page document-page legal-page texture-dots">
    <div class="content">
      <header class="section-header document-header">
        <a class="document-back" href="/license">
          <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
          View all licensing documents
        </a>

        <h1>{{ doc.title }}</h1>
      </header>

      <div class="panel document-card">
        <dl v-if="doc.meta.length" class="document-meta">
          <div v-for="item in doc.meta" :key="item.label">
            <dt>{{ item.label }}:</dt>
            <dd>{{ item.value }}</dd>
          </div>
        </dl>

        <article class="document-body vp-doc" v-html="doc.html"></article>

        <footer class="links">
          <a class="action" href="/license">
            View all licensing documents
          </a>

          <a class="action primary" href="/license/QuestPDF%20License%20Terms.pdf" download>
            Download (PDF)
          </a>
        </footer>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { data } from "./licenseDocuments.data";

const props = defineProps<{ id: string }>();

const doc = data[props.id];
</script>

<style>

.document-page .content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  max-width: calc(820px + 2 * var(--custom-page-gutter));
}

.document-page .document-header h1 {
  margin-bottom: 0;
}

.document-page .document-back {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
  font-weight: 500;
  white-space: nowrap;
  color: var(--vp-c-brand-1);
  transition: color 0.2s ease;
}

.document-page .document-back i {
  font-size: 1rem;
}

.document-page .document-back:hover {
  color: var(--vp-c-brand-2);
}

.document-page .document-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.document-page .document-meta div {
  display: flex;
  gap: 8px;
}

.document-page .document-meta dt {
  color: var(--vp-c-text-2);
}

.document-page .document-meta dd {
  font-weight: 600;
  color: var(--vp-c-text-1);
}


.document-page .document-card {
  width: 100%;
  padding: 48px 56px;
}

@media screen and (max-width: 700px) {
  .document-page .document-card {
    padding: 32px 24px;
  }

  .document-page .links .action {
    flex-grow: 1;
  }
}

/* prefixed with .document-page to outrank VitePress's `.vp-doc h2` and its offset for `.vp-doc [id]` */
.document-page .document-body h2 {
  margin: 40px 0 16px;
  padding-top: 40px;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: 0;
  scroll-margin-top: calc(var(--vp-nav-height) + 16px);
}

.document-page .document-body > h2:first-child {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
  scroll-margin-top: calc(var(--vp-nav-height) + 57px);
}

.document-page .links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 64px;
}


/* inside the text, which also takes VitePress's .vp-doc styles: unprefixed, so they do not outrank them */

.document-body * {
  color: var(--vp-c-text-2);
}

.document-body > :first-child {
  margin-top: 0;
}

.document-body > :last-child {
  margin-bottom: 0;
}

.document-body strong {
  color: var(--vp-c-text-1);
}

</style>
