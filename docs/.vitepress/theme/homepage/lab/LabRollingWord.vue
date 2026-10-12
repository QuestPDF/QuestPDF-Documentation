<script setup lang="ts">
import { ref } from "vue";
import { features } from "./features";
import { useInView, useLoop } from "./labAnimation";
import LabPanel from "./LabPanel.vue";

/* 10 Rolling headline: above the tags, one short sentence in large type whose ending rolls like a
   split-flap display, "Lay out tables", "Plot charts", "Encrypt output", one per tag, each in the
   brand gradient of the hero. The tag the sentence is about lights up underneath. The tags stay
   as the complete inventory; the sentence gives each of them a verb and a moment. */

const stage = ref<HTMLElement>();
const { animate } = useInView(stage);

/* one phrase per tag, in the tag order */
const phrases = [
  "Style every element",
  "Shape rich text",
  "Place images",
  "Draw vector graphics",
  "Lay out tables",
  "Build lists",
  "Flow multi-column text",
  "Control page breaks",
  "Number every page",
  "Link to anywhere",
  "Plot charts",
  "Print barcodes",
  "Embed maps",
  "Ship accessible PDFs",
  "Merge documents",
  "Extract pages",
  "Stamp overlays",
  "Attach files",
  "Encrypt output",
  "Describe with metadata"
];

/* the roll: each phrase has a verb and an object; the whole phrase rolls, so that the verb can change */
const index = ref(0);
const settling = ref(false);

useLoop(animate, 1700, () => {
  if (index.value < phrases.length) {
    index.value++;
    return;
  }

  /* the list is rendered with the first phrase repeated at the end: after rolling onto that copy,
     jump back to the real first phrase without a transition */
  settling.value = true;
  index.value = 0;
  setTimeout(() => { settling.value = false; index.value = 1; }, 40);
});

const litIndex = () => index.value % phrases.length;
</script>

<template>
  <lab-panel>
    <div ref="stage" class="rolling">
      <div class="headline" aria-live="polite">
        <span class="static">You can</span>
        <span class="window">
          <span class="reel" :class="{ settling }" :style="{ '--index': index }">
            <span v-for="(phrase, position) of [...phrases, phrases[0]]" :key="position" class="phrase" :class="{ on: position === index }">{{ phrase }}</span>
          </span>
        </span>
      </div>

      <div class="chips">
        <span
            v-for="(feature, position) of features"
            :key="feature.label"
            class="chip"
            :class="{ lit: litIndex() === position }">
          <i class="fa-regular" :class="[feature.icon]" />
          {{ feature.label }}
        </span>
      </div>
    </div>
  </lab-panel>
</template>

<style scoped>

.rolling {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 24px;
}

.headline {
  display: flex;
  align-items: baseline;
  gap: 0.4em;
  font-size: 1.75rem;
  line-height: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--vp-c-text-1);
}

.static {
  color: var(--vp-c-text-3);
  font-weight: 500;
}

/* one line tall, the reel of phrases slides through it */
.window {
  display: inline-block;
  height: 2.25rem;
  overflow: hidden;
  mask-image: linear-gradient(180deg, transparent, #000 10%, #000 90%, transparent);
  -webkit-mask-image: linear-gradient(180deg, transparent, #000 10%, #000 90%, transparent);
}

.reel {
  display: flex;
  flex-direction: column;
  transform: translateY(calc(var(--index) * -2.25rem));
  transition: transform 0.55s cubic-bezier(0.65, 0, 0.35, 1);
}

.reel.settling {
  transition: none;
}

.phrase {
  display: block;
  height: 2.25rem;
  white-space: nowrap;

  background: linear-gradient(100deg, #00c6ff 0%, #0094f9 55%, #2979ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  opacity: 0.35;
  transition: opacity 0.4s ease;
}

.phrase.on {
  opacity: 1;
}

html.dark .phrase {
  background: linear-gradient(100deg, #5ef0ff 0%, #32c6ff 50%, #4d8dff 100%);
  -webkit-background-clip: text;
  background-clip: text;
}

@media screen and (max-width: 1280px) {
  .rolling {
    align-items: flex-start;
  }
}

@media screen and (max-width: 700px) {
  .headline {
    font-size: 1.375rem;
    line-height: 1.875rem;
  }

  .window, .phrase {
    height: 1.875rem;
  }

  .reel {
    transform: translateY(calc(var(--index) * -1.875rem));
  }
}

</style>
