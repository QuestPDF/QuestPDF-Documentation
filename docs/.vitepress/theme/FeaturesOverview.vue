<template>
  <div class="custom-page api-reference-page">

    <!-- Categories -->
    <div class="container reverse-background">


      <div class="content" style="display: flex; flex-direction: column; gap: 48px;">
        <header class="section-header">
          <h1>Features Overview</h1>
          <p class="sub-header">
            Explore the full capabilities of QuestPDF. A mature, production-ready toolkit designed to handle every aspect of document generation, from versatile layouts to real-time developer tooling.
          </p>
        </header>

        <div v-for="(category, index) in categories" :key="category.name" class="">
          <div class="card" style="display: flex; flex-direction: column; gap: 32px;">
            <h3>{{ category.name }}</h3>

            <a v-for="item in category.items" :key="item.name" :href="item.link" class="card-link">
              <div style="display: flex; flex-direction: row; gap: 24px;">
                <i class="icon" :class="item.icon"></i>
                <div>
                  <p><b>{{ item.name }}</b> - {{ item.description }}</p>

                  <div class="tags">
                    <a v-for="tag in item.tags || []" :key="tag.label" :href="tag.url" class="tag">
                      {{ tag.label }}
                    </a>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
const categories = [
  {
    name: "Companion App",
    items: [
      {
        icon: "fa-regular fa-rocket",
        name: "Installation and Getting Started",
        description: "Download, install, and connect the Companion App with your project using the ShowInCompanion() method.",
        link: "/companion/usage"
      },
      {
        icon: "",
        name: "Magnifier",
        description: "",
        link: "https://www.questpdf.com/companion/features.html#magnifier"
      },
      {
        icon: "",
        name: "Coordinate Inspector",
        description: "",
        link: "https://www.questpdf.com/companion/features.html#coordinate-picker"
      },
      {
        icon: "",
        name: "Measuring Sizes",
        description: "",
        link: "https://www.questpdf.com/companion/features.html#size-measurement"
      },
      {
        icon: "",
        name: "Content Inspection",
        description: "",
        link: "https://www.questpdf.com/companion/features.html#element-selection"
      },
      {
        icon: "",
        name: "Content Search and Navigation",
        description: "",
        link: "https://www.questpdf.com/companion/features.html#content-searching"
      },
      {
        icon: "",
        name: "Go To Implementation",
        description: "",
        link: "https://www.questpdf.com/companion/features.html#go-to-implementation"
      },
      {
        icon: "",
        name: "Runtime Exception Analysis",
        description: "",
        link: "https://www.questpdf.com/companion/features.html#runtime-exceptions"
      },
      {
        icon: "",
        name: "Layout Issue Debugging",
        description: "",
        link: "https://www.questpdf.com/companion/features.html#layout-issue-debugging"
      }
    ]
  },
  {
    name: "Document Operations",
    items: [
      {
        icon: "",
        name: "Page Selection / Extraction",
        description: "",
        link: "https://www.questpdf.com/concepts/document-operations.html#page-selection"
      },
      {
        icon: "",
        name: "Document Linealization",
        description: "",
        link: "https://www.questpdf.com/concepts/document-operations.html#document-linearization"
      },
      {
        icon: "",
        name: "Merging Documents",
        description: "",
        link: "https://www.questpdf.com/concepts/document-operations.html#merging-documents"
      },
      {
        icon: "",
        name: "Overlays / Underlays",
        description: "",
        link: "https://www.questpdf.com/concepts/document-operations.html#overlays-and-underlays"
      },
      {
        icon: "",
        name: "Document Encryption",
        description: "",
        link: "https://www.questpdf.com/concepts/document-operations.html#document-encryption"
      },
      {
        icon: "",
        name: "Document Decryption",
        description: "",
        link: "https://www.questpdf.com/concepts/document-operations.html#document-decryption"
      },
      {
        icon: "",
        name: "Files Attachments",
        description: "",
        link: "https://www.questpdf.com/concepts/document-operations.html#file-attachments"
      },
      {
        icon: "",
        name: "Extending XMP Metadata",
        description: "",
        link: "https://www.questpdf.com/concepts/document-operations.html#xmp-metadata-extension"
      }
    ]
  },
  {
    name: "Important Concepts",
    items: [
      {
        icon: "fa-regular fa-gear",
        name: "Global Settings",
        description: "Library-wide configuration for caching, debugging, and font behavior. Affects all document generation.",
        link: "/concepts/global-settings"
      },
      {
        icon: "",
        name: "Output Types",
        description: "",
        link: "https://www.questpdf.com/concepts/generating-output.html"
      },
      {
        icon: "fa-regular fa-sliders",
        name: "Document Metadata",
        description: "Configure PDF/A compliance, compression, image quality, and DPI. Set content direction for RTL languages.",
        link: "https://www.questpdf.com/concepts/document-metadata.html"
      },
      {
        icon: "fa-regular fa-sliders",
        name: "Document Settings",
        description: "Configure PDF/A compliance, compression, image quality, and DPI. Set content direction for RTL languages.",
        link: "/concepts/document-settings"
      },
      {
        icon: "",
        name: "Patterns and Practices",
        description: "",
        link: null,
        tags: [
          {
            label: "Execution Order",
            url: "https://www.questpdf.com/concepts/code-patterns/execution-order.html",
          },
          {
            label: "Document Structure",
            url: "https://www.questpdf.com/concepts/code-patterns/document-structure.html",
          },
          {
            label: "Local Helpers",
            url: "https://www.questpdf.com/concepts/code-patterns/local-helpers.html",
          },
          {
            label: "Content Styling",
            url: "https://www.questpdf.com/concepts/code-patterns/content-styling.html",
          },
          {
            label: "Extension Methods",
            url: "https://www.questpdf.com/concepts/code-patterns/extension-methods.html",
          },
        ]
      },
      {
        icon: "fa-regular fa-universal-access",
        name: "Accessibility",
        description: "Generate accessible PDFs with PDF/UA compliance and tagged content. Screen reader support and semantic structure.",
        link: "/concepts/accessibility"
      },
      {
        icon: "fa-regular fa-puzzle-piece",
        name: "Components",
        description: "Create reusable document building blocks. Encapsulate layout patterns and share across multiple documents.",
        link: "/concepts/components",
        tags: [
          {
            label: "Components",
            url: "https://www.questpdf.com/concepts/code-patterns/components.html",
          },
          {
            label: "Dynamic Components",
            url: "https://www.questpdf.com/concepts/code-patterns/dynamic-components.html",
          },
          {
            label: "Capture Content Position",
            url: "https://www.questpdf.com/concepts/code-patterns/capture-content-position.html",
          }
        ]
      },
      {
        icon: "fa-regular fa-ruler",
        name: "Length Units",
        description: "Supported units: points (default), millimeters, centimeters, inches, and percentages. Conversion helpers included.",
        link: "/concepts/length-unit-types"
      },
      {
        icon: "",
        name: "Predefined Colors",
        description: "",
        link: "https://www.questpdf.com/concepts/colors.html"
      },
      {
        icon: "",
        name: "Placeholders",
        description: "",
        link: "https://www.questpdf.com/concepts/prototyping.html",
        tags: [
          {
            label: "Text",
            url: "https://www.questpdf.com/concepts/prototyping.html#text",
          },
          {
            label: "Colors",
            url: "https://www.questpdf.com/concepts/prototyping.html#colors",
          },
          {
            label: "Images",
            url: "https://www.questpdf.com/concepts/prototyping.html#image",
          }
        ]
      },
    ]
  },
  {
    name: "Visual Content",
    description: "Elements for rendering text, images, graphics, and visual styling.",
    items: [
      {
        icon: "",
        name: "Styled Containers",
        description: "",
        tags: [
          {
            label: "Background",
            url: "https://www.questpdf.com/api-reference/background.html",
          },
          {
            label: "Border",
            url: "https://www.questpdf.com/api-reference/border.html",
          },
          {
            label: "Rounded Corners",
            url: "https://www.questpdf.com/api-reference/rounded-corners.html",
          },
          {
            label: "Shadows",
            url: "https://www.questpdf.com/api-reference/shadow.html",
          }
        ]
      },
      {
        icon: "fa-regular fa-text",
        name: "Text",
        description: "Rich text with mixed styles, fonts, colors, subscript, superscript, hyperlinks, and page numbers. Automatic wrapping and pagination.",
        link: "/api-reference/text/basics",
        tags: [
          {
            label: "Text Style",
            url: "https://www.questpdf.com/api-reference/text/text-style.html",
          },
          {
            label: "Paragraph Style",
            url: "https://www.questpdf.com/api-reference/text/paragraph-style.html",
          },
          {
            label: "Page Numbers",
            url: "https://www.questpdf.com/api-reference/text/page-numbers.html",
          },
          {
            label: "Injecting Content",
            url: "https://www.questpdf.com/api-reference/text/injecting-custom-content.html",
          },
          {
            label: "Style Inheritance",
            url: "https://www.questpdf.com/api-reference/text/style-inheritance.html",
          },
          {
            label: "Font Management",
            url: "https://www.questpdf.com/api-reference/text/font-management.html",
          }
        ]
      },
      {
        icon: "fa-regular fa-image",
        name: "Image",
        description: "Raster images (PNG, JPEG, WebP) and SVG vectors. Automatic aspect ratio, compression, resolution optimization, and shared image caching.",
        link: "/api-reference/image/basics",
        tags: [
          {
            label: "Size Optimization",
            url: "https://www.questpdf.com/api-reference/image/optimization.html",
          },
          {
            label: "Shared Images",
            url: "https://www.questpdf.com/api-reference/image/shared.html",
          },
          {
            label: "SVG",
            url: "https://www.questpdf.com/api-reference/image/svg.html",
          },
          {
            label: "Images Of Dynamic Size",
            url: "https://www.questpdf.com/api-reference/image/dynamic.html",
          }
        ]
      },
      {
        icon: "fa-regular fa-horizontal-rule",
        name: "Line",
        description: "Horizontal or vertical lines with configurable thickness and color. Useful as visual separators and dividers.",
        link: "/api-reference/line"
      },
      {
        icon: "fa-regular fa-grid-2",
        name: "Placeholder",
        description: "Gray rectangle with diagonal lines and optional label. Visualizes reserved space during layout prototyping.",
        link: "/api-reference/placeholder"
      },
      {
        icon: "fa-regular fa-chart-mixed",
        name: "Charts",
        description: "Integration with charting libraries (ScottPlot, LiveCharts, Microcharts). Bar, line, pie, area charts as vector graphics.",
        link: "/api-reference/charts"
      },
      {
        icon: "fa-regular fa-qrcode",
        name: "Barcodes / QR Codes",
        description: "1D barcodes (Code128, EAN, UPC) and 2D QR codes via BarcodeGen library. Configurable size and error correction.",
        link: "/api-reference/barcodes"
      },
      {
        icon: "fa-regular fa-map-location-dot",
        name: "Maps",
        description: "Static map images from mapping services. Shows locations, markers, routes, and geographic regions.",
        link: "/api-reference/maps"
      },
      {
        icon: "fa-regular fa-bezier-curve",
        name: "Complex Graphics",
        description: "Canvas-style drawing API for paths, shapes, bezier curves, and custom vector graphics. Fill and stroke operations.",
        link: "/api-reference/complex-graphics"
      },
      {
        icon: "fa-regular fa-paintbrush",
        name: "SkiaSharp Integration",
        description: "Direct SkiaSharp canvas access for shaders, gradients, image filters, blend modes, and advanced 2D graphics.",
        link: "/api-reference/skiasharp-integration"
      }
    ]
  },
  {
    name: "Layout Elements",
    description: "Container elements for organizing and structuring document content.",
    items: [
      {
        icon: "fa-regular fa-file",
        name: "Page",
        description: "Document foundation with size, margins, orientation, headers, footers, and watermarks. Continuous or paged content modes.",
        link: "/api-reference/page/basics",
        tags: [
          {
            label: "Slots",
            url: "https://www.questpdf.com/api-reference/page/slots.html",
          },
          {
            label: "Properties",
            url: "https://www.questpdf.com/api-reference/page/settings.html",
          }
        ]
      },
      {
        icon: "fa-regular fa-table",
        name: "Table",
        description: "Grid layout with rows and columns. Cell spanning, repeating headers/footers, auto-pagination, and precise cell styling.",
        link: "/api-reference/table/basics",
        tags: [
          {
            label: "Cell Style Patterns",
            url: "https://www.questpdf.com/api-reference/table/cell-style-pattern.html",
          },
          {
            label: "Header and Footer",
            url: "https://www.questpdf.com/api-reference/table/header-and-footer.html",
          },
          {
            label: "Overlapping Cells",
            url: "https://www.questpdf.com/api-reference/table/overlapping-cells.html",
          }
        ]
      },
      {
        icon: "fa-regular fa-table-columns",
        name: "Column",
        description: "Vertical stacking of children, one below another. Configurable spacing between items.",
        link: "/api-reference/column"
      },
      {
        icon: "fa-regular fa-table-rows",
        name: "Row",
        description: "Horizontal arrangement of children, side by side. Proportional widths, fixed widths, and spacing control.",
        link: "/api-reference/row"
      },
      {
        icon: "fa-regular fa-window-maximize",
        name: "Decoration",
        description: "Persistent header and footer areas that repeat on every page. Main content flows between them with pagination.",
        link: "/api-reference/decoration"
      },
      {
        icon: "fa-regular fa-list",
        name: "List",
        description: "Ordered (numbered) and unordered (bulleted) lists. Custom markers, nested levels, and automatic numbering.",
        link: "/api-reference/lists"
      },
      {
        icon: "fa-regular fa-layer-group",
        name: "Layers",
        description: "Stacked content planes for backgrounds, main content, and foreground overlays. Watermarks and letterhead effects.",
        link: "/api-reference/layers"
      },
      {
        icon: "fa-regular fa-bars-staggered",
        name: "Inlined",
        description: "Inline flow layout with automatic line wrapping. Elements arranged like words in a paragraph.",
        link: "/api-reference/inlined"
      },
      {
        icon: "fa-regular fa-newspaper",
        name: "Multi Column",
        description: "Newspaper-style columns where content flows from one column to the next, continuing across pages.",
        link: "/api-reference/multi-column"
      }
    ]
  },
  {
    name: "Positional Elements",
    description: "Sizing constraints, alignment, spacing, and geometric transformations.",
    items: [
      {
        icon: "fa-regular fa-left-right",
        name: "Width",
        description: "Horizontal size constraints: exact, minimum, and maximum values. Relative (percentage) or absolute units.",
        link: "/api-reference/width"
      },
      {
        icon: "fa-regular fa-up-down",
        name: "Height",
        description: "Vertical size constraints: exact, minimum, and maximum values. Relative (percentage) or absolute units.",
        link: "/api-reference/height"
      },
      {
        icon: "fa-regular fa-objects-align-center-horizontal",
        name: "Alignment",
        description: "Positions child within available space: center, top, bottom, left, right, and corner combinations.",
        link: "/api-reference/alignment"
      },
      {
        icon: "fa-regular fa-border-inner",
        name: "Padding",
        description: "Empty space around child content. Uniform or per-side values (top, right, bottom, left).",
        link: "/api-reference/padding"
      },
      {
        icon: "fa-regular fa-crop",
        name: "Aspect Ratio",
        description: "Maintains width-to-height proportion. Child content scales or clips to fit the constrained area.",
        link: "/api-reference/aspect-ratio"
      },
      {
        icon: "fa-regular fa-rotate",
        name: "Rotate",
        description: "Rotation by 90° increments or arbitrary angles. Content spins around its center point.",
        link: "/api-reference/rotate"
      },
      {
        icon: "fa-regular fa-expand",
        name: "Scale",
        description: "Proportional resizing (larger or smaller). Uniform or independent horizontal/vertical factors.",
        link: "/api-reference/scale"
      },
      {
        icon: "fa-regular fa-compress",
        name: "Scale to Fit",
        description: "Automatic scaling to fit available space. Preserves aspect ratio while maximizing size.",
        link: "/api-reference/scale-to-fit"
      },
      {
        icon: "fa-regular fa-arrows-up-down-left-right",
        name: "Translate",
        description: "Shifts content position without affecting layout flow. Creates overlapping or offset effects.",
        link: "/api-reference/translate"
      },
      {
        icon: "fa-regular fa-reflect-horizontal",
        name: "Flip",
        description: "Mirrors content horizontally, vertically, or both axes. Creates reflection effects.",
        link: "/api-reference/flip"
      },
      {
        icon: "fa-regular fa-unlock",
        name: "Unconstrained",
        description: "Removes parent size limits, giving children infinite available space. Reveals natural content size.",
        link: "/api-reference/unconstrained"
      },
      {
        icon: "fa-regular fa-up-right-and-down-left-from-center",
        name: "Extend",
        description: "Expands child to fill all available space horizontally, vertically, or both directions.",
        link: "/api-reference/extend"
      },
      {
        icon: "fa-regular fa-down-left-and-up-right-to-center",
        name: "Shrink",
        description: "Reduces child to minimum required size. Prevents stretching when parent offers excess space.",
        link: "/api-reference/shrink"
      },
      {
        icon: "fa-regular fa-layer-plus",
        name: "Z-Index",
        description: "Stacking order for overlapping elements in Layers. Higher values render in front of lower values.",
        link: "/api-reference/zindex"
      }
    ]
  },
  {
    name: "Content Flow",
    description: "Pagination control, conditional visibility, and multi-page content behavior.",
    items: [
      {
        icon: "fa-regular fa-page-break",
        name: "Page Break",
        description: "Forces subsequent content to begin on a new page. Immediate page transition.",
        link: "/api-reference/page-break"
      },
      {
        icon: "fa-regular fa-bring-front",
        name: "Prevent Page Break",
        description: "Keeps child content together on a single page. Moves entire block to next page if needed.",
        link: "/api-reference/prevent-page-break"
      },
      {
        icon: "fa-regular fa-ruler-vertical",
        name: "Ensure Space",
        description: "Requires minimum vertical space before rendering. Jumps to next page if threshold not met.",
        link: "/api-reference/ensure-space"
      },
      {
        icon: "fa-regular fa-rectangle-wide",
        name: "Show Entire",
        description: "Displays element fully on one page or skips to next page. No partial rendering or breaking.",
        link: "/api-reference/show-entire"
      },
      {
        icon: "fa-regular fa-repeat",
        name: "Repeat",
        description: "Duplicates content on every page of a multi-page section. Repeating decorations and patterns.",
        link: "/api-reference/repeat"
      },
      {
        icon: "fa-regular fa-code-branch",
        name: "Show If",
        description: "Conditional rendering based on boolean logic. Content appears or disappears based on runtime conditions.",
        link: "/api-reference/show-if"
      },
      {
        icon: "fa-regular fa-circle-1",
        name: "Show Once",
        description: "Renders content only on its first page occurrence. Hidden on subsequent pages of the same element.",
        link: "/api-reference/show-once"
      },
      {
        icon: "fa-regular fa-forward-step",
        name: "Skip Once",
        description: "Hides content on first page, visible on all subsequent pages. Inverse of Show Once.",
        link: "/api-reference/skip-once"
      },
      {
        icon: "fa-regular fa-stop",
        name: "Stop Paging",
        description: "Prevents content from continuing to additional pages. Overflow content is truncated.",
        link: "/api-reference/stop-paging"
      }
    ]
  },
  {
    name: "Other Elements",
    description: "Navigation, interactivity, performance optimization, and debugging tools.",
    items: [
      {
        icon: "fa-regular fa-bookmark",
        name: "Section",
        description: "Named regions for internal linking and location-aware page numbering. Enables table of contents and cross-references.",
        link: "/api-reference/section"
      },
      {
        icon: "fa-regular fa-link",
        name: "Hyperlink",
        description: "Clickable areas linking to external URLs, email addresses, or phone numbers. Opens in PDF reader.",
        link: "/api-reference/hyperlink"
      },
      {
        icon: "fa-regular fa-bolt",
        name: "Lazy",
        description: "Deferred content generation for memory optimization. Content rendered on-demand during pagination.",
        link: "/api-reference/lazy"
      },
      {
        icon: "fa-regular fa-text-size",
        name: "Default Text Style",
        description: "Inherited text formatting (font, size, color) applied to all descendant text elements.",
        link: "/api-reference/default-text-style"
      },
      {
        icon: "fa-regular fa-arrow-right-arrow-left",
        name: "Content Direction",
        description: "Left-to-right (LTR) or right-to-left (RTL) layout direction. Full RTL language and bidirectional text support.",
        link: "/api-reference/content-direction"
      },
      {
        icon: "fa-regular fa-border-top-left",
        name: "Debug Area",
        description: "Colored border and label overlay showing element boundaries. Visual debugging during development.",
        link: "/api-reference/debug-area"
      },
      {
        icon: "fa-regular fa-crosshairs",
        name: "Debug Pointer",
        description: "Named marker appearing in layout exception messages. Identifies problematic elements in error diagnostics.",
        link: "/api-reference/debug-pointer"
      }
    ]
  }
];
</script>

