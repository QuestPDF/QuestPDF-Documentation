<script setup lang="ts">
import type { Shortcut } from "./features";

/* PROTOTYPE: a feature's own shortcuts, for a narrow column: the action, then its keys, as in the shortcut sheet */
defineProps<{
  shortcuts: Shortcut[];
}>();
</script>

<template>
  <dl class="shortcut-list">
    <div v-for="shortcut of shortcuts" :key="shortcut.action" class="shortcut">
      <dt>
        <template v-for="(key, index) of shortcut.keys" :key="key">
          <span v-if="index > 0" class="plus">+</span>
          <kbd>{{ key }}</kbd>
        </template>
      </dt>
      <dd>{{ shortcut.action }}</dd>
    </div>
  </dl>
</template>

<style scoped>

.shortcut-list {
  margin: 0;
}

.shortcut {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 4px 0;
}

dt {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 4px;
  order: 2;
}

dd {
  margin: 0;
  text-wrap: balance;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-3);
}

.plus {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

kbd {
  display: inline-block;
  min-width: 24px;
  padding: 1px 7px;
  border-radius: 6px;
  font-family: var(--vp-font-family-base);
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.25rem;
  text-align: center;
  color: var(--vp-c-text-1);
  background-color: var(--surface-inner);
  box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 12%, transparent),
      inset 0 -2px 0 color-mix(in srgb, var(--vp-c-text-1) 8%, transparent);
}

</style>
