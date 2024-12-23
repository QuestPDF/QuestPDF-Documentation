<script setup lang="ts">

const terms = [
    {
      icon: "/license/license-terms.svg",
      title: "Perpetual License",
      description: "Each license is perpetual / lifetime and comes with one year of free feature, quality and security updates. It is not a subscription."
    },
    {
      icon: "/license/license-renewal.svg",
      title: "Renewal",
      description: "For your convenience, the purchase starts an optional recurring payment that extends your access to updates and support. You can resign at any time, for any reason, at no cost."
    },
    {
        icon: "/license/deployment.svg",
        title: "Deployment",
        description: "Create unlimited closed-source projects and APIs. Deploy on unlimited number of servers. Include compiled library in your applications."
    },
    {
      icon: "/license/license-key.svg",
      title: "Software Activation",
      description: "We trust our users and clients. Therefore, the software does not require any license key. The license configuration is straightforward. <a href='/license/configuration.html' target='_blank'>Read more</a>"
    },
    {
        icon: "/license/money-back.svg",
        title: "Refund",
        description: "Before purchase, please evaluate the library using the Community license. We also offer a 30-day money-back guarantee period."
    },
    {
      icon: "/license/payment-details.svg",
      title: "Safe Transaction",
      description: "We collaborate with Paddle, our Merchant of Record, to ensure compliance with tax regulations and payment security. The Paddle company details will be additionally visible on the invoice/payment. <a href='https://www.paddle.com/about/procurement' target='_blank'>Paddle details</a>"
    }
];

</script>

<template>
  <article class="content">
    <h2>Simplicity Meets Value</h2>

    <div class="terms">

      <article class="term" v-for="term of terms" :key="term.title">
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
  grid-gap: 96px;

  margin-top: 64px;
}

@media screen and (max-width: 700px) {
  .terms {
    grid-template-columns: 1fr;
    grid-gap: 64px;
  }
}

.term {
  display: grid;
  grid-template-areas:
      "icon title"
      "icon description";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 8px 24px;
}

@media screen and (max-width: 1000px) {
  .term {
    grid-template-areas:
      "icon"
      "title"
      "description";
    grid-template-columns: auto;
    grid-template-rows: auto auto auto;
    grid-gap: 12px 0;
  }
}

.term img.icon {
  grid-area: icon;

  justify-self: start;
  align-self: start;
  height: 48px;
  width: 48px;
}

.term h3.title {
  grid-area: title;

  margin: 0;
}

.term p.description {
  grid-area: description;

  justify-self: start;
  align-self: start;
}

</style>