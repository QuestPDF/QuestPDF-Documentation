<script setup lang="ts">
import { computed, ref } from "vue";
import { features } from "./features";
import { useInView, useLoop } from "./labAnimation";
import LabPanel from "./LabPanel.vue";

/* 02 Self-assembling page: a blank sheet next to the tags. The tags light up in order and each one
   adds its own piece to the sheet: a header band, text lines, an image, a table, a chart, a QR code,
   a page number... then the operations take over: a second document merges in, a page is pulled out,
   a stamp lands, a paperclip and a lock appear. After the last tag the finished document rests for a
   moment and the sheet clears to start again. */

const stage = ref<HTMLElement>();
const { animate } = useInView(stage);

/* step 0: blank sheet; step k: the first k tags have been applied; the last few steps hold the result */
const HOLD_STEPS = 3;
const step = ref(0);
const resetting = ref(false);

useLoop(animate, 640, () => {
  if (step.value < features.length + HOLD_STEPS) {
    step.value++;
    return;
  }

  /* clear without transitions, so the sheet snaps back to blank */
  resetting.value = true;
  step.value = 0;
  setTimeout(() => resetting.value = false, 60);
});

const current = computed(() => step.value - 1);
const done = (index: number) => step.value > index;

/* the indexes of the tags in the shared list, by label, so the sheet does not depend on the order */
const by = (label: string) => features.findIndex(feature => feature.label === label);
const has = (label: string) => done(by(label));
</script>

<template>
  <lab-panel>
    <div ref="stage" class="builder" :class="{ resetting }">
      <div class="chips">
        <span
            v-for="(feature, index) of features"
            :key="feature.label"
            class="chip"
            :class="{ lit: current === index, used: done(index) && current !== index }">
          <i class="fa-regular" :class="[feature.icon]" />
          {{ feature.label }}
        </span>
      </div>

      <div class="desk">
        <!-- documents behind the sheet: one from a page break, one merged in, one of them taken out again -->
        <div class="sheet behind second" :class="{ shown: has('Page breaks') }" />
        <div class="sheet behind third" :class="{ shown: has('Merging'), extracted: has('Page extraction') }" />

        <div class="sheet front" :class="{ locked: has('Encryption') }">
          <div class="band" :class="{ shown: has('Styling') }" />

          <div class="title ink" :class="{ shown: has('Text') }" />

          <div class="lines" :class="{ shown: has('Text'), columns: has('Multi-column') }">
            <div class="ink" />
            <div class="ink" :class="{ link: has('Hyperlinks') }" />
            <div class="ink" />
            <div class="ink short" />
          </div>

          <div class="media">
            <div class="picture" :class="{ shown: has('Images') }">
              <i class="fa-regular fa-image" />
            </div>
            <div class="vector" :class="{ shown: has('SVG') }">
              <svg viewBox="0 0 40 40">
                <path d="M4 32 C 12 4, 28 4, 36 32" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                <circle cx="4" cy="32" r="3" fill="currentColor" />
                <circle cx="36" cy="32" r="3" fill="currentColor" />
              </svg>
            </div>
          </div>

          <div class="table" :class="{ shown: has('Tables') }">
            <div v-for="cell in 12" :key="cell" class="cell" />
          </div>

          <div class="list" :class="{ shown: has('Lists') }">
            <div v-for="item in 3" :key="item" class="item">
              <span class="bullet" />
              <span class="ink" />
            </div>
          </div>

          <div class="bottom">
            <div class="chart" :class="{ shown: has('Charts') }">
              <span v-for="(height, index) in [40, 70, 55, 90, 65]" :key="index" :style="{ height: height + '%' }" />
            </div>
            <div class="qr" :class="{ shown: has('Barcodes') }" />
            <div class="map" :class="{ shown: has('Maps') }">
              <i class="fa-solid fa-location-dot" />
            </div>
          </div>

          <div class="footer" :class="{ shown: has('Page numbers') }">1 / 2</div>

          <div class="stamp" :class="{ shown: has('Overlays') }">DRAFT</div>
        </div>

        <!-- document-level properties as badges beside the sheet -->
        <div class="badges">
          <span class="badge" :class="{ shown: has('Accessibility') }"><i class="fa-regular fa-universal-access" /></span>
          <span class="badge" :class="{ shown: has('Attachments') }"><i class="fa-regular fa-paperclip" /></span>
          <span class="badge" :class="{ shown: has('Encryption') }"><i class="fa-regular fa-lock" /></span>
          <span class="badge" :class="{ shown: has('Metadata') }"><i class="fa-regular fa-tags" /></span>
        </div>
      </div>
    </div>
  </lab-panel>
</template>

<style scoped>

.builder {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  column-gap: 40px;
  align-items: center;
}

.builder .chips {
  justify-content: flex-end;
}

/* the sheet takes a third of the stage, so the tags are one size smaller here, four to a row */
.builder .chip {
  gap: 8px;
  padding: 8px 12px;
  font-size: 0.875rem;
}

.builder .chip i {
  font-size: 14px;
}

/* tags already applied stay faintly marked */
.chip.used {
  color: var(--vp-c-brand-1);
}

.chip.used i {
  color: var(--vp-c-brand-1);
}


/* The desk: the sheet with room for the documents behind it and the badges beside it */

.desk {
  position: relative;
  width: 236px;
  height: 283px;
  padding-right: 36px;
}

.sheet {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 283px;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
}

.behind {
  opacity: 0;
}

.second {
  transform: translate(6px, -6px) rotate(1.5deg);
}

