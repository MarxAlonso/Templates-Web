import type { ReactNode } from "react";
import styles from "./Boton.module.css";

export type BotonVariante = "primary" | "outline" | "whatsapp" | "gold" | "blue";

interface BotonProps {
  children: ReactNode;
  variante?: BotonVariante;
  href?: string;
  className?: string;
  color?: string;
}

export function Boton({
  children,
  variante = "primary",
  href,
  className = "",
  color,
}: BotonProps) {
  const clase = `${styles.boton} ${styles[variante]} ${className}`;
  const style = color ? { ["--btn-color" as string]: color } : undefined;

  if (href) {
    return (
      <a href={href} className={clase} style={style}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={clase} style={style}>
      {children}
    </button>
  );
}
