import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import type { DefaultTheme } from "vitepress";

/* A sidebar item as VitePress defines it, plus an icon for a top-level section; SidebarItem.vue draws it. */
export type SidebarItem = Omit<DefaultTheme.SidebarItem, "items"> & {
  icon?: IconDefinition;
  items?: SidebarItem[];
};

export type ThemeConfig = Omit<DefaultTheme.Config, "sidebar"> & {
  sidebar?: SidebarItem[];
};
