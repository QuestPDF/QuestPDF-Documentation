<template>
  <section class="license-description" v-if="license">
    <header>
      <img class="icon" :src="license.icon" alt="" />

      <div>
        <h3><span class="highlight-foreground" style="font-weight: bold">{{ license.name }}</span> License</h3>

        <template v-if="license.price">
          <p class="price">{{ license.price }} USD per year</p>
          <p class="tax-information">+ local tax (if applicable)</p>
        </template>

        <template v-else>
          <p class="price">Free forever</p>
        </template>
      </div>
    </header>

    <hr>

    <div class="details">
      <div v-for="detail of license.details" class="details-item">
        <img :src="convertLicenseDetailTypeToIcon(detail.type)" width="24" alt="">
        <span>{{ detail.content }}</span>
      </div>
    </div>

    <hr>

    <div style="display: flex; align-self: end; gap: 16px;">
      <a class="action" @click="emit('reset')">Back</a>

      <a v-if="license.paddleProductId" class="action primary" @click="emit('checkout')">Purchase</a>
      <a v-else class="action primary" href="/quick-start.html">Start learning</a>
    </div>
  </section>
</template>

<script setup lang="ts">

import { License, LicenseDetailType } from "./LinenseDescriptions";
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
    license: License;
}>();

const emit = defineEmits(['reset', 'checkout']);

function convertLicenseDetailTypeToIcon(type: LicenseDetailType) {
    if (type === LicenseDetailType.Feature)
        return "/pricing/tick.svg";

    if (type === LicenseDetailType.Information)
        return "/pricing/info.svg";

    if (type === LicenseDetailType.Warning)
        return "/pricing/alert.svg";

    throw "Unreachable code";
}

</script>

<style scoped>

.license-description {
  max-width: 600px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;

  border: 1px solid var(--vp-c-gutter);
  background-color: var(--vp-c-bg);
  border-radius: 24px;
  padding: 32px;
  transition: all 0.25s ease-in-out;
}

.license-description header {
  display: grid;
  grid-template-columns: 64px 1fr;
  grid-gap: 0 32px;
  align-items: center;
}

.license-description header h3 {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.5rem;
  margin-top: 0;
  margin-bottom: 8px;
}

.license-description .applicability {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

.license-description hr {
  margin: 0px -32px;
  border: 0.5px solid var(--vp-c-gutter);
  width: calc(100% + 64px);
}

.license-description p.price {
  line-height: 1.5rem;
  font-size: 1.25rem;
}

.license-description p.tax-information {
  font-size: 1rem;
  color: var(--vp-c-text-3);
}

.license-description .details {
  display: flex;
  flex-direction: column;
  gap: 24px;

}

.license-description .details-item {
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: start;

  color: var(--vp-c-text-2);
  line-height: 1.5rem;
  font-size: 1rem;
}

</style>