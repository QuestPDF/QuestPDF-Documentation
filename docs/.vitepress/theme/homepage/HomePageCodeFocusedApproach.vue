<script setup lang="ts">
import HomePageCodeContainer from "./HomePageCodeContainer.vue";
import familiarProgrammingConcepts from './codeExamples/familiarProgrammingConcepts.cs?raw';
import versionControlReady from './codeExamples/versionControlReady.cs?raw';
</script>

<template>
  <section class="content">
    <div class="section-header">
      <i class="fa-duotone fa-code fa-2xl" />
      <h2>Familiar Programming Patterns</h2>
      <p class="sub-header">Treat documents as application code: strongly-typed models, reusable components, and IDE-assisted refactoring. Catch issues early with compile-time feedback.</p>
    </div>

    <div class="code-example">
      <home-page-code-container
          file-name="OrderDocument.cs"
          :code="familiarProgrammingConcepts"
          :code-transformer="{
              line(node, line) {
                if (line === 26) this.addClassToHast(node, 'line-removed');
                if (line === 27) this.addClassToHast(node, 'line-added');
              }
            }" />
    </div>

    <div class="section-header" style="margin-top: 128px;">
      <i class="fa-duotone fa-code-branch fa-2xl" />
      <h2>Version Control Ready</h2>
      <p class="sub-header">Make changes safely and transparently. Git-friendly diffs support code reviews, approvals, and long-term maintainability—without fragile templates.</p>
    </div>

    <div class="code-example">
      <home-page-code-container
          file-name="OrderDocument.cs"
          :code="versionControlReady"
          :code-transformer="{
              line(node, line) {
                if (line === 9) this.addClassToHast(node, 'line-removed');
                if (line === 10) this.addClassToHast(node, 'line-added');
              }
            }" />
    </div>
  </section>
</template>

<style scoped>

.code-example {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 32px;
}

.code-example > * {
  width: fit-content;
  max-width: 100%;
}

</style>
