<script setup lang="ts">
import quickStartExample from './codeExamples/quickStart.cs?raw';
import HomePageCodeContainer from "./HomePageCodeContainer.vue";
import HomePageInstallCommand from "./HomePageInstallCommand.vue";

/* The Quick Start example in the middle, annotated like a margin: on the left what writing the
   document in C# gives you, on the right how an AI assistant fits in, each note on a rail with a
   leader line pointing at the code. The page the code renders sits under the right-hand notes. */

interface Note {
  title: string;
  description: string;
}

const codeNotes: Note[] = [
  {
    title: "Write familiar C#",
    description: "Use the language and patterns you already know, without learning a separate template language."
  },
  {
    title: "Let your data shape the document",
    description: "Use loops, conditions, and expressions to adapt content and styling to your data."
  },
  {
    title: "Build once. Reuse everywhere.",
    description: "Turn headers, tables, and entire sections into reusable components shared across documents."
  },
  {
    title: "Let your IDE do more",
    description: "Write and maintain layouts with IntelliSense, type checking, navigation, and automated refactoring."
  },
  {
    title: "Review every change",
    description: "Keep document layouts in Git, with readable diffs, pull requests, and a complete change history."
  }
];

const agentNotes: Note[] = [
  {
    title: "Describe it. Start building.",
    description: "Ask your AI assistant to turn document requirements into editable C# layouts."
  },
  {
    title: "Build on your existing code",
    description: "Give your assistant your data models and shared components to create documents that fit your application."
  },
  {
    title: "Refine through conversation",
    description: "Ask your assistant to adjust layouts, add conditional content, or extract reusable components."
  }
];
</script>

<template>
  <section class="content">
    <div class="panel quick-start-panel">
      <!-- heading and lead on the left, the install command on the right -->
      <div class="panel-head">
        <div class="lead">
          <h2 class="card-title">Write the document in C#</h2>
          <p class="card-description">
            A document is a method that lays out your data. Everything you know about writing software applies,
            whether you write the code yourself or with an AI assistant.
          </p>
        </div>

        <home-page-install-command />
      </div>

      <div class="quick-start-body">
        <!-- the left margin: notes on writing the document by hand, rails facing the code -->
        <div class="notes notes-code" aria-label="Writing documents in C#">
          <div class="notes-label">Write it yourself</div>

          <article v-for="note of codeNotes" :key="note.title" class="note">
            <h3 class="row-title">{{ note.title }}</h3>
            <p class="row-description">{{ note.description }}</p>
          </article>
        </div>

        <div class="stage">
          <home-page-code-container file-name="Program.cs" :code="quickStartExample" />
        </div>

        <!-- the right margin: notes on working with an AI assistant, then the rendered page -->
        <div class="notes notes-agent" aria-label="Writing documents with an AI assistant">
          <div class="notes-label">With an AI assistant</div>

          <article v-for="note of agentNotes" :key="note.title" class="note">
            <h3 class="row-title">{{ note.title }}</h3>
            <p class="row-description">{{ note.description }}</p>
          </article>

          <figure class="document">
            <img src="/minimal-api.png" alt="The generated PDF page: a blue 'Hello PDF!' heading, a paragraph of text, a placeholder image and a page number in the footer" />
            <figcaption>hello.pdf</figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0px;
}

.quick-start-panel {
  width: 100%;
  padding: 48px;
}


/* Head: the heading and its lead on the left, the install chip on the right */

.panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px;
}

.lead {
  max-width: 720px;
}


/* Body: a margin of notes on each side of the code window. The margins stretch to the window's
   height; the left one spreads its notes along the code, the right one keeps its notes at the top
   and the rendered page at the bottom. */

.quick-start-body {
  --notes-gap: 24px;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr) 240px;
  column-gap: var(--notes-gap);
  align-items: stretch;
  margin-top: 32px;
}

.stage {
  min-width: 0;
}

.stage :deep(.file-container) {
  height: fit-content;
}

.stage :deep(.code-source) {
  font-size: 13px;
}

.notes {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.notes-code {
  justify-content: space-between;
}

/* a small label at the head of each margin, level with the window's title bar */
.notes-label {
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.notes-code .notes-label {
  text-align: right;
  padding-right: 18px;
}

.notes-agent .notes-label {
  padding-left: 18px;
}

/* a note: a rail on the side facing the code, with a leader line across the gap to the window */
.note {
  position: relative;
  padding: 2px 0 2px 16px;
  border-left: 2px solid var(--vp-c-divider);
}

.note::before {
  content: "";
  position: absolute;
  top: 10px;
  left: calc(-1 * var(--notes-gap) - 2px);
  width: var(--notes-gap);
  height: 2px;
  background-color: var(--vp-c-divider);
}

.notes-code .note {
  padding: 2px 16px 2px 0;
  border-left: none;
  border-right: 2px solid var(--vp-c-divider);
  text-align: right;
}

.notes-code .note::before {
  left: auto;
  right: calc(-1 * var(--notes-gap) - 2px);
}

.note .row-title {
  font-size: 0.9375rem;
  line-height: 1.25rem;
}

.custom-page.home-page .note .row-description,
.note .row-description {
  margin-top: 2px;
  font-size: 0.875rem;
  line-height: 1.25rem;
}


/* The rendered page, at the foot of the right margin */

.document {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: auto 0 0;
  padding-top: 24px;
}

.document img {
  display: block;
  width: 240px;
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
  font-size: 1rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}


/* Below this width the margins no longer fit beside the code: the window goes first, the two groups
   of notes sit side by side under it, rails on the left and no leader lines */
@media screen and (max-width: 1280px) {
  .quick-start-body {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 32px;
    row-gap: 40px;
  }

  .stage {
    grid-column: 1 / -1;
    grid-row: 1;
  }

  .notes,
  .notes-code {
    justify-content: flex-start;
    gap: 20px;
  }

  .note::before,
  .notes-code .note::before {
    display: none;
  }

  .notes-code .note {
    padding: 2px 0 2px 16px;
    border-left: 2px solid var(--vp-c-divider);
    border-right: none;
    text-align: left;
  }

  .notes-code .notes-label {
    text-align: left;
    padding: 0 0 0 18px;
  }

  .document {
    align-items: flex-start;
    padding-left: 18px;
  }
}

@media screen and (max-width: 760px) {
  .panel-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .quick-start-body {
    grid-template-columns: minmax(0, 1fr);
  }

  .stage {
    grid-column: 1;
  }
}

@media screen and (max-width: 700px) {
  .quick-start-panel {
    padding: 32px 24px;
  }
}

</style>
