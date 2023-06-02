<template>
  <section class="content license-content">
    <img src="/homepage/license.svg" alt="" class="license-icon" />

    <div>
      <h2>What license do you need?</h2>

      <div class="questions">


        <article v-if="activeQuestion && !recommendedLicense" class="question">

          <div class="progress-indicator">
            <div v-for="indicator of progressIndicator"
               class="progress-indicator-step"
               :class="{ 'completed': indicator.isCompleted, 'current': indicator.isCurrent, 'future': indicator.isFuture }"></div>
          </div>

          <hr>

          <h3 class="title">{{ activeQuestion.content }}</h3>

<!--            <div v-for="answer of question.answers" :key="answer.content" class="answer">-->
<!--              <i class="fa-regular fa-square-check"></i>-->
<!--              <i class="fa-solid fa-square-check"></i>-->
<!--              <i class="fa-regular  fa-square"></i>-->
<!--            </div>-->

          <div v-for="answer of activeQuestion.answers" :key="answer.content" class="action answer" @click="acceptAnswer(answer)" :class="{ 'primary': answer.isHighlighted() }">
            {{ answer.content }} <br>
            <span class="hint">{{ answer.hint }}</span>
          </div>
        </article>
      </div>

      <section class="pricing-tier" v-if="recommendedLicense">
        <header>
          <img class="icon" :src="recommendedLicense.icon" alt="" />

          <div>
            <h3><span class="highlight-foreground" style="font-weight: bold">{{ recommendedLicense.name }}</span> License</h3>

            <template v-if="recommendedLicense.price">
              <p class="price">{{ recommendedLicense.price }} USD per year</p>
              <p class="tax-information">+ local tax (if applicable)</p>
            </template>

            <template v-else>
              <p class="price">Free forever</p>
            </template>
          </div>
        </header>

        <hr>

        <div class="details">
          <div v-for="detail of recommendedLicense.details" class="detail">
            <img :src="convertLicenseDetailTypeToIcon(detail.type)" width="24" alt="">
            <span>{{ detail.content }}</span>
          </div>
        </div>

        <hr>

        <div style="display: flex; align-self: end; gap: 16px;">
          <a class="action" @click="reset">Back</a>

          <a v-if="recommendedLicense.paddleProductId" class="action primary" @click="startCheckout(PaddleConfiguration.professionalLicenseId)">Purchase</a>
          <a v-else class="action primary" href="/quick-start.html">Start learning</a>
        </div>
      </section>
    </div>

  </section>
</template>

<script setup lang="ts">

import { PaddleConfiguration } from "./PaddleConfiguration";
import { useData } from 'vitepress'
import {computed, reactive, ref} from "vue";

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

enum LicenseDetailType {
  Feature,
  Information,
  Warning
}

interface LicenseDetail {
    type: LicenseDetailType,
    content: string;
}

interface License {
    icon: string;
    name: string;
    price: number;
    paddleProductId: number;

    details: LicenseDetail[];
}

const LicenseDetailsIncluded : LicenseDetail[] = [
    { type: LicenseDetailType.Feature, content: "Covers commercial usage" },
    { type: LicenseDetailType.Feature, content: "Create and deploy unlimited closed-source projects, applications and APIs" },
    { type: LicenseDetailType.Feature, content: "Redistribute the compiled library, royalty-free, with your applications" }
]

const CommunityLicense : License = {
    icon: "/pricing/community.svg",
    name: "Community",

    price: null,
    paddleProductId: null,

    details: [
        ...LicenseDetailsIncluded,
        { type: LicenseDetailType.Information, content: "This license is perpetual" },
        { type: LicenseDetailType.Warning, content: "In the future, when upgrading the library to a newer version, please kindly check if you are still eligible to use the Community License" },
    ]
};

const ProfessionalLicense : License = {
    icon: "/pricing/professional.svg",
    name: "Professional",

    price: 500,
    paddleProductId: PaddleConfiguration.professionalLicenseId,

    details: [
        ...LicenseDetailsIncluded,
        { type: LicenseDetailType.Information, content: "This license is perpetual" },
        { type: LicenseDetailType.Warning, content: "In the future, when upgrading the library to a newer version, please kindly check if you are still eligible to use the Community License" },
    ]
};

const EnterpriseLicense : License = {
    icon: "/pricing/enterprise.svg",
    name: "Enterprise",

    price: 3000,
    paddleProductId: PaddleConfiguration.enterpriseLicenseId,

    details: [
        ...LicenseDetailsIncluded,
        { type: LicenseDetailType.Information, content: "This license is perpetual" },
        { type: LicenseDetailType.Warning, content: "In the future, when upgrading the library to a newer version, please kindly check if you are still eligible to use the Community License" },
    ]
};

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

function convertLicenseDetailTypeToIcon(type: LicenseDetailType) {
    if (type === LicenseDetailType.Feature)
        return "/pricing/tick.svg";

    if (type === LicenseDetailType.Information)
        return "/pricing/info.svg";

    if (type === LicenseDetailType.Warning)
        return "/pricing/alert.svg";

    throw "Unreachable code";
}

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

.license-content {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 64px;
}

.license-icon {
  width: 128px;
  place-self: center;
}



.questions {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 500px;
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




.pricing-tier {
  max-width: 500px;

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
  margin: 0px -32px;
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



.pricing-tier .details {
  display: flex;
  flex-direction: column;
  gap: 24px;

}

.pricing-tier .details .detail {
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: start;

  color: var(--vp-c-text-2);
  line-height: 1.5rem;
  font-size: 1rem;
}

</style>