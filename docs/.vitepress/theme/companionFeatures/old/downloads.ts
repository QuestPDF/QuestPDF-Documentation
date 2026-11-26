import { faApple, faLinux, faWindows } from "@fortawesome/free-brands-svg-icons";

/* PROTOTYPE: the newest version of the app only, older ones are on GitHub */
export const VERSION = "2026.11.0";
export const RELEASES = "https://github.com/QuestPDF/QuestPDF.CompanionApp/releases";

const file = (name: string) => `${RELEASES}/download/${VERSION}/${name}`;

export const downloads = [
  { icon: faWindows, name: "Windows", note: ".msix", href: file(`questpdf_companion-${VERSION}-windows.msix`) },
  { icon: faApple, name: "macOS", note: ".dmg, Intel and Apple Silicon", href: file(`QuestPDF.Companion.${VERSION}.dmg`) },
  { icon: faLinux, name: "Linux", note: ".deb, Debian and Ubuntu", href: file(`questpdf_companion-${VERSION}-linux.deb`) },
  { icon: faLinux, name: "Linux", note: ".rpm, Fedora, RHEL and openSUSE", href: file(`questpdf_companion-${VERSION}-linux.rpm`) }
];
