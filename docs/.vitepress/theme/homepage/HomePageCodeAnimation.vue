<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from "vue";
import {useData} from "vitepress";
import createCodeHighlighter from "./createCodeHighlighter";

const code = ref('');
const highlightedLines = ref<{start: number; end: number} | null>(null);
const highlightedCode = ref('');

const tutorialStepNumber = ref(1);
const imageIndex = ref(1);
const title = ref("");

const { isDark } = useData();


/* Code highlighting */

async function refreshHighlightedCode() {
  const codeHighlighter = await createCodeHighlighter();

    highlightedCode.value = codeHighlighter.codeToHtml(code.value, {
        lang: 'csharp',
        theme: isDark.value ? 'dark-plus' : 'light-plus',
        transformers: [
          {
            line(node, line) {
              node.properties['data-line'] = line

              if (highlightedLines.value && line >= highlightedLines.value.start && line <= highlightedLines.value.end)
                this.addClassToHast(node, 'line-highlighted')
            }
          }
        ]
    })
}

watch(code, refreshHighlightedCode)
watch(isDark, refreshHighlightedCode)

onMounted(() => {
  resetAnimation();
  refreshHighlightedCode();
});


/* Animation engine */

const animationSpeed = 50;
const waitSpeed = 2000;

async function appendText(position: number, text: string) {
  for (let letter of text) {
    code.value = code.value.slice(0, position) + letter + code.value.slice(position);
    position++;

    if (letter == '\n' && highlightedLines.value)
      highlightedLines.value = { start: highlightedLines.value.start, end: highlightedLines.value.end + 1 };

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

async function animate() {
  await new Promise(r => setTimeout(r, 1000));
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

  await waitAndProceedToNextStep("Celebrate your completed document! 🎉");
  await refreshHighlightedCode();
}


/* Animation control observer */
const observer = ref<IntersectionObserver | null>(null);
const isAnimationRunning = ref(false);

onMounted(() => {
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (isAnimationRunning.value || !entry.isIntersecting)
        return;

      isAnimationRunning.value = true;
      animate();
    });
  }, { threshold: 0.5 });

  const target = document.querySelector('#homepage-quick-start-animation');
  observer.value.observe(target);
});

onUnmounted(() => observer.value?.disconnect());

</script>

<template>
  <section class="content" id="homepage-quick-start-animation">
    <h2>Quick Start&nbsp;&nbsp;👋</h2>

    <p class="sub-header">
      Step {{ tutorialStepNumber }} / 14: <span class="highlight-background shine">{{ title }}</span>
    </p>

    <div class="animation-container">
      <div class="code-container" v-html="highlightedCode"></div>

      <img :src="'/homepage/quick-start-animation/step' + imageIndex + '.webp'" />
    </div>

    <a class="action primary" href="getting-started.html">Learn more</a>
  </section>
</template>

<style scoped>

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

.action {
  margin-top: 32px;
}

</style>