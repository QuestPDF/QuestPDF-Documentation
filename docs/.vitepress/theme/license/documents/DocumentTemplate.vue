<template>
  <section class="custom-page document-page legal-page texture-dots">
    <div class="content">
      <header class="section-header document-header">
        <h1>{{ doc.title }}</h1>

        <!-- effective date and version, taken from the top of the markdown source -->
        <dl v-if="doc.meta.length" class="document-meta">
          <div v-for="item in doc.meta" :key="item.label">
            <dt>{{ item.label }}</dt>
            <dd>{{ item.value }}</dd>
          </div>
        </dl>
      </header>

      <div class="document-layout">
        <nav class="document-contents" :class="{ 'is-clipped': railClipped }" aria-label="Sections" ref="rail" @scroll.passive="clipRail">
          <span class="document-contents-label">Contents</span>
          <ol class="document-contents-list" :style="marker">
            <li v-for="(section, index) in doc.sections" :key="section.id">
              <a
                  class="document-contents-link"
                  :class="{ 'is-active': index === active }"
                  :href="`#${section.id}`"
                  :ref="element => links[index] = element as HTMLElement"
                  @click="active = index">
                {{ section.title }}
              </a>
            </li>
          </ol>
        </nav>

        <div class="document-main">
          <!-- on narrow screens the sections fold into a list above the text -->
          <details class="document-contents-compact">
            <summary>
              <span>Contents</span>
              <span class="document-contents-count">{{ doc.sections.length }} sections</span>
              <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
            </summary>
            <ol>
              <li v-for="section in doc.sections" :key="section.id">
                <a :href="`#${section.id}`">{{ section.title }}</a>
              </li>
            </ol>
          </details>

          <article class="panel document-body vp-doc" ref="body" v-html="doc.html"></article>

          <div class="links">
            <a class="action" href="/license">
              View all licensing documents
            </a>

            <a class="action primary" href="/license/QuestPDF%20License%20Terms.pdf" download>
              Download (PDF)
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { data } from "./licenseDocuments.data";

const props = defineProps<{ id: string }>();

const doc = data[props.id];


/* Contents rail: the section being read is the last one whose heading has passed a line 160px from the top,
   just under where a jump lands a heading. At the bottom of the page, where short closing sections never
   reach that line, it is the section the address points to while its heading is on screen, else the last
   one. The marker is measured from the active link (titles wrap), and the rail scrolls itself to keep that
   link in view. */

const rail = ref<HTMLElement | null>(null);
const body = ref<HTMLElement | null>(null);
const links: HTMLElement[] = [];
const active = ref(0);
const markerBox = ref<{ top: number; height: number } | null>(null);
const railClipped = ref(false);

const marker = computed(() => markerBox.value
    ? { "--marker-top": `${markerBox.value.top}px`, "--marker-height": `${markerBox.value.height}px`, "--marker-opacity": 1 }
    : {});

let headings: HTMLElement[] = [];

function update() {
  const line = 160;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom && headings.length) {
    const target = headings.findIndex(heading => `#${heading.id}` === decodeURIComponent(location.hash));
    const top = target >= 0 ? headings[target].getBoundingClientRect().top : -1;

    active.value = top >= 0 && top < window.innerHeight ? target : headings.length - 1;
    return;
  }

  active.value = Math.max(0, headings.findLastIndex(heading => heading.getBoundingClientRect().top <= line));
}

// the rail's bottom edge fades out while more sections are hidden below it
function clipRail() {
  const container = rail.value!;
  railClipped.value = container.scrollTop + container.clientHeight < container.scrollHeight - 1;
}

function placeMarker() {
  const link = links[active.value];

  if (!link)
    return;

  markerBox.value = { top: link.offsetTop, height: link.offsetHeight };

  // keep the active link inside the rail's own scroll area, without scrolling the page
  const container = rail.value!;
  const linkTop = link.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;

  if (linkTop < container.scrollTop + 40 || linkTop + link.offsetHeight > container.scrollTop + container.clientHeight - 40)
    container.scrollTop = linkTop - container.clientHeight / 3;

  clipRail();
}

watch(active, () => nextTick(placeMarker));

onMounted(() => {
  headings = [...body.value!.querySelectorAll<HTMLElement>("h2[id]")];
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", placeMarker, { passive: true });
  update();
  nextTick(placeMarker);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", update);
  window.removeEventListener("resize", placeMarker);
});
</script>

<style>

.document-page .content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  max-width: 1180px;
}

.document-page .document-header h1 {
  margin-bottom: 0;
}

/* The text column is never wider than the 820px it has from 1200px up (1180 - 64 - 240 - 56), so a narrower
   window, where the rail shrinks or folds away, does not stretch the lines longer than on a desktop. */

.document-page .document-layout {
  --document-text-width: 820px;

  display: grid;
  grid-template-columns: 240px minmax(0, var(--document-text-width));
  justify-content: center;
  gap: 56px;
  width: 100%;
}

