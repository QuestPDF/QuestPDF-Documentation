/* The Features Overview page (FeaturesOverview.vue). Chapter and category names use the documentation's own terms;
   feature names say what a reader gets, not what the API calls it. */

export interface Feature {
  name: string;
  link: string;
}

export interface FeatureCategory {
  name: string;
  /* a Font Awesome regular icon */
  icon: string;
  features: Feature[];
}

export interface FeatureChapter {
  name: string;
  categories: FeatureCategory[];
}

export const featureChapters: FeatureChapter[] = [
  {
    name: "Development tools",
    categories: [
      {
        name: "Companion App",
        icon: "fa-display",
        features: [
          { name: "Live preview", link: "/companion/usage.html" },
          { name: "Magnifier", link: "/companion/features.html#magnifier" },
          { name: "Coordinate picker", link: "/companion/features.html#coordinate-picker" },
          { name: "Size measurement", link: "/companion/features.html#size-measurement" },
          { name: "Element inspection", link: "/companion/features.html#element-selection" },
          { name: "Content search", link: "/companion/features.html#content-searching" },
          { name: "Jump to source code", link: "/companion/features.html#go-to-implementation" }
        ]
      },
      {
        name: "Debugging",
        icon: "fa-bug",
        features: [
          { name: "Exception analysis", link: "/companion/features.html#runtime-exceptions" },
          { name: "Layout debugging", link: "/companion/features.html#layout-issue-debugging" },
          { name: "Debug outlines", link: "/api-reference/debug-area.html" },
          { name: "Debug pointers", link: "/api-reference/debug-pointer.html" }
        ]
      }
    ]
  },
  {
    name: "Code organization",
    categories: [
      {
        name: "Code patterns",
        icon: "fa-code",
        features: [
          { name: "Execution order", link: "/concepts/code-patterns/execution-order.html" },
          { name: "Document structure", link: "/concepts/code-patterns/document-structure.html" },
          { name: "Local helpers", link: "/concepts/code-patterns/local-helpers.html" },
          { name: "Reusable styles", link: "/concepts/code-patterns/content-styling.html" },
          { name: "Extension methods", link: "/concepts/code-patterns/extension-methods.html" }
        ]
      },
      {
        name: "Components",
        icon: "fa-puzzle-piece",
        features: [
          { name: "Components", link: "/concepts/code-patterns/components.html" },
          { name: "Dynamic components", link: "/concepts/code-patterns/dynamic-components.html" },
          { name: "Capture positions", link: "/concepts/code-patterns/capture-content-position.html" }
        ]
      },
      {
        name: "Prototyping",
        icon: "fa-wand-magic-sparkles",
        features: [
          { name: "Placeholder text", link: "/concepts/prototyping.html#text" },
          { name: "Placeholder colours", link: "/concepts/prototyping.html#colors" },
          { name: "Placeholder images", link: "/concepts/prototyping.html#image" },
          { name: "Placeholder boxes", link: "/api-reference/placeholder.html" }
        ]
      }
    ]
  },
  {
    name: "Layout",
    categories: [
      {
        name: "Page setup",
        icon: "fa-file",
        features: [
          { name: "Pages", link: "/api-reference/page/basics.html" },
          { name: "Headers and footers", link: "/api-reference/page/slots.html" },
          { name: "Page size and margins", link: "/api-reference/page/settings.html" }
        ]
      },
      {
        name: "Tables",
        icon: "fa-table",
        features: [
          { name: "Tables", link: "/api-reference/table/basics.html" },
          { name: "Table cell styles", link: "/api-reference/table/cell-style-pattern.html" },
          { name: "Table headers and footers", link: "/api-reference/table/header-and-footer.html" },
          { name: "Overlapping table cells", link: "/api-reference/table/overlapping-cells.html" }
        ]
      },
      {
        name: "Layout containers",
        icon: "fa-table-layout",
        features: [
          { name: "Columns", link: "/api-reference/column.html" },
          { name: "Rows", link: "/api-reference/row.html" },
          { name: "Lists", link: "/api-reference/lists.html" },
          { name: "Layers", link: "/api-reference/layers.html" },
          { name: "Stacking order", link: "/api-reference/zindex.html" },
          { name: "Inline wrapping", link: "/api-reference/inlined.html" },
          { name: "Multi-column text", link: "/api-reference/multi-column.html" }
        ]
      },
      {
        name: "Size and spacing",
        icon: "fa-ruler-combined",
        features: [
          { name: "Width", link: "/api-reference/width.html" },
          { name: "Height", link: "/api-reference/height.html" },
          { name: "Padding", link: "/api-reference/padding.html" },
          { name: "Alignment", link: "/api-reference/alignment.html" },
          { name: "Aspect ratio", link: "/api-reference/aspect-ratio.html" },
          { name: "Fill available space", link: "/api-reference/extend.html" },
          { name: "Shrink to content", link: "/api-reference/shrink.html" },
          { name: "Unconstrained size", link: "/api-reference/unconstrained.html" },
          { name: "Length units", link: "/concepts/length-unit-types.html" }
        ]
      },
      {
        name: "Transformations",
        icon: "fa-rotate",
        features: [
          { name: "Rotation", link: "/api-reference/rotate.html" },
          { name: "Scaling", link: "/api-reference/scale.html" },
          { name: "Scale to fit", link: "/api-reference/scale-to-fit.html" },
          { name: "Flip and mirror", link: "/api-reference/flip.html" },
          { name: "Offset", link: "/api-reference/offset.html" }
        ]
      },
      {
        name: "Content flow",
        icon: "fa-file-lines",
        features: [
          { name: "Page breaks", link: "/api-reference/page-break.html" },
          { name: "Avoid page breaks", link: "/api-reference/prevent-page-break.html" },
          { name: "Reserve space", link: "/api-reference/ensure-space.html" },
          { name: "Keep together", link: "/api-reference/show-entire.html" },
          { name: "Repeating headers", link: "/api-reference/decoration.html" },
          { name: "Repeat on every page", link: "/api-reference/repeat.html" },
          { name: "Conditional content", link: "/api-reference/show-if.html" },
          { name: "Show on first page only", link: "/api-reference/show-once.html" },
          { name: "Skip the first page", link: "/api-reference/skip-once.html" },
          { name: "Truncate overflow", link: "/api-reference/stop-paging.html" }
        ]
      }
    ]
  },
  {
    name: "Text",
    categories: [
      {
        name: "Text basics",
        icon: "fa-text",
        features: [
          { name: "Rich text", link: "/api-reference/text/basics.html" },
          { name: "Page numbers", link: "/api-reference/text/page-numbers.html" },
          { name: "Elements inside text", link: "/api-reference/text/injecting-custom-content.html" },
          { name: "Default text style", link: "/api-reference/default-text-style.html" },
          { name: "Style inheritance", link: "/api-reference/text/style-inheritance.html" }
        ]
      },
      {
        name: "Text style",
        icon: "fa-font",
        features: [
          { name: "Font size", link: "/api-reference/text/text-style.html#font-size" },
          { name: "Font family", link: "/api-reference/text/text-style.html#font-family" },
          { name: "Font colour", link: "/api-reference/text/text-style.html#font-color" },
          { name: "Highlight", link: "/api-reference/text/text-style.html#background-color" },
          { name: "Font weight", link: "/api-reference/text/text-style.html#font-weight" },
          { name: "Italic", link: "/api-reference/text/text-style.html#italic" },
          { name: "Underline and strikethrough", link: "/api-reference/text/text-style.html#decorations" },
          { name: "Subscript", link: "/api-reference/text/text-style.html#subscript" },
          { name: "Superscript", link: "/api-reference/text/text-style.html#superscript" },
          { name: "Line height", link: "/api-reference/text/text-style.html#line-height" },
          { name: "Letter spacing", link: "/api-reference/text/text-style.html#letter-spacing" },
          { name: "Word spacing", link: "/api-reference/text/text-style.html#word-spacing" },
          { name: "Hyphenation", link: "/api-reference/text/text-style.html#hyphenation" },
          { name: "OpenType features", link: "/api-reference/text/text-style.html#font-features" },
          { name: "Break long words", link: "/api-reference/text/text-style.html#break-anywhere" }
        ]
      },
      {
        name: "Paragraph style",
        icon: "fa-paragraph",
        features: [
          { name: "Alignment and justification", link: "/api-reference/text/paragraph-style.html#text-alignment" },
          { name: "Paragraph spacing", link: "/api-reference/text/paragraph-style.html#paragraph-spacing" },
          { name: "First-line indent", link: "/api-reference/text/paragraph-style.html#first-line-indentation" },
          { name: "Line clamping", link: "/api-reference/text/paragraph-style.html#clamp-line-with-ellipsis" }
        ]
      },
      {
        name: "Fonts and languages",
        icon: "fa-language",
        features: [
          { name: "Custom fonts", link: "/api-reference/text/font-management.html" },
          { name: "Font fallback", link: "/api-reference/text/text-style.html#font-fallback" },
          { name: "Additional languages", link: "/api-reference/text/font-management.html#covering-additional-languages" },
          { name: "Right-to-left text", link: "/api-reference/content-direction.html" },
          { name: "Missing glyph detection", link: "/api-reference/text/font-management.html#missing-text-glyphs" }
        ]
      }
    ]
  },
  {
    name: "Visual content",
    categories: [
      {
        name: "Styling",
        icon: "fa-palette",
        features: [
          { name: "Backgrounds", link: "/api-reference/background.html" },
          { name: "Borders", link: "/api-reference/border.html" },
          { name: "Rounded corners", link: "/api-reference/rounded-corners.html" },
          { name: "Shadows", link: "/api-reference/shadow.html" },
          { name: "Colour palette", link: "/concepts/colors.html" }
        ]
      },
      {
        name: "Images",
        icon: "fa-image",
        features: [
          { name: "Images", link: "/api-reference/image/basics.html" },
          { name: "SVG", link: "/api-reference/image/svg.html" },
          { name: "Image compression", link: "/api-reference/image/optimization.html" },
          { name: "Shared images", link: "/api-reference/image/shared.html" },
          { name: "Images sized by layout", link: "/api-reference/image/dynamic.html" }
        ]
      },
      {
        name: "Graphics",
        icon: "fa-chart-mixed",
        features: [
          { name: "Charts", link: "/api-reference/charts.html" },
          { name: "Barcodes and QR codes", link: "/api-reference/barcodes.html" },
          { name: "Maps", link: "/api-reference/maps.html" },
          { name: "Vector graphics", link: "/api-reference/complex-graphics.html" },
          { name: "SkiaSharp canvas", link: "/api-reference/skiasharp-integration.html" },
          { name: "Separator lines", link: "/api-reference/line.html" }
        ]
      }
    ]
  },
  {
    name: "Document output",
    categories: [
      {
        name: "Document generation",
        icon: "fa-file-export",
        features: [
          { name: "Output formats", link: "/concepts/generating-output.html" },
          { name: "Document metadata", link: "/concepts/document-metadata.html" },
          { name: "Document settings", link: "/concepts/document-settings.html" },
          { name: "Accessibility", link: "/concepts/accessibility.html" },
          { name: "Hyperlinks", link: "/api-reference/hyperlink.html" },
          { name: "Named sections", link: "/api-reference/section.html" },
          { name: "Lazy generation", link: "/api-reference/lazy.html" }
        ]
      },
      {
        name: "Document operations",
        icon: "fa-copy",
        features: [
          { name: "Merge documents", link: "/concepts/document-operations.html#merging-documents" },
          { name: "Extract pages", link: "/concepts/document-operations.html#page-selection" },
          { name: "Overlays and watermarks", link: "/concepts/document-operations.html#overlays-and-underlays" },
          { name: "Encryption", link: "/concepts/document-operations.html#document-encryption" },
          { name: "Decryption", link: "/concepts/document-operations.html#document-decryption" },
          { name: "Linearization", link: "/concepts/document-operations.html#document-linearization" },
          { name: "Attachments", link: "/concepts/document-operations.html#file-attachments" },
          { name: "XMP metadata", link: "/concepts/document-operations.html#xmp-metadata-extension" }
        ]
      }
    ]
  }
];
