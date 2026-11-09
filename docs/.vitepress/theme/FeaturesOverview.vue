<script setup lang="ts">
import Icon from "./Icon.vue";
import { featureCategories as categories, featureMenu, isChapter, type Feature, type FeatureCategory, type FeatureChapter, type FeatureMenuEntry } from "./features";
import { faChevronDown, faMagnifyingGlass, faXmark } from "@fortawesome/pro-light-svg-icons";
import { computed, h, nextTick, ref, type FunctionalComponent } from "vue";
import { useRouter } from "vitepress";
import { useDotWings } from "./dotWings";

const root = ref<HTMLElement>();
useDotWings(root);
const router = useRouter();

const chapterOf = new Map<FeatureCategory, string>();
for (const entry of featureMenu)
  if (isChapter(entry)) entry.categories.forEach(category => chapterOf.set(category, entry.name));

const openChapter = ref<string | undefined>(featureMenu.find(isChapter)?.name);
const selected = ref(categories[0].name);

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

const matchesIn = (entry: FeatureMenuEntry) => groups.value
    .filter(group => isChapter(entry) ? entry.categories.includes(group.category) : group.category === entry)
    .reduce((count, group) => count + group.features.length, 0);

const examples = ["tables", "fonts", "encryption", "accessibility", "watermark"];

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

/* a render function: its marks carry no scope id, so their rule uses :deep() */
const Highlighted: FunctionalComponent<{ text: string }> = ({ text }) =>
    highlight(text).map(segment => segment.hit ? h("mark", segment.text) : segment.text);

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
  <div ref="root" class="custom-page features-page texture-dots">
    <div class="content">
      <header class="section-header features-header">
        <h1>Features Overview</h1>
      </header>

      <div class="explorer" :class="{ 'is-finding': finding }">
        <div class="side">
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

        <div class="panel main">
          <section v-for="category in categories" v-show="!finding && selected === category.name" :key="category.name"
                   :id="panelId(category.name)" role="tabpanel" :aria-labelledby="panelId(category.name) + '-tab'">
            <h2 class="category-title">{{ category.name }}</h2>

            <div class="features">
              <a v-for="feature in category.features" :key="feature.link" :href="feature.link" class="feature">
                <span class="icon-tile"><Icon :icon="feature.icon" /></span>
                <span class="feature-text">
                  <span class="feature-name">{{ feature.name }}</span>
                  <span class="feature-description">{{ feature.description }}</span>
                </span>
              </a>
            </div>
          </section>

          <div v-if="finding" ref="results" class="results" @keydown="onResultsKey">
            <p class="results-summary" aria-live="polite">
              <span>{{ matches }} {{ matches === 1 ? "feature matches" : "features match" }}</span>
              <span v-if="matches" class="results-hint">Enter opens the first match</span>
            </p>

            <section v-for="group in groups" :key="group.category.name" class="results-group">
              <h2 class="results-title">
                <span v-if="chapterOf.has(group.category)" class="results-chapter">{{ chapterOf.get(group.category) }} ›</span>
                {{ group.category.name }}
              </h2>

              <div class="features">
                <a v-for="feature in group.features" :key="feature.link" :href="feature.link" class="feature">
                  <span class="icon-tile"><Icon :icon="feature.icon" /></span>
                  <span class="feature-text">
                    <span class="feature-name"><Highlighted :text="feature.name" /></span>
                    <span class="feature-description"><Highlighted :text="feature.description" /></span>
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
      </div>
    </div>
  </div>
</template>

<style scoped>

.features-page {
  --dots-clear: 420px; /* the 368px title */
  --dots-height: 196px; /* the card */
}

.features-header {
  margin-bottom: 48px;
}

.explorer {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr); /* fits the longest label beside a match count */
  align-items: start;
  gap: 64px;
}


/* Finder */

/* the search and the tree stay beside the card while it scrolls; the tree scrolls itself only when the window is
   shorter than its open chapter */
