<script setup lang="ts">
import { ref } from "vue";
import { faCheck, faCopy } from "@fortawesome/pro-regular-svg-icons";
import Icon from "../Icon.vue";
import FilmVideo from "./FilmVideo.vue";

/* PROTOTYPE: the way from the downloaded app to a live preview, shared by every new option: call ShowInCompanion()
   and run the project with hot reload, in one panel (the download button sits under the hero video). Facts come
   from docs/companion/usage.md. The film is the user's recording. */

const SHOW_CODE = "document.ShowInCompanion();";

/* the terminal only, every IDE has its own hot reload and keeps changing how it looks */
const commands = [
  { label: "Run your project", code: "dotnet watch" },
  { label: "Run a chosen project", code: "dotnet watch --project YourSampleProject" },
  { label: "Run a unit test", code: 'dotnet watch --project YourProjectWithTests test --filter "YourClassWithTests.TestMethodName"' }
];

/* Shell colouring in the palette of the C# card: the program, its subcommands, options and quoted values */
const SUBCOMMANDS = new Set(["watch", "test", "run", "build"]);

function highlight(code: string) {
  return (code.match(/"[^"]*"|\S+|\s+/g) ?? []).map((text, index) => {
    if (/^\s/.test(text)) return { text, kind: "" };
    if (index === 0) return { text, kind: "c-method" };
    if (text.startsWith('"')) return { text, kind: "c-string" };
    if (text.startsWith("-")) return { text, kind: "c-type" };
    if (SUBCOMMANDS.has(text)) return { text, kind: "c-keyword" };
    return { text, kind: "" };
  });
}

/* copy buttons: the copied card shows a tick for a moment */
const copied = ref<string>();
let timer: ReturnType<typeof setTimeout> | undefined;

async function copy(code: string) {
  try {
    await navigator.clipboard.writeText(code);
  } catch {
    return;
  }

  copied.value = code;
  clearTimeout(timer);
  timer = setTimeout(() => copied.value = undefined, 1500);
}
</script>

<template>
  <section id="get-started" class="get-started">
    <h2 class="heading">Up and running</h2>

    <article class="panel demo">
      <FilmVideo name="hot-reload" label="Calling ShowInCompanion(), running dotnet watch, and a code change refreshing the preview" />

      <div class="demo-text">
        <div class="part">
          <div class="step-heading">
            <span class="number">1</span>
            <h3 class="card-title">Show your document in the app</h3>
          </div>

          <p>
            Instead of generating a PDF file, call <code>ShowInCompanion()</code>.
            The rest of your code stays the same.
          </p>

          <div class="code-card">
            <pre>document.<span class="c-method">ShowInCompanion</span>();</pre>
            <button type="button" class="copy" :class="{ done: copied === SHOW_CODE }" aria-label="Copy the code" title="Copy" @click="copy(SHOW_CODE)">
              <Icon :icon="copied === SHOW_CODE ? faCheck : faCopy" />
            </button>
          </div>

        </div>

        <div class="part">
          <div class="step-heading">
            <span class="number">2</span>
            <h3 class="card-title">Run it with hot reload</h3>
          </div>

          <p>
            Start it with <code>dotnet watch</code>, or with the hot reload of your IDE.
            The preview refreshes as you change the code.
          </p>

          <dl class="commands">
            <div v-for="command of commands" :key="command.code">
              <dt>{{ command.label }}</dt>
              <dd class="code-card">
                <pre><span v-for="(token, index) of highlight(command.code)" :key="index" :class="token.kind">{{ token.text }}</span></pre>
                <button type="button" class="copy" :class="{ done: copied === command.code }" aria-label="Copy the command" title="Copy" @click="copy(command.code)">
                  <Icon :icon="copied === command.code ? faCheck : faCopy" />
                </button>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>

.get-started {
  display: flex;
  flex-direction: column;
  gap: 28px;
  scroll-margin-top: calc(var(--vp-nav-height) + 24px);
  container-type: inline-size;
}

.heading {
  margin: 0 0 8px;
  text-align: center;
}

.demo-text > *, .part > * {
  margin: 0;
}

.part {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step-heading {
  display: flex;
  align-items: center;
  gap: 16px;
}

.number {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-weight: 700;
  color: light-dark(#1976D2, var(--vp-c-brand-1));
  background-color: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
}




.demo {
  display: grid;
  /* the film wider, the text narrower: the code lines still fit and the sentences break a word or two earlier */
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  gap: 48px;
  align-items: center;
}


.demo-text {
  display: flex;
  flex-direction: column;
  gap: 40px;
  min-width: 0;
}

.code-card {
  position: relative;
  overflow-x: auto;
  border-radius: 14px;
  padding: 20px 56px 20px 24px;
  background-color: var(--surface-inner);
}

.code-card pre {
  margin: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  line-height: 1.625rem;
  color: var(--vp-c-text-1);
}

/* the code colours of CompanionShuffle.vue, the drawn clips */
.c-keyword { color: light-dark(#0F54D6, #6C95EB); }
.c-type { color: light-dark(#6B2FBA, #C191FF); }
.c-method { color: light-dark(#00855F, #39CC8F); }
.c-string { color: light-dark(#8C6C41, #C9A26D); }

.commands {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0;
}

.commands dt {
  margin-bottom: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.commands dd {
  margin: 0;
  padding: 12px 52px 12px 20px;
}

/* one command, wrapped only between words; the continuation lines are indented so it does not read as two */
.commands pre {
  padding-left: 2ch;
  text-indent: -2ch;
  white-space: pre-wrap;
}

/* the copy button in the top right corner of a code card */
.copy {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  font-size: 0.9375rem;
  color: var(--vp-c-text-3);
  cursor: pointer;
  transition: color 0.15s ease, background-color 0.15s ease;
}

.commands .copy {
  top: 7px;
}

.copy:hover,
.copy:focus-visible {
  color: var(--vp-c-text-1);
  background-color: color-mix(in srgb, var(--vp-c-text-1) 8%, transparent);
}

.copy.done {
  color: light-dark(#00855F, #39CC8F);
}

@container (max-width: 1000px) {
  .demo { grid-template-columns: minmax(0, 1fr); }
}

</style>
