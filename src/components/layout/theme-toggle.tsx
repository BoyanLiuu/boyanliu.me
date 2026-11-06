"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Text toggle between light and dark. Renders a stable placeholder until mounted to avoid a hydration mismatch. */
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
      <span aria-hidden>◐</span>{" "}
      {!compact && (mounted ? (isDark ? "Light" : "Dark") : "Theme")}
    </button>
  );
}
