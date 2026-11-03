<script setup lang="ts">
import { onMounted } from "vue";
import DefaultTheme from "vitepress/theme";
import LayoutFooter from "./LayoutFooter.vue";
import { loadPaddle } from "./paddle";

const { Layout } = DefaultTheme;

/* Paddle.js is initialised on every page, not only on pricing: a Paddle payment link (?_ptxn=…) can open its
   checkout only on a page where Paddle.js is loaded */
onMounted(loadPaddle);
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <LayoutFooter />
    </template>
  </Layout>
</template>
