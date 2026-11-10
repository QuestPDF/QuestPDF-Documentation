import { nextTick, onMounted, onUnmounted, reactive, type Ref } from "vue";
import { type CodeLine, commentsCode, contentCode, layoutStatus, page, type Rect, rects, tree } from "./companionData";

/* The Companion demo: a scripted screen recording of the app. Each scene is an async script that moves the cursor,
   presses keys and changes the app state; CSS only draws the transitions. Like the Quick start session, it plays
   while at least 60% of the window is on screen in a shown tab and counts only that time. */

/* window geometry in design px; the component scales the whole window to its box */
export const W = 960;
export const H = 592;
export const TITLE = 42;
export const TREE = 300;
export const TOOLBAR = 40;
export const ERROR_BAR = 52;
export const TREE_BAR = 40;
export const ROW = 22;
export const TREE_PAD = 10;

/* all timings in ms, in one place */
const T = {
  move: 650,
  moveSlow: 1100,
  beforeClick: 160,
  doubleClick: 150,
  afterClick: 450,
  key: 420,
  typeChar: 120,
  codeChar: 70,
  camera: 900,
  look: 700,
  hold: 2600,
  holdLong: 3200,
  outro: 500,
  treeToggle: 500
};

export interface Camera {
  cx: number;
  cy: number;
  z: number;
}

export interface Overlay {
  kind: "point" | "vertical" | "horizontal";
  tint: Rect;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string[];
}

export interface Editor {
  file: string;
  lines: CodeLine[];
  mark: number | null;
  select: { line: number; from: number; to: number } | null;
  caret: { line: number; column: number } | null;
  status: "" | "applying" | "applied";
}

export interface Toolbar {
  page?: string;
  position?: string;
  size: string;
  error?: { title: string; text: string };
}

function baseState() {
  return {
    scene: 0,
    instant: false,
    theme: null as null | "light" | "dark",

    treeVisible: true,
    collapsed: ["table"] as string[],
    treeScroll: 0,
    selectedRow: null as string | null,
    status: null as null | Record<string, string>,
    search: null as null | { text: string; count: string },
    banner: null as null | string,

    toolbar: null as null | Toolbar,
    camera: fit(true, 0) as Camera,
    camMs: T.camera,
    dim: false,
    spotlight: null as null | Rect,
    frame: null as null | Rect,
    overflow: null as null | { space: Rect; overflow: Rect },
    overlay: null as null | Overlay,
    lens: false,
    commentsColor: "#EEEEEE",

    cursor: { x: 760, y: 420, ms: 0, visible: true },
    clicks: 0,
    caption: { title: "", keys: [] as string[] },
    pressed: false,

    editor: null as null | Editor,
    view: "document" as "document" | "exception",
    alerts: [] as string[],
    settings: false,
    hoverRow: -1
  };
}

export type DemoState = ReturnType<typeof baseState>;

/* the preview area below the title bar (and the toolbar, when one shows) */
export function desk(state: Pick<DemoState, "treeVisible" | "toolbar">) {
  const left = state.treeVisible ? TREE : 0;
  const top = TITLE + toolbarHeight(state.toolbar);
  return { left, top, w: W - left, h: H - top };
}

export function toolbarHeight(toolbar: Toolbar | null) {
  return toolbar ? TOOLBAR + (toolbar.error ? ERROR_BAR : 0) : 0;
}

/* the page as the app opens it: two thirds of the preview wide, 30px from the top */
function fit(treeVisible: boolean, toolbar: number): Camera {
  const w = W - (treeVisible ? TREE : 0);
  const h = H - TITLE - toolbar;
  const z = (w * 0.67) / page.w;
  return { cx: page.w / 2, cy: (h / 2 - 30) / z, z };
}

/* the whole page on screen, for the layout error */
function fitPage(state: DemoState): Camera {
  const d = desk(state);
  const z = (d.h - 48) / page.h;
  return { cx: page.w / 2 + 30, cy: page.h / 2, z };
}

