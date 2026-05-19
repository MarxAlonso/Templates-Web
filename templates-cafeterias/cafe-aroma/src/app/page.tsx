import { Navbar } from "@/components/organisms/Navbar";
import { HeroSection } from "@/components/organisms/HeroSection";
import { MenuSection } from "@/components/organisms/MenuSection";
import { Footer } from "@/components/organisms/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <MenuSection />
        
        {/* Sección About - Próximamente */}
        <section id="about" className="py-24 bg-coffee-50 border-y border-coffee-100">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-coffee-900 font-heading text-4xl mb-6">Nuestra Historia</h2>
            <p className="text-coffee-700 max-w-2xl mx-auto text-lg italic">
              "En Café Aroma, creemos que el café no es solo una bebida, es un momento de pausa, 
              una conexión con los sentidos y una tradición que honramos en cada grano."
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
