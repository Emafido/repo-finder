import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// The premium, futuristic startup font
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

// The gold standard developer font for code blocks
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RepoFinder | Discover Your Next Open Source Contribution",
  description: "A high-speed discovery engine that interfaces with the GitHub API to instantly surface highly-rated open-source repositories.",
  keywords: ["GitHub", "Open Source", "Repositories", "Next.js", "React", "Developer Tools"],
  authors: [{ name: "Emmanuel Imafidon" }],
  creator: "Emmanuel Imafidon",
  openGraph: {
    title: "RepoFinder | Random GitHub Repository Generator",
    description: "Bypass search fatigue. Find your next open-source contribution with a single click.",
    url: "https://open-source-finder-drab.vercel.app/", 
    siteName: "RepoFinder",
    images: [
      {
        url: "/home.png", 
        width: 1200,
        height: 630,
        alt: "RepoFinder Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RepoFinder | Discover Your Next Open Source Contribution",
    description: "A high-speed discovery engine for GitHub repositories.",
    images: ["/home.png"],
  },
  icons: {
    icon: "/favicon.ico",
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
        className={`${spaceGrotesk.className} ${jetBrainsMono.variable} antialiased bg-black text-zinc-100 selection:bg-indigo-500/30`}
      >
        {children}
      </body>
    </html>
  );
}