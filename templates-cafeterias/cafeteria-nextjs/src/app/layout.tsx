import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BarraNavegacion } from "@/components/BarraNavegacion/BarraNavegacion";
import { BotonFlotanteFrap } from "@/components/BotonFlotanteFrap/BotonFlotanteFrap";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cafetería Starbucks Style",
  description: "Diseño inspirado en Starbucks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <BarraNavegacion />
        <main>{children}</main>
        <BotonFlotanteFrap />
      </body>
    </html>
  );
}
