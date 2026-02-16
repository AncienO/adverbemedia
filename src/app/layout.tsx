import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Dancing_Script } from "next/font/google"; // Added fonts
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GlobalPlayer } from "@/components/layout/player";
import { AudioProvider } from "@/lib/audio-context";

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

import { Great_Vibes } from "next/font/google"; // Import Great Vibes

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Adverbe",
  description: "Original podcast shows documenting the ideas, industries, and people shaping Africa. Music, marketing, leadership, faith, sport, and culture. A Vermé Studios company.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${dancingScript.variable} ${greatVibes.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <AudioProvider>
          <Header />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <GlobalPlayer />
        </AudioProvider>
      </body>
    </html>
  );
}
