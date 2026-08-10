import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./nutribrain.css";
import Navbar from "@/components/nutribrain/Navbar";
import Footer from "@/components/nutribrain/Footer";
import PageTransition from "@/components/nutribrain/PageTransition";
import ChatBot from "@/components/nutribrain/ChatBot";

const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "NutriBrain - Conocimiento Nutricional Conectado",
  description: "Tu segundo cerebro nutricional basado en evidencia científica.",
};

export default function NutriBrainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`nutribrain-scope ${sourceSerif.variable}`} suppressHydrationWarning>
      <Navbar />
      {/* Contenedor principal con padding top para compensar el Navbar fijo */}
      <main className="flex-grow pt-16 flex flex-col w-full bg-white dark:bg-transparent text-slate-900 dark:text-slate-100 transition-colors">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}