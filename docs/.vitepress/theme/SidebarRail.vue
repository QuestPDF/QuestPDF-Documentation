<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useData, useRoute } from "vitepress";

/* PROTOTYPE (QST-741): the documentation menu can fold into a rail of section icons, like the Companion App's panel.
   Hovering the rail (or focusing it) unfolds the whole menu over the page; the button pins it open or folds it again.

   - A page starts folded with `pageClass: sidebar-collapsed` in its frontmatter, every other page starts open.
   - The visitor's own choice (the button) wins on every page; it is kept in localStorage and applied by a script in
     <head> (config.ts) as html[data-sidebar], so the page paints in the right state before Vue starts.
   - Below 960px none of this applies: VitePress's own mobile menu stays in charge. */

const STORAGE_KEY = "questpdf-sidebar";
const OPEN_DELAY = 40;
const CLOSE_DELAY = 250;

type Mode = "rail" | "docked";

const { frontmatter } = useData();
const route = useRoute();

const choice = ref<Mode | null>(null);
const peek = ref(false);

const pageDefault = computed<Mode>(() =>
    String(frontmatter.value.pageClass ?? "").split(/\s+/).includes("sidebar-collapsed") ? "rail" : "docked");

const mode = computed<Mode>(() => choice.value ?? pageDefault.value);

const label = computed(() =>
    mode.value === "docked" ? "Collapse navigation" : peek.value ? "Pin navigation" : "Expand navigation");

function layout() {
  return document.querySelector(".Layout");
}

watch(peek, value => layout()?.classList.toggle("sidebar-peek", value));
watch(() => route.path, () => peek.value = false);

function toggle() {
  choice.value = mode.value === "rail" ? "docked" : "rail";
  peek.value = false;

  document.documentElement.dataset.sidebar = choice.value;

  try {
    localStorage.setItem(STORAGE_KEY, choice.value);
  }
  catch {
    /* no storage: the choice lasts until the page reloads */
  }
}


/* Peeking */

let openTimer: ReturnType<typeof setTimeout> | undefined;
let closeTimer: ReturnType<typeof setTimeout> | undefined;

function clearTimers() {
  clearTimeout(openTimer);
  clearTimeout(closeTimer);
}

/* a short delay, so a pointer only passing over the rail does not unfold it */
function onEnter() {
  if (mode.value !== "rail")
    return;

  clearTimers();
  openTimer = setTimeout(() => peek.value = true, OPEN_DELAY);
}

/* a short grace period, so a pointer slipping off the edge for a moment does not fold it */
function onLeave() {
  clearTimers();
  closeTimer = setTimeout(() => peek.value = false, CLOSE_DELAY);
}

let sidebar: HTMLElement | null = null;

function onFocusIn() {
  if (mode.value === "rail")
    peek.value = true;
}

function onFocusOut(event: FocusEvent) {
  if (!sidebar?.contains(event.relatedTarget as Node | null))
    peek.value = false;
}

/* a click on a section icon in the folded rail unfolds the menu at once; it opens a folded section, but never folds
   an open one the visitor could not see yet */
function onClickCapture(event: MouseEvent) {
  const target = event.target as HTMLElement;

  if (target.closest(".VPSidebar a")) {
    peek.value = false;
    return;
  }

  if (mode.value !== "rail" || peek.value)
    return;

  const row = target.closest(".is-section > .row");

  if (!row)
    return;

  clearTimers();
  peek.value = true;

  if (!row.parentElement?.classList.contains("is-collapsed"))
    event.stopPropagation();
}

/* Pinned open on a page that starts folded (`sidebar-collapsed`, floating or not), the menu pushes the page aside only
   when it would cover the text: the page is
   laid out as if the menu were folded (`sidebar-fits`), and if the card's right edge then reaches past the start of
   the text, the class goes and the page moves over. Checked again on every resize and page change. */

const FIT_CLASS = "sidebar-fits";
let fitFrame = 0;

function textLeft() {
  /* tried in this order: one combined selector would return .VPPage, which wraps the custom page's narrower text */
  const element = [".VPDoc .content-container", ".VPContent .custom-page .content", ".VPContent .VPPage"]
      .map(selector => document.querySelector<HTMLElement>(selector))
      .find(each => each);
  if (!element) return Infinity;
  return element.getBoundingClientRect().left + parseFloat(getComputedStyle(element).paddingLeft || "0");
}

