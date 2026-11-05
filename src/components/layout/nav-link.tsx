"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Navigation link that underlines itself on its own section (e.g. /blog and /blog/*). */
export function NavLink({
  href,
  className,
  ...props
}: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "underline-offset-4 hover:text-accent",
        active && "underline decoration-1",
        className,
      )}
      {...props}
    />
  );
}
