<template>
  <article class="content">
    <h2>Frequently Asked Questions</h2>

    <div class="questions">
      <div class="question" v-for="question of questions" :key="question.question">
        <img src="/homepage/question.svg" width="28" alt="" />
        <h3>{{ question.question }}</h3>
        <p>{{ question.answer }}</p>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">

interface Question {
  question: string;
  answer: string;
}

const questions : Question[] = [
  {
    question: "What library version does the commercial license apply to?",
    answer: "The commercial license applies to the QuestPDF 2023.X releases and beyond. All versions before are available completly for free under the MIT license."
  },
  {
    question: "Do you accept Purchase Orders?",
    answer: "We are not able to accept a purchase order and convert that into an invoice for payment. If you have any particular compliance requirements please contact our online reseller Paddle.com."
  },
  {
    question: "I require a W-8/W-9 form?",
    answer: "Please contact our online reseller Paddle.com."
  },
  {
    question: "Do I need a license key once I have made a purchase?",
    answer: "No, your license purchases are automatically added to our records."
  },
  {
    question: "What happens if I let my license expire?",
    answer: "If you are continuing to use the QuestPDF library, you will be in violation of the license agreement."
  },
  {
    question: "Do you have any special offer for Nonprofits and Charitable Organizations?",
    answer: "Nonprofits and Charitable Organizations are not required to purchase a license."
  }
];

</script>

<style scoped>
.questions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 64px;
}

@media screen and (max-width: 800px) {
  .questions {
    grid-template-columns: 1fr;
  }
}

.question {
  align-self: start;
  display: grid;
  grid-gap: 0 16px;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
}

.question img {
  grid-row: span 2;
}

.question h3 {
  margin: 2px 0 4px 0;
  font-size: 1rem;
}
</style>