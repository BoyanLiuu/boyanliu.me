"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * Navigation link for a section (e.g. /blog and /blog/*). On its own section it gets
 * `aria-current="page"` and `data-active`; style the active state with `data-[active]:`.
 * `homeActive` shows it as active on the home page too (visual only, no aria-current),
 * the way the header highlights its first item there.
 */
export const NavLink = ({
  href,
  homeActive = false,
  ...props
}: ComponentProps<typeof Link> & { href: string; homeActive?: boolean }) => {
  const pathname = usePathname();
  const current = pathname === href || pathname.startsWith(`${href}/`);
  const active = current || (homeActive && pathname === "/");
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      data-active={active ? "" : undefined}
      {...props}
    />
  );
};
