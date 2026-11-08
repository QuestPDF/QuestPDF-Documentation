<script setup lang="ts">
import Icon from "./Icon.vue";
import { featureMenu, type Feature, type FeatureCategory, type FeatureChapter, type FeatureMenuEntry } from "./features";
import { faChevronDown, faMagnifyingGlass, faXmark } from "@fortawesome/pro-light-svg-icons";
import { computed, nextTick, onMounted, ref, shallowRef, watch } from "vue";
import { useRouter } from "vitepress";
import { useDotWings } from "./dotWings";

const root = ref<HTMLElement>();
const wingStyle = useDotWings(root);
const router = useRouter();

const isChapter = (entry: FeatureMenuEntry): entry is FeatureChapter => "categories" in entry;

const categories: FeatureCategory[] = featureMenu.flatMap(entry => isChapter(entry) ? entry.categories : [entry]);
const features: Feature[] = categories.flatMap(category => category.features);

const chapterOf = new Map<FeatureCategory, string>();
for (const entry of featureMenu)
  if (isChapter(entry)) entry.categories.forEach(category => chapterOf.set(category, entry.name));

const openChapter = ref<string | undefined>(featureMenu.find(isChapter)?.name);
const selected = ref(categories[0].name);

/* shallow, so it stays the very object from features.ts and compares equal to it */
const current = shallowRef<Feature>(categories[0].features[0]);

function openChapterOf(chapter: FeatureChapter) {
  clearQuery();
  if (openChapter.value === chapter.name) return;
  openChapter.value = chapter.name;
  select(chapter.categories[0]);
}

function openSection(section: FeatureCategory) {
  clearQuery();
  openChapter.value = undefined;
  select(section);
}

function select(category: FeatureCategory) {
  if (selected.value === category.name) return;
  selected.value = category.name;
  current.value = category.features[0];
  nextTick(revealSelected);
}

const rail = ref<HTMLElement>();

/* on phones the rail is a scrolling strip; keep the selected category in it visible */
function revealSelected() {
  const strip = rail.value;
  const button = strip?.querySelector<HTMLElement>(".is-selected");
  if (!strip || !button || strip.scrollWidth <= strip.clientWidth) return;

  const left = button.offsetLeft - strip.offsetLeft;
  if (left < strip.scrollLeft || left + button.offsetWidth > strip.scrollLeft + strip.clientWidth)
    strip.scrollLeft = left - 16;
}

/* the side column is as tall as it gets with its longest chapter open, so opening a chapter never resizes the card */
const side = ref<HTMLElement>();
const sideHeight = ref<string>();

onMounted(() => {
  const column = side.value!;
  const lists = [...column.querySelectorAll<HTMLElement>(".chapter-categories")];
  const shown = lists.map(list => list.style.display);
  let tallest = 0;

  for (const list of lists) {
    lists.forEach(other => other.style.display = other === list ? "flex" : "none");
    tallest = Math.max(tallest, column.offsetHeight);
  }

  lists.forEach((list, index) => list.style.display = shown[index]);
  sideHeight.value = `${tallest}px`;
});

const steps: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

/* arrow keys, Home and End move between the rail's visible buttons; landing on a category selects it */
function onRailKey(event: KeyboardEvent) {
  const rail = event.currentTarget as HTMLElement;
  const buttons = [...rail.querySelectorAll<HTMLElement>("button")].filter(button => button.offsetParent !== null);
  const index = buttons.indexOf(document.activeElement as HTMLElement);

  let next: number;
  if (event.key in steps) next = (index + steps[event.key] + buttons.length) % buttons.length;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = buttons.length - 1;
  else return;

  event.preventDefault();
  buttons[next].focus();
  if (buttons[next].getAttribute("role") === "tab") buttons[next].click();
}

const panelId = (name: string) => `features-${name.replace(/\W+/g, "-").toLowerCase()}`;


/* Finder: every word typed has to occur in a feature's name, description or category; the browse view comes back as
   soon as the field is empty or a rail entry is clicked */

type ResultGroup = { category: FeatureCategory; features: Feature[] };

const query = ref("");
const finder = ref<HTMLInputElement>();
const results = ref<HTMLElement>();

const terms = computed(() => query.value.toLowerCase().split(/\s+/).filter(Boolean));
const finding = computed(() => terms.value.length > 0);

