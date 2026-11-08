"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { SearchItem } from "@/lib/search";
import { OPEN_SEARCH_EVENT } from "./search-trigger";

const groups: { kind: SearchItem["kind"]; heading: string }[] = [
  { kind: "project", heading: "Work" },
  { kind: "post", heading: "Writing" },
  { kind: "bookmark", heading: "Bookmarks" },
  { kind: "page", heading: "Pages" },
  { kind: "topic", heading: "Topics" },
];

/** ⌘K / Ctrl+K command palette. Mounted once; loads /search.json the first time it opens. */
export const SearchDialog = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<SearchItem[] | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_SEARCH_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open || items) return;
    let cancelled = false;
    fetch("/search.json")
      .then((response) => response.json() as Promise<SearchItem[]>)
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, [open, items]);

  const go = (href: string) => {
    setOpen(false);
    if (/^https?:\/\//.test(href))
      window.open(href, "_blank", "noopener,noreferrer");
    else router.push(href);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Search projects and writing"
      overlayClassName="fixed inset-0 z-50 bg-night/40 backdrop-blur-sm"
      contentClassName="fixed inset-x-5 top-[10vh] z-50 mx-auto max-w-2xl overflow-hidden rounded-card border border-rule bg-paper text-ink shadow-lift md:inset-x-8"
    >
      <Command.Input
        placeholder="Search projects, posts and topics…"
        className="w-full border-b border-rule bg-transparent px-5 py-4 text-h3 outline-none placeholder:text-muted"
      />
      <Command.List className="max-h-[60vh] overflow-y-auto p-2">
        <Command.Loading>
          {items === null ? (
            <p className="p-3 text-small text-muted">Loading…</p>
          ) : null}
        </Command.Loading>
        <Command.Empty className="p-3 text-small text-muted">
          No results.
        </Command.Empty>
        {items &&
          groups.map(({ kind, heading }) => {
            const list = items.filter((item) => item.kind === kind);
            if (list.length === 0) return null;
            return (
              <Command.Group
                key={kind}
                heading={heading}
                className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:text-label [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted"
              >
                {list.map((item) => (
                  <Command.Item
                    key={item.href}
                    value={`${item.title} ${item.keywords.join(" ")} ${item.summary ?? ""}`}
                    onSelect={() => go(item.href)}
                    className="flex cursor-pointer items-baseline justify-between gap-4 rounded-sm px-3 py-2.5 data-[selected=true]:bg-wash"
                  >
                    <span className="font-display text-body font-bold">
                      {item.title}
                    </span>
                    {item.summary && (
                      <span className="truncate text-small opacity-70">
                        {item.summary}
                      </span>
                    )}
                  </Command.Item>
                ))}
              </Command.Group>
            );
          })}
      </Command.List>
    </Command.Dialog>
  );
};
