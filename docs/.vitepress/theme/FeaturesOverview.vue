<template>
  <div class="custom-page">
    <div class="container reverse-background">
      <div class="content">

        <header class="section-header">
          <h1>Features Overview</h1>
          <p class="sub-header">
            Explore the full capabilities of QuestPDF. A mature, production-ready toolkit designed to handle every aspect of document generation, from versatile layouts to real-time developer tooling.
          </p>
        </header>

        <div v-for="category in categories" :key="category.name"class="card" >
          <h3>{{ category.name }}</h3>

          <template v-for="item in category.items" :key="item.name">
            <a :href="item.link">
              <div class="card-item">
                <i class="icon" :class="item.icon" />
                <div>
                  <p><b>{{ item.name }}</b> - {{ item.description }}</p>

                  <div v-if="item.tags" class="tags">
                    <a v-for="tag in item.tags" :key="tag.label" :href="tag.url" class="tag">
                      {{ tag.label }}
                    </a>
                  </div>
                </div>
              </div>
            </a>
          </template>
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
        description: "Download, install, and integrate the Companion App with your project. Enjoy real-time hot-reload preview.",
        link: "/companion/usage"
      },
      {
        icon: "fa-regular fa-ruler-combined",
        name: "Precision Tools",
        description: "Pixel-level inspection, coordinate picking, and distance measurement. Verify spacing, alignment, and positioning with precision.",
        link: "/companion/features#magnifier",
        tags: [
          {
            label: "Magnifier",
            url: "/companion/features#magnifier",
          },
          {
            label: "Coordinate Picker",
            url: "/companion/features#coordinate-picker",
          },
          {
            label: "Size measurement",
            url: "/companion/features#size-measurement",
          }
        ]
      },
      {
        icon: "fa-regular fa-compass",
        name: "Navigation Tools",
        description: "Explore document structure, search content by phrase, and jump directly to source code in your IDE.",
        link: "/companion/features#element-selection",
        tags: [
          {
            label: "Element Inspection",
            url: "/companion/features#element-selection",
          },
          {
            label: "Content Searching",
            url: "/companion/features#content-searching",
          },
          {
            label: "Go to Implementation",
            url: "/companion/features#go-to-implementation",
          }
        ]
      },
      {
        icon: "fa-regular fa-circle-exclamation",
        name: "Runtime Exception Analysis",
        description: "View detailed exception messages, stack traces, and source code context when errors occur during document generation.",
        link: "/companion/features#runtime-exceptions"
      },
      {
        icon: "fa-regular fa-bug",
        name: "Layout Issue Debugging",
        description: "Diagnose layout problems with color-coded status indicators. Identify root causes with intelligent heuristics.",
        link: "/companion/features#layout-issue-debugging"
      }
    ]
  },
  {
    name: "Document Operations",
    items: [
      {
        icon: "fa-regular fa-copy",
        name: "Merging Documents",
        description: "Combine multiple PDF files into a single document. Merge entire documents or select specific pages from each source with full control.",
        link: "/concepts/document-operations#merging-documents"
      },
      {
        icon: "fa-regular fa-scissors",
        name: "Page Selection / Extraction",
        description: "Select specific pages using flexible range syntax. Extract, reorder, reverse, or filter pages with powerful selection patterns.",
        link: "/concepts/document-operations#page-selection"
      },
      {
        icon: "fa-regular fa-clone",
        name: "Overlays / Underlays",
        description: "Apply watermarks, headers, footers, or letterhead by layering PDF content. Configure which pages receive overlays with precise control.",
        link: "/concepts/document-operations#overlays-and-underlays"
      },
      {
        icon: "fa-regular fa-lock",
        name: "Document Encryption",
        description: "Secure PDFs with 40-bit, 128-bit, or 256-bit encryption. Set user/owner passwords and control permissions for printing, copying, and editing.",
        link: "/concepts/document-operations#document-encryption"
      },
      {
        icon: "fa-regular fa-unlock",
        name: "Document Decryption",
        description: "Remove encryption and security restrictions from password-protected PDFs. Access content for further processing or distribution.",
        link: "/concepts/document-operations#document-decryption"
      },
      {
        icon: "fa-regular fa-globe",
        name: "Document Linealization",
        description: "Optimize PDFs for web delivery. Linearized files allow viewers to display content before the entire file downloads, improving user experience.",
        link: "/concepts/document-operations#document-linearization"
      },
      {
        icon: "fa-regular fa-paperclip",
        name: "Files Attachments",
        description: "Embed files directly within PDFs with full PDF/A compliance. Support for all embedded file relationships.",
        link: "/concepts/document-operations#file-attachments"
      },
      {
        icon: "fa-regular fa-tags",
        name: "Extending XMP Metadata",
        description: "Add custom XMP metadata to PDF/A documents. Essential for industry standards like ZUGFeRD invoices and other compliance requirements.",
        link: "/concepts/document-operations#xmp-metadata-extension"
      }
    ]
  },
  {
    name: "Important Concepts",
    items: [
      {
        icon: "fa-regular fa-gear",
        name: "Global Settings",
        description: "Library-wide configuration for caching, debugging, font glyph validation, and font discovery paths. Fine-tune performance and development experience.",
        link: "/concepts/global-settings"
      },
      {
        icon: "fa-regular fa-file-export",
        name: "Output Types",
        description: "Generate PDF, XPS, SVG, or raster images (PNG, JPEG, WEBP). Save to file, stream, or byte array for flexible integration.",
        link: "/concepts/generating-output"
      },
      {
        icon: "fa-regular fa-id-card",
        name: "Document Metadata",
        description: "Set PDF properties like title, author, subject, keywords, and timestamps. Improve document organization and searchability.",
        link: "/concepts/document-metadata"
      },
      {
        icon: "fa-regular fa-sliders",
        name: "Document Settings",
        description: "Configure PDF/A archival and PDF/UA accessibility compliance. Control compression, image quality, DPI, and content direction.",
        link: "/concepts/document-settings"
      },
      {
        icon: "fa-regular fa-lightbulb",
        name: "Patterns and Practices",
        description: "Best practices for clean, maintainable document code. Learn execution order, modular structure, local helpers, content styling, and extension methods.",
        link: null,
        tags: [
          {
            label: "Execution Order",
            url: "/concepts/code-patterns/execution-order",
          },
          {
            label: "Document Structure",
            url: "/concepts/code-patterns/document-structure",
          },
          {
            label: "Local Helpers",
            url: "/concepts/code-patterns/local-helpers",
          },
          {
            label: "Content Styling",
            url: "/concepts/code-patterns/content-styling",
          },
          {
            label: "Extension Methods",
            url: "/concepts/code-patterns/extension-methods",
          },
        ]
      },
      {
        icon: "fa-regular fa-universal-access",
        name: "Accessibility",
        description: "Generate inclusive PDFs with PDF/UA compliance and tagged content. Enable screen reader support with proper semantic structure for all users.",
        link: "/concepts/accessibility"
      },
      {
        icon: "fa-regular fa-puzzle-piece",
        name: "Components",
        description: "Build modular, reusable document blocks for cleaner architecture. Encapsulate layout patterns and maintain consistency across your entire codebase.",
        link: "/concepts/components",
        tags: [
          {
            label: "Components",
            url: "/concepts/code-patterns/components",
          },
          {
            label: "Dynamic Components",
            url: "/concepts/code-patterns/dynamic-components",
          },
          {
            label: "Capture Content Position",
            url: "/concepts/code-patterns/capture-content-position",
          }
        ]
      },
      {
        icon: "fa-regular fa-ruler",
        name: "Length Units",
        description: "Use points (default), inches, centimeters, millimeters, meters, or feet. Specify units directly in API methods for intuitive sizing.",
        link: "/concepts/length-unit-types"
      },
      {
        icon: "fa-regular fa-palette",
        name: "Predefined Colors",
        description: "Full Google Material Design color palette included. HEX, alpha channel, and shorthand formats supported with convenient color helpers.",
        link: "/concepts/colors"
      },
      {
        icon: "fa-regular fa-wand-magic-sparkles",
        name: "Placeholders",
        description: "Generate random text, colors, and images for rapid prototyping. Includes lorem ipsum, names, emails, dates, numbers, and gradient images.",
        link: "/concepts/prototyping",
        tags: [
          {
            label: "Text",
            url: "/concepts/prototyping#text",
          },
          {
            label: "Colors",
            url: "/concepts/prototyping#colors",
          },
          {
            label: "Images",
            url: "/concepts/prototyping#image",
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
        icon: "fa-regular fa-palette",
        name: "Styled Containers",
        description: "Enhance visual appearance of your content with decorative styling options.",
        tags: [
          {
            label: "Background",
            url: "/api-reference/background",
          },
          {
            label: "Border",
            url: "/api-reference/border",
          },
          {
            label: "Rounded Corners",
            url: "/api-reference/rounded-corners",
          },
          {
            label: "Shadows",
            url: "/api-reference/shadow",
          }
        ]
      },
      {
        icon: "fa-regular fa-text",
        name: "Text",
        description: "Rich text rendering with multiple formatting options. Automatic wrapping and seamless pagination across pages.",
        link: "/api-reference/text/basics",
        tags: [
          {
            label: "Text Style",
            url: "/api-reference/text/text-style",
          },
          {
            label: "Paragraph Style",
            url: "/api-reference/text/paragraph-style",
          },
          {
            label: "Page Numbers",
            url: "/api-reference/text/page-numbers",
          },
          {
            label: "Injecting Content",
            url: "/api-reference/text/injecting-custom-content",
          },
          {
            label: "Style Inheritance",
            url: "/api-reference/text/style-inheritance",
          },
          {
            label: "Font Management",
            url: "/api-reference/text/font-management",
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
            url: "/api-reference/image/optimization",
          },
          {
            label: "Shared Images",
            url: "/api-reference/image/shared",
          },
          {
            label: "SVG",
            url: "/api-reference/image/svg",
          },
          {
            label: "Images Of Dynamic Size",
            url: "/api-reference/image/dynamic",
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
        description: "Generate 1D barcodes and 2D QR codes. Integration guide with popular third-party libraries.",
        link: "/api-reference/barcodes"
      },
      {
        icon: "fa-regular fa-map-location-dot",
        name: "Maps",
        description: "Embed static maps in your documents. Integration tutorial using Mapbox services.",
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
            url: "/api-reference/page/slots",
          },
          {
            label: "Properties",
            url: "/api-reference/page/settings",
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
            url: "/api-reference/table/cell-style-pattern",
          },
          {
            label: "Header and Footer",
            url: "/api-reference/table/header-and-footer",
          },
          {
            label: "Overlapping Cells",
            url: "/api-reference/table/overlapping-cells",
          }
        ]
      },
      {
        icon: "fa-regular fa-table-rows",
        name: "Column",
        description: "Vertical stacking of children with configurable spacing. Automatic pagination ensures content flows seamlessly across pages.",
        link: "/api-reference/column"
      },
      {
        icon: "fa-regular fa-table-columns",
        name: "Row",
        description: "Horizontal arrangement with flexible sizing options. Combine proportional, fixed, and auto-width items with configurable spacing.",
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
        description: "Add breathing room around content with uniform or per-side spacing. Supports all length units for precise layout control.",
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
        icon: "fa-regular fa-infinity",
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
        icon: "fa-regular fa-frame",
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
        icon: "fa-regular fa-object-group",
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
        description: "Define named regions for navigation and location-aware page numbering. Build table of contents and cross-references with ease.",
        link: "/api-reference/section"
      },
      {
        icon: "fa-regular fa-link",
        name: "Hyperlink",
        description: "Create interactive clickable areas linking to URLs, email addresses, or phone numbers. Seamless integration with PDF reader capabilities.",
        link: "/api-reference/hyperlink"
      },
      {
        icon: "fa-regular fa-bolt",
        name: "Lazy",
        description: "Optimize memory for large documents with deferred content generation. Ideal for data-intensive reports and enterprise-scale document processing.",
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
        icon: "fa-regular fa-square-dashed",
        name: "Debug Area",
        description: "Colored border and label overlay showing element boundaries. Visual debugging during development.",
        link: "/api-reference/debug-area"
      },
      {
        icon: "fa-regular fa-location-dot",
        name: "Debug Pointer",
        description: "Named marker appearing in layout exception messages. Identifies problematic elements in error diagnostics.",
        link: "/api-reference/debug-pointer"
      }
    ]
  }
];
</script>

<style scoped>

/* Page styles */

.content {
  display: flex;
  flex-direction: column;
  gap: 48px;
  max-width: 750px;
}

.sub-header {
  max-width: 750px;
  margin-bottom: 0 !important;
}


/* Card design */

.card {
  display: flex;
  flex-direction: column;
  gap: 32px;
  background-color: var(--vp-c-bg) !important;
}

.card h3 {
  margin-top: 0;
  font-weight: 700;
  color: #2196F3;
}


/* Card item */

.card-item {
  display: flex; flex-direction: row; gap: 24px;
  text-decoration: none;
  color: inherit;
}

.card-item .icon {
  font-size: 1.5rem;
  padding: 12px 0;
  min-width: 48px;
  height: 48px;
  text-align: center;
  border-radius: 8px;

  color: #666;
  background-color: #8882;
}

html.dark .card-item .icon {
  color: #999;
}

.card-item b {
  color: var(--vp-c-text-1);
}

.card-item:hover {
  margin: -16px;
  padding: 16px;
  background-color: #2196F311;
  border-radius: 12px;

  .icon {
    color: #2196F3 !important;
    background-color: #2196F322;
  }
}


/* Card item - tags */

.card-item .tags {
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
}

.card-item .tag {
  padding: 8px 12px;
  border: 1px solid #8884;
  border-radius: 8px;
  font-size: 0.8125rem;
  line-height: 1;
  color: var(--vp-c-text-2);
}

.card-item .tag:hover {
  background-color: var(--vp-c-bg);
  border-color: var(--vp-c-text-1);
  color: var(--vp-c-text-1);
}

</style>
