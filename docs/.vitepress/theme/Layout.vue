<template>
  <default-layout>

  </default-layout>
</template>

<script>
import {defineComponent} from "vue";
import DefaultTheme from 'vitepress/theme';
import GoogleAnalytics from "./GoogleAnalytics.vue";
import SupportAlert from "./SupportAlert.vue";
import HomePage from "./homepage/HomePage.vue";

export default defineComponent({
  components: {HomePage, SupportAlert, GoogleAnalytics, DefaultLayout: DefaultTheme.Layout },
});
</script>