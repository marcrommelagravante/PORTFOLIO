export type SkillCategory = {
  id: string;
  label: string;
  items: string[];
  isPlaceholder?: boolean;
};

/**
 * Editable skill categories.
 * Do not add proficiency percentages or arbitrary progress bars.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    items: ["[LANGUAGES]"],
    isPlaceholder: true,
  },
  {
    id: "frontend",
    label: "Frontend",
    items: ["[FRONTEND TECHNOLOGIES]"],
    isPlaceholder: true,
  },
  {
    id: "backend",
    label: "Backend",
    items: ["[BACKEND TECHNOLOGIES]"],
    isPlaceholder: true,
  },
  {
    id: "databases",
    label: "Databases",
    items: ["[DATABASES]"],
    isPlaceholder: true,
  },
  {
    id: "ai-llm",
    label: "AI / LLM",
    items: ["[AI AND LLM TOOLS]"],
    isPlaceholder: true,
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    items: ["[TOOLS]"],
    isPlaceholder: true,
  },
];
