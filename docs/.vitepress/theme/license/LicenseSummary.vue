<script setup lang="ts">
import {CommunityLicense, EnterpriseLicense, License, LicenseDetailType, ProfessionalLicense} from "./LinenseSummaries";
import {defineProps, defineEmits, computed} from "vue";
import {useData} from "vitepress";
import {PaddleConfiguration} from "./PaddleConfiguration";

const { isDark } = useData()

const props = defineProps<{
    type?: "community" | "professional" | "enterprise"
}>()

const license = computed(() => {
    if (props.type == "community")
        return CommunityLicense;

    if (props.type == "professional")
        return ProfessionalLicense;

    if (props.type == "enterprise")
        return EnterpriseLicense;
});

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

function startCheckout() {
    if (!PaddleConfiguration.isProduction)
        Paddle.Environment.set('sandbox');

    Paddle.Setup({
        vendor: PaddleConfiguration.vendorId
    });

    Paddle.Checkout.open({
        product: license.paddleProductId,
        displayModeTheme: isDark.value ? 'dark' : 'light'
    });
}

function back() {
    history.back()
}

</script>

<template>
  <div class="custom-page">
    <div class="container reverse-background">
      <article class="content content-center">

        <section class="license-description" v-if="license">
          <header>
            <img class="icon" :src="license.icon" alt="" />

            <div>
              <h3>QuestPDF <span class="highlight-foreground" style="font-weight: bold">{{ license.name }}</span> License</h3>

              <template v-if="license.price">
                <p class="price">${{ license.price }} per year</p>
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
            <a class="action" @click="back">Back</a>

            <a v-if="license.paddleProductId" class="action primary" @click="startCheckout">Purchase</a>
            <a v-else class="action primary" href="/quick-start.html">Start learning</a>
          </div>
        </section>

      </article>
    </div>
  </div>
</template>

<style scoped>

.license-description {
  width: 900px;
  max-width: 100%;

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
  grid-template-columns: auto 1fr;
  grid-gap: 0 32px;
  align-items: center;
}

.license-description header .icon {
  width: 64px;
}

.license-description header h3 {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 2rem;
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
  column-count: 2;
  column-gap: 64px;
}

.license-description .details-item {
  break-inside: avoid-column;

  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: start;

  color: var(--vp-c-text-2);
  line-height: 1.5rem;
  font-size: 1rem;

  margin-bottom: 32px;
}

@media screen and (max-width: 700px) {
  .license-description .details {
    column-count: 1;
  }

  .license-description {
    padding: 24px;
  }

  .license-description hr {
    margin: 0px -24px;
  }

  .license-description header {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 16px;
  }

  .license-description header h3 {
    font-size: 1.5rem;
    line-height: 1.75rem;
  }
}

</style>