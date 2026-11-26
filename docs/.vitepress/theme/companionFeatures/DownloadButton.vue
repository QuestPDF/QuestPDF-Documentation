<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Icon from "../Icon.vue";
import { downloads, RELEASES } from "./downloads";

/* PROTOTYPE: one button that downloads the app for the visitor's system at once, and a list beside it with every
   package, for a wrong guess or another machine. Linux has two packages: the browser names the distribution only
   now and then, so without it (as on a phone, an unknown system and in the build) the button opens the list.
   `up` opens the list above the button: at the end of the page the footer would cover it (the page's dot wings
   isolate it, so no z-index lifts the list over the footer). */
withDefaults(defineProps<{ align?: "center" | "start"; up?: boolean }>(), { align: "center", up: false });

const guess = ref<(typeof downloads)[number]>();

onMounted(() => {
  const agent = navigator.userAgent;

  if (/Android|iPhone|iPad/.test(agent) || navigator.maxTouchPoints > 1 && /Macintosh/.test(agent))
    return;

  const note =
    /Windows/.test(agent) ? ".msix" :
    /Macintosh/.test(agent) ? ".dmg" :
    /Ubuntu|Debian|Mint/i.test(agent) ? ".deb" :
    /Fedora|Red Hat|SUSE|CentOS/i.test(agent) ? ".rpm" :
    undefined;

  guess.value = note ? downloads.find(each => each.note.startsWith(note)) : undefined;
});

const label = computed(() => {
  const download = guess.value;
  if (!download) return "Download";
  return download.name === "Linux" ? `Download for Linux (${download.note.slice(0, 4)})` : `Download for ${download.name}`;
});

/* the list */
const open = ref(false);
const root = ref<HTMLElement>();
const toggle = ref<HTMLButtonElement>();

function close(returnFocus = false) {
  open.value = false;
  if (returnFocus) nextTick(() => toggle.value?.focus());
}

function onPointerDown(event: PointerEvent) {
  if (open.value && !root.value?.contains(event.target as Node)) close();
}

function onKeyDown(event: KeyboardEvent) {
  if (open.value && event.key === "Escape") close(true);
}

onMounted(() => {
  document.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("keydown", onKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onPointerDown);
  document.removeEventListener("keydown", onKeyDown);
});
</script>

<template>
  <div ref="root" class="download-cta" :class="[`align-${align}`, { split: guess, up }]">
    <div class="buttons">
      <a v-if="guess" class="action primary main" :href="guess.href">
        <Icon :icon="guess.icon" />
        {{ label }}
      </a>

      <button
          ref="toggle"
          type="button"
          class="action primary toggle"
          :aria-expanded="open"
          aria-controls="download-list"
          :aria-label="guess ? 'Other systems and packages' : undefined"
          @click="open = !open">
        <template v-if="!guess">{{ label }}</template>
        <span class="vpi-chevron-down chevron" :class="{ turned: open }"></span>
      </button>
    </div>

    <div v-show="open" id="download-list" class="list">
      <a v-for="download of downloads" :key="download.href" class="item" :href="download.href" @click="close()">
        <Icon class="item-system" :icon="download.icon" />
        <span class="item-text">
          <span class="item-name">{{ download.name }}</span>
          <span class="item-note">{{ download.note }}</span>
        </span>
      </a>

      <a class="item older" :href="RELEASES" target="_blank" rel="noreferrer" @click="close()">
        <Icon class="item-system" :icon="faGithub" />
        <span class="item-text">
          <span class="item-name">Older versions</span>
          <span class="item-note">GitHub Releases</span>
        </span>
      </a>
    </div>
  </div>
</template>

<style scoped>

.download-cta {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.download-cta.align-start {
  align-items: flex-start;
}

.buttons {
  display: inline-flex;
  max-width: 100%;
}

.main .icon {
  margin-right: 8px;
}

/* the two halves read as one button, split by a thin line */
.split .main {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.split .toggle {
  padding-inline: 12px 14px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 1px solid rgba(255, 255, 255, 0.28);
}

.split .main:hover,
.split .toggle:hover {
  transform: none;
}

.toggle {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

/* VitePress turns the chevron down with transform, so the open state turns it with rotate */
.chevron {
  width: 14px;
  height: 14px;
  transition: rotate 0.15s ease;
}

.chevron.turned {
  rotate: 180deg;
}

.up .chevron {
  rotate: 180deg;
}

.up .chevron.turned {
  rotate: 0deg;
}


.list {
  position: absolute;
  top: calc(100% + 8px);
  z-index: 20;
  display: flex;
  flex-direction: column;
  width: 300px;
  max-width: calc(100vw - 32px);
  padding: 6px;
  border-radius: 14px;
  text-align: left;
  background-color: var(--vp-c-bg-elv);
  box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 10%, transparent),
      0 12px 32px -8px rgba(16, 24, 40, 0.28);
}

.up .list {
  top: auto;
  bottom: calc(100% + 8px);
}

.align-center .list {
  left: 50%;
  translate: -50% 0;
}

.align-start .list {
  left: 0;
}

.item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 12px;
  border-radius: 10px;
  text-decoration: none;
}

.item:hover,
.item:focus-visible {
  background-color: color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
}

.item-system {
  flex: none;
  width: 1.25rem;
  font-size: 1.25rem;
  color: var(--vp-c-text-1);
}

.item-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.item-name {
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.375rem;
  color: var(--vp-c-text-1);
}

.item-note {
  font-size: 0.8125rem;
  line-height: 1.125rem;
  color: var(--vp-c-text-2);
}

/* the way to older versions closes the list, set apart from the packages */
.older {
  margin-top: 6px;
  position: relative;
}

.older::before {
  content: "";
  position: absolute;
  top: -4px;
  left: 12px;
  right: 12px;
  border-top: 1px solid var(--vp-c-divider);
}

</style>
