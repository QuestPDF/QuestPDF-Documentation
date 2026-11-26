/* The Features overview: the library's features as a tree, written by hand. Areas and their groups follow the
   documentation menu; inside a group stand the features themselves, and under a feature the options it has.
   A note is a few words, only where the name alone does not say what the feature does or holds.
   Keywords are never shown, the filter finds the feature by them: API names as the documentation spells them,
   synonyms, values. They belong to the feature they describe, not to the group above it, because a match shows
   everything under it. Plurals, hyphens and British spellings need no keyword (featureSearch.ts).
   No feature holds a single item, and no two features under one parent share a name. */

import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import {
  faCode, faFileLines, faImage, faLayerGroup, faLink, faPageBreak, faRulerCombined, faTableLayout, faTextSize,
  faUniversalAccess
} from "@fortawesome/pro-regular-svg-icons";

export interface FeatureNode {
  name: string;
  note?: string;
  keywords?: string;
  /* a documentation page, or a chapter of one: "/api-reference/row#spacing" */
  link?: string;
  items?: FeatureNode[];
}

export interface FeatureArea extends FeatureNode {
  icon: IconDefinition;
  items: FeatureNode[];
}

const operations = "/concepts/document-operations";
const accessibility = "/concepts/accessibility";
const output = "/concepts/generating-output";
const settings = "/concepts/document-settings";
const dynamicComponents = "/concepts/code-patterns/dynamic-components";
const pageSettings = "/api-reference/page/settings";
const textStyle = "/api-reference/text/text-style";
const paragraphStyle = "/api-reference/text/paragraph-style";
const fonts = "/api-reference/text/font-management";

