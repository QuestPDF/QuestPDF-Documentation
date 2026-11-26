<script setup lang="ts">
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faCheck, faHeart } from "@fortawesome/pro-solid-svg-icons";
import { faChevronDown, faClipboard } from "@fortawesome/pro-regular-svg-icons";
import {
  faArrowsRotate, faBadgeCheck, faBriefcase, faBug, faBuildingColumns, faCreditCard, faEnvelope, faFileArrowDown, faFileInvoiceDollar, faHandshake,
  faLifeRing, faLightbulb, faMessageDollar, faMoneyBills, faPenToSquare, faReply, faShieldExclamation
} from "@fortawesome/pro-light-svg-icons";
import Icon from "./Icon.vue";
import { onBeforeUnmount, ref } from "vue";
import { useDotWings } from "./dotWings";
import { resellers } from "./pricing/resellers";
import { contactEmail, invoiceMail, invoiceUpdateMail, plainMail, quoteMail, refundMail, supportMail } from "./contactMails";

interface Action {
  label: string;
  href: string;
}

interface Topic {
  icon: IconDefinition;
  label: string;
  paragraphs: string[];
  action: Action;
  secondAction?: Action;
}

const portal = "https://account.questpdf.com";
const issues = "https://github.com/QuestPDF/QuestPDF/issues";
const newBug = `${issues}/new?template=bug_report.md`;
const newFeature = `${issues}/new?template=feature_request.md`;
const paddleSupport = "https://paddle.net/";
const paddleProcurement = "https://www.paddle.com/about/procurement";

const external = (href: string) => (href.startsWith("http") ? "_blank" : undefined);

/* "SoftwareOne, Insight, SHI and QBS Software" */
const resellerNames = new Intl.ListFormat("en-GB", { type: "conjunction" }).format(resellers.map(reseller => reseller.name));

const openPortal = { label: "Open Customer Portal", href: portal };

/* what people come to do: buy, look after a license they have, use the library; each group has a label, and a divider
   separates the groups */
