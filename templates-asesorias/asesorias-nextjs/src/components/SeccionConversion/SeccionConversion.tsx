import type { ConversionContent } from "@/types";
import styles from "./SeccionConversion.module.css";

interface SeccionConversionProps {
  contenido: ConversionContent;
  primaryColor: string;
  id?: string;
}

export function SeccionConversion({ contenido, primaryColor, id = "cotizacion" }: SeccionConversionProps) {
  return (
    <section className={styles.section} id={id}>
      <div className={styles.container}>
        <div className={styles.colCopy}>
          <span className={styles.tagEquipo}>{contenido.tagEquipo}</span>
          <h2 dangerouslySetInnerHTML={{ __html: contenido.h2 }} />
          <p dangerouslySetInnerHTML={{ __html: contenido.descripcion }} />

          <ul className={styles.beneficios}>
            {contenido.beneficios.map((b, i) => (
              <li key={i}>
                <span className={styles.check}>✓</span>
                <span dangerouslySetInnerHTML={{ __html: b.texto }} />
              </li>
            ))}
          </ul>

          <div className={styles.imagenesDoble}>
            <img src={contenido.imagen1} alt={contenido.imagen1Alt} />
            <img src={contenido.imagen2} alt={contenido.imagen2Alt} />
          </div>

          <img
            src={contenido.imagen3}
            alt={contenido.imagen3Alt}
            className={styles.imagenSimple}
          />

          <div className={styles.expertos}>
            {contenido.expertos.map((e, i) => (
              <div key={i} className={styles.expertoBox}>
                <img src={e.imagen} alt={e.alt} />
                <span className={styles.tooltip}>
                  {e.nombre}
                  <br />
                  <small>{e.especialidad}</small>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.colForm}>
          <div className={styles.formWrapper} style={{ borderTop: `4px solid ${primaryColor}` }}>
            <h3>{contenido.formTitulo}</h3>
            <p>{contenido.formSubtitulo}</p>
            <p className={styles.formPlaceholder}>[Formulario de contacto]</p>
            <span className={styles.formNote}>
              🔒 Tus datos están protegidos y no serán compartidos.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
