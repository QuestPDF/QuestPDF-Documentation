<script setup>
import { computed } from 'vue';

const shareEmailSubject = 'QuestPDF License Purchased – Setup Instructions';
const shareEmailBody = `Hi Team,

We have purchased a QuestPDF commercial license, so our organization is now licensed to use the library in production.

Action Required:
Please update the application configuration accordingly. Setup takes only a few minutes, requires a single line of code, and does not involve any license keys or activation servers.

License Configuration Guide:
https://www.questpdf.com/license/configuration

Best`;

const shareMailtoLink = computed(() => {
  const subject = encodeURIComponent(shareEmailSubject);
  const body = encodeURIComponent(shareEmailBody);
  return `mailto:?subject=${subject}&body=${body}`;
});

const licenseDetails = [
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

const orderDetails = [
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

</script>

<template>
  <div class="custom-page">
    <div class="container reverse-background">
      <div class="content">
        <header class="section-header">
          <h1>
            <i class="fa-duotone fa-square-check"></i>
            Order completed
          </h1>
          <p class="sub-header">Thank you for choosing QuestPDF</p>
        </header>

        <div v-if="false" class="email-notification">
          <i class="fa fa-solid fa-envelope"></i>
          <span>
            <b>Please check your inbox.</b> We have sent a confirmation email with your license details, license confirmation PDF, and developer setup instructions.
          </span>
        </div>

        <section class="success-card card">
          <h3>License information</h3>

          <div class="description-items">
            <div v-for="step in licenseDetails" :key="step.title" class="description-item">
              <i class="fa-regular list-check-icon" :class="step.icon" />
              <div class="description-item-content">
                <strong>{{ step.title }}</strong>
                <span v-html="step.description" />
              </div>
            </div>
          </div>

          <a class="action primary" :href="shareMailtoLink">Forward to Development Team</a>
        </section>

        <section class="success-card card">
          <h3>Billing and renewal</h3>

          <div class="description-items">
            <div v-for="step in orderDetails" :key="step.title" class="description-item">
              <i class="fa-regular list-check-icon" :class="step.icon" />
              <div class="description-item-content">
                <strong>{{ step.title }}</strong>
                <span v-html="step.description" />
              </div>
            </div>
          </div>

          <a class="action" href="https://customer-portal.paddle.com/cpl_01gmdq0qdr8madhdchknpb52we" target="_blank">Open Customer Portal</a>
        </section>

        <section class="success-card card">
          <h3>Do you need assistance?</h3>

          <p>
            If you have any questions about your license, setup, or billing, please reach out. We typically respond within one business day.
          </p>

          <a class="action" href="mailto:contact@questpdf.com" target="_blank">Contact Support</a>
        </section>
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
  max-width: 800px;
  gap: 32px;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
}


header h1 {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;

  margin-bottom: 12px;
}

header h1 i.fa-square-check {
  font-size: 1.25em;
  color: inherit;
}


/* Email notification */

.email-notification .fa {
  font-size: 48px;
  color: #67B84D;
}

.email-notification {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 24px;

  border-radius: 12px;
  padding: 24px 32px;
  color: #1B5E20;
  background-color: #67B84D33;

  place-self: center;
  text-align: left;
}

html.dark .email-notification {
  color: #A5D6A7;
}


/* Cards with details */

.success-card .fa-regular {
  display: flex;
  height: min-content;
  place-content: center;

  background-color: #8882;
  color: #666;
  font-size: 24px;
  padding: 12px;
  border-radius: 8px;
}

html.dark .success-card .fa-regular {
  color: #AAA;
}

.card h3 {
  margin-top: 0;
}

.description-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.description-item  {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 24px;
  padding: 16px 0;
}

.description-item-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.description-item-content strong {
  color: var(--vp-c-text-2);
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5;
}

.description-item-content span {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  font-size: 0.9375rem;
}

a.action {
  margin-top: 24px;
  place-self: end;
}

</style>