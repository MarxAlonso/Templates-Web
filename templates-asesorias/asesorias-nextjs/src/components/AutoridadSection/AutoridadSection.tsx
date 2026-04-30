import Image from "next/image";
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
            <div className={styles.docHeader}>
              <span className={styles.docDot} style={{ background: "#ff5f56" }} />
              <span className={styles.docDot} style={{ background: "#ffbd2e" }} />
              <span className={styles.docDot} style={{ background: "#27c93f" }} />
              <span className={styles.docTitle}>{contenido.docHeader}</span>
            </div>
            <div className={styles.docBody}>
              {contenido.docLineas.map((linea, i) => (
                <p key={i}>
                  {linea.texto}
                  {linea.original && (
                    <span className={styles.diffWrapper}>
                      <del className={styles.docDel}>{linea.original}</del>{" "}
                      <ins className={styles.docIns}>{linea.corregido}</ins>
                    </span>
                  )}
                  {linea.textoFinal}
                </p>
              ))}
            </div>
            <div className={styles.commentBubble}>
              <div className={styles.avatarWrapper}>
                <Image
                  src={contenido.commentBubble.avatar}
                  alt={contenido.commentBubble.avatarAlt}
                  width={40}
                  height={40}
                  className={styles.avatar}
                />
              </div>
              <div className={styles.commentText}>
                <strong>{contenido.commentBubble.nombre}</strong>
                <p>{contenido.commentBubble.texto}</p>
                <button className={styles.btnDoc} style={{ background: primaryColor }}>Aceptar cambios</button>
              </div>
            </div>
          </div>

          <div className={styles.dobleImagen}>
            <div className={styles.imageWrapper}>
              <Image src={contenido.imagen1} alt={contenido.imagen1Alt} width={300} height={200} className={styles.roundedImage} />
            </div>
            <div className={styles.imageWrapper}>
              <Image src={contenido.imagen2} alt={contenido.imagen2Alt} width={300} height={200} className={styles.roundedImage} />
            </div>
          </div>
        </div>

        <article className={styles.copy}>
          <span className={styles.badge} style={{ background: primaryColor }}>{contenido.badge}</span>
          <h2 dangerouslySetInnerHTML={{ __html: contenido.h2 }} />
          <p className={styles.mainDesc}>{contenido.descripcion}</p>

          <div className={styles.dataGrid}>
            {contenido.datos.map((d, i) => (
              <div key={i} className={styles.dataItem}>
                <div className={styles.dataBullet} style={{ background: primaryColor }} />
                <div className={styles.dataText}>
                  <strong>{d.titulo}</strong>
                  <span>{d.descripcion}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
