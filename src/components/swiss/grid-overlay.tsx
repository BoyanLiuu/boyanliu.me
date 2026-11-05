"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Container, Grid } from "./layout";

/** Development aid: press Ctrl+G to show the 12/8/4 column grid over the page. */
export function GridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "g") {
        event.preventDefault();
        setVisible((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!visible) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <Container className="h-full">
        <Grid className="h-full">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className={cn(
                "h-full border-x border-accent/30 bg-accent/10",
                i >= 4 && "hidden md:block",
                i >= 8 && "md:hidden lg:block",
              )}
            />
          ))}
        </Grid>
      </Container>
    </div>
  );
}