const groups = computed<ResultGroup[]>(() => {
  if (!finding.value) return [];
  const found: ResultGroup[] = [];

  for (const category of categories) {
    const byName: Feature[] = [];
    const byText: Feature[] = [];

    for (const feature of category.features) {
      const name = feature.name.toLowerCase();
      const text = `${name} ${feature.description.toLowerCase()} ${category.name.toLowerCase()}`;
      if (!terms.value.every(term => text.includes(term))) continue;
      (terms.value.every(term => name.includes(term)) ? byName : byText).push(feature);
    }

    if (byName.length || byText.length) found.push({ category, features: [...byName, ...byText] });
  }

  return found;
});

const matches = computed(() => groups.value.reduce((count, group) => count + group.features.length, 0));

/* the list fades at the bottom while it has more to scroll to */
const moreBelow = ref(false);

function measureOverflow() {
  const list = results.value;
  moreBelow.value = !!list && list.scrollTop + list.clientHeight < list.scrollHeight - 1;
}

const matchesIn = (entry: FeatureMenuEntry) => groups.value
    .filter(group => isChapter(entry) ? entry.categories.includes(group.category) : group.category === entry)
    .reduce((count, group) => count + group.features.length, 0);

const examples = ["tables", "fonts", "encryption", "accessibility", "watermark"];

/* the footer explains the first match right away; browsing again shows the selected category's first feature */
watch(groups, found => {
  if (found.length) current.value = found[0].features[0];
  else if (!finding.value) current.value = categories.find(category => category.name === selected.value)!.features[0];
  nextTick(measureOverflow);
});

function clearQuery(focus = false) {
  query.value = "";
  if (focus) finder.value?.focus();
}

type Segment = { text: string; hit: boolean };

/* the text split into plain and matching runs, so the matches can be marked */
function highlight(text: string): Segment[] {
  if (!finding.value) return [{ text, hit: false }];

  const lower = text.toLowerCase();
  const hits = new Array<boolean>(text.length).fill(false);

  for (const term of terms.value)
    for (let at = lower.indexOf(term); at >= 0; at = lower.indexOf(term, at + 1))
      hits.fill(true, at, at + term.length);

  const segments: Segment[] = [];
  let start = 0;

  for (let end = 1; end <= text.length; end++) {
    if (end < text.length && hits[end] === hits[start]) continue;
    segments.push({ text: text.slice(start, end), hit: hits[start] });
    start = end;
  }

  return segments;
}

const resultLinks = () => [...(results.value?.querySelectorAll<HTMLElement>("a.feature") ?? [])];

/* Enter opens the first match, the down arrow walks into the results, Escape clears */
function onFinderKey(event: KeyboardEvent) {
  if (event.key === "Enter" && groups.value.length) router.go(groups.value[0].features[0].link);
  else if (event.key === "ArrowDown" && groups.value.length) resultLinks()[0]?.focus();
  else if (event.key === "Escape" && query.value) clearQuery();
  else return;

  event.preventDefault();
}

function onResultsKey(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.preventDefault();
    clearQuery(true);
    return;
  }

  const links = resultLinks();
  const index = links.indexOf(document.activeElement as HTMLElement);
  if (index < 0 || !(event.key in steps)) return;

  const next = index + steps[event.key];
  event.preventDefault();
  if (next < 0) finder.value?.focus();
  else links[Math.min(next, links.length - 1)].focus();
}
</script>

