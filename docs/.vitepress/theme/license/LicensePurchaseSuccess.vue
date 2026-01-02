<script setup>
import { computed } from 'vue';

const shareEmailSubject = 'QuestPDF License Purchased – Configuration Guide';
const shareEmailBody = `Hi Team,

We have successfully purchased the QuestPDF license. You are now fully compliant to use the library in production.

Action Required:
Please update your application configuration. Setup is a single line of code, and no license keys are required.

Implementation Guide:
https://www.questpdf.com/license/configuration

Best regards,`;

const shareMailtoLink = computed(() => {
  const subject = encodeURIComponent(shareEmailSubject);
  const body = encodeURIComponent(shareEmailBody);
  return `mailto:?subject=${subject}&body=${body}`;
});

const licenseDetails = [
  {
    title: "Ready to use",
    description: "No license keys, activation servers, or compliance tracking. Your team can start immediately - licensing never blocks builds or deployments."
  },
  {
    title: "License configuration",
    description: "Please forward the configuration guide to your software developers. Setup takes minutes with a single line of code.",
  },
];

const orderDetails = [
  {
    title: "Purchase confirmation",
    description: "All purchase details, invoices, and receipts will be delivered to your email by Paddle, our Merchant of Record."
  },
  {
    title: "Annual renewal",
    description: "Your perpetual license includes one year of free feature, quality, performance and security updates and one year of dedicated support. It renews automatically each year.",
  },
  {
    title: "Invoice and billing",
    description: "You can update your account details and payment information, manage the license auto-renewal process as well as access payment history on our Customer Portal.",
  }
];

</script>

<template>
  <div class="custom-page">
    <div class="container reverse-background">
      <div class="content">
        <header class="section-header">
          <i class="fa-duotone fa-square-check success-icon"></i>
          <h1>Order completed</h1>
          <p class="sub-header">Thank you for purchasing the QuestPDF license</p>
        </header>

        <section class="success-card card">
          <h3>License information</h3>

          <div class="description-items">
            <div v-for="step in licenseDetails" :key="step.title" class="description-item">
              <i class="fa-duotone fa-square-check list-check-icon"></i>
              <div class="description-item-content">
                <strong>{{ step.title }}</strong>
                <span>{{ step.description }}</span>
                <a v-if="step.link" :href="step.link" class="step-link">
                  {{ step.linkText }}
                  <i class="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <a class="action primary" :href="shareMailtoLink">Share With Your Team</a>
        </section>

        <section class="success-card card">
          <h3>Payment management</h3>

          <div class="description-items">
            <div v-for="step in orderDetails" :key="step.title" class="description-item">
              <i class="fa-duotone fa-square-check list-check-icon"></i>
              <div class="description-item-content">
                <strong>{{ step.title }}</strong>
                <span>{{ step.description }}</span>
                <a v-if="step.link" :href="step.link" class="step-link">
                  {{ step.linkText }}
                  <i class="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <a class="action" href="https://customer-portal.paddle.com/cpl_01gmdq0qdr8madhdchknpb52we" target="_blank">Open Customer Portal</a>
        </section>

        <section class="success-card card">
          <h3>Do you need assistance?</h3>

          <p>
            If you have any questions, please contact us. We are happy to help you with any issues you may be facing.
          </p>

          <a class="action" href="mailto:contact@questpdf.com" target="_blank">Contact Support</a>
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
  gap: 48px;
}

.success-card {
  max-width: 650px;
  width: 100%;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.success-icon {
  font-size: 64px;
  color: #4CAF50;
}

header h1 {
  margin-top: 24px;
  margin-bottom: 12px;
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
  grid-template-columns: 24px 1fr;
  gap: 16px;
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