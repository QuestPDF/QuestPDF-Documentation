<script setup lang="ts">
/* C · Pay for updates, keep every version. The one fact readers most often get wrong about the paid
   tiers ("$1,999 / year" next to "not a subscription") drawn as a timeline: two lanes, updates and
   support (paid, renewable) and the right to use in production (perpetual for every release received).
   The tiers follow as a strip of three hairline cells. Static: the drawing is the poster. */
import { links, prices, usd } from "./licenseFacts";

/* positions along the track, in percent */
const events = [
  { at: 0, name: "Buy", short: "Buy", detail: `${usd(prices.professional)} · 30-day money-back` },
  { at: 40, name: "Renew", short: "Renew", detail: "Locked price" },
  { at: 80, name: "Stop renewing", short: "Stop", detail: "Nothing is disabled" }
];

/* releases arriving during the paid years; each one drops into the lane below and is kept */
const releases = [9, 19, 30, 50, 61, 71];

const tiers = [
  { id: "community", name: "Community", price: "Free", per: "", href: links.community, description: "Every release, free while you qualify." },
  { id: "professional", name: "Professional", price: usd(prices.professional), per: "/ year", href: links.paid, description: "One company, every developer." },
  { id: "enterprise", name: "Enterprise", price: usd(prices.enterprise), per: "/ year", href: links.paid, description: "Affiliated companies, priority support, 12-month end-of-life notice." }
];
</script>

<template>
  <section class="content">
    <div class="panel lc-panel">
      <div class="lc-head">
        <div>
          <h2 class="card-title">Pay for updates. Keep every version.</h2>
          <p class="card-description">
            A paid license is perpetual: every release from your paid years stays yours to run in production,
            even if you stop renewing. Renewing keeps updates and support coming, at a locked price.
          </p>
        </div>
        <div class="lc-actions">
          <a class="action primary" :href="links.pricing">View Pricing</a>
          <a class="action" :href="links.guide">License Selection Guide</a>
        </div>
      </div>

      <figure class="lc-figure" aria-label="Timeline of a paid license: updates while you renew, the right to use every received release forever">
        <div class="lc-grid">
          <!-- event markers above the track -->
          <div class="lc-events">
            <div v-for="event of events" :key="event.name" class="lc-event" :style="{ left: event.at + '%' }">
              <span class="lc-event-name"><span class="lc-long">{{ event.name }}</span><span class="lc-short">{{ event.short }}</span></span>
              <span class="lc-event-detail">{{ event.detail }}</span>
            </div>
          </div>

          <span class="lc-lane-label lc-lane-label-1">Updates and support</span>
          <div class="lc-track lc-track-1">
            <span v-for="event of events" :key="event.name" class="lc-guide" :style="{ left: event.at + '%' }"></span>
            <span class="lc-bar lc-bar-updates"></span>
            <span class="lc-bar-paused">paused</span>
            <span v-for="at of releases" :key="at" class="lc-release" :style="{ left: at + '%' }"></span>
          </div>

          <span class="lc-lane-label lc-lane-label-2">Use in production<span class="lc-lane-sub">on the terms each release shipped with</span></span>
          <div class="lc-track lc-track-2">
            <span v-for="event of events" :key="event.name" class="lc-guide" :style="{ left: event.at + '%' }"></span>
            <span class="lc-bar lc-bar-use"></span>
            <span v-for="at of releases" :key="at" class="lc-kept" :style="{ left: at + '%' }"></span>
            <span class="lc-forever">Yours for good</span>
          </div>

          <div class="lc-axis">
            <span style="left: 20%">Year one</span>
            <span style="left: 60%">Year two</span>
            <span style="left: 90%">Afterwards</span>
          </div>
        </div>

        <!-- phones: the event details move under the drawing -->
        <ol class="lc-events-list">
          <li v-for="event of events" :key="event.name"><strong>{{ event.name }}</strong> {{ event.detail }}</li>
        </ol>
      </figure>

      <div class="lc-tiers">
        <a v-for="tier of tiers" :key="tier.id" :href="tier.href" class="lc-tier" :class="tier.id">
          <span class="lc-tier-name">{{ tier.name }}</span>
          <span class="lc-tier-price">{{ tier.price }}<span v-if="tier.per" class="lc-tier-per"> {{ tier.per }}</span></span>
          <span class="lc-tier-description">{{ tier.description }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
}

.lc-panel {
  display: flex;
  flex-direction: column;
  gap: 40px;
  --use: #43A047;
  --updates: #1E88E5;
}

html.dark .lc-panel {
  --use: #66BB6A;
  --updates: #42A5F5;
}

.lc-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px 48px;
}

.lc-head .card-description {
  max-width: 760px;
}

.lc-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  flex-shrink: 0;
}

/* The drawing sits on an inset surface, like the chips and the code window's body */

.lc-figure {
  margin: 0;
  padding: 32px 40px 24px;
  border-radius: 20px;
  background-color: var(--home-surface-inner);
}

.lc-grid {
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  grid-template-rows: auto 44px 44px auto;
  column-gap: 24px;
  row-gap: 14px;
  align-items: center;
}

.lc-events {
  grid-column: 2;
  grid-row: 1;
  position: relative;
  height: 48px;
}

.lc-event {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  padding-left: 12px;
  border-left: 2px solid var(--vp-c-text-1);
  white-space: nowrap;
}

.lc-event-name {
  font-size: 0.9375rem;
  line-height: 1.375rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.lc-event-detail {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-2);
}

.lc-lane-label {
  grid-column: 1;
  font-size: 0.75rem;
  line-height: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-1);
}

