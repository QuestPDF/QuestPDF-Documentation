/* The dot wings beside custom page headers (.texture-dots): each wing is a wall of a corridor receding towards the
   page's h1. Columns step back a fixed 24px, so the drawing does not scale with the wing; it is drawn for the measured
   wing, one SVG per wing, once the page is mounted. */

import { computed, onMounted, onUnmounted, ref, type Ref } from "vue";
import { useData } from "vitepress";

type Theme = "light" | "dark";

type Wing = {
  width: number;
  height: number;
  titleMiddle: number; /* rows converge on it; from the top of the page */
};

const pitch = 24;

const inks = {
  light: { color: "#FFFFFF", alpha: 0.85, core: 1.25, edge: 2.25 },
  dark: { color: "#A2CAE6", alpha: 0.22, core: 1, edge: 1.5 }
};

/* the vanishing point's distance from the outer edge, in wing widths: further away flattens the wall */
const vanishingDistance = 2.5;

/* the dot radius as a multiple of the base dot's, from the inner edge (0) to the outer edge (1) */
const dotSize = (nearness: number) => 0.55 + 1.75 * nearness ** 2;

const dotOpacity = 0.65;

type Dot = { x: number; y: number; size: number };

const round = (value: number) => Math.round(value * 10) / 10;

function corridor({ width, height, titleMiddle }: Wing): Dot[] {
  const vanishingX = vanishingDistance * width;
  const innerScale = 1 - width / vanishingX;
  const dots: Dot[] = [];

  /* the nearest column sits half a step in from the outer edge, as on a flat grid */
  for (let distance = vanishingX / (1 - pitch / 2 / vanishingX); ; distance += pitch) {
    const scale = vanishingX / distance;
    const x = vanishingX * (1 - scale);

    if (x > width + 8)
      break;

    const size = dotSize(Math.max(0, (scale - innerScale) / (1 - innerScale)));
    const toRow = (y: number) => (titleMiddle + (y - titleMiddle) / scale - pitch / 2) / pitch;

    for (let row = Math.ceil(toRow(-8)); row <= toRow(height + 8); row++)
      dots.push({ x, y: titleMiddle + (pitch / 2 + row * pitch - titleMiddle) * scale, size });
  }

  return dots;
}

/* a CSS url() for one wing; the right wing is the left one mirrored */
function wingImage(wing: Wing, theme: Theme, mirror: boolean) {
  const { color, alpha, core, edge } = inks[theme];
  const width = Math.ceil(wing.width);
  const height = Math.ceil(wing.height);

  const gradient = `<radialGradient id="dot"><stop offset="${round((core / edge) * 100)}%" stop-color="${color}" stop-opacity="${round(alpha * dotOpacity * 100) / 100}"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/></radialGradient>`;

  const circles = corridor(wing)
      .map(({ x, y, size }) => `<circle cx="${round(mirror ? width - x : x)}" cy="${round(y)}" r="${round(edge * size)}"/>`)
      .join("");

  const markup = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs>${gradient}</defs><g fill="url(#dot)">${circles}</g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(markup)}")`;
}

/* style for the .texture-dots root: no wings until mounted, as their drawing depends on the window width */
export function useDotWings(root: Ref<HTMLElement | undefined>) {
  const { isDark } = useData();
  const wing = ref<Wing>();

  /* the size comes from CSS; NaN while the wings are hidden */
  function measure(element: HTMLElement) {
    const style = getComputedStyle(element, "::before");
    const width = parseFloat(style.width);
    const title = element.querySelector("h1")?.getBoundingClientRect();

    if (!width || !title) {
      wing.value = undefined;
      return;
    }

    const titleMiddle = Math.round(title.top + title.height / 2 - element.getBoundingClientRect().top);
    const next = { width, height: parseFloat(style.height), titleMiddle };

    if (wing.value?.width !== next.width || wing.value.height !== next.height || wing.value.titleMiddle !== next.titleMiddle)
      wing.value = next;
  }

  let resizeObserver: ResizeObserver | undefined;

  onMounted(() => {
    resizeObserver = new ResizeObserver(() => measure(root.value!));
    resizeObserver.observe(root.value!);
  });

  onUnmounted(() => resizeObserver?.disconnect());

  return computed(() => {
    if (!wing.value)
      return {};

    const theme = isDark.value ? "dark" : "light";

    return {
      "--dot-wing-left": wingImage(wing.value, theme, false),
      "--dot-wing-right": wingImage(wing.value, theme, true)
    };
  });
}
