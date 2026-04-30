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
  title: "Tesis PUCP - Asesoría Profesional | Guía Definitiva 2026",
  description: "¿Sientes que el proceso de tu tesis pucp se ha convertido en un laberinto? Te enseñamos cómo superar cada etapa con rigor académico.",
};

export default function TesisPUCPPage() {
  const uni = getUniversidadBySlug("tesis-pucp");
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
        tituloH2="Asesoría personalizada para tu <strong>tesis PUCP</strong>"
        subtitulo="Complementamos el rigor exigido por la facultad con asesoría personalizada."
      />

      <AutoridadSection
        contenido={uni.autoridad}
        primaryColor={uni.primaryColor}
      />

      <FaqAccordion
        items={uni.faq}
        titulo="Preguntas Frecuentes sobre la <strong>Tesis PUCP</strong>"
      />

      <FooterCta contenido={uni.footerCta} primaryColor={uni.primaryColor} />
    </div>
  );
}
