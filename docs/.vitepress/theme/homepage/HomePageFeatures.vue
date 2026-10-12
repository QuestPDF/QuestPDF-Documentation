<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/* Every feature from the features overview, in its order, each linking to its documentation page:
   what you can put into a new document first, then what you can do with a PDF you already have.
   The Companion App has its own section right below this card, so its rows are left out. */

const features = [
  /* layout elements */
  { icon: "fa-file", label: "Page", link: "/api-reference/page/basics.html" },
  { icon: "fa-table", label: "Table", link: "/api-reference/table/basics.html" },
  { icon: "fa-table-rows", label: "Column", link: "/api-reference/column.html" },
  { icon: "fa-table-columns", label: "Row", link: "/api-reference/row.html" },
  { icon: "fa-window-maximize", label: "Decoration", link: "/api-reference/decoration.html" },
  { icon: "fa-list", label: "List", link: "/api-reference/lists.html" },
  { icon: "fa-layer-group", label: "Layers", link: "/api-reference/layers.html" },
  { icon: "fa-bars-staggered", label: "Inlined", link: "/api-reference/inlined.html" },
  { icon: "fa-newspaper", label: "Multi-column", link: "/api-reference/multi-column.html" },

  /* visual content */
  { icon: "fa-text", label: "Text", link: "/api-reference/text/basics.html" },
  { icon: "fa-image", label: "Image", link: "/api-reference/image/basics.html" },
  { icon: "fa-horizontal-rule", label: "Line", link: "/api-reference/line.html" },
  { icon: "fa-grid-2", label: "Placeholder", link: "/api-reference/placeholder.html" },
  { icon: "fa-chart-mixed", label: "Charts", link: "/api-reference/charts.html" },
  { icon: "fa-qrcode", label: "Barcodes and QR codes", link: "/api-reference/barcodes.html" },
  { icon: "fa-map-location-dot", label: "Maps", link: "/api-reference/maps.html" },
  { icon: "fa-bezier-curve", label: "Complex graphics", link: "/api-reference/complex-graphics.html" },
  { icon: "fa-paintbrush", label: "SkiaSharp integration", link: "/api-reference/skiasharp-integration.html" },

  /* positional elements */
  { icon: "fa-left-right", label: "Width", link: "/api-reference/width.html" },
  { icon: "fa-up-down", label: "Height", link: "/api-reference/height.html" },
  { icon: "fa-objects-align-center-horizontal", label: "Alignment", link: "/api-reference/alignment.html" },
  { icon: "fa-border-inner", label: "Padding", link: "/api-reference/padding.html" },
  { icon: "fa-crop", label: "Aspect ratio", link: "/api-reference/aspect-ratio.html" },
  { icon: "fa-rotate", label: "Rotate", link: "/api-reference/rotate.html" },
  { icon: "fa-expand", label: "Scale", link: "/api-reference/scale.html" },
  { icon: "fa-compress", label: "Scale to fit", link: "/api-reference/scale-to-fit.html" },
  { icon: "fa-arrows-up-down-left-right", label: "Offset", link: "/api-reference/offset.html" },
  { icon: "fa-reflect-horizontal", label: "Flip", link: "/api-reference/flip.html" },
  { icon: "fa-infinity", label: "Unconstrained", link: "/api-reference/unconstrained.html" },
  { icon: "fa-up-right-and-down-left-from-center", label: "Extend", link: "/api-reference/extend.html" },
  { icon: "fa-down-left-and-up-right-to-center", label: "Shrink", link: "/api-reference/shrink.html" },
  { icon: "fa-layer-plus", label: "Z-index", link: "/api-reference/zindex.html" },

  /* content flow */
  { icon: "fa-page-break", label: "Page break", link: "/api-reference/page-break.html" },
  { icon: "fa-frame", label: "Prevent page break", link: "/api-reference/prevent-page-break.html" },
  { icon: "fa-ruler-vertical", label: "Ensure space", link: "/api-reference/ensure-space.html" },
  { icon: "fa-object-group", label: "Show entire", link: "/api-reference/show-entire.html" },
  { icon: "fa-repeat", label: "Repeat", link: "/api-reference/repeat.html" },
  { icon: "fa-code-branch", label: "Show if", link: "/api-reference/show-if.html" },
  { icon: "fa-circle-1", label: "Show once", link: "/api-reference/show-once.html" },
  { icon: "fa-forward-step", label: "Skip once", link: "/api-reference/skip-once.html" },
  { icon: "fa-stop", label: "Stop paging", link: "/api-reference/stop-paging.html" },

  /* other elements */
  { icon: "fa-bookmark", label: "Section", link: "/api-reference/section.html" },
  { icon: "fa-link", label: "Hyperlink", link: "/api-reference/hyperlink.html" },
  { icon: "fa-bolt", label: "Lazy", link: "/api-reference/lazy.html" },
  { icon: "fa-text-size", label: "Default text style", link: "/api-reference/default-text-style.html" },
  { icon: "fa-arrow-right-arrow-left", label: "Content direction", link: "/api-reference/content-direction.html" },
  { icon: "fa-square-dashed", label: "Debug area", link: "/api-reference/debug-area.html" },
  { icon: "fa-location-dot", label: "Debug pointer", link: "/api-reference/debug-pointer.html" },

  /* important concepts */
  { icon: "fa-file-export", label: "Output types", link: "/concepts/generating-output.html" },
  { icon: "fa-id-card", label: "Document metadata", link: "/concepts/document-metadata.html" },
  { icon: "fa-sliders", label: "Document settings", link: "/concepts/document-settings.html" },
  { icon: "fa-universal-access", label: "Accessibility", link: "/concepts/accessibility.html" },
  { icon: "fa-puzzle-piece", label: "Components", link: "/concepts/code-patterns/components.html" },
  { icon: "fa-ruler", label: "Length units", link: "/concepts/length-unit-types.html" },
  { icon: "fa-palette", label: "Predefined colors", link: "/concepts/colors.html" },
  { icon: "fa-wand-magic-sparkles", label: "Placeholders", link: "/concepts/prototyping.html" },

  /* document operations */
  { icon: "fa-copy", label: "Merging", link: "/concepts/document-operations.html#merging-documents" },
  { icon: "fa-scissors", label: "Page extraction", link: "/concepts/document-operations.html#page-selection" },
  { icon: "fa-clone", label: "Overlays and underlays", link: "/concepts/document-operations.html#overlays-and-underlays" },
  { icon: "fa-lock", label: "Encryption", link: "/concepts/document-operations.html#document-encryption" },
  { icon: "fa-unlock", label: "Decryption", link: "/concepts/document-operations.html#document-decryption" },
  { icon: "fa-globe", label: "Linearization", link: "/concepts/document-operations.html#document-linearization" },
  { icon: "fa-paperclip", label: "Attachments", link: "/concepts/document-operations.html#file-attachments" },
  { icon: "fa-tags", label: "XMP metadata", link: "/concepts/document-operations.html#xmp-metadata-extension" }
];

