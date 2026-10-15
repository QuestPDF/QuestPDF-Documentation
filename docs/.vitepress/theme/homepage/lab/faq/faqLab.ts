/* Lab-only extras for the FAQ groups: an icon for the homepage icon tile and a one-line scope.
   The scopes are draft copy: they name the topics a group's questions cover and claim nothing. */

import type { FaqCategory } from "../../../pricing/faq";

export const groupIcons: Record<string, string> = {
  "Choosing Your License": "fa-signs-post",
  "Professional vs Enterprise": "fa-building",
  "Pricing & Renewals": "fa-arrows-rotate",
  "Deployment & Security": "fa-shield-check",
  "Client Work": "fa-handshake",
  "Purchasing & Legal Review": "fa-file-signature"
};

export const groupScopes: Record<string, string> = {
  "Choosing Your License": "Free use, growing past the limit, and evaluating before you buy.",
  "Professional vs Enterprise": "Developers covered, which tier fits, and subsidiaries.",
  "Pricing & Renewals": "What you keep, what renewal costs, cancelling, and refunds.",
  "Deployment & Security": "Servers, shipped products, build pipelines, telemetry, and audits.",
  "Client Work": "Agencies, contractors, and freelancers building for a client.",
  "Purchasing & Legal Review": "Invoices, tax numbers, resellers, and the legal terms."
};

export function groupAnchor(prefix: string, category: FaqCategory) {
  return prefix + "-" + category.title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
