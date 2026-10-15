<template>
  <div class="custom-page features-page">
    <div class="container texture-dots">
      <div class="content">

        <header class="section-header features-header">
          <h1>Features Overview</h1>
          <p class="sub-header">
            Explore the full capabilities of QuestPDF. A mature, production-ready toolkit designed to handle every aspect of document generation, from versatile layouts to real-time developer tooling.
          </p>
        </header>

        <section v-for="category in categories" :key="category.name" class="panel category">
          <header class="category-header">
            <h2 class="card-title">{{ category.name }}</h2>
            <p v-if="category.description" class="card-description">{{ category.description }}</p>
          </header>

          <!-- One row per feature: icon, name, and a one-line summary that appears while the row is
               hovered or focused (always shown where there is no pointer to hover with; it is only
               transparent, so screen readers read it as part of the row either way). The row links to
               the documentation page. Sub-pages follow their parent as child rows, always visible. -->
          <ul class="feature-list">
            <li v-for="item in category.items" :key="item.name" class="feature">
              <component
                :is="item.link ? 'a' : 'div'"
                :href="item.link || undefined"
                class="feature-row"
                :class="{ linked: item.link }"
              >
                <i class="feature-icon" :class="item.icon" aria-hidden="true" />
                <span class="feature-name">{{ item.name }}</span>
                <span class="feature-summary">{{ item.summary }}</span>
                <i v-if="item.link" class="feature-arrow fa-regular fa-arrow-right" aria-hidden="true" />
              </component>

              <ul v-if="item.tags" class="feature-children">
                <li v-for="tag in item.tags" :key="tag.label" class="feature-child">
                  <a :href="tag.url" class="feature-row child linked">
                    <span class="feature-name">{{ tag.label }}</span>
                    <span class="feature-summary">{{ tag.summary }}</span>
                    <i class="feature-arrow fa-regular fa-arrow-right" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup>
