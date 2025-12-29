<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {useData} from "vitepress";
import createCodeHighlighter from "./createCodeHighlighter";
import HomePageCodeContainer from "./HomePageCodeContainer.vue";

const code = ref('');
const highlightedLines = ref<{start: number; end: number} | null>(null);
const highlightedCode = ref('');

const currentStep = ref(0);
const totalSteps = 13;
const imageIndex = ref(0);
const stepDescription = ref("");

const { isDark } = useData();

/* Animation state */
type AnimationState = 'idle' | 'playing' | 'paused' | 'completed';
const animationState = ref<AnimationState>('idle');
const animationAbortController = ref<AbortController | null>(null);

const isIdle = computed(() => animationState.value === 'idle');
const isPlaying = computed(() => animationState.value === 'playing');
const isPaused = computed(() => animationState.value === 'paused');
const isCompleted = computed(() => animationState.value === 'completed');
const isAnimationActive = computed(() => isPlaying.value || isPaused.value);

const progressPercent = computed(() => Math.round((currentStep.value / totalSteps) * 100));


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
  showSimpleExample();
  refreshHighlightedCode();
});


/* Animation engine */

const animationSpeed = 60;
const waitSpeed = 2500;

function checkAbort(signal: AbortSignal) {
  if (signal.aborted) throw new Error('Animation aborted');
}

async function waitForResume(signal: AbortSignal): Promise<void> {
  while (isPaused.value) {
    checkAbort(signal);
    await new Promise(r => setTimeout(r, 100));
  }
  checkAbort(signal);
}

async function delayWithPause(ms: number, signal: AbortSignal): Promise<void> {
  const interval = 50;
  let elapsed = 0;
  while (elapsed < ms) {
    await waitForResume(signal);
    await new Promise(r => setTimeout(r, interval));
    elapsed += interval;
  }
}

async function appendText(position: number, text: string, signal: AbortSignal) {
  for (let letter of text) {
    await waitForResume(signal);
    code.value = code.value.slice(0, position) + letter + code.value.slice(position);
    position++;

    if (letter == '\n' && highlightedLines.value)
      highlightedLines.value = { start: highlightedLines.value.start, end: highlightedLines.value.end + 1 };

    await delayWithPause(animationSpeed, signal);
  }
}

async function appendTextAfter(after: string, text: string, signal: AbortSignal) {
  let position = code.value.indexOf(after) + after.length;
  await appendText(position, text, signal);
}

async function appendTextInLine(lineNumber: number, text: string, signal: AbortSignal) {
  let position = code.value.split('\n').slice(0, lineNumber).join('\n').length;
  await appendText(position, text, signal);
}

async function deleteText(deleteText: string, signal: AbortSignal) {
  await deleteTextAfter("", deleteText, signal);
}

async function deleteTextAfter(afterText: string, deleteText: string, signal: AbortSignal) {
  const position = code.value.indexOf(afterText);
  const target = code.value.indexOf(deleteText, position);

  const before = code.value.slice(0, target);
  const after = code.value.slice(target + deleteText.length);

  for (let i = deleteText.length; i >= 0; i--) {
    await waitForResume(signal);
    code.value = before + deleteText.slice(0, i) + after;
    await delayWithPause(animationSpeed, signal);
  }
}

function highlightLine(lineNumber: number) {
  highlightedLines.value = { start: lineNumber, end: lineNumber };
}

function clearHighlight() {
  highlightedLines.value = null;
}

async function wait(signal: AbortSignal) {
  await delayWithPause(waitSpeed, signal);
}

async function proceedToNextStep(stepName: string, signal: AbortSignal) {
  imageIndex.value++;
  await wait(signal);

  clearHighlight();
  stepDescription.value = stepName;
  currentStep.value++;
}


/* Simple example display */

function showSimpleExample() {
  const simpleCode = `Document
    .Create(document =>
    {
        document.Page(page =>
        {
            page.Content()
                .Text("Hello PDF!")
                .FontSize(24);
        });
    })
    .GeneratePdfAndShow();`;

  code.value = simpleCode;
  stepDescription.value = "";
  imageIndex.value = 0;
  currentStep.value = 0;
  clearHighlight();
}


/* Animation reset to tutorial start */

