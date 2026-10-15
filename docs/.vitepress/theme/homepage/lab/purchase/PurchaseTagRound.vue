<script setup lang="ts">
/* Round 2 · the "Order completed" tag's style, on top of the shipped header (C · Quiet title). Every
   variant keeps the enlarged size that shipped (8px 22px, 0.9375rem, 18px check) so only the treatment
   changes. Each sits above the shipped title line twice: on a light and on a dark stage. The stages set
   their own colours, so both modes show at once whatever the page theme is. Text on a solid fill stays
   on #2E7D32 or darker (white on it is 5.1:1; on #43A047 only 3.3:1). */
import { inboxLead, inboxShort } from "./purchase";

interface TagVariant {
  id: string;
  name: string;
  note: string;
  /* how the check is drawn: plain icon, inside a solid disc, or as its own solid segment */
  check?: "icon" | "disc" | "segment";
}

const variants: TagVariant[] = [
  {
    id: "0",
    name: "Today (tint, at the new size)",
    note: "On the page in this branch: the 14% green tint with green text, one step bigger. The tag and the inbox phrase share one green, so the tag stays a label and the inbox line is the loudest thing in the header."
  },
  {
    id: "A",
    name: "Solid",
    note: "Today's tag filled with the deep green (#2E7D32) and white text (5.1:1). It reads as a status, like a \"Paid\" stamp. It is now the loudest thing in the header, ahead of the green \"Please check your inbox\", the step the buyer has to take. It holds up in dark mode too (the fill is 3.4:1 against the page), though it reads darker than the light-green inbox phrase there."
  },
  {
    id: "B",
    name: "Solid pill, sentence case",
    note: "Fully rounded, \"Order completed\" in sentence case at 16px: the shape of a status badge on a pull request or a payment. Friendlier than uppercase. It changes the case and the radius, so it no longer matches the section tags on the other pages."
  },
  {
    id: "C",
    name: "Solid with depth",
    note: "A, with a faint gradient (#2E7D32 to #1B5E20), a 1px inner highlight and a soft green shadow, so the tag sits on the page as an object. It has the weight of a button, and people may try to click it."
  },
  {
    id: "D",
    name: "Solid, tuned per mode",
    note: "Deep green with white text in light mode. In dark mode the light green (#A5D6A7), the inbox phrase's own green, with near-black green text (7.7:1). For when the deep fill feels heavy in dark mode: the tag matches the inbox phrase there, at the cost of white text."
  },
  {
    id: "E",
    name: "Check disc on the tint",
    check: "disc",
    note: "Today's tint and text, with the check in a solid green disc. One solid point instead of a solid block: the tag gets a clear \"done\" mark, and the inbox phrase stays the loudest green in the header."
  },
  {
    id: "F",
    name: "Split",
    check: "segment",
    note: "A solid green segment holding the check, joined to a tinted label: half A, half today. The hard edge between the halves makes it the most designed tag in the set."
  },
  {
    id: "G",
    name: "Outline",
    note: "No fill: a 1.5px green border and green text. Lighter than today, and it reads as a secondary label. Shown for range rather than as a candidate."
  },
  {
    id: "H",
    name: "Neutral chip, green disc",
    check: "disc",
    note: "A white chip (a raised one in dark mode) with a hairline border, text in the body colour, and the green disc with the check. The green shrinks to the disc, so the inbox phrase is the only green text in the header."
  }
];

const modes = ["light", "dark"] as const;
</script>

<template>
  <!-- Round 2, rendered first on the lab page; `?only=tag` shows only this round -->
  <div class="container tag-round" id="purchase-tag">
    <div class="content">
      <h2 class="lab-round tag-round-title">Round 2 · The tag's style</h2>
      <p class="lab-lead">
        The "Order completed" tag over the shipped header, in light and dark. Every tag is the same size (the
        bigger one now on the page in this branch), so only the fill, shape and colour change. Round 1 (the header, C shipped) is
        further down.
      </p>

      <div class="lab-note lab-recommendation">
        <h3>Recommendation</h3>
        <p class="lab-para">
          <strong>For solid with white text: A · Solid</strong>, or <strong>B</strong> if sentence case and a pill
          are welcome. It works in both modes; in dark mode it reads darker than the light-green inbox phrase, and if
          that feels heavy, <strong>D</strong> swaps the dark fill for the inbox phrase's own green.
          <strong>If the inbox line should keep the lead: E · Check disc on the tint.</strong> It adds one solid
          "done" mark and leaves the rest as it is. The real decision: a solid tag becomes the loudest thing
          in the header, ahead of "Please check your inbox", the only thing the buyer has to do next.
        </p>
      </div>

      <div v-for="v of variants" :key="v.id" class="tag-row">
        <div class="tag-row-head">
          <span class="tag-letter">{{ v.id }}</span>
          <h3 class="tag-row-name">{{ v.name }}</h3>
        </div>
        <p class="tag-row-note">{{ v.note }}</p>

        <div class="tag-stages">
          <div v-for="mode of modes" :key="mode" class="tag-stage" :class="`stage-${mode}`">
            <span class="stage-mode">{{ mode }}</span>

            <div class="tv" :class="`tv-${v.id.toLowerCase()}`">
              <span v-if="v.check === 'disc' || v.check === 'segment'" class="tv-mark" aria-hidden="true">
                <i class="fa-solid fa-check"></i>
              </span>
              <i v-else class="fa-regular fa-check" aria-hidden="true"></i>
              <span class="tv-label">Order completed</span>
            </div>

            <div class="tag-title">Thank you! <b>{{ inboxLead }}</b> <span>{{ inboxShort }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.tag-round .content {
  align-items: stretch;
}

.tag-round-title {
  margin-top: 0;
}

.tag-row {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px dashed color-mix(in srgb, var(--vp-c-text-1) 30%, transparent);
}

.tag-row-head {
  display: flex;
  align-items: center;
  gap: 14px;
}

.tag-letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  font-family: var(--vp-font-family-mono);
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--vp-c-bg);
  background-color: var(--vp-c-text-1);
}

