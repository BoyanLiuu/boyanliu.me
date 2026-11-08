"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Toggle between light and dark (icon, plus a text label unless `compact`). Renders a stable placeholder until mounted to avoid a hydration mismatch. */
export function ThemeToggle({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      className={className}
      title={compact ? "Toggle light / dark theme" : undefined}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} theme`
          : "Toggle theme"
      }
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="inline-block size-[1.15rem] align-[-0.2em]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
      </svg>
      {!compact && (
        <span className="ml-1.5">
          {mounted ? (isDark ? "Light" : "Dark") : "Theme"}
        </span>
      )}
    </button>
  );
}
