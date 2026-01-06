<template>
  <Layout>
    <template #doc-before>
      <support-alert />
    </template>

    <template #layout-bottom>
      <ClientOnly>
        <google-analytics />
        <paddle-integration />
      </ClientOnly>
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme';
const { Layout } = DefaultTheme

import GoogleAnalytics from "./GoogleAnalytics.vue";
import SupportAlert from "./SupportAlert.vue";
import PaddleIntegration from "./PaddleIntegration.vue";
import {scrollToAnchor} from "./helpers.ts";

if (typeof window !== 'undefined')
  window.addEventListener("popstate", () => scrollToAnchor())

</script>