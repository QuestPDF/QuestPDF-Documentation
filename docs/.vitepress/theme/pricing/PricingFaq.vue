<script setup lang="ts">

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

const categories: FaqCategory[] = [
  {
    title: "Choosing Your License",
    items: [
      {
        question: "Who qualifies for the free Community License?",
        answer: "The Community License is free for individuals and organisations with annual gross revenue under USD 1,000,000 — with no registration, watermarks, license keys, or time limits. It is also free, regardless of revenue, for qualifying charitable organisations, public or non-profit academic institutions, and open-source projects distributed under an OSI-approved license.\n\nTwo categories are not eligible for the Community License and require a paid license: government and public-sector organisations, except qualifying public academic institutions, and publicly traded companies. The exact eligibility rules are described in the <a href='/license/guide.html'>License Selection Guide</a>."
      },
      {
        question: "What happens if our revenue crosses USD 1,000,000?",
        answer: "You receive a 90-day transition period, starting at the end of the fiscal year in which your revenue exceeded USD 1,000,000. During that period, you either purchase the appropriate paid license or stop using QuestPDF.\n\nNothing applies retroactively: there are no back-payments, penalties, or fees for the period when you qualified for the Community License."
      },
      {
        question: "Are government and public-sector organisations eligible for the Community License?",
        answer: "No. Government agencies and public-sector organisations require a paid license, regardless of revenue or non-profit status.\n\nThe main exception is education: public schools, universities, and similar academic institutions may qualify under the academic category when they use QuestPDF for teaching, research, or their own administration.\n\nPublic-sector purchasing is fully supported, including purchase orders, resellers, direct invoicing, and formal procurement workflows. Contact us at contact@questpdf.com and we will help make the process straightforward."
      },
      {
        question: "Can we evaluate QuestPDF before buying?",
        answer: "Yes. If you qualify for the Community License, you can use QuestPDF for free without an evaluation time limit.\n\nOrganisations that do not qualify may evaluate QuestPDF for up to 60 days for internal testing, technical review, and proof-of-concept work. Production deployment requires either Community eligibility or a paid license."
      },
      {
        question: "We use another library that depends on QuestPDF. Do we need a license?",
        answer: "Usually not. If your own code does not directly reference or call QuestPDF APIs, and QuestPDF is only used internally by another library or product, you are generally covered as a transitive user.\n\nThis assumes the other library provides substantial functionality of its own and is not merely a thin wrapper around QuestPDF. Government, public-sector, and publicly traded organisations are outside the Community License as categories, so they should contact us at contact@questpdf.com to confirm the correct license."
      },
      {
        question: "Will the Community License stay free?",
        answer: "Yes. The free Community License is a permanent part of the QuestPDF model. Paid licenses fund full-time development so the free tier can remain available.\n\nThere is also an important legal protection: the license version distributed with a specific QuestPDF release governs that release permanently. Terms for versions you already use cannot change retroactively; any future license change could only apply to future releases."
      }
    ]
  },
  {
    title: "Professional vs Enterprise",
    items: [
      {
        question: "How many developers does a paid license cover?",
        answer: "Unlimited. Every paid QuestPDF license covers an unlimited number of developers, with no seat-counting and no per-developer fees.\n\nThe same license may be used across your development, testing, staging, CI/CD, and production environments. Your cost does not increase with team size, server count, deployment count, or document volume."
      },
      {
        question: "Which tier do we need — Professional or Enterprise?",
        answer: "Professional is the right choice for most companies. It covers one legal entity, unlimited developers, unlimited projects, unlimited applications, and unlimited deployments.\n\nProfessional includes the same QuestPDF features as Enterprise. You do not need Enterprise because of team size, number of applications, number of servers, or document volume."
      },
      {
        question: "When should we choose Enterprise?",
        answer: "Choose Enterprise when you need one license to cover multiple affiliated legal entities, or when your organisation requires enterprise purchasing and continuity terms.\n\nEnterprise covers affiliates connected by more than 50% ownership or control. It also adds a next-business-day first-response target for support, priority handling of business-critical issues, stronger continuity commitments, and procurement options such as Order Forms, purchase orders, direct invoicing, supplier onboarding, and multi-year terms."
      },
      {
        question: "Does one Professional License cover subsidiaries or sister companies?",
        answer: "No. A Professional License covers one legal entity only.\n\nIf several related companies need to use QuestPDF, each entity can buy its own Professional License, or one entity can buy an Enterprise License that covers the whole affiliated group. This is the main structural difference between Professional and Enterprise."
      }
    ]
  },
  {
    title: "Pricing & Renewals",
    items: [
      {
        question: "Is this a subscription or a perpetual license?",
        answer: "It is a perpetual license with an annually renewable updates and support term.\n\nWhen you buy a paid license, you receive the permanent right to use every QuestPDF version released during your paid term. The first 12 months of updates and support are included. Renewing keeps new releases and support active, but the versions you already received remain yours to use permanently."
      },
      {
        question: "What happens if we do not renew?",
        answer: "You keep the software permanently. Your license to every QuestPDF version released during your paid term does not expire, continues to cover production use, and survives non-renewal.\n\nOnly access to new releases and ongoing support pauses. Nothing is disabled, no license key expires, and the library does not call back to our servers."
      },
      {
        question: "What does renewal cost, and can the price increase?",
        answer: "Your renewal price is your <a href='/license/professional-enterprise.html'>Locked Renewal Price</a>: the price paid for your current term. There is no separate renewal surcharge.\n\nIf you buy at the price shown on this page and keep renewing continuously, that price becomes your renewal price for future terms, and we will not increase it for as long as you keep renewing.\n\nA renewal completed within 30 days after the previous term ends still counts as continuous. If the license lapses for more than 30 days, the price lock ends, and a later purchase is made at then-current pricing. Reseller fees or markups are outside our control and are not covered by the price lock."
      },
      {
        question: "Does the license renew automatically, and how do we cancel?",
        answer: "Licenses purchased through the website renew automatically every 12 months unless cancelled. You can cancel through the Customer Portal, using the link in your purchase or renewal emails, or by contacting us at contact@questpdf.com.\n\nLicenses purchased under a signed Order Form or direct invoice do not renew automatically; each new term is handled as a separate order. Cancelling renewal never affects your perpetual right to use versions you already received."
      },
      {
        question: "I bought before the pricing change. Does the new pricing affect my renewal?",
        answer: "No. Existing customers keep their current renewal price for as long as they renew continuously.\n\nYou also benefit from the updated license model: any previous developer-count limit no longer applies, and your paid license now covers unlimited developers under the licensed legal entity or, for Enterprise, the licensed affiliated group."
      },
      {
        question: "Is there a money-back guarantee?",
        answer: "Yes. Paid licenses include a 30-day satisfaction guarantee. If QuestPDF is not a good fit, contact us within 30 days after purchase for a full refund.\n\nA refund closes the corresponding license, so it works like returning a product: money back, license rights ended. After the 30-day period, fees are non-refundable except where required by law."
      }
    ]
  },
  {
    title: "Deployment & Security",
    items: [
      {
        question: "Can we use QuestPDF in a SaaS, cloud, or web application?",
        answer: "Yes. QuestPDF can be used in server-side, cloud, SaaS, on-premises, desktop, and internal business applications.\n\nThere are no per-server, per-instance, per-customer, or per-document fees. Production use requires either Community License eligibility or a paid license."
      },
      {
        question: "Can we ship QuestPDF inside our own product?",
        answer: "Yes. Every license tier allows you to redistribute QuestPDF as a compiled component of your own application, royalty-free.\n\nYour customers and end users do not need their own QuestPDF licenses just to run the software you built. The key restriction is that QuestPDF must be embedded inside your application, not offered as a standalone PDF-generation library or API for others to build against."
      },
      {
        question: "Do we need extra licenses for CI/CD, build servers, staging, or testing?",
        answer: "No. Paid licenses cover your development workflow, including CI/CD pipelines, build servers, automated tests, development machines, staging environments, and production deployments.\n\nQuestPDF is licensed by eligibility and legal-entity scope, not by machines, environments, users, servers, or build agents."
      },
      {
        question: "Does QuestPDF collect telemetry or perform online license checks?",
        answer: "No. The QuestPDF library runs entirely inside your application process. It makes no network calls to us, collects no telemetry, performs no online activation, and does not transmit your documents, customer data, or application data.\n\nThere are no license keys, activation servers, or remote checks that could disable your application."
      },
      {
        question: "Will we be audited?",
        answer: "No routine audits. QuestPDF licensing is based on good-faith self-certification.\n\nThe library contains no technical enforcement mechanism. If we ever have a concrete reason to believe a license is being used outside its scope, we may ask an authorised representative for written confirmation of compliance, with reasonable notice. We do not want developers to fear license enforcement while evaluating or using the product."
      }
    ]
  },
  {
    title: "Client Work",
    items: [
      {
        question: "We are building software for a client. Whose license covers the project?",
        answer: "Usually the client's. The required license is determined by the entity that ultimately owns, controls, commercially uses, or receives the primary business benefit from the application.\n\nIf the client qualifies for the Community License, no paid license is needed. If the client does not qualify, the client needs a paid Professional or Enterprise License. Agency developers, contractors, and freelancers working on that client's QuestPDF integration are covered by the client's license."
      },
      {
        question: "I am a freelancer. Is QuestPDF free for my client work?",
        answer: "It depends on the client. Your own projects are free while your annual gross revenue remains under USD 1,000,000.\n\nClient projects follow the client's eligibility, because the client normally owns and benefits from the application. A client who qualifies for the Community License can use QuestPDF for free. A client who does not qualify needs their own paid license, even if you are the developer implementing the integration."
      }
    ]
  },
  {
    title: "Purchasing & Legal Review",
    items: [
      {
        question: "Can we pay by invoice or purchase order?",
        answer: "Yes. Professional and Enterprise licenses can be purchased by card, invoice, purchase order, direct invoice, reseller, or signed Order Form, depending on your procurement needs.\n\nWebsite purchases are usually fastest. For formal procurement, supplier onboarding, custom Order Forms, or multi-year terms, contact us at contact@questpdf.com."
      },
      {
        question: "Why does Paddle appear at checkout and on the invoice?",
        answer: "Paddle is our Merchant of Record for website purchases. Paddle processes the payment, issues the invoice, calculates and remits applicable taxes, and handles payment-related administration.\n\nQuestPDF grants the license, provides the software, and delivers product support. Your license terms are still the QuestPDF license terms, even when Paddle appears as the seller or billing entity on the invoice."
      },
      {
        question: "How do we get an invoice issued to our company with a VAT or tax number?",
        answer: "Enter your company details and VAT or tax number during checkout. Paddle then issues a tax-compliant invoice with those details.\n\nFor eligible B2B transactions, such as EU cross-border purchases with a valid VAT number, reverse charge may apply and VAT may not be added at checkout. Where reverse charge does not apply, Paddle adds the tax required for your jurisdiction. If an invoice needs correction after purchase, contact us and we will help coordinate it."
      },
      {
        question: "We are a reseller buying for a client. Who becomes the licensee?",
        answer: "The end customer. Unless a signed Order Form says otherwise, the license is granted to the client named in the order, quote, invoice, or license confirmation document, not to the reseller processing the purchase.\n\nPlease enter the client's legal entity accurately, because that record defines who holds the license. License rights depend on the transaction remaining valid; if the purchase is refunded, reversed, charged back, cancelled, or unpaid, the corresponding license rights end. If anything is unclear during procurement, contact us and we will help make the order correct."
      },
      {
        question: "Is QuestPDF open source?",
        answer: "QuestPDF is source-available commercial software. The complete source code is public on GitHub, so you can inspect, audit, debug, and understand the library.\n\nHowever, your right to use QuestPDF comes from one of our licenses, including the free Community License, not from an OSI-approved open-source license such as MIT. This model lets us keep the source visible while funding full-time development and long-term support."
      },
      {
        question: "Is QuestPDF safe to depend on long-term?",
        answer: "Yes. The license model is designed to reduce long-term operational risk.\n\nPaid licenses are perpetual for versions released during your paid term. The library has no license server, no telemetry, no activation, and no remote shutdown mechanism. The source code is publicly available for review and debugging. Enterprise customers also receive stronger continuity commitments, including advance notice before any general discontinuation of the paid product."
      },
      {
        question: "Where can we find the exact legal terms?",
        answer: "All current legal documents are public at <a href='/license/'>questpdf.com/license</a>.\n\nThe <a href='/license/professional-enterprise.html'>Professional / Enterprise License</a> contains the full paid license terms. The <a href='/license/community.html'>Community License</a> governs free use. The <a href='/license/guide.html'>License Selection Guide</a> explains eligibility. Website purchases are also subject to the <a href='/terms-of-service.html'>Terms of Service</a>.\n\nThis FAQ is a practical summary. If this FAQ and a license document ever differ, the license document controls."
      }
    ]
  }
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
  --faq-accent: #2196F3;

  display: flex;
  flex-direction: column;
  gap: 40px;

  align-self: center;
  width: 100%;
  max-width: 850px;
  margin: 40px auto 0;
}

.faq-category-title {
  margin: 0 0 14px;
  padding-left: 32px;
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
  /* transparent shadow so the accent bar can fade in via transition */
  box-shadow: inset 0 0 0 transparent;
  transition: box-shadow 0.2s ease, background-color 0.2s ease;
}

.faq-item:not(:last-child) {
  border-bottom: 1px solid var(--vp-c-divider);
}

.faq-item:hover,
.faq-item[open] {
  background-color: #2196F308;
}

.faq-item[open] {
  box-shadow: inset 4px 0 0 var(--faq-accent);
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
  transition: color 0.2s ease;
}

.faq-item[open] .faq-question {
  color: var(--faq-accent);
  font-weight: 600;
}

.faq-chevron {
  flex-shrink: 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  transition: transform 0.2s ease;
}

.faq-item[open] .faq-chevron {
  color: var(--faq-accent);
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 32px 24px 32px;
  margin: 0;
  max-width: 85ch;
  color: var(--vp-c-text-1);
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
  }

  .faq-answer {
    padding: 0 20px 20px 20px;
  }
}

</style>