const topicGroups: { title: string; topics: Topic[] }[] = [
  {
    title: "Buying a license",
    topics: [
      {
        icon: faMessageDollar,
        label: "Get a quote",
        paragraphs: [
          "We will prepare a formal quote for a new license or a renewal within one business day, ready for your approval process."
        ],
        action: { label: "Request a Quote", href: quoteMail }
      },
      {
        icon: faFileInvoiceDollar,
        label: "Pay by invoice or purchase order",
        paragraphs: [
          "We will send the invoice by email within one business day, and no quote is needed first. If your company requires a purchase order, please have its number ready so that we can add it to the invoice."
        ],
        action: { label: "Request an Invoice", href: invoiceMail }
      },
      {
        icon: faHandshake,
        label: "Buy through a reseller",
        paragraphs: [
          `We work with ${resellerNames}, as well as any other reseller you prefer. Please ask your reseller to request a quote from us in your company's name, so that the license is issued to you.`
        ],
        action: { label: "Request a Quote", href: quoteMail }
      },
      {
        icon: faBriefcase,
        label: "For resellers: request a quote",
        paragraphs: [
          "We will prepare a formal quote within one business day. The license is issued to your client as the license end user, and no partner agreement or registration is required."
        ],
        action: { label: "Request a Quote", href: quoteMail }
      },
      {
        icon: faBadgeCheck,
        label: "Check which license you need",
        paragraphs: [
          "QuestPDF is free for most organisations with annual gross revenue under USD 1,000,000. Larger organisations need the Professional license for a single company, or the Enterprise license for a group of affiliated companies.",
          "The FAQ covers special cases such as client projects, freelancers and the public sector."
        ],
        action: { label: "Compare Tiers", href: "/pricing.html" },
        secondAction: { label: "Read the FAQ", href: "/pricing.html#faq" }
      },
      {
        icon: faBuildingColumns,
        label: "Get a W-9 or vendor details",
        paragraphs: [
          "Paddle is the seller named on your invoice, so the W-9, bank details and vendor forms come from Paddle. QuestPDF's own company details are at the bottom of this page."
        ],
        action: { label: "Paddle Vendor Details", href: paddleProcurement }
      }
    ]
  },
  {
    title: "Billing and renewals",
    topics: [
      {
        icon: faFileArrowDown,
        label: "Download an invoice or receipt",
        paragraphs: ["All your invoices and receipts are available in the Customer Portal, which is also linked from every purchase email."],
        action: openPortal
      },
      {
        icon: faCreditCard,
        label: "Update payment details",
        paragraphs: ["You can update your card and billing details for the next renewal in the Customer Portal."],
        action: openPortal
      },
      {
        icon: faArrowsRotate,
        label: "Manage or cancel the renewal",
        paragraphs: [
          "Licenses purchased on the website renew automatically every 12 months. You can cancel the renewal in the Customer Portal at any time, and you keep the right to use every version released during your paid term.",
          "Licenses purchased by invoice do not renew automatically, so please request a renewal quote when you need one."
        ],
        action: openPortal
      },
      {
        icon: faPenToSquare,
        label: "Add company details to an invoice",
        paragraphs: [
          "The View Invoice link in your receipt email lets you add your company name, address and VAT number, and download the updated invoice. If the link does not work, please write to us."
        ],
        action: { label: "Write to Us", href: invoiceUpdateMail }
      },
      {
        icon: faReply,
        label: "Request a refund",
        paragraphs: [
          "Paid licenses come with a 30-day money-back guarantee. Please write to us within 30 days of your purchase for a full refund, which also ends the license."
        ],
        action: { label: "Write to Us", href: refundMail }
      }
    ]
  },
  {
    title: "Using QuestPDF",
    topics: [
      {
        icon: faLifeRing,
        label: "Get technical help",
        paragraphs: [
          "Email support is included with every active paid license, and we respond Monday to Friday, Central European Time.",
          "If you use the Community License, please ask on GitHub Issues, where earlier answers are also searchable."
        ],
        action: { label: "Email Support", href: supportMail },
        secondAction: { label: "Open GitHub Issues", href: issues }
      },
      {
        icon: faBug,
        label: "Report a bug",
        paragraphs: [
          "We track bugs publicly on GitHub Issues, where you can follow the progress of each fix. Please search the existing issues first, as the problem may already be reported."
        ],
        action: { label: "Report a Bug", href: newBug },
        secondAction: { label: "Search Issues", href: issues }
      },
      {
        icon: faLightbulb,
        label: "Suggest a feature",
        paragraphs: [
          "We welcome feature ideas on GitHub Issues, where others can add their own use cases. Please check the Roadmap first, as the feature may already be planned."
        ],
        action: { label: "Suggest a Feature", href: newFeature },
        secondAction: { label: "View the Roadmap", href: "/roadmap.html" }
      },
      {
        icon: faShieldExclamation,
        label: "Report a security vulnerability",
        paragraphs: [
          "Please report vulnerabilities through GitHub's private reporting form rather than a public issue. We will confirm receipt within a few business days and coordinate the disclosure with you."
        ],
        action: { label: "Report", href: "https://github.com/QuestPDF/QuestPDF/security/advisories/new" },
        secondAction: { label: "Check Security Policy", href: "/security-policy.html" }
      }
    ]
  }
];

const business = {
  name: "Marcin Ziąbek CodeFlint",
  address: ["Chrzanowska 29", "32-551 Mętków", "Poland"],
  vat: "PL6282275649"
};

const copied = ref(false);
let copiedTimer = 0;

async function copyAddress() {
  try {
    await navigator.clipboard.writeText(contactEmail);
  } catch {
    return;
  }

  copied.value = true;
  clearTimeout(copiedTimer);
  copiedTimer = window.setTimeout(() => (copied.value = false), 1600);
}

onBeforeUnmount(() => clearTimeout(copiedTimer));

const root = ref<HTMLElement>();
useDotWings(root);
</script>

