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
  eyebrow: "MORE ABOUT ME",
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
    title: "Evening Portrait",
    image: "/images/interests/image-01.jpg",
    alt: "Evening selfie of Marc wearing glasses",
    caption: "Quiet evenings outside the editor.",
    objectPosition: "center 45%",
    isPlaceholder: false,
  },
  {
    id: "image-02",
    title: "Time Together",
    image: "/images/interests/image-02.jpg",
    alt: "Marc standing with his partner in front of a terracotta wall with vines",
    caption: "Favorite company.",
    objectPosition: "center 58%",
    isPlaceholder: false,
  },
  {
    id: "image-03",
    title: "Gym",
    image: "/images/interests/image-03.jpg",
    alt: "Mirror selfie of Marc at the gym",
    caption: "Train harder.",
    objectPosition: "center 12%",
    isPlaceholder: false,
  },
  {
    id: "image-04",
    title: "Campus Days",
    image: "/images/interests/image-04.jpg",
    alt: "High-angle selfie of Marc outdoors in school uniform",
    caption: "Between classes on campus.",
    objectPosition: "center 25%",
    isPlaceholder: false,
  },
  {
    id: "image-05",
    title: "Late-Night Setup",
    image: "/images/interests/image-05.jpg",
    alt: "Late-night desk setup showing code on the monitor and RGB keyboard",
    caption: "Late-night builds at the desk.",
    objectPosition: "25% center",
    isPlaceholder: false,
  },
  {
    id: "image-06",
    title: "Rides",
    image: "/images/interests/image-06.jpg",
    alt: "Black Yamaha NMAX scooter with a helmet parked outside a fitness gym",
    caption: "Daily rides and gym stops.",
    objectPosition: "center",
    isPlaceholder: false,
  },
  {
    id: "image-07",
    title: "Billiards",
    image: "/images/interests/image-07.jpg",
    alt: "Marc lining up a shot at a blue pool table",
    caption: "Lining up the next shot.",
    objectPosition: "center",
    isPlaceholder: false,
  },
  {
    id: "image-08",
    title: "Gaming",
    image: "/images/interests/image-08.jpg",
    alt: "Mobile Legends profile showing Philippines No. 5 Beatrix ranking",
    caption: "Game. Chill. Repeat.",
    objectPosition: "center",
    isPlaceholder: false,
  },
  {
    id: "image-09",
    title: "Volleyball",
    image: "/images/interests/image-09.jpg",
    alt: "Volleyball match on a covered court",
    caption: "Play with passion.",
    objectPosition: "center",
    isPlaceholder: false,
  },
];
