/* The Companion demo's content: the invoice from the screenshots in A4 points (595 x 842), and its document tree.
   Every readout the demo shows (position, size, measured distances) is computed from these boxes. */

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface TextBlock extends Rect {
  id?: string;
  text: string;
  size: number;
  align?: "left" | "right" | "center";
  tone?: "accent" | "strong" | "body" | "muted";
}

export interface Line extends Rect {
  tone: "strong" | "soft";
}

export const page = { w: 595, h: 842 };

export const rects = {
  title: { x: 50, y: 50, w: 126, h: 24 },
  logo: { x: 445, y: 50, w: 100, h: 50 },
  header: { x: 50, y: 50, w: 495, h: 52 },
  from: { x: 50, y: 142.8, w: 222.5, h: 101.4 },
  for: { x: 322.5, y: 142.8, w: 222.5, h: 101.4 },
  unitPrice: { x: 336.4, y: 254.2, w: 52, h: 14.4 },
  grandTotal: { x: 412, y: 480, w: 133, h: 18 },
  comments: { x: 50, y: 520, w: 495, h: 99.6 },
  commentsTitle: { x: 60, y: 530.6, w: 66.4, h: 17 }
} satisfies Record<string, Rect>;

const fromLines = ["Multiplicabo Scientia", "Villa pisces bellum", "Parva digitus, Value fractionem", "experientiam84@dicendum.com", "824-233-6895"];
const forLines = ["Disponere Hauriret", "Ictus ferre induere", "Tempore induere, Share centrum", "material76@accipiet.com", "548-907-9751"];

const products = [
  ["Lignum peritia corpus", "78,73$", "3", "236,19$"],
  ["Navem coeperunt Posside", "77,91$", "8", "623,28$"],
  ["Indica homines", "56,45$", "7", "395,15$"],
  ["Magna quaestio", "92,74$", "8", "741,92$"],
  ["Scriptum noun", "26,75$", "3", "80,25$"],
  ["Sat lapis mortuus", "21,3$", "9", "191,7$"],
  ["Pulchrae melodiam frequentare", "19$", "5", "95$"],
  ["Dimidiam ita", "59,69$", "4", "238,76$"]
];

const comments = [
  "Vigilate adiuva minor octo puer Auferatur row pars. More aut statum tatem engine mitis",
  "nervo art anas habet minimus apta recte. Consilium mater disponere calor ita nos iratus",
  "descendit commune usus domum tatem. Evolvere centum equo stetit aurem octo",
  "momento adduxerunt ferrum."
];

/* rough advance of the body font, used for skeleton bar widths and right alignment */
function width(text: string, size: number) {
  return Math.round(text.length * size * 0.5 * 10) / 10;
}

function address(x: number, label: string, lines: string[]) {
  return [
    { x, y: 142.8, w: width(label, 11), h: 14, text: label, size: 11, tone: "strong" as const },
    ...lines.map((text, index) => ({ x, y: 164.4 + index * 16, w: width(text, 11), h: 16, text, size: 11 }))
  ];
}

function right(edge: number, y: number, text: string, size: number, tone?: TextBlock["tone"]): TextBlock {
  const w = width(text, size);
  return { x: edge - w, y, w, h: size * 1.4, text, size, align: "right", tone };
}

export const texts: TextBlock[] = [
  { ...rects.title, text: "Invoice #8131", size: 20, tone: "accent" },
  { x: 50, y: 74, w: 107, h: 14, text: "Issue date: 27.05.2026", size: 11 },
  { x: 50, y: 88, w: 101, h: 14, text: "Due date: 10.06.2026", size: 11 },

  ...address(rects.from.x, "From", fromLines),
  ...address(rects.for.x, "For", forLines),

  { x: 50, y: 254.2, w: 8, h: 14.4, text: "#", size: 11, tone: "strong" },
  { x: 75, y: 254.2, w: 46, h: 14.4, text: "Product", size: 11, tone: "strong" },
  { ...rects.unitPrice, text: "Unit price", size: 11, align: "right", tone: "strong" },
  right(467, 254.2, "Quantity", 11, "strong"),
  right(545, 254.2, "Total", 11, "strong"),

  ...products.flatMap(([name, price, quantity, total], index) => {
    const y = 280 + index * 24.4;
    return [
      { x: 50, y, w: 6, h: 14, text: `${index + 1}`, size: 10 },
      { x: 75, y, w: width(name, 10), h: 14, text: name, size: 10 },
      right(388.4, y, price, 10),
      right(467, y, quantity, 10),
      right(545, y, total, 10)
    ];
  }),

  { ...rects.grandTotal, text: "Grand total: 2602,25$", size: 13, align: "right", tone: "strong" },

  { ...rects.commentsTitle, text: "Comments", size: 13, tone: "strong" },
  ...comments.map((text, index) => ({ x: 60, y: 552 + index * 14, w: [470, 466, 420, 132][index], h: 14, text, size: 9.5 })),

  { x: 283, y: 790, w: 29, h: 14, text: "1 / 1", size: 9, align: "center", tone: "muted" }
];

