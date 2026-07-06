<template>
  <Layout>
    <template #layout-bottom>
      <layout-footer />

      <ClientOnly>
        <paddle-integration />
      </ClientOnly>
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme';
const { Layout } = DefaultTheme

import PaddleIntegration from "./PaddleIntegration.vue";
import LayoutFooter from "./LayoutFooter.vue";

</script>