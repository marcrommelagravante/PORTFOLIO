export type InterestPageHeader = {
  eyebrow: string;
  heading: string;
  introduction: string;
};

export type InterestGalleryItem = {
  id: string;
  title: string;
  image: string;
  alt: string;
  caption: string;
  objectPosition?: string;
  isPlaceholder: boolean;
};

export const interestStack = {
  peek: 32,
  depth: 36,
  visible: 4,
};

/**
 * Editable header copy for the Beyond the IDE (/outside-the-ide) gallery page.
 */
export const interestPageHeader: InterestPageHeader = {
  eyebrow: "BEYOND THE IDE",
  heading: "Life beyond the screen.",
  introduction:
    "Not everything happens in front of a code editor. Here's a little glimpse of the things I enjoy outside development.",
};

/**
 * Central gallery configuration for the Beyond the IDE page.
 * Replace the temporary placeholder paths in `public/images/interests/` and
 * update captions/alt text when real photographs are ready, then set
 * `isPlaceholder: false`.
 */
export const interestGallery: InterestGalleryItem[] = [
  {
    id: "gaming",
    title: "Gaming",
    image: "/images/interests/gaming-placeholder.svg",
    alt: "Temporary image representing gaming",
    caption: "Game. Chill. Repeat.",
    objectPosition: "center",
    isPlaceholder: true,
  },
  {
    id: "gym",
    title: "Gym",
    image: "/images/interests/gym-placeholder.svg",
    alt: "Temporary image representing gym training",
    caption: "Train harder.",
    objectPosition: "center",
    isPlaceholder: true,
  },
  {
    id: "volleyball",
    title: "Volleyball",
    image: "/images/interests/volleyball-placeholder.svg",
    alt: "Temporary image representing volleyball",
    caption: "Play with passion.",
    objectPosition: "center 35%",
    isPlaceholder: true,
  },
  {
    id: "other-interests",
    title: "Other Interests",
    image: "/images/interests/other-interests-placeholder.svg",
    alt: "Temporary image representing other interests",
    caption: "More beyond the usual.",
    objectPosition: "center",
    isPlaceholder: true,
  },
];
