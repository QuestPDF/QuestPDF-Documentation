<script setup lang="ts">
/* E · No seats, no meters. The value of a flat licence told in the product's own medium: a QuestPDF
   style invoice on a plate, one line for the licence and a $0.00 line for everything other vendors
   meter (developers, servers, deployments, documents, end users, royalties). Three buttons above the
   page switch the tier; the rest state is Professional, the tier most companies need. Every $0 line is
   a fact from the pricing FAQ. */
import { computed, ref } from "vue";
import { communityExclusion, links, prices, revenueNote, usd } from "./licenseFacts";

type TierId = "community" | "professional" | "enterprise";

const tiers: { id: TierId; name: string; price: string }[] = [
  { id: "community", name: "Community", price: "Free" },
  { id: "professional", name: "Professional", price: usd(prices.professional) },
  { id: "enterprise", name: "Enterprise", price: usd(prices.enterprise) }
];

const selected = ref<TierId>("professional");

const metered = [
  { item: "Developers", quantity: "Unlimited" },
  { item: "Servers, containers and CI agents", quantity: "Unlimited" },
  { item: "Applications and deployments", quantity: "Unlimited" },
  { item: "Documents generated", quantity: "Unlimited" },
  { item: "Your customers and end users", quantity: "Unlimited" },
  { item: "Royalties on redistribution", quantity: "None" }
];

function money(amount: number) {
  return "$" + amount.toLocaleString("en-US", { minimumFractionDigits: 2 });
}

const invoice = computed(() => {
  switch (selected.value) {
    case "community":
      return {
        title: "Community License",
        license: { item: "Community License", detail: "Every release, while you qualify", amount: 0 },
        extra: null,
        total: 0,
        footer: "No registration, no license key, no watermark."
      };
    case "enterprise":
      return {
        title: "Enterprise License",
        license: { item: "Enterprise License, 12 months", detail: "Updates, next-business-day priority support", amount: prices.enterprise },
        extra: { item: "Affiliated companies in your group", quantity: "All" },
        total: prices.enterprise,
        footer: "Plus local tax. Versions you receive stay yours. 30-day money-back guarantee."
      };
    default:
      return {
        title: "Professional License",
        license: { item: "Professional License, 12 months", detail: "Updates and direct email support", amount: prices.professional },
        extra: null,
        total: prices.professional,
        footer: "Plus local tax. Versions you receive stay yours. 30-day money-back guarantee."
      };
  }
});
</script>

<template>
  <section class="content">
    <div class="panel le-panel">
      <div class="le-text">
        <h2 class="card-title">No seats. No meters. One flat price.</h2>
        <p class="card-description">
          Free for individuals, open source and companies under $1M a year. Above that, one price covers the
          whole company, however many developers, servers or documents it has.
        </p>

        <ul class="le-points">
          <li><i class="fa-regular fa-box-archive" aria-hidden="true"></i><span>Versions you receive stay yours, even if you stop renewing</span></li>
          <li><i class="fa-regular fa-key-skeleton" aria-hidden="true"></i><span>No license keys, no activation, no telemetry</span></li>
          <li><i class="fa-regular fa-code" aria-hidden="true"></i><span>Every feature in every tier, source on GitHub</span></li>
        </ul>

        <p class="le-exclusion">{{ revenueNote }} {{ communityExclusion }}</p>

        <div class="le-actions">
          <a class="action primary" :href="links.pricing">View Pricing</a>
          <a class="action" :href="links.guide">License Selection Guide</a>
        </div>
      </div>

      <figure class="le-figure">
        <div class="le-switch" role="group" aria-label="Show the invoice for a tier">
          <button
              v-for="tier of tiers"
              :key="tier.id"
              type="button"
              class="le-switch-button"
              :class="[tier.id, { active: selected === tier.id }]"
              :aria-pressed="selected === tier.id"
              @click="selected = tier.id">
            <span class="le-switch-name">{{ tier.name }}</span>
            <span class="le-switch-price">{{ tier.price }}</span>
          </button>
        </div>

        <!-- the page: drawn like the invoice the tutorial builds, in the light theme in both modes -->
        <div class="le-paper" :class="selected">
          <div class="le-paper-head">
            <div>
              <div class="le-paper-title">{{ invoice.title }}</div>
              <div class="le-paper-subtitle">What a year costs, line by line</div>
            </div>
            <div class="le-paper-logo">QuestPDF</div>
          </div>

          <table class="le-table">
            <thead>
              <tr><th>Item</th><th>Quantity</th><th>Price</th></tr>
            </thead>
            <tbody>
              <tr class="le-license">
                <td>
                  {{ invoice.license.item }}
                  <span class="le-detail">{{ invoice.license.detail }}</span>
                </td>
                <td>1</td>
                <td>{{ money(invoice.license.amount) }}</td>
              </tr>
              <tr v-if="invoice.extra">
                <td>{{ invoice.extra.item }}</td>
                <td>{{ invoice.extra.quantity }}</td>
                <td>$0.00</td>
              </tr>
              <tr v-for="line of metered" :key="line.item">
                <td>{{ line.item }}</td>
                <td>{{ line.quantity }}</td>
                <td>$0.00</td>
              </tr>
            </tbody>
          </table>

          <div class="le-total">
            <span>Total</span>
            <span>{{ money(invoice.total) }}</span>
          </div>

          <div class="le-paper-footer">{{ invoice.footer }}</div>
        </div>

        <figcaption class="le-caption">An illustration of the price list, not a quote. Website purchases are invoiced by Paddle.</figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
}

