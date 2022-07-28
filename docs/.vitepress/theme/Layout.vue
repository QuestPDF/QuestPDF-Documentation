<template>
  <default-layout>
    <template #doc-before>
      <support-alert />
    </template>

    <template #layout-bottom>
      <google-analytics />
    </template>
  </default-layout>
</template>

<script>
import {defineComponent} from "vue";
import DefaultTheme from 'vitepress/theme';
import GoogleAnalytics from "./GoogleAnalytics.vue";
import SupportAlert from "./SupportAlert.vue";

export default defineComponent({
  components: {SupportAlert, GoogleAnalytics, DefaultLayout: DefaultTheme.Layout },
});
</script>