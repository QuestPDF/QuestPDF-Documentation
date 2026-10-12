<template>
  <div class="custom-page features-page textured-page">
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
            <h2>{{ category.name }}</h2>
            <p v-if="category.description" class="category-description">{{ category.description }}</p>
          </header>

          <!-- One row per feature: icon, name, short line. The row links to the documentation page;
               the full description lives in a visually hidden paragraph that the row is described by,
               and the same text is shown as a tooltip on hover and keyboard focus. Sub-pages follow
               their parent as child rows, always visible. -->
          <ul class="feature-list">
            <li v-for="item in category.items" :key="item.name" class="feature">
              <component
                :is="item.link ? 'a' : 'div'"
                :href="item.link || undefined"
                class="feature-row"
                :class="{ linked: item.link }"
                :aria-describedby="descriptionId(category, item)"
                @mouseenter="scheduleTip($event.currentTarget, item.description)"
                @mouseleave="hideTip"
                @focus="showTip($event.currentTarget, item.description)"
                @blur="hideTip"
              >
                <i class="feature-icon" :class="item.icon" aria-hidden="true" />
                <span class="feature-name">{{ item.name }}</span>
                <span class="feature-summary">{{ item.summary }}</span>
                <i v-if="item.link" class="feature-arrow fa-regular fa-arrow-right" aria-hidden="true" />
              </component>
              <p :id="descriptionId(category, item)" class="visually-hidden">{{ item.description }}</p>

              <ul v-if="item.tags" class="feature-children">
                <li v-for="tag in item.tags" :key="tag.label" class="feature-child">
                  <a
                    :href="tag.url"
                    class="feature-row child linked"
                    :aria-describedby="descriptionId(category, item, tag)"
                    @mouseenter="scheduleTip($event.currentTarget, tag.description)"
                    @mouseleave="hideTip"
                    @focus="showTip($event.currentTarget, tag.description)"
                    @blur="hideTip"
                  >
                    <span class="feature-name">{{ tag.label }}</span>
                    <span class="feature-summary">{{ tag.summary }}</span>
                    <i class="feature-arrow fa-regular fa-arrow-right" aria-hidden="true" />
                  </a>
                  <p :id="descriptionId(category, item, tag)" class="visually-hidden">{{ tag.description }}</p>
                </li>
              </ul>
            </li>
          </ul>
        </section>

      </div>
    </div>

    <div ref="tipElement" v-show="tip.visible" class="feature-tip" role="tooltip" :style="{ top: tip.top + 'px', left: tip.left + 'px' }">{{ tip.text }}</div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, reactive, ref } from "vue";

/* Tooltip: a single element for the whole page, positioned under the name of the hovered or focused row.
   Hover opens it after a short delay so sweeping the mouse down the list does not flicker; it is only
   offered to devices with a real pointer. Keyboard focus opens it immediately on any device. */

const tip = reactive({ visible: false, text: "", top: 0, left: 0 });
const tipElement = ref(null);
const TIP_WIDTH = 420;
const TIP_DELAY = 120;
let tipTimer = null;
let canHover = false;

function descriptionId(category, item, tag) {
  const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return ["feature", slug(category.name), slug(item.name), tag ? slug(tag.label) : null].filter(Boolean).join("-");
}

function scheduleTip(row, text) {
  if (!canHover) return;
  clearTimeout(tipTimer);
  tipTimer = setTimeout(() => showTip(row, text), TIP_DELAY);
}

async function showTip(row, text) {
  clearTimeout(tipTimer);
  if (!text) return;

  tip.text = text;
  tip.visible = true;
  await nextTick(); /* the tooltip must be rendered with its text before its height can be measured */

  const rowBox = row.getBoundingClientRect();
  const nameBox = row.querySelector(".feature-name").getBoundingClientRect();
  const width = Math.min(TIP_WIDTH, window.innerWidth - 32);
  const height = tipElement.value ? tipElement.value.offsetHeight : 0;
  const fitsBelow = rowBox.bottom + 4 + height <= window.innerHeight;

  tip.left = Math.max(16, Math.min(nameBox.left, window.innerWidth - width - 16));
  tip.top = fitsBelow ? rowBox.bottom + 4 : rowBox.top - height - 4;
}

function hideTip() {
  clearTimeout(tipTimer);
  tip.visible = false;
}

function onKeydown(event) {
  if (event.key === "Escape") hideTip();
}

onMounted(() => {
  canHover = window.matchMedia("(hover: hover)").matches;
  window.addEventListener("scroll", hideTip, { passive: true });
  window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  window.removeEventListener("scroll", hideTip);
  window.removeEventListener("keydown", onKeydown);
});

