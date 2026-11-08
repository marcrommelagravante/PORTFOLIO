import type { Metadata } from "next";
import { Bodoni_Moda, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ContactPanelProvider } from "@/components/contact/ContactPanelProvider";
import { ContactPanel } from "@/components/contact/ContactPanel";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SideRail } from "@/components/layout/SideRail";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { createPageMetadata } from "@/lib/metadata";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      className={`${bodoniModa.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased selection:bg-(--foreground) selection:text-(--background)">
        <ThemeProvider>
          <ContactPanelProvider>
            <SiteHeader />
            <SideRail />
            <div className="sidebar-content-offset flex flex-1 flex-col lg:pl-64">
              <main className="mx-auto w-full max-w-6xl flex-1 px-6 sm:px-8 lg:px-12">
                {children}
              </main>
              <SiteFooter />
            </div>
            <ContactPanel />
          </ContactPanelProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
