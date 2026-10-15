/* Facts shared by the licence lab directions. Prices mirror PricingTiers.vue; every other claim comes
   from the pricing FAQ (PricingFaq.vue) or the License Selection Guide, and the lab page lists the
   source of each. Lab only: delete with the folder once a direction ships. */

export const prices = {
  professional: 1999,
  enterprise: 4999
};

export function usd(amount: number): string {
  return "$" + amount.toLocaleString("en-US");
}

export const links = {
  pricing: "/pricing.html",
  guide: "/license/guide.html",
  documents: "/license/",
  community: "/license/community.html",
  paid: "/license/professional-enterprise.html",
  quickStart: "/quick-start.html",
  security: "/security-policy"
};

/* the one place the Community exclusions are worded, so no direction widens the rule */
export const communityExclusion = "Public-sector bodies (schools and universities excepted) and publicly traded companies need a paid license at any revenue.";

/* the $1M line is measured on consolidated revenue (License Selection Guide, small businesses) */
export const revenueNote = "Revenue counts across your whole group.";
