import { computed, onBeforeUnmount, onMounted, ref, type Ref } from "vue";
import type { ShikiTransformer } from "@shikijs/types";

/* Shared material for the five "documents as code + agent" concepts: the one code sample, the one
   request, the one diff, the four reasons, and the playback engine that every autoplaying concept
   uses. See design-explorations/quick-start-agents/proposals.md for the timeline this implements. */


/* The sample: ComposeTable from the In-Depth Invoice Tutorial, trimmed to 26 lines */

export const fileName = "InvoiceDocument.cs";

export const baseCode: string[] = [
  "void ComposeTable(IContainer container)",
  "{",
  "    container.Table(table =>",
  "    {",
  "        table.ColumnsDefinition(columns =>",
  "        {",
  "            columns.RelativeColumn(3);",
  "            columns.RelativeColumn();",
  "            columns.RelativeColumn();",
  "        });",
  "",
  "        table.Header(header =>",
  "        {",
  "            header.Cell().Text(\"Product\").SemiBold();",
  "            header.Cell().AlignRight().Text(\"Quantity\").SemiBold();",
  "            header.Cell().AlignRight().Text(\"Total\").SemiBold();",
  "        });",
  "",
  "        foreach (var item in Model.Items)",
  "        {",
  "            table.Cell().Text(item.Name);",
  "            table.Cell().AlignRight().Text(item.Quantity);",
  "            table.Cell().AlignRight().Text($\"{item.Total:C}\");",
  "        }",
  "    });",
  "}"
];

export const request = "Show negative amounts in red.";

/* the diff: one line replaced by two (−1 +2) */
export const removedLine = "            table.Cell().AlignRight().Text($\"{item.Total:C}\");";
export const addedLines = [
  "            table.Cell().AlignRight().Text($\"{item.Total:C}\")",
  "                .FontColor(item.Total < 0 ? Colors.Red.Medium : Colors.Black);"
];

export const diffStats = { removed: 1, added: 2 };

/* the window reserves the height of its tallest state (the diff, 28 lines) so nothing below moves */
export const reservedLines = baseCode.length + addedLines.length;


/* The four reasons, every sentence checkable (research.md §3) */

export interface Reason {
  icon: string;
  title: string;
  text: string;
  short: string;
}

export const reasons: Reason[] = [
  {
    icon: "fa-code",
    title: "Dynamic content is just code",
    text: "Loops, conditions and functions build the document. Completion, inspections and refactoring in your IDE work on it.",
    short: "Loops, conditions and functions, with full IDE support."
  },
  {
    icon: "fa-code-branch",
    title: "Reviewable in version control",
    text: "A document change is a diff. It goes through the same pull request and history as the rest of your code.",
    short: "A document change is a diff in a pull request."
  },
  {
    icon: "fa-cubes",
    title: "Reusable components",
    text: "Headers, tables and address blocks become classes you share across documents and projects.",
    short: "Headers and tables as classes, shared across projects."
  },
  {
    icon: "fa-terminal",
    title: "Works with your coding agent",
    text: "Plain C# files, a typed API the compiler checks, layout errors that name the element at fault, docs published as llms.txt.",
    short: "Typed API, descriptive layout errors, docs as llms.txt."
  }
];


/* Lines with a diff kind, and the three static shapes of the file */

export type LineKind = "normal" | "removed" | "added" | "highlighted";

export interface Line {
  text: string;
  kind: LineKind;
}

export type CodeMode = "plain" | "diff" | "accepted";

export function buildLines(mode: CodeMode): Line[] {
  const lines: Line[] = [];

  for (const text of baseCode) {
    if (text !== removedLine) {
      lines.push({ text, kind: "normal" });
      continue;
    }

    if (mode === "plain")
      lines.push({ text, kind: "normal" });

    if (mode === "diff") {
      lines.push({ text, kind: "removed" });
      addedLines.forEach(added => lines.push({ text: added, kind: "added" }));
    }

    if (mode === "accepted")
      addedLines.forEach(added => lines.push({ text: added, kind: "highlighted" }));
  }

  return lines;
}

export function linesToCode(lines: Line[]) {
  return lines.map(line => line.text).join("\n");
}

/* shiki line numbers are 1-based and follow the lines array one to one */
export function linesTransformer(lines: Line[]): ShikiTransformer {
  const kinds = lines.map(line => line.kind);

  return {
    line(node, line) {
      const kind = kinds[line - 1];

      if (kind === "removed")
        this.addClassToHast(node, "line-removed");
      else if (kind === "added")
        this.addClassToHast(node, "line-added");
      else if (kind === "highlighted")
        this.addClassToHast(node, "line-highlighted");
    }
  };
}


/* The playback engine
   rest → typing (the request types in) → proposing (the removed line turns red, the added lines
   type in green) → proposed (compiles) → reviewed (the diff is accepted, new lines highlighted)
   → done (the page is rendered again). Plays once per mount; replay() runs it again. Autoplay
   starts after the root has been at least 40% visible for `autoplayDelay` ms, so the reader has
   read the code first; it never starts under prefers-reduced-motion, where play() steps through
   the states without typing. Timers pause while the root is off-screen. */

export type Phase = "rest" | "typing" | "proposing" | "proposed" | "reviewed" | "done";

export interface DemoOptions {
  root: Ref<HTMLElement | null>;
  /* null disables autoplay (explicit trigger only) */
  autoplayDelay: number | null;
}

