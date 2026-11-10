<script setup lang="ts">
import {
  faArrowDown, faArrowUp, faBook, faCheck, faChevronRight, faCode, faExpand, faFile, faFolder, faFolderOpen, faGear,
  faLocationCrosshairs, faMagnifyingGlass, faMinus, faPen, faSpinnerThird, faTableLayout, faUser, faWindowMaximize, faXmark
} from "@fortawesome/pro-light-svg-icons";
import Icon from "../../Icon.vue";
import CompanionPage from "./CompanionPage.vue";
import { page, stackTrace, statusColors, type CodeLine } from "./companionData";
import { desk, H, ROW, TITLE, toolbarHeight, TREE, treeTop, useCompanionDemo, visibleRows, W } from "./companionDemo";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/* A scripted recording of the Companion App, drawn in HTML at 960 x 592 design px and scaled to its box.
   `skeleton` draws the document and the tree as bars; readouts (toolbar values, measurements, errors) stay text. */
const props = withDefaults(defineProps<{ skeleton?: boolean }>(), { skeleton: true });

const root = ref<HTMLElement | null>(null);
const { state, scenes, jump, EDITOR } = useCompanionDemo(root);
defineExpose({ jump, scenes, state });

const scale = ref(0);
let resize: ResizeObserver | undefined;

onMounted(() => {
  resize = new ResizeObserver(([entry]) => scale.value = entry.contentRect.width / W);
  resize.observe(root.value!);
});

onBeforeUnmount(() => resize?.disconnect());

const rows = computed(() => visibleRows(state));
const area = computed(() => desk(state));

const camera = computed(() => {
  const { cx, cy, z } = state.camera;
  return {
    transform: `translate(${area.value.w / 2 - cx * z}px, ${area.value.h / 2 - cy * z}px) scale(${z})`,
    transitionDuration: `${state.camMs}ms`
  };
});

/* 1 screen px inside the scaled page */
const px = computed(() => 1 / state.camera.z);

/* the magnifier: a 2.4x copy of the page centred on the cursor, moving with the same timing as the cursor */
const LENS = 240;
const LENS_ZOOM = 2.4;

const lens = computed(() => {
  const d = area.value;
  const { cx, cy, z } = state.camera;
  const x = cx + (state.cursor.x - d.left - d.w / 2) / z;
  const y = cy + (state.cursor.y - d.top - d.h / 2) / z;
  const zoom = z * LENS_ZOOM;
  return {
    box: { transform: `translate(${state.cursor.x - LENS / 2}px, ${state.cursor.y - LENS / 2}px)`, transitionDuration: `${state.cursor.ms}ms` },
    page: { transform: `translate(${LENS / 2 - x * zoom}px, ${LENS / 2 - y * zoom}px) scale(${zoom})`, transitionDuration: `${state.cursor.ms}ms` }
  };
});

function box(rect: { x: number; y: number; w: number; h: number }) {
  return { left: `${rect.x}px`, top: `${rect.y}px`, width: `${rect.w}px`, height: `${rect.h}px` };
}

/* code tokens: identical geometry in text and skeleton mode, one monospace cell per character */
const KEYWORDS = new Set(["void", "var", "new", "return"]);
const SWATCHES: Record<string, string> = { "Grey.Lighten3": "#EEEEEE", "Blue.Lighten5": "#E3F2FD" };

function tokens(line: CodeLine) {
  const parts = line.text.match(/\$?"[^"]*"?|[A-Za-z_]\w*|\d+|\s+|./g) ?? [];
  let previous = "";
  return parts.map(text => {
    let kind = "punct";
    if (/^\s+$/.test(text)) kind = "space";
    else if (text.startsWith("\"") || text.startsWith("$\"")) kind = "string";
    else if (/^\d/.test(text)) kind = "number";
    else if (KEYWORDS.has(text)) kind = "keyword";
    else if (/^[A-Za-z_]/.test(text)) kind = previous === "." ? "member" : /^[A-Z]/.test(text) ? "type" : "plain";
    previous = text;
    return { text, kind };
  });
}

