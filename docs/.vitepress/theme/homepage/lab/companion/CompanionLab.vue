<template>
  <!-- Lab page, not linked from anywhere: five directions for the homepage Companion App section, which
       today shares its skeleton with the quick start panel right above it. The quick start renders
       first for context, then round four (I5), round three (I2-I4), round two (C2, F-J) and round one
       (today, A-E). `?only=<id>` (0, a-e, c2, f-j, i2-i5, i5l) shows the quick start and one direction.
       Delete this folder and docs/companion-lab.md once a direction ships. -->
  <div class="custom-page home-page textured-page companion-lab">
    <div v-if="!only" class="container">
      <section class="content lab-intro">
        <h1>Companion App lab</h1>
        <p class="lab-lead">
          The Companion App section reads like a second copy of the code card above it. Round one tried five ways out (A–E).
          Round two started from the feedback (B and D the favourites, C in one card); round three redesigns I, whose idea was
          liked but not its look. The quick start renders first so each direction can be judged where it will sit.
        </p>
        <p class="lab-jump">
          Round four
          <a href="#companion-i5" class="wide">I5</a>
          <a href="#companion-i5l" class="wide">I5L</a>
          <span class="lab-jump-gap"></span>
          Round three
          <a v-for="id of ['I2', 'I3', 'I4']" :key="id" :href="`#companion-${id.toLowerCase()}`" class="wide">{{ id }}</a>
          <span class="lab-jump-gap"></span>
          Round two
          <a v-for="id of ['C2', 'F', 'G', 'H', 'I', 'J']" :key="id" :href="`#companion-${id.toLowerCase()}`" :class="{ wide: id.length > 1 }">{{ id }}</a>
          <span class="lab-jump-gap"></span>
          Round one
          <a v-for="id of ['0', 'A', 'B', 'C', 'D', 'E']" :key="id" :href="`#companion-${id.toLowerCase()}`">{{ id }}</a>
          <span class="lab-jump-hint">or open <code>?only=f</code> to see one direction under the quick start</span>
        </p>

        <h2 class="lab-round">Round four: the spotlight tour, nine views</h2>

        <div class="lab-grid">
          <div class="lab-note">
            <h3>What changed from I3</h3>
            <ul>
              <li><strong>Nine views, one at a time</strong>, as asked: the whole app, document hierarchy, selected element, magnify, check position, measure, search, layout debugging, exception debugging.</li>
              <li><strong>The whole app is shown evenly lit</strong> first; every other view gets its own spotlight size and a card placed by hand on each screen so it covers nothing the view is about.</li>
              <li><strong>A list of the nine views beside the app</strong> replaces the four pills: as tall as the app, labelled with what the reader can do (See changes live, Browse the structure, Inspect any element...) while the card names the feature; the current one in the brand colour (no rails). On the right in I5, on the left in I5L. The group headings over an earlier stepper were dropped on request; the cards still name each view's group.</li>
              <li>Measure shows both screens (vertical and horizontal). The cards show the app's shortcuts, but the page does not listen to the keyboard.</li>
            </ul>
          </div>

          <div class="lab-note">
            <h3>New copy to confirm</h3>
            <ul>
              <li>Nine short titles and one-line descriptions, written from the features page (docs/companion/features.md); the existing lines "Save your code and the preview refreshes in place" and "jump to its code in your IDE" are kept inside them.</li>
              <li>Shortcuts shown, all from the features page: Ctrl W (hierarchy), Ctrl Click (go to code), 1, 2, 3 and 4, Ctrl F (search), ↑ ↓ (layout issues). Ctrl W and Ctrl F are shown, never intercepted.</li>
              <li>The search view uses the search screenshot, which no earlier direction showed.</li>
            </ul>
          </div>
        </div>

        <h2 class="lab-round">Round three: live shortcuts, redesigned</h2>

        <div class="lab-grid">
          <div class="lab-note">
            <h3>What stays from I, what was wrong with it</h3>
            <ul>
              <li><strong>Stays</strong>: the idea. Picking a capability shows it working in the real app, Magnify and measure steps through 1, 2, 3 and 4 as in the app, and the digit keys on the reader's own keyboard do the same while the section is on screen.</li>
              <li><strong>Wrong</strong>: the dark stage (now the normal surfaces, the app in the reader's theme); a small screenshot beside a dense column (now the app is the largest thing in every design); a faint active state (now the selected capability is unmistakable and tied to the picture); the bare 1–4 (now every screen is named: Magnifier, Coordinates, Vertical and Horizontal distance).</li>
              <li><strong>Added</strong>: the exception screenshot, so Exception and layout debugging shows both halves of its name. Eight screens in all.</li>
              <li>All three share one engine (shortcutTour.ts): a timer that keeps its place across pauses, pauses off screen, in a hidden tab, under the pointer or focus, and under reduced motion; plain digits only, never arrows or Ctrl/Cmd combinations.</li>
              <li><strong>Heights at 1440px</strong>: today 714, I 705, I2 947, I3 970, I4 987.</li>
            </ul>
          </div>

          <div class="lab-note">
            <h3>Three ways to drive the same tour</h3>
            <ul>
              <li><strong>I2 · Window tabs</strong>: the capabilities are folder tabs on a frame around the app; under it, the explanation and the screens as labelled pills. The most familiar control on the web.</li>
              <li><strong>I3 · Spotlight tour</strong>: a spotlight moves to the part of the app that matters and a callout card names it, B's annotation made live. Step pills under the app.</li>
              <li><strong>I4 · Key deck</strong>: real-looking key caps under the app, one group per capability with its name and explanation; they press down when you press the digit on your keyboard. D's key caps made tactile.</li>
            </ul>
          </div>
        </div>

        <div class="lab-note lab-note-wide lab-recommendation">
          <h3>Round three recommendation</h3>
          <p class="lab-para">
            <strong>I4 · Key deck</strong>. It is the only one of the three where all four names and explanations stay readable at
            once, which has been the test in every round, and it makes the shortcuts the hero: pressing 3 on your keyboard and
            watching the cap go down while the app changes is the moment people remember. Runner-up: <strong>I3 · Spotlight tour</strong>,
            the most guided (it tells you where to look on every screen) and the closest to B. <strong>I2</strong> is the safe,
            conventional one. All three are about 230–270px taller than today's section, because the app is the largest thing in them.
          </p>
        </div>

        <h2 class="lab-round">Round two</h2>

        <div class="lab-grid">
          <div class="lab-note">
            <h3>What carried over from round one</h3>
            <ul>
              <li><strong>From B</strong>: the app as a labelled figure. Callouts tied to the real UI, detail views of what the main screenshot cannot show, the precision of a technical drawing.</li>
              <li><strong>From D</strong>: the dark stage that makes the app look like a product, the mirrored layout, the rows divided by hairlines and the shortcuts as key caps.</li>
              <li><strong>From C</strong>: legible crops of the real app, one per capability; now in one card with hairlines between them (C2).</li>
              <li>Each new direction pushes one of these somewhere it has not been yet, rather than re-skinning it. Copy, calls to action and screenshots stay as in round one.</li>
              <li><strong>Heights at 1440px</strong>: today 714, C2 628, F 767, G 940, H 657, I 705, J 843. B and D were checked pixel for pixel and are unchanged.</li>
            </ul>
          </div>

          <div class="lab-note">
            <h3>Brainstorm: twelve ideas, five kept</h3>
            <ul>
              <li><strong>Kept · F Night drawing</strong>: B's figure on D's stage, with the shortcuts in the callouts and hover tying each callout to its spot.</li>
              <li><strong>Kept · G Engineering sheet</strong>: B as a real drawing sheet: grid, balloons, a dimension line, detail views, a parts list, a title block.</li>
              <li><strong>Kept · H Exploded view</strong>: the app taken apart into its layers in 3D, each layer one capability.</li>
              <li><strong>Kept · I Live shortcuts</strong>: D's rows drive the screenshot, and the digit keys work on the reader's own keyboard.</li>
              <li><strong>Kept · J Session log</strong>: a session told as a log with a crop per entry; C2's one card, read downwards.</li>
              <li><strong>Dropped</strong>: a one-page product data sheet (G's idea, less precise); a command palette (I's mechanics, a UI the app does not have); a magnifier lens under the pointer (hides the four names, no hover on touch); a <code>dotnet watch</code> terminal (a code window by another name); a before/after slider (no before/after pair of one document exists); the panel as one big app window (the code card is already a window); a film strip of all twelve screenshots (too much to read).</li>
            </ul>
          </div>
        </div>

        <div class="lab-note lab-note-wide lab-recommendation">
          <h3>Round two recommendation</h3>
          <p class="lab-para">
            <strong>F · Night drawing</strong>. It is the two favourites in one and loses nothing from either: B's figure and
            callouts, D's stage and key caps. It answers the programmer (where is it, how do I call it) and the buyer (it looks
            like a product) in the same glance, and hover adds a little life without hiding anything. Runner-up:
            <strong>G · Engineering sheet</strong>, the most original and the most QuestPDF (a drawing sheet for a document tool,
            a blueprint in dark mode), if its decoration is welcome; drop the grid and zone markers first if it feels busy.
            <strong>C2</strong> is the calm choice and the shortest (628px). <strong>I</strong> is the one to pick if the section
            should be something to play with.
          </p>
        </div>

        <h2 class="lab-round">Round one</h2>

        <div class="lab-grid">
          <div class="lab-note">
            <h3>Why it reads like the code card</h3>
            <ul>
              <li><strong>Same skeleton.</strong> One white panel, the title inside it at the top left, a text column on the left and a window on the right. The code window and the app window even have the same proportions.</li>
              <li><strong>Same list.</strong> Since 14 October the capabilities use the quick start's <code>.notes</code> list: icon tile, bold name, explanation, 32px apart.</li>
              <li><strong>Same position for the header.</strong> Both open with a 1.5rem title in the panel's corner.</li>
              <li>Every direction below changes at least two of these three: the skeleton, the list treatment and where the header sits.</li>
              <li><strong>Heights at 1440px</strong>: today 714, A 902, B 768, C 754, D 693, E 833 (pixels, the section's surfaces only).</li>
            </ul>
          </div>

          <div class="lab-note">
            <h3>What stays in every direction</h3>
            <ul>
              <li><strong>The copy</strong>: title, description, the four capabilities with their explanations.</li>
              <li><strong>The calls to action</strong>: Explore features, the Download menu (four packages of {{ version }} and All versions), Free on Windows, macOS and Linux.</li>
              <li><strong>Real screenshots only</strong>, the ones in <code>public/companion/</code>, in both themes. Crops are CSS windows onto them; no new assets.</li>
              <li><strong>Added facts</strong> come from the docs: the keyboard shortcuts in D (features page), Visual Studio, Rider and <code>dotnet watch</code> in E (usage page). No privacy or performance claims.</li>
            </ul>
          </div>
        </div>

        <div class="lab-note lab-note-wide">
          <h3>Who reads it, and what they look for</h3>
          <ul>
            <li><strong>Programmer</strong>: what the tool looks like, how short the loop really is, whether it works with their IDE. Shown best by the app itself and by the shortcuts (B, D, E).</li>
            <li><strong>Team lead or enterprise buyer</strong>: that it is a real, maintained desktop product on all three platforms, free, with versioned releases. Shown by a calm, product-grade presentation (A, C).</li>
            <li><strong>Everyone</strong>: four names to scan in a few seconds. Every direction keeps the four names as the first thing read after the title.</li>
          </ul>
        </div>

        <div class="lab-note lab-note-wide lab-recommendation">
          <h3>Round one recommendation</h3>
          <p class="lab-para">
              <strong>A · Product stage</strong>. It changes all three things the two sections share: the header moves onto the canvas, the
              list becomes a hairline row with no icon tiles, and the app gets the full width and rises out of the panel instead of
              sitting in a column. It keeps today's tone (same surfaces, same screenshot, same calls to action). One conflict to decide:
              its header sits on the canvas, and the page dropped canvas headers below the hero; if that rule stands, the same panel
              with the title and lead moved inside it, above the row, keeps the rest of A. Runner-up: <strong>B · Annotated drawing</strong>, the most "show, don't tell" option and the
              most QuestPDF-like (callouts and detail views, like the app's own measuring tools), at the cost of more parts to
              maintain. <strong>C</strong> shows the most of what the app does, but adds five more cards to a page that already has
              cards above and below. <strong>D</strong> is the boldest and only right if the page should have one dark moment.
            </p>
        </div>
      </section>
    </div>

    <!-- context: the section that sits right above -->
    <div class="container lab-context-note">
      <div class="content">
        <span class="lab-context-label">Context · the quick start panel, which sits right above the Companion App section</span>
      </div>
    </div>
    <div class="container">
      <HomePageQuickStart />
    </div>

    <lab-direction v-if="show('i5')" letter="I5" id="companion-i5" name="Spotlight tour, nine views" :dots="false">
      <template #why>The tour shows the app the way a new user would explore it: first the whole app, then one part at a time, with a spotlight on the part and a card that names it, explains it in one line and shows its shortcut. Everything else sits in one column beside the app: the title and description, the nine views labelled with what you can do, and the calls to action. One row, no header or footer band.</template>
      <template #tradeoffs>648px, about 65px shorter than today (1018px when it had a header and a stepper under the app). The "Free on Windows, macOS, Linux" line was removed on request; the platforms remain in the Download menu. The list on the right reads after the app, the natural order for a tour (look, then pick). Nine views at about four seconds each make a 38-second loop; most readers will see a few and click the rest. Card positions are set per screenshot and need re-checking whenever a screenshot changes. Below 1200px it stacks (title, app, views as a 3×3 grid, actions); below 1040px the card sits under the app too.</template>
      <CompanionI5 />
    </lab-direction>

    <lab-direction v-if="show('i5l')" letter="I5L" id="companion-i5l" name="Spotlight tour, list on the left" :dots="false">
      <template #why>The same tour with the list on the left: the views read first, like a table of contents, and the app answers on the right. The most familiar layout for navigation.</template>
      <template #tradeoffs>With the title, the list and the buttons all in the left column, this is now the quick start's shape (text left, window right) right above it, which is what the whole lab set out to avoid. Same height and breakpoints as I5.</template>
      <CompanionI5 nav="left" />
    </lab-direction>

    <div v-if="!only" class="container lab-round-divider">
      <div class="content">
        <h2 class="lab-round">Round three</h2>
      </div>
    </div>

    <lab-direction v-if="show('i2')" letter="I2" id="companion-i2" name="Window tabs" :dots="false">
      <template #why>The familiar control: four folder tabs on a frame around a large app, the selected one joined to the frame with a progress line along its top and its keys pressed. Under the frame, the selected capability's explanation and its screens as pills, each with its key: "1 Magnifier", "2 Coordinates"... so the digits explain themselves, and the two debugging screens (layout error, exception) can be picked too.</template>
      <template #tradeoffs>947px, about 230px taller than today. Only the selected capability's explanation is visible at a time; the other three show their names and keys. The app is cropped at the bottom (1.62:1) to keep the height down. Below 900px the tabs become a grid of buttons above the frame.</template>
      <CompanionI2 />
    </lab-direction>

    <lab-direction v-if="show('i3')" letter="I3" id="companion-i3" name="Spotlight tour" :dots="false">
      <template #why>The tour tells you where to look. A soft spotlight glides to the part of the app each screen is about (the refreshed page, the selected element, the lens, the coordinates, the measurement, the error) with a marker on it, and a callout card beside it gives the name, the explanation and the keys. B's annotation, live. Step pills under the app drive it.</template>
      <template #tradeoffs>970px, about 255px taller than today. The spotlight dims the rest of the app, so the screenshot is never seen evenly lit. The card covers part of the app (it moves to the side with more room). Only the selected capability's explanation is visible. Below 900px the card sits under the app.</template>
      <CompanionI3 />
    </lab-direction>

    <lab-direction v-if="show('i4')" letter="I4" id="companion-i4" name="Key deck" :dots="false">
      <template #why>D's key caps made real: an inset deck of key caps the app stands on, one group per capability with its name and explanation always visible. The caps are buttons; the selected group lights up in the brand colour, the screen it shows is named under it, and pressing a digit on your keyboard presses the matching cap on screen. Memorable, and it speaks to programmers before they read a word.</template>
      <template #tradeoffs>Hot reload shows Ctrl S (saving is what triggers it in Visual Studio's Hot Reload on Save and in dotnet watch; Rider applies changes with Alt F10), which D showed as dotnet watch. On macOS saving is Cmd S, so a neutral "Save" cap may be the better label. The caps are decorative for Ctrl S and Ctrl Click: clicking them picks the capability, and the real shortcuts are never intercepted. 987px, about 270px taller than today; the app is cropped at the bottom (1.7:1). On phones the four groups stack and the section gets long.</template>
      <CompanionI4 />
    </lab-direction>

    <div v-if="!only" class="container lab-round-divider">
      <div class="content">
        <h2 class="lab-round">Round two</h2>
      </div>
    </div>

    <lab-direction v-if="show('c2')" letter="C2" id="companion-c2" name="Contact sheet (C in one card)" :dots="false">
      <template #why>C's crops, as asked: one card, hairlines between the parts. A header band on top (title and lead left, calls to action right), then the four capabilities as one row of cells, each opening on its crop edge to edge with the name and explanation under it. One surface between the quick start and the trust cards instead of five.</template>
      <template #tradeoffs>One card divided by hairlines is also the quick start's structure; the header band on top and the four equal cells keep the two apart (the quick start splits into text left, code right). The cells are about 340px wide at 1440px; below a 1300px window they go 2×2 so the text in the crops stays legible.</template>
      <CompanionC2 />
    </lab-direction>

    <lab-direction v-if="show('f')" letter="F" id="companion-f" name="Night drawing" :dots="false">
      <template #why>The two favourites in one: B's annotated figure on D's dark stage. The callouts carry D's shortcuts as key caps, so a programmer gets where it is and how to call it in one glance. Point at a callout, a pin or an inset and that pair lights up while the rest steps back. The app and the insets use their dark theme on the stage in both page themes.</template>
      <template #tradeoffs>The busiest of the dark options: four callouts, four sets of keys, two insets. Like B it needs a 1300px window for the gutters; below that the callouts become a numbered list with the keys. Hover is a bonus, not needed to read it.</template>
      <CompanionF />
    </lab-direction>

    <lab-direction v-if="show('g')" letter="G" id="companion-g" name="Engineering sheet" :dots="false">
      <template #why>B's drawing language taken all the way: the panel becomes a drawing sheet with a faint drafting grid and zone markers (a blueprint in dark mode). The main view has balloons, a dimension line across the page (595 pt: QuestPDF's default A4, which the app's own 495 × 742 content size confirms) and detail circles A and B, drawn larger below. The capabilities are the parts list with their keys; price, version and platforms sit in a title block. Precise, a little playful, and unmistakably about documents.</template>
      <template #tradeoffs>The tallest of round two (940px, about 225px more than today) and the most decoration of all eleven: grid, frame, zones, dimension, circles. All of it is kept faint, but it is the direction most likely to feel busy; the grid and zone markers are the first things to drop. "Free on Windows, macOS, Linux" becomes the title block's Price and Platforms cells. Below 760px the balloons move onto their parts.</template>
      <CompanionG />
    </lab-direction>

    <lab-direction v-if="show('h')" letter="H" id="companion-h" name="Exploded view" :dots="false">
      <template #why>The app taken apart: the preview page and the tree float above the screenshot, with the magnifier and a layout-error banner higher still, each numbered like the rows beside it. Point at the stage and the parts drop back into place and the app turns to face you; point at a row and its layer lifts. The 3D stays in the picture, the words never skew, and the layout is D's (picture left, rows right) on the normal surface.</template>
      <template #tradeoffs>The app is never seen flat until the pointer finds it, and its text is unreadable while exploded: the picture sells, the rows explain. The most fragile to build (3D transforms, layer coordinates). Phones get the flat screenshot and the numbered rows.</template>
      <CompanionH />
    </lab-direction>

    <lab-direction v-if="show('i')" letter="I" id="companion-i" name="Live shortcuts" :dots="false">
      <template #why>D, working. The rows are buttons and the selected one picks the screenshot and presses its keys; Magnify and measure steps through 1, 2, 3 and 4 (magnifier, coordinates, vertical and horizontal measuring), and while the section is on screen the digit keys on your own keyboard do the same, as they do in the app. Hot reload passes a refresh down the page. It shows seven real screenshots where D shows one.</template>
      <template #tradeoffs>A revisit of the 14 October switcher (which cycled from a left-hand list): an auto-advancing tour hides six of the seven screens at any moment. It pauses off screen, in a hidden tab, while hovered or focused, and never runs under reduced motion. Only plain digits are listened to, never arrows or Ctrl/Cmd combinations; touch screens get the buttons and no keyboard hint. Seven screenshots load instead of one.</template>
      <CompanionI />
    </lab-direction>

    <lab-direction v-if="show('j')" letter="J" id="companion-j" name="Session log" :dots="false">
      <template #why>The easiest to read: one card, four entries down a timeline, each with its name, its explanation, a monospaced line of what happened and a crop that shows it. The events use what is actually in the screenshots (AddressComponent, the 50 pt page margin, Layout error 1 / 3 with Row as the root cause), so it reads like a real session rather than a feature list.</template>
      <template #tradeoffs>Taller than today (843px, about 130px more), since it reads downwards. The event lines are new copy (about four words each). The quietest option: no dark stage, no animation.</template>
      <CompanionJ />
    </lab-direction>

    <div v-if="!only" class="container lab-round-divider">
      <div class="content">
        <h2 class="lab-round">Round one</h2>
      </div>
    </div>

    <lab-direction v-if="show('0')" letter="0" id="companion-0" name="Today" :dots="false">
      <template #why>The current section, for reference. A clear, calm panel: title and lead, four capabilities, the app on the right, the calls to action along the bottom.</template>
      <template #tradeoffs>Right under the quick start the two panels read as one template used twice: same panel, same corner title, same icon-tile list, text left and window right.</template>
      <HomePageCompanion />
    </lab-direction>

    <lab-direction v-if="show('a')" letter="A" id="companion-a" name="Product stage">
      <template #why>The header moves onto the canvas like a section header, so the section opens differently from the quick start. The four capabilities become one hairline-divided row (the house "name + description" style, no icon tiles), and the app takes the full width, rising out of the panel's bottom edge: a product shot, not a column.</template>
      <template #tradeoffs>About 190px taller than today. It brings back a header on the canvas, which the page dropped below the hero (the sections now open inside their surfaces, with dotted seams between them); A would be the only one. The bottom half of the screenshot is cut by the panel edge on purpose; the tree and the page header carry the shot. The calls to action sit above the panel, so the first thing under the screenshot is the next section.</template>
      <CompanionA />
    </lab-direction>

    <lab-direction v-if="show('b')" letter="B" id="companion-b" name="Annotated drawing" :dots="false">
      <template #why>The app becomes a labelled figure: each capability is a callout joined to the part of the UI that does it, and the two features not visible on the main screenshot get detail insets cropped from their own screenshots (layout error, measurement). Programmers see where things are before they install it; the drawing style echoes the app's own measuring tools.</template>
      <template #tradeoffs>The most parts to maintain: pin positions are fractions of the screenshot and need re-checking when it changes. The gutters need a 1300px window; below that (so on most 1280px laptops) the leaders go and the callouts become a numbered list under the figure. The header band puts the calls to action at the top right, away from where today's footer is.</template>
      <CompanionB />
    </lab-direction>

    <lab-direction v-if="show('c')" letter="C" id="companion-c" name="Bento of real crops" :dots="false">
      <template #why>No panel: five cards. Each capability opens on the part of the app that does it, zoomed until its text is legible: the refreshed page, the selected element in the tree, a measurement, a layout error. The intro card carries the title and the calls to action. Hot reload, the headline feature, gets the wide card; hovering it sweeps a refresh down the page.</template>
      <template #tradeoffs>The full app is never shown whole, only in parts. Five surfaces instead of one sit between the quick start panel and the trust cards, which are cards too. The crops load four full screenshots (about 330KB per theme); production would export the crops at 2x instead.</template>
      <CompanionC />
    </lab-direction>

    <lab-direction v-if="show('d')" letter="D" id="companion-d" name="Spotlight with shortcuts" :dots="false">
      <template #why>One dark stage in both themes, the app in its dark theme with a blue glow: the moment the page shows a product rather than a library. The layout is mirrored (app left, text right) and the capabilities are hairline rows with the documented shortcuts as key caps: <code>dotnet watch</code>, Ctrl + Click, 1–4, ↑ ↓. Programmers read key caps faster than sentences.</template>
      <template #tradeoffs>The only dark surface on a quiet, light page; it will pull the eye harder than anything else below the hero. Bare key caps (1 2 3 4) need their tooltip to explain themselves. Mirroring alone would not be enough; it is the stage and the rows that break the likeness.</template>
      <CompanionD />
    </lab-direction>

    <lab-direction v-if="show('e')" letter="E" id="companion-e" name="The loop" :dots="false">
      <template #why>The description says "shorten the loop between writing code and seeing the result", so this direction draws the loop: your editor on the left (a skeleton, no code), the app on the right, and the capabilities as the traffic between them. A save crosses to the app and the page refreshes; a click crosses back and a line in the editor lights up. Visual Studio, Rider and <code>dotnet watch</code> are named, so the reader knows it fits their setup.</template>
      <template #tradeoffs>The four capabilities are no longer a list in the original order: three are arrows, Magnify and measure becomes the app's caption. The editor card is a skeleton on purpose, a second code window would bring back the likeness. The animation needs a production pass (the cycle runs in CSS while the diagram is on screen).</template>
      <CompanionE />
    </lab-direction>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import LabDirection from "../LabDirection.vue";
import HomePageQuickStart from "../../HomePageQuickStart.vue";
import HomePageCompanion from "../../HomePageCompanion.vue";
import CompanionA from "./CompanionA.vue";
import CompanionB from "./CompanionB.vue";
import CompanionC from "./CompanionC.vue";
import CompanionD from "./CompanionD.vue";
import CompanionE from "./CompanionE.vue";
import CompanionC2 from "./CompanionC2.vue";
import CompanionF from "./CompanionF.vue";
import CompanionG from "./CompanionG.vue";
import CompanionH from "./CompanionH.vue";
import CompanionI from "./CompanionI.vue";
import CompanionJ from "./CompanionJ.vue";
import CompanionI2 from "./CompanionI2.vue";
import CompanionI3 from "./CompanionI3.vue";
import CompanionI4 from "./CompanionI4.vue";
import CompanionI5 from "./CompanionI5.vue";
import { version } from "./companion";

/* ?only=<id> renders the quick start and that one direction */
const only = ref<string | null>(null);

onMounted(() => {
  only.value = new URLSearchParams(window.location.search).get("only")?.toLowerCase() ?? null;
});

function show(id: string) {
  return !only.value || only.value === id;
}
</script>

<style>

.companion-lab .lab-intro {
  align-items: stretch;
}

.companion-lab .lab-intro h1 {
  margin-bottom: 1rem;
}

.companion-lab .lab-lead {
  max-width: 820px;
  font-size: 1.125rem;
  line-height: 1.75rem;
  margin-bottom: 32px;
}

.companion-lab .lab-jump {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: -16px 0 32px;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.companion-lab .lab-jump a {
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

.companion-lab .lab-jump a.wide {
  width: auto;
  padding: 0 8px;
}

.companion-lab .lab-jump-gap {
  width: 16px;
}

.companion-lab .lab-jump-hint {
  margin-left: 10px;
}

.companion-lab .lab-round {
  margin: 40px 0 20px;
  font-size: 1.5rem;
  line-height: 2rem;
}

.companion-lab .lab-round-divider {
  margin-top: 96px;
}

.companion-lab .lab-round-divider .lab-round {
  margin: 0;
}

.companion-lab .lab-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.companion-lab .lab-note {
  padding: 24px 28px;
  border: 1px dashed color-mix(in srgb, var(--vp-c-text-1) 30%, transparent);
  border-radius: 16px;
}

.companion-lab .lab-note-wide {
  margin-top: 24px;
}

.companion-lab .lab-note h3 {
  margin: 0 0 12px;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
}

.companion-lab .lab-note ul {
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.companion-lab .lab-note strong {
  color: var(--vp-c-text-1);
}

.companion-lab .lab-para {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.companion-lab .lab-recommendation {
  border-style: solid;
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 45%, transparent);
}

.companion-lab .lab-context-note .content {
  padding-bottom: 0 !important;
}

.companion-lab .lab-context-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

@media screen and (max-width: 768px) {
  .companion-lab .lab-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

</style>
