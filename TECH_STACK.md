# Technical Stack & Engineering Capabilities

> **Marc Rommel Agravante** — Computer Engineering Student & Full-Stack Developer  
> Verified compilation of technologies, frameworks, runtimes, AI models, hardware platforms, and developer tooling across production portfolio projects.

---

## 1. Executive Summary

This document compiles the complete technology stack utilized across four core production-grade applications:
1. **AR-DUINO-M** — Augmented Reality electronics laboratory & digital twin simulator (Unity 6, AR Foundation, Vuforia, Arduino C++, Blender).
2. **Satori** — Grounded AI knowledge workspace with verifiable source provenance & RAG telemetry (Next.js 16, pgvector, Gemini 3.6 Flash, Drizzle).
3. **PersonaMail** — Adaptive relationship-aware AI email assistant & communication workspace (FastAPI, LLaMA 3.3 70B via Groq, Next.js 16, PostgreSQL).
4. **Salo sa Antipolo** — Full-lifecycle restaurant point-of-sale & management platform (Vanilla ES6+, Cloud Firestore real-time sync, Firebase Auth, edge CDN).

---

## 2. Master Tech Stack by Architecture Layer

### Frontend & User Interface
| Technology | Version / Specifics | Applied In | Purpose & Key Role |
| :--- | :--- | :--- | :--- |
| **Next.js** | `16 (App Router, Turbopack)` & `15` | Satori, PersonaMail, AR-DUINO-M Web, Portfolio | Server Components, Server Actions, Route Handlers, fast HMR |
| **React** | `19.0.0` | Satori, PersonaMail, AR-DUINO-M Web, Portfolio | Core component hierarchy, concurrent features, modern hooks |
| **TypeScript** | `5.8+` | Satori, PersonaMail, AR-DUINO-M Web, Portfolio | End-to-end static type safety, DTO validation, interface contracts |
| **Vanilla JavaScript** | `ES6+ Modules` | Salo sa Antipolo | Zero-build production runtime, lightweight native DOM manipulation |
| **Tailwind CSS** | `v4.1.0` | Satori, PersonaMail, AR-DUINO-M Web, Portfolio | CSS-first modern theme variables, responsive layouts, utility tokens |
| **HTML5 / CSS3** | `Semantic Architecture, Grid, Flexbox` | Salo sa Antipolo, Portfolio | Custom responsive grids, CSS variables, native accessible layouts |
| **Radix UI** | Accessible Primitives | Satori | Accessible modal dialogs, dropdowns, and headless UI controls |
| **Motion (`motion`)** | Modern Framer Motion | Satori, Portfolio | Declarative layout transitions, spring physics, and scroll reveals |
| **GSAP 3** | `ScrollTrigger` | PersonaMail | Smooth timeline scrubbing and horizontal scroll synchronization |
| **Lenis** | Smooth Scroll Engine | PersonaMail | Inertia-based fluid scrolling for high-end editorial experiences |
| **Lucide React / Icons** | Multi-platform icon library | All Projects | Consistent icon system across web interfaces |
| **next-themes** | Client theme provider | Satori, Portfolio | Instant system/dark/light theme switching without layout flashes |

---

### Backend & API Architecture
| Technology | Version / Specifics | Applied In | Purpose & Key Role |
| :--- | :--- | :--- | :--- |
| **Python** | `3.11+` | PersonaMail | High-performance asynchronous backend service |
| **FastAPI** | Modern Async Web Framework | PersonaMail | Low-latency REST endpoints, OpenAPI auto-docs, ASGI server |
| **Node.js** | `20+ LTS` | Satori, Portfolio | Server-side execution, SSR streaming, background task execution |
| **Next.js Server Actions** | Native RPC | Satori | Type-safe form mutations and direct database operations without REST boilerplate |
| **Next.js Route Handlers** | Web Standard Request/Response | Satori, Portfolio | Edge-ready streaming endpoints and webhook consumers |
| **SQLAlchemy** | `2.0 (Async Engine)` | PersonaMail | Enterprise ORM mapping, scoped queries, connection pooling |
| **Drizzle ORM** | `TypeScript ORM` | Satori | Zero-overhead SQL generation with full type safety |
| **Pydantic** | `v2 (Rust-backed)` | PersonaMail | Ultra-fast data serialization and schema validation |
| **Zod** | `v4` | Satori, Portfolio | Client/server runtime boundary schema validation |
| **Uvicorn** | High-performance ASGI server | PersonaMail | Production Python web worker handling async requests |
| **Alembic** | Migration Management | PersonaMail | Version-controlled database schema migrations |
| **Modular Monolith** | Architecture Pattern | Satori | Domain-driven separation of services with single-deploy simplicity |

