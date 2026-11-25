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

      <section class="panel ringed plain-language">
        <h2 class="card-title">Looking for licensing information?</h2>
        <p class="card-description">Legal documents are written to be precise, not easy to read. Our Pricing page and FAQ explain license eligibility, usage rights, and commercial terms in plain language.</p>

        <div class="actions">
          <a class="action primary" href="/pricing.html">Compare licenses</a>
          <a class="action" href="/pricing.html#faq">Read the FAQ</a>
        </div>
      </section>

      <nav class="panel documents" aria-label="Legal documents">
        <div v-for="(documents, index) in groups" :key="index" class="document-group">
          <a v-for="document in documents" :key="document.title" :href="document.link" class="document-link">
            <Icon class="document-icon" :icon="document.icon" />
            <span>{{ document.title }}</span>
            <Icon class="arrow" :icon="faArrowRight" />
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
  --dots-clear: 810px; /* the 600px cards and about 100px of air on each side */
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
  max-width: 600px;
}


/* Plain-language card: with the ring's 2px border the inset stays 40px */

.plain-language {
  padding: 38px;
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


/* Documents: the rows sit 8px inside the card, with corners that follow the card's */

.documents {
  margin-top: 40px;
  padding: 8px;
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
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-radius: 24px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.document-link:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

/* a 20px glyph in a 24px slot */
.document-icon {
  flex-shrink: 0;
  margin-inline: 2px;
  font-size: 1.25rem;
}

.arrow {
  flex-shrink: 0;
  margin-left: auto;
  margin-right: 4px;
  color: var(--vp-c-text-3);
}

/* a tap leaves :hover stuck on touch screens, which would keep the row filled */
@media (hover: hover) {
  .document-link:hover {
    background-color: var(--surface-hover);
  }

  .document-link:hover .arrow {
    color: var(--vp-c-text-1);
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

  .document-link {
    padding-inline: 12px;
  }
}

/* narrow phones: without the arrow the longest title fits on one line */
@media screen and (max-width: 420px) {
  .arrow {
    display: none;
  }
}
</style>