/* a page point in window px, for the cursor */
export function toWindow(state: DemoState, x: number, y: number) {
  const d = desk(state);
  const { cx, cy, z } = state.camera;
  return { x: d.left + d.w / 2 + (x - cx) * z, y: d.top + d.h / 2 + (y - cy) * z };
}

export function visibleRows(state: Pick<DemoState, "collapsed">) {
  const parents: Record<string, string> = { table: "content" };
  return tree.filter(row => {
    let group = row.group;
    while (group) {
      if (state.collapsed.includes(group))
        return false;
      group = parents[group];
    }
    return true;
  });
}

export function treeTop(state: Pick<DemoState, "search" | "banner">) {
  return TITLE + (state.search || state.banner ? TREE_BAR : 0) + TREE_PAD;
}

function rowCenter(state: DemoState, id: string) {
  const index = visibleRows(state).findIndex(row => row.id === id);
  return treeTop(state) + index * ROW - state.treeScroll + ROW / 2;
}

/* scrolls the tree so that a row sits about a third down the panel */
function revealRow(state: DemoState, id: string) {
  const rows = visibleRows(state);
  const index = rows.findIndex(row => row.id === id);
  const panel = H - treeTop(state);
  const max = Math.max(0, rows.length * ROW + TREE_PAD * 2 - panel);
  state.treeScroll = Math.round(Math.min(max, Math.max(0, index * ROW - panel / 3)));
}

function center(rect: Rect) {
  return { x: rect.x + rect.w / 2, y: rect.y + rect.h / 2 };
}

function format(value: number) {
  return value.toFixed(1);
}

const CANCEL = Symbol("cancel");

