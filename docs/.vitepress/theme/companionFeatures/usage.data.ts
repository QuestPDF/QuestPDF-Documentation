import { defineLoader } from "vitepress";
import { codeToHtml, codeToTokens, stringifyTokenStyle } from "shiki";

/* The Usage section's code, highlighted during the build in the themes of the documentation's code blocks.
   Facts from docs/companion/usage.md; the sample is quick-start.md's, shortened. */

export interface Snippet {
  text: string;
  html: string;
}

export interface UsageData {
  sample: Snippet;
  commands: (Snippet & { label: string })[];
}

declare const data: UsageData;
export { data };

const sample = `using QuestPDF.Companion;
using QuestPDF.Fluent;
using QuestPDF.Infrastructure;

QuestPDF.Settings.License = LicenseType.Evaluation;

Document.Create(container =>
{
    container.Page(page =>
    {
        page.Margin(50);
        page.Content().Text("Hello PDF!");
    });
})
.ShowInCompanion();`;

const commands = [
  { label: "Run your project", text: "dotnet watch" },
  { label: "Run a chosen project", text: "dotnet watch --project YourSampleProject" },
  { label: "Run a unit test", text: 'dotnet watch --project YourProjectWithTests test --filter "YourClassWithTests.TestMethodName"' }
];

const themes = { light: "light-plus", dark: "dark-plus" };

/* the lines of the <code>, so the page writes its own <pre>. The sample shows the change as the homepage shows an
   edit: the replaced line in red above the new one in green; the copy button copies the code without the red line. */
async function highlightChange(text: string, removed: string, added: string): Promise<Snippet> {
  const shown = text.replace(added, `${removed}\n${added}`);
  const lines = shown.split("\n");

  const html = await codeToHtml(shown, {
    lang: "csharp",
    themes,
    defaultColor: false,
    transformers: [{
      line(node, line) {
        if (lines[line - 1] === removed)
          this.addClassToHast(node, "removed");

        if (lines[line - 1] === added)
          this.addClassToHast(node, "added");
      }
    }]
  });

  return { text, html: html.match(/<code>([\s\S]*)<\/code>/)![1] };
}

const escapeHtml = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

/* a narrow card wraps a command between its words (each a nowrap .word), or before a method name, never inside "--filter" */
async function highlightCommand(text: string): Promise<Snippet> {
  const { tokens } = await codeToTokens(text, { lang: "shellscript", themes, defaultColor: false });
  let html = "";
  let word = "";

  const endWord = (separator: string) => {
    if (word)
      html += `<span class="word">${word}</span>`;

    html += separator;
    word = "";
  };

  for (const token of tokens[0]) {
    const style = stringifyTokenStyle(token.htmlStyle ?? {});

    /* text at even indexes; between them a space, or undefined where a class name meets a method name */
    token.content.split(/( )|(?<=\.)(?=[A-Z])/).forEach((part, index) => {
      if (index % 2)
        endWord(part ?? "<wbr>");
      else if (part)
        word += `<span style="${style}">${escapeHtml(part)}</span>`;
    });
  }

  endWord("");
  return { text, html };
}

export default defineLoader({
  load: async (): Promise<UsageData> => ({
    sample: await highlightChange(sample, '.GeneratePdf("hello.pdf");', ".ShowInCompanion();"),
    commands: await Promise.all(commands.map(async command => ({ label: command.label, ...await highlightCommand(command.text) })))
  })
});
