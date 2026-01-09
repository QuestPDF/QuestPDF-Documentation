<script setup lang="ts">

import codeFirstApproach from './codeExamples/codeFirstApproach.cs?raw';
import HomePageCodeContainer from "./HomePageCodeContainer.vue";

const features = [
  {
    icon: "fa-duotone fa-code",
    title: "Dynamic Content Is Just Code",
    description: "Use your existing programming language and patterns to ship faster with less training. Loops, conditionals, functions are natively supported. Leverage IntelliSense, inspections, navigation, and safe refactoring."
  },
  {
    icon: "fa-duotone fa-code-pull-request",
    title: "Version Control Friendly",
    description: "Review document changes like any other code. Get clean diffs, PR approvals, and traceable history."
  },
  {
    icon: "fa-duotone fa-sparkles",
    title: "Ready for AI",
    description: "A semantic Fluent API helps AI assistants generate layouts, refactor components, and troubleshoot issues effectively."
  }
];
</script>

<template>
  <section class="content">
    <div class="section-header">
      <h2>Familiar Programming Patterns</h2>
      <p class="sub-header">Treat documents as application code: strongly-typed models, reusable components, and IDE-assisted refactoring. Catch issues early with compile-time feedback.</p>
    </div>

    <div class="layout">
      <article class="card" v-for="feature of features">
        <i class="icon fa-2xl" :class="[feature.icon]"></i>
        <h3 class="title">{{ feature.title }}</h3>
        <p class="description">{{ feature.description }}</p>
      </article>

      <home-page-code-container
          file-name="InvoiceDocument.cs"
          :code="codeFirstApproach"
          :code-transformer="{
              line(node, line) {
                if (line === 17) this.addClassToHast(node, 'line-removed');
                if (line === 18) this.addClassToHast(node, 'line-added');
              }
            }" />

    </div>
  </section>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  width: 100%;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;
  margin-top: 32px;
  width: 100%;
}

.layout article:first-child {
  grid-column: 1 / span 2;
}

.layout .file-container {
  grid-column: 1 / span 2;
}

@media screen and (max-width: 700px) {
  .layout {
    display: flex;
    flex-direction: column;
  }
}

</style>