.document-page .document-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  min-width: 0;
}

/* labelled facts, like the company details on the contact page */
.document-page .document-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px 56px;
  margin: 28px 0 0;
}

.document-page .document-meta dt {
  margin-bottom: 4px;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.document-page .document-meta dd {
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}


/* Contents rail: the sections on a hairline track, a marker sliding to the one being read; it scrolls on its
   own when taller than the screen (the Professional license has 30 sections) */

.document-page .document-contents {
  position: sticky;
  top: calc(var(--vp-nav-height) + 32px);
  align-self: start;
  max-height: calc(100vh - var(--vp-nav-height) - 64px);
  overflow-y: auto;
  scrollbar-width: none;
  padding-top: 8px;
}

.document-page .document-contents.is-clipped {
  mask-image: linear-gradient(to bottom, #000 calc(100% - 48px), transparent);
}

.document-page .document-contents-label {
  display: block;
  margin: 0 0 12px 18px;
  font-size: 0.75rem;
  line-height: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.document-page .document-contents-list {
  position: relative;
  border-left: 1px solid var(--vp-c-divider);
}

.document-page .document-contents-list::before {
  content: "";
  position: absolute;
  top: 0;
  left: -1px;
  width: 2px;
  height: var(--marker-height, 0);
  border-radius: 2px;
  background-color: #2196F3;
  opacity: var(--marker-opacity, 0);
  transform: translateY(var(--marker-top, 0));
  transition: transform 0.3s ease, height 0.3s ease;
}

.document-page .document-contents-link {
  display: block;
  padding: 7px 0 7px 18px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.2s ease;
}

.document-page .document-contents-link.is-active {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.document-page .document-contents-link:hover,
.document-page .document-contents-compact a:hover {
  color: var(--vp-c-brand-2);
}

/* the folded list for narrow screens, on the same surface as the text */
.document-page .document-contents-compact {
  display: none;
  width: 100%;
  border-radius: 20px;
  background-color: var(--surface);
  box-shadow: var(--surface-edge);
}

.document-page .document-contents-compact summary {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  cursor: pointer;
  list-style: none;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.document-page .document-contents-compact summary::-webkit-details-marker {
  display: none;
}

.document-page .document-contents-count {
  margin-right: auto;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
}

.document-page .document-contents-compact summary i {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  transition: transform 0.2s ease;
}

.document-page .document-contents-compact[open] summary i {
  transform: rotate(180deg);
}

.document-page .document-contents-compact ol {
  padding: 4px 24px 16px 44px;
  border-top: 1px solid var(--vp-c-divider);
}

.document-page .document-contents-compact li {
  margin: 8px 0 0;
}

.document-page .document-contents-compact a {
  font-size: 0.9375rem;
  line-height: 1.375rem;
  color: var(--vp-c-text-1);
}

/* touch: every section link a 44px row */
@media (pointer: coarse) {
  .document-page .document-contents-link {
    padding-block: 12px;
  }

  .document-page .document-contents-compact li {
    margin: 0;
  }

  .document-page .document-contents-compact a {
    display: block;
    padding-block: 11px;
  }
}

@media screen and (max-width: 1200px) {
  .document-page .document-layout {
    grid-template-columns: 200px minmax(0, var(--document-text-width));
    gap: 40px;
  }
}

@media screen and (max-width: 960px) {
  .document-page .document-layout {
    display: block;
  }

  .document-page .document-main {
    max-width: var(--document-text-width);
    margin-inline: auto;
  }

  .document-page .document-contents {
    display: none;
  }

  .document-page .document-contents-compact {
    display: block;
  }
}


.document-page .document-body {
  width: 100%;
  padding: 48px 56px;
}

@media screen and (max-width: 700px) {
  .document-page .document-body {
    padding: 32px 24px;
  }
}

/* Sections are divided by hairlines. A jump lands the hairline 16px under the navbar (the heading text 57px);
   the first heading has none, so its offset lands its text at the same height. Prefixed with .document-page
   to outrank VitePress's `.vp-doc h2` and its offset for `.vp-doc [id]`. */
.document-page .document-body h2 {
  margin: 40px 0 16px;
  padding-top: 40px;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: 0;
  scroll-margin-top: calc(var(--vp-nav-height) + 16px);
}

.document-page .document-body > h2:first-child {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
  scroll-margin-top: calc(var(--vp-nav-height) + 57px);
}

.document-page .links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}


/* inside the text, which also takes VitePress's .vp-doc styles: unprefixed, so they do not outrank them */

.document-body * {
  color: var(--vp-c-text-2);
}

.document-body > :first-child {
  margin-top: 0;
}

.document-body > :last-child {
  margin-bottom: 0;
}

.document-body strong {
  color: var(--vp-c-text-1);
}

</style>