function checkFit() {
  const root = layout();
  if (!root) return;

  const floating = root.classList.contains("sidebar-floating");
  const showcase = root.classList.contains("sidebar-collapsed");

  if (!(floating || showcase) || mode.value !== "docked" || window.innerWidth < 960) {
    root.classList.remove(FIT_CLASS);
    return;
  }

  root.classList.add(FIT_CLASS);
  /* the floating menu is a card inside the sidebar; the plain one is the sidebar itself */
  const menu = floating ? sidebar?.querySelector(".nav") : sidebar;
  const cardRight = menu?.getBoundingClientRect().right ?? 0;

  if (textLeft() < cardRight + 16)
    root.classList.remove(FIT_CLASS);
}

function scheduleFit() {
  cancelAnimationFrame(fitFrame);
  fitFrame = requestAnimationFrame(checkFit);
}

watch(mode, scheduleFit);
watch(() => route.path, scheduleFit, { flush: "post" });

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape" && peek.value) {
    peek.value = false;
    (document.activeElement as HTMLElement | null)?.blur();
  }
}

onMounted(() => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored === "rail" || stored === "docked")
      choice.value = stored;
  }
  catch {
    /* no storage: every page starts in its own default */
  }

  sidebar = document.querySelector<HTMLElement>(".VPSidebar");
  sidebar?.addEventListener("mouseenter", onEnter);
  sidebar?.addEventListener("mouseleave", onLeave);
  sidebar?.addEventListener("focusin", onFocusIn);
  sidebar?.addEventListener("focusout", onFocusOut);
  sidebar?.addEventListener("click", onClickCapture, true);
  document.addEventListener("keydown", onKeydown);
  window.addEventListener("resize", scheduleFit);
  scheduleFit();
});

onBeforeUnmount(() => {
  clearTimers();
  sidebar?.removeEventListener("mouseenter", onEnter);
  sidebar?.removeEventListener("mouseleave", onLeave);
  sidebar?.removeEventListener("focusin", onFocusIn);
  sidebar?.removeEventListener("focusout", onFocusOut);
  sidebar?.removeEventListener("click", onClickCapture, true);
  document.removeEventListener("keydown", onKeydown);
  window.removeEventListener("resize", scheduleFit);
  cancelAnimationFrame(fitFrame);
  layout()?.classList.remove(FIT_CLASS);
  layout()?.classList.remove("sidebar-peek");
});
</script>

<template>
  <div class="sidebar-rail-controls">
    <button
        type="button"
        class="sidebar-rail-toggle"
        :aria-label="label"
        :title="label"
        :aria-pressed="mode === 'docked'"
        @click="toggle">
      <!-- a panel with a side pane, drawn like the Companion App's toggle -->
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <rect x="2.5" y="3.5" width="15" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.5" />
        <line x1="8" y1="3.5" x2="8" y2="16.5" stroke="currentColor" stroke-width="1.5" />
        <line x1="4.5" y1="7" x2="6" y2="7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        <line x1="4.5" y1="9.5" x2="6" y2="9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

<style>
/* not scoped: these rules reach VitePress's own sidebar, content and footer. The rail state is
   `html[data-sidebar="rail"]` (the visitor's choice) or, with no choice made, the page's `sidebar-collapsed` class. */

:root {
  --sidebar-rail-width: 64px;
  --sidebar-rail-pad: 12px;
}

.sidebar-rail-controls {
  display: none;
}

