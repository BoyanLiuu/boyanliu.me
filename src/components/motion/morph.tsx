import { type ReactElement, ViewTransition } from "react";

/** Shared-element names: a project's cover and title morph between the Work cards and its case study. */
export const projectMorph = (slug: string) => ({
  cover: `project-cover-${slug}`,
  title: `project-title-${slug}`,
});

/**
 * Shared element for page transitions: when a navigation leaves one element named `name` and
 * lands on another, the browser morphs it from the old position and size to the new one.
 * It only plays as a pair (`default="none"`); styles are `::view-transition-*(.morph…)` in
 * globals.css. `kind="text"` keeps a heading's proportions instead of cropping it like an image.
 * Each name may appear only once per page. The child must be a single element.
 */
export const Morph = ({
  name,
  kind = "image",
  children,
}: {
  name: string;
  kind?: "image" | "text";
  children: ReactElement;
}) => (
  <ViewTransition
    name={name}
    share={kind === "text" ? "morph-text" : "morph"}
    default="none"
  >
    {children}
  </ViewTransition>
);
