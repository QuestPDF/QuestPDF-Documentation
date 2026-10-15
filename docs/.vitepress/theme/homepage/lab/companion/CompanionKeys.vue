<template>
  <!-- a capability's documented shortcut as key caps; colours come from the text tokens, so the caps
       read on the page surface and on a dark stage alike. `pressed` lights them (direction I). -->
  <span class="companion-keys" :class="{ pressed }" :title="capability.keysLabel">
    <kbd v-for="key of capability.keys" :key="key" :class="{ wide: key.length > 5, lit: litKey === key }">{{ key }}</kbd>
  </span>
</template>

<script setup lang="ts">
import type { Capability } from "./companion";

withDefaults(defineProps<{ capability: Capability; pressed?: boolean; litKey?: string | null }>(), {
  pressed: false,
  litKey: null
});
</script>

<style scoped>

.companion-keys {
  display: inline-flex;
  gap: 4px;
  flex-shrink: 0;
}

kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  height: 26px;
  padding: 0 7px;
  border-radius: 6px;
  border: 1px solid color-mix(in srgb, var(--vp-c-text-1) 18%, transparent);
  border-bottom-width: 2px;
  background-color: color-mix(in srgb, var(--vp-c-text-1) 5%, transparent);
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  line-height: 1;
  color: color-mix(in srgb, var(--vp-c-text-1) 85%, transparent);
  transition: transform 0.12s ease, background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

kbd.wide {
  padding: 0 9px;
}

/* pressed: every cap goes down and takes the brand colour; lit: only that one */
.pressed kbd,
kbd.lit {
  transform: translateY(1px);
  border-bottom-width: 1px;
  border-color: var(--vp-c-brand-1);
  background-color: color-mix(in srgb, var(--vp-c-brand-1) 22%, transparent);
  color: var(--vp-c-text-1);
  box-shadow: 0 0 12px color-mix(in srgb, var(--vp-c-brand-1) 40%, transparent);
}

.pressed:has(kbd.lit) kbd:not(.lit) {
  transform: none;
  border-bottom-width: 2px;
  border-color: color-mix(in srgb, var(--vp-c-text-1) 18%, transparent);
  background-color: color-mix(in srgb, var(--vp-c-text-1) 5%, transparent);
  color: color-mix(in srgb, var(--vp-c-text-1) 85%, transparent);
  box-shadow: none;
}

</style>