---

### Databases, Vector Engines & Real-time
| Technology | Version / Specifics | Applied In | Purpose & Key Role |
| :--- | :--- | :--- | :--- |
| **PostgreSQL** | `Neon Serverless Postgres` | Satori, PersonaMail | Primary relational storage with instant branching and pooled connections |
| **pgvector** | `vector(768)` extension | Satori | Direct database cosine distance search for 768-dimensional embeddings |
| **Google Cloud Firestore** | `v9 Modular Web SDK` | Salo sa Antipolo | Document NoSQL storage with millisecond document writes |
| **Reactive `onSnapshot`** | Bi-directional Realtime Sync | Salo sa Antipolo | Zero-polling live order updates across dining floor, kitchen, and cashier |
| **PostgreSQL Full-Text** | `tsvector` / `tsquery` | Satori | Hybrid keyword and semantic search ranking |
| **Drizzle Kit** | Migration CLI & Studio | Satori | Automatic SQL migration generation and database inspection |

---

### Artificial Intelligence & Embeddings
| Technology | Model / SDK | Applied In | Purpose & Key Role |
| :--- | :--- | :--- | :--- |
| **Google Gemini API** | `@google/genai` SDK | Satori | Multimodal reasoning, structured extraction, and synthesis |
| **gemini-3.6-flash** | Primary Inference LLM | Satori | High-speed grounded conversation and document comprehension |
| **gemini-3.1-flash-lite** | Fallback Inference LLM | Satori | Cost-efficient and resilient failover model |
| **gemini-embedding-001** | `768-dimensional` vectors | Satori | High-density semantic text vectorization for document chunking |
| **Groq Cloud API** | LPU Hardware Acceleration | PersonaMail | Near-instant sub-second token generation for email drafting |
| **Meta LLaMA 3.3 70B** | `llama-3.3-70b-versatile` | PersonaMail | Complex relationship tone adaptation and structured email writing |
| **Custom RAG Pipeline** | In-house Architecture | Satori | Sentence-aware chunking with sliding-window overlap and cosine filtering |
| **Defensive AI Engineering** | Security Boundary Rules | Satori, PersonaMail | Prompt injection sanitization and zero-hallucination variable chips |

---

### Mobile, Augmented Reality & Game Engines
| Technology | Version / Specifics | Applied In | Purpose & Key Role |
| :--- | :--- | :--- | :--- |
| **Unity** | `6000.3.2f1 (Unity 6 LTS)` | AR-DUINO-M | Core 3D engine, physics calculation, and standalone build pipeline |
| **C#** | Modern .NET runtime | AR-DUINO-M | State management, UI controllers, and simulation maths |
| **Universal Render Pipeline** | `URP 17.3` | AR-DUINO-M | High-performance mobile PBR shading and optimized draw calls |
| **PTC Vuforia Engine** | `11.4` | AR-DUINO-M | Optical 2D image target recognition for 29 electronic components |
| **Unity AR Foundation** | `6.3` | AR-DUINO-M | Cross-platform AR abstraction for horizontal plane detection |
| **Google ARCore XR** | `6.3` | AR-DUINO-M | Android 6-DoF spatial tracking, feature points, and ground raycasting |
| **Apple ARKit XR** | `6.3` | AR-DUINO-M | iOS device tracking and plane surface anchors |
| **Android NDK / IL2CPP** | `ARM64 compilation` | AR-DUINO-M | Compiles C# directly to native machine code for maximum mobile FPS |
| **UGUI 2.0 & TextMeshPro** | Vector UI system | AR-DUINO-M | Crisp world-space annotations, dials, and interactive breadboard HUD |

---

