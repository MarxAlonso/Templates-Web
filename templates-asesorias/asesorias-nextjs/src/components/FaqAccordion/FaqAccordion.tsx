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
              📩 Escríbenos a info@tuagencia.pe
            </a>
            <a href="https://wa.me/51999999999" className={styles.sLink}>
              💬 Pregúntanos por WhatsApp
            </a>
          </div>
          <div className={styles.teamFaces}>
            <img src="https://i.pravatar.cc/100?img=32" alt="Asesor Tesis" />
            <img src="https://i.pravatar.cc/100?img=44" alt="Editora APA" />
          </div>
        </div>

        <div className={styles.accordion}>
          <h2 dangerouslySetInnerHTML={{ __html: titulo }} />

          {items.map((item, i) => (
            <div key={i} className={styles.accordionItem}>
              <details open={i === 0}>
                <summary className={styles.faqSummary}>{item.pregunta}</summary>
                <div className={styles.answer}>
                  {item.imagen && (
                    <img src={item.imagen} alt={item.imagenAlt || ""} className={styles.faqImg} />
                  )}
                  <p>{item.respuesta}</p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