function swatch(line: CodeLine) {
  const match = line.text.match(/Colors\.(\w+\.\w+)\)/);
  return match ? SWATCHES[match[1]] : undefined;
}

function codeX(line: CodeLine, column: number) {
  return EDITOR.gutter + 12 + (line.indent * 4 + column) * EDITOR.char;
}

const forcedTheme = computed(() => state.theme ? `theme-${state.theme}` : "");
const toolbarH = computed(() => toolbarHeight(state.toolbar));
</script>

<template>
  <div ref="root" class="companion-demo" :style="{ '--scale': scale }" aria-hidden="true">
    <div class="window" :class="[forcedTheme, { instant: state.instant, skeleton: props.skeleton }]" :style="{ width: `${W}px`, height: `${H}px` }">

      <header class="titlebar" :style="{ height: `${TITLE}px` }">
        <img class="logo light" src="/questpdf-logo-nav-light.webp" alt="" width="149" height="24" />
        <img class="logo dark" src="/questpdf-logo-nav-dark.webp" alt="" width="149" height="24" />

        <div class="controls">
          <span v-if="state.alerts.includes('exception')" class="tile orange"><Icon :icon="faCode" /></span>
          <span v-if="state.alerts.includes('layout')" class="tile red"><Icon :icon="faTableLayout" /></span>
          <span class="tile green"><Icon :icon="faUser" /></span>
          <span class="button"><Icon :icon="faBook" /></span>
          <span class="button" :class="{ pressed: state.settings }"><Icon :icon="faGear" /></span>
          <span class="separator"></span>
          <span class="button"><Icon :icon="faMinus" /></span>
          <span class="button"><Icon :icon="faWindowMaximize" /></span>
          <span class="button"><Icon :icon="faXmark" /></span>
        </div>
      </header>

      <aside class="tree" :style="{ width: `${state.treeVisible ? TREE : 0}px`, top: `${TITLE}px` }">
        <div v-if="state.search" class="tree-bar search">
          <Icon :icon="faMagnifyingGlass" />
          <span class="query"><span class="typed">{{ state.search.text }}</span><i v-if="!state.search.count" class="caret"></i></span>
          <span class="count">{{ state.search.count }}</span>
          <Icon :icon="faArrowUp" />
          <Icon :icon="faArrowDown" />
          <Icon :icon="faXmark" />
        </div>

        <div v-else-if="state.banner" class="tree-bar banner">
          <span>{{ state.banner }}</span>
          <Icon :icon="faArrowUp" />
          <Icon :icon="faArrowDown" />
        </div>

        <div class="rows-clip" :style="{ top: `${treeTop(state) - TITLE}px` }">
          <ul class="rows" :style="{ transform: `translateY(${-state.treeScroll}px)` }">
            <li
                v-for="row of rows"
                :key="row.id"
                class="row"
                :class="{ selected: state.selectedRow === row.id, section: row.section, dots: state.status }"
                :style="{ '--depth': row.depth, height: `${ROW}px` }">
              <i v-if="state.status" class="dot" :style="{ backgroundColor: statusColors[state.status[row.id] as keyof typeof statusColors] ?? statusColors.done }"></i>
              <span class="slot">
                <Icon v-if="row.folder" :icon="row.chevron ? faFolder : faFolderOpen" />
                <Icon v-else-if="row.chevron" class="chevron" :class="{ open: row.opens && !state.collapsed.includes(row.opens) }" :icon="faChevronRight" />
              </span>
              <span class="label">
                <template v-if="!props.skeleton">{{ row.label }}</template>
                <i v-else class="bone" :style="{ width: `${row.label.length * 7.4}px` }"></i>
              </span>
              <span v-if="row.hint" class="hint">
                <template v-if="!props.skeleton">{{ row.hint }}</template>
                <i v-else class="bone" :style="{ width: `${Math.min(row.hint.length * 6.6, 120)}px` }"></i>
              </span>
            </li>
          </ul>
        </div>
      </aside>

      <section class="preview" :style="{ left: `${state.treeVisible ? TREE : 0}px`, top: `${TITLE}px` }">
        <div v-if="state.toolbar" class="toolbar" :style="{ height: `${toolbarH}px` }">
          <div class="tools">
            <Icon :icon="faPen" />
            <Icon class="off" :icon="faArrowUp" />
            <Icon class="off" :icon="faArrowDown" />
            <span v-if="state.toolbar.page" class="reading"><Icon :icon="faFile" />{{ state.toolbar.page }}</span>
            <span v-if="state.toolbar.position" class="reading"><Icon :icon="faLocationCrosshairs" />{{ state.toolbar.position }}</span>
            <span class="reading"><Icon :icon="faExpand" />{{ state.toolbar.size }}</span>
          </div>
          <div v-if="state.toolbar.error" class="error-line">
            <i class="dot" :style="{ backgroundColor: statusColors.root }"></i>
            <span><strong>{{ state.toolbar.error.title }}</strong><br />{{ state.toolbar.error.text }}</span>
          </div>
        </div>

        <div class="desk" :style="{ top: `${toolbarH}px` }">
          <div class="camera" :style="camera">
            <CompanionPage :skeleton="props.skeleton" :comments-color="state.commentsColor" class="page" :class="{ dimmed: state.dim }" :style="{ '--blur': `${2.4 * px}px` }" />
            <div v-if="state.dim" class="dim" :style="{ width: `${page.w}px`, height: `${page.h}px` }"></div>
            <CompanionPage
                v-if="state.spotlight"
                :skeleton="props.skeleton"
                :comments-color="state.commentsColor"
                class="page spot"
                :style="{ clipPath: `inset(${state.spotlight.y}px ${page.w - state.spotlight.x - state.spotlight.w}px ${page.h - state.spotlight.y - state.spotlight.h}px ${state.spotlight.x}px)` }" />
            <div v-if="state.frame" class="frame" :style="{ ...box(state.frame), borderWidth: `${3 * px}px`, margin: `${-3 * px}px` }"></div>

            <template v-if="state.overflow">
              <div class="space" :style="box(state.overflow.space)"></div>
              <div class="overflow" :style="{ ...box(state.overflow.overflow), '--line': `${6 * px}px` }"></div>
            </template>

            <template v-if="state.overlay">
              <div class="tint" :style="{ ...box(state.overlay.tint), outlineWidth: `${1.5 * px}px` }"></div>
              <template v-if="state.overlay.kind === 'point'">
                <i class="point" :style="{ left: `${state.overlay.x1}px`, top: `${state.overlay.y1}px`, transform: `translate(-50%, -50%) scale(${px})` }"></i>
                <div class="badge stack" :style="{ left: `${state.overlay.x1 + 20 * px}px`, top: `${state.overlay.y1 - 40 * px}px`, transform: `scale(${px})` }">
                  <span v-for="line of state.overlay.label" :key="line">{{ line }}</span>
                </div>
              </template>
              <template v-else>
                <div
                    class="ruler"
                    :class="state.overlay.kind"
                    :style="{
                      left: `${state.overlay.x1}px`, top: `${state.overlay.y1}px`,
                      width: `${Math.max(state.overlay.x2 - state.overlay.x1, 0)}px`, height: `${Math.max(state.overlay.y2 - state.overlay.y1, 0)}px`,
                      '--line': `${2.5 * px}px`, '--cap': `${14 * px}px`
                    }"></div>
                <div
                    class="badge"
                    :style="state.overlay.kind === 'vertical'
                      ? { left: `${state.overlay.x1 - 16 * px}px`, top: `${(state.overlay.y1 + state.overlay.y2) / 2}px`, transform: `translate(-100%, -50%) scale(${px})`, transformOrigin: 'right center' }
                      : { left: `${(state.overlay.x1 + state.overlay.x2) / 2}px`, top: `${state.overlay.y1 - 14 * px}px`, transform: `translate(-50%, -100%) scale(${px})`, transformOrigin: 'center bottom' }">
                  {{ state.overlay.label[0] }}
                </div>
              </template>
            </template>
          </div>

          <div v-if="state.lens" class="lens" :style="{ ...lens.box, width: `${LENS}px`, height: `${LENS}px`, left: `${-area.left}px`, top: `${-area.top}px` }">
            <div class="lens-page" :style="lens.page">
              <CompanionPage :skeleton="props.skeleton" :comments-color="state.commentsColor" class="page" />
            </div>
          </div>
        </div>
      </section>

      <section v-if="state.view === 'exception'" class="exception" :style="{ top: `${TITLE}px` }">
        <div class="exception-card">
          <header>
            <span>System.DivideByZeroException</span>
            <strong>Attempted to divide by zero.</strong>
          </header>
          <p v-for="(frame, index) of stackTrace" :key="index" :class="{ hovered: state.hoverRow === index }">
            <template v-if="!props.skeleton">{{ frame[0] }}<b>{{ frame[1] }}</b>{{ frame[2] }}</template>
            <template v-else>
              <i class="bone" :style="{ width: `${frame[0].length * 6.4}px` }"></i>
              <i class="bone strong" :style="{ width: `${frame[1].length * 6.4}px` }"></i>
              <i class="bone" :style="{ width: `${frame[2].length * 6.4}px` }"></i>
            </template>
          </p>
        </div>
      </section>

      <div v-if="state.editor" class="editor" :style="{ left: `${EDITOR.x}px`, top: `${EDITOR.y}px` }">
        <header :style="{ height: `${EDITOR.header}px` }">
          <span class="file">{{ state.editor.file }}</span>
          <span v-if="state.editor.status === 'applying'" class="status"><Icon class="spin" :icon="faSpinnerThird" />Applying changes</span>
          <span v-else-if="state.editor.status === 'applied'" class="status done"><Icon :icon="faCheck" />Changes applied</span>
        </header>
        <div class="code" :style="{ '--line': `${EDITOR.lineHeight}px`, '--char': `${EDITOR.char}px` }">
          <div v-for="(line, index) of state.editor.lines" :key="index" class="code-line" :class="{ marked: state.editor.mark === index }">
            <span class="number">{{ index + 1 }}</span>
            <i v-if="swatch(line)" class="swatch" :style="{ backgroundColor: swatch(line) }"></i>
            <span class="source" :style="{ paddingLeft: `${line.indent * 4 * EDITOR.char}px` }">
              <template v-for="(token, t) of tokens(line)" :key="t">
                <span v-if="!props.skeleton" :class="token.kind">{{ token.text }}</span>
                <i v-else-if="token.kind !== 'space' && token.kind !== 'punct'" class="bar" :class="token.kind" :style="{ width: `${token.text.length * EDITOR.char - 2}px` }"></i>
                <span v-else class="gap" :style="{ width: `${token.text.length * EDITOR.char}px` }"></span>
              </template>
            </span>
            <i v-if="state.editor.select?.line === index" class="selection" :style="{ left: `${codeX(line, state.editor.select.from)}px`, width: `${(state.editor.select.to - state.editor.select.from) * EDITOR.char}px` }"></i>
            <i v-if="state.editor.caret?.line === index" class="caret" :style="{ left: `${codeX(line, state.editor.caret.column)}px` }"></i>
          </div>
        </div>
      </div>

      <div v-if="state.settings" class="settings">
        <h3>Settings</h3>
        <h4>Theme mode</h4>
        <div class="chips">
          <span class="chip" style="width: 76px">System</span>
          <span class="chip" :class="{ on: (state.theme ?? 'light') === 'light' }" style="width: 64px">Light</span>
          <span class="chip" :class="{ on: state.theme === 'dark' }" style="width: 60px">Dark</span>
        </div>
        <hr />
        <h4>Default code editor</h4>
        <div class="chips">
          <span class="chip on">Rider</span>
          <span class="chip">VS Code</span>
          <span class="chip">Visual Studio</span>
        </div>
        <hr />
        <div class="setting-row"><h4>Show document hierarchy</h4><i class="toggle"></i></div>
        <hr />
        <div class="setting-row">
          <div><h4>Connection port</h4><span class="listening"><i></i>Active and listening</span></div>
          <span class="port">12500</span>
        </div>
      </div>

      <div v-if="state.caption.title" class="caption">
        <span>{{ state.caption.title }}</span>
        <kbd v-for="key of state.caption.keys" :key="key" :class="{ pressed: state.pressed }">{{ key }}</kbd>
      </div>

      <div class="cursor" :style="{ transform: `translate(${state.cursor.x}px, ${state.cursor.y}px)`, transitionDuration: `${state.cursor.ms}ms` }">
        <i v-if="state.clicks" :key="state.clicks" class="ring"></i>
        <svg width="20" height="28" viewBox="0 0 20 28"><path d="M1.5 1.5v21.2l5.3-5 3.5 8.1 3.6-1.6-3.4-7.8h7.2z" /></svg>
      </div>
    </div>
  </div>
