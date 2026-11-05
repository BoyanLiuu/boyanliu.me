import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "boyanliu.me",
  description: "Portfolio and blog of Shawn Liu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
