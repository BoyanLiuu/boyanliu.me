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
    <aside className="border-l-2 border-accent pl-5">
      {title && (
        <p className="mb-1 text-label font-medium uppercase">{title}</p>
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
      <img src={src} alt={alt} loading="lazy" className="w-full" />
      {caption && (
        <figcaption className="mt-2 text-label uppercase">{caption}</figcaption>
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
