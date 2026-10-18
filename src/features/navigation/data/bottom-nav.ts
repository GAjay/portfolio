import type { NavSectionId } from "@/shared/config/site";
import { NAV_SECTION_LABELS } from "@/shared/lib/nav-scroll-sections";

export type BottomNavTabId = NavSectionId | "blog";

export type BottomNavTab = {
  id: BottomNavTabId;
  label: string;
  shortLabel: string;
};

/** Left of center FAB — Home, Work, Projects */
export const bottomNavLeftTabs: BottomNavTab[] = [
  { id: "home", label: NAV_SECTION_LABELS.home, shortLabel: "Home" },
  {
    id: "journey",
    label: NAV_SECTION_LABELS.journey,
    shortLabel: "Work",
  },
  {
    id: "projects",
    label: NAV_SECTION_LABELS.projects,
    shortLabel: "Projects",
  },
];

/** Right of center FAB — Feed, Mentor, Blog */
export const bottomNavRightTabs: BottomNavTab[] = [
  {
    id: "content",
    label: NAV_SECTION_LABELS.content,
    shortLabel: "Feed",
  },
  {
    id: "mentor",
    label: NAV_SECTION_LABELS.mentor,
    shortLabel: "Mentor",
  },
  { id: "blog", label: "Blog", shortLabel: "Blog" },
];

export const bottomNavAllTabs: BottomNavTab[] = [
  ...bottomNavLeftTabs,
  ...bottomNavRightTabs,
];
