<script setup lang="ts">
import { ref } from "vue";
import { faCheck, faCopy } from "@fortawesome/pro-regular-svg-icons";
import Icon from "../Icon.vue";
import { data as usage } from "./usage.data";

/* the copied block shows a tick for a moment */
const copied = ref<string>();
let timer: ReturnType<typeof setTimeout> | undefined;

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    return;
  }

  copied.value = text;
  clearTimeout(timer);
  timer = setTimeout(() => copied.value = undefined, 1500);
}
</script>

<template>
  <section id="getting-started" class="usage">
    <header class="section-header">
      <h2>Getting started</h2>
    </header>

    <div class="panel steps">
      <article class="step">
        <div class="step-heading">
          <span class="number" aria-hidden="true">1</span>
          <h3 class="card-title">Preview your document</h3>
        </div>

        <p class="card-description">Replace <code>GeneratePdf()</code> with <code>ShowInCompanion()</code>. Instead of saving a file, QuestPDF opens the Companion App for you, connects to it and shows your document.</p>

        <div class="code-block sample">
          <pre class="shiki" tabindex="0"><code v-html="usage.sample.html"></code></pre>
          <button type="button" class="copy" :class="{ done: copied === usage.sample.text }" aria-label="Copy the code" @click="copy(usage.sample.text)">
            <Icon :icon="copied === usage.sample.text ? faCheck : faCopy" />
          </button>
        </div>
      </article>

      <article class="step">
        <div class="step-heading">
          <span class="number" aria-hidden="true">2</span>
          <h3 class="card-title">Run with hot reload</h3>
        </div>

        <p class="card-description">Start your project with <code>dotnet watch</code> or your IDE's hot reload. Hot reload applies each code change to the running program without restarting it, and QuestPDF automatically updates the preview.</p>

        <dl class="commands">
          <div v-for="command of usage.commands" :key="command.text">
            <dt>{{ command.label }}</dt>
            <dd class="code-block">
              <pre class="shiki"><code v-html="command.html"></code></pre>
              <button type="button" class="copy" :class="{ done: copied === command.text }" aria-label="Copy the command" @click="copy(command.text)">
                <Icon :icon="copied === command.text ? faCheck : faCopy" />
              </button>
            </dd>
          </div>
        </dl>
      </article>
    </div>

    <span class="visually-hidden" aria-live="polite">{{ copied ? "Copied" : "" }}</span>
  </section>
</template>

<style scoped>
.usage h2 {
  margin: 0 0 40px;
}

/* one card, its two steps side by side with a line between them, as in the homepage's licence card */
.steps {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: 0;
}

.step {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: var(--panel-padding);
}

.step + .step {
  border-left: 1px solid var(--vp-c-divider);
}

/* one above the other once a half is too narrow for the sample's longest line */
@media (max-width: 1199px) {
  .steps {
    grid-template-columns: minmax(0, 1fr);
  }

  .step + .step {
    border-left: none;
    border-top: 1px solid var(--vp-c-divider);
  }
}

.step-heading {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* the primary button's blue, in both themes */
.number {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-weight: 700;
  color: #FFF;
  background-color: #1976D2;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 1px 2px rgba(16, 24, 40, 0.12);
}

.step .card-description {
  margin: 0;
  text-wrap: pretty;
}

/* as inline code in the documentation */
.card-description code {
  border-radius: 4px;
  padding: 3px 6px;
  font-family: var(--vp-font-family-mono);
  font-size: var(--vp-code-font-size);
  color: var(--vp-code-color);
  background-color: var(--vp-code-bg);
}


/* Code as in the homepage's code window: white with a hairline edge in light, on the card's inner surface in dark;
   the copy button in the top right corner */

.code-block {
  position: relative;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background-color: var(--vp-c-bg);
}

html.dark .code-block {
  border-color: transparent;
  background-color: var(--surface-inner);
}

.code-block pre {
  overflow-x: auto;
  border-radius: inherit;
  padding: 14px 56px 14px 20px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

/* the sample scrolls sideways in a narrow card; its copy button sits beside the first lines, which are short */
.sample pre {
  padding: 20px 24px;
}

/* on the narrowest phones the first line reaches the copy button, so the button gets a row of its own */
@media (max-width: 374px) {
  .sample pre {
    padding-top: 52px;
  }
}

.sample code {
  display: block;
  width: fit-content;
  min-width: 100%;
}

/* the replaced line and the new one, marked as the homepage marks an edit, across the block's padding; the red line
   is left out of a selection, as it is of the copy button */
.sample :deep(.removed),
.sample :deep(.added) {
  display: inline-block;
  width: calc(100% + 48px);
  margin-inline: -24px;
  padding-inline-start: 24px;
}

.sample :deep(.removed) {
  background-color: #F4433622;
  box-shadow: inset 3px 0 0 #F44336AA;
  user-select: none;
}

.sample :deep(.added) {
  background-color: #4CAF5022;
  box-shadow: inset 3px 0 0 #4CAF50AA;
}

/* a command wraps between words (usage.data.ts), its next lines indented so it does not read as two */
.commands pre {
  padding-left: calc(20px + 2ch);
  text-indent: -2ch;
  white-space: pre-wrap;
}

.commands :deep(.word) {
  white-space: nowrap;
}

.commands {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* small headings over the commands, a step above the description's grey */
.commands dt {
  margin-bottom: 12px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.copy {
  position: absolute;
  top: 6px;
  right: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  font-size: 1rem;
  color: var(--vp-c-text-3);
}

.sample .copy {
  top: 12px;
  right: 12px;
}

.copy:is(:hover, :focus-visible) {
  color: var(--vp-c-text-1);
  background-color: var(--surface-hover);
}

.copy.done {
  color: light-dark(#00855F, #39CC8F);
}
</style>
