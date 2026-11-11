import { monogram } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon for iOS: full-bleed square, which iOS rounds itself. */
export default function AppleIcon() {
  return monogram({ size: size.width, shape: "square" });
}
