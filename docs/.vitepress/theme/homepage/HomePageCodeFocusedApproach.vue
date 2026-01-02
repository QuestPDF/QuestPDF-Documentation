<script setup lang="ts">
import HomePageCodeContainer from "./HomePageCodeContainer.vue";
import codeFocusedApproach from './codeExamples/codeFocusedApproach.cs?raw';

const features = [
  {
    icon: "fa-duotone fa-code",
    title: "Familiar Programming Patterns",
    description:
        "Treat documents as application code: strongly-typed models, reusable components, and IDE-assisted refactoring. Catch issues early with compile-time feedback."
  },
  {
    icon: "fa-duotone fa-code-branch",
    title: "Version Control Ready",
    description:
        "Make changes safely and transparently. Git-friendly diffs support code reviews, approvals, and long-term maintainability—without fragile templates."
  },
  {
    icon: "fa-duotone fa-sparkles",
    title: "Optimized for AI Assistance",
    description:
        "A semantic Fluent API helps AI tools understand intent - accelerating layout creation while keeping output aligned with your standards and patterns."
  }
];

</script>

<template>
  <section class="content">
    <div class="section-header">
      <h2>A True Code-First Architecture</h2>
      <p class="sub-header">Treat your documents as first-class application code. Replace fragile templates with strongly-typed, maintainable, and refactor-safe C#.</p>
    </div>

    <div class="features-list">
      <article v-for="feature in features" :key="feature.title" class="card">
        <i class="icon fa-2xl" :class="[feature.icon]"></i>
        <h3 class="title"> {{ feature.title }}</h3>
        <p class="description">{{ feature.description }}</p>
      </article>
    </div>

    <div class="code-example">
      <home-page-code-container
          file-name="OrderDocument.cs"
          :code="codeFocusedApproach"
          :code-transformer="{
              line(node, line) {
                if (line === 25) this.addClassToHast(node, 'line-removed');
                if (line === 26) this.addClassToHast(node, 'line-added');
              }
            }" />
    </div>
  </section>
</template>

<style scoped>

.features-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
  margin-top: 64px;
}

.code-example {
  margin-top: 32px;
  width: fit-content;
  place-self: center;
}

@media screen and (max-width: 1100px) {
  .approach-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .features-list {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 600px) {
  .features-list {
    grid-template-columns: 1fr;
  }
}

</style>