.lc-lane-sub {
  display: block;
  margin-top: 2px;
  font-size: 0.8125rem;
  line-height: 1.125rem;
  font-weight: 400;
  letter-spacing: 0;
  text-transform: none;
  color: var(--vp-c-text-2);
}

.lc-lane-label-1 { grid-row: 2; }
.lc-lane-label-2 { grid-row: 3; }

.lc-track {
  grid-column: 2;
  position: relative;
  height: 44px;
}

.lc-track-1 { grid-row: 2; }
.lc-track-2 { grid-row: 3; }

/* dashed verticals under each event, through both lanes */
.lc-guide {
  position: absolute;
  top: -14px;
  bottom: -14px;
  width: 0;
  border-left: 1px dashed color-mix(in srgb, var(--vp-c-text-1) 22%, transparent);
}

.lc-bar {
  position: absolute;
  top: 50%;
  height: 12px;
  translate: 0 -50%;
  border-radius: 6px;
}

.lc-bar-updates {
  left: 0;
  width: 80%;
  background-color: var(--updates);
}

.lc-bar-paused {
  position: absolute;
  left: 80%;
  right: 0;
  top: 50%;
  translate: 0 -50%;
  padding-left: 12px;
  border-top: 2px dashed color-mix(in srgb, var(--vp-c-text-1) 22%, transparent);
  font-size: 0;
}

/* the use bar runs to the edge and past it: an arrowhead says it does not end */
.lc-bar-use {
  left: 0;
  right: 10px;
  background-color: var(--use);
  border-radius: 6px 0 0 6px;
}

.lc-bar-use::after {
  content: "";
  position: absolute;
  right: -12px;
  top: 50%;
  translate: 0 -50%;
  border-style: solid;
  border-width: 11px 0 11px 13px;
  border-color: transparent transparent transparent var(--use);
}

/* releases: white dots on the updates bar, each with a dotted drop into the use lane */
.lc-release {
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  translate: -50% -50%;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 0 2px var(--updates);
}

.lc-release::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 12px;
  height: 46px;
  border-left: 2px dotted color-mix(in srgb, var(--vp-c-text-1) 35%, transparent);
  translate: -1px 0;
}

.lc-kept {
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  translate: -50% -50%;
  border-radius: 3px;
  background-color: white;
  box-shadow: 0 0 0 2px var(--use);
}

.lc-forever {
  position: absolute;
  right: 28px;
  bottom: calc(50% + 12px);
  font-size: 0.8125rem;
  line-height: 1.125rem;
  font-weight: 600;
  color: var(--use);
  white-space: nowrap;
}

.lc-axis {
  grid-column: 2;
  grid-row: 4;
  position: relative;
  height: 20px;
}

.lc-axis span {
  position: absolute;
  translate: -50% 0;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}

.lc-events-list,
.lc-short {
  display: none;
}

/* Tiers: three hairline cells, each a link to its licence */

.lc-tiers {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: -8px 0 -8px;
}

.lc-tier {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 32px;
  border-left: 1px solid var(--vp-c-divider);
  color: inherit;
  text-decoration: none;
}

.lc-tier:first-child {
  padding-left: 0;
  border-left: none;
}

.lc-tier-name {
  font-size: 0.75rem;
  line-height: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-1);
}

.community .lc-tier-name { color: #2E7D32; }
.professional .lc-tier-name { color: #1E88E5; }
html.dark .community .lc-tier-name { color: #A5D6A7; }
html.dark .professional .lc-tier-name { color: #64B5F6; }

.lc-tier-price {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
}

.lc-tier-per {
  margin-left: 4px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
}

.lc-tier-description {
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.lc-tier:hover .lc-tier-description {
  color: var(--vp-c-text-1);
}

@media screen and (max-width: 1100px) {
  .lc-head {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media screen and (max-width: 900px) {
  .lc-grid {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto auto 32px auto 32px auto;
    row-gap: 8px;
  }

  .lc-events { grid-column: 1; grid-row: 1; height: 26px; }
  .lc-lane-label-1 { grid-row: 2; }
  .lc-track-1 { grid-column: 1; grid-row: 3; height: 32px; }
  .lc-lane-label-2 { grid-row: 4; margin-top: 8px; }
  .lc-track-2 { grid-column: 1; grid-row: 5; height: 32px; }
  .lc-axis { grid-column: 1; grid-row: 6; }

  .lc-event-detail { display: none; }
  .lc-long { display: none; }
  .lc-short { display: inline; }
  .lc-release::after { display: none; }
  .lc-forever { display: none; }
  .lc-guide { top: -8px; bottom: -8px; }

  .lc-events-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin: 20px 0 0;
    padding-left: 20px;
    font-size: 1rem;
    line-height: 1.5rem;
    color: var(--vp-c-text-2);
  }

  .lc-events-list strong {
    color: var(--vp-c-text-1);
    margin-right: 4px;
  }

  .lc-tiers {
    grid-template-columns: minmax(0, 1fr);
    margin: 0;
  }

  .lc-tier,
  .lc-tier:first-child {
    padding: 16px 0;
    border-left: none;
    border-top: 1px solid var(--vp-c-divider);
  }
}

@media screen and (max-width: 700px) {
  .lc-figure {
    padding: 24px 20px 20px;
  }

  .lc-event {
    padding-left: 6px;
  }

  .lc-event-name {
    font-size: 0.8125rem;
  }

  /* the last event label would run off the track's right edge */
  .lc-event:last-child {
    translate: -100% 0;
    padding-left: 0;
    padding-right: 6px;
    border-left: none;
    border-right: 2px solid var(--vp-c-text-1);
    margin-left: 2px;
  }
}

</style>
