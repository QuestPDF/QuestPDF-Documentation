import { defineLoader } from "vitepress";
import { codeToHtml, stringifyTokenStyle, type ThemedToken } from "shiki";
import fs from "node:fs";
import { type FoldableLine, foldLines } from "./codeFolding";

/* The quick start's coding session (HomePageQuickStart.vue, played by agentSession.ts): a Razor view
   (codeExamples/Statement.cshtml), the five requests that convert it to QuestPDF and refine it, and the
   highlighting of every line the window shows. The highlighting is done here, at build time, so no highlighter
   ships to the browser. The window's page shows the code rendered by QuestPDF after each request
   (public/homepage/quick-start-<n>.webp, n requests applied): render them again, and measure the rounds' focus
   and zoom again, whenever a request changes. */

export type Lang = "csharp" | "razor";

export interface Edit {
  file: string;
  /* the line the edit starts at, matched by text; omitted for a new file */
  after?: string;
  /* how many lines from `after` on are replaced (marked red, kept above the new lines); 0 inserts below it */
  remove?: number;
  add: string[];
}

export interface Round {
  prompt: string;
  edits: Edit[];
  /* the method the request works on: the window shows it and folds every other one */
  unfold?: string;
  /* where the page changed, as [x, y, width, height] in pixels of the page at 595 x 842 (the renders are three
     times that), measured on them (an image diff also catches what a change moves aside) */
  focus: [number, number, number, number][];
  /* the part of the page the window zooms in on as the request's result shows, in the same pixels: the change and
     what it sits among, its sides in the gaps between the columns of both the page before and after, so the
     window's edges cut no words, and its top under the heading (none: the page stays whole) */
  zoom?: [number, number, number, number];
}

export interface Token {
  content: string;
  /* both themes' colours, as --shiki-light and --shiki-dark (VitePress's code styles pick one) */
  style: string;
}

export interface QuickStartSession {
  /* the files open as the session starts */
  files: { name: string; lines: string[] }[];
  rounds: Round[];
  /* per language, the tokens of every line that appears, by its text (Razor and C# share lines such as "{") */
  tokens: Record<Lang, Record<string, Token[]>>;
  /* per file, its language (a data loader exports nothing but its data, so the client cannot call langOf) */
  langs: Record<string, Lang>;
  /* the most lines the window shows at once, which it keeps room for */
  lines: number;
}

declare const data: QuickStartSession;
export { data };

const langOf = (file: string): Lang => file.endsWith(".cshtml") ? "razor" : "csharp";

/* The window is as tall as the most code it shows at once: this many lines keep it, title bar included, within a
   laptop screen. */
const maxLines = 26;

const rounds: Round[] = [
  {
    prompt: "Convert this Razor view to QuestPDF.",
    focus: [],
    edits: [
      {
        file: "Statement.cs",
        add: [
          "void ComposeInvoices(IContainer container)",
          "{",
          "    container.Column(column =>",
          "    {",
          "        foreach (var invoice in Model.Invoices)",
          "            column.Item().Element(c => ComposeInvoice(c, invoice));",
          "    });",
          "}",
          "",
          "void ComposeInvoice(IContainer container, Invoice invoice)",
          "{",
          "    container.BorderBottom(0.5f).PaddingVertical(6).Row(row =>",
          "    {",
          "        row.RelativeItem().Text(invoice.Customer).SemiBold();",
          "        row.ConstantItem(70).AlignRight().Text($\"{invoice.DueDate:MMM d}\");",
          "        row.ConstantItem(80).AlignRight().Text($\"{invoice.Total:C}\");",
          "    });",
          "}"
        ]
      }
    ]
  },
  {
    prompt: "Mark overdue invoices with a red badge.",
    unfold: "void ComposeInvoice(IContainer container, Invoice invoice)",
    focus: [[268, 168, 82, 26], [268, 238, 82, 26]],
    zoom: [20, 105, 374, 175],
    edits: [
      {
        file: "Statement.cs",
        after: "        row.RelativeItem().Text(invoice.Customer).SemiBold();",
        add: [
          "",
          "        if (invoice.IsOverdue)",
          "            row.AutoItem().Background(Colors.Red.Lighten5)",
          "                .CornerRadius(4).PaddingHorizontal(6)",
          "                .Text(\"Overdue\").FontColor(Colors.Red.Darken2);",
          ""
        ]
      }
    ]
  },
  {
    prompt: "Make the badge reusable and flag invoices due this week.",
    unfold: "void ComposeInvoice(IContainer container, Invoice invoice)",
    focus: [[262, 133, 88, 26]],
    zoom: [20, 105, 374, 175],
    edits: [
      {
        file: "StatusBadge.cs",
        add: [
          "static class StatusBadgeExtensions",
          "{",
          "    public static void StatusBadge(this IContainer container,",
          "        string text, Color color)",
          "    {",
          "        container.Background(color.WithAlpha(0.1f)).CornerRadius(4)",
          "            .PaddingHorizontal(6).Text(text).FontColor(color);",
          "    }",
          "}"
        ]
      },
      {
        file: "Statement.cs",
        after: "            row.AutoItem().Background(Colors.Red.Lighten5)",
        remove: 3,
        add: [
          "            row.AutoItem().StatusBadge(\"Overdue\", Colors.Red.Darken1);",
          "        else if (invoice.IsDueSoon)",
          "            row.AutoItem().StatusBadge(\"Due soon\", Colors.Orange.Darken2);"
        ]
      }
    ]
  },
  {
    prompt: "Show how much of each invoice is paid.",
    unfold: "void ComposeInvoice(IContainer container, Invoice invoice)",
    focus: [[376, 135, 75, 126]],
    zoom: [165, 105, 430, 200],
    edits: [
      {
        file: "Statement.cs",
        after: "        row.ConstantItem(70).AlignRight().Text($\"{invoice.DueDate:MMM d}\");",
        add: [
          "        row.ConstantItem(60).PaddingLeft(16).AlignMiddle().Height(4)",
          "            .Background(Colors.Grey.Lighten3).AlignLeft()",
          "            .Width(44 * invoice.PaidRatio).Background(Colors.Green.Medium);"
        ]
      }
    ]
  },
  {
    prompt: "Add the total due at the bottom.",
    unfold: "void ComposeInvoices(IContainer container)",
    focus: [[418, 277, 144, 23]],
    zoom: [165, 105, 430, 200],
    edits: [
      {
        file: "Statement.cs",
        after: "            column.Item().Element(c => ComposeInvoice(c, invoice));",
        add: [
          "",
          "        var due = Model.Invoices.Sum(x => x.Total - x.Paid);",
          "        column.Item().PaddingTop(8).AlignRight()",
          "            .Text($\"Total due: {due:C}\").Bold();"
        ]
      }
    ]
  }
];