export const lines: Line[] = [
  { x: 50, y: 158.8, w: 222.5, h: 1, tone: "strong" },
  { x: 322.5, y: 158.8, w: 222.5, h: 1, tone: "strong" },
  { x: 50, y: 270.2, w: 495, h: 1, tone: "strong" },
  ...products.map((_, index) => ({ x: 50, y: 299.4 + index * 24.4, w: 495, h: 0.6, tone: "soft" as const }))
];

/* The document tree, flattened the way the app draws it: one call chain per row, children of folders indented.
   `group` rows hide while that group is collapsed; `opens` names the group a row's chevron toggles. */

export interface TreeRow {
  id: string;
  label: string;
  hint?: string;
  depth: number;
  section?: boolean;
  chevron?: boolean;
  folder?: boolean;
  group?: string;
  opens?: string;
}

export const tree: TreeRow[] = [
  { id: "document", label: "Document", depth: 0, section: true, folder: true },
  { id: "background", label: "Background", depth: 0, section: true, chevron: true },
  { id: "header", label: "Header", depth: 0, section: true, chevron: true, opens: "header" },
  { id: "compose-header", label: "ComposeHeader", depth: 0, group: "header" },
  { id: "header-row", label: "Row", depth: 0, folder: true, group: "header" },
  { id: "header-column", label: "Column", depth: 1, folder: true, chevron: true, group: "header" },
  { id: "title", label: "Text Block", hint: "Invoice #8131", depth: 2, chevron: true, group: "header" },
  { id: "issue", label: "Text Block", hint: "Issue date: 27.05.2026", depth: 2, chevron: true, group: "header" },
  { id: "due", label: "Text Block", hint: "Due date: 10.06.2026", depth: 2, chevron: true, group: "header" },
  { id: "logo", label: "Constrained", depth: 1, chevron: true, group: "header" },
  { id: "placeholder", label: "Placeholder", depth: 1, group: "header" },
  { id: "content", label: "Content", depth: 0, section: true, chevron: true, opens: "content" },
  { id: "compose-content", label: "ComposeContent", depth: 0, group: "content" },
  { id: "content-padding", label: "Padding", depth: 0, group: "content" },
  { id: "content-column", label: "Column", depth: 0, folder: true, group: "content" },
  { id: "address-row", label: "Row", depth: 1, folder: true, chevron: true, group: "content" },
  { id: "from", label: "AddressComponent", depth: 2, chevron: true, group: "content" },
  { id: "spacer", label: "Empty", depth: 2, chevron: true, group: "content" },
  { id: "for", label: "AddressComponent", depth: 2, chevron: true, group: "content" },
  { id: "compose-table", label: "ComposeTable", depth: 1, chevron: true, group: "content", opens: "table" },
  { id: "decoration", label: "Decoration", depth: 2, folder: true, group: "table" },
  { id: "before", label: "Before", depth: 2, chevron: true, group: "table" },
  { id: "table", label: "Table", depth: 2, folder: true, group: "table" },
  { id: "cell-number", label: "CellStyle", depth: 3, chevron: true, group: "table" },
  { id: "cell-product", label: "CellStyle", depth: 3, chevron: true, group: "table" },
  { id: "cell-padding", label: "Padding", depth: 3, group: "table" },
  { id: "unit-price", label: "Text Block", hint: "Unit price", depth: 3, group: "table" },
  { id: "cell-quantity", label: "CellStyle", depth: 3, chevron: true, group: "table" },
  { id: "cell-total", label: "CellStyle", depth: 3, chevron: true, group: "table" },
  { id: "grand-total", label: "Alignment", depth: 1, chevron: true, group: "content" },
  { id: "comments", label: "Padding", depth: 1, chevron: true, group: "content" },
  { id: "footer", label: "Footer", depth: 0, section: true, chevron: true },
  { id: "foreground", label: "Foreground", depth: 0, section: true, chevron: true }
];

