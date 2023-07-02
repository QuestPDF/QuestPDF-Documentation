<template>
  <div class="custom-page">
    <div class="container" id="license">
      <article class="content">
        <h1>Available <span class="highlight-foreground">QuestPDF</span> Licenses</h1>
        <p class="description">Not sure which license to choose? Do you already know what license you need? Brilliant! Now, simply select your license and discover all the crucial information you'll need for the next steps. It is as simple as that!</p>
      </article>
    </div>

    <div class="container reverse-background" id="license">
      <article class="content">
        <div class="pricing">
          <template v-for="license of licenses">
            <a :href="getLicenseSummaryUrl(license)">
              <section class="pricing-tier">
                <header>
                  <img class="icon" :src="license.icon" alt="" />

                  <div v-if="license.price">
                    <h3>Professional</h3>
                    <p class="price">${{ license.price }} per year</p>
                    <p class="tax-information">+ local tax (if applicable)</p>
                  </div>

                  <div v-else>
                    <h3>Community</h3>
                    <p class="price">Free forever</p>
                  </div>
                </header>

                <hr>
                <p class="applicability">{{ license.shortTerms }}</p>

                <a class="action primary" :href="getLicenseSummaryUrl(license)">Read details</a>
              </section>
            </a>
          </template>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">

import {CommunityLicense, EnterpriseLicense, License, ProfessionalLicense} from "../license/LinenseSummaries";

const licenses = [
    CommunityLicense,
    ProfessionalLicense,
    EnterpriseLicense
];

function getLicenseSummaryUrl(license: License) {
    return `/license/summary/${license.name.toLowerCase()}`;
}

</script>

<style scoped>
.pricing {
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(325px, 100%), 1fr));
  grid-gap: 48px;
}

.pricing-tier {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  box-shadow: var(--elevation);
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 24px;
  padding: 32px;
  transition: all 0.25s ease-in-out;
}

.pricing-tier:hover {
  transform: scale(1.075);
  box-shadow: var(--elevation-hover);
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

.pricing a.action {
  align-self: end;
  margin-top: 16px;
}

</style>