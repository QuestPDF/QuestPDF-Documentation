<script setup lang="ts">

const categories = [
  {
    "title": "Pricing & Renewals",
    "items": [
      {
        "question": "I bought my license before July 2026 — does the new pricing affect my renewal?",
        "answer": "No. Your renewal continues at the price you already pay: under the current license terms, that price is your <a href='/license/professional-enterprise.html'>Locked Renewal Price</a> and will not increase for as long as you renew continuously. You also automatically benefit from the new terms — any developer-count limit from your original purchase no longer applies, and your license now covers unlimited developers."
      },
      {
        "question": "What is my renewal price? Can it ever go up?",
        "answer": "No — not while you renew continuously. Your renewal is contractually locked at the price of your preceding term (your <a href='/license/professional-enterprise.html'>Locked Renewal Price</a>), and we will not increase it for as long as you keep renewing. If coverage lapses for more than 30 days after your term ends, the lock ends: a later purchase happens at then-current pricing, which becomes your new locked price. We may change packaging prospectively with at least 90 days' notice, but continuously renewing customers migrated to a successor offering will never pay more than their locked price. Fees added by resellers or other intermediaries are outside our control and not covered by the lock, and pricing in a signed Order Form controls for its stated period."
      },
      {
        "question": "Is this a subscription?",
        "answer": "Not in the usual sense. Your purchase is a perpetual license to every version released during your paid term, together with 12 months of updates and support. The key point for planning: if you choose not to renew, you retain the right to use those versions permanently, and nothing is disabled or stops working. Renewal simply continues the flow of new releases and keeps your support active. You receive the predictability of a perpetual license, with the option to stay current for as long as it is useful to you."
      },
      {
        "question": "What happens if we don't renew?",
        "answer": "You keep the software permanently. Your license to every version made available during your paid term is perpetual: it does not expire, it covers production use, and it survives non-renewal, so you may continue running those versions indefinitely. What pauses is access to new releases and support. Any version published after your term ends, along with fixes and email support, requires a new 12-month update and support term whenever you choose to renew. Nothing is disabled and nothing expires; the library performs no license checks and makes no calls back to us."
      },
      {
        "question": "Does the license renew automatically, and how do we cancel?",
        "answer": "It depends on how you purchased. Licenses bought through our website renew automatically every 12 months at your Locked Renewal Price — the price of your preceding term — unless you cancel before the term ends. You can cancel using the link in your purchase and renewal emails, through the Customer Portal, or by emailing contact@questpdf.com. Licenses bought under a signed Order Form or by direct invoice do not renew automatically; each new term is placed as a separate order. In either case, cancelling stops only future renewals and never affects your right to keep using the versions you already hold."
      },
    ]
  },
  {
    "title": "License Model & Eligibility",
    "items": [
      {
        "question": "Where can I find the exact license terms?",
        "answer": "Every legal document is public on this website, written in plain language, and ready to share with your legal or procurement team. The <a href='/license/professional-enterprise.html'>Professional / Enterprise License</a> is the full agreement for paid tiers, covering the license grant, renewals, support, and warranties. The <a href='/license/community.html'>Community License</a> contains the complete terms of the free tier, including its eligibility rules. If you are unsure which license applies to your organisation, the <a href='/license/guide.html'>License Selection Guide</a> walks you through the decision step by step. Purchases made through this website are additionally governed by the <a href='/terms-of-service.html'>Terms of Service</a>."
      },
      {
        "question": "Is QuestPDF open source?",
        "answer": "Not in the strict sense, and we want to be clear about the distinction. QuestPDF is source-available: the complete source code is published for you to read, audit, and debug against, but your right to use it comes from one of our commercial licenses rather than from an open-source license. That includes the free Community License, which is a commercial license with eligibility rules; the MIT License does not govern your use of the library. Open source in the OSI sense would allow anyone to use, modify, and redistribute the code without conditions. Our licenses are intentionally narrower, which is what allows us to fund full-time development and provide long-term support."
      },
      {
        "question": "Can we try QuestPDF before buying?",
        "answer": "Yes. Every organisation may evaluate QuestPDF free of charge for up to 60 days, which is ample time for internal testing, technical review, and proof-of-concept work. Evaluation covers everything except going live: it does not include production deployment, processing real business data, or distributing the library to third parties. At the end of the 60 days, you either qualify for the free Community License or purchase a paid one. Individuals using QuestPDF purely to learn remain covered by the Community License indefinitely, regardless of revenue."
      },
      {
        "question": "Are non-profits, universities, and open-source projects free?",
        "answer": "Yes. The Community License is free for non-profit and charitable organisations recognised under applicable law, for academic institutions using QuestPDF in teaching or research, and for open-source projects distributed under an OSI-approved license. None of these categories depends on revenue; if your organisation fits one of them, it is covered at no charge."
      },
      {
        "question": "We never call QuestPDF directly; it ships inside another library we use. Do we need a license?",
        "answer": "In most cases, no. If your own code never references or calls QuestPDF APIs, and you use it only through another library or product that depends on QuestPDF internally, you are covered by the free <a href='/license/guide.html'>Community License</a> regardless of revenue — provided the intervening library offers substantial functionality of its own rather than being a thin wrapper around QuestPDF's PDF generation. One point to confirm first: government bodies, public-sector entities, and publicly traded companies fall outside the Community License as a category. If that describes your organisation, please contact us at contact@questpdf.com before relying on this, and we will help you identify the appropriate license."
      },
    ]
  },
  {
    "title": "Agencies, Freelancers & Client Work",
    "items": [
      {
        "question": "We're an agency building software for a client — whose license is it?",
        "answer": "The client's. The required license is determined by the entity that ultimately owns, controls, commercially uses, or receives the primary business benefit from the application, which on agency work is normally the client rather than the agency. The client's situation sets the tier: their revenue and status determine Community eligibility, and every paid license covers unlimited developers — Enterprise exists for covering multiple affiliated companies and procurement needs, never for headcount. Everyone who writes, modifies, compiles, or reviews QuestPDF integration code on the project — including automated test code, and including your own developers — is covered by the client's license. You may purchase on the client's behalf; the entity named in the purchase record becomes the licensee."
      },
      {
        "question": "I'm a freelancer or independent developer. Is QuestPDF free for me, including client work?",
        "answer": "It depends on whose product it is. Your own projects, including commercial ones, are free as long as your annual gross revenue from all sources remains under USD 1,000,000. Client work follows the client, because licensing tracks the entity that ultimately owns and benefits from the application: a client who qualifies for the Community License pays nothing, while a client who does not requires their own paid license, with you counted among their developers. Each client is assessed independently, so a freelancer working with several clients may operate under several different licenses at the same time, one per client. This is expected and fully supported by the licensing model."
      },
    ]
  },
  {
    "title": "Deployment & Distribution",
    "items": [
      {
        "question": "Can we use QuestPDF in a SaaS or web app?",
        "answer": "Yes. You may deploy applications that use QuestPDF in any environment, including development, staging, and production, and including server-side, cloud, and SaaS deployments. There is no per-server, per-instance, or per-document fee; your cost depends only on your eligibility and license tier — never on usage volume or developer count. Because a live service constitutes production use, it requires either Community eligibility or an active paid license rather than the 60-day evaluation."
      },
      {
        "question": "Can we ship QuestPDF inside our product? Are there royalties?",
        "answer": "Yes, and there are no royalties. Every license tier allows you to redistribute QuestPDF as a compiled component of your own applications, royalty-free, across any number of customers and applications. The single restriction concerns form: QuestPDF must ship embedded inside your application, not as a standalone library for others to build against. Your customers pay us nothing and need no license of their own simply to run what you have built."
      },
      {
        "question": "Do our customers or end users need their own licenses?",
        "answer": "No. People who use your application never need a QuestPDF license to do so. The line is crossed only when developers write code directly against QuestPDF: anyone whose code references or calls QuestPDF APIs requires license coverage, while anyone who merely uses a product with QuestPDF embedded internally is covered at no charge as a transitive user. Shipping your finished application is fully permitted; effectively providing customers a PDF development kit to build against is what would require a separate license."
      },
      {
        "question": "Does the QuestPDF library send any data back to you — telemetry, license checks, anything?",
        "answer": "No. The library runs entirely within your own environment: it makes no network calls back to us, collects no telemetry, performs no license checks against our servers, and never transmits your application data or your end users' data. As a result, we never receive, store, or access the documents and data your systems handle. If your security team requires vendor or architecture information for a review, contact us at contact@questpdf.com and we will provide the available information."
      },
    ]
  },
  {
    "title": "Purchasing & Procurement",
    "items": [
      {
        "question": "Can we pay by invoice or purchase order?",
        "answer": "Invoicing is supported, and you are welcome to run the purchase through your procurement process. Licenses can be bought under a signed Order Form or by direct invoice, and those purchases do not renew automatically. One point to note: standard terms pre-printed on a purchase order, vendor portal, or procurement workflow do not apply to us unless we expressly accept them in a signed agreement, so that both parties operate from the same clearly agreed terms. To arrange an Order Form or discuss your process, contact us at contact@questpdf.com."
      },
      {
        "question": "We're a reseller buying for a client — who becomes the licensee, and what should we get right?",
        "answer": "The client. Unless a signed Order Form states otherwise, the license is granted to the end customer named in the order, quote, invoice, or license confirmation document, not to the reseller processing the transaction. Two details matter most: enter the client's legal entity accurately, since that record defines who holds the license; and ensure payment is completed, because a license confirmation is valid only while the fees are paid and have not been refunded, reversed, charged back, or cancelled. If anything is unclear during the process, we are glad to assist at contact@questpdf.com."
      },
    ]
  },
];

