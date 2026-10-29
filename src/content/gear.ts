export type GearItem = {
  id: string;
  name: string;
  category: "Hardware" | "Software" | "Accessory";
  usage: string;
  image?: string;
  productUrl?: string;
  isPlaceholder?: boolean;
};

/**
 * Editable gear and tools list.
 * Replace placeholders with actual hardware, peripherals, and software used daily.
 */
export const gearItems: GearItem[] = [
  {
    id: "gear-hardware-1",
    name: "[GEAR ITEM — PRIMARY MACHINE]",
    category: "Hardware",
    usage: "[HOW I USE IT — Describe how this machine supports daily development and coursework.]",
    isPlaceholder: true,
  },
  {
    id: "gear-accessory-1",
    name: "[GEAR ITEM — PERIPHERAL / MONITOR]",
    category: "Accessory",
    usage: "[HOW I USE IT — Describe ergonomics or workflow benefits.]",
    isPlaceholder: true,
  },
  {
    id: "gear-software-1",
    name: "[GEAR ITEM — EDITOR / TERMINAL / WORKFLOW TOOL]",
    category: "Software",
    usage: "[HOW I USE IT — Describe your core development environment setup.]",
    isPlaceholder: true,
  },
];
