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
        <intellisense />
      </ClientOnly>
    </template>
  </default-layout>
</template>

<script>
import {defineComponent} from "vue";
import DefaultTheme from 'vitepress/theme';
import GoogleAnalytics from "./GoogleAnalytics.vue";
import SupportAlert from "./SupportAlert.vue";
import Intellisense from "./Intellisense.vue";

export default defineComponent({
  components: {Intellisense, SupportAlert, GoogleAnalytics, DefaultLayout: DefaultTheme.Layout },
});
</script>