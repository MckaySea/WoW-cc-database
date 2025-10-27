import type React from "react";
import type { Metadata } from "next";
import Script from "next/script"; // <-- ADDED
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navigation } from "@/components/navigation";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WoW CC Database - Crowd Control Abilities Reference",
  description:
    "Comprehensive database of World of Warcraft crowd control abilities with DR categories, durations, and class guides",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Analytics />

        {/* Wowhead Tooltips Configuration Script */}
        <Script id="wowhead-config" strategy="afterInteractive">
          {`
            var whTooltips = {
              colorLinks: true,      // Color the link based on item quality
              iconizeLinks: true,    // Show item icon next to the link
              renameLinks: false     // Do not rename links (set to true to use Wowhead's name)
            };
          `}
        </Script>

        {/* Wowhead Tooltips Core Script */}
        <Script
          src="//wow.zamimg.com/js/tooltips.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
