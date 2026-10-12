<template>
  <!-- Lab page, not linked from anywhere: six directions for one section that replaces both
       "Enterprise-grade foundations" and "Industry-standard PDF compliance" on the homepage.
       Every direction renders with the real homepage canvas, panels and tokens, so what is seen
       here is what would ship. Delete the lab (this folder and docs/trust-lab.md) once a direction
       is chosen and built into the homepage. -->
  <div class="custom-page home-page textured-page trust-lab">
    <div class="container">
      <section class="content lab-intro">
        <h1>Trust section lab</h1>
        <p class="lab-lead">
          Twenty-five directions for one homepage section that merges <em>Enterprise-grade foundations</em> and
          <em>Industry-standard PDF compliance</em>. Same facts in every direction, different reading
          mechanics. The goal is a section a reviewer actually reads, not one they scroll past.
        </p>
        <p class="lab-lead"><strong>A to F</strong> are text-led layouts; <strong>G to M</strong> each build around a visual object: a report, a pipeline, a boundary diagram, tinted tiles, a CI checks window, a never/always pair, an editorial statement. <strong>N to Q</strong> are the lean family: the same facts with the prose removed, 30 to 60 words each against about 250 in the two sections today. <strong>R to Y</strong> borrow shapes from outside marketing pages: an email reply, a passport, a comparison table, a settings panel, a dependency stack, a row of seals, an FAQ, a signed note.</p>
        <p class="lab-lead"><strong>Round two</strong>, at the bottom of the page, builds on the three directions chosen from the first round: A (questions), B (questionnaire) and C (facts as headlines). Seven variants: each parent tightened, and the pairs crossed.</p>
        <p class="lab-jump">
          Jump to
          <a v-for="l of 'ABCDEFGHIJKLMNOPQRSTUVWXY'" :key="l" :href="`#${l.toLowerCase()}`">{{ l }}</a>
          <span class="lab-jump-sep">round two</span>
          <a v-for="l of ['A2', 'AB', 'AC', 'B2', 'B3', 'B4', 'C2']" :key="l" :href="`#${l.toLowerCase()}`">{{ l }}</a>
        </p>

        <div class="lab-grid">
          <div class="lab-note">
            <h3>What stays (the facts every direction uses)</h3>
            <ul>
              <li><strong>No network calls, no telemetry, no license server.</strong> Runs offline and air-gapped. Stated in the security policy.</li>
              <li><strong>Full source code on GitHub.</strong> Native dependencies (Skia, qpdf) built from source in CI.</li>
              <li><strong>PDF/A</strong> (ISO 19005) 2b, 2u, 2a, 3b, 3u, 3a. <strong>PDF/UA-1</strong> (ISO 14289). <strong>EN 16931</strong> e-invoicing: ZUGFeRD, Factur-X.</li>
              <li><strong>Every build validated with veraPDF and Mustang.</strong> The one piece of evidence on the page; it anchors every direction.</li>
              <li><strong>Thousands of pages per second</strong>, low CPU and memory. Kept because managers ask; it has no public benchmark link, so direction F leaves it out.</li>
            </ul>
          </div>

          <div class="lab-note">
            <h3>What goes, and why</h3>
            <ul>
              <li><strong>"Comprehensive Layout Engine"</strong>: says nothing a reader can check. The quick start above already shows the engine at work.</li>
              <li><strong>"Optimized File Size"</strong> and <strong>"Advanced Language Support"</strong>: features, not trust signals. They belong with the feature chips. RTL survives as a single line where a direction needs a multilingual answer.</li>
              <li><strong>Standard descriptions</strong> ("ensuring your PDFs remain readable and visually identical for decades"): shortened to the ISO number, the levels and a half-sentence on what it is for.</li>
              <li><strong>Two section headers</strong> become one. Saves roughly 400px on desktop and 1000px on phones.</li>
            </ul>
          </div>
        </div>

        <div class="lab-note lab-note-wide lab-recommendation">
          <h3>Recommendation</h3>
          <p>
            <strong>A as the base, with F's verify links.</strong> Questions in the reader's own words are the one
            device that reliably stops a scroll, and a yes/no opener lets a manager stop after one word while the
            developer reads on. Adding a small "Security policy", "Document settings" or "Repository" link under
            each answer borrows F's credibility without its gimmick risk. <strong>B</strong> is the runner-up for a
            buyer-heavy audience; <strong>C</strong> is the safe fallback if the homepage should not change its voice.
          </p>
        </div>

        <div class="lab-note lab-note-wide">
          <h3>Who reads this section, and what they need answered</h3>
          <div class="lab-personas">
            <div>
              <strong>The developer</strong> evaluating the library on a Friday afternoon.
              <em>How do I get PDF/A or PDF/UA? Does it need internet or a license key? Can I step into the source when it breaks? Will it keep up with our volume? Arabic and Hebrew?</em>
            </div>
            <div>
              <strong>The engineering manager</strong> who has to promise a delivery date.
              <em>Will the output pass the customer's archival or accessibility audit? Are the German and French e-invoicing formats covered? Is this a setting or a three-week project?</em>
            </div>
            <div>
              <strong>The security or procurement reviewer</strong> who signs off.
              <em>Does any document data leave our infrastructure? Can we audit the code? What about the native binaries? Is there a disclosure process?</em>
            </div>
          </div>
        </div>
      </section>
    </div>

    <lab-direction letter="A" id="a" name="Questions your reviewers will ask">
      <template #why>
        Each cell is the reader's own question, in their own words, answered with a yes or no first.
        People skip claims but read questions they recognise. The question is the heading, so the
        scan path (question, answer, done) works at any speed.
      </template>
      <template #tradeoffs>
        Six questions is the ceiling; the grid gets long on phones. The yes/no openers are repetitive if read in sequence.
      </template>
      <trust-a />
    </lab-direction>

    <lab-direction letter="B" id="b" name="The questionnaire, already filled in">
      <template #why>
        Styled like the vendor security questionnaire a procurement team sends anyway. The reviewer recognises the format and
        scans the ticks; the developer reads the detail column. Twelve one-line rows carry more facts than
        the two current sections at a third of the height.
      </template>
      <template #tradeoffs>
        Driest of the six. Needs the row copy to stay terse or it turns into a table of paragraphs. The least "homepage" in tone.
      </template>
      <trust-b />
    </lab-direction>

    <lab-direction letter="C" id="c" name="Facts as headlines">
      <template #why>
        The closest to what exists today: two cards. The difference is that every heading is a checkable fact
        ("Zero network calls") instead of a category name ("Complete Data Privacy"). A reader who only
        reads headings still leaves with the facts.
      </template>
      <template #tradeoffs>
        Safest, and the least memorable. Relies on copy discipline: each heading must stay a fact.
      </template>
      <trust-c />
    </lab-direction>

    <lab-direction letter="D" id="d" name="Compliance is a setting, not a project">
      <template #why>
        Leads with the actual code: two properties on DocumentSettings. Developers read code before prose, and
        the manager gets the message that compliance is configuration, not a milestone. The standards
        and the infrastructure facts sit around the code as the consequences.
      </template>
      <template #tradeoffs>
        A second code window on the page after the quick start. The infrastructure facts get the smallest share, so the security reader has less to hold on to.
      </template>
      <trust-d />
    </lab-direction>

    <lab-direction letter="E" id="e" name="Three desks">
      <template #why>
        Three columns, one per reader. Each visitor finds their column and reads about forty words. Self-selection
        is the strongest reading mechanic there is, and it makes the three audiences visible to each other
        (the developer sees what their security team will ask).
      </template>
      <template #tradeoffs>
        Labelling the reader can feel presumptuous. Some facts want to be in two columns at once.
      </template>
      <trust-e />
    </lab-direction>

    <lab-direction letter="F" id="f" name="Claims you can verify">
      <template #why>
        Only claims with a link to the evidence: the security policy, the GitHub repository, the settings
        reference, the CI validation note. Big numbers catch the eye; the verify link turns a claim into
        a fact. Trust comes from being checkable, not from adjectives.
      </template>
      <template #tradeoffs>
        Performance has no public benchmark, so it is left out. The numbers must stay honest ("0 network calls" is a fact, "6 PDF/A levels" is a count), or the whole device loses credibility.
      </template>
      <trust-f />
    </lab-direction>

    <lab-direction letter="G" id="g" name="The validation report">
      <template #why>
        Puts the evidence on the page as an object: a report page with a results table and a stamp. A document
        about documents. Readers believe artefacts more than sentences, and a table of "Pass" rows is read
        in two seconds. The three facts beside it tell each audience what the report means for them.
      </template>
      <template #tradeoffs>
        The report must stay clearly illustrative (ours, not a customer's). The stamp is a strong flavour; it can tip into kitsch if overdone.
      </template>
      <trust-g />
    </lab-direction>

    <lab-direction letter="H" id="h" name="From your code to an audited document">
      <template #why>
        A process diagram: five nodes on a line. It explains the mechanism instead of listing properties, and
        a mechanism is what a sceptical engineer trusts. The security fact (step 2) and the validation
        fact (step 4) sit in the flow where they happen, so they are read in context.
      </template>
      <template #tradeoffs>
        Five steps is a lot of words for a diagram; the copy per node has to stay at one sentence. Horizontal flows turn into long vertical lists on phones.
      </template>
      <trust-h />
    </lab-direction>

    <lab-direction letter="I" id="i" name="Your infrastructure is the whole system">
      <template #why>
        A boundary diagram, drawn the way a security architect would draw it: a dashed box with your application
        and the library inside, and the things people expect to find outside (vendor servers, a license
        server, telemetry) crossed out. The picture answers the security question before the text does.
        Standards are a footer, because this direction leads with security.
      </template>
      <template #tradeoffs>
        Weights security over compliance; the standards get one line. The diagram needs a careful phone layout.
      </template>
      <trust-i />
    </lab-direction>

    <lab-direction letter="J" id="j" name="Tinted bento">
      <template #why>
        A bento of tiles sized by importance and coloured by family: one dark tile for the security fact, brand-blue
        tiles for the three standards, green for validation, plain tiles for source and performance. The most
        colourful direction; the colour makes it scannable at a glance and marks it as the enterprise
        block of the page.
      </template>
      <template #tradeoffs>
        The strongest departure from the page's quiet surfaces; five tinted tiles can fight the hero. The tile sizes imply a hierarchy that has to be right.
      </template>
      <trust-j />
    </lab-direction>

    <lab-direction letter="K" id="k" name="The checks that run before a version ships">
      <template #why>
        A checks list in a window, like a CI run every developer sees daily: green ticks, the validator in grey,
        "passed" on the right. Evidence-shaped, monospace, and read top to bottom in seconds. Beside it,
        one sentence per audience says what a green pipeline means for them.
      </template>
      <template #tradeoffs>
        The rows must mirror what CI actually runs, or an engineer who looks it up loses trust. A third window-style element on the page after the quick start and the companion.
      </template>
      <trust-k />
    </lab-direction>

    <lab-direction letter="L" id="l" name="Never and always">
      <template #why>
        Two lists, one red and one green, in large type. The "never" list answers the security review by
        negation, which is how reviewers actually think ("does it call home?"). The "always" list holds
        the standards. Each line is a few words, so the whole section reads in under ten seconds.
      </template>
      <template #tradeoffs>
        Red on a marketing page needs restraint; it is kept to a dot and faint icon backgrounds. Lists of claims without a verify link lean on tone rather than evidence.
      </template>
      <trust-l />
    </lab-direction>

    <lab-direction letter="M" id="m" name="Four sentences with footnotes" :dots="false">
      <template #why>
        Editorial: one large statement of four short sentences, each with a footnote number, and the
        footnotes below carrying the facts and the verify links. The statement is read by everyone; the
        footnotes are read by whoever needs them. The shape is unlike anything else on the page, which
        is why it gets noticed.
      </template>
      <template #tradeoffs>
        Footnotes are a reading convention some people skip entirely. No icons and no badges, so it relies on typography alone.
      </template>
      <trust-m />
    </lab-direction>

    <lab-direction letter="N" id="n" name="Spec strip">
      <template #why>
        No sentences at all, except two row labels. Every fact is a chip with an icon, the way a spec sheet lists
        them, and each row ends in the one link that proves it. Read in five seconds; nothing to skip
        because there is nothing to read.
      </template>
      <template #tradeoffs>
        Chips cannot explain; "Air-gapped" assumes the reader knows why it matters. Twelve chips in two rows is the limit before it turns into the feature tag cloud above.
      </template>
      <trust-n />
    </lab-direction>

    <lab-direction letter="O" id="o" name="Quickfire">
      <template #why>
        Eight two-word questions with one-to-three-word answers, the answer in large type. It is direction A
        boiled down to the words a reviewer would actually say out loud. The rhythm (question, answer,
        question, answer) is what makes people read all eight.
      </template>
      <template #tradeoffs>
        Terse to the point of cheeky; "Phones home? Never." sets a tone the rest of the page has to carry. No room for the ISO numbers.
      </template>
      <trust-o />
    </lab-direction>

    <lab-direction letter="P" id="p" name="One sentence">
      <template #why>
        The whole section is two sentences in large type, with the facts in bold and three links underneath.
        No header, no cards, no grid. It reads as a statement the company stands behind rather than a
        list of features, and it is over before anyone thinks of skipping it.
      </template>
      <template #tradeoffs>
        Not scannable by keyword the way badges are; a reader looking for "ZUGFeRD" has to read the sentence. Performance is left out to keep the sentence honest and short.
      </template>
      <trust-p />
    </lab-direction>

    <lab-direction letter="Q" id="q" name="Boundary, no prose" :dots="true">
      <template #why>
        Direction I with every paragraph removed: the diagram carries the security facts, the document node
        carries the standards as badges, and one small line carries validation and source. The only
        sentence is the heading. Everything is a label on a drawing.
      </template>
      <template #tradeoffs>
        A diagram with no explanation relies on the reader decoding it; the crossed-out list on the right has to be unmistakable. Performance has no place in the picture.
      </template>
      <trust-q />
    </lab-direction>

    <lab-direction letter="R" id="r" name="The reply we send">
      <template #why>
        The section is the email you would write back to a security team, with the From, To and Subject lines kept.
        It mirrors how these questions actually arrive (by mail, before purchase) and reads as a real answer
        rather than a claim. The manager's job becomes forwarding it. Three links beside it point to the
        policy, the repository and the setting.
      </template>
      <template #tradeoffs>
        A mock email is a strong flavour; the header strip must stay restrained or it reads as a joke. The bullets are the whole section, so each must stay one line.
      </template>
      <trust-r />
    </lab-direction>

    <lab-direction letter="S" id="s" name="The document's passport">
      <template #why>
        A passport spread: the left page lists the document's data (conformance, place of issue, outbound
        connections: none), the right page carries the stamps (PDF/A, PDF/UA-1, ZUGFeRD, validated). A
        single object holds both halves of the story, and fields in monospace read as facts, not copy.
      </template>
      <template #tradeoffs>
        Playful; the stamps need restraint in colour and rotation. "Place of issue: your infrastructure" is a metaphor the reader has to get. No room for performance.
      </template>
      <trust-s />
    </lab-direction>

    <lab-direction letter="T" id="t" name="Library versus hosted API">
      <template #why>
        A comparison table against the generic alternative, a hosted PDF service. Rows are the questions a reviewer
        asks; the QuestPDF column is tinted so the eye runs down it. Comparisons are the most-read element on
        a vendor page, and this one explains why the security answers are what they are: it is a library, not a service.
      </template>
      <template #tradeoffs>
        Slightly combative; the left column must stay fair ("usually", "varies by vendor") and name no competitor. Not useful to a reader who never considered a hosted API.
      </template>
      <trust-t />
    </lab-direction>

    <lab-direction letter="U" id="u" name="Switches that exist, switches that do not">
      <template #why>
        A settings panel. The Document group has real switches (PDF/A, PDF/UA, ZUGFeRD), the Network group has
        none to flip: telemetry, license server and outbound connections show a ban mark where a toggle would be.
        The UI metaphor makes "compliance is a setting" and "privacy has no setting" visible in one glance.
      </template>
      <template #tradeoffs>
        A fake settings panel could be mistaken for a real configuration surface; the mono hints keep it honest. Relies on the two notes beside it for the links.
      </template>
      <trust-u />
    </lab-direction>

    <lab-direction letter="V" id="v" name="What is inside">
      <template #why>
        A cutaway of the stack: your application, QuestPDF, the native dependencies, the document. It is the first
        direction that gives Skia and qpdf a place of their own, which is what a procurement reviewer asks about
        once the telemetry question is answered. Each layer names where it comes from and links to the proof.
      </template>
      <template #tradeoffs>
        More technical than the rest of the page; the manager gets the least from it. The three "nothing" facts carry the security message, so they cannot be cut.
      </template>
      <trust-v />
    </lab-direction>

    <lab-direction letter="W" id="w" name="Seals">
      <template #why>
        Six seals in a row, three standards and three guarantees, each a double ring with an icon, a name and one
        sub-line. Seals are what certifications look like, so the reader processes the row as credentials. Every
        seal is a link to its evidence. Symmetrical and quiet, with the least copy of any visual direction.
      </template>
      <template #tradeoffs>
        Seals imply third-party certification, which these are not; the sub-lines must stay factual (ISO numbers, validator names). Six round shapes are a new form on the page.
      </template>
      <trust-w />
    </lab-direction>

    <lab-direction letter="X" id="x" name="The five questions">
      <template #why>
        An accordion of the five pre-purchase questions, first one open. Each answer is two sentences and a link.
        Progressive disclosure lets the section stay short for the scroller while giving the reviewer full
        answers on demand. The open first item means the section is never blank.
      </template>
      <template #tradeoffs>
        Accordions hide content; a reviewer scanning for "ZUGFeRD" has to open the fourth item. Interactive, so it needs a keyboard and no-JS check (native details elements handle both).
      </template>
      <trust-x />
    </lab-direction>

    <lab-direction letter="Y" id="y" name="A signed note">
      <template #why>
        First person, signed by the author. "I get the same three questions before almost every purchase" is
        true, specific and disarming; it tells the reviewer their question is expected and answers it in the
        same breath. A signature is a form of accountability no badge provides, and it fits a product with a
        single named maintainer.
      </template>
      <template #tradeoffs>
        It has to be in your voice and you have to stand behind every sentence. A personal note can feel small next to "enterprise"; the links underneath are what keep it checkable.
      </template>
      <trust-y />
    </lab-direction>

    <div class="container lab-round">
      <div class="content">
        <h2>Round two: built on A, B and C</h2>
        <p>
          What the three parents share: text first, a quiet surface, and a structure the reviewer recognises (a question, a
          requirement, a fact). What separates them: A is organised by <em>who asks</em>, B by <em>what the form asks</em>,
          C by <em>what is true</em>. The variants below keep that spine and change one thing each: shorter answers, a
          proof link in every cell, the two parents crossed, or the whole thing made forwardable.
        </p>
      </div>
    </div>

    <lab-direction letter="A2" id="a2" name="Questions, with proof">
      <template #why>
        Direction A with two changes: every answer cut to one sentence after the yes or no, and a link at the bottom of
        each cell to the page that proves it. The verdict is for the manager, the sentence for the developer, the
        link for the reviewer. This is the first-round recommendation ("A as the base, with F's verify links") built out.
      </template>
      <template #tradeoffs>
        Six links in one section is a lot of exits; they are kept small and last. The accessibility and ZUGFeRD pages have to be good enough to receive a reviewer.
      </template>
      <trust-a2 />
    </lab-direction>

    <lab-direction letter="AB" id="ab" name="Two reviews, answered in advance">
      <template #why>
        A crossed with B: A's questions in the reader's words, laid out as B's two sheets, one per review. Four
        question and answer rows per card, each answer one line. The card title tells the reader which review they
        are in, so the security reviewer reads the left card and the compliance reviewer the right one.
      </template>
      <template #tradeoffs>
        Eight questions reads slower than six cells; the one-line answers have to stay one line. No icons beyond the two card heads.
      </template>
      <TrustAB />
    </lab-direction>

    <lab-direction letter="AC" id="ac" name="The question, then the fact">
      <template #why>
        A crossed with C: C's two cards and headline facts, with A's question placed as a small line above each
        headline. A reader who scans headings still gets only facts ("Zero network calls."); a reader who slows
        down sees the question it answers ("Does it phone home?"). Both reading speeds are served without adding
        a sentence.
      </template>
      <template #tradeoffs>
        The question line is a third text level in each row, so the row is taller than C's. Questions and facts must match exactly or the pairing reads as evasive.
      </template>
      <TrustAC />
    </lab-direction>

    <lab-direction letter="B2" id="b2" name="The questionnaire, with evidence">
      <template #why>
        B flattened into one table with four columns: requirement, status, answer, evidence. This is the shape a
        procurement sheet actually has, and the evidence column is what a real questionnaire asks for and most
        vendor pages leave out. Nine rows in two groups, read top to bottom in under twenty seconds.
      </template>
      <template #tradeoffs>
        The driest direction on the page; it earns its place by being complete, not by being attractive. On phones the table folds to stacked rows.
      </template>
      <trust-b2 />
    </lab-direction>

    <lab-direction letter="B3" id="b3" name="The questionnaire, short answers">
      <template #why>
        B with every answer cut to a value: "Telemetry: None", "License server: None", "Offline and air-gapped: Supported".
        Fifteen rows at one line each. It reads like a spec sheet and answers the three pre-purchase email questions
        as three consecutive rows, which is the point.
      </template>
      <template #tradeoffs>
        Values without sentences cannot explain; "Supported" assumes the reader knows what air-gapped means. Longest list of any direction, so the row height has to stay tight.
      </template>
      <trust-b3 />
    </lab-direction>

    <lab-direction letter="B4" id="b4" name="The questionnaire, forwardable">
      <template #why>
        B as one sheet with a "Copy as text" button. The manager's actual task is to put these answers into
        someone else's form, so the section does that for them. Twelve rows in two columns, with the sources
        named in the sheet header so the pasted text has a provenance.
      </template>
      <template #tradeoffs>
        A button in a trust section is unusual and has to work (clipboard access can be denied; the text stays on screen either way). One wide card instead of two.
      </template>
      <trust-b4 />
    </lab-direction>

    <lab-direction letter="C2" id="c2" name="Six facts in a grid">
      <template #why>
        C's headline facts moved into A's hairline grid: six cells, each an icon, a fact as the heading, one line
        and a link. One panel instead of two cards, and the infrastructure and standards facts sit side by side
        as equals rather than in separate boxes. The least text of the round at full information.
      </template>
      <template #tradeoffs>
        Loses C's grouping, so a reader cannot tell at a glance which three cells are security and which are compliance. The performance cell is the weakest fact and sits in the top row.
      </template>
      <trust-c2 />
    </lab-direction>
  </div>