/* The tags ride on four conveyor belts drifting slowly sideways, every other one the other way,
   fading out at both edges. Each belt holds its tags twice, so the loop is seamless. The belts stop
   while the pointer rests on them or a tag has keyboard focus, and the tag under it lifts.
   The belts get longer down the list, so the durations grow with them to keep a similar, unhurried
   pace of about 12px per second, with a little variation so the belts never line up. */

const BELT_COUNT = 4;
const perBelt = Math.ceil(features.length / BELT_COUNT);

const belts = ["220s", "240s", "265s", "295s"].map((duration, index) => ({
  items: features.slice(index * perBelt, (index + 1) * perBelt),
  duration,
  reverse: index % 2 === 1
}));

/* the belts move only while the card is on screen and the visitor has not asked for reduced
   motion, so an endless animation does not cost anything when the card is scrolled away */

const stage = ref();
const inView = ref(false);
const reducedMotion = ref(false);
let observer;

onMounted(() => {
  reducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => inView.value = entry.isIntersecting);
  }, { threshold: 0.3 });

  if (stage.value)
    observer.observe(stage.value);
});

onBeforeUnmount(() => observer?.disconnect());

const animate = computed(() => inView.value && !reducedMotion.value);

</script>

<template>
  <!-- the full-width PDF generation and operations card at the bottom of the bento:
       pitch and links on the left, the tags on the right -->
  <section class="panel features-panel">
    <div class="features-text">
      <h2>All you need to generate and modify PDFs</h2>
      <p class="sub-header">From layout and styling to production features, QuestPDF gives you the flexibility to create documents of any complexity. Merge, split, overlay, attach and encrypt the PDF documents you already have, with the same fluent C# API.</p>

      <div class="actions">
        <a class="action primary" href="/features-overview.html" target="_blank">
          Explore all features
        </a>
        <a class="action" href="/concepts/document-operations.html" target="_blank">
          Explore document operations
        </a>
      </div>
    </div>

    <div class="features-tags">
      <div ref="stage" class="conveyor" :class="{ paused: !animate }">
        <div v-for="(belt, index) of belts" :key="index" class="belt">
          <div class="track" :style="{ '--duration': belt.duration, animationDirection: belt.reverse ? 'reverse' : 'normal' }">
            <div v-for="copy in 2" :key="copy" class="set" :aria-hidden="copy === 2">
              <a v-for="feature of belt.items" :key="feature.label" class="chip" :href="feature.link" target="_blank" :tabindex="copy === 2 ? -1 : undefined">
                <i class="fa-regular" :class="[feature.icon]" />
                {{ feature.label }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.features-panel {
  display: grid;
  grid-template-columns: minmax(0, 9fr) minmax(0, 11fr);
  column-gap: 80px;
  align-items: center;
}

.features-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.features-text h2 {
  font-size: 1.5rem;
  line-height: 2rem;
}

.sub-header {
  margin-bottom: 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.features-tags {
  min-width: 0;
}

/* Conveyor belts */

.conveyor {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 -16px; /* the fade reaches a little beyond the column, under the panel padding */
}

/* `clip` rather than `hidden`: a focused tag must not scroll the belt out of its loop */
.belt {
  overflow: clip;
  padding: 4px 0; /* room for the hover lift */
  mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent);
}

.track {
  display: flex;
  width: max-content;
  animation: slide var(--duration) linear infinite;
}

.set {
  display: flex;
  gap: 10px;
  padding-right: 10px;
}

@keyframes slide {
  to { transform: translateX(-50%); }
}

.conveyor.paused .track,
.conveyor:hover .track,
.conveyor:focus-within .track {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .track {
    animation: none;
  }
}

/* the tag under the pointer lifts and takes the brand colour */
.features-tags .chip {
  text-decoration: none;
  transition:
      background-color 0.35s ease,
      color 0.35s ease,
      transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.features-tags .chip:hover,
.features-tags .chip:focus-visible {
  background-color: color-mix(in srgb, var(--vp-c-brand-2) 16%, var(--home-surface-inner));
  color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

/* darker than the shared chip surface in dark mode, so the tags stand out against the panel */
html.dark .features-tags .chip {
  background-color: #0004;
}

html.dark .features-tags .chip:hover,
html.dark .features-tags .chip:focus-visible {
  background-color: color-mix(in srgb, var(--vp-c-brand-2) 22%, #0004);
}

/* too narrow for two columns: text above the belts */
@media screen and (max-width: 1280px) {
  .features-panel {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 40px;
  }
}

</style>