### Hardware Emulation, Embedded Systems & 3D Modeling
| Technology | Model / Tool | Applied In | Purpose & Key Role |
| :--- | :--- | :--- | :--- |
| **Arduino Uno R3** | `ATmega328P` MCU | AR-DUINO-M | Emulated 16MHz 8-bit AVR microcontroller with digital & analog I/O |
| **Embedded C++** | Arduino Wiring dialect | AR-DUINO-M | Virtual IDE sketch parsing, compile simulation, and register logic |
| **Circuit Math Engine** | Ohm's & Kirchhoff's laws | AR-DUINO-M | Real-time ADC (10-bit), PWM duty cycle (0-255), and voltage drops |
| **Procedural Wire Generator** | Custom Bezier curves | AR-DUINO-M | Dynamic jumper wire curves with real-time physics slack |
| **Breadboard Snap Matrix** | 830-point spatial grid | AR-DUINO-M | Magnetic component snapping with terminal strips and power rails |
| **Actuators & Sensors** | Real component twins | AR-DUINO-M | L298N Dual H-Bridge, SG90 Servo, HC-SR04 Ultrasonic, 16x2 LCD |
| **Blender 5.0** | 3D Modeling & CAD | AR-DUINO-M | Custom low-poly PBR component assets, UV unwrapping, and textures |
| **3D Asset Formats** | `GLTF / GLB`, `FBX` | AR-DUINO-M | Compact binary 3D meshes optimized for mobile rendering |

---

### Authentication, Security & Cloud Infrastructure
| Technology | Mechanism | Applied In | Purpose & Key Role |
| :--- | :--- | :--- | :--- |
| **Auth.js (NextAuth v5)** | Session Engine | Satori | Edge-compatible session management and OAuth provider handling |
| **Firebase Auth** | `firebase/auth` SDK | Salo sa Antipolo | Multi-portal authentication for Waiter, Cashier, and Admin roles |
| **Google OAuth 2.0** | Identity Federation | Satori, PersonaMail | Frictionless single sign-on with profile verification |
| **JWT (`python-jose`)** | Cryptographic tokens | PersonaMail | Stateless cross-origin API authorization between Vercel and Render |
| **Dual-Cookie + Bearer Auth** | Hybrid Security Architecture | PersonaMail | Secure HTTP-only cookie persistence paired with Bearer header fallback |
| **Role-Based Access Control** | Client/Server Route Guards | Salo sa Antipolo, Satori | Fine-grained permission checks (`owner`, `admin`, `cashier`, `member`) |
| **Sliding-Window Rate Limiter** | In-memory limiter | Satori | DDOS and API abuse prevention (60 req/min per tenant) |
| **Vercel & Edge Network** | Serverless Cloud Hosting | Satori, PersonaMail, AR-DUINO-M Web, Portfolio | Global edge delivery, serverless SSR, and automatic branch previews |
| **Render** | Managed Cloud Services | PersonaMail | Dedicated containerized ASGI Python API backend hosting |
| **Firebase Hosting** | Global Edge CDN | Salo sa Antipolo | Fast static asset delivery and edge routing rules |
| **GitHub Actions** | CI/CD Automation | PersonaMail, Satori, Portfolio | Automated linting, type-checking, and build verification |
| **@vercel/blob** | Cloud Object Storage | Satori | Secure PDF, DOCX, and TXT file uploads |
| **unpdf & mammoth** | Document Parsers | Satori | Client/server text extraction for binary PDF and DOCX files |

---

## 3. Project-by-Project Verified Tech Stacks

### 1. AR-DUINO-M
*Interactive Augmented Reality Electronics Laboratory & Digital Twin Simulator*

```
Category                Technologies
─────────────────────────────────────────────────────────────────────────────────────────────────
Mobile Application      Unity 6000.3.2f1 (Unity 6 LTS), C#, Universal Render Pipeline (URP 17.3),
                        UGUI 2.0, TextMeshPro, Android NDK / IL2CPP (ARM64)

Augmented Reality       PTC Vuforia Engine 11.4, Unity AR Foundation 6.3, Google ARCore XR 6.3,
                        Apple ARKit XR 6.3

Circuit & Simulation    Custom Bezier wire generator, 830-point breadboard snap matrix,
                        ADC/PWM math engine, Mock IDE compiler runner

Web Companion           Next.js 15, React 19, TypeScript, Tailwind CSS, Vercel Edge Network

3D Modeling & CAD       Blender 5.0, low-poly PBR assets, GLTF/GLB, FBX

Hardware Emulation      Arduino Uno R3 (ATmega328P), L298N Dual H-Bridge, SG90 Servo,
                        HC-SR04 Ultrasonic, 16x2 LCD
```

