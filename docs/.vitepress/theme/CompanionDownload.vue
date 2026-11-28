<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId } from "vue";
import { faChevronDown } from "@fortawesome/pro-regular-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Icon from "./Icon.vue";
import { downloads, RELEASES, type Download } from "./companionDownloads";

/* The Companion App's download, on the homepage and the Companion page. One half downloads the package for the
   visitor's system, the other opens every package and the older versions. Without a guess (a phone, an unknown system,
   Linux without its distribution, the build) only the list's half shows, as "Download". */
const { primary = false, align = "start" } = defineProps<{ primary?: boolean; align?: "start" | "center" }>();

const guess = ref<Download>();

onMounted(() => {
  const agent = navigator.userAgent;

  if (/Android|iPhone|iPad/.test(agent) || navigator.maxTouchPoints > 1 && /Macintosh/.test(agent))
    return;

  const format =
    /Windows/.test(agent) ? ".msix" :
    /Macintosh/.test(agent) ? ".dmg" :
    /Ubuntu|Debian|Mint/i.test(agent) ? ".deb" :
    /Fedora|Red Hat|SUSE|CentOS/i.test(agent) ? ".rpm" :
    undefined;

  guess.value = downloads.find(download => download.format === format);
});

const label = computed(() => {
  const download = guess.value!;
  return download.name === "Linux" ? `Download for Linux (${download.format})` : `Download for ${download.name}`;
});


/* The list */

const listId = useId();
const open = ref(false);
const below = ref(false);
const shift = ref(0);

const root = ref<HTMLElement>();
const toggle = ref<HTMLButtonElement>();
const list = ref<HTMLElement>();

/* opens upwards unless the navbar would cover it and there is more room below, and moves sideways to stay 16px inside
   the window; measured before the browser paints it */
async function toggleList() {
  open.value = !open.value;

  if (!open.value)
    return;

  below.value = false;
  shift.value = 0;
  await nextTick();

  if (!list.value || !root.value)
    return;

  const { top, bottom } = root.value.getBoundingClientRect();
  const navbarBottom = Math.max(0, document.querySelector(".VPNav")?.getBoundingClientRect().bottom ?? 0);
  const roomAbove = top - navbarBottom;
  const roomBelow = window.innerHeight - bottom;
  below.value = roomAbove < list.value.offsetHeight + 8 && roomBelow > roomAbove;

  const { left, right } = list.value.getBoundingClientRect();
  const edge = 16;
  const width = document.documentElement.clientWidth;
  shift.value = right > width - edge ? width - edge - right : left < edge ? edge - left : 0;
}

function close(returnFocus = false) {
  open.value = false;

  if (returnFocus)
    nextTick(() => toggle.value?.focus());
}

function closeOnOutsidePress(event: PointerEvent) {
  if (open.value && !root.value?.contains(event.target as Node))
    close();
}

function closeOnEscape(event: KeyboardEvent) {
  if (open.value && event.key === "Escape")
    close(true);
}

onMounted(() => {
  document.addEventListener("pointerdown", closeOnOutsidePress);
  document.addEventListener("keydown", closeOnEscape);
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", closeOnOutsidePress);
  document.removeEventListener("keydown", closeOnEscape);
});
</script>

<template>
  <div ref="root" class="companion-download" :class="[`align-${align}`, { split: guess }]">
    <a v-if="guess" class="action main" :class="{ primary }" :href="guess.href">
      <Icon :icon="guess.icon" />
      {{ label }}
    </a>

    <!-- a <button>, not a link: the VitePress router would navigate on a link click -->
    <button
      ref="toggle"
      type="button"
      class="action toggle"
      :class="{ primary }"
      :aria-expanded="open"
      :aria-controls="open ? listId : undefined"
      :aria-label="guess ? 'Other systems and older versions' : undefined"
      @click="toggleList">
      <template v-if="!guess">Download</template>
      <Icon class="chevron" :icon="faChevronDown" />
    </button>

    <div
      v-if="open"
      :id="listId"
      ref="list"
      class="menu-panel list"
      :class="{ below }"
      :style="{ marginInlineStart: `${shift}px` }">
      <a v-for="download of downloads" :key="download.href" class="item" :href="download.href" @click="close()">
        <Icon class="item-icon" :icon="download.icon" />
        <span class="item-name">{{ download.name }}</span>
        <span class="item-detail">{{ download.format }}</span>
      </a>

      <div class="divider" aria-hidden="true"></div>

      <a class="item" :href="RELEASES" target="_blank" rel="noreferrer" @click="close()">
        <Icon class="item-icon" :icon="faGithub" />
        <span class="item-name">Older versions</span>
        <span class="item-detail">GitHub</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.companion-download {
  position: relative;
  display: flex;
  width: fit-content;
  max-width: 100%;
}

.main,
.toggle {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.chevron {
  font-size: 1rem;
  transition: transform 0.2s ease;
}

.toggle[aria-expanded="true"] .chevron {
  transform: rotate(180deg);
}


/* Two halves of one button: they stay put on hover, and overlap by a pixel, so the secondary's rings meet in one line.
   The secondary main half's shared column is clipped: through the dark theme's translucent fill both rings would show there. */

.split .main {
  border-start-end-radius: 0;
  border-end-end-radius: 0;
}

.split .main:not(.primary, :focus-visible) {
  clip-path: inset(-24px 1px -24px -24px);
}

.split .toggle {
  margin-inline-start: -1px;
  padding-inline: 12px 14px;
  border-start-start-radius: 0;
  border-end-start-radius: 0;
}

.split .primary.toggle {
  border-inline-start: 1px solid rgba(255, 255, 255, 0.28);
}

.split .action:hover {
  transform: none;
}

/* the focused half's ring stays above the other half */
.split .action:focus-visible {
  position: relative;
  z-index: 1;
}


/* The list: the navbar's dropdown panel (.menu-panel) with the rows and the divider of the Documentation menu */

.list {
  position: absolute;
  bottom: calc(100% + 8px);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: max(240px, 100%);
  max-width: calc(100vw - 32px);
  padding: 8px;
}

.list.below {
  top: calc(100% + 8px);
  bottom: auto;
}

.align-start .list {
  left: 0;
}

.align-center .list {
  left: 50%;
  translate: -50% 0;
}

.item {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0.5rem 0.875rem;
  border-radius: 16px;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.item:is(:hover, :focus-visible) {
  background-color: var(--surface-hover);
}

/* solid brand glyphs, so halfway between the name and the grey of the file format */
.item-icon {
  flex-shrink: 0;
  font-size: 1.25rem;
  color: color-mix(in srgb, var(--vp-c-text-1), var(--vp-c-text-3));
}

.item-name {
  flex: 1;
  font-weight: 500;
}

.item-detail {
  color: var(--vp-c-text-3);
}

.divider {
  margin: 4px -8px;
  border-top: 1px solid var(--vp-c-divider);
}
</style>
