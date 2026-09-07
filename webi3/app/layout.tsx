import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Webi3 Quantum Lab",
  description: "The brain is online. The body is coming.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#0A0A0F] font-sans text-[#EDEDF2] antialiased">
        <header className="sticky top-0 z-50 border-b border-[#8B5CF6]/20 bg-[#0A0A0F]/80 backdrop-blur-sm">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="font-display text-2xl font-bold text-[#8B5CF6]">
              Webi3
            </Link>
            <nav className="hidden gap-8 text-[#EDEDF2] md:flex">
              <a href="/chat" className="hover:text-[#8B5CF6]">Launch \$hoX</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="mt-20 border-t border-[#8B5CF6]/20 bg-[#0A0A0F]">
          <div className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-[#A1A1B5]">
            © 2026 WEBI3 QUANTUM LAB NZ LIMITED · Company No. 9403050 · Auckland, New Zealand
          </div>
        </footer>
      </body>
    </html>
  );
}
