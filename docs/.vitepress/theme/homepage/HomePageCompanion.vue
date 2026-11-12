<template>
  <div class="panel companion">
    <div class="companion-text">
      <h2 class="card-title">Companion App</h2>
      <p class="card-description">Make a change, see the result. Hot-&#8288;reload keeps the preview in sync, so every tweak is quick and effortless.</p>

      <ul class="points" aria-label="What the Companion App does">
        <li v-for="point of points" :key="point.text">
          <Icon :icon="point.icon" />
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
            <Icon class="download-chevron" :icon="faChevronDown" />
          </button>

          <div v-if="isDownloadOpen" ref="downloadMenuRef" class="download-menu" :class="{ below: isDownloadBelow }">
            <a
              v-for="download of downloads"
              :key="download.url"
              class="download-item"
              :href="download.url"
              @click="isDownloadOpen = false">
              <Icon class="download-icon" :icon="download.icon" />
              <span class="download-name">{{ download.name }}</span>
              <span class="download-format">{{ download.format }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <HomePageCompanionScreens class="companion-media" />
  </div>
</template>

<script setup lang="ts">
import { faArrowPointer, faBug, faChevronDown, faCode, faFolderTree, faRulerCombined } from "@fortawesome/pro-regular-svg-icons";
import { faApple, faLinux, faWindows } from "@fortawesome/free-brands-svg-icons";
import Icon from "../Icon.vue";
import HomePageCompanionScreens from "./HomePageCompanionScreens.vue";

import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

/* facts from docs/companion/features.md */
const points = [
  { icon: faFolderTree, text: "Explore the document structure" },
  { icon: faArrowPointer, text: "Inspect any element" },
  { icon: faRulerCombined, text: "Magnify and measure details" },
  { icon: faCode, text: "Jump from preview to code" },
  { icon: faBug, text: "Debug exceptions and layouts" }
];

/* the latest release; keep in sync with docs/companion/download.md and public/companion/latest-version */
const companionVersion = "2026.11.0";
const releaseUrl = `https://github.com/QuestPDF/QuestPDF.CompanionApp/releases/download/${companionVersion}`;

const downloads = [
  { icon: faWindows, name: "Windows", format: ".msix", url: `${releaseUrl}/questpdf_companion-${companionVersion}-windows.msix` },
  { icon: faApple, name: "macOS", format: ".dmg", url: `${releaseUrl}/QuestPDF.Companion.${companionVersion}.dmg` },
  { icon: faLinux, name: "Linux", format: ".deb", url: `${releaseUrl}/questpdf_companion-${companionVersion}-linux.deb` },
  { icon: faLinux, name: "Linux", format: ".rpm", url: `${releaseUrl}/questpdf_companion-${companionVersion}-linux.rpm` }
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
  gap: 64px;
  align-items: center;
}

.companion-text {
  grid-area: text;
  container-type: inline-size;
}

.companion .card-description {
  text-wrap: pretty;
}

.companion-media {
  grid-area: media;
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

.points .icon {
  flex-shrink: 0;
  width: 18px;
  margin-top: 0.25rem;
  font-size: 1rem;
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