const categories = [
  {
    name: "Layout Elements",
    description: "Container elements for organizing and structuring document content.",
    items: [
      {
        icon: "fa-regular fa-file",
        name: "Page",
        summary: "Size, margins, orientation, header, footer",
        description: "Document foundation with size, margins, orientation, headers, footers, and watermarks. Continuous or paged content modes.",
        link: "/api-reference/page/basics.html",
        tags: [
          {
            label: "Slots",
            summary: "Header, content and footer areas",
            description: "Three areas of every page: a header and footer that repeat, and the content between them that flows.",
            url: "/api-reference/page/slots.html",
          },
          {
            label: "Properties",
            summary: "Size, margins, colour, continuous mode",
            description: "Page size and orientation, margins per side, background colour, default text style, and continuous mode for a single tall page.",
            url: "/api-reference/page/settings.html",
          }
        ]
      },
      {
        icon: "fa-regular fa-table",
        name: "Table",
        summary: "Rows and columns with spans and repeating headers",
        description: "Grid layout with rows and columns. Cell spanning, repeating headers/footers, auto-pagination, and precise cell styling.",
        link: "/api-reference/table/basics.html",
        tags: [
          {
            label: "Cell Style Patterns",
            summary: "Alternating rows, borders by position",
            description: "Style cells by rule rather than one by one: alternating row backgrounds, borders that depend on position, highlighted columns.",
            url: "/api-reference/table/cell-style-pattern.html",
          },
          {
            label: "Header and Footer",
            summary: "Rows repeated on every page",
            description: "Header and footer rows that are repeated at the top and bottom of every page the table spans.",
            url: "/api-reference/table/header-and-footer.html",
          },
          {
            label: "Overlapping Cells",
            summary: "Cells drawn over other cells",
            description: "Cells that span rows and columns and are drawn over other cells, for backgrounds, highlights and annotations.",
            url: "/api-reference/table/overlapping-cells.html",
          }
        ]
      },
      {
        icon: "fa-regular fa-table-rows",
        name: "Column",
        summary: "Stack children vertically, paginate automatically",
        description: "Vertical stacking of children with configurable spacing. Automatic pagination ensures content flows seamlessly across pages.",
        link: "/api-reference/column.html"
      },
      {
        icon: "fa-regular fa-table-columns",
        name: "Row",
        summary: "Place children side by side",
        description: "Horizontal arrangement with flexible sizing options. Combine proportional, fixed, and auto-width items with configurable spacing.",
        link: "/api-reference/row.html"
      },
      {
        icon: "fa-regular fa-window-maximize",
        name: "Decoration",
        summary: "Header and footer repeated on every page",
        description: "Persistent header and footer areas that repeat on every page. Main content flows between them with pagination.",
        link: "/api-reference/decoration.html"
      },
      {
        icon: "fa-regular fa-list",
        name: "List",
        summary: "Numbered and bulleted lists, nested",
        description: "Ordered (numbered) and unordered (bulleted) lists. Custom markers, nested levels, and automatic numbering.",
        link: "/api-reference/lists.html"
      },
      {
        icon: "fa-regular fa-layer-group",
        name: "Layers",
        summary: "Stack content planes, watermarks and overlays",
        description: "Stacked content planes for backgrounds, main content, and foreground overlays. Watermarks and letterhead effects.",
        link: "/api-reference/layers.html"
      },
      {
        icon: "fa-regular fa-bars-staggered",
        name: "Inlined",
        summary: "Flow items like words in a paragraph",
        description: "Inline flow layout with automatic line wrapping. Elements arranged like words in a paragraph.",
        link: "/api-reference/inlined.html"
      },
      {
        icon: "fa-regular fa-newspaper",
        name: "Multi Column",
        summary: "Newspaper-style columns that flow across pages",
        description: "Newspaper-style columns where content flows from one column to the next, continuing across pages.",
        link: "/api-reference/multi-column.html"
      }
    ]
  },
  {
    name: "Visual Content",
    description: "Elements for rendering text, images, graphics, and visual styling.",
    items: [
      {
        icon: "fa-regular fa-palette",
        name: "Styled Containers",
        summary: "Background, border, rounded corners, shadow",
        description: "Enhance visual appearance of your content with decorative styling options.",
        tags: [
          {
            label: "Background",
            summary: "Solid fill behind the content",
            description: "A solid colour behind any element, with the Material palette or any HEX value.",
            url: "/api-reference/background.html",
          },
          {
            label: "Border",
            summary: "Lines per side, colour and width",
            description: "Borders on any combination of sides, each with its own width and colour.",
            url: "/api-reference/border.html",
          },
          {
            label: "Rounded Corners",
            summary: "Radius per corner",
            description: "Round all corners or each corner separately; backgrounds and borders follow the shape.",
            url: "/api-reference/rounded-corners.html",
          },
          {
            label: "Shadows",
            summary: "Soft drop shadow with offset",
            description: "A soft shadow with configurable blur, offset and colour, drawn beneath the element.",
            url: "/api-reference/shadow.html",
          }
        ]
      },
      {
        icon: "fa-regular fa-text",
        name: "Text",
        summary: "Rich text with styles, wrapping, page numbers",
        description: "Rich text rendering with multiple formatting options. Automatic wrapping and seamless pagination across pages.",
        link: "/api-reference/text/basics.html",
        tags: [
          {
            label: "Text Style",
            summary: "Font, size, weight, colour, decoration",
            description: "Set the font family, size, weight, colour, letter spacing and decoration of any span.",
            url: "/api-reference/text/text-style.html",
          },
          {
            label: "Paragraph Style",
            summary: "Alignment, spacing, indentation, line height",
            description: "Alignment, first-line indentation, spacing between paragraphs, line height and clamping to a number of lines.",
            url: "/api-reference/text/paragraph-style.html",
          },
          {
            label: "Page Numbers",
            summary: "Current, total and section numbers",
            description: "Insert the current page, the total page count, or the page a named section begins and ends on, straight into text.",
            url: "/api-reference/text/page-numbers.html",
          },
          {
            label: "Injecting Content",
            summary: "Elements and hyperlinks inside text",
            description: "Place hyperlinks, inline elements and custom content inside a paragraph, flowing with the words.",
            url: "/api-reference/text/injecting-custom-content.html",
          },
          {
            label: "Style Inheritance",
            summary: "Defaults cascade from parent to child",
            description: "Text style set on a container becomes the default for everything inside it, overridden only where you say so.",
            url: "/api-reference/text/style-inheritance.html",
          },
          {
            label: "Font Management",
            summary: "Register and embed custom fonts",
            description: "Register font files or fonts from the system, pick fallbacks, and embed subsets in the PDF.",
            url: "/api-reference/text/font-management.html",
          }
        ]
      },
      {
        icon: "fa-regular fa-image",
        name: "Image",
        summary: "PNG, JPEG, WebP and SVG with caching",
        description: "Raster images (PNG, JPEG, WebP) and SVG vectors. Automatic aspect ratio, compression, resolution optimization, and shared image caching.",
        link: "/api-reference/image/basics.html",
        tags: [
          {
            label: "Size Optimization",
            summary: "Resample and compress to target DPI",
            description: "Images are resampled to the DPI you choose and compressed, keeping files small without visible loss.",
            url: "/api-reference/image/optimization.html",
          },
          {
            label: "Shared Images",
            summary: "Load once, use many times",
            description: "Load an image once and reuse it across the document so repeated logos do not grow the file.",
            url: "/api-reference/image/shared.html",
          },
          {
            label: "SVG",
            summary: "Vector images, crisp at any size",
            description: "SVG files are drawn as vectors, so they stay sharp at any scale and print size.",
            url: "/api-reference/image/svg.html",
          },
          {
            label: "Images Of Dynamic Size",
            summary: "Draw at the size the layout gives",
            description: "Generate the image at the size the layout actually provides, for charts and renders that should fit exactly.",
            url: "/api-reference/image/dynamic.html",
          }
        ]
      },
      {
        icon: "fa-regular fa-horizontal-rule",
        name: "Line",
        summary: "Horizontal or vertical separators",
        description: "Horizontal or vertical lines with configurable thickness and color. Useful as visual separators and dividers.",
        link: "/api-reference/line.html"
      },
      {
        icon: "fa-regular fa-grid-2",
        name: "Placeholder",
        summary: "Grey box to reserve space while prototyping",
        description: "Gray rectangle with diagonal lines and optional label. Visualizes reserved space during layout prototyping.",
        link: "/api-reference/placeholder.html"
      },
      {
        icon: "fa-regular fa-chart-mixed",
        name: "Charts",
        summary: "ScottPlot, LiveCharts, Microcharts as vectors",
        description: "Integration with charting libraries (ScottPlot, LiveCharts, Microcharts). Bar, line, pie, area charts as vector graphics.",
        link: "/api-reference/charts.html"
      },
      {
        icon: "fa-regular fa-qrcode",
        name: "Barcodes / QR Codes",
        summary: "1D barcodes and QR codes via libraries",
        description: "Generate 1D barcodes and 2D QR codes. Integration guide with popular third-party libraries.",
        link: "/api-reference/barcodes.html"
      },
      {
        icon: "fa-regular fa-map-location-dot",
        name: "Maps",
        summary: "Static maps from Mapbox",
        description: "Embed static maps in your documents. Integration tutorial using Mapbox services.",
        link: "/api-reference/maps.html"
      },
      {
        icon: "fa-regular fa-bezier-curve",
        name: "Complex Graphics",
        summary: "Paths, shapes and bezier curves",
        description: "Canvas-style drawing API for paths, shapes, bezier curves, and custom vector graphics. Fill and stroke operations.",
        link: "/api-reference/complex-graphics.html"
      },
      {
        icon: "fa-regular fa-paintbrush",
        name: "SkiaSharp Integration",
        summary: "Direct canvas access for anything else",
        description: "Direct SkiaSharp canvas access for shaders, gradients, image filters, blend modes, and advanced 2D graphics.",
        link: "/api-reference/skiasharp-integration.html"
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
        summary: "Exact, minimum or maximum width",
        description: "Horizontal size constraints: exact, minimum, and maximum values. Relative (percentage) or absolute units.",
        link: "/api-reference/width.html"
      },
      {
        icon: "fa-regular fa-up-down",
        name: "Height",
        summary: "Exact, minimum or maximum height",
        description: "Vertical size constraints: exact, minimum, and maximum values. Relative (percentage) or absolute units.",
        link: "/api-reference/height.html"
      },
      {
        icon: "fa-regular fa-objects-align-center-horizontal",
        name: "Alignment",
        summary: "Place the child: center, edges, corners",
        description: "Positions child within available space: center, top, bottom, left, right, and corner combinations.",
        link: "/api-reference/alignment.html"
      },
      {
        icon: "fa-regular fa-border-inner",
        name: "Padding",
        summary: "Space around content, per side",
        description: "Add breathing room around content with uniform or per-side spacing. Supports all length units for precise layout control.",
        link: "/api-reference/padding.html"
      },
      {
        icon: "fa-regular fa-crop",
        name: "Aspect Ratio",
        summary: "Keep a fixed width-to-height proportion",
        description: "Maintains width-to-height proportion. Child content scales or clips to fit the constrained area.",
        link: "/api-reference/aspect-ratio.html"
      },
      {
        icon: "fa-regular fa-rotate",
        name: "Rotate",
        summary: "Right angles or any degree",
        description: "Rotation by 90° increments or arbitrary angles. Content spins around its center point.",
        link: "/api-reference/rotate.html"
      },
      {
        icon: "fa-regular fa-expand",
        name: "Scale",
        summary: "Resize proportionally, larger or smaller",
        description: "Proportional resizing (larger or smaller). Uniform or independent horizontal/vertical factors.",
        link: "/api-reference/scale.html"
      },
      {
        icon: "fa-regular fa-compress",
        name: "Scale to Fit",
        summary: "Shrink until it fits the space",
        description: "Automatic scaling to fit available space. Preserves aspect ratio while maximizing size.",
        link: "/api-reference/scale-to-fit.html"
      },
      {
        icon: "fa-regular fa-arrows-up-down-left-right",
        name: "Offset",
        summary: "Shift without affecting layout flow",
        description: "Shifts content position without affecting layout flow. Creates overlapping or offset effects.",
        link: "/api-reference/offset.html"
      },
      {
        icon: "fa-regular fa-reflect-horizontal",
        name: "Flip",
        summary: "Mirror horizontally or vertically",
        description: "Mirrors content horizontally, vertically, or both axes. Creates reflection effects.",
        link: "/api-reference/flip.html"
      },
      {
        icon: "fa-regular fa-infinity",
        name: "Unconstrained",
        summary: "Give the child infinite space",
        description: "Removes parent size limits, giving children infinite available space. Reveals natural content size.",
        link: "/api-reference/unconstrained.html"
      },
      {
        icon: "fa-regular fa-up-right-and-down-left-from-center",
        name: "Extend",
        summary: "Fill all available space",
        description: "Expands child to fill all available space horizontally, vertically, or both directions.",
        link: "/api-reference/extend.html"
      },
      {
        icon: "fa-regular fa-down-left-and-up-right-to-center",
        name: "Shrink",
        summary: "Take only the space needed",
        description: "Reduces child to minimum required size. Prevents stretching when parent offers excess space.",
        link: "/api-reference/shrink.html"
      },
      {
        icon: "fa-regular fa-layer-plus",
        name: "Z-Index",
        summary: "Stacking order inside Layers",
        description: "Stacking order for overlapping elements in Layers. Higher values render in front of lower values.",
        link: "/api-reference/zindex.html"
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
        summary: "Start the next content on a new page",
        description: "Forces subsequent content to begin on a new page. Immediate page transition.",
        link: "/api-reference/page-break.html"
      },
      {
        icon: "fa-regular fa-frame",
        name: "Prevent Page Break",
        summary: "Keep a block together on one page",
        description: "Keeps child content together on a single page. Moves entire block to next page if needed.",
        link: "/api-reference/prevent-page-break.html"
      },
      {
        icon: "fa-regular fa-ruler-vertical",
        name: "Ensure Space",
        summary: "Require a minimum height, else next page",
        description: "Requires minimum vertical space before rendering. Jumps to next page if threshold not met.",
        link: "/api-reference/ensure-space.html"
      },
      {
        icon: "fa-regular fa-object-group",
        name: "Show Entire",
        summary: "Render whole on one page or move it",
        description: "Displays element fully on one page or skips to next page. No partial rendering or breaking.",
        link: "/api-reference/show-entire.html"
      },
      {
        icon: "fa-regular fa-repeat",
        name: "Repeat",
        summary: "Draw again on every page of a section",
        description: "Duplicates content on every page of a multi-page section. Repeating decorations and patterns.",
        link: "/api-reference/repeat.html"
      },
      {
        icon: "fa-regular fa-code-branch",
        name: "Show If",
        summary: "Render only when a condition holds",
        description: "Conditional rendering based on boolean logic. Content appears or disappears based on runtime conditions.",
        link: "/api-reference/show-if.html"
      },
      {
        icon: "fa-regular fa-circle-1",
        name: "Show Once",
        summary: "Visible only on its first page",
        description: "Renders content only on its first page occurrence. Hidden on subsequent pages of the same element.",
        link: "/api-reference/show-once.html"
      },
      {
        icon: "fa-regular fa-forward-step",
        name: "Skip Once",
        summary: "Hidden on its first page only",
        description: "Hides content on first page, visible on all subsequent pages. Inverse of Show Once.",
        link: "/api-reference/skip-once.html"
      },
      {
        icon: "fa-regular fa-stop",
        name: "Stop Paging",
        summary: "Truncate instead of continuing to more pages",
        description: "Prevents content from continuing to additional pages. Overflow content is truncated.",
        link: "/api-reference/stop-paging.html"
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
        summary: "Named regions for navigation and page numbers",
        description: "Define named regions for navigation and location-aware page numbering. Build table of contents and cross-references with ease.",
        link: "/api-reference/section.html"
      },
      {
        icon: "fa-regular fa-link",
        name: "Hyperlink",
        summary: "Clickable links to URLs, email, phone",
        description: "Create interactive clickable areas linking to URLs, email addresses, or phone numbers. Seamless integration with PDF reader capabilities.",
        link: "/api-reference/hyperlink.html"
      },
      {
        icon: "fa-regular fa-bolt",
        name: "Lazy",
        summary: "Defer generation to save memory on huge documents",
        description: "Optimize memory for large documents with deferred content generation. Ideal for data-intensive reports and enterprise-scale document processing.",
        link: "/api-reference/lazy.html"
      },
      {
        icon: "fa-regular fa-text-size",
        name: "Default Text Style",
        summary: "Inherited font, size and color",
        description: "Inherited text formatting (font, size, color) applied to all descendant text elements.",
        link: "/api-reference/default-text-style.html"
      },
      {
        icon: "fa-regular fa-arrow-right-arrow-left",
        name: "Content Direction",
        summary: "Left-to-right or right-to-left layout",
        description: "Left-to-right (LTR) or right-to-left (RTL) layout direction. Full RTL language and bidirectional text support.",
        link: "/api-reference/content-direction.html"
      },
      {
        icon: "fa-regular fa-square-dashed",
        name: "Debug Area",
        summary: "Colored outline showing an element's bounds",
        description: "Colored border and label overlay showing element boundaries. Visual debugging during development.",
        link: "/api-reference/debug-area.html"
      },
      {
        icon: "fa-regular fa-location-dot",
        name: "Debug Pointer",
        summary: "Named marker in layout exception messages",
        description: "Named marker appearing in layout exception messages. Identifies problematic elements in error diagnostics.",
        link: "/api-reference/debug-pointer.html"
      }
    ]
  },
  {
    name: "Important Concepts",
    description: "Output, settings, metadata and code patterns.",
    items: [
      {
        icon: "fa-regular fa-file-export",
        name: "Output Types",
        summary: "PDF, SVG or images; file, stream or bytes",
        description: "Generate PDF, SVG, or raster images (PNG, JPEG, WEBP). Save to file, stream, or byte array for flexible integration.",
        link: "/concepts/generating-output.html"
      },
      {
        icon: "fa-regular fa-id-card",
        name: "Document Metadata",
        summary: "Title, author, keywords, timestamps",
        description: "Set PDF properties like title, author, subject, keywords, and timestamps. Improve document organization and searchability.",
        link: "/concepts/document-metadata.html"
      },
      {
        icon: "fa-regular fa-sliders",
        name: "Document Settings",
        summary: "PDF/A, PDF/UA, compression, DPI",
        description: "Configure PDF/A archival and PDF/UA accessibility compliance. Control compression, image quality, DPI, and content direction.",
        link: "/concepts/document-settings.html"
      },
      {
        icon: "fa-regular fa-lightbulb",
        name: "Patterns and Practices",
        summary: "How to structure maintainable document code",
        description: "Best practices for clean, maintainable document code. Learn execution order, modular structure, local helpers, content styling, and extension methods.",
        link: null,
        tags: [
          {
            label: "Execution Order",
            summary: "Fluent calls read outside in",
            description: "How a chain of fluent calls maps to nested elements, and why the order of calls matters.",
            url: "/concepts/code-patterns/execution-order.html",
          },
          {
            label: "Document Structure",
            summary: "Split documents into methods and classes",
            description: "Keep large documents readable by splitting them into methods, classes and reusable pieces.",
            url: "/concepts/code-patterns/document-structure.html",
          },
          {
            label: "Local Helpers",
            summary: "Small functions for repeated fragments",
            description: "Small local functions that encapsulate repeated fragments such as a labelled cell or a titled block.",
            url: "/concepts/code-patterns/local-helpers.html",
          },
          {
            label: "Content Styling",
            summary: "Keep styles named and consistent",
            description: "Define text styles and colours once, give them names, and reuse them everywhere.",
            url: "/concepts/code-patterns/content-styling.html",
          },
          {
            label: "Extension Methods",
            summary: "Your own fluent API",
            description: "Extend the fluent API with your own methods so project conventions read like built-in calls.",
            url: "/concepts/code-patterns/extension-methods.html",
          },
        ]
      },
      {
        icon: "fa-regular fa-universal-access",
        name: "Accessibility",
        summary: "PDF/UA, tagged content, screen readers",
        description: "Generate inclusive PDFs with PDF/UA compliance and tagged content. Enable screen reader support with proper semantic structure for all users.",
        link: "/concepts/accessibility.html"
      },
      {
        icon: "fa-regular fa-puzzle-piece",
        name: "Components",
        summary: "Reusable, encapsulated document blocks",
        description: "Build modular, reusable document blocks for cleaner architecture. Encapsulate layout patterns and maintain consistency across your entire codebase.",
        link: "/concepts/code-patterns/components.html",
        tags: [
          {
            label: "Components",
            summary: "Reusable blocks with their own state",
            description: "Classes that implement IComponent to encapsulate a reusable piece of a document with its own data and logic.",
            url: "/concepts/code-patterns/components.html",
          },
          {
            label: "Dynamic Components",
            summary: "Content that depends on page and space",
            description: "Components that see the current page number and the space available, for running totals and content that adapts per page.",
            url: "/concepts/code-patterns/dynamic-components.html",
          },
          {
            label: "Capture Content Position",
            summary: "Read where an element landed",
            description: "Record the page and position where an element was drawn, for cross-references and tables of contents.",
            url: "/concepts/code-patterns/capture-content-position.html",
          }
        ]
      },
      {
        icon: "fa-regular fa-ruler",
        name: "Length Units",
        summary: "Points, inches, centimeters, millimeters",
        description: "Use points (default), inches, centimeters, millimeters, meters, or feet. Specify units directly in API methods for intuitive sizing.",
        link: "/concepts/length-unit-types.html"
      },
      {
        icon: "fa-regular fa-palette",
        name: "Predefined Colors",
        summary: "Material Design palette and HEX helpers",
        description: "Full Google Material Design color palette included. HEX, alpha channel, and shorthand formats supported with convenient color helpers.",
        link: "/concepts/colors.html"
      },
      {
        icon: "fa-regular fa-wand-magic-sparkles",
        name: "Placeholders",
        summary: "Random text, colors and images for prototypes",
        description: "Generate random text, colors, and images for rapid prototyping. Includes lorem ipsum, names, emails, dates, numbers, and gradient images.",
        link: "/concepts/prototyping.html",
        tags: [
          {
            label: "Text",
            summary: "Lorem ipsum, names, dates",
            description: "Generate lorem ipsum, names, addresses, dates and numbers while prototyping.",
            url: "/concepts/prototyping.html#text",
          },
          {
            label: "Colors",
            summary: "Random colours from the palette",
            description: "Random colours from the Material palette, useful for telling layout regions apart.",
            url: "/concepts/prototyping.html#colors",
          },
          {
            label: "Images",
            summary: "Random pictures at any size",
            description: "Random placeholder pictures at any size, to stand in for real images.",
            url: "/concepts/prototyping.html#image",
          }
        ]
      },
    ]
  },
  {
    name: "Document Operations",
    description: "Operations on PDF files that already exist.",
    items: [
      {
        icon: "fa-regular fa-copy",
        name: "Merging Documents",
        summary: "Combine files or selected pages",
        description: "Combine multiple PDF files into a single document. Merge entire documents or select specific pages from each source with full control.",
        link: "/concepts/document-operations.html#merging-documents"
      },
      {
        icon: "fa-regular fa-scissors",
        name: "Page Selection / Extraction",
        summary: "Pick, reorder, reverse or filter pages",
        description: "Select specific pages using flexible range syntax. Extract, reorder, reverse, or filter pages with powerful selection patterns.",
        link: "/concepts/document-operations.html#page-selection"
      },
      {
        icon: "fa-regular fa-clone",
        name: "Overlays / Underlays",
        summary: "Watermarks and letterhead on existing PDFs",
        description: "Apply watermarks, headers, footers, or letterhead by layering PDF content. Configure which pages receive overlays with precise control.",
        link: "/concepts/document-operations.html#overlays-and-underlays"
      },
      {
        icon: "fa-regular fa-lock",
        name: "Document Encryption",
        summary: "40 to 256-bit encryption and permissions",
        description: "Secure PDFs with 40-bit, 128-bit, or 256-bit encryption. Set user/owner passwords and control permissions for printing, copying, and editing.",
        link: "/concepts/document-operations.html#document-encryption"
      },
      {
        icon: "fa-regular fa-unlock",
        name: "Document Decryption",
        summary: "Remove passwords and restrictions",
        description: "Remove encryption and security restrictions from password-protected PDFs. Access content for further processing or distribution.",
        link: "/concepts/document-operations.html#document-decryption"
      },
      {
        icon: "fa-regular fa-globe",
        name: "Document Linearization",
        summary: "Fast web view: first page before the download ends",
        description: "Optimize PDFs for web delivery. Linearized files allow viewers to display content before the entire file downloads, improving user experience.",
        link: "/concepts/document-operations.html#document-linearization"
      },
      {
        icon: "fa-regular fa-paperclip",
        name: "Files Attachments",
        summary: "Embed files, PDF/A compliant",
        description: "Embed files directly within PDFs with full PDF/A compliance. Support for all embedded file relationships.",
        link: "/concepts/document-operations.html#file-attachments"
      },
      {
        icon: "fa-regular fa-tags",
        name: "Extending XMP Metadata",
        summary: "Custom XMP for ZUGFeRD and other standards",
        description: "Add custom XMP metadata to PDF/A documents. Essential for industry standards like ZUGFeRD invoices and other compliance requirements.",
        link: "/concepts/document-operations.html#xmp-metadata-extension"
      }
    ]
  },
  {
    name: "Companion App",
    description: "Preview, inspect and debug documents while you write the code.",
    items: [
      {
        icon: "fa-regular fa-rocket",
        name: "Installation and Getting Started",
        summary: "Install, connect, hot reload preview",
        description: "Download, install, and integrate the Companion App with your project. Enjoy real-time hot-reload preview.",
        link: "/companion/usage.html"
      },
      {
        icon: "fa-regular fa-ruler-combined",
        name: "Precision Tools",
        summary: "Magnifier, coordinate picker, size measurement",
        description: "Pixel-level inspection, coordinate picking, and distance measurement. Verify spacing, alignment, and positioning with precision.",
        link: "/companion/features.html#magnifier",
        tags: [
          {
            label: "Magnifier",
            summary: "Zoom in on details",
            description: "Zoom into the preview to inspect fine details such as line thickness and glyph rendering.",
            url: "/companion/features.html#magnifier",
          },
          {
            label: "Coordinate Picker",
            summary: "Read a point's position on the page",
            description: "Read the exact position of any point on the page in the units the document uses.",
            url: "/companion/features.html#coordinate-picker",
          },
          {
            label: "Size measurement",
            summary: "Measure distances and element sizes",
            description: "Measure distances between points and the size of any element on the page.",
            url: "/companion/features.html#size-measurement",
          }
        ]
      },
      {
        icon: "fa-regular fa-compass",
        name: "Navigation Tools",
        summary: "Inspect elements, search content, go to code",
        description: "Explore document structure, search content by phrase, and jump directly to source code in your IDE.",
        link: "/companion/features.html#element-selection",
        tags: [
          {
            label: "Element Inspection",
            summary: "Click an element to see its tree",
            description: "Click an element in the preview to see its place in the element tree and its properties.",
            url: "/companion/features.html#element-selection",
          },
          {
            label: "Content Searching",
            summary: "Find text in the generated document",
            description: "Search for text in the generated document and jump to every page where it appears.",
            url: "/companion/features.html#content-searching",
          },
          {
            label: "Go to Implementation",
            summary: "Jump from element to the C# line",
            description: "Jump from an element in the preview to the line of C# that produced it.",
            url: "/companion/features.html#go-to-implementation",
          }
        ]
      },
      {
        icon: "fa-regular fa-circle-exclamation",
        name: "Runtime Exception Analysis",
        summary: "Stack traces with source context",
        description: "View detailed exception messages, stack traces, and source code context when errors occur during document generation.",
        link: "/companion/features.html#runtime-exceptions"
      },
      {
        icon: "fa-regular fa-bug",
        name: "Layout Issue Debugging",
        summary: "Color-coded diagnosis of layout failures",
        description: "Diagnose layout problems with color-coded status indicators. Identify root causes with intelligent heuristics.",
        link: "/companion/features.html#layout-issue-debugging"
      }
    ]
  }
];
</script>

