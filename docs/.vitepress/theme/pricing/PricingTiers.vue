<template>
  <article class="content">
    <h2>Where Open-Source Meets Professionalism</h2>

    <p class="description" style="margin-bottom: 32px;"><span class="highlight-background">Important:</span> all library releases with versions up to 2022.12.X are still available under the MIT license, free even for commercial usage. The QuestPDF Professional or Enterprise License applies only to releases 2023.X and beyond.</p>


    <div class="pricing">
      <section class="pricing-tier">
        <header>
          <img class="icon" src="/pricing/community.svg" alt="" />

          <div>
            <h3>Community</h3>
            <p class="price">Free forever</p>
          </div>
        </header>

        <hr>
        <p class="applicability">Applicable only for companies and individuals with less than $1M USD annual gross revenue. <a href="#license">Read more</a></p>
        <hr>

        <p class="features">
          Free for commercial usage <br>
          Unlimited APIs <br>
          Unlimited client applications <br>
          Unlimited redistributions
        </p>

        <a class="action" href="/quick-start.html">Start learning</a>
      </section>

      <section class="pricing-tier">
        <header>
          <img class="icon" src="/pricing/professional.svg" alt="" />

          <div>
            <h3>Professional</h3>
            <p class="price">$500 USD per year</p>
            <p class="tax-information">+ local tax (if applicable)</p>
          </div>
        </header>

        <hr>
        <p class="applicability">Applicable for individuals and companies with at most 10 software developers</p>
        <hr>

        <p class="features">
          Covers commercial usage<br>
          Unlimited APIs<br>
          Unlimited client applications<br>
          Unlimited redistributions
        </p>

        <a class="action primary" @click="startCheckout(PaddleConfiguration.professionalLicenseId)">Purchase</a>
      </section>

      <section class="pricing-tier">
        <header>
          <img class="icon" src="/pricing/enterprise.svg" alt="" />

          <div>
            <h3>Enterprise</h3>
            <p class="price">$3000 USD per year</p>
            <p class="tax-information">+ local tax (if applicable)</p>
          </div>
        </header>

        <hr>
        <p class="applicability">Applicable for individuals and companies with any number of software developers</p>
        <hr>

        <p class="features">
          Covers commercial usage<br>
          Unlimited APIs<br>
          Unlimited client applications<br>
          Unlimited redistributions
        </p>

        <a class="action primary" @click="startCheckout(PaddleConfiguration.enterpriseLicenseId)">Purchase</a>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">

import { PaddleConfiguration } from "./PaddleConfiguration";
import { useData } from 'vitepress'

const { isDark } = useData()

function startCheckout(productId: number) {
  if (!PaddleConfiguration.isProduction)
    Paddle.Environment.set('sandbox');

  Paddle.Setup({
      vendor: PaddleConfiguration.vendorId
  });

  Paddle.Checkout.open({
    product: productId,
    displayModeTheme: isDark.value ? 'dark' : 'light'
  });
}

</script>

<style scoped>
.pricing {
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
  grid-gap: 48px;
}

.pricing-tier {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  border: 1px solid var(--vp-c-gutter);
  background-color: var(--vp-c-bg);
  border-radius: 24px;
  padding: 32px;
  transition: all 0.25s ease-in-out;
}

.pricing-tier:hover {
  transform: scale(1.075);
  box-shadow: 0 13px 27px -5px rgb(0 0 0 / 25%), 0 8px 16px -8px rgb(0 0 0 / 30%), 0 -6px 16px -6px rgb(0 0 0 / 3%);
}

.pricing-tier header {
  display: grid;
  grid-template-columns: 48px 1fr;
  grid-gap: 0 32px;
}

.pricing-tier header h3 {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.5rem;
  margin-top: 0;
  margin-bottom: 8px;
}

.pricing-tier .applicability {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

.pricing-tier hr {
  margin: 0 -32px;
  border: 0.5px solid var(--vp-c-gutter);
  width: calc(100% + 64px);
}

.pricing p.price {
  line-height: 1.5rem;
  font-size: 1.2rem;
}

.pricing p.tax-information {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.pricing p.features {
  color: var(--vp-c-text-2);
  line-height: 1.5rem;
  font-size: 1rem;
}

</style>