import Image from "next/image";
import { Boton } from "@/components/Boton/Boton";
import { Card } from "@/components/Card/Card";
import { universidades } from "@/data/universidades";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroInfo}>
            <span className={styles.preTitle}>Asesoría de Tesis Profesional</span>
            <h1>
              Termina tu tesis con <strong>confianza y excelencia</strong>
            </h1>
            <p>
              Somos tu equipo de investigación personal. Te acompañamos desde el plan
              de tesis hasta la sustentación, con expertos en normas APA, Turnitin y
              metodología para las principales universidades del Perú.
            </p>
            <div className={styles.heroBtns}>
              <Boton href="#universidades" variante="primary">
                Ver Universidades
              </Boton>
              <Boton href="https://wa.me/51999999999" variante="whatsapp">
                Asesoría WhatsApp
              </Boton>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroImgWrapper}>
              <Image
                src="/imagenes/ucv/ucv-hero.jfif"
                alt="Asesoría de tesis profesional"
                width={600}
                height={400}
                priority
                className={styles.heroImg}
              />
            </div>
            <div className={styles.heroBadge}>
              <span className={styles.badgeNumber}>100%</span>
              <span className={styles.badgeText}>Aprobación Garantizada</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.universidades} id="universidades">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Tu Meta Académica</span>
            <h2>
              Asesoría especializada para tu <strong>universidad</strong>
            </h2>
            <p>
              Selecciona tu universidad and accede a contenido personalizado para tu
              proceso de titulación.
            </p>
          </header>

          <div className={styles.grid}>
            {universidades.map((u) => (
              <a key={u.slug} href={`/${u.slug}`} className={styles.uniCard}>
                <div className={styles.uniIcon} style={{ background: u.primaryColor + '15', color: u.primaryColor }}>
                  🎓
                </div>
                <h3>Tesis {u.nombre}</h3>
                <p>{u.nombreCompleto}</p>
                <span className={styles.uniLink} style={{ color: u.primaryColor }}>Ver asesoría →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.pilares}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Nuestra Metodología</span>
            <h2>
              Nuestros <strong>tres pilares</strong> de éxito
            </h2>
          </header>
          <div className={styles.pilaresGrid}>
            <Card
              icono="📝"
              titulo="Metodología Rigurosa"
              descripcion="Cada tesis sigue un proceso metodológico comprobado: matriz de consistencia, marco teórico, diseño de investigación y análisis estadístico."
            />
            <Card
              icono="🛡️"
              titulo="Originalidad Garantizada"
              descripcion="Garantizamos un índice de similitud menor al 20% en Turnitin. Parafraseo profesional y citas en normas APA 7ma edición."
            />
            <Card
              icono="🎯"
              titulo="Sustentación Exitosa"
              descripcion="Te preparamos con simulacros, diapositivas profesionales y coaching de oratoria para que domines al jurado evaluador."
            />
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <h2>¿Listo para comenzar tu camino al grado académico?</h2>
            <p>
              Contáctanos hoy y recibe una evaluación gratuita de tu avance de tesis.
            </p>
            <Boton variante="whatsapp" href="https://wa.me/51999999999">
              Chatear con un Asesor
            </Boton>
          </div>
        </div>
      </section>
    </div>
  );
}