export function useCompanionDemo(root: Ref<HTMLElement | null>, options: { onScreen?: () => boolean } = {}) {
  const state = reactive(baseState());

  let generation = 0;
  let fastUntil = 0;
  let elapsed = 0;
  let freeze = false;
  let paused = true;
  let inView = false;
  let alive = true;
  let started = false;
  let observer: IntersectionObserver | undefined;

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function check(g: number) {
    if (g !== generation || !alive)
      throw CANCEL;
  }

  /* ends fast-forwarding: lets the browser draw the reached state without transitions, then turns them back on */
  async function land(g: number) {
    await nextTick();
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    check(g);
    state.instant = false;
  }

  /* a frozen frame keeps transitions and entrance animations off, so it shows the settled state */
  async function park(g: number) {
    for (;;) {
      await sleep(250);
      check(g);
    }
  }

  /* waits ms of on-screen time; while seeking it only advances the scene clock */
  async function wait(ms: number) {
    const g = generation;

    if (elapsed + ms <= fastUntil) {
      elapsed += ms;
      return;
    }

    if (elapsed < fastUntil) {
      ms -= fastUntil - elapsed;
      elapsed = fastUntil;
      if (freeze)
        return park(g);
      await land(g);
    }

    let left = ms;
    while (left > 0) {
      if (paused) {
        await sleep(100);
      }
      else {
        const slice = Math.min(left, 100);
        await sleep(slice);
        left -= slice;
        elapsed += slice;
      }
      check(g);
    }
  }

  /* the frame a scene is about: still mode (reduced motion, captures) stops here */
  async function still() {
    if (freeze && fastUntil === Infinity)
      return park(generation);
  }

  async function move(x: number, y: number, ms = T.move) {
    state.cursor.ms = ms;
    state.cursor.x = Math.round(x);
    state.cursor.y = Math.round(y);
    await wait(ms);
  }

  async function moveToPage(x: number, y: number, ms = T.move) {
    const point = toWindow(state, x, y);
    await move(point.x, point.y, ms);
  }

  async function moveToRow(id: string, x: number, ms = T.move) {
    await move(x, rowCenter(state, id), ms);
  }

  async function click() {
    await wait(T.beforeClick);
    state.clicks++;
    await wait(T.afterClick / 3);
  }

  async function doubleClick() {
    await wait(T.beforeClick);
    state.clicks++;
    await wait(T.doubleClick);
    state.clicks++;
    await wait(T.afterClick / 3);
  }

  async function press(keys: string[]) {
    state.caption.keys = keys;
    state.pressed = true;
    await wait(T.key);
    state.pressed = false;
  }

  function setCamera(camera: Camera, ms = T.camera) {
    state.camMs = ms;
    state.camera = camera;
  }

  function select(rect: Rect, toolbar: Toolbar | null = null) {
    state.dim = true;
    state.spotlight = rect;
    state.frame = rect;
    state.toolbar = toolbar ?? {
      page: "1 (1-1)",
      position: `${format(rect.x)} / ${format(rect.y)}`,
      size: `${format(rect.w)} x ${format(rect.h)}`
    };
  }

  function clearSelection() {
    state.dim = false;
    state.spotlight = null;
    state.frame = null;
    state.toolbar = null;
    state.selectedRow = null;
  }

  function caption(title: string, keys: string[] = []) {
    state.caption = { title, keys };
  }

  async function typeCode(line: number, from: number, to: number, text: string) {
    const editor = state.editor!;
    editor.select = { line, from, to };
    await wait(T.look);

    const source = editor.lines[line].text;
    const head = source.slice(0, from);
    const tail = source.slice(to);
    editor.select = null;

    for (let index = 1; index <= text.length; index++) {
      editor.lines[line] = { ...editor.lines[line], text: head + text.slice(0, index) + tail };
      editor.caret = { line, column: from + index };
      await wait(T.codeChar);
    }

    editor.caret = null;
  }

  function openEditor(lines: CodeLine[], mark: number | null = null) {
    state.editor = { file: "Rider · InvoiceDocument.cs", lines: lines.map(line => ({ ...line })), mark, select: null, caret: null, status: "" };
  }

  /* editor geometry, shared with the component: top-left over the tree */
  const EDITOR = { x: 20, y: 62, lineHeight: 19, header: 34, gutter: 40, char: 6.6 };

  function codePoint(line: number, column: number) {
    return { x: EDITOR.x + EDITOR.gutter + 12 + column * EDITOR.char, y: EDITOR.y + EDITOR.header + 8 + line * EDITOR.lineHeight + EDITOR.lineHeight / 2 };
  }

  const scenes: { title: string; run: () => Promise<void> }[] = [
    {
      title: "Hot reload",
      async run() {
        caption("Hot reload");
        setCamera({ cx: page.w / 2, cy: 470, z: 1.02 });
        openEditor(commentsCode);
        await wait(T.look);

        const line = 3;
        const source = state.editor!.lines[line].text;
        const from = source.indexOf("Grey");
        const to = source.indexOf(")");
        const word = codePoint(line + 0, state.editor!.lines[line].indent * 4 + (from + to) / 2);
        await move(word.x, word.y);
        await doubleClick();
        await typeCode(line, from, to, "Blue.Lighten5");
        await wait(T.look);

        state.editor!.status = "applying";
        await wait(900);
        state.editor!.status = "applied";
        state.commentsColor = "#E3F2FD";
        await moveToPage(rects.comments.x + 360, rects.comments.y + 70, T.moveSlow);
        await still();
        await wait(T.holdLong);
      }
    },
    {
      title: "Document structure",
      async run() {
        caption("Document structure", ["Ctrl", "W"]);
        state.collapsed = ["content", "table"];
        setCamera(fit(true, 0));
        await moveToRow("content", 28);
        await click();
        state.collapsed = ["table"];
        await wait(T.look);

        await moveToRow("compose-table", 28 + 24);
        await click();
        state.collapsed = [];
        await wait(T.look);
        revealRow(state, "unit-price");
        await wait(T.look + 400);

        await move(640, 360, T.move);
        await press(["Ctrl", "W"]);
        state.treeVisible = false;
        setCamera(fit(false, 0), T.treeToggle);
        await still();
        await wait(T.hold - 600);

        await press(["Ctrl", "W"]);
        state.treeVisible = true;
        setCamera(fit(true, 0), T.treeToggle);
        await wait(T.look + 300);
      }
    },
    {
      title: "Element selection",
      async run() {
        caption("Element selection", ["Double-click"]);
        setCamera(fit(true, 0));
        await wait(300);
        const target = center(rects.from);
        await moveToPage(target.x + 20, target.y + 6);
        await doubleClick();

        state.selectedRow = "from";
        revealRow(state, "from");
        select(rects.from);
        setCamera({ cx: 215, cy: 205, z: 1.75 });
        await wait(T.camera);
        await moveToPage(target.x + 60, target.y + 34, T.moveSlow);
        await still();
        await wait(T.hold);

        caption("Element selection", ["Esc"]);
        await press(["Esc"]);
        clearSelection();
        setCamera(fit(true, 0));
        await wait(T.look);
      }
    },
    {
      title: "Search",
      async run() {
        caption("Search", ["Ctrl", "F"]);
        setCamera(fit(true, 0));
        state.treeScroll = 0;
        await move(150, 300);
        await press(["Ctrl", "F"]);
        state.search = { text: "", count: "" };
        await wait(300);

        for (const letter of "unit") {
          state.search.text += letter;
          await wait(T.typeChar);
        }

        state.search.count = "1 / 1";
        state.collapsed = [];
        state.selectedRow = "unit-price";
        revealRow(state, "unit-price");
        select(rects.unitPrice);
        setCamera({ cx: 380, cy: 250, z: 2.4 });
        await move(170, 400, T.moveSlow);
        await still();
        await wait(T.hold);

        caption("Search", ["Esc"]);
        await press(["Esc"]);
        state.search = null;
        clearSelection();
        setCamera(fit(true, 0));
        await wait(T.look);
      }
    },
    {
      title: "Magnifier",
      async run() {
        caption("Magnifier", ["1"]);
        setCamera(fit(true, 0));
        await moveToPage(100, 300);
        await press(["1"]);
        state.lens = true;
        await moveToPage(120, 382, T.moveSlow + 300);
        await still();
        await wait(T.look);
        await moveToPage(370, 440, T.moveSlow + 600);
        await wait(T.look);
        await moveToPage(520, 330, T.moveSlow + 300);
        await wait(T.look);

        await press(["1"]);
        state.lens = false;
        await wait(T.outro);
      }
    },
    {
      title: "Coordinates",
      async run() {
        caption("Coordinates", ["2"]);
        setCamera({ cx: 250, cy: 470, z: 1.7 });
        await wait(T.camera);
        await press(["2"]);
        const title = rects.commentsTitle;
        await moveToPage(title.x + title.w, title.y, T.moveSlow);
        state.overlay = {
          kind: "point",
          tint: title,
          x1: title.x + title.w,
          y1: title.y,
          x2: 0,
          y2: 0,
          label: ["Page: 1", `X: ${format(title.x + title.w)}`, `Y: ${format(title.y)}`]
        };
        await still();
        await wait(T.hold);
        state.overlay = null;
      }
    },
    {
      title: "Measurement",
      async run() {
        caption("Measurement", ["3"]);
        setCamera({ cx: 230, cy: 150, z: 1.6 });
        await wait(T.camera - 300);
        await press(["3"]);
        const title = rects.title;
        await moveToPage(title.x + 70, title.y + 14);
        state.overlay = { kind: "vertical", tint: title, x1: title.x + 70, y1: 0, x2: title.x + 70, y2: title.y, label: [format(title.y)] };
        await wait(T.hold - 400);
        state.overlay = null;

        caption("Measurement", ["4"]);
        setCamera({ cx: 300, cy: 500, z: 1.2 });
        await wait(T.camera - 300);
        await press(["4"]);
        const comments = rects.comments;
        const words = rects.commentsTitle;
        await moveToPage(words.x + words.w + 6, words.y + 8);
        state.overlay = {
          kind: "horizontal",
          tint: comments,
          x1: words.x + words.w,
          y1: words.y + words.h / 2,
          x2: comments.x + comments.w,
          y2: words.y + words.h / 2,
          label: [format(comments.x + comments.w - words.x - words.w)]
        };
        await still();
        await wait(T.hold);
        state.overlay = null;
      }
    },
    {
      title: "Go to implementation",
      async run() {
        caption("Go to implementation", ["Ctrl", "Click"]);
        setCamera(fit(true, 0));
        await wait(300);
        await moveToPage(rects.grandTotal.x + 70, rects.grandTotal.y + 9);
        state.caption.keys = ["Ctrl", "Click"];
        state.pressed = true;
        await click();
        state.pressed = false;
        openEditor(contentCode, 9);
        await wait(T.look);
        const mark = codePoint(9, 8 + 26);
        await move(mark.x, mark.y + 14, T.moveSlow);
        await still();
        await wait(T.holdLong);
      }
    },
    {
      title: "Runtime exception",
      async run() {
        caption("Runtime exception");
        await move(560, 300);
        state.alerts = ["exception"];
        state.view = "exception";
        await wait(T.look);
        for (const row of [0, 1, 2]) {
          state.hoverRow = row;
          await move(520 + row * 30, 192 + row * 44, T.move);
        }
        await still();
        await wait(T.hold);
      }
    },
    {
      title: "Layout issues",
      async run() {
        caption("Layout issues");
        state.alerts = ["layout"];
        state.banner = "Layout error 1 / 3";
        state.status = layoutStatus;
        await wait(T.look);

        state.selectedRow = "header-row";
        const toolbar = { size: "495.0 x 52.0", error: { title: "Layout error root cause", text: "One of the items does not fit (even partially) in the available space." } };
        select(rects.header, toolbar);
        state.overflow = {
          space: rects.logo,
          overflow: { x: rects.logo.x + rects.logo.w, y: rects.logo.y, w: 80, h: rects.logo.h }
        };
        setCamera(fitPage(state));
        await wait(T.camera);
        await move(230, rowCenter(state, "header-row") + 4, T.moveSlow);
        await still();
        await wait(T.holdLong);
      }
    },
    {
      title: "Settings",
      async run() {
        caption("Settings");
        await move(W - 158, 21);
        await click();
        state.settings = true;
        await wait(T.look);

        const dark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
        const target = dark ? "light" : "dark";
        await move(target === "dark" ? 820 : 750, 160);
        await click();
        state.theme = target;
        await still();
        await wait(T.hold);
      }
    }
  ];

  /* each scene starts from a clean app; the cursor and the camera carry over so the cut reads as one recording */
  function reset(index: number) {
    const cursor = { ...state.cursor };
    const camera = { ...state.camera };
    Object.assign(state, baseState(), { scene: index, cursor, camera, instant: state.instant });
  }

  async function play(start: number) {
    const g = ++generation;
    let index = start;

    for (;;) {
      reset(index);
      elapsed = 0;

      try {
        await scenes[index].run();
        check(g);
      }
      catch (error) {
        if (error === CANCEL)
          return;
        throw error;
      }

      fastUntil = 0;
      index = (index + 1) % scenes.length;
    }
  }

  /* jumps to a scene; `at` fast-forwards into it (ms, Infinity = its still frame), `stop` freezes there */
  function jump(index: number, at = 0, stop = false) {
    started = true;
    freeze = stop;
    fastUntil = at;
    state.instant = at > 0;
    void play(index);
  }

  function updatePaused() {
    paused = !inView || document.hidden;

    if (!paused && !started) {
      started = true;
      void play(0);
    }
  }

  onMounted(() => {
    const params = new URLSearchParams(location.search);
    const scene = params.get("scene");

    if (scene !== null) {
      paused = false;
      const index = Math.max(0, Math.min(scenes.length - 1, Number(scene) || 0));
      const at = params.get("t");
      jump(index, at === null ? Infinity : Number(at), true);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      jump(2, Infinity, true);
      return;
    }

    observer = new IntersectionObserver(([entry]) => {
      const screen = entry.rootBounds?.height ?? window.innerHeight;
      inView = entry.intersectionRect.height >= 0.6 * Math.min(entry.boundingClientRect.height, screen);
      updatePaused();
    }, { threshold: Array.from({ length: 21 }, (_, index) => index / 20) });

    observer.observe(root.value!);
    document.addEventListener("visibilitychange", updatePaused);
  });

  onUnmounted(() => {
    alive = false;
    generation++;
    observer?.disconnect();
    document.removeEventListener("visibilitychange", updatePaused);
  });

  return { state, scenes, jump, EDITOR };
}
