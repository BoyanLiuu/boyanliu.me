"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { Avatar } from "./avatar";
import { ThemeToggle } from "./theme-toggle";

/** Full-screen menu for phones, built on Radix Dialog (focus trap, Escape to close, scroll lock). */
export const MobileNav = ({ className }: { className?: string }) => (
  <Dialog.Root>
    <Dialog.Trigger className={cn(className)}>Menu</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Content className="fixed inset-0 z-50 flex flex-col bg-night px-5 pt-5 pb-10 text-night-ink focus:outline-none">
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
          <Dialog.Close asChild>
            <Link href="/">Home</Link>
          </Dialog.Close>
          {siteConfig.nav.map((item) => (
            <Dialog.Close asChild key={item.href}>
              <Link href={item.href}>{item.title}</Link>
            </Dialog.Close>
          ))}
          <Dialog.Close asChild>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-night-accent"
            >
              {siteConfig.ui.resume}
            </a>
          </Dialog.Close>
        </nav>
        <div className="mt-auto flex items-center justify-between border-t border-night-rule pt-4 text-small text-night-muted">
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
