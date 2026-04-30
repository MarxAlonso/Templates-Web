import React from 'react';
import styles from './BandaHero.module.css';
import { Boton } from '../Boton/Boton';

interface BandaHeroProps {
  titulo: string;
  subtitulo: string;
  textoBotonPrimario?: string;
  textoBotonSecundario?: string;
  imagenUrl: string;
  imagenAlt: string;
}

export const BandaHero: React.FC<BandaHeroProps> = ({
  titulo,
  subtitulo,
  textoBotonPrimario,
  textoBotonSecundario,
  imagenUrl,
  imagenAlt
}) => {
  return (
    <section className={styles.bandaHero}>
      <div className={styles.columnaTexto}>
        <h2 className={styles.titulo}>{titulo}</h2>
        <p className={styles.subtitulo}>{subtitulo}</p>
        <div className={styles.acciones}>
          {textoBotonPrimario && (
            <Boton variante="verdeInvertido">{textoBotonPrimario}</Boton>
          )}
          {textoBotonSecundario && (
            <Boton variante="blancoContornoOscuro">{textoBotonSecundario}</Boton>
          )}
        </div>
      </div>
      <div className={styles.columnaImagen}>
        <img src={imagenUrl} alt={imagenAlt} className={styles.imagen} />
      </div>
    </section>
  );
};