.side {
  position: sticky;
  top: calc(var(--vp-nav-height) + 24px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: calc(100vh - var(--vp-nav-height) - 48px);
}

.finder {
  position: relative;
  display: flex;
  flex-shrink: 0;
  align-items: center;
}

/* the cards' glass: their surface, sheen and edge on the field, their rim drawn here because an input has no ::before */
.finder::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 10px;
  padding: 1px;
  pointer-events: none;
  background: var(--surface-rim);
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
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
  padding: 0 40px;
  border: none;
  border-radius: 10px;
  appearance: none;
  font: inherit;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-1);
  background-color: var(--surface);
  background-image: var(--surface-sheen);
  box-shadow: var(--surface-edge);
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
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 14%, transparent), var(--surface-edge);
}

.finder-input:focus-visible {
  outline: 2px solid #2196F3;
  outline-offset: -1px;
}

html.dark .finder-input:hover {
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
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
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
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

/* the same sizes as the navbar's Documentation menu */
.chapter-button {
  gap: 20px;
  padding: 8px 12px;
}

.chapter-button .icon {
  flex-shrink: 0;
  font-size: 1.25rem;
}

.chapter-button > span:first-of-type {
  white-space: nowrap;
}

.chapter-button .chevron {
  margin-left: auto;
  font-size: 1rem;
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
  margin: 4px 0 8px 21px;
  padding-left: 18px;
  border-left: 1px solid var(--vp-c-divider);
}


/* Features */

.category-title {
  margin: 0 0 32px;
  padding: 0;
  border: none;
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 2rem;
  letter-spacing: -0.01em;
}

.features {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 48px 64px;
}

/* the padding is taken back by the margin, so the hover box grows around the item and nothing moves */
.feature {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin: -12px;
  padding: 11px;
  border: 1px solid transparent;
  border-radius: 16px;
  color: var(--vp-c-text-1);
}

.feature:hover {
  border-color: color-mix(in srgb, #2196F3 40%, transparent);
  background-color: color-mix(in srgb, #2196F3 10%, transparent);
}

.feature:hover .icon-tile {
  background-color: color-mix(in srgb, #2196F3 16%, transparent);
}

.feature:hover .icon-tile .icon {
  color: light-dark(#1976D2, #64B5F6);
}

.feature-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.feature-name {
  font-size: 1.0625rem;
  font-weight: 600;
  line-height: 1.5rem;
}

.feature:hover .feature-name {
  color: light-dark(#1976D2, #64B5F6);
}

.feature-description {
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.feature:focus-visible {
  outline: 2px solid #2196F3;
  outline-offset: -1px;
}


/* Results */

.results-summary {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin: 0 0 24px;
  font-size: 1rem;
  line-height: 2rem;
  color: var(--vp-c-text-2);
}

.results-hint {
  color: var(--vp-c-text-3);
}

.results-group + .results-group {
  margin-top: 40px;
}

.results-title {
  margin: 0 0 20px;
  padding: 0;
  border: none;
  font-size: 1.0625rem;
  font-weight: 600;
  line-height: 1.5rem;
  letter-spacing: 0;
  color: var(--vp-c-text-1);
}

.results-chapter {
  font-weight: 500;
  color: var(--vp-c-text-3);
}

.features-page :deep(mark) {
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


@media (max-width: 1180px) {
  .features {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (pointer: coarse), (max-width: 760px) {
  .results-hint {
    display: none;
  }
}

/* Phones: the categories go in one scrolling strip between the search and the card */

@media (max-width: 760px) {
  .explorer {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }

  .side {
    position: static;
    max-height: none;
  }

  .rail {
    flex-direction: row;
    gap: 6px;
    margin-inline: calc(-1 * var(--custom-page-gutter));
    padding-inline: var(--custom-page-gutter);
    overflow-x: auto;
    scrollbar-width: none;
  }

  /* !important beats v-show's inline display: none, so every category is in the strip */
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
    white-space: nowrap;
  }

  .section-button .icon,
  .section-button .rail-count {
    display: none;
  }

  .category-title {
    margin-bottom: 24px;
  }

  .features {
    gap: 24px;
  }
}

</style>
