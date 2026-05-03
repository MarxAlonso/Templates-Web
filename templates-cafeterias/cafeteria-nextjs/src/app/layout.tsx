import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { BarraNavegacion } from "@/components/BarraNavegacion/BarraNavegacion";
import { PieGlobal } from "@/components/PieGlobal/PieGlobal";
import { BotonFlotanteFrap } from "@/components/BotonFlotanteFrap/BotonFlotanteFrap";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  display: "swap",
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
    <html lang="es" className={onest.variable}>
      <body>
        <BarraNavegacion />
        <main>{children}</main>
        <PieGlobal />
        <BotonFlotanteFrap />
      </body>
    </html>
  );
}
