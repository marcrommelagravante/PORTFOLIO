import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SideRail } from "@/components/layout/SideRail";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { createPageMetadata } from "@/lib/metadata";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = createPageMetadata({
  path: "/",
});

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem("portfolio-theme-preference");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    var sidebarCollapsed = localStorage.getItem("portfolio-sidebar-collapsed");
    if (sidebarCollapsed === "true") {
      document.documentElement.setAttribute("data-sidebar-collapsed", "true");
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased selection:bg-(--foreground) selection:text-(--background)">
        <ThemeProvider>
          <CustomCursor />
          <SiteHeader />
          <SideRail />
          <div className="sidebar-content-offset flex flex-1 flex-col lg:pl-64">
            <main className="mx-auto w-full max-w-4xl flex-1 px-6 sm:px-8">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
