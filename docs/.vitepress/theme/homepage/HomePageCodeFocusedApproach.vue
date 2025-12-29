<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";

import modularCode from './codeExamples/modularCode.cs?raw';
import familiarConcepts from './codeExamples/familiarConcepts.cs?raw';
import gitFriendlyWorkflow from './codeExamples/gitFriendlyWorkflow.cs?raw';
import typesafeDevelopment from './codeExamples/typesafeDevelopment.cs?raw';

import HomePageCodeContainer from "./HomePageCodeContainer.vue";
import {ShikiTransformer} from "@shikijs/types";

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  code: string;
  fileName: string;
  codeTransformer: ShikiTransformer | null;
}

const features : Feature[] = [
  {
    id: 'reusable',
    icon: "homepage/puzzle.svg",
    title: "Reusable Components",
    description: "Extract common elements into methods. Compose complex layouts from simple, testable building blocks.",
    code: modularCode,
    fileName: 'Header.cs',
    codeTransformer: {
      line(node, line) {
        if (line == 2)
          this.addClassToHast(node, 'line-removed')

        if (line == 4)
          this.addClassToHast(node, 'line-added')
      }
    }
  },
  {
    id: 'dynamic',
    icon: "homepage/csharp.svg",
    title: "Dynamic Content",
    description: "Use loops, conditions, and LINQ to generate data-driven documents. No templating language to learn.",
    code: familiarConcepts,
    fileName: 'Table.cs',
    codeTransformer: null
  },
  {
    id: 'vcs',
    icon: "homepage/git.svg",
    title: "Version Control Ready",
    description: "Review changes with meaningful diffs. Track document evolution alongside your application code.",
    code: gitFriendlyWorkflow,
    fileName: 'Item.cs',
    codeTransformer: null
  },
  // {
  //   id: 'typesafe',
  //   icon: "homepage/engine.svg",
  //   title: "Type-Safe Development",
  //   description: "Catch errors at compile time. Enjoy IntelliSense, refactoring support, and confident code navigation.",
  //   code: typesafeDevelopment,
  //   fileName: 'Invoice.cs',
  //   lineTransformer(context: ShikiTransformerContext, node: Element, line: number) {
  //
  //   }
  // },
  // {
  //   id: 'ai-tools',
  //   icon: "homepage/artificial-intelligence.svg",
  //   title: "Plays well with AI tools",
  //   description: "Easily integrate with AI code generation tools. Generate and refine document layouts using natural language prompts.",
  //   code: typesafeDevelopment,
  //   fileName: 'Invoice.cs',
  //   lineTransformer(context: ShikiTransformerContext, node: Element, line: number) {
  //
  //   }
  // }
];

const currentFeatureId = ref<string>(features[0].id);

const codeBlock = ref<HTMLElement>();
const featureCards = ref<HTMLElement[]>();


const currentFeature = computed(() => features.find(feature => feature.id === currentFeatureId.value));


function updateActiveCard() {
  const codeBlockRect = codeBlock.value.getBoundingClientRect();
  const codeBlockCenter = codeBlockRect.top + (codeBlockRect.height / 2);

  let closestCard = null;
  let minDistance = Infinity;

  featureCards.value.forEach(card => {
    const cardRect = card.getBoundingClientRect();
    const cardCenterY = cardRect.top + (cardRect.height / 2);

    const distance = Math.abs(cardCenterY - codeBlockCenter);

    if (distance < minDistance) {
      minDistance = distance;
      closestCard = card;
    }
  });

  currentFeatureId.value = closestCard?.getAttribute('feature-id');
}

document.addEventListener('scroll', () => requestAnimationFrame(updateActiveCard));

</script>

<template>
  <section class="content">
    <div class="section-header">
      <h2>Code-First Approach</h2>
      <p class="sub-header">Write PDF layouts as clean, readable C# code. No XML templates, no designers — just the programming patterns you already know.</p>
    </div>

    <div class="container">
      <div class="features">
        <article
            ref="featureCards"
            class="feature"
            v-for="feature of features"
            :key="feature.title"
            :class="{ 'active': currentFeatureId === feature.id }"
            :feature-id="feature.id">
<!--          <img class="icon" :src="feature.icon" alt="" />-->
          <h3 class="title">{{ feature.title }}</h3>
          <p class="description">{{ feature.description }}</p>
        </article>
      </div>

      <div ref="codeBlock" style="position: sticky; top: 200px; height: fit-content;">
        <home-page-code-container v-if="currentFeature" file-name="Example.cs" :code="currentFeature.code" :code-transformer="currentFeature.codeTransformer" />
      </div>
    </div>
  </section>
</template>

<style scoped>

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;
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
  gap: 32px;
}

@media screen and (max-width: 700px) {
  .features {
    grid-template-columns: 1fr;
    grid-gap: 48px;
  }
}

.feature {
  display: flex;
  flex-direction: column;

  border: 1px solid #8882;
  border-radius: 12px;
  padding: 32px;

  transition: all 250ms ease-in-out;
}

.feature.active {
  background-color: var(--vp-c-bg);
  border: 1px solid #0004;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.feature:not(.active) * {
  opacity: 0.25;
  filter: grayscale(1);
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

.feature h3 {
  margin-top: 0;
}

.feature img.icon {
  justify-self: start;
  align-self: start;
  width: 48px;
}

.feature p.description {
  justify-self: start;
  align-self: start;
}

</style>
