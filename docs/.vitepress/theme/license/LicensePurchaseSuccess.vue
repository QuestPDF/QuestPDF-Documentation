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
          <img src="/license/purchase-success.svg" class="success-icon" alt="" />
          <h1>Order completed</h1>
          <p class="sub-header">Thank you for purchasing the QuestPDF license</p>
        </header>

        <section class="success-card card">
          <h3>License information</h3>

          <ul class="next-steps">
            <li v-for="step in licenseDetails" :key="step.title">
              <div class="step-content">
                <strong>{{ step.title }}</strong>
                <span>{{ step.description }}</span>
                <a v-if="step.link" :href="step.link" class="step-link">
                  {{ step.linkText }}
                  <img src="/homepage/getting-started/arrow-right.svg" width="14" alt="" />
                </a>
              </div>
            </li>
          </ul>

          <a class="action primary" :href="shareMailtoLink" style="margin-top: 16px">Share with your team</a>
        </section>

        <section class="success-card card">
          <h3>Payment management</h3>

          <ul class="next-steps">
            <li v-for="step in orderDetails" :key="step.title">
              <div class="step-content">
                <strong>{{ step.title }}</strong>
                <span>{{ step.description }}</span>
                <a v-if="step.link" :href="step.link" class="step-link">
                  {{ step.linkText }}
                  <img src="/homepage/getting-started/arrow-right.svg" width="14" alt="" />
                </a>
              </div>
            </li>
          </ul>

          <a class="action" href="https://customer-portal.paddle.com/cpl_01gmdq0qdr8madhdchknpb52we" target="_blank" style="margin-top: 16px">Open Customer Portal</a>
        </section>

        <section class="success-card card">
          <h3>Do you need assistance?</h3>

          <p>
            If you have any questions, please contact us. We are happy to help you with any issues you may be facing.
          </p>

          <a class="action" href="mailto:contact@questpdf.com" target="_blank" style="margin-top: 16px">Contact support</a>
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

header img {
  width: 64px;
}

header h1 {
  margin-top: 24px;
  margin-bottom: 12px;
}

.card h3 {
  margin-top: 0;
}

.next-steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.next-steps li {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 16px;
  padding: 16px 0;
}

.next-steps li::before {
  content: "";
  width: 24px;
  height: 24px;
  background-image: url('/homepage/list-check.svg');
  background-size: contain;
  background-repeat: no-repeat;
  flex-shrink: 0;
  margin-top: 1px;
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.step-content strong {
  color: var(--vp-c-text-2);
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5;
}

.step-content span {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  font-size: 0.9375rem;
}

.step-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  color: var(--vp-c-brand-1);
  font-weight: 500;
  font-size: 0.875rem;
  transition: gap 0.2s ease;
}

.step-link:hover {
  color: var(--vp-c-brand-2);
  gap: 10px;
}

@media screen and (max-width: 500px) {
  .header {
    flex-direction: column;
    text-align: center;
  }

  .success-icon {
    width: 48px;
    height: 48px;
  }
}

</style>