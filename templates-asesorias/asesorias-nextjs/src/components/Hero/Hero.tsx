import Image from "next/image";
import { Boton } from "@/components/Boton/Boton";
import type { HeroContent } from "@/types";
import styles from "./Hero.module.css";

interface HeroProps {
  contenido: HeroContent;
  primaryColor: string;
  ctaHref?: string;
}

export function Hero({ contenido, primaryColor, ctaHref = "#cotizacion" }: HeroProps) {
  return (
    <header className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.info}>
          <span className={styles.preTitle} style={{ color: primaryColor }}>
            {contenido.preTitle}
          </span>
          <h1 dangerouslySetInnerHTML={{ __html: contenido.h1 }} />
          <p dangerouslySetInnerHTML={{ __html: contenido.descripcion }} />
          <div className={styles.ctaWrapper}>
            <Boton href={ctaHref} variante="primary">
              {contenido.ctaText}
            </Boton>
            <div className={styles.trustBadge}>
              <span className={styles.trustStars}>★★★★★</span>
              <span className={styles.trustText}>+500 tesistas graduados</span>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.circleBg} style={{ background: primaryColor }} />
          <div className={styles.imageWrapper}>
            <Image
              src={contenido.heroImage}
              alt={contenido.heroImageAlt}
              className={styles.studentImg}
              width={600}
              height={400}
              priority
            />
          </div>
          <div className={styles.floatingCards}>
            {contenido.floatingCards.map((card, i) => (
              <div key={i} className={styles.fCard}>
                <div className={styles.iconBox} style={{ background: card.iconBg }}>
                  {card.icon}
                </div>
                <div className={styles.fCardContent}>
                  <h4>{card.titulo}</h4>
                  <p>{card.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