.le-panel {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
  gap: 56px;
  align-items: center;
}

.le-text {
  display: flex;
  flex-direction: column;
}

.le-points {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}

.le-points li {
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: 12px;
  align-items: baseline;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-1);
}

.le-points i {
  color: var(--vp-c-text-3);
  text-align: center;
}

.le-exclusion {
  margin: 20px 0 0;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-3);
}

.le-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

/* The figure: tier buttons over a plate that holds the page */

.le-figure {
  margin: 0;
  padding: 20px 32px 16px;
  border-radius: 24px;
  background-color: var(--home-surface-inner);
}

.le-switch {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
  margin-bottom: 16px;
}

.le-switch-button {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 14px;
  border: 1px solid transparent;
  border-radius: 12px;
  background: none;
  color: var(--vp-c-text-2);
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.le-switch-button:hover {
  color: var(--vp-c-text-1);
}

.le-switch-button.active {
  border-color: var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.le-switch-button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.le-switch-name {
  font-size: 0.75rem;
  line-height: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.le-switch-button.active.community .le-switch-name { color: #2E7D32; }
.le-switch-button.active.professional .le-switch-name { color: #1E88E5; }
html.dark .le-switch-button.active.community .le-switch-name { color: #A5D6A7; }
html.dark .le-switch-button.active.professional .le-switch-name { color: #64B5F6; }

.le-switch-price {
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

/* The page keeps its paper colours in both themes; in dark mode it is dimmed like the homepage's
   other document images */
.le-paper {
  padding: 28px 32px 24px;
  border-radius: 6px;
  background-color: #FFFFFF;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06), 0 8px 24px -8px rgba(0, 0, 0, 0.14);
  color: #424242;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  --paper-accent: #1E88E5;
}

.le-paper.community { --paper-accent: #43A047; }
.le-paper.enterprise { --paper-accent: #212121; }

html.dark .le-paper {
  filter: brightness(0.88);
}

.le-paper-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.le-paper-title {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: var(--paper-accent);
}

.le-paper-subtitle {
  color: #757575;
}

.le-paper-logo {
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #9E9E9E;
}

.le-table {
  display: table;
  width: 100%;
  margin: 0;
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
}

.le-table tr {
  background: none;
  border: none;
}

.le-table th,
.le-table td {
  padding: 6px 0;
  border: none;
  border-bottom: 1px solid #EEEEEE;
  background: none;
  text-align: left;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  color: #424242;
}

.le-table th {
  padding-top: 0;
  border-bottom: 1px solid #424242;
  font-weight: 600;
  color: #212121;
}

.le-table th:nth-child(2), .le-table td:nth-child(2) { width: 90px; }
.le-table th:nth-child(3), .le-table td:nth-child(3) { width: 90px; text-align: right; }

.le-license td {
  font-weight: 600;
  color: #212121;
}

.le-detail {
  display: block;
  font-weight: 400;
  color: #757575;
}

.le-total {
  display: flex;
  justify-content: flex-end;
  gap: 24px;
  margin-top: 12px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: #212121;
}

.le-paper-footer {
  margin-top: 16px;
  padding-top: 10px;
  border-top: 1px solid #EEEEEE;
  color: #757575;
}

.le-caption {
  margin-top: 12px;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-3);
  text-align: center;
}

@media screen and (max-width: 1100px) {
  .le-panel {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
  }
}

@media screen and (max-width: 700px) {
  .le-figure {
    padding: 12px 12px 12px;
    margin: 0 -8px;
  }

  .le-switch-button {
    padding: 6px 8px;
  }

  .le-switch-name {
    font-size: 0.6875rem;
    letter-spacing: 0.02em;
  }

  .le-paper {
    padding: 20px 16px 16px;
  }

  .le-paper-logo {
    display: none;
  }

  .le-table th:nth-child(2), .le-table td:nth-child(2) { width: 72px; }
  .le-table th:nth-child(3), .le-table td:nth-child(3) { width: 64px; }
}

</style>
