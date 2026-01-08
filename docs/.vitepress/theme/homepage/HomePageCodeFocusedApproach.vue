<script setup lang="ts">

const features = [
  {
    icon: "fa-duotone fa-graduation-cap",
    title: "Zero Markup Learning Curve",
    description: "Skip proprietary XML/HTML template dialects. Use your existing programming language and patterns to ship faster with less training."
  },
  {
    icon: "fa-duotone fa-code",
    title: "Dynamic Content Is Just Code",
    description: "Loops, conditionals, functions are natively supported. Leverage IntelliSense, inspections, navigation, and safe refactoring."
  },
  {
    icon: "fa-duotone fa-code-pull-request",
    title: "Version Control Native",
    description: "Review document changes like any other code. Get clean diffs, PR approvals, and traceable history."
  },
  {
    icon: "fa-duotone fa-sparkles",
    title: "AI-Accelerated Document Delivery",
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


    <div class="features">

      <article class="card" v-for="feature of features">
        <i class="icon fa-2xl" :class="[feature.icon]"></i>
        <h3 class="title">{{ feature.title }}</h3>
        <p class="description">{{ feature.description }}</p>
      </article>

    </div>
  </section>
</template>

<style scoped>

.features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;

  margin-top: 32px;

  max-width: 900px;
  place-self: center;
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
