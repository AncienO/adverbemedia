import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Dancing_Script, EB_Garamond } from "next/font/google"; // Added fonts
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

import { Great_Vibes } from "next/font/google"; // Import Great Vibes
import { CursorFollower } from "@/components/ui/cursor-follower";
import { SWRegistration } from "@/components/shared/sw-registration";

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Adverbe",
  description: "Original podcast shows documenting the ideas, industries, and people shaping Africa. Music, marketing, leadership, faith, sport, and culture. A Vermé Studios company.",
  icons: {
    icon: '/adverbe-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${dancingScript.variable} ${greatVibes.variable} ${ebGaramond.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <SWRegistration />
        <CursorFollower />
        {children}
      </body>
    </html>
  );
}
