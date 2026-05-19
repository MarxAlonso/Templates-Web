import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cuerpo Humano Studio · Explora órganos en 3D",
  description: "App web educativa interactiva sobre órganos del cuerpo humano en 3D.",
  icons: {
    icon: "/app-assets/identidad/logo_cuerpo_humano.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
