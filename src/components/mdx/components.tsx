import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { CodeBlock } from "./code-block";
import { Playground, YouTube } from "./embeds";

/** Internal links use next/link; external links open normally with safe rel attributes. */
function Anchor({ href = "", ...props }: ComponentProps<"a">) {
  if (href.startsWith("/") || href.startsWith("#"))
    return <Link href={href} {...props} />;
  return <a href={href} rel="noopener noreferrer" {...props} />;
}

/** A highlighted note. Usage in MDX: <Callout title="Note">…</Callout> */
export function Callout({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="rounded-card border-l-[3px] border-accent bg-wash px-5 py-4">
      {title && (
        <p className="mb-1 text-small font-semibold text-accent">{title}</p>
      )}
      <div className="[&>*+*]:mt-3">{children}</div>
    </aside>
  );
}

/** An image with a caption label. Usage in MDX: <Figure src="/…" alt="…" caption="Fig. 1 — …" /> */
export function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element -- MDX images have unknown dimensions */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full rounded-card border border-rule"
      />
      {caption && (
        <figcaption className="mt-2 text-label text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export const mdxComponents = {
  a: Anchor,
  pre: CodeBlock,
  Callout,
  Figure,
  YouTube,
  Playground,
};
