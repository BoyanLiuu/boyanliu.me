"use client";

export const OPEN_SEARCH_EVENT = "site:open-search";

/** Opens the single SearchDialog mounted in the layout. */
export function SearchTrigger({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT))}
    >
      {children}
    </button>
  );
}