<template>
  <div ref="root" class="custom-page features-page texture-dots" :style="wingStyle">
    <div class="content">
      <header class="section-header features-header">
        <h1>Features Overview</h1>
        <p class="sub-header">
          Explore the full capabilities of QuestPDF. A mature, production-ready toolkit designed to handle every aspect of document generation, from versatile layouts to real-time developer tooling.
        </p>
      </header>

      <div class="panel explorer" :class="{ 'is-finding': finding }" :style="{ '--side-height': sideHeight }">
        <div ref="side" class="side">
          <div class="finder" role="search">
            <Icon :icon="faMagnifyingGlass" class="finder-icon" />
            <input ref="finder" v-model="query" type="search" class="finder-input" placeholder="Find a feature"
                   aria-label="Find a feature" autocomplete="off" autocorrect="off" spellcheck="false"
                   @keydown="onFinderKey">
            <button v-if="query" type="button" class="finder-clear" aria-label="Clear the search" @click="clearQuery(true)">
              <Icon :icon="faXmark" />
            </button>
          </div>

          <nav ref="rail" class="rail" aria-label="Feature categories" @keydown="onRailKey">
            <div v-for="entry in featureMenu" :key="entry.name" class="rail-entry"
                 :class="{ 'is-open': !finding && isChapter(entry) && openChapter === entry.name, 'is-empty': finding && matchesIn(entry) === 0 }">

              <template v-if="isChapter(entry)">
                <button type="button" class="rail-button chapter-button" :aria-expanded="!finding && openChapter === entry.name"
                        @click="openChapterOf(entry)">
                  <Icon :icon="entry.icon" />
                  <span>{{ entry.name }}</span>
                  <span v-if="finding" class="rail-count">{{ matchesIn(entry) }}</span>
                  <Icon v-else :icon="faChevronDown" class="chevron" />
                </button>

                <div v-show="!finding && openChapter === entry.name" class="chapter-categories" role="tablist" aria-orientation="vertical">
                  <button v-for="category in entry.categories" :key="category.name" type="button" role="tab"
                          class="rail-button category-button" :class="{ 'is-selected': selected === category.name }"
                          :id="panelId(category.name) + '-tab'" :aria-controls="panelId(category.name)"
                          :aria-selected="selected === category.name" :tabindex="selected === category.name ? 0 : -1"
                          @click="select(category)">
                    {{ category.name }}
                  </button>
                </div>
              </template>

              <div v-else role="tablist">
                <button type="button" role="tab" class="rail-button chapter-button section-button"
                        :class="{ 'is-selected': !finding && selected === entry.name }"
                        :id="panelId(entry.name) + '-tab'" :aria-controls="panelId(entry.name)"
                        :aria-selected="!finding && selected === entry.name" :tabindex="selected === entry.name ? 0 : -1"
                        @click="openSection(entry)">
                  <Icon :icon="entry.icon" />
                  <span>{{ entry.name }}</span>
                  <span v-if="finding" class="rail-count">{{ matchesIn(entry) }}</span>
                </button>
              </div>
            </div>
          </nav>
        </div>

        <div class="main">
          <!-- every panel shares one grid cell, so the card is as tall as the largest category and never jumps -->
          <div class="panels">
            <section v-for="category in categories" :key="category.name" :id="panelId(category.name)" role="tabpanel"
                     :aria-labelledby="panelId(category.name) + '-tab'" class="category-panel"
                     :class="{ 'is-active': !finding && selected === category.name }">
              <h2 class="category-title">{{ category.name }}</h2>

              <div class="features">
                <a v-for="feature in category.features" :key="feature.link" :href="feature.link" class="feature"
                   :class="{ 'is-current': current === feature }"
                   @pointerenter="current = feature" @focus="current = feature">
                  <span class="feature-name">{{ feature.name }}</span>
                  <span class="feature-description">{{ feature.description }}</span>
                </a>
              </div>
            </section>

            <!-- the matches take the panels' place and scroll inside it, so finding never resizes the card either -->
            <div v-if="finding" ref="results" class="results" :class="{ 'has-more': moreBelow }" @keydown="onResultsKey" @scroll.passive="measureOverflow">
              <p class="results-summary" aria-live="polite">
                <span>{{ matches }} {{ matches === 1 ? "feature matches" : "features match" }}</span>
                <span v-if="matches" class="results-hint">Enter opens the first match</span>
              </p>

              <section v-for="group in groups" :key="group.category.name" class="results-group">
                <h2 class="results-title">
                  <template v-if="chapterOf.has(group.category)">
                    <span class="results-chapter">{{ chapterOf.get(group.category) }} ›</span>
                  </template>
                  {{ group.category.name }}
                </h2>

                <div class="features">
                  <a v-for="feature in group.features" :key="feature.link" :href="feature.link" class="feature"
                     :class="{ 'is-current': current === feature }"
                     @pointerenter="current = feature" @focus="current = feature">
                    <span class="feature-name">
                      <template v-for="(segment, index) in highlight(feature.name)" :key="index">
                        <mark v-if="segment.hit">{{ segment.text }}</mark>
                        <template v-else>{{ segment.text }}</template>
                      </template>
                    </span>
                    <span class="feature-description">
                      <template v-for="(segment, index) in highlight(feature.description)" :key="index">
                        <mark v-if="segment.hit">{{ segment.text }}</mark>
                        <template v-else>{{ segment.text }}</template>
                      </template>
                    </span>
                  </a>
                </div>
              </section>

              <div v-if="!groups.length" class="results-empty">
                <p>No feature matches “{{ query }}”. Try a shorter word, or one of these:</p>
                <div class="results-examples">
                  <button v-for="example in examples" :key="example" type="button" class="example" @click="query = example">
                    {{ example }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- the same goes for every description, so the footer is as tall as the longest one; readers get it from the link -->
          <div class="details" aria-hidden="true">
            <div v-for="feature in features" :key="feature.link" class="details-content is-sizer">
              <strong class="details-name">{{ feature.name }}</strong>
              <span class="details-description">{{ feature.description }}</span>
            </div>

            <div v-if="!finding || groups.length" class="details-content">
              <strong class="details-name">
                  <template v-for="(segment, index) in highlight(current.name)" :key="index">
                    <mark v-if="segment.hit">{{ segment.text }}</mark>
                    <template v-else>{{ segment.text }}</template>
                  </template>
                </strong>
                <span class="details-description">
                  <template v-for="(segment, index) in highlight(current.description)" :key="index">
                    <mark v-if="segment.hit">{{ segment.text }}</mark>
                    <template v-else>{{ segment.text }}</template>
                  </template>
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.features-page {
  --dots-clear: 700px; /* the 650px section header */
  --dots-height: 276px; /* the card */
}

.features-header {
  margin-bottom: 32px;
}

.features-header .sub-header {
  max-width: 750px;
  margin-bottom: 0;
}

.explorer {
  display: grid;
  grid-template-columns: 292px minmax(0, 1fr); /* fits the longest label beside a match count */
  width: 100%;
  max-width: 1120px;
  margin-inline: auto;
  padding: 0;
}


/* Finder */

.side {
  display: flex;
  flex-direction: column;
  min-height: var(--side-height, auto);
  padding: 24px 16px;
  border-right: 1px solid var(--vp-c-divider);
}

.finder {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.finder-icon {
  position: absolute;
  left: 13px;
  font-size: 1rem;
  color: var(--vp-c-text-3);
  pointer-events: none;
}

.finder-input {
  width: 100%;
  height: 40px;
  padding: 0 40px 0 40px;
  border: none;
  border-radius: 10px;
  appearance: none;
  font: inherit;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-1);
  background-color: var(--surface-inner);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 12%, transparent);
}

