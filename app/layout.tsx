import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/layout/CustomCursor";

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
  title: "S. Jyothi Swaroop — Forward Deployed Engineer | SwaroopOS",
  description:
    "I build production systems that businesses run on. Forward Deployed Engineer & AI-transformation consultant in Dubai — solo-built multi-tenant HRMS live with 80+ daily users, shipped client sites, RAG and autonomous-agent systems. Human-led, AI-accelerated delivery.",
  keywords: [
    "Forward Deployed Engineer",
    "AI Engineer",
    "AI Transformation Consultant",
    "Jyothi Swaroop",
    "CogniSpace",
    "Dubai",
    "Portfolio",
  ],
  authors: [{ name: "S. Jyothi Swaroop" }],
  openGraph: {
    title: "S. Jyothi Swaroop — Forward Deployed Engineer",
    description:
      "I build production systems that businesses run on. Solo-built HRMS live with 80+ daily users · client sites · RAG & agent systems. Dubai, UAE.",
    type: "website",
  },
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
      <body>
        {children}
        <CustomCursor />
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
