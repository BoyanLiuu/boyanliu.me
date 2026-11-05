"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./theme-toggle";

/** Full-screen menu for phones, built on Radix Dialog (focus trap, Escape to close, scroll lock). */
export function MobileNav({ className }: { className?: string }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={cn("underline underline-offset-4", className)}>
        Menu
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className="fixed inset-0 z-50 flex flex-col bg-ink px-5 pt-5 pb-10 text-paper focus:outline-none">
          <div className="flex items-baseline justify-between border-b-2 border-paper pb-3 text-small">
            <Dialog.Title className="font-bold">
              {siteConfig.name}
              <span
                aria-hidden
                className="ml-[0.1em] inline-block size-[0.35em] bg-accent"
              />
            </Dialog.Title>
            <Dialog.Close className="underline underline-offset-4">
              Close ×
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Site navigation
          </Dialog.Description>
          <nav
            aria-label="Main"
            className="mt-10 flex flex-col font-display text-[3.25rem] leading-[1.15] font-bold tracking-[-0.04em]"
          >
            <Dialog.Close asChild>
              <Link href="/">Home</Link>
            </Dialog.Close>
            {siteConfig.nav.map((item) => (
              <Dialog.Close asChild key={item.href}>
                <Link href={item.href}>{item.title}</Link>
              </Dialog.Close>
            ))}
            <Dialog.Close asChild>
              <Link href="/resume" className="text-accent">
                {siteConfig.ui.resume} ↓
              </Link>
            </Dialog.Close>
          </nav>
          <div className="mt-auto flex items-baseline justify-between border-t border-paper pt-4 text-small">
            <span className="flex gap-3">
              <a href={`mailto:${siteConfig.author.email}`}>Email</a>
              {siteConfig.social.github && (
                <a href={siteConfig.social.github}>GitHub</a>
              )}
              {siteConfig.social.linkedin && (
                <a href={siteConfig.social.linkedin}>LinkedIn</a>
              )}
            </span>
            <ThemeToggle />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
