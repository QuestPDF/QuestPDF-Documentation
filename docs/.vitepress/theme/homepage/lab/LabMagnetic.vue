<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import { features } from "./features";
import { useInView } from "./labAnimation";
import LabPanel from "./LabPanel.vue";

/* 05 Magnetic tags: a soft light follows the pointer across the tags, and the tags under it lean
   towards it, lift a little and take on the brand colour, strongest right under the light and fading
   out with distance. With no pointer on the panel, the light wanders by itself along a slow figure,
   so the tags sway as if someone ran a hand over them. */

const stage = ref<HTMLElement>();
const chipElements = ref<HTMLElement[]>([]);
const { animate } = useInView(stage);

const RADIUS = 170;
const pointer = ref<{ x: number; y: number } | null>(null);
const light = ref({ x: -1000, y: -1000 });

let frame = 0;
let start = 0;

function tick(now: number) {
  const box = stage.value?.getBoundingClientRect();
  if (!box) return;

  if (!start) start = now;
  const t = (now - start) / 1000;

  /* a Lissajous figure within the stage, a little outside its edges */
  const target = pointer.value ?? {
    x: box.width / 2 + (box.width / 2 + 20) * Math.sin(t * 0.55),
    y: box.height / 2 + (box.height / 2 + 10) * Math.sin(t * 0.9 + 1)
  };

  /* the light trails the target, so a real pointer feels weighted too */
  light.value = {
    x: light.value.x + (target.x - light.value.x) * 0.12,
    y: light.value.y + (target.y - light.value.y) * 0.12
  };

  for (const chip of chipElements.value) {
    const rect = chip.getBoundingClientRect();
    const cx = rect.left - box.left + rect.width / 2;
    const cy = rect.top - box.top + rect.height / 2;
    const dx = light.value.x - cx;
    const dy = light.value.y - cy;
    const distance = Math.hypot(dx, dy);

    const strength = distance < RADIUS ? (1 - distance / RADIUS) ** 2 : 0;

    chip.style.setProperty("--glow", strength.toFixed(3));
    chip.style.transform = strength
        ? `translate(${(dx * 0.14 * strength).toFixed(1)}px, ${(dy * 0.14 * strength).toFixed(1)}px) scale(${(1 + 0.07 * strength).toFixed(3)})`
        : "";
  }

  frame = requestAnimationFrame(tick);
}

/* no `immediate`: the stage starts out of view, and animation frames do not exist during
   server rendering */
watch(animate, on => {
  cancelAnimationFrame(frame);
  if (on) frame = requestAnimationFrame(tick);
});

onBeforeUnmount(() => cancelAnimationFrame(frame));

function onMove(event: MouseEvent) {
  const box = stage.value!.getBoundingClientRect();
  pointer.value = { x: event.clientX - box.left, y: event.clientY - box.top };
}
</script>

<template>
  <lab-panel>
    <div ref="stage" class="magnetic" @mousemove="onMove" @mouseleave="pointer = null">
      <div class="light" :style="{ transform: `translate(${light.x}px, ${light.y}px)` }" />

      <div class="chips">
        <span
            v-for="feature of features"
            :key="feature.label"
            ref="chipElements"
            class="chip">
          <i class="fa-regular" :class="[feature.icon]" />
          {{ feature.label }}
        </span>
      </div>

      <p class="more">and many more</p>
    </div>
  </lab-panel>
</template>

<style scoped>

.magnetic {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  padding: 8px; /* room for the tags to lean out of their box */
  margin: -8px;
}

/* the light: a soft brand glow centred on the pointer */
.light {
  position: absolute;
  top: -160px;
  left: -160px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle, color-mix(in srgb, var(--vp-c-brand-2) 16%, transparent), transparent 65%);
}

html.dark .light {
  background: radial-gradient(circle, color-mix(in srgb, var(--vp-c-brand-2) 22%, transparent), transparent 65%);
}

/* the chips are moved by script every frame, so no transform transition here; colour and shadow
   follow --glow, which the script sets per chip */
.magnetic .chip {
  --glow: 0;
  transition: none;
  background-color: color-mix(in srgb, var(--vp-c-brand-2) calc(var(--glow) * 20%), var(--home-surface-inner));
  color: color-mix(in srgb, var(--vp-c-brand-1) calc(var(--glow) * 100%), var(--vp-c-text-1));
  box-shadow: 0 10px 18px -10px color-mix(in srgb, var(--vp-c-brand-2) calc(var(--glow) * 80%), transparent);
  will-change: transform;
}

html.dark .magnetic .chip {
  background-color: color-mix(in srgb, var(--vp-c-brand-2) calc(var(--glow) * 28%), #0004);
}

@media screen and (max-width: 1280px) {
  .magnetic {
    align-items: flex-start;
  }
}

</style>
