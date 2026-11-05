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
  discordHandle?: string;
  discordUserId?: string;
  facebookUrl?: string;
  resumeUrl?: string;
  contactPage: {
    eyebrow: string;
    title: string;
    intro: string;
    ctaLabel: string;
  };
  contactForm: {
    eyebrow: string;
    title: string;
    submitLabel: string;
    submittingLabel: string;
    helperText: string;
    successTitle: string;
    successBody: string;
    errorMessage: string;
    subject: string;
    placeholders: {
      name: string;
      email: string;
      message: string;
    };
  };
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
  isTemplateMode: false,
  fullName: "Marc Rommel Agravante",
  firstName: "Marc",
  initials: "MRA.",
  roleEyebrow: "Computer Engineering Student · Aspiring Developer",
  heroHeadline: "Hi, I'm Marc. I build useful things for the web.",
  shortIntroduction:
    "Computer Engineering student and developer passionate about building performant, accessible web applications and developer tools.",
  profilePhoto: "/images/profile-placeholder.svg",
  profilePhotoAlt: "Portrait frame for Marc Rommel Agravante",
  locationFooterLine: "Based in the Philippines · Available for opportunities",
  githubUsername: "marcrommelagravante",
  githubUrl: "https://github.com/marcrommelagravante",
  contactEmail: "marcrommelagravante21@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/marc-rommel-agravante-349628449",
  discordHandle: "_xevo21",
  discordUserId: "745242725267406898",
  discordUrl: "https://discord.com/users/745242725267406898",
  facebookUrl: "https://m.me/Xevoooo",
  resumeUrl: undefined,
  contactPage: {
    eyebrow: "Contact",
    title: "Let’s Work Together",
    intro:
      "Have a project, an idea or a question? Send a message and it lands straight in my inbox, or pick any channel below.",
    ctaLabel: "Send message →",
  },
  contactForm: {
    eyebrow: "Send a message",
    title: "Let’s talk",
    submitLabel: "Send message",
    submittingLabel: "Sending…",
    helperText: "Goes straight to my inbox.",
    successTitle: "Thanks, I got it.",
    successBody: "Your message has been sent. I’ll get back to you soon.",
    errorMessage:
      "Couldn’t send that. Please try again, or use one of the channels on the Contact page.",
    subject: "New message from portfolio",
    placeholders: {
      name: "Your name",
      email: "you@example.com",
      message: "Hi Marc, I’d like to build…",
    },
  },
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
