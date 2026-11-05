import Link from "next/link";
import { Container, Grid, Mark } from "@/components/swiss/layout";
import { siteConfig } from "@/config/site";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";

/** Top bar on the grid: name · nav · résumé and theme. Phones get a Menu button instead of the nav. */
export function Header() {
  return (
    <header className="pt-5 lg:pt-10">
      <Container>
        <Grid className="items-baseline border-b-2 border-rule pb-3 text-small">
          <Link
            href="/"
            className="col-span-2 font-bold md:col-span-2 lg:col-span-3"
          >
            {siteConfig.name}
            <Mark className="size-[0.35em]" />
          </Link>
          <nav aria-label="Main" className="hidden md:contents">
            {siteConfig.nav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className="md:col-span-1 lg:col-span-2"
              >
                {item.title}
              </NavLink>
            ))}
          </nav>
          <div className="hidden justify-end gap-4 md:col-span-3 md:flex lg:col-span-3">
            <NavLink href="/resume">{siteConfig.ui.resume} ↓</NavLink>
            <ThemeToggle className="hover:text-accent" />
          </div>
          <MobileNav className="col-span-2 justify-self-end md:hidden" />
        </Grid>
      </Container>
    </header>
  );
}
