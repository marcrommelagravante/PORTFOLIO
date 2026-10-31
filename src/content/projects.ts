export type PortfolioProject = {
  slug: string;
  title: string;
  summary: string;
  overview: string;
  features: string[];
  highlights: string[];
  coverImage?: string;
  screenshots?: string[];
  technologies: string[];
  liveUrl: string;
  githubUrl?: string;
  featured: boolean;
  isPlaceholder?: boolean;
};

/**
 * Manually curated portfolio projects.
 * Replace placeholder entries with real project details and URLs before launch.
 */
export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "project-one",
    title: "[PROJECT 01 — AI WORKSPACE]",
    summary:
      "A concise one-line description of this AI web application and the core problem it solves for users.",
    overview:
      "[PROJECT OVERVIEW — Replace with a clear summary explaining what this application is, why you built it, and how users interact with it.]",
    features: [
      "Real-time AI streaming responses with structured markdown output",
      "Document and context management with fast local search",
      "Responsive workspace interface with keyboard shortcuts",
    ],
    highlights: [
      "Designed a low-latency API pipeline connecting Next.js Server Actions to LLM providers",
      "Built a custom token-aware context window manager for reliable prompts",
      "Achieved 99+ Lighthouse performance and accessibility scores",
    ],
    coverImage: "/images/projects/project-placeholder-1.svg",
    screenshots: [
      "/images/projects/project-placeholder-2.svg",
      "/images/projects/project-placeholder-3.svg",
      "/images/projects/project-placeholder-4.svg",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI API", "Supabase"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/marcrommelagravante",
    featured: true,
    isPlaceholder: true,
  },
  {
    slug: "project-two",
    title: "[PROJECT 02 — FULL-STACK SAAS]",
    summary:
      "A brief description of this full-stack platform highlighting its main workflow and target audience.",
    overview:
      "[PROJECT OVERVIEW — Replace with a clear summary of your second project's purpose, architecture, and user experience.]",
    features: [
      "Role-based authentication and team workspace management",
      "Interactive analytics dashboard with live data filtering",
      "Automated background jobs and webhook integrations",
    ],
    highlights: [
      "Architected end-to-end relational schema in PostgreSQL with row-level security",
      "Reduced dashboard query times through indexed views and edge caching",
      "Deployed zero-downtime CI/CD pipeline on Vercel",
    ],
    coverImage: "/images/projects/project-placeholder-2.svg",
    screenshots: [
      "/images/projects/project-placeholder-3.svg",
      "/images/projects/project-placeholder-4.svg",
      "/images/projects/project-placeholder-1.svg",
    ],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "Vercel"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/marcrommelagravante",
    featured: true,
    isPlaceholder: true,
  },
  {
    slug: "project-three",
    title: "[PROJECT 03 — MOBILE COMPANION APP]",
    summary:
      "A short description of this cross-platform mobile application and how it helps users on the go.",
    overview:
      "[PROJECT OVERVIEW — Replace with the story behind your mobile application, its core user flow, and offline-first capabilities.]",
    features: [
      "Cross-platform iOS and Android experience with native gestures",
      "Offline-first local storage with automatic cloud sync",
      "Push notifications and customizable daily reminders",
    ],
    highlights: [
      "Shared 95% of business logic and types across mobile and web clients",
      "Optimized list virtualization for smooth 60fps scrolling on mobile devices",
      "Integrated Firebase Auth and cloud storage for seamless media uploads",
    ],
    coverImage: "/images/projects/project-placeholder-3.svg",
    screenshots: [
      "/images/projects/project-placeholder-4.svg",
      "/images/projects/project-placeholder-1.svg",
      "/images/projects/project-placeholder-2.svg",
    ],
    technologies: ["React Native", "Expo", "TypeScript", "Firebase"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/marcrommelagravante",
    featured: true,
    isPlaceholder: true,
  },
  {
    slug: "project-four",
    title: "[PROJECT 04 — DEVELOPER TOOLKIT]",
    summary:
      "A short summary of this developer tool or automation utility and how it speeds up engineering workflows.",
    overview:
      "[PROJECT OVERVIEW — Replace with an overview of your fourth project, focusing on developer experience and technical execution.]",
    features: [
      "One-click code generation and schema validation",
      "Interactive live preview sandbox in the browser",
      "Exportable templates and CLI integration",
    ],
    highlights: [
      "Built a zero-dependency parser for fast client-side validation",
      "Created a clean, minimal UI focused on speed and keyboard navigation",
      "Open-sourced with comprehensive documentation and test coverage",
    ],
    coverImage: "/images/projects/project-placeholder-4.svg",
    screenshots: [
      "/images/projects/project-placeholder-1.svg",
      "/images/projects/project-placeholder-2.svg",
      "/images/projects/project-placeholder-3.svg",
    ],
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Gemini API"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/marcrommelagravante",
    featured: true,
    isPlaceholder: true,
  },
];
