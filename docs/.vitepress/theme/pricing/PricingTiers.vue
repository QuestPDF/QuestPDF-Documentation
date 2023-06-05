<template>
  <section class="content license-content">

    <h2>What license do you need?</h2>
    <license-survey v-if="!recommendedLicense" :survey-state="surveyState" ref="survey" />
    <license-description v-if="recommendedLicense" :license="recommendedLicense" @reset="resetSurvey" @checkout="startCheckout" />

  </section>
</template>

<script setup lang="ts">

import { PaddleConfiguration } from "./PaddleConfiguration";
import { useData } from 'vitepress'
import {computed, reactive, ref} from "vue";
import LicenseDescription from "./LicenseDescription.vue";
import LicenseSurvey  from "./LicenseSurvey.vue";
import {SurveyState} from "./LicenseSurveyModels";
import {CommunityLicense, EnterpriseLicense, ProfessionalLicense} from "./LinenseDescriptions";

const { isDark } = useData()

const survey = ref(null)

const surveyState = reactive<SurveyState>({
    isDirectPackageDependency: null,
    isForProfit: null,
    ownerType: null,
    exceededAnnualRevenueThreshold: null,
    exceededDeveloperCountThreshold: null
})

function resetSurvey() {
    surveyState.isForProfit = null;
    surveyState.isDirectPackageDependency = null;
    surveyState.ownerType = null;
    surveyState.exceededAnnualRevenueThreshold = null;
    surveyState.exceededDeveloperCountThreshold = null;

    survey.value.resetSurvey();
}

const recommendedLicense = computed(() => {
    if (surveyState.isDirectPackageDependency == false || surveyState.isForProfit == false || surveyState.exceededAnnualRevenueThreshold == false)
        return CommunityLicense;

    if (surveyState.isDirectPackageDependency == true && surveyState.isForProfit == true && surveyState.exceededAnnualRevenueThreshold == true && surveyState.exceededDeveloperCountThreshold != null)
        return surveyState.exceededDeveloperCountThreshold ? EnterpriseLicense : ProfessionalLicense;

    return null;
})


function startCheckout() {
    const productId = recommendedLicense.value.paddleProductId;

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

<style scoped lang="scss">

.license-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>