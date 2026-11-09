import {
  BookmarkSimpleIcon,
  BriefcaseIcon,
  DownloadSimpleIcon,
  NotePencilIcon,
  UserIcon,
} from "@phosphor-icons/react/ssr";
import Link from "next/link";
import type { ComponentType } from "react";
import { SearchTrigger } from "@/components/search/search-trigger";
import { Pill } from "@/components/ui/pill";
import { siteConfig } from "@/config/site";
import { Avatar } from "./avatar";
import { HeaderShell } from "./header-shell";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";

/** Icons for the known sections; other nav entries show the label only. */
const navIcons: Record<
  string,
  ComponentType<{ size?: number; weight?: "bold" }>
> = {
  "/projects": BriefcaseIcon,
  "/blog": NotePencilIcon,
  "/bookmarks": BookmarkSimpleIcon,
  "/about": UserIcon,
};

const iconButton =
  "grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-wash hover:text-ink";

const SearchIcon = () => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    className="size-[1.15rem]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

/**
 * Floating header: name · segmented nav (centre) · search, theme and résumé.
 * Below 1024px: name · search · Menu (full-screen sheet).
 */
export const Header = () => (
  <HeaderShell>
    <div className="flex flex-1 items-center">
      <Link
        href="/"
        className="flex items-center gap-2.5 text-[0.95rem] font-semibold tracking-[-0.01em]"
      >
        <Avatar size={34} />
        {siteConfig.name}
      </Link>
    </div>
    <nav
      aria-label="Main"
      className="hidden items-center gap-0.5 rounded-full bg-wash p-1 lg:flex"
    >
      {siteConfig.nav.map((item, index) => {
        const Icon = navIcons[item.href];
        return (
          <NavLink
            key={item.href}
            href={item.href}
            homeActive={index === 0}
            className="inline-flex items-center rounded-full px-4 py-2 text-small font-medium text-muted transition-[background-color,color,box-shadow] duration-[180ms] hover:bg-paper hover:text-ink focus-visible:bg-paper data-[active]:bg-paper data-[active]:text-ink data-[active]:shadow-soft"
          >
            {Icon && (
              <span aria-hidden className="nav-icon">
                <Icon size={16} weight="bold" />
              </span>
            )}
            {item.title}
          </NavLink>
        );
      })}
    </nav>
    <div className="hidden flex-1 items-center justify-end gap-1 lg:flex">
      {siteConfig.features.search && (
        <SearchTrigger className={iconButton} ariaLabel="Search (⌘K)">
          <SearchIcon />
        </SearchTrigger>
      )}
      <ThemeToggle className={iconButton} compact />
      <Pill
        href="/resume.pdf"
        size="sm"
        icon={<DownloadSimpleIcon size={17} weight="bold" />}
        className="ml-1.5 text-small"
      >
        {siteConfig.ui.resume}
      </Pill>
    </div>
    <div className="flex items-center gap-1 lg:hidden">
      {siteConfig.features.search && (
        <SearchTrigger className={iconButton} ariaLabel="Search">
          <SearchIcon />
        </SearchTrigger>
      )}
      <MobileNav className="rounded-full bg-wash px-4 py-2 text-small font-semibold" />
    </div>
  </HeaderShell>
);