.finder-input::placeholder {
  color: var(--vp-c-text-3);
  opacity: 1;
}

.finder-input::-webkit-search-cancel-button,
.finder-input::-webkit-search-decoration {
  appearance: none;
}

.finder-input:hover {
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 20%, transparent);
}

.finder-input:focus-visible {
  outline: 2px solid #2196F3;
  outline-offset: -1px;
}

html.dark .finder-input {
  background-color: rgba(255, 255, 255, 0.07);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

html.dark .finder-input:hover {
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16);
}

.finder-clear {
  position: absolute;
  right: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  font-size: 1rem;
  color: var(--vp-c-text-2);
}

.finder-clear:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-default-soft);
}

.finder-clear:focus-visible {
  outline: 2px solid #2196F3;
  outline-offset: -2px;
}


/* Rail */

.rail {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rail-button {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 7px 12px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
  text-align: left;
  color: var(--vp-c-text-1);
}

.rail-button:hover {
  background-color: var(--vp-c-default-soft);
}

.rail-button.is-selected {
  color: light-dark(#1976D2, #64B5F6);
  background-color: color-mix(in srgb, #2196F3 10%, transparent);
}

.rail-button:focus-visible {
  outline: 2px solid #2196F3;
  outline-offset: -2px;
}

.chapter-button {
  padding: 10px 12px;
  font-size: 1.0625rem;
}

.chapter-button .icon {
  flex-shrink: 0;
  font-size: 1.375rem;
}

.chapter-button > span:first-of-type {
  white-space: nowrap;
}

.chevron {
  margin-left: auto;
  font-size: 1rem !important;
  color: var(--vp-c-text-3);
}

.rail-entry.is-open .chevron {
  transform: rotate(180deg);
}

.rail-entry.is-open .chapter-button {
  font-weight: 600;
}

/* while finding, the chevron's place shows how many matches the entry holds */
.rail-count {
  margin-left: auto;
  font-size: 1rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: light-dark(#1976D2, #64B5F6);
}

.rail-entry.is-empty .rail-button {
  color: var(--vp-c-text-3);
}

.rail-entry.is-empty .rail-count {
  color: var(--vp-c-text-3);
}

.chapter-categories {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 4px 0 10px 23px;
  padding-left: 14px;
  border-left: 1px solid var(--vp-c-divider);
}


/* Features */

.main {
  display: flex;
  flex-direction: column;
  padding: 32px 40px 40px;
}

/* fills the space down to the footer, so the matches have the whole column */
.panels {
  position: relative;
  flex: 1;
  display: grid;
  align-content: start;
  margin-bottom: 24px;
}

.category-panel {
  grid-area: 1 / 1;
  visibility: hidden;
}

.category-panel.is-active {
  visibility: visible;
}

.category-title {
  margin: 0 0 24px;
  padding: 0;
  border: none;
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 2rem;
  letter-spacing: -0.01em;
}

.features {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 4px 12px;
}

.feature {
  display: block;
  padding: 10px 12px;
  border-radius: 12px;
  color: var(--vp-c-text-1);
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
}

.feature.is-current {
  color: light-dark(#1976D2, #64B5F6);
}

.feature:focus-visible {
  outline: 2px solid #2196F3;
  outline-offset: -2px;
}

/* read by screen readers on wide screens, shown under the name on phones */
.feature-description {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}


/* Results */

.results {
  position: absolute;
  inset: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  /* room for the focus rings and the scrollbar */
  margin: -4px -12px -4px -4px;
  padding: 4px 12px 4px 4px;
}

.results.has-more {
  mask-image: linear-gradient(#000 calc(100% - 48px), transparent);
}

.results-summary {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin: 0 0 20px;
  font-size: 1rem;
  line-height: 2rem;
  color: var(--vp-c-text-2);
}

.results-hint {
  color: var(--vp-c-text-3);
}

.results-group + .results-group {
  margin-top: 20px;
}

.results-title {
  margin: 0 0 6px;
  padding: 0 12px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  letter-spacing: 0;
  color: var(--vp-c-text-1);
}

.results-chapter {
  font-weight: 500;
  color: var(--vp-c-text-3);
}

.features-page mark {
  border-radius: 3px;
  padding: 1px 0;
  color: inherit;
  background-color: color-mix(in srgb, #2196F3 22%, transparent);
  box-decoration-break: clone;
}

.results-empty p {
  margin: 0 0 16px;
  color: var(--vp-c-text-2);
}

.results-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.example {
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
  color: var(--vp-c-text-1);
  background-color: var(--surface-inner);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 12%, transparent);
}

.example:hover {
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 20%, transparent);
}

.example:focus-visible {
  outline: 2px solid #2196F3;
  outline-offset: 1px;
}

html.dark .example {
  background-color: rgba(255, 255, 255, 0.07);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}


/* Details */

.details {
  display: grid;
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
}

.details-content {
  grid-area: 1 / 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.details-content.is-sizer {
  visibility: hidden;
}

.details-name {
  font-size: 1.0625rem;
  line-height: 1.5rem;
}

.details-description {
  margin-top: 2px;
  max-width: 720px;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}


@media (max-width: 1100px) {
  .features {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (pointer: coarse), (max-width: 760px) {
  .results-hint {
    display: none;
  }
}

/* Phones have no hover: every category goes in one scrolling strip, descriptions sit under the names */

@media (max-width: 760px) {
  .explorer {
    grid-template-columns: minmax(0, 1fr);
  }

  .side {
    min-height: 0;
    padding: 16px 0 0;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }

  .finder {
    margin: 0 16px 12px;
  }

  .is-finding .finder {
    margin-bottom: 16px;
  }

  .rail {
    flex-direction: row;
    gap: 6px;
    padding: 0 16px 16px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .rail-entry,
  .rail-entry > div,
  .chapter-categories {
    display: contents !important;
  }

  .chapter-button:not(.section-button) {
    display: none;
  }

  /* the strip is for browsing; the matches say where they live themselves */
  .is-finding .rail {
    display: none;
  }

  .rail-button {
    width: auto;
    flex-shrink: 0;
    padding: 7px 12px;
    font-size: 1rem;
    font-weight: 500;
    white-space: nowrap;
  }

  .section-button .icon,
  .section-button .rail-count {
    display: none;
  }

  .main {
    padding: 24px 16px;
  }

  .panels {
    margin-bottom: 0;
  }

  .category-panel:not(.is-active) {
    display: none;
  }

  .is-finding .category-panel {
    display: none;
  }

  .results {
    position: static;
    overflow: visible;
    margin: 0;
    padding: 0;
  }

  .results-summary {
    margin-bottom: 12px;
  }

  .results-title {
    margin-bottom: 4px;
  }

  .features {
    grid-template-columns: minmax(0, 1fr);
  }

  .feature.is-current {
    color: var(--vp-c-text-1);
  }

  .feature-description {
    display: block;
    position: static;
    margin-top: 2px;
    width: auto;
    height: auto;
    overflow: visible;
    clip-path: none;
    white-space: normal;
    font-weight: 400;
    color: var(--vp-c-text-2);
  }

  .details {
    display: none;
  }
}

</style>