/* layout status dots, colours from docs/companion/features.md */
export const statusColors = {
  root: "#F44336",
  wrapped: "#FF9800",
  partial: "#FFEB3B",
  done: "#4CAF50",
  empty: "#00BCD4",
  skipped: "#9E9E9E"
};

export const layoutStatus: Record<string, keyof typeof statusColors> = {
  document: "wrapped",
  background: "done",
  header: "wrapped",
  "compose-header": "wrapped",
  "header-row": "root",
  "header-column": "done",
  title: "done",
  issue: "done",
  due: "done",
  logo: "root",
  placeholder: "root",
  content: "skipped",
  "compose-content": "skipped",
  "content-padding": "skipped",
  "content-column": "skipped",
  "address-row": "skipped",
  from: "skipped",
  spacer: "skipped",
  for: "skipped",
  "compose-table": "skipped",
  "grand-total": "skipped",
  comments: "skipped",
  footer: "done",
  foreground: "empty"
};

/* code shown in the floating editor; `mark` is the line Ctrl + click lands on */
export interface CodeLine {
  text: string;
  indent: number;
}

export const commentsCode: CodeLine[] = [
  { indent: 0, text: "void ComposeComments(IContainer container)" },
  { indent: 0, text: "{" },
  { indent: 1, text: "container" },
  { indent: 2, text: ".Background(Colors.Grey.Lighten3)" },
  { indent: 2, text: ".Padding(10)" },
  { indent: 2, text: ".Column(column =>" },
  { indent: 2, text: "{" },
  { indent: 3, text: "column.Spacing(5);" },
  { indent: 3, text: "column.Item().Text(\"Comments\").FontSize(14);" },
  { indent: 3, text: "column.Item().Text(Model.Comments);" },
  { indent: 2, text: "});" }
];

export const contentCode: CodeLine[] = [
  { indent: 0, text: "void ComposeContent(IContainer container)" },
  { indent: 0, text: "{" },
  { indent: 1, text: "container.PaddingVertical(40).Column(column =>" },
  { indent: 1, text: "{" },
  { indent: 2, text: "column.Spacing(20);" },
  { indent: 2, text: "column.Item().Row(row => ...);" },
  { indent: 2, text: "column.Item().Element(ComposeTable);" },
  { indent: 0, text: "" },
  { indent: 2, text: "var total = Model.Items.Sum(x => x.Price * x.Quantity);" },
  { indent: 2, text: "column.Item().AlignRight().Text($\"Grand total: {total}$\");" },
  { indent: 0, text: "" },
  { indent: 2, text: "column.Item().Element(ComposeComments);" }
];

export const stackTrace = [
  ["InvoiceDocument.", "<ComposeHeader>b__7_1", "(ColumnDescriptor column)"],
  ["QuestPDF.Fluent.", "ColumnExtensions.Column", "(IContainer element, Action`1 handler)"],
  ["InvoiceDocument.", "<ComposeHeader>b__7_0", "(RowDescriptor row)"],
  ["QuestPDF.Fluent.", "RowExtensions.Row", "(IContainer element, Action`1 handler)"],
  ["InvoiceDocument.", "ComposeHeader", "(IContainer container)"],
  ["QuestPDF.Fluent.", "ElementExtensions.Element", "(IContainer parent, Action`1 handler)"],
  ["InvoiceDocument.", "<Compose>b__6_0", "(PageDescriptor page)"],
  ["QuestPDF.Fluent.", "PageExtensions.Page", "(IDocumentContainer document, Action`1 handler)"]
];
