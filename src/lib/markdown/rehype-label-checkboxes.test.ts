import { describe, expect, it } from "vitest";
import rehypeLabelCheckboxes from "./rehype-label-checkboxes";

describe("rehypeLabelCheckboxes", () => {
  it("labels checked and unchecked task boxes", () => {
    const box = (checked: boolean) => ({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked } as Record<string, unknown>,
      children: [],
    });
    const done = box(true);
    const open = box(false);
    rehypeLabelCheckboxes()({
      type: "root",
      children: [{ type: "element", tagName: "li", children: [done, open] }],
    });
    expect(done.properties.ariaLabel).toBe("Completed");
    expect(open.properties.ariaLabel).toBe("Not completed");
  });
});
