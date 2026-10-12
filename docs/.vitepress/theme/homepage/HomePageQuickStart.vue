<script setup lang="ts">
import { ref } from "vue";
import quickStartExample from './codeExamples/quickStart.cs?raw';
import HomePageCodeContainer from "./HomePageCodeContainer.vue";

/* the complete Quick Start example and the page it produces, next to the reasons documents as code pay off */

const installCommand = "dotnet add package QuestPDF";
const copied = ref(false);

async function copyInstallCommand() {
  try {
    await navigator.clipboard.writeText(installCommand);
    copied.value = true;
    setTimeout(() => copied.value = false, 2000);
  } catch {
    /* clipboard access denied: the command is plain text, so it can still be selected and copied */
  }
}

const points = [
  {
    icon: "fa-code",
    title: "Dynamic Content Is Just Code",
    description: "Use your existing programming language and patterns to ship faster with less training. Loops, conditionals, functions are natively supported. Leverage IntelliSense, inspections, navigation, and safe refactoring."
  },
  {
    icon: "fa-code-pull-request",
    title: "Version Control Friendly",
    description: "Review document changes like any other code. Get clean diffs, PR approvals, and traceable history."
  },
  {
    icon: "fa-cubes",
    title: "Reusable Components",
    description: "Split a document into small, composable pieces. Package headers, tables and sections as classes, then share them across documents and projects."
  },
  {
    icon: "fa-sparkles",
    title: "Ready for AI",
    description: "A semantic Fluent API helps AI assistants generate layouts, refactor components, and troubleshoot issues effectively."
  }
];
</script>

<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Quick start</div>
      <h2>From a few lines of code to a finished PDF</h2>
      <p class="sub-header">
        This is the complete example from the Quick Start guide, together with the page it produces.
        Documents are plain C#, so everything you know about writing software applies.
      </p>
    </div>

    <!-- the pitch on the left: the install command, a hairline, then why documents as code pay off;
         the artifacts on the right: the code window with the generated page overlapping its corner -->
    <div class="panel quick-start-panel">
      <div class="pitch">
        <button type="button" class="install" :class="{ copied }" :title="copied ? 'Copied' : 'Copy to clipboard'" @click="copyInstallCommand">
          <span class="install-label">Install</span>
          <code class="install-command"><span class="prompt">$</span> {{ installCommand }}</code>
          <i class="fa-regular" :class="copied ? 'fa-check' : 'fa-copy'"></i>
        </button>

        <div class="divider" aria-hidden="true"></div>

        <article v-for="point of points" :key="point.title" class="point">
          <div class="point-icon">
            <i class="fa-regular" :class="[point.icon]"></i>
          </div>

          <div class="point-body">
            <h3 class="point-title">{{ point.title }}</h3>
            <p class="point-description">{{ point.description }}</p>
          </div>
        </article>
      </div>

      <div class="stage">
        <home-page-code-container file-name="Program.cs" :code="quickStartExample" />

        <figure class="document">
          <img src="/minimal-api.png" alt="The generated PDF page: a blue 'Hello PDF!' heading, a paragraph of text, a placeholder image and a page number in the footer" />
          <figcaption>hello.pdf</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}


/* Panel: the pitch takes a third, the artifacts the rest; both aligned to the top edge */

.quick-start-panel {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
  column-gap: 56px;
  align-items: start;
  width: 100%;
  margin-top: 48px;
  padding: 56px;
}


/* Pitch */

.pitch {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 28px;
}

/* the install command as a chip that copies itself */
.install {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  max-width: 100%;
  padding: 12px 20px 12px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--home-surface-inner);
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.install:hover {
  border-color: var(--vp-c-brand-2);
}

.install-label {
  flex: 0 0 auto;
  padding: 4px 10px;
  border-radius: 8px;
  background-color: color-mix(in srgb, var(--vp-c-brand-2), transparent 85%);
  color: var(--vp-c-brand-1);
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  text-transform: uppercase;
}

.install-command {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.install-command .prompt {
  color: var(--vp-c-text-3);
}

.install i {
  flex: 0 0 auto;
  width: 20px;
  font-size: 20px;
  color: var(--vp-c-text-3);
}

.install.copied i {
  color: #4CAF50;
}

/* a hairline between the install command and the points */
.divider {
  align-self: stretch;
  height: 1px;
  background-color: var(--vp-c-divider);
}

/* the points: an icon tile with the title and description beside it */
.point {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  column-gap: 16px;
  align-items: start;
}

.point-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: var(--home-surface-inner);
}

.point-icon i {
  font-size: 1.25rem;
  color: var(--vp-c-text-1);
}

.point-title {
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.point-description {
  margin: 6px 0 0;
  font-size: 0.9375rem;
  line-height: 1.375rem;
  color: var(--vp-c-text-2);
}


/* Stage: the code window, with room on the right and below for the page to overlap its corner */

.stage {
  position: relative;
  min-width: 0;
  padding: 0 120px 48px 0;
}

.stage :deep(.file-container) {
  height: fit-content;
}

.document {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 0;
}

.document img {
  display: block;
  width: 260px;
  max-width: 100%;
  height: auto;

  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  box-shadow:
      0 8px 12px -2px rgba(0, 0, 0, 0.12),
      0 16px 24px -4px rgba(0, 0, 0, 0.12),
      0 24px 32px -8px rgba(0, 0, 0, 0.12);
}

/* the page is white, so it is toned down on the dark canvas */
html.dark .document img {
  opacity: 0.85;
  box-shadow:
      0 8px 12px -2px rgba(0, 0, 0, 0.4),
      0 16px 24px -4px rgba(0, 0, 0, 0.4),
      0 24px 32px -8px rgba(0, 0, 0, 0.4);
}

.document figcaption {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}


/* Below this width the pitch and the artifacts stack (the same point where the bento stacks) */
@media screen and (max-width: 1280px) {
  .quick-start-panel {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 48px;
    padding: 48px;
  }

  .pitch {
    max-width: 640px;
  }
}

/* Below this width the code window would scroll under the page, so the page sits beneath it instead */
@media screen and (max-width: 1000px) {
  .stage {
    padding: 0;
  }

  .document {
    position: static;
    margin-top: 24px;
  }
}

@media screen and (max-width: 700px) {
  .quick-start-panel {
    padding: 32px 24px;
  }

  .install-label {
    display: none;
  }
}

</style>
