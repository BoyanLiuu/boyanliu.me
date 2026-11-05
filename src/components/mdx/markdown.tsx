import { MDXContent } from "@content-collections/mdx/react";
import type { ComponentProps } from "react";

type Components = ComponentProps<typeof MDXContent>["components"];

/** Renders MDX compiled at build time by content-collections. Styled components arrive in checkpoint 2.3. */
export function Markdown({
  code,
  components,
}: {
  code: string;
  components?: Components;
}) {
  return <MDXContent code={code} components={components} />;
}
