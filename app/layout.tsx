import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wolverines Eye — Make work that endures.",
  description:
    "A living culture and IP house for music, art, technology and ideas held in trust.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#e8e5dc",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
