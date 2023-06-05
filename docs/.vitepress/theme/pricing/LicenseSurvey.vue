<template>
  <article class="survey">

    <img src="/homepage/license.svg" alt="" class="license-icon" />

    <div class="progress-indicator">
      <div v-for="indicator of Array.from({ length: SurveyLength }, (v, i) => i)"
           class="progress-indicator-step"
           :class="{ 'completed': indicator < currentQuestionNumber, 'current': indicator == currentQuestionNumber, 'future': indicator > currentQuestionNumber }"></div>
    </div>

    <hr>

    <template v-if="activeQuestion">
      <h3 class="title">{{ activeQuestion.title }}</h3>

      <div v-for="answer of activeQuestion.answers" :key="answer.title" class="action answer" @click="acceptAnswer(answer)">
        <img class="icon" :src="answer.icon" alt="" />
        <span class="title">{{ answer.title }}</span>
        <span class="hint">{{ answer.hint }}</span>
      </div>

      <div v-if="currentQuestionNumber > 0" class="action answer" @click="showPreviousQuestion">
        <span class="title">Back</span>
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
  max-width: 600px;

  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 16px;
  padding: 24px;
}

.survey h3.title {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.5rem;
  margin-bottom: 16px;
}

.survey .answer {
  display: grid;
  grid-template-columns: 24px 1fr;
  grid-template-rows: auto auto;

  border: none;
  width: calc(100% + 48px);
  margin: 0 -24px;
  padding: 16px 24px;
  grid-gap: 0px 12px;
}

.survey .answer:hover {
  background: var(--vp-c-bg-soft);
  cursor: pointer;
}

.answer .icon {
  grid-row: 1 / span 2;
  grid-column: 1;
}

.answer .title {
  grid-row: 1;
  grid-column: 2;

  color: var(--vp-c-text-2);
  font-size: 1rem;
  font-weight: 600;
}

.answer .hint {
  grid-row: 2;
  grid-column: 2;

  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  font-weight: 400;
}

/* SURVEY PROGRESS INDICATOR */

.progress-indicator {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.progress-indicator-step {
  height: 12px;
  width: 12px;

  border-radius: 50%;
}

.progress-indicator-step.completed {
  background-color: var(--vp-c-brand);
  opacity: 0.66;
}

.progress-indicator-step.current {
  background-color: var(--vp-c-brand);
  font-size: 15px;
}

.progress-indicator-step.future {
  background-color: var(--vp-c-mute-lighter);
}

.progress-indicator-step.future {
  background-color: var(--vp-c-mute-darker);
}

html.dark .progress-indicator-step.future {
  background-color: var(--vp-c-mute-lighter);
}


</style>