<script setup lang="ts">
import { getSingletonHighlighter } from 'shiki';
import darkPlus from 'shiki/themes/dark-plus.mjs';
import lightPlus from 'shiki/themes/light-plus.mjs';
import csharp from 'shiki/langs/csharp.mjs';
import {onMounted, ref, watch} from "vue";
import {useData} from "vitepress";
import documentOperationCode from './documentOperationCodeExample.cs?raw';

const { isDark } = useData()
const highlightedCode = ref('');

async function highlightCode() {
    const highlighter = await getSingletonHighlighter({
        themes: [ darkPlus, lightPlus ],
        langs: [ csharp ]
    });

    highlightedCode.value =  highlighter.codeToHtml(documentOperationCode, {
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

@media screen and (max-width: 700px) {
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

/* Code Block */

.code-container {
  background-color: #FFFFFF; /* from shiki light-plus */
  font-size: 14px;

  border-radius: 12px;
  overflow: hidden;

  filter: drop-shadow(0 16px 16px rgba(0,  0, 0, 0.1));
}

html.dark .code-container {
  background-color: #1E1E1E; /* from shiki dark-plus */
}

/* Summary */

.summary-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 16px;
}

.summary-item {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 12px;
  align-items: center;
}

</style>

<style>

.code-container .line {
  display: inline-block;
  padding: 0 16px;
  width: 100%;
}

</style>