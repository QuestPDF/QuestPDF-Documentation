import { faApple, faLinux, faWindows } from "@fortawesome/free-brands-svg-icons";

/* the latest release, older ones are on GitHub; keep in sync with docs/companion/usage.md, docs/companion/download.md
   and public/companion/latest-version */
export const VERSION = "2026.11.0";
export const RELEASES = "https://github.com/QuestPDF/QuestPDF.CompanionApp/releases";

const file = (name: string) => `${RELEASES}/download/${VERSION}/${name}`;

export const downloads = [
  { icon: faWindows, name: "Windows", format: ".msix", href: file(`questpdf_companion-${VERSION}-windows.msix`) },
  { icon: faApple, name: "macOS", format: ".dmg", href: file(`QuestPDF.Companion.${VERSION}.dmg`) },
  { icon: faLinux, name: "Linux", format: ".deb", href: file(`questpdf_companion-${VERSION}-linux.deb`) },
  { icon: faLinux, name: "Linux", format: ".rpm", href: file(`questpdf_companion-${VERSION}-linux.rpm`) }
];

export type Download = (typeof downloads)[number];
