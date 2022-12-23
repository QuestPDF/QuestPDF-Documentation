<template>
  <default-layout>
    <template #doc-before>
      <ClientOnly>
        <support-alert />
        <survey-alert />
      </ClientOnly>
    </template>

    <template #home-hero-after>
      <home-page />
    </template>

    <template #layout-bottom>
      <ClientOnly>
        <google-analytics />
      </ClientOnly>
    </template>
  </default-layout>
</template>

<script>
import {defineComponent} from "vue";
import DefaultTheme from 'vitepress/theme';
import GoogleAnalytics from "./GoogleAnalytics.vue";
import SupportAlert from "./SupportAlert.vue";
import SurveyAlert from "./SurveyAlert.vue";
import HomePage from "./HomePage.vue";

export default defineComponent({
  components: {HomePage, SupportAlert, SurveyAlert, GoogleAnalytics, DefaultLayout: DefaultTheme.Layout },
});
</script>