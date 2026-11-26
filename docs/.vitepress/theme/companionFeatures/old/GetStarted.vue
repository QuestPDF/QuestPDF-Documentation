<script setup lang="ts">
import CompanionShuffle from "./CompanionShuffle.vue";
import Icon from "../../Icon.vue";
import { downloads, RELEASES, VERSION } from "./downloads";

/* PROTOTYPE: the way from nothing to a live preview, shared by every option: download the app, call
   ShowInCompanion(), turn on hot reload. Facts come from docs/companion/usage.md and download.md. */

/* Step 3: the terminal only, every IDE has its own hot reload and keeps changing how it looks */
const commands = [
  { label: "Run your project", code: "dotnet watch" },
  { label: "Run a chosen project", code: "dotnet watch --project YourSampleProject" },
  { label: "Run a unit test", code: 'dotnet watch --project YourProjectWithTests test --filter "YourClassWithTests.TestMethodName"' }
];

</script>

<template>
  <section id="get-started" class="get-started">
    <h2 class="heading">Up and running in three steps</h2>

    <article class="panel step">
      <div class="step-heading">
        <span class="number">1</span>
        <h3 class="card-title">Download the app</h3>
      </div>

      <div class="downloads">
        <a v-for="download of downloads" :key="download.href" class="download" :href="download.href">
          <Icon class="download-system" :icon="download.icon" />
          <span class="download-text">
            <span class="download-name">{{ download.name }}</span>
            <span class="download-note">{{ download.note }}</span>
          </span>
          <span class="vpi-arrow-right download-arrow"></span>
        </a>
      </div>

      <p class="note">
        Version {{ VERSION }}, works with QuestPDF 2024.10 and newer.
        Other versions are on <a :href="RELEASES" target="_blank" rel="noreferrer">GitHub Releases</a>.
      </p>
    </article>

    <article class="panel demo">
      <CompanionShuffle scene="show" />

      <div class="demo-text">
        <div class="step-heading">
          <span class="number">2</span>
          <h3 class="card-title">Show your document in the app</h3>
        </div>

        <p>
          Instead of generating a PDF file, call <code>ShowInCompanion()</code>. The document opens in the app,
          and the rest of your code stays the same.
        </p>

        <div class="code-card"><pre><span class="c-keyword">using</span> <span class="c-type">QuestPDF</span>.<span class="c-type">Companion</span>;

document.<span class="c-method">ShowInCompanion</span>();</pre></div>

        <p class="note">
          The default port is 12500. To use another one, change it in the app's settings and pass it to the method:
          <code>document.ShowInCompanion(12345);</code>
        </p>
      </div>
    </article>

    <article class="panel demo flipped">
      <div class="demo-text">
        <div class="step-heading">
          <span class="number">3</span>
          <h3 class="card-title">Run it with hot reload</h3>
        </div>

        <p>
          Start your application with <code>dotnet watch</code>, or use the hot reload of your IDE.
          The preview refreshes as you change the code.
        </p>

        <dl class="commands">
          <div v-for="command of commands" :key="command.code">
            <dt>{{ command.label }}</dt>
            <dd class="code-card"><pre>{{ command.code }}</pre></dd>
          </div>
        </dl>
      </div>

      <CompanionShuffle scene="reload" mirrored />
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

.step {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}

.step > *, .demo-text > * {
  margin: 0;
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

.note {
  font-size: 0.875rem;
}



.downloads {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.download {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border-radius: 14px;
  background-color: var(--surface-inner);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 10%, transparent);
  transition: box-shadow 0.15s ease;
}

.download:hover {
  box-shadow: inset 0 0 0 1px light-dark(#1976D2, var(--vp-c-brand-1));
}

.download-system {
  flex: none;
  font-size: 1.5rem;
  color: var(--vp-c-text-1);
}

.download-text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.download-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.download-note {
  font-size: 0.8125rem;
  line-height: 1.125rem;
  color: var(--vp-c-text-2);
}

.download-arrow {
  flex: none;
  transform: rotate(90deg);
  color: var(--vp-c-text-3);
}

.download:hover .download-arrow {
  color: light-dark(#1976D2, var(--vp-c-brand-1));
}


.demo {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: 48px;
  align-items: center;
  /* the shuffled windows leave past the panel's edge */
  overflow: clip;
}

.demo.flipped {
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
}

.demo-text {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
}

.code-card {
  position: relative;
  overflow-x: auto;
  border-radius: 14px;
  padding: 20px 24px;
  background-color: var(--surface-inner);
}

.code-card pre {
  margin: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  line-height: 1.625rem;
  color: var(--vp-c-text-1);
}

/* the colours of CompanionShuffle.vue */
.c-keyword { color: light-dark(#0F54D6, #6C95EB); }
.c-type { color: light-dark(#6B2FBA, #C191FF); }
.c-method { color: light-dark(#00855F, #39CC8F); }

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
  padding: 12px 20px;
}

.commands pre {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

@container (max-width: 1000px) {
  .downloads { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .demo, .demo.flipped { grid-template-columns: minmax(0, 1fr); }
}

@container (max-width: 520px) {
  .downloads { grid-template-columns: minmax(0, 1fr); }
}

</style>
