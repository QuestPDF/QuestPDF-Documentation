<script setup>
/* A lab-only copy of the cards under the header in LicensePurchaseSuccess.vue (copy, icons and styles as
   they are today), so every header direction sits above the same page. `clip` shows only the top of the
   cards, faded out, which is what a buyer sees on the first screen. */
defineProps({ clip: { type: Boolean, default: false } });

const licenseDetails = [
  { icon: 'fa-award-simple', title: "Perpetual license", description: "Your perpetual license never expires. This purchase includes one year of feature, quality and security updates, along with one year of dedicated support." },
  { icon: 'fa-bolt', title: "Ready to use", description: "Your organization is now licensed to use QuestPDF in production. No license keys, activation servers, or compliance tracking are required. Your team can start immediately - licensing never blocks builds or deployments." },
  { icon: 'fa-code', title: "License configuration", description: "Please share <a href=\"/license/configuration.html\"><u>the license setup guide</u></a> with your software development team. Configuration takes only a few minutes and requires changing a single line of code." }
];

const orderDetails = [
  { icon: 'fa-receipt', title: "Purchase confirmation", description: "All purchase details, invoices, and receipts will be delivered to your email by Paddle, our Merchant of Record." },
  { icon: 'fa-calendar-day', title: "Updates & support auto-renewal", description: "Renewal extends access to software updates and support for another year. If renewal is canceled, your team keeps the right to use the version already licensed. We will send a renewal reminder 30 days before the renewal date." },
  { icon: 'fa-credit-card', title: "Invoice and billing", description: "You can update your account details and payment information, manage or cancel the license auto-renewal process as well as access payment history on the Paddle Customer Portal." }
];
</script>

<template>
  <div class="purchase-cards" :class="{ clipped: clip }">
    <section class="panel success-card">
      <h3 class="card-title">License information</h3>
      <div class="description-items">
        <div v-for="step in licenseDetails" :key="step.title" class="description-item">
          <div class="icon-tile"><i class="fa-regular" :class="step.icon" /></div>
          <div class="description-item-content">
            <strong class="row-title">{{ step.title }}</strong>
            <span class="row-description" v-html="step.description" />
          </div>
        </div>
      </div>
      <a class="action primary" href="#">Forward to Development Team</a>
    </section>

    <section class="panel success-card">
      <h3 class="card-title">Billing and renewal</h3>
      <div class="description-items">
        <div v-for="step in orderDetails" :key="step.title" class="description-item">
          <div class="icon-tile"><i class="fa-regular" :class="step.icon" /></div>
          <div class="description-item-content">
            <strong class="row-title">{{ step.title }}</strong>
            <span class="row-description" v-html="step.description" />
          </div>
        </div>
      </div>
      <a class="action" href="#">Open Customer Portal</a>
    </section>

    <template v-if="!clip">
      <div class="divider dotted-divider" aria-hidden="true"></div>
      <section class="panel assistance-card">
        <div>
          <h3 class="card-title">Do you need assistance?</h3>
          <p class="card-description">If you have any questions about your license, setup, or billing, please reach out. We typically respond within one business day.</p>
        </div>
        <a class="action" href="#">Contact Support</a>
      </section>
    </template>
  </div>
</template>

<style scoped>

/* the first screen only: the cards' top 260px, fading into the canvas */
.purchase-cards.clipped {
  max-height: 260px;
  overflow: hidden;
  mask-image: linear-gradient(#000 55%, transparent);
  -webkit-mask-image: linear-gradient(#000 55%, transparent);
}

.icon-tile {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: var(--home-surface-inner);
}

.icon-tile i {
  font-size: 1.25rem;
  color: var(--vp-c-text-1);
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

.success-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

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

.success-card a.action {
  margin-top: auto;
  padding-top: 12px;
  align-self: flex-end;
}

.success-card .description-items {
  margin-bottom: 24px;
}

.divider {
  grid-column: 1 / -1;
  margin: 16px 0;
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
