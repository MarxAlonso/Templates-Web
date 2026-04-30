export interface UniversidadConfig {
  nombre: string;
  slug: string;
  nombreCompleto: string;
  primaryColor: string;
  primaryRgba: string;
  hero: HeroContent;
  conversion: ConversionContent;
  facultades: FacultadCard[];
  autoridad: AutoridadContent;
  faq: FaqItem[];
  footerCta: FooterCtaContent;
  seo: SeoConfig;
}

export interface HeroContent {
  preTitle: string;
  h1: string;
  descripcion: string;
  ctaText: string;
  heroImage: string;
  heroImageAlt: string;
  floatingCards: FloatingCard[];
}

export interface FloatingCard {
  icon: string;
  iconBg: string;
  titulo: string;
  descripcion: string;
}

export interface ConversionContent {
  tagEquipo: string;
  h2: string;
  descripcion: string;
  beneficios: BeneficioItem[];
  formTitulo: string;
  formSubtitulo: string;
  imagen1: string;
  imagen1Alt: string;
  imagen2: string;
  imagen2Alt: string;
  imagen3: string;
  imagen3Alt: string;
  expertos: ExpertoItem[];
}

export interface BeneficioItem {
  texto: string;
}

export interface ExpertoItem {
  imagen: string;
  alt: string;
  nombre: string;
  especialidad: string;
}

export interface FacultadCard {
  icono: string;
  titulo: string;
  descripcion: string;
}

export interface AutoridadContent {
  badge: string;
  h2: string;
  descripcion: string;
  datos: DataItem[];
  imagen1: string;
  imagen1Alt: string;
  imagen2: string;
  imagen2Alt: string;
  docHeader: string;
  docLineas: DocLinea[];
  commentBubble: CommentBubble;
}

export interface DataItem {
  titulo: string;
  descripcion: string;
}

export interface DocLinea {
  texto: string;
  original?: string;
  corregido?: string;
  textoFinal?: string;
}

export interface CommentBubble {
  avatar: string;
  avatarAlt: string;
  nombre: string;
  texto: string;
}

export interface FaqItem {
  pregunta: string;
  respuesta: string;
  imagen?: string;
  imagenAlt?: string;
}

export interface FooterCtaContent {
  h2: string;
  descripcion: string;
  ctaText: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  faqSchema: FaqSchemaItem[];
}

export interface FaqSchemaItem {
  question: string;
  answer: string;
}
