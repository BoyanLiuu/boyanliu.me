"use client";

import { useRef, useState, type ComponentProps } from "react";

/** <pre> with a copy-to-clipboard button. Used for every fenced code block. */
export function CodeBlock(props: ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = ref.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="group relative">
      <pre ref={ref} {...props} />
      <button
        type="button"
        onClick={copy}
        className="absolute top-2.5 right-2.5 rounded-full border border-rule bg-paper px-3 py-0.5 text-label font-medium opacity-100 transition-opacity md:opacity-0 md:group-focus-within:opacity-100 md:group-hover:opacity-100"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
