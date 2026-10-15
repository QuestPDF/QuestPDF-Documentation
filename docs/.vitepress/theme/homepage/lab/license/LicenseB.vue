<script setup lang="ts">
/* B · Is it free for you? The section answers the question most visitors arrive with, in their words.
   Left, on the green half: who qualifies, what "free" includes, the exclusions and the first step
   (install). Right, the "otherwise" half: the two paid tiers and the three facts that lower the risk of
   buying. Green now means free, and the paid half carries the brand blue. */
import HomePageInstallCommand from "../../HomePageInstallCommand.vue";
import { communityExclusion, links, prices, revenueNote, usd } from "./licenseFacts";

const eligible = [
  "A person or company under $1M a year",
  "An OSI-licensed open-source project",
  "A charity or public-benefit body",
  "A non-profit school or university",
  "Learning or evaluating on your own",
  "Building for a client who qualifies"
];

const freeMeans = ["Commercial use", "No registration", "No license key", "No watermark", "No time limit"];

const paid = [
  {
    id: "professional",
    name: "Professional",
    price: usd(prices.professional),
    href: links.paid,
    description: "One company. Every developer, no seat counting."
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: usd(prices.enterprise),
    href: links.paid,
    description: "A group of affiliated companies, priority support, purchase orders."
  }
];

const reassurances = [
  { icon: "fa-flask", text: "60-day evaluation before you buy" },
  { icon: "fa-rotate-left", text: "30-day money-back guarantee" },
  { icon: "fa-box-archive", text: "Versions you receive stay yours" }
];
</script>

<template>
  <section class="content">
    <div class="panel lb-panel">
      <div class="lb-free">
        <div class="lb-glow" aria-hidden="true"></div>

        <h2 class="card-title">Is QuestPDF free for you?</h2>
        <p class="card-description">The Community License costs nothing if any of these describes you:</p>

        <ul class="lb-eligible">
          <li v-for="item of eligible" :key="item">
            <i class="fa-duotone fa-square-check" aria-hidden="true"></i>
            <span>{{ item }}</span>
          </li>
        </ul>

        <ul class="lb-means" aria-label="What free includes">
          <li v-for="item of freeMeans" :key="item">{{ item }}</li>
        </ul>

        <p class="lb-exclusion">{{ revenueNote }} {{ communityExclusion }}</p>

        <div class="lb-start">
          <HomePageInstallCommand />
          <a class="lb-link" :href="links.quickStart">Get started <i class="fa-regular fa-arrow-right" aria-hidden="true"></i></a>
        </div>
      </div>

      <div class="lb-paid">
        <div class="lb-label">Otherwise, one flat price per company</div>

        <div class="lb-tiers">
          <a v-for="tier of paid" :key="tier.id" :href="tier.href" class="lb-tier" :class="tier.id">
            <span class="lb-tier-head">
              <span class="lb-tier-name">{{ tier.name }}</span>
              <span class="lb-tier-price">{{ tier.price }}<span class="lb-tier-per"> / year</span></span>
            </span>
            <span class="lb-tier-description">{{ tier.description }}</span>
          </a>
        </div>

        <ul class="lb-reassurances">
          <li v-for="item of reassurances" :key="item.text">
            <i class="fa-regular" :class="item.icon" aria-hidden="true"></i>
            <span>{{ item.text }}</span>
          </li>
        </ul>

        <div class="lb-actions">
          <a class="action primary" :href="links.pricing">View Pricing</a>
          <a class="action" :href="links.guide">License Selection Guide</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
}

/* the panel has no padding of its own: each half brings its inset, so the green half can be tinted
   edge to edge */
.custom-page.home-page .panel.lb-panel {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  padding: 0;
  overflow: hidden;
}

.lb-free {
  position: relative;
  isolation: isolate;
  padding: 48px;
  --accent: #67B84D;
}

/* the green wash covers the free half only, strongest at its top-left corner */
.lb-glow {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
      radial-gradient(ellipse 100% 70% at 0% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent),
      linear-gradient(color-mix(in srgb, var(--accent) 3%, transparent), color-mix(in srgb, var(--accent) 3%, transparent));
}

html.dark .lb-glow {
  background-image:
      radial-gradient(ellipse 100% 70% at 0% 0%, color-mix(in srgb, var(--accent) 13%, transparent), transparent),
      linear-gradient(color-mix(in srgb, var(--accent) 3%, transparent), color-mix(in srgb, var(--accent) 3%, transparent));
}

.lb-eligible {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 32px;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}

.lb-eligible li {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 12px;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-1);
}

.lb-eligible i {
  width: 24px;
  --fa-primary-color: #67B84D;
  --fa-secondary-color: #67B84D;
}

html.dark .lb-eligible i {
  --fa-primary-color: #81C784;
  --fa-secondary-color: #81C784;
}

/* what free includes, as quiet outlined tags: they are facts, not buttons */
.lb-means {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}

.lb-means li {
  padding: 4px 12px;
  border: 1px solid color-mix(in srgb, #67B84D 45%, transparent);
  border-radius: 999px;
  font-size: 0.875rem;
  line-height: 1.375rem;
  font-weight: 500;
  color: #2E7D32;
}

html.dark .lb-means li {
  color: #A5D6A7;
}

.lb-exclusion {
  margin: 16px 0 0;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-3);
}

.lb-start {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 24px;
  margin-top: 32px;
}

.lb-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #2E7D32;
  text-decoration: none;
}

html.dark .lb-link {
  color: #A5D6A7;
}

.lb-link i {
  transition: translate 0.2s ease;
}

.lb-link:hover i {
  translate: 4px 0;
}

/* The paid half: a hairline separates it from the green half */

.lb-paid {
  display: flex;
  flex-direction: column;
  padding: 48px;
  border-left: 1px solid var(--vp-c-divider);
}

.lb-label {
  font-size: 0.75rem;
  line-height: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-1);
}

.lb-tiers {
  display: flex;
  flex-direction: column;
  margin-top: 12px;
}

.lb-tier {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 0;
  border-bottom: 1px solid var(--vp-c-divider);
  color: inherit;
  text-decoration: none;
}

.lb-tier-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
}

.lb-tier-name {
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.professional .lb-tier-name {
  color: #1E88E5;
}

html.dark .professional .lb-tier-name {
  color: #64B5F6;
}

.lb-tier-price {
  font-size: 1.25rem;
  line-height: 1.5rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.lb-tier-per {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
}

.lb-tier-description {
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.lb-tier:hover .lb-tier-description {
  color: var(--vp-c-text-1);
}

.lb-reassurances {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
}

.lb-reassurances li {
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: 12px;
  align-items: baseline;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.lb-reassurances i {
  color: var(--vp-c-text-3);
  text-align: center;
}

.lb-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

@media screen and (max-width: 1100px) {
  .custom-page.home-page .panel.lb-panel {
    grid-template-columns: minmax(0, 1fr);
  }

  .lb-paid {
    border-left: none;
    border-top: 1px solid var(--vp-c-divider);
  }
}

@media screen and (max-width: 700px) {
  .lb-free, .lb-paid {
    padding: 32px 24px;
  }

  .lb-eligible {
    grid-template-columns: minmax(0, 1fr);
  }
}

</style>
