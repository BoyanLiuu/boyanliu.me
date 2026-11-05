/** Gives GFM task-list checkboxes an accessible name ("Completed" / "Not completed"). */
type Node = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: Node[];
};

export default function rehypeLabelCheckboxes() {
  const walk = (node: Node) => {
    if (
      node.type === "element" &&
      node.tagName === "input" &&
      node.properties?.type === "checkbox"
    ) {
      node.properties.ariaLabel = node.properties.checked
        ? "Completed"
        : "Not completed";
    }
    node.children?.forEach(walk);
  };
  return (tree: Node) => walk(tree);
}
