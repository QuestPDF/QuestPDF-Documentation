<script setup lang="ts">
import modularCode from './codeExamples/modularCode.cs?raw';
import familiarConcepts from './codeExamples/familiarConcepts.cs?raw';
import gitFriendlyWorkflow from './codeExamples/gitFriendlyWorkflow.cs?raw';
import typesafeDevelopment from './codeExamples/typesafeDevelopment.cs?raw';

import HomePageCodeContainer from "./HomePageCodeContainer.vue";
import { ShikiTransformer } from "@shikijs/types";

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  code: string;
  fileName: string;
  codeTransformer: ShikiTransformer | null;
}

const features: Feature[] = [
  {
    id: 'reusable',
    icon: "fa-duotone fa-cubes",
    title: "Reusable Components",
    description: "Extract common elements into methods. Compose complex layouts from simple, testable building blocks that can be shared across documents.",
    code: modularCode,
    fileName: 'Header.cs',
    codeTransformer: null
  },
  {
    id: 'dynamic',
    icon: "fa-duotone fa-code",
    title: "Dynamic Content",
    description: "Use loops, conditions, and LINQ to generate data-driven documents. No proprietary templating language — just familiar C# patterns.",
    code: familiarConcepts,
    fileName: 'Table.cs',
    codeTransformer: null
  },
  {
    id: 'vcs',
    icon: "fa-duotone fa-code-branch",
    title: "Version Control Ready",
    description: "Review changes with meaningful diffs. Track document evolution alongside your application code using standard Git workflows.",
    code: gitFriendlyWorkflow,
    fileName: 'Item.cs',
    codeTransformer: {
      line(node, line) {
        if (line == 3)
          this.addClassToHast(node, 'line-removed')
        if (line == 4)
          this.addClassToHast(node, 'line-added')
      }
    }
  },
  {
    id: 'typesafe',
    icon: "fa-duotone fa-shield-check",
    title: "Type-Safe Development",
    description: "Catch errors at compile time. Enjoy full IntelliSense, refactoring support, and confident code navigation in your IDE.",
    code: typesafeDevelopment,
    fileName: 'Invoice.cs',
    codeTransformer: {
      line(node, line) {
        if (line == 3)
          this.addClassToHast(node, 'line-removed')
        if (line == 4)
          this.addClassToHast(node, 'line-added')
      }
    }
  }
];

</script>

<template>
  <section class="content">
    <div class="section-header">
      <h2>Code-First Approach</h2>
      <p class="sub-header">Write PDF layouts as clean, readable C# code. No XML templates, no visual designers — just the programming patterns you already know.</p>
    </div>

    <div class="approaches-list">
      <template v-for="(feature, index) in features" :key="feature.id">

        <article class="approach-item" :class="{ 'reverse': index % 2 === 1 }">

          <div class="approach-info">
            <div class="approach-info-container">
              <i class="fa-2xl" :class="[feature.icon]"></i>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
            </div>
          </div>

          <div class="approach-code">
            <home-page-code-container
                :file-name="feature.fileName"
                :code="feature.code"
                :code-transformer="feature.codeTransformer" />
          </div>
        </article>

        <hr v-if="index < features.length - 1">
      </template>
    </div>
  </section>
</template>

<style scoped>


.approaches-list {
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin-top: 56px;
}

.approaches-list hr {
  width: 80%;
  border: none;
  height: 1px;
  background: var(--vp-c-divider);
}

.approach-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-areas: "info code";
  gap: 64px;
}

.approach-info {
  grid-area: info;

  display: flex;
  flex-direction: column;

  justify-content: center;
}

.approach-info h3 {
  margin: 24px 0 8px;
}

.approach-info-container {
  max-width: 400px;
}

.approach-code {
  grid-area: code;
}

@media screen and (min-width: 900px) {
  .approach-item.reverse {
    grid-template-areas: "code info";
  }

  .approach-item:not(.reverse) .approach-info {
    align-items: end;
    text-align: end;
  }
}

@media screen and (max-width: 900px) {
  .approach-item {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto auto;
    grid-template-areas: "info" "code";
    gap: 24px;
  }
}

</style>
