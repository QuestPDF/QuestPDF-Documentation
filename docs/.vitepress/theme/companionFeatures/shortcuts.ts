import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import {
  faArrowsUpDownLeftRight,
  faFolderTree,
  faLink,
  faMagnifyingGlass,
  faObjectGroup,
  faRulerCombined
} from "@fortawesome/pro-regular-svg-icons";

export interface Shortcut {
  keys: string[];
  action: string;
  /* on a Mac the app takes ⌘ for Ctrl and ⌥ for Alt, except in a shortcut that is the same there */
  sameOnMac?: boolean;
}

interface ShortcutBlock {
  title: string;
  icon: IconDefinition;
  shortcuts: Shortcut[];
}

/* Every shortcut of the app, grouped by feature; facts from docs/companion/features.md. The shortcut panel fills its
   columns in this order, top to bottom. */
export const shortcutBlocks: ShortcutBlock[] = [
  {
    title: "Document hierarchy",
    icon: faFolderTree,
    shortcuts: [
      { keys: ["Ctrl", "B"], action: "Hide or show the hierarchy" }
    ]
  },
  {
    title: "Document preview",
    icon: faArrowsUpDownLeftRight,
    shortcuts: [
      { keys: ["Drag"], action: "Move the preview" },
      { keys: ["Scroll"], action: "Scroll vertically" },
      { keys: ["Shift", "Scroll"], action: "Scroll horizontally" },
      { keys: ["Ctrl", "Scroll"], action: "Zoom", sameOnMac: true },
      { keys: ["Ctrl", "E"], action: "Fit the page under the cursor on the screen" }
    ]
  },
  {
    title: "Content searching",
    icon: faMagnifyingGlass,
    shortcuts: [
      { keys: ["Ctrl", "F"], action: "Search by phrase" },
      { keys: ["↑"], action: "Previous result" },
      { keys: ["↓"], action: "Next result" },
      { keys: ["Esc"], action: "Exit search" }
    ]
  },
  {
    title: "Element selection",
    icon: faObjectGroup,
    shortcuts: [
      { keys: ["Double-click"], action: "Select an element" },
      { keys: ["↑"], action: "Previous occurrence" },
      { keys: ["↓"], action: "Next occurrence" },
      { keys: ["Esc"], action: "Clear the selection" }
    ]
  },
  {
    title: "Magnifier and measuring",
    icon: faRulerCombined,
    shortcuts: [
      { keys: ["1"], action: "Magnifier" },
      { keys: ["2"], action: "Show coordinates" },
      { keys: ["3"], action: "Measure vertically" },
      { keys: ["4"], action: "Measure horizontally" }
    ]
  },
  {
    title: "Other",
    icon: faLink,
    shortcuts: [
      { keys: ["Alt", "Click"], action: "Open a link" },
      { keys: ["Ctrl", "Click"], action: "Open the implementation in the code editor" }
    ]
  }
];
