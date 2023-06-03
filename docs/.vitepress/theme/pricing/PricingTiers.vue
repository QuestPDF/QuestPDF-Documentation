<template>
  <section class="content license-content">
    <img src="/homepage/license.svg" alt="" class="license-icon" />

    <div>
      <h2>What license do you need?</h2>

      <article v-if="activeQuestion && !recommendedLicense" class="question">

        <div class="progress-indicator">
          <div v-for="indicator of progressIndicator"
               class="progress-indicator-step"
               :class="{ 'completed': indicator.isCompleted, 'current': indicator.isCurrent, 'future': indicator.isFuture }"></div>
        </div>

        <hr>

        <h3 class="title">{{ activeQuestion.content }}</h3>

        <div v-for="answer of activeQuestion.answers" :key="answer.content" class="action answer" @click="acceptAnswer(answer)" :class="{ 'primary': answer.isHighlighted() }">
          {{ answer.content }} <br>
          <span class="hint">{{ answer.hint }}</span>
        </div>
      </article>

      <license-description v-if="recommendedLicense" :license="recommendedLicense" />
    </div>

  </section>
</template>

<script setup lang="ts">

import { PaddleConfiguration } from "./PaddleConfiguration";
import { useData } from 'vitepress'
import {computed, reactive, ref} from "vue";
import {CommunityLicense, EnterpriseLicense, ProfessionalLicense} from "./LinenseDescriptions";
import LicenseDescription from "./LicenseDescription.vue";

const { isDark } = useData()

enum LicenseType {
  Community,
  Professional,
  Enterprise
}

enum ProjectType {
  Internal,
  External
}

interface LicenseAnswer {
  content: string;
  hint?: string;
  isHighlighted: () => boolean;
  action: () => void;
}

interface LicenseQuestion {
  content: string;
  answers: LicenseAnswer[];
}

const state = reactive({
    questionNumber: 0,
    isSurveyStarted: false,
    isDirectPackageDependency: null as boolean,
    isForProfit: null as boolean,
    type: null as ProjectType,
    exceededAnnualRevenueThreshold: null as boolean,
    exceededDeveloperCountThreshold: null as boolean,
});

const BackAnswer = {
    content: "Back",
    isHighlighted: () => false,
    action: () => state.questionNumber-=1
};

const questions : LicenseQuestion[] = [
  {
    content: "Please answer a couple of simple questions to learn which license suits you best.",
    answers: [
      {
        content: "Start",
        isHighlighted: () => false,
        action: () => state.isSurveyStarted = true
      }
    ]
  },
  {
    content: "Are you consuming the QuestPDF library as a Direct Package Dependency?",
    answers: [
      {
          content: "Yes",
          hint: "QuestpDF is a explicitly referenced in my project",
          isHighlighted: () => state.isDirectPackageDependency == true,
          action: () => state.isDirectPackageDependency = true
      },
      {
        content: "No",
        hint: "QuestPDF is referenced as a dependency of other library",
        isHighlighted: () => state.isDirectPackageDependency == false,
        action: () => state.isDirectPackageDependency = false
      },
      BackAnswer
    ]
  },
  {
    content: "Is your project for-profit?",
    answers: [
      {
          content: "Yes",
          hint: "The project is meant to generate profit, e.g.: commercial application, reduced company costs, paid product, etc.",
          isHighlighted: () => state.isForProfit == true,
          action: () => state.isForProfit = true
      },
      {
        content: "No",
        hint: "The project is not created for profit, e.g.: open-source library, project created for Charitable Organization, etc.",
        isHighlighted: () => state.isForProfit == false,
        action: () =>  state.isForProfit = false
      },
      BackAnswer
    ]
  },
  {
    content: "Is the project created by external client?",
    answers: [
      {
          content: "Yes",
          hint: "I am creating the project for external client",
          isHighlighted: () => state.type == ProjectType.External,
          action: () => state.type = ProjectType.External,
      },
      {
        content: "No",
        hint: "I am creating the project individually or for my employer",
        isHighlighted: () => state.type == ProjectType.Internal,
        action: () =>  state.type = ProjectType.Internal
      },
      BackAnswer
    ]
  },
  {
    content: "Does your company has more than 1M USD annual gross revenue?",
    answers: [
      {
          content: "Yes",
          hint: "My company or my employer has more than 1M USD annual gross revenue",
          isHighlighted: () => state.exceededAnnualRevenueThreshold == true,
          action: () => state.exceededAnnualRevenueThreshold = true,
      },
      {
        content: "No",
        hint: "My company or my employer has less than 1M USD annual gross revenue",
        isHighlighted: () => state.exceededAnnualRevenueThreshold == false,
        action: () => state.exceededAnnualRevenueThreshold = false
      },
      BackAnswer
    ]
  },
  {
    content: "Does your client has more than 1M USD annual gross revenue?",
    answers: [
      {
          content: "Yes",
          hint: "My client has more than 1M USD annual gross revenue",
          isHighlighted: () => state.exceededAnnualRevenueThreshold == true,
          action: () => state.exceededAnnualRevenueThreshold = true,
      },
      {
        content: "No",
        hint: "My client has less than 1M USD annual gross revenue",
        isHighlighted: () => state.exceededAnnualRevenueThreshold == false,
        action: () => state.exceededAnnualRevenueThreshold = false,
      },
      BackAnswer
    ]
  },
  {
    content: "How many software developers are / will be working on projects dependent on the QuestPDF library?",
    answers: [
      {
        content: "Up to 10",
        isHighlighted: () => state.exceededDeveloperCountThreshold == false,
        action: () => state.exceededDeveloperCountThreshold = false,
      },
      {
        content: "More than 10",
        isHighlighted: () => state.exceededDeveloperCountThreshold == true,
        action: () => state.exceededDeveloperCountThreshold = true,
      },
      BackAnswer
    ]
  }
];

const activeQuestion = computed(() => {
    return questions[state.questionNumber];
})

function reset() {
    state.questionNumber = 0;
}

function previousQuestion() {
    state.questionNumber--;
}

function acceptAnswer(answer: LicenseAnswer) {
  answer.action();
  state.questionNumber++;
}

const recommendedLicense = computed(() => {
    if (state.isDirectPackageDependency == false || state.isForProfit == false || state.exceededAnnualRevenueThreshold == false)
        return CommunityLicense;

    if (state.isDirectPackageDependency && state.isForProfit && state.exceededAnnualRevenueThreshold)
        return state.exceededDeveloperCountThreshold ? EnterpriseLicense : ProfessionalLicense;

    return null;
})

const progressIndicator = computed(() => {
    return questions.map((_, index) => {
        return {
            isCompleted: index < state.questionNumber,
            isCurrent: index == state.questionNumber,
            isFuture: index > state.questionNumber
        }
    });
})


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

<style scoped lang="scss">

.license-content {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 64px;
}

.license-icon {
  width: 128px;
  place-self: center;
}

hr {
  border: none;
  border-top: 1px solid var(--vp-c-gutter);
  margin: 24px -24px;
  width: calc(100% + 48px);
  padding: 0;
}

.question {
  display: flex;
  align-items: start;
  flex-direction: column;

  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 16px;
  padding: 24px;
}

.question .title {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.5rem;
  margin: 0 0 16px 0;
}

.question .answer {
  border: none;
  margin: 0 -24px;
  width: calc(100% + 48px);
  padding: 16px 24px;
  line-height: initial;
  text-align: left;
  font-weight: 600;
}

.question .answer:hover {
  background: var(--vp-c-bg-soft);
  cursor: pointer;
}

.question .answer .hint {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  font-weight: 400;
}



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