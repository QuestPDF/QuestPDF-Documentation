/* The dot wings beside custom page headers (.texture-dots): each wing is a wall of a corridor receding towards the
   page's h1, and the homepage flies slowly down it. Columns step back a fixed 24px, so the drawing does not scale with the
   wing; it is drawn for the measured wing, on one canvas per wing, once the page is mounted. After 24px of flight the
   lattice repeats itself, so the loop is seamless. */

import { onBeforeUnmount, onMounted, watch, type Ref } from "vue";
import { useData } from "vitepress";

type Theme = "light" | "dark";

type Wing = {
  width: number;
  height: number;
  titleMiddle: number; /* rows converge on it; from the top of the page */
};

const pitch = 24;

/* milliseconds to fly one pitch */
const flightPeriod = 4500;

const inks = {
  light: { color: "#FFFFFF", alpha: 0.85, core: 1.25, edge: 2.25 },
  dark: { color: "#A2CAE6", alpha: 0.22, core: 1, edge: 1.5 }
};

/* the vanishing point's distance from the outer edge, in wing widths: further away flattens the wall */
const vanishingDistance = 2.5;

/* the dot radius as a multiple of the base dot's, from the inner edge (0) to the outer edge (1) */
const dotSize = (nearness: number) => 0.55 + 1.75 * nearness ** 2;

const dotOpacity = 0.65;

/* new columns fade in over this many pixels as they enter at the inner edge */
const fadeIn = pitch * 0.6;

const spriteSize = 64;

/* one soft dot, scaled onto the canvas for every dot of the wall */
function dotSprite({ color, alpha, core, edge }: (typeof inks)[Theme]) {
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = spriteSize;

  const half = spriteSize / 2;
  const context = sprite.getContext("2d")!;
  const gradient = context.createRadialGradient(half, half, 0, half, half, half);
  gradient.addColorStop(core / edge, withAlpha(color, alpha * dotOpacity));
  gradient.addColorStop(1, withAlpha(color, 0));

  context.fillStyle = gradient;
  context.fillRect(0, 0, spriteSize, spriteSize);
  return sprite;
}

function withAlpha(hex: string, alpha: number) {
  const value = parseInt(hex.slice(1), 16);
  return `rgba(${value >> 16}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`;
}

/* draws the wall after `flown` pixels of flight, 0 to pitch */
function draw(context: CanvasRenderingContext2D, { width, height, titleMiddle }: Wing, theme: Theme, sprite: HTMLCanvasElement, mirror: boolean, flown: number) {
  const { edge } = inks[theme];
  const vanishingX = vanishingDistance * width;
  const innerScale = 1 - width / vanishingX;

  context.clearRect(0, 0, width, height);

  /* the nearest column sits half a step in from the outer edge, as on a flat grid; the one before it has just left */
  for (let distance = vanishingX / (1 - pitch / 2 / vanishingX) - pitch - flown; ; distance += pitch) {
    const scale = vanishingX / distance;
    const x = vanishingX * (1 - scale);

    if (x > width + 8)
      break;

    const radius = edge * dotSize(Math.max(0, (scale - innerScale) / (1 - innerScale)));
    const toRow = (y: number) => (titleMiddle + (y - titleMiddle) / scale - pitch / 2) / pitch;

    context.globalAlpha = Math.min(1, Math.max(0, (width - x) / fadeIn));

    for (let row = Math.ceil(toRow(-radius)); row <= toRow(height + radius); row++) {
      const y = titleMiddle + (pitch / 2 + row * pitch - titleMiddle) * scale;
      context.drawImage(sprite, (mirror ? width - x : x) - radius, y - radius, 2 * radius, 2 * radius);
    }
  }

  context.globalAlpha = 1;
}

/* the wings of a .texture-dots page, flying only where `animated`: no wings until mounted, as their drawing depends on the window width */
export function useDotWings(root: Ref<HTMLElement | undefined>, { animated = false } = {}) {
  const { isDark } = useData();

  /* created on mount: the page is also rendered on the server */
  let motion: MediaQueryList | undefined;
  let canvases: { canvas: HTMLCanvasElement; mirror: boolean; context: CanvasRenderingContext2D }[] = [];

  let wing: Wing | undefined;
  let sprite: HTMLCanvasElement | undefined;
  let theme: Theme = "light";
  let onScreen = false;
  let frame = 0;
  let flightStart = 0;

  const currentTheme = (): Theme => (isDark.value ? "dark" : "light");

  function render(flown: number) {
    if (!wing || !sprite)
      return;

    for (const { canvas, mirror, context } of canvases) {
      const scale = canvas.width / wing.width;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      draw(context, wing, theme, sprite, mirror, flown);
    }
  }

  function tick(now: number) {
    render((((now - flightStart) / flightPeriod) % 1) * pitch);
    frame = requestAnimationFrame(tick);
  }

  /* flies while on screen; a still wall when off screen, hidden or for reduced motion */
  function update() {
    cancelAnimationFrame(frame);
    frame = 0;

    if (animated && wing && onScreen && !motion?.matches) {
      flightStart = performance.now();
      frame = requestAnimationFrame(tick);
    } else
      render(0);
  }

  /* the size comes from CSS; NaN while the wings are hidden */
  function measure(element: HTMLElement) {
    const style = getComputedStyle(canvases[0].canvas);
    const width = parseFloat(style.width);
    const title = element.querySelector("h1")?.getBoundingClientRect();

    if (!width || !title) {
      wing = undefined;
      update();
      return;
    }

    /* the wing starts above the page, behind the navbar (a negative top) */
    const wingTop = element.getBoundingClientRect().top + parseFloat(style.top);
    const next = { width, height: parseFloat(style.height), titleMiddle: Math.round(title.top + title.height / 2 - wingTop) };

    if (wing?.width === next.width && wing.height === next.height && wing.titleMiddle === next.titleMiddle)
      return;

    wing = next;

    const density = window.devicePixelRatio || 1;

    for (const { canvas } of canvases) {
      canvas.width = Math.ceil(next.width * density);
      canvas.height = Math.ceil(next.height * density);
    }

    update();
  }

  let resizeObserver: ResizeObserver | undefined;
  let intersectionObserver: IntersectionObserver | undefined;

  onMounted(() => {
    const element = root.value!;

    theme = currentTheme();
    sprite = dotSprite(inks[theme]);

    canvases = [false, true].map(mirror => {
      const canvas = document.createElement("canvas");
      canvas.className = `dot-wing ${mirror ? "right" : "left"}`;
      canvas.setAttribute("aria-hidden", "true");
      element.prepend(canvas);
      return { canvas, mirror, context: canvas.getContext("2d")! };
    });

    resizeObserver = new ResizeObserver(() => measure(element));
    resizeObserver.observe(element);

    if (!animated)
      return;

    motion = matchMedia("(prefers-reduced-motion: reduce)");
    motion.addEventListener("change", update);

    intersectionObserver = new IntersectionObserver(entries => {
      onScreen = entries.some(entry => entry.isIntersecting);
      update();
    });
    for (const { canvas } of canvases)
      intersectionObserver.observe(canvas);
  });

  watch(isDark, () => {
    if (!sprite)
      return;

    theme = currentTheme();
    sprite = dotSprite(inks[theme]);
    update();
  });

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame);
    resizeObserver?.disconnect();
    intersectionObserver?.disconnect();
    motion?.removeEventListener("change", update);

    for (const { canvas } of canvases)
      canvas.remove();
  });
}
