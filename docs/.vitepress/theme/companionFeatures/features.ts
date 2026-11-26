import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import {
  faArrowPointer,
  faBug,
  faCode,
  faCompass,
  faFileMagnifyingGlass,
  faFolderTree,
  faLink,
  faMagnifyingGlass,
  faRulerCombined,
  faTriangleExclamation
} from "@fortawesome/pro-regular-svg-icons";

/* PROTOTYPE: shared content of the five Features page options (QST-741). Facts come from docs/companion/features.md.
   Every feature names the clip planned for it, so a placeholder says what to record. */

export interface Shortcut {
  /* one combination; a mouse action is a key too, e.g. ["Ctrl", "Click"] */
  keys: string[];
  action: string;
}

export interface Status {
  color: string;
  name: string;
  description: string;
}

export type GroupId = "navigate" | "inspect" | "debug";

export interface Feature {
  id: string;
  group: GroupId;
  title: string;
  icon: IconDefinition;
  /* one line, for lists and tiles */
  summary: string;
  description: string[];
  bullets?: string[];
  shortcuts?: Shortcut[];
  warning?: string;
  statuses?: Status[];
  /* /companion/screenshots/{screenshot}-{light|dark}.webp, the stand-in until the clip exists */
  screenshot?: string;
  /* too obvious for a section of its own, or told in another one: only its shortcuts are listed */
  sheetOnly?: boolean;
  /* what the 5-second clip shows */
  clip: string;
}

export interface Group {
  id: GroupId;
  title: string;
  description: string;
  icon: IconDefinition;
}

export const groups: Group[] = [
  { id: "navigate", title: "Navigate", description: "Find your way around the document, from its structure down to a single phrase.", icon: faCompass },
  { id: "inspect", title: "Inspect and measure", description: "Look at details up close, measure positions and sizes, and go from any element to the code behind it.", icon: faRulerCombined },
  { id: "debug", title: "Debug", description: "See why content does not fit, at the element that causes it.", icon: faBug }
];

