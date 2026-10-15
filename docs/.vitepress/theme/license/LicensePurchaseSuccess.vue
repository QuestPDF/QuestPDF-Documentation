<script setup>
const shareEmailSubject = 'QuestPDF License Purchased – Setup Instructions';
const shareEmailBody = `Hi Team,

We have purchased a QuestPDF commercial license, so our organization is now licensed to use the library in production.

Action Required:
Please update the application configuration accordingly. Setup takes only a few minutes, requires a single line of code, and does not involve any license keys or activation servers.

License Configuration Guide:
https://www.questpdf.com/license/configuration

Best`;

const shareMailtoLink = `mailto:?subject=${encodeURIComponent(shareEmailSubject)}&body=${encodeURIComponent(shareEmailBody)}`;

const licenseItems = [
  {
    icon: 'fa-award-simple',
    title: "Perpetual license",
    description: "Your perpetual license never expires. This purchase includes one year of feature, quality and security updates, along with one year of dedicated support."
  },
  {
    icon: 'fa-bolt',
    title: "Ready to use",
    description: "Your organization is now licensed to use QuestPDF in production. No license keys, activation servers, or compliance tracking are required. Your team can start immediately - licensing never blocks builds or deployments."
  },
  {
    icon: 'fa-code',
    title: "License configuration",
    description: "Please share <a href=\"https://www.questpdf.com/license/configuration.html\"><u>the license setup guide</u></a> with your software development team. Configuration takes only a few minutes and requires changing a single line of code.",
  },
];

const billingItems = [
  {
    icon: 'fa-receipt',
    title: "Purchase confirmation",
    description: "All purchase details, invoices, and receipts will be delivered to your email by Paddle, our Merchant of Record."
  },
  {
    icon: 'fa-calendar-day',
    title: "Updates & support auto-renewal",
    description: "Renewal extends access to software updates and support for another year. If renewal is canceled, your team keeps the right to use the version already licensed. We will send a renewal reminder 30 days before the renewal date.",
  },
  {
    icon: 'fa-credit-card',
    title: "Invoice and billing",
    description: "You can update your account details and payment information, manage or cancel the license auto-renewal process as well as access payment history on the Paddle Customer Portal.",
  }
];

/* the two detail cards, each a fact list with its button at the foot */
const cards = [
  {
    title: "License information",
    items: licenseItems,
    action: { label: "Forward to Development Team", href: shareMailtoLink, primary: true }
  },
  {
    title: "Billing and renewal",
    items: billingItems,
    action: { label: "Open Customer Portal", href: "https://customer-portal.paddle.com/cpl_01gmdq0qdr8madhdchknpb52we", target: "_blank" }
  }
];

</script>

<template>
  <div class="custom-page purchase-page">
    <div class="container texture-dots">
      <div class="content">
        <header class="section-header purchase-header">
          <div class="section-tag status-tag">
            <i class="fa-solid fa-check"></i>
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
                  <i class="fa-regular" :class="item.icon" />
                </div>
                <div class="description-item-content">
                  <strong class="row-title">{{ item.title }}</strong>
                  <span class="row-description" v-html="item.description" />
                </div>
              </div>
            </div>

            <a class="action" :class="{ primary: card.action.primary }" :href="card.action.href" :target="card.action.target">{{ card.action.label }}</a>
          </section>

          <!-- the same dotted seam as on the contact page: the license and billing facts above it,
               the assistance note below -->
          <div class="dotted-divider" aria-hidden="true"></div>

          <!-- full width, so the short assistance note does not sit alone in a half-empty row -->
          <section class="panel assistance-card">
            <div>
              <h3 class="card-title">Do you need assistance?</h3>
              <p class="card-description">
                If you have any questions about your license, setup, or billing, please reach out. We typically respond within one business day.
              </p>
            </div>

            <a class="action" href="mailto:contact@questpdf.com" target="_blank">Contact Support</a>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

/* Page */

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}


/* Header: the order state as a solid green tag with a check, then one line at lead size instead of a
   display title: the thanks, the inbox note in green and what the email holds, so the cards carry
   the page. The shared 650px header width breaks the line into two balanced lines, after "for your". */

.purchase-header {
  padding-bottom: 16px; /* a little more air above the cards than the page's 32px gap */
}

/* still the page's h1, set at the size of a lead */
.purchase-title {
  margin: 0 0 8px;
  font-size: 1.5rem;
  line-height: 2.125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-wrap: balance;
}

.purchase-title b {
  font-weight: 600;
  color: #2E7D32;
}

html.dark .purchase-title b {
  color: #A5D6A7;
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

/* a step up from the shared section tag: here it is the page's status, not a section label. Solid,
   tuned per mode: deep green with white text (5.1:1) in light mode; in dark mode the inbox phrase's own
   light green with near-black green text (7.7:1), so the fill stays bright on the dark page */
.status-tag {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 9px 24px;
  border-radius: 14px;
  font-size: 1rem;
  background-color: #2E7D32;
  color: #FFFFFF;
}

html.dark .status-tag {
  background-color: #A5D6A7;
  color: #0D3B12;
}

.status-tag i {
  font-size: 18px;
}

/* Cards: the two detail cards side by side, the assistance note across the full width below */

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

.success-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* fact list: an icon tile, a bold name and a description, rows divided by hairlines */
.description-items {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 8px;
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

.description-item-content :deep(a) {
  color: var(--vp-c-brand-1);
}

/* buttons sit at the bottom, so they line up across the two cards */
.success-card a.action {
  margin-top: auto;
  align-self: flex-end;
}

.success-card .description-items {
  margin-bottom: 24px;
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

</style>
