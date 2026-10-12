/* The feature tags of the "All you need to generate and modify PDFs" card, in the order the card
   shows them: what goes into a new document first, then what can be done with an existing PDF.
   Every lab variant draws from this one list, so the vocabulary stays identical across proposals. */

export interface LabFeature {
  icon: string;
  label: string;
  group: "generate" | "modify";
}

export const features: LabFeature[] = [
  { icon: "fa-palette", label: "Styling", group: "generate" },
  { icon: "fa-text", label: "Text", group: "generate" },
  { icon: "fa-image", label: "Images", group: "generate" },
  { icon: "fa-bezier-curve", label: "SVG", group: "generate" },
  { icon: "fa-table", label: "Tables", group: "generate" },
  { icon: "fa-list", label: "Lists", group: "generate" },
  { icon: "fa-newspaper", label: "Multi-column", group: "generate" },
  { icon: "fa-page-break", label: "Page breaks", group: "generate" },
  { icon: "fa-hashtag", label: "Page numbers", group: "generate" },
  { icon: "fa-link", label: "Hyperlinks", group: "generate" },
  { icon: "fa-chart-simple", label: "Charts", group: "generate" },
  { icon: "fa-qrcode", label: "Barcodes", group: "generate" },
  { icon: "fa-map", label: "Maps", group: "generate" },
  { icon: "fa-universal-access", label: "Accessibility", group: "generate" },
  { icon: "fa-object-union", label: "Merging", group: "modify" },
  { icon: "fa-scissors", label: "Page extraction", group: "modify" },
  { icon: "fa-clone", label: "Overlays", group: "modify" },
  { icon: "fa-paperclip", label: "Attachments", group: "modify" },
  { icon: "fa-lock", label: "Encryption", group: "modify" },
  { icon: "fa-tags", label: "Metadata", group: "modify" }
];

export const generateFeatures = features.filter(feature => feature.group === "generate");
export const modifyFeatures = features.filter(feature => feature.group === "modify");

export function featureIndex(label: string): number {
  return features.findIndex(feature => feature.label === label);
}
