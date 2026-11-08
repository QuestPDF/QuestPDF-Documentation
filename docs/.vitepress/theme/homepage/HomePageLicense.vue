<script setup lang="ts">
import {
  faCalendarCheck, faEnvelope, faHandHoldingHeart, faInfinity, faLayerGroup, faLockOpen,
  faTag, faUser
} from "@fortawesome/pro-regular-svg-icons";
import Icon from "../Icon.vue";
import { licensePrices } from "../pricing/prices";

const usd = (amount: number) => `$${amount.toLocaleString("en-US")}`;

const halves = [
  {
    kind: "free",
    lead: "",
    amount: "Free",
    per: "",
    points: [
      { icon: faUser, text: "For individuals and organisations under $1M annual revenue" },
      { icon: faHandHoldingHeart, text: "For open-source projects, charities and academia" },
      { icon: faLayerGroup, text: "All features, commercial use included" },
      { icon: faLockOpen, text: "No registration, license keys or watermarks" }
    ]
  },
  {
    kind: "paid",
    lead: "Starting from",
    amount: usd(licensePrices.professional),
    per: "/ year",
    points: [
      { icon: faTag, text: "One flat price per company, no seat counting" },
      { icon: faInfinity, text: "Perpetual license: keep every version received" },
      { icon: faEnvelope, text: "Direct and priority email support" },
      { icon: faCalendarCheck, text: "60-day evaluation period" }
    ]
  }
];
</script>

<template>
  <div class="panel license-panel">
    <h2 class="visually-hidden">Fair and Sustainable License</h2>

    <section v-for="half of halves" :key="half.kind" class="half" :class="half.kind">
      <h3 class="card-title">
        <a href="/pricing.html">
          <span v-if="half.lead">{{ `${half.lead} ` }}</span>
          <span class="amount">{{ half.amount }}<span v-if="half.per" class="per">{{ half.per }}</span></span>
        </a>
      </h3>

      <ul class="points">
        <li v-for="point of half.points" :key="point.text">
          <Icon :icon="point.icon" />
          <span>{{ point.text }}</span>
        </li>
      </ul>
    </section>

    <div class="footer">
      <p>Not sure which applies to you? See the <a href="/pricing.html#faq">licensing FAQ</a>.</p>
      <a class="action primary" href="/pricing.html">View Pricing</a>
    </div>
  </div>
</template>

<style scoped>

/* the halves carry the padding, like the Quick start cards, so the divider and the glows reach the panel's edges */
.license-panel {
  --pad-x: clamp(24px, 4.14vw - 4.95px, 48px);

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: 0;
  overflow: clip;
}

.half {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: var(--panel-padding);
}

.free {
  --tint: #2E7D32;
}

html.dark .free {
  --tint: #81C784;

  background-image:
      radial-gradient(ellipse 90% 55% at 0% 64px, color-mix(in srgb, #67B84D 10%, transparent), transparent),
      radial-gradient(ellipse 50% 30% at 0% 64px, color-mix(in srgb, #4CAF50 4%, transparent), transparent);
}

.paid {
  --tint: #0277BD;

  border-left: 1px solid var(--vp-c-divider);
}

html.dark .paid {
  --tint: #80C8FF;

  background-image:
      radial-gradient(ellipse 90% 55% at 0% 64px, color-mix(in srgb, #64B5F6 10%, transparent), transparent),
      radial-gradient(ellipse 50% 30% at 0% 64px, color-mix(in srgb, #29B6F6 4%, transparent), transparent);
}

.half .card-title {
  font-variant-numeric: tabular-nums;
}

html.dark .half .card-title {
  color: color-mix(in srgb, var(--tint) 60%, var(--vp-c-text-1));
}

.card-title a {
  color: inherit;
  border-radius: 4px;
}

.card-title a:hover {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
}

.card-title a:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}

.amount {
  white-space: nowrap;
}

.per {
  margin-left: 0.3em;
}

.points {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 20px;
}

.points li {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 6px 0;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.points .icon {
  flex-shrink: 0;
  width: 18px;
  margin-top: 0.25rem;
  font-size: 1rem;
  color: var(--tint);
}

.footer {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px 32px;
  padding: 24px var(--pad-x);
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.footer p a {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.footer p a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media screen and (max-width: 760px) {
  .license-panel {
    grid-template-columns: minmax(0, 1fr);
  }

  .paid {
    border-left: none;
    border-top: 1px solid var(--vp-c-divider);
  }
}

</style>