---

### 2. Satori
*Grounded AI Knowledge & Document Intelligence Workspace*

```
Category                Technologies
─────────────────────────────────────────────────────────────────────────────────────────────────
Frontend                Next.js 16 (App Router, Turbopack), React 19, TypeScript 5, Tailwind CSS 4,
                        Radix UI, Motion (motion), Lucide React, next-themes

Backend & Infra         Next.js Server Actions & Route Handlers, Modular Monolith architecture,
                        Vercel deployment, Node.js 20+

Database & Vector       PostgreSQL (Neon Serverless), pgvector (vector(768)), Drizzle ORM,
                        Drizzle Kit, PostgreSQL full-text search (tsvector)

AI & Embeddings         Google Gemini API (@google/genai), gemini-3.6-flash, gemini-3.1-flash-lite,
                        gemini-embedding-001 (768-dim)

Documents & Storage     unpdf, mammoth, @vercel/blob, local filesystem storage adapter

Auth & Security         Auth.js (NextAuth v5), Google OAuth 2.0, Zod 4, custom sliding-window
                        rate limiter, prompt boundary defense

Observability & Testing In-house RAG Evaluation suite, Golden Benchmark Datasets,
                        Drizzle migration scripts, Vitest/Node test harnesses
```

---

### 3. PersonaMail
*Relationship-Aware AI Email Assistant & Adaptive Communication Workspace*

```
Category                Technologies
─────────────────────────────────────────────────────────────────────────────────────────────────
Frontend                Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4,
                        GSAP 3 (ScrollTrigger), Lenis, Lucide React

Backend & Infra         FastAPI, Python 3.11+, SQLAlchemy 2.0, Pydantic v2, Uvicorn, Alembic

Database                PostgreSQL via Neon (Serverless Postgres with connection pooling)

AI                      Groq Cloud API, Meta LLaMA 3.3 70B (llama-3.3-70b-versatile)

Authentication          Google OAuth 2.0, JWT (python-jose), Dual Cookie + Bearer Header Auth,
& Security              CSRF State Verification

Deployment & Hosting    Vercel (Frontend), Render (Backend), Neon (Database), GitHub Actions
```

---

### 4. Salo sa Antipolo
*Restaurant Point-of-Sale (POS) & Operational Management System*

```
Category                Technologies
─────────────────────────────────────────────────────────────────────────────────────────────────
Frontend                Vanilla JavaScript (ES6+ Modules), HTML5 Semantic Architecture,
                        Custom Responsive CSS3 (CSS Grid, Flexbox, CSS Variables)

Backend & Infra         Google Firebase Platform, Firebase Hosting, Global Edge CDN

Database & Realtime     Google Cloud Firestore (v9 Modular SDK), Reactive onSnapshot
Engine                  Bi-directional Sync

Authentication          Firebase Authentication (firebase/auth), Role-Based Access Control
& Security              (RBAC), Route Guards

Design & Typography     Lucide Icons, FontAwesome 6, Google Fonts (Playfair Display, Inter),
                        Custom Gold-on-Dark Luxury Theme

Calculations & Export   Philippine RA 9994 / RA 10754 Statutory Discount & VAT Exemption Engine,
                        Client-side CSV Export
```

---

## 4. Codebase Linkages

The verified data compiled above is actively implemented across the portfolio codebase:

- **Source Data**: [`src/content/skills.ts`](src/content/skills.ts) — exports `skillCategories`, `projectTechStacks`, and `stackPageHeader`.
- **Project Case Studies**: [`src/content/projects.ts`](src/content/projects.ts) — contains the `techStackTable` for all four projects.
- **Dedicated Stack Page**: [`src/app/stack/page.tsx`](src/app/stack/page.tsx) — renders `/stack` with full SEO metadata and `h1` header.
- **Interactive Component**: [`src/components/sections/StackSection.tsx`](src/components/sections/StackSection.tsx) — handles both "All Technologies" category view and "By Project" breakdown.
- **Homepage Integration**: [`src/components/home/SkillsPreview.tsx`](src/components/home/SkillsPreview.tsx) — renders the Stack section on the homepage.

