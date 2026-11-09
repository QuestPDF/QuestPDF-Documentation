import { defineLoader } from "vitepress";
import fs from "node:fs";
import { buildSession, type QuickStartSession, type Round } from "./sessionBuilder.ts";

/* The homepage quick start's coding session, built by sessionBuilder.ts. The viewer shows
   public/homepage/quick-start-<n>.webp (n requests applied; 0 is the invoice as the session starts): render them
   again, and measure the rounds' zoom and marks again, whenever a request changes. */

declare const data: QuickStartSession;
export { data };

const rounds: Round[] = [
  {
    prompt: "Update the invoice to use the brand color (indigo).",
    marks: [[330, 49, 220, 27], [45, 131, 33, 19], [304, 131, 36, 19], [44, 211, 507, 28], [319, 457, 232, 33]],
    edits: [
      {
        file: "Invoice.cs",
        after: "static readonly Color Accent = Colors.Grey.Darken4;",
        remove: 1,
        add: [
          "static readonly Color Accent = Colors.Indigo.Medium;"
        ]
      }
    ]
  },
  {
    prompt: "Add the shipping address next to the billing address.",
    unfold: "void ComposeAddresses(IContainer container)",
    zoom: [195, 105, 360, 90],
    marks: [[390, 131, 117, 59]],
    edits: [
      {
        file: "Invoice.cs",
        after: "        AddAddressBlock(\"Bill to\", Model.Customer);",
        add: [
          "        AddAddressBlock(\"Ship to\", Model.Shipping);"
        ]
      }
    ]
  },
  {
    prompt: "Show a product description under each item, in small grey text.",
    unfold: "void ComposeItems(IContainer container)",
    zoom: [30, 205, 280, 270],
    marks: [[44, 237, 142, 236]],
    edits: [
      {
        file: "Invoice.cs",
        after: "            table.Cell().Element(Cell).Text(item.Name);",
        remove: 1,
        add: [
          "            table.Cell().Element(Cell).Column(column =>",
          "            {",
          "                column.Item().Text(item.Name);",
          "",
          "                column.Item()",
          "                    .PaddingTop(3)",
          "                    .Text(item.Description)",
          "                    .FontSize(8)",
          "                    .FontColor(Colors.Grey.Darken1);",
          "            });"
        ]
      }
    ]
  },
  {
    prompt: "Split VAT into a separate line for each tax rate.",
    unfold: "void ComposeTotals(IContainer container)",
    zoom: [300, 488, 270, 150],
    marks: [[319, 516, 232, 35]],
    edits: [
      {
        file: "Invoice.cs",
        after: "        AddLine(\"VAT\", Model.Vat);",
        remove: 1,
        add: [
          "",
          "        foreach (var vat in Model.Items.GroupBy(x => x.VatRate))",
          "            AddLine($\"VAT {vat.Key:P0}\", vat.Sum(x => x.Vat));"
        ]
      }
    ]
  },
  {
    prompt: "Add a Pay now button below the total, linking to online payment.",
    unfold: "void ComposeTotals(IContainer container)",
    zoom: [300, 488, 270, 150],
    marks: [[319, 590, 232, 45]],
    edits: [
      {
        file: "Invoice.cs",
        after: "            .FontColor(Accent);",
        add: [
          "",
          "        column.Item()",
          "            .PaddingTop(16)",
          "            .Hyperlink(Model.PaymentLink)",
          "            .Background(Accent)",
          "            .CornerRadius(6)",
          "            .PaddingVertical(10)",
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
  watch: ["./codeExamples/Invoice.cs"],

  load: () => buildSession({
    title: "Invoice.pdf",
    renders: "/homepage/quick-start-",
    page: { width: 595, height: 842 },
    overview: { width: 595, height: 340 },
    ending: [-27, -27, 649, 682],
    files: [
      { name: "Invoice.cs", lines: fs.readFileSync(new URL("./codeExamples/Invoice.cs", import.meta.url), "utf-8").trimEnd().split("\n") }
    ],
    unfold: "void ComposePage(PageDescriptor page)",
    rounds
  })
});
