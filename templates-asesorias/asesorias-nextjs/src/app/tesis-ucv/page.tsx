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
  title: "Tesis UCV - Asesoría Profesional | Guía Definitiva 2026",
  description: "¿Sientes que tu tesis UCV se ha convertido en un laberinto? Te enseñamos cómo superar cada etapa, desde el plan de tesis hasta la sustentación exitosa.",
};

export default function TesisUCVPage() {
  const uni = getUniversidadBySlug("tesis-ucv");
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
        tituloH2="Nuestra fórmula: Asesoría personalizada para la <strong>César Vallejo tesis</strong>"
        subtitulo="Atacamos los puntos débiles de tu borrador y los convertimos en fortalezas. ¿Te imaginas llegar a la sustentación con total seguridad?"
      />

      <AutoridadSection
        contenido={uni.autoridad}
        primaryColor={uni.primaryColor}
      />

      <FaqAccordion
        items={uni.faq}
        titulo="Preguntas Frecuentes sobre la <strong>Tesis en la UCV</strong>"
      />

      <FooterCta contenido={uni.footerCta} primaryColor={uni.primaryColor} />
    </div>
  );
}
