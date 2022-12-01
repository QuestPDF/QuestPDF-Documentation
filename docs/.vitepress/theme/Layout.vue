<template>
  <default-layout>
    <template #doc-before>
      <ClientOnly>
        <support-alert />
        <survey-alert />
      </ClientOnly>
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

export default defineComponent({
  components: {SupportAlert, SurveyAlert, GoogleAnalytics, DefaultLayout: DefaultTheme.Layout },
});
</script>