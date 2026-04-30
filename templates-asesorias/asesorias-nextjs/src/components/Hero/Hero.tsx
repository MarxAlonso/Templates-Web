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
          <span className={styles.preTitle}>{contenido.preTitle}</span>
          <h1 dangerouslySetInnerHTML={{ __html: contenido.h1 }} />
          <p dangerouslySetInnerHTML={{ __html: contenido.descripcion }} />
          <Boton href={ctaHref} variante="primary">
            {contenido.ctaText}
          </Boton>
        </div>

        <div className={styles.visual}>
          <div className={styles.circleBg} style={{ background: primaryColor }} />
          <img
            src={contenido.heroImage}
            alt={contenido.heroImageAlt}
            className={styles.studentImg}
          />
          <div className={styles.floatingCards}>
            {contenido.floatingCards.map((card, i) => (
              <div key={i} className={styles.fCard}>
                <div className={styles.iconBox} style={{ background: card.iconBg }}>
                  {card.icon}
                </div>
                <h4>{card.titulo}</h4>
                <p>{card.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