.third {
  transform: translate(60px, -30px) rotate(10deg);
}

.behind.shown {
  opacity: 1;
}

.third.shown {
  transform: translate(12px, -12px) rotate(3deg);
}

.third.extracted {
  transform: translate(90px, -70px) rotate(18deg);
  opacity: 0;
}

.front {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  overflow: hidden;
  z-index: 1;
}

/* every piece of content fades and settles into place */
.front > *,
.front .picture,
.front .vector,
.front .chart,
.front .qr,
.front .map {
  opacity: 0;
  transform: translateY(5px);
  transition: opacity 0.4s ease, transform 0.4s ease, filter 0.4s ease;
}

.front > *.shown,
.front .shown {
  opacity: 1;
  transform: none;
}

.front .media,
.front .bottom {
  opacity: 1;
  transform: none;
}

/* encryption dims the content under a lock */
.front.locked > *:not(.stamp) {
  opacity: 0.45;
  filter: blur(0.6px);
}

.resetting .sheet,
.resetting .sheet *,
.resetting .badge,
.resetting .chip {
  transition: none !important;
}

.band {
  height: 14px;
  margin: -12px -12px 0;
  background: linear-gradient(100deg, #00c6ff, #2979ff);
}

.title {
  width: 60%;
  height: 8px;
  background-color: color-mix(in srgb, var(--vp-c-text-1) 55%, transparent);
}

.lines {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 4px;
}

.lines .ink {
  height: 4px;
}

.lines .short {
  width: 60%;
}

.lines.columns {
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
}

.lines.columns .short {
  width: 80%;
}

.lines .link {
  background-color: var(--vp-c-brand-1);
  box-shadow: 0 1.5px 0 0 var(--vp-c-brand-1);
}

.media {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  height: 44px;
}

.picture {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background: linear-gradient(135deg, #B3E5FC, #81D4FA 60%, #4FC3F7);
  color: #0277BD;
  font-size: 16px;
}

.vector {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: 1px dashed color-mix(in srgb, var(--vp-c-text-1) 30%, transparent);
  color: #7E57C2;
}

.vector svg {
  width: 30px;
  height: 30px;
}

.table {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background-color: color-mix(in srgb, var(--vp-c-text-1) 30%, transparent);
  border: 1px solid color-mix(in srgb, var(--vp-c-text-1) 30%, transparent);
  border-radius: 2px;
  overflow: hidden;
}

.table .cell {
  height: 9px;
  background-color: var(--sheet, white);
}

.table .cell:nth-child(-n + 3) {
  background-color: color-mix(in srgb, var(--vp-c-brand-2) 25%, var(--sheet, white));
}

html.dark .table .cell {
  --sheet: #22262c;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.list .item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.list .bullet {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: color-mix(in srgb, var(--vp-c-text-1) 55%, transparent);
}

.list .ink {
  height: 4px;
  width: 50%;
}

.list .item:nth-child(2) .ink {
  width: 70%;
}

.bottom {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1.2fr;
  gap: 8px;
  height: 40px;
}

.chart {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  padding: 2px 2px 0;
  border-bottom: 1px solid color-mix(in srgb, var(--vp-c-text-1) 40%, transparent);
}

.chart span {
  flex: 1;
  border-radius: 1px 1px 0 0;
  background: linear-gradient(180deg, #42A5F5, #1E88E5);
}

.qr {
  border-radius: 2px;
  background-color: color-mix(in srgb, var(--vp-c-text-1) 85%, transparent);
  --cell: 4px;
  background-image:
      linear-gradient(90deg, var(--sheet, white) 50%, transparent 50%),
      linear-gradient(0deg, var(--sheet, white) 50%, transparent 50%);
  background-size: calc(var(--cell) * 2) calc(var(--cell) * 2);
  background-blend-mode: multiply;
  box-shadow: inset 0 0 0 3px white;
}

html.dark .qr {
  --sheet: #22262c;
  box-shadow: inset 0 0 0 3px #22262c;
}

.map {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background:
      radial-gradient(circle at 20% 30%, #A5D6A7 0 10px, transparent 11px),
      radial-gradient(circle at 80% 70%, #81D4FA 0 12px, transparent 13px),
      linear-gradient(#E8F5E9, #E3F2FD);
  color: #E53935;
  font-size: 14px;
}

.map i {
  color: #E53935;
}

.footer {
  margin-top: auto;
  text-align: center;
  font-size: 7px;
  line-height: 1;
  color: var(--vp-c-text-3);
}

.stamp {
  position: absolute;
  top: 45%;
  left: 50%;
  padding: 3px 10px;
  border: 3px solid #E53935;
  border-radius: 4px;
  color: #E53935;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 0.15em;
  line-height: 1;
  opacity: 0;
  transform: translate(-50%, -50%) rotate(-18deg) scale(1.8);
  transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.stamp.shown {
  opacity: 0.85;
  transform: translate(-50%, -50%) rotate(-18deg) scale(1);
}

/* badges beside the sheet, each sliding in from under it */
.badges {
  position: absolute;
  top: 12px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 2;
}

.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 4px 10px -4px rgba(0, 0, 0, 0.2);
  color: var(--vp-c-brand-1);
  font-size: 13px;
  opacity: 0;
  transform: translateX(-16px) scale(0.6);
  transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.badge.shown {
  opacity: 1;
  transform: none;
}

@media screen and (max-width: 1280px) {
  .builder .chips {
    justify-content: flex-start;
  }
}

@media screen and (max-width: 760px) {
  .builder {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 32px;
    justify-items: center;
  }
}

</style>
