<script setup lang="ts">
import { faCheck } from "@fortawesome/pro-solid-svg-icons";

/* a flat rosette in a 100-unit box: sixteen round lobes, a white inner ring and a check */
const point = (r: number, angle: number) => `${(50 + r * Math.cos(angle)).toFixed(2)},${(50 + r * Math.sin(angle)).toFixed(2)}`;

const LOBES = 16;

const rosette = (() => {
  let d = `M ${point(42, -Math.PI / 2)}`;
  for (let i = 1; i <= LOBES; i++)
    d += ` A 8.6,8.6 0 0 1 ${point(42, -Math.PI / 2 + i * 2 * Math.PI / LOBES)}`;
  return d + " Z";
})();

const [checkWidth, checkHeight, , , checkPath] = faCheck.icon;
const CHECK = 30;
</script>

<template>
  <svg class="seal" viewBox="0 0 100 100" aria-hidden="true">
    <path class="shape" :d="rosette" />
    <circle class="ring" cx="50" cy="50" r="35" />

    <svg :x="50 - CHECK / 2" :y="50 - CHECK / 2" :width="CHECK" :height="CHECK" :viewBox="`0 0 ${checkWidth} ${checkHeight}`">
      <path class="check" :d="checkPath as string" />
    </svg>
  </svg>
</template>

<style scoped>

.seal {
  display: block;
  overflow: visible;
  filter: drop-shadow(0 6px 10px light-dark(rgba(16, 24, 40, 0.16), rgba(0, 0, 0, 0.5)));
}

.shape {
  fill: light-dark(#3A93E8, #1976D2);
}

.ring {
  fill: none;
  stroke: rgba(255, 255, 255, 0.7);
  stroke-width: 1.4;
}

.check {
  fill: #FFF;
}

</style>
