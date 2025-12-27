<script setup lang="ts">

const terms = [
  {
    icon: "/license/license-terms.svg",
    title: "Perpetual Ownership",
    description: "You own the version you buy forever. The license includes one full year of feature updates and security patches. Even if you don't renew, your production apps keep working."
  },
  {
    icon: "/license/license-renewal.svg",
    title: "Flexible Maintenance",
    description: "After the first year, an optional renewal provides continued access to the latest updates. You can cancel the recurring invoice at any time, for any reason, at no cost."
  },
  {
    icon: "/license/license-key.svg",
    title: "Frictionless Deployment",
    description: "No license keys, no activation servers, and no internet connection required at runtime. Our trust-based model ensures your CI/CD pipelines and offline environments never break."
  },
  {
    icon: "/license/deployment.svg",
    title: "Unlimited Scale",
    description: "Build unlimited closed-source projects and APIs. Deploy to as many servers, containers, or cloud instances as you need without per-server costs."
  },
  {
    icon: "/license/money-back.svg",
    title: "30-Day Guarantee",
    description: "We want you to be confident in your choice. If the library doesn't meet your technical requirements, we offer a full refund within 30 days of purchase."
  },
  {
    icon: "/license/payment-details.svg",
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


    <div class="terms">

      <article class="term reverse-background card" v-for="term of terms" :key="term.title">
        <img class="icon" :src="term.icon" alt="" />
        <h3 class="title">{{ term.title }}</h3>
        <p class="description" v-html="term.description" />
      </article>

    </div>
  </article>
</template>

<style scoped>

.terms {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;

  margin-top: 64px;
}

@media screen and (max-width: 700px) {
  .terms {
    grid-template-columns: 1fr;
    grid-gap: 64px;
  }
}

.term {
  display: flex;
  flex-direction: column;
}



@media screen and (max-width: 1000px) {
  .term {
    grid-gap: 12px 0;
  }
}

.term img.icon {
  justify-self: start;
  align-self: start;
  height: 48px;
  width: 48px;
}


.term p.description {
  grid-area: description;

  justify-self: start;
  align-self: start;
}

</style>