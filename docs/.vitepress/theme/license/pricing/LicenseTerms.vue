<script setup lang="ts">

const terms = [
  {
    icon: "fa-duotone fa-infinity fa-swap-opacity",
    title: "Perpetual Ownership",
    description: "You own the version you buy forever. The license includes one full year of feature updates and security patches. Even if you don't renew, your production apps keep working."
  },
  {
    icon: "fa-duotone fa-rotate",
    title: "Flexible Maintenance",
    description: "After the first year, an optional renewal provides continued access to the latest updates. You can cancel the recurring invoice at any time, for any reason, at no cost."
  },
  {
    icon: "fa-duotone fa-rocket",
    title: "Frictionless Deployment",
    description: "No license keys, no activation servers, and no internet connection required at runtime. Our trust-based model ensures your CI/CD pipelines and offline environments never break."
  },
  {
    icon: "fa-duotone fa-server",
    title: "Unlimited Scale",
    description: "Build unlimited closed-source projects and APIs. Deploy to as many servers, containers, or cloud instances as you need without per-server costs."
  },
  {
    icon: "fa-duotone fa-money-bill-transfer",
    title: "30-Day Guarantee",
    description: "We want you to be confident in your choice. If the library doesn't meet your technical requirements, we offer a full refund within 30 days of purchase."
  },
  {
    icon: "fa-duotone fa-badge-check",
    title: "Secure Procurement",
    description: "Payments are processed securely via Paddle, our Merchant of Record. We ensure full tax compliance (VAT/Sales Tax) and provide enterprise-ready invoices."
  }
];

</script>

<template>
  <article class="content">
    <div class="section-header">
      <h2>Frictionless Commercial Terms</h2>
      <p class="sub-header">Enjoy perpetual ownership, zero-configuration deployment, and strict compliance standards designed for modern business.</p>
    </div>

    <div class="license-terms">
      <article class="license-term card" v-for="term of terms" :key="term.title">
        <i class="fa-2xl" :class="[term.icon]"></i>
        <h3 class="title">{{ term.title }}</h3>
        <p class="description" v-html="term.description" />
      </article>
    </div>
  </article>
</template>

<style scoped>

.license-terms {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;

  margin-top: 64px;
}

@media screen and (max-width: 700px) {
  .license-terms {
    grid-template-columns: 1fr;
    grid-gap: 64px;
  }
}

.license-term {
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 1000px) {
  .license-term {
    grid-gap: 12px 0;
  }
}

.license-term .icon {
  justify-self: start;
  align-self: start;
  font-size: 32px;
  background-color: #2196F322;
  border-radius: 12px;
  padding: 12px;
  color: #2196F3;
}

.license-term p.description {
  grid-area: description;

  justify-self: start;
  align-self: start;
}

</style>