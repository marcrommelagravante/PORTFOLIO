export type SkillCategory = {
  id: string; // "frontend", "backend", "ai", "databases", "ar-3d-embedded", "auth-cloud"
  label: string; // "Frontend"
  outcome: string; // one short line, shown under the label
  items: string[]; // plain names, no versions
};

export type ProjectTechCategory = {
  category: string;
  technologies: string;
};

export type ProjectTechStack = {
  slug: string;
  title: string;
  tag: string;
  liveUrl?: string;
  categories: ProjectTechCategory[];
};

export const stackPageHeader = {
  eyebrow: "Technical toolkit",
  title: "Stack",
  description: "Curated technical toolkit and core technologies.",
};

/**
 * Curated technology stack (25 technologies across 6 core categories).
 * Matches STACK_PAGE_REDESIGN.md specification.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    outcome: "Fast, accessible interfaces people enjoy using",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript"],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    outcome: "Reliable servers and APIs behind the interface",
    items: ["Node.js", "Python", "FastAPI", "REST APIs"],
  },
  {
    id: "ai",
    label: "AI & LLMs",
    outcome: "AI features grounded in real data",
    items: ["Gemini API", "Groq + LLaMA 3.3", "RAG pipelines", "Embeddings"],
  },
  {
    id: "databases",
    label: "Databases",
    outcome: "Storage from realtime sync to vector search",
    items: ["PostgreSQL", "Firebase Firestore", "pgvector"],
  },
  {
    id: "ar-3d-embedded",
    label: "AR, 3D & Embedded",
    outcome: "Interactive 3D and hardware simulation",
    items: ["Unity", "C#", "AR Foundation", "Blender", "Arduino"],
  },
  {
    id: "auth-cloud",
    label: "Auth & Cloud",
    outcome: "Secure sign-in and automatic deploys",
    items: ["Vercel", "Google OAuth 2.0", "JWT", "GitHub Actions"],
  },
];

/**
 * Full project-specific tech stacks retained for project case studies and deep-dive documentation.
 */