@media (min-width: 60rem) {
  .sidebar-rail-controls {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
  }

  .sidebar-rail-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin-inline-end: -8px;
    border-radius: 8px;
    color: var(--vp-c-text-3);
    transition: color 0.15s ease, background-color 0.15s ease;
  }

  .sidebar-rail-toggle:hover {
    color: var(--vp-c-text-1);
    background-color: var(--doc-hover);
  }

  .sidebar-rail-toggle svg {
    width: 20px;
    height: 20px;
  }

  /* lit while the menu is pinned open */
  .sidebar-rail-toggle[aria-pressed="true"] {
    color: light-dark(#1976D2, var(--vp-c-brand-1));
  }


  /* Folded: a narrow rail at the window's edge. Under html:root, so each rule outweighs DocPages.css. */

  html:root :is(html[data-sidebar="rail"] .Layout, html:not([data-sidebar]) .Layout.sidebar-collapsed) {
    & > .VPSidebar {
      padding-left: var(--sidebar-rail-pad);
      padding-right: var(--sidebar-rail-pad);
      width: var(--sidebar-rail-width);
      overflow-y: auto;
      scrollbar-width: none;
      transition: width 0.14s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.14s ease;
    }

    & > .VPSidebar .curtain {
      margin-inline: calc(var(--sidebar-rail-pad) * -1);
    }

    /* the menu is always laid out at its full width; the rail only clips it, so nothing reflows while it unfolds */
    & > .VPSidebar .nav {
      width: calc(var(--vp-sidebar-width) - var(--sidebar-rail-pad) - 2rem);
    }

    &:not(.sidebar-peek) > .VPSidebar {
      .nav {
        width: calc(var(--sidebar-rail-width) - 2 * var(--sidebar-rail-pad));
      }

      .sidebar-rail-controls {
        justify-content: center;
      }

      .sidebar-rail-toggle {
        width: 40px;
        height: 40px;
        margin: 0;
      }

      .is-section {
        padding-bottom: 6px;
      }

      .is-section > .row {
        justify-content: center;
        width: 40px;
        height: 40px;
        min-height: 0;
        margin: 0;
        padding: 0;
      }

      .is-section > .row .text,
      .is-section > .row .caret,
      .is-section > .items {
        display: none;
      }

      .section-icon {
        margin: 0;
        color: var(--vp-c-text-2);
      }

      /* the section that holds this page */
      .is-section.has-current > .row {
        background-color: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
      }

      .is-section.has-current .section-icon {
        color: var(--vp-c-brand-1);
      }
    }

    /* unfolded over the page; the icons and the button keep their place */
    /* (the floating menu has its own button card) */
    &.sidebar-peek:not(.sidebar-floating) > .VPSidebar .sidebar-rail-controls {
      justify-content: flex-start;
    }

    &.sidebar-peek:not(.sidebar-floating) > .VPSidebar .sidebar-rail-toggle {
      width: 40px;
      height: 40px;
      margin: 0 0 0 -10px;
    }

    &.sidebar-peek > .VPSidebar {
      padding-left: calc(var(--sidebar-rail-pad) + 10px);
      padding-right: 2rem;
      width: var(--vp-sidebar-width);
      box-shadow: var(--vp-shadow-4);
      scrollbar-width: thin;
    }

    & > .VPContent.has-sidebar {
      padding-left: max(var(--sidebar-rail-width), (100% - var(--vp-layout-max-width)) / 2);
      padding-right: max(0px, (100% - var(--vp-layout-max-width)) / 2);
    }

    & > footer {
      padding-left: max(var(--sidebar-rail-width), (100% - var(--vp-layout-max-width)) / 2);
    }

    & > footer > .content {
      margin-inline-start: 0;
    }
  }


  /* Pinned open on a page that starts folded, plain menu: the usual menu width at the window's edge (VitePress widens
     it to the window's edge on wide screens), and the page moves over only when the menu would cover its text */
  html[data-sidebar="docked"]:root .Layout.sidebar-collapsed:not(.sidebar-floating) {
    /* the same inset as the folded rail unfolded, so the icons and the button keep their place */
    & > .VPSidebar {
      padding-left: calc(var(--sidebar-rail-pad) + 10px);
      padding-right: 2rem;
      width: var(--vp-sidebar-width);
    }

    & > .VPSidebar .sidebar-rail-controls {
      justify-content: flex-start;
    }

    & > .VPSidebar .sidebar-rail-toggle {
      width: 40px;
      height: 40px;
      margin: 0 0 0 -10px;
    }

    &:not(.sidebar-fits) > .VPContent.has-sidebar {
      padding-left: max(var(--vp-sidebar-width), (100% - var(--vp-layout-max-width)) / 2);
      padding-right: max(0px, (100% - var(--vp-layout-max-width)) / 2);
    }

    &:not(.sidebar-fits) > footer {
      padding-left: max(var(--vp-sidebar-width), (100% - var(--vp-layout-max-width)) / 2);
    }

    &.sidebar-fits > .VPContent.has-sidebar {
      padding-left: max(var(--sidebar-rail-width), (100% - var(--vp-layout-max-width)) / 2);
      padding-right: max(0px, (100% - var(--vp-layout-max-width)) / 2);
    }

    &.sidebar-fits > footer {
      padding-left: max(var(--sidebar-rail-width), (100% - var(--vp-layout-max-width)) / 2);
    }

    &.sidebar-fits > .VPSidebar {
      box-shadow: var(--vp-shadow-3);
    }

    & > footer > .content {
      margin-inline-start: 0;
    }
  }


  /* Floating (`pageClass: sidebar-floating`): no pane against the wall, but two cards hovering over the page like
     the Companion App's controls: the pin button on its own, and below it the menu */

  html:root .Layout.sidebar-floating {
    --sidebar-rail-width: 84px;
    --sidebar-rail-pad: 16px;
    --sidebar-card-gap: 12px;
    --sidebar-toggle-height: 44px;

    & > .VPSidebar {
      padding-top: calc(var(--vp-nav-height) + 16px);
      padding-bottom: 16px;
      background-color: transparent;
      border-inline-end: none;
      box-shadow: none;
      scrollbar-width: none;
    }

    & > .VPSidebar .curtain {
      display: none;
    }

    & > .VPSidebar .nav {
      position: relative;
      margin-top: calc(var(--sidebar-toggle-height) + var(--sidebar-card-gap));
      padding: 6px;
      border-radius: 16px;
      background-color: var(--vp-c-bg-elv);
      box-shadow:
          inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 12%, transparent),
          0 4px 12px -4px rgba(16, 24, 40, 0.18);
    }

    & > .VPSidebar .group {
      width: auto;
      padding-top: 0;
    }

    & > .VPSidebar .sidebar-rail-controls {
      position: absolute;
      top: calc((var(--sidebar-toggle-height) + var(--sidebar-card-gap)) * -1);
      left: 0;
      padding: 0;
    }

    & > .VPSidebar .sidebar-rail-toggle {
      width: 52px;
      height: var(--sidebar-toggle-height);
      margin: 0;
      border-radius: 14px;
      color: var(--vp-c-text-2);
      background-color: var(--vp-c-bg-elv);
      box-shadow:
          inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 12%, transparent),
          0 4px 12px -4px rgba(16, 24, 40, 0.18);
    }

    & > .VPSidebar .sidebar-rail-toggle:hover {
      color: var(--vp-c-text-1);
    }

    & > .VPSidebar .sidebar-rail-toggle[aria-pressed="true"] {
      color: light-dark(#1976D2, var(--vp-c-brand-1));
      box-shadow:
          inset 0 0 0 1px color-mix(in srgb, light-dark(#1976D2, var(--vp-c-brand-1)) 45%, transparent),
          0 4px 12px -4px rgba(16, 24, 40, 0.18);
    }
  }

  /* folded: the rail rules above give the sizes, these keep the cards' own */
  html:root :is(html[data-sidebar="rail"] .Layout, html:not([data-sidebar]) .Layout.sidebar-collapsed).sidebar-floating {
    & > .VPSidebar .sidebar-rail-toggle {
      width: 52px;
      height: var(--sidebar-toggle-height);
    }

    /* unfolded: the menu card grows over the page, the icons keep their place */
    &.sidebar-peek > .VPSidebar {
      padding-left: var(--sidebar-rail-pad);
      padding-right: var(--sidebar-rail-pad);
      width: calc(var(--vp-sidebar-width) + 2 * var(--sidebar-rail-pad));
      box-shadow: none;
    }

    &.sidebar-peek > .VPSidebar .nav {
      width: var(--vp-sidebar-width);
      padding: 6px 16px 10px;
      box-shadow:
          inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 12%, transparent),
          var(--vp-shadow-4);
    }
  }

  /* pinned open: the full menu card beside the page */
  html:root :is(html[data-sidebar="docked"] .Layout, html:not([data-sidebar]) .Layout:not(.sidebar-collapsed)).sidebar-floating {
    & > .VPSidebar {
      padding-left: var(--sidebar-rail-pad);
      padding-right: var(--sidebar-rail-pad);
      width: calc(var(--vp-sidebar-width) + 2 * var(--sidebar-rail-pad));
    }

    & > .VPSidebar .nav {
      width: var(--vp-sidebar-width);
      padding: 6px 16px 10px;
    }

    /* the page moves over only when the card would cover its text (see checkFit) */
    &:not(.sidebar-fits) > .VPContent.has-sidebar {
      padding-left: max(var(--vp-sidebar-width) + 2 * var(--sidebar-rail-pad), (100% - var(--vp-layout-max-width)) / 2);
      padding-right: max(0px, (100% - var(--vp-layout-max-width)) / 2);
    }

    &:not(.sidebar-fits) > footer {
      padding-left: max(var(--vp-sidebar-width) + 2 * var(--sidebar-rail-pad), (100% - var(--vp-layout-max-width)) / 2);
    }

    /* the card fits beside the text: the page keeps the place it has with the menu folded */
    &.sidebar-fits > .VPContent.has-sidebar {
      padding-left: max(var(--sidebar-rail-width), (100% - var(--vp-layout-max-width)) / 2);
      padding-right: max(0px, (100% - var(--vp-layout-max-width)) / 2);
    }

    &.sidebar-fits > footer {
      padding-left: max(var(--sidebar-rail-width), (100% - var(--vp-layout-max-width)) / 2);
    }

    & > footer > .content {
      margin-inline-start: 0;
    }
  }
}
</style>
