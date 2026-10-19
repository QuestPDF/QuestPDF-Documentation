import { defineLoader } from "vitepress";
import fs from "node:fs";
import { buildSession, type QuickStartSession, type Round } from "./sessionBuilder";

/* The homepage quick start's coding session (HomePageQuickStart.vue, played by agentSession.ts): an HTML invoice
   template (codeExamples/invoice.html), the five requests that convert it to QuestPDF and refine it, built by
   sessionBuilder.ts into what the window shows. The viewer shows the code rendered by QuestPDF after each request
   (public/homepage/quick-start-<n>.webp, n requests applied; 0 is the page's chrome alone): render them again, and
   measure the rounds' zoom again, whenever a request changes. */

declare const data: QuickStartSession;
export { data };

const rounds: Round[] = [
  {
    prompt: "Migrate our legacy HTML-to-PDF invoice to QuestPDF.",
    unfold: "void ComposePage(PageDescriptor page)",
    edits: [
      {
        file: "Invoice.cs",
        add: [
          "void ComposePage(PageDescriptor page)",
          "{",
          "    page.Size(PageSizes.A4);",
          "    page.Margin(2, Unit.Centimetre);",
          "    page.DefaultTextStyle(x => x.FontSize(10));",
          "",
          "    page.Header().Element(ComposeHeader);",
          "",
          "    page.Content().PaddingVertical(24).Column(column =>",
          "    {",
          "        foreach (var item in Model.Items)",
          "            column.Item().Element(c => ComposeItem(c, item));",
          "",
          "        column.Item().PaddingTop(12).Element(ComposeTotals);",
          "    });",
          "}",
          "",
          "void ComposeHeader(IContainer container)",
          "{",
          "    container.Row(row =>",
          "    {",
          "        row.RelativeItem().Column(column =>",
          "        {",
          "            column.Item()",
          "                .Text($\"Invoice {Model.Number}\")",
          "                .FontSize(20)",
          "                .Bold();",
          "",
          "            column.Item().Text($\"Issued {Model.Issued:d MMM yyyy}\");",
          "        });",
          "",
          "        row.AutoItem().Text($\"Bill to\\n{Model.Customer}\");",
          "    });",
          "}",
          "",
          "void ComposeItem(IContainer container, InvoiceItem item)",
          "{",
          "    container.BorderBottom(0.5f).PaddingVertical(6).Row(row =>",
          "    {",
          "        row.RelativeItem().Text(item.Name);",
          "",
          "        row.ConstantItem(100)",
          "            .AlignRight()",
          "            .Text($\"{item.Quantity} × {item.Price:C}\");",
          "",
          "        row.ConstantItem(80).AlignRight().Text($\"{item.Amount:C}\");",
          "    });",
          "}",
          "",
          "void ComposeTotals(IContainer container)",
          "{",
          "    container.AlignRight().Width(200).Column(column =>",
          "    {",
          "        Line(\"Subtotal\", Model.Subtotal);",
          "        Line(\"VAT\", Model.Vat);",
          "",
          "        column.Item()",
          "            .PaddingTop(8)",
          "            .AlignRight()",
          "            .Text($\"Total {Model.Total:C}\")",
          "            .FontSize(14)",
          "            .Bold();",
          "",
          "        void Line(string label, decimal amount) =>",
          "            column.Item().Row(row =>",
          "            {",
          "                row.RelativeItem().Text(label);",
          "                row.AutoItem().Text($\"{amount:C}\");",
          "            });",
          "    });",
          "}"
        ]
      }
    ]
  },
  {
    prompt: "Add our logo and brand color.",
    unfold: "void ComposeHeader(IContainer container)",
    zoom: [36, 40, 300, 122],
    edits: [
      {
        file: "Invoice.cs",
        after: "        {",
        add: [
          "            column.Item()",
          "                .PaddingBottom(16)",
          "                .Height(32)",
          "                .Svg(\"logo.svg\")",
          "                .FitHeight();",
          ""
        ]
      },
      {
        file: "Invoice.cs",
        after: "                .Bold();",
        remove: 1,
        add: [
          "                .Bold()",
          "                .FontColor(Colors.Teal.Darken3);"
        ]
      }
    ]
  },
  {
    prompt: "Show item details under each name.",
    unfold: "void ComposeItem(IContainer container, InvoiceItem item)",
    zoom: [40, 165, 260, 230],
    edits: [
      {
        file: "Invoice.cs",
        after: "        row.RelativeItem().Text(item.Name);",
        remove: 1,
        add: [
          "        row.RelativeItem().Column(column =>",
          "        {",
          "            column.Item().Text(item.Name).SemiBold();",
          "",
          "            column.Item()",
          "                .Text(item.Details)",
          "                .FontSize(8)",
          "                .FontColor(Colors.Grey.Darken1);",
          "        });"
        ]
      }
    ]
  },
  {
    prompt: "Break down VAT by rate.",
    unfold: "void ComposeTotals(IContainer container)",
    zoom: [300, 396, 260, 148],
    edits: [
      {
        file: "Invoice.cs",
        after: "        Line(\"VAT\", Model.Vat);",
        remove: 1,
        add: [
          "        foreach (var vat in Model.Items.GroupBy(x => x.VatRate))",
          "            Line($\"VAT {vat.Key:P0}\", vat.Sum(x => x.Vat));"
        ]
      }
    ]
  },
  {
    prompt: "Add a Pay now button linking to checkout.",
    unfold: "void ComposePage(PageDescriptor page)",
    zoom: [300, 396, 260, 148],
    edits: [
      {
        file: "Invoice.cs",
        after: "        column.Item().PaddingTop(12).Element(ComposeTotals);",
        add: [
          "",
          "        column.Item()",
          "            .PaddingTop(16)",
          "            .AlignRight()",
          "            .Width(200)",
          "            .Hyperlink(Model.PaymentLink)",
          "            .Background(Colors.Teal.Darken3)",
          "            .CornerRadius(4)",
          "            .PaddingVertical(8)",
          "            .AlignCenter()",
          "            .Text(\"Pay now\")",
          "            .FontColor(Colors.White)",
          "            .Bold();"
        ]
      }
    ]
  }
];

export default defineLoader({
  watch: ["./codeExamples/invoice.html"],

  load: () => buildSession({
    title: "Invoice.pdf",
    renders: "/homepage/quick-start-",
    page: { width: 595, height: 842 },
    overview: { width: 595, height: 340 },
    files: [
      { name: "invoice.html", lines: fs.readFileSync(new URL("./codeExamples/invoice.html", import.meta.url), "utf-8").trimEnd().split("\n") }
    ],
    rounds
  })
});
