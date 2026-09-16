import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AmbientField } from "@/components/ambient-field";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { profile } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.discipline}`,
  description: profile.subhead,
  openGraph: {
    title: `${profile.name} — ${profile.discipline}`,
    description: profile.headline,
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="relative min-h-screen antialiased">
        <AmbientField />
        <Nav />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
