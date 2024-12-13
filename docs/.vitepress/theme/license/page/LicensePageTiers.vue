<template>
  <article>
    <h2>Available Licenses</h2>

    <div class="licenses">
      <template v-for="license of licenses">
        <a :href="getLicenseSummaryUrl(license)">
          <section class="license-tier card">
            <header>
              <img class="icon" :src="license.icon" alt="" />

              <div v-if="license.price">
                <h3>{{ license.name }}</h3>
                <p class="price">${{ license.price }}</p>
                <p class="tax-information">+ local tax (if applicable)</p>
              </div>

              <div v-else>
                <h3>Community</h3>
                <p class="price">Free forever</p>
              </div>
            </header>

            <hr>

            <p class="applicability">{{ license.shortTerms }}</p>
            <a class="action primary" :href="getLicenseSummaryUrl(license)">Learn more</a>
          </section>
        </a>
      </template>
    </div>
  </article>
</template>

<script setup lang="ts">

import {CommunityLicense, EnterpriseLicense, License, ProfessionalLicense} from "../LinenseSummaries";

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
.licenses {
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(325px, 100%), 1fr));
  grid-gap: 48px;
}

.license-tier {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
}

.license-tier header {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 32px;
}

.license-tier header img {
  width: 48px;
}

.license-tier header h3 {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 8px;
}

.license-tier .applicability {
  font-size: 0.875rem;
}

.license-tier p.price {
  line-height: 1.5rem;
  font-size: 1.2rem;
}

.license-tier p.tax-information {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.license-tier a.action {
  align-self: flex-end;
  margin-top: 32px;
}

</style>