const categories = [
  {
    name: "Companion App",
    description: "A live preview that refreshes as you save, with tools to measure and inspect elements, search the content, and trace exceptions and layout issues to their source.",
    items: [
      {
        icon: "fa-regular fa-rocket",
        name: "Installation and Getting Started",
        summary: "Install, connect to your project, preview with hot reload",
        link: "/companion/usage.html"
      },
      {
        icon: "fa-regular fa-ruler-combined",
        name: "Precision Tools",
        summary: "Magnifier, coordinate picker and size measurement for exact spacing",
        link: "/companion/features.html#magnifier",
        tags: [
          {
            label: "Magnifier",
            summary: "Zoom into the preview to check line thickness and glyph rendering",
            url: "/companion/features.html#magnifier",
          },
          {
            label: "Coordinate Picker",
            summary: "Read the exact position of any point in the document's units",
            url: "/companion/features.html#coordinate-picker",
          },
          {
            label: "Size measurement",
            summary: "Measure distances between points and the size of any element",
            url: "/companion/features.html#size-measurement",
          }
        ]
      },
      {
        icon: "fa-regular fa-compass",
        name: "Navigation Tools",
        summary: "Inspect elements, search content, jump to the source code",
        link: "/companion/features.html#element-selection",
        tags: [
          {
            label: "Element Inspection",
            summary: "Click an element to see its place in the tree and its properties",
            url: "/companion/features.html#element-selection",
          },
          {
            label: "Content Searching",
            summary: "Find text in the generated document and jump to each page",
            url: "/companion/features.html#content-searching",
          },
          {
            label: "Go to Implementation",
            summary: "Jump from an element in the preview to the C# line that drew it",
            url: "/companion/features.html#go-to-implementation",
          }
        ]
      },
      {
        icon: "fa-regular fa-circle-exclamation",
        name: "Runtime Exception Analysis",
        summary: "Exception messages, stack traces and source context",
        link: "/companion/features.html#runtime-exceptions"
      },
      {
        icon: "fa-regular fa-bug",
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
        icon: "fa-regular fa-copy",
        name: "Merging Documents",
        summary: "Combine whole files, or selected pages from each, into one PDF",
        link: "/concepts/document-operations.html#merging-documents"
      },
      {
        icon: "fa-regular fa-scissors",
        name: "Page Selection / Extraction",
        summary: "Pick, reorder, reverse or filter pages with range syntax",
        link: "/concepts/document-operations.html#page-selection"
      },
      {
        icon: "fa-regular fa-clone",
        name: "Overlays / Underlays",
        summary: "Watermarks, headers or letterhead layered onto chosen pages",
        link: "/concepts/document-operations.html#overlays-and-underlays"
      },
      {
        icon: "fa-regular fa-lock",
        name: "Document Encryption",
        summary: "40 to 256-bit encryption, user and owner passwords, permissions",
        link: "/concepts/document-operations.html#document-encryption"
      },
      {
        icon: "fa-regular fa-unlock",
        name: "Document Decryption",
        summary: "Remove passwords and restrictions from protected PDFs",
        link: "/concepts/document-operations.html#document-decryption"
      },
      {
        icon: "fa-regular fa-globe",
        name: "Document Linearization",
        summary: "Fast web view: the first page shows before the download ends",
        link: "/concepts/document-operations.html#document-linearization"
      },
      {
        icon: "fa-regular fa-paperclip",
        name: "Files Attachments",
        summary: "Embed files with any relationship, fully PDF/A compliant",
        link: "/concepts/document-operations.html#file-attachments"
      },
      {
        icon: "fa-regular fa-tags",
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
        icon: "fa-regular fa-file",
        name: "Page",
        summary: "Size, margins, orientation, header, footer, watermarks; paged or continuous",
        link: "/api-reference/page/basics.html",
        tags: [
          {
            label: "Slots",
            summary: "Header and footer that repeat, with the content flowing between them",
            url: "/api-reference/page/slots.html",
          },
          {
            label: "Properties",
            summary: "Size, orientation, margins per side, colour, continuous mode",
            url: "/api-reference/page/settings.html",
          }
        ]
      },
      {
        icon: "fa-regular fa-table",
        name: "Table",
        summary: "Rows and columns with cell spans, repeating headers and auto-pagination",
        link: "/api-reference/table/basics.html",
        tags: [
          {
            label: "Cell Style Patterns",
            summary: "Alternating rows, borders by position, highlighted columns",
            url: "/api-reference/table/cell-style-pattern.html",
          },
          {
            label: "Header and Footer",
            summary: "Rows repeated at the top and bottom of every page the table spans",
            url: "/api-reference/table/header-and-footer.html",
          },
          {
            label: "Overlapping Cells",
            summary: "Cells drawn over other cells for backgrounds, highlights and annotations",
            url: "/api-reference/table/overlapping-cells.html",
          }
        ]
      },
      {
        icon: "fa-regular fa-table-rows",
        name: "Column",
        summary: "Stack children vertically with spacing, paginating automatically",
        link: "/api-reference/column.html"
      },
      {
        icon: "fa-regular fa-table-columns",
        name: "Row",
        summary: "Place children side by side with proportional, fixed or auto widths",
        link: "/api-reference/row.html"
      },
      {
        icon: "fa-regular fa-window-maximize",
        name: "Decoration",
        summary: "Header and footer repeated on every page, content flowing between",
        link: "/api-reference/decoration.html"
      },
      {
        icon: "fa-regular fa-list",
        name: "List",
        summary: "Numbered and bulleted lists with custom markers and nested levels",
        link: "/api-reference/lists.html"
      },
      {
        icon: "fa-regular fa-layer-group",
        name: "Layers",
        summary: "Stacked content planes for backgrounds, watermarks and overlays",
        link: "/api-reference/layers.html"
      },
      {
        icon: "fa-regular fa-bars-staggered",
        name: "Inlined",
        summary: "Flow items like words in a paragraph, wrapping automatically",
        link: "/api-reference/inlined.html"
      },
      {
        icon: "fa-regular fa-newspaper",
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
        icon: "fa-regular fa-palette",
        name: "Styled Containers",
        summary: "Background, border, rounded corners and shadow for any element",
        tags: [
          {
            label: "Background",
            summary: "Solid fill behind the content, Material palette or any HEX value",
            url: "/api-reference/background.html",
          },
          {
            label: "Border",
            summary: "Lines on any sides, each with its own width and colour",
            url: "/api-reference/border.html",
          },
          {
            label: "Rounded Corners",
            summary: "Radius for all corners or each one; backgrounds and borders follow",
            url: "/api-reference/rounded-corners.html",
          },
          {
            label: "Shadows",
            summary: "Soft drop shadow with configurable blur, offset and colour",
            url: "/api-reference/shadow.html",
          }
        ]
      },
      {
        icon: "fa-regular fa-text",
        name: "Text",
        summary: "Rich text with styles, automatic wrapping and pagination, page numbers",
        link: "/api-reference/text/basics.html",
        tags: [
          {
            label: "Text Style",
            summary: "Font family, size, weight, colour, letter spacing, decoration",
            url: "/api-reference/text/text-style.html",
          },
          {
            label: "Paragraph Style",
            summary: "Alignment, indentation, spacing, line height, line clamping",
            url: "/api-reference/text/paragraph-style.html",
          },
          {
            label: "Page Numbers",
            summary: "Current page, total count and where a named section starts or ends",
            url: "/api-reference/text/page-numbers.html",
          },
          {
            label: "Injecting Content",
            summary: "Hyperlinks, inline elements and custom content flowing with words",
            url: "/api-reference/text/injecting-custom-content.html",
          },
          {
            label: "Style Inheritance",
            summary: "Styles set on a container cascade to everything inside it",
            url: "/api-reference/text/style-inheritance.html",
          },
          {
            label: "Font Management",
            summary: "Register files or system fonts, pick fallbacks, embed subsets",
            url: "/api-reference/text/font-management.html",
          }
        ]
      },
      {
        icon: "fa-regular fa-image",
        name: "Image",
        summary: "PNG, JPEG, WebP and SVG with compression, resampling and caching",
        link: "/api-reference/image/basics.html",
        tags: [
          {
            label: "Size Optimization",
            summary: "Resample to a target DPI and compress without visible loss",
            url: "/api-reference/image/optimization.html",
          },
          {
            label: "Shared Images",
            summary: "Load once and reuse, so repeated logos do not grow the file",
            url: "/api-reference/image/shared.html",
          },
          {
            label: "SVG",
            summary: "Vector images that stay sharp at any scale and print size",
            url: "/api-reference/image/svg.html",
          },
          {
            label: "Images Of Dynamic Size",
            summary: "Generate at the exact size the layout provides, ideal for charts",
            url: "/api-reference/image/dynamic.html",
          }
        ]
      },
      {
        icon: "fa-regular fa-horizontal-rule",
        name: "Line",
        summary: "Horizontal or vertical separators with thickness and color",
        link: "/api-reference/line.html"
      },
      {
        icon: "fa-regular fa-grid-2",
        name: "Placeholder",
        summary: "Grey box with diagonal lines and a label to reserve space while prototyping",
        link: "/api-reference/placeholder.html"
      },
      {
        icon: "fa-regular fa-chart-mixed",
        name: "Charts",
        summary: "ScottPlot, LiveCharts and Microcharts rendered as vector graphics",
        link: "/api-reference/charts.html"
      },
      {
        icon: "fa-regular fa-qrcode",
        name: "Barcodes / QR Codes",
        summary: "1D barcodes and 2D QR codes with popular third-party libraries",
        link: "/api-reference/barcodes.html"
      },
      {
        icon: "fa-regular fa-map-location-dot",
        name: "Maps",
        summary: "Static maps embedded in documents, with a Mapbox tutorial",
        link: "/api-reference/maps.html"
      },
      {
        icon: "fa-regular fa-bezier-curve",
        name: "Complex Graphics",
        summary: "Canvas-style paths, shapes and bezier curves with fill and stroke",
        link: "/api-reference/complex-graphics.html"
      },
      {
        icon: "fa-regular fa-paintbrush",
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
        icon: "fa-regular fa-left-right",
        name: "Width",
        summary: "Exact, minimum or maximum width in absolute or relative units",
        link: "/api-reference/width.html"
      },
      {
        icon: "fa-regular fa-up-down",
        name: "Height",
        summary: "Exact, minimum or maximum height in absolute or relative units",
        link: "/api-reference/height.html"
      },
      {
        icon: "fa-regular fa-objects-align-center-horizontal",
        name: "Alignment",
        summary: "Place the child at the center, an edge or a corner of the space",
        link: "/api-reference/alignment.html"
      },
      {
        icon: "fa-regular fa-border-inner",
        name: "Padding",
        summary: "Space around content, uniform or per side, in any length unit",
        link: "/api-reference/padding.html"
      },
      {
        icon: "fa-regular fa-crop",
        name: "Aspect Ratio",
        summary: "Keep a width-to-height proportion; content scales or clips to fit",
        link: "/api-reference/aspect-ratio.html"
      },
      {
        icon: "fa-regular fa-rotate",
        name: "Rotate",
        summary: "Right angles or any degree, spinning around the center point",
        link: "/api-reference/rotate.html"
      },
      {
        icon: "fa-regular fa-expand",
        name: "Scale",
        summary: "Resize proportionally, larger or smaller, uniform or per axis",
        link: "/api-reference/scale.html"
      },
      {
        icon: "fa-regular fa-compress",
        name: "Scale to Fit",
        summary: "Shrink until it fits the space, preserving the aspect ratio",
        link: "/api-reference/scale-to-fit.html"
      },
      {
        icon: "fa-regular fa-arrows-up-down-left-right",
        name: "Offset",
        summary: "Shift content without affecting the layout flow, for overlaps",
        link: "/api-reference/offset.html"
      },
      {
        icon: "fa-regular fa-reflect-horizontal",
        name: "Flip",
        summary: "Mirror horizontally, vertically or both, for reflection effects",
        link: "/api-reference/flip.html"
      },
      {
        icon: "fa-regular fa-infinity",
        name: "Unconstrained",
        summary: "Give the child infinite space to reveal its natural size",
        link: "/api-reference/unconstrained.html"
      },
      {
        icon: "fa-regular fa-up-right-and-down-left-from-center",
        name: "Extend",
        summary: "Fill all available space horizontally, vertically or both",
        link: "/api-reference/extend.html"
      },
      {
        icon: "fa-regular fa-down-left-and-up-right-to-center",
        name: "Shrink",
        summary: "Take only the space needed instead of stretching to fill",
        link: "/api-reference/shrink.html"
      },
      {
        icon: "fa-regular fa-layer-plus",
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
        icon: "fa-regular fa-page-break",
        name: "Page Break",
        summary: "Force the following content to begin on a brand new page",
        link: "/api-reference/page-break.html"
      },
      {
        icon: "fa-regular fa-frame",
        name: "Prevent Page Break",
        summary: "Keep a block together, moving it whole to the next page if needed",
        link: "/api-reference/prevent-page-break.html"
      },
      {
        icon: "fa-regular fa-ruler-vertical",
        name: "Ensure Space",
        summary: "Require a minimum height before rendering, else jump to the next page",
        link: "/api-reference/ensure-space.html"
      },
      {
        icon: "fa-regular fa-object-group",
        name: "Show Entire",
        summary: "Render whole on one page, or move it entirely to the next",
        link: "/api-reference/show-entire.html"
      },
      {
        icon: "fa-regular fa-repeat",
        name: "Repeat",
        summary: "Draw the content again on every page of a multi-page section",
        link: "/api-reference/repeat.html"
      },
      {
        icon: "fa-regular fa-code-branch",
        name: "Show If",
        summary: "Render only when a boolean condition holds at generation time",
        link: "/api-reference/show-if.html"
      },
      {
        icon: "fa-regular fa-circle-1",
        name: "Show Once",
        summary: "Visible on the element's first page only, hidden afterwards",
        link: "/api-reference/show-once.html"
      },
      {
        icon: "fa-regular fa-forward-step",
        name: "Skip Once",
        summary: "Hidden on the element's first page, visible on all that follow",
        link: "/api-reference/skip-once.html"
      },
      {
        icon: "fa-regular fa-stop",
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
        icon: "fa-regular fa-bookmark",
        name: "Section",
        summary: "Named regions for navigation, cross-references and page numbers",
        link: "/api-reference/section.html"
      },
      {
        icon: "fa-regular fa-link",
        name: "Hyperlink",
        summary: "Clickable areas linking to URLs, email addresses or phone numbers",
        link: "/api-reference/hyperlink.html"
      },
      {
        icon: "fa-regular fa-bolt",
        name: "Lazy",
        summary: "Defer content generation to save memory on very large documents",
        link: "/api-reference/lazy.html"
      },
      {
        icon: "fa-regular fa-text-size",
        name: "Default Text Style",
        summary: "Font, size and color inherited by all descendant text elements",
        link: "/api-reference/default-text-style.html"
      },
      {
        icon: "fa-regular fa-arrow-right-arrow-left",
        name: "Content Direction",
        summary: "Left-to-right or right-to-left layout with bidirectional text",
        link: "/api-reference/content-direction.html"
      },
      {
        icon: "fa-regular fa-square-dashed",
        name: "Debug Area",
        summary: "Colored outline and label showing an element's bounds",
        link: "/api-reference/debug-area.html"
      },
      {
        icon: "fa-regular fa-location-dot",
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
        icon: "fa-regular fa-file-export",
        name: "Output Types",
        summary: "PDF, SVG or raster images, saved to a file, stream or byte array",
        link: "/concepts/generating-output.html"
      },
      {
        icon: "fa-regular fa-id-card",
        name: "Document Metadata",
        summary: "Title, author, subject, keywords and timestamps of the PDF",
        link: "/concepts/document-metadata.html"
      },
      {
        icon: "fa-regular fa-sliders",
        name: "Document Settings",
        summary: "PDF/A and PDF/UA compliance, compression, image quality, DPI",
        link: "/concepts/document-settings.html"
      },
      {
        icon: "fa-regular fa-lightbulb",
        name: "Patterns and Practices",
        summary: "How to structure clean, maintainable document code",
        link: null,
        tags: [
          {
            label: "Execution Order",
            summary: "How a chain of fluent calls maps to nested elements",
            url: "/concepts/code-patterns/execution-order.html",
          },
          {
            label: "Document Structure",
            summary: "Split large documents into methods, classes and reusable pieces",
            url: "/concepts/code-patterns/document-structure.html",
          },
          {
            label: "Local Helpers",
            summary: "Small functions for repeated fragments like a labelled cell",
            url: "/concepts/code-patterns/local-helpers.html",
          },
          {
            label: "Content Styling",
            summary: "Define text styles and colours once, name them, reuse everywhere",
            url: "/concepts/code-patterns/content-styling.html",
          },
          {
            label: "Extension Methods",
            summary: "Your own fluent API that reads like built-in calls",
            url: "/concepts/code-patterns/extension-methods.html",
          },
        ]
      },
      {
        icon: "fa-regular fa-universal-access",
        name: "Accessibility",
        summary: "PDF/UA compliance and tagged content for screen readers",
        link: "/concepts/accessibility.html"
      },
      {
        icon: "fa-regular fa-puzzle-piece",
        name: "Components",
        summary: "Reusable, encapsulated document blocks for a cleaner architecture",
        link: "/concepts/code-patterns/components.html",
        tags: [
          {
            label: "Components",
            summary: "Classes implementing IComponent with their own data and logic",
            url: "/concepts/code-patterns/components.html",
          },
          {
            label: "Dynamic Components",
            summary: "Content that reacts to the current page and the space available",
            url: "/concepts/code-patterns/dynamic-components.html",
          },
          {
            label: "Capture Content Position",
            summary: "Record the page and position where an element was drawn",
            url: "/concepts/code-patterns/capture-content-position.html",
          }
        ]
      },
      {
        icon: "fa-regular fa-ruler",
        name: "Length Units",
        summary: "Points, inches, centimeters, millimeters, meters and feet",
        link: "/concepts/length-unit-types.html"
      },
      {
        icon: "fa-regular fa-palette",
        name: "Predefined Colors",
        summary: "Material Design palette, HEX with alpha and shorthand formats",
        link: "/concepts/colors.html"
      },
      {
        icon: "fa-regular fa-wand-magic-sparkles",
        name: "Placeholders",
        summary: "Random text, colors and images for rapid prototyping",
        link: "/concepts/prototyping.html",
        tags: [
          {
            label: "Text",
            summary: "Lorem ipsum, names, addresses, dates and numbers",
            url: "/concepts/prototyping.html#text",
          },
          {
            label: "Colors",
            summary: "Random colours from the Material palette to tell regions apart",
            url: "/concepts/prototyping.html#colors",
          },
          {
            label: "Images",
            summary: "Random pictures at any size to stand in for real images",
            url: "/concepts/prototyping.html#image",
          }
        ]
      },
    ]
  }
];
</script>

