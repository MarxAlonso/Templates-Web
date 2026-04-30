import type { ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps {
  icono?: string;
  titulo: string;
  descripcion: string;
  children?: ReactNode;
  colorAcento?: string;
  className?: string;
}

export function Card({ icono, titulo, descripcion, children, colorAcento, className = "" }: CardProps) {
  const style = colorAcento
    ? { ["--card-acento" as string]: colorAcento }
    : undefined;

  return (
    <article className={`${styles.card} ${className}`} style={style}>
      {icono && <div className={styles.icono}>{icono}</div>}
      <h3 className={styles.titulo}>{titulo}</h3>
      <p className={styles.descripcion} dangerouslySetInnerHTML={{ __html: descripcion }} />
      {children}
    </article>
  );
}
