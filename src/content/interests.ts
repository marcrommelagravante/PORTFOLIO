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
 * Central gallery configuration for the Beyond the IDE Coverflow page.
 * Replace the temporary placeholder paths in `public/images/interests/` and
 * update titles/captions/alt text when real photographs are ready, then set
 * `isPlaceholder: false`.
 */
export const interestGallery: InterestGalleryItem[] = [
  {
    id: "image-01",
    title: "Gaming",
    image: "/images/interests/image-01.svg",
    alt: "Template placeholder 01 representing gaming",
    caption: "Game. Chill. Repeat.",
    objectPosition: "center",
    isPlaceholder: true,
  },
  {
    id: "image-02",
    title: "Gym",
    image: "/images/interests/image-02.svg",
    alt: "Template placeholder 02 representing gym training",
    caption: "Train harder.",
    objectPosition: "center",
    isPlaceholder: true,
  },
  {
    id: "image-03",
    title: "Volleyball",
    image: "/images/interests/image-03.svg",
    alt: "Template placeholder 03 representing volleyball",
    caption: "Play with passion.",
    objectPosition: "center",
    isPlaceholder: true,
  },
  {
    id: "image-04",
    title: "Photography",
    image: "/images/interests/image-04.svg",
    alt: "Template placeholder 04 representing photography",
    caption: "Framing quiet moments.",
    objectPosition: "center",
    isPlaceholder: true,
  },
  {
    id: "image-05",
    title: "Coffee & Cafes",
    image: "/images/interests/image-05.svg",
    alt: "Template placeholder 05 representing coffee and cafes",
    caption: "Slow mornings and pour-overs.",
    objectPosition: "center",
    isPlaceholder: true,
  },
  {
    id: "image-06",
    title: "Music",
    image: "/images/interests/image-06.svg",
    alt: "Template placeholder 06 representing music",
    caption: "Late-night playlists and live sets.",
    objectPosition: "center",
    isPlaceholder: true,
  },
  {
    id: "image-07",
    title: "Outdoors",
    image: "/images/interests/image-07.svg",
    alt: "Template placeholder 07 representing outdoor adventures",
    caption: "Exploring new places off the grid.",
    objectPosition: "center",
    isPlaceholder: true,
  },
  {
    id: "image-08",
    title: "Reading",
    image: "/images/interests/image-08.svg",
    alt: "Template placeholder 08 representing reading",
    caption: "Deep dives beyond technical docs.",
    objectPosition: "center",
    isPlaceholder: true,
  },
  {
    id: "image-09",
    title: "Hardware Tinkering",
    image: "/images/interests/image-09.svg",
    alt: "Template placeholder 09 representing hardware tinkering",
    caption: "Soldering, circuits, and desk builds.",
    objectPosition: "center",
    isPlaceholder: true,
  },
];
