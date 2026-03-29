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
  title: "S. Jyothi Swaroop — AI Product Manager | SwaroopOS",
  description:
    "AI Product Manager and startup co-founder. Builder of 20+ AI-powered digital products across healthcare, education, HR tech, fintech, and supply chain domains. Dubai, UAE.",
  keywords: [
    "AI Product Manager",
    "Jyothi Swaroop",
    "CogniSpace",
    "Dubai",
    "Portfolio",
  ],
  authors: [{ name: "S. Jyothi Swaroop" }],
  openGraph: {
    title: "S. Jyothi Swaroop — AI Product Manager",
    description: "Builder of 20+ AI products across 5 domains",
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