/* a file after an edit: the diff (the replaced lines still in place above the new ones) and the accepted lines */
function applyEdit(lines: string[], { after, remove = 0, add }: Edit) {
  if (after === undefined) {
    const added = add.map(text => ({ text, kind: "normal" as const }));
    return { diff: [...added, ...lines.map(text => ({ text, kind: "normal" as const }))], accepted: [...add, ...lines] };
  }

  const at = lines.indexOf(after);

  if (at < 0)
    throw new Error(`[quickStart.data] no line "${after.trim()}" in the code for a request to edit`);

  const end = at + Math.max(remove, 1);
  const kept = (text: string, index: number): FoldableLine => ({ text, kind: index >= at && index < at + remove ? "removed" : "normal" });

  const diff = [
    ...lines.slice(0, end).map(kept),
    ...add.map(text => ({ text, kind: "added" as const })),
    ...lines.slice(end).map((text, index) => kept(text, end + index))
  ];

  return { diff, accepted: [...lines.slice(0, remove ? at : end), ...add, ...lines.slice(end)] };
}

export default defineLoader({
  watch: ["./codeExamples/Statement.cshtml"],

  async load(): Promise<QuickStartSession> {
    const files = [
      { name: "Statement.cshtml", lines: fs.readFileSync(new URL("./codeExamples/Statement.cshtml", import.meta.url), "utf-8").trimEnd().split("\n") }
    ];

    /* every state a file passes through: as the session starts, then per edit the diff and the accepted lines the
       next edit starts from; and the most lines the window shows of any of them, with the method each request
       works on unfolded (the code is taken in as a request is sent, before its method unfolds) */
    const accepted: Record<string, string[]> = Object.fromEntries(files.map(file => [file.name, file.lines]));
    const states = files.map(({ name, lines }) => ({ file: name, lines }));
    const asNormal = (lines: string[]) => lines.map(text => ({ text, kind: "normal" as const }));
    let unfold: string | undefined;
    let lines = Math.max(...files.map(file => file.lines.length));

    for (const round of rounds) {
      unfold = round.unfold ?? unfold;

      for (const file of Object.values(accepted))
        lines = Math.max(lines, foldLines(asNormal(file), unfold).length);

      for (const edit of round.edits) {
        const { diff, accepted: next } = applyEdit(accepted[edit.file] ?? [], edit);
        accepted[edit.file] = next;
        states.push({ file: edit.file, lines: diff.map(line => line.text) }, { file: edit.file, lines: next });
        lines = Math.max(lines, foldLines(diff, unfold).length, foldLines(asNormal(next), unfold).length);
      }
    }

    if (lines > maxLines)
      throw new Error(`[quickStart.data] the window shows up to ${lines} lines, more than the ${maxLines} it fits`);

    const tokens: QuickStartSession["tokens"] = { csharp: {}, razor: {} };

    for (const { file, lines } of states) {
      const lang = langOf(file);

      for (const [index, line] of (await highlight(lines, lang)).entries()) {
        const text = lines[index];
        const lineTokens = line.map(token => ({ content: token.content, style: stringifyTokenStyle(token.htmlStyle ?? {}) }));

        if (text in tokens[lang] && JSON.stringify(tokens[lang][text]) !== JSON.stringify(lineTokens))
          throw new Error(`[quickStart.data] "${text.trim()}" is highlighted differently in two places`);

        tokens[lang][text] = lineTokens;
      }
    }

    const langs = Object.fromEntries(states.map(({ file }) => [file, langOf(file)]));

    return { files, rounds, tokens, langs, lines };
  }
});

/* the tokens exactly as codeToHtml renders them (whitespace merged into the token that follows it) */
async function highlight(lines: string[], lang: Lang): Promise<ThemedToken[][]> {
  let result: ThemedToken[][] = [];

  await codeToHtml(lines.join("\n"), {
    lang,
    themes: { light: "light-plus", dark: "dark-plus" },
    defaultColor: false,
    transformers: [{ tokens: tokens => { result = tokens; } }]
  });

  return result;
}
