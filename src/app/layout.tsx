import type { Metadata } from "next";
import { geo, hennyPenny, jainiPurva, monda, tradeWinds, vt323 } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "TerraText",
  description:
    "Educational word game. Play by matching plants and animals to environmental habitats using scientific clues. Made using React and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`          
        ${geo.variable}
        ${hennyPenny.variable}
        ${jainiPurva.variable}
        ${monda.variable}
        ${tradeWinds.variable}
        ${vt323.variable}
      `}
    >
      <body>{children}</body>
    </html>
  );
}
