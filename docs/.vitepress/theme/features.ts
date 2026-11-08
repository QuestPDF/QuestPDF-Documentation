/* The Features Overview page (FeaturesOverview.vue). Chapter and category names use the documentation's own terms;
   feature names say what a reader gets, not what the API calls it. */

import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import {
  faAlignJustify, faArrowRightArrowLeft, faArrowsFromLine, faArrowsMaximize, faArrowsUpDownLeftRight, faBarsStaggered,
  faBezierCurve, faBold, faBookFont, faBookmark, faBorderAll, faBorderOuter, faBracketsCurly, faBringFront, faBrush,
  faBug, faChartMixed, faCircle1, faCircleExclamation, faCompress, faCrop, faCrosshairs, faCubes, faDiagramSubtask,
  faDistributeSpacingVertical, faDownLeftAndUpRightToCenter, faDroplet, faEllipsis, faExpand, faEye, faFeather, faFile,
  faFileCode, faFileExport, faFileSvg, faFileZipper, faFillDrip, faFont, faFontCase, faForwardStep, faFunction,
  faGlobe, faHashtag, faHighlighter, faHorizontalRule, faHyphen, faIdCard, faImage, faImages, faIndent, faInfinity,
  faItalic, faKerning, faLanguage, faLayerGroup, faLeftRight, faLineHeight, faLink, faLinkSimple, faList, faListOl,
  faListTree, faLocationCrosshairs, faLocationDot, faLock, faMagnifyingGlass, faMagnifyingGlassPlus, faMapLocationDot,
  faMerge, faMountainSun, faNewspaper, faObjectGroup, faObjectsAlignCenterHorizontal, faPageBreak, faPaintbrush,
  faPalette, faPaperclip, faParagraph, faPuzzlePiece, faQrcode, faRectangleHistory, faReflectHorizontal, faRepeat,
  faRotate, faRuler, faRulerCombined, faRulerVertical, faScissors, faSitemap, faSliders, faSplit, faSquareDashed,
  faSquareDashedCirclePlus, faSquareQuestion, faSquareRing, faStamp, faStop, faSubscript, faSuperscript, faSwap,
  faSwatchbook, faTable, faTableCellsHeader, faTableCellsMerge, faTableColumns, faTableRows, faTags, faText,
  faTextHeight, faTextSize, faTextWidth, faToggleOn, faUnderline, faUniversalAccess, faUnlock, faUpDown,
  faUpRightAndDownLeftFromCenter, faVectorSquare, faWandMagicSparkles
} from "@fortawesome/pro-regular-svg-icons";
import {
  faCode as faMenuCodeOrganization, faFileExport as faMenuDocumentGeneration, faFiles as faMenuDocumentOperations,
  faImage as faMenuVisualContent, faScrewdriverWrench as faMenuDevelopmentTools, faTableLayout as faMenuLayout
} from "@fortawesome/pro-light-svg-icons";
import { faDropShadow, faRoundedCorners } from "./customIcons";

export interface Feature {
  name: string;
  description: string;
  icon: IconDefinition;
  link: string;
}

export interface FeatureCategory {
  name: string;
  features: Feature[];
}

/* the rail of the Features Overview: chapters fold open to their categories, a section stands on its own */
export interface FeatureChapter {
  name: string;
  icon: IconDefinition;
  categories: FeatureCategory[];
}

export interface FeatureSection extends FeatureCategory {
  icon: IconDefinition;
}

export type FeatureMenuEntry = FeatureChapter | FeatureSection;

