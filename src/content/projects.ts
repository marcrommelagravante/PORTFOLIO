export type TechStackCategory = {
  category: string;
  technologies: string;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  summary: string;
  overview: string | string[];
  features: string[];
  highlights: string[];
  tag: string;
  status?: "beta" | "soon";
  thumbnail?: string;
  coverImage?: string;
  screenshots?: string[];
  galleryAspectRatio?: "20/9" | "16/10" | "16/9";
  technologies: string[];
  techStackTable?: TechStackCategory[];
  liveUrl: string;
  githubUrl?: string;
  featured: boolean;
  isPlaceholder?: boolean;
};

export const projectsSectionCopy = {
  eyebrow: "SELECTED WORK",
  title: "Projects",
  description:
    "A curated selection of web, mobile, and AI applications I've designed and built. Select a project to explore the case study.",
  groupLabel: "Personal projects",
  hint: "Hover a project to preview. Click to read the case study.",
  ctaLabel: "View Project",
  coverPlaceholderLabel: "Cover screenshot goes here",
} as const;

/**
 * Manually curated portfolio projects.
 * Replace placeholder entries with real project details and URLs before launch.
 */
export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "ar-duino-m",
    title: "AR-DUINO-M",
    tag: "Augmented Reality",
    summary:
      "An interactive Augmented Reality electronics laboratory and digital twin simulator built for engineering and STEM students.",
    overview: [
      "An interactive Augmented Reality electronics laboratory and digital twin simulator built for engineering and STEM students. It provides a risk-free 3D prototyping environment for learning breadboard wiring, microcontroller programming, and robotics without the danger of damaged components, equipment shortages, or high laboratory costs.",
      "Students access printable or on-screen optical markers via the companion web platform and scan them with an Android device to spawn interactive 3D component twins with real-time pinouts. From there, learners assemble circuits on an 830-tie-point virtual breadboard with procedural jumper wires, review and compile C++ sketches inside an embedded Mock Arduino IDE, and test running hardware—from blinking LEDs and PWM potentiometer dimming to driving a fully wired L298N dual H-bridge RC car across physical floor planes.",
    ],
    features: [
      "**Interactive 3D breadboard wiring** with 830 magnetic snap-to-grid tie-points, terminal strips (*a–j*), and +/- power bus rails.",
      "**Dynamic procedural jumper wire system** generating real-time Bezier curves with physics-based slack as components move.",
      "**Optical AR Target Library** with 29 trackable electronic components across 6 categories (Microcontrollers, Sensors, Actuators, Displays, Inputs, Passives).",
      "**Dual-screen web companion** displaying anti-glare, high-contrast tracking targets for instant camera detection without paper printing.",
      "**In-app Mock Arduino IDE** with sketch inspection, syntax validation, compile animations, and firmware upload simulation.",
      "**Real-time circuit simulation engine** calculating analog voltage dividers, ADC 10-bit conversions, PWM duty cycles, and LED states.",
      "**Tabletop and floor AR driving mode** using AR Foundation plane detection and virtual on-screen joystick controls for an L298N-driven RC car.",
      "**Interactive 9-step guided tutorial** with 3D world-space pointer arrows, glowing component highlights, and connection checkpoints.",
    ],
    highlights: [
      "**Authentic \"Wire → Code → Upload → Test\" loop**: Enforces the real-world embedded systems workflow by requiring students to wire the circuit, review the C++ sketch in the virtual IDE, and trigger firmware upload before hardware outputs activate.",
      "**Hybrid AR pipeline**: Integrates PTC Vuforia Engine (11.4) for high-precision optical 2D marker recognition with Unity AR Foundation (6.3) and ARCore for 6-DoF spatial plane tracking and surface raycasting.",
      "**100% offline standalone APK**: All 29 3D models, Vuforia dataset binaries, and circuit logic run entirely on-device with zero cloud latency, internet dependency, or subscription overhead.",
    ],
    techStackTable: [
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
    coverImage: "/images/projects/ar-duino/ar-duino-cover.jpg",
    thumbnail: "/images/projects/ar-duino/ar-duino-cover.jpg",
    screenshots: [
      "/images/projects/ar-duino/ar-duino-01.jpg",
      "/images/projects/ar-duino/ar-duino-02.jpg",
      "/images/projects/ar-duino/ar-duino-03.jpg",
      "/images/projects/ar-duino/ar-duino-04.jpg",
      "/images/projects/ar-duino/ar-duino-05.jpg",
      "/images/projects/ar-duino/ar-duino-06.jpg",
      "/images/projects/ar-duino/ar-duino-07.jpg",
      "/images/projects/ar-duino/ar-duino-08.jpg",
      "/images/projects/ar-duino/ar-duino-09.jpg",
      "/images/projects/ar-duino/ar-duino-10.jpg",
      "/images/projects/ar-duino/ar-duino-11.jpg",
      "/images/projects/ar-duino/ar-duino-12.jpg",
      "/images/projects/ar-duino/ar-duino-13.jpg",
      "/images/projects/ar-duino/ar-duino-14.jpg",
      "/images/projects/ar-duino/ar-duino-15.jpg",
    ],
    galleryAspectRatio: "20/9",
    technologies: [
      "Unity 6",
      "C#",
      "PTC Vuforia",
      "ARCore",
      "Next.js 15",
      "Blender 5.0",
      "Arduino (C++)",
    ],
    liveUrl: "https://github.com/marcrommelagravante",
    githubUrl: "https://github.com/marcrommelagravante",
    featured: true,
    isPlaceholder: false,
  },
  {
    slug: "personamail",
    title: "PersonaMail",
    tag: "AI Email Assistant",
    summary:
      "A full-stack, relationship-aware AI email assistant and communication workspace that automatically adapts tone, formality, greetings, and message structure based on recipient dynamics.",
    overview: [
      "A full-stack, relationship-aware AI email assistant and communication workspace. It bridges the gap between generic AI chat prompts and real-world email dynamics by automatically adapting tone, formality, greetings, and message structure based on who you are messaging.",
      "Users manage per-contact Adaptive Communication Profiles that store relationship roles, preferred tones, and conversational context. From there, users draft emails in Compose, refine rough thoughts in Improve, verify grammar and clarity in Review, and manage reusable templates—all powered by ultra-low-latency LLaMA 3.3 70B inference on Groq, with an inline fill-in tag system that eliminates AI hallucinations.",
    ],
    features: [
      "**Adaptive Communication Profiles**: Store relationship dynamics (Professor, Client, Recruiter, Colleague, Friend), custom background notes, and per-contact tone preferences (Formal, Direct, Casual, Warm).",
      "**One-Click AI Email Compose**: Converts brief bullet points or quick objectives into structured emails following a standard 7-part email anatomy (Subject, Greeting, Context, Core Message, Call to Action, Sign-off, Signature).",
      "**Tone Rewriter & Improver**: Polishes rough, hasty Slack-style notes into relationship-tailored email drafts while strictly preserving the user's authentic voice.",
      "**Message Review & Grammar Checker**: Catches syntax errors, spelling typos, and awkward phrasing before sending, maintaining professional standards without sounding robotic.",
      "**Zero-Hallucination Variable Tag System (`PlaceholderHighlighter`)**: Prompts strictly forbid fabricating imaginary dates, numbers, or project names, instead generating bracketed tokens (`[Project Name]`, `[Client Name]`, `[Day of Week]`) rendered as interactive, high-contrast fill-in chips.",
      "**Interactive Live Demo & Persona Switcher**: Unauthenticated visitors can test the adaptive AI engine on the landing page, switching recipient personas in real time before signing in.",
      "**High-Density History & Detail Modals**: Searchable activity feed with type filter pills (*All*, *Compose*, *Improve*, *Review*), one-click clipboard copying, and accessible inspect dialogs (`role=\"dialog\"`, Esc key dismiss, body scroll lock).",
      "**Adaptive Templates Library**: Reusable email templates that automatically calibrate variables and greetings to whichever contact is selected.",
      "**Google OAuth 2.0 SSO**: Seamless login experience with animated account selection transitions, user profile preview cards, and auto-dismissing sign-out notifications.",
    ],
    highlights: [
      "**Dual-Authentication Architecture**: Decoupled cross-domain authentication between Vercel and Render utilizing both secure HTTP-only session cookies and `Authorization: Bearer` headers with anti-CSRF `state` parameter validation.",
      "**Sub-Second AI Inference Pipeline**: Server-side Groq Cloud API integration running `llama-3.3-70b-versatile`, delivering near-instant draft generations while keeping private API keys isolated from the browser.",
      "**Strict Tenant & Query Isolation**: Every database operation is strictly scoped to the authenticated `user_id` via SQLAlchemy 2.0 ORM, backed by Neon Serverless PostgreSQL with versioned Alembic database migrations.",
      "**Bespoke Exaggerated Minimalism Design System**: Custom Tailwind CSS v4 design tokens (`#0F172A` primary, `#7CE3FF` accent), Geist typography, 8px spatial grid, GSAP `ScrollTrigger` horizontal canvas, and persistent dark/light theme switching.",
    ],
    techStackTable: [
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
    coverImage: "/images/projects/personamail/personamail-cover.png",
    thumbnail: "/images/projects/personamail/personamail-cover.png",
    screenshots: [
      "/images/projects/personamail/personamail-01.png",
      "/images/projects/personamail/personamail-02.png",
      "/images/projects/personamail/personamail-03.png",
      "/images/projects/personamail/personamail-04.png",
      "/images/projects/personamail/personamail-05.png",
      "/images/projects/personamail/personamail-06.png",
      "/images/projects/personamail/personamail-07.png",
      "/images/projects/personamail/personamail-08.png",
      "/images/projects/personamail/personamail-09.png",
      "/images/projects/personamail/personamail-10.png",
      "/images/projects/personamail/personamail-11.png",
      "/images/projects/personamail/personamail-12.png",
      "/images/projects/personamail/personamail-13.png",
      "/images/projects/personamail/personamail-14.png",
    ],
    galleryAspectRatio: "16/10",
    technologies: [
      "Next.js 16",
      "FastAPI",
      "Python",
      "Groq AI",
      "PostgreSQL",
      "Tailwind CSS v4",
      "TypeScript",
    ],
    liveUrl: "https://github.com/marcrommelagravante",
    githubUrl: "https://github.com/marcrommelagravante",
    featured: true,
    isPlaceholder: false,
  },
  {
    slug: "satori",
    title: "Satori",
    tag: "AI Knowledge Workspace",
    summary:
      "A grounded AI knowledge and document intelligence workspace built for teams, organizations, and small businesses to ingest, vectorize, and search operational documents with verifiable source citations.",
    overview: [
      "A grounded AI knowledge and document intelligence workspace built for teams, organizations, and small businesses. It brings scattered operational documents—such as bylaws, handbooks, policies, and guidelines—into a single platform, eliminating manual file searching and cutting admin overhead so teams find verified answers instantly.",
      "Files come in as PDFs, Word documents, and text files. Satori parses, cleans, chunks, and vectorizes them using Google Gemini embeddings stored directly in PostgreSQL with `pgvector`. From there, team members ask natural language questions in a multi-turn chat, inspect exact source passage citations with page numbers to eliminate AI hallucinations, generate analytical cross-document reports, and benchmark retrieval accuracy through a live RAG evaluation playground.",
    ],
    features: [
      "**Multi-Format Ingestion Pipeline**: Automated text extraction, sanitization, and sentence-aware chunking with sliding-window overlap for PDF, DOCX, and TXT files.",
      "**Grounded Conversational RAG Chat**: Multi-turn chat powered by Google Gemini 3.6 Flash, maintaining conversation context with server-side history persistence in PostgreSQL.",
      "**Verifiable Source Provenance**: Interactive inline citation chips (`[1]`, `[2]`) mapping every claim directly to exact source excerpts, document page numbers, and similarity scores.",
      "**Scoped Document Queries**: Ability to target queries across the entire workspace knowledge base or constrain them to specific selected documents.",
      "**Knowledge Hub & Category Browser**: Semantic search and exploration across organizational categories (*Policies & Procedures*, *Technical Docs*, *Reports & Analytics*) with vector index diagnostics.",
      "**Automated AI Reports**: One-click generation of executive document summaries, cross-document policy comparisons, and structured gap analyses.",
      "**RAG Evaluation Playground**: Dedicated experimentation suite tracking real-time telemetry: request latency (p50/p95), cumulative token usage, and automated retrieval accuracy benchmarks.",
      "**Multi-Tenant Workspaces**: Team workspaces with role-based access control (`owner`, `admin`, `member`), one-click workspace switching, and automated default onboarding.",
      "**Dark / Light Responsive Interface**: Accessible UI featuring custom Indigo/Violet design tokens, smooth scroll-reveal animations via Motion, and mobile-friendly layouts.",
    ],
    highlights: [
      "**Custom RAG without Black-Box Abstractions**: Built from first principles directly on PostgreSQL with `pgvector` and `@google/genai`—completely avoiding bloated frameworks like LangChain while maintaining full control over chunking, cosine distance thresholds, and context construction.",
      "**Zero-Trust Multi-Tenant Isolation**: Database and service-level tenant separation enforced on every single query and vector search through server-side authorization guards (`requireWorkspaceMember`).",
      "**Defensive AI Engineering**: In-house prompt-injection sanitization boundaries, magic-byte file signature validation, and sliding-window rate limiters (60 req/min).",
      "**Resilient Model Fallback Architecture**: Primary inference on `gemini-3.6-flash`, automatic failover to `gemini-3.1-flash-lite`, and deterministic local n-gram vector generation for offline CI and testing environments.",
    ],
    techStackTable: [
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
    coverImage: "/images/projects/satori/satori-cover-showcase.png",
    thumbnail: "/images/projects/satori/satori-cover-showcase.png",
    screenshots: [
      "/images/projects/satori/01-product-dashboard.png",
      "/images/projects/satori/02-product-chat.png",
      "/images/projects/satori/03-product-knowledge.png",
      "/images/projects/satori/04-product-chunk-inspector.png",
      "/images/projects/satori/05-product-evaluations.png",
      "/images/projects/satori/06-product-documents.png",
      "/images/projects/satori/07-product-settings.png",
    ],
    galleryAspectRatio: "16/10",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Gemini 3.6 Flash",
      "pgvector",
      "PostgreSQL",
      "Drizzle ORM",
    ],
    liveUrl: "https://github.com/marcrommelagravante/Satori",
    githubUrl: "https://github.com/marcrommelagravante/Satori",
    featured: true,
    isPlaceholder: false,
  },
  {
    slug: "project-four",
    title: "[PROJECT 04 — DEVELOPER TOOLKIT]",
    tag: "Dev tool",
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
    galleryAspectRatio: "16/10",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Gemini API"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/marcrommelagravante",
    featured: true,
    isPlaceholder: true,
  },
];
