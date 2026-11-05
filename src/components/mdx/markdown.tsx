import { MDXContent } from "@content-collections/mdx/react";
import { cn } from "@/lib/cn";
import { mdxComponents } from "./components";

/** Renders MDX compiled at build time, with Swiss prose styles and custom components. */
export function Markdown({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  return (
    <div className={cn("prose-swiss", className)}>
      <MDXContent code={code} components={mdxComponents} />
    </div>
  );
}
