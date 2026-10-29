export type PersonalInterest = {
  id: string;
  title: string;
  summary: string;
  image?: string;
  isPlaceholder?: boolean;
};

/**
 * Interests for the "Outside the IDE" page.
 * Initial categories from specification: Gaming, Gym, Volleyball.
 */
export const personalInterests: PersonalInterest[] = [
  {
    id: "gaming",
    title: "Gaming",
    summary:
      "[GAMING PLACEHOLDER — Replace with a short note on the genres, titles, or aspects of gaming you enjoy outside software development.]",
    isPlaceholder: true,
  },
  {
    id: "gym",
    title: "Gym",
    summary:
      "[GYM PLACEHOLDER — Replace with a short note on your training routine or how staying active complements long coding sessions.]",
    isPlaceholder: true,
  },
  {
    id: "volleyball",
    title: "Volleyball",
    summary:
      "[VOLLEYBALL PLACEHOLDER — Replace with a short note on playing volleyball, teamwork, and recreation outside the IDE.]",
    isPlaceholder: true,
  },
];
