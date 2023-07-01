<template>
  <Layout>
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
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme';
const { Layout } = DefaultTheme

import GoogleAnalytics from "./GoogleAnalytics.vue";
import SupportAlert from "./SupportAlert.vue";

</script>