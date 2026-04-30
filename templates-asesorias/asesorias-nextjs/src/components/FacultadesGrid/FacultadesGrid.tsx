import { Card } from "@/components/Card/Card";
import type { FacultadCard } from "@/types";
import styles from "./FacultadesGrid.module.css";

interface FacultadesGridProps {
  facultades: FacultadCard[];
  primaryColor: string;
  tituloH2: string;
  subtitulo?: string;
}

export function FacultadesGrid({ facultades, primaryColor, tituloH2, subtitulo }: FacultadesGridProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 dangerouslySetInnerHTML={{ __html: tituloH2 }} />
          {subtitulo && <p>{subtitulo}</p>}
        </header>

        <div className={styles.grid}>
          {facultades.map((f, i) => (
            <Card
              key={i}
              icono={f.icono}
              titulo={f.titulo}
              descripcion={f.descripcion}
              colorAcento={primaryColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