</template>

<style scoped>

.companion-demo {
  position: relative;
  width: 100%;
  aspect-ratio: 960 / 592;
  overflow: hidden;
  user-select: none;
  pointer-events: none;
}

.window {
  --chrome: light-dark(#F9F8FF, #121418);
  --desk: light-dark(#E3E2E9, #2E2F35);
  --edge: light-dark(#D0CFD6, #2A2C33);
  --ink: light-dark(#1F212C, #E4E4EA);
  --ink-2: light-dark(#5C5E6B, #A6A8B4);
  --ink-3: light-dark(#A3A2AC, #6C6F7C);
  --section: light-dark(#4A5F8F, #8EA8DE);
  --selected: light-dark(#DDE2F9, #3F4658);
  --toolbar: light-dark(#DCE2F4, #353B4C);
  --bone: light-dark(#C3C6D1, #4A4E5B);
  --bone-strong: light-dark(#8E95A3, #7D8394);
  --bone-section: light-dark(#93A6CC, #5D74A6);
  --popover: light-dark(#F9F8FF, #1C1E24);
  --popover-edge: light-dark(rgba(16, 24, 40, 0.12), rgba(255, 255, 255, 0.1));
  --shadow: light-dark(rgba(16, 24, 40, 0.24), rgba(0, 0, 0, 0.6));
  --red: #F44336;

  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  transform: scale(var(--scale));
  transform-origin: 0 0;
  background-color: var(--chrome);
  color: var(--ink);
  font-family: var(--vp-font-family-base);
  font-size: 14px;
  line-height: 20px;
  text-align: left;
}

.window.theme-light {
  color-scheme: light;
}

.window.theme-dark {
  color-scheme: dark;
}

.window.instant,
.window.instant * {
  transition: none !important;
  animation: none !important;
}

.icon {
  font-size: 16px;
}

/* title bar */

.titlebar {
  position: absolute;
  inset: 0 0 auto 0;
  display: flex;
  align-items: center;
  padding-left: 14px;
  border-bottom: 1px solid var(--edge);
  background-color: var(--chrome);
}

.logo {
  height: 24px;
  width: auto;
}

.logo.dark,
.theme-dark .logo.light {
  display: none;
}

.theme-dark .logo.dark {
  display: block;
}

:root.dark .window:not(.theme-light) .logo.light {
  display: none;
}

:root.dark .window:not(.theme-light) .logo.dark {
  display: block;
}

.controls {
  display: flex;
  align-items: center;
  margin-left: auto;
  padding-right: 2px;
}

.button,
.tile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 32px;
}

.button .icon {
  font-size: 18px;
}

.button.pressed {
  border-radius: 6px;
  background-color: light-dark(#E6E5EC, #2B2D35);
}

.tile {
  width: 32px;
  margin: 0 4px;
  border-radius: 6px;
  color: #FFFFFF;
  animation: tile-in 0.35s ease-out;
}

.tile.green { background-color: #4CAF50; }
.tile.orange { background-color: #FF9800; }
.tile.red { background-color: var(--red); }

.separator {
  width: 1px;
  height: 22px;
  margin: 0 7px 0 8px;
  background-color: var(--edge);
}

@keyframes tile-in {
  from { transform: scale(0.4); opacity: 0; }
}

/* document tree */

.tree {
  position: absolute;
  bottom: 0;
  left: 0;
  overflow: hidden;
  border-right: 1px solid var(--edge);
  background-color: var(--chrome);
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.tree-bar {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 300px;
  height: 40px;
  padding: 0 14px;
  border-bottom: 1px solid var(--edge);
}

.tree-bar.search .query {
  flex: 1;
  display: flex;
  align-items: center;
}

.tree-bar.search .typed {
  background-color: light-dark(#C9D3F0, #44506E);
}

.tree-bar .count {
  color: var(--ink-2);
}

.tree-bar.banner {
  background-color: light-dark(#FEDAD6, #4E2627);
  color: light-dark(#B3261E, #FFB4AB);
}

.tree-bar.banner span {
  flex: 1;
}

.caret {
  display: inline-block;
  width: 1.5px;
  height: 17px;
  margin-left: 1px;
  background-color: var(--ink);
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.rows-clip {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 300px;
  overflow: hidden;
}

.rows {
  margin: 0;
  padding: 0 8px;
  list-style: none;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.row {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: calc(4px + var(--depth) * 24px);
  border-radius: 7px;
  white-space: nowrap;
  animation: row-in 0.3s ease-out;
}

.row.dots {
  padding-left: calc(26px + var(--depth) * 24px);
}

.row.selected {
  background-color: var(--selected);
}

.row.section .label {
  color: var(--section);
}

@keyframes row-in {
  from { opacity: 0; transform: translateY(-4px); }
}

.dot {
  display: block;
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.row .dot {
  position: absolute;
  left: 8px;
}

.slot {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  color: var(--ink-2);
}

.chevron {
  transition: transform 0.2s ease;
}

.chevron.open {
  transform: rotate(90deg);
}

.label {
  margin-left: 4px;
}

.hint {
  overflow: hidden;
  margin-left: 14px;
  font-style: italic;
  color: var(--ink-3);
}

.bone {
  display: inline-block;
  height: 9px;
  border-radius: 4.5px;
  background-color: var(--bone);
  vertical-align: middle;
}

.label .bone {
  background-color: var(--bone-strong);
}

.section .label .bone {
  background-color: var(--bone-section);
}

.selected .label .bone {
  background-color: var(--section);
}

/* preview */

.preview {
  position: absolute;
  right: 0;
  bottom: 0;
  transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.toolbar {
  position: absolute;
  inset: 0 0 auto 0;
  border-bottom: 1px solid var(--edge);
  background-color: var(--toolbar);
  animation: fade-in 0.3s ease-out;
}

.tools {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 40px;
  padding: 0 16px;
}

.tools .off {
  opacity: 0.45;
}

.reading {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 22px;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

.error-line {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 16px;
  font-size: 13px;
  line-height: 18px;
}

.error-line .dot {
  width: 16px;
  height: 16px;
}

.error-line strong {
  font-weight: 400;
}

.desk {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background-color: var(--desk);
  transition: top 0.3s ease;
}

.camera {
  position: absolute;
  top: 0;
  left: 0;
  width: 595px;
  height: 842px;
  transform-origin: 0 0;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.page {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.page.dimmed {
  filter: blur(var(--blur));
}

.dim {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.25);
  animation: fade-in 0.3s ease-out;
}

.spot {
  box-shadow: none;
  animation: fade-in 0.3s ease-out;
}

.frame {
  position: absolute;
  box-sizing: content-box;
  border: solid #000000;
  animation: fade-in 0.3s ease-out;
}

.space {
  position: absolute;
  background-color: rgba(76, 175, 80, 0.45);
  outline: 1px solid rgba(244, 67, 54, 0.6);
}

.overflow {
  position: absolute;
  background: repeating-linear-gradient(-45deg, rgba(244, 67, 54, 0.55) 0 var(--line), rgba(244, 67, 54, 0.15) var(--line) calc(var(--line) * 2));
  outline: 1px solid var(--red);
}

.tint {
  position: absolute;
  background-color: rgba(244, 67, 54, 0.22);
  outline: solid rgba(244, 67, 54, 0.85);
  animation: fade-in 0.2s ease-out;
}

.point {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: var(--red);
}

.badge {
  position: absolute;
  padding: 6px 12px;
  border-radius: 8px;
  background-color: var(--red);
  color: #FFFFFF;
  font-size: 15px;
  line-height: 20px;
  white-space: nowrap;
  transform-origin: 0 0;
  animation: fade-in 0.2s ease-out;
}

.badge.stack {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 14px;
}

.ruler {
  position: absolute;
  animation: fade-in 0.2s ease-out;
}

.ruler.vertical {
  border-left: var(--line) solid var(--red);
  transform: translateX(calc(var(--line) / -2));
}

.ruler.horizontal {
  border-top: var(--line) solid var(--red);
  transform: translateY(calc(var(--line) / -2));
}

.ruler::before,
.ruler::after {
  content: "";
  position: absolute;
  background-color: var(--red);
}

.ruler.vertical::before,
.ruler.vertical::after {
  left: calc(var(--cap) / -2 - var(--line) / 2);
  width: var(--cap);
  height: var(--line);
}

.ruler.vertical::before { top: 0; }
.ruler.vertical::after { bottom: 0; }

.ruler.horizontal::before,
.ruler.horizontal::after {
  top: calc(var(--cap) / -2 - var(--line) / 2);
  width: var(--line);
  height: var(--cap);
}

.ruler.horizontal::before { left: 0; }
.ruler.horizontal::after { right: 0; }

.lens {
  position: absolute;
  overflow: hidden;
  border-radius: 16px;
  background-color: #FFFFFF;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.18), 0 12px 32px -8px rgba(0, 0, 0, 0.35);
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  animation: fade-in 0.2s ease-out;
}

.lens-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 595px;
  height: 842px;
  transform-origin: 0 0;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* runtime exception */

.exception {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 48px 56px 0;
  background-color: light-dark(#EFEEF5, #17181D);
  animation: fade-in 0.35s ease-out;
}

.exception-card {
  overflow: hidden;
  border-radius: 14px 14px 0 0;
  background-color: light-dark(#F8F7FE, #202228);
}

.exception-card header {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 18px;
  border-bottom: 1px solid light-dark(#C6C5CC, #3A3C44);
  background-color: light-dark(#FEDAD6, #4E2627);
  color: light-dark(#A1141C, #FFB4AB);
}

.exception-card header strong {
  font-size: 16px;
  font-weight: 600;
}

.exception-card p {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 44px;
  margin: 0;
  padding: 0 18px;
  border-bottom: 1px solid light-dark(#DDDCE3, #2E3037);
  color: var(--ink-2);
  font-size: 13px;
  white-space: nowrap;
}

.exception-card p b {
  font-weight: 400;
  color: var(--ink);
}

.exception-card p.hovered {
  background-color: light-dark(#ECEBF4, #2A2C33);
}

.exception-card .bone.strong {
  background-color: var(--bone-strong);
}

/* editor */

.editor {
  position: absolute;
  width: 430px;
  overflow: hidden;
  border-radius: 12px;
  background-color: light-dark(#FFFFFF, #1E1F24);
  box-shadow: 0 0 0 1px var(--popover-edge), 0 18px 40px -12px var(--shadow);
  animation: rise-in 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.editor header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 14px;
  border-bottom: 1px solid var(--edge);
  background-color: light-dark(#F4F4F8, #18191D);
  font-size: 13px;
}

.file {
  font-weight: 600;
}

.status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  color: var(--ink-2);
}

.status.done {
  color: light-dark(#2E7D32, #81C784);
}

.spin {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.code {
  padding: 8px 0;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
}

.code-line {
  position: relative;
  display: flex;
  align-items: center;
  height: var(--line);
  white-space: pre;
}

.code-line.marked {
  background-color: light-dark(rgba(33, 150, 243, 0.14), rgba(100, 181, 246, 0.16));
  animation: fade-in 0.4s ease-out;
}

.number {
  flex-shrink: 0;
  width: 40px;
  padding-right: 12px;
  text-align: right;
  color: var(--ink-3);
}

.swatch {
  position: absolute;
  left: 6px;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
}

.source {
  display: flex;
  align-items: center;
  margin-left: 12px;
}

.keyword { color: light-dark(#0033B3, #CF8E6D); }
.type { color: light-dark(#008080, #6FAFBD); }
.member { color: light-dark(#00627A, #57AAF7); }
.string { color: light-dark(#067D17, #6AAB73); }
.number { color: var(--ink-3); }
.source .number { color: light-dark(#1750EB, #2AACB8); }

.code .bar {
  display: inline-block;
  height: 8px;
  margin-right: 2px;
  border-radius: 4px;
  background-color: var(--bone);
}

.code .bar.type { background-color: light-dark(rgba(0, 121, 107, 0.45), rgba(128, 203, 196, 0.45)); }
.code .bar.keyword { background-color: light-dark(rgba(94, 53, 177, 0.45), rgba(179, 136, 255, 0.45)); }
.code .bar.member { background-color: var(--bone-strong); }
.code .bar.string { background-color: light-dark(rgba(46, 125, 50, 0.45), rgba(129, 199, 132, 0.45)); }

.gap {
  display: inline-block;
}

.code-line .selection {
  position: absolute;
  top: 2px;
  bottom: 2px;
  background-color: light-dark(rgba(33, 150, 243, 0.25), rgba(100, 181, 246, 0.3));
}

.code-line .caret {
  position: absolute;
  height: 15px;
  margin: 0;
}

/* settings */

.settings {
  position: absolute;
  top: 50px;
  right: 16px;
  width: 330px;
  padding: 20px;
  border-radius: 12px;
  background-color: var(--popover);
  box-shadow: 0 0 0 1px var(--popover-edge), 0 18px 40px -12px var(--shadow);
  animation: rise-in 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.settings h3,
.settings h4 {
  color: var(--ink);
}

.settings h3 {
  height: 28px;
  margin: 0 0 14px;
  font-size: 17px;
  line-height: 28px;
  font-weight: 600;
}

.settings h4 {
  height: 22px;
  margin: 0 0 10px;
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
}

.chips {
  display: flex;
  gap: 8px;
}

.chip {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 12px;
  border: 1px solid light-dark(#C9C8D0, #4A4C55);
  border-radius: 8px;
  font-size: 13px;
}

.chip.on {
  border-color: transparent;
  background-color: var(--selected);
}

.settings hr {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid var(--edge);
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.setting-row h4 {
  margin: 0;
}

.toggle {
  position: relative;
  width: 38px;
  height: 22px;
  border-radius: 11px;
  background-color: #475F90;
}

.toggle::after {
  content: "";
  position: absolute;
  top: 3px;
  right: 3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #FFFFFF;
}

.listening {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #4CAF50;
}

.listening i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #4CAF50;
}

.port {
  padding: 4px 12px;
  border: 1px solid light-dark(#C9C8D0, #4A4C55);
  border-radius: 8px;
}

/* recording cues: caption with key caps, cursor with click rings */

.caption {
  position: absolute;
  bottom: 18px;
  left: 50%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px 8px 16px;
  border-radius: 12px;
  background-color: rgba(20, 22, 28, 0.86);
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
  /* the shortcut cue stays readable when the window is scaled down on phones */
  transform: translateX(-50%) scale(max(1, calc(0.73 / var(--scale))));
  transform-origin: bottom center;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.14), 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}

.caption span {
  margin-right: 6px;
}

kbd {
  min-width: 28px;
  padding: 2px 8px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.14);
  box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.35);
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  transition: background-color 0.15s ease, transform 0.15s ease;
}

kbd.pressed {
  background-color: var(--vp-c-brand-1);
  transform: translateY(1px);
}

.cursor {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.cursor svg {
  display: block;
  margin: -1px 0 0 -1px;
  overflow: visible;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.3));
}

.cursor path {
  fill: #111111;
  stroke: #FFFFFF;
  stroke-width: 1.5;
  stroke-linejoin: round;
}

.ring {
  position: absolute;
  top: -18px;
  left: -18px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-brand-1);
  opacity: 0;
  animation: ring 0.5s ease-out;
}

@keyframes ring {
  from { opacity: 0.9; transform: scale(0.3); }
  to { opacity: 0; transform: scale(1); }
}

@keyframes fade-in {
  from { opacity: 0; }
}

@keyframes rise-in {
  from { opacity: 0; transform: translateY(10px) scale(0.98); }
}

</style>
