import type React from "react";
import type { Metadata } from "next";
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
      </body>
    </html>
  );
}