<style>

/* Background
   The same continuous canvas as the homepage (see HomePage.vue): the grain tile over soft colour
   washes, painted on <body> so the page, the strip under the navbar and the footer share it.
   The page is long, so the washes are spread along it: a sky-blue glow top right and a violet glow
   top left behind the header, like the hero, then a cyan wash on the left and a tall blue glow on
   the right along the chapters, and an indigo wash on the left further down. None sit in the last
   stretch, so the footer stays calm. */

body:has(.custom-page.features-page) {
  background-color: var(--vp-c-bg);
  background-image:
      url("/homepage/grain.png"),
      radial-gradient(ellipse 1400px 700px at 92% 0%, color-mix(in srgb, #2196F3 22%, transparent), transparent 70%),
      radial-gradient(ellipse 800px 450px at 0% 2%, color-mix(in srgb, #5C6BC0 13%, transparent), transparent 70%),
      radial-gradient(ellipse 900px 900px at 0% 30%, color-mix(in srgb, #26C6DA 8%, transparent), transparent 70%),
      radial-gradient(ellipse 600px 1600px at 100% 50%, color-mix(in srgb, #1E88E5 10%, transparent), transparent 70%),
      radial-gradient(ellipse 1200px 800px at 0% 72%, color-mix(in srgb, #3F51B5 8%, transparent), transparent 70%);
  background-size: 256px 256px, auto, auto, auto, auto, auto;
  background-repeat: repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;
}

html.dark body:has(.custom-page.features-page) {
  background-image:
      url("/homepage/grain.png"),
      radial-gradient(ellipse 1400px 700px at 92% 0%, color-mix(in srgb, #2196F3 24%, transparent), transparent 70%),
      radial-gradient(ellipse 800px 450px at 0% 2%, color-mix(in srgb, #5C6BC0 12%, transparent), transparent 70%),
      radial-gradient(ellipse 900px 900px at 0% 30%, color-mix(in srgb, #26A69A 11%, transparent), transparent 70%),
      radial-gradient(ellipse 600px 1600px at 100% 50%, color-mix(in srgb, #1E88E5 14%, transparent), transparent 70%),
      radial-gradient(ellipse 1200px 800px at 0% 72%, color-mix(in srgb, #3F51B5 12%, transparent), transparent 70%);
}

</style>

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


/* Category: translucent panel (see .textured-page in CustomPages.css) with a heading and a list of feature rows */

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
}

.category-header h2 {
  margin: 0;
  font-size: 1.75rem;
  line-height: 2.25rem;
  color: #2196F3;
}

.category-description {
  margin: 8px 0 0;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.feature-list {
  margin: 0;
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


/* Feature row: icon, name, short line; the whole row is the link */

.feature-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  padding: 6px 12px;
  border-radius: 12px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.feature-row.linked:hover,
.feature-row.linked:focus-visible {
  background-color: var(--home-surface-inner);
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
  background-color: var(--home-surface-inner);
  transition: color 0.2s ease, background-color 0.2s ease;
}

.feature-row.linked:hover .feature-icon {
  color: #2196F3;
  background-color: #2196F322;
}

.feature-name {
  flex-shrink: 0;
  font-size: 0.9375rem;
  line-height: 1.5rem;
  font-weight: 600;
  transition: color 0.2s ease;
}

.feature-row.linked:hover .feature-name {
  color: #2196F3;
}

.feature-summary {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.feature-arrow {
  flex-shrink: 0;
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.feature-row:hover .feature-arrow,
.feature-row:focus-visible .feature-arrow {
  opacity: 1;
}


/* Child row: a sub-page of the feature above, hung on a tree line instead of carrying an icon */

.feature-row.child {
  min-height: 36px;
  padding-left: 52px;
}

.feature-row.child .feature-name {
  font-size: 0.875rem;
  font-weight: 500;
}

.feature-row.child .feature-summary {
  font-size: 0.8125rem;
}

.feature-row.child::before,
.feature-row.child::after {
  content: "";
  position: absolute;
  left: 27px;
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


/* Phones: the short line wraps under the name, the hover arrow goes */

@media screen and (max-width: 700px) {
  .feature-row {
    flex-wrap: wrap;
    row-gap: 0;
    padding: 8px 12px;
  }

  .feature-summary {
    width: 100%;
    padding-left: 44px;
    white-space: normal;
  }

  .feature-row.child {
    padding-left: 40px;
  }

  .feature-row.child .feature-summary {
    padding-left: 0;
  }

  .feature-row.child::before,
  .feature-row.child::after {
    left: 20px;
  }

  .feature-arrow {
    display: none;
  }
}


/* Tooltip with the full description */

.feature-tip {
  position: fixed;
  z-index: 100;
  width: 420px;
  max-width: calc(100vw - 32px);
  padding: 12px 16px;
  border-radius: 12px;
  background-color: var(--vp-c-bg-elv);
  box-shadow: var(--home-surface-edge, none), var(--elevation-hover);
  font-size: 0.9375rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
  pointer-events: none;
}


/* Full descriptions stay in the document for assistive technology, find-in-page and search engines */

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

</style>
