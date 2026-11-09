<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { move, onScreenShare, reducedMotion } from "./ctaTimeline";

/* The layers the library runs on, as three slabs with your application floating on top, and dashed leaders running
   from the middle of each slab's edge to the row that names it. Rows size to their text; the figure measures them
   so the leaders always meet the rows' markers. Facts as the package README states them. */
const layers = [
  { name: "Runtime", values: [".NET 6+", ".NET Framework 4.6.2+", "Native AOT"] },
  { name: "Operating system", values: ["Windows", "Linux", "Alpine", "macOS"] },
  { name: "Hosting", values: ["Docker", "Kubernetes", "Azure", "AWS", "Google Cloud"] }
];

const figureWidth = 208, gutter = 28, minHeight = 232;
const cx = 96, halfWidth = 86, halfDepth = 28, thickness = 16, spacing = 58;
const reach = figureWidth + gutter;

/* bottom up, so each slab covers the one under it, and the assembly stacks them in the same order */
const order = [2, 1, 0];

/* first-paint estimates, replaced by measurements once mounted */
const list = ref<HTMLElement>();
const height = ref(268);
const middles = ref([38, 134, 230]);
let observer: ResizeObserver | undefined;

/* stacked on phones: the figure keeps its own height and the leaders are hidden */
function measure() {
  const box = list.value!.getBoundingClientRect();
  const stacked = matchMedia("(max-width: 600px)").matches;
  height.value = stacked ? minHeight : Math.max(Math.round(box.height), minHeight);
  middles.value = Array.from(list.value!.children).map(row => {
    const r = row.getBoundingClientRect();
    return Math.round(r.top - box.top + r.height / 2);
  });
}

/* Motion: on each entry into view the stack assembles bottom-up and the application lands last; then the application
   hovers above it. The hover runs only while the card is mostly on screen; leaving the screen entirely rewinds
   everything, so the next visit assembles again. */
const root = ref<HTMLElement>();
const groups: SVGGElement[] = [];
const leaders: SVGPathElement[] = [];
const markers: HTMLElement[] = [];
const application = ref<HTMLElement>();
const shadow = ref<SVGEllipseElement>();

const assembly = 2600, hover = 4800, lift = 10;
const settle = "cubic-bezier(0.2, 0.7, 0.2, 1)";
const sine = "cubic-bezier(0.37, 0, 0.63, 1)";

let building: Animation[] = [];
let floating: Animation[] = [];
let visibility: IntersectionObserver | undefined;

