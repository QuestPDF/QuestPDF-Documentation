<template>
  <div class="panel companion">
    <div class="companion-text">
      <h2 class="card-title">Preview, inspect and debug</h2>
      <p class="card-description">Add one line of code and your document opens beside your IDE. With hot-reload, every change appears in the preview at once: no recompiling, no reopening PDFs.</p>

      <ul class="points" aria-label="What the Companion App does">
        <li v-for="point of points" :key="point.icon">
          <i class="fa-regular" :class="point.icon" aria-hidden="true"></i>
          <span>{{ point.text }}</span>
        </li>
      </ul>

      <div class="actions">
        <a class="action primary" href="/companion/usage.html">Get started</a>

        <!-- a <button>, not a link: the VitePress router would navigate on a link click -->
        <div ref="downloadRef" class="download">
          <button
            type="button"
            class="action download-toggle"
            :aria-expanded="isDownloadOpen"
            @click="toggleDownload">
            Download
            <i class="fa-regular fa-chevron-down download-chevron" aria-hidden="true"></i>
          </button>

          <div v-if="isDownloadOpen" ref="downloadMenuRef" class="download-menu" :class="{ below: isDownloadBelow }">
            <a
              v-for="download of downloads"
              :key="download.url"
              class="download-item"
              :href="download.url"
              @click="isDownloadOpen = false">
              <i class="fa-brands download-icon" :class="download.icon" aria-hidden="true"></i>
              <span class="download-name">{{ download.name }}</span>
              <span class="download-format">{{ download.format }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="companion-media">
      <img src="/companion/application-light.webp" alt="QuestPDF Companion App" class="light" width="1917" height="1328" loading="lazy" />
      <img src="/companion/application-dark.webp" alt="QuestPDF Companion App" class="dark" width="1917" height="1328" loading="lazy" />
    </div>
  </div>
</template>

<script setup lang="ts">

import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

/* facts from docs/companion/features.md */
const points = [
  { icon: "fa-folder-tree", text: "Explore and navigate the document structure" },
  { icon: "fa-ruler-combined", text: "Magnify details and measure distances" },
  { icon: "fa-code", text: "Jump from the preview to the matching code" },
  { icon: "fa-bug", text: "Debug exceptions and layout issues" }
];

/* the latest release; keep in sync with docs/companion/download.md and public/companion/latest-version */
const companionVersion = "2026.2.2";
const releaseUrl = `https://github.com/QuestPDF/QuestPDF.Companion/releases/download/${companionVersion}`;

const downloads = [
  { icon: "fa-windows", name: "Windows", format: ".msix", url: `${releaseUrl}/questpdf_companion-${companionVersion}-windows.msix` },
  { icon: "fa-apple", name: "macOS", format: ".dmg", url: `${releaseUrl}/QuestPDF.Companion.${companionVersion}.dmg` },
  { icon: "fa-linux", name: "Linux", format: ".deb", url: `${releaseUrl}/questpdf_companion-${companionVersion}-linux.deb` },
  { icon: "fa-linux", name: "Linux", format: ".rpm", url: `${releaseUrl}/questpdf_companion-${companionVersion}-linux.rpm` }
];

const isDownloadOpen = ref(false);
const isDownloadBelow = ref(false);
const downloadRef = ref<HTMLElement | null>(null);
const downloadMenuRef = ref<HTMLElement | null>(null);

/* opens upwards unless the navbar would cover it and there is more room below; measured before the browser paints it */
async function toggleDownload() {
  isDownloadOpen.value = !isDownloadOpen.value;

  if (!isDownloadOpen.value)
    return;

  await nextTick();

  const menu = downloadMenuRef.value;
  const anchor = menu?.offsetParent;

  if (!menu || !anchor)
    return;

  const height = menu.offsetHeight + 8;
  const { top, bottom } = anchor.getBoundingClientRect();
  const navbarBottom = Math.max(0, document.querySelector(".VPNav")?.getBoundingClientRect().bottom ?? 0);

  const roomAbove = top - navbarBottom;
  const roomBelow = window.innerHeight - bottom;
  isDownloadBelow.value = roomAbove < height && roomBelow > roomAbove;
}

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

.companion {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 480px;
  grid-template-areas: "media text";
  gap: 48px;
  align-items: center;
}

.companion-text {
  grid-area: text;
  container-type: inline-size;
}

.companion-media {
  grid-area: media;
  aspect-ratio: 1.62;
  overflow: hidden;
  border-radius: 14px;
  background-color: var(--vp-c-bg);
  box-shadow:
      0 0 0 1px light-dark(color-mix(in srgb, var(--vp-c-text-1) 10%, transparent), rgba(255, 255, 255, 0.08)),
      0 16px 40px -16px light-dark(rgba(16, 24, 40, 0.22), rgba(0, 0, 0, 0.6));
}

.companion-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left top;
}

html:not(.dark) .companion-media .dark,
html.dark .companion-media .light {
  display: none;
}


.points {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 24px 0 0;
}

.points li {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 6px 0;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.points i {
  flex-shrink: 0;
  width: 18px;
  text-align: center;
  font-size: 1rem;
  line-height: 1.5rem;
  color: light-dark(#1976D2, var(--vp-c-brand-1));
}


.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.download {
  position: relative;
}

.download-toggle {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.download-chevron {
  font-size: 1rem;
  transition: transform 0.2s ease;
}

.download-toggle[aria-expanded="true"] .download-chevron {
  transform: rotate(180deg);
}

.download-menu {
  position: absolute;
  bottom: calc(100% + 8px);
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
}

.download-menu.below {
  top: calc(100% + 8px);
  bottom: auto;
}

.download-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.download-item:hover {
  background-color: var(--vp-c-default-soft);
}

.download-icon {
  flex-shrink: 0;
  width: 18px;
  text-align: center;
  font-size: 1.0625rem;
  color: var(--vp-c-text-2);
}

.download-name {
  flex: 1;
  font-weight: 500;
}

.download-format {
  color: var(--vp-c-text-3);
}


@media screen and (max-width: 1320px) {
  .companion {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: "text" "media";
    gap: 28px;
  }

  .companion-text,
  .companion-media {
    width: 100%;
    max-width: 920px;
    margin: 0 auto;
  }
}

/* measured on the text column, so a classic scrollbar or a zoom level cannot fool it */
@container (max-width: 440px) {
  .actions {
    position: relative;
  }

  .download {
    position: static;
  }

  .download-menu {
    right: 0;
    min-width: 0;
  }
}

</style>
