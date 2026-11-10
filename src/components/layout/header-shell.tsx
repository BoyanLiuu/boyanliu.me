"use client";

import { type ReactNode, useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};

/**
 * Sticky header frame. At the top of the page it is a transparent full-width bar;
 * once the page scrolls it narrows into a frosted floating pill. It slides down into place on load.
 */
export const HeaderShell = ({ children }: { children: ReactNode }) => {
  const scrolled = useSyncExternalStore(
    subscribe,
    () => window.scrollY > 24,
    () => false,
  );
  return (
    <header
      data-scrolled={scrolled ? "" : undefined}
      className="group/header enter-down sticky top-0 z-40 px-3 pt-3 print:hidden"
    >
      <div className="header-pill mx-auto flex max-w-[calc(72rem+2rem)] items-center gap-3 rounded-full border border-transparent py-1.5 pr-1.5 pl-3 transition-[max-width,background-color,border-color,box-shadow,padding] duration-[240ms] ease-out group-data-[scrolled]/header:max-w-[56rem] group-data-[scrolled]/header:border-rule group-data-[scrolled]/header:bg-paper/85 group-data-[scrolled]/header:shadow-soft group-data-[scrolled]/header:backdrop-blur-md md:px-4 md:group-data-[scrolled]/header:pr-1.5 md:group-data-[scrolled]/header:pl-3">
        {children}
      </div>
    </header>
  );
};
