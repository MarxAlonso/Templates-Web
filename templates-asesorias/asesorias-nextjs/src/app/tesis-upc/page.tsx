import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero/Hero";
import { SeccionConversion } from "@/components/SeccionConversion/SeccionConversion";
import { FacultadesGrid } from "@/components/FacultadesGrid/FacultadesGrid";
import { AutoridadSection } from "@/components/AutoridadSection/AutoridadSection";
import { FaqAccordion } from "@/components/FaqAccordion/FaqAccordion";
import { FooterCta } from "@/components/FooterCta/FooterCta";
import { JsonLdFaq } from "@/components/JsonLdFaq/JsonLdFaq";
import { getUniversidadBySlug } from "@/data/universidades";

export const metadata: Metadata = {
  title: "Tesis UPC - Asesoría Profesional | Manual de Supervivencia 2026",
  description: "¿Sufriendo con tu tesis universidad UPC? Descubre cómo superar el Taller de Investigación, dominar Turnitin y lograr tu grado con asesoría experta.",
};

export default function TesisUPCPage() {
  const uni = getUniversidadBySlug("tesis-upc");
  if (!uni) notFound();

  return (
    <div>
      <JsonLdFaq items={uni.seo.faqSchema} />

      <Hero
        contenido={uni.hero}
        primaryColor={uni.primaryColor}
      />

      <SeccionConversion
        contenido={uni.conversion}
        primaryColor={uni.primaryColor}
      />

      <FacultadesGrid
        facultades={uni.facultades}
        primaryColor={uni.primaryColor}
        tituloH2="Los pilares de una <strong>tesis UPC</strong> exitosa"
        subtitulo="Para que tu trabajo destaque en el repositorio UPC, no basta con cumplir; hay que sobresalir."
      />

      <AutoridadSection
        contenido={uni.autoridad}
        primaryColor={uni.primaryColor}
      />

      <FaqAccordion
        items={uni.faq}
        titulo="Preguntas Frecuentes - <strong>Tesis UPC</strong>"
      />

      <FooterCta contenido={uni.footerCta} primaryColor={uni.primaryColor} />
    </div>
  );
}
