import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { BarraNavegacion } from "@/components/BarraNavegacion/BarraNavegacion";
import { BotonFlotanteFrap } from "@/components/BotonFlotanteFrap/BotonFlotanteFrap";
import { PieGlobal } from "@/components/PieGlobal/PieGlobal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
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
    <html lang="es" className={`${inter.variable} ${lora.variable}`}>
      <body>
        <BarraNavegacion />
        <main>{children}</main>
        <PieGlobal />
        <BotonFlotanteFrap />
      </body>
    </html>
  );
}