export const promptSpeed = 28;
export const codeSpeed = 16;

export function useAgentDemo(options: DemoOptions) {
  const phase = ref<Phase>("rest");
  const lines = ref<Line[]>(buildLines("plain"));
  const promptTyped = ref(0);
  const played = ref(false);
  const playing = ref(false);
  const reducedMotion = ref(false);

  const promptText = computed(() => request.slice(0, promptTyped.value));
  const code = computed(() => linesToCode(lines.value));
  const transformer = computed(() => linesTransformer(lines.value));
  const after = computed(() => phase.value === "done");

  /* the checks every concept shows in some form */
  const proposed = computed(() => ["proposed", "reviewed", "done"].includes(phase.value));
  const reviewed = computed(() => ["reviewed", "done"].includes(phase.value));
  const started = computed(() => phase.value !== "rest");

  let visible = false;
  let alive = true;
  let observer: IntersectionObserver | undefined;
  let autoplayTimer: ReturnType<typeof setTimeout> | undefined;

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function pause(ms: number) {
    while (alive && !visible)
      await sleep(250);
    await sleep(ms);
  }

  function reset() {
    lines.value = buildLines("plain");
    promptTyped.value = 0;
    phase.value = "rest";
  }

  function markRemoved() {
    const line = lines.value.find(line => line.text === removedLine && line.kind === "normal");
    if (line) line.kind = "removed";
  }

  function insertionIndex() {
    return lines.value.findIndex(line => line.text === removedLine) + 1;
  }

  async function typeAddedLines() {
    let at = insertionIndex();

    for (const text of addedLines) {
      lines.value.splice(at, 0, { text: "", kind: "added" });
      const line = lines.value[at]; /* the reactive proxy, so each character re-renders the window */

      for (const character of text) {
        line.text += character;
        await pause(codeSpeed);
      }

      at++;
    }
  }

  function acceptDiff() {
    lines.value = lines.value
        .filter(line => line.kind !== "removed")
        .map(line => ({ text: line.text, kind: line.kind === "added" ? "highlighted" as LineKind : "normal" as LineKind }));
  }

  async function run() {
    if (playing.value) return;
    playing.value = true;
    played.value = true;
    reset();

    if (reducedMotion.value) {
      /* no typing, no fades: three stills */
      lines.value = buildLines("diff");
      promptTyped.value = request.length;
      phase.value = "proposed";
      await pause(2500);
      acceptDiff();
      phase.value = "reviewed";
      await pause(600);
      phase.value = "done";
      playing.value = false;
      return;
    }

    phase.value = "typing";
    while (promptTyped.value < request.length && alive) {
      promptTyped.value++;
      await pause(promptSpeed);
    }

    await pause(600);
    phase.value = "proposing";
    markRemoved();
    await pause(900);
    await typeAddedLines();

    await pause(400);
    phase.value = "proposed";
    await pause(1200);

    acceptDiff();
    phase.value = "reviewed";
    await pause(400);

    phase.value = "done";
    playing.value = false;
  }

  function play() {
    if (autoplayTimer) clearTimeout(autoplayTimer);
    autoplayTimer = undefined;
    run();
  }

  onMounted(() => {
    reducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!("IntersectionObserver" in window) || !options.root.value) {
      visible = true;
      return;
    }

    observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);

      if (options.autoplayDelay === null || reducedMotion.value || played.value)
        return;

      /* the delay counts continuous visibility: leaving the viewport cancels it */
      if (visible && !autoplayTimer)
        autoplayTimer = setTimeout(() => { autoplayTimer = undefined; run(); }, options.autoplayDelay);
      else if (!visible && autoplayTimer) {
        clearTimeout(autoplayTimer);
        autoplayTimer = undefined;
      }
    }, { threshold: 0.4 });

    observer.observe(options.root.value);
  });

  onBeforeUnmount(() => {
    alive = false;
    observer?.disconnect();
    if (autoplayTimer) clearTimeout(autoplayTimer);
  });

  return { phase, lines, code, transformer, promptText, after, proposed, reviewed, started, played, playing, reducedMotion, play };
}


/* Regions of the sample, for the concepts that link the page or a spec line to code lines.
   Indexes are into baseCode; the diff's added lines belong to "total" and "rows". */

export type Region = "file" | "header" | "rows" | "total" | "columns" | "aligned";

export const regionLines: Record<Region, number[]> = {
  file: [],
  columns: [4, 5, 6, 7, 8, 9],
  header: [11, 12, 13, 14, 15, 16],
  rows: [18, 19, 20, 21, 22, 23],
  aligned: [14, 15, 21, 22],
  total: [22]
};

/* marks a region's lines as highlighted, leaving diff lines (removed, added) as they are */
export function highlightRegion(lines: Line[], region: Region | null): Line[] {
  if (!region) return lines;

  const wanted = new Set(regionLines[region]);
  let base = 0;

  return lines.map(line => {
    const isDiffLine = line.kind === "added" || line.kind === "highlighted";
    const index = isDiffLine ? -1 : base++;
    const hit = isDiffLine
        ? (region === "total" || region === "rows" || region === "aligned")
        : wanted.has(index);

    if (hit && line.kind === "normal")
      return { text: line.text, kind: "highlighted" as LineKind };

    return line;
  });
}
