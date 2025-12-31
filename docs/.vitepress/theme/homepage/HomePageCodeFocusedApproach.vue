<script setup lang="ts">
import HomePageCodeContainer from "./HomePageCodeContainer.vue";
import codeFocusedApproach from './codeExamples/codeFocusedApproach.cs?raw';

const features = [
  {
    icon: "fa-regular fa-code",
    title: "Familiar Programming Patterns",
    description: "Move beyond scripting. Leverage C# control structures, strict typing, and component-based architecture to build complex, dynamic layouts that scale."
  },
  {
    icon: "fa-regular fa-cubes",
    title: "Full IDE Support",
    description: "Catch errors at compile time, not runtime. Benefit from full IntelliSense support, easier refactoring, and seamless code navigation."
  },
  {
    icon: "fa-regular fa-code-branch",
    title: "Version Control Ready",
    description: "Stop struggling with binary files or minified HTML. Get clean, semantic diffs in Git, making code reviews and history tracking effortless for your team."
  },
  {
    icon: "fa-regular fa-sparkles",
    title: "Optimized for AI Assistance",
    description: "The concise, semantic Fluent API provides perfect context for AI assistance tools to generate accurate, functional layouts instantly."
  }
];

</script>

<template>
  <section class="content">
    <div class="section-header">
      <h2>A True Code-First Architecture</h2>
      <p class="sub-header">Treat your documents as first-class application code. Replace fragile templates with strongly-typed, maintainable, and refactor-safe C#.</p>
    </div>

    <div class="approach-container">
      <div class="features-list">
        <article v-for="feature in features" :key="feature.title" class="card feature-card">

          <h3 class="title"><i :class="[feature.icon]"></i> {{ feature.title }}</h3>
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
    </div>
  </section>
</template>

<style scoped>

.approach-container {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
  gap: 64px;
  margin-top: 56px;
  align-items: center;
}

.features-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.title {
  margin: 0 0 16px 0;
}

.title i {
  margin-right: 12px
}

.code-example {
  min-width: 0;
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
