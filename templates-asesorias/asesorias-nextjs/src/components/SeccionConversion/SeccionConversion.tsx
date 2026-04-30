import Image from "next/image";
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
          <span className={styles.tagEquipo} style={{ color: primaryColor }}>{contenido.tagEquipo}</span>
          <h2 dangerouslySetInnerHTML={{ __html: contenido.h2 }} />
          <p dangerouslySetInnerHTML={{ __html: contenido.descripcion }} className={styles.mainDesc} />

          <ul className={styles.beneficios}>
            {contenido.beneficios.map((b, i) => (
              <li key={i}>
                <span className={styles.check} style={{ background: primaryColor }}>✓</span>
                <span dangerouslySetInnerHTML={{ __html: b.texto }} />
              </li>
            ))}
          </ul>

          <div className={styles.imageGrid}>
            <div className={styles.imageCol}>
              <div className={styles.imageWrapper}>
                <Image src={contenido.imagen1} alt={contenido.imagen1Alt} width={400} height={300} className={styles.roundedImage} />
              </div>
              <div className={styles.imageWrapper}>
                <Image src={contenido.imagen2} alt={contenido.imagen2Alt} width={400} height={300} className={styles.roundedImage} />
              </div>
            </div>
            <div className={styles.imageCol}>
              <div className={styles.imageWrapper}>
                <Image src={contenido.imagen3} alt={contenido.imagen3Alt} width={400} height={600} className={styles.roundedImage} />
              </div>
            </div>
          </div>

          <div className={styles.expertosSection}>
            <p className={styles.expertosTitle}>Asesores disponibles:</p>
            <div className={styles.expertos}>
              {contenido.expertos.map((e, i) => (
                <div key={i} className={styles.expertoBox}>
                  <div className={styles.avatarWrapper}>
                    <Image src={e.imagen} alt={e.alt} width={60} height={60} className={styles.avatar} />
                  </div>
                  <div className={styles.expertoInfo}>
                    <span className={styles.expertoNombre}>{e.nombre}</span>
                    <span className={styles.expertoEspecialidad}>{e.especialidad}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.colForm}>
          <div className={styles.formCard} style={{ borderTop: `6px solid ${primaryColor}` }}>
            <h3>{contenido.formTitulo}</h3>
            <p className={styles.formSubtitle}>{contenido.formSubtitulo}</p>
            
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label>Nombre Completo</label>
                <input type="text" placeholder="Ej. Juan Pérez" />
              </div>
              <div className={styles.formGroup}>
                <label>WhatsApp / Celular</label>
                <input type="tel" placeholder="Ej. 987 654 321" />
              </div>
              <div className={styles.formGroup}>
                <label>Universidad / Carrera</label>
                <input type="text" placeholder="Ej. UCV - Ingeniería" />
              </div>
              <button type="submit" className={styles.submitBtn} style={{ background: primaryColor }}>
                Solicitar Cotización Gratis
              </button>
            </form>

            <span className={styles.formNote}>
              <span className={styles.lockIcon}>🔒</span> Tus datos están 100% protegidos.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
