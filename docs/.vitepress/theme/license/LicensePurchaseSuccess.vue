<script setup lang="ts">
const shareEmailSubject = 'QuestPDF License Purchased – Setup Instructions';
const shareEmailBody = `Hi Team,

We have purchased a QuestPDF commercial license, so our organization is now licensed to use the library in production.

Action Required:
Please update the application configuration accordingly. Setup takes only a few minutes, requires a single line of code, and does not involve any license keys or activation servers.

License Configuration Guide:
https://configure.questpdf.com

Best`;

const shareMailtoLink = `mailto:?subject=${encodeURIComponent(shareEmailSubject)}&body=${encodeURIComponent(shareEmailBody)}`;

interface Card {
  title: string;
  items: { icon: string; title: string; description: string }[];
  action: { label: string; href: string; primary?: boolean; target?: string };
}

const cards: Card[] = [
  {
    title: "License information",
    items: [
      {
        icon: "fa-award-simple",
        title: "Perpetual license",
        description: "Your perpetual license never expires. This purchase includes one year of feature, quality and security updates, along with one year of dedicated support."
      },
      {
        icon: "fa-bolt",
        title: "Ready to use",
        description: "Your organization is now licensed to use QuestPDF in production. No license keys, activation servers, or compliance tracking are required. Your team can start immediately - licensing never blocks builds or deployments."
      },
      {
        icon: "fa-code",
        title: "License configuration",
        description: "Please share <a href=\"https://www.questpdf.com/license/configuration.html\"><u>the license setup guide</u></a> with your software development team. Configuration takes only a few minutes and requires changing a single line of code."
      }
    ],
    action: { label: "Forward to Development Team", href: shareMailtoLink, primary: true }
  },
  {
    title: "Billing and renewal",
    items: [
      {
        icon: "fa-receipt",
        title: "Purchase confirmation",
        description: "All purchase details, invoices, and receipts will be delivered to your email by Paddle, our Merchant of Record."
      },
      {
        icon: "fa-calendar-day",
        title: "Updates & support auto-renewal",
        description: "Renewal extends access to software updates and support for another year. If renewal is canceled, your team keeps the right to use the version already licensed. We will send a renewal reminder 30 days before the renewal date."
      },
      {
        icon: "fa-credit-card",
        title: "Invoice and billing",
        description: "You can update your account details and payment information, manage or cancel the license auto-renewal process as well as access payment history on the Paddle Customer Portal."
      }
    ],
    action: { label: "Open Customer Portal", href: "https://customer-portal.paddle.com/cpl_01gmdq0qdr8madhdchknpb52we", target: "_blank" }
  }
];

</script>

<template>
  <div class="custom-page purchase-page texture-dots">
    <div class="content">
      <header class="section-header purchase-header">
        <div class="status-tag">
          <i class="fa-solid fa-check" aria-hidden="true"></i>
          Order completed
        </div>

        <h1 class="purchase-title">Thank you! <b>Please check your inbox</b> <span>for your license confirmation and setup instructions.</span></h1>
      </header>

      <div class="purchase-cards">
        <section v-for="card in cards" :key="card.title" class="panel success-card">
          <h3 class="card-title">{{ card.title }}</h3>

          <div class="description-items">
            <div v-for="item in card.items" :key="item.title" class="description-item">
              <div class="icon-tile">
                <i class="fa-regular" :class="item.icon" aria-hidden="true" />
              </div>
              <div class="description-item-content">
                <strong class="row-title">{{ item.title }}</strong>
                <p class="row-description" v-html="item.description" />
              </div>
            </div>
          </div>

          <a class="action" :class="{ primary: card.action.primary }" :href="card.action.href" :target="card.action.target">{{ card.action.label }}</a>
        </section>

        <div class="dotted-divider"></div>

        <section class="panel assistance-card">
          <div>
            <h3 class="card-title">Do you need assistance?</h3>
            <p class="card-description">
              If you have any questions about your license, setup, or billing, please reach out. We typically respond within one business day.
            </p>
          </div>

          <a class="action" href="mailto:contact@questpdf.com">Contact Support</a>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}


.purchase-header {
  padding-bottom: 16px;
}

.purchase-title {
  margin: 0 0 8px;
  font-size: 1.5rem;
  line-height: 2.125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.purchase-title b {
  font-weight: 600;
  color: light-dark(#2E7D32, #A5D6A7);
}

.purchase-title span {
  font-weight: 400;
  color: var(--vp-c-text-2);
}

@media screen and (max-width: 700px) {
  .purchase-title {
    font-size: 1.25rem;
    line-height: 1.875rem;
  }
}

.status-tag {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 9px 24px;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  word-spacing: 2px;
  background-color: light-dark(#2E7D32, #A5D6A7);
  color: light-dark(#FFFFFF, #0D3B12);
}

.status-tag i {
  font-size: 18px;
}

.purchase-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
  width: 100%;
}

@media screen and (max-width: 960px) {
  .purchase-cards {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* a size container: its items adapt to the card's width */
.success-card {
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.description-items {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 8px 0 24px;
}

.description-item {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 20px;
  padding: 24px 0;
}

.description-item:not(:last-child) {
  border-bottom: 1px solid var(--vp-c-divider);
}

.description-item-content {
  display: flex;
  flex-direction: column;
}

.success-card a.action {
  margin-top: auto;
  align-self: flex-end;
}

.assistance-card {
  grid-column: 1 / -1;

  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 32px 48px;
  align-items: center;
}

.assistance-card p {
  max-width: 70ch;
}

@media screen and (max-width: 700px) {
  .assistance-card {
    grid-template-columns: minmax(0, 1fr);
  }

  .success-card a.action {
    align-self: stretch;
  }
}

@container (max-width: 360px) {
  .description-item {
    grid-template-areas:
        "icon title"
        "text text";
    align-items: center;
    column-gap: 16px;
    row-gap: 12px;
  }

  .description-item .icon-tile {
    grid-area: icon;
  }

  .description-item-content {
    display: contents;
  }

  .description-item .row-title {
    grid-area: title;
  }

  .description-item .row-description {
    grid-area: text;
    margin-top: 0;
  }
}

</style>
