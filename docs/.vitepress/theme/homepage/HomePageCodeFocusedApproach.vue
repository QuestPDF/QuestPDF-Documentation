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

const features = [
  {
    icon: "homepage/layers.svg",
    title: "Modular and Maintainable C# Code",
    description: "Compose clear, modular PDF layouts with reusable well organized classes and methods. Refactor safely with IntelliSense - your logic stays seamlessly integrated with your domain code."
  },
  {
    icon: "homepage/csharp.svg",
    title: "Familiar Programming Concepts",
    description: "Use conditions, loops, LINQ, and extension methods to effortlessly build dynamic, data-driven PDF documents tailored to your unique business needs."
  },
  {
    icon: "homepage/git.svg",
    title: "Git-Friendly Workflow",
    description: "Enjoy straightforward C# code reviews, meaningful pull-request diffs, and cleaner version control histories."
  }
];

</script>

<template>
  <section class="content">
    <h2>Code-Focused Paradigm</h2>

    <div class="container">
      <div class="features">
        <article class="feature" v-for="feature of features" :key="feature.title">
          <img class="icon" :src="feature.icon" alt="" />
          <h3 class="title">{{ feature.title }}</h3>
          <p class="description">{{ feature.description }}</p>
        </article>
      </div>

      <div class="code-container" v-html="highlightedCode"></div>
    </div>
  </section>
</template>

<style scoped>

.container {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 64px;
  align-content: stretch;
  margin-top: 64px;
}

@media screen and (max-width: 800px) {
  .container {
    grid-template-columns: 1fr;
    grid-gap: 32px;
  }
}

/* Features */

.features {
  display: flex;
  flex-direction: column;
  gap: 64px;
}

@media screen and (max-width: 700px) {
  .features {
    grid-template-columns: 1fr;
    grid-gap: 64px;
  }
}

.feature {
  display: grid;
  grid-template-areas:
      "icon title"
      "icon description";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 8px 24px;
}

@media screen and (max-width: 1000px) {
  .feature {
    grid-template-areas:
      "icon"
      "title"
      "description";
    grid-template-columns: auto;
    grid-template-rows: auto auto auto;
    grid-gap: 12px 0;
  }
}

.feature img.icon {
  grid-area: icon;

  justify-self: start;
  align-self: start;
  height: 48px;
  width: 48px;
}

.feature h3.title {
  grid-area: title;

  margin: 0;
}

.feature p.description {
  grid-area: description;

  justify-self: start;
  align-self: start;
}

</style>