function resetToTutorialStart() {
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
  stepDescription.value = "Start with a blank document";
  imageIndex.value = 1;
  currentStep.value = 1;
  clearHighlight();
}

const primaryAction = ref<HTMLAnchorElement | null>(null);

function scrollToPrimaryActionButton() {
  if (primaryAction.value) {
    primaryAction.value.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });

    primaryAction.value.classList.add("highlight");
  }
}


/* Animation control */

function startAnimation() {
  if (animationAbortController.value) {
    animationAbortController.value.abort();
  }

  animationAbortController.value = new AbortController();
  animationState.value = 'playing';
  resetToTutorialStart();
  refreshHighlightedCode();

  animate(animationAbortController.value.signal);
}

function pauseAnimation() {
  if (isPlaying.value) {
    animationState.value = 'paused';
  }
}

function resumeAnimation() {
  if (isPaused.value) {
    animationState.value = 'playing';
  }
}

function stopAnimation() {
  if (animationAbortController.value) {
    animationAbortController.value.abort();
    animationAbortController.value = null;
  }
  animationState.value = 'idle';
  showSimpleExample();
  refreshHighlightedCode();
}

function replayAnimation() {
  stopAnimation();
  setTimeout(() => startAnimation(), 100);
}


/* Main animation sequence */

async function animate(signal: AbortSignal) {
  try {
    await wait(signal);
    currentStep.value++;

    stepDescription.value = "Insert an element with a solid background";
    await appendTextInLine(6, "\n\n", signal);
    highlightLine(8);
    await appendTextInLine(8, "\t\t\tpage.Content()\n\t\t\t\t.Background(Colors.LightBlue.Lighten3);", signal);

    await proceedToNextStep("Set the page margins", signal);
    await appendTextInLine(6, "\n", signal);
    highlightLine(7);
    await appendTextInLine(7, "\t\t\tpage.Margin(0.3f, Unit.Inch);", signal);

    await proceedToNextStep("Add a header with text", signal);
    await appendTextInLine(7, "\n\n", signal);
    highlightLine(9);
    await appendTextInLine(9, "\t\t\tpage.Header()\n\t\t\t\t.Text(\"Hello PDF!\");", signal);

    await proceedToNextStep("Style the header text", signal);
    highlightLine(11);
    await deleteTextAfter(".Text(\"Hello PDF!\");", ";", signal);
    await appendTextAfter(".Text(\"Hello PDF!\")", "\n", signal);
    highlightLine(11);
    await appendTextInLine(11, "\t\t\t\t.FontSize(28)\n\t\t\t\t.Bold()\n\t\t\t\t.FontColor(Colors.Blue.Darken2);", signal);

    await proceedToNextStep("Insert a footer", signal);
    await appendTextInLine(16, "\n\n", signal);
    highlightLine(18);
    await appendTextInLine(18, "\t\t\tpage.Footer()\n\t\t\t\t.Text(\"Footer!\");", signal);

    await proceedToNextStep("Center-align the footer", signal);
    await appendTextAfter("page.Footer()", "\n", signal);
    highlightLine(19);
    await appendTextInLine(19, "\t\t\t\t.AlignCenter()", signal);

    await proceedToNextStep("Include a page number in the footer", signal);
    highlightLine(20);
    await deleteText(".Text(\"Footer!\");", signal)
    await appendTextAfter(".AlignCenter()\n", "\t\t\t\t.Text(text => \n\t\t\t\t{\n \n \n\t\t\t\t});", signal);
    await appendTextInLine(22, "\t\t\t\t\ttext.Span(\"Page \");", signal);
    await appendTextInLine(23, "\t\t\t\t\ttext.CurrentPageNumber();", signal);

    await proceedToNextStep("Adjust content spacing", signal);
    await appendTextAfter(".Content()", "\n", signal);
    highlightLine(16);
    await appendTextInLine(16, "\t\t\t\t.PaddingVertical(8)", signal);

    await proceedToNextStep("Add placeholder text", signal);
    highlightLine(17);
    await deleteText(".Background(Colors.LightBlue.Lighten3);", signal);
    await appendTextInLine(17, ".Column(column => \n\t\t\t\t{\n \n\t\t\t\t});", signal);
    await appendTextInLine(19, "\t\t\t\t\tcolumn.Item()\n\t\t\t\t\t\t.Text(Placeholders.LoremIpsum());", signal);

    await proceedToNextStep("Justify the placeholder text", signal);
    await deleteTextAfter(".Text(Placeholders.LoremIpsum())", ";", signal);
    await appendTextInLine(20, "\n", signal);
    highlightLine(21);
    await appendTextInLine(21, "\t\t\t\t\t\t.Justify();", signal);

    await proceedToNextStep("Insert a placeholder image", signal);
    await appendTextInLine(21, "\n\n", signal);
    highlightLine(23);
    await appendTextInLine(23, "\t\t\t\t\tcolumn.Item()\n\t\t\t\t\t\t.AspectRatio(16 / 9f)\n\t\t\t\t\t\t.Image(Placeholders.Image);", signal);

    await proceedToNextStep("Adjust spacing between elements", signal);
    await appendTextInLine(18, "\n \n", signal);
    highlightLine(19);
    await appendTextInLine(19, "\t\t\t\t\tcolumn.Spacing(8);", signal);

    // Complete
    imageIndex.value++;
    currentStep.value = totalSteps;
    stepDescription.value = "Document completed";
    clearHighlight();
    await refreshHighlightedCode();

    animationState.value = 'completed';

    await delayWithPause(waitSpeed, signal);
    scrollToPrimaryActionButton();

  } catch (e) {
    // Animation was aborted, do nothing
  }
}


