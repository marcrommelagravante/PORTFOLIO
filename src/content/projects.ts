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
    "Web, mobile, and AI applications I've designed and built. Select a project to read the case study.",
  groupLabel: "Personal projects",
  hint: "Hover a project to preview. Click to read the case study.",
  ctaLabel: "View Project",
  coverPlaceholderLabel: "Cover screenshot goes here",
} as const;

/**
 * Portfolio projects.
 */
export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "ar-duino-m",
    title: "AR-DUINO-M",
    tag: "Augmented Reality",
    summary:
      "An Augmented Reality electronics lab and digital twin simulator for engineering and STEM students.",
    overview: [
      "Built for engineering and STEM classes, AR-DUINO-M gives students a 3D prototyping environment to practice breadboard wiring, microcontroller programming, and robotics without risking damaged parts or running into lab equipment shortages.",
      "Students open optical markers on the companion web app (or print them out) and scan them with an Android phone to spawn 3D component twins with live pinouts. They wire circuits on an 830-tie-point virtual breadboard, inspect and compile C++ sketches in a built-in Mock Arduino IDE, and test their builds—from blinking LEDs and PWM potentiometer dimming to driving an L298N dual H-bridge RC car across real floor planes.",
    ],
    features: [
      "**Interactive 3D breadboard**: 830 magnetic snap-to-grid tie-points, terminal strips (*a–j*), and +/- power bus rails.",
      "**Procedural jumper wires**: Real-time Bezier curves that slacken and move as components shift.",
      "**Optical AR Target Library**: 29 trackable electronic components across 6 categories (Microcontrollers, Sensors, Actuators, Displays, Inputs, Passives).",
      "**Dual-screen web companion**: High-contrast tracking targets designed to be scanned directly off a laptop or monitor without printing.",
      "**In-app Mock Arduino IDE**: Sketch inspection, syntax checks, compile states, and simulated firmware uploads.",
      "**Real-time circuit simulation**: Computes analog voltage dividers, 10-bit ADC values, PWM duty cycles, and LED states.",
      "**Tabletop and floor AR driving mode**: Uses AR Foundation plane detection and on-screen joystick controls to drive an L298N RC car.",
      "**9-step guided tutorial**: 3D world-space pointer arrows, component highlights, and wiring checkpoints.",
    ],
    highlights: [
      "**\"Wire → Code → Upload → Test\" loop**: Mirrors physical lab work by requiring students to wire the circuit, check the C++ sketch in the virtual IDE, and run a firmware upload before hardware outputs turn on.",
      "**Hybrid AR pipeline**: Pairs PTC Vuforia Engine (11.4) for 2D optical marker recognition with Unity AR Foundation (6.3) and ARCore for 6-DoF plane tracking and surface raycasting.",
      "**100% offline standalone APK**: All 29 3D models, Vuforia datasets, and circuit simulation logic run on-device without an internet connection or cloud backend.",
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
    coverImage: "/images/projects/ar-duino/ar-duino-cover.png",
    thumbnail: "/images/projects/ar-duino/ar-duino-cover.png",
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
    liveUrl: "https://ar-duino-m.vercel.app/",
    githubUrl: "https://github.com/marcrommelagravante",
    featured: true,
    isPlaceholder: false,
  },
  {
    slug: "satori",
    title: "Satori",
    tag: "AI Knowledge Workspace",
    summary:
      "An AI document workspace for teams and small businesses to ingest, index, and query internal files with source citations.",
    overview: [
      "Satori gathers scattered internal files—bylaws, handbooks, policies, and operating guides—into one searchable workspace so teams can look up answers against their actual documents instead of digging through folders.",
      "Uploaded PDF, Word, and text files are parsed, cleaned, chunked, and embedded with Google Gemini into PostgreSQL (`pgvector`). Team members can ask questions in a multi-turn chat, click inline citations to check the exact source passage and page number, generate cross-document reports, and test retrieval quality in a built-in RAG evaluation view.",
    ],
    features: [
      "**Multi-format ingestion pipeline**: Text extraction, sanitization, and sentence-aware chunking with sliding-window overlap for PDF, DOCX, and TXT files.",
      "**Grounded RAG chat**: Multi-turn chat using Google Gemini 3.6 Flash with server-side conversation history stored in PostgreSQL.",
      "**Inline source citations**: Interactive citation chips (`[1]`, `[2]`) linking each claim to the source excerpt, page number, and similarity score.",
      "**Scoped document queries**: Search across the full workspace knowledge base or restrict a question to selected files.",
      "**Knowledge Hub & category browser**: Semantic search across organizational categories (*Policies & Procedures*, *Technical Docs*, *Reports & Analytics*) with vector index diagnostics.",
      "**AI document reports**: Generates document summaries, cross-document policy comparisons, and gap analyses.",
      "**RAG evaluation playground**: Tracks request latency (p50/p95), cumulative token usage, and automated retrieval accuracy benchmarks.",
      "**Multi-tenant workspaces**: Role-based access control (`owner`, `admin`, `member`), workspace switching, and default onboarding setup.",
      "**Dark / light responsive UI**: Built with Indigo/Violet design tokens, Motion scroll reveals, and mobile-ready layouts.",
    ],
    highlights: [
      "**Direct PostgreSQL + `pgvector` RAG pipeline**: Built directly on PostgreSQL (`pgvector`) and `@google/genai` without wrapper frameworks, keeping direct control over chunking, cosine distance thresholds, and prompt context assembly.",
      "**Workspace-scoped tenant isolation**: Database and service-level separation enforced on every query and vector search via server-side authorization guards (`requireWorkspaceMember`).",
      "**Input & API safeguards**: Prompt-injection sanitization boundaries, magic-byte file signature checks, and a sliding-window rate limiter (60 req/min).",
      "**Model fallback & offline test vectors**: Uses `gemini-3.6-flash` as primary inference with automatic failover to `gemini-3.1-flash-lite`, plus deterministic local n-gram vectors for offline CI and tests.",
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
    liveUrl: "https://satori-six-eosin.vercel.app",
    githubUrl: "https://github.com/marcrommelagravante/Satori",
    featured: true,
    isPlaceholder: false,
  },
  {
    slug: "personamail",
    title: "PersonaMail",
    tag: "AI Email Assistant",
    summary:
      "A full-stack AI email assistant that adjusts tone, formality, greetings, and structure based on who you're writing to.",
    overview: [
      "Writing to a professor, a client, or a teammate calls for different levels of formality. PersonaMail stores per-contact profiles—relationship role, preferred tone, and background context—so you don't have to re-explain who the recipient is every time you draft a message.",
      "Users can draft new emails from bullet points in Compose, rewrite rough notes in Improve, check grammar and clarity in Review, and save reusable templates. Inference runs on LLaMA 3.3 70B via Groq, and missing specifics are output as bracketed fill-in tags (like `[Project Name]`) rather than guessed facts.",
    ],
    features: [
      "**Contact communication profiles**: Saves relationship roles (Professor, Client, Recruiter, Colleague, Friend), background notes, and per-contact tone preferences (Formal, Direct, Casual, Warm).",
      "**Structured email compose**: Turns short bullet points or goals into a 7-part email (Subject, Greeting, Context, Core Message, Call to Action, Sign-off, Signature).",
      "**Tone rewriter & improver**: Rewrites quick, rough notes into drafts matched to the recipient's profile while keeping your original points.",
      "**Message review & grammar check**: Flags syntax errors, typos, and awkward phrasing before you send.",
      "**Bracketed placeholder tags (`PlaceholderHighlighter`)**: Prompts instruct the model not to invent dates, numbers, or project names, outputting interactive fill-in chips (`[Project Name]`, `[Client Name]`, `[Day of Week]`) instead.",
      "**Live landing-page demo**: Visitors can test the persona switcher and draft output on the landing page before signing in.",
      "**Searchable history & inspect modals**: Activity feed with type filters (*All*, *Compose*, *Improve*, *Review*), one-click copy, and keyboard-accessible dialogs (`role=\"dialog\"`, Esc dismiss, scroll lock).",
      "**Reusable templates**: Email templates that adapt greetings and placeholder variables to the selected contact.",
      "**Google OAuth 2.0 sign-in**: Account selection flow with profile preview cards and sign-out notifications.",
    ],
    highlights: [
      "**Cross-domain dual auth**: Authenticates between the Vercel frontend and Render backend using both HTTP-only session cookies and `Authorization: Bearer` headers with anti-CSRF `state` verification.",
      "**Server-side Groq inference**: Calls `llama-3.3-70b-versatile` through a FastAPI backend so drafts return quickly while API keys stay off the client.",
      "**User-scoped database queries**: Scopes every query to the authenticated `user_id` via SQLAlchemy 2.0 ORM on Neon Serverless PostgreSQL with Alembic migrations.",
      "**Custom Tailwind v4 & GSAP UI**: Uses `#0F172A` primary and `#7CE3FF` accent tokens, Geist typography, an 8px spacing grid, a GSAP `ScrollTrigger` horizontal section, and persistent dark/light themes.",
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
    liveUrl: "https://personamail-coral.vercel.app",
    githubUrl: "https://github.com/marcrommelagravante",
    featured: true,
    isPlaceholder: false,
  },
  {
    slug: "salo-sa-antipolo",
    title: "Salo sa Antipolo",
    tag: "Restaurant POS & Management",
    summary:
      "A real-time restaurant POS and floor management system built for Salo sa Antipolo's servers, kitchen crew, cashiers, and managers.",
    overview: [
      "Built for Salo sa Antipolo, this system connects tableside ordering, kitchen ticket fulfillment, cashier checkout, and floor management in one web app—replacing paper chits and manual bill calculation during busy shifts.",
      "Waiters punch in dine-in or takeout orders on mobile devices at the table. Firebase Firestore `onSnapshot` listeners push those tickets straight to the kitchen display and operations board, sync bills to the cashier register with built-in RA 9994 Senior Citizen and RA 10754 PWD discount/VAT math, and update daily sales and stock counts.",
    ],
    features: [
      "**Mobile tableside ordering**: Touch-friendly waiter view with quick switching between Dine-In (table-assigned) and Takeout orders.",
      "**Live dining floor plan**: Visual table map showing current states (`Available`, `Occupied`, `Preparing`, `Served`, `Walk-in`) across dining zones with seat counts.",
      "**Menu stock & time-window limits**: Dish catalog with live stock counters, daily serve caps (such as 50 servings/day on Pork Sisig), and lunch-hour availability windows (such as Bento specials limited to 11:00 AM – 3:00 PM).",
      "**Kitchen & operations Kanban**: Live ticket board tracking order states (`Pending`, `Preparing`, `Served [Unpaid]`, `Paid [Unserved]`, `Served [Paid]`, `Completed`, `Cancelled`) with elapsed wait-time timers.",
      "**Multi-tender cashier POS**: Checkout terminal supporting Cash, GCash QR, Maya, and Debit/Credit Card payments with automatic change calculation and receipt printing.",
      "**Philippine statutory discount math**: Applies RA 9994 (Senior Citizen) and RA 10754 (PWD) calculations (20% discount on eligible items plus 12% VAT exemption) in one tap.",
      "**Settled invoices ledger**: Shift summary showing daily revenue, settled slip counts, tax deductions, itemized receipts, and CSV export for end-of-shift balancing.",
      "**Menu & floor layout admin**: Admin views to add or edit dishes, update prices, upload photos, adjust table capacities, and reset tables at closing.",
      "**Sales & dish analytics**: Revenue and order-volume breakdowns with custom date filters, top-selling dish rankings, and payment method shares.",
    ],
    highlights: [
      "**Role-based portals (RBAC)**: Separate login flows and route guards (`rbac.js`, `admin-auth.js`) for Waiter, Cashier, and Admin views using Firebase Auth.",
      "**Realtime Firestore sync**: Uses Cloud Firestore `onSnapshot` listeners instead of polling so floor tablets, kitchen screens, and cashier registers stay in sync across devices.",
      "**Zero-build vanilla JS stack**: Written in native ES6 modules and custom CSS without a bundler, paired with Philippine statutory discount calculation logic and deployed on Firebase Hosting.",
    ],
    techStackTable: [
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
    coverImage: "/images/projects/salo-pos/salo-pos-cover.png",
    thumbnail: "/images/projects/salo-pos/salo-pos-cover.png",
    screenshots: [
      "/images/projects/salo-pos/salo-pos-01.png",
      "/images/projects/salo-pos/salo-pos-02.png",
      "/images/projects/salo-pos/salo-pos-03.png",
      "/images/projects/salo-pos/salo-pos-04.png",
      "/images/projects/salo-pos/salo-pos-05.png",
      "/images/projects/salo-pos/salo-pos-06.png",
      "/images/projects/salo-pos/salo-pos-07.png",
      "/images/projects/salo-pos/salo-pos-08.png",
      "/images/projects/salo-pos/salo-pos-09.png",
      "/images/projects/salo-pos/salo-pos-10.png",
      "/images/projects/salo-pos/salo-pos-11.png",
      "/images/projects/salo-pos/salo-pos-12.png",
      "/images/projects/salo-pos/salo-pos-13.png",
    ],
    galleryAspectRatio: "16/9",
    technologies: [
      "Vanilla JavaScript",
      "Firebase Auth",
      "Cloud Firestore",
      "HTML5 / CSS3",
      "Firebase Hosting",
      "RBAC Security",
    ],
    liveUrl: "https://salo-sa-antipolo.web.app",
    githubUrl: "https://github.com/marcrommelagravante/Salo-sa-SD",
    featured: true,
    isPlaceholder: false,
  },
];