</template>

<script setup lang="ts">
import LabDirection from "./LabDirection.vue";
import TrustA from "./TrustA.vue";
import TrustB from "./TrustB.vue";
import TrustC from "./TrustC.vue";
import TrustD from "./TrustD.vue";
import TrustE from "./TrustE.vue";
import TrustF from "./TrustF.vue";
import TrustG from "./TrustG.vue";
import TrustH from "./TrustH.vue";
import TrustI from "./TrustI.vue";
import TrustJ from "./TrustJ.vue";
import TrustK from "./TrustK.vue";
import TrustL from "./TrustL.vue";
import TrustM from "./TrustM.vue";
import TrustN from "./TrustN.vue";
import TrustO from "./TrustO.vue";
import TrustP from "./TrustP.vue";
import TrustQ from "./TrustQ.vue";
import TrustR from "./TrustR.vue";
import TrustS from "./TrustS.vue";
import TrustT from "./TrustT.vue";
import TrustU from "./TrustU.vue";
import TrustV from "./TrustV.vue";
import TrustW from "./TrustW.vue";
import TrustX from "./TrustX.vue";
import TrustY from "./TrustY.vue";
import TrustA2 from "./TrustA2.vue";
import TrustAB from "./TrustAB.vue";
import TrustAC from "./TrustAC.vue";
import TrustB2 from "./TrustB2.vue";
import TrustB3 from "./TrustB3.vue";
import TrustB4 from "./TrustB4.vue";
import TrustC2 from "./TrustC2.vue";
</script>

