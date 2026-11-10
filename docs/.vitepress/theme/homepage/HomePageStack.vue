<script setup lang="ts">
import { faCloud, faCode, faDesktop, faLock } from "@fortawesome/pro-regular-svg-icons";
import Icon from "../Icon.vue";

/* The stack the library runs in, top down: the application with QuestPDF inside, then what each layer accepts.
   Lower slabs are wider, so the stack is read as one. Facts as the package README states them. */
const layers = [
  { name: "Runtime", values: [".NET 6+", ".NET Framework 4.6.2+", "Native AOT"], icon: faCode },
  { name: "Operating system", values: ["Windows", "Linux", "Alpine", "macOS"], icon: faDesktop },
  { name: "Hosting", values: ["Docker", "Kubernetes", "Azure", "AWS", "Google Cloud"], icon: faCloud }
];
</script>

<template>
  <div class="stack" aria-hidden="true">
    <div class="layer top">
      <span class="name">Your application</span>
      <span class="chip">QuestPDF</span>
      <span class="lock"><Icon :icon="faLock" />No network calls</span>
    </div>

    <div v-for="(layer, index) of layers" :key="layer.name" class="layer" :style="{ '--depth': index + 1 }">
      <Icon class="layer-icon" :icon="layer.icon" />
      <span class="name">{{ layer.name }}</span>
      <span class="values">
        <template v-for="(value, i) of layer.values" :key="value">
          <span v-if="i > 0" class="dot">·</span>
          <span class="value">{{ value }}</span>
        </template>
      </span>
    </div>
  </div>
</template>

<style scoped>

.stack {
  --accent: light-dark(#1976D2, #64B5F6);
  --line: color-mix(in srgb, var(--vp-c-text-1) 14%, transparent);

  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  user-select: none;
}

.layer {
  --inset: calc((3 - var(--depth, 0)) * 10px);

  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 40px;
  margin-inline: var(--inset);
  padding: 8px 16px;
  border-radius: 10px;
  background-color: var(--surface-inner);
  box-shadow:
      inset 0 0 0 1px var(--line),
      0 3px 0 -1px color-mix(in srgb, var(--vp-c-text-1) calc(10% - var(--depth, 0) * 2%), transparent);
}

.layer.top {
  --depth: 0;

  background-color: color-mix(in srgb, var(--accent) 12%, transparent);
  box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--accent) 35%, transparent),
      0 3px 0 -1px color-mix(in srgb, var(--accent) 30%, transparent);
}

.layer-icon {
  flex-shrink: 0;
  font-size: 1.125rem;
  color: var(--accent);
}

.name {
  flex-shrink: 0;
  min-width: 112px;
  font-size: 0.8125rem;
  line-height: 1.125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.top .name {
  min-width: 128px;
  color: var(--accent);
}

.chip {
  padding: 2px 10px;
  border-radius: 6px;
  background-color: var(--accent);
  color: #FFF;
  font-size: 0.75rem;
  line-height: 1.125rem;
  font-weight: 700;
}

.lock {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  white-space: nowrap;
  color: var(--accent);
}

.lock .icon {
  font-size: 1rem;
}

.values {
  display: flex;
  flex-wrap: wrap;
  gap: 2px 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-2);
}

.value {
  white-space: nowrap;
}

.dot {
  margin: 0 0.6em;
  color: var(--vp-c-text-3);
}

@media screen and (max-width: 560px) {
  .layer {
    --inset: calc((3 - var(--depth, 0)) * 4px);

    flex-wrap: wrap;
    gap: 4px 12px;
  }

  .name,
  .top .name {
    min-width: 0;
    width: 100%;
  }

  .lock {
    margin-left: 0;
  }
}

</style>
