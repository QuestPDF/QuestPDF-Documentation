<script setup lang="ts">
import createCodeHighlighter from './createCodeHighlighter'
import {onMounted, ref, watch} from "vue";
import {useData} from "vitepress";
import codeOrganization from './organizationCodeExample.cs?raw';

const { isDark } = useData()
const highlightedCode = ref('');

async function highlightCode() {
  const codeHighlighter = await createCodeHighlighter();

  highlightedCode.value = codeHighlighter.codeToHtml(codeOrganization, {
    lang: 'csharp',
    theme: isDark.value ? 'dark-plus' :'light-plus',
    transformers: [
      {
        line(node, line) {
          if (line == 13)
            this.addClassToHast(node, 'line-removed')

          if (line == 14)
            this.addClassToHast(node, 'line-added')
        }
      }
    ]
  })
}

watch(isDark, highlightCode);
onMounted(highlightCode);

</script>

<template>
  <section class="content">
    <div class="description">
      <h2>Code-Focused Paradigm</h2>

      <p class="sub-header">
        Using C# to design PDF documents leverages powerful control structures like if-statements, for-loops, and methods, enabling dynamic and highly customizable content generation.
      </p>

      <p class="sub-header">
        It promotes best practices such as modular design and reusability while seamlessly integrating with source control systems for collaboration and versioning.
      </p>
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

</style>
