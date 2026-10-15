<template>
  <!-- the calls to action of every direction: Explore features, the Download menu and the platforms.
       layout "row": buttons left, platforms right (today's footer); "stack": platforms under the buttons;
       "center": the stack centred -->
  <div class="companion-actions" :class="`layout-${layout}`">
    <div class="actions">
      <a class="action primary" href="/companion/features.html">Explore features</a>

      <!-- a real button: the VitePress router ignores clicks inside buttons, so it will not try to navigate -->
      <div ref="downloadRef" class="download">
        <button
          type="button"
          class="download-toggle"
          aria-haspopup="menu"
          :aria-expanded="isDownloadOpen"
          @click="isDownloadOpen = !isDownloadOpen">
          Download
          <i class="fa-regular fa-chevron-down download-chevron" :class="{ open: isDownloadOpen }"></i>
        </button>

        <div v-if="isDownloadOpen" class="download-menu" :class="{ up: menuUp, end: menuEnd }" role="menu">
          <a
            v-for="download of downloads"
            :key="download.url"
            class="download-item"
            role="menuitem"
            :href="download.url"
            @click="isDownloadOpen = false">
            <img :src="`/homepage/supported-platforms/${download.src}`" alt="" />
            <span class="download-name">{{ download.name }}</span>
            <span class="download-format">{{ download.format }}</span>
          </a>

          <a class="download-all" role="menuitem" href="/companion/download.html" @click="isDownloadOpen = false">
            All versions
            <i class="fa-regular fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>

    <div v-if="showPlatforms" class="platforms">
      <span class="platforms-label">Free on</span>
      <span v-for="platform of platforms" :key="platform.name" class="platform">
        <img :src="`/homepage/supported-platforms/${platform.src}`" alt="" />
        {{ platform.name }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { downloads, platforms } from "./companion";

/* menuUp opens the menu above the button, menuEnd aligns it to the button's right edge */
withDefaults(defineProps<{ layout?: "row" | "stack" | "center"; showPlatforms?: boolean; menuUp?: boolean; menuEnd?: boolean }>(), {
  layout: "row",
  showPlatforms: true,
  menuUp: false,
  menuEnd: false
});

const isDownloadOpen = ref(false);
const downloadRef = ref<HTMLElement | null>(null);

function closeOnOutsideClick(event: MouseEvent) {
  if (downloadRef.value && !downloadRef.value.contains(event.target as Node))
    isDownloadOpen.value = false;
}

function closeOnEscape(event: KeyboardEvent) {
  if (event.key === "Escape")
    isDownloadOpen.value = false;
}

onMounted(() => {
  document.addEventListener("click", closeOnOutsideClick);
  document.addEventListener("keydown", closeOnEscape);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeOnOutsideClick);
  document.removeEventListener("keydown", closeOnEscape);
});
</script>

<style scoped>

.companion-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 32px;
}

.layout-row {
  justify-content: space-between;
}

.layout-stack,
.layout-center {
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.layout-center {
  align-items: center;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.layout-center .actions {
  justify-content: center;
}

/* Download dropdown: the trigger keeps the shared .action look, the menu floats below it */

.download {
  position: relative;
}

/* mirrors a.action from CustomPages.css, which only targets anchors */
.download-toggle {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  border: 0;
  border-radius: 12px;
  background-color: #8883;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.download-toggle:hover {
  transform: translateY(-4px);
  box-shadow: var(--elevation);
  background-color: #8885;
}

.download-chevron {
  font-size: 0.75em;
  transition: transform 0.2s ease;
}

.download-chevron.open {
  transform: rotate(180deg);
}

.download-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 10;
  min-width: 240px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  background-color: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: var(--elevation);
  text-align: left; /* a centred header (direction A) would otherwise centre the items */
}

.download-menu.up {
  top: auto;
  bottom: calc(100% + 8px);
}

.download-menu.end {
  left: auto;
  right: 0;
}

.download-item,
.download-all {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-1);
  text-decoration: none;
  white-space: nowrap;
}

.download-item:hover,
.download-all:hover {
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}

.download-item img {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.download-name {
  flex: 1;
  font-weight: 500;
}

.download-format {
  color: var(--vp-c-text-3);
}

.download-all {
  margin-top: 6px;
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  justify-content: space-between;
  color: var(--vp-c-text-2);
}

.platforms {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 20px;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.layout-center .platforms {
  justify-content: center;
}

.platforms-label {
  color: var(--vp-c-text-3);
}

.platform {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.platform img {
  width: 20px;
  height: 20px;
}

</style>
