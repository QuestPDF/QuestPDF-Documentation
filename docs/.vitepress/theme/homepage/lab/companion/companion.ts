/* Shared facts for the Companion App lab (docs/companion-lab.md). The copy is the production copy
   from HomePageCompanion.vue; every direction renders the same words. The shortcuts come from
   docs/companion/features.md and the hot reload command from docs/companion/usage.md.
   Delete this folder and docs/companion-lab.md once a direction ships. */

export interface Capability {
  key: string;
  icon: string;
  title: string;
  description: string;
  /* keyboard shortcuts as documented, each entry one key cap */
  keys: string[];
  keysLabel: string;
}

export const title = "Companion App";
export const description = "Shorten the loop between writing code and seeing the result. Spend your time designing documents, not waiting on them.";

export const capabilities: Capability[] = [
  {
    key: "reload",
    icon: "fa-bolt",
    title: "Hot reload",
    description: "Save your code and the preview refreshes in place.",
    keys: ["dotnet watch"],
    keysLabel: "or Hot Reload in Visual Studio and Rider"
  },
  {
    key: "hierarchy",
    icon: "fa-folder-tree",
    title: "Document hierarchy",
    description: "Select any element and jump to its code in your IDE.",
    keys: ["Ctrl", "Click"],
    keysLabel: "go to code"
  },
  {
    key: "measure",
    icon: "fa-magnifying-glass",
    title: "Magnify and measure",
    description: "Zoom into details and measure sizes and distances.",
    keys: ["1", "2", "3", "4"],
    keysLabel: "magnifier, coordinates, measure"
  },
  {
    key: "debug",
    icon: "fa-bug",
    title: "Exception and layout debugging",
    description: "Jump to the code that threw or the element that overflowed.",
    keys: ["↑", "↓"],
    keysLabel: "next issue"
  }
];

export const platforms = [
  { src: "windows.svg", name: "Windows" },
  { src: "apple.svg", name: "macOS" },
  { src: "linux.svg", name: "Linux" }
];

// keep in sync with the latest release listed in docs/companion/download.md
export const version = "2026.2.2";
const releaseUrl = `https://github.com/QuestPDF/QuestPDF.Companion/releases/download/${version}`;

export const downloads = [
  { src: "windows.svg", name: "Windows", format: ".msix", url: `${releaseUrl}/questpdf_companion-${version}-windows.msix` },
  { src: "apple.svg", name: "macOS", format: ".dmg", url: `${releaseUrl}/QuestPDF.Companion.${version}.dmg` },
  { src: "linux.svg", name: "Linux", format: ".deb", url: `${releaseUrl}/questpdf_companion-${version}-linux.deb` },
  { src: "linux.svg", name: "Linux", format: ".rpm", url: `${releaseUrl}/questpdf_companion-${version}-linux.rpm` }
];
