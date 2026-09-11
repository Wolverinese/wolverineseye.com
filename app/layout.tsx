import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wolverines Eye",
  description: "The canonical front door of the Wolverines Eye ecosystem.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