<template>
  <div ref="root" class="custom-page contact-page texture-dots">
    <article class="content">
      <header class="section-header">
        <h1>How can we help?</h1>
      </header>

      <!-- one shared name: opening a topic closes the open one -->
      <div class="panel topics">
        <div v-for="group of topicGroups" :key="group.title" class="topic-group">
          <h2 class="group-title">{{ group.title }}</h2>

          <details v-for="topic of group.topics" :key="topic.label" class="topic" name="contact-topic">
            <summary class="topic-row">
              <Icon class="topic-icon" :icon="topic.icon" />
              <span>{{ topic.label }}</span>
              <Icon class="chevron" :icon="faChevronDown" />
            </summary>

            <div class="answer">
              <p v-for="paragraph of topic.paragraphs" :key="paragraph">{{ paragraph }}</p>
              <div class="actions">
                <a class="action primary" :href="topic.action.href" :target="external(topic.action.href)">{{ topic.action.label }}</a>
                <a v-if="topic.secondAction" class="action" :href="topic.secondAction.href" :target="external(topic.secondAction.href)">{{ topic.secondAction.label }}</a>
              </div>
            </div>
          </details>
        </div>
      </div>

      <section class="panel ringed side-card write">
        <div class="icon-tile">
          <Icon :icon="faEnvelope" />
        </div>

        <div>
          <h2 class="card-title">Something Else?</h2>
          <p class="card-description">Have a question about licensing, or just want to share feedback? Send us an email. We value your input and are always happy to help with non-technical inquiries or dedicated support.</p>

          <div class="actions">
            <a class="action primary" :href="plainMail">Email Us</a>
            <button type="button" class="action address" :class="{ copied }" :aria-label="`Copy ${contactEmail}`" title="Copy address" @click="copyAddress">
              {{ contactEmail }}
              <Icon :icon="copied ? faCheck : faClipboard" />
            </button>
          </div>
        </div>
      </section>

      <div class="dotted-divider"></div>

      <section class="panel side-card paddle">
        <div class="icon-tile">
          <Icon :icon="faMoneyBills" />
        </div>

        <div>
          <h2 class="card-title">Payments Are Handled by Paddle</h2>
          <p class="card-description">We collaborate with Paddle, our authorised reseller and Merchant of Record, to process payments securely and ensure worldwide tax compliance. Paddle issues your invoice, while the license comes from QuestPDF.</p>
          <div class="actions">
            <a class="action" :href="paddleProcurement" target="_blank">Paddle Vendor Details and W-9</a>
            <a class="action" :href="paddleSupport" target="_blank">Contact Paddle</a>
          </div>
        </div>
      </section>

      <section class="panel side-card company">
        <div class="icon-tile">
          <Icon class="love" :icon="faHeart" />
        </div>

        <div>
          <h2 class="card-title">Proudly Developed By</h2>
          <div class="company-details">
            <p class="card-description">{{ business.name }}</p>
            <p class="card-description"><span v-for="line of business.address" :key="line">{{ line }}</span></p>
            <p class="card-description">VAT {{ business.vat }}</p>
          </div>
        </div>
      </section>

      <span class="visually-hidden" aria-live="polite">{{ copied ? "Copied" : "" }}</span>
    </article>
  </div>
</template>

