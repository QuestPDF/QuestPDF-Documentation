<template>
  <div class="custom-page">
    <div class="container">
      <article class="content">
        <h1><span class="highlight-foreground">QuestPDF</span> License Survey</h1>
        <p class="sub-header">Not sure which license to choose? Answer a few quick questions and our survey tool will suggest the most suitable license for your use-case, as well as provide all necessary details.</p>
      </article>
    </div>

    <div class="container reverse-background">
      <article class="content content-center">

        <article v-if="!recommendedLicense" class="survey card">

          <progress-indicator :length="SurveyLength" :value="currentQuestionNumber" />

          <hr>

          <template v-if="activeQuestion">
            <h3 class="question-title">{{ activeQuestion.title }}</h3>

            <div v-for="answer of activeQuestion.answers" :key="answer.title" class="answer" @click="acceptAnswer(answer)">
              <img class="answer-icon" :src="answer.icon" alt="" />
              <span class="answer-title">{{ answer.title }}</span>
              <span class="answer-hint">{{ answer.hint }}</span>
            </div>

            <div v-if="currentQuestionNumber > 1" class="action answer" @click="resetSurvey">
              <img class="answer-icon" src="/license/answer-reset.svg" alt="" />
              <span class="answer-title">Start over</span>
            </div>
          </template>
        </article>

        <article v-else class="survey card">
          <h2 style="margin-bottom: 1rem">QuestPDF <span class="highlight-foreground">{{ recommendedLicense.name }}</span> License</h2>
          <p>Congratulations! We found the best license for you!</p>

          <hr>

          <div style="display: flex; flex-direction: row; gap: 16px; align-self: end;">
            <a class="action" @click="resetSurvey">Redo survey</a>
            <a class="action primary" :href="getLicenseSummaryUrl(recommendedLicense)">Read details</a>
          </div>
        </article>

      </article>
    </div>
  </div>
</template>


<script setup lang="ts">

import {computed, defineProps, reactive, ref} from "vue";
import {LicenseAnswer, LicenseQuestion, OwnerType, SurveyState} from "./LicenseSurveyModels";
import {
    CommercialUsageQuestion,
    DeveloperThresholdQuestion,
    DirectPackageDependencyQuestion, ExternalClientQuestion,
    RevenueThresholdExternalClientQuestion, RevenueThresholdInternalQuestion
} from "./LicenseSurveyQuestions";
import ProgressIndicator from "./ProgressIndicator.vue";
import {CommunityLicense, EnterpriseLicense, License, ProfessionalLicense} from "../LinenseSummaries";

const currentQuestionNumber = ref(1);

const surveyState = reactive<SurveyState>({
    isDirectPackageDependency: null,
    isForProfit: null,
    ownerType: null,
    exceededAnnualRevenueThreshold: null,
    exceededDeveloperCountThreshold: null
})

const SurveyLength = 5;

function resetSurvey() {
    surveyState.isForProfit = null;
    surveyState.isDirectPackageDependency = null;
    surveyState.ownerType = null;
    surveyState.exceededAnnualRevenueThreshold = null;
    surveyState.exceededDeveloperCountThreshold = null;

    currentQuestionNumber.value = 1;
}

function acceptAnswer(answer: LicenseAnswer) {
    answer.action(surveyState);
    currentQuestionNumber.value += 1;
}

const activeQuestion = computed(() : LicenseQuestion => {
    if (currentQuestionNumber.value == 1)
        return DirectPackageDependencyQuestion;

    if (currentQuestionNumber.value == 2)
        return CommercialUsageQuestion;

    if (currentQuestionNumber.value == 3)
        return ExternalClientQuestion;

    if (currentQuestionNumber.value == 4)
        return surveyState.ownerType == OwnerType.Internal
            ? RevenueThresholdInternalQuestion
            : RevenueThresholdExternalClientQuestion;

    if (currentQuestionNumber.value == 5)
        return DeveloperThresholdQuestion;

    return null;
})

const recommendedLicense = computed(() => {
    if (surveyState.isDirectPackageDependency == false || surveyState.isForProfit == false || surveyState.exceededAnnualRevenueThreshold == false)
        return CommunityLicense;

    if (surveyState.isDirectPackageDependency == true && surveyState.isForProfit == true && surveyState.exceededAnnualRevenueThreshold == true && surveyState.exceededDeveloperCountThreshold != null)
        return surveyState.exceededDeveloperCountThreshold ? EnterpriseLicense : ProfessionalLicense;

    return null;
})

function getLicenseSummaryUrl(license: License) {
    return `/license/summary/${license.name.toLowerCase()}`;
}

</script>

<style scoped>

.survey {
  display: flex;
  align-items: start;
  flex-direction: column;
  width: 600px;
  max-width: 100%;
}

.question-title {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.75rem;

  margin-top: 0;
  margin-bottom: 16px;
}

.answer {
  display: grid;
  grid-template-columns: 24px 1fr;
  grid-template-rows: auto auto;

  border: none;
  width: calc(100% + 64px);
  margin: 0 -32px;
  padding: 16px 32px;
  grid-gap: 0 16px;
}

.answer:hover {
  background: var(--vp-c-bg-soft);
  cursor: pointer;
}

.answer-icon {
  grid-row: 1 / span 2;
  grid-column: 1;
}

.answer-title {
  grid-row: 1;
  grid-column: 2;

  color: var(--vp-c-text-1);
  font-size: 1rem;
  font-weight: 600;
}

.answer-hint {
  grid-row: 2;
  grid-column: 2;

  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  font-weight: 400;
}

@media screen and (max-width: 700px) {
  .survey .answer {
    grid-gap: 8px 12px;
  }

  .answer-hint {
    grid-column: 1 / span 2;
  }
}

</style>