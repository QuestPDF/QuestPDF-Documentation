import { defineLoader } from "vitepress";
import { codeToHtml, stringifyTokenStyle, type ThemedToken } from "shiki";
import fs from "node:fs";

/* The quick start's coding session (HomePageQuickStart.vue, played by agentSession.ts): the Program.cs sample,
   the three requests that refine it, and the highlighting of every line the window shows. The highlighting is
   done here, at build time, so no highlighter ships to the browser. */

export interface Round {
  prompt: string;
  /* the line the new lines go under, matched by text */
  after: string;
  /* the edit replaces that line: it is marked red and kept in place above the new lines */
  replace?: boolean;
  add: string[];
}

export interface Token {
  content: string;
  /* both themes' colours, as --shiki-light and --shiki-dark (VitePress's code styles pick one) */
  style: string;
}

export interface QuickStartSession {
  code: string[];
  rounds: Round[];
  /* the tokens of every line that appears in the session, by its text */
  tokens: Record<string, Token[]>;
}

declare const data: QuickStartSession;
export { data };

const rounds: Round[] = [
  {
    prompt: "Highlight important tasks in orange.",
    after: "                .Text(task.Title)",
    add: [
      "                .FontColor(task.IsImportant ? Colors.Orange.Darken2 : Colors.Black)"
    ]
  },
  {
    prompt: "Show overdue due dates in red.",
    after: "            row.ConstantItem(50).Text(task.DueDate?.ToString(\"d\") ?? \"No due date\");",
    replace: true,
    add: [
      "            row.ConstantItem(50)",
      "                .Text(task.DueDate?.ToString(\"d\") ?? \"No due date\")",
      "                .FontColor(task.IsOverdue ? Colors.Red.Medium : Colors.Black);"
    ]
  },
  {
    prompt: "Hide completed subtasks.",
    after: "        foreach (var subtask in task.Subtasks)",
    replace: true,
    add: [
      "        foreach (var subtask in task.Subtasks.Where(x => !x.IsDone))"
    ]
  }
];

export default defineLoader({
  watch: ["./codeExamples/quickStart.cs"],

  async load(): Promise<QuickStartSession> {
    const code = fs.readFileSync(new URL("./codeExamples/quickStart.cs", import.meta.url), "utf-8").trimEnd().split("\n");

    /* every state the window passes through: the sample, then per request the diff (the replaced line still in
       place above the new ones) and the accepted code the next request starts from */
    const states = [code];
    let accepted = code;

    for (const { after, replace, add } of rounds) {
      const at = accepted.indexOf(after);

      if (at < 0)
        throw new Error(`[quickStart.data] no line "${after.trim()}" in the code for a request to edit`);

      const before = accepted.slice(0, at), anchor = accepted[at], rest = accepted.slice(at + 1);
      const diff = [...before, anchor, ...add, ...rest];
      accepted = replace ? [...before, ...add, ...rest] : diff;
      states.push(diff, accepted);
    }

    const tokens: Record<string, Token[]> = {};

    for (const state of states) {
      for (const [index, line] of (await highlight(state)).entries()) {
        const text = state[index];
        const lineTokens = line.map(token => ({ content: token.content, style: stringifyTokenStyle(token.htmlStyle ?? {}) }));

        if (text in tokens && JSON.stringify(tokens[text]) !== JSON.stringify(lineTokens))
          throw new Error(`[quickStart.data] "${text.trim()}" is highlighted differently in two places`);

        tokens[text] = lineTokens;
      }
    }

    return { code, rounds, tokens };
  }
});

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