export const projectTechStacks: ProjectTechStack[] = [
  {
    slug: "ar-duino-m",
    title: "AR-DUINO-M",
    tag: "Augmented Reality",
    liveUrl: "https://ar-duino-m.vercel.app/",
    categories: [
      {
        category: "Mobile Application",
        technologies:
          "Unity 6000.3.2f1 (Unity 6 LTS), C#, Universal Render Pipeline (URP 17.3), UGUI 2.0, TextMeshPro, Android NDK / IL2CPP (ARM64)",
      },
      {
        category: "Augmented Reality",
        technologies:
          "PTC Vuforia Engine 11.4, Unity AR Foundation 6.3, Google ARCore XR 6.3, Apple ARKit XR 6.3",
      },
      {
        category: "Circuit & Simulation",
        technologies:
          "Custom Bezier wire generator, 830-point breadboard snap matrix, ADC/PWM math engine, Mock IDE compiler runner",
      },
      {
        category: "Web Companion",
        technologies:
          "Next.js 15, React 19, TypeScript, Tailwind CSS, Vercel Edge Network",
      },
      {
        category: "3D Modeling & CAD",
        technologies: "Blender 5.0, low-poly PBR assets, GLTF/GLB, FBX",
      },
      {
        category: "Hardware Emulation",
        technologies:
          "Arduino Uno R3 (ATmega328P), L298N Dual H-Bridge, SG90 Servo, HC-SR04 Ultrasonic, 16x2 LCD",
      },
    ],
  },
  {
    slug: "satori",
    title: "Satori",
    tag: "AI Knowledge Workspace",
    liveUrl: "https://satori-six-eosin.vercel.app",
    categories: [
      {
        category: "Frontend",
        technologies:
          "Next.js 16 (App Router, Turbopack), React 19, TypeScript 5, Tailwind CSS 4, Radix UI, Motion (`motion`), Lucide React, `next-themes`",
      },
      {
        category: "Backend & Infrastructure",
        technologies:
          "Next.js Server Actions & Route Handlers, Modular Monolith architecture, Vercel deployment, Node.js 20+",
      },
      {
        category: "Database & Vector",
        technologies:
          "PostgreSQL (Neon Serverless), `pgvector` (`vector(768)`), Drizzle ORM, Drizzle Kit, PostgreSQL full-text search (`tsvector`)",
      },
      {
        category: "AI & Embeddings",
        technologies:
          "Google Gemini API (`@google/genai`), `gemini-3.6-flash`, `gemini-3.1-flash-lite`, `gemini-embedding-001` (768-dim)",
      },
      {
        category: "Documents & Storage",
        technologies:
          "`unpdf`, `mammoth`, `@vercel/blob`, local filesystem storage adapter",
      },
      {
        category: "Auth & Security",
        technologies:
          "Auth.js (NextAuth v5), Google OAuth 2.0, Zod 4, custom sliding-window rate limiter, prompt boundary defense",
      },
      {
        category: "Observability & Testing",
        technologies:
          "In-house RAG Evaluation suite, Golden Benchmark Datasets, Drizzle migration scripts, Vitest/Node test harnesses",
      },
    ],
  },
  {
    slug: "personamail",
    title: "PersonaMail",
    tag: "AI Email Assistant",
    liveUrl: "https://personamail-coral.vercel.app",
    categories: [
      {
        category: "Frontend",
        technologies:
          "Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, GSAP 3 (`ScrollTrigger`), Lenis, Lucide React",
      },
      {
        category: "Backend & Infrastructure",
        technologies:
          "FastAPI, Python 3.11+, SQLAlchemy 2.0, Pydantic v2, Uvicorn, Alembic",
      },
      {
        category: "Database",
        technologies:
          "PostgreSQL via Neon (Serverless Postgres with connection pooling)",
      },
      {
        category: "AI",
        technologies:
          "Groq Cloud API, Meta LLaMA 3.3 70B (`llama-3.3-70b-versatile`)",
      },
      {
        category: "Authentication & Security",
        technologies:
          "Google OAuth 2.0, JWT (`python-jose`), Dual Cookie + Bearer Header Auth, CSRF State Verification",
      },
      {
        category: "Deployment & Hosting",
        technologies:
          "Vercel (Frontend), Render (Backend), Neon (Database), GitHub Actions",
      },
    ],
  },
  {
    slug: "salo-sa-antipolo",
    title: "Salo sa Antipolo",
    tag: "Restaurant POS & Management",
    liveUrl: "https://salo-sa-antipolo.web.app",
    categories: [
      {
        category: "Frontend",
        technologies:
          "Vanilla JavaScript (ES6+ Modules), HTML5 Semantic Architecture, Custom Responsive CSS3 (CSS Grid, Flexbox, CSS Variables)",
      },
      {
        category: "Backend & Infrastructure",
        technologies:
          "Google Firebase Platform, Firebase Hosting, Global Edge CDN",
      },
      {
        category: "Database & Realtime Engine",
        technologies:
          "Google Cloud Firestore (v9 Modular SDK), Reactive `onSnapshot` Bi-directional Sync",
      },
      {
        category: "Authentication & Security",
        technologies:
          "Firebase Authentication (`firebase/auth`), Role-Based Access Control (RBAC), Route Guards",
      },
      {
        category: "Design, Icons & Typography",
        technologies:
          "Lucide Icons, FontAwesome 6, Google Fonts (*Playfair Display*, *Inter*), Custom Gold-on-Dark Luxury Theme",
      },
      {
        category: "Calculations & Data Export",
        technologies:
          "Philippine RA 9994 / RA 10754 Statutory Discount & VAT Exemption Engine, Client-side CSV Export",
      },
    ],
  },
];