<style scoped>
.contact-page {
  --dots-height: 172px; /* the topics card */
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-header h1 {
  margin-bottom: 56px;
}

.topics,
.side-card,
.dotted-divider {
  width: 100%;
  max-width: 720px;
}

/* the card below adds its own margin; the page's class outranks the shared divider's `margin: 0`, whichever
   stylesheet loads first */
.contact-page .dotted-divider {
  margin-top: var(--section-gap);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}


/* Write to us: with the ring's 2px border the inset stays 40px; beside the button, the address is a second button
   that copies itself */

.write {
  padding: 38px;
}

.write .card-description {
  line-height: 1.875rem;
  text-wrap: pretty;
}

.write .actions {
  align-items: center;
  margin-top: 28px;
}

/* the shared secondary button, with the icon beside the address */
.address {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.address .icon {
  font-size: 1rem;
}

.address.copied .icon {
  color: light-dark(#2E7D32, #81C784);
}


/* Topics: the License page's rows, each opening in place; an open topic keeps its fill */

.topics {
  padding: 8px;
}

.topic-group {
  display: grid;
  gap: 2px;
}

/* the divider runs to the card's edges */
.topic-group + .topic-group {
  margin: 8px -8px 0;
  border-top: 1px solid var(--vp-c-divider);
  padding: 8px 8px 0;
}

/* in line with the rows' names (20px padding, the 24px icon and the 14px gap); capitals in the Pricing FAQ's category
   blue set it apart from the rows */
.group-title {
  margin: 0;
  padding: 22px 20px 10px 58px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 650;
  letter-spacing: 0.02em;
  word-spacing: 0.1em;
  text-transform: uppercase;
  color: light-dark(#1976D2, oklch(0.78 0.10 245));
}

.topic {
  border-radius: 24px;
}

.topic[open] {
  background-color: var(--surface-hover);
}

.topic-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-radius: 24px;
  list-style: none;
  font-weight: 500;
  color: var(--vp-c-text-1);
  cursor: pointer;
}

/* older Safari draws its disclosure triangle through this pseudo-element */
.topic-row::-webkit-details-marker {
  display: none;
}

.topic-row:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

/* a 24px slot at the glyphs' 20px height: in a square box the wide glyphs shrank to fit its width */
.topic-icon {
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.25rem;
}

.chevron {
  flex-shrink: 0;
  margin-left: auto;
  margin-right: 4px;
  font-size: 1rem;
  color: var(--vp-c-text-3);
}

.topic[open] .topic-row {
  font-weight: 600;
}

.topic[open] .chevron {
  color: var(--vp-c-text-1);
  transform: rotate(180deg);
}

/* a tap leaves :hover stuck on touch screens */
@media (hover: hover) {
  .topic:not([open]) .topic-row:hover {
    background-color: var(--surface-hover);
  }

  .topic-row:hover .chevron {
    color: var(--vp-c-text-1);
  }
}

/* the answer starts under the topic's name: 20px padding, the 24px icon and the 14px gap; the same inset on the right
   keeps it clear of the chevron */
.answer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 0 58px 24px;
}

/* the body grey is dim on the open topic's fill; the Pricing FAQ answers use the same mix */
.answer p {
  line-height: 1.75rem;
  color: color-mix(in srgb, var(--vp-c-text-1), var(--vp-c-text-2));
  text-wrap: pretty;
}

.answer .actions {
  margin-top: 12px;
}


/* The three cards under the list: an icon tile beside the text, as on the original contact cards */

.side-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-top: var(--section-gap);
}

/* the title's 32px line sits on the middle of the 48px tile */
.side-card > div:last-child {
  min-width: 0;
  padding-top: 8px;
}

.paddle .card-description {
  text-wrap: pretty;
}

.paddle .actions {
  margin-top: 28px;
}

.icon-tile .love {
  color: #F44336;
}

/* the name, the address and the VAT number: three groups in the cards' description size */
.company-details {
  display: grid;
  gap: 12px;
  margin-top: 20px;
}

/* the grid's gap spaces the groups */
.company-details .card-description {
  margin: 0;
}

.company-details span {
  display: block;
}

@media screen and (max-width: 700px) {
  .section-header h1 {
    margin-bottom: 48px;
  }

  /* with the ring, the same inset as the two cards below */
  .write {
    padding: 30px 22px;
  }

  .write .actions {
    flex-direction: column;
    align-items: stretch;
  }

  .topic-row {
    padding-inline: 12px;
  }

  .group-title {
    padding-inline: 50px 12px;
  }

  .answer {
    padding: 0 16px 20px;
  }
}

@media screen and (max-width: 520px) {
  .answer .actions {
    flex-direction: column;
    align-self: stretch;
  }

  .paddle .actions {
    flex-direction: column;
  }

  /* stretched, so the text column is as wide as the card's content, whatever is inside it */
  .side-card {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .side-card > div:last-child {
    padding-top: 0;
  }
}

/* the address fits a 320px screen */
@media screen and (max-width: 380px) {
  .address {
    gap: 8px;
    padding-inline: 8px;
  }
}
</style>
