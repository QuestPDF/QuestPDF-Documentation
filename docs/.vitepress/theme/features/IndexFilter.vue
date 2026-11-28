<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from "vue";
import { faMagnifyingGlass, faXmark } from "@fortawesome/pro-light-svg-icons";
import Icon from "../Icon.vue";

const query = defineModel<string>({ required: true });
const { summary } = defineProps<{ summary: string }>();
const emit = defineEmits<{ open: [] }>();

const field = useTemplateRef("field");

function clear() {
  query.value = "";
  field.value?.focus();
}

function onKey(event: KeyboardEvent) {
  if (event.key === "Enter" && query.value) emit("open");
  else if (event.key === "Escape" && query.value) query.value = "";
  else return;

  event.preventDefault();
}

/* Ctrl+F and Cmd+F lead here first. From any text field, this one included, they open the browser's own Find, so
   pressing the keys twice still reaches it. */
function onFind(event: KeyboardEvent) {
  if (event.key.toLowerCase() !== "f" || event.ctrlKey === event.metaKey || event.altKey || event.shiftKey) return;
  if (!field.value || (document.activeElement as HTMLElement | null)?.matches("input, textarea, select, [contenteditable]")) return;

  event.preventDefault();
  window.scrollTo(0, 0);
  field.value.focus({ preventScroll: true });
  field.value.select();
}

onMounted(() => window.addEventListener("keydown", onFind));
onBeforeUnmount(() => window.removeEventListener("keydown", onFind));
</script>

<template>
  <div class="index-filter" role="search">
    <div class="field" :class="{ 'has-summary': summary }">
      <Icon :icon="faMagnifyingGlass" class="field-icon" />
      <input ref="field" v-model="query" type="search" class="field-input" placeholder="Search features"
             aria-label="Search features" aria-keyshortcuts="Control+F Meta+F" autocomplete="off" autocorrect="off" spellcheck="false" @keydown="onKey">
      <button v-if="query" type="button" class="field-clear" aria-label="Clear the search" @click="clear">
        <Icon :icon="faXmark" />
      </button>

      <span class="summary" aria-live="polite">{{ summary }}</span>
    </div>
  </div>
</template>

<style scoped>
/* the space down to the first heading: its own 48px top margin collapses into this one */
.index-filter {
  margin-bottom: 72px;
}

.field {
  position: relative;
  display: flex;
  align-items: center;
}

.field-icon {
  position: absolute;
  left: 16px;
  font-size: 1.25rem;
  color: var(--vp-c-text-2); /* the placeholder's */
  pointer-events: none;
}

/* the blue ring of a card that stands out (.panel.ringed in CustomPages.css): a 2px blue border, in light a pale halo
   around it, and a blue lift below. light-dark() takes colours only, so the shadow reads its colours from variables. */
.field-input {
  --halo: light-dark(color-mix(in srgb, #2196F3 10%, transparent), transparent);
  --lift: light-dark(color-mix(in srgb, #2196F3 35%, transparent), color-mix(in srgb, #3D8BD4 22%, transparent));

  width: 100%;
  height: 48px;
  padding: 0 44px 0 48px;
  border: 2px solid var(--ring);
  border-radius: var(--radius-tile);
  appearance: none;
  font: inherit;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-1);
  background-color: light-dark(#FFFFFF, rgba(255, 255, 255, 0.07));
  box-shadow:
      0 0 0 6px var(--halo),
      0 16px 32px -16px var(--lift);
}

.field-input::placeholder {
  color: var(--vp-c-text-2);
  opacity: 1;
}

.field-input::-webkit-search-cancel-button,
.field-input::-webkit-search-decoration {
  appearance: none;
}

/* under the pointer and with the focus the halo grows stronger; the focus also darkens the ring */
.field-input:hover {
  --halo: color-mix(in srgb, var(--ring) 20%, transparent);
}

.field-input:focus-visible {
  --halo: color-mix(in srgb, var(--ring) 32%, transparent);
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

/* the number of matches stands in the field, before the clear button */
.has-summary .field-input {
  padding-inline-end: 9.5rem;
}

.field-clear {
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  font-size: 1rem;
  color: var(--vp-c-text-2);
}

.field-clear:hover {
  color: var(--vp-c-text-1);
  background-color: var(--doc-hover);
}

.field-clear:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

.summary {
  position: absolute;
  right: 50px;
  pointer-events: none;
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}
</style>
