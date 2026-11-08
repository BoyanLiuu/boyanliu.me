import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** tailwind-merge that knows our custom text sizes, so `text-h1` and `text-ink` are not treated as conflicts. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "section",
            "h1",
            "h2",
            "h3",
            "lead",
            "body",
            "small",
            "label",
          ],
        },
      ],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
