import Image from "next/image";
import type { FaqItem } from "@/types";
import styles from "./FaqAccordion.module.css";

interface FaqAccordionProps {
  items: FaqItem[];
  titulo: string;
  supportTitulo?: string;
  supportDescripcion?: string;
}

export function FaqAccordion({ items, titulo, supportTitulo = "Pregunta a nuestro equipo", supportDescripcion = "¿Tienes dudas específicas sobre el proceso de titulación? Estamos aquí para guiarte." }: FaqAccordionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.support}>
          <h3>{supportTitulo}</h3>
          <p>{supportDescripcion}</p>
          <div className={styles.supportLinks}>
            <a href="mailto:info@tuagencia.pe" className={styles.sLink}>
              <span className={styles.sIcon}>📩</span> Escríbenos a info@tuagencia.pe
            </a>
            <a href="https://wa.me/51999999999" className={styles.sLink}>
              <span className={styles.sIcon}>💬</span> Pregúntanos por WhatsApp
            </a>
          </div>
          <div className={styles.teamFaces}>
            <div className={styles.avatarWrapper}>
              <Image src="https://i.pravatar.cc/100?img=32" alt="Asesor Tesis" width={48} height={48} className={styles.avatar} />
            </div>
            <div className={styles.avatarWrapper}>
              <Image src="https://i.pravatar.cc/100?img=44" alt="Editora APA" width={48} height={48} className={styles.avatar} />
            </div>
          </div>
        </div>

        <div className={styles.accordion}>
          <h2 dangerouslySetInnerHTML={{ __html: titulo }} />

          <div className={styles.itemsWrapper}>
            {items.map((item, i) => (
              <div key={i} className={styles.accordionItem}>
                <details open={i === 0}>
                  <summary className={styles.faqSummary}>
                    {item.pregunta}
                    <span className={styles.chevron}>↓</span>
                  </summary>
                  <div className={styles.answer}>
                    {item.imagen && (
                      <div className={styles.faqImgWrapper}>
                        <Image src={item.imagen} alt={item.imagenAlt || ""} width={300} height={200} className={styles.faqImg} />
                      </div>
                    )}
                    <p>{item.respuesta}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
