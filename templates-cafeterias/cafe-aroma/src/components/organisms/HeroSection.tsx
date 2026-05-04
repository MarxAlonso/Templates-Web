import * as React from "react";
import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Badge } from "@/components/atoms/Badge";
import { Coffee } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=2000')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-coffee-900/90 via-coffee-900/60 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl">
          <Badge variant="mustard" className="mb-6 animate-fade-in flex items-center gap-2 w-fit">
            <Coffee size={14} />
            Abierto ahora • Los mejores granos
          </Badge>
          
          <Heading variant="display" className="text-white mb-6 animate-slide-up">
            El arte de servir <span className="text-mustard-500">el café perfecto</span>
          </Heading>
          
          <Paragraph variant="lead" className="text-coffee-100 mb-10 animate-fade-in max-w-xl">
            Desde la selección del grano hasta la taza final, cada paso es una ceremonia. 
            Ven y descubre por qué somos el refugio favorito de los amantes del café.
          </Paragraph>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="primary" size="lg">
              Explorar Menú
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-coffee-900">
              Nuestra Historia
            </Button>
          </div>
          
          {/* Quick Info Labels */}
          <div className="mt-16 flex flex-wrap gap-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex flex-col">
              <span className="text-mustard-500 font-heading font-bold text-3xl">100%</span>
              <span className="text-coffee-200 text-sm">Arábica Premium</span>
            </div>
            <div className="flex flex-col">
              <span className="text-mustard-500 font-heading font-bold text-3xl">15+</span>
              <span className="text-coffee-200 text-sm">Variedades</span>
            </div>
            <div className="flex flex-col">
              <span className="text-mustard-500 font-heading font-bold text-3xl">4.9</span>
              <span className="text-coffee-200 text-sm">Calificación</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-coffee-50 to-transparent z-10" />
    </section>
  );
};
