<template>
  <!-- Lab page, not linked from anywhere: five directions for the homepage licence section
       (HomePageLicense.vue). The audit, the readers, the fact inventory, the benchmark, the brainstorm
       and the recommendation come first; then the trust section that sits right above the licence
       section, today's section (0) and the directions A-E. `?only=<id>` (0, a-e) shows the context
       and one direction. Delete this folder and docs/license-lab.md once a direction ships. -->
  <div class="custom-page home-page textured-page license-lab">
    <div v-if="!only" class="container">
      <section class="content lab-intro">
        <h1>License section lab</h1>
        <p class="lab-lead">
          The licence section is the last thing on the homepage and the first place a buyer checks whether the
          library is safe to depend on. Today it explains the model well but answers the reader's questions late,
          contradicts itself once and states the free tier more widely than the licence does. Below: what is wrong
          and why, who reads it, what we can claim, what other vendors do, thirteen ideas and five built directions.
        </p>
        <p class="lab-jump">
          <a v-for="id of ['0', 'A', 'B', 'C', 'D', 'E']" :key="id" :href="`#license-${id.toLowerCase()}`">{{ id }}</a>
          <span class="lab-jump-hint">or open <code>?only=b</code> to see one direction under the trust section</span>
        </p>

        <div class="lab-note lab-note-wide lab-recommendation">
          <h3>Recommendation</h3>
          <p class="lab-para">
            <strong>B · Is QuestPDF free for you?</strong> as the base. It is the only direction that answers the question
            nearly every visitor arrives with before anything else, in their words, and it gives the free majority
            something to do (install, get started) at the end of the page instead of sending everyone to the pricing page.
            Its colour finally means something: green is the free half, blue the paid half. It carries the money-back, the
            evaluation and the "versions stay yours" facts that the paid half needs, and it states the exclusions in plain
            text instead of behind an asterisk. Runner-up: <strong>C · Pay for updates, keep every version</strong>, the most
            original (no vendor in the benchmark draws its model) and the right pick if the "is it a subscription?" question is
            the one that costs you the most email. <strong>A</strong> is the low-risk evolution if the section should keep its
            shape; ship A's copy fixes even if nothing else changes (see "Fix regardless" below).
          </p>
        </div>

        <h2 class="lab-round">Audit of today's section</h2>

        <div class="lab-grid lab-grid-3">
          <div class="lab-note">
            <h3>Content</h3>
            <ul>
              <li><strong>"Not a subscription" sits next to "$1,999 / year".</strong> Both are true (perpetual rights to every version released during a paid term, which renews yearly for updates and auto-renews when bought on the website), but the panel says the first and shows the second. A wary reader sees the contradiction in two seconds and reads it as spin. The FAQ already has the honest wording.</li>
              <li><strong>The free tier is stated more widely than the licence.</strong> It omits that public-sector bodies (other than academia) and publicly traded companies are excluded at any revenue, and that revenue is counted across the group; "FOSS" means an OSI-approved licence. A homepage may shorten the rules but must never widen them: a reader who self-certifies from this line can end up out of compliance.</li>
              <li><strong>The strongest facts are buried or missing.</strong> "Unlimited developers" hides in the Professional description, though it is true of every tier and is the main thing per-seat competitors cannot say. Missing: the 30-day money-back guarantee, the locked renewal price, the 60-day evaluation, the 90-day transition with nothing retroactive, terms frozen per release.</li>
              <li><strong>The heading judges instead of answering.</strong> "Fair and Sustainable" and "A model that benefits everyone" describe the vendor's model; the reader's first question ("is it free for us, and if not, how much?") is answered in three paragraphs on the right.</li>
              <li><strong>The sources disagree on purchase orders.</strong> The pricing FAQ says Professional and Enterprise can both be bought by invoice, purchase order, reseller or signed Order Form; the pricing card and the Selection Guide list purchase orders and Order Forms as Enterprise terms. A and B follow the card. Worth settling before a procurement reader notices.</li>
              <li><strong>Enterprise is vague</strong> ("reduced risk and procurement-friendly terms") where concrete facts exist: affiliates, next-business-day support, 12-month end-of-life notice, purchase orders.</li>
            </ul>
          </div>

          <div class="lab-note">
            <h3>Layout</h3>
            <ul>
              <li><strong>The answer is read last.</strong> The left half (title, lead, four points, buttons) is read first; the tiers come after the buttons, on the right.</li>
              <li><strong>Prices do not form a column.</strong> They are body size (1rem), each placed after a badge of a different width, so "Free / $1,999 / $4,999" cannot be scanned in one look.</li>
              <li><strong>Uneven density.</strong> The right half spreads its three blocks to the panel's height (about 60px gaps); the left list is 14px apart. The halves look unrelated.</li>
              <li><strong>Dead ends.</strong> The tiers are not links (an earlier version linked each to its licence), and the free tier has no "Get started", although it is what most visitors need. The page's last call to action sends everyone to prices.</li>
              <li><strong>Size.</strong> 466px tall at 1440px; 1303px at 390px, almost three phone screens.</li>
            </ul>
          </div>

          <div class="lab-note">
            <h3>Look and feel</h3>
            <ul>
              <li><strong>The badge weights are inverted.</strong> Professional is solid blue and Enterprise solid black (solid white in dark mode, the brightest object in the panel); Community is a tint. The eye lands on the most expensive tier first, while the pricing page highlights Professional.</li>
              <li><strong>Pills look like buttons</strong> but do nothing.</li>
              <li><strong>Green says "free" and then sells.</strong> The green glow and the green "View Pricing" button lead to the paid page. Green is a good signal on this blue page, but only if it marks the free path.</li>
              <li><strong>A pricing-page excerpt.</strong> Pills and duotone ticks come from the pricing page; the trust section right above uses uppercase labels and hairline cells. Directions B–E use the homepage's own vocabulary.</li>
            </ul>
          </div>
        </div>

        <div class="lab-note lab-note-wide">
          <h3>Fix regardless of direction</h3>
          <ul>
            <li>Replace "Perpetual license, not a subscription: keep your version forever" with "Versions you receive stay yours, even if you stop renewing", and label the price "per year of updates" or explain it nearby.</li>
            <li>Add the exclusions in plain text (one line, no asterisk) and count revenue group-wide: <em>{{ communityExclusion }}</em></li>
            <li>Move "unlimited developers" from the Professional description into the shared list; give the tiers one badge weight; make each tier a link to its licence.</li>
            <li>Give the License Selection Guide's headings ids (it renders h2s without anchors today), so the homepage can link straight to "Community License Eligibility".</li>
          </ul>
        </div>

        <h2 class="lab-round">Who reads it, and what they ask</h2>

        <div class="lab-personas">
          <div v-for="persona of personas" :key="persona.id" class="lab-note">
            <h3>{{ persona.id }} · {{ persona.name }}</h3>
            <p class="lab-para"><em>"{{ persona.question }}"</em></p>
            <p class="lab-para lab-persona-needs">{{ persona.needs }}</p>
          </div>
        </div>
        <p class="lab-source">Personas from <code>design-explorations/cta-card-visuals/research.md</code> §3 (P1–P8, with sources). P5 and P6 do not reach this section.</p>

        <h2 class="lab-round">What we can say: fact inventory</h2>

        <div class="lab-table-wrap">
          <table class="lab-table">
            <thead>
              <tr><th>Fact</th><th>Source</th><th>Today</th><th>Used in</th></tr>
            </thead>
            <tbody>
              <tr v-for="fact of facts" :key="fact.fact">
                <td>{{ fact.fact }}</td>
                <td>{{ fact.source }}</td>
                <td :class="{ 'lab-missing': fact.today !== 'yes' }">{{ fact.today }}</td>
                <td>{{ fact.used }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="lab-source">Not claimed anywhere: counts of releases, savings against competitors, named competitors, any "most companies" share. The invoice in E is labelled as an illustration of the price list.</p>

        <h2 class="lab-round">Benchmark: how other vendors do it</h2>

        <div class="lab-grid">
          <div class="lab-note">
            <h3>What the homepages show (live, 2026-10-15)</h3>
            <ul>
              <li><strong>Almost nobody explains licensing on the homepage.</strong> Multi-product vendors stop at a Pricing link (Duende, Six Labors, Aspose, Telerik, DevExpress, Sentry, Docker). Single-product libraries state the deal in one sentence: Hangfire "Open and free for commercial use.", AG Grid "free forever … $999 USD per licence", Rider "Free for non-commercial use".</li>
              <li><strong>Closest models</strong>: Six Labors (Enterprise $4,999/yr, unlimited developers, 30-day money-back), Massient/MassTransit ("perpetual rights to continue using any version released during your active subscription"), PDFsharp (€750 perpetual, unlimited developers).</li>
              <li><strong>No homepage has a who-pays diagram, a calculator or a timeline.</strong> That gap is open.</li>
              <li><strong>What angered developers</strong> (Hacker News, devclass, 2025): per-seat pricing ("rename to AffluentAssertions"), promises about old versions hidden in a GitHub thread, a pricing gap "between hobbyists and huge companies", upgrades that become licence risks, FAQs that dodge their own question.</li>
            </ul>
          </div>

          <div class="lab-note">
            <h3>Borrowed, and where</h3>
            <ul>
              <li><strong>The deal in one sentence</strong> (Hangfire, AG Grid): E's title, B's lead.</li>
              <li><strong>What you keep, next to the price</strong> (Massient, Fluent Assertions' v7 promise): C's whole drawing; A, B, E as a line.</li>
              <li><strong>Enforcement in plain words</strong> (Lucky Penny "We trust our users!", IronPDF): A, D, E, and ours is stronger: no keys, no activation, no telemetry, no routine audits.</li>
              <li><strong>One money-back line</strong> (Six Labors, Sidekiq): B, C, E.</li>
              <li><strong>A promise of no metering</strong> (Massient "no per-message fees", Syncfusion "never changes the invoice"): E, literally as an invoice.</li>
              <li><strong>The free tier with its own button</strong> (automapper.io "Get Now", Six Labors "Apply now"): B's install chip and Get started.</li>
              <li><strong>Free is the same product</strong> (Duende "not a feature-gated demo"): D's spanning rows.</li>
              <li><strong>Avoided</strong>: "FREE*" with the rules in a footnote (automapper.io), "may qualify" wording (Massient), trial buttons everywhere (IronPDF, Telerik).</li>
            </ul>
          </div>
        </div>

        <h2 class="lab-round">Brainstorm: thirteen ideas, five built</h2>

        <div class="lab-grid">
          <div class="lab-note">
            <h3>Kept</h3>
            <ul>
              <li><strong>A · Refined split</strong>: today's panel with the copy corrected, prices in a column, one badge weight, tiers as links. The control group.</li>
              <li><strong>B · Is QuestPDF free for you?</strong>: eligibility first, in the reader's words; the paid tiers are the "otherwise". Green = free.</li>
              <li><strong>C · Pay for updates, keep every version</strong>: the perpetual model drawn as a timeline with two lanes. Fixes the one contradiction by showing it.</li>
              <li><strong>D · One library, three licenses</strong>: a terms table whose shared rows span all three tiers, so equality is visible before it is read. For the approver.</li>
              <li><strong>E · No seats, no meters</strong>: a QuestPDF-style invoice with a $0.00 line for everything others meter. The product's own medium.</li>
            </ul>
          </div>

          <div class="lab-note">
            <h3>Dropped, and why</h3>
            <ul>
              <li><strong>Revenue calculator</strong>: three outcomes do not need an input; it cannot encode the public-sector and listed-company exclusions without becoming a form; it asks before it answers.</li>
              <li><strong>Persona tabs</strong> (developer / manager / procurement): hides content and makes readers self-identify first (rejected in the quick-start lab for the same reason).</li>
              <li><strong>Questions in the reader's words</strong> (the trust lab's A device): would copy the pricing FAQ, and the trust section did not adopt it. B keeps a question as its title.</li>
              <li><strong>Three tier cards plus an includes card</strong>: the homepage had this and moved away from it; a pricing page in miniature.</li>
              <li><strong>One-line band</strong> ("Free under $1M. $1,999 a year above."): the benchmark's most common pattern, but gives the approver nothing to forward. B's title and lead are its fallback.</li>
              <li><strong>Sustainability loop</strong> (paid licences fund full-time development, which keeps the free tier, with "800+ paying customers"): about the vendor again; survives as A's lead sentence.</li>
              <li><strong>Revenue × entities map</strong>: elegant, but the exclusions and the open-source and academic categories break a two-axis map.</li>
              <li><strong>"What other PDF libraries charge for"</strong>: implies naming competitors; E's $0 lines say it without naming anyone.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <div class="container lab-context-note">
      <div class="content">
        <span class="lab-context-label">Context · the trust section, which sits right above the licence section</span>
      </div>
    </div>
    <div class="container">
      <HomePageTrust />
    </div>

    <license-direction v-if="show('0')" letter="0" id="license-0" name="Today" height="466px · 1303px at 390">
      <template #why>One panel split by a hairline: the heading, the model, four shared points and two buttons on the left; the three tiers as badge, price and description on the right. Calm, compact and in the owner's colours.</template>
      <template #tradeoffs>See the audit above: the subscription contradiction, the free tier stated too widely, the answer read last, prices that do not form a column, inverted badge weights, no links on the tiers and no first step for the free majority.</template>
      <HomePageLicense />
    </license-direction>

    <license-direction v-if="show('a')" letter="A" id="license-a" name="Refined split" :height="heights.a">
      <template #why>Everything a reader liked about today stays: the panel, the halves, the heading, the green glow, the ticks and both buttons. The right half becomes three hairline rows, each a link to its licence, with the name badge on the left and the price on the right, so the prices form one column. All three badges are tints of their tier colour, so none outshouts the others.</template>
      <template #tradeoffs>The smallest change, so it keeps today's two weaker traits: the answer is still on the right and the green button still leads to prices. "Per year of updates" is accurate but less familiar than "/ year". Five points instead of four.</template>
      <template #personas>P2 and P7 get the corrected terms and the links; P8 gets the exclusions stated plainly. P1 still has to read across to find the answer.</template>
      <template #copy>New lead (fair = free for small, flat for large; sustainable = funds full-time development). Points rewritten: unlimited developers added, perpetual reworded, keys and activation added. Tier lines rewritten with the Selection Guide's scope facts.</template>
      <LicenseA />
    </license-direction>

    <license-direction v-if="show('b')" letter="B" id="license-b" name="Is QuestPDF free for you?" :height="heights.b">
      <template #why>It asks the reader's question and answers it straight away: it lists who qualifies as "you" (an audience list, as Sidekiq does), what free includes, the exclusions in plain text, and the first step: the install chip and Get started. Only then, on the paid half: "Otherwise, one flat price per company", the two paid tiers, and the three facts that make buying safe (evaluation, money-back, versions stay yours).</template>
      <template #tradeoffs>The title is a question, a new voice for this page. The free half is the larger one, which undersells the paid tiers a little on the page that funds the project; the paid half compensates by being the tidy, decisive one with the primary button. Adds an install chip that already appears in the quick start (here as the closing step). On phones it is 1427px, 124px taller than today; only C is shorter than today at 390px.</template>
      <template #personas>P1 and P8 first: a yes/no answer and a first step. P3 sees "every developer" at a flat price. P2 and P7 get the risk facts and the guide.</template>
      <template #copy>New title and lead. Eligibility from the Selection Guide's categories (individual and small business merged; the transitive-dependency category left to the guide because of its wrapper exception) plus the FAQ's client-work answer. "What free includes" from the pricing card and FAQ. Exclusions verbatim from the guide, shortened.</template>
      <LicenseB />
    </license-direction>

    <license-direction v-if="show('c')" letter="C" id="license-c" name="Pay for updates, keep every version" :height="heights.c">
      <template #why>The model the panel tries to explain in a bullet, drawn: two lanes over two years. Updates and support run while you renew and pause when you stop; the right to use runs past the edge, and every release that arrived drops into it and stays. Buy, renew at the same price and stop are the three moments, each with its fact. The tiers follow as one strip of three cells with big prices.</template>
      <template #tradeoffs>The most original, and the most to maintain: a drawing that must stay true if the terms change. It explains the paid tiers best and the free tier least (one cell). On phones the event details move under the drawing. Taller than today.</template>
      <template #personas>P2 and P7: lock-in, renewal and shutdown answered at a glance. P8 sees "terms it shipped with" (no retroactive change). P1 gets prices but no eligibility.</template>
      <template #copy>New title and lead from the FAQ ("Is this a subscription", "What happens if we do not renew", "renewal price"); "a locked price", not "the price you first paid", because one-off discounts do not carry over. "Under the terms it shipped with" from "Will the Community License stay free?".</template>
      <LicenseC />
    </license-direction>

    <license-direction v-if="show('d')" letter="D" id="license-d" name="One library, three licenses" :height="heights.d">
      <template #why>A short table of terms in which every row that is the same for all three tiers is one bar across the three columns. Before reading a word, the reader sees five long bars and two split rows: the tiers are the same product and differ only in scope and support. It reads like the procurement summary an approver would write anyway, and ends with links to the actual documents.</template>
      <template #tradeoffs>The driest, and closest to the pricing page. Needs disciplined copy to keep cells to one line. On phones the split rows need their own labels and the table becomes long. No first step for the free tier.</template>
      <template #personas>P7 and P2 best (scope, support, continuity, no audits, the documents). P3 sees unlimited developers as a shared bar. P1 and P8 must find their row.</template>
      <template #copy>New title and lead from the guide's "License Equality". Rows from the pricing cards and FAQ; "no routine audits" from "Will we be audited?".</template>
      <LicenseD />
    </license-direction>

    <license-direction v-if="show('e')" letter="E" id="license-e" name="No seats, no meters, one flat price" :height="heights.e">
      <template #why>The value of a flat licence in the product's own medium: an invoice drawn like the one the tutorial builds, with one line for the licence and a $0.00 line for every thing other vendors meter (developers, servers, deployments, documents, end users, royalties). Three buttons switch the tier; Community totals $0.00. The text column keeps the three facts a page cannot show.</template>
      <template #tradeoffs>The most playful; an approver may find it cute rather than serious, and an invoice that is not one must be captioned. Interaction is optional (the rest state is Professional, with all three prices on the buttons), but it is the only direction with JavaScript. The paper stays light in dark mode, dimmed. Picking Enterprise adds the affiliates line and grows the panel by 33px.</template>
      <template #personas>P3 and P1 (no seats, no per-server fees), P8 (the Community invoice totals $0.00). P7 sees a familiar document but may want D's terms.</template>
      <template #copy>New title and lead. Every $0.00 line from the FAQ ("How many developers", "SaaS, cloud", "CI/CD", "Can we ship QuestPDF inside our own product?"). Caption states it is an illustration and that Paddle issues the real invoices.</template>
      <LicenseE />
    </license-direction>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
/* imported for its global styles only (the canvas, the 48px homepage panel inset): in dev mode a
   component's CSS loads only on pages that import it */
import "../../HomePage.vue";
import HomePageTrust from "../../HomePageTrust.vue";
import HomePageLicense from "../../HomePageLicense.vue";
import LicenseDirection from "./LicenseDirection.vue";
import LicenseA from "./LicenseA.vue";
import LicenseB from "./LicenseB.vue";
import LicenseC from "./LicenseC.vue";
import LicenseD from "./LicenseD.vue";
import LicenseE from "./LicenseE.vue";
import { communityExclusion } from "./licenseFacts";

/* panel heights measured on the dev server at 1440px and at 390px (today: 466px and 1303px) */
const heights = {
  a: "504px · 1521px at 390",
  b: "518px · 1427px at 390",
  c: "669px · 1283px at 390",
  d: "870px · 1863px at 390",
  e: "723px · 1595px at 390"
};

const personas = [
  {
    id: "P1",
    name: "Developer with the ticket",
    question: "Can I use this at work without asking anyone? If not, what number do I take to my manager?",
    needs: "A yes/no in two seconds, the price, a link to forward, and the first step if the answer is yes."
  },
  {
    id: "P8",
    name: "Licence-wary small shop",
    question: "Is it really free for us? What is the catch, and what happens when we grow?",
    needs: "No registration, key, watermark or time limit; the exclusions said plainly; the 90-day transition. Punishes anything that smells of upsell."
  },
  {
    id: "P2",
    name: "Tech lead evaluating a dependency",
    question: "What happens if we stop paying, or if they change the licence again? Is there a key or a kill switch?",
    needs: "Perpetual rights, terms frozen per release, no licence server, source on GitHub, a stable renewal price."
  },
  {
    id: "P7",
    name: "Approver who never clicks",
    question: "Which entity does it cover, how do we pay, can we get our money back, will we be audited?",
    needs: "Scope, invoice and purchase-order paths, the money-back guarantee, no routine audits, the documents to file."
  },
  {
    id: "P3",
    name: "Migrant from another PDF library",
    question: "Is this cheaper than the per-developer licence we pay for now?",
    needs: "Unlimited developers and no per-server or per-document fees, said where the prices are."
  }
];

const facts = [
  { fact: "Free for individuals, OSI open source, charities, academia, organisations under $1M (consolidated)", source: "Selection Guide, Community eligibility", today: "partly", used: "A, B, D, E" },
  { fact: "Public sector (academia excepted) and publicly traded companies: paid at any revenue", source: "Selection Guide; FAQ", today: "missing", used: "A, B, D, E (C states no eligibility)" },
  { fact: "Commercial use; no registration, keys, watermarks or time limits", source: "Pricing card; FAQ", today: "missing", used: "B, E" },
  { fact: "Unlimited developers, projects, servers, deployments, every tier", source: "Guide, License Equality; FAQ", today: "Professional only", used: "A, B, D, E" },
  { fact: "Every feature in every tier", source: "Guide; pricing card", today: "yes", used: "A, D, E" },
  { fact: "Royalty-free redistribution; end users need no licence", source: "FAQ, Can we ship QuestPDF", today: "yes", used: "A, D, E" },
  { fact: "Perpetual for versions released during the paid term; renew for updates", source: "FAQ, Is this a subscription", today: "misworded", used: "all" },
  { fact: "Locked renewal price while renewing continuously", source: "FAQ; pricing card", today: "missing", used: "C, D" },
  { fact: "30-day money-back guarantee", source: "FAQ; pricing card", today: "missing", used: "B, C, E" },
  { fact: "60-day evaluation for organisations that do not qualify", source: "FAQ; Guide", today: "missing", used: "B" },
  { fact: "No keys, activation, telemetry or remote checks", source: "FAQ, Does QuestPDF collect telemetry", today: "missing (privacy cell above)", used: "A, D, E" },
  { fact: "No routine audits, self-certification", source: "FAQ, Will we be audited; Guide", today: "missing", used: "D" },
  { fact: "The licence shipped with a release governs it permanently", source: "FAQ, Will the Community License stay free", today: "missing", used: "C" },
  { fact: "Enterprise: affiliates (>50%), next-business-day support, 12-month end-of-life notice", source: "Pricing card; Guide", today: "vague", used: "A, B, C, D, E" },
  { fact: "$1,999 and $4,999 per year, plus local tax", source: "PricingTiers.vue", today: "yes", used: "all" }
];

/* ?only=<id> renders the trust section and that one direction */
const only = ref<string | null>(null);

onMounted(() => {
  only.value = new URLSearchParams(window.location.search).get("only")?.toLowerCase() ?? null;
});

function show(id: string) {
  return !only.value || only.value === id;
}
</script>

<style>

.license-lab .lab-intro {
  align-items: stretch;
}

.license-lab .lab-intro h1 {
  margin-bottom: 1rem;
}

.license-lab .lab-lead {
  max-width: 880px;
  font-size: 1.125rem;
  line-height: 1.75rem;
  margin-bottom: 32px;
}

.license-lab .lab-jump {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: -16px 0 32px;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.license-lab .lab-jump a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  font-family: var(--vp-font-family-mono);
  font-weight: 600;
  color: var(--vp-c-text-1);
  background-color: var(--home-surface-inner);
  text-decoration: none;
}

.license-lab .lab-jump-hint {
  margin-left: 10px;
}

.license-lab .lab-round {
  margin: 48px 0 20px;
  font-size: 1.5rem;
  line-height: 2rem;
}

.license-lab .lab-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.license-lab .lab-grid-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.license-lab .lab-personas {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.license-lab .lab-persona-needs {
  margin-top: 8px;
  color: var(--vp-c-text-3);
}

.license-lab .lab-note {
  padding: 24px 28px;
  border: 1px dashed color-mix(in srgb, var(--vp-c-text-1) 30%, transparent);
  border-radius: 16px;
}

.license-lab .lab-personas .lab-note {
  padding: 20px;
}

.license-lab .lab-note-wide {
  margin-top: 24px;
}

.license-lab .lab-note h3 {
  margin: 0 0 12px;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
}

.license-lab .lab-personas .lab-note h3 {
  font-size: 0.8125rem;
  line-height: 1.25rem;
}

.license-lab .lab-note ul {
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.license-lab .lab-note strong {
  color: var(--vp-c-text-1);
}

.license-lab .lab-para {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.license-lab .lab-recommendation {
  border-style: solid;
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 45%, transparent);
}

.license-lab .lab-source {
  margin: 12px 0 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.license-lab .lab-table-wrap {
  overflow-x: auto;
}

.license-lab .lab-table {
  display: table;
  width: 100%;
  margin: 0;
  border-collapse: collapse;
  font-size: 0.875rem;
  line-height: 1.375rem;
}

.license-lab .lab-table tr {
  background: none;
}

.license-lab .lab-table th,
.license-lab .lab-table td {
  padding: 8px 12px;
  border: none;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: left;
  vertical-align: top;
  background: none;
}

.license-lab .lab-table th {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
}

.license-lab .lab-table td:first-child {
  color: var(--vp-c-text-1);
}

.license-lab .lab-missing {
  color: #E65100;
}

html.dark .license-lab .lab-missing {
  color: #FFB74D;
}

.license-lab .lab-context-note {
  margin-top: 32px;
}

.license-lab .lab-context-note .content {
  padding-bottom: 0 !important;
}

.license-lab .lab-context-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

@media screen and (max-width: 1200px) {
  .license-lab .lab-grid-3,
  .license-lab .lab-personas {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media screen and (max-width: 768px) {
  .license-lab .lab-grid,
  .license-lab .lab-grid-3,
  .license-lab .lab-personas {
    grid-template-columns: minmax(0, 1fr);
  }
}

</style>