</script>

<template>
  <article class="content">
    <div class="section-header">
      <h2>Frequently Asked Questions</h2>
      <p class="sub-header">Straight answers about licensing, renewals, and compliance.</p>
    </div>

    <div class="faq-categories">
      <section v-for="category of categories" :key="category.title" class="faq-category">
        <h3 class="faq-category-title">{{ category.title }}</h3>

        <div class="faq-list">
          <details v-for="item of category.items" :key="item.question" class="faq-item">
            <summary class="faq-question">
              <span>{{ item.question }}</span>
              <i class="fa-solid fa-chevron-down faq-chevron"></i>
            </summary>
            <p class="faq-answer" v-html="item.answer"></p>
          </details>
        </div>
      </section>
    </div>
  </article>
</template>

<style scoped>

.faq-categories {
  display: flex;
  flex-direction: column;
  gap: 40px;

  align-self: center;
  width: 100%;
  max-width: 1000px;
  margin: 40px auto 0;
}

.faq-category-title {
  margin: 0 0 14px;
  padding-left: 32px;

  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #2196F3;
}

.faq-list {
  display: flex;
  flex-direction: column;
  width: 100%;

  border: 1px solid #8882;
  border-radius: 16px;
  background-color: var(--vp-c-bg);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.faq-item {
  padding: 0;
}

.faq-item:hover {
  background-color: #2196F311;
}

.faq-item:not(:last-child) {
  border-bottom: 1px solid var(--vp-c-divider);
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  padding: 24px 24px 24px 32px;
  cursor: pointer;
  list-style: none;

  font-size: 1rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.faq-chevron {
  flex-shrink: 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  transition: transform 0.2s ease;
}

.faq-item[open] .faq-chevron {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 32px 24px 32px;
  margin: 0;
  max-width: 85ch;
}

.faq-answer :deep(a) {
  color: var(--vp-c-brand-1);
}

.faq-answer :deep(a:hover) {
  text-decoration: underline;
}

@media screen and (max-width: 700px) {
  .faq-category-title {
    padding-left: 20px;
  }

  .faq-question {
    padding: 20px;
    font-size: 1rem;
  }

  .faq-answer {
    padding: 0 20px 20px 20px;
  }
}

</style>