/* Visibility observer - show prompt when section becomes visible */
const sectionRef = ref<HTMLElement | null>(null);
const hasBeenVisible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasBeenVisible.value) {
        hasBeenVisible.value = true;
      }
    });
  }, { threshold: 0.3 });

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

onUnmounted(() => {
  if (animationAbortController.value) {
    animationAbortController.value.abort();
  }
});

</script>

<template>
  <section ref="sectionRef" class="content" id="homepage-quick-start-animation">
    <div class="section-header">
      <div class="section-tag">Quick Start</div>
      <h2>Generate PDFs with Ease</h2>
      <p class="sub-header">
        Create professional PDF documents using clean, readable C# code.
        No complex configurations, no external dependencies.
      </p>
    </div>

    <!-- Initial simple state -->
    <div v-if="isIdle" class="intro-panel">
      <div class="intro-content">
        <div class="intro-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
            <path d="M12 18v-6"/>
            <path d="M9 15l3 3 3-3"/>
          </svg>
          <span>Your First PDF</span>
        </div>
        <h3>Just 10 lines of code</h3>
        <p>This simple example generates a complete PDF document. QuestPDF's fluent API makes PDF generation intuitive for any .NET developer.</p>

        <div class="intro-features">
          <div class="intro-feature">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>No external dependencies</span>
          </div>
          <div class="intro-feature">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Type-safe fluent API</span>
          </div>
          <div class="intro-feature">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Hot-reload development</span>
          </div>
        </div>

        <button class="play-tutorial-btn" @click="startAnimation">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          <span>Watch Tutorial</span>
          <span class="duration">~90 sec</span>
        </button>
      </div>
    </div>

    <!-- Animation controls panel -->
    <div v-if="isAnimationActive || isCompleted" class="controls-panel">
      <div class="progress-section">
        <div class="step-info">
          <span class="step-label">Step {{ currentStep }} of {{ totalSteps }}</span>
          <span class="step-description">{{ stepDescription }}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>

      <div class="control-buttons">
        <button v-if="isPlaying" class="control-btn" @click="pauseAnimation" title="Pause">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"/>
            <rect x="14" y="4" width="4" height="16"/>
          </svg>
        </button>
        <button v-if="isPaused" class="control-btn primary" @click="resumeAnimation" title="Resume">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </button>
        <button v-if="isCompleted" class="control-btn primary" @click="replayAnimation" title="Replay">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="1 4 1 10 7 10"/>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
        </button>
        <button class="control-btn" @click="stopAnimation" title="Stop & Reset">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="4" y="4" width="16" height="16" rx="2"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Code and preview area -->
    <div class="animation-container">
      <home-page-code-container file-name="HelloWorld.cs" :highlighted-code="highlightedCode" />

      <div class="preview-container">
        <div class="preview-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <span>PDF Output</span>
        </div>
        <div class="preview-content">
          <!-- Simple "Hello PDF" placeholder for initial state -->
          <div v-if="imageIndex === 0" class="hello-pdf-placeholder">
            <div class="pdf-page">
              <span class="pdf-text">Hello PDF!</span>
            </div>
          </div>
          <img v-else :src="'/homepage/quick-start-animation/step' + imageIndex + '.webp'" alt="PDF output preview" />
        </div>
      </div>
    </div>

    <!-- Call to action -->
    <div class="cta-section">
      <a ref="primaryAction" class="action primary" href="/getting-started">
        Get Started
      </a>
      <a class="action" href="/api-reference">
        API Reference
      </a>
    </div>
  </section>