.tag-row-name {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.tag-row-note {
  max-width: 920px;
  margin: 10px 0 16px;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}


/* Stages: each sets the colours it needs, so the light and the dark stage render side by side
   whatever the page theme is. Values are VitePress's own light and dark tokens and the page canvas. */

.tag-stages {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.tag-stage {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 32px 40px;
  border-radius: 20px;
  text-align: center;
  background-color: var(--st-bg);
  background-image: radial-gradient(ellipse 70% 90% at 50% 0%, var(--st-wash), transparent 70%);
  box-shadow: inset 0 0 0 1px var(--st-border);
}

.stage-light {
  --st-bg: #FAFAFC;
  --st-wash: color-mix(in srgb, #1E88E5 9%, transparent);
  --st-border: rgba(0, 0, 0, 0.07);
  --st-text-1: rgba(60, 60, 67);
  --st-text-2: rgba(60, 60, 67, 0.78);
  --st-surface: #FFFFFF;
  --st-hairline: rgba(0, 0, 0, 0.1);
  --g-text: #2E7D32;
  --g-tint: color-mix(in srgb, #43A047 14%, transparent);
  --g-mark-bg: #2E7D32;
  --g-mark-fg: #FFFFFF;
}

.stage-dark {
  --st-bg: #1B1B1F;
  --st-wash: color-mix(in srgb, #1E88E5 12%, transparent);
  --st-border: rgba(255, 255, 255, 0.08);
  --st-text-1: rgba(255, 255, 245, 0.86);
  --st-text-2: rgba(235, 235, 245, 0.6);
  --st-surface: rgba(255, 255, 255, 0.07);
  --st-hairline: rgba(255, 255, 255, 0.12);
  --g-text: #A5D6A7;
  --g-tint: color-mix(in srgb, #43A047 14%, transparent);
  --g-mark-bg: #A5D6A7;
  --g-mark-fg: #0D3B12;
}

.stage-mode {
  position: absolute;
  top: 12px;
  left: 16px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--st-text-2);
  opacity: 0.7;
}

/* the shipped title line (C · Quiet title), at its real size */
.tag-title {
  font-size: 1.5rem;
  line-height: 2.125rem;
  font-weight: 600;
  color: var(--st-text-1);
  text-wrap: balance;
}

.tag-title b {
  font-weight: 600;
  color: var(--g-text);
}

.tag-title span {
  font-weight: 400;
  color: var(--st-text-2);
}


/* Tags: the shipped size, shared by every variant */

.tv {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 8px 22px;
  border-radius: 14px;
  font-size: 0.9375rem;
  line-height: 1.5rem;
  font-weight: 600;
  word-spacing: 2px;
  text-transform: uppercase;
}

.tv > i {
  font-size: 18px;
}

.tv-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: var(--g-mark-bg);
  color: var(--g-mark-fg);
}

/* inherit the mark's colour: custom pages paint every .fa-solid icon brand blue */
.tv-mark i {
  font-size: 12px;
  color: inherit;
}

/* 0 · today */
.tv-0 {
  background-color: var(--g-tint);
  color: var(--g-text);
}

/* A · solid */
.tv-a {
  background-color: #2E7D32;
  color: #FFFFFF;
}

/* B · solid pill, sentence case */
.tv-b {
  padding: 8px 22px 8px 18px;
  border-radius: 999px;
  font-size: 1rem;
  word-spacing: normal;
  text-transform: none;
  background-color: #2E7D32;
  color: #FFFFFF;
}

/* C · solid with depth: kept faint, a top highlight and a soft shadow */
.tv-c {
  background-image: linear-gradient(180deg, #2E7D32, #1B5E20);
  color: #FFFFFF;
  box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.16),
      0 6px 16px -8px rgba(27, 94, 32, 0.6);
}

/* D · solid, tuned per mode */
.stage-light .tv-d {
  background-color: #2E7D32;
  color: #FFFFFF;
}

.stage-dark .tv-d {
  background-color: #A5D6A7;
  color: #0D3B12;
}

/* E · check disc on the tint */
.tv-e {
  padding-left: 10px;
  background-color: var(--g-tint);
  color: var(--g-text);
}

.tv-e .tv-mark,
.tv-h .tv-mark {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

/* F · split: a solid check segment joined to a tinted label */
.tv-f {
  gap: 0;
  padding: 0;
  overflow: hidden;
  background-color: var(--g-tint);
  color: var(--g-text);
}

.tv-f .tv-mark {
  align-self: stretch;
  padding: 0 13px;
}

.tv-f .tv-mark i {
  font-size: 15px;
}

.tv-f .tv-label {
  padding: 8px 20px 8px 14px;
}

/* G · outline */
.tv-g {
  color: var(--g-text);
  box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--g-text) 70%, transparent);
}

/* H · neutral chip with the green disc */
.tv-h {
  padding-left: 10px;
  background-color: var(--st-surface);
  color: var(--st-text-1);
  box-shadow:
      inset 0 0 0 1px var(--st-hairline),
      0 1px 2px rgba(0, 0, 0, 0.04);
}

@media screen and (max-width: 960px) {
  .tag-stages {
    grid-template-columns: minmax(0, 1fr);
  }
}

</style>
