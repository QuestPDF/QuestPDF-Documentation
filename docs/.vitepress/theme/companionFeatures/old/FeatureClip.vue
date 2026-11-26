<script setup lang="ts">
import { faPlay } from "@fortawesome/pro-solid-svg-icons";
import Icon from "../../Icon.vue";
import CompanionShuffle from "./CompanionShuffle.vue";
import type { Feature } from "./features";

/* PROTOTYPE: the frame a feature's 5-second clip will play in (16:9, like the homepage video). Until the clip is
   recorded it shows the feature's screenshot, or its icon, and names the planned clip. */
defineProps<{
  feature: Feature;
  /* hides the planned-clip caption, for small tiles */
  bare?: boolean;
  /* a drawn clip's windows leave past the right edge instead of the left */
  mirrored?: boolean;
}>();
</script>

<template>
  <!-- drawn, nothing to record; the panel around it has to clip its overflow -->
  <CompanionShuffle v-if="feature.id === 'implementation'" scene="implementation" :mirrored="mirrored" />

  <figure v-else class="clip" :class="{ empty: !feature.screenshot }">
    <template v-if="feature.screenshot">
      <img class="light-only" :src="`/companion/screenshots/${feature.screenshot}-light.webp`" :alt="feature.title" loading="lazy" />
      <img class="dark-only" :src="`/companion/screenshots/${feature.screenshot}-dark.webp`" :alt="feature.title" loading="lazy" />
    </template>

    <div v-else class="stand-in">
      <Icon :icon="feature.icon" />
    </div>

    <figcaption v-if="!bare" class="planned">
      <Icon :icon="faPlay" />
      <span>{{ feature.clip }}</span>
    </figcaption>
  </figure>
</template>

<style scoped>

.clip {
  position: relative;
  margin: 0;
  /* a page can try another shape through --clip-ratio */
  aspect-ratio: var(--clip-ratio, 16 / 9);
  overflow: hidden;
  border-radius: 14px;
  background-color: var(--vp-c-bg);
  box-shadow:
      0 0 0 1px light-dark(color-mix(in srgb, var(--vp-c-text-1) 10%, transparent), rgba(255, 255, 255, 0.08)),
      0 16px 40px -16px light-dark(rgba(16, 24, 40, 0.22), rgba(0, 0, 0, 0.6));
}

.clip img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 0;
}

.stand-in {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background:
      radial-gradient(circle at 50% 45%, color-mix(in srgb, #2196F3 14%, transparent), transparent 60%),
      var(--surface-inner, var(--vp-c-bg-soft));
}

.stand-in .icon {
  font-size: clamp(2rem, 12cqi, 4rem);
  color: light-dark(#1976D2, var(--vp-c-brand-1));
  opacity: 0.7;
}

.clip {
  container-type: inline-size;
}

.planned {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: fit-content;
  max-width: calc(100% - 20px);
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 0.75rem;
  line-height: 1.125rem;
  color: #FFF;
  background-color: rgba(10, 12, 16, 0.72);
  backdrop-filter: blur(6px);
}

.planned .icon {
  flex-shrink: 0;
  margin-top: 0.25rem;
  font-size: 0.625rem;
  color: #4FC3F7;
}

@container (max-width: 300px) {
  .planned {
    display: none;
  }
}

</style>
