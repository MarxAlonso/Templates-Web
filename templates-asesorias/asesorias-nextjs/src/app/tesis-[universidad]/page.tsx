import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero/Hero";
import { SeccionConversion } from "@/components/SeccionConversion/SeccionConversion";
import { FacultadesGrid } from "@/components/FacultadesGrid/FacultadesGrid";
import { AutoridadSection } from "@/components/AutoridadSection/AutoridadSection";
import { FaqAccordion } from "@/components/FaqAccordion/FaqAccordion";
import { FooterCta } from "@/components/FooterCta/FooterCta";
import { JsonLdFaq } from "@/components/JsonLdFaq/JsonLdFaq";
import { getUniversidadBySlug, getAllSlugs } from "@/data/universidades";

type Props = {
  params: Promise<{ universidad: string }>;
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ universidad: slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const uni = getUniversidadBySlug(params.universidad);
  if (!uni) return { title: "Universidad no encontrada" };

  return {
    title: uni.seo.title,
    description: uni.seo.description,
  };
}

export default async function UniversidadPage(props: Props) {
  const params = await props.params;
  const uni = getUniversidadBySlug(params.universidad);
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
        tituloH2={`Asesoría personalizada para tu <strong>tesis ${uni.nombre}</strong>`}
        subtitulo="Complementamos el rigor exigido por la facultad con asesoría personalizada."
      />

      <AutoridadSection
        contenido={uni.autoridad}
        primaryColor={uni.primaryColor}
      />

      <FaqAccordion
        items={uni.faq}
        titulo={`Preguntas Frecuentes sobre la <strong>Tesis en ${uni.nombre}</strong>`}
      />

      <FooterCta contenido={uni.footerCta} primaryColor={uni.primaryColor} />
    </div>
  );
}
