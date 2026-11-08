import type { Metadata } from "next";
import { Bricolage_Grotesque, Caveat, DM_Sans } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SearchDialog } from "@/components/search/search-dialog";
import { Analytics } from "@/components/seo/analytics";
import { GridOverlay } from "@/components/swiss/grid-overlay";
import { siteConfig } from "@/config/site";
import { feedTypes } from "@/lib/seo";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});
// Only the photo caption uses it, so it is not preloaded.
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-caveat",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s · ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  alternates: { types: feedTypes },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale.replace("-", "_"),
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${bricolage.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Scroll reveals need JS; without it, show everything. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>.reveal{opacity:1!important;transform:none!important}.reveal-stagger>*{opacity:1!important}</style>",
          }}
        />
        {/* Accent colours from content/site.json (hex, contrast-checked at build). */}
        <style
          dangerouslySetInnerHTML={{
            __html: `html:root{--color-accent:${siteConfig.theme.accent}}html.dark{--color-accent:${siteConfig.theme.accentDark}}`,
          }}
        />
      </head>
      <body id="top" className="bg-night print:bg-paper">
        <a
          href="#main"
          className="sr-only fixed top-2 left-2 z-[60] rounded-full bg-accent px-4 py-2 text-paper focus:not-sr-only"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* The page is a rounded sheet over the dark footer. */}
          <div className="relative z-10 rounded-b-sheet bg-paper print:rounded-none">
            <Header />
            {/* Bottom padding lives on <main>, not the sheet, so the sticky header is never pushed off-screen at the end of the page. */}
            <main id="main" className="pb-24 lg:pb-32 print:pb-0">
              {children}
            </main>
          </div>
          <Footer />
          {siteConfig.features.search && <SearchDialog />}
          <Analytics />
          {process.env.NODE_ENV === "development" && <GridOverlay />}
        </ThemeProvider>
      </body>
    </html>
  );
}
