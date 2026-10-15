<script setup lang="ts">

import {computed} from "vue";
import type {ShikiTransformer} from "@shikijs/types";
import createCodeHighlighter from "./createCodeHighlighter";

const props = defineProps<{
  code: string,
  codeTransformer?: ShikiTransformer
}>();

const codeHighlighter = await createCodeHighlighter();

const highlightedCode = computed(() =>
    codeHighlighter.codeToHtml(props.code, {
      lang: 'csharp',
      themes: { light: 'light-plus', dark: 'dark-plus' },
      transformers: props.codeTransformer ? [ props.codeTransformer ] : undefined
    })
);
</script>

<template>
  <div class="code-source" v-html="highlightedCode" />
</template>

<style>
.code-source {
  font-size: 0.875rem;
  line-height: 1.5;
  tab-size: 4;
  overflow: hidden;
}

/* long lines scroll sideways; shiki paints its own background, the window's shows instead */
.code-source pre {
  overflow-x: auto;
  overflow-y: hidden;
  background-color: transparent !important;
}

@media screen and (max-width: 1000px) {
  .code-source pre {
    tab-size: 2;
  }
}

@media screen and (max-width: 700px) {
  .code-source {
    line-height: 1.25;
  }
}

.code-source .line {
  display: inline-block;
  padding: 0 16px;
  min-width: 100%
}

.code-source .line-removed {
  background-color: #F4433622;
  border-left: 3px solid #F44336AA;
  padding-left: calc(1rem - 3px);
}

.code-source .line-added {
  background-color: #4CAF5022;
  border-left: 3px solid #4CAF50AA;
  padding-left: calc(1rem - 3px);
}

html.dark .code-source .shiki,
html.dark .code-source .shiki span {
  color: var(--shiki-dark) !important;
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}
</style>
