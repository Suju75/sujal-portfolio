import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AmbientField } from "@/components/ambient-field";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { profile } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} — ${profile.discipline}`,
  description: profile.subhead,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${profile.name} — ${profile.discipline}`,
    description: profile.headline,
    url: "/",
    siteName: profile.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.discipline}`,
    description: profile.headline,
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