/* every feature, with those that only the shortcut sheet lists */
export const allFeatures: Feature[] = [
  {
    id: "hierarchy",
    group: "navigate",
    title: "Document hierarchy",
    icon: faFolderTree,
    summary: "Browse the document as a tree that mirrors your Fluent API code.",
    description: [
      "The left panel shows the document as a tree. Each node is an element of the document, named like the Fluent API call that created it. Some API calls produce a more detailed structure.",
      "Expand and collapse nodes to move through the content, and click a node to select its element."
    ],
    shortcuts: [{ keys: ["Ctrl", "W"], action: "Hide or show the hierarchy" }],
    screenshot: "hierarchy-hidden",
    clip: "Expanding nodes in the tree, then hiding it with Ctrl + W"
  },
  {
    id: "preview",
    sheetOnly: true,
    group: "navigate",
    title: "Document preview",
    icon: faFileMagnifyingGlass,
    summary: "Move, scroll and zoom the rendered pages.",
    description: [
      "The preview on the right shows the document content. Drag it, scroll it and zoom in and out, or fit a whole page on the screen."
    ],
    shortcuts: [
      { keys: ["Drag"], action: "Move the preview" },
      { keys: ["Scroll"], action: "Scroll vertically" },
      { keys: ["Shift", "Scroll"], action: "Scroll horizontally" },
      { keys: ["Ctrl", "Scroll"], action: "Zoom" },
      { keys: ["Ctrl", "E"], action: "Fit the page under the cursor on the screen" }
    ],
    clip: "Zooming in with Ctrl + scroll, dragging, then Ctrl + E to fit the page"
  },
  {
    id: "search",
    /* shown in the film, Ctrl + F needs no explaining; the text stays for llms.txt later (llm-only) */
    sheetOnly: true,
    group: "navigate",
    title: "Content searching",
    icon: faMagnifyingGlass,
    summary: "Find a phrase and see it in the tree and on the page.",
    description: [
      "Press Ctrl + F and type a phrase. The search bar appears above the hierarchy, and the selected result is highlighted both in the tree and in the preview."
    ],
    shortcuts: [
      { keys: ["Ctrl", "F"], action: "Search by phrase" },
      { keys: ["↑"], action: "Previous result" },
      { keys: ["↓"], action: "Next result" },
      { keys: ["Esc"], action: "Exit search" }
    ],
    screenshot: "search",
    clip: "Typing a phrase, then stepping through the results with the arrow keys"
  },
  {
    id: "links",
    sheetOnly: true,
    group: "navigate",
    title: "Document links",
    icon: faLink,
    summary: "Follow hyperlinks and section links from the preview.",
    description: [
      "Hold Alt and click a link in the preview to open it."
    ],
    bullets: [
      "Hyperlinks open the web page in a new browser tab.",
      "Section links move the preview to the target section."
    ],
    shortcuts: [{ keys: ["Alt", "Click"], action: "Open a link" }],
    clip: "Alt + click on a section link, the preview jumps to the section"
  },
  {
    id: "selection",
    sheetOnly: true,
    group: "inspect",
    title: "Element selection",
    icon: faArrowPointer,
    summary: "Select any element and review its configuration, position and size.",
    description: [
      "Click an element in the hierarchy, or double-click it in the preview. The selected element is highlighted, and its details, such as configuration, position and size, appear in the details panel.",
      "An element visible on several pages has an occurrence on each; the arrow keys move between them."
    ],
    shortcuts: [
      { keys: ["Double-click"], action: "Select an element" },
      { keys: ["↑"], action: "Previous occurrence" },
      { keys: ["↓"], action: "Next occurrence" },
      { keys: ["Esc"], action: "Clear the selection" }
    ],
    screenshot: "selection",
    clip: "Double-clicking a block in the preview, the tree and the details panel follow"
  },
  {
    id: "tools",
    group: "inspect",
    title: "Magnifier and measuring",
    icon: faRulerCombined,
    summary: "See fine details, read positions and measure sizes with the number keys.",
    description: [
      "Four tools, one key each. Glide the magnifier over the preview to see details up close, or read the page number and the X and Y coordinates of any spot.",
      "Measure the size of visual elements and the distance between them, vertically or horizontally."
    ],
    shortcuts: [
      { keys: ["1"], action: "Magnifier" },
      { keys: ["2"], action: "Show coordinates" },
      { keys: ["3"], action: "Measure vertically" },
      { keys: ["4"], action: "Measure horizontally" }
    ],
    screenshot: "magnifier",
    clip: "Pressing 1, 2, 3 and 4 in turn: magnifier, coordinates, vertical and horizontal measuring"
  },
  {
    id: "implementation",
    group: "inspect",
    title: "From element to code",
    icon: faCode,
    summary: "Select an element, see its code, open it in your editor.",
    description: [
      "Double-click an element in the preview, or click it in the hierarchy, to highlight it and see its page, position and size. The pencil shows the code behind it, without leaving the app.",
      "To open that code in your editor, hold Ctrl and click the element in the preview, selected or not."
    ],
    shortcuts: [{ keys: ["Ctrl", "Click"], action: "Open the implementation in the code editor" }],
    warning: "Hot reload can reduce the accuracy: the first document load gives the most precise navigation. When you rely on it, run dotnet watch --no-hot-reload instead.",
    clip: "Double-click selects, the pencil shows the code, Ctrl + click opens the IDE"
  },
  {
    id: "layout",
    group: "debug",
    title: "Layout issue debugging",
    icon: faTriangleExclamation,
    summary: "Find the element that does not fit, marked in the tree.",
    description: [
      "When content does not fit, every element in the hierarchy gets a colored dot that tells how it was rendered on the faulty page. Select an element to read the reason for the wrap or the overflow in its details.",
      "A document with several layout issues lets you move between them with the arrow buttons."
    ],
    statuses: [
      { color: "#F44336", name: "Layout issue root cause", description: "Likely the root cause, by the library's heuristics." },
      { color: "#FF9800", name: "Wrapped", description: "Cannot be drawn within the layout constraints; it or one of its children causes the issue." },
      { color: "#FFEB3B", name: "Partially rendered", description: "Drawn in part, continues on the next page; may contain the actual root cause." },
      { color: "#4CAF50", name: "Fully rendered", description: "Drawn completely on the page." },
      { color: "#00BCD4", name: "Empty", description: "Drawn on the faulty page but took no space." },
      { color: "#9E9E9E", name: "Not rendered", description: "Not drawn on the faulty page; its children are omitted." }
    ],
    screenshot: "layout-error",
    clip: "A document that overflows: the red dot leads to the element, its details explain why"
  }
];

export const features = allFeatures.filter(feature => !feature.sheetOnly);

export function featuresOf(group: GroupId) {
  return features.filter(feature => feature.group === group);
}

/* the shortcuts of a feature's section; "From element to code" tells the selection too */
export function shortcutsOf(feature: Feature) {
  const selection = allFeatures.find(each => each.id === "selection");
  const first = feature.id === "implementation" ? selection?.shortcuts?.slice(0, 1) ?? [] : [];
  return [...first, ...feature.shortcuts ?? []];
}

export function groupOf(feature: Feature) {
  return groups.find(group => group.id === feature.group)!;
}

/* PROTOTYPE, option 3: two films carry the page. The first goes from ShowInCompanion() to hot reload (GetStarted),
   the second shows the app's tools in one take; what the second film shows is listed under it. */
export interface FilmPoint {
  id: string;
  title: string;
  icon: IconDefinition;
  text: string;
}

/* in the order of the second film */
export const toolsFilmPoints: FilmPoint[] = [
  {
    id: "tools",
    title: "Magnifier and measuring",
    icon: faRulerCombined,
    text: "Keys 1 to 4: look up close, read coordinates, measure vertically and horizontally."
  },
  {
    id: "hierarchy",
    title: "Document hierarchy",
    icon: faFolderTree,
    text: "The document as a tree that mirrors your Fluent API calls. Click a node to select its element."
  },
  {
    id: "preview",
    title: "Document preview",
    icon: faFileMagnifyingGlass,
    text: "Drag, scroll and zoom the pages. Ctrl + E fits the page under the cursor on the screen."
  },
  {
    id: "implementation",
    title: "From element to code",
    icon: faCode,
    text: "Double-click an element, the pencil shows the code behind it. Ctrl + click opens it in your editor."
  }
];
