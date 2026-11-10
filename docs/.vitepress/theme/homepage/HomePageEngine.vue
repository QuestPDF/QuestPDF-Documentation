<script setup lang="ts">
import { faCode, faPageBreak, faShieldHalved } from "@fortawesome/pro-regular-svg-icons";
import Icon from "../Icon.vue";
import HomePageEngineLanes from "./HomePageEngineLanes.vue";
import HomePageApiOrbit from "./HomePageApiOrbit.vue";

const notes = [
  { icon: faCode, text: "No HTML, CSS or JS engines involved in generation" },
  { icon: faShieldHalved, text: "Significantly smaller resource usage and better security" },
  { icon: faPageBreak, text: "Layout engine built for documents, not web pages" }
];
</script>

<template>
  <div class="engine">
    <article class="panel engine-card">
      <h2 class="card-title">Pure speed, without a web browser</h2>

      <ul class="notes" aria-label="Why no web browser is needed">
        <li v-for="note of notes" :key="note.text" class="note">
          <Icon :icon="note.icon" />
          <span>{{ note.text }}</span>
        </li>
      </ul>

      <figure class="card-figure">
        <HomePageEngineLanes />
      </figure>
    </article>

    <HomePageApiOrbit />
  </div>
</template>

<style scoped>

.engine {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--section-gap);
}

@media screen and (max-width: 1180px) {
  .engine {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* the Quick start code card's tint */
.engine-card {
  --tint: #0288D1;

  display: flex;
  flex-direction: column;
  min-width: 0;
}

html.dark .engine-card {
  --tint: #80C8FF;
}

/* under the copy, held to the card's bottom edge when the orbit card beside it is taller */
.card-figure {
  display: flex;
  align-items: flex-end;
  margin: auto 0 0;
  padding-top: 48px; /* the Quick start cards' gap */
}

.notes {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 20px 0 0;
}

.note {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 6px 0;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.note .icon {
  flex-shrink: 0;
  width: 18px;
  margin-top: 0.25rem;
  font-size: 1rem;
  color: var(--tint);
}

</style>