<style scoped>

.content {
  max-width: 750px;
}

.sub-header {
  max-width: 750px;
  margin-bottom: 0 !important;
}





.card h3 {
  margin-top: 0;
}




.api-reference-page {
  --card-columns: 4;
}

.hero {
  text-align: center;
  padding-top: 64px;
  padding-bottom: 64px;
}


.hero .sub-header {
  font-size: 1.25rem;
  line-height: 1.8;
  color: var(--vp-c-text-2);
  max-width: 700px;
  margin: 0 auto;
}

.hero .sub-header strong {
  color: var(--vp-c-text-1);
}

.category-header {
  margin-bottom: 2rem;
}

.category-header h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.category-description {
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 800px;
}

a:has(.card) {
  display: flex;
  align-items: stretch;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-template-rows: 1fr;
  align-items: stretch;
  justify-items: stretch;
  gap: 24px;
}

.card-link {
  text-decoration: none;
  color: inherit;
}

.card {
  background-color: var(--vp-c-bg) !important;
  transition: all 0.2s ease-in-out;
}

.card .icon {
  font-size: 1.5rem;
  padding: 12px 0;
  min-width: 48px;
  height: 48px;
  text-align: center;
  border-radius: 8px;

  color: #666;
  background-color: #6662;
}

.card b {
  color: var(--vp-c-text-1);
}

.reverse-background .card {
  background-color: var(--vp-c-bg-soft);
}

.card-link:hover:not(:has(.tags:hover)) {
  margin: -16px;
  padding: 16px;
  background-color: #2196F311;
  border-radius: 12px;

  .icon {
    color: #2196F3;
    background-color: #2196F322;
  }
}

.card-link .tags {
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
}

.card-link .tag {

  padding: 6px 12px;
  border: 1px solid #8884;
  border-radius: 8px;
  font-size: 0.8125rem;
  line-height: 1;
  color: var(--vp-c-text-2);
}

.card-link .tag:hover {
  border-color: var(--vp-c-text-1);
  color: var(--vp-c-text-1);
}

</style>
