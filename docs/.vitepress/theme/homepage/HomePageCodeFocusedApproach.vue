<script setup lang="ts">
import {ref} from "vue";

import HomePageCodeContainer from "./HomePageCodeContainer.vue";
import familiarProgrammingConcepts from './codeExamples/familiarProgrammingConcepts.cs?raw';
import versionControlReady from './codeExamples/versionControlReady.cs?raw';
import HomePageCodeAnimation from "./HomePageCodeAnimation.vue";

const showCodeAnimation = ref(false);


const features = [
  {
    icon: "fa-duotone fa-graduation-cap",
    title: "Zero Learning Curve",
    description: "Skip the documentation for proprietary XML or HTML schemas. Describe layouts using the programming language and standard libraries you already use every day."
  },
  {
    icon: "fa-duotone fa-brackets-curly",
    title: "Native Flow Control",
    description: "Dynamic content isn't a special feature—it's just code. Use standard loops for lists and conditionals for visibility logic, eliminating the need for complex templating syntax."
  },
  {
    icon: "fa-duotone fa-cubes-stacked",
    title: "Composable Architecture",
    description: "Keep your codebase DRY. Encapsulate complex UI patterns into reusable classes and functions to maintain visual consistency across all your documents."
  },
  // {
  //     icon: "fa-duotone fa-sparkles",
  //     title: "Optimized for AI Assistance",
  //     description: "A semantic Fluent API helps AI tools understand intent - accelerating layout creation while keeping output aligned with your standards and patterns."
  // },
  // {
  //   icon: "fa-duotone fa-code-pull-request", // or fa-code-commit
  //   title: "Version Control Native",
  //   description: "Treat documents like software. Track layout changes with clean, semantic diffs and review PDF modifications in your Pull Requests just like backend logic."
  // },
  // {
  //   icon: "fa-duotone fa-wand-magic-sparkles",
  //   title: "Type-Safe Tooling",
  //   description: "Your IDE is your best design tool. Catch layout errors at compile-time and rely on IntelliSense, inspection, and safe refactoring to build with confidence."
  // },
  // {
  //   icon: "fa-duotone fa-microchip-ai", // or fa-robot
  //   title: "AI-Ready Workflow",
  //   description: "Code is the native language of AI. coding assistants can generate tables, refactor components, and troubleshoot layouts far more effectively than with visual designers."
  // }
];
</script>

<template>
  <section class="content">
    <div class="section-header">
      <i class="fa-duotone fa-code fa-2xl" />
      <h2>Familiar Programming Patterns</h2>
      <p class="sub-header">Treat documents as application code: strongly-typed models, reusable components, and IDE-assisted refactoring. Catch issues early with compile-time feedback.</p>
    </div>


    <div class="features">

      <article class="card" v-for="feature of features">
        <i class="icon fa-2xl" :class="[feature.icon]"></i>
        <h3 class="title">{{ feature.title }}</h3>
        <p class="description">{{ feature.description }}</p>
      </article>

    </div>

<!--    <article>-->
<!--      <div class="section-header">-->
<!--        <i class="fa-duotone fa-code fa-2xl" />-->
<!--        <h2>Familiar Programming Patterns</h2>-->
<!--        <p class="sub-header">Treat documents as application code: strongly-typed models, reusable components, and IDE-assisted refactoring. Catch issues early with compile-time feedback.</p>-->
<!--      </div>-->

<!--      <div class="code-example">-->
<!--        <home-page-code-container-->
<!--            file-name="OrderDocument.cs"-->
<!--            :code="familiarProgrammingConcepts" />-->
<!--      </div>-->
<!--    </article>-->

<!--    <article>-->
<!--      <div class="section-header">-->
<!--        <i class="fa-duotone fa-code-branch fa-2xl" />-->
<!--        <h2>Version Control Ready</h2>-->
<!--        <p class="sub-header">Make changes safely and transparently. Git-friendly diffs support code reviews, approvals, and long-term maintainability—without fragile templates.</p>-->
<!--      </div>-->

<!--      <div class="code-example">-->
<!--        <home-page-code-container-->
<!--            file-name="OrderDocument.cs"-->
<!--            :code="versionControlReady"-->
<!--            :code-transformer="{-->
<!--              line(node, line) {-->
<!--                if (line === 9) this.addClassToHast(node, 'line-removed');-->
<!--                if (line === 10) this.addClassToHast(node, 'line-added');-->
<!--              }-->
<!--            }" />-->
<!--      </div>-->
<!--    </article>-->
  </section>
</template>

<style scoped>

.code-example {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
}






.features {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 32px;

  margin-top: 32px;
}

@media screen and (max-width: 1100px) {
  .features {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 700px) {
  .features {
    grid-template-columns: 1fr;
  }
}

</style>