<style>

/* the lab's own notes: intro, inventory and persona cards; everything else on the page is homepage styling */

.trust-lab .lab-intro h1 {
  margin-bottom: 1rem;
}

.trust-lab .lab-lead {
  max-width: 820px;
  font-size: 1.125rem;
  line-height: 1.75rem;
  margin-bottom: 32px;
}

.trust-lab .lab-jump {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: -16px 0 32px;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.trust-lab .lab-jump a {
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

.trust-lab .lab-jump-sep {
  margin-left: 10px;
}

.trust-lab .lab-round {
  margin-top: 96px;
}

.trust-lab .lab-round .content {
  padding-top: 48px;
  padding-bottom: 0;
  border-top: 3px solid var(--vp-c-text-1);
}

.trust-lab .lab-round h2 {
  margin: 0 0 12px;
  font-size: 2rem;
  line-height: 2.5rem;
}

.trust-lab .lab-round p {
  margin: 0;
  max-width: 900px;
  font-size: 1.0625rem;
  line-height: 1.625rem;
  color: var(--vp-c-text-2);
}

.trust-lab .lab-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.trust-lab .lab-note {
  padding: 24px 28px;
  border: 1px dashed color-mix(in srgb, var(--vp-c-text-1) 30%, transparent);
  border-radius: 16px;
}

.trust-lab .lab-note-wide {
  margin-top: 24px;
}

.trust-lab .lab-note h3 {
  margin: 0 0 12px;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
}

.trust-lab .lab-note ul {
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.trust-lab .lab-note strong {
  color: var(--vp-c-text-1);
}

.trust-lab .lab-recommendation p {
  margin: 0;
  max-width: 900px;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.trust-lab .lab-personas {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  font-size: 0.9375rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.trust-lab .lab-personas em {
  display: block;
  margin-top: 8px;
}

@media screen and (max-width: 960px) {
  .trust-lab .lab-grid,
  .trust-lab .lab-personas {
    grid-template-columns: minmax(0, 1fr);
  }
}


/* Shared pieces the directions reuse: an icon box, the small standards badges, a hairline-divided grid */

.trust-lab .t-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: var(--home-surface-inner);
}

.trust-lab .t-icon i {
  font-size: 1.125rem;
  color: var(--vp-c-text-1);
}

.trust-lab .t-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.trust-lab .t-badge {
  display: inline-flex;
  align-items: center;
  padding: 7px 10px;
  line-height: 1;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 500;
  white-space: nowrap;
  color: var(--vp-c-text-2);
  background-color: var(--home-surface-inner);
}

.trust-lab .t-eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.trust-lab .t-link {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  text-decoration: none;
}

.trust-lab .t-link:hover {
  text-decoration: underline;
}

.trust-lab .t-muted {
  color: var(--vp-c-text-2);
}

</style>