export const featureTree: FeatureArea[] = [
  {
    name: "PDF operations",
    keywords: "DocumentOperation existing PDF files edit modify manipulate post-process",
    icon: faLayerGroup,
    items: [
      {
        name: "Loading documents",
        keywords: "LoadFile open read import input password protected",
        link: `${operations}#loading-documents`
      },
      {
        name: "Page selection",
        note: "extract, remove or reorder pages",
        keywords: "TakePages split subset delete keep page range format last page from the end even odd reverse order exclude",
        link: `${operations}#page-selection`
      },
      {
        name: "Linearization",
        note: "fast web view",
        keywords: "Linearize web-optimized streaming progressive loading display before download",
        link: `${operations}#document-linearization`
      },
      {
        name: "Merging",
        note: "existing PDF files",
        keywords: "MergeFile combine join concatenate append several multiple selected pages",
        link: `${operations}#merging-documents`
      },
      {
        name: "Overlays and underlays",
        note: "watermarks, letterhead, stamps",
        keywords: "OverlayFile LayerConfiguration TargetPages SourcePages RepeatSourcePages watermark stamp stationery background foreground template every page",
        link: `${operations}#overlays-and-underlays`
      },
      {
        name: "Encryption",
        keywords: "Encrypt password protect protection secure security lock",
        link: `${operations}#document-encryption`,
        items: [
          {
            name: "User and owner passwords",
            keywords: "UserPassword OwnerPassword open restrict access",
            link: `${operations}#base-encryption-settings`
          },
          {
            name: "40-bit, 128-bit and 256-bit keys",
            keywords: "Encryption40Bit Encryption128Bit Encryption256Bit AES strength",
            link: `${operations}#encryption-types-and-permissions`
          },
          {
            name: "Permissions",
            note: "printing, copying, editing, form filling",
            keywords: "AllowPrinting AllowContentExtraction AllowModification AllowAnnotation AllowAssembly AllowFillingForms EncryptMetadata print copy edit annotate restrict",
            link: `${operations}#encryption-types-and-permissions`
          }
        ]
      },
      {
        name: "Decryption",
        keywords: "Decrypt RemoveRestrictions unlock unprotect remove password restrictions signed",
        link: `${operations}#document-decryption`
      },
      {
        name: "File attachments",
        keywords: "AddAttachment DocumentAttachment embed embedded attach",
        link: `${operations}#file-attachments`,
        items: [
          {
            name: "Name, description, MIME type and dates",
            keywords: "Key FilePath AttachmentName MimeType CreationDate ModificationDate Replace",
            link: `${operations}#file-attachments`
          },
          {
            name: "Attachment relationships",
            note: "data, source, alternative, supplement",
            keywords: "Relationship DocumentAttachmentRelationship Unspecified",
            link: `${operations}#attachment-relationships`
          },
          {
            name: "PDF/A-3b compliant attachments",
            keywords: "archival PDF/A-3 embedded XML invoice",
            link: `${operations}#pdf-a-3b-compliant-attachment`
          }
        ]
      },
      {
        name: "XMP metadata",
        note: "custom XML metadata",
        keywords: "ExtendMetadata RDF rdf:Description properties",
        link: `${operations}#xmp-metadata-extension`
      },
      {
        name: "Combining operations",
        keywords: "multiple several steps chain pipeline fluent Save advanced example",
        link: `${operations}#combining-multiple-operations`
      },
      {
        name: "ZUGFeRD / Factur-X",
        note: "electronic invoices",
        keywords: "e-invoice e-invoicing hybrid XML CII Cross Industry Invoice Germany France Mustang PDF/A-3b",
        link: "/examples/zugferd"
      }
    ]
  },
  {
    name: "Development",
    icon: faCode,
    items: [
      {
        name: "Code patterns",
        keywords: "best practices conventions maintainable",
        items: [
          {
            name: "Execution order",
            note: "the order of chained calls changes the result",
            keywords: "fluent API method chaining sequence",
            link: "/concepts/code-patterns/execution-order"
          },
          {
            name: "Document structure",
            note: "one class, a method per section",
            keywords: "organize private methods Element readable modular",
            link: "/concepts/code-patterns/document-structure"
          },
          {
            name: "Local helpers",
            note: "local functions for repeated fragments",
            keywords: "lambda reuse duplicate DRY",
            link: "/concepts/code-patterns/local-helpers"
          },
          {
            name: "Content styling",
            note: "styles kept in reusable functions",
            keywords: "Element IContainer shared consistent DRY",
            link: "/concepts/code-patterns/content-styling"
          },
          {
            name: "Extension methods",
            note: "your own Fluent API methods",
            keywords: "custom static class reuse across documents",
            link: "/concepts/code-patterns/extension-methods"
          }
        ]
      },
      {
        name: "Components",
        note: "reusable building blocks",
        keywords: "IComponent Component Compose EmptyContainer encapsulate class module widget slots",
        link: "/concepts/code-patterns/components",
        items: [
          {
            name: "Dynamic components",
            note: "content composed separately for each page",
            keywords: "IDynamicComponent DynamicContext DynamicComponentComposeResult CreateElement HasMoreContent AvailableSize PageNumber TotalPages State per page",
            link: dynamicComponents,
            items: [
              {
                name: "Page numbers on alternating sides",
                keywords: "odd even left right book duplex",
                link: `${dynamicComponents}#alternating-side-of-page-numbers`
              },
              {
                name: "Progress bar",
                keywords: "reading indicator progressbar",
                link: `${dynamicComponents}#progressbar`
              },
              {
                name: "Table with per-page subtotals",
                keywords: "subtotal sum running total carried forward paging algorithm",
                link: `${dynamicComponents}#table-with-per-page-subtotals`
              }
            ]
          },
          {
            name: "Capture content position",
            note: "place content relative to other content",
            keywords: "CaptureContentPosition GetContentCapturedPositions coordinates location size bounding box annotation",
            link: "/concepts/code-patterns/capture-content-position"
          }
        ]
      },
      {
        name: "Dynamic composition",
        keywords: "data-driven runtime",
        items: [
          {
            name: "Mixed content blocks",
            note: "headings, paragraphs and images in any order",
            keywords: "polymorphic pattern matching switch CMS rich content quotes block types",
            link: "/concepts/dynamic-composition/mixed-content-blocks"
          },
          {
            name: "Conditional formatting",
            keywords: "highlight threshold rules color-code negative values red green value-based depends on data",
            link: "/concepts/dynamic-composition/conditional-formatting"
          },
          {
            name: "Configurable tables",
            note: "columns chosen at runtime",
            keywords: "dynamic columns configuration report builder user-defined JSON generic export",
            link: "/concepts/dynamic-composition/configurable-tables"
          },
          {
            name: "Nested content",
            note: "trees of any depth",
            keywords: "recursion recursive hierarchy tree categories organization structure bill of materials indentation",
            link: "/concepts/dynamic-composition/nested-content"
          }
        ]
      },
      {
        name: "Prototyping",
        keywords: "prototype mock sample fake dummy test data",
        items: [
          {
            name: "Placeholder text",
            note: "lorem ipsum, names, emails, dates, numbers",
            keywords: "Placeholders LoremIpsum Label Sentence Question Paragraph Paragraphs Email Name PhoneNumber WebpageUrl Time ShortDate LongDate DateTime Integer Decimal Percent Price random",
            link: "/concepts/prototyping#text"
          },
          {
            name: "Placeholder colors",
            keywords: "Placeholders Color BackgroundColor random Material Design",
            link: "/concepts/prototyping#colors"
          },
          {
            name: "Placeholder images",
            keywords: "Placeholders Image random picture gradient",
            link: "/concepts/prototyping#image"
          },
          {
            name: "Placeholder element",
            note: "box that stands in for unfinished content",
            keywords: "wireframe mockup gray label icon",
            link: "/api-reference/placeholder"
          }
        ]
      },
      {
        name: "Debugging",
        keywords: "troubleshoot diagnose",
        items: [
          {
            name: "Debug area",
            note: "labeled outline around content",
            keywords: "DebugArea box",
            link: "/api-reference/debug-area"
          },
          {
            name: "Debug pointer",
            note: "named marker shown in layout errors",
            keywords: "DebugPointer hierarchy element trace",
            link: "/api-reference/debug-pointer"
          },
          {
            name: "Layout error messages",
            note: "point to the element that does not fit",
            keywords: "DocumentLayoutException exception infinite layout overflow conflicting size constraints",
            link: `${output}#layout-errors`
          },
          {
            name: "Companion App",
            note: "live preview, hot reload, layout inspection",
            keywords: "ShowInCompanion previewer hot-reload watch inspect hierarchy magnifier measure coordinates search go to implementation runtime exceptions",
            link: "/companion/usage"
          }
        ]
      }
    ]
  },
  {
    name: "Generation",
    keywords: "generate",
    icon: faFileLines,
    items: [
      {
        name: "Output formats",
        keywords: "export save render",
        link: output,
        items: [
          {
            name: "PDF",
            note: "file, stream or byte array",
            keywords: "GeneratePdf GeneratePdfAndShow",
            link: `${output}#generating-pdf-files`
          },
          {
            name: "SVG",
            note: "one file per page",
            keywords: "GenerateSvg vector",
            link: `${output}#generating-svg-files`
          },
          {
            name: "Images",
            note: "PNG, JPEG or WebP, one per page",
            keywords: "GenerateImages ImageGenerationSettings ImageFormat ImageCompressionQuality RasterDpi UseTransparentBackground raster bitmap thumbnail preview picture resolution",
            link: `${output}#generating-images`
          }
        ]
      },
      {
        name: "ASP.NET integration",
        note: "PDF returned from a controller endpoint",
        keywords: "ASP.NET Core web API MVC HTTP response File download browser",
        link: "/examples/aspnet-integration#generating-pdf-files-in-controller-endpoints"
      },
      {
        name: "Settings",
        keywords: "DocumentSettings WithSettings configuration options",
        link: settings,
        items: [
          {
            name: "PDF/A conformance",
            note: "long-term archival",
            keywords: "PDFA_Conformance PDFA_3B PDFA_3A PDF/A-2 PDF/A-3 archive",
            link: settings
          },
          {
            name: "PDF/UA conformance",
            note: "universal accessibility",
            keywords: "PDFUA_Conformance PDFUA_1 PDF/UA-1",
            link: settings
          },
          { name: "Document compression", keywords: "CompressDocument smaller file size reduce", link: settings },
          { name: "Image compression quality", keywords: "ImageCompressionQuality JPEG file size", link: settings },
          { name: "Image resolution (DPI)", keywords: "ImageRasterDpi raster dots per inch", link: settings },
          {
            name: "Content direction",
            keywords: "ContentDirection LeftToRight RightToLeft RTL LTR default",
            link: settings
          }
        ]
      },
      {
        name: "Metadata",
        note: "title, author, keywords, dates",
        keywords: "DocumentMetadata WithMetadata Subject Creator Producer Language CreationDate ModifiedDate document properties info",
        link: "/concepts/document-metadata"
      },
      {
        name: "Content direction",
        note: "right-to-left layouts",
        keywords: "ContentFromRightToLeft ContentFromLeftToRight RTL LTR Arabic Hebrew bidirectional bidi mirrored",
        link: "/api-reference/content-direction"
      },
      {
        name: "Merging documents",
        note: "several generated documents in one file",
        keywords: "Merge combine join concatenate",
        link: "/concepts/merging-documents",
        items: [
          {
            name: "Original page numbers",
            keywords: "UseOriginalPageNumbers restart numbering separate each document",
            link: "/concepts/merging-documents#original-page-numbers"
          },
          {
            name: "Continuous page numbers",
            keywords: "UseContinuousPageNumbers continue numbering consecutive one sequence",
            link: "/concepts/merging-documents#continuous-page-numbers"
          }
        ]
      },
      {
        name: "Lazy",
        note: "less memory for very large documents",
        keywords: "LazyWithCache cache deferred performance big thousands of pages garbage collection out of memory",
        link: "/api-reference/lazy"
      }
    ]
  },
  {
    name: "Layout",
    icon: faTableLayout,
    items: [
      {
        name: "Page",
        keywords: "document template",
        link: "/api-reference/page/basics",
        items: [
          {
            name: "Header, content and footer",
            keywords: "slots page areas",
            link: "/api-reference/page/slots#main-slots"
          },
          {
            name: "Background and foreground",
            note: "watermarks and letterhead on every page",
            keywords: "stamp stationery draft confidential behind in front full page",
            link: "/api-reference/page/slots#foreground-slot"
          },
          {
            name: "First-page header",
            keywords: "title page cover different custom footer ShowOnce SkipOnce",
            link: "/examples/custom-header-on-first-page"
          },
          {
            name: "Page size",
            keywords: "dimensions format paper",
            link: `${pageSettings}#page-size`,
            items: [
              {
                name: "Standard sizes and orientation",
                note: "A4, Letter, portrait or landscape",
                keywords: "PageSizes A3 A5 A7 Legal predefined ISO",
                link: `${pageSettings}#predefined-page-size`
              },
              {
                name: "Custom size",
                keywords: "exact width height points millimetres inches",
                link: `${pageSettings}#specific-page-size`
              },
              {
                name: "Continuous",
                note: "one page as long as its content",
                keywords: "ContinuousSize receipt ticket scroll endless unlimited height",
                link: `${pageSettings}#continuous-page-size`
              },
              {
                name: "Flexible",
                note: "between a minimum and a maximum",
                keywords: "MinSize MaxSize range grows with content",
                link: `${pageSettings}#flexible-page-size`
              }
            ]
          },
          {
            name: "Margins",
            keywords: "Margin MarginVertical MarginHorizontal MarginTop MarginBottom MarginLeft MarginRight",
            link: `${pageSettings}#margin`
          },
          { name: "Page color", keywords: "PageColor background paper", link: `${pageSettings}#page-color` },
          {
            name: "Default text style",
            keywords: "DefaultTextStyle font size whole page",
            link: `${pageSettings}#default-text-style`
          },
          {
            name: "Several page settings in one document",
            note: "mixed sizes, orientations and margins",
            keywords: "multiple different landscape in portrait page set",
            link: `${pageSettings}#documents-with-multiple-page-settings`
          }
        ]
      },
      {
        name: "Table",
        keywords: "Cell grid rows columns tabular data",
        link: "/api-reference/table/basics",
        items: [
          {
            name: "Constant and relative columns",
            note: "fixed or proportional widths",
            keywords: "ColumnsDefinition ConstantColumn RelativeColumn column width",
            link: "/api-reference/table/basics#columns-definition"
          },
          {
            name: "Row and column spans",
            note: "merged cells",
            keywords: "RowSpan ColumnSpan merge colspan rowspan",
            link: "/api-reference/table/basics#manual-cell-placement"
          },
          {
            name: "Manual cell placement",
            keywords: "explicit position row column index",
            link: "/api-reference/table/basics#manual-cell-placement"
          },
          {
            name: "Header and footer",
            note: "repeated on every page",
            keywords: "repeat table heading multi-page",
            link: "/api-reference/table/header-and-footer"
          },
          {
            name: "Cell style pattern",
            note: "one style shared by many cells",
            keywords: "Element reusable DRY",
            link: "/api-reference/table/cell-style-pattern"
          },
          {
            name: "Overlapping cells",
            keywords: "overlap same place on top calendar schedule timetable",
            link: "/api-reference/table/overlapping-cells"
          }
        ]
      },
      {
        name: "Containers",
        items: [
          {
            name: "Column",
            note: "items stacked vertically",
            keywords: "vertical stack Item",
            link: "/api-reference/column",
            items: [
              { name: "Spacing", keywords: "gap distance between items", link: "/api-reference/column#spacing" },
              {
                name: "Uniform item width",
                note: "every item as wide as the widest",
                keywords: "ShrinkHorizontal same equal",
                link: "/api-reference/column#uniform-item-width"
              }
            ]
          },
          {
            name: "Row",
            note: "items side by side",
            keywords: "horizontal Item columns two-column",
            link: "/api-reference/row",
            items: [
              {
                name: "Constant, relative and auto items",
                note: "fixed, proportional or content-sized",
                keywords: "ConstantItem RelativeItem AutoItem width",
                link: "/api-reference/row#item-types"
              },
              { name: "Spacing", keywords: "gap distance between items", link: "/api-reference/row#spacing" },
              {
                name: "Uniform item height",
                note: "every item as tall as the tallest",
                keywords: "ShrinkVertical same equal",
                link: "/api-reference/row#uniform-item-height"
              }
            ]
          },
          {
            name: "Inlined",
            note: "items in a line that wraps",
            keywords: "wrap flow tags chips badges flexbox flex-wrap",
            link: "/api-reference/inlined",
            items: [
              {
                name: "Spacing",
                keywords: "VerticalSpacing HorizontalSpacing gap distance",
                link: "/api-reference/inlined#spacing"
              },
              {
                name: "Horizontal alignment",
                keywords: "AlignLeft AlignCenter AlignRight AlignJustify AlignSpaceAround",
                link: "/api-reference/inlined#horizontal-alignment"
              },
              {
                name: "Baseline alignment",
                keywords: "BaselineTop BaselineMiddle BaselineBottom vertical",
                link: "/api-reference/inlined#baseline-alignment"
              }
            ]
          },
          {
            name: "Multi-column",
            note: "content flowing from column to column",
            keywords: "MultiColumn Columns newspaper magazine",
            link: "/api-reference/multi-column",
            items: [
              {
                name: "Spacer between columns",
                keywords: "divider separator line gap",
                link: "/api-reference/multi-column#spacer"
              },
              {
                name: "Balanced column height",
                keywords: "BalanceHeight equal even",
                link: "/api-reference/multi-column#balance-height"
              }
            ]
          },
          {
            name: "Lists",
            keywords: "enumeration items",
            link: "/api-reference/lists",
            items: [
              {
                name: "Bullet lists",
                keywords: "unordered bulleted points dots",
                link: "/api-reference/lists#unordered-list"
              },
              {
                name: "Numbered lists",
                keywords: "ordered numbers 1. 2. 3.",
                link: "/api-reference/lists#ordered-list"
              },
              {
                name: "Nested lists",
                keywords: "sub-list multi-level indent hierarchy",
                link: "/api-reference/lists#nested-lists"
              }
            ]
          },
          {
            name: "Decoration",
            note: "header and footer that repeat with the content",
            keywords: "Before After repeating caption section title",
            link: "/api-reference/decoration"
          },
          {
            name: "Layers",
            note: "content under or over other content",
            keywords: "Layer PrimaryLayer overlay underlay watermark stack background foreground",
            link: "/api-reference/layers"
          },
          {
            name: "Z-index",
            note: "which content is drawn on top",
            keywords: "ZIndex drawing order overlap above below stacking",
            link: "/api-reference/zindex"
          }
        ]
      }
    ]
  },
  {
    name: "Size & position",
    icon: faRulerCombined,
    items: [
      {
        name: "Size",
        keywords: "dimensions constraints",
        items: [
          {
            name: "Width",
            note: "exact, minimum or maximum",
            keywords: "MinWidth MaxWidth horizontal",
            link: "/api-reference/width"
          },
          {
            name: "Height",
            note: "exact, minimum or maximum",
            keywords: "MinHeight MaxHeight vertical",
            link: "/api-reference/height"
          },
          {
            name: "Aspect ratio",
            keywords: "AspectRatio AspectRatioOption FitWidth FitHeight FitArea proportion 16:9 4:3 square",
            link: "/api-reference/aspect-ratio"
          },
          {
            name: "Extend",
            note: "fill the available space",
            keywords: "ExtendHorizontal ExtendVertical stretch expand grow full width full height",
            link: "/api-reference/extend"
          },
          {
            name: "Shrink",
            note: "take only the space needed",
            keywords: "ShrinkHorizontal ShrinkVertical compact minimal fit content",
            link: "/api-reference/shrink"
          },
          {
            name: "Unconstrained",
            note: "content beyond its parent's limits",
            keywords: "overflow float absolute outside overlap",
            link: "/api-reference/unconstrained"
          },
          {
            name: "Length units",
            note: "points, millimeters, inches and more",
            keywords: "Unit Point Inch Feet Mil Meter Centimetre Millimetre mm cm pt",
            link: "/concepts/length-unit-types"
          }
        ]
      },
      {
        name: "Position",
        keywords: "placement",
        items: [
          {
            name: "Padding",
            keywords: "PaddingVertical PaddingHorizontal PaddingTop PaddingBottom PaddingLeft PaddingRight spacing inset margin negative",
            link: "/api-reference/padding"
          },
          {
            name: "Alignment",
            keywords: "AlignLeft AlignCenter AlignRight AlignTop AlignMiddle AlignBottom horizontal vertical",
            link: "/api-reference/alignment"
          },
          {
            name: "Offset",
            note: "shift content without changing the layout",
            keywords: "OffsetX OffsetY translate move nudge",
            link: "/api-reference/offset"
          }
        ]
      },
      {
        name: "Transformations",
        keywords: "transform",
        items: [
          {
            name: "Rotate",
            keywords: "rotation turn angle",
            link: "/api-reference/rotate",
            items: [
              {
                name: "In 90° steps",
                keywords: "RotateLayoutClockwise RotateLayoutCounterclockwise constrained quarter turn sideways vertical text",
                link: "/api-reference/rotate#constrained"
              },
              { name: "By any angle", keywords: "free arbitrary degrees tilt", link: "/api-reference/rotate#free" }
            ]
          },
          {
            name: "Scale",
            keywords: "ScaleHorizontal ScaleVertical zoom resize enlarge reduce stretch",
            link: "/api-reference/scale"
          },
          {
            name: "Scale to fit",
            note: "shrink content until it fits",
            keywords: "ScaleToFit auto-size autofit",
            link: "/api-reference/scale-to-fit"
          },
          {
            name: "Flip",
            keywords: "FlipHorizontal FlipVertical FlipOver mirror reflect",
            link: "/api-reference/flip"
          }
        ]
      }
    ]
  },
  {
    name: "Content flow",
    keywords: "pagination paging",
    icon: faPageBreak,
    items: [
      {
        name: "Page breaks",
        items: [
          { name: "Page break", keywords: "PageBreak new page next page force", link: "/api-reference/page-break" },
          {
            name: "Prevent page break",
            note: "moved to the next page rather than split",
            keywords: "PreventPageBreak keep together orphan widow",
            link: "/api-reference/prevent-page-break"
          },
          {
            name: "Ensure space",
            note: "next page unless a minimum height is free",
            keywords: "EnsureSpace keep with next orphan heading",
            link: "/api-reference/ensure-space"
          },
          {
            name: "Show entire",
            note: "never split across pages",
            keywords: "ShowEntire keep together unbreakable whole",
            link: "/api-reference/show-entire"
          },
          {
            name: "Stop paging",
            note: "first page only, the rest is cut off",
            keywords: "StopPaging truncate clip overflow",
            link: "/api-reference/stop-paging"
          }
        ]
      },
      {
        name: "Visibility",
        keywords: "show hide",
        items: [
          {
            name: "Repeat",
            note: "shown again on every page",
            keywords: "repeated repeating",
            link: "/api-reference/repeat"
          },
          {
            name: "Show once",
            note: "on the first page only",
            keywords: "ShowOnce",
            link: "/api-reference/show-once"
          },
          {
            name: "Skip once",
            note: "on every page but the first",
            keywords: "SkipOnce from the second page",
            link: "/api-reference/skip-once"
          },
          {
            name: "Show if",
            note: "only under a condition",
            keywords: "ShowIf conditional optional",
            link: "/api-reference/show-if"
          }
        ]
      }
    ]
  },
  {
    name: "Text",
    keywords: "typography",
    icon: faTextSize,
    items: [
      {
        name: "Content",
        link: "/api-reference/text/basics",
        items: [
          {
            name: "Rich text formatting",
            keywords: "Span inline mixed several styles",
            link: "/api-reference/text/basics#rich-text-formatting"
          },
          {
            name: "Typography pattern",
            note: "named, reusable text styles",
            keywords: "TextStyle Style static class presets heading",
            link: "/api-reference/text/basics#typography-pattern"
          },
          {
            name: "Hyperlinks in text",
            keywords: "Hyperlink link url web clickable",
            link: "/api-reference/text/basics#hyperlinks"
          },
          {
            name: "Page numbers",
            keywords: "pagination numbering",
            link: "/api-reference/text/page-numbers",
            items: [
              {
                name: "Current page and total pages",
                keywords: "CurrentPageNumber TotalPages page X of Y count",
                link: "/api-reference/text/page-numbers#document-related"
              },
              {
                name: "Pages of a section",
                note: "first, last and number of pages",
                keywords: "BeginPageNumberOfSection EndPageNumberOfSection PageNumberWithinSection TotalPagesWithinSection chapter table of contents",
                link: "/api-reference/text/page-numbers#section-related"
              },
              {
                name: "Custom formats",
                note: "Roman numerals, leading zeros",
                keywords: "Format letters",
                link: "/api-reference/text/page-numbers#custom-formatting"
              }
            ]
          },
          {
            name: "Elements inside text",
            keywords: "Element inline inject embed injecting custom content icon",
            link: "/api-reference/text/injecting-custom-content",
            items: [
              {
                name: "Images",
                keywords: "picture",
                link: "/api-reference/text/injecting-custom-content#image"
              },
              { name: "SVG", keywords: "vector", link: "/api-reference/text/injecting-custom-content#svg" },
              {
                name: "Vertical position",
                keywords: "TextInjectedElementAlignment AboveBaseline BelowBaseline Top Middle Bottom baseline align",
                link: "/api-reference/text/injecting-custom-content#position"
              }
            ]
          }
        ]
      },
      {
        name: "Style",
        items: [
          {
            name: "Text style",
            keywords: "TextStyle character formatting",
            link: textStyle,
            items: [
              { name: "Font size", keywords: "FontSize points pt bigger smaller", link: `${textStyle}#font-size` },
              {
                name: "Font family",
                keywords: "FontFamily typeface Arial Helvetica Times",
                link: `${textStyle}#font-family`
              },
              {
                name: "Font fallback",
                note: "other fonts for missing characters",
                keywords: "FontFamily emoji mixed scripts glyphs",
                link: `${textStyle}#font-fallback`
              },
              { name: "Font color", keywords: "FontColor text foreground", link: `${textStyle}#font-color` },
              {
                name: "Background color",
                keywords: "BackgroundColor highlight marker",
                link: `${textStyle}#background-color`
              },
              {
                name: "Font weight",
                note: "thin to extra black",
                keywords: "ExtraLight Light NormalWeight Medium SemiBold Bold ExtraBold ExtraBlack heavy regular",
                link: `${textStyle}#font-weight`
              },
              { name: "Italic", keywords: "oblique slanted emphasis", link: `${textStyle}#italic` },
              {
                name: "Underline, strikethrough, overline",
                note: "solid, double, wavy, dotted or dashed",
                keywords: "decoration DecorationSolid DecorationDouble DecorationWavy DecorationDotted DecorationDashed DecorationColor DecorationThickness crossed out",
                link: `${textStyle}#decorations`
              },
              { name: "Subscript", keywords: "lower index chemical formula", link: `${textStyle}#subscript` },
              {
                name: "Superscript",
                keywords: "upper index exponent power footnote ordinal",
                link: `${textStyle}#superscript`
              },
              { name: "Line height", keywords: "LineHeight leading line spacing", link: `${textStyle}#line-height` },
              {
                name: "Letter spacing",
                keywords: "LetterSpacing tracking kerning character spacing",
                link: `${textStyle}#letter-spacing`
              },
              { name: "Word spacing", keywords: "WordSpacing space between words", link: `${textStyle}#word-spacing` },
              {
                name: "Hyphenation",
                note: "at soft hyphens",
                keywords: "hyphenate hyphen U+00AD syllables word break",
                link: `${textStyle}#hyphenation`
              },
              {
                name: "OpenType features",
                note: "ligatures, kerning and more",
                keywords: "font features EnableFontFeature DisableFontFeature FontFeatures StandardLigatures liga kern",
                link: `${textStyle}#font-features`
              },
              {
                name: "Break anywhere",
                note: "line breaks between any two characters",
                keywords: "BreakAnywhere long word hash identifier wrap",
                link: `${textStyle}#break-anywhere`
              }
            ]
          },
          {
            name: "Paragraph style",
            link: paragraphStyle,
            items: [
              {
                name: "Alignment and justification",
                keywords: "AlignLeft AlignCenter AlignRight AlignStart AlignEnd Justify justified text-align",
                link: `${paragraphStyle}#text-alignment`
              },
              {
                name: "Paragraph spacing",
                keywords: "ParagraphSpacing gap between paragraphs",
                link: `${paragraphStyle}#paragraph-spacing`
              },
              {
                name: "First-line indentation",
                keywords: "ParagraphFirstLineIndentation indent",
                link: `${paragraphStyle}#first-line-indentation`
              },
              {
                name: "Line clamping",
                note: "limit the lines, end with an ellipsis",
                keywords: "ClampLines truncate max lines",
                link: `${paragraphStyle}#clamp-line-with-ellipsis`
              }
            ]
          },
          {
            name: "Style inheritance",
            keywords: "DefaultTextStyle cascade inherit parent override nested",
            link: "/api-reference/text/style-inheritance"
          },
          {
            name: "Default text style",
            note: "one text style for everything inside",
            keywords: "DefaultTextStyle TextStyle global shared",
            link: "/api-reference/default-text-style"
          }
        ]
      },
      {
        name: "Font management",
        keywords: "FontManager typeface",
        link: fonts,
        items: [
          {
            name: "Default font",
            note: "Lato: Latin, Greek and Cyrillic",
            keywords: "bundled built-in included",
            link: `${fonts}#library-default-font`
          },
          {
            name: "Automatic font registration",
            note: "font files deployed with the application",
            keywords: "FontDiscoveryPath ttf otf output directory folder CopyToOutputDirectory",
            link: `${fonts}#automatic-local-font-registration`
          },
          {
            name: "Manual font registration",
            note: "from a file, folder, stream or embedded resource",
            keywords: "RegisterFontFromFile RegisterFontsFromDirectory RegisterFontFromStream RegisterFontFromBinaryData RegisterFontFromEmbeddedResource custom font ttf otf",
            link: `${fonts}#manual-font-registration`
          },
          {
            name: "System fonts",
            keywords: "UseSystemFonts installed operating system Windows Linux macOS Docker container Alpine",
            link: `${fonts}#system-font-registration`
          },
          {
            name: "List of available fonts",
            keywords: "GetRegisteredFonts GetSystemFonts FontInfo inspect",
            link: `${fonts}#inspecting-available-fonts`
          },
          {
            name: "Additional languages",
            note: "Chinese, Japanese, Korean, Arabic, emoji",
            keywords: "CJK Hebrew Thai Noto unicode international non-Latin scripts",
            link: `${fonts}#covering-additional-languages`
          },
          {
            name: "Missing font detection",
            keywords: "ThrowOnMissingFontFamilies DocumentDrawingException font not found unavailable",
            link: `${fonts}#missing-font-families`
          },
          {
            name: "Missing glyph detection",
            keywords: "ThrowOnMissingTextGlyphs DocumentDrawingException missing characters squares tofu",
            link: `${fonts}#missing-text-glyphs`
          }
        ]
      }
    ]
  },
  {
    name: "Visual",
    icon: faImage,
    items: [
      {
        name: "Styling",
        keywords: "appearance",
        items: [
          {
            name: "Background",
            link: "/api-reference/background",
            items: [
              { name: "Solid color", keywords: "fill", link: "/api-reference/background#solid-color" },
              {
                name: "Linear gradient",
                keywords: "BackgroundLinearGradient angle",
                link: "/api-reference/background#gradient"
              }
            ]
          },
          {
            name: "Border",
            keywords: "frame stroke",
            link: "/api-reference/border",
            items: [
              {
                name: "Thickness of each side",
                keywords: "BorderLeft BorderTop BorderRight BorderBottom BorderVertical BorderHorizontal width",
                link: "/api-reference/border#thickness"
              },
              { name: "Solid color", keywords: "BorderColor", link: "/api-reference/border#solid-color" },
              { name: "Linear gradient", keywords: "BorderLinearGradient", link: "/api-reference/border#gradient" },
              {
                name: "Alignment",
                note: "inside, middle or outside",
                keywords: "BorderAlignmentInside BorderAlignmentMiddle BorderAlignmentOutside",
                link: "/api-reference/border#alignment"
              },
              {
                name: "Multiple borders",
                keywords: "Container double nested several",
                link: "/api-reference/border#multiple-borders"
              }
            ]
          },
          {
            name: "Rounded corners",
            keywords: "CornerRadius CornerRadiusTopLeft CornerRadiusTopRight CornerRadiusBottomLeft CornerRadiusBottomRight radius round pill circle image each corner",
            link: "/api-reference/rounded-corners"
          },
          {
            name: "Shadow",
            keywords: "BoxShadowStyle drop box-shadow elevation",
            link: "/api-reference/shadow",
            items: [
              { name: "Blur", keywords: "soft", link: "/api-reference/shadow#blur" },
              { name: "Spread", keywords: "size grow", link: "/api-reference/shadow#spread" },
              {
                name: "Offset",
                keywords: "OffsetX OffsetY distance direction",
                link: "/api-reference/shadow#offset-x"
              },
              { name: "Color", keywords: "transparency", link: "/api-reference/shadow#color" }
            ]
          },
          {
            name: "Colors",
            keywords: "palette",
            link: "/concepts/colors",
            items: [
              {
                name: "HEX colors with transparency",
                keywords: "#RRGGBB #AARRGGBB alpha opacity RGB ARGB shorthand",
                link: "/concepts/colors#hex-colors"
              },
              {
                name: "Material Design palette",
                keywords: "Lighten Darken Accent Medium Google predefined named",
                link: "/concepts/colors#material-design-colors"
              }
            ]
          }
        ]
      },
      {
        name: "Images",
        items: [
          {
            name: "Image",
            note: "JPEG, PNG, BMP, WebP",
            keywords: "picture photo logo JPG stream byte array",
            link: "/api-reference/image/basics",
            items: [
              {
                name: "Scaling and fitting",
                keywords: "FitWidth FitHeight FitArea FitUnproportionally stretch",
                link: "/api-reference/image/basics#image-scaling"
              },
              {
                name: "Size limit",
                keywords: "Width Height maximum constrain physical size",
                link: "/api-reference/image/basics#limiting-image-size"
              }
            ]
          },
          {
            name: "SVG",
            keywords: "SvgImage vector graphics icon scalable logo",
            link: "/api-reference/image/svg",
            items: [
              {
                name: "Preloading",
                note: "parsed once, used many times",
                keywords: "FromFile reuse cache",
                link: "/api-reference/image/svg#preloading"
              },
              { name: "Fonts in SVG", keywords: "text font-family", link: "/api-reference/image/svg#font-support" }
            ]
          },
          {
            name: "Optimization",
            keywords: "optimize smaller file size performance",
            link: "/api-reference/image/optimization",
            items: [
              {
                name: "Compression quality",
                keywords: "WithCompressionQuality ImageCompressionQuality JPEG Best VeryHigh High Medium Low VeryLow",
                link: "/api-reference/image/optimization#image-compression"
              },
              {
                name: "Resolution (DPI)",
                keywords: "WithRasterDpi dots per inch",
                link: "/api-reference/image/optimization#image-dpi"
              },
              {
                name: "Document-wide settings",
                keywords: "ImageCompressionQuality ImageRasterDpi DocumentSettings global default",
                link: "/api-reference/image/optimization#global-settings"
              },
              {
                name: "Original image, unprocessed",
                keywords: "UseOriginalImage no compression lossless raw",
                link: "/api-reference/image/optimization#using-original-image"
              }
            ]
          },
          {
            name: "Shared images",
            note: "one image reused across the document",
            keywords: "FromFile reuse cache logo file size",
            link: "/api-reference/image/shared"
          },
          {
            name: "Dynamic-size images",
            note: "generated for the space available",
            keywords: "ImageSize resolution runtime function",
            link: "/api-reference/image/dynamic"
          }
        ]
      },
      {
        name: "Graphics",
        items: [
          {
            name: "Line",
            keywords: "divider separator rule",
            link: "/api-reference/line",
            items: [
              {
                name: "Vertical and horizontal",
                keywords: "LineVertical LineHorizontal",
                link: "/api-reference/line#vertical"
              },
              { name: "Thickness", keywords: "width stroke", link: "/api-reference/line#thickness" },
              { name: "Solid color", keywords: "LineColor", link: "/api-reference/line#solid-color" },
              { name: "Linear gradient", keywords: "LineGradient", link: "/api-reference/line#gradient" },
              {
                name: "Dash pattern",
                keywords: "LineDashPattern dashed dotted",
                link: "/api-reference/line#dash-pattern"
              }
            ]
          },
          {
            name: "Charts",
            note: "with ScottPlot",
            keywords: "graph plot pie bar diagram data visualization",
            link: "/api-reference/charts"
          },
          {
            name: "Barcodes and QR codes",
            note: "with ZXing.Net",
            keywords: "EAN-8 EAN-13 UPC Code 39 Code 93 Code 128 Codabar ITF Data Matrix Aztec PDF 417 MaxiCode 1D 2D scan",
            link: "/api-reference/barcodes"
          },
          {
            name: "Maps",
            note: "with Mapbox",
            keywords: "static map geography location",
            link: "/api-reference/maps"
          },
          {
            name: "Complex graphics",
            note: "custom shapes drawn as SVG",
            keywords: "Svg drawing dotted leader line rounded rectangle gradient vector",
            link: "/api-reference/complex-graphics"
          },
          {
            name: "SkiaSharp integration",
            note: "custom drawing on a canvas",
            keywords: "Skia SKCanvas",
            link: "/api-reference/skiasharp-integration",
            items: [
              {
                name: "Vector canvas",
                keywords: "SkiaSharpSvgCanvas SVG",
                link: "/api-reference/skiasharp-integration#svg"
              },
              {
                name: "Rasterized canvas",
                note: "effects that SVG cannot express",
                keywords: "SkiaSharpRasterizedCanvas bitmap shader blur drop shadow",
                link: "/api-reference/skiasharp-integration#rasterization"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Links",
    icon: faLink,
    items: [
      {
        name: "Hyperlinks",
        note: "links to web pages",
        keywords: "Hyperlink url clickable external",
        link: "/api-reference/hyperlink",
        items: [
          {
            name: "Around any content",
            keywords: "image button clickable area",
            link: "/api-reference/hyperlink#content"
          },
          { name: "Inside text", keywords: "Span", link: "/api-reference/hyperlink#inside-text" }
        ]
      },
      {
        name: "Sections",
        note: "named places in a document",
        keywords: "Section anchor named destination chapter",
        link: "/api-reference/section"
      },
      {
        name: "Links to sections",
        note: "jumps within the document",
        keywords: "SectionLink internal table of contents TOC navigation cross-reference",
        link: "/api-reference/section"
      },
      {
        name: "Document outline",
        note: "bookmarks built from semantic headings",
        keywords: "navigation pane sidebar table of contents SemanticHeading1",
        link: `${accessibility}#headings`
      }
    ]
  },
  {
    name: "Accessibility",
    keywords: "a11y screen readers assistive technology",
    icon: faUniversalAccess,
    items: [
      {
        name: "Standards",
        keywords: "conformance ISO",
        link: accessibility,
        items: [
          {
            name: "Tagged PDF",
            note: "logical structure for screen readers",
            keywords: "tags tree reading order",
            link: `${accessibility}#tagged-pdf`
          },
          {
            name: "PDF/A",
            note: "long-term archival",
            keywords: "archive ISO 19005 PDF/A-2 PDF/A-3 preservation",
            link: `${accessibility}#pdf-a-archival`
          },
          {
            name: "PDF/UA",
            note: "universal accessibility",
            keywords: "ISO 14289 PDF/UA-1 WCAG Section 508 ADA European Accessibility Act EAA",
            link: `${accessibility}#pdf-ua-universal-accessibility`
          }
        ]
      },
      {
        name: "Compliance tools",
        note: "validation of PDF/A and PDF/UA",
        keywords: "validate validator checker verify test",
        link: `${accessibility}#compliance-tools`,
        items: [
          { name: "veraPDF", keywords: "open source command line", link: `${accessibility}#verapdf` },
          {
            name: "PAC",
            note: "PDF Accessibility Checker",
            keywords: "Windows",
            link: `${accessibility}#pac-pdf-accessibility-checker`
          }
        ]
      },
      {
        name: "Minimal example",
        note: "tags, metadata and conformance settings together",
        keywords: "accessible document enable",
        link: `${accessibility}#minimal-example`
      },
      {
        name: "Semantic elements",
        note: "tags that say what the content is",
        keywords: "semantic structure",
        link: `${accessibility}#semantic-elements`,
        items: [
          {
            name: "Document structure",
            note: "sections, articles, divisions",
            keywords: "SemanticSection SemanticArticle SemanticDivision",
            link: `${accessibility}#document-structure`
          },
          {
            name: "Headings",
            note: "six levels, also the document outline",
            keywords: "SemanticHeading1 SemanticHeading2 SemanticHeading3 SemanticHeading4 SemanticHeading5 SemanticHeading6 H1 H2 H3 title bookmarks",
            link: `${accessibility}#headings`
          },
          {
            name: "Text content",
            note: "paragraphs and block quotations",
            keywords: "SemanticParagraph SemanticBlockQuotation quote",
            link: `${accessibility}#text-content`
          },
          {
            name: "Lists",
            keywords: "SemanticList SemanticListItem SemanticListLabel SemanticListItemBody",
            link: `${accessibility}#lists`
          },
          {
            name: "Tables",
            keywords: "SemanticTable SemanticHorizontalHeader header cells row headers",
            link: `${accessibility}#tables`
          },
          {
            name: "Table of contents",
            keywords: "SemanticTableOfContents SemanticTableOfContentsItem SemanticIndex TOC index",
            link: `${accessibility}#table-of-contents`
          },
          {
            name: "Inline elements",
            note: "links, quotes, code, abbreviations",
            keywords: "SemanticLink SemanticSpan SemanticQuote SemanticCode",
            link: `${accessibility}#inline-elements`
          },
          {
            name: "Illustrations and media",
            note: "alternative text, captions, formulas",
            keywords: "SemanticImage SemanticFigure SemanticFormula SemanticCaption alt text description",
            link: `${accessibility}#illustrations-and-media`
          },
          { name: "Language", keywords: "SemanticLanguage locale lang pronunciation", link: `${accessibility}#language` },
          {
            name: "Ignoring content",
            note: "decorative elements",
            keywords: "SemanticIgnore artifact skip",
            link: `${accessibility}#ignoring-content`
          }
        ]
      }
    ]
  }
];
