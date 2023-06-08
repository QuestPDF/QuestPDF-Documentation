<template>
  <article class="survey">

    <progress-indicator :length="SurveyLength" :value="currentQuestionNumber" />

    <hr>

    <template v-if="activeQuestion">
      <h3 class="question-title">{{ activeQuestion.title }}</h3>

      <div v-for="answer of activeQuestion.answers" :key="answer.title" class="answer" @click="acceptAnswer(answer)">
        <img class="answer-icon" :src="answer.icon" alt="" />
        <span class="answer-title">{{ answer.title }}</span>
        <span class="answer-hint">{{ answer.hint }}</span>
      </div>

      <div v-if="currentQuestionNumber > 0" class="action answer" @click="showPreviousQuestion">
        <span class="answer-title">Back</span>
      </div>
    </template>
  </article>
</template>


<script setup lang="ts">

import {computed, defineProps, reactive, ref} from "vue";
import {LicenseAnswer, LicenseQuestion, OwnerType, SurveyState} from "./LicenseSurveyModels";
import {
    CommercialUsageQuestion,
    DeveloperThresholdQuestion,
    DirectPackageDependencyQuestion, ExternalClientQuestion, IntroductionQuestion,
    RevenueThresholdExternalClientQuestion, RevenueThresholdInternalQuestion
} from "./LicenseSurveyQuestions";
import ProgressIndicator from "./ProgressIndicator.vue";

const currentQuestionNumber = ref(0);

const props = defineProps<{
    surveyState: SurveyState;
}>();

const SurveyLength = 6;

function resetSurvey() {
    currentQuestionNumber.value = 0;
}

function acceptAnswer(answer: LicenseAnswer) {
    answer.action(props.surveyState);
    currentQuestionNumber.value += 1;
}

const activeQuestion = computed(() : LicenseQuestion => {
    if (currentQuestionNumber.value == 0)
        return IntroductionQuestion;

    if (currentQuestionNumber.value == 1)
        return DirectPackageDependencyQuestion;

    if (currentQuestionNumber.value == 2)
        return CommercialUsageQuestion;

    if (currentQuestionNumber.value == 3)
        return ExternalClientQuestion;

    if (currentQuestionNumber.value == 4)
        return props.surveyState.ownerType == OwnerType.Internal
            ? RevenueThresholdInternalQuestion
            : RevenueThresholdExternalClientQuestion;

    if (currentQuestionNumber.value == 5)
        return DeveloperThresholdQuestion;

    return null;
})

function showPreviousQuestion() {
    currentQuestionNumber.value -= 1;
}

defineExpose({ resetSurvey })

</script>

<style scoped>

hr {
  border: none;
  border-top: 1px solid var(--vp-c-gutter);
  margin: 24px -24px;
  width: calc(100% + 48px);
  padding: 0;
}

.survey {
  display: flex;
  align-items: start;
  flex-direction: column;
  width: 600px;
  max-width: 100%;

  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 16px;
  padding: 24px;
}

.question-title {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.75rem;
  margin-bottom: 16px;
}

.answer {
  display: grid;
  grid-template-columns: 24px 1fr;
  grid-template-rows: auto auto;

  border: none;
  width: calc(100% + 48px);
  margin: 0 -24px;
  padding: 16px 24px;
  grid-gap: 0px 12px;
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