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
  initials: "MROA",
  roleEyebrow: "Computer Engineering Student",
  heroHeadline: "Hi, I'm Marc. I build useful things for the web.",
  shortIntroduction:
    "I build full-stack web apps, AI tools, and interactive 3D software—focused on clean interfaces and software that holds up in real use.",
  profilePhoto: "/images/marc-hero-bw.png",
  profilePhotoAlt: "Black-and-white portrait of Marc Rommel Agravante",
  locationFooterLine: "© Marc Rommel Agravante 2026",
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
      "I’m Marc Rommel O. Agravante, a Computer Engineering student at the University of Rizal System – Antipolo Campus. I’m working toward a career in software engineering, with a focus on full-stack development and AI-driven applications.",
      "On every project, I start with who it’s for and what problem it needs to solve, then shape the architecture and stack around that. I use AI tools to move faster during implementation, but I own what ships: reviewing the code, testing edge cases, database behavior, and security, and handling deployment and maintenance.",
    ],
    currentStudyOrRole: "Computer Engineering Student",
    developmentInterests: [
      "Full-Stack Web Applications",
      "AI-Driven Applications",
      "Software Architecture",
    ],
  },
};

/**
 * Enabled internal routes for MROA Focus Shift page transitions (all internal routes + /projects/[slug]).
 */
export const transitionRoutes: readonly string[] = [
  "/",
  "/about",
  "/outside-the-ide",
  "/projects",
  "/gear",
  "/stack",
  "/contact",
];

/**
 * Shared route-to-title map for the MROA Focus Shift transition overlay.
 */
export const transitionTitles: Record<string, string> = {
  "/": "HOME",
  "/about": "MORE ABOUT ME",
  "/outside-the-ide": "MORE ABOUT ME",
  "/projects": "PROJECTS",
  "/gear": "THE TOOLKIT",
  "/stack": "STACK",
  "/contact": "CONTACT",
};

/**
 * Human-readable labels for the screen-reader aria-live announcement ("Navigated to ...").
 */
export const transitionLabels: Record<string, string> = {
  "/": "Home",
  "/about": "More About Me",
  "/outside-the-ide": "More About Me",
  "/projects": "Projects",
  "/gear": "The Toolkit",
  "/stack": "Stack",
  "/contact": "Contact",
};

