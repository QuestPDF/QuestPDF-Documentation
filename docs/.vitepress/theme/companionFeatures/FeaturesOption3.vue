<script setup lang="ts">
import { computed, ref } from "vue";
import Icon from "../Icon.vue";
import { useDotWings } from "../dotWings";
import FeaturesHero from "./FeaturesHero.vue";
import GetStarted from "./GetStarted.vue";
import FeatureClip from "./FeatureClip.vue";
import FeatureDetails from "./FeatureDetails.vue";
import ShortcutSheet from "./ShortcutSheet.vue";
import DownloadClosing from "./DownloadClosing.vue";
import { features, featuresOf, groups } from "./features";

/* PROTOTYPE, option 3: list and preview. One panel like the homepage's Companion block: the features listed on the
   left, the chosen one's clip and text on the right. All shortcuts follow on a panel of their own. */
const root = ref<HTMLElement>();
useDotWings(root);

const selectedId = ref(features[0].id);
const selected = computed(() => features.find(feature => feature.id === selectedId.value)!);

const steps: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

/* arrow keys move through the list, like a tab list */
function onListKey(event: KeyboardEvent) {
  const step = steps[event.key];

  if (!step)
    return;

  event.preventDefault();
  const index = features.findIndex(feature => feature.id === selectedId.value);
  const next = features[(index + step + features.length) % features.length];
  selectedId.value = next.id;
  (event.currentTarget as HTMLElement).querySelector<HTMLElement>(`[data-feature="${next.id}"]`)?.focus();
}
</script>

<template>
  <div ref="root" class="custom-page texture-dots option">
    <div class="content">
      <FeaturesHero video />

      <div class="dotted-divider"></div>

      <GetStarted />

      <div class="dotted-divider"></div>

      <section class="panel explorer">
        <div class="list" role="tablist" aria-orientation="vertical" aria-label="Features" @keydown="onListKey">
          <div v-for="group of groups" :key="group.id" class="list-group">
            <p class="list-group-title">{{ group.title }}</p>

            <button
                v-for="feature of featuresOf(group.id)"
                :key="feature.id"
                type="button"
                role="tab"
                class="list-item"
                :class="{ selected: feature.id === selectedId }"
                :aria-selected="feature.id === selectedId"
                :tabindex="feature.id === selectedId ? 0 : -1"
                :data-feature="feature.id"
                @click="selectedId = feature.id">
              <Icon :icon="feature.icon" />
              <span>{{ feature.title }}</span>
            </button>
          </div>
        </div>

        <div class="viewer" role="tabpanel">
          <Transition name="swap" mode="out-in">
            <div :key="selected.id" class="viewer-body">
              <FeatureClip :feature="selected" mirrored />

              <div class="viewer-text">
                <h2 class="card-title">{{ selected.title }}</h2>
                <FeatureDetails :feature="selected" compact />
              </div>
            </div>
          </Transition>
        </div>
      </section>

      <ShortcutSheet />

      <DownloadClosing />
    </div>
  </div>
</template>

<style scoped>

.option .content {
  display: flex;
  flex-direction: column;
  gap: 64px;
  container-type: inline-size;
}

.explorer {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 40px;
  align-items: start;
  overflow: clip;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.list-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.list-group-title {
  margin: 0 0 6px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.375rem;
  text-align: left;
  color: var(--vp-c-text-2);
  transition: background-color 0.15s ease, color 0.15s ease;
}

.list-item .icon {
  flex-shrink: 0;
  width: 18px;
  color: var(--vp-c-text-3);
  transition: color 0.15s ease;
}

.list-item:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-default-soft);
}

.list-item.selected {
  color: var(--vp-c-text-1);
  background-color: var(--surface-inner);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 8%, transparent);
}

.list-item.selected .icon {
  color: light-dark(#1976D2, var(--vp-c-brand-1));
}

.viewer-body {
  display: flex;
  flex-direction: column;
  gap: 28px;
  container-type: inline-size;
}

.viewer-text .card-title {
  margin-bottom: 14px;
}

.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.swap-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.swap-leave-to {
  opacity: 0;
}

/* narrow: the list turns into a scrolling strip of chips above the viewer */
@container (max-width: 860px) {
  .explorer {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }

  .list {
    flex-direction: row;
    gap: 8px;
    overflow-x: auto;
    margin: -4px;
    padding: 4px;
    scrollbar-width: none;
  }

  .list-group {
    flex-direction: row;
    gap: 8px;
  }

  .list-group-title {
    display: none;
  }

  .list-item {
    white-space: nowrap;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 10%, transparent);
  }
}

</style>
