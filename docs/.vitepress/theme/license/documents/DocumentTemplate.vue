<template>
  <section class="custom-page document-page legal-page">
    <div class="container texture-dots">
      <div class="content">
        <header class="section-header document-header">
          <div class="section-tag">{{ tag }}</div>
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
          <!-- the document's sections beside the text, sticky; a marker follows the section being read
               and a click jumps to it -->
          <nav class="document-contents" :class="{ 'is-clipped': railClipped }" aria-label="Sections" ref="rail" @scroll.passive="clipRail">
            <span class="document-contents-label">Contents</span>
            <ol class="document-contents-list" :style="marker">
              <li v-for="(section, index) in doc.sections" :key="section.id">
                <a
                    class="document-contents-link"
                    :class="{ 'is-active': index === active }"
                    :href="`#${section.id}`"
                    :ref="element => links[index] = element"
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
                <i class="fa-solid fa-chevron-down"></i>
              </summary>
              <ol>
                <li v-for="section in doc.sections" :key="section.id">
                  <a :href="`#${section.id}`">{{ section.title }}</a>
                </li>
              </ol>
            </details>

            <!-- the legal text sits on one lifted surface; sections inside are divided by hairlines -->
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
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { data } from "./licenseDocuments.data.ts";

const props = defineProps({
  id: { type: String, required: true }
});

const doc = data[props.id];

// eyebrow above the title, by document kind
const tags = {
  "license-community": "License",
  "license-professional": "License",
  "license-selection-guide": "Licensing",
  "terms-of-service": "Terms",
  "privacy-policy": "Policy",
  "security-policy": "Policy"
};

const tag = tags[props.id] ?? "Legal";


/* Contents rail: the section being read is the last one whose heading has passed a line 160px from
   the top, just under where a jump lands a heading (so a short section followed by another still
   counts as the one jumped to). Once the page cannot scroll further, short closing sections never reach that line,
   so it is the section the address points to (a click in the rail or a link sets it) while its
   heading is on screen, and otherwise the last section. The marker is placed on
   the active link (titles wrap, so rows differ in height), and the rail, which scrolls on its own
   when the list is taller than the screen, keeps that link in view. */

const rail = ref(null);
const body = ref(null);
const links = [];
const active = ref(0);
const markerBox = ref(null);
const railClipped = ref(false);

const marker = computed(() => markerBox.value
    ? { "--marker-top": `${markerBox.value.top}px`, "--marker-height": `${markerBox.value.height}px`, "--marker-opacity": 1 }
    : {});

let headings = [];

function update() {
  const line = 160;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom && headings.length) {
    const target = headings.findIndex(heading => `#${heading.id}` === decodeURIComponent(location.hash));
    const top = target >= 0 ? headings[target].getBoundingClientRect().top : -1;

    active.value = top >= 0 && top < window.innerHeight ? target : headings.length - 1;
    return;
  }

  let current = 0;

  headings.forEach((heading, index) => {
    if (heading.getBoundingClientRect().top <= line)
      current = index;
  });

  active.value = current;
}

// the rail's bottom edge fades out while more sections are hidden below it
function clipRail() {
  const container = rail.value;
  railClipped.value = container.scrollTop + container.clientHeight < container.scrollHeight - 1;
}

function placeMarker() {
  const link = links[active.value];

  if (!link)
    return;

  markerBox.value = { top: link.offsetTop, height: link.offsetHeight };

  // keep the active link inside the rail's own scroll area, without scrolling the page
  const container = rail.value;
  const linkTop = link.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;

  if (linkTop < container.scrollTop + 40 || linkTop + link.offsetHeight > container.scrollTop + container.clientHeight - 40)
    container.scrollTop = linkTop - container.clientHeight / 3;

  clipRail();
}

watch(active, () => nextTick(placeMarker));

onMounted(() => {
  headings = [...body.value.querySelectorAll("h2[id]")];
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

<style lang="scss">

/* Layout: the header centred across the page; under it the contents rail on the left and the text
   surface with the two links on the right, the surface as wide as the FAQ cards */

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

.document-page .document-layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
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
  margin: 0;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}


/* Contents rail: a label, then the sections on a hairline track; one blue marker slides along the
   track to the section being read. Sticky under the navbar, and scrolls on its own when the list is
   taller than the screen (the Professional license has 30 sections). */

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
  -webkit-mask-image: linear-gradient(to bottom, #000 calc(100% - 48px), transparent);
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
  margin: 0;
  padding: 0;
  list-style: none;
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

.document-page .document-contents-list li {
  margin: 0;
}

.document-page .document-contents-link {
  display: block;
  padding: 7px 0 7px 18px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s ease;
}

.document-page .document-contents-link.is-active {
  color: var(--vp-c-text-1);
  font-weight: 600;
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
  margin: 0;
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
  text-decoration: none;
}

@media screen and (max-width: 1200px) {
  .document-page .document-layout {
    grid-template-columns: 200px minmax(0, 1fr);
    gap: 40px;
  }
}

@media screen and (max-width: 960px) {
  .document-page .document-layout {
    display: block;
  }

  .document-page .document-contents {
    display: none;
  }

  .document-page .document-contents-compact {
    display: block;
  }
}


/* Document text */

.document-page .document-body {
  width: 100%;
  padding: 48px 56px;
}

@media screen and (max-width: 700px) {
  .document-page .document-body {
    padding: 32px 24px;
  }
}

.document-body * {
  color: var(--vp-c-text-2);
}

/* Sections are divided by a hairline; the first one starts at the top of the surface. A jump to a
   section (from the contents or a link) lands its hairline 16px under the navbar, so the heading text
   sits 57px under it; the first heading, which has no hairline, lands its text at the same height.
   Scoped to the page to outrank VitePress's own `.vp-doc h2` style and its offset for `.vp-doc [id]`. */
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

.document-body > :first-child {
  margin-top: 0;
}

.document-body > :last-child {
  margin-bottom: 0;
}

.document-body strong {
  color: var(--vp-c-text-1);
}

.document-body a {
  color: var(--vp-c-brand-1);
}

.document-page .links {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px 16px;
  flex-wrap: wrap;
}

</style>
