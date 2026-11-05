/**
 * Near-monochrome Shiki themes: ink text, red keywords, muted comments.
 * Contrast on the code background: light ≥ 6.4:1, dark ≥ 6.6:1 (WCAG AA).
 */
const scopes = {
  comment: ["comment", "punctuation.definition.comment", "string.comment"],
  keyword: [
    "keyword",
    "storage",
    "storage.type",
    "storage.modifier",
    "keyword.operator.new",
    "keyword.control",
    "variable.language",
  ],
};

function theme(
  name: string,
  type: "light" | "dark",
  ink: string,
  keyword: string,
  comment: string,
  bg: string,
) {
  return {
    name,
    type,
    colors: { "editor.foreground": ink, "editor.background": bg },
    tokenColors: [
      { settings: { foreground: ink } },
      {
        scope: scopes.comment,
        settings: { foreground: comment, fontStyle: "italic" },
      },
      { scope: scopes.keyword, settings: { foreground: keyword } },
    ],
  };
}

export const swissLight = theme(
  "swiss-light",
  "light",
  "#000000",
  "#b3000c",
  "#555555",
  "#f2f2f2",
);
export const swissDark = theme(
  "swiss-dark",
  "dark",
  "#ffffff",
  "#ff6b62",
  "#a3a3a3",
  "#141414",
);
