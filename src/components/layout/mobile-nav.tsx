"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { Avatar } from "./avatar";
import { ThemeToggle } from "./theme-toggle";

const isCurrent = (pathname: string, href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);

/**
 * Full-screen menu for phones, built on Radix Dialog (focus trap, Escape to close, scroll lock).
 * The sheet unrolls from the top and its links rise in; the current section is marked.
 */
export const MobileNav = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const items = [{ title: "Home", href: "/" }, ...siteConfig.nav];
  return (
    <Dialog.Root>
      <Dialog.Trigger className={cn(className)}>Menu</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className="menu-sheet fixed inset-0 z-50 flex flex-col bg-night px-5 pt-5 pb-10 text-night-ink focus:outline-none">
          <div className="flex items-center justify-between border-b border-night-rule pb-4 text-small">
            <Dialog.Title className="flex items-center gap-2.5 text-[0.95rem] font-semibold">
              <Avatar size={34} />
              {siteConfig.name}
            </Dialog.Title>
            <Dialog.Close className="rounded-full border border-night-rule px-4 py-2 font-semibold">
              Close
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Site navigation
          </Dialog.Description>
          <nav
            aria-label="Main"
            className="mt-10 flex flex-col gap-1 font-display text-[2.75rem] leading-[1.15] font-semibold tracking-[-0.03em]"
          >
            {items.map((item, index) => {
              const current = isCurrent(pathname, item.href);
              return (
                <Dialog.Close asChild key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "menu-link flex items-center gap-3 transition-colors",
                      current ? "text-night-ink" : "text-night-ink/60",
                    )}
                    style={{ "--i": index } as CSSProperties}
                  >
                    {item.title}
                    {current && (
                      <span
                        aria-hidden
                        className="size-2.5 rounded-full bg-night-accent"
                      />
                    )}
                  </Link>
                </Dialog.Close>
              );
            })}
            <Dialog.Close asChild>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="menu-link text-night-accent"
                style={{ "--i": items.length } as CSSProperties}
              >
                {siteConfig.ui.resume}
              </a>
            </Dialog.Close>
          </nav>
          <div className="mt-auto flex items-center justify-between border-t border-night-rule pt-3 text-small text-night-muted">
            <span className="flex gap-4">
              <a className="py-1.5" href={`mailto:${siteConfig.author.email}`}>
                Email
              </a>
              {siteConfig.social.github && (
                <a className="py-1.5" href={siteConfig.social.github}>
                  GitHub
                </a>
              )}
              {siteConfig.social.linkedin && (
                <a className="py-1.5" href={siteConfig.social.linkedin}>
                  LinkedIn
                </a>
              )}
            </span>
            <ThemeToggle className="py-1.5" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
