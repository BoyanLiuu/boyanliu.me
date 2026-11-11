import { monogram } from "@/lib/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Browser-tab icon: the author's initials on an accent circle (generated at build time). */
export default function Icon() {
  return monogram({ size: size.width, shape: "circle" });
}
