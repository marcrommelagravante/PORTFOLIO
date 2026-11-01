export type ToolkitPageHeader = {
  heading: string;
  description: string;
};

export type ToolkitCategory =
  | "Monitor"
  | "System Unit"
  | "Keyboard"
  | "Mouse"
  | "Headset";

export type ToolkitItem = {
  id: string;
  category: ToolkitCategory;
  name: string;
  image: string;
  alt: string;
  specs?: string;
  description: string;
  layoutClass?: string;
  objectPosition?: string;
  isPlaceholder: boolean;
};

export type GearItem = ToolkitItem;

/**
 * Editable header copy for The Toolkit (/gear) page.
 * Starts directly with the main heading and supporting description (no breadcrumb).
 */
export const toolkitPageHeader: ToolkitPageHeader = {
  heading: "The Toolkit",
  description:
    "The tools behind the work. A look at the hardware and everyday equipment I use to build, create, and stay productive.",
};

/**
 * Centralized equipment showcase for The Toolkit (/gear) page.
 * Replace the temporary placeholder paths in `public/images/toolkit/` and
 * update the bracketed model names, specifications, and descriptions when actual
 * product photos and hardware details are ready, then set `isPlaceholder: false`.
 */
export const toolkitItems: ToolkitItem[] = [
  {
    id: "monitor",
    category: "Monitor",
    name: "[MONITOR MODEL]",
    image: "/images/toolkit/monitor-placeholder.svg",
    alt: "Temporary image representing a computer monitor",
    specs: "[SCREEN SIZE · RESOLUTION · REFRESH RATE]",
    description:
      "[HOW I USE IT — Explain how it supports development, coursework, or everyday use.]",
    layoutClass: "toolkit-monitor",
    objectPosition: "center",
    isPlaceholder: true,
  },
  {
    id: "system-unit",
    category: "System Unit",
    name: "[SYSTEM UNIT NAME OR PC BUILD]",
    image: "/images/toolkit/system-unit-placeholder.svg",
    alt: "Temporary image representing a desktop PC",
    specs: "[CPU · GPU · RAM · STORAGE]",
    description:
      "[HOW I USE IT — Explain what the PC is used for, such as development, multitasking, or creative tools.]",
    layoutClass: "toolkit-system-unit",
    objectPosition: "center",
    isPlaceholder: true,
  },
  {
    id: "keyboard",
    category: "Keyboard",
    name: "[KEYBOARD MODEL]",
    image: "/images/toolkit/keyboard-placeholder.svg",
    alt: "Temporary image representing a computer keyboard",
    specs: "[LAYOUT · SWITCH TYPE · CONNECTION]",
    description:
      "[HOW I USE IT — Explain typing comfort, layout, or workflow benefits.]",
    layoutClass: "toolkit-keyboard",
    objectPosition: "center",
    isPlaceholder: true,
  },
  {
    id: "mouse",
    category: "Mouse",
    name: "[MOUSE MODEL]",
    image: "/images/toolkit/mouse-placeholder.svg",
    alt: "Temporary image representing a computer mouse",
    specs: "[SENSOR · CONNECTION · BUTTONS]",
    description:
      "[HOW I USE IT — Explain comfort, precision, or everyday navigation benefits.]",
    layoutClass: "toolkit-mouse",
    objectPosition: "center",
    isPlaceholder: true,
  },
  {
    id: "headset",
    category: "Headset",
    name: "[HEADSET MODEL]",
    image: "/images/toolkit/headset-placeholder.svg",
    alt: "Temporary image representing a computer headset",
    specs: "[CONNECTION · MICROPHONE · AUDIO FEATURES]",
    description:
      "[HOW I USE IT — Explain how it is used for calls, focus, entertainment, or everyday audio.]",
    layoutClass: "toolkit-headset",
    objectPosition: "center",
    isPlaceholder: true,
  },
];

export const gearItems = toolkitItems;
