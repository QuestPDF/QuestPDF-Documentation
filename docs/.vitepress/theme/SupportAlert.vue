<template>
  <a v-show="showAlert" href="https://github.com/QuestPDF/QuestPDF" target="_blank">
    <div class="alert warning custom-block" style="width: 100%; margin-bottom: 32px; padding: 16px; display: grid; grid-template-columns: auto 1fr 32px; grid-gap: 16px;">

      <img src="/home-page/star.svg" style="width: 32px; align-self: center;" />

      <div>
        If you like QuestPDF, please <b>give it a star on GitHub</b>. <br>
        It takes seconds and help others making the right choice!
      </div>

      <a title="Close" @click.prevent="closeAlert" style="align-self: center; justify-self: right;">
        <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
      </a>

    </div>
  </a>
</template>

<script setup>

import { ref, onMounted } from 'vue';

const alertId = "alert-help";
const showAlert = ref(true);

function closeAlert() {
  localStorage.setItem(alertId, "-");
  showAlert.value = false;
}

onMounted(() => {
  if (typeof window === 'undefined')
    return;

  showAlert.value = localStorage.getItem(alertId) === null;
});

</script>

<style scoped>
  .alert:hover {
    cursor: pointer;
    background-color: rgba(255, 197, 23, 0.15);
  }
</style>