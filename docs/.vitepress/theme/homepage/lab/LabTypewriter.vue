<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import { features, featureIndex } from "./features";
import { sleep, useInView } from "./labAnimation";
import LabPanel from "./LabPanel.vue";
import HomePageWindowContainer from "../HomePageWindowContainer.vue";

/* 06 Fluent API typewriter: the same typing that the live demo uses, in miniature. A small code
   window types one Fluent API call after another, and as each call lands, the tag it stands for
   lights up: .Text() lights Text, .Table() lights Tables, .Encrypt() lights Encryption. The window
   types a generation snippet, clears, types a document-operations snippet, and starts over. This
   ties the tags to the one thing the homepage is about, the C# API. */

const stage = ref<HTMLElement>();
const { animate } = useInView(stage);

interface ScriptLine {
  code: string;
  lights?: string[];
}

const scripts: ScriptLine[][] = [
  [
    { code: "// a new document" },
    { code: "column.Item().Text(\"Invoice #1042\").Bold();", lights: ["Text", "Styling"] },
    { code: "column.Item().Image(\"logo.png\");", lights: ["Images"] },
    { code: "column.Item().Svg(\"stamp.svg\");", lights: ["SVG"] },
    { code: "column.Item().Table(table => { ... });", lights: ["Tables"] },
    { code: "column.Item().MultiColumn(c => { ... });", lights: ["Multi-column"] },
    { code: "column.Item().PageBreak();", lights: ["Page breaks"] },
    { code: "text.CurrentPageNumber();", lights: ["Page numbers"] },
    { code: "text.Hyperlink(\"Terms\", url);", lights: ["Hyperlinks"] }
  ],
  [
    { code: "// an existing file" },
    { code: "DocumentOperation.LoadFile(\"report.pdf\")" },
    { code: "    .MergeFile(\"appendix.pdf\")", lights: ["Merging"] },
    { code: "    .TakePages(\"1-3\")", lights: ["Page extraction"] },
    { code: "    .OverlayFile(\"watermark.pdf\")", lights: ["Overlays"] },
    { code: "    .AddAttachment(\"invoice.xml\")", lights: ["Attachments"] },
    { code: "    .Encrypt(password)", lights: ["Encryption"] },
    { code: "    .Save(\"output.pdf\");" }
  ]
];

const lines = ref<string[]>([]);
const lit = ref<Set<number>>(new Set());
const flash = ref(-1);

let destroyed = false;

async function waitForResume() {
  while (!animate.value && !destroyed)
    await sleep(300);
}

async function run() {
  while (!destroyed) {
    for (const script of scripts) {
      lines.value = [];
      lit.value = new Set();

      for (const line of script) {
        lines.value.push("");

        for (const letter of line.code) {
          await waitForResume();
          if (destroyed) return;
          lines.value[lines.value.length - 1] += letter;
          await sleep(28);
        }

        for (const label of line.lights ?? []) {
          const index = featureIndex(label);
          lit.value = new Set([...lit.value, index]);
          flash.value = index;
        }

        await sleep(line.lights ? 520 : 260);
      }

      await sleep(1800);
    }
  }
}

/* a light tokenizer: strings, comments, method names and the rest */
function tokens(line: string) {
  const result: { text: string; cls: string }[] = [];
  const pattern = /(\/\/.*)|("[^"]*"?)|(\.[A-Za-z]+)|([^."/]+|.)/g;

  for (const match of line.matchAll(pattern)) {
    if (match[1]) result.push({ text: match[1], cls: "comment" });
    else if (match[2]) result.push({ text: match[2], cls: "string" });
    else if (match[3]) result.push({ text: match[3], cls: "method" });
    else result.push({ text: match[4], cls: "plain" });
  }

  return result;
}

watch(animate, on => { if (on && !started) { started = true; run(); } });
let started = false;

onBeforeUnmount(() => destroyed = true);
</script>

<template>
  <lab-panel>
    <div ref="stage" class="typewriter">
      <home-page-window-container file-name="Program.cs">
        <pre class="code"><div v-for="(line, index) of lines" :key="index" class="line"><span v-for="(token, position) of tokens(line)" :key="position" :class="token.cls">{{ token.text }}</span><span v-if="index === lines.length - 1" class="caret" /></div></pre>
      </home-page-window-container>

      <div class="chips">
        <span
            v-for="(feature, index) of features"
            :key="feature.label"
            class="chip"
            :class="{ lit: lit.has(index), flash: flash === index }">
          <i class="fa-regular" :class="[feature.icon]" />
          {{ feature.label }}
        </span>
      </div>
    </div>
  </lab-panel>
</template>

<style scoped>

.typewriter {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 24px;
}

.typewriter :deep(.file-container) {
  width: 100%;
  max-width: 520px;
}

.code {
  box-sizing: content-box;
  height: calc(9 * 1.375rem);
  margin: 0;
  padding: 12px 18px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  line-height: 1.375rem;
  color: var(--vp-c-text-1);
  white-space: pre;
  overflow: hidden;
}

.comment { color: var(--vp-c-text-3); }
.string { color: #A31515; }
.method { color: #795E26; }

html.dark .string { color: #CE9178; }
html.dark .method { color: #DCDCAA; }

.caret {
  display: inline-block;
  width: 2px;
  height: 1em;
  margin-left: 1px;
  vertical-align: -0.15em;
  background-color: var(--vp-c-brand-1);
  animation: blink 1s steps(2, start) infinite;
}

@keyframes blink {
  to { visibility: hidden; }
}

/* the tag a line has just lit gets a short pulse on top of the shared lit state */
.chip.flash i {
  animation: pulse 0.5s ease;
}

@keyframes pulse {
  40% { transform: scale(1.45); }
  100% { transform: scale(1.15); }
}

@media screen and (max-width: 1280px) {
  .typewriter {
    align-items: flex-start;
  }
}

</style>
