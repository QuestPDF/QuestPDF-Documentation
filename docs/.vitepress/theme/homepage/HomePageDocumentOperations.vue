<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useData} from "vitepress";
import documentOperationCode from './documentOperationCodeExample.cs?raw';
import createCodeHighlighter from "./createCodeHighlighter";

const { isDark } = useData()
const highlightedCode = ref('');

async function highlightCode() {
  const codeHighlighter = await createCodeHighlighter();

    highlightedCode.value =  codeHighlighter.codeToHtml(documentOperationCode, {
        lang: 'csharp',
        theme: isDark.value ? 'dark-plus' :'light-plus'
    })
}

watch(isDark, highlightCode);
onMounted(highlightCode);

const SummaryContent = [
    "Merge documents",
    "Attach files",
    "Extract pages",
    "Encrypt / decrypt",
    "Extend metadata",
    "Limit access",
    "Optimize for Web",
    "Overlay / underlay"
]

</script>

<template>
  <section class="content">
    <div class="description">
      <h2>Perform common PDF operations</h2>

      <p class="sub-header">Leverage a powerful C# Fluent API to create, customize, and manage your PDF documents with ease.</p>

      <div class="summary-list">
        <article v-for="summary of SummaryContent" class="summary-item">
          <img src="/homepage/tick.svg" width="20" alt="" />
          <p>{{ summary }}</p>
        </article>
      </div>

      <a class="action" href="/concepts/document-operations">Read more</a>
    </div>

    <div class="code-container" v-html="highlightedCode"></div>
  </section>
</template>

<style scoped>

.content {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 64px;
  align-content: stretch;
}

@media screen and (max-width: 800px) {
  .content {
    grid-template-columns: 1fr;
    grid-gap: 32px;
  }
}

.description {
  align-self: center;
  justify-self: start;
  display: flex;
  flex-direction: column;
}

.action {
  align-self: start;
  margin-top: 32px;
}

/* Summary */

.summary-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  grid-gap: 16px;
}

.summary-item {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 12px;
  align-items: center;
}

</style>
