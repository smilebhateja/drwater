import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DrWater | Immersive Hydration Store",
  description:
    "Experience hydration technology in interactive 3D. Explore filters, bottles, and RO systems before you buy.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-midnight text-white">
        <div className="relative flex min-h-screen flex-col">
          <header className="flex items-center justify-between px-6 py-5 sm:px-10">
            <a className="text-lg font-semibold tracking-wide" href="/">
              DrWater
            </a>
            <nav className="flex items-center gap-4 text-sm text-white/70">
              <a href="/product/hydro-sport-h2">Hydrogen Bottle</a>
              <a href="/product/glass-balance">Glass Bottle</a>
              <a href="/product/ro-ultra">RO Station</a>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="px-6 py-8 text-xs text-white/40 sm:px-10">
            <p>© {new Date().getFullYear()} DrWater. Experience hydration in motion.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
