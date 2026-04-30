import type { AutoridadContent } from "@/types";
import styles from "./AutoridadSection.module.css";

interface AutoridadSectionProps {
  contenido: AutoridadContent;
  primaryColor: string;
}

export function AutoridadSection({ contenido, primaryColor }: AutoridadSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.visual}>
          <div className={styles.docMockup}>
            <div className={styles.docHeader}>{contenido.docHeader}</div>
            <div className={styles.docBody}>
              {contenido.docLineas.map((linea, i) => (
                <p key={i}>
                  {linea.texto}
                  {linea.original && (
                    <>
                      <del className={styles.docDel}>{linea.original}</del>{" "}
                      <ins className={styles.docIns}>{linea.corregido}</ins>
                    </>
                  )}
                  {linea.textoFinal}
                </p>
              ))}
            </div>
            <div className={styles.commentBubble}>
              <img
                src={contenido.commentBubble.avatar}
                alt={contenido.commentBubble.avatarAlt}
              />
              <div className={styles.commentText}>
                <strong>{contenido.commentBubble.nombre}</strong>
                <p>{contenido.commentBubble.texto}</p>
                <button className={styles.btnDoc}>Aceptar</button>
              </div>
            </div>
          </div>

          <div className={styles.dobleImagen}>
            <img src={contenido.imagen1} alt={contenido.imagen1Alt} />
            <img src={contenido.imagen2} alt={contenido.imagen2Alt} />
          </div>
        </div>

        <article className={styles.copy}>
          <span className={styles.badge}>{contenido.badge}</span>
          <h2 dangerouslySetInnerHTML={{ __html: contenido.h2 }} />
          <p>{contenido.descripcion}</p>

          <div className={styles.dataGrid}>
            {contenido.datos.map((d, i) => (
              <div key={i} className={styles.dataItem} style={{ borderLeftColor: primaryColor }}>
                <strong>{d.titulo}</strong>
                <span>{d.descripcion}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
