<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import {useData} from "vitepress";

import {ShikiTransformer} from "@shikijs/types";
import createCodeHighlighter from "./createCodeHighlighter";

import HomePageWindowContainer from "./HomePageWindowContainer.vue";

const { isDark } = useData();

const props = defineProps<{
  fileName: string,
  code: string,
  codeTransformer?: ShikiTransformer
}>();

const highlightedCode = ref('');

async function highlightCode() {
  const codeHighlighter = await createCodeHighlighter();

  highlightedCode.value = codeHighlighter.codeToHtml(props.code, {
    lang: 'csharp',
    theme: isDark.value ? 'dark-plus' :'light-plus',
    transformers: props.codeTransformer ? [ props.codeTransformer ] : undefined
  })
}

watch(() => [isDark.value, props.code, props.codeTransformer], highlightCode);
onMounted(highlightCode);

</script>

<template>
  <home-page-window-container :file-name="fileName">
    <div class="code-source" v-html="highlightedCode" />
  </home-page-window-container>
</template>

<style>
.code-source {
  font-size: 14px;
  line-height: 1.5;
  padding: 8px 0;
  tab-size: 4;
  overflow: hidden;
}

.code-source pre {
  overflow: hidden;
  background-color: transparent !important;
}

@media screen and (max-width: 1000px) {
  .code-source pre {
    tab-size: 2;
  }
}

@media screen and (max-width: 700px) {
  .code-source {
    font-size: 12px;
    line-height: 1.25;
  }
}

.code-source .line {
  display: inline-block;
  padding: 0 16px;
  width: calc(100% + 2 * 16px);
}

.code-source .line-highlighted {
  background-color: #2196F322;
  border-left: 3px solid #2196F3AA;
  padding-left: calc(1rem - 3px);
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
</style>