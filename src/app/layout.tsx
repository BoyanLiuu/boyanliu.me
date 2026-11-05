import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { GridOverlay } from "@/components/swiss/grid-overlay";
import { siteConfig } from "@/config/site";
import { feedTypes } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-inter-tight",
  display: "swap",
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
      className={`${inter.variable} ${interTight.variable}`}
      suppressHydrationWarning
    >
      <body id="top">
        <a
          href="#main"
          className="sr-only fixed top-2 left-2 z-[60] bg-accent px-3 py-2 text-paper focus:not-sr-only"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main id="main">{children}</main>
          <Footer />
          {process.env.NODE_ENV === "development" && <GridOverlay />}
        </ThemeProvider>
      </body>
    </html>
  );
}
