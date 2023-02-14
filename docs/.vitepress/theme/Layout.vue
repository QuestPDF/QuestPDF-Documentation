<template>
  <Layout>
    <template #doc-before>
      <ClientOnly>
        <div v-show="showAlerts">
          <support-alert />
          <survey-alert />
        </div>
      </ClientOnly>
    </template>

    <template #layout-bottom>
      <ClientOnly>
        <google-analytics />
      </ClientOnly>
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme';
const { Layout } = DefaultTheme

import GoogleAnalytics from "./GoogleAnalytics.vue";
import SupportAlert from "./SupportAlert.vue";
import HomePage from "./homepage/HomePage.vue";
import SurveyAlert from "./SurveyAlert.vue";
import {computed} from "vue";
import {useRoute} from "vitepress";

const showAlerts = computed(() => {
  return !useRoute().path.includes("project-future");
})
</script>