<style scoped>

/* Page styles */

.content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.features-header {
  margin-bottom: 16px; /* with the 32px gap, the same 48px as on the contact page */
}

.sub-header {
  max-width: 750px;
  margin-bottom: 0 !important;
}


/* Category: the shared panel surface (CustomPages.css) with a heading and a list of feature rows */

.panel.category {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 960px; /* a one-line row reads best at about the width of a document page */
  margin: 0 auto;
  padding: 48px;
}

@media screen and (max-width: 700px) {
  .panel.category {
    padding: 32px 16px;
    gap: 24px;
  }

  .category-header {
    padding: 0 8px;
  }

  /* the panel's 16px inset leaves room for only 4px of overhang: the icons still meet the title at 24px
     (qualified, because the base rule comes later in the file) */
  .panel.category .feature-list {
    margin: 0 -4px;
  }
}


/* the list is pulled out by the rows' own 8px inset, so at rest the icons line up with the category
   title above and only the hover background reaches into the panel's margin */
.feature-list {
  margin: 0 -8px;
  padding: 0;
  list-style: none;
}

.feature {
  margin: 0;
  padding: 0;
}

.feature-children {
  margin: 0;
  padding: 0;
  list-style: none;
}

.feature-child {
  margin: 0;
  padding: 0;
}


