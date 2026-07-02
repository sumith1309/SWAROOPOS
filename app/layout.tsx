import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://swaroopos.vercel.app"),
  title: "Jyothi Swaroop S — AI Engineer | AI and Digital Transformation Consultant",
  description:
    "I build production systems that businesses run on. AI Engineer and AI & Digital Transformation Consultant in Dubai — solo-built multi-tenant HRMS live with 3 organizations and 80+ daily users, live client sites, agent systems. Human-led, AI-accelerated delivery.",
  keywords: [
    "AI Engineer",
    "AI Transformation Consultant",
    "Digital Transformation",
    "Forward Deployed Engineer",
    "Jyothi Swaroop S",
    "SwaroopOS",
    "Dubai",
    "Portfolio",
  ],
  authors: [{ name: "Jyothi Swaroop S" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Jyothi Swaroop S — AI Engineer | AI and Digital Transformation Consultant",
    description:
      "I build production systems that businesses run on. Solo-built HRMS live with 3 organizations and 80+ daily users · live client sites · AI agent systems. Dubai, UAE.",
    url: "/",
    siteName: "SwaroopOS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jyothi Swaroop S — AI Engineer | AI and Digital Transformation Consultant",
    description:
      "I build production systems that businesses run on. Solo-built HRMS live with 80+ daily users · live client sites · AI agent systems.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Default wallpaper — fetch early so the starfield paints fast */}
        <link rel="preload" as="image" href="/wallpapers/deep-blue.jpg" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
