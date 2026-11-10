<script setup lang="ts">
import { useId } from "vue";
import { faCheck } from "@fortawesome/pro-solid-svg-icons";

/* drawn in a 100-unit box; the gradient ids are per instance */
const id = useId();

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
    <defs>
      <linearGradient :id="`${id}-chip`" x1="0" y1="0" x2="0.4" y2="1">
        <stop class="chip-top" offset="0" />
        <stop class="chip-bottom" offset="1" />
      </linearGradient>
      <linearGradient :id="`${id}-disc`" x1="0" y1="0" x2="0.4" y2="1">
        <stop class="disc-top" offset="0" />
        <stop class="disc-bottom" offset="1" />
      </linearGradient>
    </defs>

    <path class="chip" :d="rosette" :fill="`url(#${id}-chip)`" />
    <circle class="disc" cx="50" cy="50" r="35" :fill="`url(#${id}-disc)`" />

    <svg :x="50 - CHECK / 2" :y="50 - CHECK / 2" :width="CHECK" :height="CHECK" :viewBox="`0 0 ${checkWidth} ${checkHeight}`">
      <path class="check" :d="checkPath as string" />
    </svg>
  </svg>
</template>

<style scoped>

.seal {
  --shadow-near: light-dark(rgba(16, 24, 40, 0.05), rgba(0, 0, 0, 0.18));
  --shadow-far: light-dark(rgba(16, 24, 40, 0.08), rgba(0, 0, 0, 0.26));

  display: block;
  overflow: visible;
  filter:
      drop-shadow(0 1px 2px var(--shadow-near))
      drop-shadow(0 6px 12px var(--shadow-far));
}

.chip {
  stroke: light-dark(rgba(25, 118, 210, 0.14), rgba(100, 181, 246, 0.12));
  stroke-width: 1;
}

.chip-top {
  stop-color: light-dark(#EBF4FD, #1B2B3F);
}

.chip-bottom {
  stop-color: light-dark(#E0EDFB, #172538);
}

.disc-top {
  stop-color: light-dark(#5AA9F0, #3489D6);
}

.disc-bottom {
  stop-color: light-dark(#3C88DA, #2167B5);
}

.check {
  fill: #FFF;
}

</style>