/* Feature row: icon, name, one-line summary; the whole row is the link */

.feature-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  padding: 6px 8px;
  border-radius: 12px;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.feature-row.linked:hover,
.feature-row.linked:focus-visible {
  background-color: var(--surface-inner);
}

.feature-row:focus-visible {
  outline: 2px solid #2196F3;
  outline-offset: -2px;
}

.feature-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 1rem;
  border-radius: 8px;

  color: var(--vp-c-text-1);
  background-color: var(--surface-inner);
}

.feature-row.linked:hover .feature-icon {
  color: #2196F3;
  background-color: #2196F322;
}

.feature-name {
  flex-shrink: 0;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
}

.feature-row.linked:hover .feature-name {
  color: #2196F3;
}

.feature-summary {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

/* with a pointer to hover with, the summary of a row shows only while the row is hovered or
   focused, so the list reads as a calm column of names; touch devices and the stacked layout below
   show every summary */
@media (hover: hover) and (min-width: 1025px) {
  .feature-summary {
    opacity: 0;
  }

  .feature-row:hover .feature-summary,
  .feature-row:focus-visible .feature-summary {
    opacity: 1;
  }
}

.feature-arrow {
  flex-shrink: 0;
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  opacity: 0;
}

.feature-row:hover .feature-arrow,
.feature-row:focus-visible .feature-arrow {
  opacity: 1;
}


/* Child row: a sub-page of the feature above, hung on a tree line instead of carrying an icon */

.feature-row.child {
  min-height: 36px;
  padding-left: 48px;
}

/* child rows keep the row text size; the indent, tree line and lighter weight mark them as sub-pages */
.feature-row.child .feature-name {
  font-weight: 500;
}

.feature-row.child::before,
.feature-row.child::after {
  content: "";
  position: absolute;
  left: 23px;
  border-left: 1px solid var(--vp-c-divider);
}

.feature-row.child::before {
  top: -6px;
  bottom: calc(100% - 18px);
  width: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  border-bottom-left-radius: 6px;
}

.feature-child:not(:last-child) .feature-row.child::after {
  top: 18px;
  bottom: -6px;
}


/* Narrower windows: the summary no longer fits beside the name on one line, so it wraps under
   it; the hover arrow goes */

@media screen and (max-width: 1024px) {
  .feature-row {
    flex-wrap: wrap;
    row-gap: 0;
    padding: 8px;
  }

  .feature-summary {
    width: 100%;
    padding-left: 44px;
    white-space: normal;
  }

  .feature-row.child {
    padding-left: 36px;
  }

  .feature-row.child .feature-summary {
    padding-left: 0;
  }

  .feature-row.child::before,
  .feature-row.child::after {
    left: 16px;
  }

  .feature-arrow {
    display: none;
  }
}

</style>
