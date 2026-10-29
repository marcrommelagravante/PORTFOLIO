export type PortfolioProject = {
  slug: string;
  title: string;
  categoryPlaceholder?: string;
  summary: string;
  description?: string;
  problemContext?: string;
  goalsAndFeatures?: string[];
  architectureNotes?: string;
  challengesLearned?: string;
  coverImage?: string;
  screenshots?: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  isPlaceholder?: boolean;
  status?: "in-progress" | "completed" | "archived";
};

/**
 * Manually curated portfolio projects.
 * NOTE: Entries below are strictly marked layout placeholders.
 * Replace with real projects before public launch.
 */
export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "sample-project-one",
    title: "[PROJECT TITLE 01]",
    categoryPlaceholder: "[AI APPLICATION PLACEHOLDER]",
    summary:
      "[PROJECT DESCRIPTION — A concise one-to-two sentence placeholder summary describing what this project solves and who it is for.]",
    description:
      "[EXTENDED PROJECT DESCRIPTION — Replace with the full overview of the project once approved copy is supplied.]",
    problemContext:
      "[PROBLEM / CONTEXT PLACEHOLDER — Explain the background problem or motivation behind building this project.]",
    goalsAndFeatures: [
      "[KEY FEATURE PLACEHOLDER 1]",
      "[KEY FEATURE PLACEHOLDER 2]",
      "[KEY FEATURE PLACEHOLDER 3]",
    ],
    architectureNotes:
      "[TECHNICAL IMPLEMENTATION & ARCHITECTURE PLACEHOLDER — Describe how the application is structured and why key technologies were chosen.]",
    challengesLearned:
      "[CHALLENGES & LESSONS LEARNED PLACEHOLDER — Summarize technical trade-offs or insights gained.]",
    coverImage: "/images/projects/project-placeholder.svg",
    screenshots: ["/images/projects/project-placeholder.svg"],
    technologies: ["[TECH STACK 1]", "[TECH STACK 2]", "[TECH STACK 3]"],
    githubUrl: undefined,
    liveUrl: undefined,
    featured: true,
    isPlaceholder: true,
    status: "in-progress",
  },
  {
    slug: "sample-project-two",
    title: "[PROJECT TITLE 02]",
    categoryPlaceholder: "[WEB APPLICATION PLACEHOLDER]",
    summary:
      "[PROJECT DESCRIPTION — A concise one-to-two sentence placeholder summary testing card alignment, tag wrapping, and editorial spacing.]",
    description:
      "[EXTENDED PROJECT DESCRIPTION — Replace with the full overview of the second selected project.]",
    problemContext:
      "[PROBLEM / CONTEXT PLACEHOLDER — Explain the background problem or motivation behind building this project.]",
    goalsAndFeatures: [
      "[KEY FEATURE PLACEHOLDER 1]",
      "[KEY FEATURE PLACEHOLDER 2]",
    ],
    architectureNotes:
      "[TECHNICAL IMPLEMENTATION & ARCHITECTURE PLACEHOLDER — Describe key system design decisions.]",
    challengesLearned:
      "[CHALLENGES & LESSONS LEARNED PLACEHOLDER — Summarize what you learned while building this project.]",
    coverImage: "/images/projects/project-placeholder.svg",
    screenshots: ["/images/projects/project-placeholder.svg"],
    technologies: ["[TECH STACK 1]", "[TECH STACK 2]", "[TECH STACK 3]"],
    githubUrl: undefined,
    liveUrl: undefined,
    featured: true,
    isPlaceholder: true,
    status: "in-progress",
  },
];
