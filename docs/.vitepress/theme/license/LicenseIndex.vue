<script setup lang="ts">
import { faArrowDownToLine, faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import {
  faBuildings, faCompass, faHandshake, faLock, faShieldCheck, faUserGroup
} from "@fortawesome/pro-light-svg-icons";
import Icon from "../Icon.vue";
import { ref } from "vue";
import { useDotWings } from "../dotWings";

/* the licenses, then the terms and policies; a divider separates the two groups */
const groups = [
  [
    { icon: faCompass, title: "License Selection Guide", link: "/license/guide.html" },
    { icon: faUserGroup, title: "Community License", link: "/license/community.html" },
    { icon: faBuildings, title: "Professional & Enterprise License", link: "/license/professional-enterprise.html" }
  ],
  [
    { icon: faHandshake, title: "Terms of Service", link: "/terms-of-service.html" },
    { icon: faShieldCheck, title: "Security Policy", link: "/security-policy.html" },
    { icon: faLock, title: "Privacy Policy", link: "/privacy-policy.html" }
  ]
];

const root = ref<HTMLElement>();
useDotWings(root);

</script>

<template>
  <div ref="root" class="custom-page legal-page texture-dots">
    <article class="content">
      <header class="section-header">
        <h1>QuestPDF Legal Terms</h1>
      </header>

      <section class="panel plain-language">
        <h2 class="card-title">We wrote a plain&#8209;language version</h2>
        <p class="card-description">Legal documents are written to be precise, not easy to read. The Pricing page and FAQ answer most questions.</p>

        <div class="actions">
          <a class="action primary" href="/pricing.html">View Pricing</a>
          <a class="action" href="/pricing.html#faq">Read the FAQ</a>
        </div>
      </section>

      <nav class="panel inset-rows documents" aria-label="Legal documents">
        <div v-for="(documents, index) in groups" :key="index" class="document-group">
          <a v-for="document in documents" :key="document.title" :href="document.link" class="inset-row document-link">
            <Icon class="document-icon" :icon="document.icon" />
            <span>{{ document.title }}</span>
            <Icon class="row-mark arrow" :icon="faArrowRight" />
          </a>
        </div>
      </nav>

      <a class="download" href="/license/QuestPDF%20License%20Terms.pdf" download>
        <Icon :icon="faArrowDownToLine" />
        Download all documents (PDF)
      </a>
    </article>
  </div>
</template>

<style scoped>
.legal-page {
  --dots-clear: 760px; /* the 550px cards and about 100px of air on each side */
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-header h1 {
  margin-bottom: 56px;
}

.plain-language,
.documents {
  width: 100%;
  max-width: 550px;
}


/* Plain-language card: the ring of the Professional tier (PricingTiers.vue); with its 2px the inset stays 40px */

.plain-language {
  padding: 38px;
  border: 2px solid light-dark(#2196F3, #3D8BD4);
  box-shadow:
      var(--surface-edge),
      0 0 0 6px color-mix(in srgb, #2196F3 10%, transparent),
      0 24px 48px -24px color-mix(in srgb, #2196F3 35%, transparent);
}

html.dark .plain-language {
  background-color: color-mix(in srgb, #2196F3 3%, var(--surface));
  box-shadow: 0 24px 48px -24px color-mix(in srgb, #3D8BD4 22%, transparent);
}

/* the glass rim sits inside the 2px border, so its corners are 2px tighter than the card's */
.plain-language::before {
  border-radius: 30px;
}

.plain-language .card-title {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
}

.plain-language .card-description {
  margin-top: 16px;
  text-wrap: pretty;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}


/* Documents */

.documents {
  margin-top: 40px;
}

.document-group {
  display: grid;
  gap: 2px;
}

/* the divider runs to the card's edges, as in the navbar's Documentation menu */
.document-group + .document-group {
  margin: 8px -8px 0;
  border-top: 1px solid var(--vp-c-divider);
  padding: 8px 8px 0;
}

.document-link {
  gap: 14px;
}

/* a 20px glyph in a 24px slot */
.document-icon {
  flex-shrink: 0;
  margin-inline: 2px;
  font-size: 1.25rem;
}

.arrow {
  margin-left: auto;
}

@media (hover: hover) {
  .document-link:hover .arrow {
    transform: translateX(4px);
  }
}


/* Download: 24px under the list; the padding makes the link a 44px touch target */

.download {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
  padding: 10px 12px;
  border-radius: 10px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.download:hover {
  color: var(--vp-c-text-1);
}

@media screen and (max-width: 700px) {
  .section-header h1 {
    margin-bottom: 48px;
  }

  /* the text starts 20px from the card's edge, like the list's rows */
  .plain-language {
    padding: 26px 18px 22px;
  }

  .actions {
    flex-direction: column;
    margin-top: 24px;
  }
}

/* narrow phones: without the arrow the longest title fits on one line */
@media screen and (max-width: 420px) {
  .arrow {
    display: none;
  }
}
</style>
