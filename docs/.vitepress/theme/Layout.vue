<template>
  <default-layout>
    <template #layout-bottom>
      <google-analytics />
    </template>
  </default-layout>
</template>

<script>
import {defineComponent} from "vue";
import DefaultTheme from 'vitepress/theme';
import GoogleAnalytics from "./GoogleAnalytics.vue";

export default defineComponent({
  components: {GoogleAnalytics, DefaultLayout: DefaultTheme.Layout },
});
</script>