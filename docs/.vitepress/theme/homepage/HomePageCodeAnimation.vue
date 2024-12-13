<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useData} from "vitepress";
import createCodeHighlighter from "./createCodeHighlighter";

const code = ref('');
const highlightedLines = ref<{start: number; end: number} | null>(null);
const highlightedCode = ref('');

const stepImageIndex = ref(1);
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
  refreshHighlightedCode();
  animate();
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


/* Animation configuration */

async function animate() {
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

  title.value = "Begin with a blank document";
  clearHighlight();
  await wait();

  title.value = "Add element with solid background";
  clearHighlight();
  await appendTextInLine(6, "\n\n");
  highlightLine(8);
  await appendTextInLine(8, "\t\t\tpage.Content()\n\t\t\t\t.Background(Colors.LightBlue.Lighten3);");
  stepImageIndex.value++;
  await wait();

  title.value = "Adjust page's margin";
  clearHighlight();
  await appendTextInLine(6, "\n");
  highlightLine(7);
  await appendTextInLine(7, "\t\t\tpage.Margin(0.3f, Unit.Inch);");
  stepImageIndex.value++;
  await wait();

  title.value = "Add header text";
  clearHighlight();
  await appendTextInLine(7, "\n\n");
  highlightLine(9);
  await appendTextInLine(9, "\t\t\tpage.Header()\n\t\t\t\t.Text(\"Hello PDF!\");");
  stepImageIndex.value++;
  await wait();

  title.value = "Improve header text styling";
  highlightLine(11);
  await deleteTextAfter(".Text(\"Hello PDF!\");", ";");
  await appendTextAfter(".Text(\"Hello PDF!\")", "\n");
  highlightLine(11);
  await appendTextInLine(11, "\t\t\t\t.FontSize(28)\n\t\t\t\t.Bold()\n\t\t\t\t.FontColor(Colors.Blue.Darken2);");
  stepImageIndex.value++;
  await wait();

  title.value = "Add footer";
  clearHighlight();
  await appendTextInLine(16, "\n\n");
  highlightLine(18);
  await appendTextInLine(18, "\t\t\tpage.Footer()\n\t\t\t\t.Text(\"Footer!\");");
  stepImageIndex.value++;
  await wait();

  title.value = "Position footer on the center";
  clearHighlight();
  await appendTextAfter("page.Footer()", "\n");
  highlightLine(19);
  await appendTextInLine(19, "\t\t\t\t.AlignCenter()");
  stepImageIndex.value++;
  await wait();

  title.value = "Add page number to footer";
  highlightLine(20);
  await deleteText(".Text(\"Footer!\");")
  await appendTextAfter(".AlignCenter()\n", "\t\t\t\t.Text(text => \n\t\t\t\t{\n \n \n\t\t\t\t});");
  await appendTextInLine(22, "\t\t\t\t\ttext.Span(\"Page \");");
  await appendTextInLine(23, "\t\t\t\t\ttext.CurrentPageNumber();");
  stepImageIndex.value++;
  await wait();

  title.value = "Adjust spacing between content";
  clearHighlight();
  await appendTextAfter(".Content()", "\n");
  highlightLine(16);
  await appendTextInLine(16, "\t\t\t\t.PaddingVertical(8)");
  stepImageIndex.value++;
  await wait();

  title.value = "Add placeholder text";
  highlightLine(17);
  await deleteText(".Background(Colors.LightBlue.Lighten3);");
  await appendTextInLine(17, ".Column(column => \n\t\t\t\t{\n \n\t\t\t\t});");
  await appendTextInLine(19, "\t\t\t\t\tcolumn.Item()\n\t\t\t\t\t\t.Text(Placeholders.LoremIpsum());");
  stepImageIndex.value++;
  await wait();

  title.value = "Justify text";
  clearHighlight();
  await deleteTextAfter(".Text(Placeholders.LoremIpsum())", ";");
  await appendTextInLine(20, "\n");
  highlightLine(21);
  await appendTextInLine(21, "\t\t\t\t\t\t.Justify();");
  stepImageIndex.value++;
  await wait();

  title.value = "Add placeholder image";
  clearHighlight();
  await appendTextInLine(21, "\n\n");
  highlightLine(23);
  await appendTextInLine(23, "\t\t\t\t\tcolumn.Item()\n\t\t\t\t\t\t.AspectRatio(16 / 9f)\n\t\t\t\t\t\t.Image(Placeholders.Image);");
  stepImageIndex.value++;
  await wait();

  title.value = "Adjust spacing between text and image";
  clearHighlight();
  await appendTextInLine(18, "\n \n");
  highlightLine(19);
  await appendTextInLine(19, "\t\t\t\t\tcolumn.Spacing(8);");
  stepImageIndex.value++;
  await wait();

  highlightedLines.value = null;
  clearHighlight();
  await refreshHighlightedCode();
  title.value = "Completed document";
}

</script>

<template>
  <section class="content">
    <h2>Quick Start</h2>

    <p class="sub-header">
      Step: <span class="highlight-background">{{ title }}</span>
    </p>

    <div class="animation-container">
      <div class="code-container" v-html="highlightedCode"></div>

      <img :src="'/homepage/quick-start-animation/step' + stepImageIndex + '.webp'" />
    </div>
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

</style>