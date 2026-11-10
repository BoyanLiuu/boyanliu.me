"use client";

import { track } from "@vercel/analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { useEffect } from "react";
import { markResumeVisit } from "@/lib/analytics";

/** One page-wide listener: a click on any element marked with `data-event` sends that event. */
const ClickEvents = () => {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const marked =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-event]")
          : null;
      if (marked?.dataset.event) track(marked.dataset.event);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
};

/**
 * Cookie-free Vercel Web Analytics: page views (résumé visits filed under /from-resume) and,
 * when `clickEvents` is on (needs Vercel Pro), named link clicks. Rendered only when
 * `features.analytics` is on.
 */
export const Analytics = ({ clickEvents }: { clickEvents: boolean }) => (
  <>
    <VercelAnalytics
      beforeSend={(event) => ({ ...event, url: markResumeVisit(event.url) })}
    />
    {clickEvents && <ClickEvents />}
  </>
);