</template>

<style scoped>

.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 48px;
}

/* Intro panel - shown in idle state */
.intro-panel {
  margin-bottom: 32px;
}

.intro-content {
  background: linear-gradient(135deg,
    color-mix(in srgb, var(--vp-c-brand-1), transparent 92%),
    color-mix(in srgb, var(--vp-c-brand-2), transparent 95%)
  );
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1), transparent 80%);
  border-radius: 16px;
  padding: 32px;
  max-width: 480px;
}

.intro-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: color-mix(in srgb, var(--vp-c-brand-1), transparent 85%);
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-bottom: 16px;
}

.intro-badge svg {
  opacity: 0.9;
}

.intro-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: var(--vp-c-text-1);
}

.intro-content > p {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 20px;
}

.intro-features {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.intro-feature {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9375rem;
  color: var(--vp-c-text-2);
}

.intro-feature svg {
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.play-tutorial-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--vp-c-brand-1);
  color: var(--vp-button-brand-text);
  border: none;
  border-radius: 24px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms ease;
}

.play-tutorial-btn:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-1px);
}

.play-tutorial-btn svg {
  flex-shrink: 0;
}

.play-tutorial-btn .duration {
  font-size: 0.8125rem;
  font-weight: 400;
  opacity: 0.8;
  padding-left: 6px;
  border-left: 1px solid rgba(255,255,255,0.3);
}

/* Controls panel - shown during animation */
.controls-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px 24px;
  margin-bottom: 32px;
}

.progress-section {
  flex: 1;
  min-width: 0;
}

.step-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.step-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  white-space: nowrap;
}

.step-description {
  font-size: 0.9375rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.progress-bar {
  height: 6px;
  background: var(--vp-c-divider);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  border-radius: 3px;
  transition: width 300ms ease;
}

.control-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 150ms ease;
}

.control-btn:hover {
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand-1);
}

.control-btn.primary {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-button-brand-text);
}

.control-btn.primary:hover {
  background: var(--vp-c-brand-2);
}

/* Animation container */
.animation-container {
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr 380px;
  justify-self: center;
  width: 100%;
}

@media screen and (max-width: 1000px) {
  .animation-container {
    grid-template-columns: 1fr 280px;
    grid-gap: 24px;
  }

  .controls-panel {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .control-buttons {
    justify-content: center;
  }
}

@media screen and (max-width: 700px) {
  .animation-container {
    grid-template-columns: 1fr;
    grid-gap: 24px;
  }

  .intro-content {
    padding: 24px;
  }

  .step-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}

/* Preview container */
.preview-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg);
  height: fit-content;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.08));
}

.preview-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.preview-header svg {
  opacity: 0.7;
}

.preview-content {
  padding: 16px;
  display: flex;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

html.dark .preview-content {
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
}

.preview-content img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

html.dark .preview-content img {
  opacity: 0.9;
}

/* Hello PDF placeholder */
.hello-pdf-placeholder {
  width: 100%;
  display: flex;
  justify-content: center;
}

.pdf-page {
  background: white;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 32px 24px;
  min-height: 280px;
  width: 100%;
  max-width: 240px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.pdf-text {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: #1a1a1a;
}

html.dark .pdf-page {
  background: #fafafa;
}

/* CTA section */
.cta-section {
  display: flex;
  gap: 16px;
  margin-top: 40px;
  justify-content: center;
}

.cta-section .action.primary {
  scroll-margin-block-end: 128px;
}

@keyframes highlight-cta-animation {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.cta-section .action.primary.highlight {
  animation: highlight-cta-animation 600ms ease-in-out;
  animation-iteration-count: 3;
}

</style>