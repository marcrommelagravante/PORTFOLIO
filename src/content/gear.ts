export type ToolkitPageHeader = {
  eyebrow?: string;
  heading: string;
  description?: string;
};

export type ToolkitCategory =
  | "Monitor"
  | "System Unit"
  | "Keyboard"
  | "Mouse"
  | "Headset"
  | "Phone";

export type ToolkitItem = {
  id: string;
  category: ToolkitCategory;
  name: string;
  image: string;
  alt: string;
  specs?: string;
  description?: string;
  layoutClass?: string;
  objectPosition?: string;
  isPlaceholder?: boolean;
};

export type GearItem = ToolkitItem;

/**
 * Header copy for The Toolkit / My Gear (/gear) page.
 * Eyebrow: MY GEAR
 * Heading: My Gear
 * No introductory description beneath the heading per spec.
 */
export const toolkitPageHeader: ToolkitPageHeader = {
  heading: "My Gear",
  description: "",
};

/**
 * Centralized equipment showcase for The Toolkit / My Gear page.
 * Exact device details and high-quality photography matching the approved design spec.
 */
export const toolkitItems: ToolkitItem[] = [
  {
    id: "monitor",
    category: "Monitor",
    name: "AOC 24G2SP",
    image: "/images/toolkit/aoc-24g2sp-monitor.png",
    alt: "AOC 24G2SP 24-inch 144Hz IPS gaming monitor",
    specs: '24" · 144Hz · IPS',
    isPlaceholder: false,
  },
  {
    id: "system-unit",
    category: "System Unit",
    name: "Montech Air 100",
    image: "/images/toolkit/montech-air-100-system-unit.png",
    alt: "Montech Air 100 case with Ryzen 5 5600X, RTX 3060 Ti, and 16GB RAM",
    specs: "Ryzen 5 5600X · RTX 3060 Ti · 16GB RAM",
    isPlaceholder: false,
  },
  {
    id: "keyboard",
    category: "Keyboard",
    name: "Tecware Phantom+ Elite",
    image: "/images/toolkit/tecware-phantom-elite-white-keyboard.png",
    alt: "White Tecware Phantom+ Elite mechanical keyboard",
    specs: "",
    isPlaceholder: false,
  },
  {
    id: "mouse",
    category: "Mouse",
    name: "Logitech G Pro X Superlight",
    image: "/images/toolkit/logitech-g-pro-x-superlight-white-mouse.png",
    alt: "White Logitech G Pro X Superlight wireless gaming mouse",
    specs: "",
    isPlaceholder: false,
  },
  {
    id: "headset",
    category: "Headset",
    name: "Razer BlackShark V2 X",
    image: "/images/toolkit/razer-blackshark-v2-x-headset.png",
    alt: "Black Razer BlackShark V2 X gaming headset",
    specs: "",
    isPlaceholder: false,
  },
  {
    id: "phone",
    category: "Phone",
    name: "POCO X6 Pro",
    image: "/images/toolkit/poco-x6-pro-phone.png",
    alt: "POCO X6 Pro smartphone front and back showcase",
    specs: "",
    isPlaceholder: false,
  },
];

export const gearItems = toolkitItems;
