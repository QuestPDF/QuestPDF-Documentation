<template>
  <section class="custom-page document-page legal-page texture-dots">
    <div class="content">
      <header class="section-header document-header">
        <h1>{{ doc.title }}</h1>

        <div class="document-meta-row">
          <a class="document-back" href="/license">
            <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
            View all licensing documents
          </a>

          <dl v-if="doc.meta.length" class="document-meta">
            <div v-for="item in doc.meta" :key="item.label">
              <dt>{{ item.label }}</dt>
              <dd>{{ item.value }}</dd>
            </div>
          </dl>
        </div>
      </header>

      <article class="panel document-body vp-doc" v-html="doc.html"></article>

      <div class="links">
        <a class="action" href="/license">
          View all licensing documents
        </a>

        <a class="action primary" href="/license/QuestPDF%20License%20Terms.pdf" download>
          Download (PDF)
        </a>
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

.document-page .document-meta-row,
.document-page .document-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px 56px;
}

.document-page .document-meta-row {
  margin-top: 28px;
}

.document-page .document-back {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  white-space: nowrap;
  color: light-dark(#5B6B82, #9AA8BE);
  transition: color 0.2s ease;
}

.document-page .document-back i {
  font-size: 1rem;
}

.document-page .document-back:hover {
  color: var(--vp-c-brand-1);
}

/* slate, not VitePress's neutral greys, which read muddy (light) or warm (dark) on the blue canvas */
.document-page .document-meta dt {
  margin-bottom: 6px;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: light-dark(#5B6B82, #8796AE);
}

.document-page .document-meta dd {
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: light-dark(#0F172A, #E6ECF4);
}


.document-page .document-body {
  width: 100%;
  padding: 48px 56px;
}

@media screen and (max-width: 700px) {
  .document-page .document-body {
    padding: 32px 24px;
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
