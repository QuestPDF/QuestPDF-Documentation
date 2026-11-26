<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Icon from "../../Icon.vue";
import { downloads } from "./downloads";

/* PROTOTYPE: downloads the app for the visitor's system at once. Linux has two packages to choose from, so there, as
   on an unknown system (a phone) and in the build, it leads to the first step, which lists them all. */
const system = ref<string>();

onMounted(() => {
  const agent = navigator.userAgent;

  if (/Android|iPhone|iPad/.test(agent) || navigator.maxTouchPoints > 1 && /Macintosh/.test(agent))
    return;

  system.value = /Windows/.test(agent) ? "Windows" : /Macintosh/.test(agent) ? "macOS" : undefined;
});

const download = computed(() => downloads.find(each => each.name === system.value));
</script>

<template>
  <div class="download-cta">
    <a class="action primary" :href="download?.href ?? '#get-started'">
      <Icon v-if="download" :icon="download.icon" />
      {{ download ? `Download for ${download.name}` : "Download" }}
    </a>
    <a v-if="download" class="others" href="#get-started">Other systems</a>
  </div>
</template>

<style scoped>

.download-cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px 24px;
}

.action .icon {
  margin-right: 8px;
}

.others {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.others:hover {
  color: var(--vp-c-text-1);
}

</style>
