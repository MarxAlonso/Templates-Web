import Link from "next/link";
import { universidades } from "@/data/universidades";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.col}>
          <div className={styles.logo}>
            Devs<span>Codelab</span>
          </div>
          <p className={styles.colDesc}>
            Asesoría profesional de tesis para universidades del Perú.
          </p>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Universidades</h4>
          <ul>
            {universidades.map((u) => (
              <li key={u.slug}>
                <Link href={`/${u.slug}`}>Tesis {u.nombreCompleto}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Servicios</h4>
          <ul>
            <li><Link href="#">Asesoría APA</Link></li>
            <li><Link href="#">Reducción Turnitin</Link></li>
            <li><Link href="#">Análisis Estadístico</Link></li>
            <li><Link href="#">Preparación Sustentación</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Contacto</h4>
          <p>info@tuagencia.pe</p>
          <a href="https://wa.me/51999999999" className={styles.whatsappLink}>
            WhatsApp
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} DevsCodelab. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
