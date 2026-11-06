import Link from "next/link";
import { SearchTrigger } from "@/components/search/search-trigger";
import { Container, Grid, Mark } from "@/components/swiss/layout";
import { siteConfig } from "@/config/site";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";

/**
 * Top bar on the grid. From 1024px: name (2 cols) · nav items (2 cols each) · résumé, search, theme (2 cols).
 * Below 1024px: name · Search · Menu (full-screen sheet).
 */
export function Header() {
  return (
    <header className="pt-5 lg:pt-10 print:hidden">
      <Container>
        <Grid className="items-baseline border-b-2 border-rule pb-3 text-small">
          <Link
            href="/"
            className="col-span-2 font-bold md:col-span-4 lg:col-span-2"
          >
            {siteConfig.name}
            <Mark className="size-[0.35em]" />
          </Link>
          <nav aria-label="Main" className="hidden lg:contents">
            {siteConfig.nav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className="lg:col-span-2"
              >
                {item.title}
              </NavLink>
            ))}
          </nav>
          <div className="hidden justify-end gap-3 whitespace-nowrap lg:col-span-2 lg:col-start-11 lg:flex">
            <NavLink href="/resume">{siteConfig.ui.resume} ↓</NavLink>
            {siteConfig.features.search && (
              <SearchTrigger
                className="hover:text-accent"
                ariaLabel="Search (⌘K)"
              >
                <kbd className="font-sans">⌘K</kbd>
              </SearchTrigger>
            )}
            <ThemeToggle className="hover:text-accent" compact />
          </div>
          <div className="col-span-2 flex justify-end gap-4 md:col-span-4 lg:hidden">
            {siteConfig.features.search && (
              <SearchTrigger className="underline underline-offset-4">
                Search
              </SearchTrigger>
            )}
            <MobileNav />
          </div>
        </Grid>
      </Container>
    </header>
  );
}
