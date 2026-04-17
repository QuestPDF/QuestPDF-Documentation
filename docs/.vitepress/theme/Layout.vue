<template>
  <Layout>
    <template #doc-before>
      <support-alert />
    </template>

    <template #layout-bottom>
      <ClientOnly>
        <paddle-integration />
      </ClientOnly>
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme';
const { Layout } = DefaultTheme

import SupportAlert from "./SupportAlert.vue";
import PaddleIntegration from "./PaddleIntegration.vue";
</script>