export const featureMenu: FeatureMenuEntry[] = [
  {
    name: "Development tools",
    icon: faMenuDevelopmentTools,
    categories: [
      {
        name: "Companion App",
        features: [
          {
            name: "Live preview",
            description: "Download, install, and integrate the Companion App with your project. Enjoy real-time hot-reload preview.",
            icon: faEye,
            link: "/companion/usage.html"
          },
          {
            name: "Magnifier",
            description: "Zoom into any part of the page at pixel level. Inspect fine details without zooming and panning the whole preview.",
            icon: faMagnifyingGlassPlus,
            link: "/companion/features.html#magnifier"
          },
          {
            name: "Coordinate picker",
            description: "Read the exact position of any point or element on the page. Verify placement against your layout intent.",
            icon: faLocationCrosshairs,
            link: "/companion/features.html#coordinate-picker"
          },
          {
            name: "Size measurement",
            description: "Measure the width and height of visual elements, and the distance between them. Check spacing and alignment with precision.",
            icon: faRulerCombined,
            link: "/companion/features.html#size-measurement"
          },
          {
            name: "Element inspection",
            description: "Browse the document hierarchy and select any element. Review its configuration, position, size and every page it appears on.",
            icon: faListTree,
            link: "/companion/features.html#element-selection"
          },
          {
            name: "Content search",
            description: "Search the document for a phrase. Matches are highlighted in both the structure tree and the preview.",
            icon: faMagnifyingGlass,
            link: "/companion/features.html#content-searching"
          },
          {
            name: "Jump to source code",
            description: "Ctrl-click any area of the preview to open the code that produced it in your IDE.",
            icon: faFileCode,
            link: "/companion/features.html#go-to-implementation"
          }
        ]
      },
      {
        name: "Debugging",
        features: [
          {
            name: "Exception analysis",
            description: "View detailed exception messages, stack traces, and source code context when errors occur during document generation.",
            icon: faCircleExclamation,
            link: "/companion/features.html#runtime-exceptions"
          },
          {
            name: "Layout debugging",
            description: "Diagnose layout problems with color-coded status indicators. Identify root causes with intelligent heuristics.",
            icon: faBug,
            link: "/companion/features.html#layout-issue-debugging"
          },
          {
            name: "Debug outlines",
            description: "Colored border and label overlay showing element boundaries. Visual debugging during development.",
            icon: faVectorSquare,
            link: "/api-reference/debug-area.html"
          },
          {
            name: "Debug pointers",
            description: "Named marker appearing in layout exception messages. Identifies problematic elements in error diagnostics.",
            icon: faLocationDot,
            link: "/api-reference/debug-pointer.html"
          }
        ]
      }
    ]
  },
  {
    name: "Code organization",
    icon: faMenuCodeOrganization,
    categories: [
      {
        name: "Code patterns",
        features: [
          {
            name: "Execution order",
            description: "Fluent API calls apply in the order they are chained. Learn how the order shapes the visual result.",
            icon: faListOl,
            link: "/concepts/code-patterns/execution-order.html"
          },
          {
            name: "Document structure",
            description: "Keep each document in one class and split its sections into well-named private methods. Modular code that stays readable as documents grow.",
            icon: faSitemap,
            link: "/concepts/code-patterns/document-structure.html"
          },
          {
            name: "Local helpers",
            description: "Encapsulate repeated layout logic in C# local functions, right where it is used. Clean code without single-use class members.",
            icon: faFunction,
            link: "/concepts/code-patterns/local-helpers.html"
          },
          {
            name: "Reusable styles",
            description: "Define shared styling once as a function and apply it to many elements. Consistent appearance with less repetition.",
            icon: faBrush,
            link: "/concepts/code-patterns/content-styling.html"
          },
          {
            name: "Extension methods",
            description: "Turn recurring styling and content patterns into extension methods. Reuse them across every document in your codebase.",
            icon: faBracketsCurly,
            link: "/concepts/code-patterns/extension-methods.html"
          }
        ]
      },
      {
        name: "Components",
        features: [
          {
            name: "Components",
            description: "Build modular, reusable document blocks for cleaner architecture. Encapsulate layout patterns and maintain consistency across your entire codebase.",
            icon: faPuzzlePiece,
            link: "/concepts/code-patterns/components.html"
          },
          {
            name: "Dynamic components",
            description: "Components rendered separately on every page, with access to the page number, total page count and available space. Build progress bars or alternating layouts.",
            icon: faCubes,
            link: "/concepts/code-patterns/dynamic-components.html"
          },
          {
            name: "Capture positions",
            description: "Record where content lands on each page, then place other elements relative to it. Annotations, callouts and connectors.",
            icon: faCrosshairs,
            link: "/concepts/code-patterns/capture-content-position.html"
          }
        ]
      },
      {
        name: "Prototyping",
        features: [
          {
            name: "Placeholder text",
            description: "Generate lorem ipsum, labels, sentences, names, emails, dates, numbers and more. Fill layouts before real data is available.",
            icon: faWandMagicSparkles,
            link: "/concepts/prototyping.html#text"
          },
          {
            name: "Placeholder colours",
            description: "Random colors drawn from the Material Design palette. Tell nested containers apart while prototyping.",
            icon: faSwatchbook,
            link: "/concepts/prototyping.html#colors"
          },
          {
            name: "Placeholder images",
            description: "Soft gradient images generated on demand. Test image placement, sizing and alignment before real assets arrive.",
            icon: faMountainSun,
            link: "/concepts/prototyping.html#image"
          },
          {
            name: "Placeholder boxes",
            description: "Gray rectangle with diagonal lines and optional label. Visualizes reserved space during layout prototyping.",
            icon: faSquareDashed,
            link: "/api-reference/placeholder.html"
          }
        ]
      }
    ]
  },
  {
    name: "Layout",
    icon: faMenuLayout,
    categories: [
      {
        name: "Page setup",
        features: [
          {
            name: "Pages",
            description: "Document foundation with size, margins, orientation, headers, footers, and watermarks. Continuous or paged content modes.",
            icon: faFile,
            link: "/api-reference/page/basics.html"
          },
          {
            name: "Headers and footers",
            description: "Header, content and footer slots, plus full-page background and foreground layers for watermarks and letterhead.",
            icon: faDistributeSpacingVertical,
            link: "/api-reference/page/slots.html"
          },
          {
            name: "Page size and margins",
            description: "Exact, continuous or flexible page sizes, standard presets with orientation, page color and per-side margins.",
            icon: faRuler,
            link: "/api-reference/page/settings.html"
          }
        ]
      },
      {
        name: "Tables",
        features: [
          {
            name: "Tables",
            description: "Grid layout with rows and columns. Cell spanning, repeating headers/footers, auto-pagination, and precise cell styling.",
            icon: faTable,
            link: "/api-reference/table/basics.html"
          },
          {
            name: "Table cell styles",
            description: "A structured pattern for styling cells consistently. Backgrounds, padding and text styles defined once and reused.",
            icon: faBorderAll,
            link: "/api-reference/table/cell-style-pattern.html"
          },
          {
            name: "Table headers and footers",
            description: "Dedicated header and footer rows repeated on every page the table spans. Readers keep the context on long tables.",
            icon: faTableCellsHeader,
            link: "/api-reference/table/header-and-footer.html"
          },
          {
            name: "Overlapping table cells",
            description: "Place cells over one another and span them across rows and columns. Build complex structures with dynamic styling.",
            icon: faTableCellsMerge,
            link: "/api-reference/table/overlapping-cells.html"
          }
        ]
      },
      {
        name: "Layout containers",
        features: [
          {
            name: "Columns",
            description: "Vertical stacking of children with configurable spacing. Automatic pagination ensures content flows seamlessly across pages.",
            icon: faTableRows,
            link: "/api-reference/column.html"
          },
          {
            name: "Rows",
            description: "Horizontal arrangement with flexible sizing options. Combine proportional, fixed, and auto-width items with configurable spacing.",
            icon: faTableColumns,
            link: "/api-reference/row.html"
          },
          {
            name: "Lists",
            description: "Ordered (numbered) and unordered (bulleted) lists. Custom markers, nested levels, and automatic numbering.",
            icon: faList,
            link: "/api-reference/lists.html"
          },
          {
            name: "Layers",
            description: "Stacked content planes for backgrounds, main content, and foreground overlays. Watermarks and letterhead effects.",
            icon: faLayerGroup,
            link: "/api-reference/layers.html"
          },
          {
            name: "Stacking order",
            description: "Stacking order for overlapping elements in Layers. Higher values render in front of lower values.",
            icon: faBringFront,
            link: "/api-reference/zindex.html"
          },
          {
            name: "Inline wrapping",
            description: "Inline flow layout with automatic line wrapping. Elements arranged like words in a paragraph.",
            icon: faBarsStaggered,
            link: "/api-reference/inlined.html"
          },
          {
            name: "Multi-column text",
            description: "Newspaper-style columns where content flows from one column to the next, continuing across pages.",
            icon: faNewspaper,
            link: "/api-reference/multi-column.html"
          }
        ]
      },
      {
        name: "Size and spacing",
        features: [
          {
            name: "Width",
            description: "Horizontal size constraints: exact, minimum, and maximum values. Relative (percentage) or absolute units.",
            icon: faLeftRight,
            link: "/api-reference/width.html"
          },
          {
            name: "Height",
            description: "Vertical size constraints: exact, minimum, and maximum values. Relative (percentage) or absolute units.",
            icon: faUpDown,
            link: "/api-reference/height.html"
          },
          {
            name: "Padding",
            description: "Add breathing room around content with uniform or per-side spacing. Supports all length units for precise layout control.",
            icon: faSquareRing,
            link: "/api-reference/padding.html"
          },
          {
            name: "Alignment",
            description: "Positions child within available space: center, top, bottom, left, right, and corner combinations.",
            icon: faObjectsAlignCenterHorizontal,
            link: "/api-reference/alignment.html"
          },
          {
            name: "Aspect ratio",
            description: "Maintains width-to-height proportion. Child content scales or clips to fit the constrained area.",
            icon: faCrop,
            link: "/api-reference/aspect-ratio.html"
          },
          {
            name: "Fill available space",
            description: "Expands child to fill all available space horizontally, vertically, or both directions.",
            icon: faUpRightAndDownLeftFromCenter,
            link: "/api-reference/extend.html"
          },
          {
            name: "Shrink to content",
            description: "Reduces child to minimum required size. Prevents stretching when parent offers excess space.",
            icon: faDownLeftAndUpRightToCenter,
            link: "/api-reference/shrink.html"
          },
          {
            name: "Unconstrained size",
            description: "Removes parent size limits, giving children infinite available space. Reveals natural content size.",
            icon: faInfinity,
            link: "/api-reference/unconstrained.html"
          },
          {
            name: "Length units",
            description: "Use points (default), inches, centimeters, millimeters, meters, or feet. Specify units directly in API methods for intuitive sizing.",
            icon: faRulerVertical,
            link: "/concepts/length-unit-types.html"
          }
        ]
      },
      {
        name: "Transformations",
        features: [
          {
            name: "Rotation",
            description: "Rotation by 90° increments or arbitrary angles. Content spins around its center point.",
            icon: faRotate,
            link: "/api-reference/rotate.html"
          },
          {
            name: "Scaling",
            description: "Proportional resizing (larger or smaller). Uniform or independent horizontal/vertical factors.",
            icon: faExpand,
            link: "/api-reference/scale.html"
          },
          {
            name: "Scale to fit",
            description: "Automatic scaling to fit available space. Preserves aspect ratio while maximizing size.",
            icon: faCompress,
            link: "/api-reference/scale-to-fit.html"
          },
          {
            name: "Flip and mirror",
            description: "Mirrors content horizontally, vertically, or both axes. Creates reflection effects.",
            icon: faReflectHorizontal,
            link: "/api-reference/flip.html"
          },
          {
            name: "Offset",
            description: "Shifts content position without affecting layout flow. Creates overlapping or offset effects.",
            icon: faArrowsUpDownLeftRight,
            link: "/api-reference/offset.html"
          }
        ]
      },
      {
        name: "Content flow",
        features: [
          {
            name: "Page breaks",
            description: "Forces subsequent content to begin on a new page. Immediate page transition.",
            icon: faPageBreak,
            link: "/api-reference/page-break.html"
          },
          {
            name: "Avoid page breaks",
            description: "Keeps child content together on a single page. Moves entire block to next page if needed.",
            icon: faLinkSimple,
            link: "/api-reference/prevent-page-break.html"
          },
          {
            name: "Reserve space",
            description: "Requires minimum vertical space before rendering. Jumps to next page if threshold not met.",
            icon: faArrowsFromLine,
            link: "/api-reference/ensure-space.html"
          },
          {
            name: "Keep together",
            description: "Displays element fully on one page or skips to next page. No partial rendering or breaking.",
            icon: faObjectGroup,
            link: "/api-reference/show-entire.html"
          },
          {
            name: "Repeating headers",
            description: "Persistent header and footer areas that repeat on every page. Main content flows between them with pagination.",
            icon: faRectangleHistory,
            link: "/api-reference/decoration.html"
          },
          {
            name: "Repeat on every page",
            description: "Duplicates content on every page of a multi-page section. Repeating decorations and patterns.",
            icon: faRepeat,
            link: "/api-reference/repeat.html"
          },
          {
            name: "Conditional content",
            description: "Conditional rendering based on boolean logic. Content appears or disappears based on runtime conditions.",
            icon: faToggleOn,
            link: "/api-reference/show-if.html"
          },
          {
            name: "Show on first page only",
            description: "Renders content only on its first page occurrence. Hidden on subsequent pages of the same element.",
            icon: faCircle1,
            link: "/api-reference/show-once.html"
          },
          {
            name: "Skip the first page",
            description: "Hides content on first page, visible on all subsequent pages. Inverse of Show Once.",
            icon: faForwardStep,
            link: "/api-reference/skip-once.html"
          },
          {
            name: "Truncate overflow",
            description: "Prevents content from continuing to additional pages. Overflow content is truncated.",
            icon: faStop,
            link: "/api-reference/stop-paging.html"
          }
        ]
      }
    ]
  },
  {
    name: "Visual content",
    icon: faMenuVisualContent,
    categories: [
      {
        name: "Text basics",
        features: [
          {
            name: "Rich text",
            description: "Rich text rendering with multiple formatting options. Automatic wrapping and seamless pagination across pages.",
            icon: faText,
            link: "/api-reference/text/basics.html"
          },
          {
            name: "Page numbers",
            description: "Current page, total page count, and page numbers relative to a named section. Custom formats such as Roman numerals.",
            icon: faHashtag,
            link: "/api-reference/text/page-numbers.html"
          },
          {
            name: "Elements inside text",
            description: "Inject images, SVG icons or other elements into a line of text. Positioned relative to the baseline or font edges.",
            icon: faSquareDashedCirclePlus,
            link: "/api-reference/text/injecting-custom-content.html"
          },
          {
            name: "Default text style",
            description: "Inherited text formatting (font, size, color) applied to all descendant text elements.",
            icon: faTextSize,
            link: "/api-reference/default-text-style.html"
          },
          {
            name: "Style inheritance",
            description: "Styles cascade from the document down to every text element unless overridden. Consistent typography with less repeated code.",
            icon: faDiagramSubtask,
            link: "/api-reference/text/style-inheritance.html"
          }
        ]
      },
      {
        name: "Text style",
        features: [
          {
            name: "Font size",
            description: "Sets how large the characters appear. Any size in points or other length units.",
            icon: faTextHeight,
            link: "/api-reference/text/text-style.html#font-size"
          },
          {
            name: "Font family",
            description: "Choose the typeface for any run of text. Use the bundled Lato font, your own files, or system fonts.",
            icon: faFont,
            link: "/api-reference/text/text-style.html#font-family"
          },
          {
            name: "Font colour",
            description: "Color of the characters and, by default, of their decorations. HEX values, alpha channel and the Material palette.",
            icon: faDroplet,
            link: "/api-reference/text/text-style.html#font-color"
          },
          {
            name: "Highlight",
            description: "Solid background color behind a run of text. Adds contrast and emphasis to key phrases.",
            icon: faHighlighter,
            link: "/api-reference/text/text-style.html#background-color"
          },
          {
            name: "Font weight",
            description: "Thickness of the characters from thin to black. Build visual hierarchy within a single font family.",
            icon: faBold,
            link: "/api-reference/text/text-style.html#font-weight"
          },
          {
            name: "Italic",
            description: "Slanted letterforms for emphasis or to distinguish specific words and phrases.",
            icon: faItalic,
            link: "/api-reference/text/text-style.html#italic"
          },
          {
            name: "Underline and strikethrough",
            description: "Decorative lines under, through or over text. Configurable color, thickness and style, such as wavy or dotted.",
            icon: faUnderline,
            link: "/api-reference/text/text-style.html#decorations"
          },
          {
            name: "Subscript",
            description: "Text slightly below the baseline in a smaller size. Chemical formulas and mathematical notation.",
            icon: faSubscript,
            link: "/api-reference/text/text-style.html#subscript"
          },
          {
            name: "Superscript",
            description: "Text slightly above the baseline in a smaller size. Exponents, footnote marks and ordinal indicators.",
            icon: faSuperscript,
            link: "/api-reference/text/text-style.html#superscript"
          },
          {
            name: "Line height",
            description: "Vertical spacing between lines, proportional to the text size. Tune readability and text density.",
            icon: faLineHeight,
            link: "/api-reference/text/text-style.html#line-height"
          },
          {
            name: "Letter spacing",
            description: "Horizontal spacing between characters, proportional to the text size. Tracking for headings and labels.",
            icon: faKerning,
            link: "/api-reference/text/text-style.html#letter-spacing"
          },
          {
            name: "Word spacing",
            description: "Horizontal spacing between words, proportional to the text size. Loosen or tighten a paragraph's rhythm.",
            icon: faTextWidth,
            link: "/api-reference/text/text-style.html#word-spacing"
          },
          {
            name: "Hyphenation",
            description: "Words break at soft hyphen characters and render a hyphen at the break. Works with any hyphenation library that inserts them.",
            icon: faHyphen,
            link: "/api-reference/text/text-style.html#hyphenation"
          },
          {
            name: "OpenType features",
            description: "Enable typographic features such as ligatures, kerning, small caps or old-style numerals, where the font supports them.",
            icon: faFontCase,
            link: "/api-reference/text/text-style.html#font-features"
          },
          {
            name: "Break long words",
            description: "Allow a line to break between any two characters. Fits long URLs, identifiers and hashes into narrow columns.",
            icon: faSplit,
            link: "/api-reference/text/text-style.html#break-anywhere"
          }
        ]
      },
      {
        name: "Paragraph style",
        features: [
          {
            name: "Alignment and justification",
            description: "Left, center, right, start, end and justified text. Position each paragraph within its container.",
            icon: faAlignJustify,
            link: "/api-reference/text/paragraph-style.html#text-alignment"
          },
          {
            name: "Paragraph spacing",
            description: "Vertical gap between successive paragraphs. Separate blocks of text without empty lines.",
            icon: faParagraph,
            link: "/api-reference/text/paragraph-style.html#paragraph-spacing"
          },
          {
            name: "First-line indent",
            description: "Horizontal offset of the first line in each paragraph. The classic way to mark paragraph starts.",
            icon: faIndent,
            link: "/api-reference/text/paragraph-style.html#first-line-indentation"
          },
          {
            name: "Line clamping",
            description: "Limit the number of visible lines and end the text with a customizable ellipsis. Keeps cards and table cells tidy.",
            icon: faEllipsis,
            link: "/api-reference/text/paragraph-style.html#clamp-line-with-ellipsis"
          }
        ]
      },
      {
        name: "Fonts and languages",
        features: [
          {
            name: "Custom fonts",
            description: "Font files deployed with your application are registered automatically. Load more from files, streams or embedded resources.",
            icon: faBookFont,
            link: "/api-reference/text/font-management.html"
          },
          {
            name: "Font fallback",
            description: "A list of alternative fonts used when the primary font lacks a glyph. Mixed scripts and emoji render correctly.",
            icon: faSwap,
            link: "/api-reference/text/text-style.html#font-fallback"
          },
          {
            name: "Additional languages",
            description: "Chinese, Japanese, Korean, Arabic, Hebrew, Thai and more by deploying the free Google Noto fonts with your application.",
            icon: faLanguage,
            link: "/api-reference/text/font-management.html#covering-additional-languages"
          },
          {
            name: "Right-to-left text",
            description: "Left-to-right (LTR) or right-to-left (RTL) layout direction. Full RTL language and bidirectional text support.",
            icon: faArrowRightArrowLeft,
            link: "/api-reference/content-direction.html"
          },
          {
            name: "Missing glyph detection",
            description: "A clear exception names the missing font families or glyphs and the fonts involved. Catch incomplete deployments before documents ship.",
            icon: faSquareQuestion,
            link: "/api-reference/text/font-management.html#missing-text-glyphs"
          }
        ]
      },
      {
        name: "Styling",
        features: [
          {
            name: "Backgrounds",
            description: "Solid color or linear gradient behind any element. Section bands, highlighted cells and card surfaces.",
            icon: faFillDrip,
            link: "/api-reference/background.html"
          },
          {
            name: "Borders",
            description: "Borders on all sides or selected ones. Configurable thickness, solid or gradient color, and alignment to the edge.",
            icon: faBorderOuter,
            link: "/api-reference/border.html"
          },
          {
            name: "Rounded corners",
            description: "Round all corners or each one individually. Softer edges on containers, images and table cells.",
            icon: faRoundedCorners,
            link: "/api-reference/rounded-corners.html"
          },
          {
            name: "Shadows",
            description: "Drop shadows with configurable offset, blur, spread and color. Lift cards and callouts off the page.",
            icon: faDropShadow,
            link: "/api-reference/shadow.html"
          },
          {
            name: "Colour palette",
            description: "Full Google Material Design color palette included. HEX, alpha channel, and shorthand formats supported with convenient color helpers.",
            icon: faPalette,
            link: "/concepts/colors.html"
          }
        ]
      },
      {
        name: "Images",
        features: [
          {
            name: "Images",
            description: "Raster images (PNG, JPEG, WebP) from files, streams or byte arrays. Automatic aspect ratio with several scaling modes.",
            icon: faImage,
            link: "/api-reference/image/basics.html"
          },
          {
            name: "SVG",
            description: "Scalable vector graphics placed like any image. Text inside uses the document's fonts, and preloading avoids repeated parsing.",
            icon: faFileSvg,
            link: "/api-reference/image/svg.html"
          },
          {
            name: "Image compression",
            description: "Control JPEG quality and target DPI per image or for the whole document. Balance file size against visual fidelity.",
            icon: faFileZipper,
            link: "/api-reference/image/optimization.html"
          },
          {
            name: "Shared images",
            description: "Load an image once and reuse it everywhere. Faster generation and smaller files when the same image repeats.",
            icon: faImages,
            link: "/api-reference/image/shared.html"
          },
          {
            name: "Images sized by layout",
            description: "Generate the image only once the available space is known. Sharp maps and charts at exactly the right resolution.",
            icon: faArrowsMaximize,
            link: "/api-reference/image/dynamic.html"
          }
        ]
      },
      {
        name: "Graphics",
        features: [
          {
            name: "Charts",
            description: "Integration with charting libraries (ScottPlot, LiveCharts, Microcharts). Bar, line, pie, area charts as vector graphics.",
            icon: faChartMixed,
            link: "/api-reference/charts.html"
          },
          {
            name: "Barcodes and QR codes",
            description: "Generate 1D barcodes and 2D QR codes. Integration guide with popular third-party libraries.",
            icon: faQrcode,
            link: "/api-reference/barcodes.html"
          },
          {
            name: "Maps",
            description: "Embed static maps in your documents. Integration tutorial using Mapbox services.",
            icon: faMapLocationDot,
            link: "/api-reference/maps.html"
          },
          {
            name: "Vector graphics",
            description: "Canvas-style drawing API for paths, shapes, bezier curves, and custom vector graphics. Fill and stroke operations.",
            icon: faBezierCurve,
            link: "/api-reference/complex-graphics.html"
          },
          {
            name: "SkiaSharp canvas",
            description: "Direct SkiaSharp canvas access for shaders, gradients, image filters, blend modes, and advanced 2D graphics.",
            icon: faPaintbrush,
            link: "/api-reference/skiasharp-integration.html"
          },
          {
            name: "Separator lines",
            description: "Horizontal or vertical lines with configurable thickness and color. Useful as visual separators and dividers.",
            icon: faHorizontalRule,
            link: "/api-reference/line.html"
          }
        ]
      }
    ]
  },
  {
    name: "Document generation",
    icon: faMenuDocumentGeneration,
    features: [
      {
        name: "Output formats",
        description: "Generate PDF, SVG, or raster images (PNG, JPEG, WEBP). Save to file, stream, or byte array for flexible integration.",
        icon: faFileExport,
        link: "/concepts/generating-output.html"
      },
      {
        name: "Document metadata",
        description: "Set PDF properties like title, author, subject, keywords, and timestamps. Improve document organization and searchability.",
        icon: faIdCard,
        link: "/concepts/document-metadata.html"
      },
      {
        name: "Document settings",
        description: "Configure PDF/A archival and PDF/UA accessibility compliance. Control compression, image quality, DPI, and content direction.",
        icon: faSliders,
        link: "/concepts/document-settings.html"
      },
      {
        name: "Accessibility",
        description: "Generate inclusive PDFs with PDF/UA compliance and tagged content. Enable screen reader support with proper semantic structure for all users.",
        icon: faUniversalAccess,
        link: "/concepts/accessibility.html"
      },
      {
        name: "Hyperlinks",
        description: "Create interactive clickable areas linking to URLs, email addresses, or phone numbers. Seamless integration with PDF reader capabilities.",
        icon: faLink,
        link: "/api-reference/hyperlink.html"
      },
      {
        name: "Named sections",
        description: "Define named regions for navigation and location-aware page numbering. Build table of contents and cross-references with ease.",
        icon: faBookmark,
        link: "/api-reference/section.html"
      },
      {
        name: "Lazy generation",
        description: "Optimize memory for large documents with deferred content generation. Ideal for data-intensive reports and enterprise-scale document processing.",
        icon: faFeather,
        link: "/api-reference/lazy.html"
      }
    ]
  },
  {
    name: "Document operations",
    icon: faMenuDocumentOperations,
    features: [
      {
        name: "Merge documents",
        description: "Combine multiple PDF files into a single document. Merge entire documents or select specific pages from each source with full control.",
        icon: faMerge,
        link: "/concepts/document-operations.html#merging-documents"
      },
      {
        name: "Extract pages",
        description: "Select specific pages using flexible range syntax. Extract, reorder, reverse, or filter pages with powerful selection patterns.",
        icon: faScissors,
        link: "/concepts/document-operations.html#page-selection"
      },
      {
        name: "Overlays and watermarks",
        description: "Apply watermarks, headers, footers, or letterhead by layering PDF content. Configure which pages receive overlays with precise control.",
        icon: faStamp,
        link: "/concepts/document-operations.html#overlays-and-underlays"
      },
      {
        name: "Encryption",
        description: "Secure PDFs with 40-bit, 128-bit, or 256-bit encryption. Set user/owner passwords and control permissions for printing, copying, and editing.",
        icon: faLock,
        link: "/concepts/document-operations.html#document-encryption"
      },
      {
        name: "Decryption",
        description: "Remove encryption and security restrictions from password-protected PDFs. Access content for further processing or distribution.",
        icon: faUnlock,
        link: "/concepts/document-operations.html#document-decryption"
      },
      {
        name: "Linearization",
        description: "Optimize PDFs for web delivery. Linearized files allow viewers to display content before the entire file downloads, improving user experience.",
        icon: faGlobe,
        link: "/concepts/document-operations.html#document-linearization"
      },
      {
        name: "Attachments",
        description: "Embed files directly within PDFs with full PDF/A compliance. Support for all embedded file relationships.",
        icon: faPaperclip,
        link: "/concepts/document-operations.html#file-attachments"
      },
      {
        name: "XMP metadata",
        description: "Add custom XMP metadata to PDF/A documents. Essential for industry standards like ZUGFeRD invoices and other compliance requirements.",
        icon: faTags,
        link: "/concepts/document-operations.html#xmp-metadata-extension"
      }
    ]
  }
];
