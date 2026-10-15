/* The Features Overview page: every documented feature, grouped by chapter. Rendered by
   FeaturesOverview.vue, one row per feature and its sub-pages as child rows. */

export interface Feature {
  name: string;
  /* one line about the feature, shown beside its name */
  summary: string;
  /* its documentation page; a feature without one only groups its children */
  link?: string;
}

export interface FeatureItem extends Feature {
  /* a Font Awesome regular icon */
  icon: string;
  children?: Feature[];
}

export interface FeatureCategory {
  name: string;
  description: string;
  items: FeatureItem[];
}

export const featureCategories: FeatureCategory[] = [
  {
    name: "Companion App",
    description: "A live preview that refreshes as you save, with tools to measure and inspect elements, search the content, and trace exceptions and layout issues to their source.",
    items: [
      {
        icon: "fa-rocket",
        name: "Installation and Getting Started",
        summary: "Install, connect to your project, preview with hot reload",
        link: "/companion/usage.html"
      },
      {
        icon: "fa-ruler-combined",
        name: "Precision Tools",
        summary: "Magnifier, coordinate picker and size measurement for exact spacing",
        link: "/companion/features.html#magnifier",
        children: [
          {
            name: "Magnifier",
            summary: "Zoom into the preview to check line thickness and glyph rendering",
            link: "/companion/features.html#magnifier"
          },
          {
            name: "Coordinate Picker",
            summary: "Read the exact position of any point in the document's units",
            link: "/companion/features.html#coordinate-picker"
          },
          {
            name: "Size measurement",
            summary: "Measure distances between points and the size of any element",
            link: "/companion/features.html#size-measurement"
          }
        ]
      },
      {
        icon: "fa-compass",
        name: "Navigation Tools",
        summary: "Inspect elements, search content, jump to the source code",
        link: "/companion/features.html#element-selection",
        children: [
          {
            name: "Element Inspection",
            summary: "Click an element to see its place in the tree and its properties",
            link: "/companion/features.html#element-selection"
          },
          {
            name: "Content Searching",
            summary: "Find text in the generated document and jump to each page",
            link: "/companion/features.html#content-searching"
          },
          {
            name: "Go to Implementation",
            summary: "Jump from an element in the preview to the C# line that drew it",
            link: "/companion/features.html#go-to-implementation"
          }
        ]
      },
      {
        icon: "fa-circle-exclamation",
        name: "Runtime Exception Analysis",
        summary: "Exception messages, stack traces and source context",
        link: "/companion/features.html#runtime-exceptions"
      },
      {
        icon: "fa-bug",
        name: "Layout Issue Debugging",
        summary: "Color-coded diagnosis of layout failures and their root causes",
        link: "/companion/features.html#layout-issue-debugging"
      }
    ]
  },
  {
    name: "Document Operations",
    description: "Process PDF files that already exist: merge documents, extract and reorder pages, add overlays, encrypt or decrypt, and embed attachments and metadata.",
    items: [
      {
        icon: "fa-copy",
        name: "Merging Documents",
        summary: "Combine whole files, or selected pages from each, into one PDF",
        link: "/concepts/document-operations.html#merging-documents"
      },
      {
        icon: "fa-scissors",
        name: "Page Selection / Extraction",
        summary: "Pick, reorder, reverse or filter pages with range syntax",
        link: "/concepts/document-operations.html#page-selection"
      },
      {
        icon: "fa-clone",
        name: "Overlays / Underlays",
        summary: "Watermarks, headers or letterhead layered onto chosen pages",
        link: "/concepts/document-operations.html#overlays-and-underlays"
      },
      {
        icon: "fa-lock",
        name: "Document Encryption",
        summary: "40 to 256-bit encryption, user and owner passwords, permissions",
        link: "/concepts/document-operations.html#document-encryption"
      },
      {
        icon: "fa-unlock",
        name: "Document Decryption",
        summary: "Remove passwords and restrictions from protected PDFs",
        link: "/concepts/document-operations.html#document-decryption"
      },
      {
        icon: "fa-globe",
        name: "Document Linearization",
        summary: "Fast web view: the first page shows before the download ends",
        link: "/concepts/document-operations.html#document-linearization"
      },
      {
        icon: "fa-paperclip",
        name: "Files Attachments",
        summary: "Embed files with any relationship, fully PDF/A compliant",
        link: "/concepts/document-operations.html#file-attachments"
      },
      {
        icon: "fa-tags",
        name: "Extending XMP Metadata",
        summary: "Custom XMP in PDF/A documents for ZUGFeRD and other standards",
        link: "/concepts/document-operations.html#xmp-metadata-extension"
      }
    ]
  },
  {
    name: "Layout Elements",
    description: "Containers that structure your content: pages with headers and footers, tables, columns, rows, lists, layers and multi-column flows.",
    items: [
      {
        icon: "fa-file",
        name: "Page",
        summary: "Size, margins, orientation, header, footer, watermarks; paged or continuous",
        link: "/api-reference/page/basics.html",
        children: [
          {
            name: "Slots",
            summary: "Header and footer that repeat, with the content flowing between them",
            link: "/api-reference/page/slots.html"
          },
          {
            name: "Properties",
            summary: "Size, orientation, margins per side, colour, continuous mode",
            link: "/api-reference/page/settings.html"
          }
        ]
      },
      {
        icon: "fa-table",
        name: "Table",
        summary: "Rows and columns with cell spans, repeating headers and auto-pagination",
        link: "/api-reference/table/basics.html",
        children: [
          {
            name: "Cell Style Patterns",
            summary: "Alternating rows, borders by position, highlighted columns",
            link: "/api-reference/table/cell-style-pattern.html"
          },
          {
            name: "Header and Footer",
            summary: "Rows repeated at the top and bottom of every page the table spans",
            link: "/api-reference/table/header-and-footer.html"
          },
          {
            name: "Overlapping Cells",
            summary: "Cells drawn over other cells for backgrounds, highlights and annotations",
            link: "/api-reference/table/overlapping-cells.html"
          }
        ]
      },
      {
        icon: "fa-table-rows",
        name: "Column",
        summary: "Stack children vertically with spacing, paginating automatically",
        link: "/api-reference/column.html"
      },
      {
        icon: "fa-table-columns",
        name: "Row",
        summary: "Place children side by side with proportional, fixed or auto widths",
        link: "/api-reference/row.html"
      },
      {
        icon: "fa-window-maximize",
        name: "Decoration",
        summary: "Header and footer repeated on every page, content flowing between",
        link: "/api-reference/decoration.html"
      },
      {
        icon: "fa-list",
        name: "List",
        summary: "Numbered and bulleted lists with custom markers and nested levels",
        link: "/api-reference/lists.html"
      },
      {
        icon: "fa-layer-group",
        name: "Layers",
        summary: "Stacked content planes for backgrounds, watermarks and overlays",
        link: "/api-reference/layers.html"
      },
      {
        icon: "fa-bars-staggered",
        name: "Inlined",
        summary: "Flow items like words in a paragraph, wrapping automatically",
        link: "/api-reference/inlined.html"
      },
      {
        icon: "fa-newspaper",
        name: "Multi Column",
        summary: "Newspaper-style columns that flow into each other and across pages",
        link: "/api-reference/multi-column.html"
      }
    ]
  },
  {
    name: "Visual Content",
    description: "Elements that draw the content: rich text, images, lines, styled containers, charts, barcodes and QR codes, maps, and custom vector graphics.",
    items: [
      {
        icon: "fa-palette",
        name: "Styled Containers",
        summary: "Background, border, rounded corners and shadow for any element",
        children: [
          {
            name: "Background",
            summary: "Solid fill behind the content, Material palette or any HEX value",
            link: "/api-reference/background.html"
          },
          {
            name: "Border",
            summary: "Lines on any sides, each with its own width and colour",
            link: "/api-reference/border.html"
          },
          {
            name: "Rounded Corners",
            summary: "Radius for all corners or each one; backgrounds and borders follow",
            link: "/api-reference/rounded-corners.html"
          },
          {
            name: "Shadows",
            summary: "Soft drop shadow with configurable blur, offset and colour",
            link: "/api-reference/shadow.html"
          }
        ]
      },
      {
        icon: "fa-text",
        name: "Text",
        summary: "Rich text with styles, automatic wrapping and pagination, page numbers",
        link: "/api-reference/text/basics.html",
        children: [
          {
            name: "Text Style",
            summary: "Font family, size, weight, colour, letter spacing, decoration",
            link: "/api-reference/text/text-style.html"
          },
          {
            name: "Paragraph Style",
            summary: "Alignment, indentation, spacing, line height, line clamping",
            link: "/api-reference/text/paragraph-style.html"
          },
          {
            name: "Page Numbers",
            summary: "Current page, total count and where a named section starts or ends",
            link: "/api-reference/text/page-numbers.html"
          },
          {
            name: "Injecting Content",
            summary: "Hyperlinks, inline elements and custom content flowing with words",
            link: "/api-reference/text/injecting-custom-content.html"
          },
          {
            name: "Style Inheritance",
            summary: "Styles set on a container cascade to everything inside it",
            link: "/api-reference/text/style-inheritance.html"
          },
          {
            name: "Font Management",
            summary: "Register files or system fonts, pick fallbacks, embed subsets",
            link: "/api-reference/text/font-management.html"
          }
        ]
      },
      {
        icon: "fa-image",
        name: "Image",
        summary: "PNG, JPEG, WebP and SVG with compression, resampling and caching",
        link: "/api-reference/image/basics.html",
        children: [
          {
            name: "Size Optimization",
            summary: "Resample to a target DPI and compress without visible loss",
            link: "/api-reference/image/optimization.html"
          },
          {
            name: "Shared Images",
            summary: "Load once and reuse, so repeated logos do not grow the file",
            link: "/api-reference/image/shared.html"
          },
          {
            name: "SVG",
            summary: "Vector images that stay sharp at any scale and print size",
            link: "/api-reference/image/svg.html"
          },
          {
            name: "Images Of Dynamic Size",
            summary: "Generate at the exact size the layout provides, ideal for charts",
            link: "/api-reference/image/dynamic.html"
          }
        ]
      },
      {
        icon: "fa-horizontal-rule",
        name: "Line",
        summary: "Horizontal or vertical separators with thickness and color",
        link: "/api-reference/line.html"
      },
      {
        icon: "fa-grid-2",
        name: "Placeholder",
        summary: "Grey box with diagonal lines and a label to reserve space while prototyping",
        link: "/api-reference/placeholder.html"
      },
      {
        icon: "fa-chart-mixed",
        name: "Charts",
        summary: "ScottPlot, LiveCharts and Microcharts rendered as vector graphics",
        link: "/api-reference/charts.html"
      },
      {
        icon: "fa-qrcode",
        name: "Barcodes / QR Codes",
        summary: "1D barcodes and 2D QR codes with popular third-party libraries",
        link: "/api-reference/barcodes.html"
      },
      {
        icon: "fa-map-location-dot",
        name: "Maps",
        summary: "Static maps embedded in documents, with a Mapbox tutorial",
        link: "/api-reference/maps.html"
      },
      {
        icon: "fa-bezier-curve",
        name: "Complex Graphics",
        summary: "Canvas-style paths, shapes and bezier curves with fill and stroke",
        link: "/api-reference/complex-graphics.html"
      },
      {
        icon: "fa-paintbrush",
        name: "SkiaSharp Integration",
        summary: "Direct canvas access for shaders, gradients, filters, blend modes",
        link: "/api-reference/skiasharp-integration.html"
      }
    ]
  },
  {
    name: "Positional Elements",
    description: "Control size and position: set width and height, align and pad content, keep aspect ratios, and rotate, scale, offset, flip or reorder elements.",
    items: [
      {
        icon: "fa-left-right",
        name: "Width",
        summary: "Exact, minimum or maximum width in absolute or relative units",
        link: "/api-reference/width.html"
      },
      {
        icon: "fa-up-down",
        name: "Height",
        summary: "Exact, minimum or maximum height in absolute or relative units",
        link: "/api-reference/height.html"
      },
      {
        icon: "fa-objects-align-center-horizontal",
        name: "Alignment",
        summary: "Place the child at the center, an edge or a corner of the space",
        link: "/api-reference/alignment.html"
      },
      {
        icon: "fa-border-inner",
        name: "Padding",
        summary: "Space around content, uniform or per side, in any length unit",
        link: "/api-reference/padding.html"
      },
      {
        icon: "fa-crop",
        name: "Aspect Ratio",
        summary: "Keep a width-to-height proportion; content scales or clips to fit",
        link: "/api-reference/aspect-ratio.html"
      },
      {
        icon: "fa-rotate",
        name: "Rotate",
        summary: "Right angles or any degree, spinning around the center point",
        link: "/api-reference/rotate.html"
      },
      {
        icon: "fa-expand",
        name: "Scale",
        summary: "Resize proportionally, larger or smaller, uniform or per axis",
        link: "/api-reference/scale.html"
      },
      {
        icon: "fa-compress",
        name: "Scale to Fit",
        summary: "Shrink until it fits the space, preserving the aspect ratio",
        link: "/api-reference/scale-to-fit.html"
      },
      {
        icon: "fa-arrows-up-down-left-right",
        name: "Offset",
        summary: "Shift content without affecting the layout flow, for overlaps",
        link: "/api-reference/offset.html"
      },
      {
        icon: "fa-reflect-horizontal",
        name: "Flip",
        summary: "Mirror horizontally, vertically or both, for reflection effects",
        link: "/api-reference/flip.html"
      },
      {
        icon: "fa-infinity",
        name: "Unconstrained",
        summary: "Give the child infinite space to reveal its natural size",
        link: "/api-reference/unconstrained.html"
      },
      {
        icon: "fa-up-right-and-down-left-from-center",
        name: "Extend",
        summary: "Fill all available space horizontally, vertically or both",
        link: "/api-reference/extend.html"
      },
      {
        icon: "fa-down-left-and-up-right-to-center",
        name: "Shrink",
        summary: "Take only the space needed instead of stretching to fill",
        link: "/api-reference/shrink.html"
      },
      {
        icon: "fa-layer-plus",
        name: "Z-Index",
        summary: "Stacking order inside Layers; higher values render in front",
        link: "/api-reference/zindex.html"
      }
    ]
  },
  {
    name: "Content Flow",
    description: "Decide how content moves across pages: force or prevent page breaks, keep blocks together, repeat content on every page, and show content conditionally or once.",
    items: [
      {
        icon: "fa-page-break",
        name: "Page Break",
        summary: "Force the following content to begin on a brand new page",
        link: "/api-reference/page-break.html"
      },
      {
        icon: "fa-frame",
        name: "Prevent Page Break",
        summary: "Keep a block together, moving it whole to the next page if needed",
        link: "/api-reference/prevent-page-break.html"
      },
      {
        icon: "fa-ruler-vertical",
        name: "Ensure Space",
        summary: "Require a minimum height before rendering, else jump to the next page",
        link: "/api-reference/ensure-space.html"
      },
      {
        icon: "fa-object-group",
        name: "Show Entire",
        summary: "Render whole on one page, or move it entirely to the next",
        link: "/api-reference/show-entire.html"
      },
      {
        icon: "fa-repeat",
        name: "Repeat",
        summary: "Draw the content again on every page of a multi-page section",
        link: "/api-reference/repeat.html"
      },
      {
        icon: "fa-code-branch",
        name: "Show If",
        summary: "Render only when a boolean condition holds at generation time",
        link: "/api-reference/show-if.html"
      },
      {
        icon: "fa-circle-1",
        name: "Show Once",
        summary: "Visible on the element's first page only, hidden afterwards",
        link: "/api-reference/show-once.html"
      },
      {
        icon: "fa-forward-step",
        name: "Skip Once",
        summary: "Hidden on the element's first page, visible on all that follow",
        link: "/api-reference/skip-once.html"
      },
      {
        icon: "fa-stop",
        name: "Stop Paging",
        summary: "Truncate overflow instead of continuing onto more pages",
        link: "/api-reference/stop-paging.html"
      }
    ]
  },
  {
    name: "Other Elements",
    description: "Sections and hyperlinks for navigation, lazy loading for very large documents, default text styles, right-to-left content, and visual debugging aids.",
    items: [
      {
        icon: "fa-bookmark",
        name: "Section",
        summary: "Named regions for navigation, cross-references and page numbers",
        link: "/api-reference/section.html"
      },
      {
        icon: "fa-link",
        name: "Hyperlink",
        summary: "Clickable areas linking to URLs, email addresses or phone numbers",
        link: "/api-reference/hyperlink.html"
      },
      {
        icon: "fa-bolt",
        name: "Lazy",
        summary: "Defer content generation to save memory on very large documents",
        link: "/api-reference/lazy.html"
      },
      {
        icon: "fa-text-size",
        name: "Default Text Style",
        summary: "Font, size and color inherited by all descendant text elements",
        link: "/api-reference/default-text-style.html"
      },
      {
        icon: "fa-arrow-right-arrow-left",
        name: "Content Direction",
        summary: "Left-to-right or right-to-left layout with bidirectional text",
        link: "/api-reference/content-direction.html"
      },
      {
        icon: "fa-square-dashed",
        name: "Debug Area",
        summary: "Colored outline and label showing an element's bounds",
        link: "/api-reference/debug-area.html"
      },
      {
        icon: "fa-location-dot",
        name: "Debug Pointer",
        summary: "Named marker that identifies the element in layout exception messages",
        link: "/api-reference/debug-pointer.html"
      }
    ]
  },
  {
    name: "Important Concepts",
    description: "Output formats, document settings and metadata, accessibility, reusable components, length units and colors, and recommended code patterns.",
    items: [
      {
        icon: "fa-file-export",
        name: "Output Types",
        summary: "PDF, SVG or raster images, saved to a file, stream or byte array",
        link: "/concepts/generating-output.html"
      },
      {
        icon: "fa-id-card",
        name: "Document Metadata",
        summary: "Title, author, subject, keywords and timestamps of the PDF",
        link: "/concepts/document-metadata.html"
      },
      {
        icon: "fa-sliders",
        name: "Document Settings",
        summary: "PDF/A and PDF/UA compliance, compression, image quality, DPI",
        link: "/concepts/document-settings.html"
      },
      {
        icon: "fa-lightbulb",
        name: "Patterns and Practices",
        summary: "How to structure clean, maintainable document code",
        children: [
          {
            name: "Execution Order",
            summary: "How a chain of fluent calls maps to nested elements",
            link: "/concepts/code-patterns/execution-order.html"
          },
          {
            name: "Document Structure",
            summary: "Split large documents into methods, classes and reusable pieces",
            link: "/concepts/code-patterns/document-structure.html"
          },
          {
            name: "Local Helpers",
            summary: "Small functions for repeated fragments like a labelled cell",
            link: "/concepts/code-patterns/local-helpers.html"
          },
          {
            name: "Content Styling",
            summary: "Define text styles and colours once, name them, reuse everywhere",
            link: "/concepts/code-patterns/content-styling.html"
          },
          {
            name: "Extension Methods",
            summary: "Your own fluent API that reads like built-in calls",
            link: "/concepts/code-patterns/extension-methods.html"
          }
        ]
      },
      {
        icon: "fa-universal-access",
        name: "Accessibility",
        summary: "PDF/UA compliance and tagged content for screen readers",
        link: "/concepts/accessibility.html"
      },
      {
        icon: "fa-puzzle-piece",
        name: "Components",
        summary: "Reusable, encapsulated document blocks for a cleaner architecture",
        link: "/concepts/code-patterns/components.html",
        children: [
          {
            name: "Components",
            summary: "Classes implementing IComponent with their own data and logic",
            link: "/concepts/code-patterns/components.html"
          },
          {
            name: "Dynamic Components",
            summary: "Content that reacts to the current page and the space available",
            link: "/concepts/code-patterns/dynamic-components.html"
          },
          {
            name: "Capture Content Position",
            summary: "Record the page and position where an element was drawn",
            link: "/concepts/code-patterns/capture-content-position.html"
          }
        ]
      },
      {
        icon: "fa-ruler",
        name: "Length Units",
        summary: "Points, inches, centimeters, millimeters, meters and feet",
        link: "/concepts/length-unit-types.html"
      },
      {
        icon: "fa-palette",
        name: "Predefined Colors",
        summary: "Material Design palette, HEX with alpha and shorthand formats",
        link: "/concepts/colors.html"
      },
      {
        icon: "fa-wand-magic-sparkles",
        name: "Placeholders",
        summary: "Random text, colors and images for rapid prototyping",
        link: "/concepts/prototyping.html",
        children: [
          {
            name: "Text",
            summary: "Lorem ipsum, names, addresses, dates and numbers",
            link: "/concepts/prototyping.html#text"
          },
          {
            name: "Colors",
            summary: "Random colours from the Material palette to tell regions apart",
            link: "/concepts/prototyping.html#colors"
          },
          {
            name: "Images",
            summary: "Random pictures at any size to stand in for real images",
            link: "/concepts/prototyping.html#image"
          }
        ]
      }
    ]
  }
];
