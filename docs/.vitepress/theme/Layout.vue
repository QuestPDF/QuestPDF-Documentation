<template>
  <default-layout>
    <template #doc-before>
      <ClientOnly>
        <support-alert />
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

export default defineComponent({
  components: {SupportAlert, GoogleAnalytics, DefaultLayout: DefaultTheme.Layout },
});
</script>