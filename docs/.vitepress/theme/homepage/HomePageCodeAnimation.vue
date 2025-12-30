<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {useData} from "vitepress";
import createCodeHighlighter from "./createCodeHighlighter";
import HomePageCodeContainer from "./HomePageCodeContainer.vue";
import HomePageWindowContainer from "./HomePageWindowContainer.vue";
import {ShikiTransformer} from "@shikijs/types";

const { isDark } = useData();

const showAnimation = ref(false);

function playAnimation() {
  showAnimation.value = true;
  animate();
}

const code = ref('');
const highlightedLines = ref<{start: number; end: number} | null>(null);

const tutorialStepNumber = ref(1);
const imageIndex = ref(1);
const title = ref("");




/* Code highlighting */

const codeTransformer = computed<ShikiTransformer>(() => {
  return {
    line(node, line) {
      node.properties['data-line'] = line

      if (highlightedLines.value && line >= highlightedLines.value.start && line <= highlightedLines.value.end)
        this.addClassToHast(node, 'line-highlighted')
    }
  };
})


/* Animation engine */

const isAnimationRunning = ref(false);

const animationSpeed = 75;
const waitSpeed = 3500;

async function waitForResume() {
  while (!isAnimationRunning.value) {
    await new Promise(r => setTimeout(r, 1000));
  }
}

async function appendText(position: number, text: string) {
  for (let letter of text) {
    code.value = code.value.slice(0, position) + letter + code.value.slice(position);
    position++;

    if (letter == '\n' && highlightedLines.value)
      highlightedLines.value = { start: highlightedLines.value.start, end: highlightedLines.value.end + 1 };

    await waitForResume();
    await new Promise(r => setTimeout(r, animationSpeed));
  }
}

async function appendTextAfter(after: string, text: string) {
  let position = code.value.indexOf(after) + after.length;
  await appendText(position, text);
}

async function appendTextInLine(lineNumber: number, text: string) {
  let position = code.value.split('\n').slice(0, lineNumber).join('\n').length;
  await appendText(position, text);
}

async function deleteText(deleteText: string) {
  await deleteTextAfter("", deleteText);
}

async function deleteTextAfter(afterText: string, deleteText: string) {
  const position = code.value.indexOf(afterText);
  const target = code.value.indexOf(deleteText, position);

  const before = code.value.slice(0, target);
  const after = code.value.slice(target + deleteText.length);

  for (let i = deleteText.length; i >= 0; i--) {
    code.value = before + deleteText.slice(0, i) + after;
    await waitForResume();
    await new Promise(r => setTimeout(r, animationSpeed));
  }
}

function highlightLine(lineNumber: number) {
  highlightedLines.value = { start: lineNumber, end: lineNumber };
}

function clearHighlight() {
  highlightedLines.value = null;
}

async function wait() {
  await waitForResume();
  await new Promise(r => setTimeout(r, waitSpeed));
}

async function waitAndProceedToNextStep(stepName: string) {
  imageIndex.value++;
  await wait();

  clearHighlight();
  title.value = stepName;
  tutorialStepNumber.value++;
}


/* Animation configuration */

const primaryAction = ref<HTMLAnchorElement | null>(null);

function resetAnimation() {
  const startCode = 'Document\n' +
    '\t.Create(document =>\n' +
    '\t{\n' +
    '\t\tdocument.Page(page =>\n' +
    '\t\t{\n' +
    '\t\t\tpage.Size(PageSizes.Postcard);\n' +
    '\t\t});\n' +
    '\t})\n' +
    '\t.GeneratePdfAndShow();'

  code.value = startCode;
  title.value = "Start with a blank document";
  clearHighlight();
}

function scrollToPrimaryActionButton() {
  if (primaryAction.value) {
    primaryAction.value.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });

    primaryAction.value.classList.add("highlight");
  }
}

