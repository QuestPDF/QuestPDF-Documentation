<template>
  <!-- D2 · Contents rail: one sticky rail for the whole FAQ listing every group with its count; a
       marker follows the group being read and a click jumps to a group. The cards keep today's width
       and carry no visible title on wide screens (the h3s stay for screen readers) -->
  <article class="content faq-rail-contents">
    <div class="section-header">
      <h2>Frequently Asked Questions</h2>
    </div>

    <div class="faq-layout">
      <nav class="faq-contents" aria-label="Question topics">
        <span class="faq-contents-label">Topics</span>
        <ol class="faq-contents-list" :style="{ '--active': active }">
          <li v-for="(category, index) of faqCategories" :key="category.title">
            <a
                class="faq-contents-link"
                :class="{ 'is-active': index === active }"
                :href="`#${groupAnchor('faq-d2', category)}`"
                @click="active = index">
              <span>{{ category.title }}</span>
              <span class="faq-contents-count">{{ category.items.length }}</span>
            </a>
          </li>
        </ol>
      </nav>

      <div class="faq-groups">
        <section
            v-for="(category, index) of faqCategories"
            :key="category.title"
            :ref="element => groups[index] = element as HTMLElement"
            :id="groupAnchor('faq-d2', category)"
            class="faq-group">
          <h3 class="faq-group-title">{{ category.title }}</h3>
          <div class="faq-list">
            <faq-questions :items="category.items" :open-index="index === 0 ? 1 : undefined" />
          </div>
        </section>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { faqCategories } from "../../../pricing/faq";
import { groupAnchor } from "./faqLab";
import FaqQuestions from "./FaqQuestions.vue";

const active = ref(0);
const groups: HTMLElement[] = [];

/* the group being read is the last one whose top has passed a line 30% down the viewport; a scroll
   listener rather than an IntersectionObserver, so it also answers a scroll made by a capture */
function update() {
  const line = window.innerHeight * 0.3;
  let current = 0;

  groups.forEach((group, index) => {
    if (group && group.getBoundingClientRect().top <= line)
      current = index;
  });

  active.value = current;
}

onMounted(() => {
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("faq-lab-scrolled", update);
  update();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", update);
  window.removeEventListener("faq-lab-scrolled", update);
});
</script>

<style scoped>

.faq-layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 56px;

  width: 100%;
  max-width: 1180px;
  margin: 40px auto 0;
}

/* Rail: a label, then the six groups on a hairline track; one blue marker slides along the track to
   the group being read */

.faq-contents {
  position: sticky;
  top: calc(var(--vp-nav-height) + 32px);
  align-self: start;
  padding-top: 8px;
}

.faq-contents-label {
  display: block;
  margin: 0 0 12px 18px;
  font-size: 0.75rem;
  line-height: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.faq-contents-list {
  --row: 40px;

  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
  border-left: 1px solid var(--vp-c-divider);
}

.faq-contents-list::before {
  content: "";
  position: absolute;
  top: 0;
  left: -1px;
  width: 2px;
  height: var(--row);
  border-radius: 2px;
  background-color: #2196F3;
  transform: translateY(calc(var(--active) * var(--row)));
  transition: transform 0.3s ease;
}

.faq-contents-list li {
  margin: 0;
}

.faq-contents-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: var(--row);
  padding-left: 18px;

  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s ease;
}

.faq-contents-link:hover {
  color: var(--vp-c-text-1);
}

.faq-contents-link.is-active {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.faq-contents-count {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

/* Cards: today's card, 32px apart; the title is for screen readers on wide screens */

.faq-groups {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.faq-group {
  scroll-margin-top: calc(var(--vp-nav-height) + 32px);
}

.faq-group-title {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.faq-list {
  display: flex;
  flex-direction: column;

  border-radius: 32px;
  background-color: var(--home-surface);
  box-shadow: var(--home-surface-edge);
  overflow: hidden;
}

/* below 960px the rail becomes a row of chips that scrolls sideways, and each card gets its title
   back (A's neutral title) */
@media screen and (max-width: 960px) {
  .faq-layout {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  /* stretched to the column, so the chip row scrolls inside it instead of widening the page */
  .faq-contents {
    position: static;
    align-self: stretch;
    min-width: 0;
    padding: 0;
  }

  .faq-contents-label {
    display: none;
  }

  /* the last 32px fade out, so a chip cut by the edge reads as "more this way" */
  .faq-contents-list {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    scrollbar-width: none;
    border-left: none;
    -webkit-mask-image: linear-gradient(90deg, #000 calc(100% - 32px), transparent);
    mask-image: linear-gradient(90deg, #000 calc(100% - 32px), transparent);
  }

  .faq-contents-list::before {
    display: none;
  }

  .faq-contents-link {
    flex-shrink: 0;
    gap: 8px;
    height: auto;
    padding: 8px 14px;
    border-radius: 999px;
    white-space: nowrap;
    font-size: 0.875rem;
    color: var(--vp-c-text-1);
    background-color: var(--home-surface);
    box-shadow: var(--home-surface-edge), inset 0 0 0 1px var(--vp-c-divider);
  }

  .faq-contents-link.is-active {
    font-weight: 500;
  }

  .faq-groups {
    gap: 48px;
  }

  .faq-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .faq-group-title {
    position: static;
    width: auto;
    height: auto;
    margin: 0;
    padding-left: 32px;
    overflow: visible;
    clip-path: none;
    white-space: normal;
    color: var(--vp-c-text-1);
  }
}

@media screen and (max-width: 700px) {
  .faq-group-title {
    padding-left: 20px;
  }
}

</style>
