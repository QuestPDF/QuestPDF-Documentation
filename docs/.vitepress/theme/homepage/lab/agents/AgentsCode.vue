<script setup lang="ts">
import { computed } from "vue";
import HomePageHighlightedCode from "../../HomePageHighlightedCode.vue";
import AgentsWindow from "./AgentsWindow.vue";
import { fileName, linesToCode, linesTransformer, reservedLines, type Line } from "./agentsDemo";

/* The sample in a window. Takes the lines with their diff kinds, so one component serves the
   resting file, the diff being typed and the accepted change. The window reserves the height of
   the 28-line diff state, so the page never shifts while the demo plays. */

const props = defineProps<{ lines: Line[] }>();

const code = computed(() => linesToCode(props.lines));
const transformer = computed(() => linesTransformer(props.lines));
const reservedHeight = `${reservedLines * 19.5 + 16}px`;
</script>

<template>
  <agents-window :file-name="fileName" class="agents-code">
    <template #meta><slot name="meta" /></template>
    <suspense>
      <home-page-highlighted-code :code="code" :code-transformer="transformer" />
    </suspense>
  </agents-window>
</template>

<style scoped>
.agents-code :deep(.code-source) {
  font-size: 13px;
  min-height: v-bind(reservedHeight);
}

@media screen and (max-width: 700px) {
  .agents-code :deep(.code-source) {
    min-height: calc(28 * 15px + 16px);
  }
}
</style>
