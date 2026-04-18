<script setup lang="ts">

import {ShikiTransformer} from "@shikijs/types";

import HomePageWindowContainer from "./HomePageWindowContainer.vue";
import HomePageHighlightedCode from "./HomePageHighlightedCode.vue";

const props = defineProps<{
  fileName: string,
  code: string,
  codeTransformer?: ShikiTransformer
}>();

</script>

<template>
  <home-page-window-container :file-name="fileName">
    <suspense>
      <home-page-highlighted-code :code="code" :code-transformer="codeTransformer" />
    </suspense>
  </home-page-window-container>
</template>

<style>

</style>