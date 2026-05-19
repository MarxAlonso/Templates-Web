import * as React from "react";
import Image from "next/image";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Badge } from "@/components/atoms/Badge";
import { Coffee, Heart, Leaf, Users } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <Coffee className="text-mustard-500" size={32} />,
      title: "Calidad Suprema",
      description: "Seleccionamos solo los granos más finos de fincas sostenibles certificadas."
    },
    {
      icon: <Heart className="text-mustard-500" size={32} />,
      title: "Pasión Barista",
      description: "Cada taza es preparada por expertos que aman el arte del café artesanal."
    },
    {
      icon: <Leaf className="text-mustard-500" size={32} />,
      title: "Sostenibilidad",
      description: "Comprometidos con el medio ambiente y el comercio justo con nuestros productores."
    },
    {
      icon: <Users className="text-mustard-500" size={32} />,
      title: "Comunidad",
      description: "Creamos espacios de encuentro donde las ideas fluyen mejor con un buen café."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Simple Page Header */}
        <section className="pt-40 pb-20 bg-coffee-900 text-white text-center">
          <div className="container mx-auto px-6">
            <Badge variant="mustard" className="mb-4">Sobre Nosotros</Badge>
            <Heading variant="display" className="text-white">Nuestra Historia</Heading>
          </div>
        </section>

        {/* History Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000"
                  alt="Interior de nuestra cafetería"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-6">
                <Heading variant="title">Desde 2015 <span className="text-mustard-500">tostando sueños</span></Heading>
                <Paragraph variant="lead">
                  Café Aroma nació de un pequeño sueño en el corazón de la ciudad. 
                  Lo que comenzó con una tostadora manual y tres mesas, se ha convertido 
                  en el punto de encuentro de una comunidad apasionada.
                </Paragraph>
                <Paragraph>
                  Nuestra misión ha sido siempre la misma: elevar la experiencia del café 
                  cotidiano a algo extraordinario. Viajamos a las regiones cafetaleras 
                  más remotas para traer granos con historias únicas que contar en cada sorbo.
                </Paragraph>
                <div className="grid grid-cols-2 gap-8 mt-4">
                  <div className="border-l-4 border-mustard-500 pl-4">
                    <span className="block text-3xl font-heading font-bold text-coffee-900">10+</span>
                    <span className="text-coffee-600 text-sm">Años de experiencia</span>
                  </div>
                  <div className="border-l-4 border-mustard-500 pl-4">
                    <span className="block text-3xl font-heading font-bold text-coffee-900">50k+</span>
                    <span className="text-coffee-600 text-sm">Tazas servidas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-coffee-50">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <Heading className="mb-4">Lo que nos mueve</Heading>
              <Paragraph className="max-w-2xl mx-auto">
                Nuestros valores son el corazón de todo lo que hacemos, desde la selección del 
                grano hasta la sonrisa final al entregarte tu bebida.
              </Paragraph>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-coffee-100 hover:shadow-md transition-shadow">
                  <div className="mb-6">{value.icon}</div>
                  <h3 className="font-heading font-bold text-xl text-coffee-900 mb-3">{value.title}</h3>
                  <Paragraph variant="small">{value.description}</Paragraph>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