function build() {
  const once = { duration: assembly, fill: "both" as const };
  const step = (from: Keyframe, to: Keyframe, start: number, end: number, easing = settle) => move(from, to, start, end, assembly, easing);

  order.forEach((i, k) => {
    const start = k * 200;
    building.push(
      groups[i].animate(step({ transform: "translateY(-26px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }, start, start + 760), once),
      leaders[i].animate(step({ opacity: 0 }, { opacity: 1 }, start + 560, start + 900, "ease-out"), once),
      markers[i].animate(step({ transform: "scale(0)" }, { transform: "scale(1)" }, start + 760, start + 1100), once)
    );
  });

  building.push(
    application.value!.animate(step({ transform: "translateY(-22px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }, 1000, 1900), once),
    shadow.value!.animate(step({ transform: "scale(0.6)", opacity: 0 }, { transform: "scale(1)", opacity: 1 }, 1100, 1900), once)
  );

  /* starts where the assembly leaves off, so the two never fight over the same transform */
  const loop = { duration: hover, iterations: Infinity, delay: assembly };
  floating.push(
    application.value!.animate([
      { transform: "translateY(0)", easing: sine },
      { transform: `translateY(-${lift}px)`, easing: sine },
      { transform: "translateY(0)" }
    ], loop),
    shadow.value!.animate([
      { transform: "scale(1)", opacity: 1, easing: sine },
      { transform: "scale(0.7)", opacity: 0.45, easing: sine },
      { transform: "scale(1)", opacity: 1 }
    ], loop)
  );

  [...building, ...floating].forEach(animation => animation.pause());
}

onMounted(() => {
  measure();
  observer = new ResizeObserver(measure);
  observer.observe(list.value!);

  if (reducedMotion()) return;
  build();

  visibility = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) {
      [...building, ...floating].forEach(animation => {
        animation.pause();
        animation.currentTime = 0;
      });
    }
    else if (entry.intersectionRatio >= onScreenShare) {
      [...building, ...floating].forEach(animation => animation.play());
    }
    /* partly on screen: an assembly under way finishes, the hover waits */
    else {
      floating.forEach(animation => animation.pause());
    }
  }, { threshold: [0, onScreenShare] });
  visibility.observe(root.value!);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  visibility?.disconnect();
  [...building, ...floating].forEach(animation => animation.cancel());
});

const slabs = computed(() => layers.map((_, i) => {
  const cy = height.value / 2 + (i - 1) * spacing + 12;
  const edge = cy + thickness / 2;
  const ry = middles.value[i];
  const x0 = cx + halfWidth + 4, x1 = reach - 2;
  return {
    cy,
    edge,
    top: `M${cx - halfWidth} ${cy}L${cx} ${cy - halfDepth}L${cx + halfWidth} ${cy}L${cx} ${cy + halfDepth}Z`,
    left: `M${cx - halfWidth} ${cy}L${cx} ${cy + halfDepth}L${cx} ${cy + halfDepth + thickness}L${cx - halfWidth} ${cy + thickness}Z`,
    right: `M${cx} ${cy + halfDepth}L${cx + halfWidth} ${cy}L${cx + halfWidth} ${cy + thickness}L${cx} ${cy + halfDepth + thickness}Z`,
    leader: `M${x0} ${edge}C${x0 + 36} ${edge} ${x1 - 36} ${ry} ${x1} ${ry}`
  };
}));
</script>

<template>
  <div ref="root" class="layers" :style="{ '--figure-width': `${figureWidth}px`, '--gutter': `${gutter}px`, '--min-height': `${minHeight}px` }">
    <figure class="figure" aria-hidden="true">
      <svg class="drawing" :viewBox="`0 0 ${figureWidth} ${height}`" preserveAspectRatio="xMinYMin meet">
        <path v-for="(slab, i) of slabs" :key="`leader${i}`" :ref="el => leaders[i] = el as SVGPathElement" class="leader" :d="slab.leader" />

        <g v-for="i of order" :key="i" :ref="el => groups[i] = el as SVGGElement">
          <path class="side-left" :d="slabs[i].left" />
          <path class="side-right" :d="slabs[i].right" />
          <path class="face" :d="slabs[i].top" />
          <circle class="joint" :cx="cx + halfWidth" :cy="slabs[i].edge" r="3" />
        </g>

        <ellipse ref="shadow" class="shadow" :cx="cx" :cy="slabs[0].cy" rx="26" ry="9" />
      </svg>

      <!-- your application, floating above the top slab -->
      <span ref="application" class="application" :style="{ left: `${cx}px`, top: `${slabs[0].cy - 44}px` }"></span>
    </figure>

    <ul ref="list" class="rows">
      <li v-for="(layer, i) of layers" :key="layer.name" class="row">
        <span :ref="el => markers[i] = el as HTMLElement" class="marker"></span>
        <span class="text">
          <strong class="name">{{ layer.name }}</strong>
          <span class="values">
            <template v-for="(value, j) of layer.values" :key="value">
              <span v-if="j > 0" class="dot" aria-hidden="true">·</span>
              <span class="value">{{ value }}</span>
            </template>
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.layers {
  --accent: light-dark(#1976D2, #64B5F6);
  --line: color-mix(in srgb, var(--vp-c-text-1) 14%, transparent);
  --slab-face: light-dark(#FFFFFF, #2A2B31);
  --slab-left: light-dark(#E6EAF0, #222328);
  --slab-right: light-dark(#D5DBE4, #1C1D21);
  --application: light-dark(#42A5F5, #1E88E5);
  --application-glow: light-dark(rgba(66, 165, 245, 0.35), rgba(30, 136, 229, 0.55));

  display: grid;
  grid-template-columns: var(--figure-width) minmax(0, 1fr);
  gap: var(--gutter);
}

.figure {
  position: relative;
  width: var(--figure-width);
  min-height: var(--min-height);
  margin: 0;
}

.drawing {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  fill: none;
}

.face,
.side-left,
.side-right {
  stroke: var(--line);
  stroke-width: 1;
  stroke-linejoin: round;
}

.face {
  fill: var(--slab-face);
}

.side-left {
  fill: var(--slab-left);
}

.side-right {
  fill: var(--slab-right);
}

.leader {
  stroke: color-mix(in srgb, var(--accent) 50%, transparent);
  stroke-width: 1.5;
  stroke-dasharray: 3 4;
  stroke-linecap: round;
}

.joint {
  fill: var(--accent);
}

.application {
  position: absolute;
  width: 40px;
  height: 40px;
  translate: -50% -50%;
  border-radius: 50%;
  background-color: var(--application);
  box-shadow: 0 0 24px 2px var(--application-glow);
}

.shadow {
  fill: color-mix(in srgb, var(--vp-c-text-1) 10%, transparent);
  transform-box: fill-box;
  transform-origin: center;
}

.rows {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0;
}

.row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.marker {
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--application);
  box-shadow: 0 0 24px 2px var(--application-glow);
}

.text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.name {
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.values {
  display: flex;
  flex-wrap: wrap;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.value {
  white-space: nowrap;
}

.dot {
  margin: 0 0.5em;
  color: var(--vp-c-text-3);
}

/* phones: the figure sits above the rows, and the leaders have nothing to reach */
@media screen and (max-width: 600px) {
  .layers {
    grid-template-columns: minmax(0, 1fr);
  }

  .figure {
    height: var(--min-height);
    margin-inline: auto;
  }

  .leader {
    display: none;
  }
}

</style>
