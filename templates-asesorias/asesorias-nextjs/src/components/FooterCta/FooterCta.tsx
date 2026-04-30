import { Boton } from "@/components/Boton/Boton";
import type { FooterCtaContent } from "@/types";
import styles from "./FooterCta.module.css";

interface FooterCtaProps {
  contenido: FooterCtaContent;
  primaryColor: string;
}

export function FooterCta({ contenido, primaryColor }: FooterCtaProps) {
  return (
    <section className={styles.section}>
      <div className={styles.banner}>
        <h2>
          {contenido.h2.split(/(<strong>.*?<\/strong>)/g).map((part, i) =>
            part.startsWith("<strong>") ? (
              <strong key={i} style={{ color: primaryColor }}>
                {part.replace(/<\/?strong>/g, "")}
              </strong>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </h2>
        <p>{contenido.descripcion}</p>
        <Boton variante="whatsapp" href="https://wa.me/51999999999">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className={styles.waIcon}
          />
          {contenido.ctaText}
        </Boton>
      </div>
    </section>
  );
}
