export type SiteConfig = {
  isTemplateMode: boolean;
  fullName: string;
  firstName: string;
  initials: string;
  roleEyebrow: string;
  heroHeadline: string;
  shortIntroduction: string;
  profilePhoto?: string;
  profilePhotoAlt: string;
  locationFooterLine: string;
  githubUsername: string;
  githubUrl: string;
  contactEmail?: string;
  linkedinUrl?: string;
  discordUrl?: string;
  facebookUrl?: string;
  resumeUrl?: string;
  about: {
    professionalBio: string[];
    currentStudyOrRole: string;
    developmentInterests: string[];
  };
};

/**
 * Central site identity and biographical placeholder configuration.
 * Replace bracketed placeholders with approved personal details when ready.
 */
export const siteConfig: SiteConfig = {
  isTemplateMode: true,
  fullName: "[FULL NAME]",
  firstName: "[FIRST NAME]",
  initials: "[INITIALS]",
  roleEyebrow: "[STUDY/ROLE] · [PROFESSIONAL FOCUS]",
  heroHeadline: "Hi, I'm [FIRST NAME]. I build useful things for the web.",
  shortIntroduction:
    "[ONE OR TWO SENTENCES ABOUT THE OWNER'S INTEREST IN SOFTWARE, AI TOOLS, OR WEB APPLICATIONS.]",
  profilePhoto: "/images/profile-placeholder.svg",
  profilePhotoAlt: "Placeholder portrait frame for [FULL NAME]",
  locationFooterLine: "[LOCATION OR SHORT FOOTER LINE]",
  githubUsername: "marcrommelagravante",
  githubUrl: "https://github.com/marcrommelagravante",
  // Leave optional links undefined until real URLs/files are provided.
  // Expected formats:
  //   contactEmail: "you@example.com"
  //   linkedinUrl: "https://www.linkedin.com/in/your-handle"
  //   discordUrl: "https://discord.com/users/<your-user-id>"
  //   facebookUrl: "https://www.facebook.com/your-handle"
  contactEmail: undefined,
  linkedinUrl: undefined,
  discordUrl: undefined,
  facebookUrl: undefined,
  resumeUrl: undefined,
  about: {
    professionalBio: [
      "[PROFESSIONAL BIOGRAPHY PARAGRAPH 1 — Replace with approved background summary as a Computer Engineering student and aspiring developer.]",
      "[PROFESSIONAL BIOGRAPHY PARAGRAPH 2 — Replace with details on how you approach software engineering, problem solving, and building reliable web applications.]",
    ],
    currentStudyOrRole: "[CURRENT STUDY / ROLE PLACEHOLDER — e.g., Computer Engineering Student]",
    developmentInterests: [
      "[DEVELOPMENT INTEREST 1 — e.g., Full-Stack Web Applications]",
      "[DEVELOPMENT INTEREST 2 — e.g., AI-Assisted Developer Tools]",
      "[DEVELOPMENT INTEREST 3 — e.g., Systems & Software Architecture]",
    ],
  },
};
