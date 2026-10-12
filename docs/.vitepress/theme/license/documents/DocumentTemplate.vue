<template>
  <section class="custom-page document-page legal-page textured-page">
    <div class="container texture-dots">
      <div class="content">
        <header class="section-header document-header">
          <div class="section-tag">{{ tag }}</div>
          <h1>{{ doc.title }}</h1>

          <!-- effective date and version, taken from the top of the markdown source -->
          <dl v-if="doc.meta.length" class="document-meta">
            <div v-for="item in doc.meta" :key="item.label">
              <dt>{{ item.label }}</dt>
              <dd>{{ item.value }}</dd>
            </div>
          </dl>
        </header>

        <!-- the legal text sits on one lifted surface; sections inside are divided by hairlines -->
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
    </div>
  </section>
</template>

<script setup>
import { data } from "./licenseDocuments.data.ts";

const props = defineProps({
  id: { type: String, required: true }
});

const doc = data[props.id];

// eyebrow above the title, by document kind
const tags = {
  "license-community": "License",
  "license-professional": "License",
  "license-selection-guide": "Licensing",
  "terms-of-service": "Terms",
  "privacy-policy": "Policy",
  "security-policy": "Policy"
};

const tag = tags[props.id] ?? "Legal";
</script>

<style lang="scss">

/* Layout: header, text surface and the two links in one centred column, the same width as the FAQ */

.document-page .content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  max-width: 880px;
}

.document-page .document-header h1 {
  margin-bottom: 0;
}

/* labelled facts, like the company details on the contact page */
.document-page .document-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px 56px;
  margin: 28px 0 0;
}

.document-page .document-meta dt {
  margin-bottom: 4px;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.document-page .document-meta dd {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}


/* Document text */

.document-page .document-body {
  width: 100%;
  padding: 48px 56px;
}

@media screen and (max-width: 700px) {
  .document-page .document-body {
    padding: 32px 24px;
  }
}

.document-body * {
  color: var(--vp-c-text-2);
}

/* sections are divided by a hairline; the first one starts at the top of the surface */
.document-body h2 {
  margin: 40px 0 16px;
  padding-top: 40px;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: 0;
}

.document-body > h2:first-child {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
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

.document-body a {
  color: var(--vp-c-brand-1);
}

.document-page .links {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px 16px;
  flex-wrap: wrap;
}

</style>
