import { codeToHtml, stringifyTokenStyle, type ThemedToken } from "shiki";
import { type FoldableLine, foldLines } from "./codeFolding.ts";

/* Turns the quick start session (quickStart.data.ts) into what the window needs, highlighting every line it will
   show at build time, so no highlighter ships to the browser. */

/* a part of the page as [x, y, width, height], in the pixels of the page's box */
export type Box = [number, number, number, number];

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
  /* the part of the page the viewer flies to, its sides in the gaps between columns so the viewer's edges cut no
     words (none: the page's overview) */
  zoom?: Box;
  /* the parts of the page the request changed, outlined from the page changing until the diff is taken in */
  marks?: Box[];
}

export interface SessionDefinition {
  /* the viewer window's title, the document's file name */
  title: string;
  /* the URL the renders are served at, less the round's number and ".webp" (round n: `${renders}${n}.webp`) */
  renders: string;
  /* the page's box in the viewer's units, which zoom is measured in: 595 wide, as tall as the page's proportions
     make it */
  page: { width: number; height: number };
  /* the part of the page, from its top-left corner, that the viewer shows at rest: the head and the first content */
  overview: { width: number; height: number };
  /* the part of the page the viewer flies out to after the last request: the finished document whole (none: the
     overview) */
  ending?: Box;
  /* the files open as the session starts */
  files: { name: string; lines: string[] }[];
  /* the method the window shows unfolded as the session starts (none: nothing folds until a request names one) */
  unfold?: string;
  rounds: Round[];
}

export interface Token {
  content: string;
  /* both themes' colours, as --shiki-light and --shiki-dark (VitePress's code styles pick one) */
  style: string;
}

export interface QuickStartSession extends SessionDefinition {
  /* the tokens of every line that appears, by its text */
  tokens: Record<string, Token[]>;
  /* the most lines the window shows at once, which it keeps room for */
  lines: number;
  /* how many digits the window's line numbers take: those of the longest file */
  digits: number;
}

/* the most lines the window shows at once: 26 keep it, title bar included, within a laptop screen; a longer file
   scrolls to the lines being edited */
const maxLines = 26;

/* a file after an edit: the diff (the replaced lines still in place above the new ones) and the accepted lines */
function applyEdit(lines: string[], { after, remove = 0, add }: Edit) {
  if (after === undefined) {
    const added = add.map(text => ({ text, kind: "normal" as const }));
    return { diff: [...added, ...lines.map(text => ({ text, kind: "normal" as const }))], accepted: [...add, ...lines] };
  }

  const at = lines.indexOf(after);

  if (at < 0)
    throw new Error(`[session] no line "${after.trim()}" in the code for a request to edit`);

  if (lines.lastIndexOf(after) !== at)
    throw new Error(`[session] more than one line "${after.trim()}" in the code for a request to edit`);

  const end = at + Math.max(remove, 1);
  const kept = (text: string, index: number): FoldableLine => ({ text, kind: index >= at && index < at + remove ? "removed" : "normal" });

  const diff = [
    ...lines.slice(0, end).map(kept),
    ...add.map(text => ({ text, kind: "added" as const })),
    ...lines.slice(end).map((text, index) => kept(text, end + index))
  ];

  return { diff, accepted: [...lines.slice(0, remove ? at : end), ...add, ...lines.slice(end)] };
}

export async function buildSession(definition: SessionDefinition): Promise<QuickStartSession> {
  const { files, rounds } = definition;

  /* every state a file passes through: as the session starts, then per edit the diff and the accepted lines the
     next edit starts from; and the most lines the window shows of any of them, with the method each request
     works on unfolded */
  const accepted: Record<string, string[]> = Object.fromEntries(files.map(file => [file.name, file.lines]));
  const states = files.map(({ name, lines }) => ({ file: name, lines, diff: false }));
  const asNormal = (lines: string[]) => lines.map(text => ({ text, kind: "normal" as const }));
  let unfold = definition.unfold;
  let lines = Math.max(0, ...files.map(file => foldLines(asNormal(file.lines), unfold).length));

  for (const round of rounds) {
    unfold = round.unfold ?? unfold;

    for (const file of Object.values(accepted))
      lines = Math.max(lines, foldLines(asNormal(file), unfold).length);

    for (const edit of round.edits) {
      const { diff, accepted: next } = applyEdit(accepted[edit.file] ?? [], edit);
      accepted[edit.file] = next;
      states.push({ file: edit.file, lines: diff.map(line => line.text), diff: true }, { file: edit.file, lines: next, diff: false });
      lines = Math.max(lines, foldLines(diff, unfold).length, foldLines(asNormal(next), unfold).length);
    }
  }

  const tokens: QuickStartSession["tokens"] = {};

  /* a diff holds the replaced lines above their replacement, which is not valid code (two lambdas opened where
     one closes), so a line keeps the tokens of a file as accepted and a diff only highlights the lines it alone has */
  for (const { lines, diff } of [...states.filter(state => !state.diff), ...states.filter(state => state.diff)]) {
    for (const [index, line] of (await highlight(lines)).entries()) {
      const text = lines[index];
      const lineTokens = line.map(token => ({ content: token.content, style: stringifyTokenStyle(token.htmlStyle ?? {}) }));

      if (diff && text in tokens)
        continue;

      if (text in tokens && JSON.stringify(tokens[text]) !== JSON.stringify(lineTokens))
        throw new Error(`[session] "${text.trim()}" is highlighted differently in two places`);

      tokens[text] = lineTokens;
    }
  }

  const digits = String(Math.max(...states.map(state => state.lines.length))).length;

  return { ...definition, tokens, lines: Math.min(lines, maxLines), digits };
}

/* the tokens exactly as codeToHtml renders them (whitespace merged into the token that follows it) */
async function highlight(lines: string[]): Promise<ThemedToken[][]> {
  let result: ThemedToken[][] = [];

  await codeToHtml(lines.join("\n"), {
    lang: "csharp",
    themes: { light: "light-plus", dark: "dark-plus" },
    defaultColor: false,
    transformers: [{ tokens: tokens => { result = tokens; } }]
  });

  return result;
}
