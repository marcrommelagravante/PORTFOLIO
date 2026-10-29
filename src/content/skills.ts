export type SkillCategory = {
  id: string;
  label: string;
  items: string[];
};

/**
 * Editable technology stack categories (Frontend, Backend & Hosting, AI, Mobile).
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML / CSS"],
  },
  {
    id: "backend-hosting",
    label: "Backend & Hosting",
    items: ["Node.js", "PostgreSQL", "Supabase", "Firebase", "Vercel"],
  },
  {
    id: "ai",
    label: "AI",
    items: [
      "OpenAI API",
      "Gemini API",
      "LangChain",
      "AI SDK",
      "Prompt Engineering",
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    items: ["React Native", "Expo", "Flutter", "iOS / Android"],
  },
];
