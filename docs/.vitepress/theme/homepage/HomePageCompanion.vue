<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Development Tool</div>
      <h2>Companion App</h2>
      <p class="sub-header">Accelerate development with live document preview and hot-reload capability. See your changes instantly without recompiling.</p>
    </div>

    <!-- capabilities on the left, the app on the right; a divider and the calls to action along the bottom -->
    <div class="panel companion-panel">
      <div class="companion-main">
        <div class="capabilities">
          <article v-for="capability of capabilities" :key="capability.title" class="capability">
            <div class="capability-icon">
              <i class="fa-regular" :class="[capability.icon]"></i>
            </div>

            <div class="capability-body">
              <h3 class="capability-title">{{ capability.title }}</h3>
              <p class="capability-description">{{ capability.description }}</p>
            </div>
          </article>
        </div>

        <div class="image-container">
          <img :src="`/companion/application-light.webp`" alt="Companion App" class="companion-image light" />
          <img :src="`/companion/application-dark.webp`" alt="Companion App" class="companion-image dark" />
        </div>
      </div>

      <div class="companion-footer">
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

            <div v-if="isDownloadOpen" class="download-menu" role="menu">
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

        <div class="platforms">
          <span class="platforms-label">Free on</span>
          <span v-for="platform of platforms" :key="platform.name" class="platform">
            <img :src="`/homepage/supported-platforms/${platform.src}`" alt="" />
            {{ platform.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

import { onBeforeUnmount, onMounted, ref } from "vue";

const capabilities = [
  {
    icon: "fa-bolt",
    title: "Hot reload",
    description: "Save your code and the preview refreshes in place. No rebuild, no restart, no lost scroll position."
  },
  {
    icon: "fa-folder-tree",
    title: "Document hierarchy",
    description: "Explore the element tree, select any node, and jump straight to its implementation in your IDE."
  },
  {
    icon: "fa-magnifying-glass",
    title: "Magnify and measure",
    description: "Zoom into details, pick coordinates, and measure sizes and distances between elements."
  },
  {
    icon: "fa-bug",
    title: "Runtime exceptions",
    description: "Review the message, the stack trace, and the exact code snippet that threw."
  },
  {
    icon: "fa-layer-group",
    title: "Layout issue debugging",
    description: "Color-coded hints point to the element that overflowed and explain why it did."
  }
];

const platforms = [
  { src: "windows.svg", name: "Windows" },
  { src: "apple.svg", name: "macOS" },
  { src: "linux.svg", name: "Linux" }
];

// keep in sync with the latest release listed in docs/companion/download.md
const companionVersion = "2026.2.2";
const releaseUrl = `https://github.com/QuestPDF/QuestPDF.Companion/releases/download/${companionVersion}`;

const downloads = [
  { src: "windows.svg", name: "Windows", format: ".msix", url: `${releaseUrl}/questpdf_companion-${companionVersion}-windows.msix` },
  { src: "apple.svg", name: "macOS", format: ".dmg", url: `${releaseUrl}/QuestPDF.Companion.${companionVersion}.dmg` },
  { src: "linux.svg", name: "Linux", format: ".deb", url: `${releaseUrl}/questpdf_companion-${companionVersion}-linux.deb` },
  { src: "linux.svg", name: "Linux", format: ".rpm", url: `${releaseUrl}/questpdf_companion-${companionVersion}-linux.rpm` }
];

const isDownloadOpen = ref(false);
const downloadRef = ref(null);

function closeOnOutsideClick(event) {
  if (downloadRef.value && !downloadRef.value.contains(event.target))
    isDownloadOpen.value = false;
}

function closeOnEscape(event) {
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

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.companion-panel {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 32px;
}

.companion-main {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  grid-gap: 64px;
  align-items: start;
}

@media screen and (max-width: 960px) {
  .companion-main {
    grid-template-columns: minmax(0, 1fr);
    grid-gap: 40px;
  }
}


/* Capabilities: icon tile beside a title and a short description */

.capabilities {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.capability {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 16px;
  align-items: start;
}

.capability-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: var(--home-surface-inner);
}

.capability-icon i {
  font-size: 1.25rem;
  color: var(--vp-c-text-1);
}

.capability-title {
  margin: 0;
  font-size: 1.0625rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.capability-description {
  margin: 2px 0 0;
  font-size: 0.9375rem;
  line-height: 1.375rem;
  color: var(--vp-c-text-2);
}


/* Footer: a hairline, then the calls to action on the left and the platforms on the right */

.companion-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px 32px;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid var(--vp-c-divider);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
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
}

.download-item,
.download-all {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 0.9375rem;
  line-height: 1.25rem;
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
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
}

.download-all {
  margin-top: 6px;
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  justify-content: space-between;
  font-size: 0.875rem;
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


/* Screenshot */

.companion-image {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid #8884;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

html:not(.dark) .companion-image.dark {
  display: none;
}

html.dark .companion-image.light {
  display: none;
}


</style>