async function animate() {
  await waitForResume();
  await new Promise(r => setTimeout(r, waitSpeed));
  tutorialStepNumber.value++;

  title.value ="Insert an element with a solid background";
  await appendTextInLine(6, "\n\n");
  highlightLine(8);
  await appendTextInLine(8, "\t\t\tpage.Content()\n\t\t\t\t.Background(Colors.LightBlue.Lighten3);");

  await waitAndProceedToNextStep("Set the page margins");
  await appendTextInLine(6, "\n");
  highlightLine(7);
  await appendTextInLine(7, "\t\t\tpage.Margin(0.3f, Unit.Inch);");

  await waitAndProceedToNextStep("Add a header with text");
  await appendTextInLine(7, "\n\n");
  highlightLine(9);
  await appendTextInLine(9, "\t\t\tpage.Header()\n\t\t\t\t.Text(\"Hello PDF!\");");

  await waitAndProceedToNextStep("Style the header text");
  highlightLine(11);
  await deleteTextAfter(".Text(\"Hello PDF!\");", ";");
  await appendTextAfter(".Text(\"Hello PDF!\")", "\n");
  highlightLine(11);
  await appendTextInLine(11, "\t\t\t\t.FontSize(28)\n\t\t\t\t.Bold()\n\t\t\t\t.FontColor(Colors.Blue.Darken2);");

  await waitAndProceedToNextStep("Insert a footer");
  await appendTextInLine(16, "\n\n");
  highlightLine(18);
  await appendTextInLine(18, "\t\t\tpage.Footer()\n\t\t\t\t.Text(\"Footer!\");");

  await waitAndProceedToNextStep("Center-align the footer");
  await appendTextAfter("page.Footer()", "\n");
  highlightLine(19);
  await appendTextInLine(19, "\t\t\t\t.AlignCenter()");

  await waitAndProceedToNextStep("Include a page number in the footer");
  highlightLine(20);
  await deleteText(".Text(\"Footer!\");")
  await appendTextAfter(".AlignCenter()\n", "\t\t\t\t.Text(text => \n\t\t\t\t{\n \n \n\t\t\t\t});");
  await appendTextInLine(22, "\t\t\t\t\ttext.Span(\"Page \");");
  await appendTextInLine(23, "\t\t\t\t\ttext.CurrentPageNumber();");

  await waitAndProceedToNextStep("Adjust the spacing between content sections");
  await appendTextAfter(".Content()", "\n");
  highlightLine(16);
  await appendTextInLine(16, "\t\t\t\t.PaddingVertical(8)");

  await waitAndProceedToNextStep("Add placeholder text");
  highlightLine(17);
  await deleteText(".Background(Colors.LightBlue.Lighten3);");
  await appendTextInLine(17, ".Column(column => \n\t\t\t\t{\n \n\t\t\t\t});");
  await appendTextInLine(19, "\t\t\t\t\tcolumn.Item()\n\t\t\t\t\t\t.Text(Placeholders.LoremIpsum());");

  await waitAndProceedToNextStep("Justify the placeholder text");
  await deleteTextAfter(".Text(Placeholders.LoremIpsum())", ";");
  await appendTextInLine(20, "\n");
  highlightLine(21);
  await appendTextInLine(21, "\t\t\t\t\t\t.Justify();");

  await waitAndProceedToNextStep("Insert a placeholder image");
  await appendTextInLine(21, "\n\n");
  highlightLine(23);
  await appendTextInLine(23, "\t\t\t\t\tcolumn.Item()\n\t\t\t\t\t\t.AspectRatio(16 / 9f)\n\t\t\t\t\t\t.Image(Placeholders.Image);");

  await waitAndProceedToNextStep("Adjust spacing between the text and image");
  await appendTextInLine(18, "\n \n");
  highlightLine(19);
  await appendTextInLine(19, "\t\t\t\t\tcolumn.Spacing(8);");

  await waitAndProceedToNextStep("Celebrate your completed document!  🎉");

  await new Promise(r => setTimeout(r, waitSpeed));
  scrollToPrimaryActionButton();
}


/* Animation control observer */
const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isAnimationRunning.value = entry.isIntersecting;
    });
  }, { threshold: 0.5 });

  const target = document.querySelector('#homepage-quick-start-animation');
  observer.value.observe(target);
});

onUnmounted(() => observer.value?.disconnect());

</script>

<template>
  <section class="content" id="homepage-quick-start-animation">
    <div>
      <h2 id="introduction">Get Started in Minutes</h2>

      <p class="sub-header" style="max-width: 900px;">
        Follow a short, step-by-step demo: create a document structure, plug in your data, and generate consistent PDF output using the C# Fluent API.
      </p>

      <a v-if="!showAnimation" class="action primary" @click="playAnimation" style="display: flex; flex-direction: row; gap: 16px; width: fit-content; padding: 4px 20px;">
        Watch tutorial
        <div style="border-left: 1px solid #FFF8; margin: 8px 0;"></div>
        <span style="font-weight: 400;">~90 sec</span>
      </a>
    </div>

    <template v-if="showAnimation">
      <p class="sub-header" style="display: flex; flex-direction: row; align-items: center; gap: 16px;">
        <span class="highlight-background shine">{{ title }}</span>
      </p>

      <div class="animation-container">
        <home-page-code-container file-name="HelloWorld.cs" :code="code" :code-transformer="codeTransformer" />

        <home-page-window-container file-name="Preview.pdf">
          <img :src="'/homepage/quick-start-animation/step' + imageIndex + '.webp'" />
        </home-page-window-container>
      </div>
    </template>
  </section>
</template>

<style scoped>

.tutorial-section {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.tutorial-alert {

  border: 1px solid #2196F3;
  filter: drop-shadow(0 16px 16px #2196F322) !important;
}

.action.primary {
  background-color: #2196F3;
}


.animation-container {
  display: grid;
  grid-gap: 48px;
  grid-template-columns: 1fr 400px;
  justify-self: center;
  width: 100%;
}

@media screen and (max-width: 1000px) {
  .animation-container {
    grid-template-columns: 1fr 300px;
    grid-gap: 24px;
  }
}

@media screen and (max-width: 700px) {
  .animation-container {
    grid-template-columns: 1fr;
    grid-gap: 32px;
  }
}

.animation-container > * {
  border-radius: 12px;
  filter: drop-shadow(0 4px 8px #0002);
}

html.dark img {
  opacity: 0.8;
}


/* Loading icon */

@keyframes loading-icon-animation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loading-icon {
  height: 24px;
  display: inline-block;
  transform-origin: center center;
  animation: loading-icon-animation 1s linear infinite;
}


/* Highlight CTA button */

@keyframes highlight-cta-animation {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.action.primary {
  margin-top: 32px;
  scroll-margin-block-end: 128px;
}

.action.primary.highlight {
  box-shadow: var(--elevation);
  animation: highlight-cta-animation 1s ease-in-out alternate;
  animation-delay: 1s;
  animation-iteration-count: 5;
}

</style>