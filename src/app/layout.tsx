import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Dancing_Script, EB_Garamond } from "next/font/google";
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

import { Great_Vibes } from "next/font/google";
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
    icon: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/Adverbe%20logo%202.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NJ245443');` }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${dancingScript.variable} ${greatVibes.variable} ${ebGaramond.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NJ245443"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <SWRegistration />
        <CursorFollower />
        {children}
      </body>
    </html>
  );
}
// import type { Metadata } from "next";
// import { Geist, Geist_Mono, Inter, Dancing_Script, EB_Garamond } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
// });

// const dancingScript = Dancing_Script({
//   variable: "--font-dancing-script",
//   subsets: ["latin"],
// });

// const ebGaramond = EB_Garamond({
//   variable: "--font-eb-garamond",
//   subsets: ["latin"],
// });

// import { Great_Vibes } from "next/font/google";
// import { CursorFollower } from "@/components/ui/cursor-follower";
// import { SWRegistration } from "@/components/shared/sw-registration";

// const greatVibes = Great_Vibes({
//   weight: "400",
//   variable: "--font-great-vibes",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "The Adverbe",
//   description: "Original podcast shows documenting the ideas, industries, and people shaping Africa. Music, marketing, leadership, faith, sport, and culture. A Vermé Studios company.",
//   icons: {
//     icon: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/Adverbe%20logo%202.webp',
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${dancingScript.variable} ${greatVibes.variable} ${ebGaramond.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
//       >
//         <SWRegistration />
//         <CursorFollower />
//         {children}
//       </body>
//     </html>
//   );
// }
