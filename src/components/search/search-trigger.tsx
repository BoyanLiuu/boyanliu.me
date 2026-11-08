"use client";

export const OPEN_SEARCH_EVENT = "site:open-search";

/** Opens the single SearchDialog mounted in the layout. */
export const SearchTrigger = ({
  className,
  children,
  ariaLabel,
}: {
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) => (
  <button
    type="button"
    className={className}
    aria-label={ariaLabel}
    title={ariaLabel}
    onClick={() => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT))}
  >
    {children}
  </button>
);
