<script setup lang="ts">
import { onMounted, ref } from "vue";
import Icon from "../Icon.vue";
import { shortcutBlocks as blocks, type Shortcut } from "./shortcuts";

/* Every shortcut of the app on one panel */

/* on a Mac the keys carry their Mac names; the build and other systems keep the PC ones */
const macKeys: Record<string, string> = { Ctrl: "⌘", Alt: "⌥" };
const mac = ref(false);

onMounted(() => {
  mac.value = /Macintosh/.test(navigator.userAgent);
});

const keysOf = (shortcut: Shortcut) =>
  mac.value && !shortcut.sameOnMac ? shortcut.keys.map(key => macKeys[key] ?? key) : shortcut.keys;
</script>

<template>
  <section id="shortcuts" class="panel sheet">
    <h2 class="card-title">Keyboard and mouse shortcuts</h2>

    <div class="sheet-columns">
      <div v-for="block of blocks" :key="block.title" class="sheet-block">
        <h3 class="sheet-feature">
          <Icon :icon="block.icon" />
          {{ block.title }}
        </h3>

        <dl>
          <div v-for="shortcut of block.shortcuts" :key="shortcut.action" class="sheet-row">
            <dt>
              <template v-for="(key, index) of keysOf(shortcut)" :key="key">
                <span v-if="index > 0" class="plus">+</span>
                <kbd>{{ key }}</kbd>
              </template>
            </dt>
            <dd>{{ shortcut.action }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sheet .card-title {
  margin-bottom: 48px;
}

/* narrower columns with more air between them: the gap grows, and each column gets what is left */
.sheet-columns {
  columns: 3 300px;
  column-gap: 88px;
  margin-bottom: -40px; /* the space under the last block of a column */
}

/* padding, not a margin: a column break drops a margin, and the columns would end at different heights */
.sheet-block {
  break-inside: avoid;
  padding-bottom: 40px;
}

.sheet-feature {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 8px;
  font-size: 1rem;
  line-height: 1.5rem;
}

.sheet-feature .icon {
  font-size: 1.25rem;
  color: light-dark(#1976D2, var(--vp-c-brand-1));
}

/* thin dark glyphs on white read smaller, so the light theme draws them a step larger */
html:not(.dark) .sheet-feature .icon {
  font-size: 1.375rem; /* 22px */
}

.sheet-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.sheet-row:last-child {
  border-bottom: none;
}

/* the keys come first in the source, as a <dt> names its <dd>, and show on the right */
dt {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 4px;
  order: 2;
}

/* a wrapped action breaks into even lines, never leaving one word alone on the last */
dd {
  text-wrap: balance;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.plus {
  font-size: 1rem;
  color: var(--vp-c-text-3);
}

kbd {
  display: inline-block;
  min-width: 26px;
  padding: 1px 7px;
  border-radius: 6px;
  font-family: var(--vp-font-family-base);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.375rem;
  text-align: center;
  color: var(--vp-c-text-1);
  background-color: var(--surface-inner);
  box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 12%, transparent),
      inset 0 -2px 0 color-mix(in srgb, var(--vp-c-text-1) 8%, transparent);
}
</style>
