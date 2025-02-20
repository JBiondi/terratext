import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TerraText",
  description: "A word game where you match plants and animals to environmental habitats using scientific clues. Made using React and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
